import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    setError("");
    setSuccess(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    if (!terms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setSuccess(true);
        event.target.reset();

        sendEmailVerification(user).then(() => {
          alert("Verification email sent. Please check your inbox.");
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" name="email" className="input" placeholder="Email" />
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="btn btn-xs bg-transparent border-0 absolute top-2 right-6 z-10 pointer-events-auto"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div>
                    <label className="label">
                      <input type="checkbox" name="terms" className="checkbox" />
                      Accept Terms and Conditions
                    </label>
                  </div>

                  <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                {success && <p className="text-green-500">User created successfully!</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
              </form>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="link link-hover text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
