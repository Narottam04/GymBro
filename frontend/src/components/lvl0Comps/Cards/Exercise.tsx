import { Link } from "react-router-dom";
import DeleteExercise from "../Dropdowns/DeleteExercise";

interface ExerciseProps {
  id: string;
  url: string;
  title: string;
  bodyPart: string;
  target: string;
  equipment: string;
  steps: string;
  deleteExercise?: boolean;
  deleteExerciseProps?: {
    id: string;
    day: string;
    refetchRoutineExercise: () => void;
  };
}

export default function ExerciseCards({
  id,
  url,
  title,
  bodyPart,
  target,
  equipment,
  steps,
  deleteExercise,
  deleteExerciseProps
}: ExerciseProps) {
  const data: ExerciseProps = {
    id,
    url,
    title,
    bodyPart,
    target,
    steps,
    equipment,
    deleteExercise
  };
  return (
    <>
      <div className="relative my-4 rounded-lg  border border-gray-200 bg-white shadow md:max-w-[400px] lg:max-w-[300px] 2xl:max-w-[350px] ">
        <Link to={`/app/exercise/${id}`} state={{ data: data }}>
          <div className="flex md:block">
            <div>
              <img
                className="mx-auto h-[200px]	 w-[200px] rounded-t-lg object-contain lg:h-[360px] lg:w-[360px]"
                src={url}
                alt={title}
              />
            </div>
            <div className="w-[300px] p-5 lg:w-auto">
              <h5 className="mb-2 font-bold capitalize tracking-tight text-gray-900 md:line-clamp-1 lg:text-2xl ">
                {title}
              </h5>
              <div className="flex flex-wrap md:pt-2">
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ">
                  {target}
                </div>
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ">
                  {bodyPart}
                </div>
                <div className="my-2 mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs  font-medium text-yellow-800 ">
                  {equipment}
                </div>
              </div>
            </div>
          </div>
        </Link>
        {deleteExercise && deleteExerciseProps && (
          <div className="absolute right-3 top-3 z-[50000]">
            <DeleteExercise
              id={deleteExerciseProps.id}
              day={deleteExerciseProps.day}
              refetch={deleteExerciseProps.refetchRoutineExercise}
            />
          </div>
        )}
      </div>
    </>
  );
}
