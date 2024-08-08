// enums.js
const StatusEnum = {
    ACTIVE: 1,
    INACTIVE: 2
};

const TypeEnum = {
    WEB: 1,
    MOBILE: 2
};

const StatusEnumValues = Object.values(StatusEnum);
const TypeEnumValues = Object.values(TypeEnum);

module.exports = {
    StatusEnum,
    TypeEnum,
    StatusEnumValues,
    TypeEnumValues
};
