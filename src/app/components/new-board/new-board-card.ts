export type PluginType = 'editor' | 'board' | 'youtube' | 'fileUpload';
export interface NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    content: any;
}

export class NewBoardCard implements NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    content: any;
    classList: any;
    createdOn: Date;

    public getClassList(): any {
        return this.classList;
    }
    public setClassList(value: any) {
        this.classList = value;
    }

    public getpluginType(): any {
        return this.pluginType;
    }
    public setpluginType(value: PluginType) {
        this.pluginType = value;
    }
    public setContent(value: any) {
        this.content = value;
    }
    public getContent(): any {
        return this.content;
    }
    constructor(cardID: number, oldPosition: any, newPosition: any) {
        this.cardID = cardID;
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
        this.createdOn = new Date();
    }
    updatePosition(oldPosition: any, newPosition: any) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }
    getPosition(): [any, any] {
        return [this.oldPosition, this.newPosition];
    }
}
