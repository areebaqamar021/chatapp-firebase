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
    <div className="bg-sky-950 min-h-screen flex items-center justify-center">
      {isPending && <LoadingSpin className="absolute" />}
      <div className="bg-stone-300 py-8 px-10 rounded-lg shadow-lg flex flex-col gap-4 items-center">
        <h1 className="text-neutral-800 font-bold text-4xl mb-4">Logo</h1>
        <h4 className="text-neutral-700 text-lg mb-6">Login</h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-md"
        >
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button
            className="bg-sky-900 disabled:bg-slate-300 text-white"
            text="Sign In"
          />
        </form>
        <p className="mt-4 text-neutral-700">
            Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-700 hover:text-sky-950 duration-150"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
