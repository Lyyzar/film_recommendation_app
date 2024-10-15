import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const SignIn = (props: {
  isSignInOpen: boolean;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpOpen: boolean;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user?.getIdToken();
      if (token) {
        localStorage.setItem("token", token);
        notification.success({
          message: "Successfull Login!",
          description: "You have now logged in!",
        });
        navigate("/");
      }
    } catch (err: any) {
      notification.error({
        message: "Failed to login",
        description: "Your email or password is incorrect!",
      });
    }
  };

  return (
    <div className="p-10 bg-blue-800 flex flex-col w-fit h-fit justify-center items-center text-white">
      <h2 className="text-xl font-bold m-2">Sign In</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSignIn}
      >
        <input
          className="m-4 p-1 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="m-4 p-1 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-sm m-2">
          Don't have an account yet?{" "}
          <div
            onClick={() => {
              props.setIsSignInOpen(false);
              props.setIsSignUpOpen(true);
            }}
            className="underline text-blue-100 hover:text-blue-200 hover:cursor-pointer hover:underline-offset-2"
          >
            Click here.
          </div>
        </div>
        <button
          className="border bg-blue-300 text-black font-bold p-1 rounded w-fit h-fit rounded-lg"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;