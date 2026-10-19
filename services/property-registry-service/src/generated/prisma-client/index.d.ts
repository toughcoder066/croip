
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
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model PropertyDocumentType
 * 
 */
export type PropertyDocumentType = $Result.DefaultSelection<Prisma.$PropertyDocumentTypePayload>
/**
 * Model PropertyDocument
 * 
 */
export type PropertyDocument = $Result.DefaultSelection<Prisma.$PropertyDocumentPayload>
/**
 * Model PropertyUnit
 * 
 */
export type PropertyUnit = $Result.DefaultSelection<Prisma.$PropertyUnitPayload>
/**
 * Model PropertyPhoto
 * 
 */
export type PropertyPhoto = $Result.DefaultSelection<Prisma.$PropertyPhotoPayload>
/**
 * Model ValuationList
 * 
 */
export type ValuationList = $Result.DefaultSelection<Prisma.$ValuationListPayload>
/**
 * Model PropertyValuation
 * 
 */
export type PropertyValuation = $Result.DefaultSelection<Prisma.$PropertyValuationPayload>
/**
 * Model PropertyVerification
 * 
 */
export type PropertyVerification = $Result.DefaultSelection<Prisma.$PropertyVerificationPayload>
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
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
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
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
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
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyDocumentType`: Exposes CRUD operations for the **PropertyDocumentType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyDocumentTypes
    * const propertyDocumentTypes = await prisma.propertyDocumentType.findMany()
    * ```
    */
  get propertyDocumentType(): Prisma.PropertyDocumentTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyDocument`: Exposes CRUD operations for the **PropertyDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyDocuments
    * const propertyDocuments = await prisma.propertyDocument.findMany()
    * ```
    */
  get propertyDocument(): Prisma.PropertyDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyUnit`: Exposes CRUD operations for the **PropertyUnit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyUnits
    * const propertyUnits = await prisma.propertyUnit.findMany()
    * ```
    */
  get propertyUnit(): Prisma.PropertyUnitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyPhoto`: Exposes CRUD operations for the **PropertyPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyPhotos
    * const propertyPhotos = await prisma.propertyPhoto.findMany()
    * ```
    */
  get propertyPhoto(): Prisma.PropertyPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.valuationList`: Exposes CRUD operations for the **ValuationList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ValuationLists
    * const valuationLists = await prisma.valuationList.findMany()
    * ```
    */
  get valuationList(): Prisma.ValuationListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyValuation`: Exposes CRUD operations for the **PropertyValuation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyValuations
    * const propertyValuations = await prisma.propertyValuation.findMany()
    * ```
    */
  get propertyValuation(): Prisma.PropertyValuationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propertyVerification`: Exposes CRUD operations for the **PropertyVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyVerifications
    * const propertyVerifications = await prisma.propertyVerification.findMany()
    * ```
    */
  get propertyVerification(): Prisma.PropertyVerificationDelegate<ExtArgs, ClientOptions>;

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
    Property: 'Property',
    PropertyDocumentType: 'PropertyDocumentType',
    PropertyDocument: 'PropertyDocument',
    PropertyUnit: 'PropertyUnit',
    PropertyPhoto: 'PropertyPhoto',
    ValuationList: 'ValuationList',
    PropertyValuation: 'PropertyValuation',
    PropertyVerification: 'PropertyVerification',
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
      modelProps: "property" | "propertyDocumentType" | "propertyDocument" | "propertyUnit" | "propertyPhoto" | "valuationList" | "propertyValuation" | "propertyVerification" | "outboxEvent" | "inboxMessage" | "idempotencyRecord" | "auditRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      PropertyDocumentType: {
        payload: Prisma.$PropertyDocumentTypePayload<ExtArgs>
        fields: Prisma.PropertyDocumentTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyDocumentTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyDocumentTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          findFirst: {
            args: Prisma.PropertyDocumentTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyDocumentTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          findMany: {
            args: Prisma.PropertyDocumentTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>[]
          }
          create: {
            args: Prisma.PropertyDocumentTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          createMany: {
            args: Prisma.PropertyDocumentTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyDocumentTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>[]
          }
          delete: {
            args: Prisma.PropertyDocumentTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          update: {
            args: Prisma.PropertyDocumentTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          deleteMany: {
            args: Prisma.PropertyDocumentTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyDocumentTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyDocumentTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>[]
          }
          upsert: {
            args: Prisma.PropertyDocumentTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentTypePayload>
          }
          aggregate: {
            args: Prisma.PropertyDocumentTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyDocumentType>
          }
          groupBy: {
            args: Prisma.PropertyDocumentTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyDocumentTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyDocumentTypeCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyDocumentTypeCountAggregateOutputType> | number
          }
        }
      }
      PropertyDocument: {
        payload: Prisma.$PropertyDocumentPayload<ExtArgs>
        fields: Prisma.PropertyDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          findFirst: {
            args: Prisma.PropertyDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          findMany: {
            args: Prisma.PropertyDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>[]
          }
          create: {
            args: Prisma.PropertyDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          createMany: {
            args: Prisma.PropertyDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>[]
          }
          delete: {
            args: Prisma.PropertyDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          update: {
            args: Prisma.PropertyDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>[]
          }
          upsert: {
            args: Prisma.PropertyDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyDocumentPayload>
          }
          aggregate: {
            args: Prisma.PropertyDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyDocument>
          }
          groupBy: {
            args: Prisma.PropertyDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyDocumentCountAggregateOutputType> | number
          }
        }
      }
      PropertyUnit: {
        payload: Prisma.$PropertyUnitPayload<ExtArgs>
        fields: Prisma.PropertyUnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyUnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyUnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          findFirst: {
            args: Prisma.PropertyUnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyUnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          findMany: {
            args: Prisma.PropertyUnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>[]
          }
          create: {
            args: Prisma.PropertyUnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          createMany: {
            args: Prisma.PropertyUnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyUnitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>[]
          }
          delete: {
            args: Prisma.PropertyUnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          update: {
            args: Prisma.PropertyUnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          deleteMany: {
            args: Prisma.PropertyUnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUnitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyUnitPayload>
          }
          aggregate: {
            args: Prisma.PropertyUnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyUnit>
          }
          groupBy: {
            args: Prisma.PropertyUnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyUnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyUnitCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyUnitCountAggregateOutputType> | number
          }
        }
      }
      PropertyPhoto: {
        payload: Prisma.$PropertyPhotoPayload<ExtArgs>
        fields: Prisma.PropertyPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          findFirst: {
            args: Prisma.PropertyPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          findMany: {
            args: Prisma.PropertyPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>[]
          }
          create: {
            args: Prisma.PropertyPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          createMany: {
            args: Prisma.PropertyPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>[]
          }
          delete: {
            args: Prisma.PropertyPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          update: {
            args: Prisma.PropertyPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          deleteMany: {
            args: Prisma.PropertyPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyPhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>[]
          }
          upsert: {
            args: Prisma.PropertyPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPhotoPayload>
          }
          aggregate: {
            args: Prisma.PropertyPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyPhoto>
          }
          groupBy: {
            args: Prisma.PropertyPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyPhotoCountAggregateOutputType> | number
          }
        }
      }
      ValuationList: {
        payload: Prisma.$ValuationListPayload<ExtArgs>
        fields: Prisma.ValuationListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ValuationListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ValuationListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          findFirst: {
            args: Prisma.ValuationListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ValuationListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          findMany: {
            args: Prisma.ValuationListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>[]
          }
          create: {
            args: Prisma.ValuationListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          createMany: {
            args: Prisma.ValuationListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ValuationListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>[]
          }
          delete: {
            args: Prisma.ValuationListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          update: {
            args: Prisma.ValuationListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          deleteMany: {
            args: Prisma.ValuationListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ValuationListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ValuationListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>[]
          }
          upsert: {
            args: Prisma.ValuationListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ValuationListPayload>
          }
          aggregate: {
            args: Prisma.ValuationListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateValuationList>
          }
          groupBy: {
            args: Prisma.ValuationListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ValuationListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ValuationListCountArgs<ExtArgs>
            result: $Utils.Optional<ValuationListCountAggregateOutputType> | number
          }
        }
      }
      PropertyValuation: {
        payload: Prisma.$PropertyValuationPayload<ExtArgs>
        fields: Prisma.PropertyValuationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyValuationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyValuationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          findFirst: {
            args: Prisma.PropertyValuationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyValuationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          findMany: {
            args: Prisma.PropertyValuationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>[]
          }
          create: {
            args: Prisma.PropertyValuationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          createMany: {
            args: Prisma.PropertyValuationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyValuationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>[]
          }
          delete: {
            args: Prisma.PropertyValuationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          update: {
            args: Prisma.PropertyValuationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          deleteMany: {
            args: Prisma.PropertyValuationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyValuationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyValuationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>[]
          }
          upsert: {
            args: Prisma.PropertyValuationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyValuationPayload>
          }
          aggregate: {
            args: Prisma.PropertyValuationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyValuation>
          }
          groupBy: {
            args: Prisma.PropertyValuationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyValuationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyValuationCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyValuationCountAggregateOutputType> | number
          }
        }
      }
      PropertyVerification: {
        payload: Prisma.$PropertyVerificationPayload<ExtArgs>
        fields: Prisma.PropertyVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          findFirst: {
            args: Prisma.PropertyVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          findMany: {
            args: Prisma.PropertyVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>[]
          }
          create: {
            args: Prisma.PropertyVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          createMany: {
            args: Prisma.PropertyVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>[]
          }
          delete: {
            args: Prisma.PropertyVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          update: {
            args: Prisma.PropertyVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          deleteMany: {
            args: Prisma.PropertyVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>[]
          }
          upsert: {
            args: Prisma.PropertyVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyVerificationPayload>
          }
          aggregate: {
            args: Prisma.PropertyVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyVerification>
          }
          groupBy: {
            args: Prisma.PropertyVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyVerificationCountAggregateOutputType> | number
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
    property?: PropertyOmit
    propertyDocumentType?: PropertyDocumentTypeOmit
    propertyDocument?: PropertyDocumentOmit
    propertyUnit?: PropertyUnitOmit
    propertyPhoto?: PropertyPhotoOmit
    valuationList?: ValuationListOmit
    propertyValuation?: PropertyValuationOmit
    propertyVerification?: PropertyVerificationOmit
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
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    units: number
    photos: number
    documents: number
    valuations: number
    verifications: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | PropertyCountOutputTypeCountUnitsArgs
    photos?: boolean | PropertyCountOutputTypeCountPhotosArgs
    documents?: boolean | PropertyCountOutputTypeCountDocumentsArgs
    valuations?: boolean | PropertyCountOutputTypeCountValuationsArgs
    verifications?: boolean | PropertyCountOutputTypeCountVerificationsArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyUnitWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyPhotoWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyDocumentWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountValuationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyValuationWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyVerificationWhereInput
  }


  /**
   * Count Type ValuationListCountOutputType
   */

  export type ValuationListCountOutputType = {
    valuations: number
  }

  export type ValuationListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    valuations?: boolean | ValuationListCountOutputTypeCountValuationsArgs
  }

  // Custom InputTypes
  /**
   * ValuationListCountOutputType without action
   */
  export type ValuationListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationListCountOutputType
     */
    select?: ValuationListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ValuationListCountOutputType without action
   */
  export type ValuationListCountOutputTypeCountValuationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyValuationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    leaseDurationYears: number | null
    landAreaSqm: number | null
    numberOfFloors: number | null
  }

  export type PropertySumAggregateOutputType = {
    leaseDurationYears: number | null
    landAreaSqm: number | null
    numberOfFloors: number | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    code: string | null
    accountNumber: string | null
    propertyName: string | null
    assemblyId: string | null
    propertyClass: string | null
    buildingStatus: string | null
    propertyStatus: string | null
    propertyUse: string | null
    tenureType: string | null
    structureType: string | null
    createdByRatepayerId: string | null
    registrationSource: string | null
    registeredByConcessionId: string | null
    claimedByRatepayerId: string | null
    verificationStatus: string | null
    leaseDurationYears: number | null
    landAreaSqm: number | null
    numberOfFloors: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    code: string | null
    accountNumber: string | null
    propertyName: string | null
    assemblyId: string | null
    propertyClass: string | null
    buildingStatus: string | null
    propertyStatus: string | null
    propertyUse: string | null
    tenureType: string | null
    structureType: string | null
    createdByRatepayerId: string | null
    registrationSource: string | null
    registeredByConcessionId: string | null
    claimedByRatepayerId: string | null
    verificationStatus: string | null
    leaseDurationYears: number | null
    landAreaSqm: number | null
    numberOfFloors: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    code: number
    accountNumber: number
    propertyName: number
    assemblyId: number
    propertyClass: number
    buildingStatus: number
    propertyStatus: number
    propertyUse: number
    tenureType: number
    structureType: number
    createdByRatepayerId: number
    registrationSource: number
    registeredByConcessionId: number
    claimedByRatepayerId: number
    verificationStatus: number
    polygonGeoJson: number
    leaseDurationYears: number
    landAreaSqm: number
    numberOfFloors: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    leaseDurationYears?: true
    landAreaSqm?: true
    numberOfFloors?: true
  }

  export type PropertySumAggregateInputType = {
    leaseDurationYears?: true
    landAreaSqm?: true
    numberOfFloors?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    code?: true
    accountNumber?: true
    propertyName?: true
    assemblyId?: true
    propertyClass?: true
    buildingStatus?: true
    propertyStatus?: true
    propertyUse?: true
    tenureType?: true
    structureType?: true
    createdByRatepayerId?: true
    registrationSource?: true
    registeredByConcessionId?: true
    claimedByRatepayerId?: true
    verificationStatus?: true
    leaseDurationYears?: true
    landAreaSqm?: true
    numberOfFloors?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    code?: true
    accountNumber?: true
    propertyName?: true
    assemblyId?: true
    propertyClass?: true
    buildingStatus?: true
    propertyStatus?: true
    propertyUse?: true
    tenureType?: true
    structureType?: true
    createdByRatepayerId?: true
    registrationSource?: true
    registeredByConcessionId?: true
    claimedByRatepayerId?: true
    verificationStatus?: true
    leaseDurationYears?: true
    landAreaSqm?: true
    numberOfFloors?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    code?: true
    accountNumber?: true
    propertyName?: true
    assemblyId?: true
    propertyClass?: true
    buildingStatus?: true
    propertyStatus?: true
    propertyUse?: true
    tenureType?: true
    structureType?: true
    createdByRatepayerId?: true
    registrationSource?: true
    registeredByConcessionId?: true
    claimedByRatepayerId?: true
    verificationStatus?: true
    polygonGeoJson?: true
    leaseDurationYears?: true
    landAreaSqm?: true
    numberOfFloors?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    code: string
    accountNumber: string | null
    propertyName: string | null
    assemblyId: string
    propertyClass: string
    buildingStatus: string
    propertyStatus: string
    propertyUse: string
    tenureType: string
    structureType: string
    createdByRatepayerId: string | null
    registrationSource: string
    registeredByConcessionId: string | null
    claimedByRatepayerId: string | null
    verificationStatus: string
    polygonGeoJson: JsonValue
    leaseDurationYears: number | null
    landAreaSqm: number | null
    numberOfFloors: number
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    accountNumber?: boolean
    propertyName?: boolean
    assemblyId?: boolean
    propertyClass?: boolean
    buildingStatus?: boolean
    propertyStatus?: boolean
    propertyUse?: boolean
    tenureType?: boolean
    structureType?: boolean
    createdByRatepayerId?: boolean
    registrationSource?: boolean
    registeredByConcessionId?: boolean
    claimedByRatepayerId?: boolean
    verificationStatus?: boolean
    polygonGeoJson?: boolean
    leaseDurationYears?: boolean
    landAreaSqm?: boolean
    numberOfFloors?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    units?: boolean | Property$unitsArgs<ExtArgs>
    photos?: boolean | Property$photosArgs<ExtArgs>
    documents?: boolean | Property$documentsArgs<ExtArgs>
    valuations?: boolean | Property$valuationsArgs<ExtArgs>
    verifications?: boolean | Property$verificationsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    accountNumber?: boolean
    propertyName?: boolean
    assemblyId?: boolean
    propertyClass?: boolean
    buildingStatus?: boolean
    propertyStatus?: boolean
    propertyUse?: boolean
    tenureType?: boolean
    structureType?: boolean
    createdByRatepayerId?: boolean
    registrationSource?: boolean
    registeredByConcessionId?: boolean
    claimedByRatepayerId?: boolean
    verificationStatus?: boolean
    polygonGeoJson?: boolean
    leaseDurationYears?: boolean
    landAreaSqm?: boolean
    numberOfFloors?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    accountNumber?: boolean
    propertyName?: boolean
    assemblyId?: boolean
    propertyClass?: boolean
    buildingStatus?: boolean
    propertyStatus?: boolean
    propertyUse?: boolean
    tenureType?: boolean
    structureType?: boolean
    createdByRatepayerId?: boolean
    registrationSource?: boolean
    registeredByConcessionId?: boolean
    claimedByRatepayerId?: boolean
    verificationStatus?: boolean
    polygonGeoJson?: boolean
    leaseDurationYears?: boolean
    landAreaSqm?: boolean
    numberOfFloors?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    code?: boolean
    accountNumber?: boolean
    propertyName?: boolean
    assemblyId?: boolean
    propertyClass?: boolean
    buildingStatus?: boolean
    propertyStatus?: boolean
    propertyUse?: boolean
    tenureType?: boolean
    structureType?: boolean
    createdByRatepayerId?: boolean
    registrationSource?: boolean
    registeredByConcessionId?: boolean
    claimedByRatepayerId?: boolean
    verificationStatus?: boolean
    polygonGeoJson?: boolean
    leaseDurationYears?: boolean
    landAreaSqm?: boolean
    numberOfFloors?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "accountNumber" | "propertyName" | "assemblyId" | "propertyClass" | "buildingStatus" | "propertyStatus" | "propertyUse" | "tenureType" | "structureType" | "createdByRatepayerId" | "registrationSource" | "registeredByConcessionId" | "claimedByRatepayerId" | "verificationStatus" | "polygonGeoJson" | "leaseDurationYears" | "landAreaSqm" | "numberOfFloors" | "createdAt" | "updatedAt", ExtArgs["result"]["property"]>
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    units?: boolean | Property$unitsArgs<ExtArgs>
    photos?: boolean | Property$photosArgs<ExtArgs>
    documents?: boolean | Property$documentsArgs<ExtArgs>
    valuations?: boolean | Property$valuationsArgs<ExtArgs>
    verifications?: boolean | Property$verificationsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      units: Prisma.$PropertyUnitPayload<ExtArgs>[]
      photos: Prisma.$PropertyPhotoPayload<ExtArgs>[]
      documents: Prisma.$PropertyDocumentPayload<ExtArgs>[]
      valuations: Prisma.$PropertyValuationPayload<ExtArgs>[]
      verifications: Prisma.$PropertyVerificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      accountNumber: string | null
      propertyName: string | null
      assemblyId: string
      propertyClass: string
      buildingStatus: string
      propertyStatus: string
      propertyUse: string
      tenureType: string
      structureType: string
      createdByRatepayerId: string | null
      registrationSource: string
      registeredByConcessionId: string | null
      claimedByRatepayerId: string | null
      verificationStatus: string
      polygonGeoJson: Prisma.JsonValue
      leaseDurationYears: number | null
      landAreaSqm: number | null
      numberOfFloors: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {PropertyUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
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
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    units<T extends Property$unitsArgs<ExtArgs> = {}>(args?: Subset<T, Property$unitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photos<T extends Property$photosArgs<ExtArgs> = {}>(args?: Subset<T, Property$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Property$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Property$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    valuations<T extends Property$valuationsArgs<ExtArgs> = {}>(args?: Subset<T, Property$valuationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verifications<T extends Property$verificationsArgs<ExtArgs> = {}>(args?: Subset<T, Property$verificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Property model
   */
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly code: FieldRef<"Property", 'String'>
    readonly accountNumber: FieldRef<"Property", 'String'>
    readonly propertyName: FieldRef<"Property", 'String'>
    readonly assemblyId: FieldRef<"Property", 'String'>
    readonly propertyClass: FieldRef<"Property", 'String'>
    readonly buildingStatus: FieldRef<"Property", 'String'>
    readonly propertyStatus: FieldRef<"Property", 'String'>
    readonly propertyUse: FieldRef<"Property", 'String'>
    readonly tenureType: FieldRef<"Property", 'String'>
    readonly structureType: FieldRef<"Property", 'String'>
    readonly createdByRatepayerId: FieldRef<"Property", 'String'>
    readonly registrationSource: FieldRef<"Property", 'String'>
    readonly registeredByConcessionId: FieldRef<"Property", 'String'>
    readonly claimedByRatepayerId: FieldRef<"Property", 'String'>
    readonly verificationStatus: FieldRef<"Property", 'String'>
    readonly polygonGeoJson: FieldRef<"Property", 'Json'>
    readonly leaseDurationYears: FieldRef<"Property", 'Int'>
    readonly landAreaSqm: FieldRef<"Property", 'Float'>
    readonly numberOfFloors: FieldRef<"Property", 'Int'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to delete.
     */
    limit?: number
  }

  /**
   * Property.units
   */
  export type Property$unitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    where?: PropertyUnitWhereInput
    orderBy?: PropertyUnitOrderByWithRelationInput | PropertyUnitOrderByWithRelationInput[]
    cursor?: PropertyUnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyUnitScalarFieldEnum | PropertyUnitScalarFieldEnum[]
  }

  /**
   * Property.photos
   */
  export type Property$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    where?: PropertyPhotoWhereInput
    orderBy?: PropertyPhotoOrderByWithRelationInput | PropertyPhotoOrderByWithRelationInput[]
    cursor?: PropertyPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyPhotoScalarFieldEnum | PropertyPhotoScalarFieldEnum[]
  }

  /**
   * Property.documents
   */
  export type Property$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    where?: PropertyDocumentWhereInput
    orderBy?: PropertyDocumentOrderByWithRelationInput | PropertyDocumentOrderByWithRelationInput[]
    cursor?: PropertyDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyDocumentScalarFieldEnum | PropertyDocumentScalarFieldEnum[]
  }

  /**
   * Property.valuations
   */
  export type Property$valuationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    where?: PropertyValuationWhereInput
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    cursor?: PropertyValuationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyValuationScalarFieldEnum | PropertyValuationScalarFieldEnum[]
  }

  /**
   * Property.verifications
   */
  export type Property$verificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    where?: PropertyVerificationWhereInput
    orderBy?: PropertyVerificationOrderByWithRelationInput | PropertyVerificationOrderByWithRelationInput[]
    cursor?: PropertyVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyVerificationScalarFieldEnum | PropertyVerificationScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model PropertyDocumentType
   */

  export type AggregatePropertyDocumentType = {
    _count: PropertyDocumentTypeCountAggregateOutputType | null
    _min: PropertyDocumentTypeMinAggregateOutputType | null
    _max: PropertyDocumentTypeMaxAggregateOutputType | null
  }

  export type PropertyDocumentTypeMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    isPrimaryOwnershipProof: boolean | null
    requiredForRatepayerRegistration: boolean | null
    createdAt: Date | null
  }

  export type PropertyDocumentTypeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    isPrimaryOwnershipProof: boolean | null
    requiredForRatepayerRegistration: boolean | null
    createdAt: Date | null
  }

  export type PropertyDocumentTypeCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    isPrimaryOwnershipProof: number
    requiredForRatepayerRegistration: number
    createdAt: number
    _all: number
  }


  export type PropertyDocumentTypeMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isPrimaryOwnershipProof?: true
    requiredForRatepayerRegistration?: true
    createdAt?: true
  }

  export type PropertyDocumentTypeMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isPrimaryOwnershipProof?: true
    requiredForRatepayerRegistration?: true
    createdAt?: true
  }

  export type PropertyDocumentTypeCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isPrimaryOwnershipProof?: true
    requiredForRatepayerRegistration?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyDocumentTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyDocumentType to aggregate.
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocumentTypes to fetch.
     */
    orderBy?: PropertyDocumentTypeOrderByWithRelationInput | PropertyDocumentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyDocumentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocumentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocumentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyDocumentTypes
    **/
    _count?: true | PropertyDocumentTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyDocumentTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyDocumentTypeMaxAggregateInputType
  }

  export type GetPropertyDocumentTypeAggregateType<T extends PropertyDocumentTypeAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyDocumentType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyDocumentType[P]>
      : GetScalarType<T[P], AggregatePropertyDocumentType[P]>
  }




  export type PropertyDocumentTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyDocumentTypeWhereInput
    orderBy?: PropertyDocumentTypeOrderByWithAggregationInput | PropertyDocumentTypeOrderByWithAggregationInput[]
    by: PropertyDocumentTypeScalarFieldEnum[] | PropertyDocumentTypeScalarFieldEnum
    having?: PropertyDocumentTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyDocumentTypeCountAggregateInputType | true
    _min?: PropertyDocumentTypeMinAggregateInputType
    _max?: PropertyDocumentTypeMaxAggregateInputType
  }

  export type PropertyDocumentTypeGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    isPrimaryOwnershipProof: boolean
    requiredForRatepayerRegistration: boolean
    createdAt: Date
    _count: PropertyDocumentTypeCountAggregateOutputType | null
    _min: PropertyDocumentTypeMinAggregateOutputType | null
    _max: PropertyDocumentTypeMaxAggregateOutputType | null
  }

  type GetPropertyDocumentTypeGroupByPayload<T extends PropertyDocumentTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyDocumentTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyDocumentTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyDocumentTypeGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyDocumentTypeGroupByOutputType[P]>
        }
      >
    >


  export type PropertyDocumentTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["propertyDocumentType"]>

  export type PropertyDocumentTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["propertyDocumentType"]>

  export type PropertyDocumentTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["propertyDocumentType"]>

  export type PropertyDocumentTypeSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: boolean
  }

  export type PropertyDocumentTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "isPrimaryOwnershipProof" | "requiredForRatepayerRegistration" | "createdAt", ExtArgs["result"]["propertyDocumentType"]>

  export type $PropertyDocumentTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyDocumentType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      isPrimaryOwnershipProof: boolean
      requiredForRatepayerRegistration: boolean
      createdAt: Date
    }, ExtArgs["result"]["propertyDocumentType"]>
    composites: {}
  }

  type PropertyDocumentTypeGetPayload<S extends boolean | null | undefined | PropertyDocumentTypeDefaultArgs> = $Result.GetResult<Prisma.$PropertyDocumentTypePayload, S>

  type PropertyDocumentTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyDocumentTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyDocumentTypeCountAggregateInputType | true
    }

  export interface PropertyDocumentTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyDocumentType'], meta: { name: 'PropertyDocumentType' } }
    /**
     * Find zero or one PropertyDocumentType that matches the filter.
     * @param {PropertyDocumentTypeFindUniqueArgs} args - Arguments to find a PropertyDocumentType
     * @example
     * // Get one PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyDocumentTypeFindUniqueArgs>(args: SelectSubset<T, PropertyDocumentTypeFindUniqueArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyDocumentType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyDocumentTypeFindUniqueOrThrowArgs} args - Arguments to find a PropertyDocumentType
     * @example
     * // Get one PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyDocumentTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyDocumentTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyDocumentType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeFindFirstArgs} args - Arguments to find a PropertyDocumentType
     * @example
     * // Get one PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyDocumentTypeFindFirstArgs>(args?: SelectSubset<T, PropertyDocumentTypeFindFirstArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyDocumentType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeFindFirstOrThrowArgs} args - Arguments to find a PropertyDocumentType
     * @example
     * // Get one PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyDocumentTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyDocumentTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyDocumentTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyDocumentTypes
     * const propertyDocumentTypes = await prisma.propertyDocumentType.findMany()
     * 
     * // Get first 10 PropertyDocumentTypes
     * const propertyDocumentTypes = await prisma.propertyDocumentType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyDocumentTypeWithIdOnly = await prisma.propertyDocumentType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyDocumentTypeFindManyArgs>(args?: SelectSubset<T, PropertyDocumentTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyDocumentType.
     * @param {PropertyDocumentTypeCreateArgs} args - Arguments to create a PropertyDocumentType.
     * @example
     * // Create one PropertyDocumentType
     * const PropertyDocumentType = await prisma.propertyDocumentType.create({
     *   data: {
     *     // ... data to create a PropertyDocumentType
     *   }
     * })
     * 
     */
    create<T extends PropertyDocumentTypeCreateArgs>(args: SelectSubset<T, PropertyDocumentTypeCreateArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyDocumentTypes.
     * @param {PropertyDocumentTypeCreateManyArgs} args - Arguments to create many PropertyDocumentTypes.
     * @example
     * // Create many PropertyDocumentTypes
     * const propertyDocumentType = await prisma.propertyDocumentType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyDocumentTypeCreateManyArgs>(args?: SelectSubset<T, PropertyDocumentTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyDocumentTypes and returns the data saved in the database.
     * @param {PropertyDocumentTypeCreateManyAndReturnArgs} args - Arguments to create many PropertyDocumentTypes.
     * @example
     * // Create many PropertyDocumentTypes
     * const propertyDocumentType = await prisma.propertyDocumentType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyDocumentTypes and only return the `id`
     * const propertyDocumentTypeWithIdOnly = await prisma.propertyDocumentType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyDocumentTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyDocumentTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyDocumentType.
     * @param {PropertyDocumentTypeDeleteArgs} args - Arguments to delete one PropertyDocumentType.
     * @example
     * // Delete one PropertyDocumentType
     * const PropertyDocumentType = await prisma.propertyDocumentType.delete({
     *   where: {
     *     // ... filter to delete one PropertyDocumentType
     *   }
     * })
     * 
     */
    delete<T extends PropertyDocumentTypeDeleteArgs>(args: SelectSubset<T, PropertyDocumentTypeDeleteArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyDocumentType.
     * @param {PropertyDocumentTypeUpdateArgs} args - Arguments to update one PropertyDocumentType.
     * @example
     * // Update one PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyDocumentTypeUpdateArgs>(args: SelectSubset<T, PropertyDocumentTypeUpdateArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyDocumentTypes.
     * @param {PropertyDocumentTypeDeleteManyArgs} args - Arguments to filter PropertyDocumentTypes to delete.
     * @example
     * // Delete a few PropertyDocumentTypes
     * const { count } = await prisma.propertyDocumentType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDocumentTypeDeleteManyArgs>(args?: SelectSubset<T, PropertyDocumentTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyDocumentTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyDocumentTypes
     * const propertyDocumentType = await prisma.propertyDocumentType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyDocumentTypeUpdateManyArgs>(args: SelectSubset<T, PropertyDocumentTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyDocumentTypes and returns the data updated in the database.
     * @param {PropertyDocumentTypeUpdateManyAndReturnArgs} args - Arguments to update many PropertyDocumentTypes.
     * @example
     * // Update many PropertyDocumentTypes
     * const propertyDocumentType = await prisma.propertyDocumentType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyDocumentTypes and only return the `id`
     * const propertyDocumentTypeWithIdOnly = await prisma.propertyDocumentType.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyDocumentTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyDocumentTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyDocumentType.
     * @param {PropertyDocumentTypeUpsertArgs} args - Arguments to update or create a PropertyDocumentType.
     * @example
     * // Update or create a PropertyDocumentType
     * const propertyDocumentType = await prisma.propertyDocumentType.upsert({
     *   create: {
     *     // ... data to create a PropertyDocumentType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyDocumentType we want to update
     *   }
     * })
     */
    upsert<T extends PropertyDocumentTypeUpsertArgs>(args: SelectSubset<T, PropertyDocumentTypeUpsertArgs<ExtArgs>>): Prisma__PropertyDocumentTypeClient<$Result.GetResult<Prisma.$PropertyDocumentTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyDocumentTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeCountArgs} args - Arguments to filter PropertyDocumentTypes to count.
     * @example
     * // Count the number of PropertyDocumentTypes
     * const count = await prisma.propertyDocumentType.count({
     *   where: {
     *     // ... the filter for the PropertyDocumentTypes we want to count
     *   }
     * })
    **/
    count<T extends PropertyDocumentTypeCountArgs>(
      args?: Subset<T, PropertyDocumentTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyDocumentTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyDocumentType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyDocumentTypeAggregateArgs>(args: Subset<T, PropertyDocumentTypeAggregateArgs>): Prisma.PrismaPromise<GetPropertyDocumentTypeAggregateType<T>>

    /**
     * Group by PropertyDocumentType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentTypeGroupByArgs} args - Group by arguments.
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
      T extends PropertyDocumentTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyDocumentTypeGroupByArgs['orderBy'] }
        : { orderBy?: PropertyDocumentTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyDocumentTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyDocumentTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyDocumentType model
   */
  readonly fields: PropertyDocumentTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyDocumentType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyDocumentTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PropertyDocumentType model
   */
  interface PropertyDocumentTypeFieldRefs {
    readonly id: FieldRef<"PropertyDocumentType", 'String'>
    readonly code: FieldRef<"PropertyDocumentType", 'String'>
    readonly name: FieldRef<"PropertyDocumentType", 'String'>
    readonly description: FieldRef<"PropertyDocumentType", 'String'>
    readonly isPrimaryOwnershipProof: FieldRef<"PropertyDocumentType", 'Boolean'>
    readonly requiredForRatepayerRegistration: FieldRef<"PropertyDocumentType", 'Boolean'>
    readonly createdAt: FieldRef<"PropertyDocumentType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyDocumentType findUnique
   */
  export type PropertyDocumentTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter, which PropertyDocumentType to fetch.
     */
    where: PropertyDocumentTypeWhereUniqueInput
  }

  /**
   * PropertyDocumentType findUniqueOrThrow
   */
  export type PropertyDocumentTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter, which PropertyDocumentType to fetch.
     */
    where: PropertyDocumentTypeWhereUniqueInput
  }

  /**
   * PropertyDocumentType findFirst
   */
  export type PropertyDocumentTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter, which PropertyDocumentType to fetch.
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocumentTypes to fetch.
     */
    orderBy?: PropertyDocumentTypeOrderByWithRelationInput | PropertyDocumentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyDocumentTypes.
     */
    cursor?: PropertyDocumentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocumentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocumentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyDocumentTypes.
     */
    distinct?: PropertyDocumentTypeScalarFieldEnum | PropertyDocumentTypeScalarFieldEnum[]
  }

  /**
   * PropertyDocumentType findFirstOrThrow
   */
  export type PropertyDocumentTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter, which PropertyDocumentType to fetch.
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocumentTypes to fetch.
     */
    orderBy?: PropertyDocumentTypeOrderByWithRelationInput | PropertyDocumentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyDocumentTypes.
     */
    cursor?: PropertyDocumentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocumentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocumentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyDocumentTypes.
     */
    distinct?: PropertyDocumentTypeScalarFieldEnum | PropertyDocumentTypeScalarFieldEnum[]
  }

  /**
   * PropertyDocumentType findMany
   */
  export type PropertyDocumentTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter, which PropertyDocumentTypes to fetch.
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocumentTypes to fetch.
     */
    orderBy?: PropertyDocumentTypeOrderByWithRelationInput | PropertyDocumentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyDocumentTypes.
     */
    cursor?: PropertyDocumentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocumentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocumentTypes.
     */
    skip?: number
    distinct?: PropertyDocumentTypeScalarFieldEnum | PropertyDocumentTypeScalarFieldEnum[]
  }

  /**
   * PropertyDocumentType create
   */
  export type PropertyDocumentTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * The data needed to create a PropertyDocumentType.
     */
    data: XOR<PropertyDocumentTypeCreateInput, PropertyDocumentTypeUncheckedCreateInput>
  }

  /**
   * PropertyDocumentType createMany
   */
  export type PropertyDocumentTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyDocumentTypes.
     */
    data: PropertyDocumentTypeCreateManyInput | PropertyDocumentTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyDocumentType createManyAndReturn
   */
  export type PropertyDocumentTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyDocumentTypes.
     */
    data: PropertyDocumentTypeCreateManyInput | PropertyDocumentTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyDocumentType update
   */
  export type PropertyDocumentTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * The data needed to update a PropertyDocumentType.
     */
    data: XOR<PropertyDocumentTypeUpdateInput, PropertyDocumentTypeUncheckedUpdateInput>
    /**
     * Choose, which PropertyDocumentType to update.
     */
    where: PropertyDocumentTypeWhereUniqueInput
  }

  /**
   * PropertyDocumentType updateMany
   */
  export type PropertyDocumentTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyDocumentTypes.
     */
    data: XOR<PropertyDocumentTypeUpdateManyMutationInput, PropertyDocumentTypeUncheckedUpdateManyInput>
    /**
     * Filter which PropertyDocumentTypes to update
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * Limit how many PropertyDocumentTypes to update.
     */
    limit?: number
  }

  /**
   * PropertyDocumentType updateManyAndReturn
   */
  export type PropertyDocumentTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * The data used to update PropertyDocumentTypes.
     */
    data: XOR<PropertyDocumentTypeUpdateManyMutationInput, PropertyDocumentTypeUncheckedUpdateManyInput>
    /**
     * Filter which PropertyDocumentTypes to update
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * Limit how many PropertyDocumentTypes to update.
     */
    limit?: number
  }

  /**
   * PropertyDocumentType upsert
   */
  export type PropertyDocumentTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * The filter to search for the PropertyDocumentType to update in case it exists.
     */
    where: PropertyDocumentTypeWhereUniqueInput
    /**
     * In case the PropertyDocumentType found by the `where` argument doesn't exist, create a new PropertyDocumentType with this data.
     */
    create: XOR<PropertyDocumentTypeCreateInput, PropertyDocumentTypeUncheckedCreateInput>
    /**
     * In case the PropertyDocumentType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyDocumentTypeUpdateInput, PropertyDocumentTypeUncheckedUpdateInput>
  }

  /**
   * PropertyDocumentType delete
   */
  export type PropertyDocumentTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
    /**
     * Filter which PropertyDocumentType to delete.
     */
    where: PropertyDocumentTypeWhereUniqueInput
  }

  /**
   * PropertyDocumentType deleteMany
   */
  export type PropertyDocumentTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyDocumentTypes to delete
     */
    where?: PropertyDocumentTypeWhereInput
    /**
     * Limit how many PropertyDocumentTypes to delete.
     */
    limit?: number
  }

  /**
   * PropertyDocumentType without action
   */
  export type PropertyDocumentTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocumentType
     */
    select?: PropertyDocumentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocumentType
     */
    omit?: PropertyDocumentTypeOmit<ExtArgs> | null
  }


  /**
   * Model PropertyDocument
   */

  export type AggregatePropertyDocument = {
    _count: PropertyDocumentCountAggregateOutputType | null
    _avg: PropertyDocumentAvgAggregateOutputType | null
    _sum: PropertyDocumentSumAggregateOutputType | null
    _min: PropertyDocumentMinAggregateOutputType | null
    _max: PropertyDocumentMaxAggregateOutputType | null
  }

  export type PropertyDocumentAvgAggregateOutputType = {
    fileSizeBytes: number | null
    premisesLatitude: number | null
    premisesLongitude: number | null
    premisesGpsAccuracy: number | null
  }

  export type PropertyDocumentSumAggregateOutputType = {
    fileSizeBytes: number | null
    premisesLatitude: number | null
    premisesLongitude: number | null
    premisesGpsAccuracy: number | null
  }

  export type PropertyDocumentMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    documentType: string | null
    documentNumber: string | null
    issuingAuthority: string | null
    issueDate: Date | null
    mediaUrl: string | null
    fileSizeBytes: number | null
    mimeType: string | null
    uploadedByActorType: string | null
    uploadedByActorId: string | null
    ratepayerId: string | null
    verificationStatus: string | null
    verifiedAt: Date | null
    verifiedByActorId: string | null
    rejectionReason: string | null
    isCapturedOnPremises: boolean | null
    premisesLatitude: number | null
    premisesLongitude: number | null
    premisesGpsAccuracy: number | null
    deviceId: string | null
    staffRef: string | null
    capturedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyDocumentMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    documentType: string | null
    documentNumber: string | null
    issuingAuthority: string | null
    issueDate: Date | null
    mediaUrl: string | null
    fileSizeBytes: number | null
    mimeType: string | null
    uploadedByActorType: string | null
    uploadedByActorId: string | null
    ratepayerId: string | null
    verificationStatus: string | null
    verifiedAt: Date | null
    verifiedByActorId: string | null
    rejectionReason: string | null
    isCapturedOnPremises: boolean | null
    premisesLatitude: number | null
    premisesLongitude: number | null
    premisesGpsAccuracy: number | null
    deviceId: string | null
    staffRef: string | null
    capturedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyDocumentCountAggregateOutputType = {
    id: number
    propertyId: number
    documentType: number
    documentNumber: number
    issuingAuthority: number
    issueDate: number
    mediaUrl: number
    fileSizeBytes: number
    mimeType: number
    uploadedByActorType: number
    uploadedByActorId: number
    ratepayerId: number
    verificationStatus: number
    verifiedAt: number
    verifiedByActorId: number
    rejectionReason: number
    isCapturedOnPremises: number
    premisesLatitude: number
    premisesLongitude: number
    premisesGpsAccuracy: number
    deviceId: number
    staffRef: number
    capturedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyDocumentAvgAggregateInputType = {
    fileSizeBytes?: true
    premisesLatitude?: true
    premisesLongitude?: true
    premisesGpsAccuracy?: true
  }

  export type PropertyDocumentSumAggregateInputType = {
    fileSizeBytes?: true
    premisesLatitude?: true
    premisesLongitude?: true
    premisesGpsAccuracy?: true
  }

  export type PropertyDocumentMinAggregateInputType = {
    id?: true
    propertyId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    issueDate?: true
    mediaUrl?: true
    fileSizeBytes?: true
    mimeType?: true
    uploadedByActorType?: true
    uploadedByActorId?: true
    ratepayerId?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedByActorId?: true
    rejectionReason?: true
    isCapturedOnPremises?: true
    premisesLatitude?: true
    premisesLongitude?: true
    premisesGpsAccuracy?: true
    deviceId?: true
    staffRef?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyDocumentMaxAggregateInputType = {
    id?: true
    propertyId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    issueDate?: true
    mediaUrl?: true
    fileSizeBytes?: true
    mimeType?: true
    uploadedByActorType?: true
    uploadedByActorId?: true
    ratepayerId?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedByActorId?: true
    rejectionReason?: true
    isCapturedOnPremises?: true
    premisesLatitude?: true
    premisesLongitude?: true
    premisesGpsAccuracy?: true
    deviceId?: true
    staffRef?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyDocumentCountAggregateInputType = {
    id?: true
    propertyId?: true
    documentType?: true
    documentNumber?: true
    issuingAuthority?: true
    issueDate?: true
    mediaUrl?: true
    fileSizeBytes?: true
    mimeType?: true
    uploadedByActorType?: true
    uploadedByActorId?: true
    ratepayerId?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedByActorId?: true
    rejectionReason?: true
    isCapturedOnPremises?: true
    premisesLatitude?: true
    premisesLongitude?: true
    premisesGpsAccuracy?: true
    deviceId?: true
    staffRef?: true
    capturedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyDocument to aggregate.
     */
    where?: PropertyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocuments to fetch.
     */
    orderBy?: PropertyDocumentOrderByWithRelationInput | PropertyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyDocuments
    **/
    _count?: true | PropertyDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyDocumentMaxAggregateInputType
  }

  export type GetPropertyDocumentAggregateType<T extends PropertyDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyDocument[P]>
      : GetScalarType<T[P], AggregatePropertyDocument[P]>
  }




  export type PropertyDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyDocumentWhereInput
    orderBy?: PropertyDocumentOrderByWithAggregationInput | PropertyDocumentOrderByWithAggregationInput[]
    by: PropertyDocumentScalarFieldEnum[] | PropertyDocumentScalarFieldEnum
    having?: PropertyDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyDocumentCountAggregateInputType | true
    _avg?: PropertyDocumentAvgAggregateInputType
    _sum?: PropertyDocumentSumAggregateInputType
    _min?: PropertyDocumentMinAggregateInputType
    _max?: PropertyDocumentMaxAggregateInputType
  }

  export type PropertyDocumentGroupByOutputType = {
    id: string
    propertyId: string
    documentType: string
    documentNumber: string | null
    issuingAuthority: string | null
    issueDate: Date | null
    mediaUrl: string
    fileSizeBytes: number | null
    mimeType: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId: string | null
    verificationStatus: string
    verifiedAt: Date | null
    verifiedByActorId: string | null
    rejectionReason: string | null
    isCapturedOnPremises: boolean
    premisesLatitude: number | null
    premisesLongitude: number | null
    premisesGpsAccuracy: number | null
    deviceId: string | null
    staffRef: string | null
    capturedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PropertyDocumentCountAggregateOutputType | null
    _avg: PropertyDocumentAvgAggregateOutputType | null
    _sum: PropertyDocumentSumAggregateOutputType | null
    _min: PropertyDocumentMinAggregateOutputType | null
    _max: PropertyDocumentMaxAggregateOutputType | null
  }

  type GetPropertyDocumentGroupByPayload<T extends PropertyDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyDocumentGroupByOutputType[P]>
        }
      >
    >


  export type PropertyDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    issueDate?: boolean
    mediaUrl?: boolean
    fileSizeBytes?: boolean
    mimeType?: boolean
    uploadedByActorType?: boolean
    uploadedByActorId?: boolean
    ratepayerId?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedByActorId?: boolean
    rejectionReason?: boolean
    isCapturedOnPremises?: boolean
    premisesLatitude?: boolean
    premisesLongitude?: boolean
    premisesGpsAccuracy?: boolean
    deviceId?: boolean
    staffRef?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyDocument"]>

  export type PropertyDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    issueDate?: boolean
    mediaUrl?: boolean
    fileSizeBytes?: boolean
    mimeType?: boolean
    uploadedByActorType?: boolean
    uploadedByActorId?: boolean
    ratepayerId?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedByActorId?: boolean
    rejectionReason?: boolean
    isCapturedOnPremises?: boolean
    premisesLatitude?: boolean
    premisesLongitude?: boolean
    premisesGpsAccuracy?: boolean
    deviceId?: boolean
    staffRef?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyDocument"]>

  export type PropertyDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    issueDate?: boolean
    mediaUrl?: boolean
    fileSizeBytes?: boolean
    mimeType?: boolean
    uploadedByActorType?: boolean
    uploadedByActorId?: boolean
    ratepayerId?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedByActorId?: boolean
    rejectionReason?: boolean
    isCapturedOnPremises?: boolean
    premisesLatitude?: boolean
    premisesLongitude?: boolean
    premisesGpsAccuracy?: boolean
    deviceId?: boolean
    staffRef?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyDocument"]>

  export type PropertyDocumentSelectScalar = {
    id?: boolean
    propertyId?: boolean
    documentType?: boolean
    documentNumber?: boolean
    issuingAuthority?: boolean
    issueDate?: boolean
    mediaUrl?: boolean
    fileSizeBytes?: boolean
    mimeType?: boolean
    uploadedByActorType?: boolean
    uploadedByActorId?: boolean
    ratepayerId?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedByActorId?: boolean
    rejectionReason?: boolean
    isCapturedOnPremises?: boolean
    premisesLatitude?: boolean
    premisesLongitude?: boolean
    premisesGpsAccuracy?: boolean
    deviceId?: boolean
    staffRef?: boolean
    capturedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "documentType" | "documentNumber" | "issuingAuthority" | "issueDate" | "mediaUrl" | "fileSizeBytes" | "mimeType" | "uploadedByActorType" | "uploadedByActorId" | "ratepayerId" | "verificationStatus" | "verifiedAt" | "verifiedByActorId" | "rejectionReason" | "isCapturedOnPremises" | "premisesLatitude" | "premisesLongitude" | "premisesGpsAccuracy" | "deviceId" | "staffRef" | "capturedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["propertyDocument"]>
  export type PropertyDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyDocument"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      documentType: string
      documentNumber: string | null
      issuingAuthority: string | null
      issueDate: Date | null
      mediaUrl: string
      fileSizeBytes: number | null
      mimeType: string | null
      uploadedByActorType: string
      uploadedByActorId: string
      ratepayerId: string | null
      verificationStatus: string
      verifiedAt: Date | null
      verifiedByActorId: string | null
      rejectionReason: string | null
      isCapturedOnPremises: boolean
      premisesLatitude: number | null
      premisesLongitude: number | null
      premisesGpsAccuracy: number | null
      deviceId: string | null
      staffRef: string | null
      capturedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["propertyDocument"]>
    composites: {}
  }

  type PropertyDocumentGetPayload<S extends boolean | null | undefined | PropertyDocumentDefaultArgs> = $Result.GetResult<Prisma.$PropertyDocumentPayload, S>

  type PropertyDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyDocumentCountAggregateInputType | true
    }

  export interface PropertyDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyDocument'], meta: { name: 'PropertyDocument' } }
    /**
     * Find zero or one PropertyDocument that matches the filter.
     * @param {PropertyDocumentFindUniqueArgs} args - Arguments to find a PropertyDocument
     * @example
     * // Get one PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyDocumentFindUniqueArgs>(args: SelectSubset<T, PropertyDocumentFindUniqueArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyDocumentFindUniqueOrThrowArgs} args - Arguments to find a PropertyDocument
     * @example
     * // Get one PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentFindFirstArgs} args - Arguments to find a PropertyDocument
     * @example
     * // Get one PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyDocumentFindFirstArgs>(args?: SelectSubset<T, PropertyDocumentFindFirstArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentFindFirstOrThrowArgs} args - Arguments to find a PropertyDocument
     * @example
     * // Get one PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyDocuments
     * const propertyDocuments = await prisma.propertyDocument.findMany()
     * 
     * // Get first 10 PropertyDocuments
     * const propertyDocuments = await prisma.propertyDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyDocumentWithIdOnly = await prisma.propertyDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyDocumentFindManyArgs>(args?: SelectSubset<T, PropertyDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyDocument.
     * @param {PropertyDocumentCreateArgs} args - Arguments to create a PropertyDocument.
     * @example
     * // Create one PropertyDocument
     * const PropertyDocument = await prisma.propertyDocument.create({
     *   data: {
     *     // ... data to create a PropertyDocument
     *   }
     * })
     * 
     */
    create<T extends PropertyDocumentCreateArgs>(args: SelectSubset<T, PropertyDocumentCreateArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyDocuments.
     * @param {PropertyDocumentCreateManyArgs} args - Arguments to create many PropertyDocuments.
     * @example
     * // Create many PropertyDocuments
     * const propertyDocument = await prisma.propertyDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyDocumentCreateManyArgs>(args?: SelectSubset<T, PropertyDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyDocuments and returns the data saved in the database.
     * @param {PropertyDocumentCreateManyAndReturnArgs} args - Arguments to create many PropertyDocuments.
     * @example
     * // Create many PropertyDocuments
     * const propertyDocument = await prisma.propertyDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyDocuments and only return the `id`
     * const propertyDocumentWithIdOnly = await prisma.propertyDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyDocument.
     * @param {PropertyDocumentDeleteArgs} args - Arguments to delete one PropertyDocument.
     * @example
     * // Delete one PropertyDocument
     * const PropertyDocument = await prisma.propertyDocument.delete({
     *   where: {
     *     // ... filter to delete one PropertyDocument
     *   }
     * })
     * 
     */
    delete<T extends PropertyDocumentDeleteArgs>(args: SelectSubset<T, PropertyDocumentDeleteArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyDocument.
     * @param {PropertyDocumentUpdateArgs} args - Arguments to update one PropertyDocument.
     * @example
     * // Update one PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyDocumentUpdateArgs>(args: SelectSubset<T, PropertyDocumentUpdateArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyDocuments.
     * @param {PropertyDocumentDeleteManyArgs} args - Arguments to filter PropertyDocuments to delete.
     * @example
     * // Delete a few PropertyDocuments
     * const { count } = await prisma.propertyDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDocumentDeleteManyArgs>(args?: SelectSubset<T, PropertyDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyDocuments
     * const propertyDocument = await prisma.propertyDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyDocumentUpdateManyArgs>(args: SelectSubset<T, PropertyDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyDocuments and returns the data updated in the database.
     * @param {PropertyDocumentUpdateManyAndReturnArgs} args - Arguments to update many PropertyDocuments.
     * @example
     * // Update many PropertyDocuments
     * const propertyDocument = await prisma.propertyDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyDocuments and only return the `id`
     * const propertyDocumentWithIdOnly = await prisma.propertyDocument.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyDocument.
     * @param {PropertyDocumentUpsertArgs} args - Arguments to update or create a PropertyDocument.
     * @example
     * // Update or create a PropertyDocument
     * const propertyDocument = await prisma.propertyDocument.upsert({
     *   create: {
     *     // ... data to create a PropertyDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyDocument we want to update
     *   }
     * })
     */
    upsert<T extends PropertyDocumentUpsertArgs>(args: SelectSubset<T, PropertyDocumentUpsertArgs<ExtArgs>>): Prisma__PropertyDocumentClient<$Result.GetResult<Prisma.$PropertyDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentCountArgs} args - Arguments to filter PropertyDocuments to count.
     * @example
     * // Count the number of PropertyDocuments
     * const count = await prisma.propertyDocument.count({
     *   where: {
     *     // ... the filter for the PropertyDocuments we want to count
     *   }
     * })
    **/
    count<T extends PropertyDocumentCountArgs>(
      args?: Subset<T, PropertyDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyDocumentAggregateArgs>(args: Subset<T, PropertyDocumentAggregateArgs>): Prisma.PrismaPromise<GetPropertyDocumentAggregateType<T>>

    /**
     * Group by PropertyDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyDocumentGroupByArgs} args - Group by arguments.
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
      T extends PropertyDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyDocumentGroupByArgs['orderBy'] }
        : { orderBy?: PropertyDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyDocument model
   */
  readonly fields: PropertyDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyDocument model
   */
  interface PropertyDocumentFieldRefs {
    readonly id: FieldRef<"PropertyDocument", 'String'>
    readonly propertyId: FieldRef<"PropertyDocument", 'String'>
    readonly documentType: FieldRef<"PropertyDocument", 'String'>
    readonly documentNumber: FieldRef<"PropertyDocument", 'String'>
    readonly issuingAuthority: FieldRef<"PropertyDocument", 'String'>
    readonly issueDate: FieldRef<"PropertyDocument", 'DateTime'>
    readonly mediaUrl: FieldRef<"PropertyDocument", 'String'>
    readonly fileSizeBytes: FieldRef<"PropertyDocument", 'Int'>
    readonly mimeType: FieldRef<"PropertyDocument", 'String'>
    readonly uploadedByActorType: FieldRef<"PropertyDocument", 'String'>
    readonly uploadedByActorId: FieldRef<"PropertyDocument", 'String'>
    readonly ratepayerId: FieldRef<"PropertyDocument", 'String'>
    readonly verificationStatus: FieldRef<"PropertyDocument", 'String'>
    readonly verifiedAt: FieldRef<"PropertyDocument", 'DateTime'>
    readonly verifiedByActorId: FieldRef<"PropertyDocument", 'String'>
    readonly rejectionReason: FieldRef<"PropertyDocument", 'String'>
    readonly isCapturedOnPremises: FieldRef<"PropertyDocument", 'Boolean'>
    readonly premisesLatitude: FieldRef<"PropertyDocument", 'Float'>
    readonly premisesLongitude: FieldRef<"PropertyDocument", 'Float'>
    readonly premisesGpsAccuracy: FieldRef<"PropertyDocument", 'Float'>
    readonly deviceId: FieldRef<"PropertyDocument", 'String'>
    readonly staffRef: FieldRef<"PropertyDocument", 'String'>
    readonly capturedAt: FieldRef<"PropertyDocument", 'DateTime'>
    readonly createdAt: FieldRef<"PropertyDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"PropertyDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyDocument findUnique
   */
  export type PropertyDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyDocument to fetch.
     */
    where: PropertyDocumentWhereUniqueInput
  }

  /**
   * PropertyDocument findUniqueOrThrow
   */
  export type PropertyDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyDocument to fetch.
     */
    where: PropertyDocumentWhereUniqueInput
  }

  /**
   * PropertyDocument findFirst
   */
  export type PropertyDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyDocument to fetch.
     */
    where?: PropertyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocuments to fetch.
     */
    orderBy?: PropertyDocumentOrderByWithRelationInput | PropertyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyDocuments.
     */
    cursor?: PropertyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyDocuments.
     */
    distinct?: PropertyDocumentScalarFieldEnum | PropertyDocumentScalarFieldEnum[]
  }

  /**
   * PropertyDocument findFirstOrThrow
   */
  export type PropertyDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyDocument to fetch.
     */
    where?: PropertyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocuments to fetch.
     */
    orderBy?: PropertyDocumentOrderByWithRelationInput | PropertyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyDocuments.
     */
    cursor?: PropertyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyDocuments.
     */
    distinct?: PropertyDocumentScalarFieldEnum | PropertyDocumentScalarFieldEnum[]
  }

  /**
   * PropertyDocument findMany
   */
  export type PropertyDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter, which PropertyDocuments to fetch.
     */
    where?: PropertyDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyDocuments to fetch.
     */
    orderBy?: PropertyDocumentOrderByWithRelationInput | PropertyDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyDocuments.
     */
    cursor?: PropertyDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyDocuments.
     */
    skip?: number
    distinct?: PropertyDocumentScalarFieldEnum | PropertyDocumentScalarFieldEnum[]
  }

  /**
   * PropertyDocument create
   */
  export type PropertyDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyDocument.
     */
    data: XOR<PropertyDocumentCreateInput, PropertyDocumentUncheckedCreateInput>
  }

  /**
   * PropertyDocument createMany
   */
  export type PropertyDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyDocuments.
     */
    data: PropertyDocumentCreateManyInput | PropertyDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyDocument createManyAndReturn
   */
  export type PropertyDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyDocuments.
     */
    data: PropertyDocumentCreateManyInput | PropertyDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyDocument update
   */
  export type PropertyDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyDocument.
     */
    data: XOR<PropertyDocumentUpdateInput, PropertyDocumentUncheckedUpdateInput>
    /**
     * Choose, which PropertyDocument to update.
     */
    where: PropertyDocumentWhereUniqueInput
  }

  /**
   * PropertyDocument updateMany
   */
  export type PropertyDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyDocuments.
     */
    data: XOR<PropertyDocumentUpdateManyMutationInput, PropertyDocumentUncheckedUpdateManyInput>
    /**
     * Filter which PropertyDocuments to update
     */
    where?: PropertyDocumentWhereInput
    /**
     * Limit how many PropertyDocuments to update.
     */
    limit?: number
  }

  /**
   * PropertyDocument updateManyAndReturn
   */
  export type PropertyDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * The data used to update PropertyDocuments.
     */
    data: XOR<PropertyDocumentUpdateManyMutationInput, PropertyDocumentUncheckedUpdateManyInput>
    /**
     * Filter which PropertyDocuments to update
     */
    where?: PropertyDocumentWhereInput
    /**
     * Limit how many PropertyDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyDocument upsert
   */
  export type PropertyDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyDocument to update in case it exists.
     */
    where: PropertyDocumentWhereUniqueInput
    /**
     * In case the PropertyDocument found by the `where` argument doesn't exist, create a new PropertyDocument with this data.
     */
    create: XOR<PropertyDocumentCreateInput, PropertyDocumentUncheckedCreateInput>
    /**
     * In case the PropertyDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyDocumentUpdateInput, PropertyDocumentUncheckedUpdateInput>
  }

  /**
   * PropertyDocument delete
   */
  export type PropertyDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
    /**
     * Filter which PropertyDocument to delete.
     */
    where: PropertyDocumentWhereUniqueInput
  }

  /**
   * PropertyDocument deleteMany
   */
  export type PropertyDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyDocuments to delete
     */
    where?: PropertyDocumentWhereInput
    /**
     * Limit how many PropertyDocuments to delete.
     */
    limit?: number
  }

  /**
   * PropertyDocument without action
   */
  export type PropertyDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyDocument
     */
    select?: PropertyDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyDocument
     */
    omit?: PropertyDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyDocumentInclude<ExtArgs> | null
  }


  /**
   * Model PropertyUnit
   */

  export type AggregatePropertyUnit = {
    _count: PropertyUnitCountAggregateOutputType | null
    _avg: PropertyUnitAvgAggregateOutputType | null
    _sum: PropertyUnitSumAggregateOutputType | null
    _min: PropertyUnitMinAggregateOutputType | null
    _max: PropertyUnitMaxAggregateOutputType | null
  }

  export type PropertyUnitAvgAggregateOutputType = {
    floorLevel: number | null
  }

  export type PropertyUnitSumAggregateOutputType = {
    floorLevel: number | null
  }

  export type PropertyUnitMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitIdentifier: string | null
    unitType: string | null
    floorLevel: number | null
    createdAt: Date | null
  }

  export type PropertyUnitMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    unitIdentifier: string | null
    unitType: string | null
    floorLevel: number | null
    createdAt: Date | null
  }

  export type PropertyUnitCountAggregateOutputType = {
    id: number
    propertyId: number
    unitIdentifier: number
    unitType: number
    floorLevel: number
    createdAt: number
    _all: number
  }


  export type PropertyUnitAvgAggregateInputType = {
    floorLevel?: true
  }

  export type PropertyUnitSumAggregateInputType = {
    floorLevel?: true
  }

  export type PropertyUnitMinAggregateInputType = {
    id?: true
    propertyId?: true
    unitIdentifier?: true
    unitType?: true
    floorLevel?: true
    createdAt?: true
  }

  export type PropertyUnitMaxAggregateInputType = {
    id?: true
    propertyId?: true
    unitIdentifier?: true
    unitType?: true
    floorLevel?: true
    createdAt?: true
  }

  export type PropertyUnitCountAggregateInputType = {
    id?: true
    propertyId?: true
    unitIdentifier?: true
    unitType?: true
    floorLevel?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyUnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyUnit to aggregate.
     */
    where?: PropertyUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyUnits to fetch.
     */
    orderBy?: PropertyUnitOrderByWithRelationInput | PropertyUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyUnits
    **/
    _count?: true | PropertyUnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyUnitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyUnitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyUnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyUnitMaxAggregateInputType
  }

  export type GetPropertyUnitAggregateType<T extends PropertyUnitAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyUnit[P]>
      : GetScalarType<T[P], AggregatePropertyUnit[P]>
  }




  export type PropertyUnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyUnitWhereInput
    orderBy?: PropertyUnitOrderByWithAggregationInput | PropertyUnitOrderByWithAggregationInput[]
    by: PropertyUnitScalarFieldEnum[] | PropertyUnitScalarFieldEnum
    having?: PropertyUnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyUnitCountAggregateInputType | true
    _avg?: PropertyUnitAvgAggregateInputType
    _sum?: PropertyUnitSumAggregateInputType
    _min?: PropertyUnitMinAggregateInputType
    _max?: PropertyUnitMaxAggregateInputType
  }

  export type PropertyUnitGroupByOutputType = {
    id: string
    propertyId: string
    unitIdentifier: string
    unitType: string
    floorLevel: number
    createdAt: Date
    _count: PropertyUnitCountAggregateOutputType | null
    _avg: PropertyUnitAvgAggregateOutputType | null
    _sum: PropertyUnitSumAggregateOutputType | null
    _min: PropertyUnitMinAggregateOutputType | null
    _max: PropertyUnitMaxAggregateOutputType | null
  }

  type GetPropertyUnitGroupByPayload<T extends PropertyUnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyUnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyUnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyUnitGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyUnitGroupByOutputType[P]>
        }
      >
    >


  export type PropertyUnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitIdentifier?: boolean
    unitType?: boolean
    floorLevel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyUnit"]>

  export type PropertyUnitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitIdentifier?: boolean
    unitType?: boolean
    floorLevel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyUnit"]>

  export type PropertyUnitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    unitIdentifier?: boolean
    unitType?: boolean
    floorLevel?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyUnit"]>

  export type PropertyUnitSelectScalar = {
    id?: boolean
    propertyId?: boolean
    unitIdentifier?: boolean
    unitType?: boolean
    floorLevel?: boolean
    createdAt?: boolean
  }

  export type PropertyUnitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "unitIdentifier" | "unitType" | "floorLevel" | "createdAt", ExtArgs["result"]["propertyUnit"]>
  export type PropertyUnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyUnitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyUnitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyUnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyUnit"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      unitIdentifier: string
      unitType: string
      floorLevel: number
      createdAt: Date
    }, ExtArgs["result"]["propertyUnit"]>
    composites: {}
  }

  type PropertyUnitGetPayload<S extends boolean | null | undefined | PropertyUnitDefaultArgs> = $Result.GetResult<Prisma.$PropertyUnitPayload, S>

  type PropertyUnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyUnitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyUnitCountAggregateInputType | true
    }

  export interface PropertyUnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyUnit'], meta: { name: 'PropertyUnit' } }
    /**
     * Find zero or one PropertyUnit that matches the filter.
     * @param {PropertyUnitFindUniqueArgs} args - Arguments to find a PropertyUnit
     * @example
     * // Get one PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyUnitFindUniqueArgs>(args: SelectSubset<T, PropertyUnitFindUniqueArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyUnit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyUnitFindUniqueOrThrowArgs} args - Arguments to find a PropertyUnit
     * @example
     * // Get one PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyUnitFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyUnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyUnit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitFindFirstArgs} args - Arguments to find a PropertyUnit
     * @example
     * // Get one PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyUnitFindFirstArgs>(args?: SelectSubset<T, PropertyUnitFindFirstArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyUnit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitFindFirstOrThrowArgs} args - Arguments to find a PropertyUnit
     * @example
     * // Get one PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyUnitFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyUnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyUnits
     * const propertyUnits = await prisma.propertyUnit.findMany()
     * 
     * // Get first 10 PropertyUnits
     * const propertyUnits = await prisma.propertyUnit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyUnitWithIdOnly = await prisma.propertyUnit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyUnitFindManyArgs>(args?: SelectSubset<T, PropertyUnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyUnit.
     * @param {PropertyUnitCreateArgs} args - Arguments to create a PropertyUnit.
     * @example
     * // Create one PropertyUnit
     * const PropertyUnit = await prisma.propertyUnit.create({
     *   data: {
     *     // ... data to create a PropertyUnit
     *   }
     * })
     * 
     */
    create<T extends PropertyUnitCreateArgs>(args: SelectSubset<T, PropertyUnitCreateArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyUnits.
     * @param {PropertyUnitCreateManyArgs} args - Arguments to create many PropertyUnits.
     * @example
     * // Create many PropertyUnits
     * const propertyUnit = await prisma.propertyUnit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyUnitCreateManyArgs>(args?: SelectSubset<T, PropertyUnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyUnits and returns the data saved in the database.
     * @param {PropertyUnitCreateManyAndReturnArgs} args - Arguments to create many PropertyUnits.
     * @example
     * // Create many PropertyUnits
     * const propertyUnit = await prisma.propertyUnit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyUnits and only return the `id`
     * const propertyUnitWithIdOnly = await prisma.propertyUnit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyUnitCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyUnitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyUnit.
     * @param {PropertyUnitDeleteArgs} args - Arguments to delete one PropertyUnit.
     * @example
     * // Delete one PropertyUnit
     * const PropertyUnit = await prisma.propertyUnit.delete({
     *   where: {
     *     // ... filter to delete one PropertyUnit
     *   }
     * })
     * 
     */
    delete<T extends PropertyUnitDeleteArgs>(args: SelectSubset<T, PropertyUnitDeleteArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyUnit.
     * @param {PropertyUnitUpdateArgs} args - Arguments to update one PropertyUnit.
     * @example
     * // Update one PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUnitUpdateArgs>(args: SelectSubset<T, PropertyUnitUpdateArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyUnits.
     * @param {PropertyUnitDeleteManyArgs} args - Arguments to filter PropertyUnits to delete.
     * @example
     * // Delete a few PropertyUnits
     * const { count } = await prisma.propertyUnit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyUnitDeleteManyArgs>(args?: SelectSubset<T, PropertyUnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyUnits
     * const propertyUnit = await prisma.propertyUnit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUnitUpdateManyArgs>(args: SelectSubset<T, PropertyUnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyUnits and returns the data updated in the database.
     * @param {PropertyUnitUpdateManyAndReturnArgs} args - Arguments to update many PropertyUnits.
     * @example
     * // Update many PropertyUnits
     * const propertyUnit = await prisma.propertyUnit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyUnits and only return the `id`
     * const propertyUnitWithIdOnly = await prisma.propertyUnit.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyUnitUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUnitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyUnit.
     * @param {PropertyUnitUpsertArgs} args - Arguments to update or create a PropertyUnit.
     * @example
     * // Update or create a PropertyUnit
     * const propertyUnit = await prisma.propertyUnit.upsert({
     *   create: {
     *     // ... data to create a PropertyUnit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyUnit we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUnitUpsertArgs>(args: SelectSubset<T, PropertyUnitUpsertArgs<ExtArgs>>): Prisma__PropertyUnitClient<$Result.GetResult<Prisma.$PropertyUnitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitCountArgs} args - Arguments to filter PropertyUnits to count.
     * @example
     * // Count the number of PropertyUnits
     * const count = await prisma.propertyUnit.count({
     *   where: {
     *     // ... the filter for the PropertyUnits we want to count
     *   }
     * })
    **/
    count<T extends PropertyUnitCountArgs>(
      args?: Subset<T, PropertyUnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyUnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyUnitAggregateArgs>(args: Subset<T, PropertyUnitAggregateArgs>): Prisma.PrismaPromise<GetPropertyUnitAggregateType<T>>

    /**
     * Group by PropertyUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUnitGroupByArgs} args - Group by arguments.
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
      T extends PropertyUnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyUnitGroupByArgs['orderBy'] }
        : { orderBy?: PropertyUnitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyUnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyUnit model
   */
  readonly fields: PropertyUnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyUnit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyUnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyUnit model
   */
  interface PropertyUnitFieldRefs {
    readonly id: FieldRef<"PropertyUnit", 'String'>
    readonly propertyId: FieldRef<"PropertyUnit", 'String'>
    readonly unitIdentifier: FieldRef<"PropertyUnit", 'String'>
    readonly unitType: FieldRef<"PropertyUnit", 'String'>
    readonly floorLevel: FieldRef<"PropertyUnit", 'Int'>
    readonly createdAt: FieldRef<"PropertyUnit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyUnit findUnique
   */
  export type PropertyUnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter, which PropertyUnit to fetch.
     */
    where: PropertyUnitWhereUniqueInput
  }

  /**
   * PropertyUnit findUniqueOrThrow
   */
  export type PropertyUnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter, which PropertyUnit to fetch.
     */
    where: PropertyUnitWhereUniqueInput
  }

  /**
   * PropertyUnit findFirst
   */
  export type PropertyUnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter, which PropertyUnit to fetch.
     */
    where?: PropertyUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyUnits to fetch.
     */
    orderBy?: PropertyUnitOrderByWithRelationInput | PropertyUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyUnits.
     */
    cursor?: PropertyUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyUnits.
     */
    distinct?: PropertyUnitScalarFieldEnum | PropertyUnitScalarFieldEnum[]
  }

  /**
   * PropertyUnit findFirstOrThrow
   */
  export type PropertyUnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter, which PropertyUnit to fetch.
     */
    where?: PropertyUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyUnits to fetch.
     */
    orderBy?: PropertyUnitOrderByWithRelationInput | PropertyUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyUnits.
     */
    cursor?: PropertyUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyUnits.
     */
    distinct?: PropertyUnitScalarFieldEnum | PropertyUnitScalarFieldEnum[]
  }

  /**
   * PropertyUnit findMany
   */
  export type PropertyUnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter, which PropertyUnits to fetch.
     */
    where?: PropertyUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyUnits to fetch.
     */
    orderBy?: PropertyUnitOrderByWithRelationInput | PropertyUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyUnits.
     */
    cursor?: PropertyUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyUnits.
     */
    skip?: number
    distinct?: PropertyUnitScalarFieldEnum | PropertyUnitScalarFieldEnum[]
  }

  /**
   * PropertyUnit create
   */
  export type PropertyUnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyUnit.
     */
    data: XOR<PropertyUnitCreateInput, PropertyUnitUncheckedCreateInput>
  }

  /**
   * PropertyUnit createMany
   */
  export type PropertyUnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyUnits.
     */
    data: PropertyUnitCreateManyInput | PropertyUnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyUnit createManyAndReturn
   */
  export type PropertyUnitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyUnits.
     */
    data: PropertyUnitCreateManyInput | PropertyUnitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyUnit update
   */
  export type PropertyUnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyUnit.
     */
    data: XOR<PropertyUnitUpdateInput, PropertyUnitUncheckedUpdateInput>
    /**
     * Choose, which PropertyUnit to update.
     */
    where: PropertyUnitWhereUniqueInput
  }

  /**
   * PropertyUnit updateMany
   */
  export type PropertyUnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyUnits.
     */
    data: XOR<PropertyUnitUpdateManyMutationInput, PropertyUnitUncheckedUpdateManyInput>
    /**
     * Filter which PropertyUnits to update
     */
    where?: PropertyUnitWhereInput
    /**
     * Limit how many PropertyUnits to update.
     */
    limit?: number
  }

  /**
   * PropertyUnit updateManyAndReturn
   */
  export type PropertyUnitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * The data used to update PropertyUnits.
     */
    data: XOR<PropertyUnitUpdateManyMutationInput, PropertyUnitUncheckedUpdateManyInput>
    /**
     * Filter which PropertyUnits to update
     */
    where?: PropertyUnitWhereInput
    /**
     * Limit how many PropertyUnits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyUnit upsert
   */
  export type PropertyUnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyUnit to update in case it exists.
     */
    where: PropertyUnitWhereUniqueInput
    /**
     * In case the PropertyUnit found by the `where` argument doesn't exist, create a new PropertyUnit with this data.
     */
    create: XOR<PropertyUnitCreateInput, PropertyUnitUncheckedCreateInput>
    /**
     * In case the PropertyUnit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUnitUpdateInput, PropertyUnitUncheckedUpdateInput>
  }

  /**
   * PropertyUnit delete
   */
  export type PropertyUnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
    /**
     * Filter which PropertyUnit to delete.
     */
    where: PropertyUnitWhereUniqueInput
  }

  /**
   * PropertyUnit deleteMany
   */
  export type PropertyUnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyUnits to delete
     */
    where?: PropertyUnitWhereInput
    /**
     * Limit how many PropertyUnits to delete.
     */
    limit?: number
  }

  /**
   * PropertyUnit without action
   */
  export type PropertyUnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyUnit
     */
    select?: PropertyUnitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyUnit
     */
    omit?: PropertyUnitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyUnitInclude<ExtArgs> | null
  }


  /**
   * Model PropertyPhoto
   */

  export type AggregatePropertyPhoto = {
    _count: PropertyPhotoCountAggregateOutputType | null
    _min: PropertyPhotoMinAggregateOutputType | null
    _max: PropertyPhotoMaxAggregateOutputType | null
  }

  export type PropertyPhotoMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    photoType: string | null
    mediaUrl: string | null
    capturedAt: Date | null
  }

  export type PropertyPhotoMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    photoType: string | null
    mediaUrl: string | null
    capturedAt: Date | null
  }

  export type PropertyPhotoCountAggregateOutputType = {
    id: number
    propertyId: number
    photoType: number
    mediaUrl: number
    capturedAt: number
    _all: number
  }


  export type PropertyPhotoMinAggregateInputType = {
    id?: true
    propertyId?: true
    photoType?: true
    mediaUrl?: true
    capturedAt?: true
  }

  export type PropertyPhotoMaxAggregateInputType = {
    id?: true
    propertyId?: true
    photoType?: true
    mediaUrl?: true
    capturedAt?: true
  }

  export type PropertyPhotoCountAggregateInputType = {
    id?: true
    propertyId?: true
    photoType?: true
    mediaUrl?: true
    capturedAt?: true
    _all?: true
  }

  export type PropertyPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyPhoto to aggregate.
     */
    where?: PropertyPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyPhotos to fetch.
     */
    orderBy?: PropertyPhotoOrderByWithRelationInput | PropertyPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyPhotos
    **/
    _count?: true | PropertyPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyPhotoMaxAggregateInputType
  }

  export type GetPropertyPhotoAggregateType<T extends PropertyPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyPhoto[P]>
      : GetScalarType<T[P], AggregatePropertyPhoto[P]>
  }




  export type PropertyPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyPhotoWhereInput
    orderBy?: PropertyPhotoOrderByWithAggregationInput | PropertyPhotoOrderByWithAggregationInput[]
    by: PropertyPhotoScalarFieldEnum[] | PropertyPhotoScalarFieldEnum
    having?: PropertyPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyPhotoCountAggregateInputType | true
    _min?: PropertyPhotoMinAggregateInputType
    _max?: PropertyPhotoMaxAggregateInputType
  }

  export type PropertyPhotoGroupByOutputType = {
    id: string
    propertyId: string
    photoType: string
    mediaUrl: string
    capturedAt: Date
    _count: PropertyPhotoCountAggregateOutputType | null
    _min: PropertyPhotoMinAggregateOutputType | null
    _max: PropertyPhotoMaxAggregateOutputType | null
  }

  type GetPropertyPhotoGroupByPayload<T extends PropertyPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyPhotoGroupByOutputType[P]>
        }
      >
    >


  export type PropertyPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    photoType?: boolean
    mediaUrl?: boolean
    capturedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyPhoto"]>

  export type PropertyPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    photoType?: boolean
    mediaUrl?: boolean
    capturedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyPhoto"]>

  export type PropertyPhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    photoType?: boolean
    mediaUrl?: boolean
    capturedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyPhoto"]>

  export type PropertyPhotoSelectScalar = {
    id?: boolean
    propertyId?: boolean
    photoType?: boolean
    mediaUrl?: boolean
    capturedAt?: boolean
  }

  export type PropertyPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "photoType" | "mediaUrl" | "capturedAt", ExtArgs["result"]["propertyPhoto"]>
  export type PropertyPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyPhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyPhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyPhoto"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      photoType: string
      mediaUrl: string
      capturedAt: Date
    }, ExtArgs["result"]["propertyPhoto"]>
    composites: {}
  }

  type PropertyPhotoGetPayload<S extends boolean | null | undefined | PropertyPhotoDefaultArgs> = $Result.GetResult<Prisma.$PropertyPhotoPayload, S>

  type PropertyPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyPhotoCountAggregateInputType | true
    }

  export interface PropertyPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyPhoto'], meta: { name: 'PropertyPhoto' } }
    /**
     * Find zero or one PropertyPhoto that matches the filter.
     * @param {PropertyPhotoFindUniqueArgs} args - Arguments to find a PropertyPhoto
     * @example
     * // Get one PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyPhotoFindUniqueArgs>(args: SelectSubset<T, PropertyPhotoFindUniqueArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyPhotoFindUniqueOrThrowArgs} args - Arguments to find a PropertyPhoto
     * @example
     * // Get one PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoFindFirstArgs} args - Arguments to find a PropertyPhoto
     * @example
     * // Get one PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyPhotoFindFirstArgs>(args?: SelectSubset<T, PropertyPhotoFindFirstArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoFindFirstOrThrowArgs} args - Arguments to find a PropertyPhoto
     * @example
     * // Get one PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyPhotos
     * const propertyPhotos = await prisma.propertyPhoto.findMany()
     * 
     * // Get first 10 PropertyPhotos
     * const propertyPhotos = await prisma.propertyPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyPhotoWithIdOnly = await prisma.propertyPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyPhotoFindManyArgs>(args?: SelectSubset<T, PropertyPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyPhoto.
     * @param {PropertyPhotoCreateArgs} args - Arguments to create a PropertyPhoto.
     * @example
     * // Create one PropertyPhoto
     * const PropertyPhoto = await prisma.propertyPhoto.create({
     *   data: {
     *     // ... data to create a PropertyPhoto
     *   }
     * })
     * 
     */
    create<T extends PropertyPhotoCreateArgs>(args: SelectSubset<T, PropertyPhotoCreateArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyPhotos.
     * @param {PropertyPhotoCreateManyArgs} args - Arguments to create many PropertyPhotos.
     * @example
     * // Create many PropertyPhotos
     * const propertyPhoto = await prisma.propertyPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyPhotoCreateManyArgs>(args?: SelectSubset<T, PropertyPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyPhotos and returns the data saved in the database.
     * @param {PropertyPhotoCreateManyAndReturnArgs} args - Arguments to create many PropertyPhotos.
     * @example
     * // Create many PropertyPhotos
     * const propertyPhoto = await prisma.propertyPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyPhotos and only return the `id`
     * const propertyPhotoWithIdOnly = await prisma.propertyPhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyPhoto.
     * @param {PropertyPhotoDeleteArgs} args - Arguments to delete one PropertyPhoto.
     * @example
     * // Delete one PropertyPhoto
     * const PropertyPhoto = await prisma.propertyPhoto.delete({
     *   where: {
     *     // ... filter to delete one PropertyPhoto
     *   }
     * })
     * 
     */
    delete<T extends PropertyPhotoDeleteArgs>(args: SelectSubset<T, PropertyPhotoDeleteArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyPhoto.
     * @param {PropertyPhotoUpdateArgs} args - Arguments to update one PropertyPhoto.
     * @example
     * // Update one PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyPhotoUpdateArgs>(args: SelectSubset<T, PropertyPhotoUpdateArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyPhotos.
     * @param {PropertyPhotoDeleteManyArgs} args - Arguments to filter PropertyPhotos to delete.
     * @example
     * // Delete a few PropertyPhotos
     * const { count } = await prisma.propertyPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyPhotoDeleteManyArgs>(args?: SelectSubset<T, PropertyPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyPhotos
     * const propertyPhoto = await prisma.propertyPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyPhotoUpdateManyArgs>(args: SelectSubset<T, PropertyPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyPhotos and returns the data updated in the database.
     * @param {PropertyPhotoUpdateManyAndReturnArgs} args - Arguments to update many PropertyPhotos.
     * @example
     * // Update many PropertyPhotos
     * const propertyPhoto = await prisma.propertyPhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyPhotos and only return the `id`
     * const propertyPhotoWithIdOnly = await prisma.propertyPhoto.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyPhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyPhoto.
     * @param {PropertyPhotoUpsertArgs} args - Arguments to update or create a PropertyPhoto.
     * @example
     * // Update or create a PropertyPhoto
     * const propertyPhoto = await prisma.propertyPhoto.upsert({
     *   create: {
     *     // ... data to create a PropertyPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyPhoto we want to update
     *   }
     * })
     */
    upsert<T extends PropertyPhotoUpsertArgs>(args: SelectSubset<T, PropertyPhotoUpsertArgs<ExtArgs>>): Prisma__PropertyPhotoClient<$Result.GetResult<Prisma.$PropertyPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoCountArgs} args - Arguments to filter PropertyPhotos to count.
     * @example
     * // Count the number of PropertyPhotos
     * const count = await prisma.propertyPhoto.count({
     *   where: {
     *     // ... the filter for the PropertyPhotos we want to count
     *   }
     * })
    **/
    count<T extends PropertyPhotoCountArgs>(
      args?: Subset<T, PropertyPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyPhotoAggregateArgs>(args: Subset<T, PropertyPhotoAggregateArgs>): Prisma.PrismaPromise<GetPropertyPhotoAggregateType<T>>

    /**
     * Group by PropertyPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyPhotoGroupByArgs} args - Group by arguments.
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
      T extends PropertyPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyPhotoGroupByArgs['orderBy'] }
        : { orderBy?: PropertyPhotoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyPhoto model
   */
  readonly fields: PropertyPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyPhoto model
   */
  interface PropertyPhotoFieldRefs {
    readonly id: FieldRef<"PropertyPhoto", 'String'>
    readonly propertyId: FieldRef<"PropertyPhoto", 'String'>
    readonly photoType: FieldRef<"PropertyPhoto", 'String'>
    readonly mediaUrl: FieldRef<"PropertyPhoto", 'String'>
    readonly capturedAt: FieldRef<"PropertyPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyPhoto findUnique
   */
  export type PropertyPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter, which PropertyPhoto to fetch.
     */
    where: PropertyPhotoWhereUniqueInput
  }

  /**
   * PropertyPhoto findUniqueOrThrow
   */
  export type PropertyPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter, which PropertyPhoto to fetch.
     */
    where: PropertyPhotoWhereUniqueInput
  }

  /**
   * PropertyPhoto findFirst
   */
  export type PropertyPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter, which PropertyPhoto to fetch.
     */
    where?: PropertyPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyPhotos to fetch.
     */
    orderBy?: PropertyPhotoOrderByWithRelationInput | PropertyPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyPhotos.
     */
    cursor?: PropertyPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyPhotos.
     */
    distinct?: PropertyPhotoScalarFieldEnum | PropertyPhotoScalarFieldEnum[]
  }

  /**
   * PropertyPhoto findFirstOrThrow
   */
  export type PropertyPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter, which PropertyPhoto to fetch.
     */
    where?: PropertyPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyPhotos to fetch.
     */
    orderBy?: PropertyPhotoOrderByWithRelationInput | PropertyPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyPhotos.
     */
    cursor?: PropertyPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyPhotos.
     */
    distinct?: PropertyPhotoScalarFieldEnum | PropertyPhotoScalarFieldEnum[]
  }

  /**
   * PropertyPhoto findMany
   */
  export type PropertyPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter, which PropertyPhotos to fetch.
     */
    where?: PropertyPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyPhotos to fetch.
     */
    orderBy?: PropertyPhotoOrderByWithRelationInput | PropertyPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyPhotos.
     */
    cursor?: PropertyPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyPhotos.
     */
    skip?: number
    distinct?: PropertyPhotoScalarFieldEnum | PropertyPhotoScalarFieldEnum[]
  }

  /**
   * PropertyPhoto create
   */
  export type PropertyPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyPhoto.
     */
    data: XOR<PropertyPhotoCreateInput, PropertyPhotoUncheckedCreateInput>
  }

  /**
   * PropertyPhoto createMany
   */
  export type PropertyPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyPhotos.
     */
    data: PropertyPhotoCreateManyInput | PropertyPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyPhoto createManyAndReturn
   */
  export type PropertyPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyPhotos.
     */
    data: PropertyPhotoCreateManyInput | PropertyPhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyPhoto update
   */
  export type PropertyPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyPhoto.
     */
    data: XOR<PropertyPhotoUpdateInput, PropertyPhotoUncheckedUpdateInput>
    /**
     * Choose, which PropertyPhoto to update.
     */
    where: PropertyPhotoWhereUniqueInput
  }

  /**
   * PropertyPhoto updateMany
   */
  export type PropertyPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyPhotos.
     */
    data: XOR<PropertyPhotoUpdateManyMutationInput, PropertyPhotoUncheckedUpdateManyInput>
    /**
     * Filter which PropertyPhotos to update
     */
    where?: PropertyPhotoWhereInput
    /**
     * Limit how many PropertyPhotos to update.
     */
    limit?: number
  }

  /**
   * PropertyPhoto updateManyAndReturn
   */
  export type PropertyPhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * The data used to update PropertyPhotos.
     */
    data: XOR<PropertyPhotoUpdateManyMutationInput, PropertyPhotoUncheckedUpdateManyInput>
    /**
     * Filter which PropertyPhotos to update
     */
    where?: PropertyPhotoWhereInput
    /**
     * Limit how many PropertyPhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyPhoto upsert
   */
  export type PropertyPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyPhoto to update in case it exists.
     */
    where: PropertyPhotoWhereUniqueInput
    /**
     * In case the PropertyPhoto found by the `where` argument doesn't exist, create a new PropertyPhoto with this data.
     */
    create: XOR<PropertyPhotoCreateInput, PropertyPhotoUncheckedCreateInput>
    /**
     * In case the PropertyPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyPhotoUpdateInput, PropertyPhotoUncheckedUpdateInput>
  }

  /**
   * PropertyPhoto delete
   */
  export type PropertyPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
    /**
     * Filter which PropertyPhoto to delete.
     */
    where: PropertyPhotoWhereUniqueInput
  }

  /**
   * PropertyPhoto deleteMany
   */
  export type PropertyPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyPhotos to delete
     */
    where?: PropertyPhotoWhereInput
    /**
     * Limit how many PropertyPhotos to delete.
     */
    limit?: number
  }

  /**
   * PropertyPhoto without action
   */
  export type PropertyPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyPhoto
     */
    select?: PropertyPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyPhoto
     */
    omit?: PropertyPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyPhotoInclude<ExtArgs> | null
  }


  /**
   * Model ValuationList
   */

  export type AggregateValuationList = {
    _count: ValuationListCountAggregateOutputType | null
    _min: ValuationListMinAggregateOutputType | null
    _max: ValuationListMaxAggregateOutputType | null
  }

  export type ValuationListMinAggregateOutputType = {
    id: string | null
    name: string | null
    effectiveDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ValuationListMaxAggregateOutputType = {
    id: string | null
    name: string | null
    effectiveDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ValuationListCountAggregateOutputType = {
    id: number
    name: number
    effectiveDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type ValuationListMinAggregateInputType = {
    id?: true
    name?: true
    effectiveDate?: true
    status?: true
    createdAt?: true
  }

  export type ValuationListMaxAggregateInputType = {
    id?: true
    name?: true
    effectiveDate?: true
    status?: true
    createdAt?: true
  }

  export type ValuationListCountAggregateInputType = {
    id?: true
    name?: true
    effectiveDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ValuationListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ValuationList to aggregate.
     */
    where?: ValuationListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValuationLists to fetch.
     */
    orderBy?: ValuationListOrderByWithRelationInput | ValuationListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ValuationListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValuationLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValuationLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ValuationLists
    **/
    _count?: true | ValuationListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ValuationListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ValuationListMaxAggregateInputType
  }

  export type GetValuationListAggregateType<T extends ValuationListAggregateArgs> = {
        [P in keyof T & keyof AggregateValuationList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateValuationList[P]>
      : GetScalarType<T[P], AggregateValuationList[P]>
  }




  export type ValuationListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ValuationListWhereInput
    orderBy?: ValuationListOrderByWithAggregationInput | ValuationListOrderByWithAggregationInput[]
    by: ValuationListScalarFieldEnum[] | ValuationListScalarFieldEnum
    having?: ValuationListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ValuationListCountAggregateInputType | true
    _min?: ValuationListMinAggregateInputType
    _max?: ValuationListMaxAggregateInputType
  }

  export type ValuationListGroupByOutputType = {
    id: string
    name: string
    effectiveDate: Date
    status: string
    createdAt: Date
    _count: ValuationListCountAggregateOutputType | null
    _min: ValuationListMinAggregateOutputType | null
    _max: ValuationListMaxAggregateOutputType | null
  }

  type GetValuationListGroupByPayload<T extends ValuationListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ValuationListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ValuationListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ValuationListGroupByOutputType[P]>
            : GetScalarType<T[P], ValuationListGroupByOutputType[P]>
        }
      >
    >


  export type ValuationListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    effectiveDate?: boolean
    status?: boolean
    createdAt?: boolean
    valuations?: boolean | ValuationList$valuationsArgs<ExtArgs>
    _count?: boolean | ValuationListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["valuationList"]>

  export type ValuationListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    effectiveDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["valuationList"]>

  export type ValuationListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    effectiveDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["valuationList"]>

  export type ValuationListSelectScalar = {
    id?: boolean
    name?: boolean
    effectiveDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ValuationListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "effectiveDate" | "status" | "createdAt", ExtArgs["result"]["valuationList"]>
  export type ValuationListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    valuations?: boolean | ValuationList$valuationsArgs<ExtArgs>
    _count?: boolean | ValuationListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ValuationListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ValuationListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ValuationListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ValuationList"
    objects: {
      valuations: Prisma.$PropertyValuationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      effectiveDate: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["valuationList"]>
    composites: {}
  }

  type ValuationListGetPayload<S extends boolean | null | undefined | ValuationListDefaultArgs> = $Result.GetResult<Prisma.$ValuationListPayload, S>

  type ValuationListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ValuationListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ValuationListCountAggregateInputType | true
    }

  export interface ValuationListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ValuationList'], meta: { name: 'ValuationList' } }
    /**
     * Find zero or one ValuationList that matches the filter.
     * @param {ValuationListFindUniqueArgs} args - Arguments to find a ValuationList
     * @example
     * // Get one ValuationList
     * const valuationList = await prisma.valuationList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ValuationListFindUniqueArgs>(args: SelectSubset<T, ValuationListFindUniqueArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ValuationList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ValuationListFindUniqueOrThrowArgs} args - Arguments to find a ValuationList
     * @example
     * // Get one ValuationList
     * const valuationList = await prisma.valuationList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ValuationListFindUniqueOrThrowArgs>(args: SelectSubset<T, ValuationListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ValuationList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListFindFirstArgs} args - Arguments to find a ValuationList
     * @example
     * // Get one ValuationList
     * const valuationList = await prisma.valuationList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ValuationListFindFirstArgs>(args?: SelectSubset<T, ValuationListFindFirstArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ValuationList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListFindFirstOrThrowArgs} args - Arguments to find a ValuationList
     * @example
     * // Get one ValuationList
     * const valuationList = await prisma.valuationList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ValuationListFindFirstOrThrowArgs>(args?: SelectSubset<T, ValuationListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ValuationLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ValuationLists
     * const valuationLists = await prisma.valuationList.findMany()
     * 
     * // Get first 10 ValuationLists
     * const valuationLists = await prisma.valuationList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const valuationListWithIdOnly = await prisma.valuationList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ValuationListFindManyArgs>(args?: SelectSubset<T, ValuationListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ValuationList.
     * @param {ValuationListCreateArgs} args - Arguments to create a ValuationList.
     * @example
     * // Create one ValuationList
     * const ValuationList = await prisma.valuationList.create({
     *   data: {
     *     // ... data to create a ValuationList
     *   }
     * })
     * 
     */
    create<T extends ValuationListCreateArgs>(args: SelectSubset<T, ValuationListCreateArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ValuationLists.
     * @param {ValuationListCreateManyArgs} args - Arguments to create many ValuationLists.
     * @example
     * // Create many ValuationLists
     * const valuationList = await prisma.valuationList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ValuationListCreateManyArgs>(args?: SelectSubset<T, ValuationListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ValuationLists and returns the data saved in the database.
     * @param {ValuationListCreateManyAndReturnArgs} args - Arguments to create many ValuationLists.
     * @example
     * // Create many ValuationLists
     * const valuationList = await prisma.valuationList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ValuationLists and only return the `id`
     * const valuationListWithIdOnly = await prisma.valuationList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ValuationListCreateManyAndReturnArgs>(args?: SelectSubset<T, ValuationListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ValuationList.
     * @param {ValuationListDeleteArgs} args - Arguments to delete one ValuationList.
     * @example
     * // Delete one ValuationList
     * const ValuationList = await prisma.valuationList.delete({
     *   where: {
     *     // ... filter to delete one ValuationList
     *   }
     * })
     * 
     */
    delete<T extends ValuationListDeleteArgs>(args: SelectSubset<T, ValuationListDeleteArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ValuationList.
     * @param {ValuationListUpdateArgs} args - Arguments to update one ValuationList.
     * @example
     * // Update one ValuationList
     * const valuationList = await prisma.valuationList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ValuationListUpdateArgs>(args: SelectSubset<T, ValuationListUpdateArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ValuationLists.
     * @param {ValuationListDeleteManyArgs} args - Arguments to filter ValuationLists to delete.
     * @example
     * // Delete a few ValuationLists
     * const { count } = await prisma.valuationList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ValuationListDeleteManyArgs>(args?: SelectSubset<T, ValuationListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ValuationLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ValuationLists
     * const valuationList = await prisma.valuationList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ValuationListUpdateManyArgs>(args: SelectSubset<T, ValuationListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ValuationLists and returns the data updated in the database.
     * @param {ValuationListUpdateManyAndReturnArgs} args - Arguments to update many ValuationLists.
     * @example
     * // Update many ValuationLists
     * const valuationList = await prisma.valuationList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ValuationLists and only return the `id`
     * const valuationListWithIdOnly = await prisma.valuationList.updateManyAndReturn({
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
    updateManyAndReturn<T extends ValuationListUpdateManyAndReturnArgs>(args: SelectSubset<T, ValuationListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ValuationList.
     * @param {ValuationListUpsertArgs} args - Arguments to update or create a ValuationList.
     * @example
     * // Update or create a ValuationList
     * const valuationList = await prisma.valuationList.upsert({
     *   create: {
     *     // ... data to create a ValuationList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ValuationList we want to update
     *   }
     * })
     */
    upsert<T extends ValuationListUpsertArgs>(args: SelectSubset<T, ValuationListUpsertArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ValuationLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListCountArgs} args - Arguments to filter ValuationLists to count.
     * @example
     * // Count the number of ValuationLists
     * const count = await prisma.valuationList.count({
     *   where: {
     *     // ... the filter for the ValuationLists we want to count
     *   }
     * })
    **/
    count<T extends ValuationListCountArgs>(
      args?: Subset<T, ValuationListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ValuationListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ValuationList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ValuationListAggregateArgs>(args: Subset<T, ValuationListAggregateArgs>): Prisma.PrismaPromise<GetValuationListAggregateType<T>>

    /**
     * Group by ValuationList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValuationListGroupByArgs} args - Group by arguments.
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
      T extends ValuationListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ValuationListGroupByArgs['orderBy'] }
        : { orderBy?: ValuationListGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ValuationListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValuationListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ValuationList model
   */
  readonly fields: ValuationListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ValuationList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ValuationListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    valuations<T extends ValuationList$valuationsArgs<ExtArgs> = {}>(args?: Subset<T, ValuationList$valuationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ValuationList model
   */
  interface ValuationListFieldRefs {
    readonly id: FieldRef<"ValuationList", 'String'>
    readonly name: FieldRef<"ValuationList", 'String'>
    readonly effectiveDate: FieldRef<"ValuationList", 'DateTime'>
    readonly status: FieldRef<"ValuationList", 'String'>
    readonly createdAt: FieldRef<"ValuationList", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ValuationList findUnique
   */
  export type ValuationListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter, which ValuationList to fetch.
     */
    where: ValuationListWhereUniqueInput
  }

  /**
   * ValuationList findUniqueOrThrow
   */
  export type ValuationListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter, which ValuationList to fetch.
     */
    where: ValuationListWhereUniqueInput
  }

  /**
   * ValuationList findFirst
   */
  export type ValuationListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter, which ValuationList to fetch.
     */
    where?: ValuationListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValuationLists to fetch.
     */
    orderBy?: ValuationListOrderByWithRelationInput | ValuationListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ValuationLists.
     */
    cursor?: ValuationListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValuationLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValuationLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ValuationLists.
     */
    distinct?: ValuationListScalarFieldEnum | ValuationListScalarFieldEnum[]
  }

  /**
   * ValuationList findFirstOrThrow
   */
  export type ValuationListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter, which ValuationList to fetch.
     */
    where?: ValuationListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValuationLists to fetch.
     */
    orderBy?: ValuationListOrderByWithRelationInput | ValuationListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ValuationLists.
     */
    cursor?: ValuationListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValuationLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValuationLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ValuationLists.
     */
    distinct?: ValuationListScalarFieldEnum | ValuationListScalarFieldEnum[]
  }

  /**
   * ValuationList findMany
   */
  export type ValuationListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter, which ValuationLists to fetch.
     */
    where?: ValuationListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ValuationLists to fetch.
     */
    orderBy?: ValuationListOrderByWithRelationInput | ValuationListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ValuationLists.
     */
    cursor?: ValuationListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ValuationLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ValuationLists.
     */
    skip?: number
    distinct?: ValuationListScalarFieldEnum | ValuationListScalarFieldEnum[]
  }

  /**
   * ValuationList create
   */
  export type ValuationListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * The data needed to create a ValuationList.
     */
    data: XOR<ValuationListCreateInput, ValuationListUncheckedCreateInput>
  }

  /**
   * ValuationList createMany
   */
  export type ValuationListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ValuationLists.
     */
    data: ValuationListCreateManyInput | ValuationListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ValuationList createManyAndReturn
   */
  export type ValuationListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * The data used to create many ValuationLists.
     */
    data: ValuationListCreateManyInput | ValuationListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ValuationList update
   */
  export type ValuationListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * The data needed to update a ValuationList.
     */
    data: XOR<ValuationListUpdateInput, ValuationListUncheckedUpdateInput>
    /**
     * Choose, which ValuationList to update.
     */
    where: ValuationListWhereUniqueInput
  }

  /**
   * ValuationList updateMany
   */
  export type ValuationListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ValuationLists.
     */
    data: XOR<ValuationListUpdateManyMutationInput, ValuationListUncheckedUpdateManyInput>
    /**
     * Filter which ValuationLists to update
     */
    where?: ValuationListWhereInput
    /**
     * Limit how many ValuationLists to update.
     */
    limit?: number
  }

  /**
   * ValuationList updateManyAndReturn
   */
  export type ValuationListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * The data used to update ValuationLists.
     */
    data: XOR<ValuationListUpdateManyMutationInput, ValuationListUncheckedUpdateManyInput>
    /**
     * Filter which ValuationLists to update
     */
    where?: ValuationListWhereInput
    /**
     * Limit how many ValuationLists to update.
     */
    limit?: number
  }

  /**
   * ValuationList upsert
   */
  export type ValuationListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * The filter to search for the ValuationList to update in case it exists.
     */
    where: ValuationListWhereUniqueInput
    /**
     * In case the ValuationList found by the `where` argument doesn't exist, create a new ValuationList with this data.
     */
    create: XOR<ValuationListCreateInput, ValuationListUncheckedCreateInput>
    /**
     * In case the ValuationList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ValuationListUpdateInput, ValuationListUncheckedUpdateInput>
  }

  /**
   * ValuationList delete
   */
  export type ValuationListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
    /**
     * Filter which ValuationList to delete.
     */
    where: ValuationListWhereUniqueInput
  }

  /**
   * ValuationList deleteMany
   */
  export type ValuationListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ValuationLists to delete
     */
    where?: ValuationListWhereInput
    /**
     * Limit how many ValuationLists to delete.
     */
    limit?: number
  }

  /**
   * ValuationList.valuations
   */
  export type ValuationList$valuationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    where?: PropertyValuationWhereInput
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    cursor?: PropertyValuationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyValuationScalarFieldEnum | PropertyValuationScalarFieldEnum[]
  }

  /**
   * ValuationList without action
   */
  export type ValuationListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValuationList
     */
    select?: ValuationListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ValuationList
     */
    omit?: ValuationListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ValuationListInclude<ExtArgs> | null
  }


  /**
   * Model PropertyValuation
   */

  export type AggregatePropertyValuation = {
    _count: PropertyValuationCountAggregateOutputType | null
    _avg: PropertyValuationAvgAggregateOutputType | null
    _sum: PropertyValuationSumAggregateOutputType | null
    _min: PropertyValuationMinAggregateOutputType | null
    _max: PropertyValuationMaxAggregateOutputType | null
  }

  export type PropertyValuationAvgAggregateOutputType = {
    rateableValue: Decimal | null
  }

  export type PropertyValuationSumAggregateOutputType = {
    rateableValue: Decimal | null
  }

  export type PropertyValuationMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    valuationListId: string | null
    rateableValue: Decimal | null
    isCurrent: boolean | null
    lvdReference: string | null
    effectiveDate: Date | null
    createdAt: Date | null
  }

  export type PropertyValuationMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    valuationListId: string | null
    rateableValue: Decimal | null
    isCurrent: boolean | null
    lvdReference: string | null
    effectiveDate: Date | null
    createdAt: Date | null
  }

  export type PropertyValuationCountAggregateOutputType = {
    id: number
    propertyId: number
    valuationListId: number
    rateableValue: number
    isCurrent: number
    lvdReference: number
    effectiveDate: number
    createdAt: number
    _all: number
  }


  export type PropertyValuationAvgAggregateInputType = {
    rateableValue?: true
  }

  export type PropertyValuationSumAggregateInputType = {
    rateableValue?: true
  }

  export type PropertyValuationMinAggregateInputType = {
    id?: true
    propertyId?: true
    valuationListId?: true
    rateableValue?: true
    isCurrent?: true
    lvdReference?: true
    effectiveDate?: true
    createdAt?: true
  }

  export type PropertyValuationMaxAggregateInputType = {
    id?: true
    propertyId?: true
    valuationListId?: true
    rateableValue?: true
    isCurrent?: true
    lvdReference?: true
    effectiveDate?: true
    createdAt?: true
  }

  export type PropertyValuationCountAggregateInputType = {
    id?: true
    propertyId?: true
    valuationListId?: true
    rateableValue?: true
    isCurrent?: true
    lvdReference?: true
    effectiveDate?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyValuationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyValuation to aggregate.
     */
    where?: PropertyValuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyValuations to fetch.
     */
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyValuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyValuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyValuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyValuations
    **/
    _count?: true | PropertyValuationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyValuationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyValuationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyValuationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyValuationMaxAggregateInputType
  }

  export type GetPropertyValuationAggregateType<T extends PropertyValuationAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyValuation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyValuation[P]>
      : GetScalarType<T[P], AggregatePropertyValuation[P]>
  }




  export type PropertyValuationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyValuationWhereInput
    orderBy?: PropertyValuationOrderByWithAggregationInput | PropertyValuationOrderByWithAggregationInput[]
    by: PropertyValuationScalarFieldEnum[] | PropertyValuationScalarFieldEnum
    having?: PropertyValuationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyValuationCountAggregateInputType | true
    _avg?: PropertyValuationAvgAggregateInputType
    _sum?: PropertyValuationSumAggregateInputType
    _min?: PropertyValuationMinAggregateInputType
    _max?: PropertyValuationMaxAggregateInputType
  }

  export type PropertyValuationGroupByOutputType = {
    id: string
    propertyId: string
    valuationListId: string
    rateableValue: Decimal
    isCurrent: boolean
    lvdReference: string
    effectiveDate: Date
    createdAt: Date
    _count: PropertyValuationCountAggregateOutputType | null
    _avg: PropertyValuationAvgAggregateOutputType | null
    _sum: PropertyValuationSumAggregateOutputType | null
    _min: PropertyValuationMinAggregateOutputType | null
    _max: PropertyValuationMaxAggregateOutputType | null
  }

  type GetPropertyValuationGroupByPayload<T extends PropertyValuationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyValuationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyValuationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyValuationGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyValuationGroupByOutputType[P]>
        }
      >
    >


  export type PropertyValuationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    valuationListId?: boolean
    rateableValue?: boolean
    isCurrent?: boolean
    lvdReference?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyValuation"]>

  export type PropertyValuationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    valuationListId?: boolean
    rateableValue?: boolean
    isCurrent?: boolean
    lvdReference?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyValuation"]>

  export type PropertyValuationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    valuationListId?: boolean
    rateableValue?: boolean
    isCurrent?: boolean
    lvdReference?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyValuation"]>

  export type PropertyValuationSelectScalar = {
    id?: boolean
    propertyId?: boolean
    valuationListId?: boolean
    rateableValue?: boolean
    isCurrent?: boolean
    lvdReference?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
  }

  export type PropertyValuationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "valuationListId" | "rateableValue" | "isCurrent" | "lvdReference" | "effectiveDate" | "createdAt", ExtArgs["result"]["propertyValuation"]>
  export type PropertyValuationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }
  export type PropertyValuationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }
  export type PropertyValuationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    valuationList?: boolean | ValuationListDefaultArgs<ExtArgs>
  }

  export type $PropertyValuationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyValuation"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      valuationList: Prisma.$ValuationListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      valuationListId: string
      rateableValue: Prisma.Decimal
      isCurrent: boolean
      lvdReference: string
      effectiveDate: Date
      createdAt: Date
    }, ExtArgs["result"]["propertyValuation"]>
    composites: {}
  }

  type PropertyValuationGetPayload<S extends boolean | null | undefined | PropertyValuationDefaultArgs> = $Result.GetResult<Prisma.$PropertyValuationPayload, S>

  type PropertyValuationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyValuationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyValuationCountAggregateInputType | true
    }

  export interface PropertyValuationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyValuation'], meta: { name: 'PropertyValuation' } }
    /**
     * Find zero or one PropertyValuation that matches the filter.
     * @param {PropertyValuationFindUniqueArgs} args - Arguments to find a PropertyValuation
     * @example
     * // Get one PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyValuationFindUniqueArgs>(args: SelectSubset<T, PropertyValuationFindUniqueArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyValuation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyValuationFindUniqueOrThrowArgs} args - Arguments to find a PropertyValuation
     * @example
     * // Get one PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyValuationFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyValuationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyValuation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationFindFirstArgs} args - Arguments to find a PropertyValuation
     * @example
     * // Get one PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyValuationFindFirstArgs>(args?: SelectSubset<T, PropertyValuationFindFirstArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyValuation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationFindFirstOrThrowArgs} args - Arguments to find a PropertyValuation
     * @example
     * // Get one PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyValuationFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyValuationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyValuations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyValuations
     * const propertyValuations = await prisma.propertyValuation.findMany()
     * 
     * // Get first 10 PropertyValuations
     * const propertyValuations = await prisma.propertyValuation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyValuationWithIdOnly = await prisma.propertyValuation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyValuationFindManyArgs>(args?: SelectSubset<T, PropertyValuationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyValuation.
     * @param {PropertyValuationCreateArgs} args - Arguments to create a PropertyValuation.
     * @example
     * // Create one PropertyValuation
     * const PropertyValuation = await prisma.propertyValuation.create({
     *   data: {
     *     // ... data to create a PropertyValuation
     *   }
     * })
     * 
     */
    create<T extends PropertyValuationCreateArgs>(args: SelectSubset<T, PropertyValuationCreateArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyValuations.
     * @param {PropertyValuationCreateManyArgs} args - Arguments to create many PropertyValuations.
     * @example
     * // Create many PropertyValuations
     * const propertyValuation = await prisma.propertyValuation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyValuationCreateManyArgs>(args?: SelectSubset<T, PropertyValuationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyValuations and returns the data saved in the database.
     * @param {PropertyValuationCreateManyAndReturnArgs} args - Arguments to create many PropertyValuations.
     * @example
     * // Create many PropertyValuations
     * const propertyValuation = await prisma.propertyValuation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyValuations and only return the `id`
     * const propertyValuationWithIdOnly = await prisma.propertyValuation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyValuationCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyValuationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyValuation.
     * @param {PropertyValuationDeleteArgs} args - Arguments to delete one PropertyValuation.
     * @example
     * // Delete one PropertyValuation
     * const PropertyValuation = await prisma.propertyValuation.delete({
     *   where: {
     *     // ... filter to delete one PropertyValuation
     *   }
     * })
     * 
     */
    delete<T extends PropertyValuationDeleteArgs>(args: SelectSubset<T, PropertyValuationDeleteArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyValuation.
     * @param {PropertyValuationUpdateArgs} args - Arguments to update one PropertyValuation.
     * @example
     * // Update one PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyValuationUpdateArgs>(args: SelectSubset<T, PropertyValuationUpdateArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyValuations.
     * @param {PropertyValuationDeleteManyArgs} args - Arguments to filter PropertyValuations to delete.
     * @example
     * // Delete a few PropertyValuations
     * const { count } = await prisma.propertyValuation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyValuationDeleteManyArgs>(args?: SelectSubset<T, PropertyValuationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyValuations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyValuations
     * const propertyValuation = await prisma.propertyValuation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyValuationUpdateManyArgs>(args: SelectSubset<T, PropertyValuationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyValuations and returns the data updated in the database.
     * @param {PropertyValuationUpdateManyAndReturnArgs} args - Arguments to update many PropertyValuations.
     * @example
     * // Update many PropertyValuations
     * const propertyValuation = await prisma.propertyValuation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyValuations and only return the `id`
     * const propertyValuationWithIdOnly = await prisma.propertyValuation.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyValuationUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyValuationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyValuation.
     * @param {PropertyValuationUpsertArgs} args - Arguments to update or create a PropertyValuation.
     * @example
     * // Update or create a PropertyValuation
     * const propertyValuation = await prisma.propertyValuation.upsert({
     *   create: {
     *     // ... data to create a PropertyValuation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyValuation we want to update
     *   }
     * })
     */
    upsert<T extends PropertyValuationUpsertArgs>(args: SelectSubset<T, PropertyValuationUpsertArgs<ExtArgs>>): Prisma__PropertyValuationClient<$Result.GetResult<Prisma.$PropertyValuationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyValuations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationCountArgs} args - Arguments to filter PropertyValuations to count.
     * @example
     * // Count the number of PropertyValuations
     * const count = await prisma.propertyValuation.count({
     *   where: {
     *     // ... the filter for the PropertyValuations we want to count
     *   }
     * })
    **/
    count<T extends PropertyValuationCountArgs>(
      args?: Subset<T, PropertyValuationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyValuationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyValuation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyValuationAggregateArgs>(args: Subset<T, PropertyValuationAggregateArgs>): Prisma.PrismaPromise<GetPropertyValuationAggregateType<T>>

    /**
     * Group by PropertyValuation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyValuationGroupByArgs} args - Group by arguments.
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
      T extends PropertyValuationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyValuationGroupByArgs['orderBy'] }
        : { orderBy?: PropertyValuationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyValuationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyValuationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyValuation model
   */
  readonly fields: PropertyValuationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyValuation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyValuationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    valuationList<T extends ValuationListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ValuationListDefaultArgs<ExtArgs>>): Prisma__ValuationListClient<$Result.GetResult<Prisma.$ValuationListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyValuation model
   */
  interface PropertyValuationFieldRefs {
    readonly id: FieldRef<"PropertyValuation", 'String'>
    readonly propertyId: FieldRef<"PropertyValuation", 'String'>
    readonly valuationListId: FieldRef<"PropertyValuation", 'String'>
    readonly rateableValue: FieldRef<"PropertyValuation", 'Decimal'>
    readonly isCurrent: FieldRef<"PropertyValuation", 'Boolean'>
    readonly lvdReference: FieldRef<"PropertyValuation", 'String'>
    readonly effectiveDate: FieldRef<"PropertyValuation", 'DateTime'>
    readonly createdAt: FieldRef<"PropertyValuation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyValuation findUnique
   */
  export type PropertyValuationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyValuation to fetch.
     */
    where: PropertyValuationWhereUniqueInput
  }

  /**
   * PropertyValuation findUniqueOrThrow
   */
  export type PropertyValuationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyValuation to fetch.
     */
    where: PropertyValuationWhereUniqueInput
  }

  /**
   * PropertyValuation findFirst
   */
  export type PropertyValuationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyValuation to fetch.
     */
    where?: PropertyValuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyValuations to fetch.
     */
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyValuations.
     */
    cursor?: PropertyValuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyValuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyValuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyValuations.
     */
    distinct?: PropertyValuationScalarFieldEnum | PropertyValuationScalarFieldEnum[]
  }

  /**
   * PropertyValuation findFirstOrThrow
   */
  export type PropertyValuationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyValuation to fetch.
     */
    where?: PropertyValuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyValuations to fetch.
     */
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyValuations.
     */
    cursor?: PropertyValuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyValuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyValuations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyValuations.
     */
    distinct?: PropertyValuationScalarFieldEnum | PropertyValuationScalarFieldEnum[]
  }

  /**
   * PropertyValuation findMany
   */
  export type PropertyValuationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyValuations to fetch.
     */
    where?: PropertyValuationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyValuations to fetch.
     */
    orderBy?: PropertyValuationOrderByWithRelationInput | PropertyValuationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyValuations.
     */
    cursor?: PropertyValuationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyValuations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyValuations.
     */
    skip?: number
    distinct?: PropertyValuationScalarFieldEnum | PropertyValuationScalarFieldEnum[]
  }

  /**
   * PropertyValuation create
   */
  export type PropertyValuationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyValuation.
     */
    data: XOR<PropertyValuationCreateInput, PropertyValuationUncheckedCreateInput>
  }

  /**
   * PropertyValuation createMany
   */
  export type PropertyValuationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyValuations.
     */
    data: PropertyValuationCreateManyInput | PropertyValuationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyValuation createManyAndReturn
   */
  export type PropertyValuationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyValuations.
     */
    data: PropertyValuationCreateManyInput | PropertyValuationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyValuation update
   */
  export type PropertyValuationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyValuation.
     */
    data: XOR<PropertyValuationUpdateInput, PropertyValuationUncheckedUpdateInput>
    /**
     * Choose, which PropertyValuation to update.
     */
    where: PropertyValuationWhereUniqueInput
  }

  /**
   * PropertyValuation updateMany
   */
  export type PropertyValuationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyValuations.
     */
    data: XOR<PropertyValuationUpdateManyMutationInput, PropertyValuationUncheckedUpdateManyInput>
    /**
     * Filter which PropertyValuations to update
     */
    where?: PropertyValuationWhereInput
    /**
     * Limit how many PropertyValuations to update.
     */
    limit?: number
  }

  /**
   * PropertyValuation updateManyAndReturn
   */
  export type PropertyValuationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * The data used to update PropertyValuations.
     */
    data: XOR<PropertyValuationUpdateManyMutationInput, PropertyValuationUncheckedUpdateManyInput>
    /**
     * Filter which PropertyValuations to update
     */
    where?: PropertyValuationWhereInput
    /**
     * Limit how many PropertyValuations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyValuation upsert
   */
  export type PropertyValuationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyValuation to update in case it exists.
     */
    where: PropertyValuationWhereUniqueInput
    /**
     * In case the PropertyValuation found by the `where` argument doesn't exist, create a new PropertyValuation with this data.
     */
    create: XOR<PropertyValuationCreateInput, PropertyValuationUncheckedCreateInput>
    /**
     * In case the PropertyValuation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyValuationUpdateInput, PropertyValuationUncheckedUpdateInput>
  }

  /**
   * PropertyValuation delete
   */
  export type PropertyValuationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
    /**
     * Filter which PropertyValuation to delete.
     */
    where: PropertyValuationWhereUniqueInput
  }

  /**
   * PropertyValuation deleteMany
   */
  export type PropertyValuationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyValuations to delete
     */
    where?: PropertyValuationWhereInput
    /**
     * Limit how many PropertyValuations to delete.
     */
    limit?: number
  }

  /**
   * PropertyValuation without action
   */
  export type PropertyValuationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyValuation
     */
    select?: PropertyValuationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyValuation
     */
    omit?: PropertyValuationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyValuationInclude<ExtArgs> | null
  }


  /**
   * Model PropertyVerification
   */

  export type AggregatePropertyVerification = {
    _count: PropertyVerificationCountAggregateOutputType | null
    _avg: PropertyVerificationAvgAggregateOutputType | null
    _sum: PropertyVerificationSumAggregateOutputType | null
    _min: PropertyVerificationMinAggregateOutputType | null
    _max: PropertyVerificationMaxAggregateOutputType | null
  }

  export type PropertyVerificationAvgAggregateOutputType = {
    verifierLatitude: number | null
    verifierLongitude: number | null
  }

  export type PropertyVerificationSumAggregateOutputType = {
    verifierLatitude: number | null
    verifierLongitude: number | null
  }

  export type PropertyVerificationMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    verifiedByPersonnelId: string | null
    verifierLatitude: number | null
    verifierLongitude: number | null
    isWithinPolygon: boolean | null
    capturedAt: Date | null
    receivedAt: Date | null
    outcome: string | null
    notes: string | null
    reviewStatus: string | null
    reviewedByPersonnelId: string | null
    reviewedAt: Date | null
    reviewNotes: string | null
  }

  export type PropertyVerificationMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    verifiedByPersonnelId: string | null
    verifierLatitude: number | null
    verifierLongitude: number | null
    isWithinPolygon: boolean | null
    capturedAt: Date | null
    receivedAt: Date | null
    outcome: string | null
    notes: string | null
    reviewStatus: string | null
    reviewedByPersonnelId: string | null
    reviewedAt: Date | null
    reviewNotes: string | null
  }

  export type PropertyVerificationCountAggregateOutputType = {
    id: number
    propertyId: number
    verifiedByPersonnelId: number
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: number
    verifiedSnapshot: number
    capturedAt: number
    receivedAt: number
    outcome: number
    notes: number
    reviewStatus: number
    reviewedByPersonnelId: number
    reviewedAt: number
    reviewNotes: number
    _all: number
  }


  export type PropertyVerificationAvgAggregateInputType = {
    verifierLatitude?: true
    verifierLongitude?: true
  }

  export type PropertyVerificationSumAggregateInputType = {
    verifierLatitude?: true
    verifierLongitude?: true
  }

  export type PropertyVerificationMinAggregateInputType = {
    id?: true
    propertyId?: true
    verifiedByPersonnelId?: true
    verifierLatitude?: true
    verifierLongitude?: true
    isWithinPolygon?: true
    capturedAt?: true
    receivedAt?: true
    outcome?: true
    notes?: true
    reviewStatus?: true
    reviewedByPersonnelId?: true
    reviewedAt?: true
    reviewNotes?: true
  }

  export type PropertyVerificationMaxAggregateInputType = {
    id?: true
    propertyId?: true
    verifiedByPersonnelId?: true
    verifierLatitude?: true
    verifierLongitude?: true
    isWithinPolygon?: true
    capturedAt?: true
    receivedAt?: true
    outcome?: true
    notes?: true
    reviewStatus?: true
    reviewedByPersonnelId?: true
    reviewedAt?: true
    reviewNotes?: true
  }

  export type PropertyVerificationCountAggregateInputType = {
    id?: true
    propertyId?: true
    verifiedByPersonnelId?: true
    verifierLatitude?: true
    verifierLongitude?: true
    isWithinPolygon?: true
    verifiedSnapshot?: true
    capturedAt?: true
    receivedAt?: true
    outcome?: true
    notes?: true
    reviewStatus?: true
    reviewedByPersonnelId?: true
    reviewedAt?: true
    reviewNotes?: true
    _all?: true
  }

  export type PropertyVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyVerification to aggregate.
     */
    where?: PropertyVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyVerifications to fetch.
     */
    orderBy?: PropertyVerificationOrderByWithRelationInput | PropertyVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyVerifications
    **/
    _count?: true | PropertyVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyVerificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyVerificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyVerificationMaxAggregateInputType
  }

  export type GetPropertyVerificationAggregateType<T extends PropertyVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyVerification[P]>
      : GetScalarType<T[P], AggregatePropertyVerification[P]>
  }




  export type PropertyVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyVerificationWhereInput
    orderBy?: PropertyVerificationOrderByWithAggregationInput | PropertyVerificationOrderByWithAggregationInput[]
    by: PropertyVerificationScalarFieldEnum[] | PropertyVerificationScalarFieldEnum
    having?: PropertyVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyVerificationCountAggregateInputType | true
    _avg?: PropertyVerificationAvgAggregateInputType
    _sum?: PropertyVerificationSumAggregateInputType
    _min?: PropertyVerificationMinAggregateInputType
    _max?: PropertyVerificationMaxAggregateInputType
  }

  export type PropertyVerificationGroupByOutputType = {
    id: string
    propertyId: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonValue
    capturedAt: Date
    receivedAt: Date
    outcome: string
    notes: string | null
    reviewStatus: string
    reviewedByPersonnelId: string | null
    reviewedAt: Date | null
    reviewNotes: string | null
    _count: PropertyVerificationCountAggregateOutputType | null
    _avg: PropertyVerificationAvgAggregateOutputType | null
    _sum: PropertyVerificationSumAggregateOutputType | null
    _min: PropertyVerificationMinAggregateOutputType | null
    _max: PropertyVerificationMaxAggregateOutputType | null
  }

  type GetPropertyVerificationGroupByPayload<T extends PropertyVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyVerificationGroupByOutputType[P]>
        }
      >
    >


  export type PropertyVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    verifiedByPersonnelId?: boolean
    verifierLatitude?: boolean
    verifierLongitude?: boolean
    isWithinPolygon?: boolean
    verifiedSnapshot?: boolean
    capturedAt?: boolean
    receivedAt?: boolean
    outcome?: boolean
    notes?: boolean
    reviewStatus?: boolean
    reviewedByPersonnelId?: boolean
    reviewedAt?: boolean
    reviewNotes?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyVerification"]>

  export type PropertyVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    verifiedByPersonnelId?: boolean
    verifierLatitude?: boolean
    verifierLongitude?: boolean
    isWithinPolygon?: boolean
    verifiedSnapshot?: boolean
    capturedAt?: boolean
    receivedAt?: boolean
    outcome?: boolean
    notes?: boolean
    reviewStatus?: boolean
    reviewedByPersonnelId?: boolean
    reviewedAt?: boolean
    reviewNotes?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyVerification"]>

  export type PropertyVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    verifiedByPersonnelId?: boolean
    verifierLatitude?: boolean
    verifierLongitude?: boolean
    isWithinPolygon?: boolean
    verifiedSnapshot?: boolean
    capturedAt?: boolean
    receivedAt?: boolean
    outcome?: boolean
    notes?: boolean
    reviewStatus?: boolean
    reviewedByPersonnelId?: boolean
    reviewedAt?: boolean
    reviewNotes?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyVerification"]>

  export type PropertyVerificationSelectScalar = {
    id?: boolean
    propertyId?: boolean
    verifiedByPersonnelId?: boolean
    verifierLatitude?: boolean
    verifierLongitude?: boolean
    isWithinPolygon?: boolean
    verifiedSnapshot?: boolean
    capturedAt?: boolean
    receivedAt?: boolean
    outcome?: boolean
    notes?: boolean
    reviewStatus?: boolean
    reviewedByPersonnelId?: boolean
    reviewedAt?: boolean
    reviewNotes?: boolean
  }

  export type PropertyVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "propertyId" | "verifiedByPersonnelId" | "verifierLatitude" | "verifierLongitude" | "isWithinPolygon" | "verifiedSnapshot" | "capturedAt" | "receivedAt" | "outcome" | "notes" | "reviewStatus" | "reviewedByPersonnelId" | "reviewedAt" | "reviewNotes", ExtArgs["result"]["propertyVerification"]>
  export type PropertyVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyVerification"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      verifiedByPersonnelId: string
      verifierLatitude: number
      verifierLongitude: number
      isWithinPolygon: boolean
      verifiedSnapshot: Prisma.JsonValue
      capturedAt: Date
      receivedAt: Date
      outcome: string
      notes: string | null
      reviewStatus: string
      reviewedByPersonnelId: string | null
      reviewedAt: Date | null
      reviewNotes: string | null
    }, ExtArgs["result"]["propertyVerification"]>
    composites: {}
  }

  type PropertyVerificationGetPayload<S extends boolean | null | undefined | PropertyVerificationDefaultArgs> = $Result.GetResult<Prisma.$PropertyVerificationPayload, S>

  type PropertyVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyVerificationCountAggregateInputType | true
    }

  export interface PropertyVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyVerification'], meta: { name: 'PropertyVerification' } }
    /**
     * Find zero or one PropertyVerification that matches the filter.
     * @param {PropertyVerificationFindUniqueArgs} args - Arguments to find a PropertyVerification
     * @example
     * // Get one PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyVerificationFindUniqueArgs>(args: SelectSubset<T, PropertyVerificationFindUniqueArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyVerificationFindUniqueOrThrowArgs} args - Arguments to find a PropertyVerification
     * @example
     * // Get one PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationFindFirstArgs} args - Arguments to find a PropertyVerification
     * @example
     * // Get one PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyVerificationFindFirstArgs>(args?: SelectSubset<T, PropertyVerificationFindFirstArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationFindFirstOrThrowArgs} args - Arguments to find a PropertyVerification
     * @example
     * // Get one PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyVerifications
     * const propertyVerifications = await prisma.propertyVerification.findMany()
     * 
     * // Get first 10 PropertyVerifications
     * const propertyVerifications = await prisma.propertyVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyVerificationWithIdOnly = await prisma.propertyVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyVerificationFindManyArgs>(args?: SelectSubset<T, PropertyVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyVerification.
     * @param {PropertyVerificationCreateArgs} args - Arguments to create a PropertyVerification.
     * @example
     * // Create one PropertyVerification
     * const PropertyVerification = await prisma.propertyVerification.create({
     *   data: {
     *     // ... data to create a PropertyVerification
     *   }
     * })
     * 
     */
    create<T extends PropertyVerificationCreateArgs>(args: SelectSubset<T, PropertyVerificationCreateArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyVerifications.
     * @param {PropertyVerificationCreateManyArgs} args - Arguments to create many PropertyVerifications.
     * @example
     * // Create many PropertyVerifications
     * const propertyVerification = await prisma.propertyVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyVerificationCreateManyArgs>(args?: SelectSubset<T, PropertyVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyVerifications and returns the data saved in the database.
     * @param {PropertyVerificationCreateManyAndReturnArgs} args - Arguments to create many PropertyVerifications.
     * @example
     * // Create many PropertyVerifications
     * const propertyVerification = await prisma.propertyVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyVerifications and only return the `id`
     * const propertyVerificationWithIdOnly = await prisma.propertyVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyVerification.
     * @param {PropertyVerificationDeleteArgs} args - Arguments to delete one PropertyVerification.
     * @example
     * // Delete one PropertyVerification
     * const PropertyVerification = await prisma.propertyVerification.delete({
     *   where: {
     *     // ... filter to delete one PropertyVerification
     *   }
     * })
     * 
     */
    delete<T extends PropertyVerificationDeleteArgs>(args: SelectSubset<T, PropertyVerificationDeleteArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyVerification.
     * @param {PropertyVerificationUpdateArgs} args - Arguments to update one PropertyVerification.
     * @example
     * // Update one PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyVerificationUpdateArgs>(args: SelectSubset<T, PropertyVerificationUpdateArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyVerifications.
     * @param {PropertyVerificationDeleteManyArgs} args - Arguments to filter PropertyVerifications to delete.
     * @example
     * // Delete a few PropertyVerifications
     * const { count } = await prisma.propertyVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyVerificationDeleteManyArgs>(args?: SelectSubset<T, PropertyVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyVerifications
     * const propertyVerification = await prisma.propertyVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyVerificationUpdateManyArgs>(args: SelectSubset<T, PropertyVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyVerifications and returns the data updated in the database.
     * @param {PropertyVerificationUpdateManyAndReturnArgs} args - Arguments to update many PropertyVerifications.
     * @example
     * // Update many PropertyVerifications
     * const propertyVerification = await prisma.propertyVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyVerifications and only return the `id`
     * const propertyVerificationWithIdOnly = await prisma.propertyVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyVerification.
     * @param {PropertyVerificationUpsertArgs} args - Arguments to update or create a PropertyVerification.
     * @example
     * // Update or create a PropertyVerification
     * const propertyVerification = await prisma.propertyVerification.upsert({
     *   create: {
     *     // ... data to create a PropertyVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyVerification we want to update
     *   }
     * })
     */
    upsert<T extends PropertyVerificationUpsertArgs>(args: SelectSubset<T, PropertyVerificationUpsertArgs<ExtArgs>>): Prisma__PropertyVerificationClient<$Result.GetResult<Prisma.$PropertyVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationCountArgs} args - Arguments to filter PropertyVerifications to count.
     * @example
     * // Count the number of PropertyVerifications
     * const count = await prisma.propertyVerification.count({
     *   where: {
     *     // ... the filter for the PropertyVerifications we want to count
     *   }
     * })
    **/
    count<T extends PropertyVerificationCountArgs>(
      args?: Subset<T, PropertyVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyVerificationAggregateArgs>(args: Subset<T, PropertyVerificationAggregateArgs>): Prisma.PrismaPromise<GetPropertyVerificationAggregateType<T>>

    /**
     * Group by PropertyVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyVerificationGroupByArgs} args - Group by arguments.
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
      T extends PropertyVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyVerificationGroupByArgs['orderBy'] }
        : { orderBy?: PropertyVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyVerification model
   */
  readonly fields: PropertyVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PropertyVerification model
   */
  interface PropertyVerificationFieldRefs {
    readonly id: FieldRef<"PropertyVerification", 'String'>
    readonly propertyId: FieldRef<"PropertyVerification", 'String'>
    readonly verifiedByPersonnelId: FieldRef<"PropertyVerification", 'String'>
    readonly verifierLatitude: FieldRef<"PropertyVerification", 'Float'>
    readonly verifierLongitude: FieldRef<"PropertyVerification", 'Float'>
    readonly isWithinPolygon: FieldRef<"PropertyVerification", 'Boolean'>
    readonly verifiedSnapshot: FieldRef<"PropertyVerification", 'Json'>
    readonly capturedAt: FieldRef<"PropertyVerification", 'DateTime'>
    readonly receivedAt: FieldRef<"PropertyVerification", 'DateTime'>
    readonly outcome: FieldRef<"PropertyVerification", 'String'>
    readonly notes: FieldRef<"PropertyVerification", 'String'>
    readonly reviewStatus: FieldRef<"PropertyVerification", 'String'>
    readonly reviewedByPersonnelId: FieldRef<"PropertyVerification", 'String'>
    readonly reviewedAt: FieldRef<"PropertyVerification", 'DateTime'>
    readonly reviewNotes: FieldRef<"PropertyVerification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PropertyVerification findUnique
   */
  export type PropertyVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyVerification to fetch.
     */
    where: PropertyVerificationWhereUniqueInput
  }

  /**
   * PropertyVerification findUniqueOrThrow
   */
  export type PropertyVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyVerification to fetch.
     */
    where: PropertyVerificationWhereUniqueInput
  }

  /**
   * PropertyVerification findFirst
   */
  export type PropertyVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyVerification to fetch.
     */
    where?: PropertyVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyVerifications to fetch.
     */
    orderBy?: PropertyVerificationOrderByWithRelationInput | PropertyVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyVerifications.
     */
    cursor?: PropertyVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyVerifications.
     */
    distinct?: PropertyVerificationScalarFieldEnum | PropertyVerificationScalarFieldEnum[]
  }

  /**
   * PropertyVerification findFirstOrThrow
   */
  export type PropertyVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyVerification to fetch.
     */
    where?: PropertyVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyVerifications to fetch.
     */
    orderBy?: PropertyVerificationOrderByWithRelationInput | PropertyVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyVerifications.
     */
    cursor?: PropertyVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyVerifications.
     */
    distinct?: PropertyVerificationScalarFieldEnum | PropertyVerificationScalarFieldEnum[]
  }

  /**
   * PropertyVerification findMany
   */
  export type PropertyVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter, which PropertyVerifications to fetch.
     */
    where?: PropertyVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyVerifications to fetch.
     */
    orderBy?: PropertyVerificationOrderByWithRelationInput | PropertyVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyVerifications.
     */
    cursor?: PropertyVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyVerifications.
     */
    skip?: number
    distinct?: PropertyVerificationScalarFieldEnum | PropertyVerificationScalarFieldEnum[]
  }

  /**
   * PropertyVerification create
   */
  export type PropertyVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyVerification.
     */
    data: XOR<PropertyVerificationCreateInput, PropertyVerificationUncheckedCreateInput>
  }

  /**
   * PropertyVerification createMany
   */
  export type PropertyVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyVerifications.
     */
    data: PropertyVerificationCreateManyInput | PropertyVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyVerification createManyAndReturn
   */
  export type PropertyVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyVerifications.
     */
    data: PropertyVerificationCreateManyInput | PropertyVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyVerification update
   */
  export type PropertyVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyVerification.
     */
    data: XOR<PropertyVerificationUpdateInput, PropertyVerificationUncheckedUpdateInput>
    /**
     * Choose, which PropertyVerification to update.
     */
    where: PropertyVerificationWhereUniqueInput
  }

  /**
   * PropertyVerification updateMany
   */
  export type PropertyVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyVerifications.
     */
    data: XOR<PropertyVerificationUpdateManyMutationInput, PropertyVerificationUncheckedUpdateManyInput>
    /**
     * Filter which PropertyVerifications to update
     */
    where?: PropertyVerificationWhereInput
    /**
     * Limit how many PropertyVerifications to update.
     */
    limit?: number
  }

  /**
   * PropertyVerification updateManyAndReturn
   */
  export type PropertyVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * The data used to update PropertyVerifications.
     */
    data: XOR<PropertyVerificationUpdateManyMutationInput, PropertyVerificationUncheckedUpdateManyInput>
    /**
     * Filter which PropertyVerifications to update
     */
    where?: PropertyVerificationWhereInput
    /**
     * Limit how many PropertyVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyVerification upsert
   */
  export type PropertyVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyVerification to update in case it exists.
     */
    where: PropertyVerificationWhereUniqueInput
    /**
     * In case the PropertyVerification found by the `where` argument doesn't exist, create a new PropertyVerification with this data.
     */
    create: XOR<PropertyVerificationCreateInput, PropertyVerificationUncheckedCreateInput>
    /**
     * In case the PropertyVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyVerificationUpdateInput, PropertyVerificationUncheckedUpdateInput>
  }

  /**
   * PropertyVerification delete
   */
  export type PropertyVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
    /**
     * Filter which PropertyVerification to delete.
     */
    where: PropertyVerificationWhereUniqueInput
  }

  /**
   * PropertyVerification deleteMany
   */
  export type PropertyVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyVerifications to delete
     */
    where?: PropertyVerificationWhereInput
    /**
     * Limit how many PropertyVerifications to delete.
     */
    limit?: number
  }

  /**
   * PropertyVerification without action
   */
  export type PropertyVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyVerification
     */
    select?: PropertyVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyVerification
     */
    omit?: PropertyVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyVerificationInclude<ExtArgs> | null
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


  export const PropertyScalarFieldEnum: {
    id: 'id',
    code: 'code',
    accountNumber: 'accountNumber',
    propertyName: 'propertyName',
    assemblyId: 'assemblyId',
    propertyClass: 'propertyClass',
    buildingStatus: 'buildingStatus',
    propertyStatus: 'propertyStatus',
    propertyUse: 'propertyUse',
    tenureType: 'tenureType',
    structureType: 'structureType',
    createdByRatepayerId: 'createdByRatepayerId',
    registrationSource: 'registrationSource',
    registeredByConcessionId: 'registeredByConcessionId',
    claimedByRatepayerId: 'claimedByRatepayerId',
    verificationStatus: 'verificationStatus',
    polygonGeoJson: 'polygonGeoJson',
    leaseDurationYears: 'leaseDurationYears',
    landAreaSqm: 'landAreaSqm',
    numberOfFloors: 'numberOfFloors',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const PropertyDocumentTypeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    isPrimaryOwnershipProof: 'isPrimaryOwnershipProof',
    requiredForRatepayerRegistration: 'requiredForRatepayerRegistration',
    createdAt: 'createdAt'
  };

  export type PropertyDocumentTypeScalarFieldEnum = (typeof PropertyDocumentTypeScalarFieldEnum)[keyof typeof PropertyDocumentTypeScalarFieldEnum]


  export const PropertyDocumentScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    issuingAuthority: 'issuingAuthority',
    issueDate: 'issueDate',
    mediaUrl: 'mediaUrl',
    fileSizeBytes: 'fileSizeBytes',
    mimeType: 'mimeType',
    uploadedByActorType: 'uploadedByActorType',
    uploadedByActorId: 'uploadedByActorId',
    ratepayerId: 'ratepayerId',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    verifiedByActorId: 'verifiedByActorId',
    rejectionReason: 'rejectionReason',
    isCapturedOnPremises: 'isCapturedOnPremises',
    premisesLatitude: 'premisesLatitude',
    premisesLongitude: 'premisesLongitude',
    premisesGpsAccuracy: 'premisesGpsAccuracy',
    deviceId: 'deviceId',
    staffRef: 'staffRef',
    capturedAt: 'capturedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PropertyDocumentScalarFieldEnum = (typeof PropertyDocumentScalarFieldEnum)[keyof typeof PropertyDocumentScalarFieldEnum]


  export const PropertyUnitScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    unitIdentifier: 'unitIdentifier',
    unitType: 'unitType',
    floorLevel: 'floorLevel',
    createdAt: 'createdAt'
  };

  export type PropertyUnitScalarFieldEnum = (typeof PropertyUnitScalarFieldEnum)[keyof typeof PropertyUnitScalarFieldEnum]


  export const PropertyPhotoScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    photoType: 'photoType',
    mediaUrl: 'mediaUrl',
    capturedAt: 'capturedAt'
  };

  export type PropertyPhotoScalarFieldEnum = (typeof PropertyPhotoScalarFieldEnum)[keyof typeof PropertyPhotoScalarFieldEnum]


  export const ValuationListScalarFieldEnum: {
    id: 'id',
    name: 'name',
    effectiveDate: 'effectiveDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ValuationListScalarFieldEnum = (typeof ValuationListScalarFieldEnum)[keyof typeof ValuationListScalarFieldEnum]


  export const PropertyValuationScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    valuationListId: 'valuationListId',
    rateableValue: 'rateableValue',
    isCurrent: 'isCurrent',
    lvdReference: 'lvdReference',
    effectiveDate: 'effectiveDate',
    createdAt: 'createdAt'
  };

  export type PropertyValuationScalarFieldEnum = (typeof PropertyValuationScalarFieldEnum)[keyof typeof PropertyValuationScalarFieldEnum]


  export const PropertyVerificationScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    verifiedByPersonnelId: 'verifiedByPersonnelId',
    verifierLatitude: 'verifierLatitude',
    verifierLongitude: 'verifierLongitude',
    isWithinPolygon: 'isWithinPolygon',
    verifiedSnapshot: 'verifiedSnapshot',
    capturedAt: 'capturedAt',
    receivedAt: 'receivedAt',
    outcome: 'outcome',
    notes: 'notes',
    reviewStatus: 'reviewStatus',
    reviewedByPersonnelId: 'reviewedByPersonnelId',
    reviewedAt: 'reviewedAt',
    reviewNotes: 'reviewNotes'
  };

  export type PropertyVerificationScalarFieldEnum = (typeof PropertyVerificationScalarFieldEnum)[keyof typeof PropertyVerificationScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: UuidFilter<"Property"> | string
    code?: StringFilter<"Property"> | string
    accountNumber?: StringNullableFilter<"Property"> | string | null
    propertyName?: StringNullableFilter<"Property"> | string | null
    assemblyId?: UuidFilter<"Property"> | string
    propertyClass?: StringFilter<"Property"> | string
    buildingStatus?: StringFilter<"Property"> | string
    propertyStatus?: StringFilter<"Property"> | string
    propertyUse?: StringFilter<"Property"> | string
    tenureType?: StringFilter<"Property"> | string
    structureType?: StringFilter<"Property"> | string
    createdByRatepayerId?: UuidNullableFilter<"Property"> | string | null
    registrationSource?: StringFilter<"Property"> | string
    registeredByConcessionId?: UuidNullableFilter<"Property"> | string | null
    claimedByRatepayerId?: UuidNullableFilter<"Property"> | string | null
    verificationStatus?: StringFilter<"Property"> | string
    polygonGeoJson?: JsonFilter<"Property">
    leaseDurationYears?: IntNullableFilter<"Property"> | number | null
    landAreaSqm?: FloatNullableFilter<"Property"> | number | null
    numberOfFloors?: IntFilter<"Property"> | number
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    units?: PropertyUnitListRelationFilter
    photos?: PropertyPhotoListRelationFilter
    documents?: PropertyDocumentListRelationFilter
    valuations?: PropertyValuationListRelationFilter
    verifications?: PropertyVerificationListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    accountNumber?: SortOrderInput | SortOrder
    propertyName?: SortOrderInput | SortOrder
    assemblyId?: SortOrder
    propertyClass?: SortOrder
    buildingStatus?: SortOrder
    propertyStatus?: SortOrder
    propertyUse?: SortOrder
    tenureType?: SortOrder
    structureType?: SortOrder
    createdByRatepayerId?: SortOrderInput | SortOrder
    registrationSource?: SortOrder
    registeredByConcessionId?: SortOrderInput | SortOrder
    claimedByRatepayerId?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    polygonGeoJson?: SortOrder
    leaseDurationYears?: SortOrderInput | SortOrder
    landAreaSqm?: SortOrderInput | SortOrder
    numberOfFloors?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    units?: PropertyUnitOrderByRelationAggregateInput
    photos?: PropertyPhotoOrderByRelationAggregateInput
    documents?: PropertyDocumentOrderByRelationAggregateInput
    valuations?: PropertyValuationOrderByRelationAggregateInput
    verifications?: PropertyVerificationOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    accountNumber?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    propertyName?: StringNullableFilter<"Property"> | string | null
    assemblyId?: UuidFilter<"Property"> | string
    propertyClass?: StringFilter<"Property"> | string
    buildingStatus?: StringFilter<"Property"> | string
    propertyStatus?: StringFilter<"Property"> | string
    propertyUse?: StringFilter<"Property"> | string
    tenureType?: StringFilter<"Property"> | string
    structureType?: StringFilter<"Property"> | string
    createdByRatepayerId?: UuidNullableFilter<"Property"> | string | null
    registrationSource?: StringFilter<"Property"> | string
    registeredByConcessionId?: UuidNullableFilter<"Property"> | string | null
    claimedByRatepayerId?: UuidNullableFilter<"Property"> | string | null
    verificationStatus?: StringFilter<"Property"> | string
    polygonGeoJson?: JsonFilter<"Property">
    leaseDurationYears?: IntNullableFilter<"Property"> | number | null
    landAreaSqm?: FloatNullableFilter<"Property"> | number | null
    numberOfFloors?: IntFilter<"Property"> | number
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    units?: PropertyUnitListRelationFilter
    photos?: PropertyPhotoListRelationFilter
    documents?: PropertyDocumentListRelationFilter
    valuations?: PropertyValuationListRelationFilter
    verifications?: PropertyVerificationListRelationFilter
  }, "id" | "code" | "accountNumber">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    accountNumber?: SortOrderInput | SortOrder
    propertyName?: SortOrderInput | SortOrder
    assemblyId?: SortOrder
    propertyClass?: SortOrder
    buildingStatus?: SortOrder
    propertyStatus?: SortOrder
    propertyUse?: SortOrder
    tenureType?: SortOrder
    structureType?: SortOrder
    createdByRatepayerId?: SortOrderInput | SortOrder
    registrationSource?: SortOrder
    registeredByConcessionId?: SortOrderInput | SortOrder
    claimedByRatepayerId?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    polygonGeoJson?: SortOrder
    leaseDurationYears?: SortOrderInput | SortOrder
    landAreaSqm?: SortOrderInput | SortOrder
    numberOfFloors?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Property"> | string
    code?: StringWithAggregatesFilter<"Property"> | string
    accountNumber?: StringNullableWithAggregatesFilter<"Property"> | string | null
    propertyName?: StringNullableWithAggregatesFilter<"Property"> | string | null
    assemblyId?: UuidWithAggregatesFilter<"Property"> | string
    propertyClass?: StringWithAggregatesFilter<"Property"> | string
    buildingStatus?: StringWithAggregatesFilter<"Property"> | string
    propertyStatus?: StringWithAggregatesFilter<"Property"> | string
    propertyUse?: StringWithAggregatesFilter<"Property"> | string
    tenureType?: StringWithAggregatesFilter<"Property"> | string
    structureType?: StringWithAggregatesFilter<"Property"> | string
    createdByRatepayerId?: UuidNullableWithAggregatesFilter<"Property"> | string | null
    registrationSource?: StringWithAggregatesFilter<"Property"> | string
    registeredByConcessionId?: UuidNullableWithAggregatesFilter<"Property"> | string | null
    claimedByRatepayerId?: UuidNullableWithAggregatesFilter<"Property"> | string | null
    verificationStatus?: StringWithAggregatesFilter<"Property"> | string
    polygonGeoJson?: JsonWithAggregatesFilter<"Property">
    leaseDurationYears?: IntNullableWithAggregatesFilter<"Property"> | number | null
    landAreaSqm?: FloatNullableWithAggregatesFilter<"Property"> | number | null
    numberOfFloors?: IntWithAggregatesFilter<"Property"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type PropertyDocumentTypeWhereInput = {
    AND?: PropertyDocumentTypeWhereInput | PropertyDocumentTypeWhereInput[]
    OR?: PropertyDocumentTypeWhereInput[]
    NOT?: PropertyDocumentTypeWhereInput | PropertyDocumentTypeWhereInput[]
    id?: UuidFilter<"PropertyDocumentType"> | string
    code?: StringFilter<"PropertyDocumentType"> | string
    name?: StringFilter<"PropertyDocumentType"> | string
    description?: StringNullableFilter<"PropertyDocumentType"> | string | null
    isPrimaryOwnershipProof?: BoolFilter<"PropertyDocumentType"> | boolean
    requiredForRatepayerRegistration?: BoolFilter<"PropertyDocumentType"> | boolean
    createdAt?: DateTimeFilter<"PropertyDocumentType"> | Date | string
  }

  export type PropertyDocumentTypeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPrimaryOwnershipProof?: SortOrder
    requiredForRatepayerRegistration?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyDocumentTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PropertyDocumentTypeWhereInput | PropertyDocumentTypeWhereInput[]
    OR?: PropertyDocumentTypeWhereInput[]
    NOT?: PropertyDocumentTypeWhereInput | PropertyDocumentTypeWhereInput[]
    name?: StringFilter<"PropertyDocumentType"> | string
    description?: StringNullableFilter<"PropertyDocumentType"> | string | null
    isPrimaryOwnershipProof?: BoolFilter<"PropertyDocumentType"> | boolean
    requiredForRatepayerRegistration?: BoolFilter<"PropertyDocumentType"> | boolean
    createdAt?: DateTimeFilter<"PropertyDocumentType"> | Date | string
  }, "id" | "code">

  export type PropertyDocumentTypeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPrimaryOwnershipProof?: SortOrder
    requiredForRatepayerRegistration?: SortOrder
    createdAt?: SortOrder
    _count?: PropertyDocumentTypeCountOrderByAggregateInput
    _max?: PropertyDocumentTypeMaxOrderByAggregateInput
    _min?: PropertyDocumentTypeMinOrderByAggregateInput
  }

  export type PropertyDocumentTypeScalarWhereWithAggregatesInput = {
    AND?: PropertyDocumentTypeScalarWhereWithAggregatesInput | PropertyDocumentTypeScalarWhereWithAggregatesInput[]
    OR?: PropertyDocumentTypeScalarWhereWithAggregatesInput[]
    NOT?: PropertyDocumentTypeScalarWhereWithAggregatesInput | PropertyDocumentTypeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyDocumentType"> | string
    code?: StringWithAggregatesFilter<"PropertyDocumentType"> | string
    name?: StringWithAggregatesFilter<"PropertyDocumentType"> | string
    description?: StringNullableWithAggregatesFilter<"PropertyDocumentType"> | string | null
    isPrimaryOwnershipProof?: BoolWithAggregatesFilter<"PropertyDocumentType"> | boolean
    requiredForRatepayerRegistration?: BoolWithAggregatesFilter<"PropertyDocumentType"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PropertyDocumentType"> | Date | string
  }

  export type PropertyDocumentWhereInput = {
    AND?: PropertyDocumentWhereInput | PropertyDocumentWhereInput[]
    OR?: PropertyDocumentWhereInput[]
    NOT?: PropertyDocumentWhereInput | PropertyDocumentWhereInput[]
    id?: UuidFilter<"PropertyDocument"> | string
    propertyId?: UuidFilter<"PropertyDocument"> | string
    documentType?: StringFilter<"PropertyDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyDocument"> | string | null
    issueDate?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    mediaUrl?: StringFilter<"PropertyDocument"> | string
    fileSizeBytes?: IntNullableFilter<"PropertyDocument"> | number | null
    mimeType?: StringNullableFilter<"PropertyDocument"> | string | null
    uploadedByActorType?: StringFilter<"PropertyDocument"> | string
    uploadedByActorId?: StringFilter<"PropertyDocument"> | string
    ratepayerId?: UuidNullableFilter<"PropertyDocument"> | string | null
    verificationStatus?: StringFilter<"PropertyDocument"> | string
    verifiedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    verifiedByActorId?: StringNullableFilter<"PropertyDocument"> | string | null
    rejectionReason?: StringNullableFilter<"PropertyDocument"> | string | null
    isCapturedOnPremises?: BoolFilter<"PropertyDocument"> | boolean
    premisesLatitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesLongitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesGpsAccuracy?: FloatNullableFilter<"PropertyDocument"> | number | null
    deviceId?: StringNullableFilter<"PropertyDocument"> | string | null
    staffRef?: StringNullableFilter<"PropertyDocument"> | string | null
    capturedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyDocument"> | Date | string
    updatedAt?: DateTimeFilter<"PropertyDocument"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type PropertyDocumentOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuingAuthority?: SortOrderInput | SortOrder
    issueDate?: SortOrderInput | SortOrder
    mediaUrl?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    uploadedByActorType?: SortOrder
    uploadedByActorId?: SortOrder
    ratepayerId?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedByActorId?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    isCapturedOnPremises?: SortOrder
    premisesLatitude?: SortOrderInput | SortOrder
    premisesLongitude?: SortOrderInput | SortOrder
    premisesGpsAccuracy?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    staffRef?: SortOrderInput | SortOrder
    capturedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PropertyDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyDocumentWhereInput | PropertyDocumentWhereInput[]
    OR?: PropertyDocumentWhereInput[]
    NOT?: PropertyDocumentWhereInput | PropertyDocumentWhereInput[]
    propertyId?: UuidFilter<"PropertyDocument"> | string
    documentType?: StringFilter<"PropertyDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyDocument"> | string | null
    issueDate?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    mediaUrl?: StringFilter<"PropertyDocument"> | string
    fileSizeBytes?: IntNullableFilter<"PropertyDocument"> | number | null
    mimeType?: StringNullableFilter<"PropertyDocument"> | string | null
    uploadedByActorType?: StringFilter<"PropertyDocument"> | string
    uploadedByActorId?: StringFilter<"PropertyDocument"> | string
    ratepayerId?: UuidNullableFilter<"PropertyDocument"> | string | null
    verificationStatus?: StringFilter<"PropertyDocument"> | string
    verifiedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    verifiedByActorId?: StringNullableFilter<"PropertyDocument"> | string | null
    rejectionReason?: StringNullableFilter<"PropertyDocument"> | string | null
    isCapturedOnPremises?: BoolFilter<"PropertyDocument"> | boolean
    premisesLatitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesLongitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesGpsAccuracy?: FloatNullableFilter<"PropertyDocument"> | number | null
    deviceId?: StringNullableFilter<"PropertyDocument"> | string | null
    staffRef?: StringNullableFilter<"PropertyDocument"> | string | null
    capturedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyDocument"> | Date | string
    updatedAt?: DateTimeFilter<"PropertyDocument"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type PropertyDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrderInput | SortOrder
    issuingAuthority?: SortOrderInput | SortOrder
    issueDate?: SortOrderInput | SortOrder
    mediaUrl?: SortOrder
    fileSizeBytes?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    uploadedByActorType?: SortOrder
    uploadedByActorId?: SortOrder
    ratepayerId?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedByActorId?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    isCapturedOnPremises?: SortOrder
    premisesLatitude?: SortOrderInput | SortOrder
    premisesLongitude?: SortOrderInput | SortOrder
    premisesGpsAccuracy?: SortOrderInput | SortOrder
    deviceId?: SortOrderInput | SortOrder
    staffRef?: SortOrderInput | SortOrder
    capturedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyDocumentCountOrderByAggregateInput
    _avg?: PropertyDocumentAvgOrderByAggregateInput
    _max?: PropertyDocumentMaxOrderByAggregateInput
    _min?: PropertyDocumentMinOrderByAggregateInput
    _sum?: PropertyDocumentSumOrderByAggregateInput
  }

  export type PropertyDocumentScalarWhereWithAggregatesInput = {
    AND?: PropertyDocumentScalarWhereWithAggregatesInput | PropertyDocumentScalarWhereWithAggregatesInput[]
    OR?: PropertyDocumentScalarWhereWithAggregatesInput[]
    NOT?: PropertyDocumentScalarWhereWithAggregatesInput | PropertyDocumentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyDocument"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyDocument"> | string
    documentType?: StringWithAggregatesFilter<"PropertyDocument"> | string
    documentNumber?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    issuingAuthority?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    issueDate?: DateTimeNullableWithAggregatesFilter<"PropertyDocument"> | Date | string | null
    mediaUrl?: StringWithAggregatesFilter<"PropertyDocument"> | string
    fileSizeBytes?: IntNullableWithAggregatesFilter<"PropertyDocument"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    uploadedByActorType?: StringWithAggregatesFilter<"PropertyDocument"> | string
    uploadedByActorId?: StringWithAggregatesFilter<"PropertyDocument"> | string
    ratepayerId?: UuidNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    verificationStatus?: StringWithAggregatesFilter<"PropertyDocument"> | string
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"PropertyDocument"> | Date | string | null
    verifiedByActorId?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    isCapturedOnPremises?: BoolWithAggregatesFilter<"PropertyDocument"> | boolean
    premisesLatitude?: FloatNullableWithAggregatesFilter<"PropertyDocument"> | number | null
    premisesLongitude?: FloatNullableWithAggregatesFilter<"PropertyDocument"> | number | null
    premisesGpsAccuracy?: FloatNullableWithAggregatesFilter<"PropertyDocument"> | number | null
    deviceId?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    staffRef?: StringNullableWithAggregatesFilter<"PropertyDocument"> | string | null
    capturedAt?: DateTimeNullableWithAggregatesFilter<"PropertyDocument"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PropertyDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PropertyDocument"> | Date | string
  }

  export type PropertyUnitWhereInput = {
    AND?: PropertyUnitWhereInput | PropertyUnitWhereInput[]
    OR?: PropertyUnitWhereInput[]
    NOT?: PropertyUnitWhereInput | PropertyUnitWhereInput[]
    id?: UuidFilter<"PropertyUnit"> | string
    propertyId?: UuidFilter<"PropertyUnit"> | string
    unitIdentifier?: StringFilter<"PropertyUnit"> | string
    unitType?: StringFilter<"PropertyUnit"> | string
    floorLevel?: IntFilter<"PropertyUnit"> | number
    createdAt?: DateTimeFilter<"PropertyUnit"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type PropertyUnitOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitIdentifier?: SortOrder
    unitType?: SortOrder
    floorLevel?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PropertyUnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyUnitWhereInput | PropertyUnitWhereInput[]
    OR?: PropertyUnitWhereInput[]
    NOT?: PropertyUnitWhereInput | PropertyUnitWhereInput[]
    propertyId?: UuidFilter<"PropertyUnit"> | string
    unitIdentifier?: StringFilter<"PropertyUnit"> | string
    unitType?: StringFilter<"PropertyUnit"> | string
    floorLevel?: IntFilter<"PropertyUnit"> | number
    createdAt?: DateTimeFilter<"PropertyUnit"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type PropertyUnitOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitIdentifier?: SortOrder
    unitType?: SortOrder
    floorLevel?: SortOrder
    createdAt?: SortOrder
    _count?: PropertyUnitCountOrderByAggregateInput
    _avg?: PropertyUnitAvgOrderByAggregateInput
    _max?: PropertyUnitMaxOrderByAggregateInput
    _min?: PropertyUnitMinOrderByAggregateInput
    _sum?: PropertyUnitSumOrderByAggregateInput
  }

  export type PropertyUnitScalarWhereWithAggregatesInput = {
    AND?: PropertyUnitScalarWhereWithAggregatesInput | PropertyUnitScalarWhereWithAggregatesInput[]
    OR?: PropertyUnitScalarWhereWithAggregatesInput[]
    NOT?: PropertyUnitScalarWhereWithAggregatesInput | PropertyUnitScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyUnit"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyUnit"> | string
    unitIdentifier?: StringWithAggregatesFilter<"PropertyUnit"> | string
    unitType?: StringWithAggregatesFilter<"PropertyUnit"> | string
    floorLevel?: IntWithAggregatesFilter<"PropertyUnit"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PropertyUnit"> | Date | string
  }

  export type PropertyPhotoWhereInput = {
    AND?: PropertyPhotoWhereInput | PropertyPhotoWhereInput[]
    OR?: PropertyPhotoWhereInput[]
    NOT?: PropertyPhotoWhereInput | PropertyPhotoWhereInput[]
    id?: UuidFilter<"PropertyPhoto"> | string
    propertyId?: UuidFilter<"PropertyPhoto"> | string
    photoType?: StringFilter<"PropertyPhoto"> | string
    mediaUrl?: StringFilter<"PropertyPhoto"> | string
    capturedAt?: DateTimeFilter<"PropertyPhoto"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type PropertyPhotoOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    photoType?: SortOrder
    mediaUrl?: SortOrder
    capturedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PropertyPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyPhotoWhereInput | PropertyPhotoWhereInput[]
    OR?: PropertyPhotoWhereInput[]
    NOT?: PropertyPhotoWhereInput | PropertyPhotoWhereInput[]
    propertyId?: UuidFilter<"PropertyPhoto"> | string
    photoType?: StringFilter<"PropertyPhoto"> | string
    mediaUrl?: StringFilter<"PropertyPhoto"> | string
    capturedAt?: DateTimeFilter<"PropertyPhoto"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type PropertyPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    photoType?: SortOrder
    mediaUrl?: SortOrder
    capturedAt?: SortOrder
    _count?: PropertyPhotoCountOrderByAggregateInput
    _max?: PropertyPhotoMaxOrderByAggregateInput
    _min?: PropertyPhotoMinOrderByAggregateInput
  }

  export type PropertyPhotoScalarWhereWithAggregatesInput = {
    AND?: PropertyPhotoScalarWhereWithAggregatesInput | PropertyPhotoScalarWhereWithAggregatesInput[]
    OR?: PropertyPhotoScalarWhereWithAggregatesInput[]
    NOT?: PropertyPhotoScalarWhereWithAggregatesInput | PropertyPhotoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyPhoto"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyPhoto"> | string
    photoType?: StringWithAggregatesFilter<"PropertyPhoto"> | string
    mediaUrl?: StringWithAggregatesFilter<"PropertyPhoto"> | string
    capturedAt?: DateTimeWithAggregatesFilter<"PropertyPhoto"> | Date | string
  }

  export type ValuationListWhereInput = {
    AND?: ValuationListWhereInput | ValuationListWhereInput[]
    OR?: ValuationListWhereInput[]
    NOT?: ValuationListWhereInput | ValuationListWhereInput[]
    id?: UuidFilter<"ValuationList"> | string
    name?: StringFilter<"ValuationList"> | string
    effectiveDate?: DateTimeFilter<"ValuationList"> | Date | string
    status?: StringFilter<"ValuationList"> | string
    createdAt?: DateTimeFilter<"ValuationList"> | Date | string
    valuations?: PropertyValuationListRelationFilter
  }

  export type ValuationListOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    valuations?: PropertyValuationOrderByRelationAggregateInput
  }

  export type ValuationListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ValuationListWhereInput | ValuationListWhereInput[]
    OR?: ValuationListWhereInput[]
    NOT?: ValuationListWhereInput | ValuationListWhereInput[]
    name?: StringFilter<"ValuationList"> | string
    effectiveDate?: DateTimeFilter<"ValuationList"> | Date | string
    status?: StringFilter<"ValuationList"> | string
    createdAt?: DateTimeFilter<"ValuationList"> | Date | string
    valuations?: PropertyValuationListRelationFilter
  }, "id">

  export type ValuationListOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ValuationListCountOrderByAggregateInput
    _max?: ValuationListMaxOrderByAggregateInput
    _min?: ValuationListMinOrderByAggregateInput
  }

  export type ValuationListScalarWhereWithAggregatesInput = {
    AND?: ValuationListScalarWhereWithAggregatesInput | ValuationListScalarWhereWithAggregatesInput[]
    OR?: ValuationListScalarWhereWithAggregatesInput[]
    NOT?: ValuationListScalarWhereWithAggregatesInput | ValuationListScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ValuationList"> | string
    name?: StringWithAggregatesFilter<"ValuationList"> | string
    effectiveDate?: DateTimeWithAggregatesFilter<"ValuationList"> | Date | string
    status?: StringWithAggregatesFilter<"ValuationList"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ValuationList"> | Date | string
  }

  export type PropertyValuationWhereInput = {
    AND?: PropertyValuationWhereInput | PropertyValuationWhereInput[]
    OR?: PropertyValuationWhereInput[]
    NOT?: PropertyValuationWhereInput | PropertyValuationWhereInput[]
    id?: UuidFilter<"PropertyValuation"> | string
    propertyId?: UuidFilter<"PropertyValuation"> | string
    valuationListId?: UuidFilter<"PropertyValuation"> | string
    rateableValue?: DecimalFilter<"PropertyValuation"> | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFilter<"PropertyValuation"> | boolean
    lvdReference?: StringFilter<"PropertyValuation"> | string
    effectiveDate?: DateTimeFilter<"PropertyValuation"> | Date | string
    createdAt?: DateTimeFilter<"PropertyValuation"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    valuationList?: XOR<ValuationListScalarRelationFilter, ValuationListWhereInput>
  }

  export type PropertyValuationOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    valuationListId?: SortOrder
    rateableValue?: SortOrder
    isCurrent?: SortOrder
    lvdReference?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
    valuationList?: ValuationListOrderByWithRelationInput
  }

  export type PropertyValuationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId_valuationListId?: PropertyValuationPropertyIdValuationListIdCompoundUniqueInput
    AND?: PropertyValuationWhereInput | PropertyValuationWhereInput[]
    OR?: PropertyValuationWhereInput[]
    NOT?: PropertyValuationWhereInput | PropertyValuationWhereInput[]
    propertyId?: UuidFilter<"PropertyValuation"> | string
    valuationListId?: UuidFilter<"PropertyValuation"> | string
    rateableValue?: DecimalFilter<"PropertyValuation"> | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFilter<"PropertyValuation"> | boolean
    lvdReference?: StringFilter<"PropertyValuation"> | string
    effectiveDate?: DateTimeFilter<"PropertyValuation"> | Date | string
    createdAt?: DateTimeFilter<"PropertyValuation"> | Date | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    valuationList?: XOR<ValuationListScalarRelationFilter, ValuationListWhereInput>
  }, "id" | "propertyId_valuationListId">

  export type PropertyValuationOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    valuationListId?: SortOrder
    rateableValue?: SortOrder
    isCurrent?: SortOrder
    lvdReference?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
    _count?: PropertyValuationCountOrderByAggregateInput
    _avg?: PropertyValuationAvgOrderByAggregateInput
    _max?: PropertyValuationMaxOrderByAggregateInput
    _min?: PropertyValuationMinOrderByAggregateInput
    _sum?: PropertyValuationSumOrderByAggregateInput
  }

  export type PropertyValuationScalarWhereWithAggregatesInput = {
    AND?: PropertyValuationScalarWhereWithAggregatesInput | PropertyValuationScalarWhereWithAggregatesInput[]
    OR?: PropertyValuationScalarWhereWithAggregatesInput[]
    NOT?: PropertyValuationScalarWhereWithAggregatesInput | PropertyValuationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyValuation"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyValuation"> | string
    valuationListId?: UuidWithAggregatesFilter<"PropertyValuation"> | string
    rateableValue?: DecimalWithAggregatesFilter<"PropertyValuation"> | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolWithAggregatesFilter<"PropertyValuation"> | boolean
    lvdReference?: StringWithAggregatesFilter<"PropertyValuation"> | string
    effectiveDate?: DateTimeWithAggregatesFilter<"PropertyValuation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PropertyValuation"> | Date | string
  }

  export type PropertyVerificationWhereInput = {
    AND?: PropertyVerificationWhereInput | PropertyVerificationWhereInput[]
    OR?: PropertyVerificationWhereInput[]
    NOT?: PropertyVerificationWhereInput | PropertyVerificationWhereInput[]
    id?: UuidFilter<"PropertyVerification"> | string
    propertyId?: UuidFilter<"PropertyVerification"> | string
    verifiedByPersonnelId?: UuidFilter<"PropertyVerification"> | string
    verifierLatitude?: FloatFilter<"PropertyVerification"> | number
    verifierLongitude?: FloatFilter<"PropertyVerification"> | number
    isWithinPolygon?: BoolFilter<"PropertyVerification"> | boolean
    verifiedSnapshot?: JsonFilter<"PropertyVerification">
    capturedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    receivedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    outcome?: StringFilter<"PropertyVerification"> | string
    notes?: StringNullableFilter<"PropertyVerification"> | string | null
    reviewStatus?: StringFilter<"PropertyVerification"> | string
    reviewedByPersonnelId?: UuidNullableFilter<"PropertyVerification"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PropertyVerification"> | Date | string | null
    reviewNotes?: StringNullableFilter<"PropertyVerification"> | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }

  export type PropertyVerificationOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    verifiedByPersonnelId?: SortOrder
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
    isWithinPolygon?: SortOrder
    verifiedSnapshot?: SortOrder
    capturedAt?: SortOrder
    receivedAt?: SortOrder
    outcome?: SortOrder
    notes?: SortOrderInput | SortOrder
    reviewStatus?: SortOrder
    reviewedByPersonnelId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PropertyVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyVerificationWhereInput | PropertyVerificationWhereInput[]
    OR?: PropertyVerificationWhereInput[]
    NOT?: PropertyVerificationWhereInput | PropertyVerificationWhereInput[]
    propertyId?: UuidFilter<"PropertyVerification"> | string
    verifiedByPersonnelId?: UuidFilter<"PropertyVerification"> | string
    verifierLatitude?: FloatFilter<"PropertyVerification"> | number
    verifierLongitude?: FloatFilter<"PropertyVerification"> | number
    isWithinPolygon?: BoolFilter<"PropertyVerification"> | boolean
    verifiedSnapshot?: JsonFilter<"PropertyVerification">
    capturedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    receivedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    outcome?: StringFilter<"PropertyVerification"> | string
    notes?: StringNullableFilter<"PropertyVerification"> | string | null
    reviewStatus?: StringFilter<"PropertyVerification"> | string
    reviewedByPersonnelId?: UuidNullableFilter<"PropertyVerification"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PropertyVerification"> | Date | string | null
    reviewNotes?: StringNullableFilter<"PropertyVerification"> | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
  }, "id">

  export type PropertyVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    verifiedByPersonnelId?: SortOrder
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
    isWithinPolygon?: SortOrder
    verifiedSnapshot?: SortOrder
    capturedAt?: SortOrder
    receivedAt?: SortOrder
    outcome?: SortOrder
    notes?: SortOrderInput | SortOrder
    reviewStatus?: SortOrder
    reviewedByPersonnelId?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    _count?: PropertyVerificationCountOrderByAggregateInput
    _avg?: PropertyVerificationAvgOrderByAggregateInput
    _max?: PropertyVerificationMaxOrderByAggregateInput
    _min?: PropertyVerificationMinOrderByAggregateInput
    _sum?: PropertyVerificationSumOrderByAggregateInput
  }

  export type PropertyVerificationScalarWhereWithAggregatesInput = {
    AND?: PropertyVerificationScalarWhereWithAggregatesInput | PropertyVerificationScalarWhereWithAggregatesInput[]
    OR?: PropertyVerificationScalarWhereWithAggregatesInput[]
    NOT?: PropertyVerificationScalarWhereWithAggregatesInput | PropertyVerificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyVerification"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyVerification"> | string
    verifiedByPersonnelId?: UuidWithAggregatesFilter<"PropertyVerification"> | string
    verifierLatitude?: FloatWithAggregatesFilter<"PropertyVerification"> | number
    verifierLongitude?: FloatWithAggregatesFilter<"PropertyVerification"> | number
    isWithinPolygon?: BoolWithAggregatesFilter<"PropertyVerification"> | boolean
    verifiedSnapshot?: JsonWithAggregatesFilter<"PropertyVerification">
    capturedAt?: DateTimeWithAggregatesFilter<"PropertyVerification"> | Date | string
    receivedAt?: DateTimeWithAggregatesFilter<"PropertyVerification"> | Date | string
    outcome?: StringWithAggregatesFilter<"PropertyVerification"> | string
    notes?: StringNullableWithAggregatesFilter<"PropertyVerification"> | string | null
    reviewStatus?: StringWithAggregatesFilter<"PropertyVerification"> | string
    reviewedByPersonnelId?: UuidNullableWithAggregatesFilter<"PropertyVerification"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"PropertyVerification"> | Date | string | null
    reviewNotes?: StringNullableWithAggregatesFilter<"PropertyVerification"> | string | null
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

  export type PropertyCreateInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentTypeCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: Date | string
  }

  export type PropertyDocumentTypeUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: Date | string
  }

  export type PropertyDocumentTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimaryOwnershipProof?: BoolFieldUpdateOperationsInput | boolean
    requiredForRatepayerRegistration?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimaryOwnershipProof?: BoolFieldUpdateOperationsInput | boolean
    requiredForRatepayerRegistration?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentTypeCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isPrimaryOwnershipProof?: boolean
    requiredForRatepayerRegistration?: boolean
    createdAt?: Date | string
  }

  export type PropertyDocumentTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimaryOwnershipProof?: BoolFieldUpdateOperationsInput | boolean
    requiredForRatepayerRegistration?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimaryOwnershipProof?: BoolFieldUpdateOperationsInput | boolean
    requiredForRatepayerRegistration?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentCreateInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutDocumentsInput
  }

  export type PropertyDocumentUncheckedCreateInput = {
    id?: string
    propertyId: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type PropertyDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentCreateManyInput = {
    id?: string
    propertyId: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUnitCreateInput = {
    id?: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutUnitsInput
  }

  export type PropertyUnitUncheckedCreateInput = {
    id?: string
    propertyId: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
  }

  export type PropertyUnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutUnitsNestedInput
  }

  export type PropertyUnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUnitCreateManyInput = {
    id?: string
    propertyId: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
  }

  export type PropertyUnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoCreateInput = {
    id?: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
    property: PropertyCreateNestedOneWithoutPhotosInput
  }

  export type PropertyPhotoUncheckedCreateInput = {
    id?: string
    propertyId: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
  }

  export type PropertyPhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type PropertyPhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoCreateManyInput = {
    id?: string
    propertyId: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
  }

  export type PropertyPhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValuationListCreateInput = {
    id?: string
    name: string
    effectiveDate: Date | string
    status?: string
    createdAt?: Date | string
    valuations?: PropertyValuationCreateNestedManyWithoutValuationListInput
  }

  export type ValuationListUncheckedCreateInput = {
    id?: string
    name: string
    effectiveDate: Date | string
    status?: string
    createdAt?: Date | string
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutValuationListInput
  }

  export type ValuationListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valuations?: PropertyValuationUpdateManyWithoutValuationListNestedInput
  }

  export type ValuationListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valuations?: PropertyValuationUncheckedUpdateManyWithoutValuationListNestedInput
  }

  export type ValuationListCreateManyInput = {
    id?: string
    name: string
    effectiveDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ValuationListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValuationListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationCreateInput = {
    id?: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutValuationsInput
    valuationList: ValuationListCreateNestedOneWithoutValuationsInput
  }

  export type PropertyValuationUncheckedCreateInput = {
    id?: string
    propertyId: string
    valuationListId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyValuationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutValuationsNestedInput
    valuationList?: ValuationListUpdateOneRequiredWithoutValuationsNestedInput
  }

  export type PropertyValuationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    valuationListId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationCreateManyInput = {
    id?: string
    propertyId: string
    valuationListId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyValuationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    valuationListId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyVerificationCreateInput = {
    id?: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
    property: PropertyCreateNestedOneWithoutVerificationsInput
  }

  export type PropertyVerificationUncheckedCreateInput = {
    id?: string
    propertyId: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
  }

  export type PropertyVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutVerificationsNestedInput
  }

  export type PropertyVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PropertyVerificationCreateManyInput = {
    id?: string
    propertyId: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
  }

  export type PropertyVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PropertyVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type PropertyUnitListRelationFilter = {
    every?: PropertyUnitWhereInput
    some?: PropertyUnitWhereInput
    none?: PropertyUnitWhereInput
  }

  export type PropertyPhotoListRelationFilter = {
    every?: PropertyPhotoWhereInput
    some?: PropertyPhotoWhereInput
    none?: PropertyPhotoWhereInput
  }

  export type PropertyDocumentListRelationFilter = {
    every?: PropertyDocumentWhereInput
    some?: PropertyDocumentWhereInput
    none?: PropertyDocumentWhereInput
  }

  export type PropertyValuationListRelationFilter = {
    every?: PropertyValuationWhereInput
    some?: PropertyValuationWhereInput
    none?: PropertyValuationWhereInput
  }

  export type PropertyVerificationListRelationFilter = {
    every?: PropertyVerificationWhereInput
    some?: PropertyVerificationWhereInput
    none?: PropertyVerificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertyUnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyValuationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    accountNumber?: SortOrder
    propertyName?: SortOrder
    assemblyId?: SortOrder
    propertyClass?: SortOrder
    buildingStatus?: SortOrder
    propertyStatus?: SortOrder
    propertyUse?: SortOrder
    tenureType?: SortOrder
    structureType?: SortOrder
    createdByRatepayerId?: SortOrder
    registrationSource?: SortOrder
    registeredByConcessionId?: SortOrder
    claimedByRatepayerId?: SortOrder
    verificationStatus?: SortOrder
    polygonGeoJson?: SortOrder
    leaseDurationYears?: SortOrder
    landAreaSqm?: SortOrder
    numberOfFloors?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    leaseDurationYears?: SortOrder
    landAreaSqm?: SortOrder
    numberOfFloors?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    accountNumber?: SortOrder
    propertyName?: SortOrder
    assemblyId?: SortOrder
    propertyClass?: SortOrder
    buildingStatus?: SortOrder
    propertyStatus?: SortOrder
    propertyUse?: SortOrder
    tenureType?: SortOrder
    structureType?: SortOrder
    createdByRatepayerId?: SortOrder
    registrationSource?: SortOrder
    registeredByConcessionId?: SortOrder
    claimedByRatepayerId?: SortOrder
    verificationStatus?: SortOrder
    leaseDurationYears?: SortOrder
    landAreaSqm?: SortOrder
    numberOfFloors?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    accountNumber?: SortOrder
    propertyName?: SortOrder
    assemblyId?: SortOrder
    propertyClass?: SortOrder
    buildingStatus?: SortOrder
    propertyStatus?: SortOrder
    propertyUse?: SortOrder
    tenureType?: SortOrder
    structureType?: SortOrder
    createdByRatepayerId?: SortOrder
    registrationSource?: SortOrder
    registeredByConcessionId?: SortOrder
    claimedByRatepayerId?: SortOrder
    verificationStatus?: SortOrder
    leaseDurationYears?: SortOrder
    landAreaSqm?: SortOrder
    numberOfFloors?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    leaseDurationYears?: SortOrder
    landAreaSqm?: SortOrder
    numberOfFloors?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PropertyDocumentTypeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPrimaryOwnershipProof?: SortOrder
    requiredForRatepayerRegistration?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyDocumentTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPrimaryOwnershipProof?: SortOrder
    requiredForRatepayerRegistration?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyDocumentTypeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPrimaryOwnershipProof?: SortOrder
    requiredForRatepayerRegistration?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type PropertyDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    issueDate?: SortOrder
    mediaUrl?: SortOrder
    fileSizeBytes?: SortOrder
    mimeType?: SortOrder
    uploadedByActorType?: SortOrder
    uploadedByActorId?: SortOrder
    ratepayerId?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedByActorId?: SortOrder
    rejectionReason?: SortOrder
    isCapturedOnPremises?: SortOrder
    premisesLatitude?: SortOrder
    premisesLongitude?: SortOrder
    premisesGpsAccuracy?: SortOrder
    deviceId?: SortOrder
    staffRef?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyDocumentAvgOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
    premisesLatitude?: SortOrder
    premisesLongitude?: SortOrder
    premisesGpsAccuracy?: SortOrder
  }

  export type PropertyDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    issueDate?: SortOrder
    mediaUrl?: SortOrder
    fileSizeBytes?: SortOrder
    mimeType?: SortOrder
    uploadedByActorType?: SortOrder
    uploadedByActorId?: SortOrder
    ratepayerId?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedByActorId?: SortOrder
    rejectionReason?: SortOrder
    isCapturedOnPremises?: SortOrder
    premisesLatitude?: SortOrder
    premisesLongitude?: SortOrder
    premisesGpsAccuracy?: SortOrder
    deviceId?: SortOrder
    staffRef?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    issuingAuthority?: SortOrder
    issueDate?: SortOrder
    mediaUrl?: SortOrder
    fileSizeBytes?: SortOrder
    mimeType?: SortOrder
    uploadedByActorType?: SortOrder
    uploadedByActorId?: SortOrder
    ratepayerId?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedByActorId?: SortOrder
    rejectionReason?: SortOrder
    isCapturedOnPremises?: SortOrder
    premisesLatitude?: SortOrder
    premisesLongitude?: SortOrder
    premisesGpsAccuracy?: SortOrder
    deviceId?: SortOrder
    staffRef?: SortOrder
    capturedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyDocumentSumOrderByAggregateInput = {
    fileSizeBytes?: SortOrder
    premisesLatitude?: SortOrder
    premisesLongitude?: SortOrder
    premisesGpsAccuracy?: SortOrder
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

  export type PropertyUnitCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitIdentifier?: SortOrder
    unitType?: SortOrder
    floorLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyUnitAvgOrderByAggregateInput = {
    floorLevel?: SortOrder
  }

  export type PropertyUnitMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitIdentifier?: SortOrder
    unitType?: SortOrder
    floorLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyUnitMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    unitIdentifier?: SortOrder
    unitType?: SortOrder
    floorLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyUnitSumOrderByAggregateInput = {
    floorLevel?: SortOrder
  }

  export type PropertyPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    photoType?: SortOrder
    mediaUrl?: SortOrder
    capturedAt?: SortOrder
  }

  export type PropertyPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    photoType?: SortOrder
    mediaUrl?: SortOrder
    capturedAt?: SortOrder
  }

  export type PropertyPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    photoType?: SortOrder
    mediaUrl?: SortOrder
    capturedAt?: SortOrder
  }

  export type ValuationListCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ValuationListMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ValuationListMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    effectiveDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type ValuationListScalarRelationFilter = {
    is?: ValuationListWhereInput
    isNot?: ValuationListWhereInput
  }

  export type PropertyValuationPropertyIdValuationListIdCompoundUniqueInput = {
    propertyId: string
    valuationListId: string
  }

  export type PropertyValuationCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    valuationListId?: SortOrder
    rateableValue?: SortOrder
    isCurrent?: SortOrder
    lvdReference?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyValuationAvgOrderByAggregateInput = {
    rateableValue?: SortOrder
  }

  export type PropertyValuationMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    valuationListId?: SortOrder
    rateableValue?: SortOrder
    isCurrent?: SortOrder
    lvdReference?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyValuationMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    valuationListId?: SortOrder
    rateableValue?: SortOrder
    isCurrent?: SortOrder
    lvdReference?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyValuationSumOrderByAggregateInput = {
    rateableValue?: SortOrder
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PropertyVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    verifiedByPersonnelId?: SortOrder
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
    isWithinPolygon?: SortOrder
    verifiedSnapshot?: SortOrder
    capturedAt?: SortOrder
    receivedAt?: SortOrder
    outcome?: SortOrder
    notes?: SortOrder
    reviewStatus?: SortOrder
    reviewedByPersonnelId?: SortOrder
    reviewedAt?: SortOrder
    reviewNotes?: SortOrder
  }

  export type PropertyVerificationAvgOrderByAggregateInput = {
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
  }

  export type PropertyVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    verifiedByPersonnelId?: SortOrder
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
    isWithinPolygon?: SortOrder
    capturedAt?: SortOrder
    receivedAt?: SortOrder
    outcome?: SortOrder
    notes?: SortOrder
    reviewStatus?: SortOrder
    reviewedByPersonnelId?: SortOrder
    reviewedAt?: SortOrder
    reviewNotes?: SortOrder
  }

  export type PropertyVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    verifiedByPersonnelId?: SortOrder
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
    isWithinPolygon?: SortOrder
    capturedAt?: SortOrder
    receivedAt?: SortOrder
    outcome?: SortOrder
    notes?: SortOrder
    reviewStatus?: SortOrder
    reviewedByPersonnelId?: SortOrder
    reviewedAt?: SortOrder
    reviewNotes?: SortOrder
  }

  export type PropertyVerificationSumOrderByAggregateInput = {
    verifierLatitude?: SortOrder
    verifierLongitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type PropertyUnitCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput> | PropertyUnitCreateWithoutPropertyInput[] | PropertyUnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyUnitCreateOrConnectWithoutPropertyInput | PropertyUnitCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyUnitCreateManyPropertyInputEnvelope
    connect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
  }

  export type PropertyPhotoCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput> | PropertyPhotoCreateWithoutPropertyInput[] | PropertyPhotoUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyPhotoCreateOrConnectWithoutPropertyInput | PropertyPhotoCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyPhotoCreateManyPropertyInputEnvelope
    connect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
  }

  export type PropertyDocumentCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput> | PropertyDocumentCreateWithoutPropertyInput[] | PropertyDocumentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyDocumentCreateOrConnectWithoutPropertyInput | PropertyDocumentCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyDocumentCreateManyPropertyInputEnvelope
    connect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
  }

  export type PropertyValuationCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput> | PropertyValuationCreateWithoutPropertyInput[] | PropertyValuationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutPropertyInput | PropertyValuationCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyValuationCreateManyPropertyInputEnvelope
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
  }

  export type PropertyVerificationCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput> | PropertyVerificationCreateWithoutPropertyInput[] | PropertyVerificationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyVerificationCreateOrConnectWithoutPropertyInput | PropertyVerificationCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyVerificationCreateManyPropertyInputEnvelope
    connect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
  }

  export type PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput> | PropertyUnitCreateWithoutPropertyInput[] | PropertyUnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyUnitCreateOrConnectWithoutPropertyInput | PropertyUnitCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyUnitCreateManyPropertyInputEnvelope
    connect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
  }

  export type PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput> | PropertyPhotoCreateWithoutPropertyInput[] | PropertyPhotoUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyPhotoCreateOrConnectWithoutPropertyInput | PropertyPhotoCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyPhotoCreateManyPropertyInputEnvelope
    connect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
  }

  export type PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput> | PropertyDocumentCreateWithoutPropertyInput[] | PropertyDocumentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyDocumentCreateOrConnectWithoutPropertyInput | PropertyDocumentCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyDocumentCreateManyPropertyInputEnvelope
    connect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
  }

  export type PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput> | PropertyValuationCreateWithoutPropertyInput[] | PropertyValuationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutPropertyInput | PropertyValuationCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyValuationCreateManyPropertyInputEnvelope
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
  }

  export type PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput> | PropertyVerificationCreateWithoutPropertyInput[] | PropertyVerificationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyVerificationCreateOrConnectWithoutPropertyInput | PropertyVerificationCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyVerificationCreateManyPropertyInputEnvelope
    connect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PropertyUnitUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput> | PropertyUnitCreateWithoutPropertyInput[] | PropertyUnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyUnitCreateOrConnectWithoutPropertyInput | PropertyUnitCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyUnitUpsertWithWhereUniqueWithoutPropertyInput | PropertyUnitUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyUnitCreateManyPropertyInputEnvelope
    set?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    disconnect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    delete?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    connect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    update?: PropertyUnitUpdateWithWhereUniqueWithoutPropertyInput | PropertyUnitUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyUnitUpdateManyWithWhereWithoutPropertyInput | PropertyUnitUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyUnitScalarWhereInput | PropertyUnitScalarWhereInput[]
  }

  export type PropertyPhotoUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput> | PropertyPhotoCreateWithoutPropertyInput[] | PropertyPhotoUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyPhotoCreateOrConnectWithoutPropertyInput | PropertyPhotoCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyPhotoUpsertWithWhereUniqueWithoutPropertyInput | PropertyPhotoUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyPhotoCreateManyPropertyInputEnvelope
    set?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    disconnect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    delete?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    connect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    update?: PropertyPhotoUpdateWithWhereUniqueWithoutPropertyInput | PropertyPhotoUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyPhotoUpdateManyWithWhereWithoutPropertyInput | PropertyPhotoUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyPhotoScalarWhereInput | PropertyPhotoScalarWhereInput[]
  }

  export type PropertyDocumentUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput> | PropertyDocumentCreateWithoutPropertyInput[] | PropertyDocumentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyDocumentCreateOrConnectWithoutPropertyInput | PropertyDocumentCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyDocumentUpsertWithWhereUniqueWithoutPropertyInput | PropertyDocumentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyDocumentCreateManyPropertyInputEnvelope
    set?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    disconnect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    delete?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    connect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    update?: PropertyDocumentUpdateWithWhereUniqueWithoutPropertyInput | PropertyDocumentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyDocumentUpdateManyWithWhereWithoutPropertyInput | PropertyDocumentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyDocumentScalarWhereInput | PropertyDocumentScalarWhereInput[]
  }

  export type PropertyValuationUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput> | PropertyValuationCreateWithoutPropertyInput[] | PropertyValuationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutPropertyInput | PropertyValuationCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyValuationUpsertWithWhereUniqueWithoutPropertyInput | PropertyValuationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyValuationCreateManyPropertyInputEnvelope
    set?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    disconnect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    delete?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    update?: PropertyValuationUpdateWithWhereUniqueWithoutPropertyInput | PropertyValuationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyValuationUpdateManyWithWhereWithoutPropertyInput | PropertyValuationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
  }

  export type PropertyVerificationUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput> | PropertyVerificationCreateWithoutPropertyInput[] | PropertyVerificationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyVerificationCreateOrConnectWithoutPropertyInput | PropertyVerificationCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyVerificationUpsertWithWhereUniqueWithoutPropertyInput | PropertyVerificationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyVerificationCreateManyPropertyInputEnvelope
    set?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    disconnect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    delete?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    connect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    update?: PropertyVerificationUpdateWithWhereUniqueWithoutPropertyInput | PropertyVerificationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyVerificationUpdateManyWithWhereWithoutPropertyInput | PropertyVerificationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyVerificationScalarWhereInput | PropertyVerificationScalarWhereInput[]
  }

  export type PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput> | PropertyUnitCreateWithoutPropertyInput[] | PropertyUnitUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyUnitCreateOrConnectWithoutPropertyInput | PropertyUnitCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyUnitUpsertWithWhereUniqueWithoutPropertyInput | PropertyUnitUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyUnitCreateManyPropertyInputEnvelope
    set?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    disconnect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    delete?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    connect?: PropertyUnitWhereUniqueInput | PropertyUnitWhereUniqueInput[]
    update?: PropertyUnitUpdateWithWhereUniqueWithoutPropertyInput | PropertyUnitUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyUnitUpdateManyWithWhereWithoutPropertyInput | PropertyUnitUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyUnitScalarWhereInput | PropertyUnitScalarWhereInput[]
  }

  export type PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput> | PropertyPhotoCreateWithoutPropertyInput[] | PropertyPhotoUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyPhotoCreateOrConnectWithoutPropertyInput | PropertyPhotoCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyPhotoUpsertWithWhereUniqueWithoutPropertyInput | PropertyPhotoUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyPhotoCreateManyPropertyInputEnvelope
    set?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    disconnect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    delete?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    connect?: PropertyPhotoWhereUniqueInput | PropertyPhotoWhereUniqueInput[]
    update?: PropertyPhotoUpdateWithWhereUniqueWithoutPropertyInput | PropertyPhotoUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyPhotoUpdateManyWithWhereWithoutPropertyInput | PropertyPhotoUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyPhotoScalarWhereInput | PropertyPhotoScalarWhereInput[]
  }

  export type PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput> | PropertyDocumentCreateWithoutPropertyInput[] | PropertyDocumentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyDocumentCreateOrConnectWithoutPropertyInput | PropertyDocumentCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyDocumentUpsertWithWhereUniqueWithoutPropertyInput | PropertyDocumentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyDocumentCreateManyPropertyInputEnvelope
    set?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    disconnect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    delete?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    connect?: PropertyDocumentWhereUniqueInput | PropertyDocumentWhereUniqueInput[]
    update?: PropertyDocumentUpdateWithWhereUniqueWithoutPropertyInput | PropertyDocumentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyDocumentUpdateManyWithWhereWithoutPropertyInput | PropertyDocumentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyDocumentScalarWhereInput | PropertyDocumentScalarWhereInput[]
  }

  export type PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput> | PropertyValuationCreateWithoutPropertyInput[] | PropertyValuationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutPropertyInput | PropertyValuationCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyValuationUpsertWithWhereUniqueWithoutPropertyInput | PropertyValuationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyValuationCreateManyPropertyInputEnvelope
    set?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    disconnect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    delete?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    update?: PropertyValuationUpdateWithWhereUniqueWithoutPropertyInput | PropertyValuationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyValuationUpdateManyWithWhereWithoutPropertyInput | PropertyValuationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
  }

  export type PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput> | PropertyVerificationCreateWithoutPropertyInput[] | PropertyVerificationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyVerificationCreateOrConnectWithoutPropertyInput | PropertyVerificationCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyVerificationUpsertWithWhereUniqueWithoutPropertyInput | PropertyVerificationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyVerificationCreateManyPropertyInputEnvelope
    set?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    disconnect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    delete?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    connect?: PropertyVerificationWhereUniqueInput | PropertyVerificationWhereUniqueInput[]
    update?: PropertyVerificationUpdateWithWhereUniqueWithoutPropertyInput | PropertyVerificationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyVerificationUpdateManyWithWhereWithoutPropertyInput | PropertyVerificationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyVerificationScalarWhereInput | PropertyVerificationScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PropertyCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<PropertyCreateWithoutDocumentsInput, PropertyUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutDocumentsInput
    connect?: PropertyWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PropertyUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<PropertyCreateWithoutDocumentsInput, PropertyUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutDocumentsInput
    upsert?: PropertyUpsertWithoutDocumentsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutDocumentsInput, PropertyUpdateWithoutDocumentsInput>, PropertyUncheckedUpdateWithoutDocumentsInput>
  }

  export type PropertyCreateNestedOneWithoutUnitsInput = {
    create?: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitsInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutUnitsNestedInput = {
    create?: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutUnitsInput
    upsert?: PropertyUpsertWithoutUnitsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutUnitsInput, PropertyUpdateWithoutUnitsInput>, PropertyUncheckedUpdateWithoutUnitsInput>
  }

  export type PropertyCreateNestedOneWithoutPhotosInput = {
    create?: XOR<PropertyCreateWithoutPhotosInput, PropertyUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPhotosInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<PropertyCreateWithoutPhotosInput, PropertyUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPhotosInput
    upsert?: PropertyUpsertWithoutPhotosInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutPhotosInput, PropertyUpdateWithoutPhotosInput>, PropertyUncheckedUpdateWithoutPhotosInput>
  }

  export type PropertyValuationCreateNestedManyWithoutValuationListInput = {
    create?: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput> | PropertyValuationCreateWithoutValuationListInput[] | PropertyValuationUncheckedCreateWithoutValuationListInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutValuationListInput | PropertyValuationCreateOrConnectWithoutValuationListInput[]
    createMany?: PropertyValuationCreateManyValuationListInputEnvelope
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
  }

  export type PropertyValuationUncheckedCreateNestedManyWithoutValuationListInput = {
    create?: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput> | PropertyValuationCreateWithoutValuationListInput[] | PropertyValuationUncheckedCreateWithoutValuationListInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutValuationListInput | PropertyValuationCreateOrConnectWithoutValuationListInput[]
    createMany?: PropertyValuationCreateManyValuationListInputEnvelope
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
  }

  export type PropertyValuationUpdateManyWithoutValuationListNestedInput = {
    create?: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput> | PropertyValuationCreateWithoutValuationListInput[] | PropertyValuationUncheckedCreateWithoutValuationListInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutValuationListInput | PropertyValuationCreateOrConnectWithoutValuationListInput[]
    upsert?: PropertyValuationUpsertWithWhereUniqueWithoutValuationListInput | PropertyValuationUpsertWithWhereUniqueWithoutValuationListInput[]
    createMany?: PropertyValuationCreateManyValuationListInputEnvelope
    set?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    disconnect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    delete?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    update?: PropertyValuationUpdateWithWhereUniqueWithoutValuationListInput | PropertyValuationUpdateWithWhereUniqueWithoutValuationListInput[]
    updateMany?: PropertyValuationUpdateManyWithWhereWithoutValuationListInput | PropertyValuationUpdateManyWithWhereWithoutValuationListInput[]
    deleteMany?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
  }

  export type PropertyValuationUncheckedUpdateManyWithoutValuationListNestedInput = {
    create?: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput> | PropertyValuationCreateWithoutValuationListInput[] | PropertyValuationUncheckedCreateWithoutValuationListInput[]
    connectOrCreate?: PropertyValuationCreateOrConnectWithoutValuationListInput | PropertyValuationCreateOrConnectWithoutValuationListInput[]
    upsert?: PropertyValuationUpsertWithWhereUniqueWithoutValuationListInput | PropertyValuationUpsertWithWhereUniqueWithoutValuationListInput[]
    createMany?: PropertyValuationCreateManyValuationListInputEnvelope
    set?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    disconnect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    delete?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    connect?: PropertyValuationWhereUniqueInput | PropertyValuationWhereUniqueInput[]
    update?: PropertyValuationUpdateWithWhereUniqueWithoutValuationListInput | PropertyValuationUpdateWithWhereUniqueWithoutValuationListInput[]
    updateMany?: PropertyValuationUpdateManyWithWhereWithoutValuationListInput | PropertyValuationUpdateManyWithWhereWithoutValuationListInput[]
    deleteMany?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutValuationsInput = {
    create?: XOR<PropertyCreateWithoutValuationsInput, PropertyUncheckedCreateWithoutValuationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutValuationsInput
    connect?: PropertyWhereUniqueInput
  }

  export type ValuationListCreateNestedOneWithoutValuationsInput = {
    create?: XOR<ValuationListCreateWithoutValuationsInput, ValuationListUncheckedCreateWithoutValuationsInput>
    connectOrCreate?: ValuationListCreateOrConnectWithoutValuationsInput
    connect?: ValuationListWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type PropertyUpdateOneRequiredWithoutValuationsNestedInput = {
    create?: XOR<PropertyCreateWithoutValuationsInput, PropertyUncheckedCreateWithoutValuationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutValuationsInput
    upsert?: PropertyUpsertWithoutValuationsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutValuationsInput, PropertyUpdateWithoutValuationsInput>, PropertyUncheckedUpdateWithoutValuationsInput>
  }

  export type ValuationListUpdateOneRequiredWithoutValuationsNestedInput = {
    create?: XOR<ValuationListCreateWithoutValuationsInput, ValuationListUncheckedCreateWithoutValuationsInput>
    connectOrCreate?: ValuationListCreateOrConnectWithoutValuationsInput
    upsert?: ValuationListUpsertWithoutValuationsInput
    connect?: ValuationListWhereUniqueInput
    update?: XOR<XOR<ValuationListUpdateToOneWithWhereWithoutValuationsInput, ValuationListUpdateWithoutValuationsInput>, ValuationListUncheckedUpdateWithoutValuationsInput>
  }

  export type PropertyCreateNestedOneWithoutVerificationsInput = {
    create?: XOR<PropertyCreateWithoutVerificationsInput, PropertyUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutVerificationsInput
    connect?: PropertyWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyUpdateOneRequiredWithoutVerificationsNestedInput = {
    create?: XOR<PropertyCreateWithoutVerificationsInput, PropertyUncheckedCreateWithoutVerificationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutVerificationsInput
    upsert?: PropertyUpsertWithoutVerificationsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutVerificationsInput, PropertyUpdateWithoutVerificationsInput>, PropertyUncheckedUpdateWithoutVerificationsInput>
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type PropertyUnitCreateWithoutPropertyInput = {
    id?: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
  }

  export type PropertyUnitUncheckedCreateWithoutPropertyInput = {
    id?: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
  }

  export type PropertyUnitCreateOrConnectWithoutPropertyInput = {
    where: PropertyUnitWhereUniqueInput
    create: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyUnitCreateManyPropertyInputEnvelope = {
    data: PropertyUnitCreateManyPropertyInput | PropertyUnitCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyPhotoCreateWithoutPropertyInput = {
    id?: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
  }

  export type PropertyPhotoUncheckedCreateWithoutPropertyInput = {
    id?: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
  }

  export type PropertyPhotoCreateOrConnectWithoutPropertyInput = {
    where: PropertyPhotoWhereUniqueInput
    create: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyPhotoCreateManyPropertyInputEnvelope = {
    data: PropertyPhotoCreateManyPropertyInput | PropertyPhotoCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyDocumentCreateWithoutPropertyInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyDocumentUncheckedCreateWithoutPropertyInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyDocumentCreateOrConnectWithoutPropertyInput = {
    where: PropertyDocumentWhereUniqueInput
    create: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyDocumentCreateManyPropertyInputEnvelope = {
    data: PropertyDocumentCreateManyPropertyInput | PropertyDocumentCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyValuationCreateWithoutPropertyInput = {
    id?: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
    valuationList: ValuationListCreateNestedOneWithoutValuationsInput
  }

  export type PropertyValuationUncheckedCreateWithoutPropertyInput = {
    id?: string
    valuationListId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyValuationCreateOrConnectWithoutPropertyInput = {
    where: PropertyValuationWhereUniqueInput
    create: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyValuationCreateManyPropertyInputEnvelope = {
    data: PropertyValuationCreateManyPropertyInput | PropertyValuationCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyVerificationCreateWithoutPropertyInput = {
    id?: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
  }

  export type PropertyVerificationUncheckedCreateWithoutPropertyInput = {
    id?: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
  }

  export type PropertyVerificationCreateOrConnectWithoutPropertyInput = {
    where: PropertyVerificationWhereUniqueInput
    create: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyVerificationCreateManyPropertyInputEnvelope = {
    data: PropertyVerificationCreateManyPropertyInput | PropertyVerificationCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUnitUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyUnitWhereUniqueInput
    update: XOR<PropertyUnitUpdateWithoutPropertyInput, PropertyUnitUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyUnitCreateWithoutPropertyInput, PropertyUnitUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyUnitUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyUnitWhereUniqueInput
    data: XOR<PropertyUnitUpdateWithoutPropertyInput, PropertyUnitUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyUnitUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyUnitScalarWhereInput
    data: XOR<PropertyUnitUpdateManyMutationInput, PropertyUnitUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyUnitScalarWhereInput = {
    AND?: PropertyUnitScalarWhereInput | PropertyUnitScalarWhereInput[]
    OR?: PropertyUnitScalarWhereInput[]
    NOT?: PropertyUnitScalarWhereInput | PropertyUnitScalarWhereInput[]
    id?: UuidFilter<"PropertyUnit"> | string
    propertyId?: UuidFilter<"PropertyUnit"> | string
    unitIdentifier?: StringFilter<"PropertyUnit"> | string
    unitType?: StringFilter<"PropertyUnit"> | string
    floorLevel?: IntFilter<"PropertyUnit"> | number
    createdAt?: DateTimeFilter<"PropertyUnit"> | Date | string
  }

  export type PropertyPhotoUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyPhotoWhereUniqueInput
    update: XOR<PropertyPhotoUpdateWithoutPropertyInput, PropertyPhotoUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyPhotoCreateWithoutPropertyInput, PropertyPhotoUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyPhotoUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyPhotoWhereUniqueInput
    data: XOR<PropertyPhotoUpdateWithoutPropertyInput, PropertyPhotoUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyPhotoUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyPhotoScalarWhereInput
    data: XOR<PropertyPhotoUpdateManyMutationInput, PropertyPhotoUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyPhotoScalarWhereInput = {
    AND?: PropertyPhotoScalarWhereInput | PropertyPhotoScalarWhereInput[]
    OR?: PropertyPhotoScalarWhereInput[]
    NOT?: PropertyPhotoScalarWhereInput | PropertyPhotoScalarWhereInput[]
    id?: UuidFilter<"PropertyPhoto"> | string
    propertyId?: UuidFilter<"PropertyPhoto"> | string
    photoType?: StringFilter<"PropertyPhoto"> | string
    mediaUrl?: StringFilter<"PropertyPhoto"> | string
    capturedAt?: DateTimeFilter<"PropertyPhoto"> | Date | string
  }

  export type PropertyDocumentUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyDocumentWhereUniqueInput
    update: XOR<PropertyDocumentUpdateWithoutPropertyInput, PropertyDocumentUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyDocumentCreateWithoutPropertyInput, PropertyDocumentUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyDocumentUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyDocumentWhereUniqueInput
    data: XOR<PropertyDocumentUpdateWithoutPropertyInput, PropertyDocumentUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyDocumentUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyDocumentScalarWhereInput
    data: XOR<PropertyDocumentUpdateManyMutationInput, PropertyDocumentUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyDocumentScalarWhereInput = {
    AND?: PropertyDocumentScalarWhereInput | PropertyDocumentScalarWhereInput[]
    OR?: PropertyDocumentScalarWhereInput[]
    NOT?: PropertyDocumentScalarWhereInput | PropertyDocumentScalarWhereInput[]
    id?: UuidFilter<"PropertyDocument"> | string
    propertyId?: UuidFilter<"PropertyDocument"> | string
    documentType?: StringFilter<"PropertyDocument"> | string
    documentNumber?: StringNullableFilter<"PropertyDocument"> | string | null
    issuingAuthority?: StringNullableFilter<"PropertyDocument"> | string | null
    issueDate?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    mediaUrl?: StringFilter<"PropertyDocument"> | string
    fileSizeBytes?: IntNullableFilter<"PropertyDocument"> | number | null
    mimeType?: StringNullableFilter<"PropertyDocument"> | string | null
    uploadedByActorType?: StringFilter<"PropertyDocument"> | string
    uploadedByActorId?: StringFilter<"PropertyDocument"> | string
    ratepayerId?: UuidNullableFilter<"PropertyDocument"> | string | null
    verificationStatus?: StringFilter<"PropertyDocument"> | string
    verifiedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    verifiedByActorId?: StringNullableFilter<"PropertyDocument"> | string | null
    rejectionReason?: StringNullableFilter<"PropertyDocument"> | string | null
    isCapturedOnPremises?: BoolFilter<"PropertyDocument"> | boolean
    premisesLatitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesLongitude?: FloatNullableFilter<"PropertyDocument"> | number | null
    premisesGpsAccuracy?: FloatNullableFilter<"PropertyDocument"> | number | null
    deviceId?: StringNullableFilter<"PropertyDocument"> | string | null
    staffRef?: StringNullableFilter<"PropertyDocument"> | string | null
    capturedAt?: DateTimeNullableFilter<"PropertyDocument"> | Date | string | null
    createdAt?: DateTimeFilter<"PropertyDocument"> | Date | string
    updatedAt?: DateTimeFilter<"PropertyDocument"> | Date | string
  }

  export type PropertyValuationUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyValuationWhereUniqueInput
    update: XOR<PropertyValuationUpdateWithoutPropertyInput, PropertyValuationUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyValuationCreateWithoutPropertyInput, PropertyValuationUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyValuationUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyValuationWhereUniqueInput
    data: XOR<PropertyValuationUpdateWithoutPropertyInput, PropertyValuationUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyValuationUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyValuationScalarWhereInput
    data: XOR<PropertyValuationUpdateManyMutationInput, PropertyValuationUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyValuationScalarWhereInput = {
    AND?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
    OR?: PropertyValuationScalarWhereInput[]
    NOT?: PropertyValuationScalarWhereInput | PropertyValuationScalarWhereInput[]
    id?: UuidFilter<"PropertyValuation"> | string
    propertyId?: UuidFilter<"PropertyValuation"> | string
    valuationListId?: UuidFilter<"PropertyValuation"> | string
    rateableValue?: DecimalFilter<"PropertyValuation"> | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFilter<"PropertyValuation"> | boolean
    lvdReference?: StringFilter<"PropertyValuation"> | string
    effectiveDate?: DateTimeFilter<"PropertyValuation"> | Date | string
    createdAt?: DateTimeFilter<"PropertyValuation"> | Date | string
  }

  export type PropertyVerificationUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyVerificationWhereUniqueInput
    update: XOR<PropertyVerificationUpdateWithoutPropertyInput, PropertyVerificationUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyVerificationCreateWithoutPropertyInput, PropertyVerificationUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyVerificationUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyVerificationWhereUniqueInput
    data: XOR<PropertyVerificationUpdateWithoutPropertyInput, PropertyVerificationUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyVerificationUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyVerificationScalarWhereInput
    data: XOR<PropertyVerificationUpdateManyMutationInput, PropertyVerificationUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyVerificationScalarWhereInput = {
    AND?: PropertyVerificationScalarWhereInput | PropertyVerificationScalarWhereInput[]
    OR?: PropertyVerificationScalarWhereInput[]
    NOT?: PropertyVerificationScalarWhereInput | PropertyVerificationScalarWhereInput[]
    id?: UuidFilter<"PropertyVerification"> | string
    propertyId?: UuidFilter<"PropertyVerification"> | string
    verifiedByPersonnelId?: UuidFilter<"PropertyVerification"> | string
    verifierLatitude?: FloatFilter<"PropertyVerification"> | number
    verifierLongitude?: FloatFilter<"PropertyVerification"> | number
    isWithinPolygon?: BoolFilter<"PropertyVerification"> | boolean
    verifiedSnapshot?: JsonFilter<"PropertyVerification">
    capturedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    receivedAt?: DateTimeFilter<"PropertyVerification"> | Date | string
    outcome?: StringFilter<"PropertyVerification"> | string
    notes?: StringNullableFilter<"PropertyVerification"> | string | null
    reviewStatus?: StringFilter<"PropertyVerification"> | string
    reviewedByPersonnelId?: UuidNullableFilter<"PropertyVerification"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PropertyVerification"> | Date | string | null
    reviewNotes?: StringNullableFilter<"PropertyVerification"> | string | null
  }

  export type PropertyCreateWithoutDocumentsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutDocumentsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutDocumentsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutDocumentsInput, PropertyUncheckedCreateWithoutDocumentsInput>
  }

  export type PropertyUpsertWithoutDocumentsInput = {
    update: XOR<PropertyUpdateWithoutDocumentsInput, PropertyUncheckedUpdateWithoutDocumentsInput>
    create: XOR<PropertyCreateWithoutDocumentsInput, PropertyUncheckedCreateWithoutDocumentsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutDocumentsInput, PropertyUncheckedUpdateWithoutDocumentsInput>
  }

  export type PropertyUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutUnitsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: PropertyPhotoCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutUnitsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutUnitsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
  }

  export type PropertyUpsertWithoutUnitsInput = {
    update: XOR<PropertyUpdateWithoutUnitsInput, PropertyUncheckedUpdateWithoutUnitsInput>
    create: XOR<PropertyCreateWithoutUnitsInput, PropertyUncheckedCreateWithoutUnitsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutUnitsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutUnitsInput, PropertyUncheckedUpdateWithoutUnitsInput>
  }

  export type PropertyUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: PropertyPhotoUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutPhotosInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutPhotosInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutPhotosInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutPhotosInput, PropertyUncheckedCreateWithoutPhotosInput>
  }

  export type PropertyUpsertWithoutPhotosInput = {
    update: XOR<PropertyUpdateWithoutPhotosInput, PropertyUncheckedUpdateWithoutPhotosInput>
    create: XOR<PropertyCreateWithoutPhotosInput, PropertyUncheckedCreateWithoutPhotosInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutPhotosInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutPhotosInput, PropertyUncheckedUpdateWithoutPhotosInput>
  }

  export type PropertyUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyValuationCreateWithoutValuationListInput = {
    id?: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutValuationsInput
  }

  export type PropertyValuationUncheckedCreateWithoutValuationListInput = {
    id?: string
    propertyId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyValuationCreateOrConnectWithoutValuationListInput = {
    where: PropertyValuationWhereUniqueInput
    create: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput>
  }

  export type PropertyValuationCreateManyValuationListInputEnvelope = {
    data: PropertyValuationCreateManyValuationListInput | PropertyValuationCreateManyValuationListInput[]
    skipDuplicates?: boolean
  }

  export type PropertyValuationUpsertWithWhereUniqueWithoutValuationListInput = {
    where: PropertyValuationWhereUniqueInput
    update: XOR<PropertyValuationUpdateWithoutValuationListInput, PropertyValuationUncheckedUpdateWithoutValuationListInput>
    create: XOR<PropertyValuationCreateWithoutValuationListInput, PropertyValuationUncheckedCreateWithoutValuationListInput>
  }

  export type PropertyValuationUpdateWithWhereUniqueWithoutValuationListInput = {
    where: PropertyValuationWhereUniqueInput
    data: XOR<PropertyValuationUpdateWithoutValuationListInput, PropertyValuationUncheckedUpdateWithoutValuationListInput>
  }

  export type PropertyValuationUpdateManyWithWhereWithoutValuationListInput = {
    where: PropertyValuationScalarWhereInput
    data: XOR<PropertyValuationUpdateManyMutationInput, PropertyValuationUncheckedUpdateManyWithoutValuationListInput>
  }

  export type PropertyCreateWithoutValuationsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutValuationsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput
    verifications?: PropertyVerificationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutValuationsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutValuationsInput, PropertyUncheckedCreateWithoutValuationsInput>
  }

  export type ValuationListCreateWithoutValuationsInput = {
    id?: string
    name: string
    effectiveDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ValuationListUncheckedCreateWithoutValuationsInput = {
    id?: string
    name: string
    effectiveDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ValuationListCreateOrConnectWithoutValuationsInput = {
    where: ValuationListWhereUniqueInput
    create: XOR<ValuationListCreateWithoutValuationsInput, ValuationListUncheckedCreateWithoutValuationsInput>
  }

  export type PropertyUpsertWithoutValuationsInput = {
    update: XOR<PropertyUpdateWithoutValuationsInput, PropertyUncheckedUpdateWithoutValuationsInput>
    create: XOR<PropertyCreateWithoutValuationsInput, PropertyUncheckedCreateWithoutValuationsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutValuationsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutValuationsInput, PropertyUncheckedUpdateWithoutValuationsInput>
  }

  export type PropertyUpdateWithoutValuationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutValuationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput
    verifications?: PropertyVerificationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type ValuationListUpsertWithoutValuationsInput = {
    update: XOR<ValuationListUpdateWithoutValuationsInput, ValuationListUncheckedUpdateWithoutValuationsInput>
    create: XOR<ValuationListCreateWithoutValuationsInput, ValuationListUncheckedCreateWithoutValuationsInput>
    where?: ValuationListWhereInput
  }

  export type ValuationListUpdateToOneWithWhereWithoutValuationsInput = {
    where?: ValuationListWhereInput
    data: XOR<ValuationListUpdateWithoutValuationsInput, ValuationListUncheckedUpdateWithoutValuationsInput>
  }

  export type ValuationListUpdateWithoutValuationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ValuationListUncheckedUpdateWithoutValuationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyCreateWithoutVerificationsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutVerificationsInput = {
    id?: string
    code: string
    accountNumber?: string | null
    propertyName?: string | null
    assemblyId: string
    propertyClass?: string
    buildingStatus?: string
    propertyStatus?: string
    propertyUse?: string
    tenureType?: string
    structureType?: string
    createdByRatepayerId?: string | null
    registrationSource?: string
    registeredByConcessionId?: string | null
    claimedByRatepayerId?: string | null
    verificationStatus?: string
    polygonGeoJson: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: number | null
    landAreaSqm?: number | null
    numberOfFloors?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    units?: PropertyUnitUncheckedCreateNestedManyWithoutPropertyInput
    photos?: PropertyPhotoUncheckedCreateNestedManyWithoutPropertyInput
    documents?: PropertyDocumentUncheckedCreateNestedManyWithoutPropertyInput
    valuations?: PropertyValuationUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutVerificationsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutVerificationsInput, PropertyUncheckedCreateWithoutVerificationsInput>
  }

  export type PropertyUpsertWithoutVerificationsInput = {
    update: XOR<PropertyUpdateWithoutVerificationsInput, PropertyUncheckedUpdateWithoutVerificationsInput>
    create: XOR<PropertyCreateWithoutVerificationsInput, PropertyUncheckedCreateWithoutVerificationsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutVerificationsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutVerificationsInput, PropertyUncheckedUpdateWithoutVerificationsInput>
  }

  export type PropertyUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutVerificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    accountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    propertyName?: NullableStringFieldUpdateOperationsInput | string | null
    assemblyId?: StringFieldUpdateOperationsInput | string
    propertyClass?: StringFieldUpdateOperationsInput | string
    buildingStatus?: StringFieldUpdateOperationsInput | string
    propertyStatus?: StringFieldUpdateOperationsInput | string
    propertyUse?: StringFieldUpdateOperationsInput | string
    tenureType?: StringFieldUpdateOperationsInput | string
    structureType?: StringFieldUpdateOperationsInput | string
    createdByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    registrationSource?: StringFieldUpdateOperationsInput | string
    registeredByConcessionId?: NullableStringFieldUpdateOperationsInput | string | null
    claimedByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    polygonGeoJson?: JsonNullValueInput | InputJsonValue
    leaseDurationYears?: NullableIntFieldUpdateOperationsInput | number | null
    landAreaSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfFloors?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    units?: PropertyUnitUncheckedUpdateManyWithoutPropertyNestedInput
    photos?: PropertyPhotoUncheckedUpdateManyWithoutPropertyNestedInput
    documents?: PropertyDocumentUncheckedUpdateManyWithoutPropertyNestedInput
    valuations?: PropertyValuationUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUnitCreateManyPropertyInput = {
    id?: string
    unitIdentifier: string
    unitType?: string
    floorLevel?: number
    createdAt?: Date | string
  }

  export type PropertyPhotoCreateManyPropertyInput = {
    id?: string
    photoType: string
    mediaUrl: string
    capturedAt?: Date | string
  }

  export type PropertyDocumentCreateManyPropertyInput = {
    id?: string
    documentType: string
    documentNumber?: string | null
    issuingAuthority?: string | null
    issueDate?: Date | string | null
    mediaUrl: string
    fileSizeBytes?: number | null
    mimeType?: string | null
    uploadedByActorType: string
    uploadedByActorId: string
    ratepayerId?: string | null
    verificationStatus?: string
    verifiedAt?: Date | string | null
    verifiedByActorId?: string | null
    rejectionReason?: string | null
    isCapturedOnPremises?: boolean
    premisesLatitude?: number | null
    premisesLongitude?: number | null
    premisesGpsAccuracy?: number | null
    deviceId?: string | null
    staffRef?: string | null
    capturedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyValuationCreateManyPropertyInput = {
    id?: string
    valuationListId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyVerificationCreateManyPropertyInput = {
    id?: string
    verifiedByPersonnelId: string
    verifierLatitude: number
    verifierLongitude: number
    isWithinPolygon: boolean
    verifiedSnapshot: JsonNullValueInput | InputJsonValue
    capturedAt: Date | string
    receivedAt?: Date | string
    outcome: string
    notes?: string | null
    reviewStatus?: string
    reviewedByPersonnelId?: string | null
    reviewedAt?: Date | string | null
    reviewNotes?: string | null
  }

  export type PropertyUnitUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUnitUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUnitUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    unitIdentifier?: StringFieldUpdateOperationsInput | string
    unitType?: StringFieldUpdateOperationsInput | string
    floorLevel?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyPhotoUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    photoType?: StringFieldUpdateOperationsInput | string
    mediaUrl?: StringFieldUpdateOperationsInput | string
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyDocumentUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    issuingAuthority?: NullableStringFieldUpdateOperationsInput | string | null
    issueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mediaUrl?: StringFieldUpdateOperationsInput | string
    fileSizeBytes?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedByActorType?: StringFieldUpdateOperationsInput | string
    uploadedByActorId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: StringFieldUpdateOperationsInput | string
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedByActorId?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    isCapturedOnPremises?: BoolFieldUpdateOperationsInput | boolean
    premisesLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    premisesGpsAccuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    staffRef?: NullableStringFieldUpdateOperationsInput | string | null
    capturedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    valuationList?: ValuationListUpdateOneRequiredWithoutValuationsNestedInput
  }

  export type PropertyValuationUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    valuationListId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    valuationListId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyVerificationUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PropertyVerificationUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PropertyVerificationUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    verifiedByPersonnelId?: StringFieldUpdateOperationsInput | string
    verifierLatitude?: FloatFieldUpdateOperationsInput | number
    verifierLongitude?: FloatFieldUpdateOperationsInput | number
    isWithinPolygon?: BoolFieldUpdateOperationsInput | boolean
    verifiedSnapshot?: JsonNullValueInput | InputJsonValue
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outcome?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    reviewStatus?: StringFieldUpdateOperationsInput | string
    reviewedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PropertyValuationCreateManyValuationListInput = {
    id?: string
    propertyId: string
    rateableValue: Decimal | DecimalJsLike | number | string
    isCurrent?: boolean
    lvdReference: string
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type PropertyValuationUpdateWithoutValuationListInput = {
    id?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutValuationsNestedInput
  }

  export type PropertyValuationUncheckedUpdateWithoutValuationListInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyValuationUncheckedUpdateManyWithoutValuationListInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    rateableValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    lvdReference?: StringFieldUpdateOperationsInput | string
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
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