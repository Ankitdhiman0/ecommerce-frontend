import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(useGSAP);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState(false);
  const input = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");

      const role = res.data.user.role;

      if (role === "admin") navigate("/admin");
      if (role === "owner") navigate("/owner");
    } catch (err) {
      console.error(err);
      setErrMsg("Server Error");
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".ok", {
      x: 30, // 👈 comes from the right now
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.3,
    })
      .from(
        ".txt",
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.2,
        },
        "-=1"
      )
      .from(
        ".btn-submit",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=1.5"
      );
  }, []);

  return (
    <>
      <main className="h-screen w-full text-black flex justify-center items-center bg-[url('/mobile.jpg')] md:bg-[url('/4.jpg')] bg-cover bg-center">
        <section className="w-full h-full flex items-center justify-center flex-col md:flex-row">
          <div className="ok blured bg-transparent w-[90%] border border-white md:border-0 md:h-[90%] flex p-10 backdrop-blur-sm rounded-2xl">
            {/* Image Section - Hidden on mobile */}
            <div className="ok hidden md:block md:w-1/2 h-full">
              <img
                src="/image.jpg"
                alt="Login Visual"
                className="ok w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Form Section */}
            <div className="ok w-full md:w-1/2 h-full md:border md:border-gray-200 ml-1 text-white flex flex-col items-center justify-center px-4 py-6 rounded-2xl">
              <div className="w-full flex flex-col items-center h-full justify-center">
                <h1 className="txt text-xl md:text-xl xl:text-[1.5vw] font-bold mb-4 text-center">
                  Login
                </h1>

                <form
                  onSubmit={handleSubmit}
                  className="w-[80%] max-w-xs flex flex-col gap-5 items-center justify-center"
                >
                  <input
                    autoComplete="username"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    autoFocus
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="txt px-3 py-3 rounded-lg text-sm xl:text-[1vw] border border-white outline-none w-full"
                  />

                  <div className="txt flex w-full items-center justify-between border border-white rounded-lg px-2 py-3">
                    <input
                      autoComplete="current-password"
                      type={visiblePass ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      ref={input}
                      className="w-[88%] xl:text-[1vw] bg-transparent outline-none text-sm"
                    />
                    <span
                      className="txt cursor-pointer"
                      onClick={() => setVisiblePass(!visiblePass)}
                    >
                      {visiblePass ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit relative w-full px-6 md:py-[1vw] py-4   text-white text-[12px] md:text-[1vw] font-medium rounded-[10px] border-none bg-gradient-to-br from-black to-[#333333] shadow-[0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:from-[#1a1a1a] hover:to-[#4d4d4d] active:translate-y-[1px] active:shadow-[0_3px_10px_rgba(0,0,0,0.2)] group"
                  >
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 group-hover:left-full" />
                    Login
                  </button>
                </form>
                {errMsg && <p className="text-red-600 pt-2">{errMsg}</p>}

                {/* Bottom Text */}
                <h1 className="txt text-[13px] xl:text-[1vw] mt-4 text-center">
                  Didn't have an account?{" "}
                  <Link to="/signup">Create Account</Link>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default Login;
