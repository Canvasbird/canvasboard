declare var $: any;
import { fabric } from 'fabric';

export class AddCanvasBoard {
  constructor(){}

    // Adding canvasboard
    addCanvasBoardHTMLCode = (uid) => {
      $(`#cb-buttons-${uid}`).append(`
        <!-- Canvas Board -->
        <div class="tool box1 m-1">
          <button class="btn btn-light" id="add-canvas-cb-${uid}">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>
          </button>
        </div>
      `)
    }

    addCanvasBoardClickFunction = (uid) => {
      // Adding Canvas board
      $(`#add-canvas-cb-${uid}`).click(() => {
        const parentWidth = $(`#original-${uid}`).width();
        console.log('Working canvas board');
        $(`#original-${uid}`).append(`
          <div id="canvas-menu-box" class="canvas-menu-box">
              <input id="canvas-menu-box-${uid}" type="color" style="margin-left: 50%; margin-bottom: 5px;">
          </div>
          <canvas id="canvas-${uid}" class="shadow"></canvas>
        `);
        // This code(styles) should not be added it will cause problems in fabric

        const canvas = new fabric.Canvas(`canvas-${uid}`);
        canvas.isDrawingMode = true;
        canvas.setHeight('400');
        canvas.setWidth(parentWidth);

        // changing pen color
        // canvas.freeDrawingBrush.color
        $(`#canvas-menu-box-${uid}`).on('change', () => {
          const color: any = document.getElementById(`canvas-menu-box-${uid}`);
          const data = color.value;
          canvas.freeDrawingBrush.color = data;
        });
      });
    }

    addCanvasBoardToolbox = (uid) => {
      const parentWidth = $(`#original-${uid}`).width();
      console.log('Working canvas board');
      $(`#original-${uid}`).append(`
      <div id="canvas-menu-box" class="canvas-menu-box">
          <input id="canvas-menu-box-${uid}" type="color" style="margin-left: 50%; margin-bottom: 5px;">
      </div>
      <canvas id="canvas-${uid}" class="shadow"></canvas>
     `);
      // This code(styles) should not be added it will cause problems in fabric

      const canvas = new fabric.Canvas(`canvas-${uid}`);
      canvas.isDrawingMode = true;
      canvas.setHeight('400');
      canvas.setWidth(parentWidth);

      // changing pen color
      // canvas.freeDrawingBrush.color
      $(`#canvas-menu-box-${uid}`).on('change', () => {
        const color: any = document.getElementById(`canvas-menu-box-${uid}`);
        const data = color.value;
        canvas.freeDrawingBrush.color = data;
      });
    }
}
