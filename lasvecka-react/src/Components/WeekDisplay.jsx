import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class WeekDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/getData")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCurrentTime = () => {
    return moment().format("YYYY-MM-DD");
  };

  findClosestDate = date => {
    let dateArray = this.state.data;
    let soughtIndex = 0;
    for (var i = 0; i < dateArray.length; i++) {}
  };

  test = () => {
    var a = moment("2020-07-11", "YYYY-MM-DD");
    var b = moment("2020-07-10", "YYYY-MM-DD");
    return a.diff(b, "days");
  };

  render() {
    console.log(this.test());
    console.log(this.state);
    return (
      <div className="WeekDisplay">
        <p className="WeekDisplayText"> {moment().week()}</p>
      </div>
    );
  }
}

export default WeekDisplay;
