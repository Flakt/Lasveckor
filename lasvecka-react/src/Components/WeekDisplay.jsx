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

  test = () => {
    let data = this.state.data;
    let currentDate = moment("2021-01-09");
    let soughtDateType = "";
    let soughtDateWeekDiff = 1000;
    Object.keys(data).forEach(key => {
      let compDate = moment(key).format("YYYY-MM-DD")
      if (currentDate.isSame(compDate)) {
        soughtDateType = data[key]
        soughtDateWeekDiff = 0
      }
      else if (currentDate.isAfter(compDate)) {
        if (currentDate.diff(compDate, 'weeks') < soughtDateWeekDiff) {
          soughtDateType = data[key];
          soughtDateWeekDiff = currentDate.diff(compDate, 'weeks');
        }
      }
    })
    return {"weekDiff": soughtDateWeekDiff + 1, "type": soughtDateType};
  };

  render() {
    let weekDiffAndType = this.test();
    console.log(weekDiffAndType);
    let text = "";
    if (weekDiffAndType.type == "study_period" && weekDiffAndType.weekDiff <= 8) {
      text = weekDiffAndType.weekDiff.toString();
    } else if (weekDiffAndType.type == "exam_period") {
      text = "Tentavecka";
    }
    else {
      text = "Självstudier";
    }

    return (
      <div className="WeekDisplay">
        <p className="WeekDisplayText"> {text}</p>
      </div>
    );
  }
}

export default WeekDisplay;
