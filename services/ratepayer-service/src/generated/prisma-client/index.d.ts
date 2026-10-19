
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
 * Model Ratepayer
 * 
 */
export type Ratepayer = $Result.DefaultSelection<Prisma.$RatepayerPayload>
/**
 * Model RatepayerVerification
 * 
 */
export type RatepayerVerification = $Result.DefaultSelection<Prisma.$RatepayerVerificationPayload>
/**
 * Model PropertyRatepayerLink
 * 
 */
export type PropertyRatepayerLink = $Result.DefaultSelection<Prisma.$PropertyRatepayerLinkPayload>
/**
 * Model PropertyClaimDocument
 * 
 */
export type PropertyClaimDocument = $Result.DefaultSelection<Prisma.$PropertyClaimDocumentPayload>
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
 * // Fetch zero or more Ratepayers
 * const ratepayers = await prisma.ratepayer.findMany()
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
   * // Fetch zero or more Ratepayers
   * const ratepayers = await prisma.ratepayer.findMany()
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
   * `prisma.ratepayer`: Exposes CRUD operations for the **Ratepayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratepayers
    * const ratepayers = await prisma.ratepayer.findMany()
    * ```
    */
  get ratepayer(): Prisma.RatepayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ratepayerVerification`: Exposes CRUD operations for the **RatepayerVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RatepayerVerifications
    * const ratepayerVerifications = await prisma.ratepayerVerification.findMany()
    * ```
    */
  get ratepayerVerification(): Prisma.RatepayerVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyRatepayerLink`: Exposes CRUD operations for the **PropertyRatepayerLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyRatepayerLinks
    * const propertyRatepayerLinks = await prisma.propertyRatepayerLink.findMany()
    * ```
    */
  get propertyRatepayerLink(): Prisma.PropertyRatepayerLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyClaimDocument`: Exposes CRUD operations for the **PropertyClaimDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyClaimDocuments
    * const propertyClaimDocuments = await prisma.propertyClaimDocument.findMany()
    * ```
    */
  get propertyClaimDocument(): Prisma.PropertyClaimDocumentDelegate<ExtArgs, ClientOptions>;

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
    Ratepayer: 'Ratepayer',
    RatepayerVerification: 'RatepayerVerification',
    PropertyRatepayerLink: 'PropertyRatepayerLink',
    PropertyClaimDocument: 'PropertyClaimDocument',
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
      modelProps: "ratepayer" | "ratepayerVerification" | "propertyRatepayerLink" | "propertyClaimDocument" | "outboxEvent" | "inboxMessage" | "idempotencyRecord" | "auditRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Ratepayer: {
        payload: Prisma.$RatepayerPayload<ExtArgs>
        fields: Prisma.RatepayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatepayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatepayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          findFirst: {
            args: Prisma.RatepayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatepayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          findMany: {
            args: Prisma.RatepayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>[]
          }
          create: {
            args: Prisma.RatepayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          createMany: {
            args: Prisma.RatepayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatepayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>[]
          }
          delete: {
            args: Prisma.RatepayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          update: {
            args: Prisma.RatepayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          deleteMany: {
            args: Prisma.RatepayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatepayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatepayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>[]
          }
          upsert: {
            args: Prisma.RatepayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerPayload>
          }
          aggregate: {
            args: Prisma.RatepayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRatepayer>
          }
          groupBy: {
            args: Prisma.RatepayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatepayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatepayerCountArgs<ExtArgs>
            result: $Utils.Optional<RatepayerCountAggregateOutputType> | number
          }
        }
      }
      RatepayerVerification: {
        payload: Prisma.$RatepayerVerificationPayload<ExtArgs>
        fields: Prisma.RatepayerVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatepayerVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatepayerVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          findFirst: {
            args: Prisma.RatepayerVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatepayerVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          findMany: {
            args: Prisma.RatepayerVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>[]
          }
          create: {
            args: Prisma.RatepayerVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          createMany: {
            args: Prisma.RatepayerVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatepayerVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>[]
          }
          delete: {
            args: Prisma.RatepayerVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          update: {
            args: Prisma.RatepayerVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          deleteMany: {
            args: Prisma.RatepayerVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatepayerVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatepayerVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>[]
          }
          upsert: {
            args: Prisma.RatepayerVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatepayerVerificationPayload>
          }
          aggregate: {
            args: Prisma.RatepayerVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRatepayerVerification>
          }
          groupBy: {
            args: Prisma.RatepayerVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatepayerVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatepayerVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<RatepayerVerificationCountAggregateOutputType> | number
          }
        }
      }
      PropertyRatepayerLink: {
        payload: Prisma.$PropertyRatepayerLinkPayload<ExtArgs>
        fields: Prisma.PropertyRatepayerLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyRatepayerLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyRatepayerLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          findFirst: {
            args: Prisma.PropertyRatepayerLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyRatepayerLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          findMany: {
            args: Prisma.PropertyRatepayerLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>[]
          }
          create: {
            args: Prisma.PropertyRatepayerLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          createMany: {
            args: Prisma.PropertyRatepayerLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyRatepayerLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>[]
          }
          delete: {
            args: Prisma.PropertyRatepayerLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          update: {
            args: Prisma.PropertyRatepayerLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          deleteMany: {
            args: Prisma.PropertyRatepayerLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyRatepayerLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyRatepayerLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>[]
          }
          upsert: {
            args: Prisma.PropertyRatepayerLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyRatepayerLinkPayload>
          }
          aggregate: {
            args: Prisma.PropertyRatepayerLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyRatepayerLink>
          }
          groupBy: {
            args: Prisma.PropertyRatepayerLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyRatepayerLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyRatepayerLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyRatepayerLinkCountAggregateOutputType> | number
          }
        }
      }
      PropertyClaimDocument: {
        payload: Prisma.$PropertyClaimDocumentPayload<ExtArgs>
        fields: Prisma.PropertyClaimDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyClaimDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyClaimDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          findFirst: {
            args: Prisma.PropertyClaimDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyClaimDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          findMany: {
            args: Prisma.PropertyClaimDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>[]
          }
          create: {
            args: Prisma.PropertyClaimDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          createMany: {
            args: Prisma.PropertyClaimDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyClaimDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>[]
          }
          delete: {
            args: Prisma.PropertyClaimDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          update: {
            args: Prisma.PropertyClaimDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          deleteMany: {
            args: Prisma.PropertyClaimDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyClaimDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyClaimDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>[]
          }
          upsert: {
            args: Prisma.PropertyClaimDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyClaimDocumentPayload>
          }
          aggregate: {
            args: Prisma.PropertyClaimDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyClaimDocument>
          }
          groupBy: {
            args: Prisma.PropertyClaimDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyClaimDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyClaimDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyClaimDocumentCountAggregateOutputType> | number
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
    ratepayer?: RatepayerOmit
    ratepayerVerification?: RatepayerVerificationOmit
    propertyRatepayerLink?: PropertyRatepayerLinkOmit
    propertyClaimDocument?: PropertyClaimDocumentOmit
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
   * Count Type RatepayerCountOutputType
   */

  export type RatepayerCountOutputType = {
    verifications: number
    propertyLinks: number
  }

  export type RatepayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifications?: boolean | RatepayerCountOutputTypeCountVerificationsArgs
    propertyLinks?: boolean | RatepayerCountOutputTypeCountPropertyLinksArgs
  }

  // Custom InputTypes
  /**
   * RatepayerCountOutputType without action
   */
  export type RatepayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerCountOutputType
     */
    select?: RatepayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RatepayerCountOutputType without action
   */
  export type RatepayerCountOutputTypeCountVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatepayerVerificationWhereInput
  }

  /**
   * RatepayerCountOutputType without action
   */
  export type RatepayerCountOutputTypeCountPropertyLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyRatepayerLinkWhereInput
  }


  /**
   * Count Type PropertyRatepayerLinkCountOutputType
   */

  export type PropertyRatepayerLinkCountOutputType = {
    claimDocuments: number
  }

  export type PropertyRatepayerLinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimDocuments?: boolean | PropertyRatepayerLinkCountOutputTypeCountClaimDocumentsArgs
  }

  // Custom InputTypes
  /**
   * PropertyRatepayerLinkCountOutputType without action
   */
  export type PropertyRatepayerLinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLinkCountOutputType
     */
    select?: PropertyRatepayerLinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyRatepayerLinkCountOutputType without action
   */
  export type PropertyRatepayerLinkCountOutputTypeCountClaimDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyClaimDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Ratepayer
   */

  export type AggregateRatepayer = {
    _count: RatepayerCountAggregateOutputType | null
    _min: RatepayerMinAggregateOutputType | null
    _max: RatepayerMaxAggregateOutputType | null
  }

  export type RatepayerMinAggregateOutputType = {
    id: string | null
    code: string | null
    ratepayerType: string | null
    legalName: string | null
    phone: string | null
    email: string | null
    regionId: string | null
    assemblyId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatepayerMaxAggregateOutputType = {
    id: string | null
    code: string | null
    ratepayerType: string | null
    legalName: string | null
    phone: string | null
    email: string | null
    regionId: string | null
    assemblyId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatepayerCountAggregateOutputType = {
    id: number
    code: number
    ratepayerType: number
    legalName: number
    phone: number
    email: number
    regionId: number
    assemblyId: number
    locationGeo: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RatepayerMinAggregateInputType = {
    id?: true
    code?: true
    ratepayerType?: true
    legalName?: true
    phone?: true
    email?: true
    regionId?: true
    assemblyId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatepayerMaxAggregateInputType = {
    id?: true
    code?: true
    ratepayerType?: true
    legalName?: true
    phone?: true
    email?: true
    regionId?: true
    assemblyId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatepayerCountAggregateInputType = {
    id?: true
    code?: true
    ratepayerType?: true
    legalName?: true
    phone?: true
    email?: true
    regionId?: true
    assemblyId?: true
    locationGeo?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RatepayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratepayer to aggregate.
     */
    where?: RatepayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratepayers to fetch.
     */
    orderBy?: RatepayerOrderByWithRelationInput | RatepayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatepayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratepayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratepayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratepayers
    **/
    _count?: true | RatepayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatepayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatepayerMaxAggregateInputType
  }

  export type GetRatepayerAggregateType<T extends RatepayerAggregateArgs> = {
        [P in keyof T & keyof AggregateRatepayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRatepayer[P]>
      : GetScalarType<T[P], AggregateRatepayer[P]>
  }




  export type RatepayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatepayerWhereInput
    orderBy?: RatepayerOrderByWithAggregationInput | RatepayerOrderByWithAggregationInput[]
    by: RatepayerScalarFieldEnum[] | RatepayerScalarFieldEnum
    having?: RatepayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatepayerCountAggregateInputType | true
    _min?: RatepayerMinAggregateInputType
    _max?: RatepayerMaxAggregateInputType
  }

  export type RatepayerGroupByOutputType = {
    id: string
    code: string
    ratepayerType: string
    legalName: string
    phone: string
    email: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonValue
    status: string
    createdAt: Date
    updatedAt: Date
    _count: RatepayerCountAggregateOutputType | null
    _min: RatepayerMinAggregateOutputType | null
    _max: RatepayerMaxAggregateOutputType | null
  }

  type GetRatepayerGroupByPayload<T extends RatepayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatepayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatepayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatepayerGroupByOutputType[P]>
            : GetScalarType<T[P], RatepayerGroupByOutputType[P]>
        }
      >
    >


  export type RatepayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    ratepayerType?: boolean
    legalName?: boolean
    phone?: boolean
    email?: boolean
    regionId?: boolean
    assemblyId?: boolean
    locationGeo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    verifications?: boolean | Ratepayer$verificationsArgs<ExtArgs>
    propertyLinks?: boolean | Ratepayer$propertyLinksArgs<ExtArgs>
    _count?: boolean | RatepayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ratepayer"]>

  export type RatepayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    ratepayerType?: boolean
    legalName?: boolean
    phone?: boolean
    email?: boolean
    regionId?: boolean
    assemblyId?: boolean
    locationGeo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ratepayer"]>

  export type RatepayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    ratepayerType?: boolean
    legalName?: boolean
    phone?: boolean
    email?: boolean
    regionId?: boolean
    assemblyId?: boolean
    locationGeo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ratepayer"]>

  export type RatepayerSelectScalar = {
    id?: boolean
    code?: boolean
    ratepayerType?: boolean
    legalName?: boolean
    phone?: boolean
    email?: boolean
    regionId?: boolean
    assemblyId?: boolean
    locationGeo?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RatepayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "ratepayerType" | "legalName" | "phone" | "email" | "regionId" | "assemblyId" | "locationGeo" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["ratepayer"]>
  export type RatepayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifications?: boolean | Ratepayer$verificationsArgs<ExtArgs>
    propertyLinks?: boolean | Ratepayer$propertyLinksArgs<ExtArgs>
    _count?: boolean | RatepayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RatepayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RatepayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RatepayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ratepayer"
    objects: {
      verifications: Prisma.$RatepayerVerificationPayload<ExtArgs>[]
      propertyLinks: Prisma.$PropertyRatepayerLinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      ratepayerType: string
      legalName: string
      phone: string
      email: string | null
      regionId: string
      assemblyId: string
      locationGeo: Prisma.JsonValue
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ratepayer"]>
    composites: {}
  }

  type RatepayerGetPayload<S extends boolean | null | undefined | RatepayerDefaultArgs> = $Result.GetResult<Prisma.$RatepayerPayload, S>

  type RatepayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatepayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatepayerCountAggregateInputType | true
    }

  export interface RatepayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ratepayer'], meta: { name: 'Ratepayer' } }
    /**
     * Find zero or one Ratepayer that matches the filter.
     * @param {RatepayerFindUniqueArgs} args - Arguments to find a Ratepayer
     * @example
     * // Get one Ratepayer
     * const ratepayer = await prisma.ratepayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatepayerFindUniqueArgs>(args: SelectSubset<T, RatepayerFindUniqueArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ratepayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatepayerFindUniqueOrThrowArgs} args - Arguments to find a Ratepayer
     * @example
     * // Get one Ratepayer
     * const ratepayer = await prisma.ratepayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatepayerFindUniqueOrThrowArgs>(args: SelectSubset<T, RatepayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ratepayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerFindFirstArgs} args - Arguments to find a Ratepayer
     * @example
     * // Get one Ratepayer
     * const ratepayer = await prisma.ratepayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatepayerFindFirstArgs>(args?: SelectSubset<T, RatepayerFindFirstArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ratepayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerFindFirstOrThrowArgs} args - Arguments to find a Ratepayer
     * @example
     * // Get one Ratepayer
     * const ratepayer = await prisma.ratepayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatepayerFindFirstOrThrowArgs>(args?: SelectSubset<T, RatepayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratepayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratepayers
     * const ratepayers = await prisma.ratepayer.findMany()
     * 
     * // Get first 10 Ratepayers
     * const ratepayers = await prisma.ratepayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratepayerWithIdOnly = await prisma.ratepayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatepayerFindManyArgs>(args?: SelectSubset<T, RatepayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ratepayer.
     * @param {RatepayerCreateArgs} args - Arguments to create a Ratepayer.
     * @example
     * // Create one Ratepayer
     * const Ratepayer = await prisma.ratepayer.create({
     *   data: {
     *     // ... data to create a Ratepayer
     *   }
     * })
     * 
     */
    create<T extends RatepayerCreateArgs>(args: SelectSubset<T, RatepayerCreateArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratepayers.
     * @param {RatepayerCreateManyArgs} args - Arguments to create many Ratepayers.
     * @example
     * // Create many Ratepayers
     * const ratepayer = await prisma.ratepayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatepayerCreateManyArgs>(args?: SelectSubset<T, RatepayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratepayers and returns the data saved in the database.
     * @param {RatepayerCreateManyAndReturnArgs} args - Arguments to create many Ratepayers.
     * @example
     * // Create many Ratepayers
     * const ratepayer = await prisma.ratepayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratepayers and only return the `id`
     * const ratepayerWithIdOnly = await prisma.ratepayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatepayerCreateManyAndReturnArgs>(args?: SelectSubset<T, RatepayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ratepayer.
     * @param {RatepayerDeleteArgs} args - Arguments to delete one Ratepayer.
     * @example
     * // Delete one Ratepayer
     * const Ratepayer = await prisma.ratepayer.delete({
     *   where: {
     *     // ... filter to delete one Ratepayer
     *   }
     * })
     * 
     */
    delete<T extends RatepayerDeleteArgs>(args: SelectSubset<T, RatepayerDeleteArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ratepayer.
     * @param {RatepayerUpdateArgs} args - Arguments to update one Ratepayer.
     * @example
     * // Update one Ratepayer
     * const ratepayer = await prisma.ratepayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatepayerUpdateArgs>(args: SelectSubset<T, RatepayerUpdateArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratepayers.
     * @param {RatepayerDeleteManyArgs} args - Arguments to filter Ratepayers to delete.
     * @example
     * // Delete a few Ratepayers
     * const { count } = await prisma.ratepayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatepayerDeleteManyArgs>(args?: SelectSubset<T, RatepayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratepayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratepayers
     * const ratepayer = await prisma.ratepayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatepayerUpdateManyArgs>(args: SelectSubset<T, RatepayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratepayers and returns the data updated in the database.
     * @param {RatepayerUpdateManyAndReturnArgs} args - Arguments to update many Ratepayers.
     * @example
     * // Update many Ratepayers
     * const ratepayer = await prisma.ratepayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratepayers and only return the `id`
     * const ratepayerWithIdOnly = await prisma.ratepayer.updateManyAndReturn({
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
    updateManyAndReturn<T extends RatepayerUpdateManyAndReturnArgs>(args: SelectSubset<T, RatepayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ratepayer.
     * @param {RatepayerUpsertArgs} args - Arguments to update or create a Ratepayer.
     * @example
     * // Update or create a Ratepayer
     * const ratepayer = await prisma.ratepayer.upsert({
     *   create: {
     *     // ... data to create a Ratepayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ratepayer we want to update
     *   }
     * })
     */
    upsert<T extends RatepayerUpsertArgs>(args: SelectSubset<T, RatepayerUpsertArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratepayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerCountArgs} args - Arguments to filter Ratepayers to count.
     * @example
     * // Count the number of Ratepayers
     * const count = await prisma.ratepayer.count({
     *   where: {
     *     // ... the filter for the Ratepayers we want to count
     *   }
     * })
    **/
    count<T extends RatepayerCountArgs>(
      args?: Subset<T, RatepayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatepayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ratepayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RatepayerAggregateArgs>(args: Subset<T, RatepayerAggregateArgs>): Prisma.PrismaPromise<GetRatepayerAggregateType<T>>

    /**
     * Group by Ratepayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerGroupByArgs} args - Group by arguments.
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
      T extends RatepayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatepayerGroupByArgs['orderBy'] }
        : { orderBy?: RatepayerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RatepayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatepayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ratepayer model
   */
  readonly fields: RatepayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ratepayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatepayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    verifications<T extends Ratepayer$verificationsArgs<ExtArgs> = {}>(args?: Subset<T, Ratepayer$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    propertyLinks<T extends Ratepayer$propertyLinksArgs<ExtArgs> = {}>(args?: Subset<T, Ratepayer$propertyLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Ratepayer model
   */
  interface RatepayerFieldRefs {
    readonly id: FieldRef<"Ratepayer", 'String'>
    readonly code: FieldRef<"Ratepayer", 'String'>
    readonly ratepayerType: FieldRef<"Ratepayer", 'String'>
    readonly legalName: FieldRef<"Ratepayer", 'String'>
    readonly phone: FieldRef<"Ratepayer", 'String'>
    readonly email: FieldRef<"Ratepayer", 'String'>
    readonly regionId: FieldRef<"Ratepayer", 'String'>
    readonly assemblyId: FieldRef<"Ratepayer", 'String'>
    readonly locationGeo: FieldRef<"Ratepayer", 'Json'>
    readonly status: FieldRef<"Ratepayer", 'String'>
    readonly createdAt: FieldRef<"Ratepayer", 'DateTime'>
    readonly updatedAt: FieldRef<"Ratepayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ratepayer findUnique
   */
  export type RatepayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter, which Ratepayer to fetch.
     */
    where: RatepayerWhereUniqueInput
  }

  /**
   * Ratepayer findUniqueOrThrow
   */
  export type RatepayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter, which Ratepayer to fetch.
     */
    where: RatepayerWhereUniqueInput
  }

  /**
   * Ratepayer findFirst
   */
  export type RatepayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter, which Ratepayer to fetch.
     */
    where?: RatepayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratepayers to fetch.
     */
    orderBy?: RatepayerOrderByWithRelationInput | RatepayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratepayers.
     */
    cursor?: RatepayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratepayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratepayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratepayers.
     */
    distinct?: RatepayerScalarFieldEnum | RatepayerScalarFieldEnum[]
  }

  /**
   * Ratepayer findFirstOrThrow
   */
  export type RatepayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter, which Ratepayer to fetch.
     */
    where?: RatepayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratepayers to fetch.
     */
    orderBy?: RatepayerOrderByWithRelationInput | RatepayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratepayers.
     */
    cursor?: RatepayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratepayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratepayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratepayers.
     */
    distinct?: RatepayerScalarFieldEnum | RatepayerScalarFieldEnum[]
  }

  /**
   * Ratepayer findMany
   */
  export type RatepayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter, which Ratepayers to fetch.
     */
    where?: RatepayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratepayers to fetch.
     */
    orderBy?: RatepayerOrderByWithRelationInput | RatepayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratepayers.
     */
    cursor?: RatepayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratepayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratepayers.
     */
    skip?: number
    distinct?: RatepayerScalarFieldEnum | RatepayerScalarFieldEnum[]
  }

  /**
   * Ratepayer create
   */
  export type RatepayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Ratepayer.
     */
    data: XOR<RatepayerCreateInput, RatepayerUncheckedCreateInput>
  }

  /**
   * Ratepayer createMany
   */
  export type RatepayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratepayers.
     */
    data: RatepayerCreateManyInput | RatepayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ratepayer createManyAndReturn
   */
  export type RatepayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * The data used to create many Ratepayers.
     */
    data: RatepayerCreateManyInput | RatepayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ratepayer update
   */
  export type RatepayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Ratepayer.
     */
    data: XOR<RatepayerUpdateInput, RatepayerUncheckedUpdateInput>
    /**
     * Choose, which Ratepayer to update.
     */
    where: RatepayerWhereUniqueInput
  }

  /**
   * Ratepayer updateMany
   */
  export type RatepayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratepayers.
     */
    data: XOR<RatepayerUpdateManyMutationInput, RatepayerUncheckedUpdateManyInput>
    /**
     * Filter which Ratepayers to update
     */
    where?: RatepayerWhereInput
    /**
     * Limit how many Ratepayers to update.
     */
    limit?: number
  }

  /**
   * Ratepayer updateManyAndReturn
   */
  export type RatepayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * The data used to update Ratepayers.
     */
    data: XOR<RatepayerUpdateManyMutationInput, RatepayerUncheckedUpdateManyInput>
    /**
     * Filter which Ratepayers to update
     */
    where?: RatepayerWhereInput
    /**
     * Limit how many Ratepayers to update.
     */
    limit?: number
  }

  /**
   * Ratepayer upsert
   */
  export type RatepayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Ratepayer to update in case it exists.
     */
    where: RatepayerWhereUniqueInput
    /**
     * In case the Ratepayer found by the `where` argument doesn't exist, create a new Ratepayer with this data.
     */
    create: XOR<RatepayerCreateInput, RatepayerUncheckedCreateInput>
    /**
     * In case the Ratepayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatepayerUpdateInput, RatepayerUncheckedUpdateInput>
  }

  /**
   * Ratepayer delete
   */
  export type RatepayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
    /**
     * Filter which Ratepayer to delete.
     */
    where: RatepayerWhereUniqueInput
  }

  /**
   * Ratepayer deleteMany
   */
  export type RatepayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratepayers to delete
     */
    where?: RatepayerWhereInput
    /**
     * Limit how many Ratepayers to delete.
     */
    limit?: number
  }

  /**
   * Ratepayer.verifications
   */
  export type Ratepayer$verificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    where?: RatepayerVerificationWhereInput
    orderBy?: RatepayerVerificationOrderByWithRelationInput | RatepayerVerificationOrderByWithRelationInput[]
    cursor?: RatepayerVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatepayerVerificationScalarFieldEnum | RatepayerVerificationScalarFieldEnum[]
  }

  /**
   * Ratepayer.propertyLinks
   */
  export type Ratepayer$propertyLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    where?: PropertyRatepayerLinkWhereInput
    orderBy?: PropertyRatepayerLinkOrderByWithRelationInput | PropertyRatepayerLinkOrderByWithRelationInput[]
    cursor?: PropertyRatepayerLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyRatepayerLinkScalarFieldEnum | PropertyRatepayerLinkScalarFieldEnum[]
  }

  /**
   * Ratepayer without action
   */
  export type RatepayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ratepayer
     */
    select?: RatepayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ratepayer
     */
    omit?: RatepayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerInclude<ExtArgs> | null
  }


  /**
   * Model RatepayerVerification
   */

  export type AggregateRatepayerVerification = {
    _count: RatepayerVerificationCountAggregateOutputType | null
    _min: RatepayerVerificationMinAggregateOutputType | null
    _max: RatepayerVerificationMaxAggregateOutputType | null
  }

  export type RatepayerVerificationMinAggregateOutputType = {
    id: string | null
    ratepayerId: string | null
    provider: string | null
    providerReference: string | null
    verificationStatus: string | null
    verifiedAt: Date | null
    createdAt: Date | null
  }

  export type RatepayerVerificationMaxAggregateOutputType = {
    id: string | null
    ratepayerId: string | null
    provider: string | null
    providerReference: string | null
    verificationStatus: string | null
    verifiedAt: Date | null
    createdAt: Date | null
  }

  export type RatepayerVerificationCountAggregateOutputType = {
    id: number
    ratepayerId: number
    provider: number
    providerReference: number
    verificationStatus: number
    verifiedAt: number
    createdAt: number
    _all: number
  }


  export type RatepayerVerificationMinAggregateInputType = {
    id?: true
    ratepayerId?: true
    provider?: true
    providerReference?: true
    verificationStatus?: true
    verifiedAt?: true
    createdAt?: true
  }

  export type RatepayerVerificationMaxAggregateInputType = {
    id?: true
    ratepayerId?: true
    provider?: true
    providerReference?: true
    verificationStatus?: true
    verifiedAt?: true
    createdAt?: true
  }

  export type RatepayerVerificationCountAggregateInputType = {
    id?: true
    ratepayerId?: true
    provider?: true
    providerReference?: true
    verificationStatus?: true
    verifiedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RatepayerVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RatepayerVerification to aggregate.
     */
    where?: RatepayerVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RatepayerVerifications to fetch.
     */
    orderBy?: RatepayerVerificationOrderByWithRelationInput | RatepayerVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatepayerVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RatepayerVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RatepayerVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RatepayerVerifications
    **/
    _count?: true | RatepayerVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatepayerVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatepayerVerificationMaxAggregateInputType
  }

  export type GetRatepayerVerificationAggregateType<T extends RatepayerVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateRatepayerVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRatepayerVerification[P]>
      : GetScalarType<T[P], AggregateRatepayerVerification[P]>
  }




  export type RatepayerVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatepayerVerificationWhereInput
    orderBy?: RatepayerVerificationOrderByWithAggregationInput | RatepayerVerificationOrderByWithAggregationInput[]
    by: RatepayerVerificationScalarFieldEnum[] | RatepayerVerificationScalarFieldEnum
    having?: RatepayerVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatepayerVerificationCountAggregateInputType | true
    _min?: RatepayerVerificationMinAggregateInputType
    _max?: RatepayerVerificationMaxAggregateInputType
  }

  export type RatepayerVerificationGroupByOutputType = {
    id: string
    ratepayerId: string
    provider: string
    providerReference: string
    verificationStatus: string
    verifiedAt: Date | null
    createdAt: Date
    _count: RatepayerVerificationCountAggregateOutputType | null
    _min: RatepayerVerificationMinAggregateOutputType | null
    _max: RatepayerVerificationMaxAggregateOutputType | null
  }

  type GetRatepayerVerificationGroupByPayload<T extends RatepayerVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatepayerVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatepayerVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatepayerVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], RatepayerVerificationGroupByOutputType[P]>
        }
      >
    >


  export type RatepayerVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ratepayerId?: boolean
    provider?: boolean
    providerReference?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ratepayerVerification"]>

  export type RatepayerVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ratepayerId?: boolean
    provider?: boolean
    providerReference?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ratepayerVerification"]>

  export type RatepayerVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ratepayerId?: boolean
    provider?: boolean
    providerReference?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ratepayerVerification"]>

  export type RatepayerVerificationSelectScalar = {
    id?: boolean
    ratepayerId?: boolean
    provider?: boolean
    providerReference?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
  }

  export type RatepayerVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ratepayerId" | "provider" | "providerReference" | "verificationStatus" | "verifiedAt" | "createdAt", ExtArgs["result"]["ratepayerVerification"]>
  export type RatepayerVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }
  export type RatepayerVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }
  export type RatepayerVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }

  export type $RatepayerVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RatepayerVerification"
    objects: {
      ratepayer: Prisma.$RatepayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ratepayerId: string
      provider: string
      providerReference: string
      verificationStatus: string
      verifiedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["ratepayerVerification"]>
    composites: {}
  }

  type RatepayerVerificationGetPayload<S extends boolean | null | undefined | RatepayerVerificationDefaultArgs> = $Result.GetResult<Prisma.$RatepayerVerificationPayload, S>

  type RatepayerVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatepayerVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatepayerVerificationCountAggregateInputType | true
    }

  export interface RatepayerVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RatepayerVerification'], meta: { name: 'RatepayerVerification' } }
    /**
     * Find zero or one RatepayerVerification that matches the filter.
     * @param {RatepayerVerificationFindUniqueArgs} args - Arguments to find a RatepayerVerification
     * @example
     * // Get one RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatepayerVerificationFindUniqueArgs>(args: SelectSubset<T, RatepayerVerificationFindUniqueArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RatepayerVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatepayerVerificationFindUniqueOrThrowArgs} args - Arguments to find a RatepayerVerification
     * @example
     * // Get one RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatepayerVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, RatepayerVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RatepayerVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationFindFirstArgs} args - Arguments to find a RatepayerVerification
     * @example
     * // Get one RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatepayerVerificationFindFirstArgs>(args?: SelectSubset<T, RatepayerVerificationFindFirstArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RatepayerVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationFindFirstOrThrowArgs} args - Arguments to find a RatepayerVerification
     * @example
     * // Get one RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatepayerVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, RatepayerVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RatepayerVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RatepayerVerifications
     * const ratepayerVerifications = await prisma.ratepayerVerification.findMany()
     * 
     * // Get first 10 RatepayerVerifications
     * const ratepayerVerifications = await prisma.ratepayerVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratepayerVerificationWithIdOnly = await prisma.ratepayerVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatepayerVerificationFindManyArgs>(args?: SelectSubset<T, RatepayerVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RatepayerVerification.
     * @param {RatepayerVerificationCreateArgs} args - Arguments to create a RatepayerVerification.
     * @example
     * // Create one RatepayerVerification
     * const RatepayerVerification = await prisma.ratepayerVerification.create({
     *   data: {
     *     // ... data to create a RatepayerVerification
     *   }
     * })
     * 
     */
    create<T extends RatepayerVerificationCreateArgs>(args: SelectSubset<T, RatepayerVerificationCreateArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RatepayerVerifications.
     * @param {RatepayerVerificationCreateManyArgs} args - Arguments to create many RatepayerVerifications.
     * @example
     * // Create many RatepayerVerifications
     * const ratepayerVerification = await prisma.ratepayerVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatepayerVerificationCreateManyArgs>(args?: SelectSubset<T, RatepayerVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RatepayerVerifications and returns the data saved in the database.
     * @param {RatepayerVerificationCreateManyAndReturnArgs} args - Arguments to create many RatepayerVerifications.
     * @example
     * // Create many RatepayerVerifications
     * const ratepayerVerification = await prisma.ratepayerVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RatepayerVerifications and only return the `id`
     * const ratepayerVerificationWithIdOnly = await prisma.ratepayerVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatepayerVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, RatepayerVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RatepayerVerification.
     * @param {RatepayerVerificationDeleteArgs} args - Arguments to delete one RatepayerVerification.
     * @example
     * // Delete one RatepayerVerification
     * const RatepayerVerification = await prisma.ratepayerVerification.delete({
     *   where: {
     *     // ... filter to delete one RatepayerVerification
     *   }
     * })
     * 
     */
    delete<T extends RatepayerVerificationDeleteArgs>(args: SelectSubset<T, RatepayerVerificationDeleteArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RatepayerVerification.
     * @param {RatepayerVerificationUpdateArgs} args - Arguments to update one RatepayerVerification.
     * @example
     * // Update one RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatepayerVerificationUpdateArgs>(args: SelectSubset<T, RatepayerVerificationUpdateArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RatepayerVerifications.
     * @param {RatepayerVerificationDeleteManyArgs} args - Arguments to filter RatepayerVerifications to delete.
     * @example
     * // Delete a few RatepayerVerifications
     * const { count } = await prisma.ratepayerVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatepayerVerificationDeleteManyArgs>(args?: SelectSubset<T, RatepayerVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RatepayerVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RatepayerVerifications
     * const ratepayerVerification = await prisma.ratepayerVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatepayerVerificationUpdateManyArgs>(args: SelectSubset<T, RatepayerVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RatepayerVerifications and returns the data updated in the database.
     * @param {RatepayerVerificationUpdateManyAndReturnArgs} args - Arguments to update many RatepayerVerifications.
     * @example
     * // Update many RatepayerVerifications
     * const ratepayerVerification = await prisma.ratepayerVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RatepayerVerifications and only return the `id`
     * const ratepayerVerificationWithIdOnly = await prisma.ratepayerVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends RatepayerVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, RatepayerVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RatepayerVerification.
     * @param {RatepayerVerificationUpsertArgs} args - Arguments to update or create a RatepayerVerification.
     * @example
     * // Update or create a RatepayerVerification
     * const ratepayerVerification = await prisma.ratepayerVerification.upsert({
     *   create: {
     *     // ... data to create a RatepayerVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RatepayerVerification we want to update
     *   }
     * })
     */
    upsert<T extends RatepayerVerificationUpsertArgs>(args: SelectSubset<T, RatepayerVerificationUpsertArgs<ExtArgs>>): Prisma__RatepayerVerificationClient<$Result.GetResult<Prisma.$RatepayerVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RatepayerVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationCountArgs} args - Arguments to filter RatepayerVerifications to count.
     * @example
     * // Count the number of RatepayerVerifications
     * const count = await prisma.ratepayerVerification.count({
     *   where: {
     *     // ... the filter for the RatepayerVerifications we want to count
     *   }
     * })
    **/
    count<T extends RatepayerVerificationCountArgs>(
      args?: Subset<T, RatepayerVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatepayerVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RatepayerVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RatepayerVerificationAggregateArgs>(args: Subset<T, RatepayerVerificationAggregateArgs>): Prisma.PrismaPromise<GetRatepayerVerificationAggregateType<T>>

    /**
     * Group by RatepayerVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatepayerVerificationGroupByArgs} args - Group by arguments.
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
      T extends RatepayerVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatepayerVerificationGroupByArgs['orderBy'] }
        : { orderBy?: RatepayerVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RatepayerVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatepayerVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RatepayerVerification model
   */
  readonly fields: RatepayerVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RatepayerVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatepayerVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratepayer<T extends RatepayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RatepayerDefaultArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RatepayerVerification model
   */
  interface RatepayerVerificationFieldRefs {
    readonly id: FieldRef<"RatepayerVerification", 'String'>
    readonly ratepayerId: FieldRef<"RatepayerVerification", 'String'>
    readonly provider: FieldRef<"RatepayerVerification", 'String'>
    readonly providerReference: FieldRef<"RatepayerVerification", 'String'>
    readonly verificationStatus: FieldRef<"RatepayerVerification", 'String'>
    readonly verifiedAt: FieldRef<"RatepayerVerification", 'DateTime'>
    readonly createdAt: FieldRef<"RatepayerVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RatepayerVerification findUnique
   */
  export type RatepayerVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter, which RatepayerVerification to fetch.
     */
    where: RatepayerVerificationWhereUniqueInput
  }

  /**
   * RatepayerVerification findUniqueOrThrow
   */
  export type RatepayerVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter, which RatepayerVerification to fetch.
     */
    where: RatepayerVerificationWhereUniqueInput
  }

  /**
   * RatepayerVerification findFirst
   */
  export type RatepayerVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter, which RatepayerVerification to fetch.
     */
    where?: RatepayerVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RatepayerVerifications to fetch.
     */
    orderBy?: RatepayerVerificationOrderByWithRelationInput | RatepayerVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RatepayerVerifications.
     */
    cursor?: RatepayerVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RatepayerVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RatepayerVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RatepayerVerifications.
     */
    distinct?: RatepayerVerificationScalarFieldEnum | RatepayerVerificationScalarFieldEnum[]
  }

  /**
   * RatepayerVerification findFirstOrThrow
   */
  export type RatepayerVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter, which RatepayerVerification to fetch.
     */
    where?: RatepayerVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RatepayerVerifications to fetch.
     */
    orderBy?: RatepayerVerificationOrderByWithRelationInput | RatepayerVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RatepayerVerifications.
     */
    cursor?: RatepayerVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RatepayerVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RatepayerVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RatepayerVerifications.
     */
    distinct?: RatepayerVerificationScalarFieldEnum | RatepayerVerificationScalarFieldEnum[]
  }

  /**
   * RatepayerVerification findMany
   */
  export type RatepayerVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter, which RatepayerVerifications to fetch.
     */
    where?: RatepayerVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RatepayerVerifications to fetch.
     */
    orderBy?: RatepayerVerificationOrderByWithRelationInput | RatepayerVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RatepayerVerifications.
     */
    cursor?: RatepayerVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RatepayerVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RatepayerVerifications.
     */
    skip?: number
    distinct?: RatepayerVerificationScalarFieldEnum | RatepayerVerificationScalarFieldEnum[]
  }

  /**
   * RatepayerVerification create
   */
  export type RatepayerVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a RatepayerVerification.
     */
    data: XOR<RatepayerVerificationCreateInput, RatepayerVerificationUncheckedCreateInput>
  }

  /**
   * RatepayerVerification createMany
   */
  export type RatepayerVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RatepayerVerifications.
     */
    data: RatepayerVerificationCreateManyInput | RatepayerVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RatepayerVerification createManyAndReturn
   */
  export type RatepayerVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many RatepayerVerifications.
     */
    data: RatepayerVerificationCreateManyInput | RatepayerVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RatepayerVerification update
   */
  export type RatepayerVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a RatepayerVerification.
     */
    data: XOR<RatepayerVerificationUpdateInput, RatepayerVerificationUncheckedUpdateInput>
    /**
     * Choose, which RatepayerVerification to update.
     */
    where: RatepayerVerificationWhereUniqueInput
  }

  /**
   * RatepayerVerification updateMany
   */
  export type RatepayerVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RatepayerVerifications.
     */
    data: XOR<RatepayerVerificationUpdateManyMutationInput, RatepayerVerificationUncheckedUpdateManyInput>
    /**
     * Filter which RatepayerVerifications to update
     */
    where?: RatepayerVerificationWhereInput
    /**
     * Limit how many RatepayerVerifications to update.
     */
    limit?: number
  }

  /**
   * RatepayerVerification updateManyAndReturn
   */
  export type RatepayerVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * The data used to update RatepayerVerifications.
     */
    data: XOR<RatepayerVerificationUpdateManyMutationInput, RatepayerVerificationUncheckedUpdateManyInput>
    /**
     * Filter which RatepayerVerifications to update
     */
    where?: RatepayerVerificationWhereInput
    /**
     * Limit how many RatepayerVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RatepayerVerification upsert
   */
  export type RatepayerVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the RatepayerVerification to update in case it exists.
     */
    where: RatepayerVerificationWhereUniqueInput
    /**
     * In case the RatepayerVerification found by the `where` argument doesn't exist, create a new RatepayerVerification with this data.
     */
    create: XOR<RatepayerVerificationCreateInput, RatepayerVerificationUncheckedCreateInput>
    /**
     * In case the RatepayerVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatepayerVerificationUpdateInput, RatepayerVerificationUncheckedUpdateInput>
  }

  /**
   * RatepayerVerification delete
   */
  export type RatepayerVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
    /**
     * Filter which RatepayerVerification to delete.
     */
    where: RatepayerVerificationWhereUniqueInput
  }

  /**
   * RatepayerVerification deleteMany
   */
  export type RatepayerVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RatepayerVerifications to delete
     */
    where?: RatepayerVerificationWhereInput
    /**
     * Limit how many RatepayerVerifications to delete.
     */
    limit?: number
  }

  /**
   * RatepayerVerification without action
   */
  export type RatepayerVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RatepayerVerification
     */
    select?: RatepayerVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RatepayerVerification
     */
    omit?: RatepayerVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatepayerVerificationInclude<ExtArgs> | null
  }


  /**
   * Model PropertyRatepayerLink
   */

  export type AggregatePropertyRatepayerLink = {
    _count: PropertyRatepayerLinkCountAggregateOutputType | null
    _avg: PropertyRatepayerLinkAvgAggregateOutputType | null
    _sum: PropertyRatepayerLinkSumAggregateOutputType | null
    _min: PropertyRatepayerLinkMinAggregateOutputType | null
    _max: PropertyRatepayerLinkMaxAggregateOutputType | null
  }

  export type PropertyRatepayerLinkAvgAggregateOutputType = {
    ownershipPercentage: Decimal | null
  }

  export type PropertyRatepayerLinkSumAggregateOutputType = {
    ownershipPercentage: Decimal | null
  }

  export type PropertyRatepayerLinkMinAggregateOutputType = {
    id: string | null
    unitId: string | null
    propertyId: string | null
    ratepayerId: string | null
    ownershipType: string | null
    ownershipPercentage: Decimal | null
    isPrimaryBillingContact: boolean | null
    claimStatus: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    createdAt: Date | null
  }

  export type PropertyRatepayerLinkMaxAggregateOutputType = {
    id: string | null
    unitId: string | null
    propertyId: string | null
    ratepayerId: string | null
    ownershipType: string | null
    ownershipPercentage: Decimal | null
    isPrimaryBillingContact: boolean | null
    claimStatus: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    createdAt: Date | null
  }

  export type PropertyRatepayerLinkCountAggregateOutputType = {
    id: number
    unitId: number
    propertyId: number
    ratepayerId: number
    ownershipType: number
    ownershipPercentage: number
    isPrimaryBillingContact: number
    claimStatus: number
    effectiveFrom: number
    effectiveTo: number
    createdAt: number
    _all: number
  }


  export type PropertyRatepayerLinkAvgAggregateInputType = {
    ownershipPercentage?: true
  }

  export type PropertyRatepayerLinkSumAggregateInputType = {
    ownershipPercentage?: true
  }

  export type PropertyRatepayerLinkMinAggregateInputType = {
    id?: true
    unitId?: true
    propertyId?: true
    ratepayerId?: true
    ownershipType?: true
    ownershipPercentage?: true
    isPrimaryBillingContact?: true
    claimStatus?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
  }

  export type PropertyRatepayerLinkMaxAggregateInputType = {
    id?: true
    unitId?: true
    propertyId?: true
    ratepayerId?: true
    ownershipType?: true
    ownershipPercentage?: true
    isPrimaryBillingContact?: true
    claimStatus?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
  }

  export type PropertyRatepayerLinkCountAggregateInputType = {
    id?: true
    unitId?: true
    propertyId?: true
    ratepayerId?: true
    ownershipType?: true
    ownershipPercentage?: true
    isPrimaryBillingContact?: true
    claimStatus?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyRatepayerLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyRatepayerLink to aggregate.
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyRatepayerLinks to fetch.
     */
    orderBy?: PropertyRatepayerLinkOrderByWithRelationInput | PropertyRatepayerLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyRatepayerLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyRatepayerLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyRatepayerLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyRatepayerLinks
    **/
    _count?: true | PropertyRatepayerLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyRatepayerLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyRatepayerLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyRatepayerLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyRatepayerLinkMaxAggregateInputType
  }

  export type GetPropertyRatepayerLinkAggregateType<T extends PropertyRatepayerLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyRatepayerLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyRatepayerLink[P]>
      : GetScalarType<T[P], AggregatePropertyRatepayerLink[P]>
  }




  export type PropertyRatepayerLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyRatepayerLinkWhereInput
    orderBy?: PropertyRatepayerLinkOrderByWithAggregationInput | PropertyRatepayerLinkOrderByWithAggregationInput[]
    by: PropertyRatepayerLinkScalarFieldEnum[] | PropertyRatepayerLinkScalarFieldEnum
    having?: PropertyRatepayerLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyRatepayerLinkCountAggregateInputType | true
    _avg?: PropertyRatepayerLinkAvgAggregateInputType
    _sum?: PropertyRatepayerLinkSumAggregateInputType
    _min?: PropertyRatepayerLinkMinAggregateInputType
    _max?: PropertyRatepayerLinkMaxAggregateInputType
  }

  export type PropertyRatepayerLinkGroupByOutputType = {
    id: string
    unitId: string
    propertyId: string
    ratepayerId: string
    ownershipType: string
    ownershipPercentage: Decimal
    isPrimaryBillingContact: boolean
    claimStatus: string
    effectiveFrom: Date
    effectiveTo: Date | null
    createdAt: Date
    _count: PropertyRatepayerLinkCountAggregateOutputType | null
    _avg: PropertyRatepayerLinkAvgAggregateOutputType | null
    _sum: PropertyRatepayerLinkSumAggregateOutputType | null
    _min: PropertyRatepayerLinkMinAggregateOutputType | null
    _max: PropertyRatepayerLinkMaxAggregateOutputType | null
  }

  type GetPropertyRatepayerLinkGroupByPayload<T extends PropertyRatepayerLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyRatepayerLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyRatepayerLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyRatepayerLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyRatepayerLinkGroupByOutputType[P]>
        }
      >
    >


  export type PropertyRatepayerLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    ownershipType?: boolean
    ownershipPercentage?: boolean
    isPrimaryBillingContact?: boolean
    claimStatus?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
    claimDocuments?: boolean | PropertyRatepayerLink$claimDocumentsArgs<ExtArgs>
    _count?: boolean | PropertyRatepayerLinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyRatepayerLink"]>

  export type PropertyRatepayerLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    ownershipType?: boolean
    ownershipPercentage?: boolean
    isPrimaryBillingContact?: boolean
    claimStatus?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyRatepayerLink"]>

  export type PropertyRatepayerLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    unitId?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    ownershipType?: boolean
    ownershipPercentage?: boolean
    isPrimaryBillingContact?: boolean
    claimStatus?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyRatepayerLink"]>

  export type PropertyRatepayerLinkSelectScalar = {
    id?: boolean
    unitId?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    ownershipType?: boolean
    ownershipPercentage?: boolean
    isPrimaryBillingContact?: boolean
    claimStatus?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
  }

  export type PropertyRatepayerLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "unitId" | "propertyId" | "ratepayerId" | "ownershipType" | "ownershipPercentage" | "isPrimaryBillingContact" | "claimStatus" | "effectiveFrom" | "effectiveTo" | "createdAt", ExtArgs["result"]["propertyRatepayerLink"]>
  export type PropertyRatepayerLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
    claimDocuments?: boolean | PropertyRatepayerLink$claimDocumentsArgs<ExtArgs>
    _count?: boolean | PropertyRatepayerLinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyRatepayerLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }
  export type PropertyRatepayerLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratepayer?: boolean | RatepayerDefaultArgs<ExtArgs>
  }

  export type $PropertyRatepayerLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyRatepayerLink"
    objects: {
      ratepayer: Prisma.$RatepayerPayload<ExtArgs>
      claimDocuments: Prisma.$PropertyClaimDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      unitId: string
      propertyId: string
      ratepayerId: string
      ownershipType: string
      ownershipPercentage: Prisma.Decimal
      isPrimaryBillingContact: boolean
      claimStatus: string
      effectiveFrom: Date
      effectiveTo: Date | null
      createdAt: Date
    }, ExtArgs["result"]["propertyRatepayerLink"]>
    composites: {}
  }

  type PropertyRatepayerLinkGetPayload<S extends boolean | null | undefined | PropertyRatepayerLinkDefaultArgs> = $Result.GetResult<Prisma.$PropertyRatepayerLinkPayload, S>

  type PropertyRatepayerLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyRatepayerLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyRatepayerLinkCountAggregateInputType | true
    }

  export interface PropertyRatepayerLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyRatepayerLink'], meta: { name: 'PropertyRatepayerLink' } }
    /**
     * Find zero or one PropertyRatepayerLink that matches the filter.
     * @param {PropertyRatepayerLinkFindUniqueArgs} args - Arguments to find a PropertyRatepayerLink
     * @example
     * // Get one PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyRatepayerLinkFindUniqueArgs>(args: SelectSubset<T, PropertyRatepayerLinkFindUniqueArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyRatepayerLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyRatepayerLinkFindUniqueOrThrowArgs} args - Arguments to find a PropertyRatepayerLink
     * @example
     * // Get one PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyRatepayerLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyRatepayerLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyRatepayerLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkFindFirstArgs} args - Arguments to find a PropertyRatepayerLink
     * @example
     * // Get one PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyRatepayerLinkFindFirstArgs>(args?: SelectSubset<T, PropertyRatepayerLinkFindFirstArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyRatepayerLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkFindFirstOrThrowArgs} args - Arguments to find a PropertyRatepayerLink
     * @example
     * // Get one PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyRatepayerLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyRatepayerLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyRatepayerLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyRatepayerLinks
     * const propertyRatepayerLinks = await prisma.propertyRatepayerLink.findMany()
     * 
     * // Get first 10 PropertyRatepayerLinks
     * const propertyRatepayerLinks = await prisma.propertyRatepayerLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyRatepayerLinkWithIdOnly = await prisma.propertyRatepayerLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyRatepayerLinkFindManyArgs>(args?: SelectSubset<T, PropertyRatepayerLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyRatepayerLink.
     * @param {PropertyRatepayerLinkCreateArgs} args - Arguments to create a PropertyRatepayerLink.
     * @example
     * // Create one PropertyRatepayerLink
     * const PropertyRatepayerLink = await prisma.propertyRatepayerLink.create({
     *   data: {
     *     // ... data to create a PropertyRatepayerLink
     *   }
     * })
     * 
     */
    create<T extends PropertyRatepayerLinkCreateArgs>(args: SelectSubset<T, PropertyRatepayerLinkCreateArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyRatepayerLinks.
     * @param {PropertyRatepayerLinkCreateManyArgs} args - Arguments to create many PropertyRatepayerLinks.
     * @example
     * // Create many PropertyRatepayerLinks
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyRatepayerLinkCreateManyArgs>(args?: SelectSubset<T, PropertyRatepayerLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyRatepayerLinks and returns the data saved in the database.
     * @param {PropertyRatepayerLinkCreateManyAndReturnArgs} args - Arguments to create many PropertyRatepayerLinks.
     * @example
     * // Create many PropertyRatepayerLinks
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyRatepayerLinks and only return the `id`
     * const propertyRatepayerLinkWithIdOnly = await prisma.propertyRatepayerLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyRatepayerLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyRatepayerLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyRatepayerLink.
     * @param {PropertyRatepayerLinkDeleteArgs} args - Arguments to delete one PropertyRatepayerLink.
     * @example
     * // Delete one PropertyRatepayerLink
     * const PropertyRatepayerLink = await prisma.propertyRatepayerLink.delete({
     *   where: {
     *     // ... filter to delete one PropertyRatepayerLink
     *   }
     * })
     * 
     */
    delete<T extends PropertyRatepayerLinkDeleteArgs>(args: SelectSubset<T, PropertyRatepayerLinkDeleteArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyRatepayerLink.
     * @param {PropertyRatepayerLinkUpdateArgs} args - Arguments to update one PropertyRatepayerLink.
     * @example
     * // Update one PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyRatepayerLinkUpdateArgs>(args: SelectSubset<T, PropertyRatepayerLinkUpdateArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyRatepayerLinks.
     * @param {PropertyRatepayerLinkDeleteManyArgs} args - Arguments to filter PropertyRatepayerLinks to delete.
     * @example
     * // Delete a few PropertyRatepayerLinks
     * const { count } = await prisma.propertyRatepayerLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyRatepayerLinkDeleteManyArgs>(args?: SelectSubset<T, PropertyRatepayerLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyRatepayerLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyRatepayerLinks
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyRatepayerLinkUpdateManyArgs>(args: SelectSubset<T, PropertyRatepayerLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyRatepayerLinks and returns the data updated in the database.
     * @param {PropertyRatepayerLinkUpdateManyAndReturnArgs} args - Arguments to update many PropertyRatepayerLinks.
     * @example
     * // Update many PropertyRatepayerLinks
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyRatepayerLinks and only return the `id`
     * const propertyRatepayerLinkWithIdOnly = await prisma.propertyRatepayerLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyRatepayerLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyRatepayerLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyRatepayerLink.
     * @param {PropertyRatepayerLinkUpsertArgs} args - Arguments to update or create a PropertyRatepayerLink.
     * @example
     * // Update or create a PropertyRatepayerLink
     * const propertyRatepayerLink = await prisma.propertyRatepayerLink.upsert({
     *   create: {
     *     // ... data to create a PropertyRatepayerLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyRatepayerLink we want to update
     *   }
     * })
     */
    upsert<T extends PropertyRatepayerLinkUpsertArgs>(args: SelectSubset<T, PropertyRatepayerLinkUpsertArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyRatepayerLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkCountArgs} args - Arguments to filter PropertyRatepayerLinks to count.
     * @example
     * // Count the number of PropertyRatepayerLinks
     * const count = await prisma.propertyRatepayerLink.count({
     *   where: {
     *     // ... the filter for the PropertyRatepayerLinks we want to count
     *   }
     * })
    **/
    count<T extends PropertyRatepayerLinkCountArgs>(
      args?: Subset<T, PropertyRatepayerLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyRatepayerLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyRatepayerLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyRatepayerLinkAggregateArgs>(args: Subset<T, PropertyRatepayerLinkAggregateArgs>): Prisma.PrismaPromise<GetPropertyRatepayerLinkAggregateType<T>>

    /**
     * Group by PropertyRatepayerLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyRatepayerLinkGroupByArgs} args - Group by arguments.
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
      T extends PropertyRatepayerLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyRatepayerLinkGroupByArgs['orderBy'] }
        : { orderBy?: PropertyRatepayerLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyRatepayerLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyRatepayerLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyRatepayerLink model
   */
  readonly fields: PropertyRatepayerLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyRatepayerLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyRatepayerLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratepayer<T extends RatepayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RatepayerDefaultArgs<ExtArgs>>): Prisma__RatepayerClient<$Result.GetResult<Prisma.$RatepayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimDocuments<T extends PropertyRatepayerLink$claimDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, PropertyRatepayerLink$claimDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PropertyRatepayerLink model
   */
  interface PropertyRatepayerLinkFieldRefs {
    readonly id: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly unitId: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly propertyId: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly ratepayerId: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly ownershipType: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly ownershipPercentage: FieldRef<"PropertyRatepayerLink", 'Decimal'>
    readonly isPrimaryBillingContact: FieldRef<"PropertyRatepayerLink", 'Boolean'>
    readonly claimStatus: FieldRef<"PropertyRatepayerLink", 'String'>
    readonly effectiveFrom: FieldRef<"PropertyRatepayerLink", 'DateTime'>
    readonly effectiveTo: FieldRef<"PropertyRatepayerLink", 'DateTime'>
    readonly createdAt: FieldRef<"PropertyRatepayerLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyRatepayerLink findUnique
   */
  export type PropertyRatepayerLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter, which PropertyRatepayerLink to fetch.
     */
    where: PropertyRatepayerLinkWhereUniqueInput
  }

  /**
   * PropertyRatepayerLink findUniqueOrThrow
   */
  export type PropertyRatepayerLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter, which PropertyRatepayerLink to fetch.
     */
    where: PropertyRatepayerLinkWhereUniqueInput
  }

  /**
   * PropertyRatepayerLink findFirst
   */
  export type PropertyRatepayerLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter, which PropertyRatepayerLink to fetch.
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyRatepayerLinks to fetch.
     */
    orderBy?: PropertyRatepayerLinkOrderByWithRelationInput | PropertyRatepayerLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyRatepayerLinks.
     */
    cursor?: PropertyRatepayerLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyRatepayerLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyRatepayerLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyRatepayerLinks.
     */
    distinct?: PropertyRatepayerLinkScalarFieldEnum | PropertyRatepayerLinkScalarFieldEnum[]
  }

  /**
   * PropertyRatepayerLink findFirstOrThrow
   */
  export type PropertyRatepayerLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter, which PropertyRatepayerLink to fetch.
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyRatepayerLinks to fetch.
     */
    orderBy?: PropertyRatepayerLinkOrderByWithRelationInput | PropertyRatepayerLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyRatepayerLinks.
     */
    cursor?: PropertyRatepayerLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyRatepayerLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyRatepayerLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyRatepayerLinks.
     */
    distinct?: PropertyRatepayerLinkScalarFieldEnum | PropertyRatepayerLinkScalarFieldEnum[]
  }

  /**
   * PropertyRatepayerLink findMany
   */
  export type PropertyRatepayerLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter, which PropertyRatepayerLinks to fetch.
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyRatepayerLinks to fetch.
     */
    orderBy?: PropertyRatepayerLinkOrderByWithRelationInput | PropertyRatepayerLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyRatepayerLinks.
     */
    cursor?: PropertyRatepayerLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyRatepayerLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyRatepayerLinks.
     */
    skip?: number
    distinct?: PropertyRatepayerLinkScalarFieldEnum | PropertyRatepayerLinkScalarFieldEnum[]
  }

  /**
   * PropertyRatepayerLink create
   */
  export type PropertyRatepayerLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyRatepayerLink.
     */
    data: XOR<PropertyRatepayerLinkCreateInput, PropertyRatepayerLinkUncheckedCreateInput>
  }

  /**
   * PropertyRatepayerLink createMany
   */
  export type PropertyRatepayerLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyRatepayerLinks.
     */
    data: PropertyRatepayerLinkCreateManyInput | PropertyRatepayerLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyRatepayerLink createManyAndReturn
   */
  export type PropertyRatepayerLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyRatepayerLinks.
     */
    data: PropertyRatepayerLinkCreateManyInput | PropertyRatepayerLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyRatepayerLink update
   */
  export type PropertyRatepayerLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyRatepayerLink.
     */
    data: XOR<PropertyRatepayerLinkUpdateInput, PropertyRatepayerLinkUncheckedUpdateInput>
    /**
     * Choose, which PropertyRatepayerLink to update.
     */
    where: PropertyRatepayerLinkWhereUniqueInput
  }

  /**
   * PropertyRatepayerLink updateMany
   */
  export type PropertyRatepayerLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyRatepayerLinks.
     */
    data: XOR<PropertyRatepayerLinkUpdateManyMutationInput, PropertyRatepayerLinkUncheckedUpdateManyInput>
    /**
     * Filter which PropertyRatepayerLinks to update
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * Limit how many PropertyRatepayerLinks to update.
     */
    limit?: number
  }

  /**
   * PropertyRatepayerLink updateManyAndReturn
   */
  export type PropertyRatepayerLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * The data used to update PropertyRatepayerLinks.
     */
    data: XOR<PropertyRatepayerLinkUpdateManyMutationInput, PropertyRatepayerLinkUncheckedUpdateManyInput>
    /**
     * Filter which PropertyRatepayerLinks to update
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * Limit how many PropertyRatepayerLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyRatepayerLink upsert
   */
  export type PropertyRatepayerLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyRatepayerLink to update in case it exists.
     */
    where: PropertyRatepayerLinkWhereUniqueInput
    /**
     * In case the PropertyRatepayerLink found by the `where` argument doesn't exist, create a new PropertyRatepayerLink with this data.
     */
    create: XOR<PropertyRatepayerLinkCreateInput, PropertyRatepayerLinkUncheckedCreateInput>
    /**
     * In case the PropertyRatepayerLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyRatepayerLinkUpdateInput, PropertyRatepayerLinkUncheckedUpdateInput>
  }

  /**
   * PropertyRatepayerLink delete
   */
  export type PropertyRatepayerLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
    /**
     * Filter which PropertyRatepayerLink to delete.
     */
    where: PropertyRatepayerLinkWhereUniqueInput
  }

  /**
   * PropertyRatepayerLink deleteMany
   */
  export type PropertyRatepayerLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyRatepayerLinks to delete
     */
    where?: PropertyRatepayerLinkWhereInput
    /**
     * Limit how many PropertyRatepayerLinks to delete.
     */
    limit?: number
  }

  /**
   * PropertyRatepayerLink.claimDocuments
   */
  export type PropertyRatepayerLink$claimDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    where?: PropertyClaimDocumentWhereInput
    orderBy?: PropertyClaimDocumentOrderByWithRelationInput | PropertyClaimDocumentOrderByWithRelationInput[]
    cursor?: PropertyClaimDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyClaimDocumentScalarFieldEnum | PropertyClaimDocumentScalarFieldEnum[]
  }

  /**
   * PropertyRatepayerLink without action
   */
  export type PropertyRatepayerLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyRatepayerLink
     */
    select?: PropertyRatepayerLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyRatepayerLink
     */
    omit?: PropertyRatepayerLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyRatepayerLinkInclude<ExtArgs> | null
  }


  /**
   * Model PropertyClaimDocument
   */

  export type AggregatePropertyClaimDocument = {
    _count: PropertyClaimDocumentCountAggregateOutputType | null
    _min: PropertyClaimDocumentMinAggregateOutputType | null
    _max: PropertyClaimDocumentMaxAggregateOutputType | null
  }

  export type PropertyClaimDocumentMinAggregateOutputType = {
    id: string | null
    linkId: string | null
    documentType: string | null
    documentNumber: string | null
    issuingAuthority: string | null
    mediaUrl: string | null
    verificationStatus: string | null
    createdAt: Date | null
  }

  export type PropertyClaimDocumentMaxAggregateOutputType = {
    id: string | null
    linkId: string | null
    documentType: string | null
    documentNumber: string | null
    issuingAuthority: string | null
    mediaUrl: string | null
    verificationStatus: string | null
    createdAt: Date | null
  }

  export type PropertyClaimDocumentCountAggregateOutputType = {
    id: number
    linkId: number
    documentType: number
    documentNumber: number
    issuingAuthority: number
    mediaUrl: number
    verificationStatus: number
    createdAt: number
    _all: number
  }


  export type PropertyClaimDocumentMinAggregateInputType = {
    id?: true
    linkId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    mediaUrl?: true
    verificationStatus?: true
    createdAt?: true
  }

  export type PropertyClaimDocumentMaxAggregateInputType = {
    id?: true
    linkId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    mediaUrl?: true
    verificationStatus?: true
    createdAt?: true
  }

  export type PropertyClaimDocumentCountAggregateInputType = {
    id?: true
    linkId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    mediaUrl?: true
    verificationStatus?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyClaimDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyClaimDocument to aggregate.
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyClaimDocuments to fetch.
     */
    orderBy?: PropertyClaimDocumentOrderByWithRelationInput | PropertyClaimDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyClaimDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyClaimDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyClaimDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyClaimDocuments
    **/
    _count?: true | PropertyClaimDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyClaimDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyClaimDocumentMaxAggregateInputType
  }

  export type GetPropertyClaimDocumentAggregateType<T extends PropertyClaimDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyClaimDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyClaimDocument[P]>
      : GetScalarType<T[P], AggregatePropertyClaimDocument[P]>
  }




  export type PropertyClaimDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyClaimDocumentWhereInput
    orderBy?: PropertyClaimDocumentOrderByWithAggregationInput | PropertyClaimDocumentOrderByWithAggregationInput[]
    by: PropertyClaimDocumentScalarFieldEnum[] | PropertyClaimDocumentScalarFieldEnum
    having?: PropertyClaimDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyClaimDocumentCountAggregateInputType | true
    _min?: PropertyClaimDocumentMinAggregateInputType
    _max?: PropertyClaimDocumentMaxAggregateInputType
  }

  export type PropertyClaimDocumentGroupByOutputType = {
    id: string
    linkId: string
    documentType: string
    documentNumber: string | null
    issuingAuthority: string | null
    mediaUrl: string
    verificationStatus: string
    createdAt: Date
    _count: PropertyClaimDocumentCountAggregateOutputType | null
    _min: PropertyClaimDocumentMinAggregateOutputType | null
    _max: PropertyClaimDocumentMaxAggregateOutputType | null
  }

  type GetPropertyClaimDocumentGroupByPayload<T extends PropertyClaimDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyClaimDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyClaimDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyClaimDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyClaimDocumentGroupByOutputType[P]>
        }
      >
    >


  export type PropertyClaimDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    mediaUrl?: boolean
    verificationStatus?: boolean
    createdAt?: boolean
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyClaimDocument"]>

  export type PropertyClaimDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    mediaUrl?: boolean
    verificationStatus?: boolean
    createdAt?: boolean
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyClaimDocument"]>

  export type PropertyClaimDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    mediaUrl?: boolean
    verificationStatus?: boolean
    createdAt?: boolean
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyClaimDocument"]>

  export type PropertyClaimDocumentSelectScalar = {
    id?: boolean
    linkId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    mediaUrl?: boolean
    verificationStatus?: boolean
    createdAt?: boolean
  }

  export type PropertyClaimDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "linkId" | "documentType" | "documentNumber" | "issuingAuthority" | "mediaUrl" | "verificationStatus" | "createdAt", ExtArgs["result"]["propertyClaimDocument"]>
  export type PropertyClaimDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }
  export type PropertyClaimDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }
  export type PropertyClaimDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | PropertyRatepayerLinkDefaultArgs<ExtArgs>
  }

  export type $PropertyClaimDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyClaimDocument"
    objects: {
      link: Prisma.$PropertyRatepayerLinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      linkId: string
      documentType: string
      documentNumber: string | null
      issuingAuthority: string | null
      mediaUrl: string
      verificationStatus: string
      createdAt: Date
    }, ExtArgs["result"]["propertyClaimDocument"]>
    composites: {}
  }

  type PropertyClaimDocumentGetPayload<S extends boolean | null | undefined | PropertyClaimDocumentDefaultArgs> = $Result.GetResult<Prisma.$PropertyClaimDocumentPayload, S>

  type PropertyClaimDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyClaimDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyClaimDocumentCountAggregateInputType | true
    }

  export interface PropertyClaimDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyClaimDocument'], meta: { name: 'PropertyClaimDocument' } }
    /**
     * Find zero or one PropertyClaimDocument that matches the filter.
     * @param {PropertyClaimDocumentFindUniqueArgs} args - Arguments to find a PropertyClaimDocument
     * @example
     * // Get one PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyClaimDocumentFindUniqueArgs>(args: SelectSubset<T, PropertyClaimDocumentFindUniqueArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyClaimDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyClaimDocumentFindUniqueOrThrowArgs} args - Arguments to find a PropertyClaimDocument
     * @example
     * // Get one PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyClaimDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyClaimDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyClaimDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentFindFirstArgs} args - Arguments to find a PropertyClaimDocument
     * @example
     * // Get one PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyClaimDocumentFindFirstArgs>(args?: SelectSubset<T, PropertyClaimDocumentFindFirstArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyClaimDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentFindFirstOrThrowArgs} args - Arguments to find a PropertyClaimDocument
     * @example
     * // Get one PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyClaimDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyClaimDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyClaimDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyClaimDocuments
     * const propertyClaimDocuments = await prisma.propertyClaimDocument.findMany()
     * 
     * // Get first 10 PropertyClaimDocuments
     * const propertyClaimDocuments = await prisma.propertyClaimDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyClaimDocumentWithIdOnly = await prisma.propertyClaimDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyClaimDocumentFindManyArgs>(args?: SelectSubset<T, PropertyClaimDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyClaimDocument.
     * @param {PropertyClaimDocumentCreateArgs} args - Arguments to create a PropertyClaimDocument.
     * @example
     * // Create one PropertyClaimDocument
     * const PropertyClaimDocument = await prisma.propertyClaimDocument.create({
     *   data: {
     *     // ... data to create a PropertyClaimDocument
     *   }
     * })
     * 
     */
    create<T extends PropertyClaimDocumentCreateArgs>(args: SelectSubset<T, PropertyClaimDocumentCreateArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyClaimDocuments.
     * @param {PropertyClaimDocumentCreateManyArgs} args - Arguments to create many PropertyClaimDocuments.
     * @example
     * // Create many PropertyClaimDocuments
     * const propertyClaimDocument = await prisma.propertyClaimDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyClaimDocumentCreateManyArgs>(args?: SelectSubset<T, PropertyClaimDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyClaimDocuments and returns the data saved in the database.
     * @param {PropertyClaimDocumentCreateManyAndReturnArgs} args - Arguments to create many PropertyClaimDocuments.
     * @example
     * // Create many PropertyClaimDocuments
     * const propertyClaimDocument = await prisma.propertyClaimDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyClaimDocuments and only return the `id`
     * const propertyClaimDocumentWithIdOnly = await prisma.propertyClaimDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyClaimDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyClaimDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyClaimDocument.
     * @param {PropertyClaimDocumentDeleteArgs} args - Arguments to delete one PropertyClaimDocument.
     * @example
     * // Delete one PropertyClaimDocument
     * const PropertyClaimDocument = await prisma.propertyClaimDocument.delete({
     *   where: {
     *     // ... filter to delete one PropertyClaimDocument
     *   }
     * })
     * 
     */
    delete<T extends PropertyClaimDocumentDeleteArgs>(args: SelectSubset<T, PropertyClaimDocumentDeleteArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyClaimDocument.
     * @param {PropertyClaimDocumentUpdateArgs} args - Arguments to update one PropertyClaimDocument.
     * @example
     * // Update one PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyClaimDocumentUpdateArgs>(args: SelectSubset<T, PropertyClaimDocumentUpdateArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyClaimDocuments.
     * @param {PropertyClaimDocumentDeleteManyArgs} args - Arguments to filter PropertyClaimDocuments to delete.
     * @example
     * // Delete a few PropertyClaimDocuments
     * const { count } = await prisma.propertyClaimDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyClaimDocumentDeleteManyArgs>(args?: SelectSubset<T, PropertyClaimDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyClaimDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyClaimDocuments
     * const propertyClaimDocument = await prisma.propertyClaimDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyClaimDocumentUpdateManyArgs>(args: SelectSubset<T, PropertyClaimDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyClaimDocuments and returns the data updated in the database.
     * @param {PropertyClaimDocumentUpdateManyAndReturnArgs} args - Arguments to update many PropertyClaimDocuments.
     * @example
     * // Update many PropertyClaimDocuments
     * const propertyClaimDocument = await prisma.propertyClaimDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyClaimDocuments and only return the `id`
     * const propertyClaimDocumentWithIdOnly = await prisma.propertyClaimDocument.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyClaimDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyClaimDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyClaimDocument.
     * @param {PropertyClaimDocumentUpsertArgs} args - Arguments to update or create a PropertyClaimDocument.
     * @example
     * // Update or create a PropertyClaimDocument
     * const propertyClaimDocument = await prisma.propertyClaimDocument.upsert({
     *   create: {
     *     // ... data to create a PropertyClaimDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyClaimDocument we want to update
     *   }
     * })
     */
    upsert<T extends PropertyClaimDocumentUpsertArgs>(args: SelectSubset<T, PropertyClaimDocumentUpsertArgs<ExtArgs>>): Prisma__PropertyClaimDocumentClient<$Result.GetResult<Prisma.$PropertyClaimDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyClaimDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentCountArgs} args - Arguments to filter PropertyClaimDocuments to count.
     * @example
     * // Count the number of PropertyClaimDocuments
     * const count = await prisma.propertyClaimDocument.count({
     *   where: {
     *     // ... the filter for the PropertyClaimDocuments we want to count
     *   }
     * })
    **/
    count<T extends PropertyClaimDocumentCountArgs>(
      args?: Subset<T, PropertyClaimDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyClaimDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyClaimDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyClaimDocumentAggregateArgs>(args: Subset<T, PropertyClaimDocumentAggregateArgs>): Prisma.PrismaPromise<GetPropertyClaimDocumentAggregateType<T>>

    /**
     * Group by PropertyClaimDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyClaimDocumentGroupByArgs} args - Group by arguments.
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
      T extends PropertyClaimDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyClaimDocumentGroupByArgs['orderBy'] }
        : { orderBy?: PropertyClaimDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyClaimDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyClaimDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyClaimDocument model
   */
  readonly fields: PropertyClaimDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyClaimDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClaimDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    link<T extends PropertyRatepayerLinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyRatepayerLinkDefaultArgs<ExtArgs>>): Prisma__PropertyRatepayerLinkClient<$Result.GetResult<Prisma.$PropertyRatepayerLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyClaimDocument model
   */
  interface PropertyClaimDocumentFieldRefs {
    readonly id: FieldRef<"PropertyClaimDocument", 'String'>
    readonly linkId: FieldRef<"PropertyClaimDocument", 'String'>
    readonly documentType: FieldRef<"PropertyClaimDocument", 'String'>
    readonly documentNumber: FieldRef<"PropertyClaimDocument", 'String'>
    readonly issuingAuthority: FieldRef<"PropertyClaimDocument", 'String'>
    readonly mediaUrl: FieldRef<"PropertyClaimDocument", 'String'>
    readonly verificationStatus: FieldRef<"PropertyClaimDocument", 'String'>
    readonly createdAt: FieldRef<"PropertyClaimDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyClaimDocument findUnique
   */
  export type PropertyClaimDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyClaimDocument to fetch.
     */
    where: PropertyClaimDocumentWhereUniqueInput
  }

  /**
   * PropertyClaimDocument findUniqueOrThrow
   */
  export type PropertyClaimDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyClaimDocument to fetch.
     */
    where: PropertyClaimDocumentWhereUniqueInput
  }

  /**
   * PropertyClaimDocument findFirst
   */
  export type PropertyClaimDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyClaimDocument to fetch.
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyClaimDocuments to fetch.
     */
    orderBy?: PropertyClaimDocumentOrderByWithRelationInput | PropertyClaimDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyClaimDocuments.
     */
    cursor?: PropertyClaimDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyClaimDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyClaimDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyClaimDocuments.
     */
    distinct?: PropertyClaimDocumentScalarFieldEnum | PropertyClaimDocumentScalarFieldEnum[]
  }

  /**
   * PropertyClaimDocument findFirstOrThrow
   */
  export type PropertyClaimDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyClaimDocument to fetch.
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyClaimDocuments to fetch.
     */
    orderBy?: PropertyClaimDocumentOrderByWithRelationInput | PropertyClaimDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyClaimDocuments.
     */
    cursor?: PropertyClaimDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyClaimDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyClaimDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyClaimDocuments.
     */
    distinct?: PropertyClaimDocumentScalarFieldEnum | PropertyClaimDocumentScalarFieldEnum[]
  }

  /**
   * PropertyClaimDocument findMany
   */
  export type PropertyClaimDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyClaimDocuments to fetch.
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyClaimDocuments to fetch.
     */
    orderBy?: PropertyClaimDocumentOrderByWithRelationInput | PropertyClaimDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyClaimDocuments.
     */
    cursor?: PropertyClaimDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyClaimDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyClaimDocuments.
     */
    skip?: number
    distinct?: PropertyClaimDocumentScalarFieldEnum | PropertyClaimDocumentScalarFieldEnum[]
  }

  /**
   * PropertyClaimDocument create
   */
  export type PropertyClaimDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyClaimDocument.
     */
    data: XOR<PropertyClaimDocumentCreateInput, PropertyClaimDocumentUncheckedCreateInput>
  }

  /**
   * PropertyClaimDocument createMany
   */
  export type PropertyClaimDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyClaimDocuments.
     */
    data: PropertyClaimDocumentCreateManyInput | PropertyClaimDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyClaimDocument createManyAndReturn
   */
  export type PropertyClaimDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyClaimDocuments.
     */
    data: PropertyClaimDocumentCreateManyInput | PropertyClaimDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyClaimDocument update
   */
  export type PropertyClaimDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyClaimDocument.
     */
    data: XOR<PropertyClaimDocumentUpdateInput, PropertyClaimDocumentUncheckedUpdateInput>
    /**
     * Choose, which PropertyClaimDocument to update.
     */
    where: PropertyClaimDocumentWhereUniqueInput
  }

  /**
   * PropertyClaimDocument updateMany
   */
  export type PropertyClaimDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyClaimDocuments.
     */
    data: XOR<PropertyClaimDocumentUpdateManyMutationInput, PropertyClaimDocumentUncheckedUpdateManyInput>
    /**
     * Filter which PropertyClaimDocuments to update
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * Limit how many PropertyClaimDocuments to update.
     */
    limit?: number
  }

  /**
   * PropertyClaimDocument updateManyAndReturn
   */
  export type PropertyClaimDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * The data used to update PropertyClaimDocuments.
     */
    data: XOR<PropertyClaimDocumentUpdateManyMutationInput, PropertyClaimDocumentUncheckedUpdateManyInput>
    /**
     * Filter which PropertyClaimDocuments to update
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * Limit how many PropertyClaimDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyClaimDocument upsert
   */
  export type PropertyClaimDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyClaimDocument to update in case it exists.
     */
    where: PropertyClaimDocumentWhereUniqueInput
    /**
     * In case the PropertyClaimDocument found by the `where` argument doesn't exist, create a new PropertyClaimDocument with this data.
     */
    create: XOR<PropertyClaimDocumentCreateInput, PropertyClaimDocumentUncheckedCreateInput>
    /**
     * In case the PropertyClaimDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyClaimDocumentUpdateInput, PropertyClaimDocumentUncheckedUpdateInput>
  }

  /**
   * PropertyClaimDocument delete
   */
  export type PropertyClaimDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
    /**
     * Filter which PropertyClaimDocument to delete.
     */
    where: PropertyClaimDocumentWhereUniqueInput
  }

  /**
   * PropertyClaimDocument deleteMany
   */
  export type PropertyClaimDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyClaimDocuments to delete
     */
    where?: PropertyClaimDocumentWhereInput
    /**
     * Limit how many PropertyClaimDocuments to delete.
     */
    limit?: number
  }

  /**
   * PropertyClaimDocument without action
   */
  export type PropertyClaimDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyClaimDocument
     */
    select?: PropertyClaimDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyClaimDocument
     */
    omit?: PropertyClaimDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyClaimDocumentInclude<ExtArgs> | null
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


  export const RatepayerScalarFieldEnum: {
    id: 'id',
    code: 'code',
    ratepayerType: 'ratepayerType',
    legalName: 'legalName',
    phone: 'phone',
    email: 'email',
    regionId: 'regionId',
    assemblyId: 'assemblyId',
    locationGeo: 'locationGeo',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RatepayerScalarFieldEnum = (typeof RatepayerScalarFieldEnum)[keyof typeof RatepayerScalarFieldEnum]


  export const RatepayerVerificationScalarFieldEnum: {
    id: 'id',
    ratepayerId: 'ratepayerId',
    provider: 'provider',
    providerReference: 'providerReference',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt'
  };

  export type RatepayerVerificationScalarFieldEnum = (typeof RatepayerVerificationScalarFieldEnum)[keyof typeof RatepayerVerificationScalarFieldEnum]


  export const PropertyRatepayerLinkScalarFieldEnum: {
    id: 'id',
    unitId: 'unitId',
    propertyId: 'propertyId',
    ratepayerId: 'ratepayerId',
    ownershipType: 'ownershipType',
    ownershipPercentage: 'ownershipPercentage',
    isPrimaryBillingContact: 'isPrimaryBillingContact',
    claimStatus: 'claimStatus',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    createdAt: 'createdAt'
  };

  export type PropertyRatepayerLinkScalarFieldEnum = (typeof PropertyRatepayerLinkScalarFieldEnum)[keyof typeof PropertyRatepayerLinkScalarFieldEnum]


  export const PropertyClaimDocumentScalarFieldEnum: {
    id: 'id',
    linkId: 'linkId',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    issuingAuthority: 'issuingAuthority',
    mediaUrl: 'mediaUrl',
    verificationStatus: 'verificationStatus',
    createdAt: 'createdAt'
  };

  export type PropertyClaimDocumentScalarFieldEnum = (typeof PropertyClaimDocumentScalarFieldEnum)[keyof typeof PropertyClaimDocumentScalarFieldEnum]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type RatepayerWhereInput = {
    AND?: RatepayerWhereInput | RatepayerWhereInput[]
    OR?: RatepayerWhereInput[]
    NOT?: RatepayerWhereInput | RatepayerWhereInput[]
    id?: UuidFilter<"Ratepayer"> | string
    code?: StringFilter<"Ratepayer"> | string
    ratepayerType?: StringFilter<"Ratepayer"> | string
    legalName?: StringFilter<"Ratepayer"> | string
    phone?: StringFilter<"Ratepayer"> | string
    email?: StringNullableFilter<"Ratepayer"> | string | null
    regionId?: UuidFilter<"Ratepayer"> | string
    assemblyId?: UuidFilter<"Ratepayer"> | string
    locationGeo?: JsonFilter<"Ratepayer">
    status?: StringFilter<"Ratepayer"> | string
    createdAt?: DateTimeFilter<"Ratepayer"> | Date | string
    updatedAt?: DateTimeFilter<"Ratepayer"> | Date | string
    verifications?: RatepayerVerificationListRelationFilter
    propertyLinks?: PropertyRatepayerLinkListRelationFilter
  }

  export type RatepayerOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    ratepayerType?: SortOrder
    legalName?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    regionId?: SortOrder
    assemblyId?: SortOrder
    locationGeo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verifications?: RatepayerVerificationOrderByRelationAggregateInput
    propertyLinks?: PropertyRatepayerLinkOrderByRelationAggregateInput
  }

  export type RatepayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RatepayerWhereInput | RatepayerWhereInput[]
    OR?: RatepayerWhereInput[]
    NOT?: RatepayerWhereInput | RatepayerWhereInput[]
    ratepayerType?: StringFilter<"Ratepayer"> | string
    legalName?: StringFilter<"Ratepayer"> | string
    phone?: StringFilter<"Ratepayer"> | string
    email?: StringNullableFilter<"Ratepayer"> | string | null
    regionId?: UuidFilter<"Ratepayer"> | string
    assemblyId?: UuidFilter<"Ratepayer"> | string
    locationGeo?: JsonFilter<"Ratepayer">
    status?: StringFilter<"Ratepayer"> | string
    createdAt?: DateTimeFilter<"Ratepayer"> | Date | string
    updatedAt?: DateTimeFilter<"Ratepayer"> | Date | string
    verifications?: RatepayerVerificationListRelationFilter
    propertyLinks?: PropertyRatepayerLinkListRelationFilter
  }, "id" | "code">

  export type RatepayerOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    ratepayerType?: SortOrder
    legalName?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    regionId?: SortOrder
    assemblyId?: SortOrder
    locationGeo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RatepayerCountOrderByAggregateInput
    _max?: RatepayerMaxOrderByAggregateInput
    _min?: RatepayerMinOrderByAggregateInput
  }

  export type RatepayerScalarWhereWithAggregatesInput = {
    AND?: RatepayerScalarWhereWithAggregatesInput | RatepayerScalarWhereWithAggregatesInput[]
    OR?: RatepayerScalarWhereWithAggregatesInput[]
    NOT?: RatepayerScalarWhereWithAggregatesInput | RatepayerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ratepayer"> | string
    code?: StringWithAggregatesFilter<"Ratepayer"> | string
    ratepayerType?: StringWithAggregatesFilter<"Ratepayer"> | string
    legalName?: StringWithAggregatesFilter<"Ratepayer"> | string
    phone?: StringWithAggregatesFilter<"Ratepayer"> | string
    email?: StringNullableWithAggregatesFilter<"Ratepayer"> | string | null
    regionId?: UuidWithAggregatesFilter<"Ratepayer"> | string
    assemblyId?: UuidWithAggregatesFilter<"Ratepayer"> | string
    locationGeo?: JsonWithAggregatesFilter<"Ratepayer">
    status?: StringWithAggregatesFilter<"Ratepayer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Ratepayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ratepayer"> | Date | string
  }

  export type RatepayerVerificationWhereInput = {
    AND?: RatepayerVerificationWhereInput | RatepayerVerificationWhereInput[]
    OR?: RatepayerVerificationWhereInput[]
    NOT?: RatepayerVerificationWhereInput | RatepayerVerificationWhereInput[]
    id?: UuidFilter<"RatepayerVerification"> | string
    ratepayerId?: UuidFilter<"RatepayerVerification"> | string
    provider?: StringFilter<"RatepayerVerification"> | string
    providerReference?: StringFilter<"RatepayerVerification"> | string
    verificationStatus?: StringFilter<"RatepayerVerification"> | string
    verifiedAt?: DateTimeNullableFilter<"RatepayerVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"RatepayerVerification"> | Date | string
    ratepayer?: XOR<RatepayerScalarRelationFilter, RatepayerWhereInput>
  }

  export type RatepayerVerificationOrderByWithRelationInput = {
    id?: SortOrder
    ratepayerId?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    ratepayer?: RatepayerOrderByWithRelationInput
  }

  export type RatepayerVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RatepayerVerificationWhereInput | RatepayerVerificationWhereInput[]
    OR?: RatepayerVerificationWhereInput[]
    NOT?: RatepayerVerificationWhereInput | RatepayerVerificationWhereInput[]
    ratepayerId?: UuidFilter<"RatepayerVerification"> | string
    provider?: StringFilter<"RatepayerVerification"> | string
    providerReference?: StringFilter<"RatepayerVerification"> | string
    verificationStatus?: StringFilter<"RatepayerVerification"> | string
    verifiedAt?: DateTimeNullableFilter<"RatepayerVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"RatepayerVerification"> | Date | string
    ratepayer?: XOR<RatepayerScalarRelationFilter, RatepayerWhereInput>
  }, "id">

  export type RatepayerVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    ratepayerId?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RatepayerVerificationCountOrderByAggregateInput
    _max?: RatepayerVerificationMaxOrderByAggregateInput
    _min?: RatepayerVerificationMinOrderByAggregateInput
  }

  export type RatepayerVerificationScalarWhereWithAggregatesInput = {
    AND?: RatepayerVerificationScalarWhereWithAggregatesInput | RatepayerVerificationScalarWhereWithAggregatesInput[]
    OR?: RatepayerVerificationScalarWhereWithAggregatesInput[]
    NOT?: RatepayerVerificationScalarWhereWithAggregatesInput | RatepayerVerificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RatepayerVerification"> | string
    ratepayerId?: UuidWithAggregatesFilter<"RatepayerVerification"> | string
    provider?: StringWithAggregatesFilter<"RatepayerVerification"> | string
    providerReference?: StringWithAggregatesFilter<"RatepayerVerification"> | string
    verificationStatus?: StringWithAggregatesFilter<"RatepayerVerification"> | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"RatepayerVerification"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RatepayerVerification"> | Date | string
  }

  export type PropertyRatepayerLinkWhereInput = {
    AND?: PropertyRatepayerLinkWhereInput | PropertyRatepayerLinkWhereInput[]
    OR?: PropertyRatepayerLinkWhereInput[]
    NOT?: PropertyRatepayerLinkWhereInput | PropertyRatepayerLinkWhereInput[]
    id?: UuidFilter<"PropertyRatepayerLink"> | string
    unitId?: UuidFilter<"PropertyRatepayerLink"> | string
    propertyId?: UuidFilter<"PropertyRatepayerLink"> | string
    ratepayerId?: UuidFilter<"PropertyRatepayerLink"> | string
    ownershipType?: StringFilter<"PropertyRatepayerLink"> | string
    ownershipPercentage?: DecimalFilter<"PropertyRatepayerLink"> | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFilter<"PropertyRatepayerLink"> | boolean
    claimStatus?: StringFilter<"PropertyRatepayerLink"> | string
    effectiveFrom?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"PropertyRatepayerLink"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
    ratepayer?: XOR<RatepayerScalarRelationFilter, RatepayerWhereInput>
    claimDocuments?: PropertyClaimDocumentListRelationFilter
  }

  export type PropertyRatepayerLinkOrderByWithRelationInput = {
    id?: SortOrder
    unitId?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    ownershipType?: SortOrder
    ownershipPercentage?: SortOrder
    isPrimaryBillingContact?: SortOrder
    claimStatus?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    ratepayer?: RatepayerOrderByWithRelationInput
    claimDocuments?: PropertyClaimDocumentOrderByRelationAggregateInput
  }

  export type PropertyRatepayerLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    unitId_ratepayerId?: PropertyRatepayerLinkUnitIdRatepayerIdCompoundUniqueInput
    AND?: PropertyRatepayerLinkWhereInput | PropertyRatepayerLinkWhereInput[]
    OR?: PropertyRatepayerLinkWhereInput[]
    NOT?: PropertyRatepayerLinkWhereInput | PropertyRatepayerLinkWhereInput[]
    unitId?: UuidFilter<"PropertyRatepayerLink"> | string
    propertyId?: UuidFilter<"PropertyRatepayerLink"> | string
    ratepayerId?: UuidFilter<"PropertyRatepayerLink"> | string
    ownershipType?: StringFilter<"PropertyRatepayerLink"> | string
    ownershipPercentage?: DecimalFilter<"PropertyRatepayerLink"> | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFilter<"PropertyRatepayerLink"> | boolean
    claimStatus?: StringFilter<"PropertyRatepayerLink"> | string
    effectiveFrom?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"PropertyRatepayerLink"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
    ratepayer?: XOR<RatepayerScalarRelationFilter, RatepayerWhereInput>
    claimDocuments?: PropertyClaimDocumentListRelationFilter
  }, "id" | "unitId_ratepayerId">

  export type PropertyRatepayerLinkOrderByWithAggregationInput = {
    id?: SortOrder
    unitId?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    ownershipType?: SortOrder
    ownershipPercentage?: SortOrder
    isPrimaryBillingContact?: SortOrder
    claimStatus?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PropertyRatepayerLinkCountOrderByAggregateInput
    _avg?: PropertyRatepayerLinkAvgOrderByAggregateInput
    _max?: PropertyRatepayerLinkMaxOrderByAggregateInput
    _min?: PropertyRatepayerLinkMinOrderByAggregateInput
    _sum?: PropertyRatepayerLinkSumOrderByAggregateInput
  }

  export type PropertyRatepayerLinkScalarWhereWithAggregatesInput = {
    AND?: PropertyRatepayerLinkScalarWhereWithAggregatesInput | PropertyRatepayerLinkScalarWhereWithAggregatesInput[]
    OR?: PropertyRatepayerLinkScalarWhereWithAggregatesInput[]
    NOT?: PropertyRatepayerLinkScalarWhereWithAggregatesInput | PropertyRatepayerLinkScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyRatepayerLink"> | string
    unitId?: UuidWithAggregatesFilter<"PropertyRatepayerLink"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyRatepayerLink"> | string
    ratepayerId?: UuidWithAggregatesFilter<"PropertyRatepayerLink"> | string
    ownershipType?: StringWithAggregatesFilter<"PropertyRatepayerLink"> | string
    ownershipPercentage?: DecimalWithAggregatesFilter<"PropertyRatepayerLink"> | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolWithAggregatesFilter<"PropertyRatepayerLink"> | boolean
    claimStatus?: StringWithAggregatesFilter<"PropertyRatepayerLink"> | string
    effectiveFrom?: DateTimeWithAggregatesFilter<"PropertyRatepayerLink"> | Date | string
    effectiveTo?: DateTimeNullableWithAggregatesFilter<"PropertyRatepayerLink"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PropertyRatepayerLink"> | Date | string
  }

  export type PropertyClaimDocumentWhereInput = {
    AND?: PropertyClaimDocumentWhereInput | PropertyClaimDocumentWhereInput[]
    OR?: PropertyClaimDocumentWhereInput[]
    NOT?: PropertyClaimDocumentWhereInput | PropertyClaimDocumentWhereInput[]
    id?: UuidFilter<"PropertyClaimDocument"> | string
    linkId?: UuidFilter<"PropertyClaimDocument"> | string
    documentType?: StringFilter<"PropertyClaimDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    mediaUrl?: StringFilter<"PropertyClaimDocument"> | string
    verificationStatus?: StringFilter<"PropertyClaimDocument"> | string
    createdAt?: DateTimeFilter<"PropertyClaimDocument"> | Date | string
    link?: XOR<PropertyRatepayerLinkScalarRelationFilter, PropertyRatepayerLinkWhereInput>
  }

  export type PropertyClaimDocumentOrderByWithRelationInput = {
    id?: SortOrder
    linkId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuingAuthority?: SortOrderInput | SortOrder
    mediaUrl?: SortOrder
    verificationStatus?: SortOrder
    createdAt?: SortOrder
    link?: PropertyRatepayerLinkOrderByWithRelationInput
  }

  export type PropertyClaimDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyClaimDocumentWhereInput | PropertyClaimDocumentWhereInput[]
    OR?: PropertyClaimDocumentWhereInput[]
    NOT?: PropertyClaimDocumentWhereInput | PropertyClaimDocumentWhereInput[]
    linkId?: UuidFilter<"PropertyClaimDocument"> | string
    documentType?: StringFilter<"PropertyClaimDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    mediaUrl?: StringFilter<"PropertyClaimDocument"> | string
    verificationStatus?: StringFilter<"PropertyClaimDocument"> | string
    createdAt?: DateTimeFilter<"PropertyClaimDocument"> | Date | string
    link?: XOR<PropertyRatepayerLinkScalarRelationFilter, PropertyRatepayerLinkWhereInput>
  }, "id">

  export type PropertyClaimDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    linkId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuingAuthority?: SortOrderInput | SortOrder
    mediaUrl?: SortOrder
    verificationStatus?: SortOrder
    createdAt?: SortOrder
    _count?: PropertyClaimDocumentCountOrderByAggregateInput
    _max?: PropertyClaimDocumentMaxOrderByAggregateInput
    _min?: PropertyClaimDocumentMinOrderByAggregateInput
  }

  export type PropertyClaimDocumentScalarWhereWithAggregatesInput = {
    AND?: PropertyClaimDocumentScalarWhereWithAggregatesInput | PropertyClaimDocumentScalarWhereWithAggregatesInput[]
    OR?: PropertyClaimDocumentScalarWhereWithAggregatesInput[]
    NOT?: PropertyClaimDocumentScalarWhereWithAggregatesInput | PropertyClaimDocumentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyClaimDocument"> | string
    linkId?: UuidWithAggregatesFilter<"PropertyClaimDocument"> | string
    documentType?: StringWithAggregatesFilter<"PropertyClaimDocument"> | string
    documentNumber?: StringNullableWithAggregatesFilter<"PropertyClaimDocument"> | string | null
    issuingAuthority?: StringNullableWithAggregatesFilter<"PropertyClaimDocument"> | string | null
    mediaUrl?: StringWithAggregatesFilter<"PropertyClaimDocument"> | string
    verificationStatus?: StringWithAggregatesFilter<"PropertyClaimDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PropertyClaimDocument"> | Date | string
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

  export type RatepayerCreateInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    verifications?: RatepayerVerificationCreateNestedManyWithoutRatepayerInput
    propertyLinks?: PropertyRatepayerLinkCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerUncheckedCreateInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    verifications?: RatepayerVerificationUncheckedCreateNestedManyWithoutRatepayerInput
    propertyLinks?: PropertyRatepayerLinkUncheckedCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: RatepayerVerificationUpdateManyWithoutRatepayerNestedInput
    propertyLinks?: PropertyRatepayerLinkUpdateManyWithoutRatepayerNestedInput
  }

  export type RatepayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: RatepayerVerificationUncheckedUpdateManyWithoutRatepayerNestedInput
    propertyLinks?: PropertyRatepayerLinkUncheckedUpdateManyWithoutRatepayerNestedInput
  }

  export type RatepayerCreateManyInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatepayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationCreateInput = {
    id?: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    ratepayer: RatepayerCreateNestedOneWithoutVerificationsInput
  }

  export type RatepayerVerificationUncheckedCreateInput = {
    id?: string
    ratepayerId: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RatepayerVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratepayer?: RatepayerUpdateOneRequiredWithoutVerificationsNestedInput
  }

  export type RatepayerVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationCreateManyInput = {
    id?: string
    ratepayerId: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RatepayerVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyRatepayerLinkCreateInput = {
    id?: string
    unitId: string
    propertyId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    ratepayer: RatepayerCreateNestedOneWithoutPropertyLinksInput
    claimDocuments?: PropertyClaimDocumentCreateNestedManyWithoutLinkInput
  }

  export type PropertyRatepayerLinkUncheckedCreateInput = {
    id?: string
    unitId: string
    propertyId: string
    ratepayerId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    claimDocuments?: PropertyClaimDocumentUncheckedCreateNestedManyWithoutLinkInput
  }

  export type PropertyRatepayerLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratepayer?: RatepayerUpdateOneRequiredWithoutPropertyLinksNestedInput
    claimDocuments?: PropertyClaimDocumentUpdateManyWithoutLinkNestedInput
  }

  export type PropertyRatepayerLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimDocuments?: PropertyClaimDocumentUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type PropertyRatepayerLinkCreateManyInput = {
    id?: string
    unitId: string
    propertyId: string
    ratepayerId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
  }

  export type PropertyRatepayerLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyRatepayerLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentCreateInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
    link: PropertyRatepayerLinkCreateNestedOneWithoutClaimDocumentsInput
  }

  export type PropertyClaimDocumentUncheckedCreateInput = {
    id?: string
    linkId: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
  }

  export type PropertyClaimDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    link?: PropertyRatepayerLinkUpdateOneRequiredWithoutClaimDocumentsNestedInput
  }

  export type PropertyClaimDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentCreateManyInput = {
    id?: string
    linkId: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
  }

  export type PropertyClaimDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RatepayerVerificationListRelationFilter = {
    every?: RatepayerVerificationWhereInput
    some?: RatepayerVerificationWhereInput
    none?: RatepayerVerificationWhereInput
  }

  export type PropertyRatepayerLinkListRelationFilter = {
    every?: PropertyRatepayerLinkWhereInput
    some?: PropertyRatepayerLinkWhereInput
    none?: PropertyRatepayerLinkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RatepayerVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyRatepayerLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RatepayerCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    ratepayerType?: SortOrder
    legalName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    regionId?: SortOrder
    assemblyId?: SortOrder
    locationGeo?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatepayerMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    ratepayerType?: SortOrder
    legalName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    regionId?: SortOrder
    assemblyId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatepayerMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    ratepayerType?: SortOrder
    legalName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    regionId?: SortOrder
    assemblyId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type RatepayerScalarRelationFilter = {
    is?: RatepayerWhereInput
    isNot?: RatepayerWhereInput
  }

  export type RatepayerVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    ratepayerId?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RatepayerVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    ratepayerId?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RatepayerVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    ratepayerId?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PropertyClaimDocumentListRelationFilter = {
    every?: PropertyClaimDocumentWhereInput
    some?: PropertyClaimDocumentWhereInput
    none?: PropertyClaimDocumentWhereInput
  }

  export type PropertyClaimDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyRatepayerLinkUnitIdRatepayerIdCompoundUniqueInput = {
    unitId: string
    ratepayerId: string
  }

  export type PropertyRatepayerLinkCountOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    ownershipType?: SortOrder
    ownershipPercentage?: SortOrder
    isPrimaryBillingContact?: SortOrder
    claimStatus?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyRatepayerLinkAvgOrderByAggregateInput = {
    ownershipPercentage?: SortOrder
  }

  export type PropertyRatepayerLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    ownershipType?: SortOrder
    ownershipPercentage?: SortOrder
    isPrimaryBillingContact?: SortOrder
    claimStatus?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyRatepayerLinkMinOrderByAggregateInput = {
    id?: SortOrder
    unitId?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    ownershipType?: SortOrder
    ownershipPercentage?: SortOrder
    isPrimaryBillingContact?: SortOrder
    claimStatus?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyRatepayerLinkSumOrderByAggregateInput = {
    ownershipPercentage?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PropertyRatepayerLinkScalarRelationFilter = {
    is?: PropertyRatepayerLinkWhereInput
    isNot?: PropertyRatepayerLinkWhereInput
  }

  export type PropertyClaimDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    mediaUrl?: SortOrder
    verificationStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyClaimDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    mediaUrl?: SortOrder
    verificationStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyClaimDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    mediaUrl?: SortOrder
    verificationStatus?: SortOrder
    createdAt?: SortOrder
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

  export type RatepayerVerificationCreateNestedManyWithoutRatepayerInput = {
    create?: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput> | RatepayerVerificationCreateWithoutRatepayerInput[] | RatepayerVerificationUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: RatepayerVerificationCreateOrConnectWithoutRatepayerInput | RatepayerVerificationCreateOrConnectWithoutRatepayerInput[]
    createMany?: RatepayerVerificationCreateManyRatepayerInputEnvelope
    connect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
  }

  export type PropertyRatepayerLinkCreateNestedManyWithoutRatepayerInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput> | PropertyRatepayerLinkCreateWithoutRatepayerInput[] | PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput | PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput[]
    createMany?: PropertyRatepayerLinkCreateManyRatepayerInputEnvelope
    connect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
  }

  export type RatepayerVerificationUncheckedCreateNestedManyWithoutRatepayerInput = {
    create?: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput> | RatepayerVerificationCreateWithoutRatepayerInput[] | RatepayerVerificationUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: RatepayerVerificationCreateOrConnectWithoutRatepayerInput | RatepayerVerificationCreateOrConnectWithoutRatepayerInput[]
    createMany?: RatepayerVerificationCreateManyRatepayerInputEnvelope
    connect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
  }

  export type PropertyRatepayerLinkUncheckedCreateNestedManyWithoutRatepayerInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput> | PropertyRatepayerLinkCreateWithoutRatepayerInput[] | PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput | PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput[]
    createMany?: PropertyRatepayerLinkCreateManyRatepayerInputEnvelope
    connect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RatepayerVerificationUpdateManyWithoutRatepayerNestedInput = {
    create?: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput> | RatepayerVerificationCreateWithoutRatepayerInput[] | RatepayerVerificationUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: RatepayerVerificationCreateOrConnectWithoutRatepayerInput | RatepayerVerificationCreateOrConnectWithoutRatepayerInput[]
    upsert?: RatepayerVerificationUpsertWithWhereUniqueWithoutRatepayerInput | RatepayerVerificationUpsertWithWhereUniqueWithoutRatepayerInput[]
    createMany?: RatepayerVerificationCreateManyRatepayerInputEnvelope
    set?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    disconnect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    delete?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    connect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    update?: RatepayerVerificationUpdateWithWhereUniqueWithoutRatepayerInput | RatepayerVerificationUpdateWithWhereUniqueWithoutRatepayerInput[]
    updateMany?: RatepayerVerificationUpdateManyWithWhereWithoutRatepayerInput | RatepayerVerificationUpdateManyWithWhereWithoutRatepayerInput[]
    deleteMany?: RatepayerVerificationScalarWhereInput | RatepayerVerificationScalarWhereInput[]
  }

  export type PropertyRatepayerLinkUpdateManyWithoutRatepayerNestedInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput> | PropertyRatepayerLinkCreateWithoutRatepayerInput[] | PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput | PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput[]
    upsert?: PropertyRatepayerLinkUpsertWithWhereUniqueWithoutRatepayerInput | PropertyRatepayerLinkUpsertWithWhereUniqueWithoutRatepayerInput[]
    createMany?: PropertyRatepayerLinkCreateManyRatepayerInputEnvelope
    set?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    disconnect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    delete?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    connect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    update?: PropertyRatepayerLinkUpdateWithWhereUniqueWithoutRatepayerInput | PropertyRatepayerLinkUpdateWithWhereUniqueWithoutRatepayerInput[]
    updateMany?: PropertyRatepayerLinkUpdateManyWithWhereWithoutRatepayerInput | PropertyRatepayerLinkUpdateManyWithWhereWithoutRatepayerInput[]
    deleteMany?: PropertyRatepayerLinkScalarWhereInput | PropertyRatepayerLinkScalarWhereInput[]
  }

  export type RatepayerVerificationUncheckedUpdateManyWithoutRatepayerNestedInput = {
    create?: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput> | RatepayerVerificationCreateWithoutRatepayerInput[] | RatepayerVerificationUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: RatepayerVerificationCreateOrConnectWithoutRatepayerInput | RatepayerVerificationCreateOrConnectWithoutRatepayerInput[]
    upsert?: RatepayerVerificationUpsertWithWhereUniqueWithoutRatepayerInput | RatepayerVerificationUpsertWithWhereUniqueWithoutRatepayerInput[]
    createMany?: RatepayerVerificationCreateManyRatepayerInputEnvelope
    set?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    disconnect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    delete?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    connect?: RatepayerVerificationWhereUniqueInput | RatepayerVerificationWhereUniqueInput[]
    update?: RatepayerVerificationUpdateWithWhereUniqueWithoutRatepayerInput | RatepayerVerificationUpdateWithWhereUniqueWithoutRatepayerInput[]
    updateMany?: RatepayerVerificationUpdateManyWithWhereWithoutRatepayerInput | RatepayerVerificationUpdateManyWithWhereWithoutRatepayerInput[]
    deleteMany?: RatepayerVerificationScalarWhereInput | RatepayerVerificationScalarWhereInput[]
  }

  export type PropertyRatepayerLinkUncheckedUpdateManyWithoutRatepayerNestedInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput> | PropertyRatepayerLinkCreateWithoutRatepayerInput[] | PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput[]
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput | PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput[]
    upsert?: PropertyRatepayerLinkUpsertWithWhereUniqueWithoutRatepayerInput | PropertyRatepayerLinkUpsertWithWhereUniqueWithoutRatepayerInput[]
    createMany?: PropertyRatepayerLinkCreateManyRatepayerInputEnvelope
    set?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    disconnect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    delete?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    connect?: PropertyRatepayerLinkWhereUniqueInput | PropertyRatepayerLinkWhereUniqueInput[]
    update?: PropertyRatepayerLinkUpdateWithWhereUniqueWithoutRatepayerInput | PropertyRatepayerLinkUpdateWithWhereUniqueWithoutRatepayerInput[]
    updateMany?: PropertyRatepayerLinkUpdateManyWithWhereWithoutRatepayerInput | PropertyRatepayerLinkUpdateManyWithWhereWithoutRatepayerInput[]
    deleteMany?: PropertyRatepayerLinkScalarWhereInput | PropertyRatepayerLinkScalarWhereInput[]
  }

  export type RatepayerCreateNestedOneWithoutVerificationsInput = {
    create?: XOR<RatepayerCreateWithoutVerificationsInput, RatepayerUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: RatepayerCreateOrConnectWithoutVerificationsInput
    connect?: RatepayerWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RatepayerUpdateOneRequiredWithoutVerificationsNestedInput = {
    create?: XOR<RatepayerCreateWithoutVerificationsInput, RatepayerUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: RatepayerCreateOrConnectWithoutVerificationsInput
    upsert?: RatepayerUpsertWithoutVerificationsInput
    connect?: RatepayerWhereUniqueInput
    update?: XOR<XOR<RatepayerUpdateToOneWithWhereWithoutVerificationsInput, RatepayerUpdateWithoutVerificationsInput>, RatepayerUncheckedUpdateWithoutVerificationsInput>
  }

  export type RatepayerCreateNestedOneWithoutPropertyLinksInput = {
    create?: XOR<RatepayerCreateWithoutPropertyLinksInput, RatepayerUncheckedCreateWithoutPropertyLinksInput>
    connectOrCreate?: RatepayerCreateOrConnectWithoutPropertyLinksInput
    connect?: RatepayerWhereUniqueInput
  }

  export type PropertyClaimDocumentCreateNestedManyWithoutLinkInput = {
    create?: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput> | PropertyClaimDocumentCreateWithoutLinkInput[] | PropertyClaimDocumentUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: PropertyClaimDocumentCreateOrConnectWithoutLinkInput | PropertyClaimDocumentCreateOrConnectWithoutLinkInput[]
    createMany?: PropertyClaimDocumentCreateManyLinkInputEnvelope
    connect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
  }

  export type PropertyClaimDocumentUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput> | PropertyClaimDocumentCreateWithoutLinkInput[] | PropertyClaimDocumentUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: PropertyClaimDocumentCreateOrConnectWithoutLinkInput | PropertyClaimDocumentCreateOrConnectWithoutLinkInput[]
    createMany?: PropertyClaimDocumentCreateManyLinkInputEnvelope
    connect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RatepayerUpdateOneRequiredWithoutPropertyLinksNestedInput = {
    create?: XOR<RatepayerCreateWithoutPropertyLinksInput, RatepayerUncheckedCreateWithoutPropertyLinksInput>
    connectOrCreate?: RatepayerCreateOrConnectWithoutPropertyLinksInput
    upsert?: RatepayerUpsertWithoutPropertyLinksInput
    connect?: RatepayerWhereUniqueInput
    update?: XOR<XOR<RatepayerUpdateToOneWithWhereWithoutPropertyLinksInput, RatepayerUpdateWithoutPropertyLinksInput>, RatepayerUncheckedUpdateWithoutPropertyLinksInput>
  }

  export type PropertyClaimDocumentUpdateManyWithoutLinkNestedInput = {
    create?: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput> | PropertyClaimDocumentCreateWithoutLinkInput[] | PropertyClaimDocumentUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: PropertyClaimDocumentCreateOrConnectWithoutLinkInput | PropertyClaimDocumentCreateOrConnectWithoutLinkInput[]
    upsert?: PropertyClaimDocumentUpsertWithWhereUniqueWithoutLinkInput | PropertyClaimDocumentUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: PropertyClaimDocumentCreateManyLinkInputEnvelope
    set?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    disconnect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    delete?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    connect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    update?: PropertyClaimDocumentUpdateWithWhereUniqueWithoutLinkInput | PropertyClaimDocumentUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: PropertyClaimDocumentUpdateManyWithWhereWithoutLinkInput | PropertyClaimDocumentUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: PropertyClaimDocumentScalarWhereInput | PropertyClaimDocumentScalarWhereInput[]
  }

  export type PropertyClaimDocumentUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput> | PropertyClaimDocumentCreateWithoutLinkInput[] | PropertyClaimDocumentUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: PropertyClaimDocumentCreateOrConnectWithoutLinkInput | PropertyClaimDocumentCreateOrConnectWithoutLinkInput[]
    upsert?: PropertyClaimDocumentUpsertWithWhereUniqueWithoutLinkInput | PropertyClaimDocumentUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: PropertyClaimDocumentCreateManyLinkInputEnvelope
    set?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    disconnect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    delete?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    connect?: PropertyClaimDocumentWhereUniqueInput | PropertyClaimDocumentWhereUniqueInput[]
    update?: PropertyClaimDocumentUpdateWithWhereUniqueWithoutLinkInput | PropertyClaimDocumentUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: PropertyClaimDocumentUpdateManyWithWhereWithoutLinkInput | PropertyClaimDocumentUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: PropertyClaimDocumentScalarWhereInput | PropertyClaimDocumentScalarWhereInput[]
  }

  export type PropertyRatepayerLinkCreateNestedOneWithoutClaimDocumentsInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedCreateWithoutClaimDocumentsInput>
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutClaimDocumentsInput
    connect?: PropertyRatepayerLinkWhereUniqueInput
  }

  export type PropertyRatepayerLinkUpdateOneRequiredWithoutClaimDocumentsNestedInput = {
    create?: XOR<PropertyRatepayerLinkCreateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedCreateWithoutClaimDocumentsInput>
    connectOrCreate?: PropertyRatepayerLinkCreateOrConnectWithoutClaimDocumentsInput
    upsert?: PropertyRatepayerLinkUpsertWithoutClaimDocumentsInput
    connect?: PropertyRatepayerLinkWhereUniqueInput
    update?: XOR<XOR<PropertyRatepayerLinkUpdateToOneWithWhereWithoutClaimDocumentsInput, PropertyRatepayerLinkUpdateWithoutClaimDocumentsInput>, PropertyRatepayerLinkUncheckedUpdateWithoutClaimDocumentsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type RatepayerVerificationCreateWithoutRatepayerInput = {
    id?: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RatepayerVerificationUncheckedCreateWithoutRatepayerInput = {
    id?: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RatepayerVerificationCreateOrConnectWithoutRatepayerInput = {
    where: RatepayerVerificationWhereUniqueInput
    create: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput>
  }

  export type RatepayerVerificationCreateManyRatepayerInputEnvelope = {
    data: RatepayerVerificationCreateManyRatepayerInput | RatepayerVerificationCreateManyRatepayerInput[]
    skipDuplicates?: boolean
  }

  export type PropertyRatepayerLinkCreateWithoutRatepayerInput = {
    id?: string
    unitId: string
    propertyId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    claimDocuments?: PropertyClaimDocumentCreateNestedManyWithoutLinkInput
  }

  export type PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput = {
    id?: string
    unitId: string
    propertyId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    claimDocuments?: PropertyClaimDocumentUncheckedCreateNestedManyWithoutLinkInput
  }

  export type PropertyRatepayerLinkCreateOrConnectWithoutRatepayerInput = {
    where: PropertyRatepayerLinkWhereUniqueInput
    create: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput>
  }

  export type PropertyRatepayerLinkCreateManyRatepayerInputEnvelope = {
    data: PropertyRatepayerLinkCreateManyRatepayerInput | PropertyRatepayerLinkCreateManyRatepayerInput[]
    skipDuplicates?: boolean
  }

  export type RatepayerVerificationUpsertWithWhereUniqueWithoutRatepayerInput = {
    where: RatepayerVerificationWhereUniqueInput
    update: XOR<RatepayerVerificationUpdateWithoutRatepayerInput, RatepayerVerificationUncheckedUpdateWithoutRatepayerInput>
    create: XOR<RatepayerVerificationCreateWithoutRatepayerInput, RatepayerVerificationUncheckedCreateWithoutRatepayerInput>
  }

  export type RatepayerVerificationUpdateWithWhereUniqueWithoutRatepayerInput = {
    where: RatepayerVerificationWhereUniqueInput
    data: XOR<RatepayerVerificationUpdateWithoutRatepayerInput, RatepayerVerificationUncheckedUpdateWithoutRatepayerInput>
  }

  export type RatepayerVerificationUpdateManyWithWhereWithoutRatepayerInput = {
    where: RatepayerVerificationScalarWhereInput
    data: XOR<RatepayerVerificationUpdateManyMutationInput, RatepayerVerificationUncheckedUpdateManyWithoutRatepayerInput>
  }

  export type RatepayerVerificationScalarWhereInput = {
    AND?: RatepayerVerificationScalarWhereInput | RatepayerVerificationScalarWhereInput[]
    OR?: RatepayerVerificationScalarWhereInput[]
    NOT?: RatepayerVerificationScalarWhereInput | RatepayerVerificationScalarWhereInput[]
    id?: UuidFilter<"RatepayerVerification"> | string
    ratepayerId?: UuidFilter<"RatepayerVerification"> | string
    provider?: StringFilter<"RatepayerVerification"> | string
    providerReference?: StringFilter<"RatepayerVerification"> | string
    verificationStatus?: StringFilter<"RatepayerVerification"> | string
    verifiedAt?: DateTimeNullableFilter<"RatepayerVerification"> | Date | string | null
    createdAt?: DateTimeFilter<"RatepayerVerification"> | Date | string
  }

  export type PropertyRatepayerLinkUpsertWithWhereUniqueWithoutRatepayerInput = {
    where: PropertyRatepayerLinkWhereUniqueInput
    update: XOR<PropertyRatepayerLinkUpdateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedUpdateWithoutRatepayerInput>
    create: XOR<PropertyRatepayerLinkCreateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedCreateWithoutRatepayerInput>
  }

  export type PropertyRatepayerLinkUpdateWithWhereUniqueWithoutRatepayerInput = {
    where: PropertyRatepayerLinkWhereUniqueInput
    data: XOR<PropertyRatepayerLinkUpdateWithoutRatepayerInput, PropertyRatepayerLinkUncheckedUpdateWithoutRatepayerInput>
  }

  export type PropertyRatepayerLinkUpdateManyWithWhereWithoutRatepayerInput = {
    where: PropertyRatepayerLinkScalarWhereInput
    data: XOR<PropertyRatepayerLinkUpdateManyMutationInput, PropertyRatepayerLinkUncheckedUpdateManyWithoutRatepayerInput>
  }

  export type PropertyRatepayerLinkScalarWhereInput = {
    AND?: PropertyRatepayerLinkScalarWhereInput | PropertyRatepayerLinkScalarWhereInput[]
    OR?: PropertyRatepayerLinkScalarWhereInput[]
    NOT?: PropertyRatepayerLinkScalarWhereInput | PropertyRatepayerLinkScalarWhereInput[]
    id?: UuidFilter<"PropertyRatepayerLink"> | string
    unitId?: UuidFilter<"PropertyRatepayerLink"> | string
    propertyId?: UuidFilter<"PropertyRatepayerLink"> | string
    ratepayerId?: UuidFilter<"PropertyRatepayerLink"> | string
    ownershipType?: StringFilter<"PropertyRatepayerLink"> | string
    ownershipPercentage?: DecimalFilter<"PropertyRatepayerLink"> | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFilter<"PropertyRatepayerLink"> | boolean
    claimStatus?: StringFilter<"PropertyRatepayerLink"> | string
    effectiveFrom?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"PropertyRatepayerLink"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyRatepayerLink"> | Date | string
  }

  export type RatepayerCreateWithoutVerificationsInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyLinks?: PropertyRatepayerLinkCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerUncheckedCreateWithoutVerificationsInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    propertyLinks?: PropertyRatepayerLinkUncheckedCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerCreateOrConnectWithoutVerificationsInput = {
    where: RatepayerWhereUniqueInput
    create: XOR<RatepayerCreateWithoutVerificationsInput, RatepayerUncheckedCreateWithoutVerificationsInput>
  }

  export type RatepayerUpsertWithoutVerificationsInput = {
    update: XOR<RatepayerUpdateWithoutVerificationsInput, RatepayerUncheckedUpdateWithoutVerificationsInput>
    create: XOR<RatepayerCreateWithoutVerificationsInput, RatepayerUncheckedCreateWithoutVerificationsInput>
    where?: RatepayerWhereInput
  }

  export type RatepayerUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: RatepayerWhereInput
    data: XOR<RatepayerUpdateWithoutVerificationsInput, RatepayerUncheckedUpdateWithoutVerificationsInput>
  }

  export type RatepayerUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyLinks?: PropertyRatepayerLinkUpdateManyWithoutRatepayerNestedInput
  }

  export type RatepayerUncheckedUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    propertyLinks?: PropertyRatepayerLinkUncheckedUpdateManyWithoutRatepayerNestedInput
  }

  export type RatepayerCreateWithoutPropertyLinksInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    verifications?: RatepayerVerificationCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerUncheckedCreateWithoutPropertyLinksInput = {
    id?: string
    code: string
    ratepayerType?: string
    legalName: string
    phone: string
    email?: string | null
    regionId: string
    assemblyId: string
    locationGeo: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    verifications?: RatepayerVerificationUncheckedCreateNestedManyWithoutRatepayerInput
  }

  export type RatepayerCreateOrConnectWithoutPropertyLinksInput = {
    where: RatepayerWhereUniqueInput
    create: XOR<RatepayerCreateWithoutPropertyLinksInput, RatepayerUncheckedCreateWithoutPropertyLinksInput>
  }

  export type PropertyClaimDocumentCreateWithoutLinkInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
  }

  export type PropertyClaimDocumentUncheckedCreateWithoutLinkInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
  }

  export type PropertyClaimDocumentCreateOrConnectWithoutLinkInput = {
    where: PropertyClaimDocumentWhereUniqueInput
    create: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput>
  }

  export type PropertyClaimDocumentCreateManyLinkInputEnvelope = {
    data: PropertyClaimDocumentCreateManyLinkInput | PropertyClaimDocumentCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type RatepayerUpsertWithoutPropertyLinksInput = {
    update: XOR<RatepayerUpdateWithoutPropertyLinksInput, RatepayerUncheckedUpdateWithoutPropertyLinksInput>
    create: XOR<RatepayerCreateWithoutPropertyLinksInput, RatepayerUncheckedCreateWithoutPropertyLinksInput>
    where?: RatepayerWhereInput
  }

  export type RatepayerUpdateToOneWithWhereWithoutPropertyLinksInput = {
    where?: RatepayerWhereInput
    data: XOR<RatepayerUpdateWithoutPropertyLinksInput, RatepayerUncheckedUpdateWithoutPropertyLinksInput>
  }

  export type RatepayerUpdateWithoutPropertyLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: RatepayerVerificationUpdateManyWithoutRatepayerNestedInput
  }

  export type RatepayerUncheckedUpdateWithoutPropertyLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    ratepayerType?: StringFieldUpdateOperationsInput | string
    legalName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    locationGeo?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifications?: RatepayerVerificationUncheckedUpdateManyWithoutRatepayerNestedInput
  }

  export type PropertyClaimDocumentUpsertWithWhereUniqueWithoutLinkInput = {
    where: PropertyClaimDocumentWhereUniqueInput
    update: XOR<PropertyClaimDocumentUpdateWithoutLinkInput, PropertyClaimDocumentUncheckedUpdateWithoutLinkInput>
    create: XOR<PropertyClaimDocumentCreateWithoutLinkInput, PropertyClaimDocumentUncheckedCreateWithoutLinkInput>
  }

  export type PropertyClaimDocumentUpdateWithWhereUniqueWithoutLinkInput = {
    where: PropertyClaimDocumentWhereUniqueInput
    data: XOR<PropertyClaimDocumentUpdateWithoutLinkInput, PropertyClaimDocumentUncheckedUpdateWithoutLinkInput>
  }

  export type PropertyClaimDocumentUpdateManyWithWhereWithoutLinkInput = {
    where: PropertyClaimDocumentScalarWhereInput
    data: XOR<PropertyClaimDocumentUpdateManyMutationInput, PropertyClaimDocumentUncheckedUpdateManyWithoutLinkInput>
  }

  export type PropertyClaimDocumentScalarWhereInput = {
    AND?: PropertyClaimDocumentScalarWhereInput | PropertyClaimDocumentScalarWhereInput[]
    OR?: PropertyClaimDocumentScalarWhereInput[]
    NOT?: PropertyClaimDocumentScalarWhereInput | PropertyClaimDocumentScalarWhereInput[]
    id?: UuidFilter<"PropertyClaimDocument"> | string
    linkId?: UuidFilter<"PropertyClaimDocument"> | string
    documentType?: StringFilter<"PropertyClaimDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyClaimDocument"> | string | null
    mediaUrl?: StringFilter<"PropertyClaimDocument"> | string
    verificationStatus?: StringFilter<"PropertyClaimDocument"> | string
    createdAt?: DateTimeFilter<"PropertyClaimDocument"> | Date | string
  }

  export type PropertyRatepayerLinkCreateWithoutClaimDocumentsInput = {
    id?: string
    unitId: string
    propertyId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    ratepayer: RatepayerCreateNestedOneWithoutPropertyLinksInput
  }

  export type PropertyRatepayerLinkUncheckedCreateWithoutClaimDocumentsInput = {
    id?: string
    unitId: string
    propertyId: string
    ratepayerId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
  }

  export type PropertyRatepayerLinkCreateOrConnectWithoutClaimDocumentsInput = {
    where: PropertyRatepayerLinkWhereUniqueInput
    create: XOR<PropertyRatepayerLinkCreateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedCreateWithoutClaimDocumentsInput>
  }

  export type PropertyRatepayerLinkUpsertWithoutClaimDocumentsInput = {
    update: XOR<PropertyRatepayerLinkUpdateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedUpdateWithoutClaimDocumentsInput>
    create: XOR<PropertyRatepayerLinkCreateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedCreateWithoutClaimDocumentsInput>
    where?: PropertyRatepayerLinkWhereInput
  }

  export type PropertyRatepayerLinkUpdateToOneWithWhereWithoutClaimDocumentsInput = {
    where?: PropertyRatepayerLinkWhereInput
    data: XOR<PropertyRatepayerLinkUpdateWithoutClaimDocumentsInput, PropertyRatepayerLinkUncheckedUpdateWithoutClaimDocumentsInput>
  }

  export type PropertyRatepayerLinkUpdateWithoutClaimDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ratepayer?: RatepayerUpdateOneRequiredWithoutPropertyLinksNestedInput
  }

  export type PropertyRatepayerLinkUncheckedUpdateWithoutClaimDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationCreateManyRatepayerInput = {
    id?: string
    provider: string
    providerReference: string
    verificationStatus?: string
    verifiedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PropertyRatepayerLinkCreateManyRatepayerInput = {
    id?: string
    unitId: string
    propertyId: string
    ownershipType?: string
    ownershipPercentage?: Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: boolean
    claimStatus?: string
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
  }

  export type RatepayerVerificationUpdateWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationUncheckedUpdateWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatepayerVerificationUncheckedUpdateManyWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyRatepayerLinkUpdateWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimDocuments?: PropertyClaimDocumentUpdateManyWithoutLinkNestedInput
  }

  export type PropertyRatepayerLinkUncheckedUpdateWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimDocuments?: PropertyClaimDocumentUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type PropertyRatepayerLinkUncheckedUpdateManyWithoutRatepayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ownershipType?: StringFieldUpdateOperationsInput | string
    ownershipPercentage?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isPrimaryBillingContact?: BoolFieldUpdateOperationsInput | boolean
    claimStatus?: StringFieldUpdateOperationsInput | string
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentCreateManyLinkInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    mediaUrl: string
    verificationStatus?: string
    createdAt?: Date | string
  }

  export type PropertyClaimDocumentUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyClaimDocumentUncheckedUpdateManyWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    verificationStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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