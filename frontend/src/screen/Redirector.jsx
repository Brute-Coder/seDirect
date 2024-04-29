import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import page404 from "../assets/404-page-not-found copy.svg";
import "../index.css";
import CustomToastContainer from "../components/CustomToastContainer";
import useTheme from "../context/theme";
import { IoLogoGithub } from "react-icons/io5";
import { quantum } from "ldrs";

function Redirector() {
  const [secureText, getSecureText] = useState("");
  const [urlObj, setUrlObj] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const { themeMode } = useTheme();
  const { shortId } = useParams();
  quantum.register();
  useEffect(() => {
    (async () => {
      try {
        const uriString = `https://se-direct-backend.vercel.app/api/getUrl?queryId=${shortId}`;
        const data = await axios.get(uriString);
        if (!data) {
          console.log("no data received from server");
        } else {
          if (!data.data.idExist) {
            toast.error("Invalid Url Entered! ");
          }
          setUrlObj(data.data);
        }
      } catch (err) {
        console.log("error while fetching data from endPiont", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleSedirect() {
    if (
      secureText &&
      urlObj &&
      secureText.trim() === urlObj.authPhrase[0].trim()
    ) {
      setFlipped(true);
      window.location.href = urlObj.masterUrl;
    } else {
      toast.error("invalid secret phrase entered");
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center overscroll-none overflow-hidden">
        {/* <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        <div className="dark:text-white font-bold text-xl ml-2">Loading...</div> */}

        <l-quantum size="110" speed="1.25" color="white"></l-quantum>
      </div>
    );
  }
  return (
    <div>
      {urlObj && urlObj.idExist ? (
        <>
          <h1 className="text-4xl text-pretty text-center mt-6 dark:text-white font-bold font-dosis">
            Enter The Secret Phrase To Access
          </h1>
          <div className="mt-10 flex flex-col justify-center items-center">
            <Tilt scale={1.15} transitionSpeed={2500}>
              <div
                className={`container h-96 w-96 bg-opacity-20 bg-black dark:bg-white dark:bg-opacity-10 rounded-2xl shadow-5xl border border-r-0 border-b-0 
            border-opacity-10 backdrop-filter backdrop-blur-sm ${
              flipped ? "flip-vh" : ""
            }`}
              >
                <div className=" h-full flex flex-col justify-center items-center space-y-5">
                  <input
                    type="text"
                    placeholder="Secure Phrase"
                    value={secureText}
                    onChange={(e) => getSecureText(e.target.value)}
                    className="font-poppins bg-transparent border border-t-0 border-l-0 border-r-0 focus:outline-none text-white tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={handleSedirect}
                    className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 "
                  >
                    seDirect
                  </button>
                </div>
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
            <div className=" fixed bottom-0">
              <h1 className=" p-1 font-dosis text-md  dark:text-white ">
                Made with 🐞 by soumya | Link expires in 1 day
              </h1>
            </div>
          </div>
        </>
      ) : (
        <div className=" flex flex-col justify-center items-center h-full">
          <img
            src={page404}
            height={"50%"}
            width={"50%"}
            alt="page not found icon"
          />
          <h1 className=" text-3xl font-dosis dark:text-white font-bold ">
            Looks like you entered A Wrong Url
          </h1>
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
          <div className=" fixed bottom-0">
            <h1 className=" p-1 font-dosis text-md  dark:text-white ">
              Made with 🐞 by soumya | Link expires in 1 day
            </h1>
          </div>
        </div>
      )}

      {/* <div className=" absolute bg-gradient-to-b dark:from-green-400 dark:to-blue-400  from-orange-600 to-blue-800 rounded-full h-[40rem] w-[40rem]"></div> */}
      {/* <div
        // className="absolute bg-gradient-to-b dark:from-green-400 dark:to-blue-400 from-orange-600 to-blue-800 rounded-full h-[40rem] w-[40rem]"
        // style={{ top: "100px", right: "-50px", zIndex: 0 }}
      ></div> */}

      <CustomToastContainer />
    </div>
  );
}

export default Redirector;
