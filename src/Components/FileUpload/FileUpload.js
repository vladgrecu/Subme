import React, { useState } from "react";
import axios from "axios";
import Message from "../Message/Message";
import Overlay from "../Overlay/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const FileUpload = ({ selectedOptionTo, selectedOptionFrom }) => {
  console.log("From", selectedOptionFrom);
  console.log("TO", selectedOptionTo);
  const [overlay, setOverlay] = useState(false);
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("No file selected");
  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("serverMessage");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = event => {
    setFile(event.target.files[0]);
    event.target.files[0] === undefined
      ? setFileName(filename)
      : setFileName(event.target.files[0].name);
  };

  const onSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fromlang", `${selectedOptionFrom}`);
    formData.append("tolang", `${selectedOptionTo}`);
    formData.append("upload", file);

    try {
      if (file.length === 0) {
        setMessage(`Please select a file`);
        setBackgroundColor("serverMessageFailed");
        return;
      }
      setOverlay(true);
      document.body.style.overflow = "hidden";
      const response = await axios.post(
        `http://localhost:3000/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          }
        }
      );

      setMessage("Processing File");
      setBackgroundColor("serverMessage");
      const data = response.data;
      const downloadId = data.success;
      const downloadCheck = setInterval(async () => {
        const response = await axios.get(
          `http://localhost:3000/status/${downloadId}`
        );
        const done = response.data.done;
        if (done) {
          setOverlay(false);
          setMessage("Your File is Ready!");
          document.body.style.overflow = "auto";
          window.location = `http://localhost:3000/download/${downloadId}`;
          clearInterval(downloadCheck);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        }
      }, 2000);
    } catch (error) {
      setOverlay(false);
      setBackgroundColor("serverMessageFailed");
      document.body.style.overflow = "auto";
      console.log(Object.entries(error));
      if (error.response.status === 404) {
        setMessage("Server is not running");
      } else {
        setMessage(`${error.response.data.error}`);
      }
      setUploadPercentage(0);
    }
  };
  return (
    <React.Fragment>
      {message ? (
        <Message msg={message} backgroundColor={backgroundColor} />
      ) : null}
      {overlay ? (
        <Overlay percentage={uploadPercentage} message={message} />
      ) : null}
      <form onSubmit={onSubmit} className="fileUpload">
        <FontAwesomeIcon
          icon={faFileUpload}
          className="bounceUp"
          size="4x"
          style={{ color: "rgba(216, 98, 2,0.8)" }}
        />
        <div className="file">
          {filename}
          <input
            id="file"
            type="file"
            className="file-input"
            style={{ visibility: "hidden" }}
            onChange={onChange}
          />
          <label
            htmlFor="file"
            className="file-input"
            style={{ fontSize: "13px" }}
          >
            Select File
          </label>
          <input
            type="submit"
            className="btnSubmit"
            value="Get Your Subtitles"
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default FileUpload;
