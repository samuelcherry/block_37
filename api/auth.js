const router = require("express").Router();
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");

router.post("/register", async (req, res, next) => {
  const salt_rounds = 5;
  const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

  try {
    const result = await prisma.user.create({
      data: {
        userName: req.body.userName,
        password: hashedPassword
      }
    });
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await prisma.user.findUnique({
      where: { userName: req.body.userName }
    });
    if (!user) {
      return res.status(401).send("Invalid Login");
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(401).send("Invalid Login");
    }

    const token = jwt.sign({ id: user_id }, process.env.JWT);

    res.send({
      token
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", middleware.protection, async (req, res, next) => {
  try {
    console.log("1", req.user.user_id);
    const result = await prisma.user.findUnique({
      where: {
        id: Number(req.user.user_id)
      }
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
