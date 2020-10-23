import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  subjectName = 'Math';
  className = '4a';
  assignmentName = 'Assignment 1';
  studentList: Array<Object> = [
    {
      name: 'Student 1',
      submitionStatus: 'submitted',
      gradedStatus: 'graded',
    },
    {
      name: 'Student 2',
      submitionStatus: 'not submitted',
      gradedStatus: 'not graded',
    },
    {
      name: 'Student 3',
      submitionStatus: 'submitted',
      gradedStatus: ' not graded',
    },
    {
      name: 'Student 4',
      submitionStatus: 'submitted',
      gradedStatus: 'graded',
    },
    {
      name: 'Student 5',
      submitionStatus: 'submitted',
      gradedStatus: 'not graded',
    },
    {
      name: 'Student 6',
      submitionStatus: 'submitted',
      gradedStatus: 'graded',
    },
    {
      name: 'Student 7',
      submitionStatus: 'not submitted',
      gradedStatus: 'not graded',
    }
  ];
  filters = {
    graded: false,
    notGraded: false,
    submitted: false,
    notSubmitted: false,
    name: ''
  };
  filteredStudents: Array<object>;

  constructor() {
    this.filteredStudents = this.studentList;
  }

  ngOnInit() {
  }

  exportCsv() {
    console.log(this.studentList);
    let csvContent = 'data:text/csv;charset=utf-8,' + this.studentList.map(e => [e['name'], e['submitionStatus'], e['gradedStatus']].join(',') ).join('\n');
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');
    document.body.appendChild(link);
    link.click();
  }

  checkFilter(student) {
    let status = true;
    if (this.filters.graded && student.gradedStatus !== 'graded') {
      status = false;
    }
    if (this.filters.notGraded && student.gradedStatus !== 'not graded') {
      status = false;
    }
    if (this.filters.submitted && student.submitionStatus !== 'submitted') {
      status = false;
    }
    if (this.filters.notSubmitted && student.submitionStatus !== 'not submitted') {
      status = false;
    }
    if (!(student.name.toLowerCase().includes(this.filters.name))) {
      status = false;
    }
    return status;
  }

  onFilter() {
    this.filteredStudents = [];
    this.studentList.forEach((student) => {
      if (this.checkFilter(student)) {
        this.filteredStudents.push(student);
      }
    });
  }

}
