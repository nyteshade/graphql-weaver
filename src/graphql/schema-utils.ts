import {GraphQLField, GraphQLFieldMap, GraphQLInterfaceType, GraphQLObjectType, GraphQLType} from 'graphql';
import any = jasmine.any;

/**
 * Finds a field by traversing a schema from field to field
 * @param type the type where to start
 * @param fieldNames an array of field names to traverse
 * @return the field, or undefined if not found
 */
export function walkFields(type: GraphQLObjectType|GraphQLInterfaceType, fieldNames: string[]): GraphQLField<any, any>|undefined {
    let field: GraphQLField<any, any>|undefined;
    let currentType: GraphQLType = type;
    for (const fieldName of fieldNames) {
        if (!(currentType instanceof GraphQLObjectType) && !(currentType instanceof GraphQLInterfaceType)) {
            return undefined;
        }

        const fields: GraphQLFieldMap<any, any> = currentType.getFields();
        if (!(fieldName in fields)) {
            return undefined;
        }

        field = fields[fieldName];
        currentType = field.type;
    }
    return field;
}