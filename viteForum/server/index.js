const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Thread = require("./models/Thread");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://mongo:27017/viteForum'; 
mongoose.connect(mongoURI);

const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.json({ error_message: "Incorrect credentials" });
    }
    res.json({ message: "Login successful", id: user.id });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error_message: "User already exists" });
    }
    const newUser = new User({ id, email, password, username });
    await newUser.save();
    res.json({ message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.post("/api/create/thread", async (req, res) => {
  const { thread, id: userId } = req.body;
  const threadId = generateID();
  try {
    const newThread = new Thread({ id: threadId, title: thread, userId, replies: [], likes: [] });
    await newThread.save();
    const threads = await Thread.find({});
    res.json({ message: "Thread created successfully!", threads });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.get("/api/all/threads", async (req, res) => {
  try {
    const threads = await Thread.find({});
    res.json({ threads });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.post("/api/thread/like", async (req, res) => {
  const { threadId, userId } = req.body;
  try {
    const thread = await Thread.findOne({ id: threadId });
    if (!thread.likes.includes(userId)) {
      thread.likes.push(userId);
      await thread.save();
      res.json({ message: "You've reacted to the post!" });
    } else {
      res.json({ error_message: "You can only react once!" });
    }
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.post("/api/thread/replies", async (req, res) => {
  const { id } = req.body;
  try {
    const thread = await Thread.findOne({ id });
    res.json({ replies: thread.replies, title: thread.title });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.post("/api/create/reply", async (req, res) => {
  const { id, userId, reply } = req.body;
  try {
    const thread = await Thread.findOne({ id });
    const user = await User.findOne({ id: userId });
    thread.replies.unshift({ name: user.username, text: reply });
    await thread.save();
    res.json({ message: "Response added successfully!" });
  } catch (error) {
    res.status(500).json({ error_message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
