declare var $: any;
import { fabric } from 'fabric';
import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

class StateManager {
  private currentState: string;
  private stateStack: string[]; // Undo stack
  private redoStack: string[]; // Redo stack
  private locked: boolean; // Determines if the state can currently be saved.
  private maxCount = 100; // We keep 100 items in the stacks at any time.
  private canvasId: any;
  constructor(readonly canvas: fabric.Canvas, readonly uid: any) {
    this.currentState = canvas.toDatalessJSON();
    this.locked = false;
    this.redoStack = [];
    this.stateStack = [];
    this.canvasId = uid;
    this.toggleUndoRedoButton(this.canvasId);
  }
  saveState() {
    if (!this.locked && this.currentState !== this.stateStack[this.stateStack.length - 1]) {
      if (this.stateStack.length === this.maxCount) {
        // Drop the oldest element
        this.stateStack.shift();
      }

      // Add the current state
      this.stateStack.push(
        this.currentState
      );

      // Make the state of the canvas the current state
      this.currentState = this.canvas.toDatalessJSON();

      // Reset the redo stack.
      // We can only redo things that were just undone.
      this.redoStack.length = 0;
      this.toggleUndoRedoButton(this.canvasId);
    }
  }

  // Pop the most recent state. Use the specified callback method.
  undo() {
    if (this.stateStack.length > 0) {
      this.applyState(this.redoStack, this.stateStack.pop());
    }
  }

  // Pop the most recent redo state. Use the specified callback method.
  redo() {
    if (this.redoStack.length > 0) {
      this.applyState(this.stateStack, this.redoStack.pop());
    }
  }

  // Root function for undo and redo; operates on the passed-in stack
  private applyState(stack: string[], newState) {
    // Push the current state
    stack.push(this.currentState);

    // Make the new state the current state
    this.currentState = newState;

    // Lock the stacks for the incoming change
    const thisStateManager = this;
    this.locked = true;

    // Update canvas with the new current state
    this.canvas.loadFromJSON(this.currentState, () => {
      // Unlock the stacks
      thisStateManager.locked = false;
    });
    this.toggleUndoRedoButton(this.canvasId);
  }

  toggleUndoRedoButton(uid: any) {
    if (this.stateStack.length === 0) {
      $(`#canvas-menu-box-undo-${uid}`).prop('disabled', true);
    } else {
      $(`#canvas-menu-box-undo-${uid}`).prop('disabled', false);
    }
    if (this.redoStack.length === 0) {
      $(`#canvas-menu-box-redo-${uid}`).prop('disabled', true);
    } else {
      $(`#canvas-menu-box-redo-${uid}`).prop('disabled', false);
    }
  }

}

export class AddCanvasBoard implements BasePluginComponent{
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
  getContent(uid){
    return this.canvas.get(uid).toObject();
  }

  // Retrieve Save Data to load from server
  setContent(uid, data){
    this.addToolBox(uid);
    this.canvas.get(uid).loadFromJSON(data, () => this.canvas.get(uid).renderAll());
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
  }


  addToolBox = (uid) => {
    const parentWidth = $(`#original-${uid}`).width();
    $(`#original-${uid}`).attr('contenteditable', false);
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
          <button id="canvas-menu-box-undo-${uid}" class="btn btn-light m-2">
          <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 454.839 454.839"
            style="enable-background:new 0 0 454.839 454.839;">
            <path d="M404.908,283.853c0,94.282-76.71,170.986-170.986,170.986h-60.526c-10.03,0-18.158-8.127-18.158-18.157v-6.053
            c0-10.031,8.127-18.158,18.158-18.158h60.526c70.917,0,128.618-57.701,128.618-128.618c0-70.917-57.701-128.618-128.618-128.618
            H122.255l76.905,76.905c8.26,8.257,8.26,21.699,0,29.956c-8.015,8.009-21.964,7.997-29.961,0L56.137,149.031
            c-4.001-4.001-6.206-9.321-6.206-14.981c0-5.656,2.205-10.979,6.206-14.978L169.205,6.002c7.997-8.003,21.958-8.003,29.956,0
            c8.26,8.255,8.26,21.699,0,29.953l-76.905,76.911h111.666C328.198,112.866,404.908,189.573,404.908,283.853z"/></svg>
          </button>
          <button id="canvas-menu-box-redo-${uid}" class="btn btn-light m-2">
          <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 454.839 454.839"
          style="enable-background:new 0 0 454.839 454.839;transform: scaleX(-1);">
          <path d="M404.908,283.853c0,94.282-76.71,170.986-170.986,170.986h-60.526c-10.03,0-18.158-8.127-18.158-18.157v-6.053
          c0-10.031,8.127-18.158,18.158-18.158h60.526c70.917,0,128.618-57.701,128.618-128.618c0-70.917-57.701-128.618-128.618-128.618
          H122.255l76.905,76.905c8.26,8.257,8.26,21.699,0,29.956c-8.015,8.009-21.964,7.997-29.961,0L56.137,149.031
          c-4.001-4.001-6.206-9.321-6.206-14.981c0-5.656,2.205-10.979,6.206-14.978L169.205,6.002c7.997-8.003,21.958-8.003,29.956,0
          c8.26,8.255,8.26,21.699,0,29.953l-76.905,76.911h111.666C328.198,112.866,404.908,189.573,404.908,283.853z"/></svg>
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
    this.canvas.set(uid, new fabric.Canvas(`canvas-${uid}`));
    this.DRAWING_MODE.set(uid, 'drawing');
    this.MOVE_MODE.set(uid, 'move');
    this.canvasMode.set(uid, this.DRAWING_MODE.get(uid));
    this.isDrawingMode.set(uid, true);
    this.canvas.get(uid).setHeight('400');
    this.canvas.get(uid).setWidth(parentWidth);
    this.stateManager.set(uid, new StateManager(this.canvas.get(uid), uid));
    // changing pen color
    // canvas.freeDrawingBrush.color
    $(`#canvas-menu-box-color-${uid}`).on('change', () => {
      const color: any = document.getElementById(`canvas-menu-box-color-${uid}`);
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
    $(`#canvas-menu-box-undo-${uid}`).on('click', () => { this.undo(uid); });
    $(`#canvas-menu-box-redo-${uid}`).on('click', () => { this.redo(uid); });
    $(`#canvas-menu-box-delete-${uid}`).on('click', () => {
      const shape = this.canvas.get(uid).getActiveObject();

      // treating all shape objects individually
      if (shape.hasOwnProperty('_objects')) {
        (shape._objects).forEach(element => {
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
      const width = $(`#canvas-menu-box-size-${uid} option:selected`).val();
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
        const shape = this.canvas.get(uid).getActiveObject();
        if (shape != null) {
          // treating all shape objects individually
          if (shape.hasOwnProperty('_objects')) {
            (shape._objects).forEach(element => {
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
  }
}
