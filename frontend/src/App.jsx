import { useState, useRef } from "react";
import copyIcon from "./assets/copy.svg";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToastContainer from "./components/CustomToastContainer";
import { IoLogoGithub } from "react-icons/io5";
import useTheme from "./context/theme";

export default function App() {
  const [originalLink, setOriginalLink] = useState("");
  const [secureText, setSecureText] = useState("");
  const [secureLink, setSecureLink] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [generate, setGenerate] = useState(false);
  const { themeMode } = useTheme();
  const copyRef = useRef(null);

  async function handleGenerate() {
    if (generate) return;
    if (!originalLink || !secureText) {
      if (!originalLink) toast.warn("Please Provide Valid Link");
      else toast.warn("secure text can't be empty");
      return;
    }
    try {
      setGenerate(true);
      const data = await axios.post(
        "https://se-direct-backend.vercel.app/api/createUrl",
        {
          masterUrl: originalLink,
          authText: secureText,
        }
      );
      setGenerate(false);
      const url = "https://sedirect.vercel.app/" + data.data.shortId;
      setFlipped(true);
      setSecureLink(url);
    } catch (e) {
      toast.error("internal server error");
      console.log("error" + e);
    } finally {
      setOriginalLink("");
      setSecureText("");
    }
    toast.success("secure Link Created!");
  }

  function handleTry() {
    window.location.href = secureLink;
  }

  function handleCopy() {
    copyRef.current?.select();
    window.navigator.clipboard.writeText(secureLink);
  }
  return (
    <div>
      <h1 className=" text-4xl text-pretty text-center mt-6 dark:text-white font-bold font-dosis flex-wrap">
        Securely Share Any Link To Anyone
      </h1>
      {/* <div className=" absolute bg-gradient-to-b dark:from-green-400 dark:to-blue-400  from-orange-600 to-blue-800 rounded-full h-[40rem] w-[40rem] "></div> */}
      <div className=" mt-10 flex flex-col justify-center items-center">
        <Tilt scale={1.15} transitionSpeed={2500}>
          <div
            className={`container h-96 w-96 bg-opacity-20 bg-black text-black dark:bg-white dark:bg-opacity-10 rounded-2xl shadow-5xl border border-r-0 border-b-0 
            border-opacity-10 backdrop-filter backdrop-blur-sm ${
              flipped ? "flip-vh" : ""
            }`}
          >
            {!secureLink ? (
              <form className="h-full flex flex-col justify-evenly items-center">
                <div className="text-white font-dosis text-2xl tracking-widest">
                  Create Link
                </div>
                <input
                  type="text"
                  placeholder="Original Link"
                  value={originalLink}
                  onChange={(e) => setOriginalLink(e.target.value)}
                  className="font-poppins bg-transparent border border-t-0 border-l-0 border-r-0 focus:outline-none text-white tracking-wide "
                />
                <input
                  type="text"
                  placeholder="secure text"
                  value={secureText}
                  onChange={(e) => setSecureText(e.target.value)}
                  className="font-poppins bg-transparent border border-t-0 border-l-0 border-r-0 focus:outline-none text-white tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  className={` font-poppins rounded-full ${
                    !generate
                      ? " cursor-pointer"
                      : " cursor-not-allowed animate-pulse "
                  } px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80`}
                >
                  {!generate ? "Generate" : "Generating"}
                </button>
              </form>
            ) : (
              <div className=" h-full flex flex-col justify-center items-center">
                <span>
                  <input
                    type="text"
                    value={secureLink}
                    ref={copyRef}
                    readOnly
                    className="font-poppins bg-transparent border border-t-0 border-l-0 border-r-0 focus:outline-none text-white tracking-wide"
                  />
                  <button onClick={handleCopy}>
                    <img src={copyIcon} alt="copy icon" />
                  </button>
                </span>
                <button
                  onClick={handleTry}
                  className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 mt-6 "
                >
                  Try It!
                </button>
              </div>
            )}
          </div>
        </Tilt>
        <div className="fixed bottom-0 right-0 m-5 ">
          <a
            href="https://github.com/Brute-Coder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full p-2 bg-black dark:bg-white animate-bounce"
          >
            <IoLogoGithub
              size={"30px"}
              color={themeMode !== "light" ? "black" : "white"}
            />
          </a>
        </div>
        <div className=" fixed bottom-0 ">
          <h1 className=" p-1 font-dosis text-md  dark:text-white ">
            Made with 🐞 by soumya | Link expires in 1 day
          </h1>
        </div>
      </div>
      <CustomToastContainer />
    </div>
  );
}
