const express = require("express");
const cors = require("cors");

const simulationRoutes = require("./services/routes/simulationRoutes");;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", simulationRoutes);

app.get("/", (req, res) => {
  res.send("Cryptographic Security Modeling Simulator Backend Running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});