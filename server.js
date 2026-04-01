const express = require("express");
const cors = require("cors");
const crypto = require('crypto');

const simulationRoutes = require("./services/routes/simulationRoutes");
const algorithmRoutes = require("./services/routes/algorithmRoutes");
const benchmarkRoutes = require("./services/routes/benchmarkRoutes");
const educationalRoutes = require("./services/routes/educationalRoutes");
const hardwareRoutes = require("./services/routes/hardwareRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/algorithms", algorithmRoutes);
app.use("/api/benchmark", benchmarkRoutes);
app.use("/api/educational", educationalRoutes);
app.use("/api/hardware", hardwareRoutes);
app.use("/api", simulationRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "Cryptographic Security Modeling Simulator",
    version: "2.1.0",
    status: "running",
    endpoints: {
      algorithms: {
        "GET /api/algorithms": "Get all algorithms",
        "GET /api/algorithms/:id": "Get single algorithm",
        "GET /api/algorithms/categories": "Get all categories"
      },
      benchmark: {
        "POST /api/benchmark": "Run benchmarks"
      },
      educational: {
        "GET /api/educational/:id": "Get algorithm details",
        "GET /api/educational/category/:category": "Get category overview",
        "POST /api/educational/simulate-crack": "Simulate crack time"
      },
      hardware: {
        "GET /api/hardware": "Get all hardware options",
        "GET /api/hardware/cpu/:id": "Get CPU details",
        "GET /api/hardware/gpu/:id": "Get GPU details",
        "GET /api/hardware/supercomputer/:id": "Get supercomputer details",
        "GET /api/hardware/quantum/:id": "Get quantum computer details",
        "POST /api/hardware/calculate": "Calculate effective performance",
        "POST /api/hardware/attack-time": "Calculate attack time estimates"
      },
      simulation: {
        "POST /api/simulate": "Run simulation"
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app;
