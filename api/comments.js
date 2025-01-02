const router = require("express").Router();

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (err) {
    next();
  }
});

module.exports = router;
