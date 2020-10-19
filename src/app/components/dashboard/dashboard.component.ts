import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Data } from 'src/interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router) { }

  data: Data[];

  ngOnInit() {
    this.data = [
      {
        imageUrl: 'https://i.gifer.com/XXM2.gif',
        title: 'Chapter 1',
        subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing eliteius.',
        id: 1,
        filters: ['one', 'two', 'three']

      },
      {
        imageUrl: 'https://img.wallpapersafari.com/tablet/1536/2048/2/20/JGTEAp.jpg',
        title: 'Chapter 2',
        subtitle: 'Lorem Lorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing eliteius.',
        id: 2,
        filters: ['one', 'two', 'three']

      },
    ];
  }

  navigateToFiles(e, item) {
    console.log('Working', item);
    this.route.navigate(['/files']);
  }
}
