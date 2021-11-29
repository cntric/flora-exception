import { mFx } from "../Flora/Fx";
import { $Any, $Document, $Ref } from "../FloraTypes";
import { query as q } from "faunadb";
/**
 * Gets the ref from a document.
 */
export const RefOf = mFx([$Document($Any)], $Ref(), (doc) => q.Select("ref", doc));
