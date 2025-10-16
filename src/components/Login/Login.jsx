import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import auth from "../../firebase/firebase.init";

const Login = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (!user.emailVerified) {
          alert("Please verify your email address");
        } else {
          alert("Login successful");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleForgotPassword = () => {
    console.log("forget Password");
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input ref={emailRef} type="email" name="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input type="password" name="password" className="input" placeholder="Password" />
                <div onClick={handleForgotPassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              {error && <p className="text-red-500 mt-2">Error: {error}</p>}
            </form>
            <div>
              <p>
                Don’t you have an account?{" "}
                <Link to="/register" className="link link-hover text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
