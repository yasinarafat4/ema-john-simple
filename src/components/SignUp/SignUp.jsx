import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm.value;
    console.log(email, password, confirmPassword);

    setError("");
    if (password !== confirmPassword) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 character or longer");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h4 className="form-title">Sign Up</h4>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="confirm" required />
        </div>

        {/* error message shown */}
        <p style={{ color: "brown" }}>{error}</p>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p className="text">
        <small>
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-color">Login</span>
          </Link>
        </small>
      </p>
    </div>
  );
};

export default SignUp;
