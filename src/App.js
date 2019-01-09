import React, { Component } from 'react';
import './App.css';
import DetectLanguage from 'detectlanguage';
import { promisify } from 'es6-promisify'

class App extends Component {
  constructor () {
    super()
    this.state = {
      lang: null,
      confidence: null,
      languages: null,
    }
    this.detectLanguage = new DetectLanguage({
      key: '9051af2d5487b4daef1426ecc7cd633f',
      ssl: false
  })
    this.detectLanguagePromise = promisify(this.detectLanguage.detect);
    this.getLanguagesListPromise = promisify(this.detectLanguage.languages);
  }

  async componentDidMount () {
    try {
      const result = await this.getLanguagesListPromise();
      const languages = JSON.stringify(result)
      console.log(languages)
     this.setState({languages})
    } catch(err) {
      this.setState({languages: `${err}`})
    }
    
  }

  getTranslate = async (e) => {
    e.preventDefault();
    try {
      const result = await this.detectLanguagePromise(this.state.text);
      const tranlation = JSON.stringify(result)
      console.log(tranlation);
      this.setState({
        lang: tranlation[0].language,
        confidence: tranlation[0].confidence,
      }) 
    } catch (err) {
      this.setState({
        lang: `${err}`,
        confidence: 0,
      })
    }
  }

handleChange = (event) => {
  this.setState({text: event.target.value});
}

  render() {
    return (
      <div className="App">
        <h1>Detect Language </h1>
        <div>
          <h5>Input text</h5>
          <input type="text" onChange={this.handleChange}></input>
          <div>
         <button  onClick={(e) => this.getTranslate(e)}>Proccess</button>
          </div>
         <h3>Language:</h3> <span> {this.state.lang}</span>
         <h3>Confidence: {this.state.confidence}</h3>
        </div>
        <div>
          <h2>Supported Languages:</h2>
          {this.state.languages}
        </div>
      </div>
    );
  }
}

export default App;
