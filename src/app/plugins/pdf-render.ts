import { PluginComponent } from 'src/interfaces/plugin-component';

declare var $: any;

export class AddPdfRenderComponent implements PluginComponent{

  constructor() {

  }

  // PdfRender HTML Tag
  addHTMLCode(uid) {
    // console.log('Calling PdfRender html');

    $(`#cb-buttons-${uid}`).append(`
          <!-- PdfRender button -->
            <div class="tool box1 m-1" title="PdfRender">
              <button class="btn btn-light" id="add-pdf-render-box2-${uid}">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi
              bi-file-earmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0
                2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0H4zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
              </svg>
              </button>
            </div>
      `);
  }

  // PdfRender HTML Tag Click Action
  addClickFunction = (uid, file: string = '') => {
    // PdfRender button
    $(`#pdf-render-cb-box1-${uid}`).click(() => {
      if (file !== '') {
        $(`#cb-box-2-${uid} .cb-box-3`).css('display', 'none');
        $(`#cb-box-2-${uid}`).append(`
        <embed src="${file}" height='600' width="100%" />
        `);
      }
    });
  }

  // Adding PdfRender
  addToolBox = (uid, file: File, reader: FileReader) => {

    let result: any;
    console.log(file);
    $(`#cb-box-2-${uid} .cb-box-3`).css('display', 'none');
    reader.onloadend = () => {
      // convert file to base64 string
      result = reader.result;
      $(`#cb-box-2-${uid}`).append(`
      <embed src="${result}" height='600' width="100%" />
      `);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

}
