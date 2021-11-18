import {FloraExceptionI} from "./Exception";
import {GetFloraDocument, GetFloraDocumentRef, GetStack} from "./Flora";
import { Let, Merge, query, ToObject } from "faunadb";
const {
    Do,
    Update,
    Append,
    Select, Var
} = query;

/**
 * 
 */
 export const AddExceptionToStack = (
    Exception : FloraExceptionI
)=>{

    return Do(
        Update(
            GetFloraDocumentRef(),
            {
                data : {
                    stack : Append([Exception], GetStack())
                }
            }
        ),
        GetStack()
    )

}

/**
 * Raises a Flora Exception then returns it.
 * @param floraException
 * @returns 
 */
export const _Raise = (floraException : FloraExceptionI) : FloraExceptionI=>{
    return Do(
        AddExceptionToStack(floraException),
        floraException
    ) as FloraExceptionI
}

const raise = "raise";
export const Raise = (floraException : FloraExceptionI) : FloraExceptionI=>{
    return Let(
        {
            [raise] : _Raise(floraException)
        },
        Var(raise)
    ) as FloraExceptionI
}

/**
 * Reraises an Exception if one is encountered.
 * @param prevException 
 * @param newException 
 * @returns 
 */
export const Reraise = (prevExceptions : FloraExceptionI[], newException : FloraExceptionI) : FloraExceptionI=>{

    return Let(
        {
            [raise] : Merge(
                    newException,
                    ToObject([
                        ["at", prevExceptions]
                    ])
                )
        },
        Do(
            AddExceptionToStack(Var(raise) as FloraExceptionI),
            Var(raise)
        )
    ) as FloraExceptionI

}