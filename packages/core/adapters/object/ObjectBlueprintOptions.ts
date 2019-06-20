/**
 * @module Adapters/object
 */

import { AdapterBlueprintOptions } from '../AdapterBlueprintOptions';

export interface ObjectBlueprintOptions extends AdapterBlueprintOptions {
    generateId?: boolean;
    idAttribute?: string;
    uuidPrimary?: boolean;
}
