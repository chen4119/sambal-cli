import {getSchemaOrgType, isSchemaOrgType, JSONLD_ID, JSONLD_TYPE} from "sambal-jsonld";
import {essentialPropertiesMap, EssentialProperties} from "./Essentials";
import TypeGenerator from "./TypeGenerator";

function validateEssentialProperties() {
    for (const key of essentialPropertiesMap.keys()) {
        console.log(`Checking ${key}`);
        const typeProperties = getAllTypeProperties(key);
        const essentialProperties: EssentialProperties = essentialPropertiesMap.get(key);
        validateProps(essentialProperties.requiredByGoogle, typeProperties);
        validateProps(essentialProperties.recommendedByGoogle, typeProperties);
        validateProps(essentialProperties.essential, typeProperties);
    }
}

function getAllTypeProperties(id: string) {
    const typeProperties = {};
    const typeSchema = getSchemaOrgType(id);
    TypeGenerator.addSchemaProperties(typeProperties, typeSchema);
    TypeGenerator.traverseParentHierarchy(typeSchema, (parentId, parentSchema) => {
        TypeGenerator.addSchemaProperties(typeProperties, parentSchema);
    });
    return typeProperties;
}

function validateProps(essentialProperties: any, typeProperties: any) {
    if (essentialProperties) {
        for (const propName of Object.keys(essentialProperties)) {
            if (propName === JSONLD_ID || propName === JSONLD_TYPE) {
                continue;
            }
            if (!typeProperties[propName]) {
                console.error(`${propName} does not exist`);
            }
        }
    }
}

validateEssentialProperties();

