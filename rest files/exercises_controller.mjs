import "dotenv/config";
import * as exercises from "./exercises_model.mjs";
import express from "express";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 */
app.post("/exercises", async (req, res) => {
  if (validation(req)) {
    exercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((exercise) => {
        res.status(201).json(exercise);
      })
      .catch((error) => {
        console.error(error);
        // In case of an error, send back status code 400 in case of an error.
        // A better approach will be to examine the error and send an
        // error status code corresponding to the error.
        res.status(400).json({ Error: "Invalid Request" });
      });
  } else {
    res.status(400).json({ Error: "Invalid Request" });
  }
});

/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
  exercises
    .findExerciseById(exerciseId)
    .then((exercise) => {
      if (exercise !== null) {
        res.status(200).json(exercise);
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Retrieve exercises.
 * If the query include only some parameters, then only the exercises for that reps are returned.
 * Otherwise, all exercises are returned.
 */
app.get("/exercises", (req, res) => {
  let filter = {};
  //Add the query parameters below this line
  if (req.query.name !== undefined) {
    filter = { year: req.query.name };
  }
  if (req.query.reps !== undefined) {
    filter = { year: req.query.reps };
  }
  if (req.query.weight !== undefined) {
    filter = { year: req.query.weight };
  }
  if (req.query.unit !== undefined) {
    filter = { year: req.query.unit };
  }
  if (req.query.date !== undefined) {
    filter = { year: req.query.date };
  }
  exercises
    .findExercises(filter, "", 0)
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request failed" });
    });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put("/exercises/:_id", (req, res) => {
  if (validation(req)) {
    exercises
      .replaceExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((numUpdated) => {
        if (numUpdated === 1) {
          res.json({
            _id: req.params._id,
            name: req.body.name,
            reps: req.body.reps,
            weight: req.body.weight,
            unit: req.body.unit,
            date: req.body.date,
          });
        } else {
          res.status(404).json({ Error: "Not found" });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({ Error: "Request failed" });
      });
  } else {
    res.status(400).json({ Error: "Invalid Request" });
  }
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

/**
 *
 * @param {string} date
 * Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
 */
function isDateValid(date) {
  // Test using a regular expression.
  // To learn about regular expressions see Chapter 6 of the text book
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

/**
 *
 * Return true if all of the path parameters are valid.
 */
function validation(req) {
  if (req.body.name.length < 1 || typeof req.body.name !== "string") {
    return false;
  }
  if (req.body.reps < 1 || isNaN(req.body.reps)) {
    return false;
  }
  if (req.body.weight < 1 || isNaN(req.body.weight)) {
    return false;
  }
  if (!(req.body.unit === "lbs" || req.body.unit === "kgs")) {
    return false;
  }
  if (!isDateValid(req.body.date)) {
    return false;
  }
  return true;
}
