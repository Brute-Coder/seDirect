import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import page404 from "../assets/404-page-not-found copy.svg";
import "../index.css";

function Redirector() {
  const [secureText, getSecureText] = useState("");
  const [urlObj, setUrlObj] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const { shortId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const uriString = `http://localhost:4000/api/getUrl?queryId=${shortId}`;
        const data = await axios.get(uriString);
        if (!data) {
          console.log("no data received from server");
        } else {
          //console.log(data.data);
          if (!data.data.idExist) {
            toast.error("Invalid Url Entered! ");
          }
          setUrlObj(data.data);
        }
      } catch (err) {
        console.log("error while fetching data from endPiont", err);
      }
      console.log("inside the useeffect functions");
    })();
  }, []);
  //console.log("this is my urlObj", urlObj);

  function handleSedirect() {
    console.log("inside handleSedirect" + JSON.stringify(urlObj));
    if (
      secureText &&
      urlObj &&
      secureText.trim() === urlObj.authPhrase[0].trim()
    ) {
      //   redirect(urlObj.masterUrl);
      //   toast.success("varified!! redirecting...");
      setFlipped(true);
      window.location.href = urlObj.masterUrl;
    } else {
      //toast("enter a valid auth phrase");
      // alert("enter a valid auth phrase");

      toast.error("invalid secret phrase entered");
    }
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
            <div className=" fixed bottom-0">
              <h1 className=" p-1 font-dosis text-md  dark:text-white ">
                Made with 🐞 by soumya
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
            Looks like you you entered A Wrong Url
          </h1>
          <div className=" fixed bottom-0">
            <h1 className=" p-1 font-dosis text-md  dark:text-white ">
              Made with 🐞 by soumya{" "}
            </h1>
          </div>
        </div>
      )}

      {/* <div className=" absolute bg-gradient-to-b dark:from-green-400 dark:to-blue-400  from-orange-600 to-blue-800 rounded-full h-[40rem] w-[40rem]"></div> */}
      {/* <div
        // className="absolute bg-gradient-to-b dark:from-green-400 dark:to-blue-400 from-orange-600 to-blue-800 rounded-full h-[40rem] w-[40rem]"
        // style={{ top: "100px", right: "-50px", zIndex: 0 }}
      ></div> */}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={
          document.querySelector("html").classList[0] === "dark"
            ? "light"
            : "dark"
        }
        transition:Bounce
      />
    </div>
  );
}

export default Redirector;
