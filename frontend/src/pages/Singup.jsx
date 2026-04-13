import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Singup = () => {

  const navigate = useNavigate();
  const {setUser , setIsLoggedIn} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const notify = () =>
      toast.error("SignUp Failed!", {
        position: "bottom-right",
      });

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/signup" , {...formData} , {withCredentials : true})
        // console.log(response);
        setUser(response.data.user.username);
        setIsLoggedIn(true);
        navigate("/bookshelf");
      } catch (e) {
        console.log(e);
        notify();
      }
    }}>
      <div className="flex grow justify-center items-center py-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">SingUp</legend>

          <label className="label">UserName</label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="label">Email</label>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-neutral mt-4">SignUp</button>
        </fieldset>
      </div>
    </form>
  );
};

export default Singup;
