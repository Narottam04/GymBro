import BackBodyPart from "../components/lvl0Comps/skeleton/BackBodyPart";
import FrontBodyPart from "../components/lvl0Comps/skeleton/FrontBodyPart";
import { useNavigate } from "react-router-dom";
import { useFilterExercise } from "../context/FilterExerciseContext";

const FilterExercise = () => {
  const navigate = useNavigate();
  const { setBodyPart } = useFilterExercise();
  return (
    <div>
      <div className="pl-4 pt-4">
        <h1 className="text-2xl font-bold ">Filter Exercises</h1>
        <p className="pt-2 ">
          Click on the body parts you want to work on and then click on Submit.
        </p>
      </div>
      <div className="mx-4">
        <button
          type="button"
          onClick={() => navigate("/app/exercise")}
          className="mb-2 mr-8 mt-4 w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 md:w-auto "
        >
          Submit Changes
        </button>
        <button
          type="button"
          onClick={() => setBodyPart([])}
          className="mb-2 mr-8 mt-2 w-full rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 md:w-auto "
        >
          Clear Changes
        </button>
      </div>
      <div className="mt-6 justify-center md:flex">
        <FrontBodyPart />
        <BackBodyPart />
      </div>
    </div>
  );
};

export default FilterExercise;
