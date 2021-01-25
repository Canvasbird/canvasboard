export interface BasePluginComponent{
    addHTMLCode?(uid: string): void;
    addClickFunction?(uid: string, ...args: any[]): void;
    addToolBox(uid: string, ...args: any[]): void;
}
