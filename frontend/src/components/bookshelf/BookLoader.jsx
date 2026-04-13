import axios from "axios";
import { toast } from "react-toastify";

const BookLoader = ({ params }) => {
  const id = params.id;

  const notify = () =>
    toast.error("Failed to create a book", {
      position: "bottom-right",
    });

  const Book = async () => {
    try {
      const response = await axios.get(
        `/bookshelf/${id}`,
        {
          withCredentials: true,
        },
      );
      // console.log(response.data);
      return response.data
    } catch (e) {
      console.log(e);
      notify();
      return null;
    }
  };

  return Book();
};

export default BookLoader;
