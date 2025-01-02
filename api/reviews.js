const router = require("express").Router();

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (err) {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const reviews = await prisma.item.findUnique({ where: { id } });
    res.json(reviews);
  } catch (err) {
    next();
  }
});

module.exports = router;
