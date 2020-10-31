declare var $: any;

export class AddFontKalamComponent {
  constructor() {}

  addKalamFontToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass('monospace-font playfair-font').addClass('kalam-font');
  }
}
