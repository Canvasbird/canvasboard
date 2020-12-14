export interface NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: string;
    saveData: any;
}

export class NewBoardCard implements NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: string;
    saveData: any;

    public getpluginType(): any {
        return this.pluginType;
    }
    public setpluginType(value: any) {
        this.pluginType = value;
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
