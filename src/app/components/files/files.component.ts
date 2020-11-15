import { Component, OnInit } from '@angular/core';
import {Data, Router, ActivatedRoute} from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  longImageUrl = `
  https://thumbs.dreamstime.com/b/vector-irregular-polygon-background-triangular-pattern-full-color-spectrum-rainbow-abstract-80468723.jpg
  `;

  data: Data;
  activateID: Data;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => this.activateID = params );
  }

  ngOnInit() {

    this.data = [
      {
        imageURL: 'https://i.gifer.com/XXM2.gif',
        title: 'Chapter 1',
        subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing eliteius.',
        id: 1,
        filters: ['one', 'two', 'three']

      },
      {
        imageURL: 'https://img.wallpapersafari.com/tablet/1536/2048/2/20/JGTEAp.jpg',
        title: 'Chapter 2',
        subtitle: 'Lorem Lorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing eliteius.',
        id: 2,
        filters: ['one', 'two', 'three']

      },
      {
        imageURL: '',
        title: 'Chapter 3',
        subtitle: 'Lorem ipsum dolor sit amet consecLorem ipsum dolor sit amet.tetur adipisicing eliteius.',
        id: 3,
        filters: ['one', 'two', 'three']

      },
      {
        imageURL: 'https://i.pinimg.com/originals/db/64/a9/db64a98c70a688f6f509daf9c838be39.jpg',
        title: 'Chapter 4',
        subtitle: 'LoremLorem ipsum dolor sit amet. ipsum dolor sit amet consectetur adipisicing eliteius.',
        id: 4,
        filters: ['one', 'two', 'three']

      },
      {
        imageURL: 'https://miro.medium.com/max/1080/1*hU0QQDiOnsKpX4qlIyn_4w.jpeg',
        title: 'Chapter 5',
        subtitle: 'Lorem ipsum dolor sit amet conseLorem ipsum dolor sit amet.ctetur adipisicing eliteius.',
        id: 5,
        filters: ['one', 'two', 'three']

      },
    ];
  }

  viewCreativeBoard = (e, item) => {
    console.log('Working', item);
  }

  editCreativeBoard = (e, item) => {
    this.route.navigate(['/creative-board']);
  }

  backtoDashboard = () => {
    this.route.navigate(['/dashboard']);
  }

}
