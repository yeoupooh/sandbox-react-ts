const categories = ["project1", "general"];

const hours = [{ category: "project1" }];

class Group {
  parent: Group;
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Task {
  parent: Group;
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class HourLog {
  task: Task;
  date: Date;
  hours: number;
  constructor(task: Task, date: Date, hours: number) {
    this.task = task;
    this.date = date;
    this.hours = hours;
  }
}

var projectsGroup = new Group("projects");
var project1 = new Group("project1");
project1.parent = projectsGroup;

var task1 = new Task("task1");
task1.parent = project1;

var task1log1 = new HourLog(task1, new Date("2019-11-06"), 2);
var task1log2 = new HourLog(task1, new Date("2019-11-07"), 3);
