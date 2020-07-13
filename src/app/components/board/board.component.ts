import { Component, OnInit, ViewChild, HostListener, Renderer } from '@angular/core';

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

  draw(){

  }

}
