
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ReconciliationRun
 * 
 */
export type ReconciliationRun = $Result.DefaultSelection<Prisma.$ReconciliationRunPayload>
/**
 * Model ReconciliationException
 * 
 */
export type ReconciliationException = $Result.DefaultSelection<Prisma.$ReconciliationExceptionPayload>
/**
 * Model OutboxEvent
 * 
 */
export type OutboxEvent = $Result.DefaultSelection<Prisma.$OutboxEventPayload>
/**
 * Model InboxMessage
 * 
 */
export type InboxMessage = $Result.DefaultSelection<Prisma.$InboxMessagePayload>
/**
 * Model IdempotencyRecord
 * 
 */
export type IdempotencyRecord = $Result.DefaultSelection<Prisma.$IdempotencyRecordPayload>
/**
 * Model AuditRecord
 * 
 */
export type AuditRecord = $Result.DefaultSelection<Prisma.$AuditRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ReconciliationRuns
 * const reconciliationRuns = await prisma.reconciliationRun.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ReconciliationRuns
   * const reconciliationRuns = await prisma.reconciliationRun.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.reconciliationRun`: Exposes CRUD operations for the **ReconciliationRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReconciliationRuns
    * const reconciliationRuns = await prisma.reconciliationRun.findMany()
    * ```
    */
  get reconciliationRun(): Prisma.ReconciliationRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reconciliationException`: Exposes CRUD operations for the **ReconciliationException** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReconciliationExceptions
    * const reconciliationExceptions = await prisma.reconciliationException.findMany()
    * ```
    */
  get reconciliationException(): Prisma.ReconciliationExceptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboxEvent`: Exposes CRUD operations for the **OutboxEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboxEvents
    * const outboxEvents = await prisma.outboxEvent.findMany()
    * ```
    */
  get outboxEvent(): Prisma.OutboxEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inboxMessage`: Exposes CRUD operations for the **InboxMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InboxMessages
    * const inboxMessages = await prisma.inboxMessage.findMany()
    * ```
    */
  get inboxMessage(): Prisma.InboxMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.idempotencyRecord`: Exposes CRUD operations for the **IdempotencyRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IdempotencyRecords
    * const idempotencyRecords = await prisma.idempotencyRecord.findMany()
    * ```
    */
  get idempotencyRecord(): Prisma.IdempotencyRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditRecord`: Exposes CRUD operations for the **AuditRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditRecords
    * const auditRecords = await prisma.auditRecord.findMany()
    * ```
    */
  get auditRecord(): Prisma.AuditRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ReconciliationRun: 'ReconciliationRun',
    ReconciliationException: 'ReconciliationException',
    OutboxEvent: 'OutboxEvent',
    InboxMessage: 'InboxMessage',
    IdempotencyRecord: 'IdempotencyRecord',
    AuditRecord: 'AuditRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "reconciliationRun" | "reconciliationException" | "outboxEvent" | "inboxMessage" | "idempotencyRecord" | "auditRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ReconciliationRun: {
        payload: Prisma.$ReconciliationRunPayload<ExtArgs>
        fields: Prisma.ReconciliationRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReconciliationRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReconciliationRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          findFirst: {
            args: Prisma.ReconciliationRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReconciliationRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          findMany: {
            args: Prisma.ReconciliationRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>[]
          }
          create: {
            args: Prisma.ReconciliationRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          createMany: {
            args: Prisma.ReconciliationRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReconciliationRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>[]
          }
          delete: {
            args: Prisma.ReconciliationRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          update: {
            args: Prisma.ReconciliationRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          deleteMany: {
            args: Prisma.ReconciliationRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReconciliationRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReconciliationRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>[]
          }
          upsert: {
            args: Prisma.ReconciliationRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          aggregate: {
            args: Prisma.ReconciliationRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReconciliationRun>
          }
          groupBy: {
            args: Prisma.ReconciliationRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReconciliationRunCountArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationRunCountAggregateOutputType> | number
          }
        }
      }
      ReconciliationException: {
        payload: Prisma.$ReconciliationExceptionPayload<ExtArgs>
        fields: Prisma.ReconciliationExceptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReconciliationExceptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReconciliationExceptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          findFirst: {
            args: Prisma.ReconciliationExceptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReconciliationExceptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          findMany: {
            args: Prisma.ReconciliationExceptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>[]
          }
          create: {
            args: Prisma.ReconciliationExceptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          createMany: {
            args: Prisma.ReconciliationExceptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReconciliationExceptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>[]
          }
          delete: {
            args: Prisma.ReconciliationExceptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          update: {
            args: Prisma.ReconciliationExceptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          deleteMany: {
            args: Prisma.ReconciliationExceptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReconciliationExceptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReconciliationExceptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>[]
          }
          upsert: {
            args: Prisma.ReconciliationExceptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationExceptionPayload>
          }
          aggregate: {
            args: Prisma.ReconciliationExceptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReconciliationException>
          }
          groupBy: {
            args: Prisma.ReconciliationExceptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationExceptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReconciliationExceptionCountArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationExceptionCountAggregateOutputType> | number
          }
        }
      }
      OutboxEvent: {
        payload: Prisma.$OutboxEventPayload<ExtArgs>
        fields: Prisma.OutboxEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboxEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboxEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findFirst: {
            args: Prisma.OutboxEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboxEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          findMany: {
            args: Prisma.OutboxEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          create: {
            args: Prisma.OutboxEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          createMany: {
            args: Prisma.OutboxEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboxEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          delete: {
            args: Prisma.OutboxEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          update: {
            args: Prisma.OutboxEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          deleteMany: {
            args: Prisma.OutboxEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboxEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutboxEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>[]
          }
          upsert: {
            args: Prisma.OutboxEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboxEventPayload>
          }
          aggregate: {
            args: Prisma.OutboxEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboxEvent>
          }
          groupBy: {
            args: Prisma.OutboxEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboxEventCountArgs<ExtArgs>
            result: $Utils.Optional<OutboxEventCountAggregateOutputType> | number
          }
        }
      }
      InboxMessage: {
        payload: Prisma.$InboxMessagePayload<ExtArgs>
        fields: Prisma.InboxMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InboxMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InboxMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          findFirst: {
            args: Prisma.InboxMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InboxMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          findMany: {
            args: Prisma.InboxMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          create: {
            args: Prisma.InboxMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          createMany: {
            args: Prisma.InboxMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InboxMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          delete: {
            args: Prisma.InboxMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          update: {
            args: Prisma.InboxMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          deleteMany: {
            args: Prisma.InboxMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InboxMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InboxMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>[]
          }
          upsert: {
            args: Prisma.InboxMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InboxMessagePayload>
          }
          aggregate: {
            args: Prisma.InboxMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInboxMessage>
          }
          groupBy: {
            args: Prisma.InboxMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<InboxMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.InboxMessageCountArgs<ExtArgs>
            result: $Utils.Optional<InboxMessageCountAggregateOutputType> | number
          }
        }
      }
      IdempotencyRecord: {
        payload: Prisma.$IdempotencyRecordPayload<ExtArgs>
        fields: Prisma.IdempotencyRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IdempotencyRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IdempotencyRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          findFirst: {
            args: Prisma.IdempotencyRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IdempotencyRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          findMany: {
            args: Prisma.IdempotencyRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>[]
          }
          create: {
            args: Prisma.IdempotencyRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          createMany: {
            args: Prisma.IdempotencyRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IdempotencyRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>[]
          }
          delete: {
            args: Prisma.IdempotencyRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          update: {
            args: Prisma.IdempotencyRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          deleteMany: {
            args: Prisma.IdempotencyRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IdempotencyRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IdempotencyRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>[]
          }
          upsert: {
            args: Prisma.IdempotencyRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IdempotencyRecordPayload>
          }
          aggregate: {
            args: Prisma.IdempotencyRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIdempotencyRecord>
          }
          groupBy: {
            args: Prisma.IdempotencyRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<IdempotencyRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.IdempotencyRecordCountArgs<ExtArgs>
            result: $Utils.Optional<IdempotencyRecordCountAggregateOutputType> | number
          }
        }
      }
      AuditRecord: {
        payload: Prisma.$AuditRecordPayload<ExtArgs>
        fields: Prisma.AuditRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          findFirst: {
            args: Prisma.AuditRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          findMany: {
            args: Prisma.AuditRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>[]
          }
          create: {
            args: Prisma.AuditRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          createMany: {
            args: Prisma.AuditRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>[]
          }
          delete: {
            args: Prisma.AuditRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          update: {
            args: Prisma.AuditRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          deleteMany: {
            args: Prisma.AuditRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>[]
          }
          upsert: {
            args: Prisma.AuditRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditRecordPayload>
          }
          aggregate: {
            args: Prisma.AuditRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditRecord>
          }
          groupBy: {
            args: Prisma.AuditRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AuditRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    reconciliationRun?: ReconciliationRunOmit
    reconciliationException?: ReconciliationExceptionOmit
    outboxEvent?: OutboxEventOmit
    inboxMessage?: InboxMessageOmit
    idempotencyRecord?: IdempotencyRecordOmit
    auditRecord?: AuditRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ReconciliationRun
   */

  export type AggregateReconciliationRun = {
    _count: ReconciliationRunCountAggregateOutputType | null
    _avg: ReconciliationRunAvgAggregateOutputType | null
    _sum: ReconciliationRunSumAggregateOutputType | null
    _min: ReconciliationRunMinAggregateOutputType | null
    _max: ReconciliationRunMaxAggregateOutputType | null
  }

  export type ReconciliationRunAvgAggregateOutputType = {
    totalReportedMinor: number | null
    totalEvidenceMinor: number | null
    totalSettledMinor: number | null
    matchedCount: number | null
    unmatchedCount: number | null
  }

  export type ReconciliationRunSumAggregateOutputType = {
    totalReportedMinor: bigint | null
    totalEvidenceMinor: bigint | null
    totalSettledMinor: bigint | null
    matchedCount: number | null
    unmatchedCount: number | null
  }

  export type ReconciliationRunMinAggregateOutputType = {
    id: string | null
    concessionId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    status: string | null
    totalReportedMinor: bigint | null
    totalEvidenceMinor: bigint | null
    totalSettledMinor: bigint | null
    matchedCount: number | null
    unmatchedCount: number | null
    createdAt: Date | null
  }

  export type ReconciliationRunMaxAggregateOutputType = {
    id: string | null
    concessionId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    status: string | null
    totalReportedMinor: bigint | null
    totalEvidenceMinor: bigint | null
    totalSettledMinor: bigint | null
    matchedCount: number | null
    unmatchedCount: number | null
    createdAt: Date | null
  }

  export type ReconciliationRunCountAggregateOutputType = {
    id: number
    concessionId: number
    periodStart: number
    periodEnd: number
    status: number
    totalReportedMinor: number
    totalEvidenceMinor: number
    totalSettledMinor: number
    matchedCount: number
    unmatchedCount: number
    createdAt: number
    _all: number
  }


  export type ReconciliationRunAvgAggregateInputType = {
    totalReportedMinor?: true
    totalEvidenceMinor?: true
    totalSettledMinor?: true
    matchedCount?: true
    unmatchedCount?: true
  }

  export type ReconciliationRunSumAggregateInputType = {
    totalReportedMinor?: true
    totalEvidenceMinor?: true
    totalSettledMinor?: true
    matchedCount?: true
    unmatchedCount?: true
  }

  export type ReconciliationRunMinAggregateInputType = {
    id?: true
    concessionId?: true
    periodStart?: true
    periodEnd?: true
    status?: true
    totalReportedMinor?: true
    totalEvidenceMinor?: true
    totalSettledMinor?: true
    matchedCount?: true
    unmatchedCount?: true
    createdAt?: true
  }

  export type ReconciliationRunMaxAggregateInputType = {
    id?: true
    concessionId?: true
    periodStart?: true
    periodEnd?: true
    status?: true
    totalReportedMinor?: true
    totalEvidenceMinor?: true
    totalSettledMinor?: true
    matchedCount?: true
    unmatchedCount?: true
    createdAt?: true
  }

  export type ReconciliationRunCountAggregateInputType = {
    id?: true
    concessionId?: true
    periodStart?: true
    periodEnd?: true
    status?: true
    totalReportedMinor?: true
    totalEvidenceMinor?: true
    totalSettledMinor?: true
    matchedCount?: true
    unmatchedCount?: true
    createdAt?: true
    _all?: true
  }

  export type ReconciliationRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationRun to aggregate.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReconciliationRuns
    **/
    _count?: true | ReconciliationRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReconciliationRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReconciliationRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReconciliationRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReconciliationRunMaxAggregateInputType
  }

  export type GetReconciliationRunAggregateType<T extends ReconciliationRunAggregateArgs> = {
        [P in keyof T & keyof AggregateReconciliationRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReconciliationRun[P]>
      : GetScalarType<T[P], AggregateReconciliationRun[P]>
  }




  export type ReconciliationRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReconciliationRunWhereInput
    orderBy?: ReconciliationRunOrderByWithAggregationInput | ReconciliationRunOrderByWithAggregationInput[]
    by: ReconciliationRunScalarFieldEnum[] | ReconciliationRunScalarFieldEnum
    having?: ReconciliationRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReconciliationRunCountAggregateInputType | true
    _avg?: ReconciliationRunAvgAggregateInputType
    _sum?: ReconciliationRunSumAggregateInputType
    _min?: ReconciliationRunMinAggregateInputType
    _max?: ReconciliationRunMaxAggregateInputType
  }

  export type ReconciliationRunGroupByOutputType = {
    id: string
    concessionId: string
    periodStart: Date
    periodEnd: Date
    status: string
    totalReportedMinor: bigint
    totalEvidenceMinor: bigint
    totalSettledMinor: bigint
    matchedCount: number
    unmatchedCount: number
    createdAt: Date
    _count: ReconciliationRunCountAggregateOutputType | null
    _avg: ReconciliationRunAvgAggregateOutputType | null
    _sum: ReconciliationRunSumAggregateOutputType | null
    _min: ReconciliationRunMinAggregateOutputType | null
    _max: ReconciliationRunMaxAggregateOutputType | null
  }

  type GetReconciliationRunGroupByPayload<T extends ReconciliationRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReconciliationRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReconciliationRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReconciliationRunGroupByOutputType[P]>
            : GetScalarType<T[P], ReconciliationRunGroupByOutputType[P]>
        }
      >
    >


  export type ReconciliationRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    status?: boolean
    totalReportedMinor?: boolean
    totalEvidenceMinor?: boolean
    totalSettledMinor?: boolean
    matchedCount?: boolean
    unmatchedCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["reconciliationRun"]>

  export type ReconciliationRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    status?: boolean
    totalReportedMinor?: boolean
    totalEvidenceMinor?: boolean
    totalSettledMinor?: boolean
    matchedCount?: boolean
    unmatchedCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["reconciliationRun"]>

  export type ReconciliationRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    status?: boolean
    totalReportedMinor?: boolean
    totalEvidenceMinor?: boolean
    totalSettledMinor?: boolean
    matchedCount?: boolean
    unmatchedCount?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["reconciliationRun"]>

  export type ReconciliationRunSelectScalar = {
    id?: boolean
    concessionId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    status?: boolean
    totalReportedMinor?: boolean
    totalEvidenceMinor?: boolean
    totalSettledMinor?: boolean
    matchedCount?: boolean
    unmatchedCount?: boolean
    createdAt?: boolean
  }

  export type ReconciliationRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concessionId" | "periodStart" | "periodEnd" | "status" | "totalReportedMinor" | "totalEvidenceMinor" | "totalSettledMinor" | "matchedCount" | "unmatchedCount" | "createdAt", ExtArgs["result"]["reconciliationRun"]>

  export type $ReconciliationRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReconciliationRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concessionId: string
      periodStart: Date
      periodEnd: Date
      status: string
      totalReportedMinor: bigint
      totalEvidenceMinor: bigint
      totalSettledMinor: bigint
      matchedCount: number
      unmatchedCount: number
      createdAt: Date
    }, ExtArgs["result"]["reconciliationRun"]>
    composites: {}
  }

  type ReconciliationRunGetPayload<S extends boolean | null | undefined | ReconciliationRunDefaultArgs> = $Result.GetResult<Prisma.$ReconciliationRunPayload, S>

  type ReconciliationRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReconciliationRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReconciliationRunCountAggregateInputType | true
    }

  export interface ReconciliationRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReconciliationRun'], meta: { name: 'ReconciliationRun' } }
    /**
     * Find zero or one ReconciliationRun that matches the filter.
     * @param {ReconciliationRunFindUniqueArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReconciliationRunFindUniqueArgs>(args: SelectSubset<T, ReconciliationRunFindUniqueArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReconciliationRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReconciliationRunFindUniqueOrThrowArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReconciliationRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ReconciliationRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReconciliationRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindFirstArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReconciliationRunFindFirstArgs>(args?: SelectSubset<T, ReconciliationRunFindFirstArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReconciliationRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindFirstOrThrowArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReconciliationRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ReconciliationRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReconciliationRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReconciliationRuns
     * const reconciliationRuns = await prisma.reconciliationRun.findMany()
     * 
     * // Get first 10 ReconciliationRuns
     * const reconciliationRuns = await prisma.reconciliationRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reconciliationRunWithIdOnly = await prisma.reconciliationRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReconciliationRunFindManyArgs>(args?: SelectSubset<T, ReconciliationRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReconciliationRun.
     * @param {ReconciliationRunCreateArgs} args - Arguments to create a ReconciliationRun.
     * @example
     * // Create one ReconciliationRun
     * const ReconciliationRun = await prisma.reconciliationRun.create({
     *   data: {
     *     // ... data to create a ReconciliationRun
     *   }
     * })
     * 
     */
    create<T extends ReconciliationRunCreateArgs>(args: SelectSubset<T, ReconciliationRunCreateArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReconciliationRuns.
     * @param {ReconciliationRunCreateManyArgs} args - Arguments to create many ReconciliationRuns.
     * @example
     * // Create many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReconciliationRunCreateManyArgs>(args?: SelectSubset<T, ReconciliationRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReconciliationRuns and returns the data saved in the database.
     * @param {ReconciliationRunCreateManyAndReturnArgs} args - Arguments to create many ReconciliationRuns.
     * @example
     * // Create many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReconciliationRuns and only return the `id`
     * const reconciliationRunWithIdOnly = await prisma.reconciliationRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReconciliationRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ReconciliationRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReconciliationRun.
     * @param {ReconciliationRunDeleteArgs} args - Arguments to delete one ReconciliationRun.
     * @example
     * // Delete one ReconciliationRun
     * const ReconciliationRun = await prisma.reconciliationRun.delete({
     *   where: {
     *     // ... filter to delete one ReconciliationRun
     *   }
     * })
     * 
     */
    delete<T extends ReconciliationRunDeleteArgs>(args: SelectSubset<T, ReconciliationRunDeleteArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReconciliationRun.
     * @param {ReconciliationRunUpdateArgs} args - Arguments to update one ReconciliationRun.
     * @example
     * // Update one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReconciliationRunUpdateArgs>(args: SelectSubset<T, ReconciliationRunUpdateArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReconciliationRuns.
     * @param {ReconciliationRunDeleteManyArgs} args - Arguments to filter ReconciliationRuns to delete.
     * @example
     * // Delete a few ReconciliationRuns
     * const { count } = await prisma.reconciliationRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReconciliationRunDeleteManyArgs>(args?: SelectSubset<T, ReconciliationRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReconciliationRunUpdateManyArgs>(args: SelectSubset<T, ReconciliationRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationRuns and returns the data updated in the database.
     * @param {ReconciliationRunUpdateManyAndReturnArgs} args - Arguments to update many ReconciliationRuns.
     * @example
     * // Update many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReconciliationRuns and only return the `id`
     * const reconciliationRunWithIdOnly = await prisma.reconciliationRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReconciliationRunUpdateManyAndReturnArgs>(args: SelectSubset<T, ReconciliationRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReconciliationRun.
     * @param {ReconciliationRunUpsertArgs} args - Arguments to update or create a ReconciliationRun.
     * @example
     * // Update or create a ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.upsert({
     *   create: {
     *     // ... data to create a ReconciliationRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReconciliationRun we want to update
     *   }
     * })
     */
    upsert<T extends ReconciliationRunUpsertArgs>(args: SelectSubset<T, ReconciliationRunUpsertArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReconciliationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunCountArgs} args - Arguments to filter ReconciliationRuns to count.
     * @example
     * // Count the number of ReconciliationRuns
     * const count = await prisma.reconciliationRun.count({
     *   where: {
     *     // ... the filter for the ReconciliationRuns we want to count
     *   }
     * })
    **/
    count<T extends ReconciliationRunCountArgs>(
      args?: Subset<T, ReconciliationRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReconciliationRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReconciliationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReconciliationRunAggregateArgs>(args: Subset<T, ReconciliationRunAggregateArgs>): Prisma.PrismaPromise<GetReconciliationRunAggregateType<T>>

    /**
     * Group by ReconciliationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReconciliationRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReconciliationRunGroupByArgs['orderBy'] }
        : { orderBy?: ReconciliationRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReconciliationRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReconciliationRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReconciliationRun model
   */
  readonly fields: ReconciliationRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReconciliationRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReconciliationRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReconciliationRun model
   */
  interface ReconciliationRunFieldRefs {
    readonly id: FieldRef<"ReconciliationRun", 'String'>
    readonly concessionId: FieldRef<"ReconciliationRun", 'String'>
    readonly periodStart: FieldRef<"ReconciliationRun", 'DateTime'>
    readonly periodEnd: FieldRef<"ReconciliationRun", 'DateTime'>
    readonly status: FieldRef<"ReconciliationRun", 'String'>
    readonly totalReportedMinor: FieldRef<"ReconciliationRun", 'BigInt'>
    readonly totalEvidenceMinor: FieldRef<"ReconciliationRun", 'BigInt'>
    readonly totalSettledMinor: FieldRef<"ReconciliationRun", 'BigInt'>
    readonly matchedCount: FieldRef<"ReconciliationRun", 'Int'>
    readonly unmatchedCount: FieldRef<"ReconciliationRun", 'Int'>
    readonly createdAt: FieldRef<"ReconciliationRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReconciliationRun findUnique
   */
  export type ReconciliationRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun findUniqueOrThrow
   */
  export type ReconciliationRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun findFirst
   */
  export type ReconciliationRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationRuns.
     */
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun findFirstOrThrow
   */
  export type ReconciliationRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationRuns.
     */
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun findMany
   */
  export type ReconciliationRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationRuns to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun create
   */
  export type ReconciliationRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * The data needed to create a ReconciliationRun.
     */
    data: XOR<ReconciliationRunCreateInput, ReconciliationRunUncheckedCreateInput>
  }

  /**
   * ReconciliationRun createMany
   */
  export type ReconciliationRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReconciliationRuns.
     */
    data: ReconciliationRunCreateManyInput | ReconciliationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationRun createManyAndReturn
   */
  export type ReconciliationRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * The data used to create many ReconciliationRuns.
     */
    data: ReconciliationRunCreateManyInput | ReconciliationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationRun update
   */
  export type ReconciliationRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * The data needed to update a ReconciliationRun.
     */
    data: XOR<ReconciliationRunUpdateInput, ReconciliationRunUncheckedUpdateInput>
    /**
     * Choose, which ReconciliationRun to update.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun updateMany
   */
  export type ReconciliationRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReconciliationRuns.
     */
    data: XOR<ReconciliationRunUpdateManyMutationInput, ReconciliationRunUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationRuns to update
     */
    where?: ReconciliationRunWhereInput
    /**
     * Limit how many ReconciliationRuns to update.
     */
    limit?: number
  }

  /**
   * ReconciliationRun updateManyAndReturn
   */
  export type ReconciliationRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * The data used to update ReconciliationRuns.
     */
    data: XOR<ReconciliationRunUpdateManyMutationInput, ReconciliationRunUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationRuns to update
     */
    where?: ReconciliationRunWhereInput
    /**
     * Limit how many ReconciliationRuns to update.
     */
    limit?: number
  }

  /**
   * ReconciliationRun upsert
   */
  export type ReconciliationRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * The filter to search for the ReconciliationRun to update in case it exists.
     */
    where: ReconciliationRunWhereUniqueInput
    /**
     * In case the ReconciliationRun found by the `where` argument doesn't exist, create a new ReconciliationRun with this data.
     */
    create: XOR<ReconciliationRunCreateInput, ReconciliationRunUncheckedCreateInput>
    /**
     * In case the ReconciliationRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReconciliationRunUpdateInput, ReconciliationRunUncheckedUpdateInput>
  }

  /**
   * ReconciliationRun delete
   */
  export type ReconciliationRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
    /**
     * Filter which ReconciliationRun to delete.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun deleteMany
   */
  export type ReconciliationRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationRuns to delete
     */
    where?: ReconciliationRunWhereInput
    /**
     * Limit how many ReconciliationRuns to delete.
     */
    limit?: number
  }

  /**
   * ReconciliationRun without action
   */
  export type ReconciliationRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationRun
     */
    omit?: ReconciliationRunOmit<ExtArgs> | null
  }


  /**
   * Model ReconciliationException
   */

  export type AggregateReconciliationException = {
    _count: ReconciliationExceptionCountAggregateOutputType | null
    _avg: ReconciliationExceptionAvgAggregateOutputType | null
    _sum: ReconciliationExceptionSumAggregateOutputType | null
    _min: ReconciliationExceptionMinAggregateOutputType | null
    _max: ReconciliationExceptionMaxAggregateOutputType | null
  }

  export type ReconciliationExceptionAvgAggregateOutputType = {
    varianceMinor: number | null
  }

  export type ReconciliationExceptionSumAggregateOutputType = {
    varianceMinor: bigint | null
  }

  export type ReconciliationExceptionMinAggregateOutputType = {
    id: string | null
    runId: string | null
    concessionId: string | null
    severity: string | null
    status: string | null
    reportedRef: string | null
    evidenceRef: string | null
    varianceMinor: bigint | null
    reasonCode: string | null
    assignedOwner: string | null
    makerId: string | null
    checkerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReconciliationExceptionMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    concessionId: string | null
    severity: string | null
    status: string | null
    reportedRef: string | null
    evidenceRef: string | null
    varianceMinor: bigint | null
    reasonCode: string | null
    assignedOwner: string | null
    makerId: string | null
    checkerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReconciliationExceptionCountAggregateOutputType = {
    id: number
    runId: number
    concessionId: number
    severity: number
    status: number
    reportedRef: number
    evidenceRef: number
    varianceMinor: number
    reasonCode: number
    assignedOwner: number
    makerId: number
    checkerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReconciliationExceptionAvgAggregateInputType = {
    varianceMinor?: true
  }

  export type ReconciliationExceptionSumAggregateInputType = {
    varianceMinor?: true
  }

  export type ReconciliationExceptionMinAggregateInputType = {
    id?: true
    runId?: true
    concessionId?: true
    severity?: true
    status?: true
    reportedRef?: true
    evidenceRef?: true
    varianceMinor?: true
    reasonCode?: true
    assignedOwner?: true
    makerId?: true
    checkerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReconciliationExceptionMaxAggregateInputType = {
    id?: true
    runId?: true
    concessionId?: true
    severity?: true
    status?: true
    reportedRef?: true
    evidenceRef?: true
    varianceMinor?: true
    reasonCode?: true
    assignedOwner?: true
    makerId?: true
    checkerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReconciliationExceptionCountAggregateInputType = {
    id?: true
    runId?: true
    concessionId?: true
    severity?: true
    status?: true
    reportedRef?: true
    evidenceRef?: true
    varianceMinor?: true
    reasonCode?: true
    assignedOwner?: true
    makerId?: true
    checkerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReconciliationExceptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationException to aggregate.
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationExceptions to fetch.
     */
    orderBy?: ReconciliationExceptionOrderByWithRelationInput | ReconciliationExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReconciliationExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReconciliationExceptions
    **/
    _count?: true | ReconciliationExceptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReconciliationExceptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReconciliationExceptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReconciliationExceptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReconciliationExceptionMaxAggregateInputType
  }

  export type GetReconciliationExceptionAggregateType<T extends ReconciliationExceptionAggregateArgs> = {
        [P in keyof T & keyof AggregateReconciliationException]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReconciliationException[P]>
      : GetScalarType<T[P], AggregateReconciliationException[P]>
  }




  export type ReconciliationExceptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReconciliationExceptionWhereInput
    orderBy?: ReconciliationExceptionOrderByWithAggregationInput | ReconciliationExceptionOrderByWithAggregationInput[]
    by: ReconciliationExceptionScalarFieldEnum[] | ReconciliationExceptionScalarFieldEnum
    having?: ReconciliationExceptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReconciliationExceptionCountAggregateInputType | true
    _avg?: ReconciliationExceptionAvgAggregateInputType
    _sum?: ReconciliationExceptionSumAggregateInputType
    _min?: ReconciliationExceptionMinAggregateInputType
    _max?: ReconciliationExceptionMaxAggregateInputType
  }

  export type ReconciliationExceptionGroupByOutputType = {
    id: string
    runId: string
    concessionId: string
    severity: string
    status: string
    reportedRef: string | null
    evidenceRef: string | null
    varianceMinor: bigint
    reasonCode: string
    assignedOwner: string | null
    makerId: string | null
    checkerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReconciliationExceptionCountAggregateOutputType | null
    _avg: ReconciliationExceptionAvgAggregateOutputType | null
    _sum: ReconciliationExceptionSumAggregateOutputType | null
    _min: ReconciliationExceptionMinAggregateOutputType | null
    _max: ReconciliationExceptionMaxAggregateOutputType | null
  }

  type GetReconciliationExceptionGroupByPayload<T extends ReconciliationExceptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReconciliationExceptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReconciliationExceptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReconciliationExceptionGroupByOutputType[P]>
            : GetScalarType<T[P], ReconciliationExceptionGroupByOutputType[P]>
        }
      >
    >


  export type ReconciliationExceptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    concessionId?: boolean
    severity?: boolean
    status?: boolean
    reportedRef?: boolean
    evidenceRef?: boolean
    varianceMinor?: boolean
    reasonCode?: boolean
    assignedOwner?: boolean
    makerId?: boolean
    checkerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reconciliationException"]>

  export type ReconciliationExceptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    concessionId?: boolean
    severity?: boolean
    status?: boolean
    reportedRef?: boolean
    evidenceRef?: boolean
    varianceMinor?: boolean
    reasonCode?: boolean
    assignedOwner?: boolean
    makerId?: boolean
    checkerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reconciliationException"]>

  export type ReconciliationExceptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    concessionId?: boolean
    severity?: boolean
    status?: boolean
    reportedRef?: boolean
    evidenceRef?: boolean
    varianceMinor?: boolean
    reasonCode?: boolean
    assignedOwner?: boolean
    makerId?: boolean
    checkerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reconciliationException"]>

  export type ReconciliationExceptionSelectScalar = {
    id?: boolean
    runId?: boolean
    concessionId?: boolean
    severity?: boolean
    status?: boolean
    reportedRef?: boolean
    evidenceRef?: boolean
    varianceMinor?: boolean
    reasonCode?: boolean
    assignedOwner?: boolean
    makerId?: boolean
    checkerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReconciliationExceptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "concessionId" | "severity" | "status" | "reportedRef" | "evidenceRef" | "varianceMinor" | "reasonCode" | "assignedOwner" | "makerId" | "checkerId" | "createdAt" | "updatedAt", ExtArgs["result"]["reconciliationException"]>

  export type $ReconciliationExceptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReconciliationException"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      concessionId: string
      severity: string
      status: string
      reportedRef: string | null
      evidenceRef: string | null
      varianceMinor: bigint
      reasonCode: string
      assignedOwner: string | null
      makerId: string | null
      checkerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reconciliationException"]>
    composites: {}
  }

  type ReconciliationExceptionGetPayload<S extends boolean | null | undefined | ReconciliationExceptionDefaultArgs> = $Result.GetResult<Prisma.$ReconciliationExceptionPayload, S>

  type ReconciliationExceptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReconciliationExceptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReconciliationExceptionCountAggregateInputType | true
    }

  export interface ReconciliationExceptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReconciliationException'], meta: { name: 'ReconciliationException' } }
    /**
     * Find zero or one ReconciliationException that matches the filter.
     * @param {ReconciliationExceptionFindUniqueArgs} args - Arguments to find a ReconciliationException
     * @example
     * // Get one ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReconciliationExceptionFindUniqueArgs>(args: SelectSubset<T, ReconciliationExceptionFindUniqueArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReconciliationException that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReconciliationExceptionFindUniqueOrThrowArgs} args - Arguments to find a ReconciliationException
     * @example
     * // Get one ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReconciliationExceptionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReconciliationExceptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReconciliationException that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionFindFirstArgs} args - Arguments to find a ReconciliationException
     * @example
     * // Get one ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReconciliationExceptionFindFirstArgs>(args?: SelectSubset<T, ReconciliationExceptionFindFirstArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReconciliationException that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionFindFirstOrThrowArgs} args - Arguments to find a ReconciliationException
     * @example
     * // Get one ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReconciliationExceptionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReconciliationExceptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReconciliationExceptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReconciliationExceptions
     * const reconciliationExceptions = await prisma.reconciliationException.findMany()
     * 
     * // Get first 10 ReconciliationExceptions
     * const reconciliationExceptions = await prisma.reconciliationException.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reconciliationExceptionWithIdOnly = await prisma.reconciliationException.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReconciliationExceptionFindManyArgs>(args?: SelectSubset<T, ReconciliationExceptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReconciliationException.
     * @param {ReconciliationExceptionCreateArgs} args - Arguments to create a ReconciliationException.
     * @example
     * // Create one ReconciliationException
     * const ReconciliationException = await prisma.reconciliationException.create({
     *   data: {
     *     // ... data to create a ReconciliationException
     *   }
     * })
     * 
     */
    create<T extends ReconciliationExceptionCreateArgs>(args: SelectSubset<T, ReconciliationExceptionCreateArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReconciliationExceptions.
     * @param {ReconciliationExceptionCreateManyArgs} args - Arguments to create many ReconciliationExceptions.
     * @example
     * // Create many ReconciliationExceptions
     * const reconciliationException = await prisma.reconciliationException.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReconciliationExceptionCreateManyArgs>(args?: SelectSubset<T, ReconciliationExceptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReconciliationExceptions and returns the data saved in the database.
     * @param {ReconciliationExceptionCreateManyAndReturnArgs} args - Arguments to create many ReconciliationExceptions.
     * @example
     * // Create many ReconciliationExceptions
     * const reconciliationException = await prisma.reconciliationException.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReconciliationExceptions and only return the `id`
     * const reconciliationExceptionWithIdOnly = await prisma.reconciliationException.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReconciliationExceptionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReconciliationExceptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReconciliationException.
     * @param {ReconciliationExceptionDeleteArgs} args - Arguments to delete one ReconciliationException.
     * @example
     * // Delete one ReconciliationException
     * const ReconciliationException = await prisma.reconciliationException.delete({
     *   where: {
     *     // ... filter to delete one ReconciliationException
     *   }
     * })
     * 
     */
    delete<T extends ReconciliationExceptionDeleteArgs>(args: SelectSubset<T, ReconciliationExceptionDeleteArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReconciliationException.
     * @param {ReconciliationExceptionUpdateArgs} args - Arguments to update one ReconciliationException.
     * @example
     * // Update one ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReconciliationExceptionUpdateArgs>(args: SelectSubset<T, ReconciliationExceptionUpdateArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReconciliationExceptions.
     * @param {ReconciliationExceptionDeleteManyArgs} args - Arguments to filter ReconciliationExceptions to delete.
     * @example
     * // Delete a few ReconciliationExceptions
     * const { count } = await prisma.reconciliationException.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReconciliationExceptionDeleteManyArgs>(args?: SelectSubset<T, ReconciliationExceptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReconciliationExceptions
     * const reconciliationException = await prisma.reconciliationException.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReconciliationExceptionUpdateManyArgs>(args: SelectSubset<T, ReconciliationExceptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationExceptions and returns the data updated in the database.
     * @param {ReconciliationExceptionUpdateManyAndReturnArgs} args - Arguments to update many ReconciliationExceptions.
     * @example
     * // Update many ReconciliationExceptions
     * const reconciliationException = await prisma.reconciliationException.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReconciliationExceptions and only return the `id`
     * const reconciliationExceptionWithIdOnly = await prisma.reconciliationException.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReconciliationExceptionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReconciliationExceptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReconciliationException.
     * @param {ReconciliationExceptionUpsertArgs} args - Arguments to update or create a ReconciliationException.
     * @example
     * // Update or create a ReconciliationException
     * const reconciliationException = await prisma.reconciliationException.upsert({
     *   create: {
     *     // ... data to create a ReconciliationException
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReconciliationException we want to update
     *   }
     * })
     */
    upsert<T extends ReconciliationExceptionUpsertArgs>(args: SelectSubset<T, ReconciliationExceptionUpsertArgs<ExtArgs>>): Prisma__ReconciliationExceptionClient<$Result.GetResult<Prisma.$ReconciliationExceptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReconciliationExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionCountArgs} args - Arguments to filter ReconciliationExceptions to count.
     * @example
     * // Count the number of ReconciliationExceptions
     * const count = await prisma.reconciliationException.count({
     *   where: {
     *     // ... the filter for the ReconciliationExceptions we want to count
     *   }
     * })
    **/
    count<T extends ReconciliationExceptionCountArgs>(
      args?: Subset<T, ReconciliationExceptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReconciliationExceptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReconciliationException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReconciliationExceptionAggregateArgs>(args: Subset<T, ReconciliationExceptionAggregateArgs>): Prisma.PrismaPromise<GetReconciliationExceptionAggregateType<T>>

    /**
     * Group by ReconciliationException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationExceptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReconciliationExceptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReconciliationExceptionGroupByArgs['orderBy'] }
        : { orderBy?: ReconciliationExceptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReconciliationExceptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReconciliationExceptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReconciliationException model
   */
  readonly fields: ReconciliationExceptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReconciliationException.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReconciliationExceptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReconciliationException model
   */
  interface ReconciliationExceptionFieldRefs {
    readonly id: FieldRef<"ReconciliationException", 'String'>
    readonly runId: FieldRef<"ReconciliationException", 'String'>
    readonly concessionId: FieldRef<"ReconciliationException", 'String'>
    readonly severity: FieldRef<"ReconciliationException", 'String'>
    readonly status: FieldRef<"ReconciliationException", 'String'>
    readonly reportedRef: FieldRef<"ReconciliationException", 'String'>
    readonly evidenceRef: FieldRef<"ReconciliationException", 'String'>
    readonly varianceMinor: FieldRef<"ReconciliationException", 'BigInt'>
    readonly reasonCode: FieldRef<"ReconciliationException", 'String'>
    readonly assignedOwner: FieldRef<"ReconciliationException", 'String'>
    readonly makerId: FieldRef<"ReconciliationException", 'String'>
    readonly checkerId: FieldRef<"ReconciliationException", 'String'>
    readonly createdAt: FieldRef<"ReconciliationException", 'DateTime'>
    readonly updatedAt: FieldRef<"ReconciliationException", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReconciliationException findUnique
   */
  export type ReconciliationExceptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationException to fetch.
     */
    where: ReconciliationExceptionWhereUniqueInput
  }

  /**
   * ReconciliationException findUniqueOrThrow
   */
  export type ReconciliationExceptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationException to fetch.
     */
    where: ReconciliationExceptionWhereUniqueInput
  }

  /**
   * ReconciliationException findFirst
   */
  export type ReconciliationExceptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationException to fetch.
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationExceptions to fetch.
     */
    orderBy?: ReconciliationExceptionOrderByWithRelationInput | ReconciliationExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationExceptions.
     */
    cursor?: ReconciliationExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationExceptions.
     */
    distinct?: ReconciliationExceptionScalarFieldEnum | ReconciliationExceptionScalarFieldEnum[]
  }

  /**
   * ReconciliationException findFirstOrThrow
   */
  export type ReconciliationExceptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationException to fetch.
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationExceptions to fetch.
     */
    orderBy?: ReconciliationExceptionOrderByWithRelationInput | ReconciliationExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationExceptions.
     */
    cursor?: ReconciliationExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationExceptions.
     */
    distinct?: ReconciliationExceptionScalarFieldEnum | ReconciliationExceptionScalarFieldEnum[]
  }

  /**
   * ReconciliationException findMany
   */
  export type ReconciliationExceptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter, which ReconciliationExceptions to fetch.
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationExceptions to fetch.
     */
    orderBy?: ReconciliationExceptionOrderByWithRelationInput | ReconciliationExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReconciliationExceptions.
     */
    cursor?: ReconciliationExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationExceptions.
     */
    skip?: number
    distinct?: ReconciliationExceptionScalarFieldEnum | ReconciliationExceptionScalarFieldEnum[]
  }

  /**
   * ReconciliationException create
   */
  export type ReconciliationExceptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * The data needed to create a ReconciliationException.
     */
    data: XOR<ReconciliationExceptionCreateInput, ReconciliationExceptionUncheckedCreateInput>
  }

  /**
   * ReconciliationException createMany
   */
  export type ReconciliationExceptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReconciliationExceptions.
     */
    data: ReconciliationExceptionCreateManyInput | ReconciliationExceptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationException createManyAndReturn
   */
  export type ReconciliationExceptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * The data used to create many ReconciliationExceptions.
     */
    data: ReconciliationExceptionCreateManyInput | ReconciliationExceptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationException update
   */
  export type ReconciliationExceptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * The data needed to update a ReconciliationException.
     */
    data: XOR<ReconciliationExceptionUpdateInput, ReconciliationExceptionUncheckedUpdateInput>
    /**
     * Choose, which ReconciliationException to update.
     */
    where: ReconciliationExceptionWhereUniqueInput
  }

  /**
   * ReconciliationException updateMany
   */
  export type ReconciliationExceptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReconciliationExceptions.
     */
    data: XOR<ReconciliationExceptionUpdateManyMutationInput, ReconciliationExceptionUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationExceptions to update
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * Limit how many ReconciliationExceptions to update.
     */
    limit?: number
  }

  /**
   * ReconciliationException updateManyAndReturn
   */
  export type ReconciliationExceptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * The data used to update ReconciliationExceptions.
     */
    data: XOR<ReconciliationExceptionUpdateManyMutationInput, ReconciliationExceptionUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationExceptions to update
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * Limit how many ReconciliationExceptions to update.
     */
    limit?: number
  }

  /**
   * ReconciliationException upsert
   */
  export type ReconciliationExceptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * The filter to search for the ReconciliationException to update in case it exists.
     */
    where: ReconciliationExceptionWhereUniqueInput
    /**
     * In case the ReconciliationException found by the `where` argument doesn't exist, create a new ReconciliationException with this data.
     */
    create: XOR<ReconciliationExceptionCreateInput, ReconciliationExceptionUncheckedCreateInput>
    /**
     * In case the ReconciliationException was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReconciliationExceptionUpdateInput, ReconciliationExceptionUncheckedUpdateInput>
  }

  /**
   * ReconciliationException delete
   */
  export type ReconciliationExceptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
    /**
     * Filter which ReconciliationException to delete.
     */
    where: ReconciliationExceptionWhereUniqueInput
  }

  /**
   * ReconciliationException deleteMany
   */
  export type ReconciliationExceptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationExceptions to delete
     */
    where?: ReconciliationExceptionWhereInput
    /**
     * Limit how many ReconciliationExceptions to delete.
     */
    limit?: number
  }

  /**
   * ReconciliationException without action
   */
  export type ReconciliationExceptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationException
     */
    select?: ReconciliationExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReconciliationException
     */
    omit?: ReconciliationExceptionOmit<ExtArgs> | null
  }


  /**
   * Model OutboxEvent
   */

  export type AggregateOutboxEvent = {
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  export type OutboxEventAvgAggregateOutputType = {
    eventVersion: number | null
    aggregateVersion: number | null
    attempts: number | null
  }

  export type OutboxEventSumAggregateOutputType = {
    eventVersion: number | null
    aggregateVersion: number | null
    attempts: number | null
  }

  export type OutboxEventMinAggregateOutputType = {
    id: string | null
    eventType: string | null
    eventVersion: number | null
    aggregateType: string | null
    aggregateId: string | null
    aggregateVersion: number | null
    routingKey: string | null
    occurredAt: Date | null
    publishedAt: Date | null
    attempts: number | null
    nextAttemptAt: Date | null
    lockedAt: Date | null
    lastError: string | null
  }

  export type OutboxEventMaxAggregateOutputType = {
    id: string | null
    eventType: string | null
    eventVersion: number | null
    aggregateType: string | null
    aggregateId: string | null
    aggregateVersion: number | null
    routingKey: string | null
    occurredAt: Date | null
    publishedAt: Date | null
    attempts: number | null
    nextAttemptAt: Date | null
    lockedAt: Date | null
    lastError: string | null
  }

  export type OutboxEventCountAggregateOutputType = {
    id: number
    eventType: number
    eventVersion: number
    aggregateType: number
    aggregateId: number
    aggregateVersion: number
    routingKey: number
    payload: number
    headers: number
    occurredAt: number
    publishedAt: number
    attempts: number
    nextAttemptAt: number
    lockedAt: number
    lastError: number
    _all: number
  }


  export type OutboxEventAvgAggregateInputType = {
    eventVersion?: true
    aggregateVersion?: true
    attempts?: true
  }

  export type OutboxEventSumAggregateInputType = {
    eventVersion?: true
    aggregateVersion?: true
    attempts?: true
  }

  export type OutboxEventMinAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateType?: true
    aggregateId?: true
    aggregateVersion?: true
    routingKey?: true
    occurredAt?: true
    publishedAt?: true
    attempts?: true
    nextAttemptAt?: true
    lockedAt?: true
    lastError?: true
  }

  export type OutboxEventMaxAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateType?: true
    aggregateId?: true
    aggregateVersion?: true
    routingKey?: true
    occurredAt?: true
    publishedAt?: true
    attempts?: true
    nextAttemptAt?: true
    lockedAt?: true
    lastError?: true
  }

  export type OutboxEventCountAggregateInputType = {
    id?: true
    eventType?: true
    eventVersion?: true
    aggregateType?: true
    aggregateId?: true
    aggregateVersion?: true
    routingKey?: true
    payload?: true
    headers?: true
    occurredAt?: true
    publishedAt?: true
    attempts?: true
    nextAttemptAt?: true
    lockedAt?: true
    lastError?: true
    _all?: true
  }

  export type OutboxEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvent to aggregate.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboxEvents
    **/
    _count?: true | OutboxEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutboxEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutboxEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboxEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboxEventMaxAggregateInputType
  }

  export type GetOutboxEventAggregateType<T extends OutboxEventAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboxEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboxEvent[P]>
      : GetScalarType<T[P], AggregateOutboxEvent[P]>
  }




  export type OutboxEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboxEventWhereInput
    orderBy?: OutboxEventOrderByWithAggregationInput | OutboxEventOrderByWithAggregationInput[]
    by: OutboxEventScalarFieldEnum[] | OutboxEventScalarFieldEnum
    having?: OutboxEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboxEventCountAggregateInputType | true
    _avg?: OutboxEventAvgAggregateInputType
    _sum?: OutboxEventSumAggregateInputType
    _min?: OutboxEventMinAggregateInputType
    _max?: OutboxEventMaxAggregateInputType
  }

  export type OutboxEventGroupByOutputType = {
    id: string
    eventType: string
    eventVersion: number
    aggregateType: string
    aggregateId: string
    aggregateVersion: number
    routingKey: string
    payload: JsonValue
    headers: JsonValue
    occurredAt: Date
    publishedAt: Date | null
    attempts: number
    nextAttemptAt: Date
    lockedAt: Date | null
    lastError: string | null
    _count: OutboxEventCountAggregateOutputType | null
    _avg: OutboxEventAvgAggregateOutputType | null
    _sum: OutboxEventSumAggregateOutputType | null
    _min: OutboxEventMinAggregateOutputType | null
    _max: OutboxEventMaxAggregateOutputType | null
  }

  type GetOutboxEventGroupByPayload<T extends OutboxEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboxEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboxEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
            : GetScalarType<T[P], OutboxEventGroupByOutputType[P]>
        }
      >
    >


  export type OutboxEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    aggregateVersion?: boolean
    routingKey?: boolean
    payload?: boolean
    headers?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    attempts?: boolean
    nextAttemptAt?: boolean
    lockedAt?: boolean
    lastError?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    aggregateVersion?: boolean
    routingKey?: boolean
    payload?: boolean
    headers?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    attempts?: boolean
    nextAttemptAt?: boolean
    lockedAt?: boolean
    lastError?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    aggregateVersion?: boolean
    routingKey?: boolean
    payload?: boolean
    headers?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    attempts?: boolean
    nextAttemptAt?: boolean
    lockedAt?: boolean
    lastError?: boolean
  }, ExtArgs["result"]["outboxEvent"]>

  export type OutboxEventSelectScalar = {
    id?: boolean
    eventType?: boolean
    eventVersion?: boolean
    aggregateType?: boolean
    aggregateId?: boolean
    aggregateVersion?: boolean
    routingKey?: boolean
    payload?: boolean
    headers?: boolean
    occurredAt?: boolean
    publishedAt?: boolean
    attempts?: boolean
    nextAttemptAt?: boolean
    lockedAt?: boolean
    lastError?: boolean
  }

  export type OutboxEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventType" | "eventVersion" | "aggregateType" | "aggregateId" | "aggregateVersion" | "routingKey" | "payload" | "headers" | "occurredAt" | "publishedAt" | "attempts" | "nextAttemptAt" | "lockedAt" | "lastError", ExtArgs["result"]["outboxEvent"]>

  export type $OutboxEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboxEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventType: string
      eventVersion: number
      aggregateType: string
      aggregateId: string
      aggregateVersion: number
      routingKey: string
      payload: Prisma.JsonValue
      headers: Prisma.JsonValue
      occurredAt: Date
      publishedAt: Date | null
      attempts: number
      nextAttemptAt: Date
      lockedAt: Date | null
      lastError: string | null
    }, ExtArgs["result"]["outboxEvent"]>
    composites: {}
  }

  type OutboxEventGetPayload<S extends boolean | null | undefined | OutboxEventDefaultArgs> = $Result.GetResult<Prisma.$OutboxEventPayload, S>

  type OutboxEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboxEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutboxEventCountAggregateInputType | true
    }

  export interface OutboxEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboxEvent'], meta: { name: 'OutboxEvent' } }
    /**
     * Find zero or one OutboxEvent that matches the filter.
     * @param {OutboxEventFindUniqueArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboxEventFindUniqueArgs>(args: SelectSubset<T, OutboxEventFindUniqueArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutboxEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboxEventFindUniqueOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboxEventFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboxEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboxEventFindFirstArgs>(args?: SelectSubset<T, OutboxEventFindFirstArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboxEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindFirstOrThrowArgs} args - Arguments to find a OutboxEvent
     * @example
     * // Get one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboxEventFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboxEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutboxEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany()
     * 
     * // Get first 10 OutboxEvents
     * const outboxEvents = await prisma.outboxEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboxEventFindManyArgs>(args?: SelectSubset<T, OutboxEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutboxEvent.
     * @param {OutboxEventCreateArgs} args - Arguments to create a OutboxEvent.
     * @example
     * // Create one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.create({
     *   data: {
     *     // ... data to create a OutboxEvent
     *   }
     * })
     * 
     */
    create<T extends OutboxEventCreateArgs>(args: SelectSubset<T, OutboxEventCreateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutboxEvents.
     * @param {OutboxEventCreateManyArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboxEventCreateManyArgs>(args?: SelectSubset<T, OutboxEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboxEvents and returns the data saved in the database.
     * @param {OutboxEventCreateManyAndReturnArgs} args - Arguments to create many OutboxEvents.
     * @example
     * // Create many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboxEventCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboxEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutboxEvent.
     * @param {OutboxEventDeleteArgs} args - Arguments to delete one OutboxEvent.
     * @example
     * // Delete one OutboxEvent
     * const OutboxEvent = await prisma.outboxEvent.delete({
     *   where: {
     *     // ... filter to delete one OutboxEvent
     *   }
     * })
     * 
     */
    delete<T extends OutboxEventDeleteArgs>(args: SelectSubset<T, OutboxEventDeleteArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutboxEvent.
     * @param {OutboxEventUpdateArgs} args - Arguments to update one OutboxEvent.
     * @example
     * // Update one OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboxEventUpdateArgs>(args: SelectSubset<T, OutboxEventUpdateArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutboxEvents.
     * @param {OutboxEventDeleteManyArgs} args - Arguments to filter OutboxEvents to delete.
     * @example
     * // Delete a few OutboxEvents
     * const { count } = await prisma.outboxEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboxEventDeleteManyArgs>(args?: SelectSubset<T, OutboxEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboxEventUpdateManyArgs>(args: SelectSubset<T, OutboxEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboxEvents and returns the data updated in the database.
     * @param {OutboxEventUpdateManyAndReturnArgs} args - Arguments to update many OutboxEvents.
     * @example
     * // Update many OutboxEvents
     * const outboxEvent = await prisma.outboxEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutboxEvents and only return the `id`
     * const outboxEventWithIdOnly = await prisma.outboxEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutboxEventUpdateManyAndReturnArgs>(args: SelectSubset<T, OutboxEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutboxEvent.
     * @param {OutboxEventUpsertArgs} args - Arguments to update or create a OutboxEvent.
     * @example
     * // Update or create a OutboxEvent
     * const outboxEvent = await prisma.outboxEvent.upsert({
     *   create: {
     *     // ... data to create a OutboxEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboxEvent we want to update
     *   }
     * })
     */
    upsert<T extends OutboxEventUpsertArgs>(args: SelectSubset<T, OutboxEventUpsertArgs<ExtArgs>>): Prisma__OutboxEventClient<$Result.GetResult<Prisma.$OutboxEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutboxEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventCountArgs} args - Arguments to filter OutboxEvents to count.
     * @example
     * // Count the number of OutboxEvents
     * const count = await prisma.outboxEvent.count({
     *   where: {
     *     // ... the filter for the OutboxEvents we want to count
     *   }
     * })
    **/
    count<T extends OutboxEventCountArgs>(
      args?: Subset<T, OutboxEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboxEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboxEventAggregateArgs>(args: Subset<T, OutboxEventAggregateArgs>): Prisma.PrismaPromise<GetOutboxEventAggregateType<T>>

    /**
     * Group by OutboxEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboxEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboxEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboxEventGroupByArgs['orderBy'] }
        : { orderBy?: OutboxEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboxEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboxEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboxEvent model
   */
  readonly fields: OutboxEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboxEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboxEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutboxEvent model
   */
  interface OutboxEventFieldRefs {
    readonly id: FieldRef<"OutboxEvent", 'String'>
    readonly eventType: FieldRef<"OutboxEvent", 'String'>
    readonly eventVersion: FieldRef<"OutboxEvent", 'Int'>
    readonly aggregateType: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateId: FieldRef<"OutboxEvent", 'String'>
    readonly aggregateVersion: FieldRef<"OutboxEvent", 'Int'>
    readonly routingKey: FieldRef<"OutboxEvent", 'String'>
    readonly payload: FieldRef<"OutboxEvent", 'Json'>
    readonly headers: FieldRef<"OutboxEvent", 'Json'>
    readonly occurredAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly publishedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly attempts: FieldRef<"OutboxEvent", 'Int'>
    readonly nextAttemptAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly lockedAt: FieldRef<"OutboxEvent", 'DateTime'>
    readonly lastError: FieldRef<"OutboxEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OutboxEvent findUnique
   */
  export type OutboxEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findUniqueOrThrow
   */
  export type OutboxEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent findFirst
   */
  export type OutboxEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findFirstOrThrow
   */
  export type OutboxEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvent to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboxEvents.
     */
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent findMany
   */
  export type OutboxEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter, which OutboxEvents to fetch.
     */
    where?: OutboxEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboxEvents to fetch.
     */
    orderBy?: OutboxEventOrderByWithRelationInput | OutboxEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboxEvents.
     */
    cursor?: OutboxEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboxEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboxEvents.
     */
    skip?: number
    distinct?: OutboxEventScalarFieldEnum | OutboxEventScalarFieldEnum[]
  }

  /**
   * OutboxEvent create
   */
  export type OutboxEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to create a OutboxEvent.
     */
    data: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
  }

  /**
   * OutboxEvent createMany
   */
  export type OutboxEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent createManyAndReturn
   */
  export type OutboxEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to create many OutboxEvents.
     */
    data: OutboxEventCreateManyInput | OutboxEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OutboxEvent update
   */
  export type OutboxEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data needed to update a OutboxEvent.
     */
    data: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
    /**
     * Choose, which OutboxEvent to update.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent updateMany
   */
  export type OutboxEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent updateManyAndReturn
   */
  export type OutboxEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The data used to update OutboxEvents.
     */
    data: XOR<OutboxEventUpdateManyMutationInput, OutboxEventUncheckedUpdateManyInput>
    /**
     * Filter which OutboxEvents to update
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to update.
     */
    limit?: number
  }

  /**
   * OutboxEvent upsert
   */
  export type OutboxEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * The filter to search for the OutboxEvent to update in case it exists.
     */
    where: OutboxEventWhereUniqueInput
    /**
     * In case the OutboxEvent found by the `where` argument doesn't exist, create a new OutboxEvent with this data.
     */
    create: XOR<OutboxEventCreateInput, OutboxEventUncheckedCreateInput>
    /**
     * In case the OutboxEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboxEventUpdateInput, OutboxEventUncheckedUpdateInput>
  }

  /**
   * OutboxEvent delete
   */
  export type OutboxEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
    /**
     * Filter which OutboxEvent to delete.
     */
    where: OutboxEventWhereUniqueInput
  }

  /**
   * OutboxEvent deleteMany
   */
  export type OutboxEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboxEvents to delete
     */
    where?: OutboxEventWhereInput
    /**
     * Limit how many OutboxEvents to delete.
     */
    limit?: number
  }

  /**
   * OutboxEvent without action
   */
  export type OutboxEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboxEvent
     */
    select?: OutboxEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboxEvent
     */
    omit?: OutboxEventOmit<ExtArgs> | null
  }


  /**
   * Model InboxMessage
   */

  export type AggregateInboxMessage = {
    _count: InboxMessageCountAggregateOutputType | null
    _min: InboxMessageMinAggregateOutputType | null
    _max: InboxMessageMaxAggregateOutputType | null
  }

  export type InboxMessageMinAggregateOutputType = {
    id: string | null
    consumerId: string | null
    messageId: string | null
    eventType: string | null
    receivedAt: Date | null
    processedAt: Date | null
  }

  export type InboxMessageMaxAggregateOutputType = {
    id: string | null
    consumerId: string | null
    messageId: string | null
    eventType: string | null
    receivedAt: Date | null
    processedAt: Date | null
  }

  export type InboxMessageCountAggregateOutputType = {
    id: number
    consumerId: number
    messageId: number
    eventType: number
    receivedAt: number
    processedAt: number
    result: number
    _all: number
  }


  export type InboxMessageMinAggregateInputType = {
    id?: true
    consumerId?: true
    messageId?: true
    eventType?: true
    receivedAt?: true
    processedAt?: true
  }

  export type InboxMessageMaxAggregateInputType = {
    id?: true
    consumerId?: true
    messageId?: true
    eventType?: true
    receivedAt?: true
    processedAt?: true
  }

  export type InboxMessageCountAggregateInputType = {
    id?: true
    consumerId?: true
    messageId?: true
    eventType?: true
    receivedAt?: true
    processedAt?: true
    result?: true
    _all?: true
  }

  export type InboxMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InboxMessage to aggregate.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InboxMessages
    **/
    _count?: true | InboxMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InboxMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InboxMessageMaxAggregateInputType
  }

  export type GetInboxMessageAggregateType<T extends InboxMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateInboxMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInboxMessage[P]>
      : GetScalarType<T[P], AggregateInboxMessage[P]>
  }




  export type InboxMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InboxMessageWhereInput
    orderBy?: InboxMessageOrderByWithAggregationInput | InboxMessageOrderByWithAggregationInput[]
    by: InboxMessageScalarFieldEnum[] | InboxMessageScalarFieldEnum
    having?: InboxMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InboxMessageCountAggregateInputType | true
    _min?: InboxMessageMinAggregateInputType
    _max?: InboxMessageMaxAggregateInputType
  }

  export type InboxMessageGroupByOutputType = {
    id: string
    consumerId: string
    messageId: string
    eventType: string
    receivedAt: Date
    processedAt: Date | null
    result: JsonValue | null
    _count: InboxMessageCountAggregateOutputType | null
    _min: InboxMessageMinAggregateOutputType | null
    _max: InboxMessageMaxAggregateOutputType | null
  }

  type GetInboxMessageGroupByPayload<T extends InboxMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InboxMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InboxMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InboxMessageGroupByOutputType[P]>
            : GetScalarType<T[P], InboxMessageGroupByOutputType[P]>
        }
      >
    >


  export type InboxMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consumerId?: boolean
    messageId?: boolean
    eventType?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    result?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consumerId?: boolean
    messageId?: boolean
    eventType?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    result?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consumerId?: boolean
    messageId?: boolean
    eventType?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    result?: boolean
  }, ExtArgs["result"]["inboxMessage"]>

  export type InboxMessageSelectScalar = {
    id?: boolean
    consumerId?: boolean
    messageId?: boolean
    eventType?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    result?: boolean
  }

  export type InboxMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consumerId" | "messageId" | "eventType" | "receivedAt" | "processedAt" | "result", ExtArgs["result"]["inboxMessage"]>

  export type $InboxMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InboxMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consumerId: string
      messageId: string
      eventType: string
      receivedAt: Date
      processedAt: Date | null
      result: Prisma.JsonValue | null
    }, ExtArgs["result"]["inboxMessage"]>
    composites: {}
  }

  type InboxMessageGetPayload<S extends boolean | null | undefined | InboxMessageDefaultArgs> = $Result.GetResult<Prisma.$InboxMessagePayload, S>

  type InboxMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InboxMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InboxMessageCountAggregateInputType | true
    }

  export interface InboxMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InboxMessage'], meta: { name: 'InboxMessage' } }
    /**
     * Find zero or one InboxMessage that matches the filter.
     * @param {InboxMessageFindUniqueArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InboxMessageFindUniqueArgs>(args: SelectSubset<T, InboxMessageFindUniqueArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InboxMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InboxMessageFindUniqueOrThrowArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InboxMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, InboxMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InboxMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindFirstArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InboxMessageFindFirstArgs>(args?: SelectSubset<T, InboxMessageFindFirstArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InboxMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindFirstOrThrowArgs} args - Arguments to find a InboxMessage
     * @example
     * // Get one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InboxMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, InboxMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InboxMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InboxMessages
     * const inboxMessages = await prisma.inboxMessage.findMany()
     * 
     * // Get first 10 InboxMessages
     * const inboxMessages = await prisma.inboxMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InboxMessageFindManyArgs>(args?: SelectSubset<T, InboxMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InboxMessage.
     * @param {InboxMessageCreateArgs} args - Arguments to create a InboxMessage.
     * @example
     * // Create one InboxMessage
     * const InboxMessage = await prisma.inboxMessage.create({
     *   data: {
     *     // ... data to create a InboxMessage
     *   }
     * })
     * 
     */
    create<T extends InboxMessageCreateArgs>(args: SelectSubset<T, InboxMessageCreateArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InboxMessages.
     * @param {InboxMessageCreateManyArgs} args - Arguments to create many InboxMessages.
     * @example
     * // Create many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InboxMessageCreateManyArgs>(args?: SelectSubset<T, InboxMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InboxMessages and returns the data saved in the database.
     * @param {InboxMessageCreateManyAndReturnArgs} args - Arguments to create many InboxMessages.
     * @example
     * // Create many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InboxMessages and only return the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InboxMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, InboxMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InboxMessage.
     * @param {InboxMessageDeleteArgs} args - Arguments to delete one InboxMessage.
     * @example
     * // Delete one InboxMessage
     * const InboxMessage = await prisma.inboxMessage.delete({
     *   where: {
     *     // ... filter to delete one InboxMessage
     *   }
     * })
     * 
     */
    delete<T extends InboxMessageDeleteArgs>(args: SelectSubset<T, InboxMessageDeleteArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InboxMessage.
     * @param {InboxMessageUpdateArgs} args - Arguments to update one InboxMessage.
     * @example
     * // Update one InboxMessage
     * const inboxMessage = await prisma.inboxMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InboxMessageUpdateArgs>(args: SelectSubset<T, InboxMessageUpdateArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InboxMessages.
     * @param {InboxMessageDeleteManyArgs} args - Arguments to filter InboxMessages to delete.
     * @example
     * // Delete a few InboxMessages
     * const { count } = await prisma.inboxMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InboxMessageDeleteManyArgs>(args?: SelectSubset<T, InboxMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InboxMessageUpdateManyArgs>(args: SelectSubset<T, InboxMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InboxMessages and returns the data updated in the database.
     * @param {InboxMessageUpdateManyAndReturnArgs} args - Arguments to update many InboxMessages.
     * @example
     * // Update many InboxMessages
     * const inboxMessage = await prisma.inboxMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InboxMessages and only return the `id`
     * const inboxMessageWithIdOnly = await prisma.inboxMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InboxMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, InboxMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InboxMessage.
     * @param {InboxMessageUpsertArgs} args - Arguments to update or create a InboxMessage.
     * @example
     * // Update or create a InboxMessage
     * const inboxMessage = await prisma.inboxMessage.upsert({
     *   create: {
     *     // ... data to create a InboxMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InboxMessage we want to update
     *   }
     * })
     */
    upsert<T extends InboxMessageUpsertArgs>(args: SelectSubset<T, InboxMessageUpsertArgs<ExtArgs>>): Prisma__InboxMessageClient<$Result.GetResult<Prisma.$InboxMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InboxMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageCountArgs} args - Arguments to filter InboxMessages to count.
     * @example
     * // Count the number of InboxMessages
     * const count = await prisma.inboxMessage.count({
     *   where: {
     *     // ... the filter for the InboxMessages we want to count
     *   }
     * })
    **/
    count<T extends InboxMessageCountArgs>(
      args?: Subset<T, InboxMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InboxMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InboxMessageAggregateArgs>(args: Subset<T, InboxMessageAggregateArgs>): Prisma.PrismaPromise<GetInboxMessageAggregateType<T>>

    /**
     * Group by InboxMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InboxMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InboxMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InboxMessageGroupByArgs['orderBy'] }
        : { orderBy?: InboxMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InboxMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInboxMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InboxMessage model
   */
  readonly fields: InboxMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InboxMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InboxMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InboxMessage model
   */
  interface InboxMessageFieldRefs {
    readonly id: FieldRef<"InboxMessage", 'String'>
    readonly consumerId: FieldRef<"InboxMessage", 'String'>
    readonly messageId: FieldRef<"InboxMessage", 'String'>
    readonly eventType: FieldRef<"InboxMessage", 'String'>
    readonly receivedAt: FieldRef<"InboxMessage", 'DateTime'>
    readonly processedAt: FieldRef<"InboxMessage", 'DateTime'>
    readonly result: FieldRef<"InboxMessage", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * InboxMessage findUnique
   */
  export type InboxMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage findUniqueOrThrow
   */
  export type InboxMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage findFirst
   */
  export type InboxMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InboxMessages.
     */
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage findFirstOrThrow
   */
  export type InboxMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessage to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InboxMessages.
     */
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage findMany
   */
  export type InboxMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter, which InboxMessages to fetch.
     */
    where?: InboxMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InboxMessages to fetch.
     */
    orderBy?: InboxMessageOrderByWithRelationInput | InboxMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InboxMessages.
     */
    cursor?: InboxMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InboxMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InboxMessages.
     */
    skip?: number
    distinct?: InboxMessageScalarFieldEnum | InboxMessageScalarFieldEnum[]
  }

  /**
   * InboxMessage create
   */
  export type InboxMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a InboxMessage.
     */
    data: XOR<InboxMessageCreateInput, InboxMessageUncheckedCreateInput>
  }

  /**
   * InboxMessage createMany
   */
  export type InboxMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InboxMessages.
     */
    data: InboxMessageCreateManyInput | InboxMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InboxMessage createManyAndReturn
   */
  export type InboxMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data used to create many InboxMessages.
     */
    data: InboxMessageCreateManyInput | InboxMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InboxMessage update
   */
  export type InboxMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a InboxMessage.
     */
    data: XOR<InboxMessageUpdateInput, InboxMessageUncheckedUpdateInput>
    /**
     * Choose, which InboxMessage to update.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage updateMany
   */
  export type InboxMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InboxMessages.
     */
    data: XOR<InboxMessageUpdateManyMutationInput, InboxMessageUncheckedUpdateManyInput>
    /**
     * Filter which InboxMessages to update
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to update.
     */
    limit?: number
  }

  /**
   * InboxMessage updateManyAndReturn
   */
  export type InboxMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The data used to update InboxMessages.
     */
    data: XOR<InboxMessageUpdateManyMutationInput, InboxMessageUncheckedUpdateManyInput>
    /**
     * Filter which InboxMessages to update
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to update.
     */
    limit?: number
  }

  /**
   * InboxMessage upsert
   */
  export type InboxMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the InboxMessage to update in case it exists.
     */
    where: InboxMessageWhereUniqueInput
    /**
     * In case the InboxMessage found by the `where` argument doesn't exist, create a new InboxMessage with this data.
     */
    create: XOR<InboxMessageCreateInput, InboxMessageUncheckedCreateInput>
    /**
     * In case the InboxMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InboxMessageUpdateInput, InboxMessageUncheckedUpdateInput>
  }

  /**
   * InboxMessage delete
   */
  export type InboxMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
    /**
     * Filter which InboxMessage to delete.
     */
    where: InboxMessageWhereUniqueInput
  }

  /**
   * InboxMessage deleteMany
   */
  export type InboxMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InboxMessages to delete
     */
    where?: InboxMessageWhereInput
    /**
     * Limit how many InboxMessages to delete.
     */
    limit?: number
  }

  /**
   * InboxMessage without action
   */
  export type InboxMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InboxMessage
     */
    select?: InboxMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InboxMessage
     */
    omit?: InboxMessageOmit<ExtArgs> | null
  }


  /**
   * Model IdempotencyRecord
   */

  export type AggregateIdempotencyRecord = {
    _count: IdempotencyRecordCountAggregateOutputType | null
    _avg: IdempotencyRecordAvgAggregateOutputType | null
    _sum: IdempotencyRecordSumAggregateOutputType | null
    _min: IdempotencyRecordMinAggregateOutputType | null
    _max: IdempotencyRecordMaxAggregateOutputType | null
  }

  export type IdempotencyRecordAvgAggregateOutputType = {
    responseStatus: number | null
  }

  export type IdempotencyRecordSumAggregateOutputType = {
    responseStatus: number | null
  }

  export type IdempotencyRecordMinAggregateOutputType = {
    id: string | null
    concessionId: string | null
    idempotencyKey: string | null
    requestHash: string | null
    responseStatus: number | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type IdempotencyRecordMaxAggregateOutputType = {
    id: string | null
    concessionId: string | null
    idempotencyKey: string | null
    requestHash: string | null
    responseStatus: number | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type IdempotencyRecordCountAggregateOutputType = {
    id: number
    concessionId: number
    idempotencyKey: number
    requestHash: number
    responseStatus: number
    responseBody: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type IdempotencyRecordAvgAggregateInputType = {
    responseStatus?: true
  }

  export type IdempotencyRecordSumAggregateInputType = {
    responseStatus?: true
  }

  export type IdempotencyRecordMinAggregateInputType = {
    id?: true
    concessionId?: true
    idempotencyKey?: true
    requestHash?: true
    responseStatus?: true
    createdAt?: true
    expiresAt?: true
  }

  export type IdempotencyRecordMaxAggregateInputType = {
    id?: true
    concessionId?: true
    idempotencyKey?: true
    requestHash?: true
    responseStatus?: true
    createdAt?: true
    expiresAt?: true
  }

  export type IdempotencyRecordCountAggregateInputType = {
    id?: true
    concessionId?: true
    idempotencyKey?: true
    requestHash?: true
    responseStatus?: true
    responseBody?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type IdempotencyRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IdempotencyRecord to aggregate.
     */
    where?: IdempotencyRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdempotencyRecords to fetch.
     */
    orderBy?: IdempotencyRecordOrderByWithRelationInput | IdempotencyRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IdempotencyRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdempotencyRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdempotencyRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IdempotencyRecords
    **/
    _count?: true | IdempotencyRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IdempotencyRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IdempotencyRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IdempotencyRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IdempotencyRecordMaxAggregateInputType
  }

  export type GetIdempotencyRecordAggregateType<T extends IdempotencyRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateIdempotencyRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIdempotencyRecord[P]>
      : GetScalarType<T[P], AggregateIdempotencyRecord[P]>
  }




  export type IdempotencyRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IdempotencyRecordWhereInput
    orderBy?: IdempotencyRecordOrderByWithAggregationInput | IdempotencyRecordOrderByWithAggregationInput[]
    by: IdempotencyRecordScalarFieldEnum[] | IdempotencyRecordScalarFieldEnum
    having?: IdempotencyRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IdempotencyRecordCountAggregateInputType | true
    _avg?: IdempotencyRecordAvgAggregateInputType
    _sum?: IdempotencyRecordSumAggregateInputType
    _min?: IdempotencyRecordMinAggregateInputType
    _max?: IdempotencyRecordMaxAggregateInputType
  }

  export type IdempotencyRecordGroupByOutputType = {
    id: string
    concessionId: string
    idempotencyKey: string
    requestHash: string
    responseStatus: number | null
    responseBody: JsonValue | null
    createdAt: Date
    expiresAt: Date
    _count: IdempotencyRecordCountAggregateOutputType | null
    _avg: IdempotencyRecordAvgAggregateOutputType | null
    _sum: IdempotencyRecordSumAggregateOutputType | null
    _min: IdempotencyRecordMinAggregateOutputType | null
    _max: IdempotencyRecordMaxAggregateOutputType | null
  }

  type GetIdempotencyRecordGroupByPayload<T extends IdempotencyRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IdempotencyRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IdempotencyRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IdempotencyRecordGroupByOutputType[P]>
            : GetScalarType<T[P], IdempotencyRecordGroupByOutputType[P]>
        }
      >
    >


  export type IdempotencyRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    idempotencyKey?: boolean
    requestHash?: boolean
    responseStatus?: boolean
    responseBody?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["idempotencyRecord"]>

  export type IdempotencyRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    idempotencyKey?: boolean
    requestHash?: boolean
    responseStatus?: boolean
    responseBody?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["idempotencyRecord"]>

  export type IdempotencyRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    idempotencyKey?: boolean
    requestHash?: boolean
    responseStatus?: boolean
    responseBody?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["idempotencyRecord"]>

  export type IdempotencyRecordSelectScalar = {
    id?: boolean
    concessionId?: boolean
    idempotencyKey?: boolean
    requestHash?: boolean
    responseStatus?: boolean
    responseBody?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type IdempotencyRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concessionId" | "idempotencyKey" | "requestHash" | "responseStatus" | "responseBody" | "createdAt" | "expiresAt", ExtArgs["result"]["idempotencyRecord"]>

  export type $IdempotencyRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IdempotencyRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concessionId: string
      idempotencyKey: string
      requestHash: string
      responseStatus: number | null
      responseBody: Prisma.JsonValue | null
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["idempotencyRecord"]>
    composites: {}
  }

  type IdempotencyRecordGetPayload<S extends boolean | null | undefined | IdempotencyRecordDefaultArgs> = $Result.GetResult<Prisma.$IdempotencyRecordPayload, S>

  type IdempotencyRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IdempotencyRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IdempotencyRecordCountAggregateInputType | true
    }

  export interface IdempotencyRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IdempotencyRecord'], meta: { name: 'IdempotencyRecord' } }
    /**
     * Find zero or one IdempotencyRecord that matches the filter.
     * @param {IdempotencyRecordFindUniqueArgs} args - Arguments to find a IdempotencyRecord
     * @example
     * // Get one IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IdempotencyRecordFindUniqueArgs>(args: SelectSubset<T, IdempotencyRecordFindUniqueArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IdempotencyRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IdempotencyRecordFindUniqueOrThrowArgs} args - Arguments to find a IdempotencyRecord
     * @example
     * // Get one IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IdempotencyRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, IdempotencyRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IdempotencyRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordFindFirstArgs} args - Arguments to find a IdempotencyRecord
     * @example
     * // Get one IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IdempotencyRecordFindFirstArgs>(args?: SelectSubset<T, IdempotencyRecordFindFirstArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IdempotencyRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordFindFirstOrThrowArgs} args - Arguments to find a IdempotencyRecord
     * @example
     * // Get one IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IdempotencyRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, IdempotencyRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IdempotencyRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IdempotencyRecords
     * const idempotencyRecords = await prisma.idempotencyRecord.findMany()
     * 
     * // Get first 10 IdempotencyRecords
     * const idempotencyRecords = await prisma.idempotencyRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const idempotencyRecordWithIdOnly = await prisma.idempotencyRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IdempotencyRecordFindManyArgs>(args?: SelectSubset<T, IdempotencyRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IdempotencyRecord.
     * @param {IdempotencyRecordCreateArgs} args - Arguments to create a IdempotencyRecord.
     * @example
     * // Create one IdempotencyRecord
     * const IdempotencyRecord = await prisma.idempotencyRecord.create({
     *   data: {
     *     // ... data to create a IdempotencyRecord
     *   }
     * })
     * 
     */
    create<T extends IdempotencyRecordCreateArgs>(args: SelectSubset<T, IdempotencyRecordCreateArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IdempotencyRecords.
     * @param {IdempotencyRecordCreateManyArgs} args - Arguments to create many IdempotencyRecords.
     * @example
     * // Create many IdempotencyRecords
     * const idempotencyRecord = await prisma.idempotencyRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IdempotencyRecordCreateManyArgs>(args?: SelectSubset<T, IdempotencyRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IdempotencyRecords and returns the data saved in the database.
     * @param {IdempotencyRecordCreateManyAndReturnArgs} args - Arguments to create many IdempotencyRecords.
     * @example
     * // Create many IdempotencyRecords
     * const idempotencyRecord = await prisma.idempotencyRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IdempotencyRecords and only return the `id`
     * const idempotencyRecordWithIdOnly = await prisma.idempotencyRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IdempotencyRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, IdempotencyRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IdempotencyRecord.
     * @param {IdempotencyRecordDeleteArgs} args - Arguments to delete one IdempotencyRecord.
     * @example
     * // Delete one IdempotencyRecord
     * const IdempotencyRecord = await prisma.idempotencyRecord.delete({
     *   where: {
     *     // ... filter to delete one IdempotencyRecord
     *   }
     * })
     * 
     */
    delete<T extends IdempotencyRecordDeleteArgs>(args: SelectSubset<T, IdempotencyRecordDeleteArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IdempotencyRecord.
     * @param {IdempotencyRecordUpdateArgs} args - Arguments to update one IdempotencyRecord.
     * @example
     * // Update one IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IdempotencyRecordUpdateArgs>(args: SelectSubset<T, IdempotencyRecordUpdateArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IdempotencyRecords.
     * @param {IdempotencyRecordDeleteManyArgs} args - Arguments to filter IdempotencyRecords to delete.
     * @example
     * // Delete a few IdempotencyRecords
     * const { count } = await prisma.idempotencyRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IdempotencyRecordDeleteManyArgs>(args?: SelectSubset<T, IdempotencyRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IdempotencyRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IdempotencyRecords
     * const idempotencyRecord = await prisma.idempotencyRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IdempotencyRecordUpdateManyArgs>(args: SelectSubset<T, IdempotencyRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IdempotencyRecords and returns the data updated in the database.
     * @param {IdempotencyRecordUpdateManyAndReturnArgs} args - Arguments to update many IdempotencyRecords.
     * @example
     * // Update many IdempotencyRecords
     * const idempotencyRecord = await prisma.idempotencyRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IdempotencyRecords and only return the `id`
     * const idempotencyRecordWithIdOnly = await prisma.idempotencyRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IdempotencyRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, IdempotencyRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IdempotencyRecord.
     * @param {IdempotencyRecordUpsertArgs} args - Arguments to update or create a IdempotencyRecord.
     * @example
     * // Update or create a IdempotencyRecord
     * const idempotencyRecord = await prisma.idempotencyRecord.upsert({
     *   create: {
     *     // ... data to create a IdempotencyRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IdempotencyRecord we want to update
     *   }
     * })
     */
    upsert<T extends IdempotencyRecordUpsertArgs>(args: SelectSubset<T, IdempotencyRecordUpsertArgs<ExtArgs>>): Prisma__IdempotencyRecordClient<$Result.GetResult<Prisma.$IdempotencyRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IdempotencyRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordCountArgs} args - Arguments to filter IdempotencyRecords to count.
     * @example
     * // Count the number of IdempotencyRecords
     * const count = await prisma.idempotencyRecord.count({
     *   where: {
     *     // ... the filter for the IdempotencyRecords we want to count
     *   }
     * })
    **/
    count<T extends IdempotencyRecordCountArgs>(
      args?: Subset<T, IdempotencyRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IdempotencyRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IdempotencyRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IdempotencyRecordAggregateArgs>(args: Subset<T, IdempotencyRecordAggregateArgs>): Prisma.PrismaPromise<GetIdempotencyRecordAggregateType<T>>

    /**
     * Group by IdempotencyRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IdempotencyRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IdempotencyRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IdempotencyRecordGroupByArgs['orderBy'] }
        : { orderBy?: IdempotencyRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IdempotencyRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdempotencyRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IdempotencyRecord model
   */
  readonly fields: IdempotencyRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IdempotencyRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IdempotencyRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IdempotencyRecord model
   */
  interface IdempotencyRecordFieldRefs {
    readonly id: FieldRef<"IdempotencyRecord", 'String'>
    readonly concessionId: FieldRef<"IdempotencyRecord", 'String'>
    readonly idempotencyKey: FieldRef<"IdempotencyRecord", 'String'>
    readonly requestHash: FieldRef<"IdempotencyRecord", 'String'>
    readonly responseStatus: FieldRef<"IdempotencyRecord", 'Int'>
    readonly responseBody: FieldRef<"IdempotencyRecord", 'Json'>
    readonly createdAt: FieldRef<"IdempotencyRecord", 'DateTime'>
    readonly expiresAt: FieldRef<"IdempotencyRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IdempotencyRecord findUnique
   */
  export type IdempotencyRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter, which IdempotencyRecord to fetch.
     */
    where: IdempotencyRecordWhereUniqueInput
  }

  /**
   * IdempotencyRecord findUniqueOrThrow
   */
  export type IdempotencyRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter, which IdempotencyRecord to fetch.
     */
    where: IdempotencyRecordWhereUniqueInput
  }

  /**
   * IdempotencyRecord findFirst
   */
  export type IdempotencyRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter, which IdempotencyRecord to fetch.
     */
    where?: IdempotencyRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdempotencyRecords to fetch.
     */
    orderBy?: IdempotencyRecordOrderByWithRelationInput | IdempotencyRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IdempotencyRecords.
     */
    cursor?: IdempotencyRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdempotencyRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdempotencyRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IdempotencyRecords.
     */
    distinct?: IdempotencyRecordScalarFieldEnum | IdempotencyRecordScalarFieldEnum[]
  }

  /**
   * IdempotencyRecord findFirstOrThrow
   */
  export type IdempotencyRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter, which IdempotencyRecord to fetch.
     */
    where?: IdempotencyRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdempotencyRecords to fetch.
     */
    orderBy?: IdempotencyRecordOrderByWithRelationInput | IdempotencyRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IdempotencyRecords.
     */
    cursor?: IdempotencyRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdempotencyRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdempotencyRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IdempotencyRecords.
     */
    distinct?: IdempotencyRecordScalarFieldEnum | IdempotencyRecordScalarFieldEnum[]
  }

  /**
   * IdempotencyRecord findMany
   */
  export type IdempotencyRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter, which IdempotencyRecords to fetch.
     */
    where?: IdempotencyRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IdempotencyRecords to fetch.
     */
    orderBy?: IdempotencyRecordOrderByWithRelationInput | IdempotencyRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IdempotencyRecords.
     */
    cursor?: IdempotencyRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IdempotencyRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IdempotencyRecords.
     */
    skip?: number
    distinct?: IdempotencyRecordScalarFieldEnum | IdempotencyRecordScalarFieldEnum[]
  }

  /**
   * IdempotencyRecord create
   */
  export type IdempotencyRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a IdempotencyRecord.
     */
    data: XOR<IdempotencyRecordCreateInput, IdempotencyRecordUncheckedCreateInput>
  }

  /**
   * IdempotencyRecord createMany
   */
  export type IdempotencyRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IdempotencyRecords.
     */
    data: IdempotencyRecordCreateManyInput | IdempotencyRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IdempotencyRecord createManyAndReturn
   */
  export type IdempotencyRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * The data used to create many IdempotencyRecords.
     */
    data: IdempotencyRecordCreateManyInput | IdempotencyRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IdempotencyRecord update
   */
  export type IdempotencyRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a IdempotencyRecord.
     */
    data: XOR<IdempotencyRecordUpdateInput, IdempotencyRecordUncheckedUpdateInput>
    /**
     * Choose, which IdempotencyRecord to update.
     */
    where: IdempotencyRecordWhereUniqueInput
  }

  /**
   * IdempotencyRecord updateMany
   */
  export type IdempotencyRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IdempotencyRecords.
     */
    data: XOR<IdempotencyRecordUpdateManyMutationInput, IdempotencyRecordUncheckedUpdateManyInput>
    /**
     * Filter which IdempotencyRecords to update
     */
    where?: IdempotencyRecordWhereInput
    /**
     * Limit how many IdempotencyRecords to update.
     */
    limit?: number
  }

  /**
   * IdempotencyRecord updateManyAndReturn
   */
  export type IdempotencyRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * The data used to update IdempotencyRecords.
     */
    data: XOR<IdempotencyRecordUpdateManyMutationInput, IdempotencyRecordUncheckedUpdateManyInput>
    /**
     * Filter which IdempotencyRecords to update
     */
    where?: IdempotencyRecordWhereInput
    /**
     * Limit how many IdempotencyRecords to update.
     */
    limit?: number
  }

  /**
   * IdempotencyRecord upsert
   */
  export type IdempotencyRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the IdempotencyRecord to update in case it exists.
     */
    where: IdempotencyRecordWhereUniqueInput
    /**
     * In case the IdempotencyRecord found by the `where` argument doesn't exist, create a new IdempotencyRecord with this data.
     */
    create: XOR<IdempotencyRecordCreateInput, IdempotencyRecordUncheckedCreateInput>
    /**
     * In case the IdempotencyRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IdempotencyRecordUpdateInput, IdempotencyRecordUncheckedUpdateInput>
  }

  /**
   * IdempotencyRecord delete
   */
  export type IdempotencyRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
    /**
     * Filter which IdempotencyRecord to delete.
     */
    where: IdempotencyRecordWhereUniqueInput
  }

  /**
   * IdempotencyRecord deleteMany
   */
  export type IdempotencyRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IdempotencyRecords to delete
     */
    where?: IdempotencyRecordWhereInput
    /**
     * Limit how many IdempotencyRecords to delete.
     */
    limit?: number
  }

  /**
   * IdempotencyRecord without action
   */
  export type IdempotencyRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IdempotencyRecord
     */
    select?: IdempotencyRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IdempotencyRecord
     */
    omit?: IdempotencyRecordOmit<ExtArgs> | null
  }


  /**
   * Model AuditRecord
   */

  export type AggregateAuditRecord = {
    _count: AuditRecordCountAggregateOutputType | null
    _min: AuditRecordMinAggregateOutputType | null
    _max: AuditRecordMaxAggregateOutputType | null
  }

  export type AuditRecordMinAggregateOutputType = {
    id: string | null
    occurredAt: Date | null
    actorId: string | null
    actorType: string | null
    concessionId: string | null
    assemblyId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    requestId: string | null
    sourceIp: string | null
    outcome: string | null
  }

  export type AuditRecordMaxAggregateOutputType = {
    id: string | null
    occurredAt: Date | null
    actorId: string | null
    actorType: string | null
    concessionId: string | null
    assemblyId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    requestId: string | null
    sourceIp: string | null
    outcome: string | null
  }

  export type AuditRecordCountAggregateOutputType = {
    id: number
    occurredAt: number
    actorId: number
    actorType: number
    concessionId: number
    assemblyId: number
    action: number
    resourceType: number
    resourceId: number
    requestId: number
    sourceIp: number
    outcome: number
    metadata: number
    _all: number
  }


  export type AuditRecordMinAggregateInputType = {
    id?: true
    occurredAt?: true
    actorId?: true
    actorType?: true
    concessionId?: true
    assemblyId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    requestId?: true
    sourceIp?: true
    outcome?: true
  }

  export type AuditRecordMaxAggregateInputType = {
    id?: true
    occurredAt?: true
    actorId?: true
    actorType?: true
    concessionId?: true
    assemblyId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    requestId?: true
    sourceIp?: true
    outcome?: true
  }

  export type AuditRecordCountAggregateInputType = {
    id?: true
    occurredAt?: true
    actorId?: true
    actorType?: true
    concessionId?: true
    assemblyId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    requestId?: true
    sourceIp?: true
    outcome?: true
    metadata?: true
    _all?: true
  }

  export type AuditRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditRecord to aggregate.
     */
    where?: AuditRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditRecords to fetch.
     */
    orderBy?: AuditRecordOrderByWithRelationInput | AuditRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditRecords
    **/
    _count?: true | AuditRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditRecordMaxAggregateInputType
  }

  export type GetAuditRecordAggregateType<T extends AuditRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditRecord[P]>
      : GetScalarType<T[P], AggregateAuditRecord[P]>
  }




  export type AuditRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditRecordWhereInput
    orderBy?: AuditRecordOrderByWithAggregationInput | AuditRecordOrderByWithAggregationInput[]
    by: AuditRecordScalarFieldEnum[] | AuditRecordScalarFieldEnum
    having?: AuditRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditRecordCountAggregateInputType | true
    _min?: AuditRecordMinAggregateInputType
    _max?: AuditRecordMaxAggregateInputType
  }

  export type AuditRecordGroupByOutputType = {
    id: string
    occurredAt: Date
    actorId: string
    actorType: string
    concessionId: string | null
    assemblyId: string | null
    action: string
    resourceType: string
    resourceId: string | null
    requestId: string
    sourceIp: string | null
    outcome: string
    metadata: JsonValue
    _count: AuditRecordCountAggregateOutputType | null
    _min: AuditRecordMinAggregateOutputType | null
    _max: AuditRecordMaxAggregateOutputType | null
  }

  type GetAuditRecordGroupByPayload<T extends AuditRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AuditRecordGroupByOutputType[P]>
        }
      >
    >


  export type AuditRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    occurredAt?: boolean
    actorId?: boolean
    actorType?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    requestId?: boolean
    sourceIp?: boolean
    outcome?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["auditRecord"]>

  export type AuditRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    occurredAt?: boolean
    actorId?: boolean
    actorType?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    requestId?: boolean
    sourceIp?: boolean
    outcome?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["auditRecord"]>

  export type AuditRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    occurredAt?: boolean
    actorId?: boolean
    actorType?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    requestId?: boolean
    sourceIp?: boolean
    outcome?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["auditRecord"]>

  export type AuditRecordSelectScalar = {
    id?: boolean
    occurredAt?: boolean
    actorId?: boolean
    actorType?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    requestId?: boolean
    sourceIp?: boolean
    outcome?: boolean
    metadata?: boolean
  }

  export type AuditRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "occurredAt" | "actorId" | "actorType" | "concessionId" | "assemblyId" | "action" | "resourceType" | "resourceId" | "requestId" | "sourceIp" | "outcome" | "metadata", ExtArgs["result"]["auditRecord"]>

  export type $AuditRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      occurredAt: Date
      actorId: string
      actorType: string
      concessionId: string | null
      assemblyId: string | null
      action: string
      resourceType: string
      resourceId: string | null
      requestId: string
      sourceIp: string | null
      outcome: string
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["auditRecord"]>
    composites: {}
  }

  type AuditRecordGetPayload<S extends boolean | null | undefined | AuditRecordDefaultArgs> = $Result.GetResult<Prisma.$AuditRecordPayload, S>

  type AuditRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditRecordCountAggregateInputType | true
    }

  export interface AuditRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditRecord'], meta: { name: 'AuditRecord' } }
    /**
     * Find zero or one AuditRecord that matches the filter.
     * @param {AuditRecordFindUniqueArgs} args - Arguments to find a AuditRecord
     * @example
     * // Get one AuditRecord
     * const auditRecord = await prisma.auditRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditRecordFindUniqueArgs>(args: SelectSubset<T, AuditRecordFindUniqueArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditRecordFindUniqueOrThrowArgs} args - Arguments to find a AuditRecord
     * @example
     * // Get one AuditRecord
     * const auditRecord = await prisma.auditRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordFindFirstArgs} args - Arguments to find a AuditRecord
     * @example
     * // Get one AuditRecord
     * const auditRecord = await prisma.auditRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditRecordFindFirstArgs>(args?: SelectSubset<T, AuditRecordFindFirstArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordFindFirstOrThrowArgs} args - Arguments to find a AuditRecord
     * @example
     * // Get one AuditRecord
     * const auditRecord = await prisma.auditRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditRecords
     * const auditRecords = await prisma.auditRecord.findMany()
     * 
     * // Get first 10 AuditRecords
     * const auditRecords = await prisma.auditRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditRecordWithIdOnly = await prisma.auditRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditRecordFindManyArgs>(args?: SelectSubset<T, AuditRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditRecord.
     * @param {AuditRecordCreateArgs} args - Arguments to create a AuditRecord.
     * @example
     * // Create one AuditRecord
     * const AuditRecord = await prisma.auditRecord.create({
     *   data: {
     *     // ... data to create a AuditRecord
     *   }
     * })
     * 
     */
    create<T extends AuditRecordCreateArgs>(args: SelectSubset<T, AuditRecordCreateArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditRecords.
     * @param {AuditRecordCreateManyArgs} args - Arguments to create many AuditRecords.
     * @example
     * // Create many AuditRecords
     * const auditRecord = await prisma.auditRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditRecordCreateManyArgs>(args?: SelectSubset<T, AuditRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditRecords and returns the data saved in the database.
     * @param {AuditRecordCreateManyAndReturnArgs} args - Arguments to create many AuditRecords.
     * @example
     * // Create many AuditRecords
     * const auditRecord = await prisma.auditRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditRecords and only return the `id`
     * const auditRecordWithIdOnly = await prisma.auditRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditRecord.
     * @param {AuditRecordDeleteArgs} args - Arguments to delete one AuditRecord.
     * @example
     * // Delete one AuditRecord
     * const AuditRecord = await prisma.auditRecord.delete({
     *   where: {
     *     // ... filter to delete one AuditRecord
     *   }
     * })
     * 
     */
    delete<T extends AuditRecordDeleteArgs>(args: SelectSubset<T, AuditRecordDeleteArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditRecord.
     * @param {AuditRecordUpdateArgs} args - Arguments to update one AuditRecord.
     * @example
     * // Update one AuditRecord
     * const auditRecord = await prisma.auditRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditRecordUpdateArgs>(args: SelectSubset<T, AuditRecordUpdateArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditRecords.
     * @param {AuditRecordDeleteManyArgs} args - Arguments to filter AuditRecords to delete.
     * @example
     * // Delete a few AuditRecords
     * const { count } = await prisma.auditRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditRecordDeleteManyArgs>(args?: SelectSubset<T, AuditRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditRecords
     * const auditRecord = await prisma.auditRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditRecordUpdateManyArgs>(args: SelectSubset<T, AuditRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditRecords and returns the data updated in the database.
     * @param {AuditRecordUpdateManyAndReturnArgs} args - Arguments to update many AuditRecords.
     * @example
     * // Update many AuditRecords
     * const auditRecord = await prisma.auditRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditRecords and only return the `id`
     * const auditRecordWithIdOnly = await prisma.auditRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditRecord.
     * @param {AuditRecordUpsertArgs} args - Arguments to update or create a AuditRecord.
     * @example
     * // Update or create a AuditRecord
     * const auditRecord = await prisma.auditRecord.upsert({
     *   create: {
     *     // ... data to create a AuditRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditRecord we want to update
     *   }
     * })
     */
    upsert<T extends AuditRecordUpsertArgs>(args: SelectSubset<T, AuditRecordUpsertArgs<ExtArgs>>): Prisma__AuditRecordClient<$Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordCountArgs} args - Arguments to filter AuditRecords to count.
     * @example
     * // Count the number of AuditRecords
     * const count = await prisma.auditRecord.count({
     *   where: {
     *     // ... the filter for the AuditRecords we want to count
     *   }
     * })
    **/
    count<T extends AuditRecordCountArgs>(
      args?: Subset<T, AuditRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditRecordAggregateArgs>(args: Subset<T, AuditRecordAggregateArgs>): Prisma.PrismaPromise<GetAuditRecordAggregateType<T>>

    /**
     * Group by AuditRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditRecordGroupByArgs['orderBy'] }
        : { orderBy?: AuditRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditRecord model
   */
  readonly fields: AuditRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditRecord model
   */
  interface AuditRecordFieldRefs {
    readonly id: FieldRef<"AuditRecord", 'String'>
    readonly occurredAt: FieldRef<"AuditRecord", 'DateTime'>
    readonly actorId: FieldRef<"AuditRecord", 'String'>
    readonly actorType: FieldRef<"AuditRecord", 'String'>
    readonly concessionId: FieldRef<"AuditRecord", 'String'>
    readonly assemblyId: FieldRef<"AuditRecord", 'String'>
    readonly action: FieldRef<"AuditRecord", 'String'>
    readonly resourceType: FieldRef<"AuditRecord", 'String'>
    readonly resourceId: FieldRef<"AuditRecord", 'String'>
    readonly requestId: FieldRef<"AuditRecord", 'String'>
    readonly sourceIp: FieldRef<"AuditRecord", 'String'>
    readonly outcome: FieldRef<"AuditRecord", 'String'>
    readonly metadata: FieldRef<"AuditRecord", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AuditRecord findUnique
   */
  export type AuditRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter, which AuditRecord to fetch.
     */
    where: AuditRecordWhereUniqueInput
  }

  /**
   * AuditRecord findUniqueOrThrow
   */
  export type AuditRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter, which AuditRecord to fetch.
     */
    where: AuditRecordWhereUniqueInput
  }

  /**
   * AuditRecord findFirst
   */
  export type AuditRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter, which AuditRecord to fetch.
     */
    where?: AuditRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditRecords to fetch.
     */
    orderBy?: AuditRecordOrderByWithRelationInput | AuditRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditRecords.
     */
    cursor?: AuditRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditRecords.
     */
    distinct?: AuditRecordScalarFieldEnum | AuditRecordScalarFieldEnum[]
  }

  /**
   * AuditRecord findFirstOrThrow
   */
  export type AuditRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter, which AuditRecord to fetch.
     */
    where?: AuditRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditRecords to fetch.
     */
    orderBy?: AuditRecordOrderByWithRelationInput | AuditRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditRecords.
     */
    cursor?: AuditRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditRecords.
     */
    distinct?: AuditRecordScalarFieldEnum | AuditRecordScalarFieldEnum[]
  }

  /**
   * AuditRecord findMany
   */
  export type AuditRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter, which AuditRecords to fetch.
     */
    where?: AuditRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditRecords to fetch.
     */
    orderBy?: AuditRecordOrderByWithRelationInput | AuditRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditRecords.
     */
    cursor?: AuditRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditRecords.
     */
    skip?: number
    distinct?: AuditRecordScalarFieldEnum | AuditRecordScalarFieldEnum[]
  }

  /**
   * AuditRecord create
   */
  export type AuditRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditRecord.
     */
    data: XOR<AuditRecordCreateInput, AuditRecordUncheckedCreateInput>
  }

  /**
   * AuditRecord createMany
   */
  export type AuditRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditRecords.
     */
    data: AuditRecordCreateManyInput | AuditRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditRecord createManyAndReturn
   */
  export type AuditRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AuditRecords.
     */
    data: AuditRecordCreateManyInput | AuditRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditRecord update
   */
  export type AuditRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditRecord.
     */
    data: XOR<AuditRecordUpdateInput, AuditRecordUncheckedUpdateInput>
    /**
     * Choose, which AuditRecord to update.
     */
    where: AuditRecordWhereUniqueInput
  }

  /**
   * AuditRecord updateMany
   */
  export type AuditRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditRecords.
     */
    data: XOR<AuditRecordUpdateManyMutationInput, AuditRecordUncheckedUpdateManyInput>
    /**
     * Filter which AuditRecords to update
     */
    where?: AuditRecordWhereInput
    /**
     * Limit how many AuditRecords to update.
     */
    limit?: number
  }

  /**
   * AuditRecord updateManyAndReturn
   */
  export type AuditRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * The data used to update AuditRecords.
     */
    data: XOR<AuditRecordUpdateManyMutationInput, AuditRecordUncheckedUpdateManyInput>
    /**
     * Filter which AuditRecords to update
     */
    where?: AuditRecordWhereInput
    /**
     * Limit how many AuditRecords to update.
     */
    limit?: number
  }

  /**
   * AuditRecord upsert
   */
  export type AuditRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditRecord to update in case it exists.
     */
    where: AuditRecordWhereUniqueInput
    /**
     * In case the AuditRecord found by the `where` argument doesn't exist, create a new AuditRecord with this data.
     */
    create: XOR<AuditRecordCreateInput, AuditRecordUncheckedCreateInput>
    /**
     * In case the AuditRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditRecordUpdateInput, AuditRecordUncheckedUpdateInput>
  }

  /**
   * AuditRecord delete
   */
  export type AuditRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
    /**
     * Filter which AuditRecord to delete.
     */
    where: AuditRecordWhereUniqueInput
  }

  /**
   * AuditRecord deleteMany
   */
  export type AuditRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditRecords to delete
     */
    where?: AuditRecordWhereInput
    /**
     * Limit how many AuditRecords to delete.
     */
    limit?: number
  }

  /**
   * AuditRecord without action
   */
  export type AuditRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditRecord
     */
    select?: AuditRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditRecord
     */
    omit?: AuditRecordOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ReconciliationRunScalarFieldEnum: {
    id: 'id',
    concessionId: 'concessionId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    status: 'status',
    totalReportedMinor: 'totalReportedMinor',
    totalEvidenceMinor: 'totalEvidenceMinor',
    totalSettledMinor: 'totalSettledMinor',
    matchedCount: 'matchedCount',
    unmatchedCount: 'unmatchedCount',
    createdAt: 'createdAt'
  };

  export type ReconciliationRunScalarFieldEnum = (typeof ReconciliationRunScalarFieldEnum)[keyof typeof ReconciliationRunScalarFieldEnum]


  export const ReconciliationExceptionScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    concessionId: 'concessionId',
    severity: 'severity',
    status: 'status',
    reportedRef: 'reportedRef',
    evidenceRef: 'evidenceRef',
    varianceMinor: 'varianceMinor',
    reasonCode: 'reasonCode',
    assignedOwner: 'assignedOwner',
    makerId: 'makerId',
    checkerId: 'checkerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReconciliationExceptionScalarFieldEnum = (typeof ReconciliationExceptionScalarFieldEnum)[keyof typeof ReconciliationExceptionScalarFieldEnum]


  export const OutboxEventScalarFieldEnum: {
    id: 'id',
    eventType: 'eventType',
    eventVersion: 'eventVersion',
    aggregateType: 'aggregateType',
    aggregateId: 'aggregateId',
    aggregateVersion: 'aggregateVersion',
    routingKey: 'routingKey',
    payload: 'payload',
    headers: 'headers',
    occurredAt: 'occurredAt',
    publishedAt: 'publishedAt',
    attempts: 'attempts',
    nextAttemptAt: 'nextAttemptAt',
    lockedAt: 'lockedAt',
    lastError: 'lastError'
  };

  export type OutboxEventScalarFieldEnum = (typeof OutboxEventScalarFieldEnum)[keyof typeof OutboxEventScalarFieldEnum]


  export const InboxMessageScalarFieldEnum: {
    id: 'id',
    consumerId: 'consumerId',
    messageId: 'messageId',
    eventType: 'eventType',
    receivedAt: 'receivedAt',
    processedAt: 'processedAt',
    result: 'result'
  };

  export type InboxMessageScalarFieldEnum = (typeof InboxMessageScalarFieldEnum)[keyof typeof InboxMessageScalarFieldEnum]


  export const IdempotencyRecordScalarFieldEnum: {
    id: 'id',
    concessionId: 'concessionId',
    idempotencyKey: 'idempotencyKey',
    requestHash: 'requestHash',
    responseStatus: 'responseStatus',
    responseBody: 'responseBody',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type IdempotencyRecordScalarFieldEnum = (typeof IdempotencyRecordScalarFieldEnum)[keyof typeof IdempotencyRecordScalarFieldEnum]


  export const AuditRecordScalarFieldEnum: {
    id: 'id',
    occurredAt: 'occurredAt',
    actorId: 'actorId',
    actorType: 'actorType',
    concessionId: 'concessionId',
    assemblyId: 'assemblyId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    requestId: 'requestId',
    sourceIp: 'sourceIp',
    outcome: 'outcome',
    metadata: 'metadata'
  };

  export type AuditRecordScalarFieldEnum = (typeof AuditRecordScalarFieldEnum)[keyof typeof AuditRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ReconciliationRunWhereInput = {
    AND?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    OR?: ReconciliationRunWhereInput[]
    NOT?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    id?: UuidFilter<"ReconciliationRun"> | string
    concessionId?: UuidFilter<"ReconciliationRun"> | string
    periodStart?: DateTimeFilter<"ReconciliationRun"> | Date | string
    periodEnd?: DateTimeFilter<"ReconciliationRun"> | Date | string
    status?: StringFilter<"ReconciliationRun"> | string
    totalReportedMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    totalEvidenceMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    totalSettledMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    matchedCount?: IntFilter<"ReconciliationRun"> | number
    unmatchedCount?: IntFilter<"ReconciliationRun"> | number
    createdAt?: DateTimeFilter<"ReconciliationRun"> | Date | string
  }

  export type ReconciliationRunOrderByWithRelationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    status?: SortOrder
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    OR?: ReconciliationRunWhereInput[]
    NOT?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    concessionId?: UuidFilter<"ReconciliationRun"> | string
    periodStart?: DateTimeFilter<"ReconciliationRun"> | Date | string
    periodEnd?: DateTimeFilter<"ReconciliationRun"> | Date | string
    status?: StringFilter<"ReconciliationRun"> | string
    totalReportedMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    totalEvidenceMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    totalSettledMinor?: BigIntFilter<"ReconciliationRun"> | bigint | number
    matchedCount?: IntFilter<"ReconciliationRun"> | number
    unmatchedCount?: IntFilter<"ReconciliationRun"> | number
    createdAt?: DateTimeFilter<"ReconciliationRun"> | Date | string
  }, "id">

  export type ReconciliationRunOrderByWithAggregationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    status?: SortOrder
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
    createdAt?: SortOrder
    _count?: ReconciliationRunCountOrderByAggregateInput
    _avg?: ReconciliationRunAvgOrderByAggregateInput
    _max?: ReconciliationRunMaxOrderByAggregateInput
    _min?: ReconciliationRunMinOrderByAggregateInput
    _sum?: ReconciliationRunSumOrderByAggregateInput
  }

  export type ReconciliationRunScalarWhereWithAggregatesInput = {
    AND?: ReconciliationRunScalarWhereWithAggregatesInput | ReconciliationRunScalarWhereWithAggregatesInput[]
    OR?: ReconciliationRunScalarWhereWithAggregatesInput[]
    NOT?: ReconciliationRunScalarWhereWithAggregatesInput | ReconciliationRunScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReconciliationRun"> | string
    concessionId?: UuidWithAggregatesFilter<"ReconciliationRun"> | string
    periodStart?: DateTimeWithAggregatesFilter<"ReconciliationRun"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"ReconciliationRun"> | Date | string
    status?: StringWithAggregatesFilter<"ReconciliationRun"> | string
    totalReportedMinor?: BigIntWithAggregatesFilter<"ReconciliationRun"> | bigint | number
    totalEvidenceMinor?: BigIntWithAggregatesFilter<"ReconciliationRun"> | bigint | number
    totalSettledMinor?: BigIntWithAggregatesFilter<"ReconciliationRun"> | bigint | number
    matchedCount?: IntWithAggregatesFilter<"ReconciliationRun"> | number
    unmatchedCount?: IntWithAggregatesFilter<"ReconciliationRun"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ReconciliationRun"> | Date | string
  }

  export type ReconciliationExceptionWhereInput = {
    AND?: ReconciliationExceptionWhereInput | ReconciliationExceptionWhereInput[]
    OR?: ReconciliationExceptionWhereInput[]
    NOT?: ReconciliationExceptionWhereInput | ReconciliationExceptionWhereInput[]
    id?: UuidFilter<"ReconciliationException"> | string
    runId?: UuidFilter<"ReconciliationException"> | string
    concessionId?: UuidFilter<"ReconciliationException"> | string
    severity?: StringFilter<"ReconciliationException"> | string
    status?: StringFilter<"ReconciliationException"> | string
    reportedRef?: StringNullableFilter<"ReconciliationException"> | string | null
    evidenceRef?: StringNullableFilter<"ReconciliationException"> | string | null
    varianceMinor?: BigIntFilter<"ReconciliationException"> | bigint | number
    reasonCode?: StringFilter<"ReconciliationException"> | string
    assignedOwner?: StringNullableFilter<"ReconciliationException"> | string | null
    makerId?: StringNullableFilter<"ReconciliationException"> | string | null
    checkerId?: StringNullableFilter<"ReconciliationException"> | string | null
    createdAt?: DateTimeFilter<"ReconciliationException"> | Date | string
    updatedAt?: DateTimeFilter<"ReconciliationException"> | Date | string
  }

  export type ReconciliationExceptionOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    concessionId?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    reportedRef?: SortOrderInput | SortOrder
    evidenceRef?: SortOrderInput | SortOrder
    varianceMinor?: SortOrder
    reasonCode?: SortOrder
    assignedOwner?: SortOrderInput | SortOrder
    makerId?: SortOrderInput | SortOrder
    checkerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReconciliationExceptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReconciliationExceptionWhereInput | ReconciliationExceptionWhereInput[]
    OR?: ReconciliationExceptionWhereInput[]
    NOT?: ReconciliationExceptionWhereInput | ReconciliationExceptionWhereInput[]
    runId?: UuidFilter<"ReconciliationException"> | string
    concessionId?: UuidFilter<"ReconciliationException"> | string
    severity?: StringFilter<"ReconciliationException"> | string
    status?: StringFilter<"ReconciliationException"> | string
    reportedRef?: StringNullableFilter<"ReconciliationException"> | string | null
    evidenceRef?: StringNullableFilter<"ReconciliationException"> | string | null
    varianceMinor?: BigIntFilter<"ReconciliationException"> | bigint | number
    reasonCode?: StringFilter<"ReconciliationException"> | string
    assignedOwner?: StringNullableFilter<"ReconciliationException"> | string | null
    makerId?: StringNullableFilter<"ReconciliationException"> | string | null
    checkerId?: StringNullableFilter<"ReconciliationException"> | string | null
    createdAt?: DateTimeFilter<"ReconciliationException"> | Date | string
    updatedAt?: DateTimeFilter<"ReconciliationException"> | Date | string
  }, "id">

  export type ReconciliationExceptionOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    concessionId?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    reportedRef?: SortOrderInput | SortOrder
    evidenceRef?: SortOrderInput | SortOrder
    varianceMinor?: SortOrder
    reasonCode?: SortOrder
    assignedOwner?: SortOrderInput | SortOrder
    makerId?: SortOrderInput | SortOrder
    checkerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReconciliationExceptionCountOrderByAggregateInput
    _avg?: ReconciliationExceptionAvgOrderByAggregateInput
    _max?: ReconciliationExceptionMaxOrderByAggregateInput
    _min?: ReconciliationExceptionMinOrderByAggregateInput
    _sum?: ReconciliationExceptionSumOrderByAggregateInput
  }

  export type ReconciliationExceptionScalarWhereWithAggregatesInput = {
    AND?: ReconciliationExceptionScalarWhereWithAggregatesInput | ReconciliationExceptionScalarWhereWithAggregatesInput[]
    OR?: ReconciliationExceptionScalarWhereWithAggregatesInput[]
    NOT?: ReconciliationExceptionScalarWhereWithAggregatesInput | ReconciliationExceptionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReconciliationException"> | string
    runId?: UuidWithAggregatesFilter<"ReconciliationException"> | string
    concessionId?: UuidWithAggregatesFilter<"ReconciliationException"> | string
    severity?: StringWithAggregatesFilter<"ReconciliationException"> | string
    status?: StringWithAggregatesFilter<"ReconciliationException"> | string
    reportedRef?: StringNullableWithAggregatesFilter<"ReconciliationException"> | string | null
    evidenceRef?: StringNullableWithAggregatesFilter<"ReconciliationException"> | string | null
    varianceMinor?: BigIntWithAggregatesFilter<"ReconciliationException"> | bigint | number
    reasonCode?: StringWithAggregatesFilter<"ReconciliationException"> | string
    assignedOwner?: StringNullableWithAggregatesFilter<"ReconciliationException"> | string | null
    makerId?: StringNullableWithAggregatesFilter<"ReconciliationException"> | string | null
    checkerId?: StringNullableWithAggregatesFilter<"ReconciliationException"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ReconciliationException"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReconciliationException"> | Date | string
  }

  export type OutboxEventWhereInput = {
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    id?: UuidFilter<"OutboxEvent"> | string
    eventType?: StringFilter<"OutboxEvent"> | string
    eventVersion?: IntFilter<"OutboxEvent"> | number
    aggregateType?: StringFilter<"OutboxEvent"> | string
    aggregateId?: StringFilter<"OutboxEvent"> | string
    aggregateVersion?: IntFilter<"OutboxEvent"> | number
    routingKey?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    headers?: JsonFilter<"OutboxEvent">
    occurredAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    attempts?: IntFilter<"OutboxEvent"> | number
    nextAttemptAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    lockedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    lastError?: StringNullableFilter<"OutboxEvent"> | string | null
  }

  export type OutboxEventOrderByWithRelationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    aggregateVersion?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    headers?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    attempts?: SortOrder
    nextAttemptAt?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
  }

  export type OutboxEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboxEventWhereInput | OutboxEventWhereInput[]
    OR?: OutboxEventWhereInput[]
    NOT?: OutboxEventWhereInput | OutboxEventWhereInput[]
    eventType?: StringFilter<"OutboxEvent"> | string
    eventVersion?: IntFilter<"OutboxEvent"> | number
    aggregateType?: StringFilter<"OutboxEvent"> | string
    aggregateId?: StringFilter<"OutboxEvent"> | string
    aggregateVersion?: IntFilter<"OutboxEvent"> | number
    routingKey?: StringFilter<"OutboxEvent"> | string
    payload?: JsonFilter<"OutboxEvent">
    headers?: JsonFilter<"OutboxEvent">
    occurredAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    attempts?: IntFilter<"OutboxEvent"> | number
    nextAttemptAt?: DateTimeFilter<"OutboxEvent"> | Date | string
    lockedAt?: DateTimeNullableFilter<"OutboxEvent"> | Date | string | null
    lastError?: StringNullableFilter<"OutboxEvent"> | string | null
  }, "id">

  export type OutboxEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    aggregateVersion?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    headers?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    attempts?: SortOrder
    nextAttemptAt?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    _count?: OutboxEventCountOrderByAggregateInput
    _avg?: OutboxEventAvgOrderByAggregateInput
    _max?: OutboxEventMaxOrderByAggregateInput
    _min?: OutboxEventMinOrderByAggregateInput
    _sum?: OutboxEventSumOrderByAggregateInput
  }

  export type OutboxEventScalarWhereWithAggregatesInput = {
    AND?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    OR?: OutboxEventScalarWhereWithAggregatesInput[]
    NOT?: OutboxEventScalarWhereWithAggregatesInput | OutboxEventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"OutboxEvent"> | string
    eventType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    eventVersion?: IntWithAggregatesFilter<"OutboxEvent"> | number
    aggregateType?: StringWithAggregatesFilter<"OutboxEvent"> | string
    aggregateId?: StringWithAggregatesFilter<"OutboxEvent"> | string
    aggregateVersion?: IntWithAggregatesFilter<"OutboxEvent"> | number
    routingKey?: StringWithAggregatesFilter<"OutboxEvent"> | string
    payload?: JsonWithAggregatesFilter<"OutboxEvent">
    headers?: JsonWithAggregatesFilter<"OutboxEvent">
    occurredAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    attempts?: IntWithAggregatesFilter<"OutboxEvent"> | number
    nextAttemptAt?: DateTimeWithAggregatesFilter<"OutboxEvent"> | Date | string
    lockedAt?: DateTimeNullableWithAggregatesFilter<"OutboxEvent"> | Date | string | null
    lastError?: StringNullableWithAggregatesFilter<"OutboxEvent"> | string | null
  }

  export type InboxMessageWhereInput = {
    AND?: InboxMessageWhereInput | InboxMessageWhereInput[]
    OR?: InboxMessageWhereInput[]
    NOT?: InboxMessageWhereInput | InboxMessageWhereInput[]
    id?: UuidFilter<"InboxMessage"> | string
    consumerId?: StringFilter<"InboxMessage"> | string
    messageId?: UuidFilter<"InboxMessage"> | string
    eventType?: StringFilter<"InboxMessage"> | string
    receivedAt?: DateTimeFilter<"InboxMessage"> | Date | string
    processedAt?: DateTimeNullableFilter<"InboxMessage"> | Date | string | null
    result?: JsonNullableFilter<"InboxMessage">
  }

  export type InboxMessageOrderByWithRelationInput = {
    id?: SortOrder
    consumerId?: SortOrder
    messageId?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
  }

  export type InboxMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consumerId_messageId?: InboxMessageConsumerIdMessageIdCompoundUniqueInput
    AND?: InboxMessageWhereInput | InboxMessageWhereInput[]
    OR?: InboxMessageWhereInput[]
    NOT?: InboxMessageWhereInput | InboxMessageWhereInput[]
    consumerId?: StringFilter<"InboxMessage"> | string
    messageId?: UuidFilter<"InboxMessage"> | string
    eventType?: StringFilter<"InboxMessage"> | string
    receivedAt?: DateTimeFilter<"InboxMessage"> | Date | string
    processedAt?: DateTimeNullableFilter<"InboxMessage"> | Date | string | null
    result?: JsonNullableFilter<"InboxMessage">
  }, "id" | "consumerId_messageId">

  export type InboxMessageOrderByWithAggregationInput = {
    id?: SortOrder
    consumerId?: SortOrder
    messageId?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    _count?: InboxMessageCountOrderByAggregateInput
    _max?: InboxMessageMaxOrderByAggregateInput
    _min?: InboxMessageMinOrderByAggregateInput
  }

  export type InboxMessageScalarWhereWithAggregatesInput = {
    AND?: InboxMessageScalarWhereWithAggregatesInput | InboxMessageScalarWhereWithAggregatesInput[]
    OR?: InboxMessageScalarWhereWithAggregatesInput[]
    NOT?: InboxMessageScalarWhereWithAggregatesInput | InboxMessageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"InboxMessage"> | string
    consumerId?: StringWithAggregatesFilter<"InboxMessage"> | string
    messageId?: UuidWithAggregatesFilter<"InboxMessage"> | string
    eventType?: StringWithAggregatesFilter<"InboxMessage"> | string
    receivedAt?: DateTimeWithAggregatesFilter<"InboxMessage"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"InboxMessage"> | Date | string | null
    result?: JsonNullableWithAggregatesFilter<"InboxMessage">
  }

  export type IdempotencyRecordWhereInput = {
    AND?: IdempotencyRecordWhereInput | IdempotencyRecordWhereInput[]
    OR?: IdempotencyRecordWhereInput[]
    NOT?: IdempotencyRecordWhereInput | IdempotencyRecordWhereInput[]
    id?: UuidFilter<"IdempotencyRecord"> | string
    concessionId?: UuidFilter<"IdempotencyRecord"> | string
    idempotencyKey?: StringFilter<"IdempotencyRecord"> | string
    requestHash?: StringFilter<"IdempotencyRecord"> | string
    responseStatus?: IntNullableFilter<"IdempotencyRecord"> | number | null
    responseBody?: JsonNullableFilter<"IdempotencyRecord">
    createdAt?: DateTimeFilter<"IdempotencyRecord"> | Date | string
    expiresAt?: DateTimeFilter<"IdempotencyRecord"> | Date | string
  }

  export type IdempotencyRecordOrderByWithRelationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    idempotencyKey?: SortOrder
    requestHash?: SortOrder
    responseStatus?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type IdempotencyRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    concessionId_idempotencyKey?: IdempotencyRecordConcessionIdIdempotencyKeyCompoundUniqueInput
    AND?: IdempotencyRecordWhereInput | IdempotencyRecordWhereInput[]
    OR?: IdempotencyRecordWhereInput[]
    NOT?: IdempotencyRecordWhereInput | IdempotencyRecordWhereInput[]
    concessionId?: UuidFilter<"IdempotencyRecord"> | string
    idempotencyKey?: StringFilter<"IdempotencyRecord"> | string
    requestHash?: StringFilter<"IdempotencyRecord"> | string
    responseStatus?: IntNullableFilter<"IdempotencyRecord"> | number | null
    responseBody?: JsonNullableFilter<"IdempotencyRecord">
    createdAt?: DateTimeFilter<"IdempotencyRecord"> | Date | string
    expiresAt?: DateTimeFilter<"IdempotencyRecord"> | Date | string
  }, "id" | "concessionId_idempotencyKey">

  export type IdempotencyRecordOrderByWithAggregationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    idempotencyKey?: SortOrder
    requestHash?: SortOrder
    responseStatus?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: IdempotencyRecordCountOrderByAggregateInput
    _avg?: IdempotencyRecordAvgOrderByAggregateInput
    _max?: IdempotencyRecordMaxOrderByAggregateInput
    _min?: IdempotencyRecordMinOrderByAggregateInput
    _sum?: IdempotencyRecordSumOrderByAggregateInput
  }

  export type IdempotencyRecordScalarWhereWithAggregatesInput = {
    AND?: IdempotencyRecordScalarWhereWithAggregatesInput | IdempotencyRecordScalarWhereWithAggregatesInput[]
    OR?: IdempotencyRecordScalarWhereWithAggregatesInput[]
    NOT?: IdempotencyRecordScalarWhereWithAggregatesInput | IdempotencyRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"IdempotencyRecord"> | string
    concessionId?: UuidWithAggregatesFilter<"IdempotencyRecord"> | string
    idempotencyKey?: StringWithAggregatesFilter<"IdempotencyRecord"> | string
    requestHash?: StringWithAggregatesFilter<"IdempotencyRecord"> | string
    responseStatus?: IntNullableWithAggregatesFilter<"IdempotencyRecord"> | number | null
    responseBody?: JsonNullableWithAggregatesFilter<"IdempotencyRecord">
    createdAt?: DateTimeWithAggregatesFilter<"IdempotencyRecord"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"IdempotencyRecord"> | Date | string
  }

  export type AuditRecordWhereInput = {
    AND?: AuditRecordWhereInput | AuditRecordWhereInput[]
    OR?: AuditRecordWhereInput[]
    NOT?: AuditRecordWhereInput | AuditRecordWhereInput[]
    id?: UuidFilter<"AuditRecord"> | string
    occurredAt?: DateTimeFilter<"AuditRecord"> | Date | string
    actorId?: StringFilter<"AuditRecord"> | string
    actorType?: StringFilter<"AuditRecord"> | string
    concessionId?: UuidNullableFilter<"AuditRecord"> | string | null
    assemblyId?: UuidNullableFilter<"AuditRecord"> | string | null
    action?: StringFilter<"AuditRecord"> | string
    resourceType?: StringFilter<"AuditRecord"> | string
    resourceId?: StringNullableFilter<"AuditRecord"> | string | null
    requestId?: StringFilter<"AuditRecord"> | string
    sourceIp?: StringNullableFilter<"AuditRecord"> | string | null
    outcome?: StringFilter<"AuditRecord"> | string
    metadata?: JsonFilter<"AuditRecord">
  }

  export type AuditRecordOrderByWithRelationInput = {
    id?: SortOrder
    occurredAt?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    concessionId?: SortOrderInput | SortOrder
    assemblyId?: SortOrderInput | SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    requestId?: SortOrder
    sourceIp?: SortOrderInput | SortOrder
    outcome?: SortOrder
    metadata?: SortOrder
  }

  export type AuditRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditRecordWhereInput | AuditRecordWhereInput[]
    OR?: AuditRecordWhereInput[]
    NOT?: AuditRecordWhereInput | AuditRecordWhereInput[]
    occurredAt?: DateTimeFilter<"AuditRecord"> | Date | string
    actorId?: StringFilter<"AuditRecord"> | string
    actorType?: StringFilter<"AuditRecord"> | string
    concessionId?: UuidNullableFilter<"AuditRecord"> | string | null
    assemblyId?: UuidNullableFilter<"AuditRecord"> | string | null
    action?: StringFilter<"AuditRecord"> | string
    resourceType?: StringFilter<"AuditRecord"> | string
    resourceId?: StringNullableFilter<"AuditRecord"> | string | null
    requestId?: StringFilter<"AuditRecord"> | string
    sourceIp?: StringNullableFilter<"AuditRecord"> | string | null
    outcome?: StringFilter<"AuditRecord"> | string
    metadata?: JsonFilter<"AuditRecord">
  }, "id">

  export type AuditRecordOrderByWithAggregationInput = {
    id?: SortOrder
    occurredAt?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    concessionId?: SortOrderInput | SortOrder
    assemblyId?: SortOrderInput | SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    requestId?: SortOrder
    sourceIp?: SortOrderInput | SortOrder
    outcome?: SortOrder
    metadata?: SortOrder
    _count?: AuditRecordCountOrderByAggregateInput
    _max?: AuditRecordMaxOrderByAggregateInput
    _min?: AuditRecordMinOrderByAggregateInput
  }

  export type AuditRecordScalarWhereWithAggregatesInput = {
    AND?: AuditRecordScalarWhereWithAggregatesInput | AuditRecordScalarWhereWithAggregatesInput[]
    OR?: AuditRecordScalarWhereWithAggregatesInput[]
    NOT?: AuditRecordScalarWhereWithAggregatesInput | AuditRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditRecord"> | string
    occurredAt?: DateTimeWithAggregatesFilter<"AuditRecord"> | Date | string
    actorId?: StringWithAggregatesFilter<"AuditRecord"> | string
    actorType?: StringWithAggregatesFilter<"AuditRecord"> | string
    concessionId?: UuidNullableWithAggregatesFilter<"AuditRecord"> | string | null
    assemblyId?: UuidNullableWithAggregatesFilter<"AuditRecord"> | string | null
    action?: StringWithAggregatesFilter<"AuditRecord"> | string
    resourceType?: StringWithAggregatesFilter<"AuditRecord"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditRecord"> | string | null
    requestId?: StringWithAggregatesFilter<"AuditRecord"> | string
    sourceIp?: StringNullableWithAggregatesFilter<"AuditRecord"> | string | null
    outcome?: StringWithAggregatesFilter<"AuditRecord"> | string
    metadata?: JsonWithAggregatesFilter<"AuditRecord">
  }

  export type ReconciliationRunCreateInput = {
    id?: string
    concessionId: string
    periodStart: Date | string
    periodEnd: Date | string
    status?: string
    totalReportedMinor?: bigint | number
    totalEvidenceMinor?: bigint | number
    totalSettledMinor?: bigint | number
    matchedCount?: number
    unmatchedCount?: number
    createdAt?: Date | string
  }

  export type ReconciliationRunUncheckedCreateInput = {
    id?: string
    concessionId: string
    periodStart: Date | string
    periodEnd: Date | string
    status?: string
    totalReportedMinor?: bigint | number
    totalEvidenceMinor?: bigint | number
    totalSettledMinor?: bigint | number
    matchedCount?: number
    unmatchedCount?: number
    createdAt?: Date | string
  }

  export type ReconciliationRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    totalReportedMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEvidenceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSettledMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    matchedCount?: IntFieldUpdateOperationsInput | number
    unmatchedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    totalReportedMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEvidenceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSettledMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    matchedCount?: IntFieldUpdateOperationsInput | number
    unmatchedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationRunCreateManyInput = {
    id?: string
    concessionId: string
    periodStart: Date | string
    periodEnd: Date | string
    status?: string
    totalReportedMinor?: bigint | number
    totalEvidenceMinor?: bigint | number
    totalSettledMinor?: bigint | number
    matchedCount?: number
    unmatchedCount?: number
    createdAt?: Date | string
  }

  export type ReconciliationRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    totalReportedMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEvidenceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSettledMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    matchedCount?: IntFieldUpdateOperationsInput | number
    unmatchedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    totalReportedMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEvidenceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    totalSettledMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    matchedCount?: IntFieldUpdateOperationsInput | number
    unmatchedCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationExceptionCreateInput = {
    id?: string
    runId: string
    concessionId: string
    severity?: string
    status?: string
    reportedRef?: string | null
    evidenceRef?: string | null
    varianceMinor: bigint | number
    reasonCode: string
    assignedOwner?: string | null
    makerId?: string | null
    checkerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReconciliationExceptionUncheckedCreateInput = {
    id?: string
    runId: string
    concessionId: string
    severity?: string
    status?: string
    reportedRef?: string | null
    evidenceRef?: string | null
    varianceMinor: bigint | number
    reasonCode: string
    assignedOwner?: string | null
    makerId?: string | null
    checkerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReconciliationExceptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportedRef?: NullableStringFieldUpdateOperationsInput | string | null
    evidenceRef?: NullableStringFieldUpdateOperationsInput | string | null
    varianceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reasonCode?: StringFieldUpdateOperationsInput | string
    assignedOwner?: NullableStringFieldUpdateOperationsInput | string | null
    makerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationExceptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportedRef?: NullableStringFieldUpdateOperationsInput | string | null
    evidenceRef?: NullableStringFieldUpdateOperationsInput | string | null
    varianceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reasonCode?: StringFieldUpdateOperationsInput | string
    assignedOwner?: NullableStringFieldUpdateOperationsInput | string | null
    makerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationExceptionCreateManyInput = {
    id?: string
    runId: string
    concessionId: string
    severity?: string
    status?: string
    reportedRef?: string | null
    evidenceRef?: string | null
    varianceMinor: bigint | number
    reasonCode: string
    assignedOwner?: string | null
    makerId?: string | null
    checkerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReconciliationExceptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportedRef?: NullableStringFieldUpdateOperationsInput | string | null
    evidenceRef?: NullableStringFieldUpdateOperationsInput | string | null
    varianceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reasonCode?: StringFieldUpdateOperationsInput | string
    assignedOwner?: NullableStringFieldUpdateOperationsInput | string | null
    makerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationExceptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reportedRef?: NullableStringFieldUpdateOperationsInput | string | null
    evidenceRef?: NullableStringFieldUpdateOperationsInput | string | null
    varianceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reasonCode?: StringFieldUpdateOperationsInput | string
    assignedOwner?: NullableStringFieldUpdateOperationsInput | string | null
    makerId?: NullableStringFieldUpdateOperationsInput | string | null
    checkerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OutboxEventCreateInput = {
    id?: string
    eventType: string
    eventVersion?: number
    aggregateType: string
    aggregateId: string
    aggregateVersion: number
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    headers: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    publishedAt?: Date | string | null
    attempts?: number
    nextAttemptAt?: Date | string
    lockedAt?: Date | string | null
    lastError?: string | null
  }

  export type OutboxEventUncheckedCreateInput = {
    id?: string
    eventType: string
    eventVersion?: number
    aggregateType: string
    aggregateId: string
    aggregateVersion: number
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    headers: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    publishedAt?: Date | string | null
    attempts?: number
    nextAttemptAt?: Date | string
    lockedAt?: Date | string | null
    lastError?: string | null
  }

  export type OutboxEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateVersion?: IntFieldUpdateOperationsInput | number
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateVersion?: IntFieldUpdateOperationsInput | number
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventCreateManyInput = {
    id?: string
    eventType: string
    eventVersion?: number
    aggregateType: string
    aggregateId: string
    aggregateVersion: number
    routingKey: string
    payload: JsonNullValueInput | InputJsonValue
    headers: JsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    publishedAt?: Date | string | null
    attempts?: number
    nextAttemptAt?: Date | string
    lockedAt?: Date | string | null
    lastError?: string | null
  }

  export type OutboxEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateVersion?: IntFieldUpdateOperationsInput | number
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutboxEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    eventVersion?: IntFieldUpdateOperationsInput | number
    aggregateType?: StringFieldUpdateOperationsInput | string
    aggregateId?: StringFieldUpdateOperationsInput | string
    aggregateVersion?: IntFieldUpdateOperationsInput | number
    routingKey?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: JsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attempts?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InboxMessageCreateInput = {
    id?: string
    consumerId: string
    messageId: string
    eventType: string
    receivedAt?: Date | string
    processedAt?: Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageUncheckedCreateInput = {
    id?: string
    consumerId: string
    messageId: string
    eventType: string
    receivedAt?: Date | string
    processedAt?: Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageCreateManyInput = {
    id?: string
    consumerId: string
    messageId: string
    eventType: string
    receivedAt?: Date | string
    processedAt?: Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type InboxMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consumerId?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableJsonNullValueInput | InputJsonValue
  }

  export type IdempotencyRecordCreateInput = {
    id?: string
    concessionId: string
    idempotencyKey: string
    requestHash: string
    responseStatus?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type IdempotencyRecordUncheckedCreateInput = {
    id?: string
    concessionId: string
    idempotencyKey: string
    requestHash: string
    responseStatus?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type IdempotencyRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    requestHash?: StringFieldUpdateOperationsInput | string
    responseStatus?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IdempotencyRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    requestHash?: StringFieldUpdateOperationsInput | string
    responseStatus?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IdempotencyRecordCreateManyInput = {
    id?: string
    concessionId: string
    idempotencyKey: string
    requestHash: string
    responseStatus?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type IdempotencyRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    requestHash?: StringFieldUpdateOperationsInput | string
    responseStatus?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IdempotencyRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    requestHash?: StringFieldUpdateOperationsInput | string
    responseStatus?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditRecordCreateInput = {
    id?: string
    occurredAt?: Date | string
    actorId: string
    actorType: string
    concessionId?: string | null
    assemblyId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    requestId: string
    sourceIp?: string | null
    outcome: string
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordUncheckedCreateInput = {
    id?: string
    occurredAt?: Date | string
    actorId: string
    actorType: string
    concessionId?: string | null
    assemblyId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    requestId: string
    sourceIp?: string | null
    outcome: string
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    concessionId?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    concessionId?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordCreateManyInput = {
    id?: string
    occurredAt?: Date | string
    actorId: string
    actorType: string
    concessionId?: string | null
    assemblyId?: string | null
    action: string
    resourceType: string
    resourceId?: string | null
    requestId: string
    sourceIp?: string | null
    outcome: string
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    concessionId?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AuditRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorType?: StringFieldUpdateOperationsInput | string
    concessionId?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ReconciliationRunCountOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    status?: SortOrder
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationRunAvgOrderByAggregateInput = {
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
  }

  export type ReconciliationRunMaxOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    status?: SortOrder
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationRunMinOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    status?: SortOrder
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationRunSumOrderByAggregateInput = {
    totalReportedMinor?: SortOrder
    totalEvidenceMinor?: SortOrder
    totalSettledMinor?: SortOrder
    matchedCount?: SortOrder
    unmatchedCount?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReconciliationExceptionCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    concessionId?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    reportedRef?: SortOrder
    evidenceRef?: SortOrder
    varianceMinor?: SortOrder
    reasonCode?: SortOrder
    assignedOwner?: SortOrder
    makerId?: SortOrder
    checkerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReconciliationExceptionAvgOrderByAggregateInput = {
    varianceMinor?: SortOrder
  }

  export type ReconciliationExceptionMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    concessionId?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    reportedRef?: SortOrder
    evidenceRef?: SortOrder
    varianceMinor?: SortOrder
    reasonCode?: SortOrder
    assignedOwner?: SortOrder
    makerId?: SortOrder
    checkerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReconciliationExceptionMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    concessionId?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    reportedRef?: SortOrder
    evidenceRef?: SortOrder
    varianceMinor?: SortOrder
    reasonCode?: SortOrder
    assignedOwner?: SortOrder
    makerId?: SortOrder
    checkerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReconciliationExceptionSumOrderByAggregateInput = {
    varianceMinor?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OutboxEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    aggregateVersion?: SortOrder
    routingKey?: SortOrder
    payload?: SortOrder
    headers?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    attempts?: SortOrder
    nextAttemptAt?: SortOrder
    lockedAt?: SortOrder
    lastError?: SortOrder
  }

  export type OutboxEventAvgOrderByAggregateInput = {
    eventVersion?: SortOrder
    aggregateVersion?: SortOrder
    attempts?: SortOrder
  }

  export type OutboxEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    aggregateVersion?: SortOrder
    routingKey?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    attempts?: SortOrder
    nextAttemptAt?: SortOrder
    lockedAt?: SortOrder
    lastError?: SortOrder
  }

  export type OutboxEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventType?: SortOrder
    eventVersion?: SortOrder
    aggregateType?: SortOrder
    aggregateId?: SortOrder
    aggregateVersion?: SortOrder
    routingKey?: SortOrder
    occurredAt?: SortOrder
    publishedAt?: SortOrder
    attempts?: SortOrder
    nextAttemptAt?: SortOrder
    lockedAt?: SortOrder
    lastError?: SortOrder
  }

  export type OutboxEventSumOrderByAggregateInput = {
    eventVersion?: SortOrder
    aggregateVersion?: SortOrder
    attempts?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type InboxMessageConsumerIdMessageIdCompoundUniqueInput = {
    consumerId: string
    messageId: string
  }

  export type InboxMessageCountOrderByAggregateInput = {
    id?: SortOrder
    consumerId?: SortOrder
    messageId?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
    result?: SortOrder
  }

  export type InboxMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    consumerId?: SortOrder
    messageId?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type InboxMessageMinOrderByAggregateInput = {
    id?: SortOrder
    consumerId?: SortOrder
    messageId?: SortOrder
    eventType?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IdempotencyRecordConcessionIdIdempotencyKeyCompoundUniqueInput = {
    concessionId: string
    idempotencyKey: string
  }

  export type IdempotencyRecordCountOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    idempotencyKey?: SortOrder
    requestHash?: SortOrder
    responseStatus?: SortOrder
    responseBody?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type IdempotencyRecordAvgOrderByAggregateInput = {
    responseStatus?: SortOrder
  }

  export type IdempotencyRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    idempotencyKey?: SortOrder
    requestHash?: SortOrder
    responseStatus?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type IdempotencyRecordMinOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    idempotencyKey?: SortOrder
    requestHash?: SortOrder
    responseStatus?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type IdempotencyRecordSumOrderByAggregateInput = {
    responseStatus?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type AuditRecordCountOrderByAggregateInput = {
    id?: SortOrder
    occurredAt?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    requestId?: SortOrder
    sourceIp?: SortOrder
    outcome?: SortOrder
    metadata?: SortOrder
  }

  export type AuditRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    occurredAt?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    requestId?: SortOrder
    sourceIp?: SortOrder
    outcome?: SortOrder
  }

  export type AuditRecordMinOrderByAggregateInput = {
    id?: SortOrder
    occurredAt?: SortOrder
    actorId?: SortOrder
    actorType?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    requestId?: SortOrder
    sourceIp?: SortOrder
    outcome?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}