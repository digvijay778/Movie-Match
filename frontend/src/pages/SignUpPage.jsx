import { useState, useEffect } from "react";
import { FilmIcon, PopcornIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

// Animation CSS (add to your global CSS or let this inject it)
const animationStyles = `
@keyframes cardIn {
  0% { opacity: 0; transform: translateY(40px) scale(0.98);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(30px);}
  100% { opacity: 1; transform: translateY(0);}
}
@keyframes gradientMove {
  0% { background-position: 0% 50%;}
  100% { background-position: 100% 50%;}
}
.animated-bg {
  background: linear-gradient(120deg, #232526 0%, #414345 100%, #232526 100%);
  background-size: 200% 200%;
  animation: gradientMove 8s ease-in-out infinite alternate;
}
.card-animate {
  animation: cardIn 0.8s cubic-bezier(.4,0,.2,1) 0.1s both;
}
.fade-up {
  animation: fadeUp 1s cubic-bezier(.4,0,.2,1) 0.3s both;
}
.logo-gradient-animate {
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa);
  background-size: 200% 200%;
  animation: gradientMove 3s linear infinite alternate;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.input-animate:focus {
  border-color: #60a5fa !important;
  box-shadow: 0 0 0 2px #60a5fa33;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.btn-animate {
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-animate:hover, .btn-animate:focus {
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 6px 24px 0 #60a5fa33;
}
.alert-animate {
  animation: fadeUp 0.5s cubic-bezier(.4,0,.2,1) 0s both;
}
`;

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  useEffect(() => {
    if (!document.getElementById("signup-animations")) {
      const style = document.createElement("style");
      style.id = "signup-animations";
      style.innerHTML = animationStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 animated-bg" data-theme="business">
      <div className="border border-neutral-700 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-neutral-800 rounded-xl shadow-2xl overflow-hidden card-animate">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col text-white">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <FilmIcon className="size-9 text-yellow-400 animate-spin-slow hover:scale-110 hover:text-yellow-500 transition-all duration-500" />
            <span className="text-3xl font-bold font-mono logo-gradient-animate tracking-wider">
              MovieMatch
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error bg-red-900 text-red-200 border-red-700 mb-4 alert-animate">
              <span>{error.response?.data?.message || "Sign up failed"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Create Your MovieMatch Account</h2>
                  <p className="text-sm text-neutral-400">
                    Join MovieMatch and connect with people who love the same movie genres as you!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-neutral-300">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ravi Kumar"
                      className="input input-bordered bg-neutral-900 text-white border-neutral-700 w-full placeholder-neutral-500 input-animate"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-neutral-300">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@gmail.com"
                      className="input input-bordered bg-neutral-900 text-white border-neutral-700 w-full placeholder-neutral-500 input-animate"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-neutral-300">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered bg-neutral-900 text-white border-neutral-700 w-full placeholder-neutral-500 input-animate"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs text-neutral-400 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight text-neutral-400">
                        I agree to the{" "}
                        <span className="text-yellow-400 hover:underline">terms of service</span> and{" "}
                        <span className="text-yellow-400 hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn bg-yellow-600 hover:bg-yellow-700 text-white w-full border-none shadow btn-animate rounded-full" type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-neutral-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-400 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center fade-up">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80" alt="Movie night illustration" className="w-full h-full rounded-full shadow-lg border-4 border-neutral-900 object-cover" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-white">Find your movie buddies</h2>
              <p className="text-neutral-400">
                Discover people who share your favorite genres and chat about movies together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;