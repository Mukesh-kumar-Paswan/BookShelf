import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const App = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1 overflow-x-auto mx-8 my-4">
        {isLoading ? <Loader /> : <Outlet />}
      </div>
      <div className="overflow-hidden">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
