const userRoute = require("../routes/userRoute");
const stationRoute = require("../routes/stationRoute");
const walletRoute = require("../routes/walletRoute");
const trainRoute = require("../routes/trainRoute");

const routes = [
  {
    path: "/api/users",
    handler: userRoute,
  },
  {
    path: "/api/stations",
    handler: stationRoute,
  },
  {
    path: "/api/wallets",
    handler: walletRoute,
  },
  {
    path: "/api/trains",
    handler: trainRoute,
  },
  {
    path: "/api/",
    handler: (req, res) => {
      res.json({
        message: "RUET_UNKNOWNS",
      });
    },
  },
];

// Handle 404
routes.push({
  path: "*",
  handler: (req, res) => {
    res.status(404).json({ title: "404 Route not found" });
  },
});

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
