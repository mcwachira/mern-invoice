import { FaHeartBroken, FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center items-start h-[94vh]">
        <h1 className="text-center text-[10rem] mt-56 font-bold">
          404 Not Found
        </h1>
        <div className="flex justify-center w-full gap-4 mt-8 text-4xl text-red-500">
          <FaHeartBroken className="animate-pulse" />
          <FaSadTear className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
