import {FloraExceptionI} from "./Exception";
import {GetFloraDocument, GetFloraDocumentRef, GetStack} from "./Flora";
import {query} from "faunadb";
const {
    Let, 
    Merge, 
    ToObject,
    Do,
    Update,
    Append,
    Select, 
    Var
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
    ) as unknown as FloraExceptionI
}

const raise = "raise";
export const Raise = (floraException : FloraExceptionI) : FloraExceptionI=>{
    return Let(
        {
            [raise] : _Raise(floraException)
        },
        Var(raise)
    ) as unknown as FloraExceptionI
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
            AddExceptionToStack(Var(raise) as unknown as FloraExceptionI),
            Var(raise)
        )
    ) as unknown as FloraExceptionI

}