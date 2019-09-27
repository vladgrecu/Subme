import React, {Component} from 'react';
import Select from 'react-select-v2';
import './Styles/uploadpage.css'

class UploadPage extends Component{
  constructor(){
    super()
    this.state = {
      transcribeLang: [],
      translateLang: [],
      selectedOptionFrom: null,
      selectedOptionTo: null,
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/languages').then(responsee=>{
      return responsee.json();
    })
    .then(languages => {
      let resultFrom = [];
      let resultTo = [];
      for (let i in languages.availableTranscribeLangs){
        resultFrom.push([i,languages.availableTranscribeLangs[i]])
      }
      for (let i in languages.availableTranslateLangs){
        resultTo.push([i,languages.availableTranslateLangs[i]])
      }
      this.setState({transcribeLang: resultFrom});
      this.setState({translateLang: resultTo});
    })
  }
  handleChangeFrom = (selectedOption) => {
    this.setState({selectedOptionFrom: selectedOption.value});
    console.log(selectedOption.value);
  }
  handleChangeTo = (selectedOption) =>{
    this.setState({selectedOptionTo: selectedOption.value})
    console.log(selectedOption.value);
  }
  render(){
        const langFrom = this.state.transcribeLang.map(option => ({
          label: option[0],
          value: option[1]
        }))
        const langTo = this.state.translateLang.map(option => ({
          label: option[0],
          value: option[1]
        }))
    return(
      <React.Fragment>
        <div className="content">
          <div className="info-container upload-container">
            <p>Select File: <input type='file'/> 
            <input type='button' id='_submit' value='Upload!'/></p>
            <div className="link-container">
              <div className="button">
                <h3 className="selectTitle">Translate From:</h3> 
                <Select 
                  options={langFrom}
                  value={this.selectedOptionFrom}
                  onChange={this.handleChangeFrom}
                  placeholder="Select Language"
                />
              </div>
              <div className="button">
                <h3 className="selectTitle">To</h3> 
                <Select 
                  options={langTo}
                  value={this.selectedOptionTo}
                  onChange={this.handleChangeTo}
                  placeholder="Select Language"
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

  }
}

export default UploadPage