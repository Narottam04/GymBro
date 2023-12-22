import Dexie, { Table } from "dexie";

export interface routines {
  id?: string;
  name: string;
  date: string;
  //   dayOfWeek: string[];
}

export interface exercises {
  id?: string;
  exerciseId: string;
  name: string;
  routineId: string;
  dayOfWeek: string[];
}

// export interface logs {
//   id?: string;
//   routineId: string;
//   exerciseId: string;
//   date: string;
//   dayOfWeek: string;
//   sets: Array<{
//     set: number;
//     reps: number;
//     weight: number;
//   }>;
// }

// set number would be the index of the array
export interface logs {
  id: string;
  date: string;
  routineId: string;
  dayOfWeek: string;
  time: string;
  log: Array<{
    exerciseId: string;
    name: string;
    sets: Array<{
      type: string;
      reps: number;
      weight: number;
    }>;
  }>;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  routines!: Table<routines>;
  exercises!: Table<exercises>;
  logs!: Table<logs>;

  constructor() {
    super("gymbro");
    this.version(1).stores({
      routines: "id, name, date",
      exercises: "id, exerciseId, name, routineId, dayOfWeek",
      logs: "id, date, routineId, dayOfWeek, time, log"
    });
  }
}

export const db = new MySubClassedDexie();
