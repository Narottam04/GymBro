import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { functions } from "../utils/init-appwrite";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import ModalBasic from "../components/lvl0Comps/Modals/VideoModal";
import ImageSkeleton from "../components/lvl0Comps/skeleton/ImageSkeleton";
import AddWorkoutModal from "../components/lvl2Comps/AddWorkoutModal";

interface Video {
  id: string;
  title: string;
  thumbnail: {
    thumbnails: {
      url: string;
    }[];
  };
}

const ExerciseDetails = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [openModal, setOpenModal] = useState(false);

  const [openWorkoutModal, setOpenWorkoutModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const location = useLocation();
  const queryClient = useQueryClient();

  const { id, url, title, bodyPart, target, equipment, steps } = location.state.data;
  async function fetchVideo(title: string) {
    const res = await functions.createExecution(
      import.meta.env.VITE_APPWRITE_FUNCTION_ID,
      `{"query": "${title}"}`
    );

    const video = JSON.parse(res?.response);

    return video;
  }

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["videos", id],
    queryFn: () => fetchVideo(title)
  });

  // console.log(data);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 767) {
        setSlidesToShow(1);
      } else if (windowWidth <= 1000) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formatSteps: JSX.Element[] = steps.split("\n").map((line: string, index: number) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
  return (
    <div className="mx-4 mt-8 lg:mx-8">
      {/* video modal */}
      <ModalBasic openModal={openModal} setOpenModal={setOpenModal} videoUrl={videoUrl} />
      <AddWorkoutModal
        openWorkoutModal={openWorkoutModal}
        setOpenWorkoutModal={setOpenWorkoutModal}
        exerciseId={id}
        name={title}
      />
      <h1 className="mb-6 text-2xl font-bold capitalize lg:text-4xl">{title}</h1>
      <div className="flex flex-col gap-8  lg:flex-row">
        <img
          className="mx-auto h-[240px] w-[240px] rounded-t-lg lg:mx-0 lg:h-[460px] lg:w-[460px]"
          src={url}
          alt={title}
        />
        {/* <div>
          <p>{bodyPart}</p>
          <p>{target}</p>
          <p>{equipment}</p>
        </div> */}

        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 ">
            <tbody>
              <tr className="bg-white ">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4  text-xl font-medium text-gray-900"
                >
                  Body Part
                </th>
                <td className="px-6 py-4 text-xl capitalize">{bodyPart}</td>
              </tr>
              <tr className="bg-white ">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-xl font-medium text-gray-900"
                >
                  Target Muscle
                </th>
                <td className="px-6 py-4 text-xl capitalize">{target}</td>
              </tr>
              <tr className="bg-white ">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-xl font-medium text-gray-900"
                >
                  Equipment Used
                </th>
                <td className="px-6 py-4 text-xl capitalize">{equipment}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setOpenWorkoutModal(true)}
              className="mb-2 mr-8 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300 "
            >
              Add To Workout Plan
            </button>
          </div>
        </div>
      </div>
      <h2 className="my-4 text-2xl font-bold capitalize lg:text-3xl">Releated Videos</h2>
      {isLoading && (
        <div className="flex justify-center gap-5">
          {[...Array(slidesToShow).keys()].map((num) => (
            <ImageSkeleton />
          ))}
        </div>
      )}
      {isSuccess && (
        <div className="mx-8">
          {data && (
            <Glider draggable hasArrows slidesToShow={slidesToShow} slidesToScroll={1}>
              {data?.items.map((video: Video, idx: number) => (
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setVideoUrl(`https://www.youtube.com/embed/${video?.id}`);
                  }}
                  className="m-4 "
                  key={idx}
                >
                  <div className="overflow-hidden rounded-xl  bg-white text-slate-500 shadow-md shadow-slate-200">
                    {/* <!--  Image --> */}
                    <figure>
                      <img
                        src={video?.thumbnail?.thumbnails[0]?.url}
                        alt="card image"
                        className="aspect-video w-full rounded-xl"
                      />
                    </figure>
                    {/* <!-- Body--> */}
                    <div className="p-6">
                      <header className="">
                        <h3 className="line-clamp-1 text-lg font-medium text-slate-700 lg:text-xl">
                          {video?.title}
                        </h3>
                        <p className="text-sm text-slate-400">{video?.channelTitle}</p>
                      </header>
                    </div>
                  </div>
                </div>
              ))}
            </Glider>
          )}
        </div>
      )}
      <h2 className="my-4 text-2xl font-bold capitalize lg:text-3xl">Detailed Instructions</h2>
      <div className="w-xl">
        <p className="text-base lg:text-lg ">{formatSteps}</p>
      </div>
    </div>
  );
};

export default ExerciseDetails;
