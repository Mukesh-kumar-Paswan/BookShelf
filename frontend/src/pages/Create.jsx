import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const notify = () =>
    toast.error("Failed to create a book", {
      position: "bottom-right",
    });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "/",
            { book: formData },
            { withCredentials: true },
          );
          // console.log(response);
          navigate("/bookshelf");
        } catch (e) {
          console.log(e);
          notify();
        }
      }}
    >
      <div className="flex grow justify-center items-center py-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-lg border p-4">
          <legend className="fieldset-legend">Create A Book</legend>

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
            name="description"
            value={formData.description}
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
            value={formData.author}
            onChange={handleChange}
            name="author"
            required
          />

          <button className="btn btn-neutral mt-4">Create</button>
        </fieldset>
      </div>
    </form>
  );
};

export default Create;
