import { BasePluginComponent } from './base-plugin-component';

export interface PluginComponent extends BasePluginComponent{
    addHTMLCode(uid: string): void;
    addClickFunction(uid: string, ...args: any[]): void;
    addToolBox(uid: string, ...args: any[]): void;
}
