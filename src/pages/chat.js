import React, { Component } from 'react';
import axios from 'axios';

class chatbot extends Component {
  state = {
    query: '',
    answer: ''
  };

  handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleAskQuery = () => {
    axios
      .post('http://127.0.0.1:5000/api/ask', { query: this.state.query })
      .then((response) => {
        this.setState({ answer: response.data.answer });
      })
      .catch((error) => {
        console.error('Error asking query:', error);
      });
  };

  render() {
    const appStyle = {
      textAlign: 'center',
      backgroundColor: 'grey',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white'
    };

    const inputStyle = {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '10px',
      width: '50%',
      textAlign: 'center'
    };

    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      borderRadius: '20px',
      padding: '8px 16px',
      cursor: 'pointer'
    };

    const headerTextStyle = {
      color: 'black',
      marginBottom: '20px'
    };

    const answerStyle = {
      color: 'black' // Changing the answer text color to black
    };

    return (
      <div style={appStyle} className="chatbot">
        <h1 style={headerTextStyle}>Ask anything about the products and website</h1>
        <input
          type="text"
          placeholder="Enter your query"
          value={this.state.query}
          onChange={this.handleQueryChange}
          style={inputStyle}
        />
        <button onClick={this.handleAskQuery} style={buttonStyle}>
          Ask Query
        </button>
        {this.state.answer && <p style={answerStyle}>Answer: {this.state.answer}</p>}
      </div>
    );
  }
}

export default chatbot;