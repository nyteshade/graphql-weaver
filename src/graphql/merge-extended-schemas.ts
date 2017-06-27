import { ExtendedSchema, FieldMetadata } from '../endpoints/extended-introspection';
import { flatMap } from '../utils';
import { mergeSchemas } from './merge-schemas';

/**
 * Merges multiple GraphQL schemas by merging the fields of root types (query, mutation, subscription).
 * Also takes care of extended field metadata
 */
export function mergeExtendedSchemas(...schemas: ExtendedSchema[]) {
    const metadata = mergeFieldMetadata(...schemas.map(schema => schema.fieldMetadata));
    return new ExtendedSchema(mergeSchemas(schemas.map(schema => schema.schema)), metadata);
}

export function mergeFieldMetadata(...metadatas: Map<string, FieldMetadata>[]) {
    return new Map(flatMap(metadatas, map => [...map]));
}
