const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is running");
});

//

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ message: "Registration successful" });
});

app.post("/api/auth/login", (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

app.get("/api/auth/me", (req, res) => {
  res.status(200).json({ message: "Authenticate successful" });
});

//
app.get("/api/items", (req, res) => {
  res.status(200).json({ message: "Get all items" });
});

app.get("/api/items/:id", (req, res) => {
  res.status(200).json({ message: "Get item at id" });
});

app.get("/api/items/:id/reviews", (req, res) => {
  res.status(200).json({ message: "Get all reviews for an item" });
});

//

app.get("/api/items/:itemId/reviews/:id", (req, res) => {
  res.status(200).json({ message: "get a specific review for an item" });
});

app.post("/api/items/:id/reviews", (req, res) => {
  res.status(201).json({ message: "post a review of an item" });
});

app.get("/api/reviews/me", (req, res) => {
  res.status(200).json({ message: "my reviews" });
});

app.put("/api/users/:userId/reviews/:id", (req, res) => {
  res.status(200).json({ message: "edit a review" });
});

//

app.post("/api/items/:itemId/reviews/:id/comments", (req, res) => {
  res.status(201).json({ message: "comment on a review" });
});

app.get("/api/comments/me", (req, res) => {
  res.status(200).json({ message: "my comments" });
});

app.put("/api/users/:userId/comments/:id", (req, res) => {
  res.status(200).json({ message: "edit a comment" });
});

app.delete("/api/users/:userId/comments/:id", (req, res) => {
  res.status(204).json({ message: "delete a comment" });
});

app.delete("/api/users/:userId/reviews/:id", (req, res) => {
  res.status(204).json({ message: "delete a review" });
});

app.listen(port, () => {
  console.log("server is running");
});
