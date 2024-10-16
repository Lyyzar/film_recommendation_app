import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";
import SignIn from "./SignIn";
import Modal from "react-modal";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useAuth();
  const navigate = useNavigate();

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
          <div
            onClick={() => navigate("/")}
            className="text-lg font-bold hover:cursor-pointer"
          >
            Film App
          </div>
          <ul className="flex space-x-6 mx-2">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              Contact
            </li>
            {user ? (
              <li>
                <div
                  onClick={() => navigate("/profile")}
                  className="hover:text-gray-300 hover:cursor-pointer"
                >
                  Profile
                </div>
              </li>
            ) : (
              <li>
                <div
                  onClick={openSignInModal}
                  className="hover:text-gray-300 hover:cursor-pointer"
                >
                  Sign In
                </div>
              </li>
            )}

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
            width: "500px",
            height: "500px",
            margin: "auto",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            overflow: "hidden",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
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
            width: "500px",
            height: "500px",
            margin: "auto",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            overflow: "hidden",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
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
