import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust the import path as necessary

const SignUp = (props: {
  isSignInOpen: boolean;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUpOpen: boolean;
  setIsSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the createUserWithEmailAndPassword function from firebase/auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user?.getIdToken();
      if (token) {
        localStorage.setItem("token", token);
        alert("User registered successfully");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-10 bg-blue-800 flex flex-col w-fit h-fit justify-center items-center text-white">
      <h2 className="text-xl font-bold m-2">Sign Up</h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSignUp}
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
          Already have an accounnt?
          <div
            onClick={() => {
              props.setIsSignUpOpen(false);
              props.setIsSignInOpen(true);
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
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
