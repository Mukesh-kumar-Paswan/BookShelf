import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const book = useLoaderData();
  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: book.title,
    description: book.description,
    price: book.price,
    author: book.author,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const notify = () =>
    toast.error("Failed to Edit a book", {
      position: "bottom-right",
    });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`/${id}` , {book : formData} , {withCredentials : true})
          // console.log(response);
          navigate(`/bookshelf/${id}`);
        } catch (e) {
          console.log(e);
          notify();
        }
      }}
    >
      <div className="flex grow justify-center items-center py-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-lg border p-4">
          <legend className="fieldset-legend">Edit A Book</legend>

          <label className="label">Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label className="label">Description</label>
          <textarea
            className="textarea w-full"
            placeholder="Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
            required
          ></textarea>

          <label className="label">Price</label>
          <input
            type="Number"
            className="input w-full"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label className="label">Author</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <button className="btn btn-neutral mt-4">Edit</button>
        </fieldset>
      </div>
    </form>
  );
};

export default Edit;
