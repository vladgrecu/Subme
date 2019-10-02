import React, {useState} from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({props}) => {
  
  const [file, setFile] = useState('');
  const [filename, setFileName] = useState('No file selected');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = event => {
    setFile(event.target.files[0]);
    event.target.files[0] === undefined ? setFileName(filename) : setFileName(event.target.files[0].name);
  }
  
  const onSubmit = async event =>{
    event.preventDefault();
    
    console.log('File: ',file);
    console.log("From Selection",props.selectedOptionFrom);
    console.log("From Selection",props.selectedOptionTo);

    const formData = new FormData();
    formData.append('fromlang',`${props.selectedOptionFrom}`);
    formData.append('tolang',`${props.selectedOptionTo}`);
    formData.append('upload',file);

    try{
      const response = await axios.post(`http://localhost:3000/upload`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
          setTimeout(() => {
            setUploadPercentage(0);
            setMessage('Ready to receive your file')
          },20000)
        }
      });
      console.log(response);
      setMessage('File Uploaded');
      
    }
    catch(error){
      if(error.response.status === 404){
        setMessage('There was a problem with the server');
      }else {
        setMessage(`${error.response.data.error}`);
      }
      console.log(error)
    }
    
  }
  return(
    <React.Fragment>
      {message ? <Message msg={message}/> : null}
      <form onSubmit={onSubmit} className="fileUpload">
      <FontAwesomeIcon icon={faFileUpload} className="bounceUp" size="4x" style={{ color: 'rgba(216, 98, 2,0.8)' }} />
        <div className="file">{filename}
          <input id="file" type="file" className="file-input"style={{visibility:"hidden"}} onChange={onChange}/>
          <Progress percentage={uploadPercentage}/>
          <label htmlFor="file" className="btnSubmit" style={{fontSize:"13px"}}>Select File</label>
          <input type="submit" className="btnSubmit"/>
        </div>
      </form>
    </React.Fragment>
  )
}

export default FileUpload