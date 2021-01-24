import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddBlueBackgroundComponent implements PluginComponent{
  constructor() {}

  // Blue background color HTML Tag
  addHTMLCode = (uid) => {
    $(`#cb-buttons-${uid}`).append(`
    <!-- Blue Background color button -->
          <div class="tool box1 m-1" title="Blue Background">
            <button class="btn btn-primary" id="add-background-cb-blue-${uid}">
              <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-fonts" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
                <path d="M12.258 3H3.747l-.082 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0
                .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.43.013c1.935.062 2.434.301 2.694
                1.846h.479L12.258 3z"/>
              </svg>
            </button>
          </div>
    `);
  }

  // Blue Background HTML Tag Click Action
  addClickFunction = (uid) => {
    // Adding Blue background color
    $(`#add-background-cb-blue-${uid}`).click(() => {
      $(`#cb-box-2-${uid}`)
          .removeClass(
            'cb-background-yellow cb-background-green cb-background-red'
          )
          .addClass('cb-background-blue');
    });
  }

  // Adding Blue Background color
  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`)
          .removeClass(
            'cb-background-yellow cb-background-green cb-background-red'
          )
          .addClass('cb-background-blue');
  }
}
