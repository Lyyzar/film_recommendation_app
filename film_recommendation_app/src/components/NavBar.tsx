import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";
import SignIn from "./SignIn";
import Modal from "react-modal";
import SignUp from "./SignUp";

const NavBar = () => {
  const user = useAuth();

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };
  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <div>
      <header className="bg-white text-black">
        <nav className="container mx-auto flex justify-between items-center py-4">
          <div className="text-lg font-bold">Film App</div>
          <ul className="flex space-x-6 mx-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <div
                onClick={openSignInModal}
                className="hover:text-gray-300 hover:cursor-pointer"
              >
                Sign In
              </div>
            </li>
            <li>
              <a href="/signUp" className="hover:text-gray-300">
                Sign Up
              </a>
            </li>
            {user ? (
              <li>
                <Logout />
              </li>
            ) : null}
          </ul>
        </nav>
      </header>

      <Modal
        isOpen={isSignInModalOpen}
        onRequestClose={closeSignInModal}
        contentLabel="Login Modal"
        style={{
          content: {
            width: "400px",
            height: "400px",
            margin: "auto",
            padding: "20px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
        <button
          className="rounded bg-black text-white w-4 h-4 flex items-center justify-center p-3"
          onClick={closeSignInModal}
        >
          X
        </button>
        <SignIn
          isSignInOpen={isSignInModalOpen}
          setIsSignInOpen={setIsSignInModalOpen}
          isSignUpOpen={isSignUpModalOpen}
          setIsSignUpOpen={setIsSignUpModalOpen}
        />
      </Modal>

      <Modal
        isOpen={isSignUpModalOpen}
        onRequestClose={closeSignUpModal}
        contentLabel="Sign Up Modal"
        style={{
          content: {
            width: "400px",
            height: "400px",
            margin: "auto",
            padding: "20px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
        <button
          className="rounded bg-black text-white w-4 h-4 flex items-center justify-center p-3"
          onClick={closeSignUpModal}
        >
          X
        </button>
        <SignUp
          isSignInOpen={isSignInModalOpen}
          setIsSignInOpen={setIsSignInModalOpen}
          isSignUpOpen={isSignUpModalOpen}
          setIsSignUpOpen={setIsSignUpModalOpen}
        />
      </Modal>
    </div>
  );
};

export default NavBar;
