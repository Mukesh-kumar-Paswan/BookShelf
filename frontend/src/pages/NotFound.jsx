import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="min-h-full w-full flex flex-col justify-center items-center pt-50 pb-10">
        <span className="text-rotate text-7xl">
          <span className="justify-items-center">
            <span>Lost</span>
            <span>Error</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center text-[40px] pb-4">
        <p className="pb-8">404 Not Found</p>
        <Link className="btn btn-accent" to="/">
          Back To Home Page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
