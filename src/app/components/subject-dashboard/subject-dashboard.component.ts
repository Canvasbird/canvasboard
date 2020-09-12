import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-subject-dashboard',
  templateUrl: './subject-dashboard.component.html',
  styleUrls: ['./subject-dashboard.component.scss']
})
export class SubjectDashboardComponent implements OnInit {

  constructor(
    // private imageService: ImageService,
    // private pdfService: PdfService,
    // private videoService: VideoService,
     ) { }
  user = 'teacher';
  imageInfo: any;

  @ViewChild('uploadContent', { read: ElementRef, static: false }) uploadContent: ElementRef;

  //
  uploadResponseOfNewCourseContent = { status: '', message: 0, filePath: '' };
NewCourseImageSRCS: Array<any> = [];
NewCourseVideoSRCS: Array<any> = [];
NewCoursePdfData: Array<any> = [];
showImageOnNewCourse = [];
showVideoOnNewCourse: any;
showPdfOnNewCourse = [];
showImageOnUplaodingInCourse = [];
showPdfOnUplaodingInCourse = [];
  ngOnInit() {
  }

  uploading() {
    this.uploadContent.nativeElement.click();
  }

  uploadingContent(imageInput: any) {
    const file = imageInput.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener('load', (event: any) => {
      console.log(event.target.result);
      // this.profileService.profileImageUpload(file).subscribe(
      //   (res: any) => {
      //     console.log('imgResponse', res);

      //     if (typeof res === 'object') {
      //       const progress = Math.round((100 * res.loaded) / res.total);
      //       console.log('progress', progress);
      //       if (progress === 100) {
      //         this.commonService.openSnackBar('successfully updated ', '', 2000);
      //         this.imageUrl = fileReader.result;
      //         console.log('imageInfo', this.imageUrl);
      //       }
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    });

    fileReader.readAsDataURL(file);
  }

  //
uploadNewCourseContent(imageInput: any) {
  const file = imageInput.files[0];
  const fileReader = new FileReader();
  if (file.type.match('image')) {
    fileReader.addEventListener('load', (event: any) => {
      // console.log(event.target.result);
      // this.imageService.uploadImage(file).subscribe(
      //   (res: any) => {
      //     this.uploadResponseOfNewCourseContent = res;
      //     if (typeof res === 'object') {
      //       if ('id' in res) {
      //         this.showImageOnNewCourse.push(fileReader.result); // to show image at the time of uplaoding
      //         if(this.contentOfNewCourse && this.contentOfNewCourse.$content_images_list != undefined && this.contentOfNewCourse.$content_images_list.length > 0){
      //           this.contentOfNewCourse.$content_images_list.push(res.id);
      //         }
      //         else if(this.contentOfNewCourse && this.contentOfNewCourse.$content_images_list === undefined){
      //           this.contentOfNewCourse.$content_images_list = [res.id ];
      //         }
      //         this.NewCourseImageSRCS.push({
      //           image_storage_url: fileReader.result,
      //           content_type: 'image/jpeg',
      //           image_name: file.name,
      //           image_size: file.size
      //         });
      //         console.log('**ImageContentOnUpdateMode', this.NewCourseImageSRCS, this.contentOfNewCourse);
      //       }
      //     }
      //     console.log('@@@@@uploadIMage', res, this.showImageOnUplaodingInCourse);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );




    });

    fileReader.readAsDataURL(file);
  } else if (file.type.match('pdf')) {
    fileReader.addEventListener('load', (event: any) => {
      // this.pdfService.uploadPdf(file).subscribe(
      //   (res: any) => {
      //     console.log(res);
      //     this.uploadResponseOfNewCourseContent = res;
      //     if (typeof res === 'object') {
      //       if ('id' in res) {
      //         this.showPdfOnNewCourse.push(fileReader.result);//to show pdf at the time of uplaoding
      //         if(this.contentOfNewCourse && this.contentOfNewCourse.$content_pdf_list != undefined && this.contentOfNewCourse.$content_pdf_list.length > 0){
      //           this.contentOfNewCourse.$content_pdf_list.push(res.id);
      //         }
      //         else if(this.contentOfNewCourse && this.contentOfNewCourse.$content_pdf_list == undefined){
      //           this.contentOfNewCourse.$content_pdf_list = [res.id];
      //         }
      //         this.NewCoursePdfData.push({ pdf_storage_url: null, content_type: "application/pdf", pdf_name: file.name, pdf_size: file.size });
      //       }
      //     }
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      console.log('pdfUploadData', this.showPdfOnUplaodingInCourse);
    });

    fileReader.readAsDataURL(file);
  } else if(file.type.match('video')) {
// code comment for build

    // fileReader.addEventListener("load", (event: any) => {
    //   var blob = new Blob([fileReader.result], { type: file.type });
    //   var url = URL.createObjectURL(blob);
    //   var video = document.createElement("video");
    //   var timeupdate = function () {

    //     if (snapImage()) {
    //       video.removeEventListener("timeupdate", timeupdate);
    //       video.pause();
    //     }
    //   };

    //   video.addEventListener("loadeddata", function () {
    //     if (snapImage()) {
    //       video.removeEventListener("timeupdate", timeupdate);
    //     }
    //   });


    //   var snapImage = () => {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = video.videoWidth;
    //     canvas.height = video.videoHeight;
    //     var img = document.createElement("img");
    //     canvas
    //       .getContext("2d")
    //       .drawImage(video, 0, 0, canvas.width, canvas.height);
    //     var image = canvas.toDataURL();
    //     var success = image.length > 100000;
    //     if (success) {
    //       this.NewCourseVideoSRCS.push({
    //         video_storage_url: image,
    //         content_type: "video/mp4",
    //         video_name: file.name,
    //         video_size: file.size
    //       });
    //       URL.revokeObjectURL(url);
    //     }
    //     return success;
    //   };


    //   video.addEventListener("timeupdate", timeupdate);
    //   video.preload = "metadata";
    //   video.src = url;
    //   // Load video in Safari / IE11
    //   video.muted = true;
    //   video.play();
    //   this.videoService.uploadVideo(file).subscribe(
    //     (res: any) => {
    //       // console.log(res);
    //       this.uploadResponseOfNewCourseContent = res;
    //       if (typeof res === 'object') {
    //         if ('id' in res) {
    //           this.showVideoOnNewCourse = fileReader.result;//to show video at the time of uplaoding
    //           if(this.contentOfNewCourse && this.contentOfNewCourse.$content_video_list !=undefined && this.contentOfNewCourse.$content_video_list.length > 0){
    //             this.contentOfNewCourse.$content_video_list.push(res.id);
    //           }
    //           else if(this.contentOfNewCourse && this.contentOfNewCourse.$content_video_list ==undefined){
    //             this.contentOfNewCourse.$content_video_list = [res.id];
    //           }
    //         }
    //       }
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // });

    fileReader.readAsArrayBuffer(file);
  } else {
    // this.commonService.openSnackBar('Not Allowed to Uplaod')
  }
}
}
