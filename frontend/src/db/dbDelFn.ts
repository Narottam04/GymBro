import dayjs from "dayjs";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

// delete Routine
// TODO: Remove all the exercise entries associated with the routine
export async function deleteRoutine(id: string) {
  try {
    const deleteRoutine = await db.routines.delete(id);

    console.log(deleteRoutine);
  } catch (error) {
    console.log(error);
  }
}

// delete Exercise from routine
export async function deleteExerciseFromRoutine(id: string, day: string) {
  try {
    // fetch the exercise
    const exercise = await db.exercises.where("id").equals(id).first();

    // if the exercise is stored in only one day of week, remove it from the routine
    if (exercise?.dayOfWeek.length === 1) {
      await db.exercises.delete(id);
      return;
    }

    // if the exercise is stored in multiple days of week, remove it from the day the user has clicked
    if (exercise?.dayOfWeek && exercise.dayOfWeek.length > 1) {
      await db.exercises.update(id, {
        dayOfWeek: exercise.dayOfWeek.filter((dayOfWeek) => dayOfWeek !== day)
      });
    }
  } catch (error) {
    console.log(error);
  }
}
