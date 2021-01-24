import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

declare var $: any;

export class AddFontKalamComponent implements BasePluginComponent{
  constructor() {}

  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass('monospace-font playfair-font').addClass('kalam-font');
  }
}
