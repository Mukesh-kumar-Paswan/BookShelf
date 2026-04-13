import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

// bookshelf page
const Bookshelf = () => {
  const book = useLoaderData();

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-hidden justify-center justify-items-center items-center py-10">
      {book.map((ele) => {
        return (
          <div
            key={ele._id}
            className="card w-full bg-base-100 card-xl shadow-sm hover:shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title">{ele.title}</h2>
              <p>{ele.description}</p>
              <div className="justify-end card-actions">
                <Link
                  className="btn btn-warning-content"
                  to={`/bookshelf/${ele._id}`}
                >
                  Read
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className="fab">
        <Link className="btn btn-lg btn-circle btn-accent" to="/create">
          +
        </Link>
      </div>
    </div>
  );
};

export default Bookshelf;
