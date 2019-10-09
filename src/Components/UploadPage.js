import React, {Component} from 'react';
import Select from 'react-select-v2';
import HowToUse from './HowToUse'
import '../Styles/uploadpage.css'
import FileUpload from './FileUpload';

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
    fetch('http://localhost:3000/languages').then(response=>{
      return response.json();
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
  }

  handleChangeTo = (selectedOption) =>{
    this.setState({selectedOptionTo: selectedOption.value})
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
          <div className="upload-container">
            <div className="link-container">
              <div className="button fromLanguage">
                <h3 className="selectTitle">Input Language:</h3> 
                <Select 
                  options={langFrom}
                  value={this.selectedOptionFrom}
                  onChange={this.handleChangeFrom}
                  placeholder="Select Language"
                />
              </div>
              <div className="button toLanguage">
                <h3 className="selectTitle">Output Language</h3> 
                <Select 
                  options={langTo}
                  value={this.selectedOptionTo}
                  onChange={this.handleChangeTo}
                  placeholder="Select Language"
                />
              </div>
            </div>
          <FileUpload props={this.state} />
          </div>
          <HowToUse/>
        </div>
      </React.Fragment>
    )

  }
}

export default UploadPage