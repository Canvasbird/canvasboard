import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

declare var $: any;

export class AddFontPlayfairComponent implements BasePluginComponent {
  constructor() { }

  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass('monospace-font kalam-font').addClass('playfair-font');
  }
}
