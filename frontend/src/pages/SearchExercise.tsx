import { matchSorter } from "match-sorter";
import exerciseDb, { Exercise } from "../utils/filteredExerciseDb";

import exerciseVecDb from "../utils/ExerciseDbWithVec.ts";
import { useState, useEffect, useCallback } from "react";
import ExerciseCards from "../components/lvl0Comps/Cards/Exercise";
import { debounce } from "../utils/debounce";
import { EmbeddingIndex, getEmbedding } from "client-vector-search";
const SearchExercise = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Exercise[] | []>([]);

  const index = new EmbeddingIndex(exerciseVecDb);

  const debouncedSearchResult = useCallback(
    debounce(async (query) => {
      if (query !== "") {
        // const data = matchSorter(exerciseDb, `${query}`, {
        //   keys: ["name", "target", "bodyPart", "equipment", "exerciseInstructions"]
        // }) as Exercise[];
        const queryEmbedding = await getEmbedding(query); // Query embedding
        const results = await index.search(queryEmbedding, { topK: 12 });

        const searchRes = results.map((result) => result.object);

        setData(searchRes);
        // setData(data);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSearchResult(search);
  }, [search]);

  return (
    <>
      <form className="fixed left-0 right-0 mx-auto   mb-12 mt-6 flex items-center px-4 lg:left-[325px]">
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
            id="simple-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Search"
            required
          />
        </div>
      </form>

      <div className="mx-4 flex-wrap gap-4 pt-20 lg:flex">
        {data.map((exercise, idx) => (
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
    </>
  );
};

export default SearchExercise;
