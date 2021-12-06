import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddParaComponent implements PluginComponent {
    constructor() {}

    addHTMLCode = (uid) => {
        $(`#cb-buttons-${uid}`).append(`
    <!-- paragraph -->
    <div class="tool box4 mx-1" style="margin-bottom:5px;" title="Paragraph">
      <button class="btn btn-light d-flex align-items-center w-100" id="add-p-box2-${uid}" style="padding: 0.05rem 0.75rem;">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-text-paragraph" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0
            1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0
            1-.5-.5z" />
        </svg>
        <span class="pl-2">Paragraph</span>
      </button>
    </div>
    `);
    };

    addClickFunction = (uid) => {
        // Adding Paragraphs
        $(`#add-p-box2-${uid}`).click(() => {
            $(`#cb-box-2-${uid}`).removeClass('cb-H1 cb-H2 cb-H3');
        });
    };

    addToolBox = (uid) => {
        $(`#cb-box-2-${uid}`).removeClass('cb-H1 cb-H2 cb-H3');
    };
}
