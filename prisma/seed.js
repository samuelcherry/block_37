const prisma = require("../prisma");

const seed = async () => {
  const createUsers = async () => {
    const users = [
      { userName: "Logan", password: "test" },
      { userName: "Chase", password: "test" },
      { userName: "Lincoln", password: "test" },
      { userName: "Boots", password: "test" }
    ];
    await prisma.user.createMany({ data: users });
  };
  const createItems = async () => {
    const items = [
      { name: "item_1" },
      { name: "item_2" },
      { name: "item_3" },
      { name: "item_4" }
    ];
    await prisma.item.createMany({ data: items });
  };

  const createReviews = async () => {
    const reviews = [
      {
        item_id: 1,
        user_id: 1,
        rating: 5
      },
      {
        item_id: 1,
        user_id: 2,
        rating: 5
      },
      {
        item_id: 2,
        user_id: 3,
        rating: 5
      }
    ];
    await prisma.review.createMany({ data: reviews });
  };

  const createComments = async () => {
    const comments = [
      {
        user_id: 1,
        review_id: 1
      },
      {
        user_id: 2,
        review_id: 2
      },
      {
        user_id: 3,
        review_id: 3
      }
    ];
    await prisma.comment.createMany({ data: comments });
  };

  await createUsers();
  await createItems();
  await createReviews();
  await createComments();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
