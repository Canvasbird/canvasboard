import { Component, OnInit, ViewChild, HostListener, Renderer } from '@angular/core';
import {Pages} from '../../../interfaces/pages'
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  //referring the canvas element
  @ViewChild('myCanvas',null) canvas:any;

  //# Essentials
  canvasElement: any;
  scrHeight:any;
  scrWidth:any;
  globalListenFunc: Function;
  mouseControl:boolean = false;
  page:number;
  notebook:Pages[]=[];

  //## content declarations
  ctx:any;

  //# toolbox declarations
  //## Normal pen
  normalPen:boolean = false;
  normalPen_startX:number;
  normalPen_startY:number;
  normalPen_currentX:number;
  normalPen_currentY:number;
  normalPen_endX:number;
  normalPen_endY:number;



  //getting screen Width and height automatically triggers when dimension changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
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
          // this.ctx.strokeStyle = this.colour_selector;
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

  nextPage(){
    //save the state
    let present = {
      pageNumber: this.page,
      image: this.canvasElement.toDataURL(),
      //check if that page number is there or notement.toDataURL(),
      date: Date.now()
    };

    //checking if that page number is there or not
    // if found then update else append
    this.upsert(this.notebook, this.page,present)
    console.log(this.notebook);
    // console.log(present);
    // this.notebook.push(present);
    this.page = this.page + 1;
    this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);

    //if it already exists
    if(this.notebook[this.page]){
      let image = new Image();

      image.onload = (event) => {
        this.ctx.clearRect(0, 0, this.scrWidth, this.scrHeight);
        this.ctx.drawImage(image, 0, 0); // draw the new image to the screen
      }
      image.src = this.notebook[this.page].image;
    }


  }
  prevPage(){
    //save the state
    let present = {
      pageNumber: this.page,
      image: this.canvasElement.toDataURL(),
      //check if that page number is there or notement.toDataURL(),
      date: Date.now()
    };

    //checking if that page number is there or not
    // if found then update else append
    this.upsert(this.notebook, this.page ,present)
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

}
