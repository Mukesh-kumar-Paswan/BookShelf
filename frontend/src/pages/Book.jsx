import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Book = () => {
  const { user } = useContext(AuthContext);
  const book = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState(book.reviews);

  const notify = () =>
    toast.error("Failed to Delete a book", {
      position: "bottom-right",
    });

  const notify1 = () =>
    toast.error("Failed to Submit a review", {
      position: "bottom-right",
    });

  const handleReivew = (e) => {
    setReview(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const deleteBook = async () => {
    try {
      const book = await axios.delete(`/bookshelf/${id}`, {
        withCredentials: true,
      });
      // console.log(book);
      navigate("/bookshelf");
    } catch (e) {
      console.log(e);
      notify();
    }
  };

  return (
    <div >
      <div className="flex justify-center items-center flex-col h-full w-full py-5 gap-6 ">
        <div className="card bg-success-content w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div className="card-body items-center text-center">
            <h2 className="card-title pb-5">{book.title}</h2>
            <p>{book.description}</p>
            <div className="flex justify-center items-center gap-20 my-2">
              <p>Price : ₹{book.price}</p>
              <p>Author: {book.author}</p>
            </div>
            <div className="card-actions justify-end gap-20 pt-6">
              <Link className="btn btn-success" to={`/bookshelf/${id}/edit`}>
                Edit
              </Link>
              <button className="btn btn-error" onClick={deleteBook}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="box-border card bg-success-content w-full sm:w-3/4 md:w-1/2 lg:w-1/3 overflow-x-auto px-2">
          <form
            className="card-body items-center text-center"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const reviewResponser = await axios.post(
                  `/bookshelf/${id}/reviews`,
                  { review: { stars: rating, comments: review } },
                  { withCredentials: true },
                );
                // console.log(reviewResponser.data);
                const newReview = reviewResponser.data.review;
                newReview.author = { username: user };
                setReviewList([...reviewList, newReview]);
                setReview("");
                setRating(5);
              } catch (e) {
                console.log(e);
                notify1();
              }
            }}
          >
            <div className="flex justify-center gap-20">
              <div>
                <h2 className="card-title pb-5">{user}</h2>
              </div>
              <div className="rating gap-1">
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-red-400"
                  value={1}
                  aria-label="1 star"
                  onChange={handleRating}
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-orange-400"
                  aria-label="2 star"
                  onChange={handleRating}
                  value={2}
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-yellow-400"
                  value={3}
                  aria-label="3 star"
                  onChange={handleRating}
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-lime-400"
                  value={4}
                  aria-label="4 star"
                  onChange={handleRating}
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-green-400"
                  value={5}
                  aria-label="5 star"
                  onChange={handleRating}
                  defaultChecked
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 my-2">
              <textarea
                placeholder="Share Your Thoughts"
                className="textarea textarea-neutral"
                value={review}
                onChange={handleReivew}
                cols={180}
                rows={1}
              ></textarea>
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
      {reviewList.length ? (
        <div>
          {reviewList.map((ele, idx) => {
            return (
              <div key={idx}>
                <div className="flex justify-center items-center mb-5 ">
                  <div className="collapse bg-base-100 border border-base-300 mb-3 w-3/4">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold flex gap-18">
                      <p>{ele.author.username}</p>
                      <p>Stars : {ele.stars}</p>
                    </div>
                    <div className="collapse-content text-sm flex gap-6">
                      <div>{ele.comments} </div>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={async () => {
                          try {
                            await axios.delete(
                              `/bookshelf/${id}/reviews/${ele._id}`,
                              { withCredentials: true },
                            );
                            const updateList = reviewList.filter((itm) => {
                              return itm._id !== ele._id;
                            });
                            setReviewList(updateList);
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center mb-5">
            <div className="collapse bg-base-100 border border-base-300 mb-3 w-3/4">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                Share Your Thoughts
              </div>
              <div className="collapse-content text-sm">
                Be the First One to share Your thoughts ...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
