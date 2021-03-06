const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const serveStatic = require("serve-static")

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/todos", require("./routes/api/todos"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static('public'));
  app.use(serveStatic(path.join(__dirname, 'dist')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
