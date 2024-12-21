const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const items = await prisma.item.findUnique({ where: { id } });
    res.json(items);
  } catch (err) {
    next();
  }
});

router.get("/:id/reviews/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const items = await prisma.item.findUnique({ where: { id } });
    res.json(items);
  } catch (err) {
    next();
  }
});
