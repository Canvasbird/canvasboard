import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddLeftAlignComponent implements PluginComponent{
  constructor() {}
    // Left Align Tag
    addHTMLCode(uid) {

      $(`#cb-buttons-${uid}`).append(`
      <!-- H1 tag -->
      <div class="tool box1 m-1" title="Left Align">
        <button class="btn btn-light" id="add-left-align-box2-${uid}">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-left" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0
              1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0
              1-.5-.5z" />
          </svg>
        </button>
      </div>
      `);
    }

    addClickFunction = (uid) => {
        // Adding Left Align Tag Click Function
        $(`#add-left-align-box2-${uid}`).click(() => {
          $(`#cb-box-2-${uid}`).removeClass('text-center text-right').addClass('text-left');
        });
    }
  // Left Aligned Component
  addToolBox = (uid) => {
    $(`#cb-box-2-${uid}`)
      .removeClass('text-center text-right')
      .addClass('text-left');
  }
}
