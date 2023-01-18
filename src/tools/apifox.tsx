// To parse this data:
//
//   import { AFConvert, QuestionDetailDTO } from "./tools/apifox";
//
//   const questionDetailDTO = AFConvert.toQuestionDetailDTO(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * QuestionDetailDTO，提问详细信息
 */
export interface QuestionDetailDTO {
    /**
     * 代码
     */
    code: string;
    /**
     * 提问创建时间
     */
    createTime?: Date;
    /**
     * 描述
     */
    description: string;
    /**
     * ID
     */
    id?: number;
    /**
     * 语言
     */
    language: Language;
    /**
     * 问题类型
     */
    problemType: ProblemType;
    /**
     * 悬赏，不设置为null
     */
    reward?: number | null;
    /**
     * 是否已解决
     */
    solved?: boolean;
    /**
     * 标题
     */
    title: string;
    user?: UserBriefInfoDTO;
}

/**
 * 语言
 */
export enum Language {
    C = "C",
    Cpp = "CPP",
    Java = "JAVA",
    Python = "PYTHON",
}

/**
 * 问题类型
 */
export enum ProblemType {
    LocationKnown = "LOCATION_KNOWN",
    LocationUnknown = "LOCATION_UNKNOWN",
    Other = "OTHER",
}

/**
 * UserBriefInfoDTO，用户简单信息
 */
export interface UserBriefInfoDTO {
    /**
     * ID
     */
    id?: number;
    /**
     * 真实姓名
     */
    realName?: string;
    /**
     * 角色
     */
    role?: Role;
    /**
     * 用户名
     */
    username?: string;
}

/**
 * 角色
 */
export enum Role {
    Admin = "ADMIN",
    Teacher = "TEACHER",
    User = "USER",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class AFConvert {
    public static toQuestionDetailDTO(json: string): QuestionDetailDTO {
        return cast(JSON.parse(json), r("QuestionDetailDTO"));
    }

    public static questionDetailDTOToJson(value: QuestionDetailDTO): string {
        return JSON.stringify(uncast(value, r("QuestionDetailDTO")), null, 2);
    }

    public static upperToCapital(upper: string): string {
        var upArr = upper.split("");
        var capArr: Array<String> = [];
        for (var _i = 0; _i < upArr.length; _i++) {
            if (_i == 0 || upArr[_i - 1] == "_") capArr.push(upArr[_i].toUpperCase());
            else capArr.push(upArr[_i].toLowerCase());
        }
        return capArr.join("");
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = {key: p.js, typ: p.typ});
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = {key: p.json, typ: p.typ});
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {
            }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return {arrayItems: typ};
}

function u(...typs: any[]) {
    return {unionMembers: typs};
}

function o(props: any[], additional: any) {
    return {props, additional};
}

function m(additional: any) {
    return {props: [], additional};
}

function r(name: string) {
    return {ref: name};
}

const typeMap: any = {
    "QuestionDetailDTO": o([
        {json: "code", js: "code", typ: ""},
        {json: "createTime", js: "createTime", typ: u(undefined, Date)},
        {json: "description", js: "description", typ: ""},
        {json: "id", js: "id", typ: u(undefined, 0)},
        {json: "language", js: "language", typ: r("Language")},
        {json: "problemType", js: "problemType", typ: r("ProblemType")},
        {json: "reward", js: "reward", typ: u(undefined, u(0, null))},
        {json: "solved", js: "solved", typ: u(undefined, true)},
        {json: "title", js: "title", typ: ""},
        {json: "user", js: "user", typ: u(undefined, r("UserBriefInfoDTO"))},
    ], "any"),
    "UserBriefInfoDTO": o([
        {json: "id", js: "id", typ: u(undefined, 0)},
        {json: "realName", js: "realName", typ: u(undefined, "")},
        {json: "role", js: "role", typ: u(undefined, r("Role"))},
        {json: "username", js: "username", typ: u(undefined, "")},
    ], "any"),
    "Language": [
        "C",
        "CPP",
        "JAVA",
        "PYTHON",
    ],
    "ProblemType": [
        "LOCATION_KNOWN",
        "LOCATION_UNKNOWN",
        "OTHER",
    ],
    "Role": [
        "ADMIN",
        "TEACHER",
        "USER",
    ],
};
