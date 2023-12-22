import { useEffect, useState } from "react";
import useLogStore from "../../../utils/store";

interface ExerciseLogProps {
  //   exercise: {
  //     id: string;
  //     gifUrl: string;
  //     name: string;
  //     target: string;
  //     bodyPart: string;
  //     equipment: string;
  //     steps: string;
  //   };

  exercise: object;
  index: number;
}

const ExerciseLog = ({ exercise, index }: ExerciseLogProps) => {
  const { updateLog } = useLogStore();

  const [sets, setSets] = useState([
    {
      type: "N",
      reps: 0,
      weight: 0
    }
  ]);

  const addNewSet = () => {
    const newSet = { type: "N", reps: 0, weight: 0 };
    setSets((prevSets) => [...prevSets, newSet]);
  };

  const handleInputChange = (value: string | number, field: string, setIndex: number) => {
    setSets((prevSets) => {
      const updatedSets = [...prevSets];
      updatedSets[setIndex][field] = value;
      return updatedSets;
    });

    // Create a log entry for the specific exercise ID
    const logEntry = {
      [exercise.id]: { exerciseId: exercise?.id, name: exercise?.name, sets: [...sets] }
    };
    updateLog(logEntry);
  };

  return (
    <>
      <div className="relative my-4  rounded-lg border border-gray-200 bg-white shadow ">
        <div>
          <div className="flex ">
            <div>
              <img
                className="mx-auto h-[200px] w-[200px] rounded-t-lg object-contain lg:h-[360px] lg:w-[360px]"
                src={exercise?.gifUrl}
                alt={exercise?.name}
              />
            </div>
            <div className=" p-5 lg:w-auto">
              <h5 className="mb-2 font-bold capitalize tracking-tight text-gray-900 md:line-clamp-1 lg:text-2xl ">
                {exercise?.name}
              </h5>
              <div className="flex flex-wrap md:pt-2">
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ">
                  {exercise?.target}
                </div>
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ">
                  {exercise?.bodyPart}
                </div>
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs  font-medium text-yellow-800 ">
                  {exercise?.equipment}
                </div>
              </div>
              {/* show table to log exercise */}
              <div className="hidden sm:block">
                <div className="mb-1 mt-2 flex">
                  <p className=" text-gray-500">Type</p>
                  <p className=" ml-[85px] text-gray-500">Set</p>
                  <p className=" ml-[76px] text-gray-500">Reps</p>
                  <p className=" ml-[62px] text-gray-500">Weight</p>
                </div>
                {sets.map((set, index) => (
                  <div className=" flex">
                    <select
                      id="small"
                      className="w-35 mb-6 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      value={set.type}
                      onChange={(e) => handleInputChange(e.target.value, "type", index)}
                    >
                      {/* <option selected>Type</option> */}
                      <option value="N" selected>
                        Normal
                      </option>
                      <option value="S">Super Set</option>
                      <option value="D">Drop Set</option>
                    </select>

                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="mb-6 ml-4 block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      value={index + 1}
                      placeholder="Set"
                      disabled
                    />

                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="mb-6 ml-4 block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Reps"
                      required
                      value={set.reps}
                      onChange={(e) => handleInputChange(e.target.value, "reps", index)}
                    />

                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className="mb-6 ml-4 block w-[90px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Weight"
                      required
                      value={set.weight}
                      onChange={(e) => handleInputChange(e.target.value, "weight", index)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewSet}
                  className="mb-12 mr-8 rounded-lg bg-gradient-to-r from-orange-400 via-orange-400 to-orange-500 px-20 py-2.5 text-center text-sm font-medium text-black text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300  "
                >
                  Add New Set
                </button>
              </div>
            </div>
          </div>
          {/* show table to log exercise */}
          <div className="mx-4 block sm:hidden">
            <div className="mb-1 mt-2 flex">
              <p className=" text-gray-500">Type</p>
              <p className=" ml-[65px] text-gray-500">Set</p>
              <p className=" ml-[30px] text-gray-500">Reps</p>
              <p className=" ml-[20px] text-gray-500">Weight</p>
            </div>
            {sets.map((set, index) => (
              <div className=" flex">
                <select
                  id="small"
                  className="mb-6 block w-20  rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={set.type}
                  onChange={(e) => handleInputChange(e.target.value, "type", index)}
                >
                  {/* <option selected>Type</option> */}
                  <option value="N" selected>
                    Normal
                  </option>
                  <option value="S">Super Set</option>
                  <option value="D">Drop Set</option>
                </select>

                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="mb-6 ml-4 block w-10 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  value={index + 1}
                  placeholder="Set"
                  disabled
                />

                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="mb-6 ml-4 block w-10 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Reps"
                  required
                  value={set.reps}
                  onChange={(e) => handleInputChange(e.target.value, "reps", index)}
                />

                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="mb-6 ml-4 block w-10 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Weight"
                  required
                  value={set.weight}
                  onChange={(e) => handleInputChange(e.target.value, "weight", index)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addNewSet}
              className="sm:auto mb-12 mr-8 w-full rounded-lg bg-gradient-to-r from-orange-400 via-orange-400 to-orange-500 px-20 py-2.5 text-center text-sm font-medium text-black text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 "
            >
              Add New Set
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseLog;
