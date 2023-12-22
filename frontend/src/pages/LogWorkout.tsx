import { useLocation } from "react-router-dom";
import db from "../utils/filteredExerciseDb";
import { useEffect, useState } from "react";
import ExerciseLog from "../components/lvl0Comps/Cards/ExerciseLog";
import useLogStore from "../utils/store";
import dayjs from "dayjs";
import { addLog } from "../db/dbPostFn";
const LogWorkout = () => {
  const [Day, setDay] = useState<string>("");
  const { logs, resetLog } = useLogStore();

  let location = useLocation();
  const data = location.state.data;
  const allExercises = location.state.allExercises;

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  function filterExerciseData(day: string) {
    const filterExercise = allExercises?.filter((exercise) => exercise?.dayOfWeek?.includes(day));

    const res = filterExercise?.map((exercise) => {
      const findExercise = db.find((dbExercise) => dbExercise?.id === exercise?.exerciseId);
      return findExercise;
    });

    return res;
  }

  const addNewSet = () => {
    const newSet = { type: "N", reps: 0, weight: 0 }; // Default values, you can modify this
    setSets((prevSets) => [...prevSets, newSet]);
  };

  //  Reset the log state when the component is unmounted
  useEffect(() => {
    return () => {
      resetLog();
    };
  }, []);

  function handleSubmitLog(log: object) {
    // TODO: Add a toast to show that the log has been submitted
    // TODO: do some extensive checks to make sure the log is valid

    const logs = Object.values(log);
    if (logs.length > 0) {
      const todayDate = new Date().toISOString();
      const dayOfWeek = dayjs().format("dddd");
      const time = dayjs().format("HH:mm");
      const routineId = data?.id;

      addLog(routineId, todayDate, dayOfWeek, time, logs);
    }
  }

  console.log(Object.values(logs));
  return (
    <div className="mx-4">
      <h1 className="mb-3 mt-4   text-3xl font-bold">New Log - {data?.name}</h1>
      {Day ? (
        <p className="font-semibold">Log your Workout</p>
      ) : (
        <p className="font-semibold text-orange-500">
          Select a day to log, feel free to interchange your workout routine days.
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          handleSubmitLog(logs);
        }}
        className=" mr-8 mt-4 w-full rounded-lg bg-gradient-to-r from-orange-600 via-orange-400 to-orange-500 px-20 py-2.5 text-center text-base font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 md:w-auto "
      >
        Log Exercise 💪
      </button>
      {/* create card: show when user has to select the day*/}
      <div className={`${Day ? "hidden" : "flex "} mt-6 flex-wrap gap-4 `}>
        {daysOfWeek.map((day) => (
          <div
            className="mb-4 w-full cursor-pointer rounded-xl bg-gradient-to-r from-orange-300 via-yellow-500 to-orange-600 p-0.5 shadow-xl transition hover:shadow-sm lg:w-[450px]"
            onClick={() => {
              const checkExercise = allExercises.some((item) => item.dayOfWeek.includes(day));

              if (checkExercise) {
                setDay(day);
              }
              // TODO: add toast if no exercise is saved for the day
            }}
          >
            <div className="rounded-[10px] bg-white p-4">
              <h3 className="mt-0.5 text-lg font-medium text-gray-900">{day}</h3>
              <p className="mt-2 text-sm text-gray-500">Muscle Targeted:</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {filterExerciseData(day)?.length > 0 ? (
                  // show chips for the muscle that has to be targeted on the particular day
                  filterExerciseData(day)
                    ?.map((exercise) => exercise?.bodyPart)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .slice(0, 4)
                    .map((uniqueBodyPart) => (
                      <div
                        key={uniqueBodyPart}
                        className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white"
                      >
                        {uniqueBodyPart}
                      </div>
                    ))
                ) : (
                  <div className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                    Rest Day - No Exercise Saved
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* create card: show when user has selected the day */}
      {Day &&
        filterExerciseData(Day)?.map((exercise: object, index: number) => (
          <ExerciseLog exercise={exercise} index={index} />
        ))}
    </div>
  );
};

export default LogWorkout;
