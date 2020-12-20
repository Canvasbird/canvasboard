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

    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();

    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;

    const interval = setInterval(this.clock, 1000);
  }
}
