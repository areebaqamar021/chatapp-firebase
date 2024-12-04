import { LuImagePlus } from "react-icons/lu";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import {
  registerUserToFirebase,
  setUserToFirebase,
  updateProfileImageToFirebase,
  updateUserProfileToFirebase,
} from "../Firebase/actions";
import { handleFirebaseError } from "../Firebase/errorHandle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "../components/shared/LoadingSpin";

const Register = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const user = await registerUserToFirebase(email, password);

      if (!user) return;

      const photoURL = await updateProfileImageToFirebase(file, user.uid);
      await updateUserProfileToFirebase({
        displayName,
        photoURL,
      });
      await setUserToFirebase(user.uid, {
        uid: user.uid,
        displayName,
        email,
        photoURL,
      });

      navigate("/");
      setIsPending(false);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center relative">
      {isPending && <LoadingSpin className="absolute" />}
      <div className="bg-white py-6 px-8 rounded-md shadow-lg flex flex-col gap-4 items-center max-w-sm w-full">
        <h1 className="text-gray-800 font-bold text-2xl">Welcome</h1>
        <h4 className="text-gray-600 text-sm">Create your account</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input
            placeholder="Enter your display name"
            type="text"
            className="border-gray-300 px-3 py-2 rounded-md w-full"
          />
          <Input
            placeholder="Email"
            type="email"
            className="border-gray-300 px-3 py-2 rounded-md w-full"
          />
          <Input
            placeholder="Password"
            type="password"
            className="border-gray-300 px-3 py-2 rounded-md w-full"
          />

          <input id="file" className="hidden" type="file" />
          <label
            htmlFor="file"
            className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 duration-200"
          >
            <LuImagePlus size={24} />
            <span>Upload Profile Image</span>
          </label>

          <Button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 rounded-md transition-all duration-300 w-full"
            text="Sign Up"
            disabled={isPending}
          />
        </form>
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:text-pink-600 font-semibold transition-all duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
