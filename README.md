# flora-exception [<img src="/favicon.svg" height="24px"/>](https://www.concentric.io/)
```typescript
const FloraAdd = mFx(
    [$Number, $Number], $Number,
    (a, b)=>Add(a, b) as number
)

// OR

const FloraAdd = (a : number, b : number) : number =>{
    return Fx(
        [ [a, $Number], [b, $Number] ], $Number,
        (a, b)=> Add(a, b) as number
    )
}
```
`flora-exception` is an exception system for [Fauna Query Language](https://docs.fauna.com/fauna/current/api/fql/) built on top of the [faunadb-js](https://github.com/fauna/faunadb-js) driver. It provides methods for:
- exception raising, 
- typing,
- and exception catching.


## Quick start

### Install
`yarn add flora-exception`

### Import
```typescript
import {Flora, mFx, $Number} from "flora-exception";
```

### Compose
```typescript
const FloraAdd = mFx(
    [$Number, $Number], $Number,
    (a, b)=>Add(a, b) as number
)
```

### Query
```typescript
const result = await client.query(Flora(
    FloraAdd(2, 2)
));
```

## `Flora()`
Wrap your query logic with `Flora()`:
- Returns value of query, unless a `FloraException` was raised.
```typescript
const result = await db.client.query(Flora(
  Add(2, 2)
));
expect(result).toBe(4);
```

## `Raise()`
`Raise()` a `FloraException`:
- The exception along with a stack trace will be returned.
- In the event of an exception, even without `Fx` consumers, the `FloraExceptionStack` will be returned so long as the query is not `Aborted`.
```typescript
const result = await db.client.query(Flora(
    If(
      IsString(2),
      2,
      Raise(FloraException())
    )
));
expect(isFloraException(result)).toBe(true);
```

## `Fx()`
Use `Fx()` to execute logic with type and exception safety:
- `Fx` will handle mismatched arg or return types. 
- In the event that an arg or a return is a `FloraException` it will be reraised.
```typescript
/**
 * Adds two numbers.
 * @param a 
 * @param b 
 * @returns 
 */
const FloraAdd = (a : number, b : number) : number=>{
      return Fx(
          [ [a, $Number], [b, $Number] ], // args with type predicates
          $Number, // return type predicate
          (a, b)=>{ // logic
              return Add(a, b) as number
          }
      ) as number
  }

  const result = await db.client.query(Flora(
      FloraAdd(2, 2)
  ));

 expect(result).toBe(4);
```

## `mFx()`
Use `mFx()` to create type and exception safe queries with an abbreviated syntax:
- `mFx` produces a function that will call `Fx` to compose your query. 
- `mFx`infers TypeScript types from your type predicates.
```typescript
/**
 * Adds two numbers.
 * @param a 
 * @param b 
 * @returns 
 */
const FloraAdd = mFx(
    [$Number, $Number], // arg type predicates
    $Number,  // return type predicate
    (a, b)=>Add(a, b) as number
)

const result = await db.client.query(Flora(
     FloraAdd(2, 2)
));

expect(result).toBe(4);
```

## Types
Types are implemented as predicates which are evaluated against a query expression. `Fx` provides the most robust method of handling types and type exceptions.

Core types are denoted with `$`. We recommend composed types follow this standard.
```typescript
const $Numbers = $Array($Number);
```

Currently, the following primitive types are available:
- `$Number`
- `$Int`
- `$UInt8`
- `$Double`
- `$String`
- `$Boolean`

Several container types have also been implemented:
- `$Array`
- `$Object`
- `$Tuple`

Container types can be used by wrapping another type predicate:
```typescript
const $Numbers = $Array($Number);
```

Members of `$Object` and `$Tuple` can be made optional:
```typescript
const $Player = $Object({
  name : $String,
  wins : $Optional($Number)
});
```

The `$Or` type predicate can be used to support an arbitrary number of type alternatives. While the `$Any` type predicate accepts all types.
```typescript
const $StringsAndNumbers = $Array($Or($String, $Number));  
```

## How it works
- `Flora` creates or uses an exisiting `FloraCollection` to store `FloraExceptions` raised during a query.
- At the start of a query, `Flora` creates a document on which the `FloraExcpetionStack` will be stored.
- During the query, all `Raises` are pushed to the stack.
- Special consumers `Fx` and `Yield`, will handle `FloraExceptions` in the stack without `Aborting` the query.
- At the end of the query, a `StackError` will be compiled from the `ExceptionStack` reporting on the earliest source of error as well as all errant branches.
- In `StrictFlora`, an errant query will also be aborted to prevent any changes made from being applied.
