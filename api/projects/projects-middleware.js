const Projects = require("./projects-model");

function validateProjectId(req, res, next) {
  Projects.get(req.params.id).then((potentialId) => {
    if (potentialId) {
      next();
    } else {
      next({ status: 404, message: "id not found!" });
    }
  });
}

module.exports = {
  validateProjectId,
};
