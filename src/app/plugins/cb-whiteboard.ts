declare var $: any;
import { fabric } from 'fabric';

export class AddCanvasBoard {
  constructor() {}

    // Adding canvasboard
    addCanvasBoardHTMLCode = (uid) => {
      $(`#cb-buttons-${uid}`).append(`
        <!-- Canvas Board -->
        <div class="tool box1 m-1">
          <button class="btn btn-light" id="add-canvas-cb-${uid}">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2
            0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
          </button>
        </div>
      `);
    }

    addCanvasBoardToolbox = (uid) => {
      const parentWidth = $(`#original-${uid}`).width();
      $(`#original-${uid}`).attr('contenteditable', false);
      console.log('Working canvas board');
      $(`#original-${uid}`).append(`
      <div id="canvas-menu-box" class="canvas-menu-box">
          <input id="canvas-menu-box-color-${uid}" type="color" style="margin-left: 10%; margin-bottom: 5px;">
          <button id="canvas-menu-box-pencil-${uid}" class="btn btn-light m-2">
            <svg height="1em" viewBox="-1 0 446 446.376" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="m118.730469 61.304688-57.886719 58.105468 294.644531 295.75 57.890625-58.101562zm0 0"/>
              <path d="m366.605469 421.003906 77.128906 25.371094-24.628906-78.066406zm0 0"/>
              <path d="m62.871094 5.230469c-3.242188-3.324219-7.683594-5.2070315-12.328125-5.230469-4.332031-.00390625-8.488281
              1.734375-11.53125 4.820312l-33.589844 33.714844c-6.816406 6.84375-7 18.214844-.410156 24.832032l47.363281 47.542968
              57.886719-58.109375zm0 0"/>
            </svg>
          </button>
          <button id="canvas-menu-box-delete-${uid}" class="btn btn-light m-2" disabled=false>
            <svg id="Icons" height="1em" viewBox="0 0 74 74" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="m56.082 72h-38.164a3.079 3.079 0 0 1 -3.05-2.805l-4.36-52.061a1 1 0 0 1 1-1.083h50.992a1 1 0 0 1 1 1.083l-4.36
              52.061a3.079 3.079 0 0 1 -3.058 2.805zm-43.49-53.949 4.27 50.977a1.066 1.066 0 0 0 1.056.972h38.164a1.066 1.066 0 0 0
              1.057-.972l4.27-50.977z"/>
              <path d="m66.172 18.06h-58.344a2.17 2.17 0 0 1 -2.167-2.167v-5.041a2.169 2.169 0 0 1 2.167-2.167h58.344a2.169 2.169 0 0 1
              2.167 2.167v5.042a2.17 2.17 0 0 1 -2.167 2.166zm-58.344-7.375a.167.167 0 0 0 -.167.167v5.042a.167.167 0 0 0
              .167.167h58.344a.167.167 0 0 0 .167-.167v-5.042a.167.167 0 0 0 -.167-.167z"/>
              <path d="m45.812 10.685h-17.624a1 1 0 0 1 -1-1v-5.067a2.621 2.621 0 0 1 2.618-2.618h14.388a2.621 2.621 0 0 1 2.618
              2.618v5.067a1 1 0 0 1 -1 1zm-16.624-2h15.624v-4.067a.618.618 0 0 0 -.618-.618h-14.388a.618.618 0 0 0 -.618.618z"/>
              <path d="m47.462 56.03c-.029 0-.059 0-.088 0a1 1 0 0 1 -.909-1.083l2.289-26.131a1 1 0 1 1 1.992.175l-2.288 26.127a1 1 0 0 1
              -.996.912z"/>
              <path d="m37 56.03a1 1 0 0 1 -1-1v-26.13a1 1 0 1 1 2 0v26.13a1 1 0 0 1 -1 1z"/>
              <path d="m26.538 56.03a1 1 0 0 1 -1-.913l-2.284-26.13a1 1 0 1 1 1.992-.175l2.289 26.131a1 1 0 0 1 -.909
              1.083c-.026.003-.059.004-.088.004z"/>
            </svg>
          </button>
          <button id="canvas-menu-box-move-${uid}" class="btn btn-light m-2">
            <svg id="Capa_1" enable-background="new 0 0 512 512" height="1em" viewBox="0 0 512 512" width="1em"
            xmlns="http://www.w3.org/2000/svg">
              <path d="m507.606 245.394-68.703-68.703c-4.29-4.291-10.742-5.572-16.347-3.252-5.605 2.322-9.26 7.791-9.26
              13.858v19.896h-108.488v-108.489h19.896c6.067 0 11.536-3.654 13.858-9.26 2.321-5.605
              1.038-12.057-3.252-16.347l-68.704-68.703c-2.812-2.814-6.627-4.394-10.606-4.394s-7.794 1.58-10.606
              4.394l-68.704 68.704c-4.29 4.29-5.573 10.741-3.252 16.347 2.322 5.605 7.791 9.26 13.858
              9.26h19.896v108.489h-108.488v-19.896c0-6.067-3.654-11.536-9.26-13.858-5.603-2.32-12.057-1.039-16.347 3.252l-68.703
              68.702c-2.814 2.812-4.394 6.628-4.394 10.606s1.58 7.794 4.394 10.606l68.704 68.704c2.869 2.87 6.706 4.395 10.609 4.394 1.933
              0 3.882-.373 5.737-1.142 5.605-2.322 9.26-7.791 9.26-13.858v-19.896h108.489v108.489h-19.896c-6.067 0-11.536 3.654-13.858
              9.26-2.321 5.605-1.038 12.057 3.252 16.347l68.703 68.703c2.929 2.93 6.768 4.394 10.606 4.394s7.678-1.465
              10.606-4.394l68.704-68.703c4.29-4.29 5.573-10.741
              3.252-16.347-2.322-5.605-7.791-9.26-13.858-9.26h-19.896v-108.489h108.489v19.896c0 6.067 3.654 11.536 9.26 13.858
              1.856.769 3.805 1.142 5.737 1.142 3.903 0 7.74-1.524 10.609-4.394l68.703-68.704c5.859-5.857 5.859-15.355 0-21.212z"/>
            </svg>
          </button>
          <select id="canvas-menu-box-size-${uid}">
            <option value="1">Size 1</option>
            <option value="2">Size 2</option>
            <option value="5">Size 5</option>
            <option value="10">Size 10</option>
            <option value="15">Size 15</option>
          </select>
      </div>
      <canvas id="canvas-${uid}" class="shadow"></canvas>
     `);
      // This code(styles) should not be added it will cause problems in fabric

      const canvas = new fabric.Canvas(`canvas-${uid}`);
      const DRAWING_MODE = 'drawing';
      const MOVE_MODE = 'move';
      let canvasMode = DRAWING_MODE;
      canvas.isDrawingMode = true;
      canvas.setHeight('400');
      canvas.setWidth(parentWidth);

      // changing pen color
      // canvas.freeDrawingBrush.color
      $(`#canvas-menu-box-color-${uid}`).on('change', () => {
        const color: any = document.getElementById(`canvas-menu-box-color-${uid}`);
        const data = color.value;
        canvas.freeDrawingBrush.color = data;
      });

      $(`#canvas-menu-box-pencil-${uid}`).on('click', () => {
        canvas.discardActiveObject().renderAll();
        canvas.isDrawingMode = true;
        canvasMode = DRAWING_MODE;
      });

      $(`#canvas-menu-box-delete-${uid}`).on('click', () => {
        const shape = canvas.getActiveObject();
        canvas.remove(shape);
      });

      $(`#canvas-menu-box-move-${uid}`).on('click', () => {
        canvas.hoverCursor = 'move';
        canvas.isDrawingMode = false;
        canvasMode = MOVE_MODE;
      });

      $(`#canvas-menu-box-size-${uid}`).on('change', () => {
        const width = $(`#canvas-menu-box-size-${uid} option:selected`).val();
        canvas.freeDrawingBrush.width = parseInt(width);
      });

      canvas.on('selection:created', function() {
        $(`#canvas-menu-box-delete-${uid}`).prop('disabled', false);
      });

      canvas.on('selection:cleared', function() {
        $(`#canvas-menu-box-delete-${uid}`).prop('disabled', true);
      });
    }
}
