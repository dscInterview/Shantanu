const { exec } = require("child_process");

app.post("/detect", (req, res) => {
  const { imagePath } = req.body;

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
