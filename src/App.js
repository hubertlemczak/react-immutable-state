import { useState } from 'react';
import { initialWorkouts, generateWorkout } from './Workouts.js';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [filteredWorkouts, setFilteredWorkouts] = useState();
  const [showDoneWorkouts, setShowDoneWorkouts] = useState(false);

  const addNewWorkout = () => setWorkouts([...workouts, generateWorkout()]);

  const deleteWorkout = (workout) =>
    setWorkouts(workouts.filter((item) => item !== workout));

  const completeWorkout = (workout) => {
    setWorkouts(
      workouts.map((item) =>
        item === workout ? { ...item, done: true } : item
      )
    );
  };

  const rerollWorkout = (workout) =>
    setWorkouts(
      workouts.map((item) => (item === workout ? generateWorkout() : item))
    );

  useEffect(() => {
    const updatedFilteredWorkouts = { incomplete: [], complete: [] };
    workouts.map((workout) =>
      workout.done === false
        ? updatedFilteredWorkouts.incomplete.push(workout)
        : updatedFilteredWorkouts.complete.push(workout)
    );

    setFilteredWorkouts(updatedFilteredWorkouts);
  }, [workouts]);

  const updateShowDoneWorkouts = (e) => {
    setShowDoneWorkouts(e.target.checked);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <label htmlFor="doneWorkoutsCheckbox">Show Done Only</label>
      <input
        id="doneWorkoutsCheckbox"
        type="checkbox"
        checked={showDoneWorkouts}
        onChange={updateShowDoneWorkouts}
      />
      <ul>
        {filteredWorkouts &&
          !showDoneWorkouts &&
          filteredWorkouts.incomplete.map((workout, index) => (
            <li key={index}>
              <p>
                {workout.sets}x sets of{' '}
                <strong>
                  {workout.reps}x{workout.exercise}
                </strong>{' '}
                with {workout.rest} seconds rest
              </p>
              {!workout.done && (
                <button onClick={(e) => completeWorkout(workout)}>Done</button>
              )}
              <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
              <button onClick={(e) => rerollWorkout(workout)}>ReRoll</button>
            </li>
          ))}
        {filteredWorkouts &&
          filteredWorkouts.complete.map((workout, index) => (
            <li key={index}>
              <p>
                {workout.sets}x sets of{' '}
                <strong>
                  {workout.reps}x{workout.exercise}
                </strong>{' '}
                with {workout.rest} seconds rest
              </p>
              {workout.done && <p>✅</p>}
              <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
