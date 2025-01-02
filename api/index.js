const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/comments", require("./comments"));
router.use("/auth", require("./auth"));

module.exports = router;
