const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI =
  "mongodb+srv://shantanupandey03:shantanuMongoDb@cluster0.yfg5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get("/getStats", (req, res) => {
  res.send("tmkc");
});

app.get("/", (req, res) => {
  res.send("hehe");
});

app.get("/demo", (req, res) => {
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // Corrected embed URL
  res.json({
    videoUrl: videoUrl,
  });
});

app.get("/priceRange", (req, res) => {
  res.json("this is the price");
});

app.post("/analyseImage", (req, res) => {
  const { imagePath } = req.body;
  console.log(JSON.stringify(req.body));

  exec(
    `python3 path/to/yolo_script.py ${imagePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send("Error running YOLO model");
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).send("Error in YOLO script");
      }
      res.json(JSON.parse(stdout)); // Send YOLO results back to the client
    }
  );
});

app.get("/productDesc", (req, res) => {
  res.json("lorem ipsum sit amet blah blah blah blah");
});

// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.error("Mongodb connection error : ", err));

const port = process.env.PORT || 3000; // Corrected to uppercase "PORT"
app.listen(port, () => {
  console.log("server running on port " + port);
});
