import "./App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import { useState } from "react";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Kyle's Exercise Tracker</h1>
        <p>
          This is a basic app that will allow a user to track their exercise
          routine over time.
        </p>
      </header>
      <Router>
        <div className="App-header">
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
            />
            <Route path="/create-exercise" element={<CreateExercisePage />} />
            <Route
              path="/edit-exercise"
              element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
            />
          </Routes>
        </div>
      </Router>
      <footer>
        <p>© 2022 Kyle Greene</p>
      </footer>
    </div>
  );
}

export default App;
