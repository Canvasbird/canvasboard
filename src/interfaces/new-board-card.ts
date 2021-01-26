import { PluginType } from './plugin-type';

export interface NewBoardCardInterface {
    readonly cardID: number;
    oldPosition: any;
    newPosition: any;
    pluginType: PluginType;
    content: any;
    classList: any;
    createdOn: Date;
}
