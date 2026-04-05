const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

function maybeLoad(modulePath) {
  try {
    return require(modulePath);
  } catch (_error) {
    return null;
  }
}

const simulationRoutes = maybeLoad("./services/routes/simulationRoutes");
const algorithmRoutes = maybeLoad("./services/routes/algorithmRoutes");
const benchmarkRoutes = maybeLoad("./services/routes/benchmarkRoutes");
const educationalRoutes = maybeLoad("./services/routes/educationalRoutes");
const hardwareRoutes = maybeLoad("./services/routes/hardwareRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const distDir = path.join(__dirname, "dist");
const distIndex = path.join(distDir, "index.html");

app.use(cors());
app.use(express.json());

if (algorithmRoutes) {
  app.use("/api/algorithms", algorithmRoutes);
}
if (benchmarkRoutes) {
  app.use("/api/benchmark", benchmarkRoutes);
}
if (educationalRoutes) {
  app.use("/api/educational", educationalRoutes);
}
if (hardwareRoutes) {
  app.use("/api/hardware", hardwareRoutes);
}
if (simulationRoutes) {
  app.use("/api", simulationRoutes);
}

const endpoints = {};

if (algorithmRoutes) {
  endpoints.algorithms = {
    "GET /api/algorithms": "Get all algorithms",
    "GET /api/algorithms/:id": "Get single algorithm",
    "GET /api/algorithms/categories": "Get all categories",
  };
}
if (benchmarkRoutes) {
  endpoints.benchmark = {
    "POST /api/benchmark": "Run benchmarks",
  };
}
if (educationalRoutes) {
  endpoints.educational = {
    "GET /api/educational/:id": "Get algorithm details",
    "GET /api/educational/category/:category": "Get category overview",
    "POST /api/educational/simulate-crack": "Simulate crack time",
  };
}
if (hardwareRoutes) {
  endpoints.hardware = {
    "GET /api/hardware": "Get all hardware options",
    "GET /api/hardware/cpu/:id": "Get CPU details",
    "GET /api/hardware/gpu/:id": "Get GPU details",
    "GET /api/hardware/supercomputer/:id": "Get supercomputer details",
    "GET /api/hardware/quantum/:id": "Get quantum computer details",
    "POST /api/hardware/calculate": "Calculate effective performance",
    "POST /api/hardware/attack-time": "Calculate attack time estimates",
  };
}
if (simulationRoutes) {
  endpoints.simulation = {
    "POST /api/simulate": "Run simulation",
  };
}

const statusPayload = {
  name: "Cryptography Atlas",
  version: "2.1.0",
  status: "running",
  site: fs.existsSync(distIndex) ? "static build available" : "static build not found",
  endpoints,
};

app.get("/api/status", (_request, response) => {
  response.json(statusPayload);
});

if (fs.existsSync(distIndex)) {
  app.use(express.static(distDir));

  app.get("/{*splat}", (_request, response) => {
    response.sendFile(distIndex);
  });
} else {
  app.get("/", (_request, response) => {
    response.json(statusPayload);
  });
}

app.listen(PORT, () => {
  console.log(`Cryptography Atlas running at http://localhost:${PORT}`);
});

module.exports = app;
