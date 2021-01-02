import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { text } = this.state;
    await axios.post(
      'https://244cqy3uii.execute-api.us-east-1.amazonaws.com/dev/todos',
      { text: `${text}, ` }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Text:</label>
          <input
            type="text"
            name="text"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}