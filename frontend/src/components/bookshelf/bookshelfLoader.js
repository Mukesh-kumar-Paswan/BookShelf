import axios from "axios";

// bookshelf Loader function
export const bookshelfLoader = async () => {
  const response = await axios.get("/", {
    withCredentials: true,
  });

  // await new Promise(resolve => setTimeout(resolve, 5000));

  return response.data;
};