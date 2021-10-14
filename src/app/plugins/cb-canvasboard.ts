declare var $: any;
import { fabric } from 'fabric';
import { BasePluginComponent } from 'src/interfaces/base-plugin-component';
import { StateManager } from './cb-whiteboard';

export class AddCanvasBoard implements BasePluginComponent {
    stateManager: Map<string, StateManager>;
    canvas: Map<string, fabric.Canvas>;
    DRAWING_MODE: Map<string, string>;
    MOVE_MODE: Map<string, string>;
    canvasMode: Map<string, string>;
    isDrawingMode: Map<string, boolean>;
    constructor() {
        this.stateManager = new Map<string, StateManager>();
        this.canvas = new Map<string, fabric.Canvas>();
        this.DRAWING_MODE = new Map<string, string>();
        this.MOVE_MODE = new Map<string, string>();
        this.canvasMode = new Map<string, string>();
        this.isDrawingMode = new Map<string, boolean>();
    }

    // Save Data to store in server
    getContent(uid) {
        return this.canvas.get(uid).toObject();
    }

    // Retrieve Save Data to load from server
    setContent(uid, data) {
        this.addToolBox(uid);
        this.canvas
            .get(uid)
            .loadFromJSON(data, () => this.canvas.get(uid).renderAll());
    }

    undo(uid): void {
        this.stateManager.get(uid).undo();
    }

    redo(uid): void {
        this.stateManager.get(uid).redo();
    }

    private saveState(uid) {
        this.stateManager.get(uid).saveState();
        this.canvas.get(uid).renderAll();
    }

    // Adding canvasboard
    addHTMLCode = (uid) => {
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
    };

    addToolBox = (uid) => {
        const parentWidth = $(`#original-${uid}`).width();
        $(`#original-${uid}`).attr('contenteditable', false);
        $(`#original-${uid}`).append(`
    <div id="canvas-menu-box" class="canvas-menu-box">
    <button id="canvas-menu-box-pencil-${uid}" class="btn btn-light m-1">
       ✏️
    </button>
    <button id="canvas-menu-box-delete-${uid}" class="btn btn-light m-1" disabled=false>
        🗑
    </button>
    <button id="canvas-menu-box-move-${uid}" class="btn btn-light m-1">
     ✋
    </button>
    <button id="canvas-menu-box-undo-${uid}" class="btn btn-light m-1">
     ↩️
    </button>
    <button id="canvas-menu-box-redo-${uid}" class="btn btn-light m-1">
          ↪️
    </button>
    <input id="canvas-menu-box-color-${uid}" type="color" class="btn btn-light" style="margin-bottom: 5px; padding: 2px !important">
    <select id="canvas-menu-box-size-${uid} class="btn btn-light"">
       <option value="1">Size 1</option>
       <option value="2">Size 2</option>
       <option value="5">Size 5</option>
       <option value="10">Size 10</option>
       <option value="15">Size 15</option>
    </select>
 </div>
 <canvas id="canvas-${uid}" style="border: 1px solid #dbdbdb;" ></canvas>
     `);
        // This code(styles) should not be added it will cause problems in fabric
        this.canvas.set(uid, new fabric.Canvas(`canvas-${uid}`));
        this.DRAWING_MODE.set(uid, 'drawing');
        this.MOVE_MODE.set(uid, 'move');
        this.canvasMode.set(uid, this.DRAWING_MODE.get(uid));
        this.isDrawingMode.set(uid, true);
        this.canvas.get(uid).setHeight('500');
        this.canvas.get(uid).setWidth(parentWidth);
        this.stateManager.set(uid, new StateManager(this.canvas.get(uid), uid));

        // default pen mode
        this.canvas.get(uid).discardActiveObject().renderAll();
        this.canvas.get(uid).isDrawingMode = true;
        this.canvasMode.set(uid, this.DRAWING_MODE.get(uid));

        // changing pen color
        // canvas.freeDrawingBrush.color
        $(`#canvas-menu-box-color-${uid}`).on('change', () => {
            const color: any = document.getElementById(
                `canvas-menu-box-color-${uid}`
            );
            const data = color.value;
            this.canvas.get(uid).freeDrawingBrush.color = data;
        });

        $(`#canvas-menu-box-pencil-${uid}`).on('click', () => {
            this.canvas.get(uid).discardActiveObject().renderAll();
            this.canvas.get(uid).isDrawingMode = true;
            this.canvasMode.set(uid, this.DRAWING_MODE.get(uid));
        });
        this.canvas.get(uid).on('mouse:up', (o) => {
            if (this.canvasMode === this.DRAWING_MODE) {
                if (this.isDrawingMode) {
                    this.saveState(uid);
                }
            }
            if (this.canvasMode === this.MOVE_MODE) {
                if (this.canvas.get(uid).hoverCursor === 'move') {
                    this.saveState(uid);
                }
            }
        });
        $(`#canvas-menu-box-undo-${uid}`).on('click', () => {
            this.undo(uid);
        });
        $(`#canvas-menu-box-redo-${uid}`).on('click', () => {
            this.redo(uid);
        });
        $(`#canvas-menu-box-delete-${uid}`).on('click', () => {
            const shape: any = this.canvas.get(uid).getActiveObject();

            // treating all shape objects individually
            if (shape.hasOwnProperty('_objects')) {
                shape._objects.forEach((element) => {
                    this.canvas.get(uid).remove(element);
                });
            } else {
                this.canvas.get(uid).remove(shape);
            }
            this.saveState(uid);
        });

        $(`#canvas-menu-box-move-${uid}`).on('click', () => {
            this.canvas.get(uid).hoverCursor = 'move';
            this.canvas.get(uid).isDrawingMode = false;
            this.canvasMode = this.MOVE_MODE;
        });

        $(`#canvas-menu-box-size-${uid}`).on('change', () => {
            const width = $(
                `#canvas-menu-box-size-${uid} option:selected`
            ).val();
            this.canvas.get(uid).freeDrawingBrush.width = parseInt(width, 10);
        });

        this.canvas.get(uid).on('selection:created', () => {
            $(`#canvas-menu-box-delete-${uid}`).prop('disabled', false);
        });

        this.canvas.get(uid).on('selection:cleared', () => {
            $(`#canvas-menu-box-delete-${uid}`).prop('disabled', true);
        });

        // checks if there is an active object selected, if not null checks for a delete event and deletes it.
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key === 'Delete') {
                const shape: any = this.canvas.get(uid).getActiveObject();
                if (shape != null) {
                    // treating all shape objects individually
                    if (shape.hasOwnProperty('_objects')) {
                        shape._objects.forEach((element) => {
                            this.canvas.get(uid).remove(element);
                        });
                    } else {
                        this.canvas.get(uid).remove(shape);
                    }
                    this.saveState(uid);
                }
            }
        });
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (event.ctrlKey && key === 'z') {
                this.undo(uid);
            }
            if (event.ctrlKey && key === 'y') {
                this.redo(uid);
            }
        });
    };
}
