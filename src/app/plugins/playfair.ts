declare var $: any;

export class AddFontPlayfairComponent {
  constructor() {}

  addPlayfairFontToolBox = (uid) => {
    $(`#cb-box-2-${uid}`).removeClass('monospace-font').addClass('playfair-font');
  }
}
