const Projects = require("./projects-model");
const yup = require("yup");

function validateProjectId(req, res, next) {
  Projects.get(req.params.id).then((potentialId) => {
    if (potentialId) {
      next();
    } else {
      next({ status: 404, message: "id not found!" });
    }
  });
}

function validateNewProj(req, res, next) {
  if (!req.body.name || !req.body.description) {
    next({ status: 400, message: "Please enter a name and description" });
  } else {
    next();
  }
}

const updateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
  completed: yup.boolean().required(),
});

async function validateUpdates(req, res, next) {
  try {
    const validated = await updateSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validated;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

module.exports = {
  validateProjectId,
  validateNewProj,
  validateUpdates,
};
