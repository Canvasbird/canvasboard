import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddUnOrderedListComponent implements PluginComponent {

  constructor() {

  }

    // UnOrderedList HTML Tag
    addHTMLCode(uid) {

      $(`#cb-buttons-${uid}`).append(`
          <!-- Unordered list button -->
          <div class="tool box1 m-1" id="add-unordered-list-${uid}" title="Unordered List">
            <button class="btn btn-light">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list-ul" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0
                1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0
                4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </button>
          </div>
      `);
    }

    // UnOrderedList HTML Tag Click Action
    addClickFunction = (uid) => {
        // Adding UnOrderedList Tags
        $(`#add-unordered-list-${uid}`).click(() => {
        $(`#original-${uid}`).append(
          `<ul>
          <li></li>
          </ul>`
        );
      });
    }

    // Adding UnOrderedList
    addToolBox = (uid) => {
     $(`#original-${uid}`).append(
          `<ul>
          <li></li>
          </ul>`
        );
    }

}
