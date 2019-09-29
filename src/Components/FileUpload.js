import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({props}) => {
  
  const [file, setFile] = useState('');

  const onChange = event => {
    setFile(event.target.files[0]);
  }
  
  const onSubmit = (event) =>{
    event.preventDefault();
    const formData = new FormData();
    
    console.log('File: ',file);
    console.log("From Selection",props.selectedOptionFrom);
    console.log("From Selection",props.selectedOptionTo);
    
    formData.append('file',file);
    formData.append('fromlang',`${props.selectedOptionFrom}`);
    formData.append('tolang',`${props.selectedOptionTo}`);

    
  }
  return(
    <React.Fragment>
      <form onSubmit={onSubmit} className="fileUpload">
    <FontAwesomeIcon icon={faFileUpload} className="bounceUp" size="4x" style={{ color: 'rgba(216, 98, 2,0.8)' }} />
        <div className="file">
          <input type="file" className="file-input"onChange={onChange}/>
        <input type="submit" className="btnSubmit"/>
        </div>
      </form>
    </React.Fragment>
  )
}

export default FileUpload