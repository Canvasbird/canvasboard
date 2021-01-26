import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

declare var $: any;

export class AddClearFontComponent implements BasePluginComponent {
  constructor() { }

  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass(
      'playfair-font monospace-font kalam-font');
  }
}
