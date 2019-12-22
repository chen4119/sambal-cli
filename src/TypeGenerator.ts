import {essentialPropertiesMap, EssentialProperties, AUTO} from "./schemaEssentials";
import {
    SCHEMA_TEXT, 
    SCHEMA_NUMBER, 
    SCHEMA_FLOAT, 
    SCHEMA_INTEGER, 
    SCHEMA_BOOL, 
    SCHEMA_DATE, 
    SCHEMA_DATETIME, 
    SCHEMA_TIME, 
    SCHEMA_URL, 
    SAMBAL_PARENT, 
    SAMBAL_NAME, 
    SAMBAL_VALUES,
    getSchemaOrgType,
    isSchemaOrgType
} from "sambal-jsonld";

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
        const typeSchema = getSchemaOrgType(this.typeId);
        TypeGenerator.addSchemaProperties(this.typeProperties, typeSchema);
        TypeGenerator.traverseParentHierarchy(typeSchema, (parentId, parentSchema) => {
            TypeGenerator.addSchemaProperties(this.typeProperties, parentSchema);
        });
        
        if (essentialPropertiesMap.has(this.typeId)) {
            this.combineEssentialProperties(essentialPropertiesMap.get(this.typeId), this.typeEssentials);
        }
        TypeGenerator.traverseParentHierarchy(typeSchema, (parentId) => {
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

    static traverseParentHierarchy(schema, callbackFn) {
        const schemaParents = schema[SAMBAL_PARENT];
        if (schemaParents) {
            for (const parentId of schemaParents) {
                const parentSchema = getSchemaOrgType(parentId);
                callbackFn(parentId, parentSchema);
                this.traverseParentHierarchy(parentSchema, callbackFn);
            }
        }
    }

    static addSchemaProperties(typeObj: any, schema: any) {
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

    private getMeaningfulPropValue(propName: string) {
        const propTypes = this.typeProperties[propName];
        const propValues = [];
        for (const type of propTypes) {
            const value = this.getValueForType(type);
            // value is enum
            if (Array.isArray(value)) {
                propValues.push(value.join(", "));
            } else {
                propValues.push(value);
            }
        }
        return propValues.join(" or ");
    }

    private getValueForType(type: string) {
        switch (type) {
            case SCHEMA_TEXT:
                return "text";
            case SCHEMA_NUMBER:
                return "number";
            case SCHEMA_FLOAT:
                return "float";
            case SCHEMA_INTEGER:
                return "integer";
            case SCHEMA_TIME:
                return "time, use format specified in sambal.yml";
            case SCHEMA_DATE:
                return "date, use format specified in sambal.yml";
            case SCHEMA_DATETIME:
                return "datetime, use format specified in sambal.yml";
            case SCHEMA_BOOL:
                return "true or false";
            case SCHEMA_URL:
                return "url";
            default:
                if (isSchemaOrgType(type)) {
                    const typeSchema = getSchemaOrgType(type);
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