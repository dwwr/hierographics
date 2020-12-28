import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  };

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    this.props.connectUser(this.state);
  }

  render() {
    return (
      <div>
        <label>username: </label>
        <input type="text" id="username" onChange={this.handleChange} required></input>
        <button onClick={this.submitForm}>Dive In</button>
      </div>
    )
  };
};

export default Form;