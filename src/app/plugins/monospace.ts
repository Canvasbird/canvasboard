import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

declare var $: any;

export class AddFontMonospaceComponent implements BasePluginComponent {
  constructor() {}

  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass('playfair-font kalam-font').addClass('monospace-font');
  }
}
