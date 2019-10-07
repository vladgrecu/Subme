import React, {useState} from 'react';
import axios from 'axios';
import Message from './Message';
import Overlay from './Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({props}) => {
  const [overlay, setOverlay] = useState(false);
  const [file, setFile] = useState('');
  const [filename, setFileName] = useState('No file selected');
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('serverMessage');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = event => {
    setFile(event.target.files[0]);
    event.target.files[0] === undefined ? setFileName(filename) : setFileName(event.target.files[0].name);
  }
  
  const onSubmit = async event =>{
    event.preventDefault();
    
    console.log('File: ',file);
    console.log("From Language",props.selectedOptionFrom);
    console.log("To Language",props.selectedOptionTo);

    const formData = new FormData();
    formData.append('fromlang',`${props.selectedOptionFrom}`);
    formData.append('tolang',`${props.selectedOptionTo}`);
    formData.append('upload',file);

    try{
      if(file.length === 0){
        setMessage(`Please select a file`);
        setBackgroundColor('serverMessageFailed');
        return
      };
      setOverlay(true);
      document.body.style.overflow = 'hidden';
      const response = await axios.post(`http://localhost:3000/upload`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
        }
      });
      
      console.log("Response",response); 
      setMessage('Processing File');
      const data = response.data;
      const downloadId = data.success;
      const downloadCheck = setInterval(async () => {
        const response = await axios.get(`http://localhost:3000/status/${downloadId}`);
        const done = response.data.done;
        if(done){
          setOverlay(false);
          document.body.style.overflow = 'auto';
          window.location = `http://localhost:3000/download/${downloadId}`;
          clearInterval(downloadCheck);
        }
      }, 2000); 
      
    }
    catch(error){
      setOverlay(false);
      document.body.style.overflow = 'auto';
      setBackgroundColor('serverMessageFailed');
      console.log(Object.entries(error));
      if(error.response.status===404){
        setMessage('Not connected to server');
      } else {
        setMessage(`${error.response.data.error}`);
      }
      setUploadPercentage(0);
    }
    
  }
  return(
    <React.Fragment>
      {message ? <Message msg={message} backgroundColor={backgroundColor}/> : null}
      {overlay ? <Overlay percentage={uploadPercentage} message={message}/> : null}
      <form onSubmit={onSubmit} className="fileUpload">
      <FontAwesomeIcon icon={faFileUpload} className="bounceUp" size="4x" style={{ color: 'rgba(216, 98, 2,0.8)' }} />
        <div className="file">{filename}
          <input id="file" type="file" className="file-input"style={{visibility:"hidden"}} onChange={onChange}/>
          <label htmlFor="file" className="btnSubmit" style={{fontSize:"13px"}}>Select File</label>
          <input type="submit" className="btnSubmit"/>
        </div>
      </form>
    </React.Fragment>
  )
}

export default FileUpload