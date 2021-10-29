const express = require("express");
const Projects = require("./projects-model");
const {
  validateProjectId,
  validateNewProj,
  validateUpdates,
} = require("./projects-middleware");
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

router.post("/", validateNewProj, (req, res, next) => {
  Projects.insert(req.body)
    .then((newProj) => {
      res.status(200).json(newProj);
    })
    .catch(next);
});

router.put("/:id", validateUpdates, validateProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProj) => {
      res.status(200).json(updatedProj);
    })
    .catch(next);
});

module.exports = router;
