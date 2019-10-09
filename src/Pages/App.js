import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import UploadButtons from '../Components/UploadButtons';
import HowToUse from '../Components/HowToUse';
import Faq from './Faq';
import UploadPage from '../Components/UploadPage';
import Footer from '../Components/Footer';

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
            </React.Fragment>
          )}>          
          </Route>
            <Route path="/FAQ" component={Faq}></Route>
            <Route path="/Upload" component={UploadPage}></Route>
            <Footer/>
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
