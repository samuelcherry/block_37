const router = require("express").Router();

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
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

router.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const reviewId = Number(req.params.reviewId);

    const review = await prisma.review.findFirst({
      where: { id: reviewId, itemId: id }
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
