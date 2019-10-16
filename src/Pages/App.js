import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import UploadButtons from "../Components/UploadButtons/UploadButtons";
import HowToUse from "../Components/HowToUse/HowToUse";
import FaqPage from "./FaqPage/FaqPage";
import UploadPage from "./UploadPage/UploadPage";
import Footer from "../Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <UploadButtons />
                {/* <div className="content"> */}
                <HowToUse />
                {/* </div> */}
              </React.Fragment>
            )}
          ></Route>
          <Route path="/FAQ" component={FaqPage}></Route>
          <Route path="/Upload" component={UploadPage}></Route>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
