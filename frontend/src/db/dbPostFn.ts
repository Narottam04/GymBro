import dayjs from "dayjs";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

// create new routine
export async function createNewRoutine(routineName: string) {
  try {
    const addRoutine = await db.routines.add({
      id: uuidv4(),
      name: routineName,
      date: dayjs().format("YYYY-MM-DD")
    });
  } catch (error) {
    console.log(error);
  }
}

// add exercise to routine - multiple days
// Todo: check if the exercise exist on that day for the particular routine
export async function addExerciseToRoutine(
  routineId: string,
  exerciseId: string,
  day: string[],
  name: string
) {
  try {
    const addExercise = await db.exercises.add({
      id: uuidv4(),
      routineId: routineId,
      exerciseId: exerciseId,
      dayOfWeek: day,
      name: name
    });

    console.log(addExercise);
  } catch (error) {
    console.log(error);
  }
}

// log exercise
export async function addLog(
  routineId: string,
  date: string,
  dayOfWeek: string,
  time: string,
  log: Array<{
    exerciseId: string;
    name: string;
    sets: Array<{
      type: string;
      reps: number;
      weight: number;
    }>;
  }>
) {
  try {
    const addLog = await db.logs.add({
      id: uuidv4(),
      routineId,
      date,
      dayOfWeek,
      time,
      log
    });

    console.log(addLog);
  } catch (error) {
    console.log(error);
  }
}
