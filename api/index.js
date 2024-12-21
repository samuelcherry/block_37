const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

router.use("/comments", require("./comments"));
router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/auth", require("./auth"));
