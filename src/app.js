const express = require("express");
const cors = require("cors");

const JSend = require("./jsend");
const contactsRouter = require("./routes/contacts.router");
const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json(JSend.success());
});
contactsRouter.setup(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/public", express.static("public"));

// handle 404 reponse
app.use(resourceNotFound);

// define error-handling middleware
app.use(handleError);

module.exports = app;
