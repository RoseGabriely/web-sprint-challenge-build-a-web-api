const express = require("express");
const Projects = require("./projects-model");
const { validateProjectId } = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      if (projects.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

module.exports = router;
