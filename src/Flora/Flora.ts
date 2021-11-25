import { 
    ContainsPath,
    Create, 
    Do,
    Exists, 
    Get, 
    GT, 
    Length, 
    Not, 
    Tokens,
    Update,
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
    Login,
    Or,
    Count,
    And,
    CurrentIdentity,
    Query,
    Lambda,
    ExprArg,
} from "faunadb/query";
import { values } from "faunadb";
import { FloraExceptionI, IsException } from "./Exception";
import { ExceptionStackT } from "./ExceptionStack";
import {
    floraDocumentKey,
    floraCollectionKey, generateFloraKey
} from "./Key";



const templateDoc = "templateDoc";
const identifyStep = "identify";
const floraDoc = "floraDoc";
export const usedFloraIdentity = "usedFloraIdentity";
export const withIdentity = "withIdentity";
export const blight = "blight";


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

    return Equals(Select(["data", withIdentity], floraDocument), CurrentIdentity()) as unknown as boolean; 

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
    ) as unknown as boolean
}

export interface PermissionsI {
    create : ExprArg,
    read : ExprArg
    write : ExprArg
}

export const DefaultPermissions : PermissionsI = {
    create : true,
    read : Query(
        Lambda(
            floraDoc,
            DefaultCheckPermission(Var(floraDoc) as unknown as FloraDocumentT)
        )
    ),
    write : Query(
        Lambda(
            floraDoc,
            DefaultCheckPermission(Var(floraDoc) as unknown as FloraDocumentT)
        )
    )
}

/**
 * 
 * @param name 
 * @returns 
 */
export const FloraCollection = (name : string = floraCollectionKey)=>{
    return Collection(name);
        
}

export const stack = "stack";
export const stackPath = ["data", stack];
export type FloraDocumentT = values.Document<{
    [usedFloraIdentity] : boolean,
    [withIdentity] : values.Ref | false,
    [stack] : ExceptionStackT
}>


export const GetFloraDocumentRef = ()=>{
    return Select("ref", Var(floraDocumentKey));
}

/**
 * 
 * @returns 
 */
export const GetFloraDocument = ()=>{
    return Get(GetFloraDocumentRef())
}


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
                [stack] : []
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
                [usedFloraIdentity] : true,
                [stack] : []
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
    collectionName : string = floraCollectionKey
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
                ExternalIdentifyFloraDocument(Var(templateDoc) as unknown as FloraDocumentT),
                SelfIdentifyFloraDocument(Var(templateDoc) as unknown as  FloraDocumentT)
            ),
            [floraDoc] : Get(Select("ref", Var(templateDoc)))
        },
        Var(identifyStep)
    )

}

/**
 * Gets the current Exception stack.
 * @returns 
 */
export const GetStack = ()=>{
    return Select(stackPath, GetFloraDocument());
}

export const StackError = (exception : FloraExceptionI) : FloraExceptionI=>{
    return If(
        GT(Count(GetStack()), 0),
        Merge(
            Select(0, GetStack()),
            ToObject(
                [
                    ["stack", GetStack()]
                ]
            )
        ),
        exception
    ) as unknown as FloraExceptionI
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
export const Flora = <T>(expr :T) :  T | FloraExceptionI =>{

    const password = generateFloraKey("password");

    return Let(
        {
            [floraDocumentKey] : ReadyFloraDocument(password),
            [fruit] : expr,
        },
        If(
            Or(
                IsException(Var(fruit)),
                GT(Count(GetStack()), 0)
            ),
            StackError(Var(fruit) as unknown as  FloraExceptionI),
            Var(fruit)
        )
    ) as unknown as  T | FloraExceptionI

}