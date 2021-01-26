import { Component } from '@angular/core';
import { BasePluginComponent } from './base-plugin-component';
import { PluginType } from './plugin-type';

export interface AddBlockEditorParameters {
    id: string;
    pluginComponent: BasePluginComponent;
    pType?: PluginType;
    addBefore?: boolean;
    embedUrl?: string;
}
