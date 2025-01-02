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

router.put(
  "/:userId/reviews/:reviewId",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.review.update({
        where: {
          id: Number(req.params.reviewId),
          user_id: Number(req.user.userId)
        }
      });
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:userId/comments/:commentId",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.comment.update({
        where: {
          comment_id: Number(req.params.commentId),
          user_id: Number(req.user.userId)
        },
        data: {
          text: String(req.body.text)
        }
      });
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:userId/reviews/:reviewId",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.review.delete({
        where: {
          id: Number(req.params.reviewId),
          user_id: Number(req.user.userId)
        }
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:userId/comments/:commentId",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.comment.delete({
        where: {
          comment_id: Number(req.params.commentId),
          user_id: Number(req.user.userId)
        }
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
