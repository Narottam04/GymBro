import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

interface props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
}

export default function ModalBasic({ openModal, setOpenModal, videoUrl }: props) {
  //   const [openModal, setOpenModal] = useState<boolean>(false);
  const { pathname } = useLocation();

  console.log(pathname, videoUrl);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  //   useEffect(() => {
  //     if (videoRef && videoRef.current !== null) {
  //       videoRef.current.src = videoUrl;
  //     }
  //   }, []);
  return (
    <>
      {openModal && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-3a content-3a"
              aria-modal="true"
              tabIndex={-1}
              role="dialog"
            >
              {/*    <!-- Modal --> */}
              <div
                ref={wrapperRef}
                className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10 lg:max-w-2xl"
                id="modal"
                role="document"
              >
                {/*        <!-- Modal header --> */}
                <header id="header-3a" className="flex items-center gap-4">
                  <h3 className="flex-1 text-xl font-medium text-slate-700">Exercise Video</h3>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                    aria-label="close dialog"
                  >
                    <span className="relative only:-mx-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-79 desc-79"
                      >
                        <title id="title-79">Icon title</title>
                        <desc id="desc-79">A more detailed description of the icon</desc>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </header>
                {/*        <!-- Modal body --> */}
                <iframe
                  // ref={videoRef}
                  src={`${videoUrl}`}
                  //   src={videoUrl}
                  className="aspect-video h-[500px] max-w-xl lg:max-w-2xl"
                  title="React Query Makes Writing React Code 200% Better"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
