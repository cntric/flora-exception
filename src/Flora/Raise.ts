import {FloraErrorI} from "./Error";
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
 export const AddErrorToStack = (
    error : FloraErrorI
)=>{

    return Do(
        Update(
            GetFloraDocumentRef(),
            {
                data : {
                    stack : Append([error], GetStack())
                }
            }
        ),
        GetStack()
    )

}

/**
 * Raises a Flora Error then returns it.
 * @param floraError
 * @returns 
 */
export const _Raise = (floraError : FloraErrorI) : FloraErrorI=>{
    return Do(
        AddErrorToStack(floraError),
        floraError
    ) as FloraErrorI
}

const raise = "raise";
export const Raise = (floraError : FloraErrorI) : FloraErrorI=>{
    return Let(
        {
            [raise] : _Raise(floraError)
        },
        Var(raise)
    ) as FloraErrorI
}

/**
 * Reraises an error if one is encountered.
 * @param prevError 
 * @param newError 
 * @returns 
 */
export const Reraise = (prevErrors : FloraErrorI[], newError : FloraErrorI) : FloraErrorI=>{

    return Let(
        {
            [raise] : Merge(
                    newError,
                    ToObject([
                        ["at", prevErrors]
                    ])
                )
        },
        Do(
            AddErrorToStack(Var(raise) as FloraErrorI),
            Var(raise)
        )
    ) as FloraErrorI

}