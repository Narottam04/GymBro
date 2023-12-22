import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import db from "../utils/filteredExerciseDb";
import ExerciseCards from "../components/lvl0Comps/Cards/Exercise";
import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "../db/dbGetFn";
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import NotFound from "../components/lvl0Comps/NotFound";

const UserWorkout = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

  const handleOpenAnswer = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  let location = useLocation();
  const data = location.state.data;

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const {
    data: allExercises,
    refetch,
    isLoading,
    error,
    isSuccess
  } = useQuery({
    queryKey: ["AllExercisesOfRoutine", { id: data?.id }],
    queryFn: async () => {
      const allExercises = await getAllExercises(data?.id);
      return allExercises;
    }
  });

  function filterExerciseData(day: string) {
    const filterExercise = allExercises?.filter((exercise) => exercise?.dayOfWeek?.includes(day));

    const res = filterExercise?.map((exercise) => {
      let findExercise = db.find((dbExercise) => dbExercise?.id === exercise?.exerciseId);
      findExercise = { ...findExercise, documentId: exercise?.id };
      return findExercise;
    });

    return res;
  }

  return (
    <div className="mx-4">
      <h1 className="mb-6 mt-4   text-3xl font-bold">{data?.name}</h1>

      <Link
        to={`/app/exercise/workout/log/${data?.id}}`}
        state={{ data: data, allExercises: allExercises }}
        className="mb-12 mr-8 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-black text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 "
      >
        Log Workout
      </Link>

      {daysOfWeek.map((day, idx) => (
        <>
          <div
            className="mt-8 space-y-3 overflow-hidden border-b"
            key={idx}
            onClick={() => handleOpenAnswer(idx)}
          >
            <h4 className="flex cursor-pointer items-center justify-between pb-5 text-lg font-medium text-gray-700">
              {day}
              {openIndex === idx ? (
                <RiSubtractLine className="h-5 w-5" />
              ) : (
                <MdAdd className="h-5 w-5" />
              )}
            </h4>
          </div>
          <div
            className={` duration-300`}
            style={openIndex === idx ? { height: "auto" } : { height: "0px", display: "none" }}
          >
            <div className="mx-4 flex-wrap gap-4 md:flex">
              {isSuccess &&
                filterExerciseData(day)?.map((exercise, idx) => (
                  <ExerciseCards
                    id={exercise!.id}
                    url={exercise!.gifUrl}
                    title={exercise!.name}
                    target={exercise!.target}
                    bodyPart={exercise!.bodyPart}
                    equipment={exercise!.equipment}
                    steps={exercise!.exerciseInstructions}
                    deleteExercise={true}
                    deleteExerciseProps={{
                      id: exercise?.documentId,
                      day: day,
                      refetchRoutineExercise: refetch
                    }}
                  />
                ))}
              {filterExerciseData(day)?.length === 0 && (
                <div className="flex w-full items-center justify-center">
                  <NotFound title="No Exercise Found!" link="/app/exercise" btn="Find Exercise" />
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default UserWorkout;
