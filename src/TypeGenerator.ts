import {schemaMap} from "./Schema";
import {essentialPropertiesMap, EssentialProperties} from "./Essentials";
import {TEXT, NUMBER, FLOAT, INTEGER, BOOL, DATE, DATETIME, TIME, URL, SAMBAL_ID, SAMBAL_PARENT, SAMBAL_NAME, SAMBAL_VALUES, AUTO} from "./Constants";

class TypeGenerator {
    private typeProperties = {};
    private typeEssentials: EssentialProperties;
    private typeId: string = null;
    private propSet: Set<string> = new Set<string>();
    private isFullSchema: boolean = false;
    constructor(typeId: string, isFullSchema: boolean) {
        this.typeId = typeId;
        this.isFullSchema = isFullSchema;
        this.typeEssentials = {
            id: this.typeId,
            requiredByGoogle: {},
            recommendedByGoogle: {},
            essential: {}
        };
    }

    generate() {
        const typeSchema = schemaMap.get(this.typeId.toLowerCase());
        this.addSchemaProperties(this.typeProperties, typeSchema);
        this.traverseParentHierarchy(typeSchema, (parentId, parentSchema) => {
            this.addSchemaProperties(this.typeProperties, parentSchema);
        });
        
        if (essentialPropertiesMap.has(this.typeId)) {
            this.combineEssentialProperties(essentialPropertiesMap.get(this.typeId), this.typeEssentials);
        }
        this.traverseParentHierarchy(typeSchema, (parentId) => {
            if (essentialPropertiesMap.has(parentId)) {
                this.combineEssentialProperties(essentialPropertiesMap.get(parentId), this.typeEssentials);
            }
        });
        return this.getTypeObject();
    }

    getTypeObject() {
        const typeObj: EssentialProperties = {
            id: this.typeId,
            requiredByGoogle: {},
            recommendedByGoogle: {},
            essential: {}
        };
        this.iterateEssentialProperties(typeObj.requiredByGoogle, this.typeEssentials.requiredByGoogle);
        this.iterateEssentialProperties(typeObj.recommendedByGoogle, this.typeEssentials.recommendedByGoogle);
        this.iterateEssentialProperties(typeObj.essential, this.typeEssentials.essential);
        if (this.isFullSchema) {
            this.iterateSchemaProperties(typeObj.essential, this.typeProperties);
        }
        this.addExtraMessageForEachProperty(typeObj.requiredByGoogle, "required by Google");
        this.addExtraMessageForEachProperty(typeObj.recommendedByGoogle, "recommended by Google");
        return {
            ...typeObj.requiredByGoogle,
            ...typeObj.recommendedByGoogle,
            ...typeObj.essential
        };
    }

    private addExtraMessageForEachProperty(obj: any, message: string) {
        for (const propName of Object.keys(obj)) {
            obj[propName] = `${obj[propName]} - ${message}`;
        }
    }

    private iterateSchemaProperties(destObj: any, schema) {
        for (const propName of Object.keys(schema)) {
            this.addPropIfNotYet(destObj, propName);
        }
    }

    private iterateEssentialProperties(destObj: any, essentialProperties: any) {
        if (essentialProperties) {
            for (const propName of Object.keys(essentialProperties)) {
                const propValue = essentialProperties[propName];
                this.addPropIfNotYet(destObj, propName, propValue === AUTO ? undefined : propValue);
            }
        }
    }

    private combineEssentialProperties(from: EssentialProperties, to: EssentialProperties) {
        to.requiredByGoogle = {...from.requiredByGoogle, ...to.requiredByGoogle};
        to.recommendedByGoogle = {...from.recommendedByGoogle, ...to.recommendedByGoogle};
        to.essential = {...from.essential, ...to.essential};
    }

    private traverseParentHierarchy(schema, callbackFn) {
        const schemaParents = schema[SAMBAL_PARENT];
        if (schemaParents) {
            for (const parentId of schemaParents) {
                const parentSchema = schemaMap.get(parentId.toLowerCase());
                callbackFn(parentId, parentSchema);
                this.traverseParentHierarchy(parentSchema, callbackFn);
            }
        }
    }

    private addSchemaProperties(typeObj: any, schema: any) {
        for (const propName of Object.keys(schema)) {
            if (!propName.startsWith("_") && !typeObj[propName]) {
                typeObj[propName] = schema[propName];
            }
        }
    }

    private addPropIfNotYet(destObj: any, propName: string, propValue?: any) {
        if (!this.propSet.has(propName)) {
            if (propValue) {
                destObj[propName] = propValue;
            } else {
                destObj[propName] = this.getMeaningfulPropValue(propName);
            }
            this.propSet.add(propName);
        }
    }

    // property can have multiple types.  Prefer schema.org enum.  If not, return first type
    private getMeaningfulPropValue(propName: string) {
        const propTypes = this.typeProperties[propName];
        let firstValue = null;
        for (const type of propTypes) {
            const value = this.getValueForType(type);
            // value is enum
            if (Array.isArray(value)) {
                return value.join(", ");
            } else if (!firstValue) {
                firstValue = value;
            }
        }
        return firstValue;
    }

    private getValueForType(type: string) {
        switch (type) {
            case TEXT:
                return "text";
            case NUMBER:
                return "number";
            case FLOAT:
                return "float";
            case INTEGER:
                return "integer";
            case TIME:
                return "time, use format specified in sambal.yml";
            case DATE:
                return "date, use format specified in sambal.yml";
            case DATETIME:
                return "datetime, use format specified in sambal.yml";
            case BOOL:
                return "true or false";
            case URL:
                return "url";
            default:
                const typeSchemaId = type.toLowerCase();
                if (schemaMap.has(typeSchemaId)) {
                    const typeSchema = schemaMap.get(typeSchemaId);
                    if (typeSchema[SAMBAL_VALUES]) {
                        return typeSchema[SAMBAL_VALUES];
                    } else {
                        return `${typeSchema[SAMBAL_NAME]} (${type})`;
                    }
                } else {
                    return type;
                }
        }
    }
}

export default TypeGenerator;