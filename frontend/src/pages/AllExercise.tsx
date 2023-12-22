import { useInfiniteQuery } from "@tanstack/react-query";
import ExerciseCards from "../components/lvl0Comps/Cards/Exercise";
import exerciseDb from "../utils/filteredExerciseDb.ts";
import { Link } from "react-router-dom";
import { useFilterExercise } from "../context/FilterExerciseContext.tsx";
const AllExercise = () => {
  const { bodyPart } = useFilterExercise();

  const {
    status,
    data: exerciseData,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage
  } = useInfiniteQuery(
    ["exercise"],
    async ({ pageParam = 1 }) => {
      let data = exerciseDb;
      if (bodyPart.length > 0) {
        data = exerciseDb.filter((exercise) => {
          return bodyPart.includes(exercise.target);
        });
      }

      // console.log("filtered data io ", data);
      // console.log(exerciseDb.slice((pageParam - 1) * 9, pageParam * 9));
      return data.slice((pageParam - 1) * 12, pageParam * 12);
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: {
        pages: [exerciseDb.slice(0, 12)],
        pageParams: [1]
      }
    }
  );
  // console.log(exerciseData);
  return (
    <>
      <h1 className="mx-4 mb-8 mt-4 text-4xl font-bold">Exercise</h1>
      <div className="mx-1 mb-6 flex ">
        <Link to="/app/exercise/search" className="w-full">
          <div className=" flex cursor-pointer items-center  px-4 ">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                placeholder="Search Exercise..."
              />
            </div>
          </div>
        </Link>
        <Link
          to="/app/exercise/filter"
          className="m rounded-md bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-5 py-2 text-sm  font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 md:px-12 "
        >
          Filter
        </Link>
      </div>
      <div>
        {/* {exerciseDb.slice(0, 12).map((exercise, idx) => (
          <ExerciseCards
            id={idx}
            url={exercise?.gifUrl}
            title={exercise?.name}
            target={exercise?.target}
            bodyPart={exercise?.bodyPart}
            equipment={exercise?.equipment}
            steps={exercise?.exerciseInstructions}
          />
        ))} */}
        {exerciseData?.pages.map((page, idx) => (
          <div className="mx-4 flex-wrap gap-4 md:flex" key={idx}>
            {page.map((exercise) => (
              <ExerciseCards
                id={exercise?.id}
                url={exercise?.gifUrl}
                title={exercise?.name}
                target={exercise?.target}
                bodyPart={exercise?.bodyPart}
                equipment={exercise?.equipment}
                steps={exercise?.exerciseInstructions}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mb-12 mt-6 flex justify-center">
        <button
          onClick={() => fetchNextPage()}
          type="button"
          className="mb-2 mr-2 bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 "
        >
          Show More Exercises
        </button>
      </div>
    </>
  );
};

export default AllExercise;
