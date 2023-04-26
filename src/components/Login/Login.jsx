import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);

  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          setError("User not found. Please Sign Up before Login.");
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div className="form-container">
      <h4 className="form-title">Login</h4>
      <form onSubmit={handleLogIn}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show ? "text" : "password"} name="password" required />
          <p onClick={() => setShow(!show)}>
            <small>
              {show ? <span>Hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
        </div>
        {/* show the error message if there's one */}
        {error && <p style={{ color: "brown" }}>{error}</p>}
        <input className="btn-submit" type="submit" value="Login" />
      </form>

      <p className="text">
        <small>
          New to Ema-John?{" "}
          <Link to="/signup">
            <span className="text-color">Create New Account</span>
          </Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
