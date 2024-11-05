import { LightningElement, track } from "lwc";
import getContributions from "@salesforce/apex/GitHubRestController.getContributions";

class ContributionDay {
  count;
  level;
  date;
  isValidDay;
  constructor(count, level, date, isValidDay) {
    this.count = count;
    this.level =
      level === "NONE"
        ? 0
        : level === "FIRST_QUARTILE"
          ? 1
          : level === "SECOND_QUARTILE"
            ? 2
            : level === "THIRD_QUARTILE"
              ? 3
              : level === "FOURTH_QUARTILE"
                ? 4
                : -1;
    this.date = date;
    this.isValidDay = isValidDay;
  }
}

class ContributionWeeks {
  sun;
  mon;
  tue;
  wed;
  thu;
  fri;
  sat;
  updateValues(sun, mon, tue, wed, thu, fri, sat) {
    this.sun = sun;
    this.mon = mon;
    this.tue = tue;
    this.wed = wed;
    this.thu = thu;
    this.fri = fri;
    this.sat = sat;
  }

  checkValueStatus() {
    return this.sun === null ||
      this.sun === undefined ||
      this.mon === null ||
      this.mon === undefined ||
      this.tue === null ||
      this.tue === undefined ||
      this.wed === null ||
      this.wed === undefined ||
      this.thu === null ||
      this.thu === undefined ||
      this.fri === null ||
      this.fri === undefined ||
      this.sat === null ||
      this.sat === undefined
      ? true
      : false;
  }
}

export default class ContributionGraph extends LightningElement {
  totalContributions;
  selectedTheme = "winter";
  username = "charangirijala";

  get themes() {
    return [
      { label: "Default", value: "default" },
      { label: "Halloween", value: "halloween" },
      { label: "Winter", value: "winter" }
    ];
  }
  currentYear;
  contributionsCalendar;
  @track contributionWeeks = new ContributionWeeks();

  connectedCallback() {
    this.callApexForContributions(this.username, new Date().getFullYear());
  }
  get sun() {
    return this.contributionWeeks.sun;
  }
  get mon() {
    return this.contributionWeeks.mon;
  }
  get tue() {
    return this.contributionWeeks.tue;
  }
  get wed() {
    return this.contributionWeeks.wed;
  }
  get thu() {
    return this.contributionWeeks.thu;
  }
  get fri() {
    return this.contributionWeeks.fri;
  }
  get sat() {
    return this.contributionWeeks.sat;
  }

  handleThemeChange(event) {
    this.selectedTheme = event.detail.value;
  }
  callApexForContributions(username, year) {
    this.currentYear = year;
    console.log("Calling API");
    getContributions({
      username: username,
      year: year
    })
      .then((content) => {
        console.log("Contribution details fetched");
        if (!content.errors) {
          this.contributionsCalendar =
            content.data.user.contributionsCollection.contributionCalendar;
          this.processContributionData();
        }
      })
      .catch((err) => {
        console.log("Error fetching contribution details: ", err);
      });
  }

  processContributionData() {
    //     console.log("processContributionData running");
    this.firstCall = false;
    this.totalContributions = this.contributionsCalendar.total;
    const weeks = this.contributionsCalendar.weeks;
    let sun = [];
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let firstWeek = true;
    weeks.forEach((week) => {
      const days = week.days;
      if (firstWeek) {
        let dayMap = new Map();
        days.forEach((day) => {
          dayMap.set(day.weekday, day);
        });
        if (dayMap.has(0)) {
          const temp = dayMap.get(0);
          sun.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          sun.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(1)) {
          const temp = dayMap.get(1);
          mon.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          mon.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(2)) {
          const temp = dayMap.get(2);
          tue.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          tue.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(3)) {
          const temp = dayMap.get(3);
          wed.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          wed.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(4)) {
          const temp = dayMap.get(4);
          thu.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          thu.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(5)) {
          const temp = dayMap.get(5);
          fri.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          fri.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        if (dayMap.has(6)) {
          const temp = dayMap.get(6);
          sat.push(
            new ContributionDay(temp?.count, temp?.level, temp?.datex, true)
          );
        } else {
          sat.push(new ContributionDay(0, "NONE", "0000-00-00", false));
        }
        firstWeek = false;
      } else {
        days.forEach((day) => {
          if (day.weekday === 0) {
            sun.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 1) {
            mon.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 2) {
            tue.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 3) {
            wed.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 4) {
            thu.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 5) {
            fri.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
          if (day.weekday === 6) {
            sat.push(
              new ContributionDay(day.count, day.level, day.datex, true)
            );
          }
        });
      }
    });

    // this.contributionWeeks.updateValues(sun, mon, tue, wed, thu, fri, sat);
    this.contributionWeeks.sun = sun;
    this.contributionWeeks.mon = mon;
    this.contributionWeeks.tue = tue;
    this.contributionWeeks.wed = wed;
    this.contributionWeeks.thu = thu;
    this.contributionWeeks.fri = fri;
    this.contributionWeeks.sat = sat;

    //     console.log("Sun: ", JSON.stringify(sun));
    //     console.log("Mon: ", JSON.stringify(mon));
    //     console.log("Tue: ", JSON.stringify(tue));
    //     console.log("Wed: ", JSON.stringify(wed));
    //     console.log("Thu: ", JSON.stringify(thu));
    //     console.log("Fri: ", JSON.stringify(fri));
    //     console.log("Sat: ", JSON.stringify(sat));
  }
}
