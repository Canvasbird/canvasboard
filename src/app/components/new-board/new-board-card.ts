import { NewBoardCardInterface } from 'src/interfaces/new-board-card';
import { PluginType } from 'src/interfaces/plugin-type';

export class NewBoardCard implements NewBoardCardInterface {
    cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    content: any;
    classList: any;
    createdOn: Date;
    constructor(cardID: number, oldPosition: any, newPosition: any) {
        this.cardID = cardID;
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
        this.createdOn = new Date();
    }

    static fromData(obj: NewBoardCardInterface): NewBoardCard {
        const result = new NewBoardCard(obj.cardID, obj.oldPosition, obj.newPosition);
        result.setpluginType(obj.pluginType);
        result.setContent(obj.content);
        result.setClassList(obj.classList);
        result.setCreatedOn(obj.createdOn);
        return result;
    }
    public getCreatedOn(): Date {
        return this.createdOn;
    }
    public setCreatedOn(value: Date) {
        this.createdOn = value;
    }


    updatePosition(oldPosition: any, newPosition: any) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }

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
    getPosition(): [any, any] {
        return [this.oldPosition, this.newPosition];
    }
}
