const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

app.get("/historical-events", async (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const url = `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`;
  console.log(url)
  const apiKey = process.env.API_KEY;
  const options = {
    headers: { "X-Api-Key": apiKey },
    contentType: "application/json",
  };

  try {
    const { data } = await axios.get(url, options);
    if (data) {
      return res.status(200).json({ message: "Success", data });
    } else {
      return res.status(404).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
