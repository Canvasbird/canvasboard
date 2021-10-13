declare var $: any;
import { fabric } from 'fabric';
import { BasePluginComponent } from 'src/interfaces/base-plugin-component';

export class StateManager {
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
        if (
            !this.locked &&
            this.currentState !== this.stateStack[this.stateStack.length - 1]
        ) {
            if (this.stateStack.length === this.maxCount) {
                // Drop the oldest element
                this.stateStack.shift();
            }

            // Add the current state
            this.stateStack.push(this.currentState);

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
