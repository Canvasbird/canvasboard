import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddH1Component implements PluginComponent {

  constructor() {

  }

    // H1 HTML Tag
    addHTMLCode(uid) {
      // console.log('Calling h1 html');

      $(`#cb-buttons-${uid}`).append(`
      <!-- H1 tag -->
      <div class="tool box1 m-1" title="H1">
        <button class="btn btn-light" id="add-h1-box2-${uid}">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-h1" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.637
              13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5
              5.316v1.265l2.16-1.565h.062V13h1.244z" />
          </svg>
        </button>
      </div>
      `);
    }

    addClickFunction = (uid) => {
        // Adding H1 Tags
        $(`#add-h1-box2-${uid}`).click(() => {
          this.addToolBox(uid);
        });
    }

    addToolBox = (uid) => {
      $(`#cb-box-2-${uid}`).removeClass('cb-H2 cb-H3').addClass('cb-H1');
    }

}
