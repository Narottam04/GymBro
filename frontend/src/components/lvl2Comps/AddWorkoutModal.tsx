import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import NotFound from "../lvl0Comps/NotFound";
import { MdClose } from "react-icons/md";
import { addExerciseToRoutine, createNewRoutine } from "../../db/dbPostFn";
import { useQuery } from "@tanstack/react-query";
import { getAllRoutines } from "../../db/dbGetFn";
import { set } from "react-hook-form";

interface props {
  openWorkoutModal: boolean;
  setOpenWorkoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseId: string;
  name: string;
}

export default function AddWorkoutModal({
  openWorkoutModal,
  setOpenWorkoutModal,
  exerciseId,
  name
}: props) {
  const [routineName, setRoutineName] = useState("");
  const [routineId, setRoutineId] = useState("");
  const [days, setDays] = useState<string[]>([]);

  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // const { user } = useAuth();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenWorkoutModal(false);
        setRoutineName("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // handle add exercise
  const handleAddExercise = (day: string) => {
    if (!days.includes(day)) {
      setDays([...days, day]);
    } else {
      setDays(days.filter((d) => d !== day));
    }
  };

  // fetch all routines first time and also when routineName changes tanstack query
  const {
    data: allRoutines,
    refetch: refetchAllRoutines,
    isLoading,
    error,
    isSuccess
  } = useQuery({ queryKey: ["allRoutines"], queryFn: getAllRoutines });

  return (
    <>
      {openWorkoutModal && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-3a content-3a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              {/*  Modal  */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden overflow-y-auto rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 lg:max-w-2xl"
                id="modal"
                role="document"
              >
                {/* Modal header */}
                <header id="header-3a" className="flex items-center gap-4">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">Add Exercise</h3>
                  <button
                    onClick={() => {
                      setRoutineName("");
                      setRoutineId("");
                      setDays([]);
                      setOpenWorkoutModal(false);
                    }}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-orange-500 transition duration-300 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-200 focus:text-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-orange-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <MdClose className="h-5 w-5" />
                    </span>
                  </button>
                </header>

                {/* if Routine is not present first create routine */}
                {allRoutines?.length === 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 ">
                      Routine Name{" "}
                    </label>
                    <div className="relative mb-6">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaDumbbell className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        id="input-group-1"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="New Routine Name..."
                      />
                    </div>
                    {/* check if routine name is present or now */}
                    <button
                      type="button"
                      onClick={() => {
                        if (routineName) {
                          createNewRoutine(routineName);
                          setRoutineName("");
                          refetchAllRoutines();
                        }
                      }}
                      className=" w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300"
                    >
                      Create New Routine
                    </button>
                  </div>
                )}

                {/* If Routine is present show this modal*/}
                {allRoutines.length > 0 && (
                  <>
                    <div
                      className={`grid cursor-pointer grid-cols-2 gap-4 ${
                        routineId ? "hidden" : ""
                      }`}
                    >
                      {allRoutines?.map((routine) => (
                        <div
                          key={routine?.id}
                          onClick={() => setRoutineId(routine?.id)}
                          className=" rounded-xl bg-gradient-to-r from-orange-300 via-yellow-500 to-orange-600 p-0.5 shadow-xl transition hover:shadow-sm"
                        >
                          <div className="rounded-[10px] bg-white p-6">
                            <div>
                              <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                {routine?.name}
                              </h3>
                            </div>

                            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                              {routine?.date}
                            </time>
                          </div>
                        </div>
                      ))}
                    </div>

                    {routineId !== "" && (
                      <div className="grid grid-cols-2 gap-4">
                        {/* show days of week */}
                        {daysOfWeek.map((day, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleAddExercise(day)}
                            className={`rounded-xl ${
                              days.includes(day) ? "bg-gradient-to-r" : "bg-gray-300"
                            } cursor-pointer from-orange-300 via-yellow-500 to-orange-600 p-0.5 shadow-xl transition hover:bg-gradient-to-r hover:shadow-sm`}
                          >
                            <div className="rounded-[10px] bg-white p-4">
                              <div>
                                <h3 className="mt-0.5 text-lg font-medium text-gray-900">{day}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        addExerciseToRoutine(routineId, exerciseId, days, name);
                        setDays([]);
                        setRoutineId("");
                        setOpenWorkoutModal(false);
                      }}
                      className=" w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300"
                    >
                      Add Exercise
                    </button>
                  </>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
