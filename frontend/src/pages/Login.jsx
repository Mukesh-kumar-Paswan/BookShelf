import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn , setUser } = useContext(AuthContext);

  const notify = () =>
    toast.error("Invalid username or password!", {
      position: "bottom-right",
    });
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "/signin",
            {
              username: username,
              password: password,
            },
            { withCredentials: true },
          );
          setUser(response.data.user.username);
          setIsLoggedIn(true);
          navigate("/bookshelf");
        } catch (e) {
          console.log(e);
          notify();
        }
      }}
      data-theme="luxury"
      className="flex grow justify-center items-center py-20"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">UserName</label>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export default Login;
