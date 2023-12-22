import { Link } from "react-router-dom";
interface Props {
  title: string;
  link?: string;
  btn?: string;
}
const NotFound = ({ title, link, btn }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* If workout is not visible route to create workout routine page */}
      <img src="/logo/confused-cat.png" alt="workout routine not found" className="w-[300px]  " />
      <h2 className="my-4 text-center text-2xl font-bold text-orange-400">{title}</h2>
      {btn && (
        <Link
          to={`${link}`}
          className="mb-4 rounded-lg bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-20 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          {btn}
        </Link>
      )}
    </div>
  );
};

export default NotFound;
