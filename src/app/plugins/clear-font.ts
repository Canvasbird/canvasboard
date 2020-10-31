declare var $: any;

export class AddClearFontComponent {
  constructor() { }

  addClearFontToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass(
      'playfair-font monospace-font');
  }
}
