import { AdapterOptions } from '../AdapterOptions';

export interface ObjectBlueprintOptions extends AdapterOptions {
    generateId?: boolean;
    idAttribute?: string;
}
