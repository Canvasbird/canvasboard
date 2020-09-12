import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.disableTitleEnter();
  }

  // function to disable enter keyword in title.
  disableTitleEnter() {
    $("#title[contenteditable]").keypress(function (evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 13) {
        //Enter key's keycode
        return false;
      }
    });
  }

}
