import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="min-h-full w-full flex flex-col justify-center items-center pt-30 pb-10">
        <span className="text-rotate text-7xl">
          <span className="justify-items-center">
            <span>CREATE</span>
            <span>READ</span>
            <span>UPDATE</span>
            <span>DELETE</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center text-[40px] pb-4">
        <p className="pb-8 text-center">Welcome To BookShelf</p>
        <button
          className="btn btn-accent"
          onClick={() => {
            navigate("/bookshelf");
          }}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Home;
