import '../lib/app/public/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  render: function() {
    return(
      <div>
      <Form onSubmitHook={this.submitHandler}/>
      <ColorList colors={this.state.colors} />
      </div>
    )
  },
  getInitialState: function() {
    return {colors: []};
  },
  submitHandler: function(form) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: form,
      success: function(colors) {
        this.setState({colors: colors});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});

var Form = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name) {
      return;
    }
    this.props.onSubmitHook({name: name});
    this.setState({name: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
});

var ColorList = React.createClass({
  render: function() {
    var colorBoxes = this.props.colors.map(function(color) {
      var style = {
        backgroundColor: '#' + color
      }
      return (
        <div style={style}>
          {color}
        </div>
      );
    });
    return (
      <div>
        {colorBoxes}
      </div>
    );
  }
});

ReactDOM.render(<App url="http://0.0.0.0:5000/api/colors"/>, document.getElementById('root'))
