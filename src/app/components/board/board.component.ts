import { Component, OnInit, ViewChild, HostListener, Renderer } from '@angular/core';
import {Pages} from '../../../interfaces/pages'
import {Tracking} from '../../../interfaces/tracking'
import { log } from 'util';
declare const pdfjsLib:any
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //referring the canvas element
  @ViewChild('myCanvas',null) canvas:any;
  @ViewChild('backgroundImage',null) background:any;

  //# Essentials
  canvasElement: any;
  backgroundCanvas:any;
  scrHeight:any;
  scrWidth:any;
  globalListenFunc: Function;
  mouseControl:boolean = false;
  page:number;
  notebook:Pages[]=[];
  // for PDF.js
  pdf_js:any;
  no_of_pages: any;
  //PDF tracking
  pageTracking:Tracking[] = [];
  pdf_added_boolean:boolean = false
  //## content declarations
  ctx:any;

  // fileUpload
  filePath:string;


  //tools
  penColour:any;

  //# toolbox declarations
  //## Normal pen
  normalPen:boolean = false;
  normalPen_startX:number;
  normalPen_startY:number;
  normalPen_currentX:number;
  normalPen_currentY:number;
  normalPen_endX:number;
  normalPen_endY:number;

 //for Brush
 brush:boolean = false;
 brush_startX:number;
 brush_startY:number;
 brush_currentX:number;
 brush_currentY:number;
 brush_endX:number;
 brush_endY:number;

  //getting screen Width and height automatically triggers when dimension changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth-220;
  }

  constructor(public renderer:Renderer) {
    this.getScreenSize();
  }

  ngOnInit() {
  this.page = 0;
  console.log("Screen width :", this.scrWidth, "Screen height", this.scrHeight );

  // getting the 2D context of Canvas element
  this.canvasElement=this.canvas.nativeElement;
  this.ctx = this.canvasElement.getContext('2d');
  //setting the Width and Height to the canvas element
  this.renderer.setElementAttribute(this.canvasElement, 'width', this.scrWidth);
  this.renderer.setElementAttribute(this.canvasElement, 'height', this.scrHeight);

  //for background
  this.backgroundCanvas = this.background.nativeElement;
  this.renderer.setElementAttribute(this.backgroundCanvas, 'width', this.scrWidth);
  this.renderer.setElementAttribute(this.backgroundCanvas, 'height', this.scrHeight);
  }

  addPdf(page_number){
    this.pdf_js.promise.then(doc => {
      console.log("PDF LOADED");
      console.log("THis pdf has ", doc._pdfInfo.numPages);
      // this.no_of_pages = doc._pdfInfo.numPages

      doc.getPage(page_number).then(page => {
        let canvas:any = document.getElementById("my_canvas")
        let context:any = canvas.getContext("2d")
        let viewport:any = page.getViewport({ scale: 1.3})
        viewport.height=this.scrHeight
        this.pdf_added_boolean = true
        // viewport.width = '200px';
        page.render({
          canvasContext: context,
          viewport: viewport
        })
      })

    })
  }

  //pen Button
  penButton(){
    console.log("Working!");
    //Enabling brush and disabiling other tools
    this.normalPen = true;
    //disabling others

    // post checking
    if(this.normalPen){
      //When mouse is pressed down
      this.globalListenFunc = this.renderer.listen('document', 'mousedown', e => {
        this.mouseControl = true
        console.log("Mouse down");

        // taking mouse down X and Y coordinates
        this.normalPen_startX = e.offsetX
        this.normalPen_startY = e.offsetY
      })

      //When Mouse is moving
      this.globalListenFunc = this.renderer.listen('document', 'mousemove', e => {
        if(this.mouseControl){
          console.log("Mouse is moving!");

          this.normalPen_currentX = e.offsetX
          this.normalPen_currentY = e.offsetY

          this.ctx.beginPath();
          this.ctx.moveTo(this.normalPen_startX,this.normalPen_startY);
          this.ctx.lineTo(this.normalPen_currentX,this.normalPen_currentY);
          this.ctx.closePath();
          this.ctx.strokeStyle = this.penColour;
          // this.ctx.lineWidth = this.line_width;
          this.ctx.stroke();

          // console.log(e,"Mouse move");
          this.normalPen_startX = this.normalPen_currentX;
          this.normalPen_startY = this.normalPen_currentY;
        }

      })

      //When mouse is moved up
      this.globalListenFunc = this.renderer.listen('document', 'mouseup', e => {
        this.mouseControl = false;
        console.log("Mouse up");
        this.normalPen_endX = e.offsetX;
        this.normalPen_endY = e.offsetY;
      });
    }
  }


  localUrl: any[];

  showPreviewImage(event: any) {
    //checking if file is uploading
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
            this.pdf_js = pdfjsLib.getDocument(this.localUrl)

            this.pdf_js.promise.then(doc => {
              console.log("PDF LOADED");
              console.log("THis pdf has ", doc._pdfInfo.numPages);
              this.no_of_pages = doc._pdfInfo.numPages

            //once the whole file is uploaded
            // this.function_PDF_tracking(this.no_of_pages)
            this.addPdf(1)
            })

        }
        reader.readAsDataURL(event.target.files[0]);
        console.log("Local URL", this.localUrl);
    }
}

function_PDF_tracking(num){
  //setting up pdf tracking
  for(let i=0;i<num;i++) {
    console.log(i);

    //by default 1st page is visited
    if(i==0){
      let obj = {}
      obj["page"] = i+1
      obj["status"] = "visited"
      console.log(obj);
      // this.pageTracking.push(obj)
    }else{
    let obj = {
      page: i+1,
      status: "novisit"
    }
    console.log(obj);
    // this.pageTracking.push(obj)
    }
  }
  console.log("All my pages", this.pageTracking);
}

  async nextPage(){
    //save the state
    let present = {
      pageNumber: this.page,
      image: this.canvasElement.toDataURL(),
      //check if that page number is there or notement.toDataURL(),
      date: Date.now()
    };

    console.log(present,"Added to my notebook");
    //checking if that page number is there or not
    // if found then update else append
    this.upsert(this.notebook, this.page ,present)
    this.pdfTick(this.pageTracking, this.page);
    //Going to new page
    console.log("Stored page number", this.page);


    //new page configurations
    this.page = this.page + 1;
    console.log("New page number", this.page);

    // clearing my rect
    this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);

    if(this.pdf_added_boolean){
          // if pdf page is already rendered then dont add.. else add the pdf
    let temp = this.pageTracking.findIndex(_item => _item.pageNumber === this.page)
    if(temp >-1){
      //page number is already there in pagetracking
      console.log("Page number found in tracking list so not adding");

    }else{
      console.log("As page number is not found in tracking list we are adding it");

      await this.addPdf(this.page+1)
    }
    }

    // for(let i=0;i<this.pageTracking.length;i++){
    //   //page is already rendered
    //   if(this.page<=this.pageTracking.length){
    //     console.log("Not adding");
    //   }
    //   else{
    //     await this.addPdf(this.page+1)
    //   }
    // }

    //if it already exists append
    if(this.notebook[this.page]){
      console.log("Loading page", this.page);

      // this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);
      let image = new Image();

      image.onload = (event) => {
        this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);
        console.log("Image width",image.width);
        image.width = this.scrWidth

        this.ctx.drawImage(image, 0, 0); // draw the new image to the screen
      }
      image.src = this.notebook[this.page].image;
    }

    console.log("Man at end", this.notebook);

  }
  prevPage(){
    if(this.page > 0){
          //save the state
    let present = {
      pageNumber: this.page,
      image: this.canvasElement.toDataURL(),
      //check if that page number is there or notement.toDataURL(),
      date: Date.now()
    };

    //adding it to the tracking list as this page is visited
    this.pdfTick(this.pageTracking, this.page);

    //checking if that page number is there or not
    // if found then update else append
    this.upsert(this.notebook, this.page ,present)
    console.log("Stroing the page number which prev is pressed", present);

    console.log(this.notebook);

    this.page = this.page - 1;
    var image = new Image();

    image.onload = (event) => {
      this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);
      this.ctx.drawImage(image, 0, 0); // draw the new image to the screen
    }
    image.src = this.notebook[this.page].image;

    // for (let index = 0; index < this.notebook.length; index++) {
    //   if(this.page){
    //     var image = new Image();
    //     image.onload = (event) => {
    //       this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);
    //       this.ctx.drawImage(image, 0, 0); // draw the new image to the screen
    //     }
    //     image.src = this.notebook[index].image; // data.image contains the data URL

    //     console.log(image);

    //   }
    // }

    console.log(this.page);
    }

    console.log("Man at end", this.notebook);
  }
  pdfTick(array,pageNumber){
    if(pageNumber <= this.no_of_pages){
      const i = array.findIndex(_item => _item.pageNumber === pageNumber);
      if (i > -1) {
      } // Page number found
      else{
          let obj = {
            pageNumber: pageNumber,
            status:"visited",
          }
          array.push(obj);
          console.log("PDF TRACKING", obj);

      } //page not found

      console.log("My final Array",this.pageTracking);
    }

  }

  upsert(array, pageNumber, obj) {
    const i = array.findIndex(_item => _item.pageNumber === pageNumber);
    if (i > -1) {
      array[i] = obj;
      console.log("Found page numberr");

    } // Page number found
    else{
      array.push(obj);
      console.log("New page!!");

    } //adding new page number
  }

  downloadAsJSON(){
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.notebook));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'data.json';
    a.innerHTML = 'download JSON';

    var container = document.getElementById('container');
    container.appendChild(a);
  }


  //Add normal paper
  addNormalPaper(){
    let ctx:any = document.getElementById("backgroundImage")
    if (ctx.getContext) {
      ctx = ctx.getContext('2d');
      var img1 = new Image();
      img1.onload = (event) => {
        //draw background image
        console.log(img1.width);
        img1.width = 1000
        img1.height = 1000

        ctx.drawImage(img1, 0, 0,this.scrWidth,this.scrHeight);


    };
    img1.src = "https://github.com/Canvasbird/canvasboard/blob/master/src/assets/College-Ruled-Papers-Template-A4-Size-650x823.png?raw=true"
    }
  }

  colourPick(){
    console.log("Colour changed");
    let data:any = document.getElementById("myColor")
    this.penColour = data.value
    console.log(this.penColour,"Colour");
  }
}
