import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import LoadingSpin from "../components/shared/LoadingSpin";
import { loginToFirebase } from "../Firebase/actions";

const Login = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await loginToFirebase(email, password);
      setIsPending(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    handleLogin(email, password);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center relative">
      {isPending && <LoadingSpin className="absolute" />}
      <div className="bg-white py-6 px-8 rounded-md shadow-lg flex flex-col gap-4 items-center max-w-sm w-full">
        <h1 className="text-gray-800 font-bold text-2xl">Welcome</h1>
        <h4 className="text-gray-600 text-sm">Sign in to your account</h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col w-full">
            <label className="text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              className="border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
          <Button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 rounded-md transition-all duration-300 w-full"
            text="Sign In"
          />
        </form>
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 hover:text-pink-600 font-semibold transition-all duration-200"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
