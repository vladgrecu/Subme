import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import UploadButtons from '../Components/UploadButtons';
import HowToUse from '../Components/HowToUse';
import Faq from './Faq';
import UploadPage from '../Components/UploadPage';

class App extends Component {
  render(){
    return(
      <Router>
        <React.Fragment>
          <Navbar/>
          <Route exact path="/" render={props =>(
            <React.Fragment>
              <UploadButtons/>
              <HowToUse/>
              {/* <Footer/> */}
            </React.Fragment>
          )}>          
          </Route>
            <Route path="/FAQ" component={Faq}></Route>
            <Route path="/Upload" component={UploadPage}></Route>
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
