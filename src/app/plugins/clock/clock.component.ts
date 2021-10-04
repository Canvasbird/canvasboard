import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    this.clock();
  }


  clock() {
    const hours: any = document.getElementById('hour');
    const minutes: any = document.getElementById('minutes');
    const seconds: any = document.getElementById('seconds');
    
    var time = new Date();
    const h = if (time.getHours() < 10) "0" + time.getHours();
    const m = if (time.getMinutes() < 10) "0" + time.getMinutes();
    const s = if (time.getSeconds() < 10) "0" + time.getSeconds();
    
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;

    const interval = setInterval(this.clock, 1000);
  }
}
