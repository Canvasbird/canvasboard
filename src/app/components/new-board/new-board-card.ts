export type PluginType = 'editor' | 'board' | 'youtube' | 'fileUpload';
export interface NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    saveData: any;
}

export class NewBoardCard implements NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    saveData: any;

    public getpluginType(): any {
        return this.pluginType;
    }
    public setpluginType(value: PluginType) {
        this.pluginType = value;
    }
    public setData(value: any) {
        this.saveData = value;
    }
    public getData(): any {
        return this.saveData;
    }
    constructor(cardID: number, oldPosition: any, newPosition: any) {
        this.cardID = cardID;
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }
    updatePosition(oldPosition: any, newPosition: any) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }
    getPosition(): [any, any] {
        return [this.oldPosition, this.newPosition];
    }
}
