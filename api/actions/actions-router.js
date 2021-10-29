const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      if (actions.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(next);
});

//   router.get("/:id", validateProjectId, (req, res, next) => {
//     Actions.get(req.params.id)
//       .then((project) => {
//         res.status(200).json(project);
//       })
//       .catch(next);
//   });

module.exports = router;
