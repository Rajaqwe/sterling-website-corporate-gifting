module.exports = [
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("pg-587764f78a6c7a9c");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "PrismaPg",
    ()=>PrismaPgAdapterFactory
]);
// src/pg.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/debug/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/driver-adapter-utils/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2d$array$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postgres-array/index.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
// package.json
var name = "@prisma/adapter-pg";
// src/constants.ts
var FIRST_NORMAL_OBJECT_ID = 16384;
;
;
;
var { types } = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"];
var { builtins: ScalarColumnType, getTypeParser } = types;
var AdditionalScalarColumnType = {
    NAME: 19
};
var ArrayColumnType = {
    BIT_ARRAY: 1561,
    BOOL_ARRAY: 1e3,
    BYTEA_ARRAY: 1001,
    BPCHAR_ARRAY: 1014,
    CHAR_ARRAY: 1002,
    CIDR_ARRAY: 651,
    DATE_ARRAY: 1182,
    FLOAT4_ARRAY: 1021,
    FLOAT8_ARRAY: 1022,
    INET_ARRAY: 1041,
    INT2_ARRAY: 1005,
    INT4_ARRAY: 1007,
    INT8_ARRAY: 1016,
    JSONB_ARRAY: 3807,
    JSON_ARRAY: 199,
    MONEY_ARRAY: 791,
    NUMERIC_ARRAY: 1231,
    OID_ARRAY: 1028,
    TEXT_ARRAY: 1009,
    TIMESTAMP_ARRAY: 1115,
    TIMESTAMPTZ_ARRAY: 1185,
    TIME_ARRAY: 1183,
    UUID_ARRAY: 2951,
    VARBIT_ARRAY: 1563,
    VARCHAR_ARRAY: 1015,
    XML_ARRAY: 143
};
var UnsupportedNativeDataType = class _UnsupportedNativeDataType extends Error {
    // map of type codes to type names
    static typeNames = {
        16: "bool",
        17: "bytea",
        18: "char",
        19: "name",
        20: "int8",
        21: "int2",
        22: "int2vector",
        23: "int4",
        24: "regproc",
        25: "text",
        26: "oid",
        27: "tid",
        28: "xid",
        29: "cid",
        30: "oidvector",
        32: "pg_ddl_command",
        71: "pg_type",
        75: "pg_attribute",
        81: "pg_proc",
        83: "pg_class",
        114: "json",
        142: "xml",
        194: "pg_node_tree",
        269: "table_am_handler",
        325: "index_am_handler",
        600: "point",
        601: "lseg",
        602: "path",
        603: "box",
        604: "polygon",
        628: "line",
        650: "cidr",
        700: "float4",
        701: "float8",
        705: "unknown",
        718: "circle",
        774: "macaddr8",
        790: "money",
        829: "macaddr",
        869: "inet",
        1033: "aclitem",
        1042: "bpchar",
        1043: "varchar",
        1082: "date",
        1083: "time",
        1114: "timestamp",
        1184: "timestamptz",
        1186: "interval",
        1266: "timetz",
        1560: "bit",
        1562: "varbit",
        1700: "numeric",
        1790: "refcursor",
        2202: "regprocedure",
        2203: "regoper",
        2204: "regoperator",
        2205: "regclass",
        2206: "regtype",
        2249: "record",
        2275: "cstring",
        2276: "any",
        2277: "anyarray",
        2278: "void",
        2279: "trigger",
        2280: "language_handler",
        2281: "internal",
        2283: "anyelement",
        2287: "_record",
        2776: "anynonarray",
        2950: "uuid",
        2970: "txid_snapshot",
        3115: "fdw_handler",
        3220: "pg_lsn",
        3310: "tsm_handler",
        3361: "pg_ndistinct",
        3402: "pg_dependencies",
        3500: "anyenum",
        3614: "tsvector",
        3615: "tsquery",
        3642: "gtsvector",
        3734: "regconfig",
        3769: "regdictionary",
        3802: "jsonb",
        3831: "anyrange",
        3838: "event_trigger",
        3904: "int4range",
        3906: "numrange",
        3908: "tsrange",
        3910: "tstzrange",
        3912: "daterange",
        3926: "int8range",
        4072: "jsonpath",
        4089: "regnamespace",
        4096: "regrole",
        4191: "regcollation",
        4451: "int4multirange",
        4532: "nummultirange",
        4533: "tsmultirange",
        4534: "tstzmultirange",
        4535: "datemultirange",
        4536: "int8multirange",
        4537: "anymultirange",
        4538: "anycompatiblemultirange",
        4600: "pg_brin_bloom_summary",
        4601: "pg_brin_minmax_multi_summary",
        5017: "pg_mcv_list",
        5038: "pg_snapshot",
        5069: "xid8",
        5077: "anycompatible",
        5078: "anycompatiblearray",
        5079: "anycompatiblenonarray",
        5080: "anycompatiblerange"
    };
    type;
    constructor(code){
        super();
        this.type = _UnsupportedNativeDataType.typeNames[code] || "Unknown";
        this.message = `Unsupported column type ${this.type}`;
    }
};
function fieldToColumnType(fieldTypeId) {
    switch(fieldTypeId){
        case ScalarColumnType.INT2:
        case ScalarColumnType.INT4:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int32;
        case ScalarColumnType.INT8:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64;
        case ScalarColumnType.FLOAT4:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Float;
        case ScalarColumnType.FLOAT8:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Double;
        case ScalarColumnType.BOOL:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Boolean;
        case ScalarColumnType.DATE:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Date;
        case ScalarColumnType.TIME:
        case ScalarColumnType.TIMETZ:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Time;
        case ScalarColumnType.TIMESTAMP:
        case ScalarColumnType.TIMESTAMPTZ:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTime;
        case ScalarColumnType.NUMERIC:
        case ScalarColumnType.MONEY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Numeric;
        case ScalarColumnType.JSON:
        case ScalarColumnType.JSONB:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Json;
        case ScalarColumnType.UUID:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Uuid;
        case ScalarColumnType.OID:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64;
        case ScalarColumnType.BPCHAR:
        case ScalarColumnType.TEXT:
        case ScalarColumnType.VARCHAR:
        case ScalarColumnType.BIT:
        case ScalarColumnType.VARBIT:
        case ScalarColumnType.INET:
        case ScalarColumnType.CIDR:
        case ScalarColumnType.XML:
        case AdditionalScalarColumnType.NAME:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Text;
        case ScalarColumnType.BYTEA:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Bytes;
        case ArrayColumnType.INT2_ARRAY:
        case ArrayColumnType.INT4_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int32Array;
        case ArrayColumnType.FLOAT4_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].FloatArray;
        case ArrayColumnType.FLOAT8_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DoubleArray;
        case ArrayColumnType.NUMERIC_ARRAY:
        case ArrayColumnType.MONEY_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].NumericArray;
        case ArrayColumnType.BOOL_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].BooleanArray;
        case ArrayColumnType.CHAR_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].CharacterArray;
        case ArrayColumnType.BPCHAR_ARRAY:
        case ArrayColumnType.TEXT_ARRAY:
        case ArrayColumnType.VARCHAR_ARRAY:
        case ArrayColumnType.VARBIT_ARRAY:
        case ArrayColumnType.BIT_ARRAY:
        case ArrayColumnType.INET_ARRAY:
        case ArrayColumnType.CIDR_ARRAY:
        case ArrayColumnType.XML_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].TextArray;
        case ArrayColumnType.DATE_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateArray;
        case ArrayColumnType.TIME_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].TimeArray;
        case ArrayColumnType.TIMESTAMP_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTimeArray;
        case ArrayColumnType.TIMESTAMPTZ_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTimeArray;
        case ArrayColumnType.JSON_ARRAY:
        case ArrayColumnType.JSONB_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].JsonArray;
        case ArrayColumnType.BYTEA_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].BytesArray;
        case ArrayColumnType.UUID_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].UuidArray;
        case ArrayColumnType.INT8_ARRAY:
        case ArrayColumnType.OID_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64Array;
        default:
            if (fieldTypeId >= FIRST_NORMAL_OBJECT_ID) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Text;
            }
            throw new UnsupportedNativeDataType(fieldTypeId);
    }
}
function normalize_array(element_normalizer) {
    return (str)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2d$array$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(str, element_normalizer);
}
function normalize_numeric(numeric) {
    return numeric;
}
function normalize_date(date) {
    return date;
}
function normalize_timestamp(time) {
    return `${time.replace(" ", "T")}+00:00`;
}
function normalize_timestamptz(time) {
    return time.replace(" ", "T").replace(/[+-]\d{2}(:\d{2})?$/, "+00:00");
}
function normalize_time(time) {
    return time;
}
function normalize_timez(time) {
    return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
function normalize_money(money) {
    return money.slice(1);
}
function normalize_xml(xml) {
    return xml;
}
function toJson(json) {
    return json;
}
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var normalizeByteaArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function convertBytes(serializedBytes) {
    return parsePgBytes(serializedBytes);
}
function normalizeBit(bit) {
    return bit;
}
var customParsers = {
    [ScalarColumnType.NUMERIC]: normalize_numeric,
    [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
    [ScalarColumnType.TIME]: normalize_time,
    [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
    [ScalarColumnType.TIMETZ]: normalize_timez,
    [ScalarColumnType.DATE]: normalize_date,
    [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
    [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
    [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
    [ScalarColumnType.TIMESTAMPTZ]: normalize_timestamptz,
    [ArrayColumnType.TIMESTAMPTZ_ARRAY]: normalize_array(normalize_timestamptz),
    [ScalarColumnType.MONEY]: normalize_money,
    [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
    [ScalarColumnType.JSON]: toJson,
    [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
    [ScalarColumnType.JSONB]: toJson,
    [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
    [ScalarColumnType.BYTEA]: convertBytes,
    [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
    [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
    [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
    [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function mapArg(arg, argType) {
    if (arg === null) {
        return null;
    }
    if (Array.isArray(arg) && argType.arity === "list") {
        return arg.map((value)=>mapArg(value, argType));
    }
    if (typeof arg === "string" && argType.scalarType === "datetime") {
        arg = new Date(arg);
    }
    if (arg instanceof Date) {
        switch(argType.dbType){
            case "TIME":
            case "TIMETZ":
                return formatTime(arg);
            case "DATE":
                return formatDate(arg);
            default:
                return formatDateTime(arg);
        }
    }
    if (typeof arg === "string" && argType.scalarType === "bytes") {
        return Buffer.from(arg, "base64");
    }
    if (ArrayBuffer.isView(arg)) {
        return new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
    }
    return arg;
}
function formatDateTime(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    const ms = date.getUTCMilliseconds();
    return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
function formatDate(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
function formatTime(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    const ms = date.getUTCMilliseconds();
    return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
// src/errors.ts
var TLS_ERRORS = /* @__PURE__ */ new Set([
    "UNABLE_TO_GET_ISSUER_CERT",
    "UNABLE_TO_GET_CRL",
    "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
    "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
    "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
    "CERT_SIGNATURE_FAILURE",
    "CRL_SIGNATURE_FAILURE",
    "CERT_NOT_YET_VALID",
    "CERT_HAS_EXPIRED",
    "CRL_NOT_YET_VALID",
    "CRL_HAS_EXPIRED",
    "ERROR_IN_CERT_NOT_BEFORE_FIELD",
    "ERROR_IN_CERT_NOT_AFTER_FIELD",
    "ERROR_IN_CRL_LAST_UPDATE_FIELD",
    "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
    "SELF_SIGNED_CERT_IN_CHAIN",
    "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "CERT_CHAIN_TOO_LONG",
    "CERT_REVOKED",
    "INVALID_CA",
    "INVALID_PURPOSE",
    "CERT_UNTRUSTED",
    "CERT_REJECTED",
    "HOSTNAME_MISMATCH",
    "ERR_TLS_CERT_ALTNAME_FORMAT",
    "ERR_TLS_CERT_ALTNAME_INVALID"
]);
var SOCKET_ERRORS = /* @__PURE__ */ new Set([
    "ENOTFOUND",
    "ECONNREFUSED",
    "ECONNRESET",
    "ETIMEDOUT"
]);
function convertDriverError(error) {
    if (isSocketError(error)) {
        return mapSocketError(error);
    }
    if (isTlsError(error)) {
        return {
            kind: "TlsConnectionError",
            reason: error.message
        };
    }
    if (isDriverError(error)) {
        return {
            originalCode: error.code,
            originalMessage: error.message,
            ...mapDriverError(error)
        };
    }
    throw error;
}
function mapDriverError(error) {
    switch(error.code){
        case "22001":
            return {
                kind: "LengthMismatch",
                column: error.column
            };
        case "22003":
            return {
                kind: "ValueOutOfRange",
                cause: error.message
            };
        case "22P02":
            return {
                kind: "InvalidInputValue",
                message: error.message
            };
        case "23505":
            {
                const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
                return {
                    kind: "UniqueConstraintViolation",
                    constraint: fields !== void 0 ? {
                        fields
                    } : void 0
                };
            }
        case "23502":
            {
                const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
                return {
                    kind: "NullConstraintViolation",
                    constraint: fields !== void 0 ? {
                        fields
                    } : void 0
                };
            }
        case "23503":
            {
                let constraint;
                if (error.column) {
                    constraint = {
                        fields: [
                            error.column
                        ]
                    };
                } else if (error.constraint) {
                    constraint = {
                        index: error.constraint
                    };
                }
                return {
                    kind: "ForeignKeyConstraintViolation",
                    constraint
                };
            }
        case "3D000":
            return {
                kind: "DatabaseDoesNotExist",
                db: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "28000":
            return {
                kind: "DatabaseAccessDenied",
                db: error.message.split(",").find((s)=>s.startsWith(" database"))?.split('"').at(1)
            };
        case "28P01":
            return {
                kind: "AuthenticationFailed",
                user: error.message.split(" ").pop()?.split('"').at(1)
            };
        case "40001":
            return {
                kind: "TransactionWriteConflict"
            };
        case "42P01":
            return {
                kind: "TableDoesNotExist",
                table: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "42703":
            {
                const rawColumn = error.message.match(/^column (.+) does not exist$/)?.at(1);
                return {
                    kind: "ColumnNotFound",
                    column: rawColumn?.replace(/"((?:""|[^"])*)"/g, (_, id)=>id.replaceAll('""', '"'))
                };
            }
        case "42P04":
            return {
                kind: "DatabaseAlreadyExists",
                db: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "53300":
            return {
                kind: "TooManyConnections",
                cause: error.message
            };
        default:
            return {
                kind: "postgres",
                code: error.code ?? "N/A",
                severity: error.severity ?? "N/A",
                message: error.message,
                detail: error.detail,
                column: error.column,
                hint: error.hint
            };
    }
}
function isDriverError(error) {
    return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
}
function mapSocketError(error) {
    switch(error.code){
        case "ENOTFOUND":
        case "ECONNREFUSED":
            return {
                kind: "DatabaseNotReachable",
                host: error.address ?? error.hostname,
                port: error.port
            };
        case "ECONNRESET":
            return {
                kind: "ConnectionClosed"
            };
        case "ETIMEDOUT":
            return {
                kind: "SocketTimeout"
            };
    }
}
function isSocketError(error) {
    return typeof error.code === "string" && typeof error.syscall === "string" && typeof error.errno === "number" && SOCKET_ERRORS.has(error.code);
}
function isTlsError(error) {
    if (typeof error.code === "string") {
        return TLS_ERRORS.has(error.code);
    }
    switch(error.message){
        case "The server does not support SSL connections":
        case "There was an error establishing an SSL connection":
            return true;
    }
    return false;
}
// src/pg.ts
var types2 = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].types;
var debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Debug"])("prisma:driver-adapter:pg");
var PgQueryable = class {
    constructor(client, pgOptions){
        this.client = client;
        this.pgOptions = pgOptions;
    }
    provider = "postgres";
    adapterName = name;
    /**
   * Execute a query given as SQL, interpolating the given parameters.
   */ async queryRaw(query) {
        const tag = "[js::query_raw]";
        debug(`${tag} %O`, query);
        const { fields, rows } = await this.performIO(query);
        const columnNames = fields.map((field)=>field.name);
        let columnTypes = [];
        try {
            columnTypes = fields.map((field)=>fieldToColumnType(field.dataTypeID));
        } catch (e) {
            if (e instanceof UnsupportedNativeDataType) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DriverAdapterError"]({
                    kind: "UnsupportedNativeDataType",
                    type: e.type
                });
            }
            throw e;
        }
        const udtParser = this.pgOptions?.userDefinedTypeParser;
        if (udtParser) {
            for(let i = 0; i < fields.length; i++){
                const field = fields[i];
                if (field.dataTypeID >= FIRST_NORMAL_OBJECT_ID && !Object.hasOwn(customParsers, field.dataTypeID)) {
                    for(let j = 0; j < rows.length; j++){
                        rows[j][i] = await udtParser(field.dataTypeID, rows[j][i], this);
                    }
                }
            }
        }
        return {
            columnNames,
            columnTypes,
            rows
        };
    }
    /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */ async executeRaw(query) {
        const tag = "[js::execute_raw]";
        debug(`${tag} %O`, query);
        return (await this.performIO(query)).rowCount ?? 0;
    }
    /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */ async performIO(query) {
        const { sql, args } = query;
        const values = args.map((arg, i)=>mapArg(arg, query.argTypes[i]));
        try {
            const result = await this.client.query({
                name: this.pgOptions?.statementNameGenerator?.(query),
                text: sql,
                values,
                rowMode: "array",
                types: {
                    getTypeParser: (oid, format)=>{
                        if (format === "text" && customParsers[oid]) {
                            return customParsers[oid];
                        }
                        return types2.getTypeParser(oid, format);
                    }
                }
            });
            return result;
        } catch (e) {
            this.onError(e);
        }
    }
    onError(error) {
        debug("Error in performIO: %O", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DriverAdapterError"](convertDriverError(error));
    }
};
var PgTransaction = class extends PgQueryable {
    constructor(client, options, pgOptions, cleanup){
        super(client, pgOptions);
        this.options = options;
        this.pgOptions = pgOptions;
        this.cleanup = cleanup;
    }
    async commit() {
        debug(`[js::commit]`);
        this.cleanup?.();
        this.client.release();
    }
    async rollback() {
        debug(`[js::rollback]`);
        this.cleanup?.();
        this.client.release();
    }
    async createSavepoint(name2) {
        await this.executeRaw({
            sql: `SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
    async rollbackToSavepoint(name2) {
        await this.executeRaw({
            sql: `ROLLBACK TO SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
    async releaseSavepoint(name2) {
        await this.executeRaw({
            sql: `RELEASE SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
};
var PrismaPgAdapter = class extends PgQueryable {
    constructor(client, pgOptions, release){
        super(client);
        this.pgOptions = pgOptions;
        this.release = release;
    }
    async startTransaction(isolationLevel) {
        const options = {
            usePhantomQuery: false
        };
        const tag = "[js::startTransaction]";
        debug("%s options: %O", tag, options);
        const conn = await this.client.connect().catch((error)=>this.onError(error));
        const onError = (err)=>{
            debug(`Error from pool connection: ${err.message} %O`, err);
            this.pgOptions?.onConnectionError?.(err);
        };
        conn.on("error", onError);
        const cleanup = ()=>{
            conn.removeListener("error", onError);
        };
        try {
            const tx = new PgTransaction(conn, options, this.pgOptions, cleanup);
            await tx.executeRaw({
                sql: "BEGIN",
                args: [],
                argTypes: []
            });
            if (isolationLevel) {
                await tx.executeRaw({
                    sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
                    args: [],
                    argTypes: []
                });
            }
            return tx;
        } catch (error) {
            cleanup();
            conn.release(error);
            this.onError(error);
        }
    }
    async executeScript(script) {
        const statements = script.split(";").map((stmt)=>stmt.trim()).filter((stmt)=>stmt.length > 0);
        for (const stmt of statements){
            try {
                await this.client.query(stmt);
            } catch (error) {
                this.onError(error);
            }
        }
    }
    getConnectionInfo() {
        return {
            schemaName: this.pgOptions?.schema,
            supportsRelationJoins: true
        };
    }
    async dispose() {
        return this.release?.();
    }
    underlyingDriver() {
        return this.client;
    }
};
var PrismaPgAdapterFactory = class {
    constructor(poolOrConfig, options){
        this.options = options;
        if (poolOrConfig instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool) {
            this.externalPool = poolOrConfig;
            this.config = poolOrConfig.options;
        } else if (typeof poolOrConfig === "string") {
            this.externalPool = null;
            this.config = {
                connectionString: poolOrConfig
            };
        } else {
            this.externalPool = null;
            this.config = poolOrConfig;
        }
    }
    provider = "postgres";
    adapterName = name;
    config;
    externalPool;
    async connect() {
        const client = this.externalPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool(this.config);
        const onIdleClientError = (err)=>{
            debug(`Error from idle pool client: ${err.message} %O`, err);
            this.options?.onPoolError?.(err);
        };
        client.on("error", onIdleClientError);
        return new PrismaPgAdapter(client, this.options, async ()=>{
            if (this.externalPool) {
                if (this.options?.disposeExternalPool) {
                    await this.externalPool.end();
                    this.externalPool = null;
                } else {
                    this.externalPool.removeListener("error", onIdleClientError);
                }
            } else {
                await client.end();
            }
        });
    }
    async connectToShadowDb() {
        const conn = await this.connect();
        const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
        await conn.executeScript(`CREATE DATABASE "${database}"`);
        const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool({
            ...this.config,
            database
        });
        return new PrismaPgAdapter(client, void 0, async ()=>{
            await conn.executeScript(`DROP DATABASE "${database}"`);
            await client.end();
        });
    }
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/@prisma/client-runtime-utils/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod2)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod2);
// src/index.ts
var index_exports = {};
__export(index_exports, {
    AnyNull: ()=>AnyNull,
    AnyNullClass: ()=>AnyNullClass,
    DbNull: ()=>DbNull,
    DbNullClass: ()=>DbNullClass,
    Decimal: ()=>Decimal,
    JsonNull: ()=>JsonNull,
    JsonNullClass: ()=>JsonNullClass,
    NullTypes: ()=>NullTypes,
    ObjectEnumValue: ()=>ObjectEnumValue,
    PrismaClientInitializationError: ()=>PrismaClientInitializationError,
    PrismaClientKnownRequestError: ()=>PrismaClientKnownRequestError,
    PrismaClientRustError: ()=>PrismaClientRustError,
    PrismaClientRustPanicError: ()=>PrismaClientRustPanicError,
    PrismaClientUnknownRequestError: ()=>PrismaClientUnknownRequestError,
    PrismaClientValidationError: ()=>PrismaClientValidationError,
    Sql: ()=>Sql,
    empty: ()=>empty,
    hasBatchIndex: ()=>hasBatchIndex,
    isAnyNull: ()=>isAnyNull,
    isDbNull: ()=>isDbNull,
    isJsonNull: ()=>isJsonNull,
    isObjectEnumValue: ()=>isObjectEnumValue,
    join: ()=>join,
    raw: ()=>raw,
    sql: ()=>sql
});
module.exports = __toCommonJS(index_exports);
// src/errors/ErrorWithBatchIndex.ts
function hasBatchIndex(value) {
    return typeof value["batchRequestIdx"] === "number";
}
// src/errors/setClassName.ts
function setClassName(classObject, name) {
    Object.defineProperty(classObject, "name", {
        value: name,
        configurable: true
    });
}
// src/errors/PrismaClientInitializationError.ts
var PrismaClientInitializationError = class _PrismaClientInitializationError extends Error {
    clientVersion;
    errorCode;
    retryable;
    constructor(message, clientVersion, errorCode){
        super(message);
        this.name = "PrismaClientInitializationError";
        this.clientVersion = clientVersion;
        this.errorCode = errorCode;
        Error.captureStackTrace(_PrismaClientInitializationError);
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
    }
};
setClassName(PrismaClientInitializationError, "PrismaClientInitializationError");
// src/errors/PrismaClientKnownRequestError.ts
var PrismaClientKnownRequestError = class extends Error {
    code;
    meta;
    clientVersion;
    batchRequestIdx;
    constructor(message, { code, clientVersion, meta, batchRequestIdx }){
        super(message);
        this.name = "PrismaClientKnownRequestError";
        this.code = code;
        this.clientVersion = clientVersion;
        this.meta = meta;
        Object.defineProperty(this, "batchRequestIdx", {
            value: batchRequestIdx,
            enumerable: false,
            writable: true
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
    }
};
setClassName(PrismaClientKnownRequestError, "PrismaClientKnownRequestError");
// src/errors/log.ts
function getBacktrace(log3) {
    if (log3.fields?.message) {
        let str = log3.fields?.message;
        if (log3.fields?.file) {
            str += ` in ${log3.fields.file}`;
            if (log3.fields?.line) {
                str += `:${log3.fields.line}`;
            }
            if (log3.fields?.column) {
                str += `:${log3.fields.column}`;
            }
        }
        if (log3.fields?.reason) {
            str += `
${log3.fields?.reason}`;
        }
        return str;
    }
    return "Unknown error";
}
function isPanic(err) {
    return err.fields?.message === "PANIC";
}
// src/errors/PrismaClientRustError.ts
var PrismaClientRustError = class extends Error {
    clientVersion;
    _isPanic;
    constructor({ clientVersion, error }){
        const backtrace = getBacktrace(error);
        super(backtrace ?? "Unknown error");
        this._isPanic = isPanic(error);
        this.clientVersion = clientVersion;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientRustError";
    }
    isPanic() {
        return this._isPanic;
    }
};
setClassName(PrismaClientRustError, "PrismaClientRustError");
// src/errors/PrismaClientRustPanicError.ts
var PrismaClientRustPanicError = class extends Error {
    clientVersion;
    constructor(message, clientVersion){
        super(message);
        this.name = "PrismaClientRustPanicError";
        this.clientVersion = clientVersion;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
    }
};
setClassName(PrismaClientRustPanicError, "PrismaClientRustPanicError");
// src/errors/PrismaClientUnknownRequestError.ts
var PrismaClientUnknownRequestError = class extends Error {
    clientVersion;
    batchRequestIdx;
    constructor(message, { clientVersion, batchRequestIdx }){
        super(message);
        this.name = "PrismaClientUnknownRequestError";
        this.clientVersion = clientVersion;
        Object.defineProperty(this, "batchRequestIdx", {
            value: batchRequestIdx,
            writable: true,
            enumerable: false
        });
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
    }
};
setClassName(PrismaClientUnknownRequestError, "PrismaClientUnknownRequestError");
// src/errors/PrismaClientValidationError.ts
var PrismaClientValidationError = class extends Error {
    name = "PrismaClientValidationError";
    clientVersion;
    constructor(message, { clientVersion }){
        super(message);
        this.clientVersion = clientVersion;
    }
    get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
    }
};
setClassName(PrismaClientValidationError, "PrismaClientValidationError");
// src/nullTypes.ts
var secret = Symbol();
var PRISMA_OBJECT_ENUM_VALUE = Symbol.for("prisma.objectEnumValue");
var ObjectEnumValue = class {
    [PRISMA_OBJECT_ENUM_VALUE] = true;
    #representation;
    constructor(arg){
        if (arg === secret) {
            this.#representation = `Prisma.${this._getName()}`;
        } else {
            this.#representation = `new Prisma.${this._getNamespace()}.${this._getName()}()`;
        }
    }
    _getName() {
        return this.constructor.name;
    }
    toString() {
        return this.#representation;
    }
};
function setClassName2(classObject, name) {
    Object.defineProperty(classObject, "name", {
        value: name,
        configurable: true
    });
}
var NullTypesEnumValue = class extends ObjectEnumValue {
    _getNamespace() {
        return "NullTypes";
    }
};
var DbNullClass = class extends NullTypesEnumValue {
    // Phantom private property to prevent structural type equality
    // eslint-disable-next-line no-unused-private-class-members
    #_brand_DbNull;
};
setClassName2(DbNullClass, "DbNull");
var JsonNullClass = class extends NullTypesEnumValue {
    // Phantom private property to prevent structural type equality
    // eslint-disable-next-line no-unused-private-class-members
    #_brand_JsonNull;
};
setClassName2(JsonNullClass, "JsonNull");
var AnyNullClass = class extends NullTypesEnumValue {
    // Phantom private property to prevent structural type equality
    // eslint-disable-next-line no-unused-private-class-members
    #_brand_AnyNull;
};
setClassName2(AnyNullClass, "AnyNull");
var NullTypes = {
    DbNull: DbNullClass,
    JsonNull: JsonNullClass,
    AnyNull: AnyNullClass
};
var DbNull = new DbNullClass(secret);
var JsonNull = new JsonNullClass(secret);
var AnyNull = new AnyNullClass(secret);
function isObjectEnumValue(value) {
    return typeof value === "object" && value !== null && value[PRISMA_OBJECT_ENUM_VALUE] === true;
}
function isDbNull(value) {
    return value === DbNull;
}
function isJsonNull(value) {
    return value === JsonNull;
}
function isAnyNull(value) {
    return value === AnyNull;
}
// ../../node_modules/.pnpm/decimal.js@10.5.0/node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
    // These values must be integers within the stated ranges (inclusive).
    // Most of these values can be changed at run-time using the `Decimal.config` method.
    // The maximum number of significant digits of the result of a calculation or base conversion.
    // E.g. `Decimal.config({ precision: 20 });`
    precision: 20,
    // 1 to MAX_DIGITS
    // The rounding mode used when rounding to `precision`.
    //
    // ROUND_UP         0 Away from zero.
    // ROUND_DOWN       1 Towards zero.
    // ROUND_CEIL       2 Towards +Infinity.
    // ROUND_FLOOR      3 Towards -Infinity.
    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    //
    // E.g.
    // `Decimal.rounding = 4;`
    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
    rounding: 4,
    // 0 to 8
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP         0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN  6 The IEEE 754 remainder function.
    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
    //
    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
    // division (9) are commonly used for the modulus operation. The other rounding modes can also
    // be used, but they may not give useful results.
    modulo: 1,
    // 0 to 9
    // The exponent value at and beneath which `toString` returns exponential notation.
    // JavaScript numbers: -7
    toExpNeg: -7,
    // 0 to -EXP_LIMIT
    // The exponent value at and above which `toString` returns exponential notation.
    // JavaScript numbers: 21
    toExpPos: 21,
    // 0 to EXP_LIMIT
    // The minimum exponent value, beneath which underflow to zero occurs.
    // JavaScript numbers: -324  (5e-324)
    minE: -EXP_LIMIT,
    // -1 to -EXP_LIMIT
    // The maximum exponent value, above which overflow to Infinity occurs.
    // JavaScript numbers: 308  (1.7976931348623157e+308)
    maxE: EXP_LIMIT,
    // 1 to EXP_LIMIT
    // Whether to use cryptographically-secure random number generation, if available.
    crypto: false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = {
    toStringTag: tag
};
P.absoluteValue = P.abs = function() {
    var x = new this.constructor(this);
    if (x.s < 0) x.s = 1;
    return finalise(x);
};
P.ceil = function() {
    return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
    var k, x = this, Ctor = x.constructor;
    min2 = new Ctor(min2);
    max2 = new Ctor(max2);
    if (!min2.s || !max2.s) return new Ctor(NaN);
    if (min2.gt(max2)) throw Error(invalidArgument + max2);
    k = x.cmp(min2);
    return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
    var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
    if (!xd || !yd) {
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }
    if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
    if (xs !== ys) return xs;
    if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
    xdL = xd.length;
    ydL = yd.length;
    for(i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i){
        if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.d) return new Ctor(NaN);
    if (!x.d[0]) return new Ctor(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
    var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    external = false;
    s = x.s * mathpow(x.s * x, 1 / 3);
    if (!s || Math.abs(s) == 1 / 0) {
        n = digitsToString(x.d);
        e = x.e;
        if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
        s = mathpow(n, 1 / 3);
        e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
        if (s == 1 / 0) {
            n = "5e" + e;
        } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
        r.s = x.s;
    } else {
        r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for(;;){
        t = r;
        t3 = t.times(t).times(t);
        t3plusx = t3.plus(x);
        r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
            n = n.slice(sd - 3, sd + 1);
            if (n == "9999" || !rep && n == "4999") {
                if (!rep) {
                    finalise(t, e + 1, 0);
                    if (t.times(t).times(t).eq(x)) {
                        r = t;
                        break;
                    }
                }
                sd += 4;
                rep = 1;
            } else {
                if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    finalise(r, e + 1, 1);
                    m = !r.times(r).times(r).eq(x);
                }
                break;
            }
        }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
    var w, d = this.d, n = NaN;
    if (d) {
        w = d.length - 1;
        n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
        w = d[w];
        if (w) for(; w % 10 == 0; w /= 10)n--;
        if (n < 0) n = 0;
    }
    return n;
};
P.dividedBy = P.div = function(y) {
    return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
    var x = this, Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
    return this.cmp(y) === 0;
};
P.floor = function() {
    return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
    return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
    var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
    if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero()) return one;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 32) {
        k = Math.ceil(len / 3);
        n = (1 / tinyPow(4, k)).toString();
    } else {
        k = 16;
        n = "2.3283064365386962890625e-10";
    }
    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
    var cosh2_x, i = k, d8 = new Ctor(8);
    for(; i--;){
        cosh2_x = x.times(x);
        x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }
    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
    var k, pr, rm, len, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 3) {
        x = taylorSeries(Ctor, 2, x, x, true);
    } else {
        k = 1.4 * Math.sqrt(len);
        k = k > 16 ? 16 : k | 0;
        x = x.times(1 / tinyPow(5, k));
        x = taylorSeries(Ctor, 2, x, x, true);
        var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
        for(; k--;){
            sinh2_x = x.times(x);
            x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
        }
    }
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(x.s);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;
    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
    var x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
    if (k !== -1) {
        return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
    }
    if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
};
P.inverseHyperbolicCosine = P.acosh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).minus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite() || x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).plus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
    var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();
    if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
    Ctor.precision = wpr = xsd - x.e;
    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
    Ctor.precision = pr + 4;
    Ctor.rounding = 1;
    x = x.ln();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(0.5);
};
P.inverseSine = P.asin = function() {
    var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
    if (x.isZero()) return new Ctor(x);
    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (k !== -1) {
        if (k === 0) {
            halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
            halfPi.s = x.s;
            return halfPi;
        }
        return new Ctor(NaN);
    }
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
};
P.inverseTangent = P.atan = function() {
    var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
    if (!x.isFinite()) {
        if (!x.s) return new Ctor(NaN);
        if (pr + 4 <= PI_PRECISION) {
            r = getPi(Ctor, pr + 4, rm).times(0.5);
            r.s = x.s;
            return r;
        }
    } else if (x.isZero()) {
        return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.25);
        r.s = x.s;
        return r;
    }
    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;
    k = Math.min(28, wpr / LOG_BASE + 2 | 0);
    for(i = k; i; --i)x = x.div(x.times(x).plus(1).sqrt().plus(1));
    external = false;
    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;
    for(; i !== -1;){
        px = px.times(x2);
        t = r.minus(px.div(n += 2));
        px = px.times(x2);
        r = t.plus(px.div(n += 2));
        if (r.d[j] !== void 0) for(i = j; r.d[i] === t.d[i] && i--;);
    }
    if (k) r = r.times(2 << k - 1);
    external = true;
    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
    return !!this.d;
};
P.isInteger = P.isInt = function() {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
    return !this.s;
};
P.isNegative = P.isNeg = function() {
    return this.s < 0;
};
P.isPositive = P.isPos = function() {
    return this.s > 0;
};
P.isZero = function() {
    return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
    return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
    return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
    var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
    if (base == null) {
        base = new Ctor(10);
        isBase10 = true;
    } else {
        base = new Ctor(base);
        d = base.d;
        if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
        isBase10 = base.eq(10);
    }
    d = arg.d;
    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
        return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    }
    if (isBase10) {
        if (d.length > 1) {
            inf = true;
        } else {
            for(k = d[0]; k % 10 === 0;)k /= 10;
            inf = k !== 1;
        }
    }
    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
    r = divide(num, denominator, sd, 1);
    if (checkRoundingDigits(r.d, k = pr, rm)) {
        do {
            sd += 10;
            num = naturalLogarithm(arg, sd);
            denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
            r = divide(num, denominator, sd, 1);
            if (!inf) {
                if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
                    r = finalise(r, pr + 1, 0);
                }
                break;
            }
        }while (checkRoundingDigits(r.d, k += 10, rm))
    }
    external = true;
    return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
    var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (x.d) y.s = -y.s;
        else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
        return y;
    }
    if (x.s != y.s) {
        y.s = -y.s;
        return x.plus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
        if (yd[0]) y.s = -y.s;
        else if (xd[0]) y = new Ctor(x);
        else return new Ctor(rm === 3 ? -0 : 0);
        return external ? finalise(y, pr, rm) : y;
    }
    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);
    xd = xd.slice();
    k = xe - e;
    if (k) {
        xLTy = k < 0;
        if (xLTy) {
            d = xd;
            k = -k;
            len = yd.length;
        } else {
            d = yd;
            e = xe;
            len = xd.length;
        }
        i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
        if (k > i) {
            k = i;
            d.length = 1;
        }
        d.reverse();
        for(i = k; i--;)d.push(0);
        d.reverse();
    } else {
        i = xd.length;
        len = yd.length;
        xLTy = i < len;
        if (xLTy) len = i;
        for(i = 0; i < len; i++){
            if (xd[i] != yd[i]) {
                xLTy = xd[i] < yd[i];
                break;
            }
        }
        k = 0;
    }
    if (xLTy) {
        d = xd;
        xd = yd;
        yd = d;
        y.s = -y.s;
    }
    len = xd.length;
    for(i = yd.length - len; i > 0; --i)xd[len++] = 0;
    for(i = yd.length; i > k;){
        if (xd[--i] < yd[i]) {
            for(j = i; j && xd[--j] === 0;)xd[j] = BASE - 1;
            --xd[j];
            xd[i] += BASE;
        }
        xd[i] -= yd[i];
    }
    for(; xd[--len] === 0;)xd.pop();
    for(; xd[0] === 0; xd.shift())--e;
    if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
    var q, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
    if (!y.d || x.d && !x.d[0]) {
        return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }
    external = false;
    if (Ctor.modulo == 9) {
        q = divide(x, y.abs(), 0, 3, 1);
        q.s *= y.s;
    } else {
        q = divide(x, y, 0, Ctor.modulo, 1);
    }
    q = q.times(y);
    external = true;
    return x.minus(q);
};
P.naturalExponential = P.exp = function() {
    return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
    return naturalLogarithm(this);
};
P.negated = P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
};
P.plus = P.add = function(y) {
    var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
        return y;
    }
    if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
        if (!yd[0]) y = new Ctor(x);
        return external ? finalise(y, pr, rm) : y;
    }
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);
    xd = xd.slice();
    i = k - e;
    if (i) {
        if (i < 0) {
            d = xd;
            i = -i;
            len = yd.length;
        } else {
            d = yd;
            e = k;
            len = xd.length;
        }
        k = Math.ceil(pr / LOG_BASE);
        len = k > len ? k + 1 : len + 1;
        if (i > len) {
            i = len;
            d.length = 1;
        }
        d.reverse();
        for(; i--;)d.push(0);
        d.reverse();
    }
    len = xd.length;
    i = yd.length;
    if (len - i < 0) {
        i = len;
        d = yd;
        yd = xd;
        xd = d;
    }
    for(carry = 0; i;){
        carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
        xd[i] %= BASE;
    }
    if (carry) {
        xd.unshift(carry);
        ++e;
    }
    for(len = xd.length; xd[--len] == 0;)xd.pop();
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
    var k, x = this;
    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
    if (x.d) {
        k = getPrecision(x.d);
        if (z && x.e + 1 > k) k = x.e + 1;
    } else {
        k = NaN;
    }
    return k;
};
P.round = function() {
    var x = this, Ctor = x.constructor;
    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = sine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
    var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
    if (s !== 1 || !d || !d[0]) {
        return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }
    external = false;
    s = Math.sqrt(+x);
    if (s == 0 || s == 1 / 0) {
        n = digitsToString(d);
        if ((n.length + e) % 2 == 0) n += "0";
        s = Math.sqrt(n);
        e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
        if (s == 1 / 0) {
            n = "5e" + e;
        } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
    } else {
        r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for(;;){
        t = r;
        r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
            n = n.slice(sd - 3, sd + 1);
            if (n == "9999" || !rep && n == "4999") {
                if (!rep) {
                    finalise(t, e + 1, 0);
                    if (t.times(t).eq(x)) {
                        r = t;
                        break;
                    }
                }
                sd += 4;
                rep = 1;
            } else {
                if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    finalise(r, e + 1, 1);
                    m = !r.times(r).eq(x);
                }
                break;
            }
        }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
    var pr, rm, x = this, Ctor = x.constructor;
    if (!x.isFinite()) return new Ctor(NaN);
    if (x.isZero()) return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;
    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
    var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
    y.s *= x.s;
    if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
    }
    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;
    if (xdL < ydL) {
        r = xd;
        xd = yd;
        yd = r;
        rL = xdL;
        xdL = ydL;
        ydL = rL;
    }
    r = [];
    rL = xdL + ydL;
    for(i = rL; i--;)r.push(0);
    for(i = ydL; --i >= 0;){
        carry = 0;
        for(k = xdL + i; k > i;){
            t = r[k] + yd[i] * xd[k - i - 1] + carry;
            r[k--] = t % BASE | 0;
            carry = t / BASE | 0;
        }
        r[k] = (r[k] + carry) % BASE | 0;
    }
    for(; !r[--rL];)r.pop();
    if (carry) ++e;
    else r.shift();
    y.d = r;
    y.e = getBase10Exponent(r, e);
    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
    return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
    var x = this, Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0) return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
    var str, x = this, Ctor = x.constructor;
    if (dp === void 0) {
        str = finiteToString(x, true);
    } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), dp + 1, rm);
        str = finiteToString(x, true, dp + 1);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
    var str, y, x = this, Ctor = x.constructor;
    if (dp === void 0) {
        str = finiteToString(x);
    } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        y = finalise(new Ctor(x), dp + x.e + 1, rm);
        str = finiteToString(y, false, dp + y.e + 1);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
    var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
    if (!xd) return new Ctor(x);
    n1 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);
    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
    if (maxD == null) {
        maxD = e > 0 ? d : n1;
    } else {
        n = new Ctor(maxD);
        if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
        maxD = n.gt(d) ? e > 0 ? d : n1 : n;
    }
    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;
    for(;;){
        q = divide(n, d, 0, 1, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.cmp(maxD) == 1) break;
        d0 = d1;
        d1 = d2;
        d2 = n1;
        n1 = n0.plus(q.times(d2));
        n0 = d2;
        d2 = d;
        d = n.minus(q.times(d2));
        n = d2;
    }
    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [
        n1,
        d1
    ] : [
        n0,
        d0
    ];
    Ctor.precision = pr;
    external = true;
    return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
    return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
    var x = this, Ctor = x.constructor;
    x = new Ctor(x);
    if (y == null) {
        if (!x.d) return x;
        y = new Ctor(1);
        rm = Ctor.rounding;
    } else {
        y = new Ctor(y);
        if (rm === void 0) {
            rm = Ctor.rounding;
        } else {
            checkInt32(rm, 0, 8);
        }
        if (!x.d) return y.s ? x : y;
        if (!y.d) {
            if (y.s) y.s = x.s;
            return y;
        }
    }
    if (y.d[0]) {
        external = false;
        x = divide(x, y, 0, rm, 1).times(y);
        external = true;
        finalise(x);
    } else {
        y.s = x.s;
        x = y;
    }
    return x;
};
P.toNumber = function() {
    return +this;
};
P.toOctal = function(sd, rm) {
    return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
    var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
    if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
    x = new Ctor(x);
    if (x.eq(1)) return x;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (y.eq(1)) return finalise(x, pr, rm);
    e = mathfloor(y.e / LOG_BASE);
    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
        r = intPow(Ctor, x, k, pr);
        return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }
    s = x.s;
    if (s < 0) {
        if (e < y.d.length - 1) return new Ctor(NaN);
        if ((y.d[e] & 1) == 0) s = 1;
        if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
            x.s = s;
            return x;
        }
    }
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
    external = false;
    Ctor.rounding = x.s = 1;
    k = Math.min(12, (e + "").length);
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
    if (r.d) {
        r = finalise(r, pr + 5, 1);
        if (checkRoundingDigits(r.d, pr, rm)) {
            e = pr + 10;
            r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
            if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
                r = finalise(r, pr + 1, 0);
            }
        }
    }
    r.s = s;
    external = true;
    Ctor.rounding = rm;
    return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
    var str, x = this, Ctor = x.constructor;
    if (sd === void 0) {
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), sd, rm);
        str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }
    return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
    var x = this, Ctor = x.constructor;
    if (sd === void 0) {
        sd = Ctor.precision;
        rm = Ctor.rounding;
    } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
    }
    return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
    var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
    return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
    var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
    var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
    if (indexOfLastWord > 0) {
        str += w;
        for(i = 1; i < indexOfLastWord; i++){
            ws = d[i] + "";
            k = LOG_BASE - ws.length;
            if (k) str += getZeroString(k);
            str += ws;
        }
        w = d[i];
        ws = w + "";
        k = LOG_BASE - ws.length;
        if (k) str += getZeroString(k);
    } else if (w === 0) {
        return "0";
    }
    for(; w % 10 === 0;)w /= 10;
    return str + w;
}
function checkInt32(i, min2, max2) {
    if (i !== ~~i || i < min2 || i > max2) {
        throw Error(invalidArgument + i);
    }
}
function checkRoundingDigits(d, i, rm, repeating) {
    var di, k, r, rd;
    for(k = d[0]; k >= 10; k /= 10)--i;
    if (--i < 0) {
        i += LOG_BASE;
        di = 0;
    } else {
        di = Math.ceil((i + 1) / LOG_BASE);
        i %= LOG_BASE;
    }
    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;
    if (repeating == null) {
        if (i < 3) {
            if (i == 0) rd = rd / 100 | 0;
            else if (i == 1) rd = rd / 10 | 0;
            r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
        } else {
            r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
        }
    } else {
        if (i < 4) {
            if (i == 0) rd = rd / 1e3 | 0;
            else if (i == 1) rd = rd / 100 | 0;
            else if (i == 2) rd = rd / 10 | 0;
            r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
        } else {
            r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
        }
    }
    return r;
}
function convertBase(str, baseIn, baseOut) {
    var j, arr = [
        0
    ], arrL, i = 0, strL = str.length;
    for(; i < strL;){
        for(arrL = arr.length; arrL--;)arr[arrL] *= baseIn;
        arr[0] += NUMERALS.indexOf(str.charAt(i++));
        for(j = 0; j < arr.length; j++){
            if (arr[j] > baseOut - 1) {
                if (arr[j + 1] === void 0) arr[j + 1] = 0;
                arr[j + 1] += arr[j] / baseOut | 0;
                arr[j] %= baseOut;
            }
        }
    }
    return arr.reverse();
}
function cosine(Ctor, x) {
    var k, len, y;
    if (x.isZero()) return x;
    len = x.d.length;
    if (len < 32) {
        k = Math.ceil(len / 3);
        y = (1 / tinyPow(4, k)).toString();
    } else {
        k = 16;
        y = "2.3283064365386962890625e-10";
    }
    Ctor.precision += k;
    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
    for(var i = k; i--;){
        var cos2x = x.times(x);
        x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }
    Ctor.precision -= k;
    return x;
}
var divide = /* @__PURE__ */ function() {
    function multiplyInteger(x, k, base) {
        var temp, carry = 0, i = x.length;
        for(x = x.slice(); i--;){
            temp = x[i] * k + carry;
            x[i] = temp % base | 0;
            carry = temp / base | 0;
        }
        if (carry) x.unshift(carry);
        return x;
    }
    function compare(a, b, aL, bL) {
        var i, r;
        if (aL != bL) {
            r = aL > bL ? 1 : -1;
        } else {
            for(i = r = 0; i < aL; i++){
                if (a[i] != b[i]) {
                    r = a[i] > b[i] ? 1 : -1;
                    break;
                }
            }
        }
        return r;
    }
    function subtract(a, b, aL, base) {
        var i = 0;
        for(; aL--;){
            a[aL] -= i;
            i = a[aL] < b[aL] ? 1 : 0;
            a[aL] = i * base + a[aL] - b[aL];
        }
        for(; !a[0] && a.length > 1;)a.shift();
    }
    return function(x, y, pr, rm, dp, base) {
        var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
        if (!xd || !xd[0] || !yd || !yd[0]) {
            return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
            !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
            xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0);
        }
        if (base) {
            logBase = 1;
            e = x.e - y.e;
        } else {
            base = BASE;
            logBase = LOG_BASE;
            e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
        }
        yL = yd.length;
        xL = xd.length;
        q = new Ctor(sign2);
        qd = q.d = [];
        for(i = 0; yd[i] == (xd[i] || 0); i++);
        if (yd[i] > (xd[i] || 0)) e--;
        if (pr == null) {
            sd = pr = Ctor.precision;
            rm = Ctor.rounding;
        } else if (dp) {
            sd = pr + (x.e - y.e) + 1;
        } else {
            sd = pr;
        }
        if (sd < 0) {
            qd.push(1);
            more = true;
        } else {
            sd = sd / logBase + 2 | 0;
            i = 0;
            if (yL == 1) {
                k = 0;
                yd = yd[0];
                sd++;
                for(; (i < xL || k) && sd--; i++){
                    t = k * base + (xd[i] || 0);
                    qd[i] = t / yd | 0;
                    k = t % yd | 0;
                }
                more = k || i < xL;
            } else {
                k = base / (yd[0] + 1) | 0;
                if (k > 1) {
                    yd = multiplyInteger(yd, k, base);
                    xd = multiplyInteger(xd, k, base);
                    yL = yd.length;
                    xL = xd.length;
                }
                xi = yL;
                rem = xd.slice(0, yL);
                remL = rem.length;
                for(; remL < yL;)rem[remL++] = 0;
                yz = yd.slice();
                yz.unshift(0);
                yd0 = yd[0];
                if (yd[1] >= base / 2) ++yd0;
                do {
                    k = 0;
                    cmp = compare(yd, rem, yL, remL);
                    if (cmp < 0) {
                        rem0 = rem[0];
                        if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                        k = rem0 / yd0 | 0;
                        if (k > 1) {
                            if (k >= base) k = base - 1;
                            prod = multiplyInteger(yd, k, base);
                            prodL = prod.length;
                            remL = rem.length;
                            cmp = compare(prod, rem, prodL, remL);
                            if (cmp == 1) {
                                k--;
                                subtract(prod, yL < prodL ? yz : yd, prodL, base);
                            }
                        } else {
                            if (k == 0) cmp = k = 1;
                            prod = yd.slice();
                        }
                        prodL = prod.length;
                        if (prodL < remL) prod.unshift(0);
                        subtract(rem, prod, remL, base);
                        if (cmp == -1) {
                            remL = rem.length;
                            cmp = compare(yd, rem, yL, remL);
                            if (cmp < 1) {
                                k++;
                                subtract(rem, yL < remL ? yz : yd, remL, base);
                            }
                        }
                        remL = rem.length;
                    } else if (cmp === 0) {
                        k++;
                        rem = [
                            0
                        ];
                    }
                    qd[i++] = k;
                    if (cmp && rem[0]) {
                        rem[remL++] = xd[xi] || 0;
                    } else {
                        rem = [
                            xd[xi]
                        ];
                        remL = 1;
                    }
                }while ((xi++ < xL || rem[0] !== void 0) && sd--)
                more = rem[0] !== void 0;
            }
            if (!qd[0]) qd.shift();
        }
        if (logBase == 1) {
            q.e = e;
            inexact = more;
        } else {
            for(i = 1, k = qd[0]; k >= 10; k /= 10)i++;
            q.e = i + e * logBase - 1;
            finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
        }
        return q;
    };
}();
function finalise(x, sd, rm, isTruncated) {
    var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
    out: if (sd != null) {
        xd = x.d;
        if (!xd) return x;
        for(digits = 1, k = xd[0]; k >= 10; k /= 10)digits++;
        i = sd - digits;
        if (i < 0) {
            i += LOG_BASE;
            j = sd;
            w = xd[xdi = 0];
            rd = w / mathpow(10, digits - j - 1) % 10 | 0;
        } else {
            xdi = Math.ceil((i + 1) / LOG_BASE);
            k = xd.length;
            if (xdi >= k) {
                if (isTruncated) {
                    for(; k++ <= xdi;)xd.push(0);
                    w = rd = 0;
                    digits = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                } else {
                    break out;
                }
            } else {
                w = k = xd[xdi];
                for(digits = 1; k >= 10; k /= 10)digits++;
                i %= LOG_BASE;
                j = i - LOG_BASE + digits;
                rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
            }
        }
        isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
        roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xd[0]) {
            xd.length = 0;
            if (roundUp) {
                sd -= x.e + 1;
                xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
                x.e = -sd || 0;
            } else {
                xd[0] = x.e = 0;
            }
            return x;
        }
        if (i == 0) {
            xd.length = xdi;
            k = 1;
            xdi--;
        } else {
            xd.length = xdi + 1;
            k = mathpow(10, LOG_BASE - i);
            xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
        }
        if (roundUp) {
            for(;;){
                if (xdi == 0) {
                    for(i = 1, j = xd[0]; j >= 10; j /= 10)i++;
                    j = xd[0] += k;
                    for(k = 1; j >= 10; j /= 10)k++;
                    if (i != k) {
                        x.e++;
                        if (xd[0] == BASE) xd[0] = 1;
                    }
                    break;
                } else {
                    xd[xdi] += k;
                    if (xd[xdi] != BASE) break;
                    xd[xdi--] = 0;
                    k = 1;
                }
            }
        }
        for(i = xd.length; xd[--i] === 0;)xd.pop();
    }
    if (external) {
        if (x.e > Ctor.maxE) {
            x.d = null;
            x.e = NaN;
        } else if (x.e < Ctor.minE) {
            x.e = 0;
            x.d = [
                0
            ];
        }
    }
    return x;
}
function finiteToString(x, isExp, sd) {
    if (!x.isFinite()) return nonFiniteToString(x);
    var k, e = x.e, str = digitsToString(x.d), len = str.length;
    if (isExp) {
        if (sd && (k = sd - len) > 0) {
            str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
        } else if (len > 1) {
            str = str.charAt(0) + "." + str.slice(1);
        }
        str = str + (x.e < 0 ? "e" : "e+") + x.e;
    } else if (e < 0) {
        str = "0." + getZeroString(-e - 1) + str;
        if (sd && (k = sd - len) > 0) str += getZeroString(k);
    } else if (e >= len) {
        str += getZeroString(e + 1 - len);
        if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
    } else {
        if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
        if (sd && (k = sd - len) > 0) {
            if (e + 1 === len) str += ".";
            str += getZeroString(k);
        }
    }
    return str;
}
function getBase10Exponent(digits, e) {
    var w = digits[0];
    for(e *= LOG_BASE; w >= 10; w /= 10)e++;
    return e;
}
function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {
        external = true;
        if (pr) Ctor.precision = pr;
        throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
    var w = digits.length - 1, len = w * LOG_BASE + 1;
    w = digits[w];
    if (w) {
        for(; w % 10 == 0; w /= 10)len--;
        for(w = digits[0]; w >= 10; w /= 10)len++;
    }
    return len;
}
function getZeroString(k) {
    var zs = "";
    for(; k--;)zs += "0";
    return zs;
}
function intPow(Ctor, x, n, pr) {
    var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for(;;){
        if (n % 2) {
            r = r.times(x);
            if (truncate(r.d, k)) isTruncated = true;
        }
        n = mathfloor(n / 2);
        if (n === 0) {
            n = r.d.length - 1;
            if (isTruncated && r.d[n] === 0) ++r.d[n];
            break;
        }
        x = x.times(x);
        truncate(x.d, k);
    }
    external = true;
    return r;
}
function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, n) {
    var k, y, x = new Ctor(args[0]), i = 0;
    for(; ++i < args.length;){
        y = new Ctor(args[i]);
        if (!y.s) {
            x = y;
            break;
        }
        k = x.cmp(y);
        if (k === n || k === 0 && x.s === n) {
            x = y;
        }
    }
    return x;
}
function naturalExponential(x, sd) {
    var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
    if (!x.d || !x.d[0] || x.e > 17) {
        return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }
    if (sd == null) {
        external = false;
        wpr = pr;
    } else {
        wpr = sd;
    }
    t = new Ctor(0.03125);
    while(x.e > -2){
        x = x.times(t);
        k += 5;
    }
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow2 = sum2 = new Ctor(1);
    Ctor.precision = wpr;
    for(;;){
        pow2 = finalise(pow2.times(x), wpr, 1);
        denominator = denominator.times(++i);
        t = sum2.plus(divide(pow2, denominator, wpr, 1));
        if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
            j = k;
            while(j--)sum2 = finalise(sum2.times(sum2), wpr, 1);
            if (sd == null) {
                if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
                    Ctor.precision = wpr += 10;
                    denominator = pow2 = t = new Ctor(1);
                    i = 0;
                    rep++;
                } else {
                    return finalise(sum2, Ctor.precision = pr, rm, external = true);
                }
            } else {
                Ctor.precision = pr;
                return sum2;
            }
        }
        sum2 = t;
    }
}
function naturalLogarithm(y, sd) {
    var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
        return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }
    if (sd == null) {
        external = false;
        wpr = pr;
    } else {
        wpr = sd;
    }
    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);
    if (Math.abs(e = x.e) < 15e14) {
        while(c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3){
            x = x.times(y);
            c = digitsToString(x.d);
            c0 = c.charAt(0);
            n++;
        }
        e = x.e;
        if (c0 > 1) {
            x = new Ctor("0." + c);
            e++;
        } else {
            x = new Ctor(c0 + "." + c.slice(1));
        }
    } else {
        t = getLn10(Ctor, wpr + 2, pr).times(e + "");
        x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
        Ctor.precision = pr;
        return sd == null ? finalise(x, pr, rm, external = true) : x;
    }
    x1 = x;
    sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;
    for(;;){
        numerator = finalise(numerator.times(x2), wpr, 1);
        t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
        if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
            sum2 = sum2.times(2);
            if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
            sum2 = divide(sum2, new Ctor(n), wpr, 1);
            if (sd == null) {
                if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
                    Ctor.precision = wpr += guard;
                    t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
                    x2 = finalise(x.times(x), wpr, 1);
                    denominator = rep = 1;
                } else {
                    return finalise(sum2, Ctor.precision = pr, rm, external = true);
                }
            } else {
                Ctor.precision = pr;
                return sum2;
            }
        }
        sum2 = t;
        denominator += 2;
    }
}
function nonFiniteToString(x) {
    return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
    var e, i, len;
    if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
    if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
    } else if (e < 0) {
        e = str.length;
    }
    for(i = 0; str.charCodeAt(i) === 48; i++);
    for(len = str.length; str.charCodeAt(len - 1) === 48; --len);
    str = str.slice(i, len);
    if (str) {
        len -= i;
        x.e = e = e - i - 1;
        x.d = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
            if (i) x.d.push(+str.slice(0, i));
            for(len -= LOG_BASE; i < len;)x.d.push(+str.slice(i, i += LOG_BASE));
            str = str.slice(i);
            i = LOG_BASE - str.length;
        } else {
            i -= len;
        }
        for(; i--;)str += "0";
        x.d.push(+str);
        if (external) {
            if (x.e > x.constructor.maxE) {
                x.d = null;
                x.e = NaN;
            } else if (x.e < x.constructor.minE) {
                x.e = 0;
                x.d = [
                    0
                ];
            }
        }
    } else {
        x.e = 0;
        x.d = [
            0
        ];
    }
    return x;
}
function parseOther(x, str) {
    var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
    if (str.indexOf("_") > -1) {
        str = str.replace(/(\d)_(?=\d)/g, "$1");
        if (isDecimal.test(str)) return parseDecimal(x, str);
    } else if (str === "Infinity" || str === "NaN") {
        if (!+str) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return x;
    }
    if (isHex.test(str)) {
        base = 16;
        str = str.toLowerCase();
    } else if (isBinary.test(str)) {
        base = 2;
    } else if (isOctal.test(str)) {
        base = 8;
    } else {
        throw Error(invalidArgument + str);
    }
    i = str.search(/p/i);
    if (i > 0) {
        p = +str.slice(i + 1);
        str = str.substring(2, i);
    } else {
        str = str.slice(2);
    }
    i = str.indexOf(".");
    isFloat = i >= 0;
    Ctor = x.constructor;
    if (isFloat) {
        str = str.replace(".", "");
        len = str.length;
        i = len - i;
        divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }
    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;
    for(i = xe; xd[i] === 0; --i)xd.pop();
    if (i < 0) return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;
    if (isFloat) x = divide(x, divisor, len * 4);
    if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
    external = true;
    return x;
}
function sine(Ctor, x) {
    var k, len = x.d.length;
    if (len < 3) {
        return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
    }
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x);
    var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for(; k--;){
        sin2_x = x.times(x);
        x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }
    return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
    external = false;
    x2 = x.times(x);
    u = new Ctor(y);
    for(;;){
        t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
        u = isHyperbolic ? y.plus(t) : y.minus(t);
        y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
        t = u.plus(y);
        if (t.d[k] !== void 0) {
            for(j = k; t.d[j] === u.d[j] && j--;);
            if (j == -1) break;
        }
        j = u;
        u = y;
        y = t;
        t = j;
        i++;
    }
    external = true;
    t.d.length = k + 1;
    return t;
}
function tinyPow(b, e) {
    var n = b;
    while(--e)n *= b;
    return n;
}
function toLessThanHalfPi(Ctor, x) {
    var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
    x = x.abs();
    if (x.lte(halfPi)) {
        quadrant = isNeg ? 4 : 1;
        return x;
    }
    t = x.divToInt(pi);
    if (t.isZero()) {
        quadrant = isNeg ? 3 : 2;
    } else {
        x = x.minus(t.times(pi));
        if (x.lte(halfPi)) {
            quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
            return x;
        }
        quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
    }
    return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
    var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
    if (isExp) {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
    } else {
        sd = Ctor.precision;
        rm = Ctor.rounding;
    }
    if (!x.isFinite()) {
        str = nonFiniteToString(x);
    } else {
        str = finiteToString(x);
        i = str.indexOf(".");
        if (isExp) {
            base = 2;
            if (baseOut == 16) {
                sd = sd * 4 - 3;
            } else if (baseOut == 8) {
                sd = sd * 3 - 2;
            }
        } else {
            base = baseOut;
        }
        if (i >= 0) {
            str = str.replace(".", "");
            y = new Ctor(1);
            y.e = str.length - i;
            y.d = convertBase(finiteToString(y), 10, base);
            y.e = y.d.length;
        }
        xd = convertBase(str, 10, base);
        e = len = xd.length;
        for(; xd[--len] == 0;)xd.pop();
        if (!xd[0]) {
            str = isExp ? "0p+0" : "0";
        } else {
            if (i < 0) {
                e--;
            } else {
                x = new Ctor(x);
                x.d = xd;
                x.e = e;
                x = divide(x, y, sd, rm, 0, base);
                xd = x.d;
                e = x.e;
                roundUp = inexact;
            }
            i = xd[sd];
            k = base / 2;
            roundUp = roundUp || xd[sd + 1] !== void 0;
            roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
            xd.length = sd;
            if (roundUp) {
                for(; ++xd[--sd] > base - 1;){
                    xd[sd] = 0;
                    if (!sd) {
                        ++e;
                        xd.unshift(1);
                    }
                }
            }
            for(len = xd.length; !xd[len - 1]; --len);
            for(i = 0, str = ""; i < len; i++)str += NUMERALS.charAt(xd[i]);
            if (isExp) {
                if (len > 1) {
                    if (baseOut == 16 || baseOut == 8) {
                        i = baseOut == 16 ? 4 : 3;
                        for(--len; len % i; len++)str += "0";
                        xd = convertBase(str, base, baseOut);
                        for(len = xd.length; !xd[len - 1]; --len);
                        for(i = 1, str = "1."; i < len; i++)str += NUMERALS.charAt(xd[i]);
                    } else {
                        str = str.charAt(0) + "." + str.slice(1);
                    }
                }
                str = str + (e < 0 ? "p" : "p+") + e;
            } else if (e < 0) {
                for(; ++e;)str = "0" + str;
                str = "0." + str;
            } else {
                if (++e > len) for(e -= len; e--;)str += "0";
                else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
            }
        }
        str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
    }
    return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
    if (arr.length > len) {
        arr.length = len;
        return true;
    }
}
function abs(x) {
    return new this(x).abs();
}
function acos(x) {
    return new this(x).acos();
}
function acosh(x) {
    return new this(x).acosh();
}
function add(x, y) {
    return new this(x).plus(y);
}
function asin(x) {
    return new this(x).asin();
}
function asinh(x) {
    return new this(x).asinh();
}
function atan(x) {
    return new this(x).atan();
}
function atanh(x) {
    return new this(x).atanh();
}
function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
    if (!y.s || !x.s) {
        r = new this(NaN);
    } else if (!y.d && !x.d) {
        r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
        r.s = y.s;
    } else if (!x.d || y.isZero()) {
        r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
        r.s = y.s;
    } else if (!y.d || x.isZero()) {
        r = getPi(this, wpr, 1).times(0.5);
        r.s = y.s;
    } else if (x.s < 0) {
        this.precision = wpr;
        this.rounding = 1;
        r = this.atan(divide(y, x, wpr, 1));
        x = getPi(this, wpr, 1);
        this.precision = pr;
        this.rounding = rm;
        r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
        r = this.atan(divide(y, x, wpr, 1));
    }
    return r;
}
function cbrt(x) {
    return new this(x).cbrt();
}
function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
    return new this(x).clamp(min2, max2);
}
function config(obj) {
    if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
    var i, p, v, useDefaults = obj.defaults === true, ps = [
        "precision",
        1,
        MAX_DIGITS,
        "rounding",
        0,
        8,
        "toExpNeg",
        -EXP_LIMIT,
        0,
        "toExpPos",
        0,
        EXP_LIMIT,
        "maxE",
        0,
        EXP_LIMIT,
        "minE",
        -EXP_LIMIT,
        0,
        "modulo",
        0,
        9
    ];
    for(i = 0; i < ps.length; i += 3){
        if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
        if ((v = obj[p]) !== void 0) {
            if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
            else throw Error(invalidArgument + p + ": " + v);
        }
    }
    if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
        if (v === true || v === false || v === 0 || v === 1) {
            if (v) {
                if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                    this[p] = true;
                } else {
                    throw Error(cryptoUnavailable);
                }
            } else {
                this[p] = false;
            }
        } else {
            throw Error(invalidArgument + p + ": " + v);
        }
    }
    return this;
}
function cos(x) {
    return new this(x).cos();
}
function cosh(x) {
    return new this(x).cosh();
}
function clone(obj) {
    var i, p, ps;
    function Decimal2(v) {
        var e, i2, t, x = this;
        if (!(x instanceof Decimal2)) return new Decimal2(v);
        x.constructor = Decimal2;
        if (isDecimalInstance(v)) {
            x.s = v.s;
            if (external) {
                if (!v.d || v.e > Decimal2.maxE) {
                    x.e = NaN;
                    x.d = null;
                } else if (v.e < Decimal2.minE) {
                    x.e = 0;
                    x.d = [
                        0
                    ];
                } else {
                    x.e = v.e;
                    x.d = v.d.slice();
                }
            } else {
                x.e = v.e;
                x.d = v.d ? v.d.slice() : v.d;
            }
            return;
        }
        t = typeof v;
        if (t === "number") {
            if (v === 0) {
                x.s = 1 / v < 0 ? -1 : 1;
                x.e = 0;
                x.d = [
                    0
                ];
                return;
            }
            if (v < 0) {
                v = -v;
                x.s = -1;
            } else {
                x.s = 1;
            }
            if (v === ~~v && v < 1e7) {
                for(e = 0, i2 = v; i2 >= 10; i2 /= 10)e++;
                if (external) {
                    if (e > Decimal2.maxE) {
                        x.e = NaN;
                        x.d = null;
                    } else if (e < Decimal2.minE) {
                        x.e = 0;
                        x.d = [
                            0
                        ];
                    } else {
                        x.e = e;
                        x.d = [
                            v
                        ];
                    }
                } else {
                    x.e = e;
                    x.d = [
                        v
                    ];
                }
                return;
            }
            if (v * 0 !== 0) {
                if (!v) x.s = NaN;
                x.e = NaN;
                x.d = null;
                return;
            }
            return parseDecimal(x, v.toString());
        }
        if (t === "string") {
            if ((i2 = v.charCodeAt(0)) === 45) {
                v = v.slice(1);
                x.s = -1;
            } else {
                if (i2 === 43) v = v.slice(1);
                x.s = 1;
            }
            return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
        }
        if (t === "bigint") {
            if (v < 0) {
                v = -v;
                x.s = -1;
            } else {
                x.s = 1;
            }
            return parseDecimal(x, v.toString());
        }
        throw Error(invalidArgument + v);
    }
    Decimal2.prototype = P;
    Decimal2.ROUND_UP = 0;
    Decimal2.ROUND_DOWN = 1;
    Decimal2.ROUND_CEIL = 2;
    Decimal2.ROUND_FLOOR = 3;
    Decimal2.ROUND_HALF_UP = 4;
    Decimal2.ROUND_HALF_DOWN = 5;
    Decimal2.ROUND_HALF_EVEN = 6;
    Decimal2.ROUND_HALF_CEIL = 7;
    Decimal2.ROUND_HALF_FLOOR = 8;
    Decimal2.EUCLID = 9;
    Decimal2.config = Decimal2.set = config;
    Decimal2.clone = clone;
    Decimal2.isDecimal = isDecimalInstance;
    Decimal2.abs = abs;
    Decimal2.acos = acos;
    Decimal2.acosh = acosh;
    Decimal2.add = add;
    Decimal2.asin = asin;
    Decimal2.asinh = asinh;
    Decimal2.atan = atan;
    Decimal2.atanh = atanh;
    Decimal2.atan2 = atan2;
    Decimal2.cbrt = cbrt;
    Decimal2.ceil = ceil;
    Decimal2.clamp = clamp;
    Decimal2.cos = cos;
    Decimal2.cosh = cosh;
    Decimal2.div = div;
    Decimal2.exp = exp;
    Decimal2.floor = floor;
    Decimal2.hypot = hypot;
    Decimal2.ln = ln;
    Decimal2.log = log;
    Decimal2.log10 = log10;
    Decimal2.log2 = log2;
    Decimal2.max = max;
    Decimal2.min = min;
    Decimal2.mod = mod;
    Decimal2.mul = mul;
    Decimal2.pow = pow;
    Decimal2.random = random;
    Decimal2.round = round;
    Decimal2.sign = sign;
    Decimal2.sin = sin;
    Decimal2.sinh = sinh;
    Decimal2.sqrt = sqrt;
    Decimal2.sub = sub;
    Decimal2.sum = sum;
    Decimal2.tan = tan;
    Decimal2.tanh = tanh;
    Decimal2.trunc = trunc;
    if (obj === void 0) obj = {};
    if (obj) {
        if (obj.defaults !== true) {
            ps = [
                "precision",
                "rounding",
                "toExpNeg",
                "toExpPos",
                "maxE",
                "minE",
                "modulo",
                "crypto"
            ];
            for(i = 0; i < ps.length;)if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
        }
    }
    Decimal2.config(obj);
    return Decimal2;
}
function div(x, y) {
    return new this(x).div(y);
}
function exp(x) {
    return new this(x).exp();
}
function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
    var i, n, t = new this(0);
    external = false;
    for(i = 0; i < arguments.length;){
        n = new this(arguments[i++]);
        if (!n.d) {
            if (n.s) {
                external = true;
                return new this(1 / 0);
            }
            t = n;
        } else if (t.d) {
            t = t.plus(n.times(n));
        }
    }
    external = true;
    return t.sqrt();
}
function isDecimalInstance(obj) {
    return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
    return new this(x).ln();
}
function log(x, y) {
    return new this(x).log(y);
}
function log2(x) {
    return new this(x).log(2);
}
function log10(x) {
    return new this(x).log(10);
}
function max() {
    return maxOrMin(this, arguments, -1);
}
function min() {
    return maxOrMin(this, arguments, 1);
}
function mod(x, y) {
    return new this(x).mod(y);
}
function mul(x, y) {
    return new this(x).mul(y);
}
function pow(x, y) {
    return new this(x).pow(y);
}
function random(sd) {
    var d, e, k, n, i = 0, r = new this(1), rd = [];
    if (sd === void 0) sd = this.precision;
    else checkInt32(sd, 1, MAX_DIGITS);
    k = Math.ceil(sd / LOG_BASE);
    if (!this.crypto) {
        for(; i < k;)rd[i++] = Math.random() * 1e7 | 0;
    } else if (crypto.getRandomValues) {
        d = crypto.getRandomValues(new Uint32Array(k));
        for(; i < k;){
            n = d[i];
            if (n >= 429e7) {
                d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
            } else {
                rd[i++] = n % 1e7;
            }
        }
    } else if (crypto.randomBytes) {
        d = crypto.randomBytes(k *= 4);
        for(; i < k;){
            n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
            if (n >= 214e7) {
                crypto.randomBytes(4).copy(d, i);
            } else {
                rd.push(n % 1e7);
                i += 4;
            }
        }
        i = k / 4;
    } else {
        throw Error(cryptoUnavailable);
    }
    k = rd[--i];
    sd %= LOG_BASE;
    if (k && sd) {
        n = mathpow(10, LOG_BASE - sd);
        rd[i] = (k / n | 0) * n;
    }
    for(; rd[i] === 0; i--)rd.pop();
    if (i < 0) {
        e = 0;
        rd = [
            0
        ];
    } else {
        e = -1;
        for(; rd[0] === 0; e -= LOG_BASE)rd.shift();
        for(k = 1, n = rd[0]; n >= 10; n /= 10)k++;
        if (k < LOG_BASE) e -= LOG_BASE - k;
    }
    r.e = e;
    r.d = rd;
    return r;
}
function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
    x = new this(x);
    return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
    return new this(x).sin();
}
function sinh(x) {
    return new this(x).sinh();
}
function sqrt(x) {
    return new this(x).sqrt();
}
function sub(x, y) {
    return new this(x).sub(y);
}
function sum() {
    var i = 0, args = arguments, x = new this(args[i]);
    external = false;
    for(; x.s && ++i < args.length;)x = x.plus(args[i]);
    external = true;
    return finalise(x, this.precision, this.rounding);
}
function tan(x) {
    return new this(x).tan();
}
function tanh(x) {
    return new this(x).tanh();
}
function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
// ../../node_modules/.pnpm/sql-template-tag@5.2.1/node_modules/sql-template-tag/dist/index.js
var Sql = class _Sql {
    constructor(rawStrings, rawValues){
        if (rawStrings.length - 1 !== rawValues.length) {
            if (rawStrings.length === 0) {
                throw new TypeError("Expected at least 1 string");
            }
            throw new TypeError(`Expected ${rawStrings.length} strings to have ${rawStrings.length - 1} values`);
        }
        const valuesLength = rawValues.reduce((len, value)=>len + (value instanceof _Sql ? value.values.length : 1), 0);
        this.values = new Array(valuesLength);
        this.strings = new Array(valuesLength + 1);
        this.strings[0] = rawStrings[0];
        let i = 0, pos = 0;
        while(i < rawValues.length){
            const child = rawValues[i++];
            const rawString = rawStrings[i];
            if (child instanceof _Sql) {
                this.strings[pos] += child.strings[0];
                let childIndex = 0;
                while(childIndex < child.values.length){
                    this.values[pos++] = child.values[childIndex++];
                    this.strings[pos] = child.strings[childIndex];
                }
                this.strings[pos] += rawString;
            } else {
                this.values[pos++] = child;
                this.strings[pos] = rawString;
            }
        }
    }
    get sql() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while(i < len)value += `?${this.strings[i++]}`;
        return value;
    }
    get statement() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while(i < len)value += `:${i}${this.strings[i++]}`;
        return value;
    }
    get text() {
        const len = this.strings.length;
        let i = 1;
        let value = this.strings[0];
        while(i < len)value += `$${i}${this.strings[i++]}`;
        return value;
    }
    inspect() {
        return {
            sql: this.sql,
            statement: this.statement,
            text: this.text,
            values: this.values
        };
    }
};
function join(values, separator = ",", prefix = "", suffix = "") {
    if (values.length === 0) {
        throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
    }
    return new Sql([
        prefix,
        ...Array(values.length - 1).fill(separator),
        suffix
    ], values);
}
function raw(value) {
    return new Sql([
        value
    ], []);
}
var empty = raw("");
function sql(strings, ...values) {
    return new Sql(strings, values);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    AnyNull,
    AnyNullClass,
    DbNull,
    DbNullClass,
    Decimal,
    JsonNull,
    JsonNullClass,
    NullTypes,
    ObjectEnumValue,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Sql,
    empty,
    hasBatchIndex,
    isAnyNull,
    isDbNull,
    isJsonNull,
    isObjectEnumValue,
    join,
    raw,
    sql
}); /*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/ 
}),
"[project]/node_modules/@prisma/debug/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Debug",
    ()=>Debug,
    "clearLogs",
    ()=>clearLogs,
    "default",
    ()=>index_default,
    "getLogs",
    ()=>getLogs
]);
var __defProp = Object.defineProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// ../../node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var colors_exports = {};
__export(colors_exports, {
    $: ()=>$,
    bgBlack: ()=>bgBlack,
    bgBlue: ()=>bgBlue,
    bgCyan: ()=>bgCyan,
    bgGreen: ()=>bgGreen,
    bgMagenta: ()=>bgMagenta,
    bgRed: ()=>bgRed,
    bgWhite: ()=>bgWhite,
    bgYellow: ()=>bgYellow,
    black: ()=>black,
    blue: ()=>blue,
    bold: ()=>bold,
    cyan: ()=>cyan,
    dim: ()=>dim,
    gray: ()=>gray,
    green: ()=>green,
    grey: ()=>grey,
    hidden: ()=>hidden,
    inverse: ()=>inverse,
    italic: ()=>italic,
    magenta: ()=>magenta,
    red: ()=>red,
    reset: ()=>reset,
    strikethrough: ()=>strikethrough,
    underline: ()=>underline,
    white: ()=>white,
    yellow: ()=>yellow
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
    ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
    isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
    let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
    let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
    return function(txt) {
        if (!$.enabled || txt == null) return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
    };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
// src/index.ts
var MAX_ARGS_HISTORY = 100;
var COLORS = [
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "red"
];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
    enable (namespace) {
        if (typeof namespace === "string") {
            globalThis.DEBUG = namespace;
        }
    },
    disable () {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
    },
    // this is the core logic to check if logging should happen or not
    enabled (namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s)=>{
            return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace)=>{
            if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
            return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace)=>{
            if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
            return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
    },
    log: (...args)=>{
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
    },
    formatters: {}
};
function debugCreate(namespace) {
    const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: ()=>{}
    };
    const debugCall = (...args)=>{
        const { enabled, namespace: namespace2, color, log } = instanceProps;
        if (args.length !== 0) {
            argsHistory.push([
                namespace2,
                ...args
            ]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
            argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
            const stringArgs = args.map((arg)=>{
                if (typeof arg === "string") {
                    return arg;
                }
                return safeStringify(arg);
            });
            const ms = `+${Date.now() - lastTimestamp}ms`;
            lastTimestamp = Date.now();
            if (globalThis.DEBUG_COLORS) {
                log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
            } else {
                log(namespace2, ...stringArgs, ms);
            }
        }
    };
    return new Proxy(debugCall, {
        get: (_, prop)=>instanceProps[prop],
        set: (_, prop, value)=>instanceProps[prop] = value
    });
}
var Debug = new Proxy(debugCreate, {
    get: (_, prop)=>topProps[prop],
    set: (_, prop, value)=>topProps[prop] = value
});
function safeStringify(value, indent = 2) {
    const cache = /* @__PURE__ */ new Set();
    return JSON.stringify(value, (key, value2)=>{
        if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
                return `[Circular *]`;
            }
            cache.add(value2);
        } else if (typeof value2 === "bigint") {
            return value2.toString();
        }
        return value2;
    }, indent);
}
function getLogs(numChars = 7500) {
    const logs = argsHistory.map(([namespace, ...args])=>{
        return `${namespace} ${args.map((arg)=>{
            if (typeof arg === "string") {
                return arg;
            } else {
                return JSON.stringify(arg);
            }
        }).join(" ")}`;
    }).join("\n");
    if (logs.length < numChars) {
        return logs;
    }
    return logs.slice(-numChars);
}
function clearLogs() {
    argsHistory.length = 0;
}
var index_default = Debug;
;
}),
"[project]/node_modules/@prisma/driver-adapter-utils/dist/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnTypeEnum",
    ()=>ColumnTypeEnum,
    "DriverAdapterError",
    ()=>DriverAdapterError,
    "bindAdapter",
    ()=>bindAdapter,
    "bindMigrationAwareSqlAdapterFactory",
    ()=>bindMigrationAwareSqlAdapterFactory,
    "bindSqlAdapterFactory",
    ()=>bindSqlAdapterFactory,
    "err",
    ()=>err,
    "isDriverAdapterError",
    ()=>isDriverAdapterError,
    "mockAdapter",
    ()=>mockAdapter,
    "mockAdapterErrors",
    ()=>mockAdapterErrors,
    "mockAdapterFactory",
    ()=>mockAdapterFactory,
    "mockMigrationAwareAdapterFactory",
    ()=>mockMigrationAwareAdapterFactory,
    "ok",
    ()=>ok
]);
// src/debug.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/debug/dist/index.mjs [app-rsc] (ecmascript)");
;
// src/error.ts
var DriverAdapterError = class extends Error {
    name = "DriverAdapterError";
    cause;
    constructor(payload){
        super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
        this.cause = payload;
    }
};
function isDriverAdapterError(error) {
    return error["name"] === "DriverAdapterError" && typeof error["cause"] === "object";
}
// src/result.ts
function ok(value) {
    return {
        ok: true,
        value,
        map (fn) {
            return ok(fn(value));
        },
        flatMap (fn) {
            return fn(value);
        }
    };
}
function err(error) {
    return {
        ok: false,
        error,
        map () {
            return err(error);
        },
        flatMap () {
            return err(error);
        }
    };
}
// src/binder.ts
var debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Debug"])("driver-adapter-utils");
var ErrorRegistryInternal = class {
    registeredErrors = [];
    consumeError(id) {
        return this.registeredErrors[id];
    }
    registerNewError(error) {
        let i = 0;
        while(this.registeredErrors[i] !== void 0){
            i++;
        }
        this.registeredErrors[i] = {
            error
        };
        return i;
    }
};
function copySymbolsFromSource(source, target) {
    const symbols = Object.getOwnPropertySymbols(source);
    const symbolObject = Object.fromEntries(symbols.map((symbol)=>[
            symbol,
            true
        ]));
    Object.assign(target, symbolObject);
}
var bindMigrationAwareSqlAdapterFactory = (adapterFactory)=>{
    const errorRegistry = new ErrorRegistryInternal();
    const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        },
        connectToShadowDb: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connectToShadowDb.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        }
    };
    copySymbolsFromSource(adapterFactory, boundFactory);
    return boundFactory;
};
var bindSqlAdapterFactory = (adapterFactory)=>{
    const errorRegistry = new ErrorRegistryInternal();
    const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        }
    };
    copySymbolsFromSource(adapterFactory, boundFactory);
    return boundFactory;
};
var bindAdapter = (adapter, errorRegistry = new ErrorRegistryInternal())=>{
    const boundAdapter = {
        adapterName: adapter.adapterName,
        errorRegistry,
        queryRaw: wrapAsync(errorRegistry, adapter.queryRaw.bind(adapter)),
        executeRaw: wrapAsync(errorRegistry, adapter.executeRaw.bind(adapter)),
        executeScript: wrapAsync(errorRegistry, adapter.executeScript.bind(adapter)),
        dispose: wrapAsync(errorRegistry, adapter.dispose.bind(adapter)),
        provider: adapter.provider,
        startTransaction: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapter.startTransaction.bind(adapter))(...args);
            return ctx.map((ctx2)=>bindTransaction(errorRegistry, ctx2));
        }
    };
    if (adapter.getConnectionInfo) {
        boundAdapter.getConnectionInfo = wrapSync(errorRegistry, adapter.getConnectionInfo.bind(adapter));
    }
    return boundAdapter;
};
var bindTransaction = (errorRegistry, transaction)=>{
    const boundTransaction = {
        adapterName: transaction.adapterName,
        provider: transaction.provider,
        options: transaction.options,
        queryRaw: wrapAsync(errorRegistry, transaction.queryRaw.bind(transaction)),
        executeRaw: wrapAsync(errorRegistry, transaction.executeRaw.bind(transaction)),
        commit: wrapAsync(errorRegistry, transaction.commit.bind(transaction)),
        rollback: wrapAsync(errorRegistry, transaction.rollback.bind(transaction))
    };
    if (transaction.createSavepoint) {
        boundTransaction.createSavepoint = wrapAsync(errorRegistry, transaction.createSavepoint.bind(transaction));
    }
    if (transaction.rollbackToSavepoint) {
        boundTransaction.rollbackToSavepoint = wrapAsync(errorRegistry, transaction.rollbackToSavepoint.bind(transaction));
    }
    if (transaction.releaseSavepoint) {
        boundTransaction.releaseSavepoint = wrapAsync(errorRegistry, transaction.releaseSavepoint.bind(transaction));
    }
    return boundTransaction;
};
function wrapAsync(registry, fn) {
    return async (...args)=>{
        try {
            return ok(await fn(...args));
        } catch (error) {
            debug("[error@wrapAsync]", error);
            if (isDriverAdapterError(error)) {
                return err(error.cause);
            }
            const id = registry.registerNewError(error);
            return err({
                kind: "GenericJs",
                id
            });
        }
    };
}
function wrapSync(registry, fn) {
    return (...args)=>{
        try {
            return ok(fn(...args));
        } catch (error) {
            debug("[error@wrapSync]", error);
            if (isDriverAdapterError(error)) {
                return err(error.cause);
            }
            const id = registry.registerNewError(error);
            return err({
                kind: "GenericJs",
                id
            });
        }
    };
}
// src/const.ts
var ColumnTypeEnum = {
    // Scalars
    Int32: 0,
    Int64: 1,
    Float: 2,
    Double: 3,
    Numeric: 4,
    Boolean: 5,
    Character: 6,
    Text: 7,
    Date: 8,
    Time: 9,
    DateTime: 10,
    Json: 11,
    Enum: 12,
    Bytes: 13,
    Set: 14,
    Uuid: 15,
    // Arrays
    Int32Array: 64,
    Int64Array: 65,
    FloatArray: 66,
    DoubleArray: 67,
    NumericArray: 68,
    BooleanArray: 69,
    CharacterArray: 70,
    TextArray: 71,
    DateArray: 72,
    TimeArray: 73,
    DateTimeArray: 74,
    JsonArray: 75,
    EnumArray: 76,
    BytesArray: 77,
    UuidArray: 78,
    // Custom
    UnknownNumber: 128
};
// src/mock.ts
var mockAdapterErrors = {
    queryRaw: new Error("Not implemented: queryRaw"),
    executeRaw: new Error("Not implemented: executeRaw"),
    startTransaction: new Error("Not implemented: startTransaction"),
    executeScript: new Error("Not implemented: executeScript"),
    dispose: new Error("Not implemented: dispose")
};
function mockAdapter(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        queryRaw: ()=>Promise.reject(mockAdapterErrors.queryRaw),
        executeRaw: ()=>Promise.reject(mockAdapterErrors.executeRaw),
        startTransaction: ()=>Promise.reject(mockAdapterErrors.startTransaction),
        executeScript: ()=>Promise.reject(mockAdapterErrors.executeScript),
        dispose: ()=>Promise.reject(mockAdapterErrors.dispose),
        [Symbol.for("adapter.mockAdapter")]: true
    };
}
function mockAdapterFactory(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: ()=>Promise.resolve(mockAdapter(provider)),
        [Symbol.for("adapter.mockAdapterFactory")]: true
    };
}
function mockMigrationAwareAdapterFactory(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: ()=>Promise.resolve(mockAdapter(provider)),
        connectToShadowDb: ()=>Promise.resolve(mockAdapter(provider)),
        [Symbol.for("adapter.mockMigrationAwareAdapterFactory")]: true
    };
}
;
}),
"[project]/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FunctionsClient",
    ()=>FunctionsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/functions-js/dist/module/helper.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)");
;
;
;
class FunctionsClient {
    /**
     * Creates a new Functions client bound to an Edge Functions URL.
     *
     * @example Using supabase-js (recommended)
     * ```ts
     * import { createClient } from '@supabase/supabase-js'
     *
     * const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
     * const { data, error } = await supabase.functions.invoke('hello-world')
     * ```
     *
     * @category Edge Functions
     *
     * @example Standalone import for bundle-sensitive environments
     * ```ts
     * import { FunctionsClient, FunctionRegion } from '@supabase/functions-js'
     *
     * const functions = new FunctionsClient('https://xyzcompany.supabase.co/functions/v1', {
     *   headers: { apikey: 'your-publishable-key' },
     *   region: FunctionRegion.UsEast1,
     * })
     * ```
     */ constructor(url, { headers = {}, customFetch, region = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionRegion"].Any } = {}){
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$helper$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveFetch"])(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     *
     * @category Edge Functions
     *
     * @example Setting the authorization header
     * ```ts
     * functions.setAuth(session.access_token)
     * ```
     */ setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     * @example
     * ```ts
     * const { data, error } = await functions.invoke('hello-world', {
     *   body: { name: 'Ada' },
     * })
     * ```
     *
     * @category Edge Functions
     *
     * @remarks
     * - The API key is sent in the `apikey` header. The `Authorization` header is reserved
     *   for the signed-in user's JWT (or a custom auth token) — when there is no session, a
     *   new-format API key (`sb_publishable_…` / `sb_secret_…`) is not sent as a Bearer token.
     * - Invoke params generally match the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) spec.
     * - When you pass in a body to your function, we automatically attach the Content-Type header for `Blob`, `ArrayBuffer`, `File`, `FormData` and `String`. If it doesn't match any of these types we assume the payload is `json`, serialize it and attach the `Content-Type` header as `application/json`. You can override this behavior by passing in a `Content-Type` header of your own.
     * - Responses are automatically parsed as `json`, `blob` and `form-data` depending on the `Content-Type` header sent by your function. Responses are parsed as `text` by default.
     *
     * @example Basic invocation
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   body: { foo: 'bar' }
     * })
     * ```
     *
     * @exampleDescription Error handling
     * A `FunctionsHttpError` error is returned if your function throws an error, `FunctionsRelayError` if the Supabase Relay has an error processing your function and `FunctionsFetchError` if there is a network error in calling your function. Log the full error object so fields like `name`, `context`, and any structured body aren't hidden.
     *
     * @example Error handling
     * ```js
     * import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from "@supabase/supabase-js";
     *
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' }
     * })
     *
     * if (error instanceof FunctionsHttpError) {
     *   const errorMessage = await error.context.json()
     *   console.error('Function returned an error', errorMessage)
     * } else if (error instanceof FunctionsRelayError) {
     *   console.error('Relay error:', error)
     * } else if (error instanceof FunctionsFetchError) {
     *   console.error('Fetch error:', error)
     * }
     * ```
     *
     * @exampleDescription Passing custom headers
     * You can pass custom headers to your function. Note: supabase-js automatically passes the `Authorization` header with the signed in user's JWT.
     *
     * @example Passing custom headers
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' }
     * })
     * ```
     *
     * @exampleDescription Calling with DELETE HTTP verb
     * You can also set the HTTP verb to `DELETE` when calling your Edge Function.
     *
     * @example Calling with DELETE HTTP verb
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   body: { foo: 'bar' },
     *   method: 'DELETE'
     * })
     * ```
     *
     * @exampleDescription Invoking a Function in the UsEast1 region
     * Here are the available regions:
     * - `FunctionRegion.Any`
     * - `FunctionRegion.ApNortheast1`
     * - `FunctionRegion.ApNortheast2`
     * - `FunctionRegion.ApSouth1`
     * - `FunctionRegion.ApSoutheast1`
     * - `FunctionRegion.ApSoutheast2`
     * - `FunctionRegion.CaCentral1`
     * - `FunctionRegion.EuCentral1`
     * - `FunctionRegion.EuWest1`
     * - `FunctionRegion.EuWest2`
     * - `FunctionRegion.EuWest3`
     * - `FunctionRegion.SaEast1`
     * - `FunctionRegion.UsEast1`
     * - `FunctionRegion.UsWest1`
     * - `FunctionRegion.UsWest2`
     *
     * @example Invoking a Function in the UsEast1 region
     * ```js
     * import { createClient, FunctionRegion } from '@supabase/supabase-js'
     *
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   body: { foo: 'bar' },
     *   region: FunctionRegion.UsEast1
     * })
     * ```
     *
     * @exampleDescription Calling with GET HTTP verb
     * You can also set the HTTP verb to `GET` when calling your Edge Function.
     *
     * @example Calling with GET HTTP verb
     * ```js
     * const { data, error } = await supabase.functions.invoke('hello', {
     *   headers: {
     *     "my-custom-header": 'my-custom-header-value'
     *   },
     *   method: 'GET'
     * })
     * ```
     *
     * @example Standalone client invoke
     * ```ts
     * const { data, error } = await functions.invoke('hello-world', {
     *   body: { name: 'Ada' },
     * })
     * ```
     */ invoke(functionName_1) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["__awaiter"])(this, arguments, void 0, function*(functionName, options = {}) {
            var _a, _b;
            let timeoutId;
            let timeoutController;
            let onAbort;
            try {
                const { headers, method, body: functionArgs, signal, timeout } = options;
                let _headers = {};
                let { region } = options;
                if (!region) {
                    region = this.region;
                }
                // Add region as query parameter using URL API
                const url = new URL(`${this.url}/${functionName}`);
                if (region && region !== 'any') {
                    _headers['x-region'] = region;
                    url.searchParams.set('forceFunctionRegion', region);
                }
                let body;
                // HTTP header names are case-insensitive, so detect a caller-supplied Content-Type
                // regardless of casing — otherwise the SDK injects a second, conflicting Content-Type.
                const hasContentTypeHeader = !!headers && Object.keys(headers).some((key)=>key.toLowerCase() === 'content-type');
                if (functionArgs && !hasContentTypeHeader) {
                    if (typeof Blob !== 'undefined' && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers['Content-Type'] = 'application/octet-stream';
                        body = functionArgs;
                    } else if (typeof functionArgs === 'string') {
                        // plain string
                        _headers['Content-Type'] = 'text/plain';
                        body = functionArgs;
                    } else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    } else {
                        // default, assume this is JSON
                        _headers['Content-Type'] = 'application/json';
                        body = JSON.stringify(functionArgs);
                    }
                } else {
                    if (functionArgs && typeof functionArgs !== 'string' && !(typeof Blob !== 'undefined' && functionArgs instanceof Blob) && !(functionArgs instanceof ArrayBuffer) && !(typeof FormData !== 'undefined' && functionArgs instanceof FormData)) {
                        body = JSON.stringify(functionArgs);
                    } else {
                        body = functionArgs;
                    }
                }
                // Handle timeout by creating an AbortController
                let effectiveSignal = signal;
                if (timeout) {
                    timeoutController = new AbortController();
                    timeoutId = setTimeout(()=>timeoutController.abort(), timeout);
                    // If user provided their own signal, we need to respect both
                    if (signal) {
                        effectiveSignal = timeoutController.signal;
                        // If the user's signal is aborted, abort our timeout controller too.
                        // Store the listener so we can clean it up in finally.
                        onAbort = ()=>timeoutController.abort();
                        signal.addEventListener('abort', onAbort);
                    } else {
                        effectiveSignal = timeoutController.signal;
                    }
                }
                const response = yield this.fetch(url.toString(), {
                    method: method || 'POST',
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body,
                    signal: effectiveSignal
                }).catch((fetchError)=>{
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsFetchError"](fetchError);
                });
                const isRelayError = response.headers.get('x-relay-error');
                if (isRelayError && isRelayError === 'true') {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsRelayError"](response);
                }
                if (!response.ok) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsHttpError"](response);
                }
                // HTTP media types are case-insensitive (RFC 9110), so normalize before
                // matching — otherwise an "Application/JSON" response falls through to text.
                let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim().toLowerCase();
                let data;
                if (responseType === 'application/json') {
                    data = yield response.json();
                } else if (responseType === 'application/octet-stream' || responseType === 'application/pdf') {
                    data = yield response.blob();
                } else if (responseType === 'text/event-stream') {
                    data = response;
                } else if (responseType === 'multipart/form-data') {
                    data = yield response.formData();
                } else {
                    // default to text
                    data = yield response.text();
                }
                return {
                    data,
                    error: null,
                    response
                };
            } catch (error) {
                return {
                    data: null,
                    error,
                    response: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsHttpError"] || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsRelayError"] ? error.context : undefined
                };
            } finally{
                // Clear the timeout if it was set
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // Remove the cross-signal listener to prevent memory leaks when the caller
                // reuses the same AbortSignal across multiple invocations.
                if (onAbort) {
                    (_b = options.signal) === null || _b === void 0 ? void 0 : _b.removeEventListener('abort', onAbort);
                }
            }
        });
    }
}
}),
"[project]/node_modules/@supabase/functions-js/dist/module/helper.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveFetch",
    ()=>resolveFetch
]);
const resolveFetch = (customFetch)=>{
    if (customFetch) {
        return (...args)=>customFetch(...args);
    }
    return (...args)=>fetch(...args);
};
}),
"[project]/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Base error for Supabase Edge Function invocations.
 *
 * @example
 * ```ts
 * import { FunctionsError } from '@supabase/functions-js'
 *
 * throw new FunctionsError('Unexpected error invoking function', 'FunctionsError', {
 *   requestId: 'abc123',
 * })
 * ```
 */ __turbopack_context__.s([
    "FunctionRegion",
    ()=>FunctionRegion,
    "FunctionsError",
    ()=>FunctionsError,
    "FunctionsFetchError",
    ()=>FunctionsFetchError,
    "FunctionsHttpError",
    ()=>FunctionsHttpError,
    "FunctionsRelayError",
    ()=>FunctionsRelayError
]);
class FunctionsError extends Error {
    constructor(message, name = 'FunctionsError', context){
        super(message);
        this.name = name;
        this.context = context;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            context: this.context
        };
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context){
        super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context){
        super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context){
        super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
    }
}
var FunctionRegion;
(function(FunctionRegion) {
    FunctionRegion["Any"] = "any";
    FunctionRegion["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion["ApSouth1"] = "ap-south-1";
    FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion["CaCentral1"] = "ca-central-1";
    FunctionRegion["EuCentral1"] = "eu-central-1";
    FunctionRegion["EuWest1"] = "eu-west-1";
    FunctionRegion["EuWest2"] = "eu-west-2";
    FunctionRegion["EuWest3"] = "eu-west-3";
    FunctionRegion["SaEast1"] = "sa-east-1";
    FunctionRegion["UsEast1"] = "us-east-1";
    FunctionRegion["UsWest1"] = "us-west-1";
    FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
}),
"[project]/node_modules/@supabase/phoenix/priv/static/phoenix.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Channel",
    ()=>Channel,
    "LongPoll",
    ()=>LongPoll,
    "Presence",
    ()=>Presence,
    "Push",
    ()=>Push,
    "Serializer",
    ()=>serializer_default,
    "Socket",
    ()=>Socket,
    "Timer",
    ()=>Timer
]);
// js/phoenix/utils.js
var closure = (value)=>{
    if (typeof value === "function") {
        return /** @type {() => T} */ value;
    } else {
        let closure2 = function() {
            return value;
        };
        return closure2;
    }
};
// js/phoenix/constants.js
var globalSelf = typeof self !== "undefined" ? self : null;
var phxWindow = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
var global = globalSelf || phxWindow || globalThis;
var DEFAULT_VSN = "2.0.0";
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var MAX_LONGPOLL_BATCH_SIZE = 100;
var SOCKET_STATES = /** @type {const} */ {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
};
var CHANNEL_STATES = /** @type {const} */ {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
};
var CHANNEL_EVENTS = /** @type {const} */ {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
};
var TRANSPORTS = /** @type {const} */ {
    longpoll: "longpoll",
    websocket: "websocket"
};
var XHR_STATES = /** @type {const} */ {
    complete: 4
};
var AUTH_TOKEN_PREFIX = "base64url.bearer.phx.";
// js/phoenix/push.js
var Push = class {
    /**
   * Initializes the Push
   * @param {Channel} channel - The Channel
   * @param {ChannelEvent} event - The event, for example `"phx_join"`
   * @param {() => Record<string, unknown>} payload - The payload, for example `{user_id: 123}`
   * @param {number} timeout - The push timeout in milliseconds
   */ constructor(channel, event, payload, timeout){
        this.channel = channel;
        this.event = event;
        this.payload = payload || function() {
            return {};
        };
        this.receivedResp = null;
        this.timeout = timeout;
        this.timeoutTimer = null;
        this.recHooks = [];
        this.sent = false;
        this.ref = void 0;
    }
    /**
   *
   * @param {number} timeout
   */ resend(timeout) {
        this.timeout = timeout;
        this.reset();
        this.send();
    }
    /**
   *
   */ send() {
        if (this.hasReceived("timeout")) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload(),
            ref: this.ref,
            join_ref: this.channel.joinRef()
        });
    }
    /**
   *
   * @param {string} status
   * @param {(response: any) => void} callback
   */ receive(status, callback) {
        if (this.hasReceived(status)) {
            callback(this.receivedResp.response);
        }
        this.recHooks.push({
            status,
            callback
        });
        return this;
    }
    reset() {
        this.cancelRefEvent();
        this.ref = null;
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
    }
    destroy() {
        this.cancelRefEvent();
        this.cancelTimeout();
    }
    /**
   * @private
   */ matchReceive({ status, response, _ref }) {
        this.recHooks.filter((h)=>h.status === status).forEach((h)=>h.callback(response));
    }
    /**
   * @private
   */ cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel.off(this.refEvent);
    }
    cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            this.cancelTimeout();
        }
        this.ref = this.channel.socket.makeRef();
        this.refEvent = this.channel.replyEventName(this.ref);
        this.channel.on(this.refEvent, (payload)=>{
            this.cancelRefEvent();
            this.cancelTimeout();
            this.receivedResp = payload;
            this.matchReceive(payload);
        });
        this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {});
        }, this.timeout);
    }
    /**
   * @private
   */ hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
        this.channel.trigger(this.refEvent, {
            status,
            response
        });
    }
};
// js/phoenix/timer.js
var Timer = class {
    /**
  * @param {() => void} callback
  * @param {(tries: number) => number} timerCalc
  */ constructor(callback, timerCalc){
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    /**
   * Cancels any previous scheduleTimeout and schedules callback
   */ scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
};
// js/phoenix/channel.js
var Channel = class {
    /**
   * @param {string} topic
   * @param {Params | (() => Params)} params
   * @param {Socket} socket
   */ constructor(topic, params, socket){
        this.state = CHANNEL_STATES.closed;
        this.topic = topic;
        this.params = closure(params || {});
        this.socket = socket;
        this.bindings = [];
        this.bindingRef = 0;
        this.timeout = this.socket.timeout;
        this.joinedOnce = false;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.pushBuffer = [];
        this.stateChangeRefs = [];
        this.rejoinTimer = new Timer(()=>{
            if (this.socket.isConnected()) {
                this.rejoin();
            }
        }, this.socket.rejoinAfterMs);
        this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset()));
        this.stateChangeRefs.push(this.socket.onOpen(()=>{
            this.rejoinTimer.reset();
            if (this.isErrored()) {
                this.rejoin();
            }
        }));
        this.joinPush.receive("ok", ()=>{
            this.state = CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent)=>pushEvent.send());
            this.pushBuffer = [];
        });
        this.joinPush.receive("error", (reason)=>{
            this.state = CHANNEL_STATES.errored;
            if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.onClose(()=>{
            this.rejoinTimer.reset();
            if (this.socket.hasLogger()) this.socket.log("channel", `close ${this.topic}`);
            this.state = CHANNEL_STATES.closed;
            this.socket.remove(this);
        });
        this.onError((reason)=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `error ${this.topic}`, reason);
            if (this.isJoining()) {
                this.joinPush.reset();
            }
            this.state = CHANNEL_STATES.errored;
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.joinPush.receive("timeout", ()=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
            let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
            leavePush.send();
            this.state = CHANNEL_STATES.errored;
            this.joinPush.reset();
            if (this.socket.isConnected()) {
                this.rejoinTimer.scheduleTimeout();
            }
        });
        this.on(CHANNEL_EVENTS.reply, (payload, ref)=>{
            this.trigger(this.replyEventName(ref), payload);
        });
    }
    /**
   * Join the channel
   * @param {number} timeout
   * @returns {Push}
   */ join(timeout = this.timeout) {
        if (this.joinedOnce) {
            throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        } else {
            this.timeout = timeout;
            this.joinedOnce = true;
            this.rejoin();
            return this.joinPush;
        }
    }
    /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */ teardown() {
        this.pushBuffer.forEach((push)=>push.destroy());
        this.pushBuffer = [];
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        this.state = CHANNEL_STATES.closed;
        this.bindings = [];
    }
    /**
   * Hook into channel close
   * @param {ChannelBindingCallback} callback
   */ onClose(callback) {
        this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
   * Hook into channel errors
   * @param {ChannelOnErrorCallback} callback
   * @return {number}
   */ onError(callback) {
        return this.on(CHANNEL_EVENTS.error, (reason)=>callback(reason));
    }
    /**
   * Subscribes on channel events
   *
   * Subscription returns a ref counter, which can be used later to
   * unsubscribe the exact event listener
   *
   * @example
   * const ref1 = channel.on("event", do_stuff)
   * const ref2 = channel.on("event", do_other_stuff)
   * channel.off("event", ref1)
   * // Since unsubscription, do_stuff won't fire,
   * // while do_other_stuff will keep firing on the "event"
   *
   * @param {string} event
   * @param {ChannelBindingCallback} callback
   * @returns {number} ref
   */ on(event, callback) {
        let ref = this.bindingRef++;
        this.bindings.push({
            event,
            ref,
            callback
        });
        return ref;
    }
    /**
   * Unsubscribes off of channel events
   *
   * Use the ref returned from a channel.on() to unsubscribe one
   * handler, or pass nothing for the ref to unsubscribe all
   * handlers for the given event.
   *
   * @example
   * // Unsubscribe the do_stuff handler
   * const ref1 = channel.on("event", do_stuff)
   * channel.off("event", ref1)
   *
   * // Unsubscribe all handlers from event
   * channel.off("event")
   *
   * @param {string} event
   * @param {number} [ref]
   */ off(event, ref) {
        this.bindings = this.bindings.filter((bind)=>{
            return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
        });
    }
    /**
   * @private
   */ canPush() {
        return this.socket.isConnected() && this.isJoined();
    }
    /**
   * Sends a message `event` to phoenix with the payload `payload`.
   * Phoenix receives this in the `handle_in(event, payload, socket)`
   * function. if phoenix replies or it times out (default 10000ms),
   * then optionally the reply can be received.
   *
   * @example
   * channel.push("event")
   *   .receive("ok", payload => console.log("phoenix replied:", payload))
   *   .receive("error", err => console.log("phoenix errored", err))
   *   .receive("timeout", () => console.log("timed out pushing"))
   * @param {string} event
   * @param {Object} payload
   * @param {number} [timeout]
   * @returns {Push}
   */ push(event, payload, timeout = this.timeout) {
        payload = payload || {};
        if (!this.joinedOnce) {
            throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
        }
        let pushEvent = new Push(this, event, function() {
            return payload;
        }, timeout);
        if (this.canPush()) {
            pushEvent.send();
        } else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /** Leaves the channel
   *
   * Unsubscribes from server events, and
   * instructs channel to terminate on server
   *
   * Triggers onClose() hooks
   *
   * To receive leave acknowledgements, use the `receive`
   * hook to bind to the server ack, ie:
   *
   * @example
   * channel.leave().receive("ok", () => alert("left!") )
   *
   * @param {number} timeout
   * @returns {Push}
   */ leave(timeout = this.timeout) {
        this.rejoinTimer.reset();
        this.joinPush.cancelTimeout();
        this.state = CHANNEL_STATES.leaving;
        let onClose = ()=>{
            if (this.socket.hasLogger()) this.socket.log("channel", `leave ${this.topic}`);
            this.trigger(CHANNEL_EVENTS.close, "leave");
        };
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
        leavePush.receive("ok", ()=>onClose()).receive("timeout", ()=>onClose());
        leavePush.send();
        if (!this.canPush()) {
            leavePush.trigger("ok", {});
        }
        return leavePush;
    }
    /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   * @type{ChannelOnMessage}
   */ onMessage(_event, payload, _ref) {
        return payload;
    }
    /**
   * Overridable filter hook
   *
   * If this function returns `true`, `binding`'s callback will be called.
   *
   * @type{ChannelFilterBindings}
   */ filterBindings(_binding, _payload, _ref) {
        return true;
    }
    isMember(topic, event, payload, joinRef) {
        if (this.topic !== topic) {
            return false;
        }
        if (joinRef && joinRef !== this.joinRef()) {
            if (this.socket.hasLogger()) this.socket.log("channel", "dropping outdated message", {
                topic,
                event,
                payload,
                joinRef
            });
            return false;
        } else {
            return true;
        }
    }
    joinRef() {
        return this.joinPush.ref;
    }
    /**
   * @private
   */ rejoin(timeout = this.timeout) {
        if (this.isLeaving()) {
            return;
        }
        this.socket.leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /**
   * @param {string} event
   * @param {unknown} [payload]
   * @param {?string} [ref]
   * @param {?string} [joinRef]
   */ trigger(event, payload, ref, joinRef) {
        let handledPayload = this.onMessage(event, payload, ref, joinRef);
        if (payload && !handledPayload) {
            throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        }
        let eventBindings = this.bindings.filter((bind)=>bind.event === event && this.filterBindings(bind, payload, ref));
        for(let i = 0; i < eventBindings.length; i++){
            let bind = eventBindings[i];
            bind.callback(handledPayload, ref, joinRef || this.joinRef());
        }
    }
    /**
  * @param {string} ref
  */ replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    isClosed() {
        return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
        return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
        return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
        return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
    }
};
// js/phoenix/ajax.js
var Ajax = class {
    static request(method, endPoint, headers, body, timeout, ontimeout, callback) {
        if (global.XDomainRequest) {
            let req = new global.XDomainRequest();
            return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
        } else if (global.XMLHttpRequest) {
            let req = new global.XMLHttpRequest();
            return this.xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback);
        } else if (global.fetch && global.AbortController) {
            return this.fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback);
        } else {
            throw new Error("No suitable XMLHttpRequest implementation found");
        }
    }
    static fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback) {
        let options = {
            method,
            headers,
            body
        };
        let controller = null;
        if (timeout) {
            controller = new AbortController();
            const _timeoutId = setTimeout(()=>controller.abort(), timeout);
            options.signal = controller.signal;
        }
        global.fetch(endPoint, options).then((response)=>response.text()).then((data)=>this.parseJSON(data)).then((data)=>callback && callback(data)).catch((err)=>{
            if (err.name === "AbortError" && ontimeout) {
                ontimeout();
            } else {
                callback && callback(null);
            }
        });
        return controller;
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
        req.timeout = timeout;
        req.open(method, endPoint);
        req.onload = ()=>{
            let response = this.parseJSON(req.responseText);
            callback && callback(response);
        };
        if (ontimeout) {
            req.ontimeout = ontimeout;
        }
        req.onprogress = ()=>{};
        req.send(body);
        return req;
    }
    static xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback) {
        req.open(method, endPoint, true);
        req.timeout = timeout;
        for (let [key, value] of Object.entries(headers)){
            req.setRequestHeader(key, value);
        }
        req.onerror = ()=>callback && callback(null);
        req.onreadystatechange = ()=>{
            if (req.readyState === XHR_STATES.complete && callback) {
                let response = this.parseJSON(req.responseText);
                callback(response);
            }
        };
        if (ontimeout) {
            req.ontimeout = ontimeout;
        }
        req.send(body);
        return req;
    }
    static parseJSON(resp) {
        if (!resp || resp === "") {
            return null;
        }
        try {
            return JSON.parse(resp);
        } catch  {
            console && console.log("failed to parse JSON response", resp);
            return null;
        }
    }
    static serialize(obj, parentKey) {
        let queryStr = [];
        for(var key in obj){
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            let paramKey = parentKey ? `${parentKey}[${key}]` : key;
            let paramVal = obj[key];
            if (typeof paramVal === "object") {
                queryStr.push(this.serialize(paramVal, paramKey));
            } else {
                queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
            }
        }
        return queryStr.join("&");
    }
    static appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        let prefix = url.match(/\?/) ? "&" : "?";
        return `${url}${prefix}${this.serialize(params)}`;
    }
};
// js/phoenix/longpoll.js
var arrayBufferToBase64 = (buffer)=>{
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for(let i = 0; i < len; i++){
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};
var LongPoll = class {
    constructor(endPoint, protocols){
        if (protocols && protocols.length === 2 && protocols[1].startsWith(AUTH_TOKEN_PREFIX)) {
            this.authToken = atob(protocols[1].slice(AUTH_TOKEN_PREFIX.length));
        }
        this.endPoint = null;
        this.token = null;
        this.skipHeartbeat = true;
        this.reqs = /* @__PURE__ */ new Set();
        this.awaitingBatchAck = false;
        this.currentBatch = null;
        this.currentBatchTimer = null;
        this.batchBuffer = [];
        this.onopen = function() {};
        this.onerror = function() {};
        this.onmessage = function() {};
        this.onclose = function() {};
        this.pollEndpoint = this.normalizeEndpoint(endPoint);
        this.readyState = SOCKET_STATES.connecting;
        setTimeout(()=>this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
        return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
        return Ajax.appendParams(this.pollEndpoint, {
            token: this.token
        });
    }
    closeAndRetry(code, reason, wasClean) {
        this.close(code, reason, wasClean);
        this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
        this.onerror("timeout");
        this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
        return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
        const headers = {
            "Accept": "application/json"
        };
        if (this.authToken) {
            headers["X-Phoenix-AuthToken"] = this.authToken;
        }
        this.ajax("GET", headers, null, ()=>this.ontimeout(), (resp)=>{
            if (resp) {
                var { status, token, messages } = resp;
                if (status === 410 && this.token !== null) {
                    this.onerror(410);
                    this.closeAndRetry(3410, "session_gone", false);
                    return;
                }
                this.token = token;
            } else {
                status = 0;
            }
            switch(status){
                case 200:
                    messages.forEach((msg)=>{
                        setTimeout(()=>this.onmessage({
                                data: msg
                            }), 0);
                    });
                    this.poll();
                    break;
                case 204:
                    this.poll();
                    break;
                case 410:
                    this.readyState = SOCKET_STATES.open;
                    this.onopen({});
                    this.poll();
                    break;
                case 403:
                    this.onerror(403);
                    this.close(1008, "forbidden", false);
                    break;
                case 0:
                case 500:
                    this.onerror(500);
                    this.closeAndRetry(1011, "internal server error", 500);
                    break;
                default:
                    throw new Error(`unhandled poll status ${status}`);
            }
        });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
        if (typeof body !== "string") {
            body = arrayBufferToBase64(body);
        }
        if (this.currentBatch) {
            this.currentBatch.push(body);
        } else if (this.awaitingBatchAck) {
            this.batchBuffer.push(body);
        } else {
            this.currentBatch = [
                body
            ];
            this.currentBatchTimer = setTimeout(()=>{
                this.batchSend(this.currentBatch);
                this.currentBatch = null;
            }, 0);
        }
    }
    batchSend(messages, offset = 0) {
        this.awaitingBatchAck = true;
        const next = offset + MAX_LONGPOLL_BATCH_SIZE;
        const batch = messages.slice(offset, next);
        this.ajax("POST", {
            "Content-Type": "application/x-ndjson"
        }, batch.join("\n"), ()=>this.onerror("timeout"), (resp)=>{
            if (!resp || resp.status !== 200) {
                this.awaitingBatchAck = false;
                this.onerror(resp && resp.status);
                this.closeAndRetry(1011, "internal server error", false);
            } else if (next < messages.length) {
                this.batchSend(messages, next);
            } else if (this.batchBuffer.length > 0) {
                this.batchSend(this.batchBuffer);
                this.batchBuffer = [];
            } else {
                this.awaitingBatchAck = false;
            }
        });
    }
    close(code, reason, wasClean) {
        for (let req of this.reqs){
            req.abort();
        }
        this.readyState = SOCKET_STATES.closed;
        let opts = Object.assign({
            code: 1e3,
            reason: void 0,
            wasClean: true
        }, {
            code,
            reason,
            wasClean
        });
        this.batchBuffer = [];
        clearTimeout(this.currentBatchTimer);
        this.currentBatchTimer = null;
        if (typeof CloseEvent !== "undefined") {
            this.onclose(new CloseEvent("close", opts));
        } else {
            this.onclose(opts);
        }
    }
    ajax(method, headers, body, onCallerTimeout, callback) {
        let req;
        let ontimeout = ()=>{
            this.reqs.delete(req);
            onCallerTimeout();
        };
        req = Ajax.request(method, this.endpointURL(), headers, body, this.timeout, ontimeout, (resp)=>{
            this.reqs.delete(req);
            if (this.isActive()) {
                callback(resp);
            }
        });
        this.reqs.add(req);
    }
};
// js/phoenix/presence.js
var Presence = class _Presence {
    /**
   * Initializes the Presence
   * @param {Channel} channel - The Channel
   * @param {PresenceOptions} [opts] - The options, for example `{events: {state: "state", diff: "diff"}}`
   */ constructor(channel, opts = {}){
        let events = opts.events || /** @type {PresenceEvents} */ {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.state = /* @__PURE__ */ Object.create(null);
        this.pendingDiffs = [];
        this.channel = channel;
        this.joinRef = null;
        this.caller = {
            onJoin: function() {},
            onLeave: function() {},
            onSync: function() {}
        };
        this.channel.on(events.state, (newState)=>{
            let { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel.joinRef();
            this.state = _Presence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff)=>{
                this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel.on(events.diff, (diff)=>{
            let { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            } else {
                this.state = _Presence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
    }
    /**
   * @param {PresenceOnJoin} callback
   */ onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /**
   * @param {PresenceOnLeave} callback
   */ onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /**
   * @param {PresenceOnSync} callback
   */ onSync(callback) {
        this.caller.onSync = callback;
    }
    /**
   * Returns the array of presences, with selected metadata.
   *
   * @template [T=PresenceState]
   * @param {((key: string, obj: PresenceState) => T)} [by]
   *
   * @returns {T[]}
   */ list(by) {
        return _Presence.list(this.state, by);
    }
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    // lower-level public static API
    /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @param {Record<string, PresenceState>} currentState
   * @param {Record<string, PresenceState>} newState
   * @param {PresenceOnJoin} onJoin
   * @param {PresenceOnLeave} onLeave
   *
   * @returns {Record<string, PresenceState>}
   */ static syncState(currentState, newState, onJoin, onLeave) {
        let state = this.toNullProtoObj(this.clone(currentState));
        newState = this.toNullProtoObj(newState);
        let joins = /* @__PURE__ */ Object.create(null);
        let leaves = /* @__PURE__ */ Object.create(null);
        this.map(state, (key, presence)=>{
            if (!newState[key]) {
                leaves[key] = presence;
            }
        });
        this.map(newState, (key, newPresence)=>{
            let currentPresence = state[key];
            if (currentPresence) {
                let newRefs = newPresence.metas.map((m)=>m.phx_ref);
                let curRefs = currentPresence.metas.map((m)=>m.phx_ref);
                let joinedMetas = newPresence.metas.filter((m)=>curRefs.indexOf(m.phx_ref) < 0);
                let leftMetas = currentPresence.metas.filter((m)=>newRefs.indexOf(m.phx_ref) < 0);
                if (joinedMetas.length > 0) {
                    joins[key] = newPresence;
                    joins[key].metas = joinedMetas;
                }
                if (leftMetas.length > 0) {
                    leaves[key] = this.clone(currentPresence);
                    leaves[key].metas = leftMetas;
                }
            } else {
                joins[key] = newPresence;
            }
        });
        return this.syncDiff(state, {
            joins,
            leaves
        }, onJoin, onLeave);
    }
    /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   *
   * @param {Record<string, PresenceState>} state
   * @param {PresenceDiff} diff
   * @param {PresenceOnJoin} onJoin
   * @param {PresenceOnLeave} onLeave
   *
   * @returns {Record<string, PresenceState>}
   */ static syncDiff(state, diff, onJoin, onLeave) {
        state = this.toNullProtoObj(state);
        let { joins, leaves } = this.clone(diff);
        if (!onJoin) {
            onJoin = function() {};
        }
        if (!onLeave) {
            onLeave = function() {};
        }
        this.map(joins, (key, newPresence)=>{
            let currentPresence = state[key];
            state[key] = this.clone(newPresence);
            if (currentPresence) {
                let joinedRefs = state[key].metas.map((m)=>m.phx_ref);
                let curMetas = currentPresence.metas.filter((m)=>joinedRefs.indexOf(m.phx_ref) < 0);
                state[key].metas.unshift(...curMetas);
            }
            onJoin(key, currentPresence, newPresence);
        });
        this.map(leaves, (key, leftPresence)=>{
            let currentPresence = state[key];
            if (!currentPresence) {
                return;
            }
            let refsToRemove = leftPresence.metas.map((m)=>m.phx_ref);
            currentPresence.metas = currentPresence.metas.filter((p)=>{
                return refsToRemove.indexOf(p.phx_ref) < 0;
            });
            onLeave(key, currentPresence, leftPresence);
            if (currentPresence.metas.length === 0) {
                delete state[key];
            }
        });
        return state;
    }
    /**
   * Returns the array of presences, with selected metadata.
   *
   * @template [T=PresenceState]
   * @param {Record<string, PresenceState>} presences
   * @param {((key: string, obj: PresenceState) => T)} [chooser]
   *
   * @returns {T[]}
   */ static list(presences, chooser) {
        if (!chooser) {
            chooser = function(key, pres) {
                return pres;
            };
        }
        return this.map(presences, (key, presence)=>{
            return chooser(key, presence);
        });
    }
    // private
    /**
  * @template T
  * @param {Record<string, PresenceState>} obj
  * @param {(key: string, obj: PresenceState) => T} func
  */ static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key)=>func(key, obj[key]));
    }
    // Presence keys are chosen on the server and may collide with
    // Object.prototype properties ("__proto__", "constructor", ...), so any
    // object indexed by presence key must not have a prototype chain
    //
    // TODO: replace the null-prototype objects with Maps in Phoenix 2.0
    // (breaking change for the lower-level static API)
    static toNullProtoObj(obj) {
        if (Object.getPrototypeOf(obj) === null) {
            return obj;
        }
        let cleaned = /* @__PURE__ */ Object.create(null);
        Object.getOwnPropertyNames(obj).forEach((key)=>{
            cleaned[key] = obj[key];
        });
        return cleaned;
    }
    /**
  * @template T
  * @param {T} obj
  * @returns {T}
  */ static clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};
// js/phoenix/serializer.js
var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: {
        push: 0,
        reply: 1,
        broadcast: 2
    },
    /**
  * @template T
  * @param {Message<Record<string, any>>} msg
  * @param {(msg: ArrayBuffer | string) => T} callback
  * @returns {T}
  */ encode (msg, callback) {
        if (msg.payload.constructor === ArrayBuffer) {
            return callback(this.binaryEncode(msg));
        } else {
            let payload = [
                msg.join_ref,
                msg.ref,
                msg.topic,
                msg.event,
                msg.payload
            ];
            return callback(JSON.stringify(payload));
        }
    },
    /**
  * @template T
  * @param {ArrayBuffer | string} rawPayload
  * @param {(msg: Message<unknown>) => T} callback
  * @returns {T}
  */ decode (rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this.binaryDecode(rawPayload));
        } else {
            let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
            return callback({
                join_ref,
                ref,
                topic,
                event,
                payload
            });
        }
    },
    /** @private */ binaryEncode (message) {
        let { join_ref, ref, event, topic, payload } = message;
        let encoder = new TextEncoder();
        let joinRefBytes = encoder.encode(join_ref);
        let refBytes = encoder.encode(ref);
        let topicBytes = encoder.encode(topic);
        let eventBytes = encoder.encode(event);
        this.assertFieldSize(joinRefBytes.byteLength, "join_ref");
        this.assertFieldSize(refBytes.byteLength, "ref");
        this.assertFieldSize(topicBytes.byteLength, "topic");
        this.assertFieldSize(eventBytes.byteLength, "event");
        let metaLength = this.META_LENGTH + joinRefBytes.byteLength + refBytes.byteLength + topicBytes.byteLength + eventBytes.byteLength;
        let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
        let headerBytes = new Uint8Array(header);
        let view = new DataView(header);
        let offset = 0;
        view.setUint8(offset++, this.KINDS.push);
        view.setUint8(offset++, joinRefBytes.byteLength);
        view.setUint8(offset++, refBytes.byteLength);
        view.setUint8(offset++, topicBytes.byteLength);
        view.setUint8(offset++, eventBytes.byteLength);
        headerBytes.set(joinRefBytes, offset);
        offset += joinRefBytes.byteLength;
        headerBytes.set(refBytes, offset);
        offset += refBytes.byteLength;
        headerBytes.set(topicBytes, offset);
        offset += topicBytes.byteLength;
        headerBytes.set(eventBytes, offset);
        offset += eventBytes.byteLength;
        var combined = new Uint8Array(header.byteLength + payload.byteLength);
        combined.set(headerBytes, 0);
        combined.set(new Uint8Array(payload), header.byteLength);
        return combined.buffer;
    },
    assertFieldSize (size, name) {
        if (size > 255) {
            throw new Error(`unable to convert ${name} to binary: must be less than or equal to 255 bytes, but is ${size} bytes`);
        }
    },
    /**
  * @private
  */ binaryDecode (buffer) {
        let view = new DataView(buffer);
        let kind = view.getUint8(0);
        let decoder = new TextDecoder();
        switch(kind){
            case this.KINDS.push:
                return this.decodePush(buffer, view, decoder);
            case this.KINDS.reply:
                return this.decodeReply(buffer, view, decoder);
            case this.KINDS.broadcast:
                return this.decodeBroadcast(buffer, view, decoder);
        }
    },
    /** @private */ decodePush (buffer, view, decoder) {
        let joinRefSize = view.getUint8(1);
        let topicSize = view.getUint8(2);
        let eventSize = view.getUint8(3);
        let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
        let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
        offset = offset + joinRefSize;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        return {
            join_ref: joinRef,
            ref: null,
            topic,
            event,
            payload: data
        };
    },
    /** @private */ decodeReply (buffer, view, decoder) {
        let joinRefSize = view.getUint8(1);
        let refSize = view.getUint8(2);
        let topicSize = view.getUint8(3);
        let eventSize = view.getUint8(4);
        let offset = this.HEADER_LENGTH + this.META_LENGTH;
        let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
        offset = offset + joinRefSize;
        let ref = decoder.decode(buffer.slice(offset, offset + refSize));
        offset = offset + refSize;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        let payload = {
            status: event,
            response: data
        };
        return {
            join_ref: joinRef,
            ref,
            topic,
            event: CHANNEL_EVENTS.reply,
            payload
        };
    },
    /** @private */ decodeBroadcast (buffer, view, decoder) {
        let topicSize = view.getUint8(1);
        let eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        let event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        let data = buffer.slice(offset, buffer.byteLength);
        return {
            join_ref: null,
            ref: null,
            topic,
            event,
            payload: data
        };
    }
};
// js/phoenix/socket.js
var Socket = class {
    /** Initializes the Socket *
   *
   * For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
   *
   * @constructor
   * @param {string} endPoint - The string WebSocket endpoint, ie, `"ws://example.com/socket"`,
   *                                               `"wss://example.com"`
   *                                               `"/socket"` (inherited host & protocol)
   * @param {SocketOptions} [opts] - Optional configuration
   */ constructor(endPoint, opts = {}){
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        };
        this.channels = [];
        this.sendBuffer = [];
        this.ref = 0;
        this.fallbackRef = null;
        this.timeout = opts.timeout || DEFAULT_TIMEOUT;
        this.transport = opts.transport || global.WebSocket || LongPoll;
        this.conn = void 0;
        this.primaryPassedHealthCheck = false;
        this.longPollFallbackMs = opts.longPollFallbackMs;
        this.fallbackTimer = null;
        let envSessionStorage = null;
        try {
            envSessionStorage = global && global.sessionStorage;
        } catch  {}
        this.sessionStore = opts.sessionStorage || envSessionStorage;
        this.establishedConnections = 0;
        this.defaultEncoder = serializer_default.encode.bind(serializer_default);
        this.defaultDecoder = serializer_default.decode.bind(serializer_default);
        this.closeWasClean = true;
        this.disconnecting = false;
        this.binaryType = opts.binaryType || "arraybuffer";
        this.connectClock = 1;
        this.pageHidden = false;
        this.encode = void 0;
        this.decode = void 0;
        if (this.transport !== LongPoll) {
            this.encode = opts.encode || this.defaultEncoder;
            this.decode = opts.decode || this.defaultDecoder;
        } else {
            this.encode = this.defaultEncoder;
            this.decode = this.defaultDecoder;
        }
        let awaitingConnectionOnPageShow = null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
        this.autoSendHeartbeat = opts.autoSendHeartbeat ?? true;
        this.heartbeatCallback = opts.heartbeatCallback ?? (()=>{});
        this.rejoinAfterMs = (tries)=>{
            if (opts.rejoinAfterMs) {
                return opts.rejoinAfterMs(tries);
            } else {
                return [
                    1e3,
                    2e3,
                    5e3
                ][tries - 1] || 1e4;
            }
        };
        this.reconnectAfterMs = (tries)=>{
            if (opts.reconnectAfterMs) {
                return opts.reconnectAfterMs(tries);
            } else {
                return [
                    10,
                    50,
                    100,
                    150,
                    200,
                    250,
                    500,
                    1e3,
                    2e3
                ][tries - 1] || 5e3;
            }
        };
        this.logger = opts.logger || null;
        if (!this.logger && opts.debug) {
            this.logger = (kind, msg, data)=>{
                console.log(`${kind}: ${msg}`, data);
            };
        }
        this.longpollerTimeout = opts.longpollerTimeout || 2e4;
        this.params = closure(opts.params || {});
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        this.vsn = opts.vsn || DEFAULT_VSN;
        this.heartbeatTimeoutTimer = null;
        this.heartbeatTimer = null;
        this.heartbeatSentAt = null;
        this.pendingHeartbeatRef = null;
        this.reconnectTimer = new Timer(()=>{
            if (this.pageHidden) {
                this.log("Not reconnecting as page is hidden!");
                this.teardown();
                return;
            }
            this.teardown(async ()=>{
                if (opts.beforeReconnect) await opts.beforeReconnect();
                this.connect();
            });
        }, this.reconnectAfterMs);
        this.authToken = opts.authToken && closure(opts.authToken);
    }
    /**
   * Returns the LongPoll transport reference
   */ getLongPollTransport() {
        return LongPoll;
    }
    /**
   * Disconnects and replaces the active transport
   *
   * @param {SocketTransport} newTransport - The new transport class to instantiate
   *
   */ replaceTransport(newTransport) {
        this.connectClock++;
        this.closeWasClean = true;
        clearTimeout(this.fallbackTimer);
        this.reconnectTimer.reset();
        if (this.conn) {
            this.conn.close();
            this.conn = null;
        }
        this.transport = newTransport;
    }
    /**
   * Returns the socket protocol
   *
   * @returns {"wss" | "ws"}
   */ protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
   * The fully qualified socket url
   *
   * @returns {string}
   */ endPointURL() {
        let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), {
            vsn: this.vsn
        });
        if (uri.charAt(0) !== "/") {
            return uri;
        }
        if (uri.charAt(1) === "/") {
            return `${this.protocol()}:${uri}`;
        }
        return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
   * Disconnects the socket
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
   *
   * @param {() => void} [callback] - Optional callback which is called after socket is disconnected.
   * @param {number} [code] - A status code for disconnection (Optional).
   * @param {string} [reason] - A textual description of the reason to disconnect. (Optional)
   */ disconnect(callback, code, reason) {
        this.connectClock++;
        this.disconnecting = true;
        this.closeWasClean = true;
        clearTimeout(this.fallbackTimer);
        this.reconnectTimer.reset();
        this.teardown(()=>{
            this.disconnecting = false;
            callback && callback();
        }, code, reason);
    }
    /**
   * @param {Params} [params] - [DEPRECATED] The params to send when connecting, for example `{user_id: userToken}`
   *
   * Passing params to connect is deprecated; pass them in the Socket constructor instead:
   * `new Socket("/socket", {params: {user_id: userToken}})`.
   */ connect(params) {
        if (params) {
            console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
            this.params = closure(params);
        }
        if (this.conn && !this.disconnecting) {
            return;
        }
        if (this.longPollFallbackMs && this.transport !== LongPoll) {
            this.connectWithFallback(LongPoll, this.longPollFallbackMs);
        } else {
            this.transportConnect();
        }
    }
    /**
   * Logs the message. Override `this.logger` for specialized logging. noops by default
   * @param {string} kind
   * @param {string} msg
   * @param {Object} data
   */ log(kind, msg, data) {
        this.logger && this.logger(kind, msg, data);
    }
    /**
   * Returns true if a logger has been set on this socket.
   */ hasLogger() {
        return this.logger !== null;
    }
    /**
   * Registers callbacks for connection open events
   *
   * @example socket.onOpen(function(){ console.info("the socket was opened") })
   *
   * @param {SocketOnOpen} callback
   */ onOpen(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.open.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection close events
   * @param {SocketOnClose} callback
   * @returns {string}
   */ onClose(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.close.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection error events
   *
   * @example socket.onError(function(error){ alert("An error occurred") })
   *
   * @param {SocketOnError} callback
   * @returns {string}
   */ onError(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.error.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Registers callbacks for connection message events
   * @param {SocketOnMessage} callback
   * @returns {string}
   */ onMessage(callback) {
        let ref = this.makeRef();
        this.stateChangeCallbacks.message.push([
            ref,
            callback
        ]);
        return ref;
    }
    /**
   * Sets a callback that receives lifecycle events for internal heartbeat messages.
   * Useful for instrumenting connection health (e.g. sent/ok/timeout/disconnected).
   * @param {HeartbeatCallback} callback
   */ onHeartbeat(callback) {
        this.heartbeatCallback = callback;
    }
    /**
   * Pings the server and invokes the callback with the RTT in milliseconds
   * @param {(timeDelta: number) => void} callback
   *
   * Returns true if the ping was pushed or false if unable to be pushed.
   */ ping(callback) {
        if (!this.isConnected()) {
            return false;
        }
        let ref = this.makeRef();
        let startTime = Date.now();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref
        });
        let onMsgRef = this.onMessage((msg)=>{
            if (msg.ref === ref) {
                this.off([
                    onMsgRef
                ]);
                callback(Date.now() - startTime);
            }
        });
        return true;
    }
    /**
   * @private
   *
   * @param {Function}
   */ transportName(transport) {
        switch(transport){
            case LongPoll:
                return "LongPoll";
            default:
                return transport.name;
        }
    }
    /**
   * @private
   */ transportConnect() {
        this.connectClock++;
        this.closeWasClean = false;
        let protocols = void 0;
        if (this.authToken) {
            protocols = [
                "phoenix",
                `${AUTH_TOKEN_PREFIX}${btoa(this.authToken()).replace(/=/g, "")}`
            ];
        }
        this.conn = new this.transport(this.endPointURL(), protocols);
        this.conn.binaryType = this.binaryType;
        this.conn.timeout = this.longpollerTimeout;
        this.conn.onopen = ()=>this.onConnOpen();
        this.conn.onerror = (error)=>this.onConnError(error);
        this.conn.onmessage = (event)=>this.onConnMessage(event);
        this.conn.onclose = (event)=>this.onConnClose(event);
    }
    getSession(key) {
        return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
        this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
        clearTimeout(this.fallbackTimer);
        let established = false;
        let primaryTransport = true;
        let openRef, errorRef;
        let fallbackTransportName = this.transportName(fallbackTransport);
        let fallback = (reason)=>{
            this.log("transport", `falling back to ${fallbackTransportName}...`, reason);
            this.off([
                openRef,
                errorRef
            ]);
            primaryTransport = false;
            this.replaceTransport(fallbackTransport);
            this.transportConnect();
        };
        if (this.getSession(`phx:fallback:${fallbackTransportName}`)) {
            return fallback("memorized");
        }
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        errorRef = this.onError((reason)=>{
            this.log("transport", "error", reason);
            if (primaryTransport && !established) {
                clearTimeout(this.fallbackTimer);
                fallback(reason);
            }
        });
        if (this.fallbackRef) {
            this.off([
                this.fallbackRef
            ]);
        }
        this.fallbackRef = this.onOpen(()=>{
            established = true;
            if (!primaryTransport) {
                let fallbackTransportName2 = this.transportName(fallbackTransport);
                if (!this.primaryPassedHealthCheck) {
                    this.storeSession(`phx:fallback:${fallbackTransportName2}`, "true");
                }
                return this.log("transport", `established ${fallbackTransportName2} fallback`);
            }
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
            this.ping((rtt)=>{
                this.log("transport", "connected to primary after", rtt);
                this.primaryPassedHealthCheck = true;
                clearTimeout(this.fallbackTimer);
            });
        });
        this.transportConnect();
    }
    clearHeartbeats() {
        clearTimeout(this.heartbeatTimer);
        clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
        if (this.hasLogger()) this.log("transport", `connected to ${this.endPointURL()}`);
        this.closeWasClean = false;
        this.disconnecting = false;
        this.establishedConnections++;
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        if (this.autoSendHeartbeat) {
            this.resetHeartbeat();
        }
        this.triggerStateCallbacks("open");
    }
    /**
   * @private
   */ heartbeatTimeout() {
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.heartbeatSentAt = null;
            if (this.hasLogger()) {
                this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            }
            try {
                this.heartbeatCallback("timeout");
            } catch (e) {
                this.log("error", "error in heartbeat callback", e);
            }
            this.triggerChanError(new Error("heartbeat timeout"));
            this.closeWasClean = false;
            this.teardown(()=>this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
        }
    }
    resetHeartbeat() {
        if (this.conn && this.conn.skipHeartbeat) {
            return;
        }
        this.pendingHeartbeatRef = null;
        this.clearHeartbeats();
        this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
        if (!this.conn) {
            return callback && callback();
        }
        const connToClose = this.conn;
        this.waitForBufferDone(connToClose, ()=>{
            if (code) {
                connToClose.close(code, reason || "");
            } else {
                connToClose.close();
            }
            this.waitForSocketClosed(connToClose, ()=>{
                if (this.conn === connToClose) {
                    this.conn.onopen = function() {};
                    this.conn.onerror = function() {};
                    this.conn.onmessage = function() {};
                    this.conn.onclose = function() {};
                    this.conn = null;
                }
                callback && callback();
            });
        });
    }
    waitForBufferDone(conn, callback, tries = 1) {
        if (tries === 5 || !conn.bufferedAmount) {
            callback();
            return;
        }
        setTimeout(()=>{
            this.waitForBufferDone(conn, callback, tries + 1);
        }, 150 * tries);
    }
    waitForSocketClosed(conn, callback, tries = 1) {
        if (tries === 5 || conn.readyState === SOCKET_STATES.closed) {
            callback();
            return;
        }
        setTimeout(()=>{
            this.waitForSocketClosed(conn, callback, tries + 1);
        }, 150 * tries);
    }
    /**
  * @param {CloseEvent} event
  */ onConnClose(event) {
        if (this.conn) this.conn.onclose = ()=>{};
        if (this.hasLogger()) this.log("transport", "close", event);
        this.triggerChanError(event);
        this.clearHeartbeats();
        if (!this.closeWasClean) {
            this.reconnectTimer.scheduleTimeout();
        }
        this.triggerStateCallbacks("close", event);
    }
    /**
   * @private
   * @param {Event} error
   */ onConnError(error) {
        if (this.hasLogger()) this.log("transport", "error", error);
        let transportBefore = this.transport;
        let establishedBefore = this.establishedConnections;
        this.triggerStateCallbacks("error", error, transportBefore, establishedBefore);
        if (transportBefore === this.transport || establishedBefore > 0) {
            this.triggerChanError(error);
        }
    }
    /**
   * @private
   * @param {unknown} [reason] underlying close/error event forwarded to channel error listeners
   */ triggerChanError(reason) {
        this.channels.forEach((channel)=>{
            if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
                channel.trigger(CHANNEL_EVENTS.error, reason);
            }
        });
    }
    /**
   * @returns {string}
   */ connectionState() {
        switch(this.conn && this.conn.readyState){
            case SOCKET_STATES.connecting:
                return "connecting";
            case SOCKET_STATES.open:
                return "open";
            case SOCKET_STATES.closing:
                return "closing";
            default:
                return "closed";
        }
    }
    /**
   * @returns {boolean}
   */ isConnected() {
        return this.connectionState() === "open";
    }
    /**
   *
   * @param {Channel} channel
   */ remove(channel) {
        this.off(channel.stateChangeRefs);
        this.channels = this.channels.filter((c)=>c !== channel);
    }
    /**
   * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
   *
   * @param {string[]} refs - list of refs returned by calls to
   *                 `onOpen`, `onClose`, `onError,` and `onMessage`
   */ off(refs) {
        for(let key in this.stateChangeCallbacks){
            this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref])=>{
                return refs.indexOf(ref) === -1;
            });
        }
    }
    /**
   * Initiates a new channel for the given topic
   *
   * @param {string} topic
   * @param {Params | (() => Params)} [chanParams]- Parameters for the channel
   * @returns {Channel}
   */ channel(topic, chanParams = {}) {
        let chan = new Channel(topic, chanParams, this);
        this.channels.push(chan);
        return chan;
    }
    /**
   * @param {Message<Record<string, any>>} data
   */ push(data) {
        if (this.hasLogger()) {
            let { topic, event, payload, ref, join_ref } = data;
            this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
        }
        if (this.isConnected()) {
            this.encode(data, (result)=>this.conn.send(result));
        } else {
            this.sendBuffer.push(()=>this.encode(data, (result)=>this.conn.send(result)));
        }
    }
    /**
   * Return the next message ref, accounting for overflows
   * @returns {string}
   */ makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        } else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    sendHeartbeat() {
        if (!this.isConnected()) {
            try {
                this.heartbeatCallback("disconnected");
            } catch (e) {
                this.log("error", "error in heartbeat callback", e);
            }
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.heartbeatTimeout();
            return;
        }
        this.pendingHeartbeatRef = this.makeRef();
        this.heartbeatSentAt = Date.now();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
        });
        try {
            this.heartbeatCallback("sent");
        } catch (e) {
            this.log("error", "error in heartbeat callback", e);
        }
        this.heartbeatTimeoutTimer = setTimeout(()=>this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback)=>callback());
            this.sendBuffer = [];
        }
    }
    /**
  * @param {MessageEvent<any>} rawMessage
  */ onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg)=>{
            let { topic, event, payload, ref, join_ref } = msg;
            if (ref && ref === this.pendingHeartbeatRef) {
                const latency = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
                this.clearHeartbeats();
                try {
                    this.heartbeatCallback(payload.status === "ok" ? "ok" : "error", latency);
                } catch (e) {
                    this.log("error", "error in heartbeat callback", e);
                }
                this.pendingHeartbeatRef = null;
                this.heartbeatSentAt = null;
                if (this.autoSendHeartbeat) {
                    this.heartbeatTimer = setTimeout(()=>this.sendHeartbeat(), this.heartbeatIntervalMs);
                }
            }
            if (this.hasLogger()) this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`.trim(), payload);
            for(let i = 0; i < this.channels.length; i++){
                const channel = this.channels[i];
                if (!channel.isMember(topic, event, payload, join_ref)) {
                    continue;
                }
                channel.trigger(event, payload, ref, join_ref);
            }
            this.triggerStateCallbacks("message", msg);
        });
    }
    /**
   * @private
   * @template {keyof SocketStateChangeCallbacks} K
   * @param {K} event
   * @param {...Parameters<SocketStateChangeCallbacks[K][number][1]>} args
   * @returns {void}
   */ triggerStateCallbacks(event, ...args) {
        try {
            this.stateChangeCallbacks[event].forEach(([_, callback])=>{
                try {
                    callback(...args);
                } catch (e) {
                    this.log("error", `error in ${event} callback`, e);
                }
            });
        } catch (e) {
            this.log("error", `error triggering ${event} callbacks`, e);
        }
    }
    leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c)=>c.topic === topic && (c.isJoined() || c.isJoining()));
        if (dupChannel) {
            if (this.hasLogger()) this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.leave();
        }
    }
};
;
}),
"[project]/node_modules/@supabase/postgrest-js/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostgrestBuilder",
    ()=>PostgrestBuilder,
    "PostgrestClient",
    ()=>PostgrestClient,
    "PostgrestError",
    ()=>PostgrestError,
    "PostgrestFilterBuilder",
    ()=>PostgrestFilterBuilder,
    "PostgrestQueryBuilder",
    ()=>PostgrestQueryBuilder,
    "PostgrestTransformBuilder",
    ()=>PostgrestTransformBuilder,
    "default",
    ()=>src_default
]);
//#region src/types/common/common.ts
/**
* Default number of retry attempts.
*/ const DEFAULT_MAX_RETRIES = 3;
/**
* Default exponential backoff delay function.
* Delays: 1s, 2s, 4s, 8s, ... (max 30s)
*
* @param attemptIndex - Zero-based index of the retry attempt
* @returns Delay in milliseconds before the next retry
*/ const getRetryDelay = (attemptIndex)=>Math.min(1e3 * 2 ** attemptIndex, 3e4);
/**
* Status codes that are safe to retry.
* 520 = Cloudflare timeout/connection errors (transient)
* 503 = PostgREST schema cache not yet loaded (transient, signals retry via Retry-After header)
*/ const RETRYABLE_STATUS_CODES = [
    520,
    503
];
/**
* HTTP methods that are safe to retry (idempotent operations).
*/ const RETRYABLE_METHODS = [
    "GET",
    "HEAD",
    "OPTIONS"
];
//#endregion
//#region src/PostgrestError.ts
/**
* Error format
*
* Returned by every PostgREST request that fails. When something fails, the
* single most useful field is usually `hint` — Postgres often returns the
* actionable fix there, not in `message`. Always log the full object (e.g.
* `console.error(error)`); logging only `error.message` hides the hint.
*
* Read the fields in roughly this order of usefulness:
*
* - `hint` — actionable guidance from the database when available. For
*   permission-denied errors (`42501`), this is the literal SQL to fix the
*   problem, e.g.
*   `"Grant the required privileges to the current role with: GRANT SELECT ON public.users TO anon;"`.
*   Missing column? `hint` suggests the column you probably meant. Whenever
*   Postgres knows the fix, it puts it in `hint`.
* - `code` — stable error code from PostgREST (e.g. `PGRST301`) or Postgres
*   (e.g. `42501`). Branch on this rather than on `message` text.
* - `details` — extra context, often the offending value, key, or row.
* - `message` — human-readable summary. Useful in UI strings; less useful
*   for debugging.
*
* {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
*/ var PostgrestError = class extends Error {
    /**
	* @example
	* ```ts
	* import PostgrestError from '@supabase/postgrest-js'
	*
	* throw new PostgrestError({
	*   message: 'Row level security prevented the request',
	*   details: 'RLS denied the insert',
	*   hint: 'Check your policies',
	*   code: 'PGRST301',
	* })
	* ```
	*/ constructor(context){
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            details: this.details,
            hint: this.hint,
            code: this.code
        };
    }
};
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/PostgrestBuilder.ts
/**
* Sleep for a given number of milliseconds.
* If an AbortSignal is provided, the sleep resolves early when the signal is aborted.
*/ function sleep(ms, signal) {
    return new Promise((resolve)=>{
        if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
            resolve();
            return;
        }
        const id = setTimeout(()=>{
            signal === null || signal === void 0 || signal.removeEventListener("abort", onAbort);
            resolve();
        }, ms);
        function onAbort() {
            clearTimeout(id);
            resolve();
        }
        signal === null || signal === void 0 || signal.addEventListener("abort", onAbort);
    });
}
/**
* Check if a request should be retried based on method and status code.
*/ function shouldRetry(method, status, attemptCount, retryEnabled) {
    if (!retryEnabled || attemptCount >= DEFAULT_MAX_RETRIES) return false;
    if (!RETRYABLE_METHODS.includes(method)) return false;
    if (!RETRYABLE_STATUS_CODES.includes(status)) return false;
    return true;
}
var PostgrestBuilder = class {
    /**
	* Creates a builder configured for a specific PostgREST request.
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('users').select('*')
	* ```
	*
	* @category Database
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
	*
	* const builder = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: new Headers({ apikey: 'your-publishable-key' }) }
	* )
	* ```
	*/ constructor(builder){
        var _builder$shouldThrowO, _builder$isMaybeSingl, _builder$shouldStripN, _builder$urlLengthLim, _builder$retry;
        this.shouldThrowOnError = false;
        this.retryEnabled = true;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = new Headers(builder.headers);
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = (_builder$shouldThrowO = builder.shouldThrowOnError) !== null && _builder$shouldThrowO !== void 0 ? _builder$shouldThrowO : false;
        this.signal = builder.signal;
        this.isMaybeSingle = (_builder$isMaybeSingl = builder.isMaybeSingle) !== null && _builder$isMaybeSingl !== void 0 ? _builder$isMaybeSingl : false;
        this.shouldStripNulls = (_builder$shouldStripN = builder.shouldStripNulls) !== null && _builder$shouldStripN !== void 0 ? _builder$shouldStripN : false;
        this.urlLengthLimit = (_builder$urlLengthLim = builder.urlLengthLimit) !== null && _builder$urlLengthLim !== void 0 ? _builder$urlLengthLim : 8e3;
        this.retryEnabled = (_builder$retry = builder.retry) !== null && _builder$retry !== void 0 ? _builder$retry : true;
        if (builder.fetch) this.fetch = builder.fetch;
        else this.fetch = fetch;
    }
    /**
	* If there's an error with the query, throwOnError will reject the promise by
	* throwing the error instead of returning it as part of a successful response.
	*
	* {@link https://github.com/supabase/supabase-js/issues/92}
	*
	* @category Database
	* @subcategory Using modifiers
	*/ throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
	* Strip null values from the response data. Properties with `null` values
	* will be omitted from the returned JSON objects.
	*
	* Requires PostgREST 11.2.0+.
	*
	* {@link https://docs.postgrest.org/en/stable/references/api/resource_representation.html#stripped-nulls}
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .stripNulls()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text, bio text);
	*
	* insert into
	*   characters (id, name, bio)
	* values
	*   (1, 'Luke', null),
	*   (2, 'Leia', 'Princess of Alderaan');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Leia",
	*       "bio": "Princess of Alderaan"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ stripNulls() {
        if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
        this.shouldStripNulls = true;
        return this;
    }
    /**
	* Set an HTTP header on this single PostgREST request, overriding any header
	* with the same name set on the client.
	*
	* This is an advanced escape hatch for one-off needs (passing a custom
	* `Authorization` for a single query, attaching a tracing header, etc.).
	* Most callers do not need it: configure client-wide headers via the
	* `headers` option when constructing the client, and authentication via
	* Supabase Auth.
	*
	* @param name - HTTP header name
	* @param value - HTTP header value
	*
	* @category Database
	* @subcategory Using modifiers
	*/ setHeader(name, value) {
        this.headers = new Headers(this.headers);
        this.headers.set(name, value);
        return this;
    }
    /**
	* @category Database
	* @subcategory Using modifiers
	*
	* Configure retry behavior for this request.
	*
	* By default, retries are enabled for idempotent requests (GET, HEAD, OPTIONS)
	* that fail with network errors or specific HTTP status codes (503, 520).
	* Retries use exponential backoff (1s, 2s, 4s) with a maximum of 3 attempts.
	*
	* @param enabled - Whether to enable retries for this request
	*
	* @example
	* ```ts
	* // Disable retries for a specific query
	* const { data, error } = await supabase
	*   .from('users')
	*   .select()
	*   .retry(false)
	* ```
	*/ retry(enabled) {
        this.retryEnabled = enabled;
        return this;
    }
    then(onfulfilled, onrejected) {
        var _this = this;
        if (this.schema === void 0) {} else if ([
            "GET",
            "HEAD"
        ].includes(this.method)) this.headers.set("Accept-Profile", this.schema);
        else this.headers.set("Content-Profile", this.schema);
        if (this.method !== "GET" && this.method !== "HEAD") this.headers.set("Content-Type", "application/json");
        if (this.shouldStripNulls) {
            const currentAccept = this.headers.get("Accept");
            if (currentAccept === "application/vnd.pgrst.object+json") this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped");
            else if (!currentAccept || currentAccept === "application/json") this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
        }
        const _fetch = this.fetch;
        const executeWithRetry = async ()=>{
            let attemptCount = 0;
            while(true){
                const headers = {};
                _this.headers.forEach((value, key)=>{
                    headers[key] = value;
                });
                if (attemptCount > 0) headers["X-Retry-Count"] = String(attemptCount);
                let res$1;
                try {
                    res$1 = await _fetch(_this.url.toString(), {
                        method: _this.method,
                        headers,
                        body: JSON.stringify(_this.body, (_, value)=>typeof value === "bigint" ? value.toString() : value),
                        signal: _this.signal
                    });
                } catch (fetchError) {
                    if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") throw fetchError;
                    if (!RETRYABLE_METHODS.includes(_this.method)) throw fetchError;
                    if (_this.retryEnabled && attemptCount < DEFAULT_MAX_RETRIES) {
                        const delay = getRetryDelay(attemptCount);
                        attemptCount++;
                        await sleep(delay, _this.signal);
                        continue;
                    }
                    throw fetchError;
                }
                if (shouldRetry(_this.method, res$1.status, attemptCount, _this.retryEnabled)) {
                    var _res$headers$get, _res$headers;
                    const retryAfterHeader = (_res$headers$get = (_res$headers = res$1.headers) === null || _res$headers === void 0 ? void 0 : _res$headers.get("Retry-After")) !== null && _res$headers$get !== void 0 ? _res$headers$get : null;
                    const delay = retryAfterHeader !== null ? Math.max(0, parseInt(retryAfterHeader, 10) || 0) * 1e3 : getRetryDelay(attemptCount);
                    await res$1.text();
                    attemptCount++;
                    await sleep(delay, _this.signal);
                    continue;
                }
                return await _this.processResponse(res$1);
            }
        };
        let res = executeWithRetry();
        if (!this.shouldThrowOnError) res = res.catch((fetchError)=>{
            var _fetchError$name2;
            let errorDetails = "";
            let hint = "";
            let code = "";
            const cause = fetchError === null || fetchError === void 0 ? void 0 : fetchError.cause;
            if (cause) {
                var _cause$message, _cause$code, _fetchError$name, _cause$name;
                const causeMessage = (_cause$message = cause === null || cause === void 0 ? void 0 : cause.message) !== null && _cause$message !== void 0 ? _cause$message : "";
                const causeCode = (_cause$code = cause === null || cause === void 0 ? void 0 : cause.code) !== null && _cause$code !== void 0 ? _cause$code : "";
                errorDetails = `${(_fetchError$name = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name !== void 0 ? _fetchError$name : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`;
                errorDetails += `\n\nCaused by: ${(_cause$name = cause === null || cause === void 0 ? void 0 : cause.name) !== null && _cause$name !== void 0 ? _cause$name : "Error"}: ${causeMessage}`;
                if (causeCode) errorDetails += ` (${causeCode})`;
                if (cause === null || cause === void 0 ? void 0 : cause.stack) errorDetails += `\n${cause.stack}`;
            } else {
                var _fetchError$stack;
                errorDetails = (_fetchError$stack = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _fetchError$stack !== void 0 ? _fetchError$stack : "";
            }
            const urlLength = this.url.toString().length;
            if ((fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) === "AbortError" || (fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) === "ABORT_ERR") {
                code = "";
                hint = "Request was aborted (timeout or manual cancellation)";
                if (urlLength > this.urlLengthLimit) hint += `. Note: Your request URL is ${urlLength} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`;
            } else if ((cause === null || cause === void 0 ? void 0 : cause.name) === "HeadersOverflowError" || (cause === null || cause === void 0 ? void 0 : cause.code) === "UND_ERR_HEADERS_OVERFLOW") {
                code = "";
                hint = "HTTP headers exceeded server limits (typically 16KB)";
                if (urlLength > this.urlLengthLimit) hint += `. Your request URL is ${urlLength} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`;
            }
            return {
                success: false,
                error: {
                    message: `${(_fetchError$name2 = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _fetchError$name2 !== void 0 ? _fetchError$name2 : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                    details: errorDetails,
                    hint,
                    code
                },
                data: null,
                count: null,
                status: 0,
                statusText: ""
            };
        });
        return res.then(onfulfilled, onrejected);
    }
    /**
	* Process a fetch response and return the standardized postgrest response.
	*/ async processResponse(res) {
        var _this2 = this;
        let error = null;
        let data = null;
        let count = null;
        let status = res.status;
        let statusText = res.statusText;
        if (res.ok) {
            var _this$headers$get2, _res$headers$get2;
            if (_this2.method !== "HEAD") {
                var _this$headers$get;
                const body = await res.text();
                if (body === "") {} else if (_this2.headers.get("Accept") === "text/csv") data = body;
                else if (_this2.headers.get("Accept") && ((_this$headers$get = _this2.headers.get("Accept")) === null || _this$headers$get === void 0 ? void 0 : _this$headers$get.includes("application/vnd.pgrst.plan+text"))) data = body;
                else try {
                    data = JSON.parse(body);
                } catch (_unused) {
                    error = {
                        message: body
                    };
                    data = null;
                    if (_this2.shouldThrowOnError) throw new PostgrestError({
                        message: body,
                        details: "",
                        hint: "",
                        code: ""
                    });
                }
            }
            const countHeader = (_this$headers$get2 = _this2.headers.get("Prefer")) === null || _this$headers$get2 === void 0 ? void 0 : _this$headers$get2.match(/count=(exact|planned|estimated)/);
            const contentRange = (_res$headers$get2 = res.headers.get("content-range")) === null || _res$headers$get2 === void 0 ? void 0 : _res$headers$get2.split("/");
            if (countHeader && contentRange && contentRange.length > 1) count = parseInt(contentRange[1]);
            if (_this2.isMaybeSingle && Array.isArray(data)) if (data.length > 1) {
                error = {
                    code: "PGRST116",
                    details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                    hint: null,
                    message: "JSON object requested, multiple (or no) rows returned"
                };
                data = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
                if (_this2.shouldThrowOnError) {
                    var _error$hint;
                    throw new PostgrestError(_objectSpread2(_objectSpread2({}, error), {}, {
                        hint: (_error$hint = error.hint) !== null && _error$hint !== void 0 ? _error$hint : ""
                    }));
                }
            } else if (data.length === 1) data = data[0];
            else data = null;
        } else {
            const body = await res.text();
            try {
                error = JSON.parse(body);
                if (Array.isArray(error) && res.status === 404) {
                    data = [];
                    error = null;
                    status = 200;
                    statusText = "OK";
                }
            } catch (_unused2) {
                if (res.status === 404 && body === "") {
                    status = 204;
                    statusText = "No Content";
                } else error = {
                    message: body
                };
            }
            if (error && _this2.shouldThrowOnError) throw new PostgrestError(error);
        }
        return {
            success: error === null,
            error,
            data,
            count,
            status,
            statusText
        };
    }
    /**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*
	* @category Database
	* @subcategory Using modifiers
	*/ returns() {
        /* istanbul ignore next */ return this;
    }
    /**
	* Override the type of the returned `data` field in the response.
	*
	* @typeParam NewResult - The new type to cast the response data to
	* @typeParam Options - Optional type configuration (defaults to { merge: true })
	* @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
	* @example
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	* @returns A PostgrestBuilder instance with the new type
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example Complete Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .overrideTypes<Array<MyType>, { merge: false }>()
	* ```
	*
	* @exampleResponse Complete Override type of successful response
	* ```ts
	* let x: typeof data // MyType[]
	* ```
	*
	* @example Complete Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .overrideTypes<MyType, { merge: false }>()
	* ```
	*
	* @exampleResponse Complete Override type of object response
	* ```ts
	* let x: typeof data // MyType | null
	* ```
	*
	* @example Partial Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .overrideTypes<Array<{ status: "A" | "B" }>>()
	* ```
	*
	* @exampleResponse Partial Override type of successful response
	* ```ts
	* let x: typeof data // Array<CountryRowProperties & { status: "A" | "B" }>
	* ```
	*
	* @example Partial Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .overrideTypes<{ status: "A" | "B" }>()
	* ```
	*
	* @exampleResponse Partial Override type of object response
	* ```ts
	* let x: typeof data // CountryRowProperties & { status: "A" | "B" } | null
	* ```
	*
	* @example Merge vs replace existing types
	* ```typescript
	* // Merge with existing types (default behavior)
	* const query = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ custom_field: string }>()
	*
	* // Replace existing types completely
	* const replaceQuery = supabase
	*   .from('users')
	*   .select()
	*   .overrideTypes<{ id: number; name: string }, { merge: false }>()
	* ```
	*/ overrideTypes() {
        return this;
    }
};
//#endregion
//#region src/PostgrestTransformBuilder.ts
var PostgrestTransformBuilder = class extends PostgrestBuilder {
    throwOnError() {
        return super.throwOnError();
    }
    /**
	* Perform a SELECT on the query result.
	*
	* By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
	* return modified rows. By calling this method, modified rows are returned in
	* `data`.
	*
	* @param columns - The columns to retrieve, separated by commas
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `upsert()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .upsert({ id: 1, name: 'Han Solo' })
	*   .select()
	* ```
	*
	* @exampleSql With `upsert()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Han');
	* ```
	*
	* @exampleResponse With `upsert()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Han Solo"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*/ select(columns) {
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) return "";
            if (c === "\"") quoted = !quoted;
            return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        this.headers.append("Prefer", "return=representation");
        return this;
    }
    /**
	* Order the query result by `column`.
	*
	* You can call this method multiple times to order by multiple columns.
	*
	* You can order referenced tables, but it only affects the ordering of the
	* parent table if you use `!inner` in the query.
	*
	* @param column - The column to order by
	* @param options - Named parameters
	* @param options.ascending - If `true`, the result will be in ascending order
	* @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
	* `null`s appear last.
	* @param options.referencedTable - Set this to order a referenced table by
	* its columns
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('id, name')
	*   .order('id', { ascending: false })
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     },
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription On a referenced table
	* Ordering with `referencedTable` doesn't affect the ordering of the
	* parent table.
	*
	* @example On a referenced table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('orchestral_sections')
	*     .select(`
	*       name,
	*       instruments (
	*         name
	*       )
	*     `)
	*     .order('name', { referencedTable: 'instruments', ascending: false })
	*
	* ```
	*
	* @exampleSql On a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 1, 'harp'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse On a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         },
	*         {
	*           "name": "harp"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "instruments": []
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Order parent table by a referenced table
	* Ordering with `referenced_table(col)` affects the ordering of the
	* parent table.
	*
	* @example Order parent table by a referenced table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('instruments')
	*     .select(`
	*       name,
	*       section:orchestral_sections (
	*         name
	*       )
	*     `)
	*     .order('section(name)', { ascending: true })
	*
	* ```
	*
	* @exampleSql Order parent table by a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Order parent table by a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "violin",
	*       "orchestral_sections": {"name": "strings"}
	*     },
	*     {
	*       "name": "flute",
	*       "orchestral_sections": {"name": "woodwinds"}
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
    }
    /**
	* Limit the query result by `rows`.
	*
	* @param rows - The maximum number of rows to return
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .limit(1)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example On a referenced table
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments (
	*       name
	*     )
	*   `)
	*   .limit(1, { referencedTable: 'instruments' })
	* ```
	*
	* @exampleSql On a referenced table
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 1, 'harp'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse On a referenced table
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ limit(rows, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${rows}`);
        return this;
    }
    /**
	* Limit the query result by starting at an offset `from` and ending at the offset `to`.
	* Only records within this range are returned.
	* This respects the query order and if there is no order clause the range could behave unexpectedly.
	* The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
	* and fourth rows of the query.
	*
	* @param from - The starting index from which to limit the result
	* @param to - The last index to which to limit the result
	* @param options - Named parameters
	* @param options.referencedTable - Set this to limit rows of referenced
	* tables instead of the parent table
	* @param options.foreignTable - Deprecated, use `options.referencedTable`
	* instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .range(0, 1)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     },
	*     {
	*       "name": "Leia"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
	* Set the AbortSignal for the fetch request.
	*
	* @param signal - The AbortSignal to use for the fetch request
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @remarks
	* You can use this to set a timeout for the request.
	*
	* @exampleDescription Aborting requests in-flight
	* You can use an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to abort requests.
	* Note that `status` and `statusText` don't mean anything for aborted requests as the request wasn't fulfilled.
	*
	* @example Aborting requests in-flight
	* ```ts
	* const ac = new AbortController()
	*
	* const { data, error } = await supabase
	*   .from('very_big_table')
	*   .select()
	*   .abortSignal(ac.signal)
	*
	* // Abort the request after 100 ms
	* setTimeout(() => ac.abort(), 100)
	* ```
	*
	* @exampleResponse Aborting requests in-flight
	* ```json
	*   {
	*     "error": {
	*       "message": "AbortError: The user aborted a request.",
	*       "details": "",
	*       "hint": "The request was aborted locally via the provided AbortSignal.",
	*       "code": ""
	*     },
	*     "status": 0,
	*     "statusText": ""
	*   }
	*
	* ```
	*
	* @example Set a timeout
	* ```ts
	* const { data, error } = await supabase
	*   .from('very_big_table')
	*   .select()
	*   .abortSignal(AbortSignal.timeout(1000 /* ms *\/))
	* ```
	*
	* @exampleResponse Set a timeout
	* ```json
	*   {
	*     "error": {
	*       "message": "FetchError: The user aborted a request.",
	*       "details": "",
	*       "hint": "",
	*       "code": ""
	*     },
	*     "status": 0,
	*     "statusText": ""
	*   }
	*
	* ```
	*/ abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be one row (e.g. using `.limit(1)`), otherwise this
	* returns an error.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .limit(1)
	*   .single()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": {
	*     "name": "Luke"
	*   },
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ single() {
        this.headers.set("Accept", "application/vnd.pgrst.object+json");
        return this;
    }
    /**
	* Return `data` as a single object instead of an array of objects.
	*
	* Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
	* this returns an error.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .eq('name', 'Katniss')
	*   .maybeSingle()
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ maybeSingle() {
        this.isMaybeSingle = true;
        return this;
    }
    /**
	* Return `data` as a string in CSV format.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @exampleDescription Return data as CSV
	* By default, the data is returned in JSON format, but can also be returned as Comma Separated Values.
	*
	* @example Return data as CSV
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .csv()
	* ```
	*
	* @exampleSql Return data as CSV
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Return data as CSV
	* ```json
	* {
	*   "data": "id,name\n1,Luke\n2,Leia\n3,Han",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ csv() {
        this.headers.set("Accept", "text/csv");
        return this;
    }
    /**
	* Return `data` as an object in [GeoJSON](https://geojson.org) format.
	*
	* @category Database
	* @subcategory Using modifiers
	*/ geojson() {
        this.headers.set("Accept", "application/geo+json");
        return this;
    }
    /**
	* Return `data` as the EXPLAIN plan for the query.
	*
	* You need to enable the
	* [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
	* setting before using this method.
	*
	* @param options - Named parameters
	*
	* @param options.analyze - If `true`, the query will be executed and the
	* actual run time will be returned
	*
	* @param options.verbose - If `true`, the query identifier will be returned
	* and `data` will include the output columns of the query
	*
	* @param options.settings - If `true`, include information on configuration
	* parameters that affect query planning
	*
	* @param options.buffers - If `true`, include information on buffer usage
	*
	* @param options.wal - If `true`, include information on WAL record generation
	*
	* @param options.format - The format of the output, can be `"text"` (default)
	* or `"json"`
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @exampleDescription Get the execution plan
	* By default, the data is returned in TEXT format, but can also be returned as JSON by using the `format` parameter.
	*
	* @example Get the execution plan
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .explain()
	* ```
	*
	* @exampleSql Get the execution plan
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Get the execution plan
	* ```js
	* Aggregate  (cost=33.34..33.36 rows=1 width=112)
	*   ->  Limit  (cost=0.00..18.33 rows=1000 width=40)
	*         ->  Seq Scan on characters  (cost=0.00..22.00 rows=1200 width=40)
	* ```
	*
	* @exampleDescription Get the execution plan with analyze and verbose
	* By default, the data is returned in TEXT format, but can also be returned as JSON by using the `format` parameter.
	*
	* @example Get the execution plan with analyze and verbose
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .explain({analyze:true,verbose:true})
	* ```
	*
	* @exampleSql Get the execution plan with analyze and verbose
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Get the execution plan with analyze and verbose
	* ```js
	* Aggregate  (cost=33.34..33.36 rows=1 width=112) (actual time=0.041..0.041 rows=1 loops=1)
	*   Output: NULL::bigint, count(ROW(characters.id, characters.name)), COALESCE(json_agg(ROW(characters.id, characters.name)), '[]'::json), NULLIF(current_setting('response.headers'::text, true), ''::text), NULLIF(current_setting('response.status'::text, true), ''::text)
	*   ->  Limit  (cost=0.00..18.33 rows=1000 width=40) (actual time=0.005..0.006 rows=3 loops=1)
	*         Output: characters.id, characters.name
	*         ->  Seq Scan on public.characters  (cost=0.00..22.00 rows=1200 width=40) (actual time=0.004..0.005 rows=3 loops=1)
	*               Output: characters.id, characters.name
	* Query Identifier: -4730654291623321173
	* Planning Time: 0.407 ms
	* Execution Time: 0.119 ms
	* ```
	*/ explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _this$headers$get;
        const options = [
            analyze ? "analyze" : null,
            verbose ? "verbose" : null,
            settings ? "settings" : null,
            buffers ? "buffers" : null,
            wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_this$headers$get = this.headers.get("Accept")) !== null && _this$headers$get !== void 0 ? _this$headers$get : "application/json";
        this.headers.set("Accept", `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`);
        if (format === "json") return this;
        else return this;
    }
    /**
	* Dry-run this request: execute the query but discard the changes.
	*
	* Server-side, PostgREST runs the query inside a transaction and rolls it back
	* instead of committing. The response still contains the data that *would* have
	* been returned — `RETURNING` clauses execute and RLS, triggers, and constraints
	* are all evaluated — but no row is actually inserted, updated, or deleted.
	*
	* This affects only the single request it is chained to. The JS caller has no
	* handle on the transaction: supabase-js does not group multiple queries into
	* one transaction. For multi-statement transactional logic, use a database
	* function (`supabase.rpc(...)`).
	*
	* Sets the `Prefer: tx=rollback` header. See PostgREST's docs on transaction
	* preferences for the underlying mechanism.
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @example Validate an insert without persisting
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .insert({ name: 'France' })
	*   .select()
	*   .rollback()
	* // `data` shows what would have been inserted; nothing is saved.
	* ```
	*/ rollback() {
        this.headers.append("Prefer", "tx=rollback");
        return this;
    }
    /**
	* Override the type of the returned `data`.
	*
	* @typeParam NewResult - The new result type to override with
	* @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
	*
	* @category Database
	* @subcategory Using modifiers
	*
	* @remarks
	* - Deprecated: use overrideTypes method instead
	*
	* @example Override type of successful response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .returns<Array<MyType>>()
	* ```
	*
	* @exampleResponse Override type of successful response
	* ```js
	* let x: typeof data // MyType[]
	* ```
	*
	* @example Override type of object response
	* ```ts
	* const { data } = await supabase
	*   .from('countries')
	*   .select()
	*   .maybeSingle()
	*   .returns<MyType>()
	* ```
	*
	* @exampleResponse Override type of object response
	* ```js
	* let x: typeof data // MyType | null
	* ```
	*/ returns() {
        return this;
    }
    /**
	* Set the maximum number of rows that can be affected by the query.
	* Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
	*
	* @param rows - The maximum number of rows that can be affected
	*
	* @category Database
	* @subcategory Using modifiers
	*/ maxAffected(rows) {
        this.headers.append("Prefer", "handling=strict");
        this.headers.append("Prefer", `max-affected=${rows}`);
        return this;
    }
};
//#endregion
//#region src/PostgrestFilterBuilder.ts
const PostgrestReservedCharsRegexp = /* @__PURE__ */ new RegExp("[,()]");
var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
    throwOnError() {
        return super.throwOnError();
    }
    /**
	* Match only rows where `column` is equal to `value`.
	*
	* To check if the value of `column` is NULL, you should use `.is()` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .eq('name', 'Leia')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
	* Match only rows where `column` is not equal to `value`.
	*
	* This filter does not include rows where `column` is `NULL`. To match null
	* values, use `.is(column, null)` instead.
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .neq('name', 'Leia')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Luke"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
    }
    likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
    }
    ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
    }
    ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
    }
    regexMatch(column, pattern) {
        this.url.searchParams.append(column, `match.${pattern}`);
        return this;
    }
    regexIMatch(column, pattern) {
        this.url.searchParams.append(column, `imatch.${pattern}`);
        return this;
    }
    is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
	* Match only rows where `column` IS DISTINCT FROM `value`.
	*
	* Unlike `.neq()`, this treats `NULL` as a comparable value. Two `NULL` values
	* are considered equal (not distinct), and comparing `NULL` with any non-NULL
	* value returns true (distinct).
	*
	* @param column - The column to filter on
	* @param value - The value to filter with
	*/ isDistinct(column, value) {
        this.url.searchParams.append(column, `isdistinct.${value}`);
        return this;
    }
    /**
	* Match only rows where `column` is included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*
	* @category Database
	* @subcategory Using filters
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	*   .in('name', ['Leia', 'Han'])
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 2,
	*       "name": "Leia"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ in(column, values) {
        const cleanedValues = Array.from(new Set(values)).map((s)=>{
            if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
            else return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
	* Match only rows where `column` is NOT included in the `values` array.
	*
	* @param column - The column to filter on
	* @param values - The values array to filter with
	*/ notIn(column, values) {
        const cleanedValues = Array.from(new Set(values)).map((s)=>{
            if (typeof s === "string" && PostgrestReservedCharsRegexp.test(s)) return `"${s}"`;
            else return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `not.in.(${cleanedValues})`);
        return this;
    }
    contains(column, value) {
        if (typeof value === "string") this.url.searchParams.append(column, `cs.${value}`);
        else if (Array.isArray(value)) this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        else this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        return this;
    }
    containedBy(column, value) {
        if (typeof value === "string") this.url.searchParams.append(column, `cd.${value}`);
        else if (Array.isArray(value)) this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        else this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        return this;
    }
    rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    overlaps(column, value) {
        if (typeof value === "string") this.url.searchParams.append(column, `ov.${value}`);
        else this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        return this;
    }
    textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") typePart = "pl";
        else if (type === "phrase") typePart = "ph";
        else if (type === "websearch") typePart = "w";
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    match(query) {
        Object.entries(query).filter(([_, value])=>value !== void 0).forEach(([column, value])=>{
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
	* Match only rows which doesn't satisfy the filter.
	*
	* Unlike most filters, `opearator` and `value` are used as-is and need to
	* follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure they are properly sanitized.
	*
	* @param column - The column to filter on
	* @param operator - The operator to be negated to filter with, following
	* PostgREST syntax
	* @param value - The value to filter with, following PostgREST syntax
	*
	* @category Database
	* @subcategory Using filters
	*
	* @remarks
	* not() expects you to use the raw PostgREST syntax for the filter values.
	*
	* ```ts
	* .not('id', 'in', '(5,6,7)')  // Use `()` for `in` filter
	* .not('arraycol', 'cs', '{"a","b"}')  // Use `cs` for `contains()`, `{}` for array values
	* ```
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .select()
	*   .not('name', 'is', null)
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'null'),
	*   (2, null);
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	*   {
	*     "data": [
	*       {
	*         "id": 1,
	*         "name": "null"
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*
	* ```
	*/ not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
	* Match only rows which satisfy at least one of the filters.
	*
	* Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
	* syntax](https://postgrest.org/en/stable/api.html#operators). You also need
	* to make sure it's properly sanitized.
	*
	* It's currently not possible to do an `.or()` filter across multiple tables.
	*
	* @param filters - The filters to use, following PostgREST syntax
	* @param options - Named parameters
	* @param options.referencedTable - Set this to filter on referenced tables
	* instead of the parent table
	* @param options.foreignTable - Deprecated, use `referencedTable` instead
	*
	* @category Database
	* @subcategory Using filters
	*
	* @remarks
	* or() expects you to use the raw PostgREST syntax for the filter names and values.
	*
	* ```ts
	* .or('id.in.(5,6,7), arraycol.cs.{"a","b"}')  // Use `()` for `in` filter, `{}` for array values and `cs` for `contains()`.
	* .or('id.in.(5,6,7), arraycol.cd.{"a","b"}')  // Use `cd` for `containedBy()`
	* ```
	*
	* @example With `select()`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .or('id.eq.2,name.eq.Han')
	* ```
	*
	* @exampleSql With `select()`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse With `select()`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Leia"
	*     },
	*     {
	*       "name": "Han"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Use `or` with `and`
	* ```ts
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	*   .or('id.gt.3,and(id.eq.1,name.eq.Luke)')
	* ```
	*
	* @exampleSql Use `or` with `and`
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Use `or` with `and`
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Luke"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Use `or` on referenced tables
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments!inner (
	*       name
	*     )
	*   `)
	*   .or('section_id.eq.1,name.eq.guzheng', { referencedTable: 'instruments' })
	* ```
	*
	* @exampleSql Use `or` on referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Use `or` on referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
};
//#endregion
//#region src/PostgrestQueryBuilder.ts
var PostgrestQueryBuilder = class {
    /**
	* Creates a query builder scoped to a Postgres table or view.
	*
	* @category Database
	*
	* @param url - The URL for the query
	* @param options - Named parameters
	* @param options.headers - Custom headers
	* @param options.schema - Postgres schema to use
	* @param options.fetch - Custom fetch implementation
	* @param options.urlLengthLimit - Maximum URL length before warning
	* @param options.retry - Enable automatic retries for transient errors (default: true)
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('users').select('*')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestQueryBuilder } from '@supabase/postgrest-js'
	*
	* const query = new PostgrestQueryBuilder(
	*   new URL('https://xyzcompany.supabase.co/rest/v1/users'),
	*   { headers: { apikey: 'your-publishable-key' }, retry: true }
	* )
	* ```
	*/ constructor(url, { headers = {}, schema, fetch: fetch$1, urlLengthLimit = 8e3, retry }){
        this.url = url;
        this.headers = new Headers(headers);
        this.schema = schema;
        this.fetch = fetch$1;
        this.urlLengthLimit = urlLengthLimit;
        this.retry = retry;
    }
    /**
	* Clone URL and headers to prevent shared state between operations.
	*/ cloneRequestState() {
        return {
            url: new URL(this.url.toString()),
            headers: new Headers(this.headers)
        };
    }
    /**
	* Perform a SELECT query on the table or view.
	*
	* @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
	*
	* @param options - Named parameters
	*
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	*
	* @param options.count - Count algorithm to use to count rows in the table or view.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @remarks
	* When using `count` with `.range()` or `.limit()`, the returned `count` is the total number of rows
	* that match your filters, not the number of rows in the current page. Use this to build pagination UI.
	
	* - By default, Supabase projects return a maximum of 1,000 rows. This setting can be changed in your project's [API settings](/dashboard/project/_/settings/api). It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use `range()` queries to paginate through your data.
	* - `select()` can be combined with [Filters](/docs/reference/javascript/using-filters)
	* - `select()` can be combined with [Modifiers](/docs/reference/javascript/using-modifiers)
	* - `apikey` is a reserved keyword if you're using the [Supabase Platform](/docs/guides/platform) and [should be avoided as a column name](https://github.com/supabase/supabase/issues/5465). *
	* @category Database
	*
	* @example Getting your data
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select()
	* ```
	*
	* @exampleSql Getting your data
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Harry'),
	*   (2, 'Frodo'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Getting your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Harry"
	*     },
	*     {
	*       "id": 2,
	*       "name": "Frodo"
	*     },
	*     {
	*       "id": 3,
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* The most useful field on a Postgres error is usually `hint` — when the database knows the fix, it puts the literal SQL there. For example, a permission-denied error (`code: '42501'`) arrives with a `hint` like `"Grant the required privileges to the current role with: GRANT SELECT ON public.characters TO anon;"`. Log the full `error` object so the hint isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase.from('characters').select()
	* if (error) {
	*   // Logs the full error: message, code, details, and hint.
	*   console.error(error)
	*   return
	* }
	* ```
	*
	* @exampleResponse Handling errors
	* ```json
	* {
	*   "error": {
	*     "code": "42501",
	*     "details": null,
	*     "hint": "Grant the required privileges to the current role with: GRANT SELECT ON public.characters TO anon;",
	*     "message": "permission denied for table characters"
	*   },
	*   "status": 401,
	*   "statusText": ""
	* }
	* ```
	*
	* @example Selecting specific columns
	* ```js
	* const { data, error } = await supabase
	*   .from('characters')
	*   .select('name')
	* ```
	*
	* @exampleSql Selecting specific columns
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Frodo'),
	*   (2, 'Harry'),
	*   (3, 'Katniss');
	* ```
	*
	* @exampleResponse Selecting specific columns
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "Frodo"
	*     },
	*     {
	*       "name": "Harry"
	*     },
	*     {
	*       "name": "Katniss"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables
	* If your database has foreign key relationships, you can query related tables too.
	*
	* @example Query referenced tables
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`
	*     name,
	*     instruments (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables with spaces in their names
	* If your table name contains spaces, you must use double quotes in the `select` statement to reference the table.
	*
	* @example Query referenced tables with spaces in their names
	* ```js
	* const { data, error } = await supabase
	*   .from('orchestral sections')
	*   .select(`
	*     name,
	*     "musical instruments" (
	*       name
	*     )
	*   `)
	* ```
	*
	* @exampleSql Query referenced tables with spaces in their names
	* ```sql
	* create table
	*   "orchestral sections" (id int8 primary key, name text);
	* create table
	*   "musical instruments" (
	*     id int8 primary key,
	*     section_id int8 not null references "orchestral sections",
	*     name text
	*   );
	*
	* insert into
	*   "orchestral sections" (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   "musical instruments" (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Query referenced tables with spaces in their names
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "strings",
	*       "musical instruments": [
	*         {
	*           "name": "violin"
	*         }
	*       ]
	*     },
	*     {
	*       "name": "woodwinds",
	*       "musical instruments": [
	*         {
	*           "name": "flute"
	*         }
	*       ]
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query referenced tables through a join table
	* If you're in a situation where your tables are **NOT** directly
	* related, but instead are joined by a _join table_, you can still use
	* the `select()` method to query the related data. The join table needs
	* to have the foreign keys as part of its composite primary key.
	*
	* @example Query referenced tables through a join table
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     name,
	*     teams (
	*       name
	*     )
	*   `)
	*   
	* ```
	*
	* @exampleSql Query referenced tables through a join table
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*     -- both foreign keys must be part of a composite primary key
	*     primary key (user_id, team_id)
	*   );
	*
	* insert into
	*   users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* ```
	*
	* @exampleResponse Query referenced tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "name": "Kiran",
	*         "teams": [
	*           {
	*             "name": "Green"
	*           },
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       },
	*       {
	*         "name": "Evan",
	*         "teams": [
	*           {
	*             "name": "Blue"
	*           }
	*         ]
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Query the same referenced table multiple times
	* If you need to query the same referenced table twice, use the name of the
	* joined column to identify which join to use. You can also give each
	* column an alias.
	*
	* @example Query the same referenced table multiple times
	* ```ts
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:sender_id(name),
	*     to:receiver_id(name)
	*   `)
	*
	* // To infer types, use the name of the table (in this case `users`) and
	* // the name of the foreign key constraint.
	* const { data, error } = await supabase
	*   .from('messages')
	*   .select(`
	*     content,
	*     from:users!messages_sender_id_fkey(name),
	*     to:users!messages_receiver_id_fkey(name)
	*   `)
	* ```
	*
	* @exampleSql Query the same referenced table multiple times
	* ```sql
	*  create table
	*  users (id int8 primary key, name text);
	*
	*  create table
	*    messages (
	*      sender_id int8 not null references users,
	*      receiver_id int8 not null references users,
	*      content text
	*    );
	*
	*  insert into
	*    users (id, name)
	*  values
	*    (1, 'Kiran'),
	*    (2, 'Evan');
	*
	*  insert into
	*    messages (sender_id, receiver_id, content)
	*  values
	*    (1, 2, '👋');
	*  ```
	* ```
	*
	* @exampleResponse Query the same referenced table multiple times
	* ```json
	* {
	*   "data": [
	*     {
	*       "content": "👋",
	*       "from": {
	*         "name": "Kiran"
	*       },
	*       "to": {
	*         "name": "Evan"
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Query nested foreign tables through a join table
	* You can use the result of a joined table to gather data in
	* another foreign table. With multiple references to the same foreign
	* table you must specify the column on which to conduct the join.
	*
	* @example Query nested foreign tables through a join table
	* ```ts
	*   const { data, error } = await supabase
	*     .from('games')
	*     .select(`
	*       game_id:id,
	*       away_team:teams!games_away_team_fkey (
	*         users (
	*           id,
	*           name
	*         )
	*       )
	*     `)
	*   
	* ```
	*
	* @exampleSql Query nested foreign tables through a join table
	* ```sql
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text
	*   );
	* create table
	*   teams (
	*     id int8 primary key,
	*     name text
	*   );
	* -- join table
	* create table
	*   users_teams (
	*     user_id int8 not null references users,
	*     team_id int8 not null references teams,
	*
	*     primary key (user_id, team_id)
	*   );
	* create table
	*   games (
	*     id int8 primary key,
	*     home_team int8 not null references teams,
	*     away_team int8 not null references teams,
	*     name text
	*   );
	*
	* insert into users (id, name)
	* values
	*   (1, 'Kiran'),
	*   (2, 'Evan');
	* insert into
	*   teams (id, name)
	* values
	*   (1, 'Green'),
	*   (2, 'Blue');
	* insert into
	*   users_teams (user_id, team_id)
	* values
	*   (1, 1),
	*   (1, 2),
	*   (2, 2);
	* insert into
	*   games (id, home_team, away_team, name)
	* values
	*   (1, 1, 2, 'Green vs Blue'),
	*   (2, 2, 1, 'Blue vs Green');
	* ```
	*
	* @exampleResponse Query nested foreign tables through a join table
	* ```json
	*   {
	*     "data": [
	*       {
	*         "game_id": 1,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             },
	*             {
	*               "id": 2,
	*               "name": "Evan"
	*             }
	*           ]
	*         }
	*       },
	*       {
	*         "game_id": 2,
	*         "away_team": {
	*           "users": [
	*             {
	*               "id": 1,
	*               "name": "Kiran"
	*             }
	*           ]
	*         }
	*       }
	*     ],
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*   
	* ```
	*
	* @exampleDescription Filtering through referenced tables
	* If the filter on a referenced table's column is not satisfied, the referenced
	* table returns `[]` or `null` but the parent table is not filtered out.
	* If you want to filter out the parent table rows, use the `!inner` hint
	*
	* @example Filtering through referenced tables
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections(*)')
	*   .eq('orchestral_sections.name', 'percussion')
	* ```
	*
	* @exampleSql Filtering through referenced tables
	* ```sql
	* create table
	*   orchestral_sections (id int8 primary key, name text);
	* create table
	*   instruments (
	*     id int8 primary key,
	*     section_id int8 not null references orchestral_sections,
	*     name text
	*   );
	*
	* insert into
	*   orchestral_sections (id, name)
	* values
	*   (1, 'strings'),
	*   (2, 'woodwinds');
	* insert into
	*   instruments (id, section_id, name)
	* values
	*   (1, 2, 'flute'),
	*   (2, 1, 'violin');
	* ```
	*
	* @exampleResponse Filtering through referenced tables
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": null
	*     },
	*     {
	*       "name": "violin",
	*       "orchestral_sections": null
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with count
	* You can get the number of rows in a related table by using the
	* **count** property.
	*
	* @example Querying referenced table with count
	* ```ts
	* const { data, error } = await supabase
	*   .from('orchestral_sections')
	*   .select(`*, instruments(count)`)
	* ```
	*
	* @exampleSql Querying referenced table with count
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table characters (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('strings') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('violin', (select id from section)),
	* ('viola', (select id from section)),
	* ('cello', (select id from section)),
	* ('double bass', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with count
	* ```json
	* [
	*   {
	*     "id": "693694e7-d993-4360-a6d7-6294e325d9b6",
	*     "name": "strings",
	*     "instruments": [
	*       {
	*         "count": 4
	*       }
	*     ]
	*   }
	* ]
	* ```
	*
	* @exampleDescription Querying with count option
	* You can get the number of rows by using the
	* [count](/docs/reference/javascript/select#parameters) option.
	*
	* @example Querying with count option
	* ```ts
	* const { count, error } = await supabase
	*   .from('characters')
	*   .select('*', { count: 'exact', head: true })
	* ```
	*
	* @exampleSql Querying with count option
	* ```sql
	* create table
	*   characters (id int8 primary key, name text);
	*
	* insert into
	*   characters (id, name)
	* values
	*   (1, 'Luke'),
	*   (2, 'Leia'),
	*   (3, 'Han');
	* ```
	*
	* @exampleResponse Querying with count option
	* ```json
	* {
	*   "count": 3,
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying JSON data
	* You can select and filter data inside of
	* [JSON](/docs/guides/database/json) columns. Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* querying JSON data.
	*
	* @example Querying JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .select(`
	*     id, name,
	*     address->city
	*   `)
	* ```
	*
	* @exampleSql Querying JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Frodo', '{"city":"Hobbiton"}');
	* ```
	*
	* @exampleResponse Querying JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Frodo",
	*       "city": "Hobbiton"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Querying referenced table with inner join
	* If you don't want to return the referenced table contents, you can leave the parenthesis empty.
	* Like `.select('name, orchestral_sections!inner()')`.
	*
	* @example Querying referenced table with inner join
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .select('name, orchestral_sections!inner(name)')
	*   .eq('orchestral_sections.name', 'woodwinds')
	*   .limit(1)
	* ```
	*
	* @exampleSql Querying referenced table with inner join
	* ```sql
	* create table orchestral_sections (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text
	* );
	*
	* create table instruments (
	*   "id" "uuid" primary key default "extensions"."uuid_generate_v4"() not null,
	*   "name" text,
	*   "section_id" "uuid" references public.orchestral_sections on delete cascade
	* );
	*
	* with section as (
	*   insert into orchestral_sections (name)
	*   values ('woodwinds') returning id
	* )
	* insert into instruments (name, section_id) values
	* ('flute', (select id from section)),
	* ('clarinet', (select id from section)),
	* ('bassoon', (select id from section)),
	* ('piccolo', (select id from section));
	* ```
	*
	* @exampleResponse Querying referenced table with inner join
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "flute",
	*       "orchestral_sections": {"name": "woodwinds"}
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Switching schemas per query
	* In addition to setting the schema during initialization, you can also switch schemas on a per-query basis.
	* Make sure you've set up your [database privileges and API settings](/docs/guides/api/using-custom-schemas).
	*
	* @example Switching schemas per query
	* ```ts
	* const { data, error } = await supabase
	*   .schema('myschema')
	*   .from('mytable')
	*   .select()
	* ```
	*
	* @exampleSql Switching schemas per query
	* ```sql
	* create schema myschema;
	*
	* create table myschema.mytable (
	*   id uuid primary key default gen_random_uuid(),
	*   data text
	* );
	*
	* insert into myschema.mytable (data) values ('mydata');
	* ```
	*
	* @exampleResponse Switching schemas per query
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": "4162e008-27b0-4c0f-82dc-ccaeee9a624d",
	*       "data": "mydata"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ select(columns, options) {
        const { head = false, count } = options !== null && options !== void 0 ? options : {};
        const method = head ? "HEAD" : "GET";
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) return "";
            if (c === "\"") quoted = !quoted;
            return c;
        }).join("");
        const { url, headers } = this.cloneRequestState();
        url.searchParams.set("select", cleanedColumns);
        if (count) headers.append("Prefer", `count=${count}`);
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            fetch: this.fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Perform an INSERT into the table or view.
	*
	* By default, inserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to insert. Pass an object to insert a single row
	* or an array to insert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count inserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. Only applies for bulk
	* inserts.
	*
	* @category Database
	*
	* @example Create a record
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	* ```
	*
	* @exampleSql Create a record
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record
	* ```json
	* {
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT INSERT ON public.countries TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('countries').insert({ id: 1, name: 'Mordor' })
	* if (error) console.error(error)
	* ```
	*
	* @example Create a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .insert({ id: 1, name: 'Mordor' })
	*   .select()
	* ```
	*
	* @exampleSql Create a record and return it
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Create a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Mordor"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Bulk create
	* A bulk create operation is handled in a single transaction.
	* If any of the inserts fail, none of the rows are inserted.
	*
	* @example Bulk create
	* ```ts
	* const { error } = await supabase
	*   .from('countries')
	*   .insert([
	*     { id: 1, name: 'Mordor' },
	*     { id: 1, name: 'The Shire' },
	*   ])
	* ```
	*
	* @exampleSql Bulk create
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	* ```
	*
	* @exampleResponse Bulk create
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (id)=(1) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"countries_pkey\""
	*   },
	*   "status": 409,
	*   "statusText": ""
	* }
	* ```
	*/ insert(values, { count, defaultToNull = true } = {}) {
        var _this$fetch;
        const method = "POST";
        const { url, headers } = this.cloneRequestState();
        if (count) headers.append("Prefer", `count=${count}`);
        if (!defaultToNull) headers.append("Prefer", `missing=default`);
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            body: values,
            fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Perform an UPSERT on the table or view. Depending on the column(s) passed
	* to `onConflict`, `.upsert()` allows you to perform the equivalent of
	* `.insert()` if a row with the corresponding `onConflict` columns doesn't
	* exist, or if it does exist, perform an alternative action depending on
	* `ignoreDuplicates`.
	*
	* By default, upserted rows are not returned. To return it, chain the call
	* with `.select()`.
	*
	* @param values - The values to upsert with. Pass an object to upsert a
	* single row or an array to upsert multiple rows.
	*
	* @param options - Named parameters
	*
	* @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
	* duplicate rows are determined. Two rows are duplicates if all the
	* `onConflict` columns are equal.
	*
	* @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
	* `false`, duplicate rows are merged with existing rows.
	*
	* @param options.count - Count algorithm to use to count upserted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @param options.defaultToNull - Make missing fields default to `null`.
	* Otherwise, use the default value for the column. This only applies when
	* inserting new rows, not when merging with existing rows under
	* `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
	*
	* @example Upsert a single row using a unique key
	* ```ts
	* // Upserting a single row, overwriting based on the 'username' unique column
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ username: 'supabot' }, { onConflict: 'username' })
	*
	* // Example response:
	* // {
	* //   data: [
	* //     { id: 4, message: 'bar', username: 'supabot' }
	* //   ],
	* //   error: null
	* // }
	* ```
	*
	* @example Upsert with conflict resolution and exact row counting
	* ```ts
	* // Upserting and returning exact count
	* const { data, error, count } = await supabase
	*   .from('users')
	*   .upsert(
	*     {
	*       id: 3,
	*       message: 'foo',
	*       username: 'supabot'
	*     },
	*     {
	*       onConflict: 'username',
	*       count: 'exact'
	*     }
	*   )
	*
	* // Example response:
	* // {
	* //   data: [
	* //     {
	* //       id: 42,
	* //       handle: "saoirse",
	* //       display_name: "Saoirse"
	* //     }
	* //   ],
	* //   count: 1,
	* //   error: null
	* // }
	* ```
	*
	* @category Database
	*
	* @remarks
	* - Primary keys must be included in `values` to use upsert.
	*
	* @example Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert({ id: 1, name: 'piano' })
	*   .select()
	* ```
	*
	* @exampleSql Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT INSERT, UPDATE ON public.instruments TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase.from('instruments').upsert({ id: 1, name: 'piano' }).select()
	* if (error) console.error(error)
	* ```
	*
	* @example Bulk Upsert your data
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .upsert([
	*     { id: 1, name: 'piano' },
	*     { id: 2, name: 'harp' },
	*   ])
	*   .select()
	* ```
	*
	* @exampleSql Bulk Upsert your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Bulk Upsert your data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     },
	*     {
	*       "id": 2,
	*       "name": "harp"
	*     }
	*   ],
	*   "status": 201,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Upserting into tables with constraints
	* In the following query, `upsert()` implicitly uses the `id`
	* (primary key) column to determine conflicts. If there is no existing
	* row with the same `id`, `upsert()` inserts a new row, which
	* will fail in this case as there is already a row with `handle` `"saoirse"`.
	* Using the `onConflict` option, you can instruct `upsert()` to use
	* another column with a unique constraint to determine conflicts.
	*
	* @example Upserting into tables with constraints
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .upsert({ id: 42, handle: 'saoirse', display_name: 'Saoirse' })
	*   .select()
	* ```
	*
	* @exampleSql Upserting into tables with constraints
	* ```sql
	* create table
	*   users (
	*     id int8 generated by default as identity primary key,
	*     handle text not null unique,
	*     display_name text
	*   );
	*
	* insert into
	*   users (id, handle, display_name)
	* values
	*   (1, 'saoirse', null);
	* ```
	*
	* @exampleResponse Upserting into tables with constraints
	* ```json
	* {
	*   "error": {
	*     "code": "23505",
	*     "details": "Key (handle)=(saoirse) already exists.",
	*     "hint": null,
	*     "message": "duplicate key value violates unique constraint \"users_handle_key\""
	*   },
	*   "status": 409,
	*   "statusText": ""
	* }
	* ```
	*/ upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        var _this$fetch2;
        const method = "POST";
        const { url, headers } = this.cloneRequestState();
        headers.append("Prefer", `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`);
        if (onConflict !== void 0) url.searchParams.set("on_conflict", onConflict);
        if (count) headers.append("Prefer", `count=${count}`);
        if (!defaultToNull) headers.append("Prefer", "missing=default");
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            body: values,
            fetch: (_this$fetch2 = this.fetch) !== null && _this$fetch2 !== void 0 ? _this$fetch2 : fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Perform an UPDATE on the table or view.
	*
	* By default, updated rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param values - The values to update with
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count updated rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @category Database
	*
	* @remarks
	* - `update()` should always be combined with [Filters](/docs/reference/javascript/using-filters) to target the item(s) you wish to update.
	*
	* @example Updating your data
	* ```ts
	* const { error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	* ```
	*
	* @exampleSql Updating your data
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Updating your data
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT UPDATE ON public.instruments TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('instruments').update({ name: 'piano' }).eq('id', 1)
	* if (error) console.error(error)
	* ```
	*
	* @example Update a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('instruments')
	*   .update({ name: 'piano' })
	*   .eq('id', 1)
	*   .select()
	* ```
	*
	* @exampleSql Update a record and return it
	* ```sql
	* create table
	*   instruments (id int8 primary key, name text);
	*
	* insert into
	*   instruments (id, name)
	* values
	*   (1, 'harpsichord');
	* ```
	*
	* @exampleResponse Update a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "piano"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Updating JSON data
	* Postgres offers some
	* [operators](/docs/guides/database/json#query-the-jsonb-data) for
	* working with JSON data. Currently, it is only possible to update the entire JSON document.
	*
	* @example Updating JSON data
	* ```ts
	* const { data, error } = await supabase
	*   .from('users')
	*   .update({
	*     address: {
	*       street: 'Melrose Place',
	*       postcode: 90210
	*     }
	*   })
	*   .eq('address->postcode', 90210)
	*   .select()
	* ```
	*
	* @exampleSql Updating JSON data
	* ```sql
	* create table
	*   users (
	*     id int8 primary key,
	*     name text,
	*     address jsonb
	*   );
	*
	* insert into
	*   users (id, name, address)
	* values
	*   (1, 'Michael', '{ "postcode": 90210 }');
	* ```
	*
	* @exampleResponse Updating JSON data
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Michael",
	*       "address": {
	*         "street": "Melrose Place",
	*         "postcode": 90210
	*       }
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ update(values, { count } = {}) {
        var _this$fetch3;
        const method = "PATCH";
        const { url, headers } = this.cloneRequestState();
        if (count) headers.append("Prefer", `count=${count}`);
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            body: values,
            fetch: (_this$fetch3 = this.fetch) !== null && _this$fetch3 !== void 0 ? _this$fetch3 : fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Perform a DELETE on the table or view.
	*
	* By default, deleted rows are not returned. To return it, chain the call
	* with `.select()` after filters.
	*
	* @param options - Named parameters
	*
	* @param options.count - Count algorithm to use to count deleted rows.
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @category Database
	*
	* @remarks
	* - `delete()` should always be combined with [filters](/docs/reference/javascript/using-filters) to target the item(s) you wish to delete.
	* - If you use `delete()` with filters and you have
	*   [RLS](/docs/learn/auth-deep-dive/auth-row-level-security) enabled, only
	*   rows visible through `SELECT` policies are deleted. Note that by default
	*   no rows are visible, so you need at least one `SELECT`/`ALL` policy that
	*   makes the rows visible.
	* - When using `delete().in()`, specify an array of values to target multiple rows with a single query. This is particularly useful for batch deleting entries that share common criteria, such as deleting users by their IDs. Ensure that the array you provide accurately represents all records you intend to delete to avoid unintended data removal.
	*
	* @example Delete a single record
	* ```ts
	* const response = await supabase
	*   .from('countries')
	*   .delete()
	*   .eq('id', 1)
	* ```
	*
	* @exampleSql Delete a single record
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Mordor');
	* ```
	*
	* @exampleResponse Delete a single record
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*
	* @exampleDescription Handling errors
	* `error.hint` from Postgres often contains the actionable fix (e.g. `"Grant the required privileges to the current role with: GRANT DELETE ON public.countries TO anon;"` for a `42501` permission-denied error). Log the full `error` object so it isn't hidden behind `error.message`.
	*
	* @example Handling errors
	* ```js
	* const { error } = await supabase.from('countries').delete().eq('id', 1)
	* if (error) console.error(error)
	* ```
	*
	* @example Delete a record and return it
	* ```ts
	* const { data, error } = await supabase
	*   .from('countries')
	*   .delete()
	*   .eq('id', 1)
	*   .select()
	* ```
	*
	* @exampleSql Delete a record and return it
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Mordor');
	* ```
	*
	* @exampleResponse Delete a record and return it
	* ```json
	* {
	*   "data": [
	*     {
	*       "id": 1,
	*       "name": "Mordor"
	*     }
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Delete multiple records
	* ```ts
	* const response = await supabase
	*   .from('countries')
	*   .delete()
	*   .in('id', [1, 2, 3])
	* ```
	*
	* @exampleSql Delete multiple records
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Rohan'), (2, 'The Shire'), (3, 'Mordor');
	* ```
	*
	* @exampleResponse Delete multiple records
	* ```json
	* {
	*   "status": 204,
	*   "statusText": ""
	* }
	* ```
	*/ delete({ count } = {}) {
        var _this$fetch4;
        const method = "DELETE";
        const { url, headers } = this.cloneRequestState();
        if (count) headers.append("Prefer", `count=${count}`);
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            fetch: (_this$fetch4 = this.fetch) !== null && _this$fetch4 !== void 0 ? _this$fetch4 : fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
};
//#endregion
//#region src/PostgrestClient.ts
/**
* PostgREST client.
*
* @typeParam Database - Types for the schema from the [type
* generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
*
* @typeParam SchemaName - Postgres schema to switch to. Must be a string
* literal, the same one passed to the constructor. If the schema is not
* `"public"`, this must be supplied manually.
*/ var PostgrestClient = class PostgrestClient {
    /**
	* Creates a PostgREST client.
	*
	* @param url - URL of the PostgREST endpoint
	* @param options - Named parameters
	* @param options.headers - Custom headers
	* @param options.schema - Postgres schema to switch to
	* @param options.fetch - Custom fetch
	* @param options.timeout - Optional timeout in milliseconds for all requests. When set, requests will automatically abort after this duration to prevent indefinite hangs.
	* @param options.urlLengthLimit - Maximum URL length in characters before warnings/errors are triggered. Defaults to 8000.
	* @param options.retry - Enable or disable automatic retries for transient errors.
	*   When enabled, idempotent requests (GET, HEAD, OPTIONS) that fail with network
	*   errors or HTTP 503/520 responses will be automatically retried up to 3 times
	*   with exponential backoff (1s, 2s, 4s). Defaults to `true`.
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.from('profiles').select('*')
	* ```
	*
	* @category Database
	*
	* @remarks
	* - A `timeout` option (in milliseconds) can be set to automatically abort requests that take too long.
	* - A `urlLengthLimit` option (default: 8000) can be set to control when URL length warnings are included in error messages for aborted requests.
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { PostgrestClient } from '@supabase/postgrest-js'
	*
	* const postgrest = new PostgrestClient('https://xyzcompany.supabase.co/rest/v1', {
	*   headers: { apikey: 'your-publishable-key' },
	*   schema: 'public',
	*   timeout: 30000, // 30 second timeout
	* })
	* ```
	*/ constructor(url, { headers = {}, schema, fetch: fetch$1, timeout, urlLengthLimit = 8e3, retry } = {}){
        this.url = url;
        this.headers = new Headers(headers);
        this.schemaName = schema;
        this.urlLengthLimit = urlLengthLimit;
        const originalFetch = fetch$1 !== null && fetch$1 !== void 0 ? fetch$1 : globalThis.fetch;
        if (timeout !== void 0 && timeout > 0) this.fetch = (input, init)=>{
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), timeout);
            const existingSignal = init === null || init === void 0 ? void 0 : init.signal;
            if (existingSignal) {
                if (existingSignal.aborted) {
                    clearTimeout(timeoutId);
                    return originalFetch(input, init);
                }
                const abortHandler = ()=>{
                    clearTimeout(timeoutId);
                    controller.abort();
                };
                existingSignal.addEventListener("abort", abortHandler, {
                    once: true
                });
                return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, {
                    signal: controller.signal
                })).finally(()=>{
                    clearTimeout(timeoutId);
                    existingSignal.removeEventListener("abort", abortHandler);
                });
            }
            return originalFetch(input, _objectSpread2(_objectSpread2({}, init), {}, {
                signal: controller.signal
            })).finally(()=>clearTimeout(timeoutId));
        };
        else this.fetch = originalFetch;
        this.retry = retry;
    }
    from(relation) {
        if (!relation || typeof relation !== "string" || relation.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
        return new PostgrestQueryBuilder(new URL(`${this.url}/${relation}`), {
            headers: new Headers(this.headers),
            schema: this.schemaName,
            fetch: this.fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*
	* @category Database
	*/ schema(schema) {
        return new PostgrestClient(this.url, {
            headers: this.headers,
            schema,
            fetch: this.fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
    /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*
	* @example
	* ```ts
	* // For cross-schema functions where type inference fails, use overrideTypes:
	* const { data } = await supabase
	*   .schema('schema_b')
	*   .rpc('function_a', {})
	*   .overrideTypes<{ id: string; user_id: string }[]>()
	* ```
	*
	* @category Database
	*
	* @example Call a Postgres function without arguments
	* ```ts
	* const { data, error } = await supabase.rpc('hello_world')
	* ```
	*
	* @exampleSql Call a Postgres function without arguments
	* ```sql
	* create function hello_world() returns text as $$
	*   select 'Hello world';
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function without arguments
	* ```json
	* {
	*   "data": "Hello world",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Call a Postgres function with arguments
	* ```ts
	* const { data, error } = await supabase.rpc('echo', { say: '👋' })
	* ```
	*
	* @exampleSql Call a Postgres function with arguments
	* ```sql
	* create function echo(say text) returns text as $$
	*   select say;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function with arguments
	* ```json
	*   {
	*     "data": "👋",
	*     "status": 200,
	*     "statusText": "OK"
	*   }
	*
	* ```
	*
	* @exampleDescription Bulk processing
	* You can process large payloads by passing in an array as an argument.
	*
	* @example Bulk processing
	* ```ts
	* const { data, error } = await supabase.rpc('add_one_each', { arr: [1, 2, 3] })
	* ```
	*
	* @exampleSql Bulk processing
	* ```sql
	* create function add_one_each(arr int[]) returns int[] as $$
	*   select array_agg(n + 1) from unnest(arr) as n;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Bulk processing
	* ```json
	* {
	*   "data": [
	*     2,
	*     3,
	*     4
	*   ],
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @exampleDescription Call a Postgres function with filters
	* Postgres functions that return tables can also be combined with [Filters](/docs/reference/javascript/using-filters) and [Modifiers](/docs/reference/javascript/using-modifiers).
	*
	* @example Call a Postgres function with filters
	* ```ts
	* const { data, error } = await supabase
	*   .rpc('list_stored_countries')
	*   .eq('id', 1)
	*   .single()
	* ```
	*
	* @exampleSql Call a Postgres function with filters
	* ```sql
	* create table
	*   countries (id int8 primary key, name text);
	*
	* insert into
	*   countries (id, name)
	* values
	*   (1, 'Rohan'),
	*   (2, 'The Shire');
	*
	* create function list_stored_countries() returns setof countries as $$
	*   select * from countries;
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a Postgres function with filters
	* ```json
	* {
	*   "data": {
	*     "id": 1,
	*     "name": "Rohan"
	*   },
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*
	* @example Call a read-only Postgres function
	* ```ts
	* const { data, error } = await supabase.rpc('hello_world', undefined, { get: true })
	* ```
	*
	* @exampleSql Call a read-only Postgres function
	* ```sql
	* create function hello_world() returns text as $$
	*   select 'Hello world';
	* $$ language sql;
	* ```
	*
	* @exampleResponse Call a read-only Postgres function
	* ```json
	* {
	*   "data": "Hello world",
	*   "status": 200,
	*   "statusText": "OK"
	* }
	* ```
	*/ rpc(fn, args = {}, { head = false, get = false, count } = {}) {
        var _this$fetch;
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        const _isObject = (v)=>v !== null && typeof v === "object" && (!Array.isArray(v) || v.some(_isObject));
        const _hasObjectArg = head && Object.values(args).some(_isObject);
        if (_hasObjectArg) {
            method = "POST";
            body = args;
        } else if (head || get) {
            method = head ? "HEAD" : "GET";
            Object.entries(args).filter(([_, value])=>value !== void 0).map(([name, value])=>[
                    name,
                    Array.isArray(value) ? `{${value.join(",")}}` : `${value}`
                ]).forEach(([name, value])=>{
                url.searchParams.append(name, value);
            });
        } else {
            method = "POST";
            body = args;
        }
        const headers = new Headers(this.headers);
        if (_hasObjectArg) headers.set("Prefer", count ? `count=${count},return=minimal` : "return=minimal");
        else if (count) headers.set("Prefer", `count=${count}`);
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schemaName,
            body,
            fetch: (_this$fetch = this.fetch) !== null && _this$fetch !== void 0 ? _this$fetch : fetch,
            urlLengthLimit: this.urlLengthLimit,
            retry: this.retry
        });
    }
};
//#endregion
//#region src/index.ts
var src_default = {
    PostgrestClient,
    PostgrestQueryBuilder,
    PostgrestFilterBuilder,
    PostgrestTransformBuilder,
    PostgrestBuilder,
    PostgrestError
};
;
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REALTIME_CHANNEL_STATES",
    ()=>REALTIME_CHANNEL_STATES,
    "REALTIME_LISTEN_TYPES",
    ()=>REALTIME_LISTEN_TYPES,
    "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT",
    ()=>REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
    "REALTIME_SUBSCRIBE_STATES",
    ()=>REALTIME_SUBSCRIBE_STATES,
    "default",
    ()=>RealtimeChannel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePresence$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$normalizeChannelError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/normalizeChannelError.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$channelAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/channelAdapter.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePostgresFilterBuilder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePostgresFilterBuilder.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
    REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
const REALTIME_CHANNEL_STATES = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"];
class RealtimeChannel {
    get state() {
        return this.channelAdapter.state;
    }
    set state(state) {
        this.channelAdapter.state = state;
    }
    get joinedOnce() {
        return this.channelAdapter.joinedOnce;
    }
    get timeout() {
        return this.socket.timeout;
    }
    get joinPush() {
        return this.channelAdapter.joinPush;
    }
    get rejoinTimer() {
        return this.channelAdapter.rejoinTimer;
    }
    /**
     * Creates a channel that can broadcast messages, sync presence, and listen to Postgres changes.
     *
     * The topic determines which realtime stream you are subscribing to. Config options let you
     * enable acknowledgement for broadcasts, presence tracking, or private channels.
     *
     * @category Realtime
     *
     * @example Using supabase-js (recommended)
     * ```ts
     * import { createClient } from '@supabase/supabase-js'
     *
     * const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
     * const channel = supabase.channel('room1')
     * channel
     *   .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
     *   .subscribe()
     * ```
     *
     * @example Standalone import for bundle-sensitive environments
     * ```ts
     * import RealtimeClient from '@supabase/realtime-js'
     *
     * const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
     *   params: { apikey: 'your-publishable-key' },
     * })
     * const channel = new RealtimeChannel('realtime:public:messages', { config: {} }, client)
     * ```
     */ constructor(/** Topic name can be any string. */ topic, params = {
        config: {}
    }, socket){
        var _a, _b;
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.subTopic = topic.replace(/^realtime:/i, '');
        this.params.config = Object.assign({
            broadcast: {
                ack: false,
                self: false
            },
            presence: {
                key: '',
                enabled: false
            },
            private: false
        }, params.config);
        this.channelAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$channelAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this.socket.socketAdapter, topic, this.params);
        this.presence = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePresence$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this);
        this._onClose(()=>{
            this.socket._remove(this);
        });
        this._updateFilterTransform();
        this.broadcastEndpointURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["httpEndpointURL"])(this.socket.socketAdapter.endPointURL());
        this.private = this.params.config.private || false;
        if (!this.private && ((_b = (_a = this.params.config) === null || _a === void 0 ? void 0 : _a.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) {
            throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
        }
    }
    /**
     * Subscribe registers your client with the server.
     *
     * The optional `callback` receives a `status` and, on failure, an `err` argument.
     * Log the full `err` so its `cause`, `name`, and any structured fields aren't hidden
     * behind `err.message`.
     *
     * @category Realtime
     *
     * @example Handling errors
     * ```js
     * supabase.channel('room1').subscribe((status, err) => {
     *   if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
     *     // Log the full error: its `cause` often holds the underlying reason.
     *     console.error(status, err)
     *   }
     * })
     * ```
     */ subscribe(callback, timeout = this.timeout) {
        var _a, _b, _c;
        if (!this.socket.isConnected()) {
            this.socket.connect();
        }
        if (this.channelAdapter.isClosed()) {
            const { config: { broadcast, presence, private: isPrivate } } = this.params;
            const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r)=>r.filter)) !== null && _b !== void 0 ? _b : [];
            const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence: Object.assign(Object.assign({}, presence), {
                    enabled: presence_enabled
                }),
                postgres_changes,
                private: isPrivate
            };
            if (this.socket.accessTokenValue) {
                accessTokenPayload.access_token = this.socket.accessTokenValue;
            }
            this._onError((reason)=>{
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$normalizeChannelError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeChannelError"])(reason));
            });
            this._onClose(()=>callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
            this.updateJoinPayload(Object.assign({
                config
            }, accessTokenPayload));
            this._updateFilterMessage();
            this.channelAdapter.subscribe(timeout).receive('ok', async ({ postgres_changes })=>{
                // Only refresh auth if using callback-based tokens
                if (!this.socket._isManualToken()) {
                    this.socket.setAuth();
                }
                if (postgres_changes === undefined) {
                    callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                    return;
                }
                this._updatePostgresBindings(postgres_changes, callback);
            }).receive('error', (error)=>{
                this.state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].errored;
                const message = Object.values(error).join(', ') || 'error';
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(message, {
                    cause: error
                }));
            }).receive('timeout', ()=>{
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
            });
        }
        return this;
    }
    _updatePostgresBindings(postgres_changes, callback) {
        var _a;
        const clientPostgresBindings = this.bindings.postgres_changes;
        const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
        const newPostgresBindings = [];
        for(let i = 0; i < bindingsLen; i++){
            const clientPostgresBinding = clientPostgresBindings[i];
            const { filter: { event, schema, table, filter } } = clientPostgresBinding;
            const serverPostgresFilter = postgres_changes && postgres_changes[i];
            if (serverPostgresFilter && serverPostgresFilter.event === event && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.schema, schema) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.table, table) && RealtimeChannel.isFilterValueEqual(serverPostgresFilter.filter, filter)) {
                newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), {
                    id: serverPostgresFilter.id
                }));
            } else {
                this.unsubscribe();
                this.state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].errored;
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error('mismatch between server and client bindings for postgres changes'));
                return;
            }
        }
        this.bindings.postgres_changes = newPostgresBindings;
        if (this.state != __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].errored && callback) {
            callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
        }
    }
    /**
     * Returns the current presence state for this channel.
     *
     * The shape is a map keyed by presence key (for example a user id) where each entry contains the
     * tracked metadata for that user.
     *
     * @category Realtime
     */ presenceState() {
        return this.presence.state;
    }
    /**
     * Sends the supplied payload to the presence tracker so other subscribers can see that this
     * client is online. Use `untrack` to stop broadcasting presence for the same key.
     *
     * Tracking makes this client visible to other subscribers immediately, regardless of this
     * channel's `config.presence.enabled` setting or whether it has a `presence` listener — that
     * flag only affects whether *this* client receives presence updates from others (and, on
     * RLS-protected channels, whether it's authorized to do so).
     *
     * @category Realtime
     */ async track(payload, opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'track',
            payload
        }, opts);
    }
    /**
     * Removes the current presence state for this client.
     *
     * @category Realtime
     */ async untrack(opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'untrack'
        }, opts);
    }
    /**
     * Listen to realtime events on this channel.
     * @category Realtime
     *
     * @remarks
     * - By default, Broadcast and Presence are enabled for all projects.
     * - By default, listening to database changes is disabled for new projects due to database performance and security concerns. You can turn it on by managing Realtime's [replication](/docs/guides/api#realtime-api-overview).
     * - You can receive the "previous" data for updates and deletes by setting the table's `REPLICA IDENTITY` to `FULL` (e.g., `ALTER TABLE your_table REPLICA IDENTITY FULL;`).
     * - Row level security is not applied to delete statements. When RLS is enabled and replica identity is set to full, only the primary key is sent to clients.
     *
     * @example Listen to broadcast messages
     * ```js
     * const channel = supabase.channel("room1")
     *
     * channel.on("broadcast", { event: "cursor-pos" }, (payload) => {
     *   console.log("Cursor position received!", payload);
     * }).subscribe((status) => {
     *   if (status === "SUBSCRIBED") {
     *     channel.send({
     *       type: "broadcast",
     *       event: "cursor-pos",
     *       payload: { x: Math.random(), y: Math.random() },
     *     });
     *   }
     * });
     * ```
     *
     * @example Listen to presence sync
     * ```js
     * const channel = supabase.channel('room1')
     * channel
     *   .on('presence', { event: 'sync' }, () => {
     *     console.log('Synced presence state: ', channel.presenceState())
     *   })
     *   .subscribe(async (status) => {
     *     if (status === 'SUBSCRIBED') {
     *       await channel.track({ online_at: new Date().toISOString() })
     *     }
     *   })
     * ```
     *
     * @example Listen to presence join
     * ```js
     * const channel = supabase.channel('room1')
     * channel
     *   .on('presence', { event: 'join' }, ({ newPresences }) => {
     *     console.log('Newly joined presences: ', newPresences)
     *   })
     *   .subscribe(async (status) => {
     *     if (status === 'SUBSCRIBED') {
     *       await channel.track({ online_at: new Date().toISOString() })
     *     }
     *   })
     * ```
     *
     * @example Listen to presence leave
     * ```js
     * const channel = supabase.channel('room1')
     * channel
     *   .on('presence', { event: 'leave' }, ({ leftPresences }) => {
     *     console.log('Newly left presences: ', leftPresences)
     *   })
     *   .subscribe(async (status) => {
     *     if (status === 'SUBSCRIBED') {
     *       await channel.track({ online_at: new Date().toISOString() })
     *       await channel.untrack()
     *     }
     *   })
     * ```
     *
     * Registering the same `postgres_changes` filter more than once on a channel is a no-op: the
     * duplicate is ignored and an error is logged, since the server only ever creates one
     * subscription per distinct filter.
     *
     * @example Listen to all database changes
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: '*', schema: '*' }, payload => {
     *     console.log('Change received!', payload)
     *   })
     *   .subscribe()
     * ```
     *
     * @example Listen to a specific table
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: '*', schema: 'public', table: 'countries' }, payload => {
     *     console.log('Change received!', payload)
     *   })
     *   .subscribe()
     * ```
     *
     * @example Listen to inserts
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'countries' }, payload => {
     *     console.log('Change received!', payload)
     *   })
     *   .subscribe()
     * ```
     *
     * @exampleDescription Listen to updates
     * By default, Supabase will send only the updated record. If you want to receive the previous values as well you can
     * enable full replication for the table you are listening to:
     *
     * ```sql
     * alter table "your_table" replica identity full;
     * ```
     *
     * @example Listen to updates
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'countries' }, payload => {
     *     console.log('Change received!', payload)
     *   })
     *   .subscribe()
     * ```
     *
     * @exampleDescription Listen to deletes
     * By default, Supabase does not send deleted records. If you want to receive the deleted record you can
     * enable full replication for the table you are listening to:
     *
     * ```sql
     * alter table "your_table" replica identity full;
     * ```
     *
     * @example Listen to deletes
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'countries' }, payload => {
     *     console.log('Change received!', payload)
     *   })
     *   .subscribe()
     * ```
     *
     * @exampleDescription Listen to multiple events
     * You can chain listeners if you want to listen to multiple events for each table.
     *
     * @example Listen to multiple events
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'countries' }, handleRecordInserted)
     *   .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'countries' }, handleRecordDeleted)
     *   .subscribe()
     * ```
     *
     * @exampleDescription Listen to row level changes
     * You can listen to individual rows using the format `{table}:{col}=eq.{val}` - where `{col}` is the column name, and `{val}` is the value which you want to match.
     *
     * @example Listen to row level changes
     * ```js
     * supabase
     *   .channel('room1')
     *   .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'countries', filter: 'id=eq.200' }, handleRecordUpdated)
     *   .subscribe()
     * ```
     */ on(type, filter, callback) {
        const stateCheck = this.channelAdapter.isJoined() || this.channelAdapter.isJoining();
        const typeCheck = type === REALTIME_LISTEN_TYPES.PRESENCE || type === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
        if (stateCheck && typeCheck) {
            this.socket.log('channel', `cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
            throw new Error(`cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
        }
        return this._on(type, filter, callback);
    }
    /**
     * Sends a broadcast message explicitly via REST API.
     *
     * This method always uses the REST API endpoint regardless of WebSocket connection state.
     * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
     *
     * Payloads that are `ArrayBuffer` or `ArrayBufferView` (e.g. `Uint8Array`) are sent as
     * `application/octet-stream`; all other payloads are JSON-encoded.
     *
     * @param event The name of the broadcast event
     * @param payload Payload to be sent (required)
     * @param opts Options including timeout
     * @returns Promise resolving to object with success status, and error details if failed
     *
     * @category Realtime
     */ async httpSend(event, payload, opts = {}) {
        var _a;
        if (payload === undefined || payload === null) {
            return Promise.reject(new Error('Payload is required for httpSend()'));
        }
        const isBinary = payload instanceof ArrayBuffer || ArrayBuffer.isView(payload);
        const headers = {
            apikey: this.socket.apiKey ? this.socket.apiKey : '',
            'Content-Type': isBinary ? 'application/octet-stream' : 'application/json'
        };
        if (this.socket.accessTokenValue) {
            headers['Authorization'] = `Bearer ${this.socket.accessTokenValue}`;
        }
        const url = new URL(this.broadcastEndpointURL);
        url.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(event)}`;
        if (this.private) {
            url.searchParams.set('private', 'true');
        }
        const options = {
            method: 'POST',
            headers,
            body: isBinary ? payload : JSON.stringify(payload)
        };
        const response = await this._fetchWithTimeout(url.toString(), options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
        if (response.status === 202) {
            return {
                success: true
            };
        }
        if (response.status === 404) {
            return Promise.reject(new Error('httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. ' + 'Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. ' + 'See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md'));
        }
        let errorMessage = response.statusText;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || errorBody.message || errorMessage;
        } catch (_b) {}
        return Promise.reject(new Error(errorMessage));
    }
    /**
     * Sends a message into the channel.
     *
     * @param args Arguments to send to channel
     * @param args.type The type of event to send
     * @param args.event The name of the event being sent
     * @param args.payload Payload to be sent
     * @param opts Options to be used during the send process
     *
     * @category Realtime
     *
     * @remarks
     * - When using REST you don't need to subscribe to the channel
     * - REST calls are only available from 2.37.0 onwards
     * - If you create a channel only to send a REST broadcast, remove it from
     *   the client when the send completes
     *
     * @example Send a message via websocket
     * ```js
     * const channel = supabase.channel('room1')
     *
     * channel.subscribe((status) => {
     *   if (status === 'SUBSCRIBED') {
     *     channel.send({
     *       type: 'broadcast',
     *       event: 'cursor-pos',
     *       payload: { x: Math.random(), y: Math.random() },
     *     })
     *   }
     * })
     * ```
     *
     * @exampleResponse Send a message via websocket
     * ```js
     * ok | timed out | error
     * ```
     *
     * @example Send a message via REST
     * ```js
     * const channel = supabase.channel('room1')
     *
     * try {
     *   await channel.httpSend('cursor-pos', { x: Math.random(), y: Math.random() })
     * } finally {
     *   await supabase.removeChannel(channel)
     * }
     * ```
     */ async send(args, opts = {}) {
        var _a, _b;
        if (!this.channelAdapter.canPush() && args.type === 'broadcast') {
            console.warn('Realtime send() is automatically falling back to REST API. ' + 'This behavior will be deprecated in the future. ' + 'Please use httpSend() explicitly for REST delivery.');
            const { event, payload: endpoint_payload } = args;
            const headers = {
                apikey: this.socket.apiKey ? this.socket.apiKey : '',
                'Content-Type': 'application/json'
            };
            if (this.socket.accessTokenValue) {
                headers['Authorization'] = `Bearer ${this.socket.accessTokenValue}`;
            }
            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    messages: [
                        {
                            topic: this.subTopic,
                            event,
                            payload: endpoint_payload,
                            private: this.private
                        }
                    ]
                })
            };
            try {
                const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
                await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
                return response.ok ? 'ok' : 'error';
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return 'timed out';
                } else {
                    return 'error';
                }
            }
        } else {
            return new Promise((resolve)=>{
                var _a, _b, _c;
                const push = this.channelAdapter.push(args.type, args, opts.timeout || this.timeout);
                if (args.type === 'broadcast' && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                    resolve('ok');
                }
                push.receive('ok', ()=>resolve('ok'));
                push.receive('error', ()=>resolve('error'));
                push.receive('timeout', ()=>resolve('timed out'));
            });
        }
    }
    /**
     * Updates the payload that will be sent the next time the channel joins (reconnects).
     * Useful for rotating access tokens or updating config without re-creating the channel.
     *
     * @category Realtime
     */ updateJoinPayload(payload) {
        this.channelAdapter.updateJoinPayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     *
     * @category Realtime
     */ async unsubscribe(timeout = this.timeout) {
        return new Promise((resolve)=>{
            this.channelAdapter.unsubscribe(timeout).receive('ok', ()=>resolve('ok')).receive('timeout', ()=>resolve('timed out')).receive('error', ()=>resolve('error'));
        });
    }
    /**
     * Destroys and stops related timers.
     *
     * @category Realtime
     */ teardown() {
        this.channelAdapter.teardown();
    }
    /** @internal */ async _fetchWithTimeout(url, options, timeout) {
        const controller = new AbortController();
        const id = setTimeout(()=>controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), {
            signal: controller.signal
        }));
        clearTimeout(id);
        return response;
    }
    /** @internal */ _on(type, filter, callback) {
        var _a;
        const typeLower = type.toLocaleLowerCase();
        // Serialize a postgres_changes filter builder into its string form so the
        // rest of the pipeline (join payload, server binding match) sees a string.
        // Duck-type `build()` in addition to `instanceof` so a builder constructed
        // against a duplicate copy of the package (separate module realm) still works.
        const filterValue = filter === null || filter === void 0 ? void 0 : filter.filter;
        if (filterValue instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePostgresFilterBuilder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RealtimePostgresFilterBuilder"] || typeof filterValue === 'object' && filterValue !== null && typeof filterValue.build === 'function') {
            filter = Object.assign(Object.assign({}, filter), {
                filter: filterValue.build()
            });
        }
        // The server collapses identical postgres_changes filters, so keeping a duplicate here would
        // desync the client and server binding lists and make `subscribe()` fail with a mismatch.
        if (typeLower === REALTIME_LISTEN_TYPES.POSTGRES_CHANGES) {
            const duplicate = (_a = this.bindings[typeLower]) === null || _a === void 0 ? void 0 : _a.find((bind)=>RealtimeChannel.isSamePostgresFilter(bind.filter, filter));
            if (duplicate) {
                this.socket.log('error', `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, filter);
                return this;
            }
        }
        const ref = this.channelAdapter.on(type, callback);
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback,
            ref: ref
        };
        if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
        } else {
            this.bindings[typeLower] = [
                binding
            ];
        }
        this._updateFilterMessage();
        return this;
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */ _onClose(callback) {
        this.channelAdapter.onClose(callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */ _onError(callback) {
        this.channelAdapter.onError(callback);
    }
    /** @internal */ _updateFilterMessage() {
        this.channelAdapter.updateFilterBindings((binding, payload, ref)=>{
            var _a, _b, _c, _d, _e, _f, _g;
            const typeLower = binding.event.toLocaleLowerCase();
            if (this._notThisChannelEvent(typeLower, ref)) {
                return false;
            }
            const bind = (_a = this.bindings[typeLower]) === null || _a === void 0 ? void 0 : _a.find((bind)=>bind.ref === binding.ref);
            if (!bind) {
                return true;
            }
            if ([
                'broadcast',
                'presence',
                'postgres_changes'
            ].includes(typeLower)) {
                if ('id' in bind) {
                    const bindId = bind.id;
                    const bindEvent = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event;
                    return bindId && ((_c = payload.ids) === null || _c === void 0 ? void 0 : _c.includes(bindId)) && (bindEvent === '*' || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_d = payload.data) === null || _d === void 0 ? void 0 : _d.type.toLocaleLowerCase()));
                } else {
                    const bindEvent = (_f = (_e = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _e === void 0 ? void 0 : _e.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase();
                    return bindEvent === '*' || bindEvent === ((_g = payload === null || payload === void 0 ? void 0 : payload.event) === null || _g === void 0 ? void 0 : _g.toLocaleLowerCase());
                }
            } else {
                return bind.type.toLocaleLowerCase() === typeLower;
            }
        });
    }
    /** @internal */ _notThisChannelEvent(event, ref) {
        const { close, error, leave, join } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_EVENTS"];
        const events = [
            close,
            error,
            leave,
            join
        ];
        return ref && events.includes(event) && ref !== this.joinPush.ref;
    }
    /** @internal */ _updateFilterTransform() {
        this.channelAdapter.updatePayloadTransform((event, payload, ref)=>{
            if (typeof payload === 'object' && 'ids' in payload) {
                const postgresChanges = payload.data;
                const { schema, table, commit_timestamp, type, errors } = postgresChanges;
                const enrichedPayload = {
                    schema: schema,
                    table: table,
                    commit_timestamp: commit_timestamp,
                    eventType: type,
                    new: {},
                    old: {},
                    errors: errors
                };
                return Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            return payload;
        });
    }
    copyBindings(other) {
        if (this.joinedOnce) {
            throw new Error('cannot copy bindings into joined channel');
        }
        for(const kind in other.bindings){
            for (const binding of other.bindings[kind]){
                this._on(binding.type, binding.filter, binding.callback);
            }
        }
    }
    /**
     * Compares two optional filter values for equality.
     * Treats undefined, null, and empty string as equivalent empty values.
     * @internal
     */ static isFilterValueEqual(serverValue, clientValue) {
        const normalizedServer = serverValue !== null && serverValue !== void 0 ? serverValue : undefined;
        const normalizedClient = clientValue !== null && clientValue !== void 0 ? clientValue : undefined;
        return normalizedServer === normalizedClient;
    }
    /**
     * Two `postgres_changes` filters are the same when the server would collapse them into a single
     * subscription.
     * @internal
     */ static isSamePostgresFilter(a, b) {
        var _a, _b, _c, _d;
        const selectA = (_b = (_a = a === null || a === void 0 ? void 0 : a.select) === null || _a === void 0 ? void 0 : _a.join()) !== null && _b !== void 0 ? _b : undefined;
        const selectB = (_d = (_c = b === null || b === void 0 ? void 0 : b.select) === null || _c === void 0 ? void 0 : _c.join()) !== null && _d !== void 0 ? _d : undefined;
        return (a === null || a === void 0 ? void 0 : a.event) === (b === null || b === void 0 ? void 0 : b.event) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.schema, b === null || b === void 0 ? void 0 : b.schema) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.table, b === null || b === void 0 ? void 0 : b.table) && RealtimeChannel.isFilterValueEqual(a === null || a === void 0 ? void 0 : a.filter, b === null || b === void 0 ? void 0 : b.filter) && selectA === selectB;
    }
    /** @internal */ _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {}
        };
        if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            records.new = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertChangeData"](payload.columns, payload.record);
        }
        if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
            records.old = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertChangeData"](payload.columns, payload.old_record);
        }
        return records;
    }
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RealtimeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$websocket$2d$factory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeChannel$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$socketAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/socketAdapter.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
// Connection-related constants
const CONNECTION_TIMEOUTS = {
    HEARTBEAT_INTERVAL: 25000,
    RECONNECT_DELAY: 10,
    HEARTBEAT_TIMEOUT_FALLBACK: 100
};
const RECONNECT_INTERVALS = [
    1000,
    2000,
    5000,
    10000
];
const DEFAULT_RECONNECT_FALLBACK = 10000;
function createMemorySessionStorage() {
    const store = new Map();
    return {
        get length () {
            return store.size;
        },
        clear () {
            store.clear();
        },
        getItem (key) {
            return store.has(key) ? store.get(key) : null;
        },
        key (index) {
            var _a;
            return (_a = Array.from(store.keys())[index]) !== null && _a !== void 0 ? _a : null;
        },
        removeItem (key) {
            store.delete(key);
        },
        setItem (key, value) {
            store.set(key, String(value));
        }
    };
}
function resolveSessionStorage() {
    try {
        if (typeof globalThis !== 'undefined' && globalThis.sessionStorage) {
            return globalThis.sessionStorage;
        }
    } catch (_a) {
    // Property access on `sessionStorage` itself throws in restricted-storage browsers.
    }
    return createMemorySessionStorage();
}
const WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class RealtimeClient {
    get endPoint() {
        return this.socketAdapter.endPoint;
    }
    get timeout() {
        return this.socketAdapter.timeout;
    }
    get transport() {
        return this.socketAdapter.transport;
    }
    get heartbeatCallback() {
        return this.socketAdapter.heartbeatCallback;
    }
    get heartbeatIntervalMs() {
        return this.socketAdapter.heartbeatIntervalMs;
    }
    get heartbeatTimer() {
        if (this.worker) {
            return this._workerHeartbeatTimer;
        }
        return this.socketAdapter.heartbeatTimer;
    }
    get pendingHeartbeatRef() {
        if (this.worker) {
            return this._pendingWorkerHeartbeatRef;
        }
        return this.socketAdapter.pendingHeartbeatRef;
    }
    get reconnectTimer() {
        return this.socketAdapter.reconnectTimer;
    }
    get vsn() {
        return this.socketAdapter.vsn;
    }
    get encode() {
        return this.socketAdapter.encode;
    }
    get decode() {
        return this.socketAdapter.decode;
    }
    get reconnectAfterMs() {
        return this.socketAdapter.reconnectAfterMs;
    }
    get sendBuffer() {
        return this.socketAdapter.sendBuffer;
    }
    get stateChangeCallbacks() {
        return this.socketAdapter.stateChangeCallbacks;
    }
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.heartbeatCallback The optional function to handle heartbeat status and latency.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.logLevel Sets the log level for Realtime
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     * @param options.worker Use Web Worker to set a side flow. Defaults to false.
     * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
     * @param options.vsn The protocol version to use when connecting. Supported versions are "1.0.0" and "2.0.0". Defaults to "2.0.0".
     *
     * @category Realtime
     *
     * @example Using supabase-js (recommended)
     * ```ts
     * import { createClient } from '@supabase/supabase-js'
     *
     * const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
     * const channel = supabase.channel('room1')
     * channel
     *   .on('broadcast', { event: 'cursor-pos' }, (payload) => console.log(payload))
     *   .subscribe()
     * ```
     *
     * @example Standalone import for bundle-sensitive environments
     * ```ts
     * import RealtimeClient from '@supabase/realtime-js'
     *
     * const client = new RealtimeClient('https://xyzcompany.supabase.co/realtime/v1', {
     *   params: { apikey: 'your-publishable-key' },
     * })
     * client.connect()
     * ```
     */ constructor(endPoint, options){
        var _a;
        this.channels = new Array();
        this.accessTokenValue = null;
        this.accessToken = null;
        this.apiKey = null;
        this.httpEndpoint = '';
        /** @deprecated headers cannot be set on websocket connections */ this.headers = {};
        this.params = {};
        this.ref = 0;
        this.serializer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$serializer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]();
        this._manuallySetToken = false;
        this._authPromise = null;
        this._authGeneration = 0;
        this._workerHeartbeatTimer = undefined;
        this._pendingWorkerHeartbeatRef = null;
        this._pendingDisconnectTimer = null;
        this._disconnectOnEmptyChannelsAfterMs = 0;
        /**
         * Use either custom fetch, if provided, or default fetch to make HTTP requests
         *
         * @internal
         */ this._resolveFetch = (customFetch)=>{
            if (customFetch) {
                return (...args)=>customFetch(...args);
            }
            return (...args)=>fetch(...args);
        };
        // Validate required parameters
        if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) {
            throw new Error('API key is required to connect to Realtime');
        }
        this.apiKey = options.params.apikey;
        const socketAdapterOptions = this._initializeOptions(options);
        this.socketAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$socketAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](endPoint, socketAdapterOptions);
        this.httpEndpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$transformers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["httpEndpointURL"])(endPoint);
        this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
    }
    /**
     * Connects the socket, unless already connected.
     *
     * @category Realtime
     */ connect() {
        // Skip if already connecting, disconnecting, or connected
        if (this.isConnecting() || this.isDisconnecting() || this.isConnected()) {
            return;
        }
        // Trigger auth if needed and not already in progress
        // This ensures auth is called for standalone RealtimeClient usage
        // while avoiding race conditions with SupabaseClient's immediate setAuth call
        if (this.accessToken && !this._authPromise) {
            this._setAuthSafely('connect');
        }
        this._setupConnectionHandlers();
        try {
            this.socketAdapter.connect();
        } catch (error) {
            const errorMessage = error.message;
            throw new Error(`WebSocket not available: ${errorMessage}`);
        }
        this._handleNodeJsRaceCondition();
    }
    /**
     * Returns the URL of the websocket.
     * @returns string The URL of the websocket.
     *
     * @category Realtime
     */ endpointURL() {
        return this.socketAdapter.endPointURL();
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     *
     * @category Realtime
     */ async disconnect(code, reason) {
        this._cancelPendingDisconnect();
        if (this.isDisconnecting()) {
            return 'ok';
        }
        return await this.socketAdapter.disconnect(()=>{
            clearInterval(this._workerHeartbeatTimer);
            this._terminateWorker();
        }, code, reason);
    }
    /**
     * Returns all created channels
     *
     * @category Realtime
     */ getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes, removes and tears down a single channel
     * @param channel A RealtimeChannel instance
     *
     * @category Realtime
     */ async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (status === 'ok') {
            channel.teardown();
        }
        return status;
    }
    /**
     * Unsubscribes, removes and tears down all channels
     *
     * @category Realtime
     */ async removeAllChannels() {
        const promises = this.channels.map(async (channel)=>{
            const result = await channel.unsubscribe();
            channel.teardown();
            return result;
        });
        const result = await Promise.all(promises);
        await this.disconnect();
        return result;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden in Client constructor.
     *
     * @category Realtime
     */ log(kind, msg, data) {
        this.socketAdapter.log(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     *
     * @category Realtime
     */ connectionState() {
        return this.socketAdapter.connectionState() || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CONNECTION_STATE"].closed;
    }
    /**
     * Returns `true` is the connection is open.
     *
     * @category Realtime
     */ isConnected() {
        return this.socketAdapter.isConnected();
    }
    /**
     * Returns `true` if the connection is currently connecting.
     *
     * @category Realtime
     */ isConnecting() {
        return this.socketAdapter.isConnecting();
    }
    /**
     * Returns `true` if the connection is currently disconnecting.
     *
     * @category Realtime
     */ isDisconnecting() {
        return this.socketAdapter.isDisconnecting();
    }
    /**
     * Creates (or reuses) a {@link RealtimeChannel} for the provided topic.
     *
     * Topics are automatically prefixed with `realtime:` to match the Realtime service.
     * If a channel with the same topic already exists it will be returned instead of creating
     * a duplicate connection.
     *
     * @category Realtime
     */ channel(topic, params = {
        config: {}
    }) {
        const realtimeTopic = `realtime:${topic}`;
        const exists = this.getChannels().find((c)=>c.topic === realtimeTopic);
        if (!exists) {
            const chan = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeChannel$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"](`realtime:${topic}`, params, this);
            this._cancelPendingDisconnect();
            this.channels.push(chan);
            return chan;
        } else {
            return exists;
        }
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     *
     * @category Realtime
     */ push(data) {
        this.socketAdapter.push(data);
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * If param is null it will use the `accessToken` callback function or the token set on the client.
     *
     * On callback used, it will set the value of the token internal to the client.
     *
     * When a token is explicitly provided AND no `accessToken` callback is configured,
     * it will be preserved across channel operations (including removeChannel and
     * resubscribe) and the client stays in manual-token mode.
     *
     * When an `accessToken` callback IS configured, the callback is the source of truth:
     * the client remains in callback mode and continues to refresh from it on heartbeat,
     * even after a bootstrap/override `setAuth(token)` call.
     *
     * @param token A JWT string to override the token set on the client.
     *
     * @example Setting the authorization header
     * // Use a manual token (preserved across resubscribes when no accessToken callback is set)
     * client.realtime.setAuth('my-custom-jwt')
     *
     * // Switch back to using the accessToken callback
     * client.realtime.setAuth()
     *
     * @category Realtime
     */ async setAuth(token = null) {
        const authGeneration = ++this._authGeneration;
        const authPromise = this._performAuth(token, authGeneration);
        if (authGeneration === this._authGeneration) {
            this._authPromise = authPromise;
        }
        try {
            await authPromise;
        } finally{
            if (this._authPromise === authPromise) {
                this._authPromise = null;
            }
        }
    }
    /**
     * Returns true if the current access token was explicitly set via setAuth(token),
     * false if it was obtained via the accessToken callback.
     * @internal
     */ _isManualToken() {
        return this._manuallySetToken;
    }
    /**
     * Sends a heartbeat message if the socket is connected.
     *
     * @category Realtime
     */ async sendHeartbeat() {
        this.socketAdapter.sendHeartbeat();
    }
    /**
     * Sets a callback that receives lifecycle events for internal heartbeat messages.
     * Useful for instrumenting connection health (e.g. sent/ok/timeout).
     *
     * @category Realtime
     */ onHeartbeat(callback) {
        this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(callback);
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */ _makeRef() {
        return this.socketAdapter.makeRef();
    }
    /**
     * Removes a channel from RealtimeClient
     *
     * @param channel An open subscription.
     *
     * @internal
     */ _remove(channel) {
        this.channels = this.channels.filter((c)=>c.topic !== channel.topic);
        if (this.channels.length === 0) {
            this.log('transport', 'no channels remaining, scheduling disconnect');
            this._schedulePendingDisconnect();
        }
    }
    /** @internal */ _schedulePendingDisconnect() {
        this._cancelPendingDisconnect();
        if (this._disconnectOnEmptyChannelsAfterMs === 0) {
            this.log('transport', 'disconnecting immediately - no channels');
            this.disconnect();
            return;
        }
        this._pendingDisconnectTimer = setTimeout(()=>{
            this._pendingDisconnectTimer = null;
            if (this.channels.length === 0) {
                this.log('transport', 'deferred disconnect fired - no channels, disconnecting');
                this.disconnect();
            }
        }, this._disconnectOnEmptyChannelsAfterMs);
        this.log('transport', `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
    }
    /** @internal */ _cancelPendingDisconnect() {
        if (this._pendingDisconnectTimer !== null) {
            this.log('transport', 'pending disconnect cancelled - channel activity detected');
            clearTimeout(this._pendingDisconnectTimer);
            this._pendingDisconnectTimer = null;
        }
    }
    /**
     * Perform the actual auth operation
     * @internal
     */ async _performAuth(token, authGeneration) {
        let tokenToSend;
        let isManualToken = false;
        if (token) {
            tokenToSend = token;
            // Track if this is a manually-provided token
            isManualToken = true;
        } else if (this.accessToken) {
            // Call the accessToken callback to get fresh token
            try {
                tokenToSend = await this.accessToken();
            } catch (e) {
                this.log('error', 'Error fetching access token from callback', e);
                // Fall back to cached value if callback fails
                tokenToSend = this.accessTokenValue;
            }
        } else {
            tokenToSend = this.accessTokenValue;
        }
        if (authGeneration !== this._authGeneration) {
            return;
        }
        // Track whether this token was manually set or fetched via callback.
        // The callback is the source of truth for token refresh
        if (this.accessToken) {
            this._manuallySetToken = false;
        } else if (isManualToken) {
            this._manuallySetToken = true;
        }
        if (this.accessTokenValue != tokenToSend) {
            this.accessTokenValue = tokenToSend;
            this.channels.forEach((channel)=>{
                const payload = {
                    access_token: tokenToSend,
                    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_VERSION"]
                };
                channel.updateJoinPayload(payload);
                if (channel.joinedOnce && channel.channelAdapter.isJoined()) {
                    channel.channelAdapter.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_EVENTS"].access_token, {
                        access_token: tokenToSend
                    });
                }
            });
        }
    }
    /**
     * Wait for any in-flight auth operations to complete
     * @internal
     */ async _waitForAuthIfNeeded() {
        if (this._authPromise) {
            await this._authPromise;
        }
    }
    /**
     * Safely call setAuth with standardized error handling
     * @internal
     */ _setAuthSafely(context = 'general') {
        // Only refresh auth if using callback-based tokens
        if (!this._isManualToken()) {
            this.setAuth().catch((e)=>{
                this.log('error', `Error setting auth in ${context}`, e);
            });
        }
    }
    /** @internal */ _setupConnectionHandlers() {
        this.socketAdapter.onOpen(()=>{
            const authPromise = this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve());
            authPromise.catch((e)=>{
                this.log('error', 'error waiting for auth on connect', e);
            });
            if (this.worker && !this.workerRef) {
                this._startWorkerHeartbeat();
            }
        });
        this.socketAdapter.onClose(()=>{
            if (this.worker && this.workerRef) {
                this._terminateWorker();
            }
        });
        this.socketAdapter.onMessage((message)=>{
            if (message.ref && message.ref === this._pendingWorkerHeartbeatRef) {
                this._pendingWorkerHeartbeatRef = null;
            }
        });
    }
    /** @internal */ _handleNodeJsRaceCondition() {
        if (this.socketAdapter.isConnected()) {
            // hack: ensure onConnOpen is called
            this.socketAdapter.getSocket().onConnOpen();
        }
    }
    /** @internal */ _wrapHeartbeatCallback(heartbeatCallback) {
        return (status, latency)=>{
            if (status === 'disconnected') return;
            if (status == 'sent') this._setAuthSafely();
            if (heartbeatCallback) heartbeatCallback(status, latency);
        };
    }
    /** @internal */ _startWorkerHeartbeat() {
        if (this.workerUrl) {
            this.log('worker', `starting worker for from ${this.workerUrl}`);
        } else {
            this.log('worker', `starting default worker`);
        }
        const objectUrl = this._workerObjectUrl(this.workerUrl);
        this.workerRef = new Worker(objectUrl);
        this.workerRef.onerror = (error)=>{
            this.log('worker', 'worker error', error.message);
            this._terminateWorker();
            this.disconnect();
        };
        this.workerRef.onmessage = (event)=>{
            if (event.data.event === 'keepAlive') {
                this.sendHeartbeat();
            }
        };
        this.workerRef.postMessage({
            event: 'start',
            interval: this.heartbeatIntervalMs
        });
    }
    /**
     * Terminate the Web Worker and clear the reference
     * @internal
     */ _terminateWorker() {
        if (this.workerRef) {
            this.log('worker', 'terminating worker');
            this.workerRef.terminate();
            this.workerRef = undefined;
        }
    }
    /** @internal */ _workerObjectUrl(url) {
        let result_url;
        if (url) {
            result_url = url;
        } else {
            const blob = new Blob([
                WORKER_SCRIPT
            ], {
                type: 'application/javascript'
            });
            result_url = URL.createObjectURL(blob);
        }
        return result_url;
    }
    /**
     * Initialize socket options with defaults
     * @internal
     */ _initializeOptions(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.worker = (_a = options === null || options === void 0 ? void 0 : options.worker) !== null && _a !== void 0 ? _a : false;
        this.accessToken = (_b = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _b !== void 0 ? _b : null;
        const result = {};
        result.timeout = (_c = options === null || options === void 0 ? void 0 : options.timeout) !== null && _c !== void 0 ? _c : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_TIMEOUT"];
        result.heartbeatIntervalMs = (_d = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _d !== void 0 ? _d : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
        this._disconnectOnEmptyChannelsAfterMs = (_e = options === null || options === void 0 ? void 0 : options.disconnectOnEmptyChannelsAfterMs) !== null && _e !== void 0 ? _e : 2 * ((_f = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _f !== void 0 ? _f : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL);
        // @ts-ignore - mismatch between phoenix and supabase
        result.transport = (_g = options === null || options === void 0 ? void 0 : options.transport) !== null && _g !== void 0 ? _g : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$websocket$2d$factory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getWebSocketConstructor();
        result.params = options === null || options === void 0 ? void 0 : options.params;
        result.logger = options === null || options === void 0 ? void 0 : options.logger;
        result.heartbeatCallback = this._wrapHeartbeatCallback(options === null || options === void 0 ? void 0 : options.heartbeatCallback);
        result.sessionStorage = (_h = options === null || options === void 0 ? void 0 : options.sessionStorage) !== null && _h !== void 0 ? _h : resolveSessionStorage();
        result.reconnectAfterMs = (_j = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _j !== void 0 ? _j : (tries)=>{
            return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
        };
        let defaultEncode;
        let defaultDecode;
        const vsn = (_k = options === null || options === void 0 ? void 0 : options.vsn) !== null && _k !== void 0 ? _k : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_VSN"];
        switch(vsn){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VSN_1_0_0"]:
                defaultEncode = (payload, callback)=>{
                    return callback(JSON.stringify(payload));
                };
                defaultDecode = (payload, callback)=>{
                    return callback(JSON.parse(payload));
                };
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VSN_2_0_0"]:
                defaultEncode = this.serializer.encode.bind(this.serializer);
                defaultDecode = this.serializer.decode.bind(this.serializer);
                break;
            default:
                throw new Error(`Unsupported serializer version: ${result.vsn}`);
        }
        result.vsn = vsn;
        result.encode = (_l = options === null || options === void 0 ? void 0 : options.encode) !== null && _l !== void 0 ? _l : defaultEncode;
        result.decode = (_m = options === null || options === void 0 ? void 0 : options.decode) !== null && _m !== void 0 ? _m : defaultDecode;
        result.beforeReconnect = this._reconnectAuth.bind(this);
        if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
            this.logLevel = options.logLevel || options.log_level;
            result.params = Object.assign(Object.assign({}, result.params), {
                log_level: this.logLevel
            });
        }
        // Handle worker setup
        if (this.worker) {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
            result.autoSendHeartbeat = !this.worker;
        }
        return result;
    }
    /** @internal */ async _reconnectAuth() {
        await this._waitForAuthIfNeeded();
        if (!this.isConnected()) {
            this.connect();
        }
    }
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript) <export default as RealtimeClient>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealtimeClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePostgresFilterBuilder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealtimePostgresFilterBuilder",
    ()=>RealtimePostgresFilterBuilder,
    "postgresChangesFilter",
    ()=>postgresChangesFilter
]);
// Reserved characters that force PostgREST-style quoting: `[,()]` (which the
// server reads as condition/list delimiters) plus `"`/`\` (escaped inside quotes).
const PostgrestReservedCharsRegexp = /[,()"\\]/;
const needsQuoting = (value)=>PostgrestReservedCharsRegexp.test(value) || value !== value.trim();
const quote = (value)=>`"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
const serializeScalar = (value)=>{
    const serialized = value === null ? 'null' : String(value);
    return needsQuoting(serialized) ? quote(serialized) : serialized;
};
const serializeIsValue = (value)=>value === null ? 'null' : String(value);
// Builds the `operator.value` portion of a filter (everything after `column=`).
const serialize = (operator, value)=>{
    if (operator === 'in') {
        const values = Array.isArray(value) ? value : [
            value
        ];
        if (values.length === 0) {
            throw new Error('Realtime `in` filter requires at least one value.');
        }
        const items = Array.from(new Set(values)).map((v)=>serializeScalar(v)).join(',');
        return `in.(${items})`;
    }
    if (operator === 'is') {
        return `is.${serializeIsValue(value)}`;
    }
    return `${operator}.${serializeScalar(value)}`;
};
class RealtimePostgresFilterBuilder {
    constructor(){
        this.filters = [];
    }
    add(column, operator, value, negate = false) {
        const prefix = negate ? 'not.' : '';
        this.filters.push(`${column}=${prefix}${serialize(operator, value)}`);
        return this;
    }
    /** Match rows where `column` equals `value` (`column=eq.value`). */ eq(column, value) {
        return this.add(column, 'eq', value);
    }
    /** Match rows where `column` does not equal `value` (`column=neq.value`). */ neq(column, value) {
        return this.add(column, 'neq', value);
    }
    /** Match rows where `column` is greater than `value` (`column=gt.value`). */ gt(column, value) {
        return this.add(column, 'gt', value);
    }
    /** Match rows where `column` is greater than or equal to `value` (`column=gte.value`). */ gte(column, value) {
        return this.add(column, 'gte', value);
    }
    /** Match rows where `column` is less than `value` (`column=lt.value`). */ lt(column, value) {
        return this.add(column, 'lt', value);
    }
    /** Match rows where `column` is less than or equal to `value` (`column=lte.value`). */ lte(column, value) {
        return this.add(column, 'lte', value);
    }
    /**
     * Match rows where `column` is one of `values` (`column=in.(a,b,c)`).
     * Requires at least one value; duplicates are removed. An element containing a
     * reserved character is double-quoted (`in.("a,b",c)`), so commas inside an
     * element are preserved. `null` is intentionally not accepted (`IN (null)`
     * never matches in SQL) — use `is`/`not('col','is',null)` for null checks.
     */ in(column, values) {
        return this.add(column, 'in', values);
    }
    /** Match rows where `column` matches the case-sensitive `pattern` (`column=like.pattern`). */ like(column, pattern) {
        return this.add(column, 'like', pattern);
    }
    /** Match rows where `column` matches the case-insensitive `pattern` (`column=ilike.pattern`). */ ilike(column, pattern) {
        return this.add(column, 'ilike', pattern);
    }
    /** Match rows where `column` matches the POSIX regex `pattern` (`column=match.pattern`). */ match(column, pattern) {
        return this.add(column, 'match', pattern);
    }
    /** Match rows where `column` matches the case-insensitive POSIX regex `pattern` (`column=imatch.pattern`). */ imatch(column, pattern) {
        return this.add(column, 'imatch', pattern);
    }
    /**
     * Match rows where `column` `IS` the given value (`column=is.null`).
     * Accepts `null`, a boolean, or the keywords `'null' | 'true' | 'false' | 'unknown'`.
     */ is(column, value) {
        return this.add(column, 'is', value);
    }
    /** Match rows where `column` is distinct from `value` (`column=isdistinct.value`). NULL-safe inequality. */ isDistinct(column, value) {
        return this.add(column, 'isdistinct', value);
    }
    not(column, operator, value) {
        return this.add(column, operator, value, true);
    }
    /**
     * Serialize all conditions into the comma-separated (AND) filter string.
     *
     * Conditions are joined by commas, which the server applies as `AND`. A scalar
     * value (or single `in` element) that contains a reserved character — `,`,
     * `(`, `)`, `"`, `\` — or surrounding whitespace is double-quoted and escaped
     * the way PostgREST does, so commas inside a value are preserved rather than
     * read as a condition boundary.
     */ build() {
        return this.filters.join(',');
    }
    /** Alias for {@link build}; lets the builder be used wherever a string is expected. */ toString() {
        return this.build();
    }
}
const postgresChangesFilter = ()=>new RealtimePostgresFilterBuilder();
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REALTIME_PRESENCE_LISTEN_EVENTS",
    ()=>REALTIME_PRESENCE_LISTEN_EVENTS,
    "default",
    ()=>RealtimePresence
]);
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$presenceAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/presenceAdapter.js [app-rsc] (ecmascript)");
;
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    get state() {
        return this.presenceAdapter.state;
    }
    /**
     * Creates a Presence helper that keeps the local presence state in sync with the server.
     *
     * @param channel - The realtime channel to bind to.
     * @param opts - Optional custom event names, e.g. `{ events: { state: 'state', diff: 'diff' } }`.
     *
     * @category Realtime
     *
     * @example Example for a presence channel
     * ```ts
     * const presence = new RealtimePresence(channel)
     *
     * channel.on('presence', ({ event, key }) => {
     *   console.log(`Presence ${event} on ${key}`)
     * })
     * ```
     */ constructor(channel, opts){
        this.channel = channel;
        this.presenceAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$phoenix$2f$presenceAdapter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"](this.channel.channelAdapter, opts);
    }
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeChannel$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePostgresFilterBuilder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePostgresFilterBuilder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimePresence$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$websocket$2d$factory$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHANNEL_EVENTS",
    ()=>CHANNEL_EVENTS,
    "CHANNEL_STATES",
    ()=>CHANNEL_STATES,
    "CONNECTION_STATE",
    ()=>CONNECTION_STATE,
    "DEFAULT_TIMEOUT",
    ()=>DEFAULT_TIMEOUT,
    "DEFAULT_VERSION",
    ()=>DEFAULT_VERSION,
    "DEFAULT_VSN",
    ()=>DEFAULT_VSN,
    "MAX_PUSH_BUFFER_SIZE",
    ()=>MAX_PUSH_BUFFER_SIZE,
    "SOCKET_STATES",
    ()=>SOCKET_STATES,
    "TRANSPORTS",
    ()=>TRANSPORTS,
    "VERSION",
    ()=>VERSION,
    "VSN_1_0_0",
    ()=>VSN_1_0_0,
    "VSN_2_0_0",
    ()=>VSN_2_0_0,
    "WS_CLOSE_NORMAL",
    ()=>WS_CLOSE_NORMAL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/version.js [app-rsc] (ecmascript)");
;
const DEFAULT_VERSION = `realtime-js/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"]}`;
const VSN_1_0_0 = '1.0.0';
const VSN_2_0_0 = '2.0.0';
const DEFAULT_VSN = VSN_2_0_0;
const VERSION = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["version"];
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
const MAX_PUSH_BUFFER_SIZE = 100;
const SOCKET_STATES = {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
};
const CHANNEL_STATES = {
    closed: 'closed',
    errored: 'errored',
    joined: 'joined',
    joining: 'joining',
    leaving: 'leaving'
};
const CHANNEL_EVENTS = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    reply: 'phx_reply',
    leave: 'phx_leave',
    access_token: 'access_token'
};
const TRANSPORTS = {
    websocket: 'websocket'
};
const CONNECTION_STATE = {
    connecting: 'connecting',
    open: 'open',
    closing: 'closing',
    closed: 'closed'
};
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/normalizeChannelError.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Normalize the various shapes a channel error reason can take into a real `Error`.
 *
 * Transport-level channel errors arrive as a `CloseEvent`, a transport `Event`, an `Error`,
 * a string, or `undefined` depending on which path in the underlying socket fired. Server-reply
 * errors arrive as a payload object. This helper produces a consistent `Error` for every case
 * and preserves the original via `cause` so callers can still inspect the raw event.
 */ __turbopack_context__.s([
    "normalizeChannelError",
    ()=>normalizeChannelError
]);
function normalizeChannelError(reason) {
    if (reason instanceof Error) {
        return reason;
    }
    if (typeof reason === 'string') {
        return new Error(reason);
    }
    if (reason && typeof reason === 'object') {
        const obj = reason;
        if (typeof obj.code === 'number') {
            const detail = typeof obj.reason === 'string' && obj.reason ? ` (${obj.reason})` : '';
            return new Error(`socket closed: ${obj.code}${detail}`, {
                cause: reason
            });
        }
        return new Error('channel error: transport failure', {
            cause: reason
        });
    }
    return new Error('channel error: connection lost');
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/serializer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Serializer
]);
class Serializer {
    constructor(allowedMetadataKeys){
        this.HEADER_LENGTH = 1;
        this.USER_BROADCAST_PUSH_META_LENGTH = 6;
        this.KINDS = {
            userBroadcastPush: 3,
            userBroadcast: 4
        };
        this.BINARY_ENCODING = 0;
        this.JSON_ENCODING = 1;
        this.BROADCAST_EVENT = 'broadcast';
        this.allowedMetadataKeys = [];
        this.allowedMetadataKeys = allowedMetadataKeys !== null && allowedMetadataKeys !== void 0 ? allowedMetadataKeys : [];
    }
    encode(msg, callback) {
        if (msg.event === this.BROADCAST_EVENT && !(msg.payload instanceof ArrayBuffer) && typeof msg.payload.event === 'string') {
            return callback(this._binaryEncodeUserBroadcastPush(msg));
        }
        let payload = [
            msg.join_ref,
            msg.ref,
            msg.topic,
            msg.event,
            msg.payload
        ];
        return callback(JSON.stringify(payload));
    }
    _binaryEncodeUserBroadcastPush(message) {
        var _a;
        if (this._isArrayBuffer((_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload)) {
            return this._encodeBinaryUserBroadcastPush(message);
        } else {
            return this._encodeJsonUserBroadcastPush(message);
        }
    }
    _encodeBinaryUserBroadcastPush(message) {
        var _a, _b;
        const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : new ArrayBuffer(0);
        return this._encodeUserBroadcastPush(message, this.BINARY_ENCODING, userPayload);
    }
    _encodeJsonUserBroadcastPush(message) {
        var _a, _b;
        const userPayload = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : {};
        const encoder = new TextEncoder();
        const encodedUserPayload = encoder.encode(JSON.stringify(userPayload)).buffer;
        return this._encodeUserBroadcastPush(message, this.JSON_ENCODING, encodedUserPayload);
    }
    _encodeUserBroadcastPush(message, encodingType, encodedPayload) {
        var _a, _b;
        // Encode each header field as UTF-8. The length prefixes are byte counts and
        // the decode side uses TextDecoder (UTF-8), so measuring with String.length
        // and writing with charCodeAt would corrupt any multi-byte character (e.g.
        // accents or emoji) and desynchronize the buffer.
        const encoder = new TextEncoder();
        const topic = encoder.encode(message.topic);
        const ref = encoder.encode((_a = message.ref) !== null && _a !== void 0 ? _a : '');
        const joinRef = encoder.encode((_b = message.join_ref) !== null && _b !== void 0 ? _b : '');
        const userEvent = encoder.encode(message.payload.event);
        // Filter metadata based on allowed keys
        const rest = this.allowedMetadataKeys ? this._pick(message.payload, this.allowedMetadataKeys) : {};
        const metadata = encoder.encode(Object.keys(rest).length === 0 ? '' : JSON.stringify(rest));
        // Validate byte lengths don't exceed uint8 max value (255)
        if (joinRef.length > 255) {
            throw new Error(`joinRef length ${joinRef.length} exceeds maximum of 255`);
        }
        if (ref.length > 255) {
            throw new Error(`ref length ${ref.length} exceeds maximum of 255`);
        }
        if (topic.length > 255) {
            throw new Error(`topic length ${topic.length} exceeds maximum of 255`);
        }
        if (userEvent.length > 255) {
            throw new Error(`userEvent length ${userEvent.length} exceeds maximum of 255`);
        }
        if (metadata.length > 255) {
            throw new Error(`metadata length ${metadata.length} exceeds maximum of 255`);
        }
        const metaLength = this.USER_BROADCAST_PUSH_META_LENGTH + joinRef.length + ref.length + topic.length + userEvent.length + metadata.length;
        const header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
        const view = new DataView(header);
        const bytes = new Uint8Array(header);
        let offset = 0;
        view.setUint8(offset++, this.KINDS.userBroadcastPush); // kind
        view.setUint8(offset++, joinRef.length);
        view.setUint8(offset++, ref.length);
        view.setUint8(offset++, topic.length);
        view.setUint8(offset++, userEvent.length);
        view.setUint8(offset++, metadata.length);
        view.setUint8(offset++, encodingType);
        bytes.set(joinRef, offset);
        offset += joinRef.length;
        bytes.set(ref, offset);
        offset += ref.length;
        bytes.set(topic, offset);
        offset += topic.length;
        bytes.set(userEvent, offset);
        offset += userEvent.length;
        bytes.set(metadata, offset);
        offset += metadata.length;
        var combined = new Uint8Array(header.byteLength + encodedPayload.byteLength);
        combined.set(new Uint8Array(header), 0);
        combined.set(new Uint8Array(encodedPayload), header.byteLength);
        return combined.buffer;
    }
    decode(rawPayload, callback) {
        if (this._isArrayBuffer(rawPayload)) {
            let result = this._binaryDecode(rawPayload);
            return callback(result);
        }
        if (typeof rawPayload === 'string') {
            const jsonPayload = JSON.parse(rawPayload);
            const [join_ref, ref, topic, event, payload] = jsonPayload;
            return callback({
                join_ref,
                ref,
                topic,
                event,
                payload
            });
        }
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const kind = view.getUint8(0);
        const decoder = new TextDecoder();
        switch(kind){
            case this.KINDS.userBroadcast:
                return this._decodeUserBroadcast(buffer, view, decoder);
        }
    }
    _decodeUserBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const userEventSize = view.getUint8(2);
        const metadataSize = view.getUint8(3);
        const payloadEncoding = view.getUint8(4);
        let offset = this.HEADER_LENGTH + 4;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const userEvent = decoder.decode(buffer.slice(offset, offset + userEventSize));
        offset = offset + userEventSize;
        const metadata = decoder.decode(buffer.slice(offset, offset + metadataSize));
        offset = offset + metadataSize;
        const payload = buffer.slice(offset, buffer.byteLength);
        const parsedPayload = payloadEncoding === this.JSON_ENCODING ? JSON.parse(decoder.decode(payload)) : payload;
        const data = {
            type: this.BROADCAST_EVENT,
            event: userEvent,
            payload: parsedPayload
        };
        // Metadata is optional and always JSON encoded
        if (metadataSize > 0) {
            data['meta'] = JSON.parse(metadata);
        }
        return {
            join_ref: null,
            ref: null,
            topic: topic,
            event: this.BROADCAST_EVENT,
            payload: data
        };
    }
    _isArrayBuffer(buffer) {
        var _a;
        return buffer instanceof ArrayBuffer || ((_a = buffer === null || buffer === void 0 ? void 0 : buffer.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'ArrayBuffer';
    }
    _pick(obj, keys) {
        if (!obj || typeof obj !== 'object') {
            return {};
        }
        return Object.fromEntries(Object.entries(obj).filter(([key])=>keys.includes(key)));
    }
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/transformers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Helpers to convert the change Payload into native JS types.
 */ // Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
__turbopack_context__.s([
    "PostgresTypes",
    ()=>PostgresTypes,
    "convertCell",
    ()=>convertCell,
    "convertChangeData",
    ()=>convertChangeData,
    "convertColumn",
    ()=>convertColumn,
    "httpEndpointURL",
    ()=>httpEndpointURL,
    "toArray",
    ()=>toArray,
    "toBoolean",
    ()=>toBoolean,
    "toJson",
    ()=>toJson,
    "toNumber",
    ()=>toNumber,
    "toTimestampString",
    ()=>toTimestampString
]);
var PostgresTypes;
(function(PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
const convertChangeData = (columns, record, options = {})=>{
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    if (!record) {
        return {};
    }
    return Object.keys(record).reduce((acc, rec_key)=>{
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
const convertColumn = (columnName, columns, record, skipTypes)=>{
    const column = columns.find((x)=>x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
const convertCell = (type, value)=>{
    // if data type is an array
    if (type.charAt(0) === '_') {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch(type){
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value)=>{
    return value;
};
const toBoolean = (value)=>{
    switch(value){
        case 't':
            return true;
        case 'f':
            return false;
        default:
            return value;
    }
};
const toNumber = (value)=>{
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
const toJson = (value)=>{
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch (_a) {
            return value;
        }
    }
    return value;
};
const toArray = (value, type)=>{
    if (typeof value !== 'string') {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === '{' && closeBrace === '}') {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse('[' + valTrim + ']');
        } catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(',') : [];
        }
        return arr.map((val)=>convertCell(type, val));
    }
    return value;
};
const toTimestampString = (value)=>{
    if (typeof value === 'string') {
        return value.replace(' ', 'T');
    }
    return value;
};
const httpEndpointURL = (socketUrl)=>{
    const wsUrl = new URL(socketUrl);
    wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, 'http');
    wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, '') // remove all trailing slashes
    .replace(/\/socket\/websocket$/i, '') // remove the socket/websocket path
    .replace(/\/socket$/i, '') // remove the socket path
    .replace(/\/websocket$/i, ''); // remove the websocket path
    if (wsUrl.pathname === '' || wsUrl.pathname === '/') {
        wsUrl.pathname = '/api/broadcast';
    } else {
        wsUrl.pathname = wsUrl.pathname + '/api/broadcast';
    }
    return wsUrl.href;
};
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/version.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Generated automatically during releases by scripts/update-version-files.ts
// This file provides runtime access to the package version for:
// - HTTP request headers (e.g., X-Client-Info header for API requests)
// - Debugging and support (identifying which version is running)
// - Telemetry and logging (version reporting in errors/analytics)
// - Ensuring build artifacts match the published package version
__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.112.3';
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for creating WebSocket instances across runtimes.
 */ __turbopack_context__.s([
    "WebSocketFactory",
    ()=>WebSocketFactory,
    "default",
    ()=>__TURBOPACK__default__export__
]);
class WebSocketFactory {
    /**
     * Static-only utility – prevent instantiation.
     */ constructor(){}
    static detectEnvironment() {
        var _a;
        if (typeof WebSocket !== 'undefined') {
            return {
                type: 'native',
                wsConstructor: WebSocket
            };
        }
        const gt = globalThis;
        if (typeof globalThis !== 'undefined' && typeof gt.WebSocket !== 'undefined') {
            return {
                type: 'native',
                wsConstructor: gt.WebSocket
            };
        }
        const gl = ("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable";
        if (gl && typeof gl.WebSocket !== 'undefined') {
            return {
                type: 'native',
                wsConstructor: gl.WebSocket
            };
        }
        if (typeof globalThis !== 'undefined' && typeof gt.WebSocketPair !== 'undefined' && typeof globalThis.WebSocket === 'undefined') {
            return {
                type: 'cloudflare',
                error: 'Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.',
                workaround: 'Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.'
            };
        }
        if (typeof globalThis !== 'undefined' && gt.EdgeRuntime || typeof navigator !== 'undefined' && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Vercel-Edge'))) {
            return {
                type: 'unsupported',
                error: 'Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.',
                workaround: 'Use serverless functions or a different deployment target for WebSocket functionality.'
            };
        }
        // Use dynamic property access to avoid Next.js Edge Runtime static analysis warnings
        const _process = globalThis['process'];
        if (_process) {
            const processVersions = _process['versions'];
            if (processVersions && processVersions['node']) {
                // Reaching here means an earlier check did not find a native WebSocket,
                // so this Node.js process is missing the global WebSocket (Node.js 22+).
                return {
                    type: 'unsupported',
                    error: 'Node.js detected but native WebSocket not found.',
                    workaround: 'Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.'
                };
            }
        }
        return {
            type: 'unsupported',
            error: 'Unknown JavaScript runtime without WebSocket support.',
            workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
        };
    }
    /**
     * Returns the best available WebSocket constructor for the current runtime.
     *
     * @category Realtime
     *
     * @example Example with error handling
     * ```ts
     * try {
     *   const WS = WebSocketFactory.getWebSocketConstructor()
     *   const socket = new WS('wss://example.com/socket')
     * } catch (error) {
     *   console.error('WebSocket not available in this environment.', error)
     * }
     * ```
     */ static getWebSocketConstructor() {
        const env = this.detectEnvironment();
        if (env.wsConstructor) {
            return env.wsConstructor;
        }
        let errorMessage = env.error || 'WebSocket not supported in this environment.';
        if (env.workaround) {
            errorMessage += `\n\nSuggested solution: ${env.workaround}`;
        }
        throw new Error(errorMessage);
    }
    /**
     * Detects whether the runtime can establish WebSocket connections.
     *
     * @category Realtime
     *
     * @example Example in a Node.js script
     * ```ts
     * if (!WebSocketFactory.isWebSocketSupported()) {
     *   console.error('WebSockets are required for this script.')
     *   process.exitCode = 1
     * }
     * ```
     */ static isWebSocketSupported() {
        try {
            const env = this.detectEnvironment();
            return env.type === 'native';
        } catch (_a) {
            return false;
        }
    }
}
const __TURBOPACK__default__export__ = WebSocketFactory;
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/channelAdapter.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChannelAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/constants.js [app-rsc] (ecmascript)");
;
class ChannelAdapter {
    constructor(socket, topic, params){
        const phoenixParams = phoenixChannelParams(params);
        this.channel = socket.getSocket().channel(topic, phoenixParams);
        this.socket = socket;
    }
    get state() {
        return this.channel.state;
    }
    set state(state) {
        this.channel.state = state;
    }
    get joinedOnce() {
        return this.channel.joinedOnce;
    }
    get joinPush() {
        return this.channel.joinPush;
    }
    get rejoinTimer() {
        return this.channel.rejoinTimer;
    }
    on(event, callback) {
        return this.channel.on(event, callback);
    }
    off(event, refNumber) {
        this.channel.off(event, refNumber);
    }
    subscribe(timeout) {
        return this.channel.join(timeout);
    }
    unsubscribe(timeout) {
        return this.channel.leave(timeout);
    }
    teardown() {
        this.channel.teardown();
    }
    onClose(callback) {
        this.channel.onClose(callback);
    }
    onError(callback) {
        return this.channel.onError(callback);
    }
    push(event, payload, timeout) {
        let push;
        try {
            push = this.channel.push(event, payload, timeout);
        } catch (error) {
            throw new Error(`tried to push '${event}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
        }
        if (this.channel.pushBuffer.length > __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAX_PUSH_BUFFER_SIZE"]) {
            const removedPush = this.channel.pushBuffer.shift();
            removedPush.cancelTimeout();
            this.socket.log('channel', `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload());
        }
        return push;
    }
    updateJoinPayload(payload) {
        const oldPayload = this.channel.joinPush.payload();
        this.channel.joinPush.payload = ()=>Object.assign(Object.assign({}, oldPayload), payload);
    }
    canPush() {
        return this.socket.isConnected() && this.state === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].joined;
    }
    isJoined() {
        return this.state === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].joined;
    }
    isJoining() {
        return this.state === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].joining;
    }
    isClosed() {
        return this.state === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].closed;
    }
    isLeaving() {
        return this.state === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CHANNEL_STATES"].leaving;
    }
    updateFilterBindings(filterBindings) {
        this.channel.filterBindings = filterBindings;
    }
    updatePayloadTransform(callback) {
        this.channel.onMessage = callback;
    }
    /**
     * @internal
     */ getChannel() {
        return this.channel;
    }
}
function phoenixChannelParams(options) {
    return {
        config: Object.assign({
            broadcast: {
                ack: false,
                self: false
            },
            presence: {
                key: '',
                enabled: false
            },
            private: false
        }, options.config)
    };
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/presenceAdapter.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresenceAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$phoenix$2f$priv$2f$static$2f$phoenix$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/phoenix/priv/static/phoenix.mjs [app-rsc] (ecmascript)");
;
class PresenceAdapter {
    constructor(channel, opts){
        const phoenixOptions = phoenixPresenceOptions(opts);
        this.presence = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$phoenix$2f$priv$2f$static$2f$phoenix$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Presence"](channel.getChannel(), phoenixOptions);
        this.presence.onJoin((key, currentPresence, newPresence)=>{
            const onJoinPayload = PresenceAdapter.onJoinPayload(key, currentPresence, newPresence);
            channel.getChannel().trigger('presence', onJoinPayload);
        });
        this.presence.onLeave((key, currentPresence, leftPresence)=>{
            const onLeavePayload = PresenceAdapter.onLeavePayload(key, currentPresence, leftPresence);
            channel.getChannel().trigger('presence', onLeavePayload);
        });
        this.presence.onSync(()=>{
            channel.getChannel().trigger('presence', {
                event: 'sync'
            });
        });
    }
    get state() {
        return PresenceAdapter.transformState(this.presence.state);
    }
    /**
     * @private
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example Transform state
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     */ static transformState(state) {
        state = cloneState(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key)=>{
            const presences = state[key];
            newState[key] = transformState(presences);
            return newState;
        }, {});
    }
    static onJoinPayload(key, currentPresence, newPresence) {
        const currentPresences = parseCurrentPresences(currentPresence);
        const newPresences = transformState(newPresence);
        return {
            event: 'join',
            key,
            currentPresences,
            newPresences
        };
    }
    static onLeavePayload(key, currentPresence, leftPresence) {
        const currentPresences = parseCurrentPresences(currentPresence);
        const leftPresences = transformState(leftPresence);
        return {
            event: 'leave',
            key,
            currentPresences,
            leftPresences
        };
    }
}
function transformState(presences) {
    return presences.metas.map((presence)=>{
        // Object spread compiles to Object.assign for ES2017, which treats __proto__ as a setter.
        const descriptors = Object.getOwnPropertyDescriptors(presence);
        const transformedPresence = Object.defineProperties({}, descriptors);
        transformedPresence['presence_ref'] = transformedPresence['phx_ref'];
        delete transformedPresence['phx_ref'];
        delete transformedPresence['phx_ref_prev'];
        return transformedPresence;
    });
}
function cloneState(state) {
    return JSON.parse(JSON.stringify(state));
}
function phoenixPresenceOptions(opts) {
    return (opts === null || opts === void 0 ? void 0 : opts.events) && {
        events: opts.events
    };
}
function parseCurrentPresences(currentPresences) {
    return (currentPresences === null || currentPresences === void 0 ? void 0 : currentPresences.metas) ? transformState(currentPresences) : [];
}
}),
"[project]/node_modules/@supabase/realtime-js/dist/module/phoenix/socketAdapter.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SocketAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$phoenix$2f$priv$2f$static$2f$phoenix$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/phoenix/priv/static/phoenix.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/lib/constants.js [app-rsc] (ecmascript)");
;
;
class SocketAdapter {
    constructor(endPoint, options){
        this.socket = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$phoenix$2f$priv$2f$static$2f$phoenix$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Socket"](endPoint, options);
    }
    get timeout() {
        return this.socket.timeout;
    }
    get endPoint() {
        return this.socket.endPoint;
    }
    get transport() {
        return this.socket.transport;
    }
    get heartbeatIntervalMs() {
        return this.socket.heartbeatIntervalMs;
    }
    get heartbeatCallback() {
        return this.socket.heartbeatCallback;
    }
    set heartbeatCallback(callback) {
        this.socket.heartbeatCallback = callback;
    }
    get heartbeatTimer() {
        return this.socket.heartbeatTimer;
    }
    get pendingHeartbeatRef() {
        return this.socket.pendingHeartbeatRef;
    }
    get reconnectTimer() {
        return this.socket.reconnectTimer;
    }
    get vsn() {
        return this.socket.vsn;
    }
    get encode() {
        return this.socket.encode;
    }
    get decode() {
        return this.socket.decode;
    }
    get reconnectAfterMs() {
        return this.socket.reconnectAfterMs;
    }
    get sendBuffer() {
        return this.socket.sendBuffer;
    }
    get stateChangeCallbacks() {
        return this.socket.stateChangeCallbacks;
    }
    connect() {
        this.socket.connect();
    }
    disconnect(callback, code, reason, timeout = 10000) {
        return new Promise((resolve)=>{
            setTimeout(()=>resolve('timeout'), timeout);
            this.socket.disconnect(()=>{
                callback();
                resolve('ok');
            }, code, reason);
        });
    }
    push(data) {
        this.socket.push(data);
    }
    log(kind, msg, data) {
        this.socket.log(kind, msg, data);
    }
    makeRef() {
        return this.socket.makeRef();
    }
    onOpen(callback) {
        this.socket.onOpen(callback);
    }
    onClose(callback) {
        this.socket.onClose(callback);
    }
    onError(callback) {
        this.socket.onError(callback);
    }
    onMessage(callback) {
        this.socket.onMessage(callback);
    }
    isConnected() {
        return this.socket.isConnected();
    }
    isConnecting() {
        return this.socket.connectionState() == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CONNECTION_STATE"].connecting;
    }
    isDisconnecting() {
        return this.socket.connectionState() == __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$lib$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CONNECTION_STATE"].closing;
    }
    connectionState() {
        // @ts-ignore - requires better typing and exposing type in phoenix
        return this.socket.connectionState();
    }
    endPointURL() {
        return this.socket.endPointURL();
    }
    sendHeartbeat() {
        this.socket.sendHeartbeat();
    }
    /**
     * @internal
     */ getSocket() {
        return this.socket;
    }
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/cookies.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyServerStorage",
    ()=>applyServerStorage,
    "createStorageFromOptions",
    ()=>createStorageFromOptions,
    "isPkceFlowIndexKey",
    ()=>isPkceFlowIndexKey,
    "isPkceVerifierSlotKey",
    ()=>isPkceVerifierSlotKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/node_modules/cookie/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/utils/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/utils/chunker.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/utils/base64url.js [app-rsc] (ecmascript)");
;
;
const BASE64_PREFIX = "base64-";
/**
 * Matches the storage key auth-js uses for a single in-flight PKCE flow's code
 * verifier: `<storageKey>-flow-<flowId>-code-verifier`.
 *
 * The length bound mirrors auth-js's own flow id validation, so a storage key
 * that happens to contain `-flow-` is not mistaken for a verifier slot.
 *
 * Deliberately does not match the two neighbouring keys:
 * - `<storageKey>-code-verifier`, the fixed key written for every flow.
 * - `<storageKey>-flows-code-verifier`, the index of pending flow ids. There is
 *   no `-` after `flow` there, so the pattern cannot match it.
 */ const PKCE_VERIFIER_SLOT_KEY = /-flow-[A-Za-z0-9_-]{8,64}-code-verifier$/;
function isPkceVerifierSlotKey(key) {
    return PKCE_VERIFIER_SLOT_KEY.test(key);
}
const PKCE_FLOW_INDEX_SUFFIX = "-flows-code-verifier";
function isPkceFlowIndexKey(key) {
    return key.endsWith(PKCE_FLOW_INDEX_SUFFIX);
}
/**
 * Decodes a chunked cookie value that may carry the `base64-` prefix written
 * by this module. When the prefix is present, the underlying payload is always
 * JSON encoded by auth-js (`setItemAsync` runs `JSON.stringify` on every
 * write). If the decoded value cannot be parsed as JSON, the chunks are
 * mismatched (e.g. a partial cookie write left the browser holding a mix of
 * old and new generations) and we treat the entry as absent so the SDK does
 * not propagate or re-save the corrupted payload.
 */ function decodeChunkedCookieValue(value) {
    if (!value.startsWith(BASE64_PREFIX)) {
        return value;
    }
    let decoded;
    try {
        decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringFromBase64URL"])(value.substring(BASE64_PREFIX.length));
    } catch (error) {
        console.warn("@supabase/ssr: could not base64url-decode chunked cookie value, treating as absent. Cookie chunks may have been written partially across responses.", error);
        return null;
    }
    try {
        JSON.parse(decoded);
    } catch  {
        console.warn("@supabase/ssr: chunked cookie decoded to invalid JSON, treating as absent. This usually indicates that cookie chunks from different writes were combined (e.g. response committed before all Set-Cookie headers were sent).");
        return null;
    }
    return decoded;
}
function createStorageFromOptions(options, isServerClient) {
    const cookies = options.cookies ?? null;
    const cookieEncoding = options.cookieEncoding;
    const setItems = {};
    const removedItems = {};
    let getAll;
    let setAll;
    const documentCookieGetAll = ()=>{
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(document.cookie);
        return Object.keys(parsed).map((name)=>({
                name,
                value: parsed[name] ?? ""
            }));
    };
    const documentCookieSetAll = (setCookies)=>{
        setCookies.forEach(({ name, value, options })=>{
            document.cookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"])(name, value, options);
        });
    };
    if (cookies) {
        if ("get" in cookies) {
            // Just get is not enough, because the client needs to see what cookies
            // are already set and unset them if necessary. To attempt to fix this
            // behavior for most use cases, we pass "hints" which is the keys of the
            // storage items. They are then converted to their corresponding cookie
            // chunk names and are fetched with get. Only 5 chunks are fetched, which
            // should be enough for the majority of use cases, but does not solve
            // those with very large sessions.
            const getWithHints = async (keyHints)=>{
                // optimistically find the first 5 potential chunks for the specified key
                const chunkNames = keyHints.flatMap((keyHint)=>[
                        keyHint,
                        ...Array.from({
                            length: 5
                        }).map((_, i)=>`${keyHint}.${i}`)
                    ]);
                const chunks = [];
                for(let i = 0; i < chunkNames.length; i += 1){
                    const value = await cookies.get(chunkNames[i]);
                    if (!value && typeof value !== "string") {
                        continue;
                    }
                    chunks.push({
                        name: chunkNames[i],
                        value
                    });
                }
                // TODO: detect and log stale chunks error
                return chunks;
            };
            getAll = async (keyHints)=>await getWithHints(keyHints);
            if ("set" in cookies && "remove" in cookies) {
                setAll = async (setCookies)=>{
                    for(let i = 0; i < setCookies.length; i += 1){
                        const { name, value, options } = setCookies[i];
                        if (value) {
                            await cookies.set(name, value, options);
                        } else {
                            await cookies.remove(name, options);
                        }
                    }
                };
            } else if (isServerClient) {
                setAll = async ()=>{
                    console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
                };
            } else {
                throw new Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
            }
        } else if ("getAll" in cookies) {
            getAll = async ()=>await cookies.getAll();
            if ("setAll" in cookies) {
                setAll = cookies.setAll;
            } else if (isServerClient) {
                setAll = async ()=>{
                    console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
                };
            } else {
                throw new Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            }
        } else if (!isServerClient && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])()) {
            // cookies object provided (e.g. just to set `encode`) but no accessors.
            // Fall through to document.cookie defaults, same as when cookies isn't
            // provided at all.
            getAll = ()=>documentCookieGetAll();
            setAll = documentCookieSetAll;
        } else {
            // neither get nor getAll is present on cookies, only will occur if pure JavaScript is used, but cookies is an object
            throw new Error(`@supabase/ssr: ${isServerClient ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`);
        }
    } else if (!isServerClient && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBrowser"])()) {
        // The environment is browser, so use the document.cookie API to implement getAll and setAll.
        getAll = ()=>documentCookieGetAll();
        setAll = documentCookieSetAll;
    } else if (isServerClient) {
        throw new Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
    } else {
        // getting cookies when there's no window but we're in browser mode can be OK, because the developer probably is not using auth functions
        getAll = ()=>{
            return [];
        };
        // this is NOT OK because the developer is using auth functions that require setting some state, so that must error out
        setAll = ()=>{
            throw new Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
        };
    }
    if (!isServerClient) {
        // This is the storage client to be used in browsers. It only
        // works on the cookies abstraction, unlike the server client
        // which only uses cookies to read the initial state. When an
        // item is set, cookies are both cleared and set to values so
        // that stale chunks are not left remaining.
        return {
            getAll,
            setAll,
            setItems,
            removedItems,
            storage: {
                isServer: false,
                getItem: async (key)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const chunkedCookie = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineChunks"])(key, async (chunkName)=>{
                        const cookie = allCookies?.find(({ name })=>name === chunkName) || null;
                        if (!cookie) {
                            return null;
                        }
                        return cookie.value;
                    });
                    if (!chunkedCookie) {
                        return null;
                    }
                    return decodeChunkedCookieValue(chunkedCookie);
                },
                setItem: async (key, value)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const cookieNames = allCookies?.map(({ name })=>name) || [];
                    const removeCookies = new Set(cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, key)));
                    let encoded = value;
                    if (cookieEncoding === "base64url") {
                        encoded = BASE64_PREFIX + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringToBase64URL"])(value);
                    }
                    const setCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChunks"])(key, encoded);
                    setCookies.forEach(({ name })=>{
                        removeCookies.delete(name);
                    });
                    const removeCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: 0
                    };
                    const setCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"].maxAge
                    };
                    // the NextJS cookieStore API can get confused if the `name` from
                    // options.cookieOptions leaks
                    delete removeCookieOptions.name;
                    delete setCookieOptions.name;
                    // See removeItem below for the host-only also-clear rationale.
                    // Same logic applies here: when overwriting an existing session,
                    // stale chunks at a previous scope must be cleared at that scope.
                    const hostOnlyRemoveOptions = removeCookieOptions.domain ? (()=>{
                        const { domain: _domain, ...rest } = removeCookieOptions;
                        return rest;
                    })() : null;
                    const allToSet = [
                        ...hostOnlyRemoveOptions ? [
                            ...removeCookies
                        ].map((name)=>({
                                name,
                                value: "",
                                options: hostOnlyRemoveOptions
                            })) : [],
                        ...[
                            ...removeCookies
                        ].map((name)=>({
                                name,
                                value: "",
                                options: removeCookieOptions
                            })),
                        ...setCookies.map(({ name, value })=>({
                                name,
                                value,
                                options: setCookieOptions
                            }))
                    ];
                    if (allToSet.length > 0) {
                        await setAll(allToSet, {});
                    }
                },
                removeItem: async (key)=>{
                    const allCookies = await getAll([
                        key
                    ]);
                    const cookieNames = allCookies?.map(({ name })=>name) || [];
                    const removeCookies = cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, key));
                    if (removeCookies.length === 0) {
                        return;
                    }
                    const removeCookieOptions = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
                        ...options?.cookieOptions,
                        maxAge: 0
                    };
                    // the NextJS cookieStore API can get confused if the `name` from
                    // options.cookieOptions leaks
                    delete removeCookieOptions.name;
                    // When a parent Domain is configured, also clear the host-only
                    // counterpart. Migrating host-only -> `.parent.tld` leaves the old
                    // host-only cookies behind; the browser returns both in the Cookie
                    // header and parsers may pick the stale one, resurrecting the
                    // session after signOut. A Set-Cookie clear for a scope the host
                    // doesn't own is silently ignored, so this is a no-op when there's
                    // nothing stale to clear.
                    //
                    // The host-only clear is emitted *before* the domain-scoped one so
                    // that cookie stores keyed by name only (e.g. Next.js
                    // ResponseCookies) keep the domain-scoped deletion -- the one that
                    // matches the cookies this library set -- instead of letting the
                    // best-effort host-only clear overwrite it, which would leave the
                    // session cookie undeleted (#256). Stores that emit a Set-Cookie
                    // per entry still receive both.
                    const hostOnlyOptions = removeCookieOptions.domain ? (()=>{
                        const { domain: _domain, ...rest } = removeCookieOptions;
                        return rest;
                    })() : null;
                    const toSet = [
                        ...hostOnlyOptions ? removeCookies.map((name)=>({
                                name,
                                value: "",
                                options: hostOnlyOptions
                            })) : [],
                        ...removeCookies.map((name)=>({
                                name,
                                value: "",
                                options: removeCookieOptions
                            }))
                    ];
                    await setAll(toSet, {});
                }
            }
        };
    }
    // This is the server client. It only uses getAll to read the initial
    // state. Any subsequent changes to the items is persisted in the
    // setItems and removedItems objects. createServerClient *must* use
    // getAll, setAll and the values in setItems and removedItems to
    // persist the changes *at once* when appropriate (usually only when
    // the TOKEN_REFRESHED, USER_UPDATED or SIGNED_OUT events are fired by
    // the Supabase Auth client).
    return {
        getAll,
        setAll,
        setItems,
        removedItems,
        storage: {
            // to signal to the libraries that these cookies are
            // coming from a server environment and their value
            // should not be trusted
            isServer: true,
            getItem: async (key)=>{
                if (typeof setItems[key] === "string") {
                    return setItems[key];
                }
                if (removedItems[key]) {
                    return null;
                }
                const allCookies = await getAll([
                    key
                ]);
                const chunkedCookie = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["combineChunks"])(key, async (chunkName)=>{
                    const cookie = allCookies?.find(({ name })=>name === chunkName) || null;
                    if (!cookie) {
                        return null;
                    }
                    return cookie.value;
                });
                if (!chunkedCookie) {
                    return null;
                }
                if (typeof chunkedCookie !== "string") {
                    return chunkedCookie;
                }
                return decodeChunkedCookieValue(chunkedCookie);
            },
            setItem: async (key, value)=>{
                // We don't have an `onAuthStateChange` event that can let us know that
                // the PKCE code verifier is being set. Therefore, if we see it being
                // set, we need to apply the storage (call `setAll` so the cookie is
                // set properly).
                if (key.endsWith("-code-verifier")) {
                    await applyServerStorage({
                        getAll,
                        setAll,
                        // pretend only that the code verifier was set
                        setItems: {
                            [key]: value
                        },
                        // pretend that nothing was removed
                        removedItems: {}
                    }, {
                        cookieOptions: options?.cookieOptions ?? null,
                        cookieEncoding
                    });
                }
                setItems[key] = value;
                delete removedItems[key];
            },
            removeItem: async (key)=>{
                // Intentionally not applying the storage when the key is the fixed
                // PKCE code verifier, as usually right after it's removed other items
                // are set, so application of the storage will be handled by the
                // `onAuthStateChange` callback that follows removal -- usually as part
                // of the `exchangeCodeForSession` call. That key holds a single value
                // which the next flow's `setItem` overwrites (applied immediately, see
                // setItem above), so a removal that never reaches the browser is not
                // observable.
                //
                // The per-flow verifier slots and the index of pending flow ids are
                // the exception, because they can be removed on paths that emit no
                // auth event at all: auth-js's ring evicts the oldest slot during a
                // flow *start*, and a flow that fails removes its own slot (and the
                // index entry, when it was the last one) from a catch block. Leaving
                // those buffered would strand a verifier cookie in the browser with
                // nothing referencing it, or an index that names a slot which is
                // already gone.
                if (isPkceVerifierSlotKey(key) || isPkceFlowIndexKey(key)) {
                    await applyServerStorage({
                        getAll,
                        setAll,
                        // pretend that nothing was set
                        setItems: {},
                        // pretend only that this verifier key was removed
                        removedItems: {
                            [key]: true
                        }
                    }, {
                        cookieOptions: options?.cookieOptions ?? null,
                        cookieEncoding
                    });
                }
                delete setItems[key];
                removedItems[key] = true;
            }
        }
    };
}
async function applyServerStorage({ getAll, setAll, setItems, removedItems }, options) {
    const cookieEncoding = options.cookieEncoding;
    const cookieOptions = options.cookieOptions ?? null;
    const allCookies = await getAll([
        ...setItems ? Object.keys(setItems) : [],
        ...removedItems ? Object.keys(removedItems) : []
    ]);
    const cookieNames = allCookies?.map(({ name })=>name) || [];
    const currentByName = new Map(allCookies?.map(({ name, value })=>[
            name,
            value
        ]) || []);
    const removeCookies = Object.keys(removedItems).flatMap((itemName)=>{
        return cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, itemName));
    });
    const setCookies = Object.keys(setItems).flatMap((itemName)=>{
        const removeExistingCookiesForItem = new Set(cookieNames.filter((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isChunkLike"])(name, itemName)));
        let encoded = setItems[itemName];
        if (cookieEncoding === "base64url") {
            encoded = BASE64_PREFIX + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$base64url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringToBase64URL"])(encoded);
        }
        const chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$chunker$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createChunks"])(itemName, encoded);
        chunks.forEach((chunk)=>{
            removeExistingCookiesForItem.delete(chunk.name);
        });
        removeCookies.push(...removeExistingCookiesForItem);
        return chunks;
    });
    const setCookiesToWrite = setCookies.filter(({ name, value })=>currentByName.get(name) !== value);
    const removeCookiesToWrite = removeCookies.filter((name)=>currentByName.has(name));
    const removeCookieOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
        ...cookieOptions,
        maxAge: 0
    };
    const setCookieOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"],
        ...cookieOptions,
        maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_COOKIE_OPTIONS"].maxAge
    };
    // the NextJS cookieStore API can get confused if the `name` from
    // options.cookieOptions leaks
    delete removeCookieOptions.name;
    delete setCookieOptions.name;
    // See removeItem in createStorageFromOptions for the host-only also-clear
    // rationale. Same logic on the server-side response path.
    const hostOnlyRemoveOptions = removeCookieOptions.domain && removeCookiesToWrite.length > 0 ? (()=>{
        const { domain: _domain, ...rest } = removeCookieOptions;
        return rest;
    })() : null;
    if (removeCookiesToWrite.length === 0 && setCookiesToWrite.length === 0) {
        return;
    }
    await setAll([
        ...hostOnlyRemoveOptions ? removeCookiesToWrite.map((name)=>({
                name,
                value: "",
                options: hostOnlyRemoveOptions
            })) : [],
        ...removeCookiesToWrite.map((name)=>({
                name,
                value: "",
                options: removeCookieOptions
            })),
        ...setCookiesToWrite.map(({ name, value })=>({
                name,
                value,
                options: setCookieOptions
            }))
    ], {
        "Cache-Control": "private, no-cache, no-store, must-revalidate, max-age=0",
        Expires: "0",
        Pragma: "no-cache"
    });
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerClient",
    ()=>createServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/cookies.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/version.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$warnDeprecatedPackage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/warnDeprecatedPackage.js [app-rsc] (ecmascript)");
;
;
;
;
;
function createServerClient(supabaseUrl, supabaseKey, options) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$warnDeprecatedPackage$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["warnIfUsingDeprecatedAuthHelpersPackage"])();
    if (!supabaseUrl || !supabaseKey) {
        throw new Error(`Your project's URL and Key are required to create a Supabase client!\n\nCheck your Supabase project's API settings to find these values\n\nhttps://supabase.com/dashboard/project/_/settings/api`);
    }
    const { storage, getAll, setAll, setItems, removedItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createStorageFromOptions"])({
        ...options,
        cookieEncoding: options?.cookieEncoding ?? "base64url"
    }, true);
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
        // TODO: resolve type error
        ...options,
        global: {
            ...options?.global,
            headers: {
                ...options?.global?.headers,
                "X-Client-Info": `supabase-ssr/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"]} createServerClient`
            }
        },
        auth: {
            ...options?.cookieOptions?.name ? {
                storageKey: options.cookieOptions.name
            } : null,
            ...options?.auth,
            flowType: "pkce",
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: true,
            skipAutoInitialize: true,
            storage,
            ...options?.cookies && "encode" in options.cookies && options.cookies.encode === "tokens-only" ? {
                userStorage: options?.auth?.userStorage ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$utils$2f$helpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["memoryLocalStorageAdapter"])()
            } : null
        }
    });
    client.auth.onAuthStateChange(async (event)=>{
        // The SIGNED_IN event is fired very often, but we don't need to
        // apply the storage each time it fires, only if there are changes
        // that need to be set -- which is if setItems / removeItems have
        // data.
        const hasStorageChanges = Object.keys(setItems).length > 0 || Object.keys(removedItems).length > 0;
        if (hasStorageChanges && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED" || event === "PASSWORD_RECOVERY" || event === "SIGNED_OUT" || event === "MFA_CHALLENGE_VERIFIED")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$cookies$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["applyServerStorage"])({
                getAll,
                setAll,
                setItems,
                removedItems
            }, {
                cookieOptions: options?.cookieOptions ?? null,
                cookieEncoding: options?.cookieEncoding ?? "base64url"
            });
        }
    });
    return client;
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/utils/base64url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "codepointToUTF8",
    ()=>codepointToUTF8,
    "stringFromBase64URL",
    ()=>stringFromBase64URL,
    "stringFromUTF8",
    ()=>stringFromUTF8,
    "stringToBase64URL",
    ()=>stringToBase64URL,
    "stringToUTF8",
    ()=>stringToUTF8
]);
/**
 * Avoid modifying this file. It's part of
 * https://github.com/supabase-community/base64url-js.  Submit all fixes on
 * that repo!
 */ /**
 * An array of characters that encode 6 bits into a Base64-URL alphabet
 * character.
 */ const TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
/**
 * An array of characters that can appear in a Base64-URL encoded string but
 * should be ignored.
 */ const IGNORE_BASE64URL = " \t\n\r=".split("");
/**
 * An array of 128 numbers that map a Base64-URL character to 6 bits, or if -2
 * used to skip the character, or if -1 used to error out.
 */ const FROM_BASE64URL = (()=>{
    const charMap = new Array(128);
    for(let i = 0; i < charMap.length; i += 1){
        charMap[i] = -1;
    }
    for(let i = 0; i < IGNORE_BASE64URL.length; i += 1){
        charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
    }
    for(let i = 0; i < TO_BASE64URL.length; i += 1){
        charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
    }
    return charMap;
})();
function stringToBase64URL(str) {
    const base64 = [];
    let queue = 0;
    let queuedBits = 0;
    const emitter = (byte)=>{
        queue = queue << 8 | byte;
        queuedBits += 8;
        while(queuedBits >= 6){
            const pos = queue >> queuedBits - 6 & 63;
            base64.push(TO_BASE64URL[pos]);
            queuedBits -= 6;
        }
    };
    stringToUTF8(str, emitter);
    if (queuedBits > 0) {
        queue = queue << 6 - queuedBits;
        queuedBits = 6;
        while(queuedBits >= 6){
            const pos = queue >> queuedBits - 6 & 63;
            base64.push(TO_BASE64URL[pos]);
            queuedBits -= 6;
        }
    }
    return base64.join("");
}
function stringFromBase64URL(str) {
    const conv = [];
    const emit = (codepoint)=>{
        conv.push(String.fromCodePoint(codepoint));
    };
    const state = {
        utf8seq: 0,
        codepoint: 0
    };
    let queue = 0;
    let queuedBits = 0;
    for(let i = 0; i < str.length; i += 1){
        const codepoint = str.charCodeAt(i);
        const bits = FROM_BASE64URL[codepoint];
        if (bits > -1) {
            // valid Base64-URL character
            queue = queue << 6 | bits;
            queuedBits += 6;
            while(queuedBits >= 8){
                stringFromUTF8(queue >> queuedBits - 8 & 0xff, state, emit);
                queuedBits -= 8;
            }
        } else if (bits === -2) {
            continue;
        } else {
            throw new Error(`Invalid Base64-URL character "${str.at(i)}" at position ${i}`);
        }
    }
    return conv.join("");
}
function codepointToUTF8(codepoint, emit) {
    if (codepoint <= 0x7f) {
        emit(codepoint);
        return;
    } else if (codepoint <= 0x7ff) {
        emit(0xc0 | codepoint >> 6);
        emit(0x80 | codepoint & 0x3f);
        return;
    } else if (codepoint <= 0xffff) {
        emit(0xe0 | codepoint >> 12);
        emit(0x80 | codepoint >> 6 & 0x3f);
        emit(0x80 | codepoint & 0x3f);
        return;
    } else if (codepoint <= 0x10ffff) {
        emit(0xf0 | codepoint >> 18);
        emit(0x80 | codepoint >> 12 & 0x3f);
        emit(0x80 | codepoint >> 6 & 0x3f);
        emit(0x80 | codepoint & 0x3f);
        return;
    }
    throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
function stringToUTF8(str, emit) {
    for(let i = 0; i < str.length; i += 1){
        let codepoint = str.charCodeAt(i);
        if (codepoint > 0xd7ff && codepoint <= 0xdbff) {
            // most UTF-16 codepoints are Unicode codepoints, except values in this
            // range where the next UTF-16 codepoint needs to be combined with the
            // current one to get the Unicode codepoint
            const highSurrogate = (codepoint - 0xd800) * 0x400 & 0xffff;
            const lowSurrogate = str.charCodeAt(i + 1) - 0xdc00 & 0xffff;
            codepoint = (lowSurrogate | highSurrogate) + 0x10000;
            i += 1;
        }
        codepointToUTF8(codepoint, emit);
    }
}
function stringFromUTF8(byte, state, emit) {
    if (state.utf8seq === 0) {
        if (byte <= 0x7f) {
            emit(byte);
            return;
        }
        // count the number of 1 leading bits until you reach 0
        for(let leadingBit = 1; leadingBit < 6; leadingBit += 1){
            if ((byte >> 7 - leadingBit & 1) === 0) {
                state.utf8seq = leadingBit;
                break;
            }
        }
        if (state.utf8seq === 2) {
            state.codepoint = byte & 31;
        } else if (state.utf8seq === 3) {
            state.codepoint = byte & 15;
        } else if (state.utf8seq === 4) {
            state.codepoint = byte & 7;
        } else {
            throw new Error("Invalid UTF-8 sequence");
        }
        state.utf8seq -= 1;
    } else if (state.utf8seq > 0) {
        if (byte <= 0x7f) {
            throw new Error("Invalid UTF-8 sequence");
        }
        state.codepoint = state.codepoint << 6 | byte & 63;
        state.utf8seq -= 1;
        if (state.utf8seq === 0) {
            emit(state.codepoint);
        }
    }
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/utils/chunker.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_CHUNK_SIZE",
    ()=>MAX_CHUNK_SIZE,
    "combineChunks",
    ()=>combineChunks,
    "createChunks",
    ()=>createChunks,
    "deleteChunks",
    ()=>deleteChunks,
    "isChunkLike",
    ()=>isChunkLike
]);
const MAX_CHUNK_SIZE = 3180;
const CHUNK_LIKE_REGEX = /^(.*)[.](0|[1-9][0-9]*)$/;
function isChunkLike(cookieName, key) {
    if (cookieName === key) {
        return true;
    }
    const chunkLike = cookieName.match(CHUNK_LIKE_REGEX);
    if (chunkLike && chunkLike[1] === key) {
        return true;
    }
    return false;
}
function createChunks(key, value, chunkSize) {
    const resolvedChunkSize = chunkSize ?? MAX_CHUNK_SIZE;
    let encodedValue = encodeURIComponent(value);
    if (encodedValue.length <= resolvedChunkSize) {
        return [
            {
                name: key,
                value
            }
        ];
    }
    const chunks = [];
    while(encodedValue.length > 0){
        let encodedChunkHead = encodedValue.slice(0, resolvedChunkSize);
        const lastEscapePos = encodedChunkHead.lastIndexOf("%");
        // Check if the last escaped character is truncated.
        if (lastEscapePos > resolvedChunkSize - 3) {
            // If so, reslice the string to exclude the whole escape sequence.
            // We only reduce the size of the string as the chunk must
            // be smaller than the chunk size.
            encodedChunkHead = encodedChunkHead.slice(0, lastEscapePos);
        }
        let valueHead = "";
        // Check if the chunk was split along a valid unicode boundary.
        while(encodedChunkHead.length > 0){
            try {
                // Try to decode the chunk back and see if it is valid.
                // Stop when the chunk is valid.
                valueHead = decodeURIComponent(encodedChunkHead);
                break;
            } catch (error) {
                if (error instanceof URIError && encodedChunkHead.at(-3) === "%" && encodedChunkHead.length > 3) {
                    encodedChunkHead = encodedChunkHead.slice(0, encodedChunkHead.length - 3);
                } else {
                    throw error;
                }
            }
        }
        chunks.push(valueHead);
        encodedValue = encodedValue.slice(encodedChunkHead.length);
    }
    return chunks.map((value, i)=>({
            name: `${key}.${i}`,
            value
        }));
}
async function combineChunks(key, retrieveChunk) {
    const value = await retrieveChunk(key);
    if (value) {
        return value;
    }
    let values = [];
    for(let i = 0;; i++){
        const chunkName = `${key}.${i}`;
        const chunk = await retrieveChunk(chunkName);
        if (!chunk) {
            break;
        }
        values.push(chunk);
    }
    if (values.length > 0) {
        return values.join("");
    }
    return null;
}
async function deleteChunks(key, retrieveChunk, removeChunk) {
    const value = await retrieveChunk(key);
    if (value) {
        await removeChunk(key);
    }
    for(let i = 0;; i++){
        const chunkName = `${key}.${i}`;
        const chunk = await retrieveChunk(chunkName);
        if (!chunk) {
            break;
        }
        await removeChunk(chunkName);
    }
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/utils/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_COOKIE_OPTIONS",
    ()=>DEFAULT_COOKIE_OPTIONS
]);
const DEFAULT_COOKIE_OPTIONS = {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    // https://developer.chrome.com/blog/cookie-max-age-expires
    // https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-cookie-lifetime-limits
    maxAge: 400 * 24 * 60 * 60
};
}),
"[project]/node_modules/@supabase/ssr/dist/module/utils/helpers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowser",
    ()=>isBrowser,
    "memoryLocalStorageAdapter",
    ()=>memoryLocalStorageAdapter,
    "parse",
    ()=>parse,
    "parseCookieHeader",
    ()=>parseCookieHeader,
    "serialize",
    ()=>serialize,
    "serializeCookieHeader",
    ()=>serializeCookieHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/node_modules/cookie/dist/index.js [app-rsc] (ecmascript)");
;
const parse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"];
const serialize = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"];
function parseCookieHeader(header) {
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"](header);
    return Object.keys(parsed ?? {}).map((name)=>({
            name,
            value: parsed[name] ?? ""
        }));
}
function serializeCookieHeader(name, value, options) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serialize"](name, value, options);
}
function isBrowser() {
    return ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof window.document !== "undefined";
}
function memoryLocalStorageAdapter(store = {}) {
    return {
        getItem: (key)=>{
            return store[key] || null;
        },
        setItem: (key, value)=>{
            store[key] = value;
        },
        removeItem: (key)=>{
            delete store[key];
        }
    };
}
}),
"[project]/node_modules/@supabase/ssr/dist/module/version.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '0.12.4';
}),
"[project]/node_modules/@supabase/ssr/dist/module/warnDeprecatedPackage.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "warnIfUsingDeprecatedAuthHelpersPackage",
    ()=>warnIfUsingDeprecatedAuthHelpersPackage
]);
let warned = false;
const DEPRECATED_PACKAGES = [
    "@supabase/auth-helpers-nextjs",
    "@supabase/auth-helpers-react",
    "@supabase/auth-helpers-remix",
    "@supabase/auth-helpers-sveltekit"
];
function warnIfUsingDeprecatedAuthHelpersPackage() {
    if (warned) {
        return;
    }
    if (typeof process === "undefined" || !process.env?.npm_package_name) {
        return;
    }
    const packageName = process.env.npm_package_name;
    if (!DEPRECATED_PACKAGES.includes(packageName)) {
        return;
    }
    warned = true;
    console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${packageName.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${packageName.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `);
}
}),
"[project]/node_modules/@supabase/ssr/node_modules/cookie/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseCookie = parseCookie;
exports.parse = parseCookie;
exports.stringifyCookie = stringifyCookie;
exports.stringifySetCookie = stringifySetCookie;
exports.serialize = stringifySetCookie;
exports.parseSetCookie = parseSetCookie;
exports.stringifySetCookie = stringifySetCookie;
exports.serialize = stringifySetCookie;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */ const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */ const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
/**
 * RegExp to match max-age-value in RFC 6265 sec 5.6.2
 */ const maxAgeRegExp = /^-?\d+$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (()=>{
    const C = function() {};
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a `Cookie` header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */ function parseCookie(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1) break; // No more cookie pairs.
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const key = valueSlice(str, index, eqIdx);
        // only assign once
        if (obj[key] === undefined) {
            obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
    }while (index < len)
    return obj;
}
/**
 * Stringifies an object into an HTTP `Cookie` header.
 */ function stringifyCookie(cookie, options) {
    const enc = options?.encode || encodeURIComponent;
    const cookieStrings = [];
    for (const name of Object.keys(cookie)){
        const val = cookie[name];
        if (val === undefined) continue;
        if (!cookieNameRegExp.test(name)) {
            throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
            throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
    }
    return cookieStrings.join("; ");
}
function stringifySetCookie(_name, _val, _opts) {
    const cookie = typeof _name === "object" ? _name : {
        ..._opts,
        name: _name,
        value: String(_val)
    };
    const options = typeof _val === "object" ? _val : _opts;
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
    }
    const value = cookie.value ? enc(cookie.value) : "";
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
    }
    let str = cookie.name + "=" + value;
    if (cookie.maxAge !== undefined) {
        if (!Number.isInteger(cookie.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
    }
    if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
            throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
    }
    if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
            throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
    }
    if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
    }
    if (cookie.httpOnly) {
        str += "; HttpOnly";
    }
    if (cookie.secure) {
        str += "; Secure";
    }
    if (cookie.partitioned) {
        str += "; Partitioned";
    }
    if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : undefined;
        switch(priority){
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
    }
    if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch(sameSite){
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
    }
    return str;
}
/**
 * Deserialize a `Set-Cookie` header into an object.
 *
 * deserialize('foo=bar; httpOnly')
 *   => { name: 'foo', value: 'bar', httpOnly: true }
 */ function parseSetCookie(str, options) {
    const dec = options?.decode || decode;
    const len = str.length;
    const endIdx = endIndex(str, 0, len);
    const eqIdx = eqIndex(str, 0, endIdx);
    const setCookie = eqIdx === -1 ? {
        name: "",
        value: dec(valueSlice(str, 0, endIdx))
    } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
    };
    let index = endIdx + 1;
    while(index < len){
        const endIdx = endIndex(str, index, len);
        const eqIdx = eqIndex(str, index, endIdx);
        const attr = eqIdx === -1 ? valueSlice(str, index, endIdx) : valueSlice(str, index, eqIdx);
        const val = eqIdx === -1 ? undefined : valueSlice(str, eqIdx + 1, endIdx);
        switch(attr.toLowerCase()){
            case "httponly":
                setCookie.httpOnly = true;
                break;
            case "secure":
                setCookie.secure = true;
                break;
            case "partitioned":
                setCookie.partitioned = true;
                break;
            case "domain":
                setCookie.domain = val;
                break;
            case "path":
                setCookie.path = val;
                break;
            case "max-age":
                if (val && maxAgeRegExp.test(val)) setCookie.maxAge = Number(val);
                break;
            case "expires":
                if (!val) break;
                const date = new Date(val);
                if (Number.isFinite(date.valueOf())) setCookie.expires = date;
                break;
            case "priority":
                if (!val) break;
                const priority = val.toLowerCase();
                if (priority === "low" || priority === "medium" || priority === "high") {
                    setCookie.priority = priority;
                }
                break;
            case "samesite":
                if (!val) break;
                const sameSite = val.toLowerCase();
                if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
                    setCookie.sameSite = sameSite;
                }
                break;
        }
        index = endIdx + 1;
    }
    return setCookie;
}
/**
 * Find the `;` character between `min` and `len` in str.
 */ function endIndex(str, min, len) {
    const index = str.indexOf(";", min);
    return index === -1 ? len : index;
}
/**
 * Find the `=` character between `min` and `max` in str.
 */ function eqIndex(str, min, max) {
    const index = str.indexOf("=", min);
    return index < max ? index : -1;
}
/**
 * Slice out a value between startPod to max.
 */ function valueSlice(str, min, max) {
    let start = min;
    let end = max;
    do {
        const code = str.charCodeAt(start);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) break;
    }while (++start < end)
    while(end > start){
        const code = str.charCodeAt(end - 1);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) break;
        end--;
    }
    return str.slice(start, end);
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */ function decode(str) {
    if (str.indexOf("%") === -1) return str;
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */ function isDate(val) {
    return __toString.call(val) === "[object Date]";
}
}),
"[project]/node_modules/@supabase/storage-js/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageAnalyticsClient",
    ()=>StorageAnalyticsClient,
    "StorageApiError",
    ()=>StorageApiError,
    "StorageClient",
    ()=>StorageClient,
    "StorageError",
    ()=>StorageError,
    "StorageUnknownError",
    ()=>StorageUnknownError,
    "StorageVectorsApiError",
    ()=>StorageVectorsApiError,
    "StorageVectorsClient",
    ()=>StorageVectorsClient,
    "StorageVectorsError",
    ()=>StorageVectorsError,
    "StorageVectorsErrorCode",
    ()=>StorageVectorsErrorCode,
    "StorageVectorsUnknownError",
    ()=>StorageVectorsUnknownError,
    "VectorBucketApi",
    ()=>VectorBucketApi,
    "VectorBucketScope",
    ()=>VectorBucketScope,
    "VectorDataApi",
    ()=>VectorDataApi,
    "VectorIndexApi",
    ()=>VectorIndexApi,
    "VectorIndexScope",
    ()=>VectorIndexScope,
    "isStorageError",
    ()=>isStorageError,
    "isStorageVectorsError",
    ()=>isStorageVectorsError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iceberg$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/iceberg-js/dist/index.mjs [app-rsc] (ecmascript)");
;
//#region \0@oxc-project+runtime@0.103.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/lib/common/errors.ts
/**
* Base error class for all Storage errors
* Supports both 'storage' and 'vectors' namespaces
*/ var StorageError = class extends Error {
    constructor(message, namespace = "storage", status, statusCode){
        super(message);
        this.__isStorageError = true;
        this.namespace = namespace;
        this.name = namespace === "vectors" ? "StorageVectorsError" : "StorageError";
        this.status = status;
        this.statusCode = statusCode;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        };
    }
};
/**
* Type guard to check if an error is a StorageError
* @param error - The error to check
* @returns True if the error is a StorageError
*/ function isStorageError(error) {
    return typeof error === "object" && error !== null && "__isStorageError" in error;
}
/**
* API error returned from Storage service
* Includes HTTP status code and service-specific error code
*/ var StorageApiError = class extends StorageError {
    constructor(message, status, statusCode, namespace = "storage", code){
        super(message, namespace, status, statusCode);
        this.name = namespace === "vectors" ? "StorageVectorsApiError" : "StorageApiError";
        this.status = status;
        this.statusCode = statusCode;
        this.code = code;
    }
    toJSON() {
        return _objectSpread2(_objectSpread2({}, super.toJSON()), {}, {
            code: this.code
        });
    }
};
/**
* Unknown error that doesn't match expected error patterns
* Wraps the original error for debugging
*/ var StorageUnknownError = class extends StorageError {
    constructor(message, originalError, namespace = "storage"){
        super(message, namespace);
        this.name = namespace === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError";
        this.originalError = originalError;
    }
};
/**
* @deprecated Use StorageError with namespace='vectors' instead
* Alias for backward compatibility with existing vector storage code
*/ var StorageVectorsError = class extends StorageError {
    constructor(message){
        super(message, "vectors");
    }
};
/**
* Type guard to check if an error is a StorageVectorsError
* @param error - The error to check
* @returns True if the error is a StorageVectorsError
*/ function isStorageVectorsError(error) {
    return isStorageError(error) && error["namespace"] === "vectors";
}
/**
* @deprecated Use StorageApiError with namespace='vectors' instead
* Alias for backward compatibility with existing vector storage code
*/ var StorageVectorsApiError = class extends StorageApiError {
    constructor(message, status, statusCode){
        super(message, status, statusCode, "vectors");
    }
};
/**
* @deprecated Use StorageUnknownError with namespace='vectors' instead
* Alias for backward compatibility with existing vector storage code
*/ var StorageVectorsUnknownError = class extends StorageUnknownError {
    constructor(message, originalError){
        super(message, originalError, "vectors");
    }
};
/**
* Error codes specific to S3 Vectors API
* Maps AWS service errors to application-friendly error codes
*/ let StorageVectorsErrorCode = /* @__PURE__ */ function(StorageVectorsErrorCode$1) {
    /** Internal server fault (HTTP 500) */ StorageVectorsErrorCode$1["InternalError"] = "InternalError";
    /** Resource already exists / conflict (HTTP 409) */ StorageVectorsErrorCode$1["S3VectorConflictException"] = "S3VectorConflictException";
    /** Resource not found (HTTP 404) */ StorageVectorsErrorCode$1["S3VectorNotFoundException"] = "S3VectorNotFoundException";
    /** Delete bucket while not empty (HTTP 400) */ StorageVectorsErrorCode$1["S3VectorBucketNotEmpty"] = "S3VectorBucketNotEmpty";
    /** Exceeds bucket quota/limit (HTTP 400) */ StorageVectorsErrorCode$1["S3VectorMaxBucketsExceeded"] = "S3VectorMaxBucketsExceeded";
    /** Exceeds index quota/limit (HTTP 400) */ StorageVectorsErrorCode$1["S3VectorMaxIndexesExceeded"] = "S3VectorMaxIndexesExceeded";
    return StorageVectorsErrorCode$1;
}({});
//#endregion
//#region src/lib/common/headers.ts
/**
* Sets a header with case-insensitive deduplication.
* Removes any existing headers whose name matches (case-insensitive),
* then sets the value under the lowercase key. Does not mutate the input object.
*
* @param headers - Existing headers object
* @param name - Header name to set (stored as lowercase)
* @param value - Header value
* @returns New headers object with the header set
*/ function setHeader(headers, name, value) {
    const result = _objectSpread2({}, headers);
    const nameLower = name.toLowerCase();
    for (const key of Object.keys(result))if (key.toLowerCase() === nameLower) delete result[key];
    result[nameLower] = value;
    return result;
}
/**
* Normalizes all header keys to lowercase with case-insensitive deduplication.
* When duplicate keys exist (differing only in case), the last value wins.
* Does not mutate the input object.
*
* @param headers - Headers object to normalize
* @returns New headers object with all keys lowercased
*/ function normalizeHeaders(headers) {
    const result = {};
    for (const [key, value] of Object.entries(headers))result[key.toLowerCase()] = value;
    return result;
}
//#endregion
//#region src/lib/common/helpers.ts
/**
* Resolves the fetch implementation to use
* Uses custom fetch if provided, otherwise uses native fetch
*
* @param customFetch - Optional custom fetch implementation
* @returns Resolved fetch function
*/ const resolveFetch = (customFetch)=>{
    if (customFetch) return (...args)=>customFetch(...args);
    return (...args)=>fetch(...args);
};
/**
* Determine if input is a plain object
* An object is plain if it's created by either {}, new Object(), or Object.create(null)
*
* @param value - Value to check
* @returns True if value is a plain object
* @source https://github.com/sindresorhus/is-plain-obj
*/ const isPlainObject = (value)=>{
    if (typeof value !== "object" || value === null) return false;
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
/**
* Recursively converts object keys from snake_case to camelCase
* Used for normalizing API responses
*
* @param item - Object to convert
* @returns Converted object with camelCase keys
*/ const recursiveToCamel = (item)=>{
    if (Array.isArray(item)) return item.map((el)=>recursiveToCamel(el));
    else if (typeof item === "function" || item !== Object(item)) return item;
    const result = {};
    Object.entries(item).forEach(([key, value])=>{
        const newKey = key.replace(/([-_][a-z])/gi, (c)=>c.toUpperCase().replace(/[-_]/g, ""));
        result[newKey] = recursiveToCamel(value);
    });
    return result;
};
/**
* Validates if a given bucket name is valid according to Supabase Storage API rules
* Mirrors backend validation from: storage/src/storage/limits.ts:isValidBucketName()
*
* Rules:
* - Length: 1-100 characters
* - Allowed characters: alphanumeric (a-z, A-Z, 0-9), underscore (_), and safe special characters
* - Safe special characters: ! - . * ' ( ) space & $ @ = ; : + , ?
* - Forbidden: path separators (/, \), path traversal (..), leading/trailing whitespace
*
* AWS S3 Reference: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
*
* @param bucketName - The bucket name to validate
* @returns true if valid, false otherwise
*/ const isValidBucketName = (bucketName)=>{
    if (!bucketName || typeof bucketName !== "string") return false;
    if (bucketName.length === 0 || bucketName.length > 100) return false;
    if (bucketName.trim() !== bucketName) return false;
    if (bucketName.includes("/") || bucketName.includes("\\")) return false;
    return /^[\w!.\*'() &$@=;:+,?-]+$/.test(bucketName);
};
/**
* Percent-encodes each segment of a storage path so URL delimiters within a
* key (e.g. `?`, `#`) can't be interpreted as a querystring/fragment start.
*
* Splits on `/` so real path separators stay literal — the storage server
* routes on them and decodes each segment back to the original key.
*
* @param path - A bucket id or `bucketId/objectKey` path
* @returns The path with each `/`-delimited segment percent-encoded
*/ const encodeStoragePath = (path)=>path.split("/").map(encodeURIComponent).join("/");
//#endregion
//#region src/lib/common/fetch.ts
/**
* Extracts error message from various error response formats
* @param err - Error object from API
* @returns Human-readable error message
*/ const _getErrorMessage = (err)=>{
    if (typeof err === "object" && err !== null) {
        const e = err;
        if (typeof e.msg === "string") return e.msg;
        if (typeof e.message === "string") return e.message;
        if (typeof e.error_description === "string") return e.error_description;
        if (typeof e.error === "string") return e.error;
        if (typeof e.error === "object" && e.error !== null) {
            const nested = e.error;
            if (typeof nested.message === "string") return nested.message;
        }
    }
    return JSON.stringify(err);
};
/**
* Handles fetch errors and converts them to Storage error types
* @param error - The error caught from fetch
* @param reject - Promise rejection function
* @param options - Fetch options that may affect error handling
* @param namespace - Error namespace ('storage' or 'vectors')
*/ const handleError = async (error, reject, options, namespace)=>{
    if (error !== null && typeof error === "object" && "json" in error && typeof error.json === "function") {
        const responseError = error;
        let status = parseInt(String(responseError.status), 10);
        if (!Number.isFinite(status)) status = 500;
        responseError.json().then((err)=>{
            const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.code) || status + "";
            reject(new StorageApiError(_getErrorMessage(err), status, statusCode, namespace, err === null || err === void 0 ? void 0 : err.code));
        }).catch(()=>{
            const statusCode = status + "";
            reject(new StorageApiError(responseError.statusText || `HTTP ${status} error`, status, statusCode, namespace));
        });
    } else reject(new StorageUnknownError(_getErrorMessage(error), error, namespace));
};
/**
* Builds request parameters for fetch calls
* @param method - HTTP method
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters like AbortSignal
* @param body - Request body (will be JSON stringified if plain object)
* @returns Complete fetch request parameters
*/ const _getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === "GET" || method === "HEAD" || !body) return _objectSpread2(_objectSpread2({}, params), parameters);
    if (isPlainObject(body)) {
        var _contentType;
        const headers = (options === null || options === void 0 ? void 0 : options.headers) || {};
        let contentType;
        for (const [key, value] of Object.entries(headers))if (key.toLowerCase() === "content-type") contentType = value;
        params.headers = setHeader(headers, "Content-Type", (_contentType = contentType) !== null && _contentType !== void 0 ? _contentType : "application/json");
        params.body = JSON.stringify(body);
    } else params.body = body;
    if (options === null || options === void 0 ? void 0 : options.duplex) params.duplex = options.duplex;
    return _objectSpread2(_objectSpread2({}, params), parameters);
};
/**
* Internal request handler that wraps fetch with error handling
* @param fetcher - Fetch function to use
* @param method - HTTP method
* @param url - Request URL
* @param options - Custom fetch options
* @param parameters - Additional fetch parameters
* @param body - Request body
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Promise with parsed response or error
*/ async function _handleRequest(fetcher, method, url, options, parameters, body, namespace) {
    return new Promise((resolve, reject)=>{
        fetcher(url, _getRequestParams(method, options, parameters, body)).then((result)=>{
            if (!result.ok) throw result;
            if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
            if (namespace === "vectors") {
                const contentType = result.headers.get("content-type");
                if (result.headers.get("content-length") === "0" || result.status === 204) return {};
                if (!contentType || !contentType.includes("application/json")) return {};
            }
            return result.json();
        }).then((data)=>resolve(data)).catch((error)=>handleError(error, reject, options, namespace));
    });
}
/**
* Creates a fetch API with the specified namespace
* @param namespace - Error namespace ('storage' or 'vectors')
* @returns Object with HTTP method functions
*/ function createFetchApi(namespace = "storage") {
    return {
        get: async (fetcher, url, options, parameters)=>{
            return _handleRequest(fetcher, "GET", url, options, parameters, void 0, namespace);
        },
        post: async (fetcher, url, body, options, parameters)=>{
            return _handleRequest(fetcher, "POST", url, options, parameters, body, namespace);
        },
        put: async (fetcher, url, body, options, parameters)=>{
            return _handleRequest(fetcher, "PUT", url, options, parameters, body, namespace);
        },
        head: async (fetcher, url, options, parameters)=>{
            return _handleRequest(fetcher, "HEAD", url, _objectSpread2(_objectSpread2({}, options), {}, {
                noResolveJson: true
            }), parameters, void 0, namespace);
        },
        remove: async (fetcher, url, body, options, parameters)=>{
            return _handleRequest(fetcher, "DELETE", url, options, parameters, body, namespace);
        }
    };
}
const defaultApi = createFetchApi("storage");
const { get, post, put, head, remove } = defaultApi;
const vectorsApi = createFetchApi("vectors");
//#endregion
//#region src/lib/common/BaseApiClient.ts
/**
* @ignore
* Base API client class for all Storage API classes
* Provides common infrastructure for error handling and configuration
*
* @typeParam TError - The error type (StorageError or subclass)
*/ var BaseApiClient = class {
    /**
	* Creates a new BaseApiClient instance
	* @param url - Base URL for API requests
	* @param headers - Default headers for API requests
	* @param fetch - Optional custom fetch implementation
	* @param namespace - Error namespace ('storage' or 'vectors')
	*/ constructor(url, headers = {}, fetch$1, namespace = "storage"){
        this.shouldThrowOnError = false;
        this.url = url;
        this.headers = normalizeHeaders(headers);
        this.fetch = resolveFetch(fetch$1);
        this.namespace = namespace;
    }
    /**
	* Enable throwing errors instead of returning them.
	* When enabled, errors are thrown instead of returned in { data, error } format.
	*
	* @returns this - For method chaining
	*/ throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
	* Set an HTTP header for the request.
	* Creates a shallow copy of headers to avoid mutating shared state.
	*
	* @param name - Header name
	* @param value - Header value
	* @returns this - For method chaining
	*/ setHeader(name, value) {
        this.headers = setHeader(this.headers, name, value);
        return this;
    }
    /**
	* Handles API operation with standardized error handling
	* Eliminates repetitive try-catch blocks across all API methods
	*
	* This wrapper:
	* 1. Executes the operation
	* 2. Returns { data, error: null } on success
	* 3. Returns { data: null, error } on failure (if shouldThrowOnError is false)
	* 4. Throws error on failure (if shouldThrowOnError is true)
	*
	* @typeParam T - The expected data type from the operation
	* @param operation - Async function that performs the API call
	* @returns Promise with { data, error } tuple
	*
	* @example Handling an operation
	* ```typescript
	* async listBuckets() {
	*   return this.handleOperation(async () => {
	*     return await get(this.fetch, `${this.url}/bucket`, {
	*       headers: this.headers,
	*     })
	*   })
	* }
	* ```
	*/ async handleOperation(operation) {
        var _this = this;
        try {
            return {
                data: await operation(),
                error: null
            };
        } catch (error) {
            if (_this.shouldThrowOnError) throw error;
            if (isStorageError(error)) return {
                data: null,
                error
            };
            throw error;
        }
    }
};
//#endregion
//#region src/packages/StreamDownloadBuilder.ts
let _Symbol$toStringTag$1;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var StreamDownloadBuilder = class {
    constructor(downloadFn, shouldThrowOnError){
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
        this[_Symbol$toStringTag$1] = "StreamDownloadBuilder";
        this.promise = null;
    }
    then(onfulfilled, onrejected) {
        return this.getPromise().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.getPromise().catch(onrejected);
    }
    finally(onfinally) {
        return this.getPromise().finally(onfinally);
    }
    getPromise() {
        if (!this.promise) this.promise = this.execute();
        return this.promise;
    }
    async execute() {
        var _this = this;
        try {
            return {
                data: (await _this.downloadFn()).body,
                error: null
            };
        } catch (error) {
            if (_this.shouldThrowOnError) throw error;
            if (isStorageError(error)) return {
                data: null,
                error
            };
            throw error;
        }
    }
};
//#endregion
//#region src/packages/BlobDownloadBuilder.ts
let _Symbol$toStringTag;
_Symbol$toStringTag = Symbol.toStringTag;
var BlobDownloadBuilder = class {
    constructor(downloadFn, shouldThrowOnError){
        this.downloadFn = downloadFn;
        this.shouldThrowOnError = shouldThrowOnError;
        this[_Symbol$toStringTag] = "BlobDownloadBuilder";
        this.promise = null;
    }
    asStream() {
        return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
    }
    then(onfulfilled, onrejected) {
        return this.getPromise().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.getPromise().catch(onrejected);
    }
    finally(onfinally) {
        return this.getPromise().finally(onfinally);
    }
    getPromise() {
        if (!this.promise) this.promise = this.execute();
        return this.promise;
    }
    async execute() {
        var _this = this;
        try {
            return {
                data: await (await _this.downloadFn()).blob(),
                error: null
            };
        } catch (error) {
            if (_this.shouldThrowOnError) throw error;
            if (isStorageError(error)) return {
                data: null,
                error
            };
            throw error;
        }
    }
};
//#endregion
//#region src/packages/StorageFileApi.ts
const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: "name",
        order: "asc"
    }
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: false
};
var StorageFileApi = class extends BaseApiClient {
    constructor(url, headers = {}, bucketId, fetch$1){
        super(url, headers, fetch$1, "storage");
        this.bucketId = bucketId;
    }
    /**
	* Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
	*
	* @param method HTTP method.
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	*/ async uploadOrUpdate(method, path, fileBody, fileOptions) {
        var _this = this;
        return _this.handleOperation(async ()=>{
            let body;
            const options = _objectSpread2(_objectSpread2({}, DEFAULT_FILE_OPTIONS), fileOptions);
            let headers = _objectSpread2(_objectSpread2({}, _this.headers), method === "POST" && {
                "x-upsert": String(options.upsert)
            });
            const metadata = options.metadata;
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                body = new FormData();
                body.append("cacheControl", options.cacheControl);
                if (metadata) body.append("metadata", _this.encodeMetadata(metadata));
                body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                body = fileBody;
                if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
                if (metadata && !body.has("metadata")) body.append("metadata", _this.encodeMetadata(metadata));
            } else {
                body = fileBody;
                headers["cache-control"] = `max-age=${options.cacheControl}`;
                headers["content-type"] = options.contentType;
                if (metadata) headers["x-metadata"] = _this.toBase64(_this.encodeMetadata(metadata));
                if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
            }
            if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers))headers = setHeader(headers, key, value);
            const cleanPath = _this._removeEmptyFolders(path);
            const _path = _this._getFinalPath(cleanPath);
            const data = await (method == "PUT" ? put : post)(_this.fetch, `${_this.url}/object/${_path}`, body, _objectSpread2({
                headers
            }, (options === null || options === void 0 ? void 0 : options.duplex) ? {
                duplex: options.duplex
            } : {}));
            return {
                path: cleanPath,
                id: data.Id,
                fullPath: data.Key
            };
        });
    }
    /**
	* Uploads a file to an existing bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, upsert, and metadata.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Upload file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600',
	*     upsert: false
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Upload file using `ArrayBuffer` from base64 file data
	* ```js
	* import { decode } from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*
	* @example Handling errors
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .upload('public/avatar1.png', avatarFile)
	*
	* if (error) {
	*   // Log the full error so fields like `statusCode` and `error` (the
	*   // Storage error name, e.g. "Duplicate") aren't hidden behind `error.message`.
	*   console.error(error)
	*   return
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: only `insert` when you are uploading new files and `select`, `insert` and `update` when you are upserting files
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	* - For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Upload file using `ArrayBuffer` from base64 file data instead, see example below.
	*/ async upload(path, fileBody, fileOptions) {
        return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    }
    /**
	* Upload a file with a token generated from `createSignedUploadUrl`.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
	* @param token The token generated from `createSignedUploadUrl`
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions HTTP headers (cacheControl, contentType, etc.).
	* **Note:** The `upsert` option has no effect here. To enable upsert behavior,
	* pass `{ upsert: true }` when calling `createSignedUploadUrl()` instead.
	* @returns Promise with response containing file path and fullPath or error
	*
	* @example Upload to a signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .uploadToSignedUrl('folder/cat.jpg', 'token-from-createSignedUploadUrl', file)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "folder/cat.jpg",
	*     "fullPath": "avatars/folder/cat.jpg"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async uploadToSignedUrl(path, token, fileBody, fileOptions) {
        var _this3 = this;
        const cleanPath = _this3._removeEmptyFolders(path);
        const _path = _this3._getFinalPath(cleanPath);
        const url = new URL(_this3.url + `/object/upload/sign/${_path}`);
        url.searchParams.set("token", token);
        return _this3.handleOperation(async ()=>{
            let body;
            const options = _objectSpread2(_objectSpread2({}, DEFAULT_FILE_OPTIONS), fileOptions);
            let headers = _objectSpread2(_objectSpread2({}, _this3.headers), {
                "x-upsert": String(options.upsert)
            });
            const metadata = options.metadata;
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                body = new FormData();
                body.append("cacheControl", options.cacheControl);
                if (metadata) body.append("metadata", _this3.encodeMetadata(metadata));
                body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                body = fileBody;
                if (!body.has("cacheControl")) body.append("cacheControl", options.cacheControl);
                if (metadata && !body.has("metadata")) body.append("metadata", _this3.encodeMetadata(metadata));
            } else {
                body = fileBody;
                headers["cache-control"] = `max-age=${options.cacheControl}`;
                headers["content-type"] = options.contentType;
                if (metadata) headers["x-metadata"] = _this3.toBase64(_this3.encodeMetadata(metadata));
                if ((typeof ReadableStream !== "undefined" && body instanceof ReadableStream || body && typeof body === "object" && "pipe" in body && typeof body.pipe === "function") && !options.duplex) options.duplex = "half";
            }
            if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) for (const [key, value] of Object.entries(fileOptions.headers))headers = setHeader(headers, key, value);
            return {
                path: cleanPath,
                fullPath: (await put(_this3.fetch, url.toString(), body, _objectSpread2({
                    headers
                }, (options === null || options === void 0 ? void 0 : options.duplex) ? {
                    duplex: options.duplex
                } : {}))).Key
            };
        });
    }
    /**
	* Creates a signed upload URL.
	* Signed upload URLs can be used to upload files to the bucket without further authentication.
	* They are valid for 2 hours.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param options.upsert If set to true, allows the file to be overwritten if it already exists.
	* @returns Promise with response containing signed upload URL, token, and path or error
	*
	* @example Create Signed Upload URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUploadUrl('folder/cat.jpg')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/upload/sign/avatars/folder/cat.jpg?token=<TOKEN>",
	*     "path": "folder/cat.jpg",
	*     "token": "<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `insert`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async createSignedUploadUrl(path, options) {
        var _this4 = this;
        return _this4.handleOperation(async ()=>{
            let _path = _this4._getFinalPath(path);
            const headers = _objectSpread2({}, _this4.headers);
            if (options === null || options === void 0 ? void 0 : options.upsert) headers["x-upsert"] = "true";
            const data = await post(_this4.fetch, `${_this4.url}/object/upload/sign/${_path}`, {}, {
                headers
            });
            const url = new URL(_this4.url + data.url);
            const token = url.searchParams.get("token");
            if (!token) throw new StorageError("No token returned by API");
            return {
                signedUrl: url.toString(),
                path,
                token
            };
        });
    }
    /**
	* Replaces an existing file at the specified path with a new one.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
	* @param fileBody The body of the file to be stored in the bucket.
	* @param fileOptions Optional file upload options including cacheControl, contentType, and metadata.
	* **Note:** The `upsert` option has no effect here. `update()` always replaces the
	* file at the given path, so the `x-upsert` header is not sent. To control upsert
	* behavior, use `upload()` instead.
	* @returns Promise with response containing file path, id, and fullPath or error
	*
	* @example Update file
	* ```js
	* const avatarFile = event.target.files[0]
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', avatarFile, {
	*     cacheControl: '3600'
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "public/avatar1.png",
	*     "fullPath": "avatars/public/avatar1.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Update file using `ArrayBuffer` from base64 file data
	* ```js
	* import {decode} from 'base64-arraybuffer'
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .update('public/avatar1.png', decode('base64FileData'), {
	*     contentType: 'image/png'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `update` and `select`
	* - `update()` always replaces the file at the given path regardless of the `upsert` option.
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	* - For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Update file using `ArrayBuffer` from base64 file data instead, see example below.
	*/ async update(path, fileBody, fileOptions) {
        return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    }
    /**
	* Moves an existing file to a new path in the same bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
	* @param options The destination options.
	* @returns Promise with response containing success message or error
	*
	* @example Move file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .move('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully moved"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `update` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async move(fromPath, toPath, options) {
        var _this6 = this;
        return _this6.handleOperation(async ()=>{
            return await post(_this6.fetch, `${_this6.url}/object/move`, {
                bucketId: _this6.bucketId,
                sourceKey: fromPath,
                destinationKey: toPath,
                destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
            }, {
                headers: _this6.headers
            });
        });
    }
    /**
	* Copies an existing file to a new path in the same bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param fromPath The original file path, including the current file name. For example `folder/image.png`.
	* @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
	* @param options The destination options.
	* @returns Promise with response containing copied file path or error
	*
	* @example Copy file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .copy('public/avatar1.png', 'private/avatar2.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "path": "avatars/private/avatar2.png"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `insert` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async copy(fromPath, toPath, options) {
        var _this7 = this;
        return _this7.handleOperation(async ()=>{
            return {
                path: (await post(_this7.fetch, `${_this7.url}/object/copy`, {
                    bucketId: _this7.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath,
                    destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
                }, {
                    headers: _this7.headers
                })).Key
            };
        });
    }
    /**
	* Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the current file name. For example `folder/image.png`.
	* @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @returns Promise with response containing signed URL or error
	*
	* @example Create Signed URL
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @example Create a signed URL for an asset with transformations
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Create a signed URL which triggers the download of the asset
	* ```js
	* const { data } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrl('folder/avatar1.png', 60, {
	*     download: true,
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async createSignedUrl(path, expiresIn, options) {
        var _this8 = this;
        return _this8.handleOperation(async ()=>{
            let _path = _this8._getFinalPath(path);
            const hasTransform = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0;
            let data = await post(_this8.fetch, `${_this8.url}/object/sign/${_path}`, _objectSpread2({
                expiresIn
            }, hasTransform ? {
                transform: options.transform
            } : {}), {
                headers: _this8.headers
            });
            const query = new URLSearchParams();
            if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
            if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
            const queryString = query.toString();
            return {
                signedUrl: encodeURI(`${_this8.url}${data.signedURL}${queryString ? `&${queryString}` : ""}`)
            };
        });
    }
    /**
	* Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
	* @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
	* @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @returns Promise with response containing array of objects with signedUrl, path, and error or error
	*
	* @example Create Signed URLs
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "error": null,
	*       "path": "folder/avatar1.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar1.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar1.png?token=<TOKEN>"
	*     },
	*     {
	*       "error": null,
	*       "path": "folder/avatar2.png",
	*       "signedURL": "/object/sign/avatars/folder/avatar2.png?token=<TOKEN>",
	*       "signedUrl": "https://example.supabase.co/storage/v1/object/sign/avatars/folder/avatar2.png?token=<TOKEN>"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async createSignedUrls(paths, expiresIn, options) {
        var _this9 = this;
        return _this9.handleOperation(async ()=>{
            const data = await post(_this9.fetch, `${_this9.url}/object/sign/${_this9.bucketId}`, {
                expiresIn,
                paths
            }, {
                headers: _this9.headers
            });
            const query = new URLSearchParams();
            if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
            if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
            const queryString = query.toString();
            return data.map((datum)=>_objectSpread2(_objectSpread2({}, datum), {}, {
                    signedUrl: datum.signedURL ? encodeURI(`${_this9.url}${datum.signedURL}${queryString ? `&${queryString}` : ""}`) : null
                }));
        });
    }
    /**
	* Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
	* @param options Optional settings: `transform` to transform the asset before serving it to the client, and `cacheNonce` to append a cache nonce parameter to the URL to invalidate the cache.
	* @param parameters Additional fetch parameters like signal for cancellation. Supports standard fetch options including cache control.
	* @returns BlobDownloadBuilder instance for downloading the file
	*
	* @example Download file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": <BLOB>,
	*   "error": null
	* }
	* ```
	*
	* @example Download file with transformations
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*       quality: 80
	*     }
	*   })
	* ```
	*
	* @example Download with cache control (useful in Edge Functions)
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { cache: 'no-store' })
	* ```
	*
	* @example Download with abort signal
	* ```js
	* const controller = new AbortController()
	* setTimeout(() => controller.abort(), 5000)
	*
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .download('folder/avatar1.png', {}, { signal: controller.signal })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ download(path, options, parameters) {
        const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image/authenticated" : "object";
        const query = new URLSearchParams();
        if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
        if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
        const queryString = query.toString();
        const _path = this._getFinalPath(path);
        const downloadFn = ()=>get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString ? `?${queryString}` : ""}`, {
                headers: this.headers,
                noResolveJson: true
            }, parameters);
        return new BlobDownloadBuilder(downloadFn, this.shouldThrowOnError);
    }
    /**
	* Retrieves the details of an existing file.
	*
	* Returns detailed file metadata including size, content type, and timestamps.
	* Note: The API returns `last_modified` field, not `updated_at`.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @returns Promise with response containing file metadata or error
	*
	* @example Get file info
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .info('folder/avatar1.png')
	*
	* if (data) {
	*   console.log('Last modified:', data.lastModified)
	*   console.log('Size:', data.size)
	* }
	* ```
	*/ async info(path) {
        var _this10 = this;
        const _path = _this10._getFinalPath(path);
        return _this10.handleOperation(async ()=>{
            return recursiveToCamel(await get(_this10.fetch, `${_this10.url}/object/info/${_path}`, {
                headers: _this10.headers
            }));
        });
    }
    /**
	* Checks the existence of a file.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The file path, including the file name. For example `folder/image.png`.
	* @returns Promise with response containing boolean indicating file existence or error
	*
	* @example Check file existence
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .exists('folder/avatar1.png')
	* ```
	*/ async exists(path) {
        var _this11 = this;
        const _path = _this11._getFinalPath(path);
        try {
            await head(_this11.fetch, `${_this11.url}/object/${_path}`, {
                headers: _this11.headers
            });
            return {
                data: true,
                error: null
            };
        } catch (error) {
            if (_this11.shouldThrowOnError) throw error;
            if (isStorageError(error)) {
                var _error$originalError;
                const status = error instanceof StorageApiError ? error.status : error instanceof StorageUnknownError ? (_error$originalError = error.originalError) === null || _error$originalError === void 0 ? void 0 : _error$originalError.status : void 0;
                if (status !== void 0 && [
                    400,
                    404
                ].includes(status)) return {
                    data: false,
                    error
                };
            }
            throw error;
        }
    }
    /**
	* A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
	* This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
	* @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
	* @param options.transform Transform the asset before serving it to the client.
	* @param options.cacheNonce Append a cache nonce parameter to the URL to invalidate the cache.
	* @returns Object with public URL
	*
	* @example Returns the URL for an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "publicUrl": "https://example.supabase.co/storage/v1/object/public/public-bucket/folder/avatar1.png"
	*   }
	* }
	* ```
	*
	* @example Returns the URL for an asset in a public bucket with transformations
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     transform: {
	*       width: 100,
	*       height: 100,
	*     }
	*   })
	* ```
	*
	* @example Returns the URL which triggers the download of an asset in a public bucket
	* ```js
	* const { data } = supabase
	*   .storage
	*   .from('public-bucket')
	*   .getPublicUrl('folder/avatar1.png', {
	*     download: true,
	*   })
	* ```
	*
	* @remarks
	* - The bucket needs to be set to public, either via [updateBucket()](/docs/reference/javascript/storage-updatebucket) or by going to Storage on [supabase.com/dashboard](https://supabase.com/dashboard), clicking the overflow menu on a bucket and choosing "Make public"
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const query = new URLSearchParams();
        if (options === null || options === void 0 ? void 0 : options.download) query.set("download", options.download === true ? "" : options.download);
        if (options === null || options === void 0 ? void 0 : options.transform) this.applyTransformOptsToQuery(query, options.transform);
        if ((options === null || options === void 0 ? void 0 : options.cacheNonce) != null) query.set("cacheNonce", String(options.cacheNonce));
        const queryString = query.toString();
        const renderPath = typeof (options === null || options === void 0 ? void 0 : options.transform) === "object" && options.transform !== null && Object.keys(options.transform).length > 0 ? "render/image" : "object";
        return {
            data: {
                publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}`) + (queryString ? `?${queryString}` : "")
            }
        };
    }
    /**
	* Deletes files within the same bucket
	*
	* Returns an array of FileObject entries for the deleted files. Note that deprecated
	* fields like `bucket_id` may or may not be present in the response - do not rely on them.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
	* @returns Promise with response containing array of deleted file objects or error
	*
	* @example Delete file
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .remove(['folder/avatar1.png'])
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [],
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `delete` and `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async remove(paths) {
        var _this12 = this;
        return _this12.handleOperation(async ()=>{
            return await remove(_this12.fetch, `${_this12.url}/object/${_this12.bucketId}`, {
                prefixes: paths
            }, {
                headers: _this12.headers
            });
        });
    }
    /**
	* Purges the CDN cache for a single object in this bucket.
	*
	* Maps to `DELETE /cdn/{bucket}/{path}` on the Storage API. The server
	* issues a CDN invalidation for the object and returns `{ message: 'success' }`.
	*
	* **Requires the `service_role` key.** The underlying endpoint enforces
	* `service_role` JWT — calls made with the anon key or a user JWT will be
	* rejected by the server.
	*
	* **Hosted CDN feature.** On self-hosted Supabase, the Storage service must
	* have `CDN_PURGE_ENDPOINT_URL` configured and the `purgeCache` tenant
	* feature enabled, otherwise the server returns an error.
	*
	* Operates on a single object path. There is no wildcard or recursion: pass
	* the exact path of the object you want invalidated.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The path (relative to the bucket) of the object to purge, e.g. `folder/avatar.png`.
	* @param options Optional purge cache options.
	* @param options.transformations If true, purges only transformations (resized/formatted variants), leaving the original cached file intact.
	* @param parameters Optional fetch parameters such as an `AbortController` signal.
	* @returns Promise with `{ data: { message }, error: null }` on success or `{ data: null, error }` on failure.
	*
	* @example Purge a single cached object
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .purgeCache('folder/avatar1.png')
	* ```
	*
	* @example Purge only transformations for a single object
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .purgeCache('folder/avatar1.png', { transformations: true })
	* ```
	*/ async purgeCache(path, options, parameters) {
        var _this13 = this;
        return _this13.handleOperation(async ()=>{
            const _path = encodeStoragePath(_this13._getFinalPath(path));
            const query = new URLSearchParams();
            if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
            const queryString = query.toString();
            return await remove(_this13.fetch, `${_this13.url}/cdn/${_path}${queryString ? `?${queryString}` : ""}`, {}, {
                headers: _this13.headers
            }, parameters);
        });
    }
    /**
	* Get file metadata
	* @param id the file id to retrieve metadata
	*/ /**
	* Update file metadata
	* @param id the file id to update metadata
	* @param meta the new file metadata
	*/ /**
	* Lists all the files and folders within a path of the bucket.
	*
	* **Important:** For folder entries, fields like `id`, `updated_at`, `created_at`,
	* `last_accessed_at`, and `metadata` will be `null`. Only files have these fields populated.
	* Additionally, deprecated fields like `bucket_id`, `owner`, and `buckets` are NOT returned
	* by this method.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param path The folder path.
	* @param options Search options including limit (defaults to 100), offset, sortBy, and search
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing array of files/folders or error
	*
	* @example List files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*   })
	*
	* // Handle files vs folders
	* data?.forEach(item => {
	*   if (item.id !== null) {
	*     // It's a file
	*     console.log('File:', item.name, 'Size:', item.metadata?.size)
	*   } else {
	*     // It's a folder
	*     console.log('Folder:', item.name)
	*   }
	* })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "avatar1.png",
	*       "id": "e668cf7f-821b-4a2f-9dce-7dfa5dd1cfd2",
	*       "updated_at": "2024-05-22T23:06:05.580Z",
	*       "created_at": "2024-05-22T23:04:34.443Z",
	*       "last_accessed_at": "2024-05-22T23:04:34.443Z",
	*       "metadata": {
	*         "eTag": "\"c5e8c553235d9af30ef4f6e280790b92\"",
	*         "size": 32175,
	*         "mimetype": "image/png",
	*         "cacheControl": "max-age=3600",
	*         "lastModified": "2024-05-22T23:06:05.574Z",
	*         "contentLength": 32175,
	*         "httpStatusCode": 200
	*       }
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @example Search files in a bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .list('folder', {
	*     limit: 100,
	*     offset: 0,
	*     sortBy: { column: 'name', order: 'asc' },
	*     search: 'jon'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: none
	*   - `objects` table permissions: `select`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async list(path, options, parameters) {
        var _this14 = this;
        return _this14.handleOperation(async ()=>{
            const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) ? _objectSpread2(_objectSpread2({}, DEFAULT_SEARCH_OPTIONS.sortBy), options.sortBy) : DEFAULT_SEARCH_OPTIONS.sortBy;
            const body = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_SEARCH_OPTIONS), options), {}, {
                sortBy,
                prefix: path || ""
            });
            return await post(_this14.fetch, `${_this14.url}/object/list/${_this14.bucketId}`, body, {
                headers: _this14.headers
            }, parameters);
        });
    }
    /**
	* Lists all the files and folders within a bucket using the V2 API with pagination support.
	*
	* **Important:** Folder entries in the `folders` array only contain `name` and optionally `key` —
	* they have no `id`, timestamps, or `metadata` fields. Full file metadata is only available
	* on entries in the `objects` array.
	*
	* @experimental this method signature might change in the future
	*
	* @category Storage
	* @subcategory File Buckets
	* @param options Search options including prefix, cursor for pagination, limit, with_delimiter
	* @param parameters Optional fetch parameters including signal for cancellation
	* @returns Promise with response containing folders/objects arrays with pagination info or error
	*
	* @example List files with pagination
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .from('avatars')
	*   .listV2({
	*     prefix: 'folder/',
	*     limit: 100,
	*   })
	*
	* // Handle pagination
	* if (data?.hasNext) {
	*   const nextPage = await supabase
	*     .storage
	*     .from('avatars')
	*     .listV2({
	*       prefix: 'folder/',
	*       cursor: data.nextCursor,
	*     })
	* }
	*
	* // Handle files vs folders
	* data?.objects.forEach(file => {
	*   if (file.id !== null) {
	*     console.log('File:', file.name, 'Size:', file.metadata?.size)
	*   }
	* })
	* data?.folders.forEach(folder => {
	*   console.log('Folder:', folder.name)
	* })
	* ```
	*/ async listV2(options, parameters) {
        var _this15 = this;
        return _this15.handleOperation(async ()=>{
            const body = _objectSpread2({}, options);
            return await post(_this15.fetch, `${_this15.url}/object/list-v2/${_this15.bucketId}`, body, {
                headers: _this15.headers
            }, parameters);
        });
    }
    encodeMetadata(metadata) {
        return JSON.stringify(metadata);
    }
    toBase64(data) {
        if (typeof Buffer !== "undefined") return Buffer.from(data).toString("base64");
        return btoa(data);
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path.replace(/^\/+/, "")}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    /** Modifies the `query`, appending values the from `transform` */ applyTransformOptsToQuery(query, transform) {
        if (transform.width) query.set("width", transform.width.toString());
        if (transform.height) query.set("height", transform.height.toString());
        if (transform.resize) query.set("resize", transform.resize);
        if (transform.format) query.set("format", transform.format);
        if (transform.quality) query.set("quality", transform.quality.toString());
        return query;
    }
};
//#endregion
//#region src/lib/version.ts
const version = "2.112.3";
//#endregion
//#region src/lib/constants.ts
const DEFAULT_HEADERS = {
    "X-Client-Info": `storage-js/${version}`
};
//#endregion
//#region src/packages/StorageBucketApi.ts
var StorageBucketApi = class extends BaseApiClient {
    constructor(url, headers = {}, fetch$1, opts){
        const baseUrl = new URL(url);
        if (opts === null || opts === void 0 ? void 0 : opts.useNewHostname) {
            if (/supabase\.(co|in|red)$/.test(baseUrl.hostname) && !baseUrl.hostname.includes("storage.supabase.")) baseUrl.hostname = baseUrl.hostname.replace("supabase.", "storage.supabase.");
        }
        const finalUrl = baseUrl.href.replace(/\/$/, "");
        const finalHeaders = _objectSpread2(_objectSpread2({}, DEFAULT_HEADERS), headers);
        super(finalUrl, finalHeaders, fetch$1, "storage");
    }
    /**
	* Retrieves the details of all Storage buckets within an existing project.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of buckets or error
	*
	* @example List buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets()
	* ```
	*
	* @example List buckets with options
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc',
	*     search: 'prod'
	*   })
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async listBuckets(options) {
        var _this = this;
        return _this.handleOperation(async ()=>{
            const queryString = _this.listBucketOptionsToQueryString(options);
            return await get(_this.fetch, `${_this.url}/bucket${queryString}`, {
                headers: _this.headers
            });
        });
    }
    /**
	* Retrieves the details of an existing Storage bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to retrieve.
	* @returns Promise with response containing bucket details or error
	*
	* @example Get bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .getBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "id": "avatars",
	*     "name": "avatars",
	*     "owner": "",
	*     "public": false,
	*     "file_size_limit": 1024,
	*     "allowed_mime_types": [
	*       "image/png"
	*     ],
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async getBucket(id) {
        var _this2 = this;
        return _this2.handleOperation(async ()=>{
            return await get(_this2.fetch, `${_this2.url}/bucket/${id}`, {
                headers: _this2.headers
            });
        });
    }
    /**
	* Creates a new Storage bucket
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id A unique identifier for the bucket you are creating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
	*   - default bucket type is `STANDARD`
	* @returns Promise with response containing newly created bucket name or error
	*
	* @example Create bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .createBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "avatars"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `insert`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async createBucket(id, options = {
        public: false
    }) {
        var _this3 = this;
        return _this3.handleOperation(async ()=>{
            return await post(_this3.fetch, `${_this3.url}/bucket`, {
                id,
                name: id,
                type: options.type,
                public: options.public,
                file_size_limit: options.fileSizeLimit,
                allowed_mime_types: options.allowedMimeTypes
            }, {
                headers: _this3.headers
            });
        });
    }
    /**
	* Updates a Storage bucket
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id A unique identifier for the bucket you are updating.
	* @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
	* @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
	* The global file size limit takes precedence over this value.
	* The default value is null, which doesn't set a per bucket file size limit.
	* @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
	* The default value is null, which allows files with all mime types to be uploaded.
	* Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
	* @returns Promise with response containing success message or error
	*
	* @example Update bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .updateBucket('avatars', {
	*     public: false,
	*     allowedMimeTypes: ['image/png'],
	*     fileSizeLimit: 1024
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully updated"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `update`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async updateBucket(id, options) {
        var _this4 = this;
        return _this4.handleOperation(async ()=>{
            return await put(_this4.fetch, `${_this4.url}/bucket/${id}`, {
                id,
                name: id,
                public: options.public,
                file_size_limit: options.fileSizeLimit,
                allowed_mime_types: options.allowedMimeTypes
            }, {
                headers: _this4.headers
            });
        });
    }
    /**
	* Removes all objects inside a single bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to empty.
	* @returns Promise with success message or error
	*
	* @example Empty bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .emptyBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully emptied"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select`
	*   - `objects` table permissions: `select` and `delete`
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async emptyBucket(id) {
        var _this5 = this;
        return _this5.handleOperation(async ()=>{
            return await post(_this5.fetch, `${_this5.url}/bucket/${id}/empty`, {}, {
                headers: _this5.headers
            });
        });
    }
    /**
	* Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
	* You must first `empty()` the bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to delete.
	* @returns Promise with success message or error
	*
	* @example Delete bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .deleteBucket('avatars')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - RLS policy permissions required:
	*   - `buckets` table permissions: `select` and `delete`
	*   - `objects` table permissions: none
	* - Refer to the [Storage guide](/docs/guides/storage/security/access-control) on how access control works
	*/ async deleteBucket(id) {
        var _this6 = this;
        return _this6.handleOperation(async ()=>{
            return await remove(_this6.fetch, `${_this6.url}/bucket/${id}`, {}, {
                headers: _this6.headers
            });
        });
    }
    /**
	* Purges the CDN cache for an entire bucket.
	*
	* Maps to `DELETE /cdn/{bucket}` on the Storage API. The server
	* issues a CDN invalidation for the bucket and returns `{ message: 'success' }`.
	*
	* **Requires the `service_role` key.** The underlying endpoint enforces
	* `service_role` JWT — calls made with the anon key or a user JWT will be
	* rejected by the server.
	*
	* **Hosted CDN feature.** On self-hosted Supabase, the Storage service must
	* have `CDN_PURGE_ENDPOINT_URL` configured and the `purgeCache` tenant
	* feature enabled, otherwise the server returns an error.
	*
	* @category Storage
	* @subcategory File Buckets
	* @param id The unique identifier of the bucket you would like to purge from cache.
	* @param options Optional purge cache options.
	* @param options.transformations If true, purges only transformations (resized/formatted variants), leaving original cached files intact.
	* @param parameters Optional fetch parameters such as an `AbortController` signal.
	* @returns Promise with `{ data: { message }, error: null }` on success or `{ data: null, error }` on failure.
	*
	* @example Purge cache for an entire bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .purgeBucketCache('avatars')
	* ```
	*
	* @example Purge only transformations for an entire bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .purgeBucketCache('avatars', { transformations: true })
	* ```
	*/ async purgeBucketCache(id, options, parameters) {
        var _this7 = this;
        return _this7.handleOperation(async ()=>{
            const query = new URLSearchParams();
            if (options === null || options === void 0 ? void 0 : options.transformations) query.set("transformations", "true");
            const queryString = query.toString();
            return await remove(_this7.fetch, `${_this7.url}/cdn/${encodeStoragePath(id)}${queryString ? `?${queryString}` : ""}`, {}, {
                headers: _this7.headers
            }, parameters);
        });
    }
    listBucketOptionsToQueryString(options) {
        const params = {};
        if (options) {
            if ("limit" in options) params.limit = String(options.limit);
            if ("offset" in options) params.offset = String(options.offset);
            if (options.search) params.search = options.search;
            if (options.sortColumn) params.sortColumn = options.sortColumn;
            if (options.sortOrder) params.sortOrder = options.sortOrder;
        }
        return Object.keys(params).length > 0 ? "?" + new URLSearchParams(params).toString() : "";
    }
};
//#endregion
//#region src/packages/StorageAnalyticsClient.ts
/**
* Client class for managing Analytics Buckets using Iceberg tables
* Provides methods for creating, listing, and deleting analytics buckets
*/ var StorageAnalyticsClient = class extends BaseApiClient {
    /**
	* @alpha
	*
	* Creates a new StorageAnalyticsClient instance
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param url - The base URL for the storage API
	* @param headers - HTTP headers to include in requests
	* @param fetch - Optional custom fetch implementation
	*
	* @example Using supabase-js (recommended)
	* ```typescript
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const { data, error } = await supabase.storage.analytics.listBuckets()
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```typescript
	* import { StorageAnalyticsClient } from '@supabase/storage-js'
	*
	* const client = new StorageAnalyticsClient(url, headers)
	* ```
	*/ constructor(url, headers = {}, fetch$1){
        const finalUrl = url.replace(/\/$/, "");
        const finalHeaders = _objectSpread2(_objectSpread2({}, DEFAULT_HEADERS), headers);
        super(finalUrl, finalHeaders, fetch$1, "storage");
    }
    /**
	* @alpha
	*
	* Creates a new analytics bucket using Iceberg tables
	* Analytics buckets are optimized for analytical queries and data processing
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param name A unique name for the bucket you are creating
	* @returns Promise with response containing newly created analytics bucket or error
	*
	* @example Create analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "name": "analytics-data",
	*     "type": "ANALYTICS",
	*     "format": "iceberg",
	*     "created_at": "2024-05-22T22:26:05.100Z",
	*     "updated_at": "2024-05-22T22:26:05.100Z"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Creates a new analytics bucket using Iceberg tables
	* - Analytics buckets are optimized for analytical queries and data processing
	*/ async createBucket(name) {
        var _this = this;
        return _this.handleOperation(async ()=>{
            return await post(_this.fetch, `${_this.url}/bucket`, {
                name
            }, {
                headers: _this.headers
            });
        });
    }
    /**
	* @alpha
	*
	* Retrieves the details of all Analytics Storage buckets within an existing project
	* Only returns buckets of type 'ANALYTICS'
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param options Query parameters for listing buckets
	* @param options.limit Maximum number of buckets to return
	* @param options.offset Number of buckets to skip
	* @param options.sortColumn Column to sort by ('name', 'created_at', 'updated_at')
	* @param options.sortOrder Sort order ('asc' or 'desc')
	* @param options.search Search term to filter bucket names
	* @returns Promise with response containing array of analytics buckets or error
	*
	* @example List analytics buckets
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .listBuckets({
	*     limit: 10,
	*     offset: 0,
	*     sortColumn: 'created_at',
	*     sortOrder: 'desc'
	*   })
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": [
	*     {
	*       "name": "analytics-data",
	*       "type": "ANALYTICS",
	*       "format": "iceberg",
	*       "created_at": "2024-05-22T22:26:05.100Z",
	*       "updated_at": "2024-05-22T22:26:05.100Z"
	*     }
	*   ],
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Retrieves the details of all Analytics Storage buckets within an existing project
	* - Only returns buckets of type 'ANALYTICS'
	*/ async listBuckets(options) {
        var _this2 = this;
        return _this2.handleOperation(async ()=>{
            const queryParams = new URLSearchParams();
            if ((options === null || options === void 0 ? void 0 : options.limit) !== void 0) queryParams.set("limit", options.limit.toString());
            if ((options === null || options === void 0 ? void 0 : options.offset) !== void 0) queryParams.set("offset", options.offset.toString());
            if (options === null || options === void 0 ? void 0 : options.sortColumn) queryParams.set("sortColumn", options.sortColumn);
            if (options === null || options === void 0 ? void 0 : options.sortOrder) queryParams.set("sortOrder", options.sortOrder);
            if (options === null || options === void 0 ? void 0 : options.search) queryParams.set("search", options.search);
            const queryString = queryParams.toString();
            const url = queryString ? `${_this2.url}/bucket?${queryString}` : `${_this2.url}/bucket`;
            return await get(_this2.fetch, url, {
                headers: _this2.headers
            });
        });
    }
    /**
	* @alpha
	*
	* Deletes an existing analytics bucket
	* A bucket can't be deleted with existing objects inside it
	* You must first empty the bucket before deletion
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param bucketName The unique identifier of the bucket you would like to delete
	* @returns Promise with response containing success message or error
	*
	* @example Delete analytics bucket
	* ```js
	* const { data, error } = await supabase
	*   .storage
	*   .analytics
	*   .deleteBucket('analytics-data')
	* ```
	*
	* Response:
	* ```json
	* {
	*   "data": {
	*     "message": "Successfully deleted"
	*   },
	*   "error": null
	* }
	* ```
	*
	* @remarks
	* - Deletes an analytics bucket
	*/ async deleteBucket(bucketName) {
        var _this3 = this;
        return _this3.handleOperation(async ()=>{
            return await remove(_this3.fetch, `${_this3.url}/bucket/${bucketName}`, {}, {
                headers: _this3.headers
            });
        });
    }
    /**
	* @alpha
	*
	* Get an Iceberg REST Catalog client configured for a specific analytics bucket
	* Use this to perform advanced table and namespace operations within the bucket
	* The returned client provides full access to the Apache Iceberg REST Catalog API
	* with the Supabase `{ data, error }` pattern for consistent error handling on all operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	* @param bucketName - The name of the analytics bucket (warehouse) to connect to
	* @returns The wrapped Iceberg catalog client
	* @throws {StorageError} If the bucket name is invalid
	*
	* @example Get catalog and create table
	* ```js
	* // First, create an analytics bucket
	* const { data: bucket, error: bucketError } = await supabase
	*   .storage
	*   .analytics
	*   .createBucket('analytics-data')
	*
	* // Get the Iceberg catalog for that bucket
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Create a namespace
	* const { error: nsError } = await catalog.createNamespace({ namespace: ['default'] })
	*
	* // Create a table with schema
	* const { data: tableMetadata, error: tableError } = await catalog.createTable(
	*   { namespace: ['default'] },
	*   {
	*     name: 'events',
	*     schema: {
	*       type: 'struct',
	*       fields: [
	*         { id: 1, name: 'id', type: 'long', required: true },
	*         { id: 2, name: 'timestamp', type: 'timestamp', required: true },
	*         { id: 3, name: 'user_id', type: 'string', required: false }
	*       ],
	*       'schema-id': 0,
	*       'identifier-field-ids': [1]
	*     },
	*     'partition-spec': {
	*       'spec-id': 0,
	*       fields: []
	*     },
	*     'write-order': {
	*       'order-id': 0,
	*       fields: []
	*     },
	*     properties: {
	*       'write.format.default': 'parquet'
	*     }
	*   }
	* )
	* ```
	*
	* @example List tables in namespace
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all tables in the default namespace
	* const { data: tables, error: listError } = await catalog.listTables({ namespace: ['default'] })
	* if (listError) {
	*   if (listError.isNotFound()) {
	*     console.log('Namespace not found')
	*   }
	*   return
	* }
	* console.log(tables) // [{ namespace: ['default'], name: 'events' }]
	* ```
	*
	* @example Working with namespaces
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // List all namespaces
	* const { data: namespaces } = await catalog.listNamespaces()
	*
	* // Create namespace with properties
	* await catalog.createNamespace(
	*   { namespace: ['production'] },
	*   { properties: { owner: 'data-team', env: 'prod' } }
	* )
	* ```
	*
	* @example Cleanup operations
	* ```js
	* const catalog = supabase.storage.analytics.from('analytics-data')
	*
	* // Drop table with purge option (removes all data)
	* const { error: dropError } = await catalog.dropTable(
	*   { namespace: ['default'], name: 'events' },
	*   { purge: true }
	* )
	*
	* if (dropError?.isNotFound()) {
	*   console.log('Table does not exist')
	* }
	*
	* // Drop namespace (must be empty)
	* await catalog.dropNamespace({ namespace: ['default'] })
	* ```
	*
	* @remarks
	* This method provides a bridge between Supabase's bucket management and the standard
	* Apache Iceberg REST Catalog API. The bucket name maps to the Iceberg warehouse parameter.
	* All authentication and configuration is handled automatically using your Supabase credentials.
	*
	* **Error Handling**: Invalid bucket names throw immediately. All catalog
	* operations return `{ data, error }` where errors are `IcebergError` instances from iceberg-js.
	* Use helper methods like `error.isNotFound()` or check `error.status` for specific error handling.
	* Use `.throwOnError()` on the analytics client if you prefer exceptions for catalog operations.
	*
	* **Cleanup Operations**: When using `dropTable`, the `purge: true` option permanently
	* deletes all table data. Without it, the table is marked as deleted but data remains.
	*
	* **Library Dependency**: The returned catalog wraps `IcebergRestCatalog` from iceberg-js.
	* For complete API documentation and advanced usage, refer to the
	* [iceberg-js documentation](https://supabase.github.io/iceberg-js/).
	*/ from(bucketName) {
        var _this4 = this;
        if (!isValidBucketName(bucketName)) throw new StorageError("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
        const catalog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iceberg$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IcebergRestCatalog"]({
            baseUrl: this.url,
            catalogName: bucketName,
            auth: {
                type: "custom",
                getHeaders: async ()=>_this4.headers
            },
            fetch: this.fetch
        });
        const shouldThrowOnError = this.shouldThrowOnError;
        return new Proxy(catalog, {
            get (target, prop) {
                const value = target[prop];
                if (typeof value !== "function") return value;
                return async (...args)=>{
                    try {
                        return {
                            data: await value.apply(target, args),
                            error: null
                        };
                    } catch (error) {
                        if (shouldThrowOnError) throw error;
                        return {
                            data: null,
                            error
                        };
                    }
                };
            }
        });
    }
};
//#endregion
//#region src/packages/VectorIndexApi.ts
/**
* @hidden
* Base implementation for vector index operations.
* Use {@link VectorBucketScope} via `supabase.storage.vectors.from('bucket')` instead.
*/ var VectorIndexApi = class extends BaseApiClient {
    /** Creates a new VectorIndexApi instance */ constructor(url, headers = {}, fetch$1){
        const finalUrl = url.replace(/\/$/, "");
        const finalHeaders = _objectSpread2(_objectSpread2({}, DEFAULT_HEADERS), {}, {
            "Content-Type": "application/json"
        }, headers);
        super(finalUrl, finalHeaders, fetch$1, "vectors");
    }
    /** Creates a new vector index within a bucket */ async createIndex(options) {
        var _this = this;
        return _this.handleOperation(async ()=>{
            return await vectorsApi.post(_this.fetch, `${_this.url}/CreateIndex`, options, {
                headers: _this.headers
            }) || {};
        });
    }
    /** Retrieves metadata for a specific vector index */ async getIndex(vectorBucketName, indexName) {
        var _this2 = this;
        return _this2.handleOperation(async ()=>{
            return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetIndex`, {
                vectorBucketName,
                indexName
            }, {
                headers: _this2.headers
            });
        });
    }
    /** Lists vector indexes within a bucket with optional filtering and pagination */ async listIndexes(options) {
        var _this3 = this;
        return _this3.handleOperation(async ()=>{
            return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListIndexes`, options, {
                headers: _this3.headers
            });
        });
    }
    /** Deletes a vector index and all its data */ async deleteIndex(vectorBucketName, indexName) {
        var _this4 = this;
        return _this4.handleOperation(async ()=>{
            return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteIndex`, {
                vectorBucketName,
                indexName
            }, {
                headers: _this4.headers
            }) || {};
        });
    }
};
//#endregion
//#region src/packages/VectorDataApi.ts
/**
* @hidden
* Base implementation for vector data operations.
* Use {@link VectorIndexScope} via `supabase.storage.vectors.from('bucket').index('idx')` instead.
*/ var VectorDataApi = class extends BaseApiClient {
    /** Creates a new VectorDataApi instance */ constructor(url, headers = {}, fetch$1){
        const finalUrl = url.replace(/\/$/, "");
        const finalHeaders = _objectSpread2(_objectSpread2({}, DEFAULT_HEADERS), {}, {
            "Content-Type": "application/json"
        }, headers);
        super(finalUrl, finalHeaders, fetch$1, "vectors");
    }
    /** Inserts or updates vectors in batch (1-500 per request) */ async putVectors(options) {
        var _this = this;
        if (options.vectors.length < 1 || options.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
        return _this.handleOperation(async ()=>{
            return await vectorsApi.post(_this.fetch, `${_this.url}/PutVectors`, options, {
                headers: _this.headers
            }) || {};
        });
    }
    /** Retrieves vectors by their keys in batch */ async getVectors(options) {
        var _this2 = this;
        return _this2.handleOperation(async ()=>{
            return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectors`, options, {
                headers: _this2.headers
            });
        });
    }
    /** Lists vectors in an index with pagination */ async listVectors(options) {
        var _this3 = this;
        if (options.segmentCount !== void 0) {
            if (options.segmentCount < 1 || options.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
            if (options.segmentIndex !== void 0) {
                if (options.segmentIndex < 0 || options.segmentIndex >= options.segmentCount) throw new Error(`segmentIndex must be between 0 and ${options.segmentCount - 1}`);
            }
        }
        return _this3.handleOperation(async ()=>{
            return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectors`, options, {
                headers: _this3.headers
            });
        });
    }
    /** Queries for similar vectors using approximate nearest neighbor search */ async queryVectors(options) {
        var _this4 = this;
        return _this4.handleOperation(async ()=>{
            return await vectorsApi.post(_this4.fetch, `${_this4.url}/QueryVectors`, options, {
                headers: _this4.headers
            });
        });
    }
    /** Deletes vectors by their keys in batch (1-500 per request) */ async deleteVectors(options) {
        var _this5 = this;
        if (options.keys.length < 1 || options.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
        return _this5.handleOperation(async ()=>{
            return await vectorsApi.post(_this5.fetch, `${_this5.url}/DeleteVectors`, options, {
                headers: _this5.headers
            }) || {};
        });
    }
};
//#endregion
//#region src/packages/VectorBucketApi.ts
/**
* @hidden
* Base implementation for vector bucket operations.
* Use {@link StorageVectorsClient} via `supabase.storage.vectors` instead.
*/ var VectorBucketApi = class extends BaseApiClient {
    /** Creates a new VectorBucketApi instance */ constructor(url, headers = {}, fetch$1){
        const finalUrl = url.replace(/\/$/, "");
        const finalHeaders = _objectSpread2(_objectSpread2({}, DEFAULT_HEADERS), {}, {
            "Content-Type": "application/json"
        }, headers);
        super(finalUrl, finalHeaders, fetch$1, "vectors");
    }
    /** Creates a new vector bucket */ async createBucket(vectorBucketName) {
        var _this = this;
        return _this.handleOperation(async ()=>{
            return await vectorsApi.post(_this.fetch, `${_this.url}/CreateVectorBucket`, {
                vectorBucketName
            }, {
                headers: _this.headers
            }) || {};
        });
    }
    /** Retrieves metadata for a specific vector bucket */ async getBucket(vectorBucketName) {
        var _this2 = this;
        return _this2.handleOperation(async ()=>{
            return await vectorsApi.post(_this2.fetch, `${_this2.url}/GetVectorBucket`, {
                vectorBucketName
            }, {
                headers: _this2.headers
            });
        });
    }
    /** Lists vector buckets with optional filtering and pagination */ async listBuckets(options = {}) {
        var _this3 = this;
        return _this3.handleOperation(async ()=>{
            return await vectorsApi.post(_this3.fetch, `${_this3.url}/ListVectorBuckets`, options, {
                headers: _this3.headers
            });
        });
    }
    /** Deletes a vector bucket (must be empty first) */ async deleteBucket(vectorBucketName) {
        var _this4 = this;
        return _this4.handleOperation(async ()=>{
            return await vectorsApi.post(_this4.fetch, `${_this4.url}/DeleteVectorBucket`, {
                vectorBucketName
            }, {
                headers: _this4.headers
            }) || {};
        });
    }
};
//#endregion
//#region src/packages/StorageVectorsClient.ts
/**
*
* @alpha
*
* Main client for interacting with S3 Vectors API
* Provides access to bucket, index, and vector data operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*
* **Usage Patterns:**
*
* ```typescript
* const { data, error } = await supabase
*  .storage
*  .vectors
*  .createBucket('embeddings-prod')
*
* // Access index operations via buckets
* const bucket = supabase.storage.vectors.from('embeddings-prod')
* await bucket.createIndex({
*   indexName: 'documents',
*   dataType: 'float32',
*   dimension: 1536,
*   distanceMetric: 'cosine'
* })
*
* // Access vector operations via index
* const index = bucket.index('documents')
* await index.putVectors({
*   vectors: [
*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
*   ]
* })
*
* // Query similar vectors
* const { data } = await index.queryVectors({
*   queryVector: { float32: [...] },
*   topK: 5,
*   returnDistance: true
* })
* ```
*/ var StorageVectorsClient = class extends VectorBucketApi {
    /**
	* @alpha
	*
	* Creates a StorageVectorsClient that can manage buckets, indexes, and vectors.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param url - Base URL of the Storage Vectors REST API.
	* @param options.headers - Optional headers (for example `Authorization`) applied to every request.
	* @param options.fetch - Optional custom `fetch` implementation for non-browser runtimes.
	*
	* @example Using supabase-js (recommended)
	* ```typescript
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```typescript
	* import { StorageVectorsClient } from '@supabase/storage-js'
	*
	* const client = new StorageVectorsClient(url, options)
	* ```
	*/ constructor(url, options = {}){
        super(url, options.headers || {}, options.fetch);
    }
    /**
	*
	* @alpha
	*
	* Access operations for a specific vector bucket
	* Returns a scoped client for index and vector operations within the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Bucket-scoped client with index and vector operations
	*
	* @example Accessing a vector bucket
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/ from(vectorBucketName) {
        return new VectorBucketScope(this.url, this.headers, vectorBucketName, this.fetch);
    }
    /**
	*
	* @alpha
	*
	* Creates a new vector bucket
	* Vector buckets are containers for vector indexes and their data
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Unique name for the vector bucket
	* @returns Promise with empty response on success or error
	*
	* @example Creating a vector bucket
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .createBucket('embeddings-prod')
	* ```
	*/ async createBucket(vectorBucketName) {
        var _superprop_getCreateBucket = ()=>super.createBucket, _this = this;
        return _superprop_getCreateBucket().call(_this, vectorBucketName);
    }
    /**
	*
	* @alpha
	*
	* Retrieves metadata for a specific vector bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket
	* @returns Promise with bucket metadata or error
	*
	* @example Get bucket metadata
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .getBucket('embeddings-prod')
	*
	* console.log('Bucket created:', data?.vectorBucket.creationTime)
	* ```
	*/ async getBucket(vectorBucketName) {
        var _superprop_getGetBucket = ()=>super.getBucket, _this2 = this;
        return _superprop_getGetBucket().call(_this2, vectorBucketName);
    }
    /**
	*
	* @alpha
	*
	* Lists all vector buckets with optional filtering and pagination
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Optional filters (prefix, maxResults, nextToken)
	* @returns Promise with list of buckets or error
	*
	* @example List vector buckets
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .listBuckets({ prefix: 'embeddings-' })
	*
	* data?.vectorBuckets.forEach(bucket => {
	*   console.log(bucket.vectorBucketName)
	* })
	* ```
	*/ async listBuckets(options = {}) {
        var _superprop_getListBuckets = ()=>super.listBuckets, _this3 = this;
        return _superprop_getListBuckets().call(_this3, options);
    }
    /**
	*
	* @alpha
	*
	* Deletes a vector bucket (bucket must be empty)
	* All indexes must be deleted before deleting the bucket
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param vectorBucketName - Name of the vector bucket to delete
	* @returns Promise with empty response on success or error
	*
	* @example Delete a vector bucket
	* ```typescript
	* const { data, error } = await supabase
	*   .storage
	*   .vectors
	*   .deleteBucket('embeddings-old')
	* ```
	*/ async deleteBucket(vectorBucketName) {
        var _superprop_getDeleteBucket = ()=>super.deleteBucket, _this4 = this;
        return _superprop_getDeleteBucket().call(_this4, vectorBucketName);
    }
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector bucket
* Provides index management and access to vector operations
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/ var VectorBucketScope = class extends VectorIndexApi {
    /**
	* @alpha
	*
	* Creates a helper that automatically scopes all index operations to the provided bucket.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @example Creating a vector bucket scope
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* ```
	*/ constructor(url, headers, vectorBucketName, fetch$1){
        super(url, headers, fetch$1);
        this.vectorBucketName = vectorBucketName;
    }
    /**
	*
	* @alpha
	*
	* Creates a new vector index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Index configuration (vectorBucketName is automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Creating a vector index
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.createIndex({
	*   indexName: 'documents-openai',
	*   dataType: 'float32',
	*   dimension: 1536,
	*   distanceMetric: 'cosine',
	*   metadataConfiguration: {
	*     nonFilterableMetadataKeys: ['raw_text']
	*   }
	* })
	* ```
	*/ async createIndex(options) {
        var _superprop_getCreateIndex = ()=>super.createIndex, _this5 = this;
        return _superprop_getCreateIndex().call(_this5, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this5.vectorBucketName
        }));
    }
    /**
	*
	* @alpha
	*
	* Lists indexes in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Listing options (vectorBucketName is automatically set)
	* @returns Promise with response containing indexes array and pagination token or error
	*
	* @example List indexes
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.listIndexes({ prefix: 'documents-' })
	* ```
	*/ async listIndexes(options = {}) {
        var _superprop_getListIndexes = ()=>super.listIndexes, _this6 = this;
        return _superprop_getListIndexes().call(_this6, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this6.vectorBucketName
        }));
    }
    /**
	*
	* @alpha
	*
	* Retrieves metadata for a specific index in this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index to retrieve
	* @returns Promise with index metadata or error
	*
	* @example Get index metadata
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* const { data } = await bucket.getIndex('documents-openai')
	* console.log('Dimension:', data?.index.dimension)
	* ```
	*/ async getIndex(indexName) {
        var _superprop_getGetIndex = ()=>super.getIndex, _this7 = this;
        return _superprop_getGetIndex().call(_this7, _this7.vectorBucketName, indexName);
    }
    /**
	*
	* @alpha
	*
	* Deletes an index from this bucket
	* Convenience method that automatically includes the bucket name
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index to delete
	* @returns Promise with empty response on success or error
	*
	* @example Delete an index
	* ```typescript
	* const bucket = supabase.storage.vectors.from('embeddings-prod')
	* await bucket.deleteIndex('old-index')
	* ```
	*/ async deleteIndex(indexName) {
        var _superprop_getDeleteIndex = ()=>super.deleteIndex, _this8 = this;
        return _superprop_getDeleteIndex().call(_this8, _this8.vectorBucketName, indexName);
    }
    /**
	*
	* @alpha
	*
	* Access operations for a specific index within this bucket
	* Returns a scoped client for vector data operations
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param indexName - Name of the index
	* @returns Index-scoped client with vector data operations
	*
	* @example Accessing an index
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	*
	* // Insert vectors
	* await index.putVectors({
	*   vectors: [
	*     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
	*   ]
	* })
	*
	* // Query similar vectors
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [...] },
	*   topK: 5
	* })
	* ```
	*/ index(indexName) {
        return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, indexName, this.fetch);
    }
};
/**
*
* @alpha
*
* Scoped client for operations within a specific vector index
* Provides vector data operations (put, get, list, query, delete)
*
* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
*/ var VectorIndexScope = class extends VectorDataApi {
    /**
	*
	* @alpha
	*
	* Creates a helper that automatically scopes all vector operations to the provided bucket/index names.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @example Creating a vector index scope
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* ```
	*/ constructor(url, headers, vectorBucketName, indexName, fetch$1){
        super(url, headers, fetch$1);
        this.vectorBucketName = vectorBucketName;
        this.indexName = indexName;
    }
    /**
	*
	* @alpha
	*
	* Inserts or updates vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Vector insertion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Insert vectors into an index
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.putVectors({
	*   vectors: [
	*     {
	*       key: 'doc-1',
	*       data: { float32: [0.1, 0.2, ...] },
	*       metadata: { title: 'Introduction', page: 1 }
	*     }
	*   ]
	* })
	* ```
	*/ async putVectors(options) {
        var _superprop_getPutVectors = ()=>super.putVectors, _this9 = this;
        return _superprop_getPutVectors().call(_this9, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this9.vectorBucketName,
            indexName: _this9.indexName
        }));
    }
    /**
	*
	* @alpha
	*
	* Retrieves vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Vector retrieval options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array or error
	*
	* @example Get vectors by keys
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.getVectors({
	*   keys: ['doc-1', 'doc-2'],
	*   returnMetadata: true
	* })
	* ```
	*/ async getVectors(options) {
        var _superprop_getGetVectors = ()=>super.getVectors, _this10 = this;
        return _superprop_getGetVectors().call(_this10, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this10.vectorBucketName,
            indexName: _this10.indexName
        }));
    }
    /**
	*
	* @alpha
	*
	* Lists vectors in this index with pagination
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Listing options (bucket and index names automatically set)
	* @returns Promise with response containing vectors array and pagination token or error
	*
	* @example List vectors with pagination
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.listVectors({
	*   maxResults: 500,
	*   returnMetadata: true
	* })
	* ```
	*/ async listVectors(options = {}) {
        var _superprop_getListVectors = ()=>super.listVectors, _this11 = this;
        return _superprop_getListVectors().call(_this11, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this11.vectorBucketName,
            indexName: _this11.indexName
        }));
    }
    /**
	*
	* @alpha
	*
	* Queries for similar vectors in this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Query options (bucket and index names automatically set)
	* @returns Promise with response containing matches array of similar vectors ordered by distance or error
	*
	* @example Query similar vectors
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* const { data } = await index.queryVectors({
	*   queryVector: { float32: [0.1, 0.2, ...] },
	*   topK: 5,
	*   filter: { category: 'technical' },
	*   returnDistance: true,
	*   returnMetadata: true
	* })
	* ```
	*/ async queryVectors(options) {
        var _superprop_getQueryVectors = ()=>super.queryVectors, _this12 = this;
        return _superprop_getQueryVectors().call(_this12, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this12.vectorBucketName,
            indexName: _this12.indexName
        }));
    }
    /**
	*
	* @alpha
	*
	* Deletes vectors by keys from this index
	* Convenience method that automatically includes bucket and index names
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	* @param options - Deletion options (bucket and index names automatically set)
	* @returns Promise with empty response on success or error
	*
	* @example Delete vectors by keys
	* ```typescript
	* const index = supabase.storage.vectors.from('embeddings-prod').index('documents-openai')
	* await index.deleteVectors({
	*   keys: ['doc-1', 'doc-2', 'doc-3']
	* })
	* ```
	*/ async deleteVectors(options) {
        var _superprop_getDeleteVectors = ()=>super.deleteVectors, _this13 = this;
        return _superprop_getDeleteVectors().call(_this13, _objectSpread2(_objectSpread2({}, options), {}, {
            vectorBucketName: _this13.vectorBucketName,
            indexName: _this13.indexName
        }));
    }
};
//#endregion
//#region src/StorageClient.ts
var StorageClient = class extends StorageBucketApi {
    /**
	* Creates a client for Storage buckets, files, analytics, and vectors.
	*
	* @category Storage
	* @subcategory File Buckets
	*
	* @example Using supabase-js (recommended)
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* const avatars = supabase.storage.from('avatars')
	* ```
	*
	* @example Standalone import for bundle-sensitive environments
	* ```ts
	* import { StorageClient } from '@supabase/storage-js'
	*
	* const storage = new StorageClient('https://xyzcompany.supabase.co/storage/v1', {
	*   apikey: 'your-publishable-key',
	* })
	* const avatars = storage.from('avatars')
	* ```
	*/ constructor(url, headers = {}, fetch$1, opts){
        super(url, headers, fetch$1, opts);
    }
    /**
	* Perform file operation in a bucket.
	*
	* @category Storage
	* @subcategory File Buckets
	*
	* @param id The bucket id to operate on.
	*
	* @example Accessing a bucket
	* ```typescript
	* const avatars = supabase.storage.from('avatars')
	* ```
	*/ from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
    }
    /**
	*
	* @alpha
	*
	* Access vector storage operations.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Vector Buckets
	*
	* @returns A StorageVectorsClient instance configured with the current storage settings.
	*/ get vectors() {
        return new StorageVectorsClient(this.url + "/vector", {
            headers: this.headers,
            fetch: this.fetch
        });
    }
    /**
	*
	* @alpha
	*
	* Access analytics storage operations using Iceberg tables.
	*
	* **Public alpha:** This API is part of a public alpha release and may not be available to your account type.
	*
	* @category Storage
	* @subcategory Analytics Buckets
	*
	* @returns A StorageAnalyticsClient instance configured with the current storage settings.
	*/ get analytics() {
        return new StorageAnalyticsClient(this.url + "/iceberg", this.headers, this.fetch);
    }
};
;
}),
"[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseClient",
    ()=>SupabaseClient,
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$tracingRegistry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/tracingRegistry.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/functions-js/dist/module/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/functions-js/dist/module/FunctionsClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/postgrest-js/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js [app-rsc] (ecmascript) <export default as RealtimeClient>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/storage-js/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-js/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-js/dist/module/AuthClient.js [app-rsc] (ecmascript) <export default as AuthClient>");
;
;
;
;
;
;
;
;
//#region src/lib/version.ts
const version = "2.112.3";
//#endregion
//#region src/lib/constants.ts
let JS_ENV = "";
let JS_RUNTIME_VERSION;
if (typeof Deno !== "undefined") {
    var _Deno$version;
    JS_ENV = "deno";
    JS_RUNTIME_VERSION = (_Deno$version = Deno.version) === null || _Deno$version === void 0 ? void 0 : _Deno$version.deno;
} else if (typeof document !== "undefined") JS_ENV = "web";
else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") JS_ENV = "react-native";
else {
    var _process$version;
    JS_ENV = "node";
    const _process = globalThis["process"];
    JS_RUNTIME_VERSION = _process === null || _process === void 0 || (_process$version = _process["version"]) === null || _process$version === void 0 ? void 0 : _process$version.replace(/^v/, "");
}
const _runtimeMeta = [
    `runtime=${JS_ENV}`
];
if (JS_RUNTIME_VERSION) _runtimeMeta.push(`runtime-version=${JS_RUNTIME_VERSION}`);
const DEFAULT_HEADERS = {
    "X-Client-Info": `supabase-js/${version}; ${_runtimeMeta.join("; ")}`
};
const DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
    schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
const DEFAULT_TRACE_PROPAGATION_OPTIONS = {
    enabled: false,
    respectSamplingDecision: true
};
//#endregion
//#region ../../shared/tracing/dist/module/parse.js
/**
* Parse W3C traceparent header according to the specification.
*
* The traceparent header format is: version-traceid-parentid-traceflags
* - version: 2 hex digits (currently always "00")
* - traceid: 32 hex digits (128-bit trace identifier)
* - parentid: 16 hex digits (64-bit span/parent identifier)
* - traceflags: 2 hex digits (8-bit flags, bit 0 is sampled flag)
*
* @param traceparent - The traceparent header value
* @returns Parsed traceparent object, or null if invalid format
*
* @see https://www.w3.org/TR/trace-context/#traceparent-header
*
* @example
* ```typescript
* const parsed = parseTraceParent('00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01')
*
* console.log(parsed)
* // {
* //   version: '00',
* //   traceId: '0af7651916cd43dd8448eb211c80319c',
* //   parentId: 'b7ad6b7169203331',
* //   traceFlags: '01',
* //   isSampled: true
* // }
* ```
*/ function parseTraceParent(traceparent) {
    if (!traceparent || typeof traceparent !== "string") return null;
    const parts = traceparent.split("-");
    if (parts.length !== 4) return null;
    const [version$1, traceId, parentId, traceFlags] = parts;
    if (version$1.length !== 2 || traceId.length !== 32 || parentId.length !== 16 || traceFlags.length !== 2) return null;
    const hexRegex = /^[0-9a-f]+$/i;
    if (!hexRegex.test(version$1) || !hexRegex.test(traceId) || !hexRegex.test(parentId) || !hexRegex.test(traceFlags)) return null;
    if (traceId === "00000000000000000000000000000000" || parentId === "0000000000000000") return null;
    return {
        version: version$1,
        traceId,
        parentId,
        traceFlags,
        isSampled: (parseInt(traceFlags, 16) & 1) === 1
    };
}
//#endregion
//#region ../../shared/tracing/dist/module/validate.js
/**
* Check if trace context should be propagated to the target URL.
*
* This function checks if the target URL matches any of the configured
* propagation targets. Targets can be:
* - String: Exact hostname match or wildcard domain (*.example.com)
* - RegExp: Pattern matching hostname
* - Function: Custom logic to determine if URL should receive trace context
*
* @param targetUrl - The URL to check
* @param targets - Array of propagation targets
* @returns True if trace context should be propagated, false otherwise
*
* @example
* ```typescript
* const targets = [
*   'myproject.supabase.co',           // Exact match
*   '*.supabase.co',                   // Wildcard domain
*   /.*\.supabase\.co$/,               // Regex pattern
*   (url) => url.hostname === 'localhost' // Custom function
* ]
*
* shouldPropagateToTarget('https://myproject.supabase.co/rest/v1/table', targets)
* // true
*
* shouldPropagateToTarget('https://evil.com/api', targets)
* // false
* ```
*/ function shouldPropagateToTarget(targetUrl, targets) {
    if (!targetUrl || !targets || targets.length === 0) return false;
    let url;
    if (targetUrl instanceof URL) url = targetUrl;
    else try {
        url = new URL(targetUrl);
    } catch (error) {
        return false;
    }
    for (const target of targets)try {
        if (typeof target === "string") {
            if (matchStringTarget(url.hostname, target)) return true;
        } else if (target instanceof RegExp) {
            if (target.test(url.hostname)) return true;
        } else if (typeof target === "function") {
            if (target(url)) return true;
        }
    } catch (error) {
        continue;
    }
    return false;
}
/**
* Match hostname against string target (exact match or wildcard)
*
* @param hostname - The hostname to check
* @param target - The target pattern (exact or wildcard)
* @returns True if hostname matches target
*/ function matchStringTarget(hostname, target) {
    if (target === hostname) return true;
    if (target.startsWith("*.")) {
        const domain = target.slice(2);
        if (hostname.endsWith(domain)) {
            if (hostname === domain || hostname.endsWith("." + domain)) return true;
        }
    }
    return false;
}
//#endregion
//#region ../../shared/tracing/dist/module/defaults.js
/**
* Generate default propagation targets based on the Supabase project URL.
*
* By default, trace context is only propagated to Supabase domains for
* security. This prevents leaking trace context to potentially malicious
* third-party services.
*
* Wildcard strings (e.g. `*.supabase.co`) are matched with linear string
* operations rather than regex, avoiding ReDoS risk.
*
* @param supabaseUrl - The Supabase project URL
* @returns Array of default propagation targets
*/ function getDefaultPropagationTargets(supabaseUrl) {
    const targets = [];
    try {
        const url = new URL(supabaseUrl);
        targets.push(url.hostname);
    } catch (error) {}
    targets.push("*.supabase.co", "*.supabase.in");
    targets.push("localhost", "127.0.0.1", "[::1]");
    return targets;
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/typeof.js
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
        return typeof o$1;
    } : function(o$1) {
        return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
    }, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPrimitive.js
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/toPropertyKey.js
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/defineProperty.js
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.103.0/helpers/objectSpread2.js
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r$1) {
            return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread2(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
            _defineProperty(e, r$1, t[r$1]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
            Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
        });
    }
    return e;
}
//#endregion
//#region src/lib/fetch.ts
const resolveFetch = (customFetch)=>{
    if (customFetch) return (...args)=>customFetch(...args);
    return (...args)=>fetch(...args);
};
const resolveHeadersConstructor = ()=>{
    return Headers;
};
/**
* New-format Supabase API keys (`sb_publishable_…` / `sb_secret_…`) are not JWTs and
* must never be sent as a Bearer token — they belong only in the `apikey` header.
* All other keys (legacy JWT keys, `sb_temp_…` temporary keys, unrecognized `sb_`
* subtypes) keep the Bearer fallback.
*/ const isNewApiKey = (key)=>key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
const TEMP_KEY_PREFIX = "sb_temp_";
const warnedKeySubtypes = /* @__PURE__ */ new Set();
/**
* Warn (once per subtype) when an `sb_` key isn't a subtype this SDK version recognizes.
* Never throws — the server, not the SDK, decides key validity. The key value is never
* included in the message.
*/ const checkApiKeyFormat = (key)=>{
    var _key$match$, _key$match;
    if (!key.startsWith("sb_") || isNewApiKey(key) || key.startsWith(TEMP_KEY_PREFIX)) return;
    const subtype = (_key$match$ = (_key$match = key.match(/^sb_[a-zA-Z0-9]+_/)) === null || _key$match === void 0 ? void 0 : _key$match[0]) !== null && _key$match$ !== void 0 ? _key$match$ : "unknown";
    if (warnedKeySubtypes.has(subtype)) return;
    warnedKeySubtypes.add(subtype);
    console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type.");
};
const fetchWithAuth = (supabaseKey, supabaseUrl, getAccessToken, customFetch, tracePropagationOptions, options)=>{
    const fetch$1 = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    const traceEnabled = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) === true;
    const respectSampling = (tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== false;
    const traceTargets = traceEnabled ? getDefaultPropagationTargets(supabaseUrl) : null;
    const allowKeyAsBearer = !((options === null || options === void 0 ? void 0 : options.omitApiKeyAsBearer) && isNewApiKey(supabaseKey));
    return async (input, init)=>{
        const realToken = await getAccessToken();
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has("apikey")) headers.set("apikey", supabaseKey);
        if (!headers.has("Authorization")) {
            const bearer = realToken !== null && realToken !== void 0 ? realToken : allowKeyAsBearer ? supabaseKey : null;
            if (bearer) headers.set("Authorization", `Bearer ${bearer}`);
        }
        if (traceTargets) {
            const traceHeaders = getTraceHeaders(input, traceTargets, respectSampling);
            if (traceHeaders) {
                if (traceHeaders.traceparent && !headers.has("traceparent")) headers.set("traceparent", traceHeaders.traceparent);
                if (traceHeaders.tracestate && !headers.has("tracestate")) headers.set("tracestate", traceHeaders.tracestate);
                if (traceHeaders.baggage && !headers.has("baggage")) headers.set("baggage", traceHeaders.baggage);
            }
        }
        return fetch$1(input, _objectSpread2(_objectSpread2({}, init), {}, {
            headers
        }));
    };
};
let warnedMissingTracingRuntime = false;
let warnedNonW3CPropagator = false;
function getTraceHeaders(input, targets, respectSampling) {
    const extractTraceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$tracingRegistry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])();
    if (!extractTraceContext) {
        if (!warnedMissingTracingRuntime) {
            warnedMissingTracingRuntime = true;
            console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.");
        }
        return null;
    }
    if (!shouldPropagateToTarget(typeof input === "string" ? input : input instanceof URL ? input : input.url, targets)) return null;
    const traceContext = extractTraceContext();
    if (!traceContext || !traceContext.traceparent) {
        var _traceContext$carrier;
        if ((traceContext === null || traceContext === void 0 || (_traceContext$carrier = traceContext.carrierKeys) === null || _traceContext$carrier === void 0 ? void 0 : _traceContext$carrier.length) && !warnedNonW3CPropagator) {
            warnedNonW3CPropagator = true;
            const sentryHint = traceContext.carrierKeys.includes("sentry-trace") ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it." : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
            console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${traceContext.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.` + sentryHint);
        }
        return null;
    }
    if (respectSampling) {
        const parsed = parseTraceParent(traceContext.traceparent);
        if (parsed && !parsed.isSampled) return {
            traceparent: traceContext.traceparent
        };
    }
    return traceContext;
}
//#endregion
//#region src/lib/helpers.ts
function normalizeTracePropagation(value) {
    return typeof value === "boolean" ? {
        enabled: value
    } : value;
}
function ensureTrailingSlash(url) {
    return url.endsWith("/") ? url : url + "/";
}
function applySettingDefaults(options, defaults) {
    var _DEFAULT_GLOBAL_OPTIO, _globalOptions$header, _ref, _tracePropagationOpti, _ref2, _tracePropagationOpti2;
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
    const { db: DEFAULT_DB_OPTIONS$1, auth: DEFAULT_AUTH_OPTIONS$1, realtime: DEFAULT_REALTIME_OPTIONS$1, global: DEFAULT_GLOBAL_OPTIONS$1 } = defaults;
    const tracePropagationOptions = normalizeTracePropagation(options.tracePropagation);
    const DEFAULT_TRACE_PROPAGATION_OPTIONS$1 = normalizeTracePropagation(defaults.tracePropagation);
    const result = {
        db: _objectSpread2(_objectSpread2({}, DEFAULT_DB_OPTIONS$1), dbOptions),
        auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS$1), authOptions),
        realtime: _objectSpread2(_objectSpread2({}, DEFAULT_REALTIME_OPTIONS$1), realtimeOptions),
        storage: {},
        global: _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_GLOBAL_OPTIONS$1), globalOptions), {}, {
            headers: _objectSpread2(_objectSpread2({}, (_DEFAULT_GLOBAL_OPTIO = DEFAULT_GLOBAL_OPTIONS$1 === null || DEFAULT_GLOBAL_OPTIONS$1 === void 0 ? void 0 : DEFAULT_GLOBAL_OPTIONS$1.headers) !== null && _DEFAULT_GLOBAL_OPTIO !== void 0 ? _DEFAULT_GLOBAL_OPTIO : {}), (_globalOptions$header = globalOptions === null || globalOptions === void 0 ? void 0 : globalOptions.headers) !== null && _globalOptions$header !== void 0 ? _globalOptions$header : {})
        }),
        tracePropagation: {
            enabled: (_ref = (_tracePropagationOpti = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.enabled) !== null && _tracePropagationOpti !== void 0 ? _tracePropagationOpti : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.enabled) !== null && _ref !== void 0 ? _ref : false,
            respectSamplingDecision: (_ref2 = (_tracePropagationOpti2 = tracePropagationOptions === null || tracePropagationOptions === void 0 ? void 0 : tracePropagationOptions.respectSamplingDecision) !== null && _tracePropagationOpti2 !== void 0 ? _tracePropagationOpti2 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === null || DEFAULT_TRACE_PROPAGATION_OPTIONS$1 === void 0 ? void 0 : DEFAULT_TRACE_PROPAGATION_OPTIONS$1.respectSamplingDecision) !== null && _ref2 !== void 0 ? _ref2 : true
        },
        accessToken: async ()=>""
    };
    if (options.accessToken) result.accessToken = options.accessToken;
    else delete result.accessToken;
    return result;
}
/**
* Validates a Supabase client URL
*
* @param {string} supabaseUrl - The Supabase client URL string.
* @returns {URL} - The validated base URL.
* @throws {Error}
*/ function validateSupabaseUrl(supabaseUrl) {
    const trimmedUrl = supabaseUrl === null || supabaseUrl === void 0 ? void 0 : supabaseUrl.trim();
    if (!trimmedUrl) throw new Error("supabaseUrl is required.");
    if (!trimmedUrl.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
        return new URL(ensureTrailingSlash(trimmedUrl));
    } catch (_unused) {
        throw Error("Invalid supabaseUrl: Provided URL is malformed.");
    }
}
//#endregion
//#region src/lib/SupabaseAuthClient.ts
var SupabaseAuthClient = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$js$2f$dist$2f$module$2f$AuthClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AuthClient$3e$__["AuthClient"] {
    constructor(options){
        super(options);
    }
};
//#endregion
//#region src/SupabaseClient.ts
/**
* Supabase Client.
*
* An isomorphic Javascript client for interacting with Postgres.
*/ var SupabaseClient = class {
    /**
	* Create a new client for use in the browser.
	*
	* @category Initializing
	*
	* @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
	* @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
	* @param options Optional configuration for the client:
	* - `db.schema` — You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
	* - `auth.autoRefreshToken` — Set to `true` if you want to automatically refresh the token before expiring.
	* - `auth.persistSession` — Set to `true` if you want to automatically save the user session into local storage.
	* - `auth.detectSessionInUrl` — Set to `true` if you want to automatically detect OAuth grants in the URL and sign in the user.
	* - `realtime` — Options passed along to the realtime-js constructor.
	* - `storage` — Options passed along to the storage-js constructor.
	* - `global.fetch` — A custom fetch implementation.
	* - `global.headers` — Any additional headers to send with each network request.
	*
	* @example Creating a client
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Create a single supabase client for interacting with your database
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	* ```
	*
	* @example With a custom domain
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* // Use a custom domain as the supabase URL
	* const supabase = createClient('https://my-custom-domain.com', 'your-publishable-key')
	* ```
	*
	* @example With additional parameters
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const options = {
	*   db: {
	*     schema: 'public',
	*   },
	*   auth: {
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: true
	*   },
	*   global: {
	*     headers: { 'x-my-custom-header': 'my-app-name' },
	*   },
	* }
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", options)
	* ```
	*
	* @exampleDescription With custom schemas
	* By default the API server points to the `public` schema. You can enable other database schemas within the Dashboard.
	* Go to [Settings > API > Exposed schemas](/dashboard/project/_/settings/api) and add the schema which you want to expose to the API.
	*
	* Note: each client connection can only access a single schema, so the code above can access the `other_schema` schema but cannot access the `public` schema.
	*
	* @example With custom schemas
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   // Provide a custom schema. Defaults to "public".
	*   db: { schema: 'other_schema' }
	* })
	* ```
	*
	* @exampleDescription Custom fetch implementation
	* `supabase-js` uses the runtime's global `fetch` to make HTTP requests,
	* but an alternative `fetch` implementation can be provided as an option.
	* This is useful in environments where the global `fetch` is unavailable or where you want to customize request behavior.
	*
	* @example Custom fetch implementation
	* ```js
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   global: { fetch: fetch.bind(globalThis) }
	* })
	* ```
	*
	* @exampleDescription React Native options with AsyncStorage
	* For React Native we recommend using `AsyncStorage` as the storage implementation for Supabase Auth.
	*
	* @example React Native options with AsyncStorage
	* ```js
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from "@react-native-async-storage/async-storage";
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: AsyncStorage,
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @exampleDescription React Native options with Expo SecureStore
	* If you wish to encrypt the user's session information, you can use `aes-js` and store the encryption key in Expo SecureStore.
	* The `aes-js` library, a reputable JavaScript-only implementation of the AES encryption algorithm in CTR mode.
	* A new 256-bit encryption key is generated using the `react-native-get-random-values` library.
	* This key is stored inside Expo's SecureStore, while the value is encrypted and placed inside AsyncStorage.
	*
	* Please make sure that:
	* - You keep the `expo-secure-store`, `aes-js` and `react-native-get-random-values` libraries up-to-date.
	* - Choose the correct [`SecureStoreOptions`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestoreoptions) for your app's needs.
	*   E.g. [`SecureStore.WHEN_UNLOCKED`](https://docs.expo.dev/versions/latest/sdk/securestore/#securestorewhen_unlocked) regulates when the data can be accessed.
	* - Carefully consider optimizations or other modifications to the above example, as those can lead to introducing subtle security vulnerabilities.
	*
	* @example React Native options with Expo SecureStore
	* ```ts
	* import 'react-native-url-polyfill/auto'
	* import { createClient } from '@supabase/supabase-js'
	* import AsyncStorage from '@react-native-async-storage/async-storage';
	* import * as SecureStore from 'expo-secure-store';
	* import * as aesjs from 'aes-js';
	* import 'react-native-get-random-values';
	*
	* // As Expo's SecureStore does not support values larger than 2048
	* // bytes, an AES-256 key is generated and stored in SecureStore, while
	* // it is used to encrypt/decrypt values stored in AsyncStorage.
	* class LargeSecureStore {
	*   private async _encrypt(key: string, value: string) {
	*     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
	*     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
	*
	*     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
	*
	*     return aesjs.utils.hex.fromBytes(encryptedBytes);
	*   }
	*
	*   private async _decrypt(key: string, value: string) {
	*     const encryptionKeyHex = await SecureStore.getItemAsync(key);
	*     if (!encryptionKeyHex) {
	*       return encryptionKeyHex;
	*     }
	*
	*     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
	*     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
	*
	*     return aesjs.utils.utf8.fromBytes(decryptedBytes);
	*   }
	*
	*   async getItem(key: string) {
	*     const encrypted = await AsyncStorage.getItem(key);
	*     if (!encrypted) { return encrypted; }
	*
	*     return await this._decrypt(key, encrypted);
	*   }
	*
	*   async removeItem(key: string) {
	*     await AsyncStorage.removeItem(key);
	*     await SecureStore.deleteItemAsync(key);
	*   }
	*
	*   async setItem(key: string, value: string) {
	*     const encrypted = await this._encrypt(key, value);
	*
	*     await AsyncStorage.setItem(key, encrypted);
	*   }
	* }
	*
	* const supabase = createClient("https://xyzcompany.supabase.co", "your-publishable-key", {
	*   auth: {
	*     storage: new LargeSecureStore(),
	*     autoRefreshToken: true,
	*     persistSession: true,
	*     detectSessionInUrl: false,
	*   },
	* });
	* ```
	*
	* @example With a database query
	* ```ts
	* import { createClient } from '@supabase/supabase-js'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
	*
	* const { data } = await supabase.from('profiles').select('*')
	* ```
	*
	* @exampleDescription With OpenTelemetry tracing
	* Opt in to W3C trace context propagation so the `trace_id` from your
	* client-side spans is attached to Supabase requests and appears in API
	* Gateway and Edge Function logs. Requires `@opentelemetry/api` to be
	* installed in your application and the tracing runtime to be loaded via
	* `import '@supabase/supabase-js/tracing'`. See [Tracing with the JS SDK](https://supabase.com/docs/guides/telemetry/client-side-tracing).
	*
	* @example With OpenTelemetry tracing
	* ```ts
	* import '@supabase/supabase-js/tracing'
	* import { createClient } from '@supabase/supabase-js'
	* import { trace } from '@opentelemetry/api'
	*
	* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key', {
	*   tracePropagation: true,
	* })
	*
	* const tracer = trace.getTracer('my-app')
	*
	* await tracer.startActiveSpan('fetch-users', async (span) => {
	*   // Outgoing request carries the active trace context.
	*   const { data, error } = await supabase.from('users').select('*')
	*   span.end()
	* })
	* ```
	*/ constructor(supabaseUrl, supabaseKey, options){
        var _settings$auth$storag, _settings$global$head;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        const baseUrl = validateSupabaseUrl(supabaseUrl);
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        checkApiKeyFormat(supabaseKey);
        this.realtimeUrl = new URL("realtime/v1", baseUrl);
        this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws");
        this.authUrl = new URL("auth/v1", baseUrl);
        this.storageUrl = new URL("storage/v1", baseUrl);
        this.functionsUrl = new URL("functions/v1", baseUrl);
        const defaultStorageKey = `sb-${baseUrl.hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: _objectSpread2(_objectSpread2({}, DEFAULT_AUTH_OPTIONS), {}, {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS,
            tracePropagation: DEFAULT_TRACE_PROPAGATION_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.settings = settings;
        this.storageKey = (_settings$auth$storag = settings.auth.storageKey) !== null && _settings$auth$storag !== void 0 ? _settings$auth$storag : "";
        this.headers = (_settings$global$head = settings.global.headers) !== null && _settings$global$head !== void 0 ? _settings$global$head : {};
        if (!settings.accessToken) {
            var _settings$auth;
            this.auth = this._initSupabaseAuthClient((_settings$auth = settings.auth) !== null && _settings$auth !== void 0 ? _settings$auth : {}, this.headers, settings.global.fetch);
        } else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: (_, prop)=>{
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
                }
            });
        }
        this.fetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation);
        this.functionsFetch = fetchWithAuth(supabaseKey, supabaseUrl, this._getSessionToken.bind(this), settings.global.fetch, settings.tracePropagation, {
            omitApiKeyAsBearer: true
        });
        this.realtime = this._initRealtimeClient(_objectSpread2({
            headers: this.headers,
            accessToken: this._getAccessToken.bind(this),
            fetch: this.fetch
        }, settings.realtime));
        if (this.accessToken) Promise.resolve(this.accessToken()).then((token)=>this.realtime.setAuth(token)).catch((e)=>console.warn("Failed to set initial Realtime auth token:", e));
        this.rest = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$postgrest$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PostgrestClient"](new URL("rest/v1", baseUrl).href, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
            timeout: settings.db.timeout,
            urlLengthLimit: settings.db.urlLengthLimit,
            retry: settings.db.retry
        });
        this.storage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$storage$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StorageClient"](this.storageUrl.href, this.headers, this.fetch, options === null || options === void 0 ? void 0 : options.storage);
        if (!settings.accessToken) this._listenForAuthEvents();
    }
    /**
	* Supabase Functions allows you to deploy and invoke edge functions.
	*/ get functions() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$functions$2d$js$2f$dist$2f$module$2f$FunctionsClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FunctionsClient"](this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.functionsFetch
        });
    }
    /**
	* Perform a query on a table or a view.
	*
	* @param relation - The table or view name to query
	*/ from(relation) {
        return this.rest.from(relation);
    }
    /**
	* Select a schema to query or perform an function (rpc) call.
	*
	* The schema needs to be on the list of exposed schemas inside Supabase.
	*
	* @param schema - The schema to query
	*/ schema(schema) {
        return this.rest.schema(schema);
    }
    /**
	* Perform a function call.
	*
	* @param fn - The function name to call
	* @param args - The arguments to pass to the function call
	* @param options - Named parameters
	* @param options.head - When set to `true`, `data` will not be returned.
	* Useful if you only need the count.
	* @param options.get - When set to `true`, the function will be called with
	* read-only access mode.
	* @param options.count - Count algorithm to use to count rows returned by the
	* function. Only applicable for [set-returning
	* functions](https://www.postgresql.org/docs/current/functions-srf.html).
	*
	* `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
	* hood.
	*
	* `"planned"`: Approximated but fast count algorithm. Uses the Postgres
	* statistics under the hood.
	*
	* `"estimated"`: Uses exact count for low numbers and planned count for high
	* numbers.
	*/ rpc(fn, args = {}, options = {
        head: false,
        get: false,
        count: void 0
    }) {
        return this.rest.rpc(fn, args, options);
    }
    /**
	* Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
	*
	* @param {string} name - The name of the Realtime channel.
	* @param {Object} opts - The options to pass to the Realtime channel.
	*
	* @category Realtime
	*/ channel(name, opts = {
        config: {}
    }) {
        return this.realtime.channel(name, opts);
    }
    /**
	* Returns all Realtime channels.
	*
	* @category Realtime
	*
	* @example Get all channels
	* ```js
	* const channels = supabase.getChannels()
	* ```
	*/ getChannels() {
        return this.realtime.getChannels();
    }
    /**
	* Unsubscribes and removes Realtime channel from Realtime client.
	*
	* @param {RealtimeChannel} channel - The name of the Realtime channel.
	*
	*
	* @category Realtime
	*
	* @remarks
	* - Removing a channel is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Removes a channel
	* ```js
	* supabase.removeChannel(myChannel)
	* ```
	*/ removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
	* Unsubscribes and removes all Realtime channels from Realtime client.
	*
	* @category Realtime
	*
	* @remarks
	* - Removing channels is a great way to maintain the performance of your project's Realtime service as well as your database if you're listening to Postgres changes. Supabase will automatically handle cleanup 30 seconds after a client is disconnected, but unused channels may cause degradation as more clients are simultaneously subscribed.
	*
	* @example Remove all channels
	* ```js
	* supabase.removeAllChannels()
	* ```
	*/ removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    /**
	* The raw session token — the custom `accessToken` result or the signed-in user's JWT —
	* or `null` when there is no session. Unlike {@link _getAccessToken} it does not fall back
	* to `supabaseKey`, so callers can distinguish "no session" from "has session".
	*/ async _getSessionToken() {
        var _this = this;
        var _data$session$access_, _data$session;
        if (_this.accessToken) return await _this.accessToken();
        const { data } = await _this.auth.getSession();
        return (_data$session$access_ = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token) !== null && _data$session$access_ !== void 0 ? _data$session$access_ : null;
    }
    async _getAccessToken() {
        var _this2 = this;
        var _await$this$_getSessi;
        return (_await$this$_getSessi = await _this2._getSessionToken()) !== null && _await$this$_getSessi !== void 0 ? _await$this$_getSessi : _this2.supabaseKey;
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, userStorage, storageKey, flowType, lock, debug, throwOnError, experimental, lockAcquireTimeout, skipAutoInitialize }, headers, fetch$1) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
            url: this.authUrl.href,
            headers: _objectSpread2(_objectSpread2({}, authHeaders), headers),
            storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            userStorage,
            flowType,
            lock,
            debug,
            throwOnError,
            experimental,
            fetch: fetch$1,
            lockAcquireTimeout,
            skipAutoInitialize,
            hasCustomAuthorizationHeader: Object.keys(this.headers).some((key)=>key.toLowerCase() === "authorization")
        });
    }
    _initRealtimeClient(options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$realtime$2d$js$2f$dist$2f$module$2f$RealtimeClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RealtimeClient$3e$__["RealtimeClient"](this.realtimeUrl.href, _objectSpread2(_objectSpread2({}, options), {}, {
            params: _objectSpread2(_objectSpread2({}, {
                apikey: this.supabaseKey
            }), options === null || options === void 0 ? void 0 : options.params)
        }));
    }
    _listenForAuthEvents() {
        return this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
    }
    _handleTokenChanged(event, source, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN" || event === "INITIAL_SESSION") && this.changedAccessToken !== token) {
            this.changedAccessToken = token;
            this.realtime.setAuth(token);
        } else if (event === "SIGNED_OUT") {
            this.realtime.setAuth();
            if (source == "STORAGE") this.auth.signOut();
            this.changedAccessToken = void 0;
        }
    }
};
//#endregion
//#region src/index.ts
/**
* Creates a new Supabase Client.
*
* @example Creating a Supabase client
* ```ts
* import { createClient } from '@supabase/supabase-js'
*
* const supabase = createClient('https://xyzcompany.supabase.co', 'your-publishable-key')
* const { data, error } = await supabase.from('profiles').select('*')
* ```
*/ const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
};
function shouldShowDeprecationWarning() {
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" || globalThis["Deno"] !== void 0) return false;
    const _process = globalThis["process"];
    if (!_process) return false;
    const processVersion = _process["version"];
    if (processVersion === void 0 || processVersion === null) return false;
    const versionMatch = processVersion.match(/^v(\d+)\./);
    if (!versionMatch) return false;
    return parseInt(versionMatch[1], 10) <= 20;
}
if (shouldShowDeprecationWarning()) console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
;
}),
"[project]/node_modules/@supabase/supabase-js/dist/tracingRegistry.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>registerTraceContextExtractor,
    "t",
    ()=>getTraceContextExtractor
]);
//#region src/lib/tracingRegistry.ts
const EXTRACTOR_KEY = Symbol.for("@supabase/supabase-js.traceContextExtractor");
/**
* Register the trace context extractor used by all Supabase clients in this
* process. Called by the `@supabase/supabase-js/tracing` subpath as an import
* side effect; the last registration wins.
*/ function registerTraceContextExtractor(extractor) {
    globalThis[EXTRACTOR_KEY] = extractor;
}
/**
* The currently registered trace context extractor, if any.
*/ function getTraceContextExtractor() {
    return globalThis[EXTRACTOR_KEY];
}
;
}),
"[project]/node_modules/@upstash/core-analytics/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var g = Object.defineProperty;
var k = Object.getOwnPropertyDescriptor;
var _ = Object.getOwnPropertyNames;
var y = Object.prototype.hasOwnProperty;
var w = (l, e)=>{
    for(var t in e)g(l, t, {
        get: e[t],
        enumerable: !0
    });
}, A = (l, e, t, i)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let s of _(e))!y.call(l, s) && s !== t && g(l, s, {
        get: ()=>e[s],
        enumerable: !(i = k(e, s)) || i.enumerable
    });
    return l;
};
var x = (l)=>A(g({}, "__esModule", {
        value: !0
    }), l);
var S = {};
w(S, {
    Analytics: ()=>b
});
module.exports = x(S);
var p = `
local key = KEYS[1]
local field = ARGV[1]

local data = redis.call("ZRANGE", key, 0, -1, "WITHSCORES")
local count = {}

for i = 1, #data, 2 do
  local json_str = data[i]
  local score = tonumber(data[i + 1])
  local obj = cjson.decode(json_str)

  local fieldValue = obj[field]

  if count[fieldValue] == nil then
    count[fieldValue] = score
  else
    count[fieldValue] = count[fieldValue] + score
  end
end

local result = {}
for k, v in pairs(count) do
  table.insert(result, {k, v})
end

return result
`, f = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1]) -- First timestamp to check
local increment = tonumber(ARGV[2])       -- Increment between each timestamp
local num_timestamps = tonumber(ARGV[3])  -- Number of timestampts to check (24 for a day and 24 * 7 for a week)
local num_elements = tonumber(ARGV[4])    -- Number of elements to fetch in each category
local check_at_most = tonumber(ARGV[5])   -- Number of elements to check at most.

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

-- select num_elements many items
local true_group = {}
local false_group = {}
local denied_group = {}
local true_count = 0
local false_count = 0
local denied_count = 0
local i = #result - 1

-- index to stop at after going through "checkAtMost" many items:
local cutoff_index = #result - 2 * check_at_most

-- iterate over the results
while (true_count + false_count + denied_count) < (num_elements * 3) and 1 <= i and i >= cutoff_index do
  local score = tonumber(result[i + 1])
  if score > 0 then
    local element = result[i]
    if string.find(element, "success\\":true") and true_count < num_elements then
      table.insert(true_group, {score, element})
      true_count = true_count + 1
    elseif string.find(element, "success\\":false") and false_count < num_elements then
      table.insert(false_group, {score, element})
      false_count = false_count + 1
    elseif string.find(element, "success\\":\\"denied") and denied_count < num_elements then
      table.insert(denied_group, {score, element})
      denied_count = denied_count + 1
    end
  end
  i = i - 2
end

return {true_group, false_group, denied_group}
`, h = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1])
local increment = tonumber(ARGV[2])
local num_timestamps = tonumber(ARGV[3])

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

return result
`;
var b = class {
    redis;
    prefix;
    bucketSize;
    constructor(e){
        this.redis = e.redis, this.prefix = e.prefix ?? "@upstash/analytics", this.bucketSize = this.parseWindow(e.window);
    }
    validateTableName(e) {
        if (!/^[a-zA-Z0-9_-]+$/.test(e)) throw new Error(`Invalid table name: ${e}. Table names can only contain letters, numbers, dashes and underscores.`);
    }
    parseWindow(e) {
        if (typeof e == "number") {
            if (e <= 0) throw new Error(`Invalid window: ${e}`);
            return e;
        }
        let t = /^(\d+)([smhd])$/;
        if (!t.test(e)) throw new Error(`Invalid window: ${e}`);
        let [, i, s] = e.match(t), n = parseInt(i);
        switch(s){
            case "s":
                return n * 1e3;
            case "m":
                return n * 1e3 * 60;
            case "h":
                return n * 1e3 * 60 * 60;
            case "d":
                return n * 1e3 * 60 * 60 * 24;
            default:
                throw new Error(`Invalid window unit: ${s}`);
        }
    }
    getBucket(e) {
        let t = e ?? Date.now();
        return Math.floor(t / this.bucketSize) * this.bucketSize;
    }
    async ingest(e, ...t) {
        this.validateTableName(e), await Promise.all(t.map(async (i)=>{
            let s = this.getBucket(i.time), n = [
                this.prefix,
                e,
                s
            ].join(":");
            await this.redis.zincrby(n, 1, JSON.stringify({
                ...i,
                time: void 0
            }));
        }));
    }
    formatBucketAggregate(e, t, i) {
        let s = {};
        return e.forEach(([n, r])=>{
            t == "success" && (n = n === 1 ? "true" : n === null ? "false" : n), s[t] = s[t] || {}, s[t][(n ?? "null").toString()] = r;
        }), {
            time: i,
            ...s
        };
    }
    async aggregateBucket(e, t, i) {
        this.validateTableName(e);
        let s = this.getBucket(i), n = [
            this.prefix,
            e,
            s
        ].join(":"), r = await this.redis.eval(p, [
            n
        ], [
            t
        ]);
        return this.formatBucketAggregate(r, t, s);
    }
    async aggregateBuckets(e, t, i, s) {
        this.validateTableName(e);
        let n = this.getBucket(s), r = [];
        for(let o = 0; o < i; o += 1)r.push(this.aggregateBucket(e, t, n)), n = n - this.bucketSize;
        return Promise.all(r);
    }
    async aggregateBucketsWithPipeline(e, t, i, s, n) {
        this.validateTableName(e), n = n ?? 48;
        let r = this.getBucket(s), o = [], c = this.redis.pipeline(), u = [];
        for(let a = 1; a <= i; a += 1){
            let d = [
                this.prefix,
                e,
                r
            ].join(":");
            c.eval(p, [
                d
            ], [
                t
            ]), o.push(r), r = r - this.bucketSize, (a % n == 0 || a == i) && (u.push(c.exec()), c = this.redis.pipeline());
        }
        return (await Promise.all(u)).flat().map((a, d)=>this.formatBucketAggregate(a, t, o[d]));
    }
    async getAllowedBlocked(e, t, i) {
        this.validateTableName(e);
        let s = [
            this.prefix,
            e
        ].join(":"), n = this.getBucket(i), r = await this.redis.eval(h, [
            s
        ], [
            n,
            this.bucketSize,
            t
        ]), o = {};
        for(let c = 0; c < r.length; c += 2){
            let u = r[c], m = u.identifier, a = +r[c + 1];
            o[m] || (o[m] = {
                success: 0,
                blocked: 0
            }), o[m][u.success ? "success" : "blocked"] = a;
        }
        return o;
    }
    async getMostAllowedBlocked(e, t, i, s, n) {
        this.validateTableName(e);
        let r = [
            this.prefix,
            e
        ].join(":"), o = this.getBucket(s), c = n ?? i * 5, [u, m, a] = await this.redis.eval(f, [
            r
        ], [
            o,
            this.bucketSize,
            t,
            i,
            c
        ]);
        return {
            allowed: this.toDicts(u),
            ratelimited: this.toDicts(m),
            denied: this.toDicts(a)
        };
    }
    toDicts(e) {
        let t = [];
        for(let i = 0; i < e.length; i += 1){
            let s = +e[i][0], n = e[i][1];
            t.push({
                identifier: n.identifier,
                count: s
            });
        }
        return t;
    }
};
0 && (module.exports = {
    Analytics
});
}),
"[project]/node_modules/@upstash/ratelimit/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Analytics: ()=>Analytics,
    IpDenyList: ()=>ip_deny_list_exports,
    MultiRegionRatelimit: ()=>MultiRegionRatelimit,
    Ratelimit: ()=>RegionRatelimit
});
module.exports = __toCommonJS(src_exports);
// src/analytics.ts
var import_core_analytics = __turbopack_context__.r("[project]/node_modules/@upstash/core-analytics/dist/index.js [app-rsc] (ecmascript)");
var Analytics = class {
    analytics;
    table = "events";
    constructor(config){
        this.analytics = new import_core_analytics.Analytics({
            // @ts-expect-error we need to fix the types in core-analytics, it should only require the methods it needs, not the whole sdk
            redis: config.redis,
            window: "1h",
            prefix: config.prefix ?? "@upstash/ratelimit",
            retention: "90d"
        });
    }
    /**
   * Try to extract the geo information from the request
   *
   * This handles Vercel's `req.geo` and  and Cloudflare's `request.cf` properties
   * @param req
   * @returns
   */ extractGeo(req) {
        if (req.geo !== void 0) {
            return req.geo;
        }
        if (req.cf !== void 0) {
            return req.cf;
        }
        return {};
    }
    async record(event) {
        await this.analytics.ingest(this.table, event);
    }
    async series(filter, cutoff) {
        const timestampCount = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(cutoff)) / (60 * 60 * 1e3), 256);
        return this.analytics.aggregateBucketsWithPipeline(this.table, filter, timestampCount);
    }
    async getUsage(cutoff = 0) {
        const timestampCount = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(cutoff)) / (60 * 60 * 1e3), 256);
        const records = await this.analytics.getAllowedBlocked(this.table, timestampCount);
        return records;
    }
    async getUsageOverTime(timestampCount, groupby) {
        const result = await this.analytics.aggregateBucketsWithPipeline(this.table, groupby, timestampCount);
        return result;
    }
    async getMostAllowedBlocked(timestampCount, getTop, checkAtMost) {
        getTop = getTop ?? 5;
        const timestamp = void 0;
        return this.analytics.getMostAllowedBlocked(this.table, timestampCount, getTop, timestamp, checkAtMost);
    }
};
// src/cache.ts
var Cache = class {
    /**
   * Stores identifier -> reset (in milliseconds)
   */ cache;
    constructor(cache){
        this.cache = cache;
    }
    isBlocked(identifier) {
        if (!this.cache.has(identifier)) {
            return {
                blocked: false,
                reset: 0
            };
        }
        const reset = this.cache.get(identifier);
        if (reset < Date.now()) {
            this.cache.delete(identifier);
            return {
                blocked: false,
                reset: 0
            };
        }
        return {
            blocked: true,
            reset
        };
    }
    blockUntil(identifier, reset) {
        this.cache.set(identifier, reset);
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key) || null;
    }
    incr(key, incrementAmount = 1) {
        let value = this.cache.get(key) ?? 0;
        value += incrementAmount;
        this.cache.set(key, value);
        return value;
    }
    pop(key) {
        this.cache.delete(key);
    }
    empty() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
};
// src/constants.ts
var DYNAMIC_LIMIT_KEY_SUFFIX = ":dynamic:global";
var DEFAULT_PREFIX = "@upstash/ratelimit";
// src/duration.ts
function ms(d) {
    const match = d.match(/^(\d+)\s?(ms|s|m|h|d)$/);
    if (!match) {
        throw new Error(`Unable to parse window size: ${d}`);
    }
    const time = Number.parseInt(match[1]);
    const unit = match[2];
    switch(unit){
        case "ms":
            {
                return time;
            }
        case "s":
            {
                return time * 1e3;
            }
        case "m":
            {
                return time * 1e3 * 60;
            }
        case "h":
            {
                return time * 1e3 * 60 * 60;
            }
        case "d":
            {
                return time * 1e3 * 60 * 60 * 24;
            }
        default:
            {
                throw new Error(`Unable to parse window size: ${d}`);
            }
    }
}
// src/hash.ts
var safeEval = async (ctx, script, keys, args)=>{
    try {
        return await ctx.redis.evalsha(script.hash, keys, args);
    } catch (error) {
        if (`${error}`.includes("NOSCRIPT")) {
            return await ctx.redis.eval(script.script, keys, args);
        }
        throw error;
    }
};
// src/lua-scripts/single.ts
var fixedWindowLimitScript = `
  local key           = KEYS[1]
  local dynamicLimitKey = KEYS[2]  -- optional: key for dynamic limit in redis
  local tokens        = tonumber(ARGV[1])  -- default limit
  local window        = ARGV[2]
  local incrementBy   = ARGV[3] -- increment rate per request at a given value, default is 1

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local r = redis.call("INCRBY", key, incrementBy)
  if r == tonumber(incrementBy) then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end

  return {r, effectiveLimit}
`;
var fixedWindowRemainingTokensScript = `
  local key = KEYS[1]
  local dynamicLimitKey = KEYS[2]  -- optional: key for dynamic limit in redis
  local tokens = tonumber(ARGV[1])  -- default limit

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local value = redis.call('GET', key)
  local usedTokens = 0
  if value then
    usedTokens = tonumber(value)
  end
  
  return {effectiveLimit - usedTokens, effectiveLimit}
`;
var slidingWindowLimitScript = `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local dynamicLimitKey = KEYS[3]       -- optional: key for dynamic limit in redis
  local tokens      = tonumber(ARGV[1]) -- default tokens per window
  local now         = ARGV[2]           -- current timestamp in milliseconds
  local window      = ARGV[3]           -- interval in milliseconds
  local incrementBy = tonumber(ARGV[4]) -- increment rate per request at a given value, default is 1

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end
  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)

  -- Only check limit if not refunding (negative rate)
  if incrementBy > 0 and requestsInPreviousWindow + requestsInCurrentWindow >= effectiveLimit then
    return {-1, effectiveLimit}
  end

  local newValue = redis.call("INCRBY", currentKey, incrementBy)
  if newValue == incrementBy then
    -- The first time this key is set, the value will be equal to incrementBy.
    -- So we only need the expire command once
    redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
  end
  return {effectiveLimit - ( newValue + requestsInPreviousWindow ), effectiveLimit}
`;
var slidingWindowRemainingTokensScript = `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local dynamicLimitKey = KEYS[3]       -- optional: key for dynamic limit in redis
  local tokens      = tonumber(ARGV[1]) -- default tokens per window
  local now         = ARGV[2]           -- current timestamp in milliseconds
  local window      = ARGV[3]           -- interval in milliseconds

  -- Check for dynamic limit
  local effectiveLimit = tokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end

  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)

  local usedTokens = requestsInPreviousWindow + requestsInCurrentWindow
  return {effectiveLimit - usedTokens, effectiveLimit}
`;
var tokenBucketLimitScript = `
  local key         = KEYS[1]           -- identifier including prefixes
  local dynamicLimitKey = KEYS[2]       -- optional: key for dynamic limit in redis
  local maxTokens   = tonumber(ARGV[1]) -- default maximum number of tokens
  local interval    = tonumber(ARGV[2]) -- size of the window in milliseconds
  local refillRate  = tonumber(ARGV[3]) -- how many tokens are refilled after each interval
  local now         = tonumber(ARGV[4]) -- current timestamp in milliseconds
  local incrementBy = tonumber(ARGV[5]) -- how many tokens to consume, default is 1

  -- Check for dynamic limit
  local effectiveLimit = maxTokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")
        
  local refilledAt
  local tokens

  if bucket[1] == false then
    refilledAt = now
    tokens = effectiveLimit
  else
    refilledAt = tonumber(bucket[1])
    tokens = tonumber(bucket[2])
  end
        
  if now >= refilledAt + interval then
    local numRefills = math.floor((now - refilledAt) / interval)
    tokens = math.min(effectiveLimit, tokens + numRefills * refillRate)

    refilledAt = refilledAt + numRefills * interval
  end

  -- Only reject if tokens are 0 and we're consuming (not refunding)
  if tokens == 0 and incrementBy > 0 then
    return {-1, refilledAt + interval, effectiveLimit}
  end

  local remaining = tokens - incrementBy
  local expireAt = math.ceil(((effectiveLimit - remaining) / refillRate)) * interval
        
  redis.call("HSET", key, "refilledAt", refilledAt, "tokens", remaining)

  if (expireAt > 0) then
    redis.call("PEXPIRE", key, expireAt)
  end
  return {remaining, refilledAt + interval, effectiveLimit}
`;
var tokenBucketIdentifierNotFound = -1;
var tokenBucketRemainingTokensScript = `
  local key         = KEYS[1]
  local dynamicLimitKey = KEYS[2]       -- optional: key for dynamic limit in redis
  local maxTokens   = tonumber(ARGV[1]) -- default maximum number of tokens

  -- Check for dynamic limit
  local effectiveLimit = maxTokens
  if dynamicLimitKey ~= "" then
    local dynamicLimit = redis.call("GET", dynamicLimitKey)
    if dynamicLimit then
      effectiveLimit = tonumber(dynamicLimit)
    end
  end
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")

  if bucket[1] == false then
    return {effectiveLimit, ${tokenBucketIdentifierNotFound}, effectiveLimit}
  end
        
  return {tonumber(bucket[2]), tonumber(bucket[1]), effectiveLimit}
`;
var cachedFixedWindowLimitScript = `
  local key     = KEYS[1]
  local window  = ARGV[1]
  local incrementBy   = ARGV[2] -- increment rate per request at a given value, default is 1

  local r = redis.call("INCRBY", key, incrementBy)
  if r == incrementBy then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end
      
  return r
`;
var cachedFixedWindowRemainingTokenScript = `
  local key = KEYS[1]
  local tokens = 0

  local value = redis.call('GET', key)
  if value then
      tokens = value
  end
  return tokens
`;
// src/lua-scripts/multi.ts
var fixedWindowLimitScript2 = `
	local key           = KEYS[1]
	local id            = ARGV[1]
	local window        = ARGV[2]
	local incrementBy   = tonumber(ARGV[3])

	redis.call("HSET", key, id, incrementBy)
	local fields = redis.call("HGETALL", key)
	if #fields == 2 and tonumber(fields[2])==incrementBy then
	-- The first time this key is set, and the value will be equal to incrementBy.
	-- So we only need the expire command once
	  redis.call("PEXPIRE", key, window)
	end

	return fields
`;
var fixedWindowRemainingTokensScript2 = `
      local key = KEYS[1]
      local tokens = 0

      local fields = redis.call("HGETALL", key)

      return fields
    `;
var slidingWindowLimitScript2 = `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local tokens        = tonumber(ARGV[1]) -- tokens per window
	local now           = ARGV[2]           -- current timestamp in milliseconds
	local window        = ARGV[3]           -- interval in milliseconds
	local requestId     = ARGV[4]           -- uuid for this request
	local incrementBy   = tonumber(ARGV[5]) -- custom rate, default is  1

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window

	-- Only check limit if not refunding (negative rate)
	if incrementBy > 0 and requestsInPreviousWindow * (1 - percentageInCurrent ) + requestsInCurrentWindow + incrementBy > tokens then
	  return {currentFields, previousFields, false}
	end

	redis.call("HSET", currentKey, requestId, incrementBy)

	if requestsInCurrentWindow == 0 then 
	  -- The first time this key is set, the value will be equal to incrementBy.
	  -- So we only need the expire command once
	  redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
	end
	return {currentFields, previousFields, true}
`;
var slidingWindowRemainingTokensScript2 = `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local now         	= ARGV[1]           -- current timestamp in milliseconds
  	local window      	= ARGV[2]           -- interval in milliseconds

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window
  	requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)
	
	return requestsInCurrentWindow + requestsInPreviousWindow
`;
// src/lua-scripts/reset.ts
var resetScript = `
      local pattern = KEYS[1]

      -- Initialize cursor to start from 0
      local cursor = "0"

      repeat
          -- Scan for keys matching the pattern
          local scan_result = redis.call('SCAN', cursor, 'MATCH', pattern)

          -- Extract cursor for the next iteration
          cursor = scan_result[1]

          -- Extract keys from the scan result
          local keys = scan_result[2]

          for i=1, #keys do
          redis.call('DEL', keys[i])
          end

      -- Continue scanning until cursor is 0 (end of keyspace)
      until cursor == "0"
    `;
// src/lua-scripts/hash.ts
var SCRIPTS = {
    singleRegion: {
        fixedWindow: {
            limit: {
                script: fixedWindowLimitScript,
                hash: "472e55443b62f60d0991028456c57815a387066d"
            },
            getRemaining: {
                script: fixedWindowRemainingTokensScript,
                hash: "40515c9dd0a08f8584f5f9b593935f6a87c1c1c3"
            }
        },
        slidingWindow: {
            limit: {
                script: slidingWindowLimitScript,
                hash: "977fb636fb5ceb7e98a96d1b3a1272ba018efdae"
            },
            getRemaining: {
                script: slidingWindowRemainingTokensScript,
                hash: "ee3a3265fad822f83acad23f8a1e2f5c0b156b03"
            }
        },
        tokenBucket: {
            limit: {
                script: tokenBucketLimitScript,
                hash: "b35c5bc0b7fdae7dd0573d4529911cabaf9d1d89"
            },
            getRemaining: {
                script: tokenBucketRemainingTokensScript,
                hash: "deb03663e8af5a968deee895dd081be553d2611b"
            }
        },
        cachedFixedWindow: {
            limit: {
                script: cachedFixedWindowLimitScript,
                hash: "c26b12703dd137939b9a69a3a9b18e906a2d940f"
            },
            getRemaining: {
                script: cachedFixedWindowRemainingTokenScript,
                hash: "8e8f222ccae68b595ee6e3f3bf2199629a62b91a"
            }
        }
    },
    multiRegion: {
        fixedWindow: {
            limit: {
                script: fixedWindowLimitScript2,
                hash: "a8c14f3835aa87bd70e5e2116081b81664abcf5c"
            },
            getRemaining: {
                script: fixedWindowRemainingTokensScript2,
                hash: "8ab8322d0ed5fe5ac8eb08f0c2e4557f1b4816fd"
            }
        },
        slidingWindow: {
            limit: {
                script: slidingWindowLimitScript2,
                hash: "1e7ca8dcd2d600a6d0124a67a57ea225ed62921b"
            },
            getRemaining: {
                script: slidingWindowRemainingTokensScript2,
                hash: "558c9306b7ec54abb50747fe0b17e5d44bd24868"
            }
        }
    }
};
var RESET_SCRIPT = {
    script: resetScript,
    hash: "54bd274ddc59fb3be0f42deee2f64322a10e2b50"
};
// src/types.ts
var DenyListExtension = "denyList";
var IpDenyListKey = "ipDenyList";
var IpDenyListStatusKey = "ipDenyListStatus";
// src/deny-list/scripts.ts
var checkDenyListScript = `
  -- Checks if values provideed in ARGV are present in the deny lists.
  -- This is done using the allDenyListsKey below.

  -- Additionally, checks the status of the ip deny list using the
  -- ipDenyListStatusKey below. Here are the possible states of the
  -- ipDenyListStatusKey key:
  -- * status == -1: set to "disabled" with no TTL
  -- * status == -2: not set, meaning that is was set before but expired
  -- * status  >  0: set to "valid", with a TTL
  --
  -- In the case of status == -2, we set the status to "pending" with
  -- 30 second ttl. During this time, the process which got status == -2
  -- will update the ip deny list.

  local allDenyListsKey     = KEYS[1]
  local ipDenyListStatusKey = KEYS[2]

  local results = redis.call('SMISMEMBER', allDenyListsKey, unpack(ARGV))
  local status  = redis.call('TTL', ipDenyListStatusKey)
  if status == -2 then
    redis.call('SETEX', ipDenyListStatusKey, 30, "pending")
  end

  return { results, status }
`;
// src/deny-list/ip-deny-list.ts
var ip_deny_list_exports = {};
__export(ip_deny_list_exports, {
    ThresholdError: ()=>ThresholdError,
    disableIpDenyList: ()=>disableIpDenyList,
    updateIpDenyList: ()=>updateIpDenyList
});
// src/deny-list/time.ts
var MILLISECONDS_IN_HOUR = 60 * 60 * 1e3;
var MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;
var MILLISECONDS_TO_2AM = 2 * MILLISECONDS_IN_HOUR;
var getIpListTTL = (time)=>{
    const now = time || Date.now();
    const timeSinceLast2AM = (now - MILLISECONDS_TO_2AM) % MILLISECONDS_IN_DAY;
    return MILLISECONDS_IN_DAY - timeSinceLast2AM;
};
// src/deny-list/ip-deny-list.ts
var baseUrl = "https://raw.githubusercontent.com/stamparm/ipsum/master/levels";
var ThresholdError = class extends Error {
    constructor(threshold){
        super(`Allowed threshold values are from 1 to 8, 1 and 8 included. Received: ${threshold}`);
        this.name = "ThresholdError";
    }
};
var getIpDenyList = async (threshold)=>{
    if (typeof threshold !== "number" || threshold < 1 || threshold > 8) {
        throw new ThresholdError(threshold);
    }
    try {
        const response = await fetch(`${baseUrl}/${threshold}.txt`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.text();
        const lines = data.split("\n");
        return lines.filter((value)=>value.length > 0);
    } catch (error) {
        throw new Error(`Failed to fetch ip deny list: ${error}`);
    }
};
var updateIpDenyList = async (redis, prefix, threshold, ttl)=>{
    const allIps = await getIpDenyList(threshold);
    const allDenyLists = [
        prefix,
        DenyListExtension,
        "all"
    ].join(":");
    const ipDenyList = [
        prefix,
        DenyListExtension,
        IpDenyListKey
    ].join(":");
    const statusKey = [
        prefix,
        IpDenyListStatusKey
    ].join(":");
    const transaction = redis.multi();
    transaction.sdiffstore(allDenyLists, allDenyLists, ipDenyList);
    transaction.del(ipDenyList);
    transaction.sadd(ipDenyList, allIps.at(0), ...allIps.slice(1));
    transaction.sdiffstore(ipDenyList, ipDenyList, allDenyLists);
    transaction.sunionstore(allDenyLists, allDenyLists, ipDenyList);
    transaction.set(statusKey, "valid", {
        px: ttl ?? getIpListTTL()
    });
    return await transaction.exec();
};
var disableIpDenyList = async (redis, prefix)=>{
    const allDenyListsKey = [
        prefix,
        DenyListExtension,
        "all"
    ].join(":");
    const ipDenyListKey = [
        prefix,
        DenyListExtension,
        IpDenyListKey
    ].join(":");
    const statusKey = [
        prefix,
        IpDenyListStatusKey
    ].join(":");
    const transaction = redis.multi();
    transaction.sdiffstore(allDenyListsKey, allDenyListsKey, ipDenyListKey);
    transaction.del(ipDenyListKey);
    transaction.set(statusKey, "disabled");
    return await transaction.exec();
};
// src/deny-list/deny-list.ts
var denyListCache = new Cache(/* @__PURE__ */ new Map());
var checkDenyListCache = (members)=>{
    return members.find((member)=>denyListCache.isBlocked(member).blocked);
};
var blockMember = (member)=>{
    if (denyListCache.size() > 1e3) denyListCache.empty();
    denyListCache.blockUntil(member, Date.now() + 6e4);
};
var checkDenyList = async (redis, prefix, members)=>{
    const [deniedValues, ipDenyListStatus] = await redis.eval(checkDenyListScript, [
        [
            prefix,
            DenyListExtension,
            "all"
        ].join(":"),
        [
            prefix,
            IpDenyListStatusKey
        ].join(":")
    ], members);
    let deniedValue = void 0;
    deniedValues.map((memberDenied, index)=>{
        if (memberDenied) {
            blockMember(members[index]);
            deniedValue = members[index];
        }
    });
    return {
        deniedValue,
        invalidIpDenyList: ipDenyListStatus === -2
    };
};
var resolveLimitPayload = (redis, prefix, [ratelimitResponse, denyListResponse], threshold)=>{
    if (denyListResponse.deniedValue) {
        ratelimitResponse.success = false;
        ratelimitResponse.remaining = 0;
        ratelimitResponse.reason = "denyList";
        ratelimitResponse.deniedValue = denyListResponse.deniedValue;
    }
    if (denyListResponse.invalidIpDenyList) {
        const updatePromise = updateIpDenyList(redis, prefix, threshold);
        ratelimitResponse.pending = Promise.all([
            ratelimitResponse.pending,
            updatePromise
        ]);
    }
    return ratelimitResponse;
};
var defaultDeniedResponse = (deniedValue)=>{
    return {
        success: false,
        limit: 0,
        remaining: 0,
        reset: 0,
        pending: Promise.resolve(),
        reason: "denyList",
        deniedValue
    };
};
// src/ratelimit.ts
var Ratelimit = class {
    limiter;
    ctx;
    prefix;
    timeout;
    primaryRedis;
    analytics;
    enableProtection;
    denyListThreshold;
    dynamicLimits;
    constructor(config){
        this.ctx = config.ctx;
        this.limiter = config.limiter;
        this.timeout = config.timeout ?? 5e3;
        this.prefix = config.prefix ?? DEFAULT_PREFIX;
        this.dynamicLimits = config.dynamicLimits ?? false;
        this.enableProtection = config.enableProtection ?? false;
        this.denyListThreshold = config.denyListThreshold ?? 6;
        this.primaryRedis = "redis" in this.ctx ? this.ctx.redis : this.ctx.regionContexts[0].redis;
        if ("redis" in this.ctx) {
            this.ctx.dynamicLimits = this.dynamicLimits;
            this.ctx.prefix = this.prefix;
        }
        this.analytics = config.analytics ? new Analytics({
            redis: this.primaryRedis,
            prefix: this.prefix
        }) : void 0;
        if (config.ephemeralCache instanceof Map) {
            this.ctx.cache = new Cache(config.ephemeralCache);
        } else if (config.ephemeralCache === void 0) {
            this.ctx.cache = new Cache(/* @__PURE__ */ new Map());
        }
    }
    /**
   * Determine if a request should pass or be rejected based on the identifier and previously chosen ratelimit.
   *
   * Use this if you want to reject all requests that you can not handle right now.
   *
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(10, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.limit(id)
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   *
   * @param req.rate - The rate at which tokens will be added or consumed from the token bucket. A higher rate allows for more requests to be processed. Defaults to 1 token per interval if not specified.
   *
   * Usage with `req.rate`
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(100, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.limit(id, {rate: 10})
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   */ limit = async (identifier, req)=>{
        let timeoutId = null;
        try {
            const response = this.getRatelimitResponse(identifier, req);
            const { responseArray, newTimeoutId } = this.applyTimeout(response);
            timeoutId = newTimeoutId;
            const timedResponse = await Promise.race(responseArray);
            const finalResponse = this.submitAnalytics(timedResponse, identifier, req);
            return finalResponse;
        } finally{
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    };
    /**
   * Block until the request may pass or timeout is reached.
   *
   * This method returns a promise that resolves as soon as the request may be processed
   * or after the timeout has been reached.
   *
   * Use this if you want to delay the request until it is ready to get processed.
   *
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(10, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.blockUntilReady(id, 60_000)
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   */ blockUntilReady = async (identifier, timeout)=>{
        if (timeout <= 0) {
            throw new Error("timeout must be positive");
        }
        let res;
        const deadline = Date.now() + timeout;
        while(true){
            res = await this.limit(identifier);
            if (res.success) {
                break;
            }
            if (res.reset === 0) {
                throw new Error("This should not happen");
            }
            const wait = Math.min(res.reset, deadline) - Date.now();
            await new Promise((r)=>setTimeout(r, wait));
            if (Date.now() > deadline) {
                break;
            }
        }
        return res;
    };
    resetUsedTokens = async (identifier)=>{
        const pattern = [
            this.prefix,
            identifier
        ].join(":");
        await this.limiter().resetTokens(this.ctx, pattern);
    };
    /**
   * Returns the remaining token count together with a reset timestamps
   * 
   * @param identifier identifir to check
   * @returns object with `remaining`, `reset`, and `limit` fields. `remaining` denotes
   *          the remaining tokens, `limit` is the effective limit (considering dynamic
   *          limits if enabled), and `reset` denotes the timestamp when the tokens reset.
   */ getRemaining = async (identifier)=>{
        const pattern = [
            this.prefix,
            identifier
        ].join(":");
        return await this.limiter().getRemaining(this.ctx, pattern);
    };
    /**
   * Checks if the identifier or the values in req are in the deny list cache.
   * If so, returns the default denied response.
   * 
   * Otherwise, calls redis to check the rate limit and deny list. Returns after
   * resolving the result. Resolving is overriding the rate limit result if
   * the some value is in deny list.
   * 
   * @param identifier identifier to block
   * @param req options with ip, user agent, country, rate and geo info
   * @returns rate limit response
   */ getRatelimitResponse = async (identifier, req)=>{
        const key = this.getKey(identifier);
        const definedMembers = this.getDefinedMembers(identifier, req);
        const deniedValue = checkDenyListCache(definedMembers);
        const result = deniedValue ? [
            defaultDeniedResponse(deniedValue),
            {
                deniedValue,
                invalidIpDenyList: false
            }
        ] : await Promise.all([
            this.limiter().limit(this.ctx, key, req?.rate),
            this.enableProtection ? checkDenyList(this.primaryRedis, this.prefix, definedMembers) : {
                deniedValue: void 0,
                invalidIpDenyList: false
            }
        ]);
        return resolveLimitPayload(this.primaryRedis, this.prefix, result, this.denyListThreshold);
    };
    /**
   * Creates an array with the original response promise and a timeout promise
   * if this.timeout > 0.
   * 
   * @param response Ratelimit response promise
   * @returns array with the response and timeout promise. also includes the timeout id
   */ applyTimeout = (response)=>{
        let newTimeoutId = null;
        const responseArray = [
            response
        ];
        if (this.timeout > 0) {
            const timeoutResponse = new Promise((resolve)=>{
                newTimeoutId = setTimeout(()=>{
                    resolve({
                        success: true,
                        limit: 0,
                        remaining: 0,
                        reset: 0,
                        pending: Promise.resolve(),
                        reason: "timeout"
                    });
                }, this.timeout);
            });
            responseArray.push(timeoutResponse);
        }
        return {
            responseArray,
            newTimeoutId
        };
    };
    /**
   * submits analytics if this.analytics is set
   * 
   * @param ratelimitResponse final rate limit response
   * @param identifier identifier to submit
   * @param req limit options
   * @returns rate limit response after updating the .pending field
   */ submitAnalytics = (ratelimitResponse, identifier, req)=>{
        if (this.analytics) {
            try {
                const geo = req ? this.analytics.extractGeo(req) : void 0;
                const analyticsP = this.analytics.record({
                    identifier: ratelimitResponse.reason === "denyList" ? ratelimitResponse.deniedValue : identifier,
                    time: Date.now(),
                    success: ratelimitResponse.reason === "denyList" ? "denied" : ratelimitResponse.success,
                    ...geo
                }).catch((error)=>{
                    let errorMessage = "Failed to record analytics";
                    if (`${error}`.includes("WRONGTYPE")) {
                        errorMessage = `
    Failed to record analytics. See the information below:

    This can occur when you uprade to Ratelimit version 1.1.2
    or later from an earlier version.

    This occurs simply because the way we store analytics data
    has changed. To avoid getting this error, disable analytics
    for *an hour*, then simply enable it back.

    `;
                    }
                    console.warn(errorMessage, error);
                });
                ratelimitResponse.pending = Promise.all([
                    ratelimitResponse.pending,
                    analyticsP
                ]);
            } catch (error) {
                console.warn("Failed to record analytics", error);
            }
            ;
        }
        ;
        return ratelimitResponse;
    };
    getKey = (identifier)=>{
        return [
            this.prefix,
            identifier
        ].join(":");
    };
    /**
   * returns a list of defined values from
   * [identifier, req.ip, req.userAgent, req.country]
   * 
   * @param identifier identifier
   * @param req limit options
   * @returns list of defined values
   */ getDefinedMembers = (identifier, req)=>{
        const members = [
            identifier,
            req?.ip,
            req?.userAgent,
            req?.country
        ];
        return members.filter(Boolean);
    };
    /**
   * Set a dynamic rate limit globally.
   * 
   * When dynamicLimits is enabled, this limit will override the default limit
   * set in the constructor for all requests.
   * 
   * @example
   * ```ts
   * const ratelimit = new Ratelimit({
   *   redis: Redis.fromEnv(),
   *   limiter: Ratelimit.slidingWindow(10, "10 s"),
   *   dynamicLimits: true
   * });
   * 
   * // Set global dynamic limit to 120 requests
   * await ratelimit.setDynamicLimit({ limit: 120 });
   * 
   * // Disable dynamic limit (falls back to default)
   * await ratelimit.setDynamicLimit({ limit: false });
   * ```
   * 
   * @param options.limit - The new rate limit to apply globally, or false to disable
   */ setDynamicLimit = async (options)=>{
        if (!this.dynamicLimits) {
            throw new Error("dynamicLimits must be enabled in the Ratelimit constructor to use setDynamicLimit()");
        }
        const globalKey = `${this.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}`;
        await (options.limit === false ? this.primaryRedis.del(globalKey) : this.primaryRedis.set(globalKey, options.limit));
    };
    /**
   * Get the current global dynamic rate limit.
   * 
   * @example
   * ```ts
   * const { dynamicLimit } = await ratelimit.getDynamicLimit();
   * console.log(dynamicLimit); // 120 or null if not set
   * ```
   * 
   * @returns Object containing the current global dynamic limit, or null if not set
   */ getDynamicLimit = async ()=>{
        if (!this.dynamicLimits) {
            throw new Error("dynamicLimits must be enabled in the Ratelimit constructor to use getDynamicLimit()");
        }
        const globalKey = `${this.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}`;
        const result = await this.primaryRedis.get(globalKey);
        return {
            dynamicLimit: result === null ? null : Number(result)
        };
    };
};
// src/multi.ts
function randomId() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for(let i = 0; i < 16; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
var MultiRegionRatelimit = class extends Ratelimit {
    /**
   * Create a new Ratelimit instance by providing a `@upstash/redis` instance and the algorithn of your choice.
   */ constructor(config){
        super({
            prefix: config.prefix,
            limiter: config.limiter,
            timeout: config.timeout,
            analytics: config.analytics,
            dynamicLimits: config.dynamicLimits,
            ctx: {
                regionContexts: config.redis.map((redis)=>({
                        redis,
                        prefix: config.prefix ?? DEFAULT_PREFIX
                    })),
                cache: config.ephemeralCache ? new Cache(config.ephemeralCache) : void 0
            }
        });
        if (config.dynamicLimits) {
            console.warn("Warning: Dynamic limits are not yet supported for multi-region rate limiters. The dynamicLimits option will be ignored.");
        }
    }
    /**
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static fixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const requestId = randomId();
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const incrementBy = rate ?? 1;
                    if (ctx.cache && incrementBy > 0) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.fixedWindow.limit, [
                                key
                            ], [
                                requestId,
                                windowDuration,
                                incrementBy
                            ])
                        }));
                    const firstResponse = await Promise.any(dbs.map((s)=>s.request));
                    const usedTokens = firstResponse.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const remaining = tokens - usedTokens;
                    async function sync() {
                        const individualIDs = await Promise.all(dbs.map((s)=>s.request));
                        const allIDs = [
                            ...new Set(individualIDs.flat().reduce((acc, curr, index)=>{
                                if (index % 2 === 0) {
                                    acc.push(curr);
                                }
                                return acc;
                            }, [])).values()
                        ];
                        for (const db of dbs){
                            const usedDbTokensRequest = await db.request;
                            const usedDbTokens = usedDbTokensRequest.reduce((accTokens, usedToken, index)=>{
                                let parsedToken = 0;
                                if (index % 2) {
                                    parsedToken = Number.parseInt(usedToken);
                                }
                                return accTokens + parsedToken;
                            }, 0);
                            const dbIdsRequest = await db.request;
                            const dbIds = dbIdsRequest.reduce((ids, currentId, index)=>{
                                if (index % 2 === 0) {
                                    ids.push(currentId);
                                }
                                return ids;
                            }, []);
                            if (usedDbTokens >= tokens) {
                                continue;
                            }
                            const diff = allIDs.filter((id)=>!dbIds.includes(id));
                            if (diff.length === 0) {
                                continue;
                            }
                            for (const requestId2 of diff){
                                await db.redis.hset(key, {
                                    [requestId2]: incrementBy
                                });
                            }
                        }
                    }
                    const success = remaining >= 0;
                    const reset = (bucket + 1) * windowDuration;
                    if (ctx.cache) {
                        if (!success) {
                            ctx.cache.blockUntil(identifier, reset);
                        } else if (incrementBy < 0) {
                            ctx.cache.pop(identifier);
                        }
                    }
                    return {
                        success,
                        limit: tokens,
                        remaining,
                        reset,
                        pending: sync()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.fixedWindow.getRemaining, [
                                key
                            ], [
                                null
                            ])
                        }));
                    const firstResponse = await Promise.any(dbs.map((s)=>s.request));
                    const usedTokens = firstResponse.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (bucket + 1) * windowDuration,
                        limit: tokens
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await Promise.all(ctx.regionContexts.map((regionContext)=>{
                        safeEval(regionContext, RESET_SCRIPT, [
                            pattern
                        ], [
                            null
                        ]);
                    }));
                }
            });
    }
    /**
   * Combined approach of `slidingLogs` and `fixedWindow` with lower storage
   * costs than `slidingLogs` and improved boundary behavior by calculating a
   * weighted score between two windows.
   *
   * **Pro:**
   *
   * Good performance allows this to scale to very high loads.
   *
   * **Con:**
   *
   * Nothing major.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - The duration in which the user can max X requests.
   */ static slidingWindow(tokens, window) {
        const windowSize = ms(window);
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const requestId = randomId();
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const incrementBy = rate ?? 1;
                    if (ctx.cache && incrementBy > 0) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.slidingWindow.limit, [
                                currentKey,
                                previousKey
                            ], [
                                tokens,
                                now,
                                windowDuration,
                                requestId,
                                incrementBy
                            ])
                        }));
                    const percentageInCurrent = now % windowDuration / windowDuration;
                    const [current, previous, success] = await Promise.any(dbs.map((s)=>s.request));
                    if (success) {
                        current.push(requestId, incrementBy.toString());
                    }
                    const previousUsedTokens = previous.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const currentUsedTokens = current.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const previousPartialUsed = Math.ceil(previousUsedTokens * (1 - percentageInCurrent));
                    const usedTokens = previousPartialUsed + currentUsedTokens;
                    const remaining = tokens - usedTokens;
                    async function sync() {
                        const res = await Promise.all(dbs.map((s)=>s.request));
                        const allCurrentIds = [
                            ...new Set(res.flatMap(([current2])=>current2).reduce((acc, curr, index)=>{
                                if (index % 2 === 0) {
                                    acc.push(curr);
                                }
                                return acc;
                            }, [])).values()
                        ];
                        for (const db of dbs){
                            const [current2, _previous, _success] = await db.request;
                            const dbIds = current2.reduce((ids, currentId, index)=>{
                                if (index % 2 === 0) {
                                    ids.push(currentId);
                                }
                                return ids;
                            }, []);
                            const usedDbTokens = current2.reduce((accTokens, usedToken, index)=>{
                                let parsedToken = 0;
                                if (index % 2) {
                                    parsedToken = Number.parseInt(usedToken);
                                }
                                return accTokens + parsedToken;
                            }, 0);
                            if (usedDbTokens >= tokens) {
                                continue;
                            }
                            const diff = allCurrentIds.filter((id)=>!dbIds.includes(id));
                            if (diff.length === 0) {
                                continue;
                            }
                            for (const requestId2 of diff){
                                await db.redis.hset(currentKey, {
                                    [requestId2]: incrementBy
                                });
                            }
                        }
                    }
                    const reset = (currentWindow + 1) * windowDuration;
                    if (ctx.cache) {
                        if (!success) {
                            ctx.cache.blockUntil(identifier, reset);
                        } else if (incrementBy < 0) {
                            ctx.cache.pop(identifier);
                        }
                    }
                    return {
                        success: Boolean(success),
                        limit: tokens,
                        remaining: Math.max(0, remaining),
                        reset,
                        pending: sync()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.slidingWindow.getRemaining, [
                                currentKey,
                                previousKey
                            ], [
                                now,
                                windowSize
                            ])
                        }));
                    const usedTokens = await Promise.any(dbs.map((s)=>s.request));
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (currentWindow + 1) * windowSize,
                        limit: tokens
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await Promise.all(ctx.regionContexts.map((regionContext)=>{
                        safeEval(regionContext, RESET_SCRIPT, [
                            pattern
                        ], [
                            null
                        ]);
                    }));
                }
            });
    }
};
// src/single.ts
var RegionRatelimit = class extends Ratelimit {
    /**
   * Create a new Ratelimit instance by providing a `@upstash/redis` instance and the algorithm of your choice.
   */ constructor(config){
        super({
            prefix: config.prefix,
            limiter: config.limiter,
            timeout: config.timeout,
            analytics: config.analytics,
            ctx: {
                redis: config.redis,
                prefix: config.prefix ?? DEFAULT_PREFIX
            },
            ephemeralCache: config.ephemeralCache,
            enableProtection: config.enableProtection,
            denyListThreshold: config.denyListThreshold,
            dynamicLimits: config.dynamicLimits
        });
    }
    /**
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static fixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const incrementBy = rate ?? 1;
                    if (ctx.cache && incrementBy > 0) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [usedTokensAfterUpdate, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.fixedWindow.limit, [
                        key,
                        dynamicLimitKey
                    ], [
                        tokens,
                        windowDuration,
                        incrementBy
                    ]);
                    const success = usedTokensAfterUpdate <= effectiveLimit;
                    const remainingTokens = Math.max(0, effectiveLimit - usedTokensAfterUpdate);
                    const reset = (bucket + 1) * windowDuration;
                    if (ctx.cache) {
                        if (!success) {
                            ctx.cache.blockUntil(identifier, reset);
                        } else if (incrementBy < 0) {
                            ctx.cache.pop(identifier);
                        }
                    }
                    return {
                        success,
                        limit: effectiveLimit,
                        remaining: remainingTokens,
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [remaining, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.fixedWindow.getRemaining, [
                        key,
                        dynamicLimitKey
                    ], [
                        tokens
                    ]);
                    return {
                        remaining: Math.max(0, remaining),
                        reset: (bucket + 1) * windowDuration,
                        limit: effectiveLimit
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * Combined approach of `slidingLogs` and `fixedWindow` with lower storage
   * costs than `slidingLogs` and improved boundary behavior by calculating a
   * weighted score between two windows.
   *
   * **Pro:**
   *
   * Good performance allows this to scale to very high loads.
   *
   * **Con:**
   *
   * Nothing major.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - The duration in which the user can max X requests.
   */ static slidingWindow(tokens, window) {
        const windowSize = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const incrementBy = rate ?? 1;
                    if (ctx.cache && incrementBy > 0) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [remainingTokens, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.slidingWindow.limit, [
                        currentKey,
                        previousKey,
                        dynamicLimitKey
                    ], [
                        tokens,
                        now,
                        windowSize,
                        incrementBy
                    ]);
                    const success = remainingTokens >= 0;
                    const reset = (currentWindow + 1) * windowSize;
                    if (ctx.cache) {
                        if (!success) {
                            ctx.cache.blockUntil(identifier, reset);
                        } else if (incrementBy < 0) {
                            ctx.cache.pop(identifier);
                        }
                    }
                    return {
                        success,
                        limit: effectiveLimit,
                        remaining: Math.max(0, remainingTokens),
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [remaining, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.slidingWindow.getRemaining, [
                        currentKey,
                        previousKey,
                        dynamicLimitKey
                    ], [
                        tokens,
                        now,
                        windowSize
                    ]);
                    return {
                        remaining: Math.max(0, remaining),
                        reset: (currentWindow + 1) * windowSize,
                        limit: effectiveLimit
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * You have a bucket filled with `{maxTokens}` tokens that refills constantly
   * at `{refillRate}` per `{interval}`.
   * Every request will remove one token from the bucket and if there is no
   * token to take, the request is rejected.
   *
   * **Pro:**
   *
   * - Bursts of requests are smoothed out and you can process them at a constant
   * rate.
   * - Allows to set a higher initial burst limit by setting `maxTokens` higher
   * than `refillRate`
   */ static tokenBucket(refillRate, interval, maxTokens) {
        const intervalDuration = ms(interval);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const now = Date.now();
                    const incrementBy = rate ?? 1;
                    if (ctx.cache && incrementBy > 0) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: maxTokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [remaining, reset, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.tokenBucket.limit, [
                        identifier,
                        dynamicLimitKey
                    ], [
                        maxTokens,
                        intervalDuration,
                        refillRate,
                        now,
                        incrementBy
                    ]);
                    const success = remaining >= 0;
                    if (ctx.cache) {
                        if (!success) {
                            ctx.cache.blockUntil(identifier, reset);
                        } else if (incrementBy < 0) {
                            ctx.cache.pop(identifier);
                        }
                    }
                    return {
                        success,
                        limit: effectiveLimit,
                        remaining: Math.max(0, remaining),
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const dynamicLimitKey = ctx.dynamicLimits ? `${ctx.prefix}${DYNAMIC_LIMIT_KEY_SUFFIX}` : "";
                    const [remainingTokens, refilledAt, effectiveLimit] = await safeEval(ctx, SCRIPTS.singleRegion.tokenBucket.getRemaining, [
                        identifier,
                        dynamicLimitKey
                    ], [
                        maxTokens
                    ]);
                    const freshRefillAt = Date.now() + intervalDuration;
                    const identifierRefillsAt = refilledAt + intervalDuration;
                    return {
                        remaining: Math.max(0, remainingTokens),
                        reset: refilledAt === tokenBucketIdentifierNotFound ? freshRefillAt : identifierRefillsAt,
                        limit: effectiveLimit
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = identifier;
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * cachedFixedWindow first uses the local cache to decide if a request may pass and then updates
   * it asynchronously.
   * This is experimental and not yet recommended for production use.
   *
   * @experimental
   *
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static cachedFixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    if (ctx.dynamicLimits) {
                        console.warn("Warning: Dynamic limits are not yet supported for cachedFixedWindow algorithm. The dynamicLimits option will be ignored.");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const reset = (bucket + 1) * windowDuration;
                    const incrementBy = rate ?? 1;
                    const hit = typeof ctx.cache.get(key) === "number";
                    if (hit) {
                        const cachedTokensAfterUpdate = ctx.cache.incr(key, incrementBy);
                        const success = cachedTokensAfterUpdate < tokens;
                        const pending = success ? safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.limit, [
                            key
                        ], [
                            windowDuration,
                            incrementBy
                        ]) : Promise.resolve();
                        return {
                            success,
                            limit: tokens,
                            remaining: tokens - cachedTokensAfterUpdate,
                            reset,
                            pending
                        };
                    }
                    const usedTokensAfterUpdate = await safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.limit, [
                        key
                    ], [
                        windowDuration,
                        incrementBy
                    ]);
                    ctx.cache.set(key, usedTokensAfterUpdate);
                    const remaining = tokens - usedTokensAfterUpdate;
                    return {
                        success: remaining >= 0,
                        limit: tokens,
                        remaining,
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const hit = typeof ctx.cache.get(key) === "number";
                    if (hit) {
                        const cachedUsedTokens = ctx.cache.get(key) ?? 0;
                        return {
                            remaining: Math.max(0, tokens - cachedUsedTokens),
                            reset: (bucket + 1) * windowDuration,
                            limit: tokens
                        };
                    }
                    const usedTokens = await safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.getRemaining, [
                        key
                    ], [
                        null
                    ]);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (bucket + 1) * windowDuration,
                        limit: tokens
                    };
                },
                async resetTokens (ctx, identifier) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    ctx.cache.pop(key);
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    Analytics,
    IpDenyList,
    MultiRegionRatelimit,
    Ratelimit
});
}),
"[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/node_modules/iceberg-js/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IcebergError",
    ()=>IcebergError,
    "IcebergRestCatalog",
    ()=>IcebergRestCatalog,
    "getCurrentSchema",
    ()=>getCurrentSchema,
    "isDecimalType",
    ()=>isDecimalType,
    "isFixedType",
    ()=>isFixedType,
    "parseDecimalType",
    ()=>parseDecimalType,
    "parseFixedType",
    ()=>parseFixedType,
    "typesEqual",
    ()=>typesEqual
]);
// src/errors/IcebergError.ts
var IcebergError = class extends Error {
    constructor(message, opts){
        super(message);
        this.name = "IcebergError";
        this.status = opts.status;
        this.icebergType = opts.icebergType;
        this.icebergCode = opts.icebergCode;
        this.details = opts.details;
        this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
            500,
            502,
            504
        ].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
    }
    /**
   * Returns true if the error is a 404 Not Found error.
   */ isNotFound() {
        return this.status === 404;
    }
    /**
   * Returns true if the error is a 409 Conflict error.
   */ isConflict() {
        return this.status === 409;
    }
    /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */ isAuthenticationTimeout() {
        return this.status === 419;
    }
};
// src/utils/url.ts
function buildUrl(baseUrl, path, query) {
    const url = new URL(path, baseUrl);
    if (query) {
        for (const [key, value] of Object.entries(query)){
            if (value !== void 0) {
                url.searchParams.set(key, value);
            }
        }
    }
    return url.toString();
}
// src/http/createFetchClient.ts
async function buildAuthHeaders(auth) {
    if (!auth || auth.type === "none") {
        return {};
    }
    if (auth.type === "bearer") {
        return {
            Authorization: `Bearer ${auth.token}`
        };
    }
    if (auth.type === "header") {
        return {
            [auth.name]: auth.value
        };
    }
    if (auth.type === "custom") {
        return await auth.getHeaders();
    }
    return {};
}
function createFetchClient(options) {
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    return {
        async request ({ method, path, query, body, headers }) {
            const url = buildUrl(options.baseUrl, path, query);
            const authHeaders = await buildAuthHeaders(options.auth);
            const res = await fetchFn(url, {
                method,
                headers: {
                    ...body ? {
                        "Content-Type": "application/json"
                    } : {},
                    ...authHeaders,
                    ...headers
                },
                body: body ? JSON.stringify(body) : void 0
            });
            const text = await res.text();
            const isJson = (res.headers.get("content-type") || "").includes("application/json");
            const data = isJson && text ? JSON.parse(text) : text;
            if (!res.ok) {
                const errBody = isJson ? data : void 0;
                const errorDetail = errBody?.error;
                throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
                    status: res.status,
                    icebergType: errorDetail?.type,
                    icebergCode: errorDetail?.code,
                    details: errBody
                });
            }
            return {
                status: res.status,
                headers: res.headers,
                data
            };
        }
    };
}
// src/catalog/namespaces.ts
function namespaceToPath(namespace) {
    return namespace.join("");
}
var NamespaceOperations = class {
    constructor(client, prefix = ""){
        this.client = client;
        this.prefix = prefix;
    }
    async listNamespaces(parent) {
        const query = parent ? {
            parent: namespaceToPath(parent.namespace)
        } : void 0;
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces`,
            query
        });
        return response.data.namespaces.map((ns)=>({
                namespace: ns
            }));
    }
    async createNamespace(id, metadata) {
        const request = {
            namespace: id.namespace,
            properties: metadata?.properties
        };
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces`,
            body: request
        });
        return response.data;
    }
    async dropNamespace(id) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
    }
    async loadNamespaceMetadata(id) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
        return {
            properties: response.data.properties
        };
    }
    async namespaceExists(id) {
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createNamespaceIfNotExists(id, metadata) {
        try {
            return await this.createNamespace(id, metadata);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return;
            }
            throw error;
        }
    }
};
// src/catalog/tables.ts
function namespaceToPath2(namespace) {
    return namespace.join("");
}
var TableOperations = class {
    constructor(client, prefix = "", accessDelegation){
        this.client = client;
        this.prefix = prefix;
        this.accessDelegation = accessDelegation;
    }
    async listTables(namespace) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
        });
        return response.data.identifiers;
    }
    async createTable(namespace, request) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
            body: request,
            headers
        });
        return response.data.metadata;
    }
    async updateTable(id, request) {
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            body: request
        });
        return {
            "metadata-location": response.data["metadata-location"],
            metadata: response.data.metadata
        };
    }
    async dropTable(id, options) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            query: {
                purgeRequested: String(options?.purge ?? false)
            }
        });
    }
    async loadTable(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            headers
        });
        return response.data.metadata;
    }
    async tableExists(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
                headers
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createTableIfNotExists(namespace, request) {
        try {
            return await this.createTable(namespace, request);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return await this.loadTable({
                    namespace: namespace.namespace,
                    name: request.name
                });
            }
            throw error;
        }
    }
};
// src/catalog/IcebergRestCatalog.ts
var IcebergRestCatalog = class {
    /**
   * Creates a new Iceberg REST Catalog client.
   *
   * @param options - Configuration options for the catalog client
   */ constructor(options){
        let prefix = "v1";
        if (options.catalogName) {
            prefix += `/${options.catalogName}`;
        }
        const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
        this.client = createFetchClient({
            baseUrl,
            auth: options.auth,
            fetchImpl: options.fetch
        });
        this.accessDelegation = options.accessDelegation?.join(",");
        this.namespaceOps = new NamespaceOperations(this.client, prefix);
        this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
    }
    /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */ async listNamespaces(parent) {
        return this.namespaceOps.listNamespaces(parent);
    }
    /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */ async createNamespace(id, metadata) {
        return this.namespaceOps.createNamespace(id, metadata);
    }
    /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */ async dropNamespace(id) {
        await this.namespaceOps.dropNamespace(id);
    }
    /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */ async loadNamespaceMetadata(id) {
        return this.namespaceOps.loadNamespaceMetadata(id);
    }
    /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */ async listTables(namespace) {
        return this.tableOps.listTables(namespace);
    }
    /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */ async createTable(namespace, request) {
        return this.tableOps.createTable(namespace, request);
    }
    /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */ async updateTable(id, request) {
        return this.tableOps.updateTable(id, request);
    }
    /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */ async dropTable(id, options) {
        await this.tableOps.dropTable(id, options);
    }
    /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */ async loadTable(id) {
        return this.tableOps.loadTable(id);
    }
    /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */ async namespaceExists(id) {
        return this.namespaceOps.namespaceExists(id);
    }
    /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */ async tableExists(id) {
        return this.tableOps.tableExists(id);
    }
    /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */ async createNamespaceIfNotExists(id, metadata) {
        return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
    }
    /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */ async createTableIfNotExists(namespace, request) {
        return this.tableOps.createTableIfNotExists(namespace, request);
    }
};
// src/catalog/types.ts
var DECIMAL_REGEX = /^decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/;
var FIXED_REGEX = /^fixed\s*\[\s*(\d+)\s*\]$/;
function parseDecimalType(type) {
    const match = type.match(DECIMAL_REGEX);
    if (!match) return null;
    return {
        precision: parseInt(match[1], 10),
        scale: parseInt(match[2], 10)
    };
}
function parseFixedType(type) {
    const match = type.match(FIXED_REGEX);
    if (!match) return null;
    return {
        length: parseInt(match[1], 10)
    };
}
function isDecimalType(type) {
    return DECIMAL_REGEX.test(type);
}
function isFixedType(type) {
    return FIXED_REGEX.test(type);
}
function typesEqual(a, b) {
    const decimalA = parseDecimalType(a);
    const decimalB = parseDecimalType(b);
    if (decimalA && decimalB) {
        return decimalA.precision === decimalB.precision && decimalA.scale === decimalB.scale;
    }
    const fixedA = parseFixedType(a);
    const fixedB = parseFixedType(b);
    if (fixedA && fixedB) {
        return fixedA.length === fixedB.length;
    }
    return a === b;
}
function getCurrentSchema(metadata) {
    return metadata.schemas.find((s)=>s["schema-id"] === metadata["current-schema-id"]);
}
;
}),
"[project]/node_modules/nextjs-toploader/dist/index.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/nextjs-toploader/dist/index.js"));
}),
"[project]/node_modules/nextjs-toploader/dist/index.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/node_modules/nextjs-toploader/dist/index.js <module evaluation>"));
}),
"[project]/node_modules/nextjs-toploader/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nextjs$2d$toploader$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/nextjs-toploader/dist/index.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nextjs$2d$toploader$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/nextjs-toploader/dist/index.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nextjs$2d$toploader$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/postgres-array/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const BACKSLASH = '\\';
const DQUOT = '"';
const LBRACE = '{';
const RBRACE = '}';
const LBRACKET = '[';
const EQUALS = '=';
const COMMA = ',';
/** When the raw value is this, it means a literal `null` */ const NULL_STRING = 'NULL';
/**
 * Parses an array according to
 * https://www.postgresql.org/docs/17/arrays.html#ARRAYS-IO
 *
 * Trusts the data (mostly), so only hook up to trusted Postgres servers.
 */ function makeParseArrayWithTransform(transform) {
    const haveTransform = transform != null;
    return function parseArray(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
            return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
            throw new Error('Invalid array text - must end with }');
        }
        // If starts with `[`, it is specifying the index boundas. Skip past first `=`.
        let position = 0;
        if (str[position] === LBRACKET) {
            position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
            throw new Error('Invalid array text - must start with {');
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = '';
        let expectValue = true;
        for(; position < rbraceIndex; ++position){
            let char = str[position];
            // > The array output routine will put double quotes around element values if
            // > they are empty strings, contain curly braces, delimiter characters, double
            // > quotes, backslashes, or white space, or match the word NULL. Double quotes
            // > and backslashes embedded in element values will be backslash-escaped.
            if (char === DQUOT) {
                // It's escaped
                currentStringStart = ++position;
                let dquot = str.indexOf(DQUOT, currentStringStart);
                let backSlash = str.indexOf(BACKSLASH, currentStringStart);
                while(backSlash !== -1 && backSlash < dquot){
                    position = backSlash;
                    const part = str.slice(currentStringStart, position);
                    currentString += part;
                    currentStringStart = ++position;
                    if (dquot === position++) {
                        // This was an escaped doublequote; find the next one!
                        dquot = str.indexOf(DQUOT, position);
                    }
                    // Either way, find the next backslash
                    backSlash = str.indexOf(BACKSLASH, position);
                }
                position = dquot;
                const part = str.slice(currentStringStart, position);
                currentString += part;
                current.push(haveTransform ? transform(currentString) : currentString);
                currentString = '';
                expectValue = false;
            } else if (char === LBRACE) {
                const newArray = [];
                current.push(newArray);
                stack.push(current);
                current = newArray;
                currentStringStart = position + 1;
                expectValue = true;
            } else if (char === COMMA) {
                expectValue = true;
            } else if (char === RBRACE) {
                expectValue = false;
                const arr = stack.pop();
                if (arr === undefined) {
                    throw new Error("Invalid array text - too many '}'");
                }
                current = arr;
            } else if (expectValue) {
                currentStringStart = position;
                while((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex){
                    ++position;
                }
                const part = str.slice(currentStringStart, position--);
                current.push(part === NULL_STRING ? null : haveTransform ? transform(part) : part);
                expectValue = false;
            } else {
                throw new Error('Was expecting delimeter');
            }
        }
        return output;
    };
}
const parseArray = makeParseArrayWithTransform();
exports.parse = (source, transform)=>transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray(source);
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/node_modules/uncrypto/dist/crypto.node.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_crypto,
    "getRandomValues",
    ()=>getRandomValues,
    "randomUUID",
    ()=>randomUUID,
    "subtle",
    ()=>subtle
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const subtle = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].webcrypto?.subtle || {};
const randomUUID = ()=>{
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID();
};
const getRandomValues = (array)=>{
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].webcrypto.getRandomValues(array);
};
const _crypto = {
    randomUUID,
    getRandomValues,
    subtle
};
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1a8-sbq._.js.map