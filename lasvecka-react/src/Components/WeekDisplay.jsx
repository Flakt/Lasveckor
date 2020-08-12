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

  getCurrentDate = () => {
    return moment();
  }

  getWeekDiffAndType = currentDate => {
    let data = this.state.data;
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
  }

  genText = () => {
    let currentDate = moment("2021-05-31");
    if (currentDate.isBetween("2021-04-01", "2021-04-10")) {
      return "Självstudier";
    }
    else if (currentDate.isSameOrAfter("2021-04-09")) {
      let diff = currentDate.diff("2021-04-05", 'weeks');
      console.log(diff);
      if (diff >= 8) {
        return "Tentavecka";
      }
      return (diff + 1).toString();
    }
    else {
      let weekDiffAndType = this.getWeekDiffAndType(currentDate);
      if (weekDiffAndType.type == "study_period" && weekDiffAndType.weekDiff <= 8) {
        return weekDiffAndType.weekDiff.toString();
      } else if (weekDiffAndType.type == "exam_period") {
        return "Tentavecka";
      }
      else {
        return "Självstudier";
      }
    }
  }

  render() {
    return (
      <div className="WeekDisplay">
        <p className="WeekDisplayText"> {this.genText()}</p>
      </div>
    );
  }
}

export default WeekDisplay;
