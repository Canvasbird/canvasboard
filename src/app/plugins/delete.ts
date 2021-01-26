import { PluginComponent } from 'src/interfaces/plugin-component';
import { walkUpBindingElementsAndPatterns } from 'typescript';

declare var $: any;

export class AddDeleteComponent implements PluginComponent{

  prevCardID: string;
  constructor() {

  }

    // Delete HTML Tag
    addHTMLCode(uid) {

      $(`#cb-buttons-${uid}`).append(`
          <!-- delete button -->
            <div class="tool box1 m-1" title="Delete Card">
              <button class="btn btn-light" id="remove-cb-box1-${uid}">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1
              .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1
              1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5
              3V2h11v1h-11z"/>
            </svg>
              </button>
            </div>
      `);
    }

    // Delete HTML Tag Click Action
    addClickFunction = (uid) => {

      // Delete/Remove button
      $(`#remove-cb-box1-${uid}`).click(() => {
        // if (checker !== 0) {
        if ($(`#cb-box-1-${uid}`).prev(`.cb-box-1`).attr('id') !== undefined) {
          this.prevCardID = $(`#cb-box-1-${uid}`).prev(`.cb-box-1`).attr('id').substring(9);
        } else {
          this.prevCardID = undefined;
        }
        $(`#cb-box-1-${uid}`).remove();
        // }
      });
    }

    // Adding Delete
    addToolBox = (uid) => {
      if ($(`#cb-box-1-${uid}`).prev(`.cb-box-1`).attr('id') !== undefined){
        this.prevCardID = $(`#cb-box-1-${uid}`).prev(`.cb-box-1`).attr('id').substring(9);
      }else{
        this.prevCardID = undefined;
      }
      $(`#cb-box-1-${uid}`).remove();
    }



}
