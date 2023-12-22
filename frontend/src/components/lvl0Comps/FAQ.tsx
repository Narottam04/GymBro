import { useState } from "react";

export const Faq = ({ title, children }: { title: string; children: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 flex items-center focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>

        <h1 className="mx-4 text-left text-lg text-black">{title}</h1>
      </button>

      {isOpen && (
        <div className="mt-8 flex ">
          <span className="border border-blue-500"></span>
          <p className="max-w-3xl px-4 text-gray-300">{children}</p>
        </div>
      )}
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
    </div>
  );
};
