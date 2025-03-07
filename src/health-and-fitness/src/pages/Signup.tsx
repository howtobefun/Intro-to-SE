import logo from "../assets/header/logo.png";
import illustration from "../assets/auth-ui/illustration.png";
import fitness from "../assets/auth-ui/fitness.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const { signup, login } = useAuth();

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("name") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (!username || !email || !password || !confirm) {
      setEmailError("Please fill in all fields");
      return;
    }

    if (validateEmail(email)) {
      if (password !== confirm) {
        setEmailError("Passwords do not match");
        return;
      }
      const signUp = await signup(email, password, username);

      if ('error' in signUp) {
        // Handle both string and object errors
        const errorMessage =
          typeof signUp.error === "string" ? signUp.error : signUp.error.message;
        setEmailError(errorMessage);
        return;
      }

      const signIn = await login(email, password);

      if (!signIn || !signIn.token) {
        setEmailError("Sign up failed");
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setEmailError("Invalid email address");
    }
  };

  return (
    <div className="grid grid-cols-[2fr_8fr] h-full bg-gray-200 relative">
      <div className="absolute inset-0 bg-[#A91D3A] z-0"></div>
      <div className="flex flex-col h-screen relative z-10">
        <a className="flex flex-col h-full w-full ">
          <div className="flex m-6" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="cursor-pointer h-10" />
            <p className="cursor-pointer bebas-font text-4xl text-white ml-2 tracking-widest">
              HAF
            </p>
          </div>
          <div className="flex-grow flex items-end cursor-default">
            <img
              src={illustration}
              alt="Illustration"
              className="max-h-full w-[90%] object-contain"
            />
          </div>
        </a>
      </div>
      <div className="bg-[#212121] p-8 rounded-l-xl w-full relative z-20 grid grid-cols-[2fr_9fr]">
        <div className="flex items-center">
          <img src={fitness} alt="Fitness" className="h-[70%] object-contain" />
        </div>
        <div className="mr-20 my-auto">
          <h1 className="text-3xl mb-20 font-bold text-white">
            Create Account
          </h1>
          <form className="mt-6" onSubmit={handleSignup}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-[#A1A1A1] font-bold">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full pb-2 mt-1 border-b border-zinc-400 bg-transparent text-white focus:outline-none focus:border-red-400"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <label htmlFor="email" className="block text-[#A1A1A1] font-bold">
              Email Address
            </label>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pb-2 mt-1 border-b border-zinc-400 bg-transparent text-white focus:outline-none focus:border-red-400"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <label
              htmlFor="password"
              className="block text-[#A1A1A1] font-bold"
            >
              Password
            </label>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full pb-2 mt-1 border-b border-zinc-400 bg-transparent text-white focus:outline-none focus:border-red-400"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <label htmlFor="confirm" className="block text-[#A1A1A1] font-bold">
              Confirm Password
            </label>
            <div className="mb-6">
              <input
                type="password"
                id="confirm"
                name="confirm"
                className="w-full pb-2 mt-1 border-b border-zinc-400 bg-transparent text-white focus:outline-none focus:border-red-400"
                autoComplete="off"
                autoCorrect="off"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-2xl py-2 mt-10 bg-[#A91D3A] rounded-md text-white font-semibold hover:bg-[#c83553]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
