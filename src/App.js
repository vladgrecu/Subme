import React, {Component} from 'react';
import Navbar from './Components/Navbar';
import UploadButtons from './Components/UploadButtons';
import HowToUse from './Components/HowToUse';
import './App.css';

class App extends Component {
  render(){
    return(
      <React.Fragment>
        <Navbar/>
        <UploadButtons/>
        <HowToUse/>
        {/* <Footer/> */}
      </React.Fragment>
    )
  }
}

export default App;
