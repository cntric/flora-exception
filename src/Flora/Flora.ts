import { 
    ContainsPath,
    Create, 
    CreateIndex, 

    CreateRole, 

    Do,
    Exists, 
    Get, 
    Index, 
    IsNull, 
    Not, 
    query,
    Tokens,
    Update,
    values 
} from "faunadb";
import { Yield } from "./Yield";
import {generate} from "shortid";
import {
    floraDocumentKey,
    floraKey, generateFloraKey
} from "./Key";
import {
    Blight,
    BlightI,
    GetBlightName
} from "./Blight";
const {
    Let,
    If,
    IsObject,
    ToObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Collection,
    Database,
    Delete,
    Ref,
    CreateCollection,
    Login
} = query;


export interface FloraI<T> {
    (expr : T) : T
}

const templateDoc = "templateDoc";
const identifyStep = "identify";
const floraDoc = "floraDoc";
export const usedFloraIdentity = "usedFloraIdentity";
export const withIdentity = "withIdentity";
export const blight = "blight";

const {
    And,
    CurrentIdentity,
    Query,
    Lambda
} = query;

/**
 * 
 * @returns 
 */
 export const IsIdentityDefined = ()=>{
    return Exists(Tokens())
}

export const _DefaultCheckPermission = (
    floraDocument : FloraDocumentT,
) : boolean=>{

    return Equals(Select(["data", withIdentity], floraDocument), CurrentIdentity()) as boolean; 

}

export const DefaultCheckPermission = (
    floraDocument : FloraDocumentT
) : boolean =>{
    return If(
        And(
            ContainsPath(["data", withIdentity], floraDocument),
            IsIdentityDefined()
        ),
        If(
            Not(Equals(false, Select(["data", withIdentity], floraDocument))),
            _DefaultCheckPermission(floraDocument),
            true
        ),
        false
    ) as boolean
}

export interface PermissionsI {
    create : query.ExprArg,
    read : query.ExprArg
    write : query.ExprArg
}

export const DefaultPermissions : PermissionsI = {
    create : true,
    read : Query(
        Lambda(
            floraDoc,
            DefaultCheckPermission(Var(floraDoc) as FloraDocumentT)
        )
    ),
    write : Query(
        Lambda(
            floraDoc,
            DefaultCheckPermission(Var(floraDoc) as FloraDocumentT)
        )
    )
}

/**
 * 
 * @param name 
 * @returns 
 */
export const FloraCollection = (name : string = floraKey)=>{
    return If(
        Exists(Collection(name)),
        Collection(name),
        CreateCollection(
            {
                name : name,
               //  permissions : DefaultPermissions
            }
        )
    )
}


export interface FloraEnvironmentI {
    collection : string,
}

const collectionKey = "collection";


/**
 * 
 */
 export const UpdateBlightOnFloraDocument = (
    blight : BlightI
)=>{

    return Update(
        Select("ref", Var(floraDocumentKey)),
        {
            data : {
                blights : Merge(
                    Select(["data", blights], Var(floraDocumentKey)),
                    ToObject([
                        [
                            GetBlightName(blight),
                            blight
                        ]
                    ])
                )
            }
        }
    )

}

const blights = "blights";
export type FloraDocumentT = values.Document<{
    [usedFloraIdentity] : boolean,
    [withIdentity] : values.Ref | false,
    [blights] : {
        [key : string] : BlightI
    }
}>

/**
 * Causes a FloraDocument to use itself as an identity.
 * @param floraDocument 
 */
export const SelfIdentifyFloraDocument = (floraDocument : FloraDocumentT)=>{

    return Update(
        Select("ref", floraDocument),
        {
            data : {
                [withIdentity] : Select("ref", floraDocument),
                [usedFloraIdentity] : true,
                [blights] : {}
            }
        }
    )

}


/**
 * Assigns an external identity to a floraDocument.
 * @param floraDocument 
 * @returns 
 */
export const ExternalIdentifyFloraDocument = (floraDocument : FloraDocumentT)=>{
    return Update(
        Select("ref", floraDocument),
        {
            data : {
                [withIdentity] : CurrentIdentity(),
                [usedFloraIdentity] : true
            }
        }
    )
}

/**
 * 
 * @param name 
 */
export const FloraDocument = (
    password : string,
    collectionName : string = floraKey
)=>{

    return Let(
        {
            [templateDoc] : Create(
                FloraCollection(collectionName),
                {
                    data : {
                        [usedFloraIdentity] : false,
                        [withIdentity] : false
                    },
                    credentials : {
                        password : password
                    }
                }
            ),
            [identifyStep] : If(
                IsIdentityDefined(),
                ExternalIdentifyFloraDocument(Var(templateDoc) as FloraDocumentT),
                SelfIdentifyFloraDocument(Var(templateDoc) as FloraDocumentT)
            ),
            [floraDoc] : Get(Select("ref", Var(templateDoc)))
        },
        Var(identifyStep)
    )

}



/**
 * 
 */
export const LoginFloraDocument = (FloraDocument : FloraDocumentT, password : string)=>{

    return Do(
        If(
            Equals(true, Select(["data", usedFloraIdentity], FloraDocument)),
            Login(Select("ref", FloraDocument), password),
            false
        ),
        Get(Select("ref", FloraDocument))
    )

}

const login = "login";
export const ReadyFloraDocument = (password : string)=>{

    return Let( 
        {
            [floraDoc] : FloraDocument(password),
            // [login] : LoginFloraDocument(Var(floraDoc) as FloraDocumentT, password)
        },
        Get(Select("ref", Var(floraDoc)))
    )

}

const fruit = "fruit";
/**
 * Runs an expression in a flora environment.
 * @param expr 
 * @returns 
 */
export const Flora = <T>(expr :T) :  T =>{

    const password = generateFloraKey("password");

    return Let(
        {
            [floraDocumentKey] : ReadyFloraDocument(password),
            [fruit] : expr,
        },
        Var(fruit)
    ) as T

}
