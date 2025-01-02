const router = require("express").Router();
const middleware = require("../middleware");
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

router.get("/:id/reviews", async (req, res, next) => {
  try {
    const result = await prisma.review.findMany({
      where: {
        item_id: Number(req.params.id)
      }
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:itemId/reviews/:reviewId", async (req, res, next) => {
  try {
    const result = await prisma.review.findFirst({
      where: {
        item_id: Number(req.params.itemId),
        id: Number(req.params.reviewId)
      }
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:itemId/reviews",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.review.create({
        data: {
          item_id: Number(req.params.itemId),
          user_id: Number(req.user.userId),
          text: String(req.body.text)
        }
      });
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:itemId/reviews/:reviewId/comments",
  middleware.protection,
  async (req, res, next) => {
    try {
      const result = await prisma.comment.create({
        data: {
          id: Number(req.params.reviewId),
          user_id: Number(req.user.userId),
          text: String(req.body.text)
        }
      });
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
