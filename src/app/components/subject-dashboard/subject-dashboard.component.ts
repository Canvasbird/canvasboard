import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-subject-dashboard',
  templateUrl: './subject-dashboard.component.html',
  styleUrls: ['./subject-dashboard.component.scss']
})
export class SubjectDashboardComponent implements OnInit {

  constructor(
     ) { }
  user = 'teacher';
  imageInfo: any;

  @ViewChild('uploadContent', { read: ElementRef, static: false }) uploadContent: ElementRef;

  ngOnInit() {
  }

  uploading() {
    this.uploadContent.nativeElement.click();
  }

  uploadingContent(imageInput: any) {
    const file = imageInput.files[0];
    const fileReader = new FileReader();
  }

uploadNewCourseContent(imageInput: any) {
  const file = imageInput.files[0];
  const fileReader = new FileReader();
}

}
