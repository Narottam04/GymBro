import dayjs from "dayjs";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

// Get All routines
export async function getAllRoutines() {
  try {
    const routines = await db.routines.toArray();
    return routines;
  } catch (error) {
    console.log(error);
  }
}

// Get All Exercises related to a routine
export async function getAllExercises(routineId: string) {
  try {
    const exercises = await db.exercises.where("routineId").equals(routineId).toArray();

    // console.log(exercises);
    return exercises;
  } catch (error) {
    console.log(error);
  }
}
