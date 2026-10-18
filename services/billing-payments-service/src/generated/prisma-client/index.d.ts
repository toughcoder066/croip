
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
 * Model PropertyBill
 * 
 */
export type PropertyBill = $Result.DefaultSelection<Prisma.$PropertyBillPayload>
/**
 * Model PaymentLink
 * 
 */
export type PaymentLink = $Result.DefaultSelection<Prisma.$PaymentLinkPayload>
/**
 * Model BillPayment
 * 
 */
export type BillPayment = $Result.DefaultSelection<Prisma.$BillPaymentPayload>
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
 * // Fetch zero or more PropertyBills
 * const propertyBills = await prisma.propertyBill.findMany()
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
   * // Fetch zero or more PropertyBills
   * const propertyBills = await prisma.propertyBill.findMany()
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
   * `prisma.propertyBill`: Exposes CRUD operations for the **PropertyBill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyBills
    * const propertyBills = await prisma.propertyBill.findMany()
    * ```
    */
  get propertyBill(): Prisma.PropertyBillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentLink`: Exposes CRUD operations for the **PaymentLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentLinks
    * const paymentLinks = await prisma.paymentLink.findMany()
    * ```
    */
  get paymentLink(): Prisma.PaymentLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.billPayment`: Exposes CRUD operations for the **BillPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillPayments
    * const billPayments = await prisma.billPayment.findMany()
    * ```
    */
  get billPayment(): Prisma.BillPaymentDelegate<ExtArgs, ClientOptions>;

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
    PropertyBill: 'PropertyBill',
    PaymentLink: 'PaymentLink',
    BillPayment: 'BillPayment',
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
      modelProps: "propertyBill" | "paymentLink" | "billPayment" | "outboxEvent" | "inboxMessage" | "idempotencyRecord" | "auditRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PropertyBill: {
        payload: Prisma.$PropertyBillPayload<ExtArgs>
        fields: Prisma.PropertyBillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyBillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyBillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          findFirst: {
            args: Prisma.PropertyBillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyBillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          findMany: {
            args: Prisma.PropertyBillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>[]
          }
          create: {
            args: Prisma.PropertyBillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          createMany: {
            args: Prisma.PropertyBillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyBillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>[]
          }
          delete: {
            args: Prisma.PropertyBillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          update: {
            args: Prisma.PropertyBillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          deleteMany: {
            args: Prisma.PropertyBillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyBillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyBillUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>[]
          }
          upsert: {
            args: Prisma.PropertyBillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyBillPayload>
          }
          aggregate: {
            args: Prisma.PropertyBillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyBill>
          }
          groupBy: {
            args: Prisma.PropertyBillGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyBillGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyBillCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyBillCountAggregateOutputType> | number
          }
        }
      }
      PaymentLink: {
        payload: Prisma.$PaymentLinkPayload<ExtArgs>
        fields: Prisma.PaymentLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          findFirst: {
            args: Prisma.PaymentLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          findMany: {
            args: Prisma.PaymentLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>[]
          }
          create: {
            args: Prisma.PaymentLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          createMany: {
            args: Prisma.PaymentLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>[]
          }
          delete: {
            args: Prisma.PaymentLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          update: {
            args: Prisma.PaymentLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          deleteMany: {
            args: Prisma.PaymentLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>[]
          }
          upsert: {
            args: Prisma.PaymentLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          aggregate: {
            args: Prisma.PaymentLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentLink>
          }
          groupBy: {
            args: Prisma.PaymentLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentLinkCountAggregateOutputType> | number
          }
        }
      }
      BillPayment: {
        payload: Prisma.$BillPaymentPayload<ExtArgs>
        fields: Prisma.BillPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          findFirst: {
            args: Prisma.BillPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          findMany: {
            args: Prisma.BillPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>[]
          }
          create: {
            args: Prisma.BillPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          createMany: {
            args: Prisma.BillPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>[]
          }
          delete: {
            args: Prisma.BillPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          update: {
            args: Prisma.BillPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          deleteMany: {
            args: Prisma.BillPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BillPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>[]
          }
          upsert: {
            args: Prisma.BillPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPaymentPayload>
          }
          aggregate: {
            args: Prisma.BillPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillPayment>
          }
          groupBy: {
            args: Prisma.BillPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<BillPaymentCountAggregateOutputType> | number
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
    propertyBill?: PropertyBillOmit
    paymentLink?: PaymentLinkOmit
    billPayment?: BillPaymentOmit
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
   * Count Type PropertyBillCountOutputType
   */

  export type PropertyBillCountOutputType = {
    supersededBills: number
    paymentLinks: number
    payments: number
  }

  export type PropertyBillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supersededBills?: boolean | PropertyBillCountOutputTypeCountSupersededBillsArgs
    paymentLinks?: boolean | PropertyBillCountOutputTypeCountPaymentLinksArgs
    payments?: boolean | PropertyBillCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * PropertyBillCountOutputType without action
   */
  export type PropertyBillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBillCountOutputType
     */
    select?: PropertyBillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyBillCountOutputType without action
   */
  export type PropertyBillCountOutputTypeCountSupersededBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyBillWhereInput
  }

  /**
   * PropertyBillCountOutputType without action
   */
  export type PropertyBillCountOutputTypeCountPaymentLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentLinkWhereInput
  }

  /**
   * PropertyBillCountOutputType without action
   */
  export type PropertyBillCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillPaymentWhereInput
  }


  /**
   * Count Type PaymentLinkCountOutputType
   */

  export type PaymentLinkCountOutputType = {
    payments: number
  }

  export type PaymentLinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | PaymentLinkCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * PaymentLinkCountOutputType without action
   */
  export type PaymentLinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLinkCountOutputType
     */
    select?: PaymentLinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentLinkCountOutputType without action
   */
  export type PaymentLinkCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillPaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PropertyBill
   */

  export type AggregatePropertyBill = {
    _count: PropertyBillCountAggregateOutputType | null
    _avg: PropertyBillAvgAggregateOutputType | null
    _sum: PropertyBillSumAggregateOutputType | null
    _min: PropertyBillMinAggregateOutputType | null
    _max: PropertyBillMaxAggregateOutputType | null
  }

  export type PropertyBillAvgAggregateOutputType = {
    amountDue: Decimal | null
    amountPaid: Decimal | null
  }

  export type PropertyBillSumAggregateOutputType = {
    amountDue: Decimal | null
    amountPaid: Decimal | null
  }

  export type PropertyBillMinAggregateOutputType = {
    id: string | null
    billNumber: string | null
    propertyId: string | null
    ratepayerId: string | null
    concessionId: string | null
    issuedByPersonnelId: string | null
    supersedesBillId: string | null
    billingPeriod: string | null
    billType: string | null
    currency: string | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    paymentStatus: string | null
    issuedAt: Date | null
    dueDate: Date | null
    externalBillRef: string | null
  }

  export type PropertyBillMaxAggregateOutputType = {
    id: string | null
    billNumber: string | null
    propertyId: string | null
    ratepayerId: string | null
    concessionId: string | null
    issuedByPersonnelId: string | null
    supersedesBillId: string | null
    billingPeriod: string | null
    billType: string | null
    currency: string | null
    amountDue: Decimal | null
    amountPaid: Decimal | null
    paymentStatus: string | null
    issuedAt: Date | null
    dueDate: Date | null
    externalBillRef: string | null
  }

  export type PropertyBillCountAggregateOutputType = {
    id: number
    billNumber: number
    propertyId: number
    ratepayerId: number
    concessionId: number
    issuedByPersonnelId: number
    supersedesBillId: number
    billingPeriod: number
    billType: number
    currency: number
    amountDue: number
    amountPaid: number
    paymentStatus: number
    issuedAt: number
    dueDate: number
    externalBillRef: number
    _all: number
  }


  export type PropertyBillAvgAggregateInputType = {
    amountDue?: true
    amountPaid?: true
  }

  export type PropertyBillSumAggregateInputType = {
    amountDue?: true
    amountPaid?: true
  }

  export type PropertyBillMinAggregateInputType = {
    id?: true
    billNumber?: true
    propertyId?: true
    ratepayerId?: true
    concessionId?: true
    issuedByPersonnelId?: true
    supersedesBillId?: true
    billingPeriod?: true
    billType?: true
    currency?: true
    amountDue?: true
    amountPaid?: true
    paymentStatus?: true
    issuedAt?: true
    dueDate?: true
    externalBillRef?: true
  }

  export type PropertyBillMaxAggregateInputType = {
    id?: true
    billNumber?: true
    propertyId?: true
    ratepayerId?: true
    concessionId?: true
    issuedByPersonnelId?: true
    supersedesBillId?: true
    billingPeriod?: true
    billType?: true
    currency?: true
    amountDue?: true
    amountPaid?: true
    paymentStatus?: true
    issuedAt?: true
    dueDate?: true
    externalBillRef?: true
  }

  export type PropertyBillCountAggregateInputType = {
    id?: true
    billNumber?: true
    propertyId?: true
    ratepayerId?: true
    concessionId?: true
    issuedByPersonnelId?: true
    supersedesBillId?: true
    billingPeriod?: true
    billType?: true
    currency?: true
    amountDue?: true
    amountPaid?: true
    paymentStatus?: true
    issuedAt?: true
    dueDate?: true
    externalBillRef?: true
    _all?: true
  }

  export type PropertyBillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyBill to aggregate.
     */
    where?: PropertyBillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyBills to fetch.
     */
    orderBy?: PropertyBillOrderByWithRelationInput | PropertyBillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyBillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyBills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyBills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyBills
    **/
    _count?: true | PropertyBillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyBillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyBillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyBillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyBillMaxAggregateInputType
  }

  export type GetPropertyBillAggregateType<T extends PropertyBillAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyBill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyBill[P]>
      : GetScalarType<T[P], AggregatePropertyBill[P]>
  }




  export type PropertyBillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyBillWhereInput
    orderBy?: PropertyBillOrderByWithAggregationInput | PropertyBillOrderByWithAggregationInput[]
    by: PropertyBillScalarFieldEnum[] | PropertyBillScalarFieldEnum
    having?: PropertyBillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyBillCountAggregateInputType | true
    _avg?: PropertyBillAvgAggregateInputType
    _sum?: PropertyBillSumAggregateInputType
    _min?: PropertyBillMinAggregateInputType
    _max?: PropertyBillMaxAggregateInputType
  }

  export type PropertyBillGroupByOutputType = {
    id: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId: string | null
    supersedesBillId: string | null
    billingPeriod: string
    billType: string
    currency: string
    amountDue: Decimal
    amountPaid: Decimal
    paymentStatus: string
    issuedAt: Date
    dueDate: Date
    externalBillRef: string
    _count: PropertyBillCountAggregateOutputType | null
    _avg: PropertyBillAvgAggregateOutputType | null
    _sum: PropertyBillSumAggregateOutputType | null
    _min: PropertyBillMinAggregateOutputType | null
    _max: PropertyBillMaxAggregateOutputType | null
  }

  type GetPropertyBillGroupByPayload<T extends PropertyBillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyBillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyBillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyBillGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyBillGroupByOutputType[P]>
        }
      >
    >


  export type PropertyBillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNumber?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    concessionId?: boolean
    issuedByPersonnelId?: boolean
    supersedesBillId?: boolean
    billingPeriod?: boolean
    billType?: boolean
    currency?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    paymentStatus?: boolean
    issuedAt?: boolean
    dueDate?: boolean
    externalBillRef?: boolean
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
    supersededBills?: boolean | PropertyBill$supersededBillsArgs<ExtArgs>
    paymentLinks?: boolean | PropertyBill$paymentLinksArgs<ExtArgs>
    payments?: boolean | PropertyBill$paymentsArgs<ExtArgs>
    _count?: boolean | PropertyBillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyBill"]>

  export type PropertyBillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNumber?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    concessionId?: boolean
    issuedByPersonnelId?: boolean
    supersedesBillId?: boolean
    billingPeriod?: boolean
    billType?: boolean
    currency?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    paymentStatus?: boolean
    issuedAt?: boolean
    dueDate?: boolean
    externalBillRef?: boolean
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
  }, ExtArgs["result"]["propertyBill"]>

  export type PropertyBillSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNumber?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    concessionId?: boolean
    issuedByPersonnelId?: boolean
    supersedesBillId?: boolean
    billingPeriod?: boolean
    billType?: boolean
    currency?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    paymentStatus?: boolean
    issuedAt?: boolean
    dueDate?: boolean
    externalBillRef?: boolean
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
  }, ExtArgs["result"]["propertyBill"]>

  export type PropertyBillSelectScalar = {
    id?: boolean
    billNumber?: boolean
    propertyId?: boolean
    ratepayerId?: boolean
    concessionId?: boolean
    issuedByPersonnelId?: boolean
    supersedesBillId?: boolean
    billingPeriod?: boolean
    billType?: boolean
    currency?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    paymentStatus?: boolean
    issuedAt?: boolean
    dueDate?: boolean
    externalBillRef?: boolean
  }

  export type PropertyBillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "billNumber" | "propertyId" | "ratepayerId" | "concessionId" | "issuedByPersonnelId" | "supersedesBillId" | "billingPeriod" | "billType" | "currency" | "amountDue" | "amountPaid" | "paymentStatus" | "issuedAt" | "dueDate" | "externalBillRef", ExtArgs["result"]["propertyBill"]>
  export type PropertyBillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
    supersededBills?: boolean | PropertyBill$supersededBillsArgs<ExtArgs>
    paymentLinks?: boolean | PropertyBill$paymentLinksArgs<ExtArgs>
    payments?: boolean | PropertyBill$paymentsArgs<ExtArgs>
    _count?: boolean | PropertyBillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyBillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
  }
  export type PropertyBillIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supersededBy?: boolean | PropertyBill$supersededByArgs<ExtArgs>
  }

  export type $PropertyBillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyBill"
    objects: {
      supersededBy: Prisma.$PropertyBillPayload<ExtArgs> | null
      supersededBills: Prisma.$PropertyBillPayload<ExtArgs>[]
      paymentLinks: Prisma.$PaymentLinkPayload<ExtArgs>[]
      payments: Prisma.$BillPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      billNumber: string
      propertyId: string
      ratepayerId: string
      concessionId: string
      issuedByPersonnelId: string | null
      supersedesBillId: string | null
      billingPeriod: string
      billType: string
      currency: string
      amountDue: Prisma.Decimal
      amountPaid: Prisma.Decimal
      paymentStatus: string
      issuedAt: Date
      dueDate: Date
      externalBillRef: string
    }, ExtArgs["result"]["propertyBill"]>
    composites: {}
  }

  type PropertyBillGetPayload<S extends boolean | null | undefined | PropertyBillDefaultArgs> = $Result.GetResult<Prisma.$PropertyBillPayload, S>

  type PropertyBillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyBillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyBillCountAggregateInputType | true
    }

  export interface PropertyBillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyBill'], meta: { name: 'PropertyBill' } }
    /**
     * Find zero or one PropertyBill that matches the filter.
     * @param {PropertyBillFindUniqueArgs} args - Arguments to find a PropertyBill
     * @example
     * // Get one PropertyBill
     * const propertyBill = await prisma.propertyBill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyBillFindUniqueArgs>(args: SelectSubset<T, PropertyBillFindUniqueArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PropertyBill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyBillFindUniqueOrThrowArgs} args - Arguments to find a PropertyBill
     * @example
     * // Get one PropertyBill
     * const propertyBill = await prisma.propertyBill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyBillFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyBillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyBill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillFindFirstArgs} args - Arguments to find a PropertyBill
     * @example
     * // Get one PropertyBill
     * const propertyBill = await prisma.propertyBill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyBillFindFirstArgs>(args?: SelectSubset<T, PropertyBillFindFirstArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PropertyBill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillFindFirstOrThrowArgs} args - Arguments to find a PropertyBill
     * @example
     * // Get one PropertyBill
     * const propertyBill = await prisma.propertyBill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyBillFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyBillFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PropertyBills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyBills
     * const propertyBills = await prisma.propertyBill.findMany()
     * 
     * // Get first 10 PropertyBills
     * const propertyBills = await prisma.propertyBill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyBillWithIdOnly = await prisma.propertyBill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyBillFindManyArgs>(args?: SelectSubset<T, PropertyBillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PropertyBill.
     * @param {PropertyBillCreateArgs} args - Arguments to create a PropertyBill.
     * @example
     * // Create one PropertyBill
     * const PropertyBill = await prisma.propertyBill.create({
     *   data: {
     *     // ... data to create a PropertyBill
     *   }
     * })
     * 
     */
    create<T extends PropertyBillCreateArgs>(args: SelectSubset<T, PropertyBillCreateArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PropertyBills.
     * @param {PropertyBillCreateManyArgs} args - Arguments to create many PropertyBills.
     * @example
     * // Create many PropertyBills
     * const propertyBill = await prisma.propertyBill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyBillCreateManyArgs>(args?: SelectSubset<T, PropertyBillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyBills and returns the data saved in the database.
     * @param {PropertyBillCreateManyAndReturnArgs} args - Arguments to create many PropertyBills.
     * @example
     * // Create many PropertyBills
     * const propertyBill = await prisma.propertyBill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyBills and only return the `id`
     * const propertyBillWithIdOnly = await prisma.propertyBill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyBillCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyBillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PropertyBill.
     * @param {PropertyBillDeleteArgs} args - Arguments to delete one PropertyBill.
     * @example
     * // Delete one PropertyBill
     * const PropertyBill = await prisma.propertyBill.delete({
     *   where: {
     *     // ... filter to delete one PropertyBill
     *   }
     * })
     * 
     */
    delete<T extends PropertyBillDeleteArgs>(args: SelectSubset<T, PropertyBillDeleteArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PropertyBill.
     * @param {PropertyBillUpdateArgs} args - Arguments to update one PropertyBill.
     * @example
     * // Update one PropertyBill
     * const propertyBill = await prisma.propertyBill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyBillUpdateArgs>(args: SelectSubset<T, PropertyBillUpdateArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PropertyBills.
     * @param {PropertyBillDeleteManyArgs} args - Arguments to filter PropertyBills to delete.
     * @example
     * // Delete a few PropertyBills
     * const { count } = await prisma.propertyBill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyBillDeleteManyArgs>(args?: SelectSubset<T, PropertyBillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyBills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyBills
     * const propertyBill = await prisma.propertyBill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyBillUpdateManyArgs>(args: SelectSubset<T, PropertyBillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyBills and returns the data updated in the database.
     * @param {PropertyBillUpdateManyAndReturnArgs} args - Arguments to update many PropertyBills.
     * @example
     * // Update many PropertyBills
     * const propertyBill = await prisma.propertyBill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PropertyBills and only return the `id`
     * const propertyBillWithIdOnly = await prisma.propertyBill.updateManyAndReturn({
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
    updateManyAndReturn<T extends PropertyBillUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyBillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PropertyBill.
     * @param {PropertyBillUpsertArgs} args - Arguments to update or create a PropertyBill.
     * @example
     * // Update or create a PropertyBill
     * const propertyBill = await prisma.propertyBill.upsert({
     *   create: {
     *     // ... data to create a PropertyBill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyBill we want to update
     *   }
     * })
     */
    upsert<T extends PropertyBillUpsertArgs>(args: SelectSubset<T, PropertyBillUpsertArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PropertyBills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillCountArgs} args - Arguments to filter PropertyBills to count.
     * @example
     * // Count the number of PropertyBills
     * const count = await prisma.propertyBill.count({
     *   where: {
     *     // ... the filter for the PropertyBills we want to count
     *   }
     * })
    **/
    count<T extends PropertyBillCountArgs>(
      args?: Subset<T, PropertyBillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyBillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyBill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PropertyBillAggregateArgs>(args: Subset<T, PropertyBillAggregateArgs>): Prisma.PrismaPromise<GetPropertyBillAggregateType<T>>

    /**
     * Group by PropertyBill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyBillGroupByArgs} args - Group by arguments.
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
      T extends PropertyBillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyBillGroupByArgs['orderBy'] }
        : { orderBy?: PropertyBillGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PropertyBillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyBill model
   */
  readonly fields: PropertyBillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyBill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyBillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supersededBy<T extends PropertyBill$supersededByArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBill$supersededByArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    supersededBills<T extends PropertyBill$supersededBillsArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBill$supersededBillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paymentLinks<T extends PropertyBill$paymentLinksArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBill$paymentLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends PropertyBill$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBill$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PropertyBill model
   */
  interface PropertyBillFieldRefs {
    readonly id: FieldRef<"PropertyBill", 'String'>
    readonly billNumber: FieldRef<"PropertyBill", 'String'>
    readonly propertyId: FieldRef<"PropertyBill", 'String'>
    readonly ratepayerId: FieldRef<"PropertyBill", 'String'>
    readonly concessionId: FieldRef<"PropertyBill", 'String'>
    readonly issuedByPersonnelId: FieldRef<"PropertyBill", 'String'>
    readonly supersedesBillId: FieldRef<"PropertyBill", 'String'>
    readonly billingPeriod: FieldRef<"PropertyBill", 'String'>
    readonly billType: FieldRef<"PropertyBill", 'String'>
    readonly currency: FieldRef<"PropertyBill", 'String'>
    readonly amountDue: FieldRef<"PropertyBill", 'Decimal'>
    readonly amountPaid: FieldRef<"PropertyBill", 'Decimal'>
    readonly paymentStatus: FieldRef<"PropertyBill", 'String'>
    readonly issuedAt: FieldRef<"PropertyBill", 'DateTime'>
    readonly dueDate: FieldRef<"PropertyBill", 'DateTime'>
    readonly externalBillRef: FieldRef<"PropertyBill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PropertyBill findUnique
   */
  export type PropertyBillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter, which PropertyBill to fetch.
     */
    where: PropertyBillWhereUniqueInput
  }

  /**
   * PropertyBill findUniqueOrThrow
   */
  export type PropertyBillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter, which PropertyBill to fetch.
     */
    where: PropertyBillWhereUniqueInput
  }

  /**
   * PropertyBill findFirst
   */
  export type PropertyBillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter, which PropertyBill to fetch.
     */
    where?: PropertyBillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyBills to fetch.
     */
    orderBy?: PropertyBillOrderByWithRelationInput | PropertyBillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyBills.
     */
    cursor?: PropertyBillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyBills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyBills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyBills.
     */
    distinct?: PropertyBillScalarFieldEnum | PropertyBillScalarFieldEnum[]
  }

  /**
   * PropertyBill findFirstOrThrow
   */
  export type PropertyBillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter, which PropertyBill to fetch.
     */
    where?: PropertyBillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyBills to fetch.
     */
    orderBy?: PropertyBillOrderByWithRelationInput | PropertyBillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyBills.
     */
    cursor?: PropertyBillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyBills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyBills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyBills.
     */
    distinct?: PropertyBillScalarFieldEnum | PropertyBillScalarFieldEnum[]
  }

  /**
   * PropertyBill findMany
   */
  export type PropertyBillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter, which PropertyBills to fetch.
     */
    where?: PropertyBillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyBills to fetch.
     */
    orderBy?: PropertyBillOrderByWithRelationInput | PropertyBillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyBills.
     */
    cursor?: PropertyBillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyBills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyBills.
     */
    skip?: number
    distinct?: PropertyBillScalarFieldEnum | PropertyBillScalarFieldEnum[]
  }

  /**
   * PropertyBill create
   */
  export type PropertyBillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyBill.
     */
    data: XOR<PropertyBillCreateInput, PropertyBillUncheckedCreateInput>
  }

  /**
   * PropertyBill createMany
   */
  export type PropertyBillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyBills.
     */
    data: PropertyBillCreateManyInput | PropertyBillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyBill createManyAndReturn
   */
  export type PropertyBillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * The data used to create many PropertyBills.
     */
    data: PropertyBillCreateManyInput | PropertyBillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyBill update
   */
  export type PropertyBillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyBill.
     */
    data: XOR<PropertyBillUpdateInput, PropertyBillUncheckedUpdateInput>
    /**
     * Choose, which PropertyBill to update.
     */
    where: PropertyBillWhereUniqueInput
  }

  /**
   * PropertyBill updateMany
   */
  export type PropertyBillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyBills.
     */
    data: XOR<PropertyBillUpdateManyMutationInput, PropertyBillUncheckedUpdateManyInput>
    /**
     * Filter which PropertyBills to update
     */
    where?: PropertyBillWhereInput
    /**
     * Limit how many PropertyBills to update.
     */
    limit?: number
  }

  /**
   * PropertyBill updateManyAndReturn
   */
  export type PropertyBillUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * The data used to update PropertyBills.
     */
    data: XOR<PropertyBillUpdateManyMutationInput, PropertyBillUncheckedUpdateManyInput>
    /**
     * Filter which PropertyBills to update
     */
    where?: PropertyBillWhereInput
    /**
     * Limit how many PropertyBills to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyBill upsert
   */
  export type PropertyBillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyBill to update in case it exists.
     */
    where: PropertyBillWhereUniqueInput
    /**
     * In case the PropertyBill found by the `where` argument doesn't exist, create a new PropertyBill with this data.
     */
    create: XOR<PropertyBillCreateInput, PropertyBillUncheckedCreateInput>
    /**
     * In case the PropertyBill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyBillUpdateInput, PropertyBillUncheckedUpdateInput>
  }

  /**
   * PropertyBill delete
   */
  export type PropertyBillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    /**
     * Filter which PropertyBill to delete.
     */
    where: PropertyBillWhereUniqueInput
  }

  /**
   * PropertyBill deleteMany
   */
  export type PropertyBillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyBills to delete
     */
    where?: PropertyBillWhereInput
    /**
     * Limit how many PropertyBills to delete.
     */
    limit?: number
  }

  /**
   * PropertyBill.supersededBy
   */
  export type PropertyBill$supersededByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    where?: PropertyBillWhereInput
  }

  /**
   * PropertyBill.supersededBills
   */
  export type PropertyBill$supersededBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
    where?: PropertyBillWhereInput
    orderBy?: PropertyBillOrderByWithRelationInput | PropertyBillOrderByWithRelationInput[]
    cursor?: PropertyBillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyBillScalarFieldEnum | PropertyBillScalarFieldEnum[]
  }

  /**
   * PropertyBill.paymentLinks
   */
  export type PropertyBill$paymentLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    where?: PaymentLinkWhereInput
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    cursor?: PaymentLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PropertyBill.payments
   */
  export type PropertyBill$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    where?: BillPaymentWhereInput
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    cursor?: BillPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillPaymentScalarFieldEnum | BillPaymentScalarFieldEnum[]
  }

  /**
   * PropertyBill without action
   */
  export type PropertyBillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyBill
     */
    select?: PropertyBillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PropertyBill
     */
    omit?: PropertyBillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyBillInclude<ExtArgs> | null
  }


  /**
   * Model PaymentLink
   */

  export type AggregatePaymentLink = {
    _count: PaymentLinkCountAggregateOutputType | null
    _avg: PaymentLinkAvgAggregateOutputType | null
    _sum: PaymentLinkSumAggregateOutputType | null
    _min: PaymentLinkMinAggregateOutputType | null
    _max: PaymentLinkMaxAggregateOutputType | null
  }

  export type PaymentLinkAvgAggregateOutputType = {
    amountFixed: Decimal | null
  }

  export type PaymentLinkSumAggregateOutputType = {
    amountFixed: Decimal | null
  }

  export type PaymentLinkMinAggregateOutputType = {
    id: string | null
    billId: string | null
    amountFixed: Decimal | null
    status: string | null
    expiresAt: Date | null
    gatewayLinkRef: string | null
    createdAt: Date | null
  }

  export type PaymentLinkMaxAggregateOutputType = {
    id: string | null
    billId: string | null
    amountFixed: Decimal | null
    status: string | null
    expiresAt: Date | null
    gatewayLinkRef: string | null
    createdAt: Date | null
  }

  export type PaymentLinkCountAggregateOutputType = {
    id: number
    billId: number
    amountFixed: number
    status: number
    expiresAt: number
    gatewayLinkRef: number
    createdAt: number
    _all: number
  }


  export type PaymentLinkAvgAggregateInputType = {
    amountFixed?: true
  }

  export type PaymentLinkSumAggregateInputType = {
    amountFixed?: true
  }

  export type PaymentLinkMinAggregateInputType = {
    id?: true
    billId?: true
    amountFixed?: true
    status?: true
    expiresAt?: true
    gatewayLinkRef?: true
    createdAt?: true
  }

  export type PaymentLinkMaxAggregateInputType = {
    id?: true
    billId?: true
    amountFixed?: true
    status?: true
    expiresAt?: true
    gatewayLinkRef?: true
    createdAt?: true
  }

  export type PaymentLinkCountAggregateInputType = {
    id?: true
    billId?: true
    amountFixed?: true
    status?: true
    expiresAt?: true
    gatewayLinkRef?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLink to aggregate.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentLinks
    **/
    _count?: true | PaymentLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentLinkMaxAggregateInputType
  }

  export type GetPaymentLinkAggregateType<T extends PaymentLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentLink[P]>
      : GetScalarType<T[P], AggregatePaymentLink[P]>
  }




  export type PaymentLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentLinkWhereInput
    orderBy?: PaymentLinkOrderByWithAggregationInput | PaymentLinkOrderByWithAggregationInput[]
    by: PaymentLinkScalarFieldEnum[] | PaymentLinkScalarFieldEnum
    having?: PaymentLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentLinkCountAggregateInputType | true
    _avg?: PaymentLinkAvgAggregateInputType
    _sum?: PaymentLinkSumAggregateInputType
    _min?: PaymentLinkMinAggregateInputType
    _max?: PaymentLinkMaxAggregateInputType
  }

  export type PaymentLinkGroupByOutputType = {
    id: string
    billId: string
    amountFixed: Decimal
    status: string
    expiresAt: Date
    gatewayLinkRef: string
    createdAt: Date
    _count: PaymentLinkCountAggregateOutputType | null
    _avg: PaymentLinkAvgAggregateOutputType | null
    _sum: PaymentLinkSumAggregateOutputType | null
    _min: PaymentLinkMinAggregateOutputType | null
    _max: PaymentLinkMaxAggregateOutputType | null
  }

  type GetPaymentLinkGroupByPayload<T extends PaymentLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentLinkGroupByOutputType[P]>
        }
      >
    >


  export type PaymentLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    amountFixed?: boolean
    status?: boolean
    expiresAt?: boolean
    gatewayLinkRef?: boolean
    createdAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    payments?: boolean | PaymentLink$paymentsArgs<ExtArgs>
    _count?: boolean | PaymentLinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentLink"]>

  export type PaymentLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    amountFixed?: boolean
    status?: boolean
    expiresAt?: boolean
    gatewayLinkRef?: boolean
    createdAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentLink"]>

  export type PaymentLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    amountFixed?: boolean
    status?: boolean
    expiresAt?: boolean
    gatewayLinkRef?: boolean
    createdAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentLink"]>

  export type PaymentLinkSelectScalar = {
    id?: boolean
    billId?: boolean
    amountFixed?: boolean
    status?: boolean
    expiresAt?: boolean
    gatewayLinkRef?: boolean
    createdAt?: boolean
  }

  export type PaymentLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "billId" | "amountFixed" | "status" | "expiresAt" | "gatewayLinkRef" | "createdAt", ExtArgs["result"]["paymentLink"]>
  export type PaymentLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    payments?: boolean | PaymentLink$paymentsArgs<ExtArgs>
    _count?: boolean | PaymentLinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
  }
  export type PaymentLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
  }

  export type $PaymentLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentLink"
    objects: {
      bill: Prisma.$PropertyBillPayload<ExtArgs>
      payments: Prisma.$BillPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      billId: string
      amountFixed: Prisma.Decimal
      status: string
      expiresAt: Date
      gatewayLinkRef: string
      createdAt: Date
    }, ExtArgs["result"]["paymentLink"]>
    composites: {}
  }

  type PaymentLinkGetPayload<S extends boolean | null | undefined | PaymentLinkDefaultArgs> = $Result.GetResult<Prisma.$PaymentLinkPayload, S>

  type PaymentLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentLinkCountAggregateInputType | true
    }

  export interface PaymentLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentLink'], meta: { name: 'PaymentLink' } }
    /**
     * Find zero or one PaymentLink that matches the filter.
     * @param {PaymentLinkFindUniqueArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentLinkFindUniqueArgs>(args: SelectSubset<T, PaymentLinkFindUniqueArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentLinkFindUniqueOrThrowArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindFirstArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentLinkFindFirstArgs>(args?: SelectSubset<T, PaymentLinkFindFirstArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindFirstOrThrowArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentLinks
     * const paymentLinks = await prisma.paymentLink.findMany()
     * 
     * // Get first 10 PaymentLinks
     * const paymentLinks = await prisma.paymentLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentLinkWithIdOnly = await prisma.paymentLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentLinkFindManyArgs>(args?: SelectSubset<T, PaymentLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentLink.
     * @param {PaymentLinkCreateArgs} args - Arguments to create a PaymentLink.
     * @example
     * // Create one PaymentLink
     * const PaymentLink = await prisma.paymentLink.create({
     *   data: {
     *     // ... data to create a PaymentLink
     *   }
     * })
     * 
     */
    create<T extends PaymentLinkCreateArgs>(args: SelectSubset<T, PaymentLinkCreateArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentLinks.
     * @param {PaymentLinkCreateManyArgs} args - Arguments to create many PaymentLinks.
     * @example
     * // Create many PaymentLinks
     * const paymentLink = await prisma.paymentLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentLinkCreateManyArgs>(args?: SelectSubset<T, PaymentLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentLinks and returns the data saved in the database.
     * @param {PaymentLinkCreateManyAndReturnArgs} args - Arguments to create many PaymentLinks.
     * @example
     * // Create many PaymentLinks
     * const paymentLink = await prisma.paymentLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentLinks and only return the `id`
     * const paymentLinkWithIdOnly = await prisma.paymentLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentLink.
     * @param {PaymentLinkDeleteArgs} args - Arguments to delete one PaymentLink.
     * @example
     * // Delete one PaymentLink
     * const PaymentLink = await prisma.paymentLink.delete({
     *   where: {
     *     // ... filter to delete one PaymentLink
     *   }
     * })
     * 
     */
    delete<T extends PaymentLinkDeleteArgs>(args: SelectSubset<T, PaymentLinkDeleteArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentLink.
     * @param {PaymentLinkUpdateArgs} args - Arguments to update one PaymentLink.
     * @example
     * // Update one PaymentLink
     * const paymentLink = await prisma.paymentLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentLinkUpdateArgs>(args: SelectSubset<T, PaymentLinkUpdateArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentLinks.
     * @param {PaymentLinkDeleteManyArgs} args - Arguments to filter PaymentLinks to delete.
     * @example
     * // Delete a few PaymentLinks
     * const { count } = await prisma.paymentLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentLinkDeleteManyArgs>(args?: SelectSubset<T, PaymentLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentLinks
     * const paymentLink = await prisma.paymentLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentLinkUpdateManyArgs>(args: SelectSubset<T, PaymentLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentLinks and returns the data updated in the database.
     * @param {PaymentLinkUpdateManyAndReturnArgs} args - Arguments to update many PaymentLinks.
     * @example
     * // Update many PaymentLinks
     * const paymentLink = await prisma.paymentLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentLinks and only return the `id`
     * const paymentLinkWithIdOnly = await prisma.paymentLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends PaymentLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentLink.
     * @param {PaymentLinkUpsertArgs} args - Arguments to update or create a PaymentLink.
     * @example
     * // Update or create a PaymentLink
     * const paymentLink = await prisma.paymentLink.upsert({
     *   create: {
     *     // ... data to create a PaymentLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentLink we want to update
     *   }
     * })
     */
    upsert<T extends PaymentLinkUpsertArgs>(args: SelectSubset<T, PaymentLinkUpsertArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkCountArgs} args - Arguments to filter PaymentLinks to count.
     * @example
     * // Count the number of PaymentLinks
     * const count = await prisma.paymentLink.count({
     *   where: {
     *     // ... the filter for the PaymentLinks we want to count
     *   }
     * })
    **/
    count<T extends PaymentLinkCountArgs>(
      args?: Subset<T, PaymentLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentLinkAggregateArgs>(args: Subset<T, PaymentLinkAggregateArgs>): Prisma.PrismaPromise<GetPaymentLinkAggregateType<T>>

    /**
     * Group by PaymentLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkGroupByArgs} args - Group by arguments.
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
      T extends PaymentLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentLinkGroupByArgs['orderBy'] }
        : { orderBy?: PaymentLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentLink model
   */
  readonly fields: PaymentLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bill<T extends PropertyBillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBillDefaultArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends PaymentLink$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentLink$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PaymentLink model
   */
  interface PaymentLinkFieldRefs {
    readonly id: FieldRef<"PaymentLink", 'String'>
    readonly billId: FieldRef<"PaymentLink", 'String'>
    readonly amountFixed: FieldRef<"PaymentLink", 'Decimal'>
    readonly status: FieldRef<"PaymentLink", 'String'>
    readonly expiresAt: FieldRef<"PaymentLink", 'DateTime'>
    readonly gatewayLinkRef: FieldRef<"PaymentLink", 'String'>
    readonly createdAt: FieldRef<"PaymentLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentLink findUnique
   */
  export type PaymentLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink findUniqueOrThrow
   */
  export type PaymentLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink findFirst
   */
  export type PaymentLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLinks.
     */
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink findFirstOrThrow
   */
  export type PaymentLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLinks.
     */
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink findMany
   */
  export type PaymentLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLinks to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink create
   */
  export type PaymentLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentLink.
     */
    data: XOR<PaymentLinkCreateInput, PaymentLinkUncheckedCreateInput>
  }

  /**
   * PaymentLink createMany
   */
  export type PaymentLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentLinks.
     */
    data: PaymentLinkCreateManyInput | PaymentLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentLink createManyAndReturn
   */
  export type PaymentLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentLinks.
     */
    data: PaymentLinkCreateManyInput | PaymentLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentLink update
   */
  export type PaymentLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentLink.
     */
    data: XOR<PaymentLinkUpdateInput, PaymentLinkUncheckedUpdateInput>
    /**
     * Choose, which PaymentLink to update.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink updateMany
   */
  export type PaymentLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentLinks.
     */
    data: XOR<PaymentLinkUpdateManyMutationInput, PaymentLinkUncheckedUpdateManyInput>
    /**
     * Filter which PaymentLinks to update
     */
    where?: PaymentLinkWhereInput
    /**
     * Limit how many PaymentLinks to update.
     */
    limit?: number
  }

  /**
   * PaymentLink updateManyAndReturn
   */
  export type PaymentLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * The data used to update PaymentLinks.
     */
    data: XOR<PaymentLinkUpdateManyMutationInput, PaymentLinkUncheckedUpdateManyInput>
    /**
     * Filter which PaymentLinks to update
     */
    where?: PaymentLinkWhereInput
    /**
     * Limit how many PaymentLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentLink upsert
   */
  export type PaymentLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentLink to update in case it exists.
     */
    where: PaymentLinkWhereUniqueInput
    /**
     * In case the PaymentLink found by the `where` argument doesn't exist, create a new PaymentLink with this data.
     */
    create: XOR<PaymentLinkCreateInput, PaymentLinkUncheckedCreateInput>
    /**
     * In case the PaymentLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentLinkUpdateInput, PaymentLinkUncheckedUpdateInput>
  }

  /**
   * PaymentLink delete
   */
  export type PaymentLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter which PaymentLink to delete.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink deleteMany
   */
  export type PaymentLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLinks to delete
     */
    where?: PaymentLinkWhereInput
    /**
     * Limit how many PaymentLinks to delete.
     */
    limit?: number
  }

  /**
   * PaymentLink.payments
   */
  export type PaymentLink$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    where?: BillPaymentWhereInput
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    cursor?: BillPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillPaymentScalarFieldEnum | BillPaymentScalarFieldEnum[]
  }

  /**
   * PaymentLink without action
   */
  export type PaymentLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
  }


  /**
   * Model BillPayment
   */

  export type AggregateBillPayment = {
    _count: BillPaymentCountAggregateOutputType | null
    _avg: BillPaymentAvgAggregateOutputType | null
    _sum: BillPaymentSumAggregateOutputType | null
    _min: BillPaymentMinAggregateOutputType | null
    _max: BillPaymentMaxAggregateOutputType | null
  }

  export type BillPaymentAvgAggregateOutputType = {
    amount: Decimal | null
    balanceAtPayment: Decimal | null
  }

  export type BillPaymentSumAggregateOutputType = {
    amount: Decimal | null
    balanceAtPayment: Decimal | null
  }

  export type BillPaymentMinAggregateOutputType = {
    id: string | null
    billId: string | null
    paymentLinkId: string | null
    paidByRatepayerId: string | null
    clientEventId: string | null
    externalPaymentRef: string | null
    paymentType: string | null
    amount: Decimal | null
    balanceAtPayment: Decimal | null
    status: string | null
    paidAt: Date | null
    receivedAt: Date | null
  }

  export type BillPaymentMaxAggregateOutputType = {
    id: string | null
    billId: string | null
    paymentLinkId: string | null
    paidByRatepayerId: string | null
    clientEventId: string | null
    externalPaymentRef: string | null
    paymentType: string | null
    amount: Decimal | null
    balanceAtPayment: Decimal | null
    status: string | null
    paidAt: Date | null
    receivedAt: Date | null
  }

  export type BillPaymentCountAggregateOutputType = {
    id: number
    billId: number
    paymentLinkId: number
    paidByRatepayerId: number
    clientEventId: number
    externalPaymentRef: number
    paymentType: number
    amount: number
    balanceAtPayment: number
    status: number
    paidAt: number
    receivedAt: number
    _all: number
  }


  export type BillPaymentAvgAggregateInputType = {
    amount?: true
    balanceAtPayment?: true
  }

  export type BillPaymentSumAggregateInputType = {
    amount?: true
    balanceAtPayment?: true
  }

  export type BillPaymentMinAggregateInputType = {
    id?: true
    billId?: true
    paymentLinkId?: true
    paidByRatepayerId?: true
    clientEventId?: true
    externalPaymentRef?: true
    paymentType?: true
    amount?: true
    balanceAtPayment?: true
    status?: true
    paidAt?: true
    receivedAt?: true
  }

  export type BillPaymentMaxAggregateInputType = {
    id?: true
    billId?: true
    paymentLinkId?: true
    paidByRatepayerId?: true
    clientEventId?: true
    externalPaymentRef?: true
    paymentType?: true
    amount?: true
    balanceAtPayment?: true
    status?: true
    paidAt?: true
    receivedAt?: true
  }

  export type BillPaymentCountAggregateInputType = {
    id?: true
    billId?: true
    paymentLinkId?: true
    paidByRatepayerId?: true
    clientEventId?: true
    externalPaymentRef?: true
    paymentType?: true
    amount?: true
    balanceAtPayment?: true
    status?: true
    paidAt?: true
    receivedAt?: true
    _all?: true
  }

  export type BillPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillPayment to aggregate.
     */
    where?: BillPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillPayments to fetch.
     */
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillPayments
    **/
    _count?: true | BillPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillPaymentMaxAggregateInputType
  }

  export type GetBillPaymentAggregateType<T extends BillPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateBillPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillPayment[P]>
      : GetScalarType<T[P], AggregateBillPayment[P]>
  }




  export type BillPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillPaymentWhereInput
    orderBy?: BillPaymentOrderByWithAggregationInput | BillPaymentOrderByWithAggregationInput[]
    by: BillPaymentScalarFieldEnum[] | BillPaymentScalarFieldEnum
    having?: BillPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillPaymentCountAggregateInputType | true
    _avg?: BillPaymentAvgAggregateInputType
    _sum?: BillPaymentSumAggregateInputType
    _min?: BillPaymentMinAggregateInputType
    _max?: BillPaymentMaxAggregateInputType
  }

  export type BillPaymentGroupByOutputType = {
    id: string
    billId: string
    paymentLinkId: string | null
    paidByRatepayerId: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType: string
    amount: Decimal
    balanceAtPayment: Decimal
    status: string
    paidAt: Date
    receivedAt: Date
    _count: BillPaymentCountAggregateOutputType | null
    _avg: BillPaymentAvgAggregateOutputType | null
    _sum: BillPaymentSumAggregateOutputType | null
    _min: BillPaymentMinAggregateOutputType | null
    _max: BillPaymentMaxAggregateOutputType | null
  }

  type GetBillPaymentGroupByPayload<T extends BillPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], BillPaymentGroupByOutputType[P]>
        }
      >
    >


  export type BillPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    paymentLinkId?: boolean
    paidByRatepayerId?: boolean
    clientEventId?: boolean
    externalPaymentRef?: boolean
    paymentType?: boolean
    amount?: boolean
    balanceAtPayment?: boolean
    status?: boolean
    paidAt?: boolean
    receivedAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }, ExtArgs["result"]["billPayment"]>

  export type BillPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    paymentLinkId?: boolean
    paidByRatepayerId?: boolean
    clientEventId?: boolean
    externalPaymentRef?: boolean
    paymentType?: boolean
    amount?: boolean
    balanceAtPayment?: boolean
    status?: boolean
    paidAt?: boolean
    receivedAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }, ExtArgs["result"]["billPayment"]>

  export type BillPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billId?: boolean
    paymentLinkId?: boolean
    paidByRatepayerId?: boolean
    clientEventId?: boolean
    externalPaymentRef?: boolean
    paymentType?: boolean
    amount?: boolean
    balanceAtPayment?: boolean
    status?: boolean
    paidAt?: boolean
    receivedAt?: boolean
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }, ExtArgs["result"]["billPayment"]>

  export type BillPaymentSelectScalar = {
    id?: boolean
    billId?: boolean
    paymentLinkId?: boolean
    paidByRatepayerId?: boolean
    clientEventId?: boolean
    externalPaymentRef?: boolean
    paymentType?: boolean
    amount?: boolean
    balanceAtPayment?: boolean
    status?: boolean
    paidAt?: boolean
    receivedAt?: boolean
  }

  export type BillPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "billId" | "paymentLinkId" | "paidByRatepayerId" | "clientEventId" | "externalPaymentRef" | "paymentType" | "amount" | "balanceAtPayment" | "status" | "paidAt" | "receivedAt", ExtArgs["result"]["billPayment"]>
  export type BillPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }
  export type BillPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }
  export type BillPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bill?: boolean | PropertyBillDefaultArgs<ExtArgs>
    paymentLink?: boolean | BillPayment$paymentLinkArgs<ExtArgs>
  }

  export type $BillPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillPayment"
    objects: {
      bill: Prisma.$PropertyBillPayload<ExtArgs>
      paymentLink: Prisma.$PaymentLinkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      billId: string
      paymentLinkId: string | null
      paidByRatepayerId: string | null
      clientEventId: string
      externalPaymentRef: string
      paymentType: string
      amount: Prisma.Decimal
      balanceAtPayment: Prisma.Decimal
      status: string
      paidAt: Date
      receivedAt: Date
    }, ExtArgs["result"]["billPayment"]>
    composites: {}
  }

  type BillPaymentGetPayload<S extends boolean | null | undefined | BillPaymentDefaultArgs> = $Result.GetResult<Prisma.$BillPaymentPayload, S>

  type BillPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BillPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BillPaymentCountAggregateInputType | true
    }

  export interface BillPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillPayment'], meta: { name: 'BillPayment' } }
    /**
     * Find zero or one BillPayment that matches the filter.
     * @param {BillPaymentFindUniqueArgs} args - Arguments to find a BillPayment
     * @example
     * // Get one BillPayment
     * const billPayment = await prisma.billPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillPaymentFindUniqueArgs>(args: SelectSubset<T, BillPaymentFindUniqueArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BillPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BillPaymentFindUniqueOrThrowArgs} args - Arguments to find a BillPayment
     * @example
     * // Get one BillPayment
     * const billPayment = await prisma.billPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, BillPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentFindFirstArgs} args - Arguments to find a BillPayment
     * @example
     * // Get one BillPayment
     * const billPayment = await prisma.billPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillPaymentFindFirstArgs>(args?: SelectSubset<T, BillPaymentFindFirstArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentFindFirstOrThrowArgs} args - Arguments to find a BillPayment
     * @example
     * // Get one BillPayment
     * const billPayment = await prisma.billPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, BillPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BillPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillPayments
     * const billPayments = await prisma.billPayment.findMany()
     * 
     * // Get first 10 BillPayments
     * const billPayments = await prisma.billPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billPaymentWithIdOnly = await prisma.billPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillPaymentFindManyArgs>(args?: SelectSubset<T, BillPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BillPayment.
     * @param {BillPaymentCreateArgs} args - Arguments to create a BillPayment.
     * @example
     * // Create one BillPayment
     * const BillPayment = await prisma.billPayment.create({
     *   data: {
     *     // ... data to create a BillPayment
     *   }
     * })
     * 
     */
    create<T extends BillPaymentCreateArgs>(args: SelectSubset<T, BillPaymentCreateArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BillPayments.
     * @param {BillPaymentCreateManyArgs} args - Arguments to create many BillPayments.
     * @example
     * // Create many BillPayments
     * const billPayment = await prisma.billPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillPaymentCreateManyArgs>(args?: SelectSubset<T, BillPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BillPayments and returns the data saved in the database.
     * @param {BillPaymentCreateManyAndReturnArgs} args - Arguments to create many BillPayments.
     * @example
     * // Create many BillPayments
     * const billPayment = await prisma.billPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BillPayments and only return the `id`
     * const billPaymentWithIdOnly = await prisma.billPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, BillPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BillPayment.
     * @param {BillPaymentDeleteArgs} args - Arguments to delete one BillPayment.
     * @example
     * // Delete one BillPayment
     * const BillPayment = await prisma.billPayment.delete({
     *   where: {
     *     // ... filter to delete one BillPayment
     *   }
     * })
     * 
     */
    delete<T extends BillPaymentDeleteArgs>(args: SelectSubset<T, BillPaymentDeleteArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BillPayment.
     * @param {BillPaymentUpdateArgs} args - Arguments to update one BillPayment.
     * @example
     * // Update one BillPayment
     * const billPayment = await prisma.billPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillPaymentUpdateArgs>(args: SelectSubset<T, BillPaymentUpdateArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BillPayments.
     * @param {BillPaymentDeleteManyArgs} args - Arguments to filter BillPayments to delete.
     * @example
     * // Delete a few BillPayments
     * const { count } = await prisma.billPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillPaymentDeleteManyArgs>(args?: SelectSubset<T, BillPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillPayments
     * const billPayment = await prisma.billPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillPaymentUpdateManyArgs>(args: SelectSubset<T, BillPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillPayments and returns the data updated in the database.
     * @param {BillPaymentUpdateManyAndReturnArgs} args - Arguments to update many BillPayments.
     * @example
     * // Update many BillPayments
     * const billPayment = await prisma.billPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BillPayments and only return the `id`
     * const billPaymentWithIdOnly = await prisma.billPayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends BillPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, BillPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BillPayment.
     * @param {BillPaymentUpsertArgs} args - Arguments to update or create a BillPayment.
     * @example
     * // Update or create a BillPayment
     * const billPayment = await prisma.billPayment.upsert({
     *   create: {
     *     // ... data to create a BillPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillPayment we want to update
     *   }
     * })
     */
    upsert<T extends BillPaymentUpsertArgs>(args: SelectSubset<T, BillPaymentUpsertArgs<ExtArgs>>): Prisma__BillPaymentClient<$Result.GetResult<Prisma.$BillPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BillPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentCountArgs} args - Arguments to filter BillPayments to count.
     * @example
     * // Count the number of BillPayments
     * const count = await prisma.billPayment.count({
     *   where: {
     *     // ... the filter for the BillPayments we want to count
     *   }
     * })
    **/
    count<T extends BillPaymentCountArgs>(
      args?: Subset<T, BillPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BillPaymentAggregateArgs>(args: Subset<T, BillPaymentAggregateArgs>): Prisma.PrismaPromise<GetBillPaymentAggregateType<T>>

    /**
     * Group by BillPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillPaymentGroupByArgs} args - Group by arguments.
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
      T extends BillPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillPaymentGroupByArgs['orderBy'] }
        : { orderBy?: BillPaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BillPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillPayment model
   */
  readonly fields: BillPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bill<T extends PropertyBillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyBillDefaultArgs<ExtArgs>>): Prisma__PropertyBillClient<$Result.GetResult<Prisma.$PropertyBillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paymentLink<T extends BillPayment$paymentLinkArgs<ExtArgs> = {}>(args?: Subset<T, BillPayment$paymentLinkArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BillPayment model
   */
  interface BillPaymentFieldRefs {
    readonly id: FieldRef<"BillPayment", 'String'>
    readonly billId: FieldRef<"BillPayment", 'String'>
    readonly paymentLinkId: FieldRef<"BillPayment", 'String'>
    readonly paidByRatepayerId: FieldRef<"BillPayment", 'String'>
    readonly clientEventId: FieldRef<"BillPayment", 'String'>
    readonly externalPaymentRef: FieldRef<"BillPayment", 'String'>
    readonly paymentType: FieldRef<"BillPayment", 'String'>
    readonly amount: FieldRef<"BillPayment", 'Decimal'>
    readonly balanceAtPayment: FieldRef<"BillPayment", 'Decimal'>
    readonly status: FieldRef<"BillPayment", 'String'>
    readonly paidAt: FieldRef<"BillPayment", 'DateTime'>
    readonly receivedAt: FieldRef<"BillPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillPayment findUnique
   */
  export type BillPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter, which BillPayment to fetch.
     */
    where: BillPaymentWhereUniqueInput
  }

  /**
   * BillPayment findUniqueOrThrow
   */
  export type BillPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter, which BillPayment to fetch.
     */
    where: BillPaymentWhereUniqueInput
  }

  /**
   * BillPayment findFirst
   */
  export type BillPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter, which BillPayment to fetch.
     */
    where?: BillPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillPayments to fetch.
     */
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillPayments.
     */
    cursor?: BillPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillPayments.
     */
    distinct?: BillPaymentScalarFieldEnum | BillPaymentScalarFieldEnum[]
  }

  /**
   * BillPayment findFirstOrThrow
   */
  export type BillPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter, which BillPayment to fetch.
     */
    where?: BillPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillPayments to fetch.
     */
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillPayments.
     */
    cursor?: BillPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillPayments.
     */
    distinct?: BillPaymentScalarFieldEnum | BillPaymentScalarFieldEnum[]
  }

  /**
   * BillPayment findMany
   */
  export type BillPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter, which BillPayments to fetch.
     */
    where?: BillPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillPayments to fetch.
     */
    orderBy?: BillPaymentOrderByWithRelationInput | BillPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillPayments.
     */
    cursor?: BillPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillPayments.
     */
    skip?: number
    distinct?: BillPaymentScalarFieldEnum | BillPaymentScalarFieldEnum[]
  }

  /**
   * BillPayment create
   */
  export type BillPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a BillPayment.
     */
    data: XOR<BillPaymentCreateInput, BillPaymentUncheckedCreateInput>
  }

  /**
   * BillPayment createMany
   */
  export type BillPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillPayments.
     */
    data: BillPaymentCreateManyInput | BillPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BillPayment createManyAndReturn
   */
  export type BillPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many BillPayments.
     */
    data: BillPaymentCreateManyInput | BillPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BillPayment update
   */
  export type BillPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a BillPayment.
     */
    data: XOR<BillPaymentUpdateInput, BillPaymentUncheckedUpdateInput>
    /**
     * Choose, which BillPayment to update.
     */
    where: BillPaymentWhereUniqueInput
  }

  /**
   * BillPayment updateMany
   */
  export type BillPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillPayments.
     */
    data: XOR<BillPaymentUpdateManyMutationInput, BillPaymentUncheckedUpdateManyInput>
    /**
     * Filter which BillPayments to update
     */
    where?: BillPaymentWhereInput
    /**
     * Limit how many BillPayments to update.
     */
    limit?: number
  }

  /**
   * BillPayment updateManyAndReturn
   */
  export type BillPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * The data used to update BillPayments.
     */
    data: XOR<BillPaymentUpdateManyMutationInput, BillPaymentUncheckedUpdateManyInput>
    /**
     * Filter which BillPayments to update
     */
    where?: BillPaymentWhereInput
    /**
     * Limit how many BillPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BillPayment upsert
   */
  export type BillPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the BillPayment to update in case it exists.
     */
    where: BillPaymentWhereUniqueInput
    /**
     * In case the BillPayment found by the `where` argument doesn't exist, create a new BillPayment with this data.
     */
    create: XOR<BillPaymentCreateInput, BillPaymentUncheckedCreateInput>
    /**
     * In case the BillPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillPaymentUpdateInput, BillPaymentUncheckedUpdateInput>
  }

  /**
   * BillPayment delete
   */
  export type BillPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
    /**
     * Filter which BillPayment to delete.
     */
    where: BillPaymentWhereUniqueInput
  }

  /**
   * BillPayment deleteMany
   */
  export type BillPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillPayments to delete
     */
    where?: BillPaymentWhereInput
    /**
     * Limit how many BillPayments to delete.
     */
    limit?: number
  }

  /**
   * BillPayment.paymentLink
   */
  export type BillPayment$paymentLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentLink
     */
    omit?: PaymentLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    where?: PaymentLinkWhereInput
  }

  /**
   * BillPayment without action
   */
  export type BillPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillPayment
     */
    select?: BillPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillPayment
     */
    omit?: BillPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillPaymentInclude<ExtArgs> | null
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


  export const PropertyBillScalarFieldEnum: {
    id: 'id',
    billNumber: 'billNumber',
    propertyId: 'propertyId',
    ratepayerId: 'ratepayerId',
    concessionId: 'concessionId',
    issuedByPersonnelId: 'issuedByPersonnelId',
    supersedesBillId: 'supersedesBillId',
    billingPeriod: 'billingPeriod',
    billType: 'billType',
    currency: 'currency',
    amountDue: 'amountDue',
    amountPaid: 'amountPaid',
    paymentStatus: 'paymentStatus',
    issuedAt: 'issuedAt',
    dueDate: 'dueDate',
    externalBillRef: 'externalBillRef'
  };

  export type PropertyBillScalarFieldEnum = (typeof PropertyBillScalarFieldEnum)[keyof typeof PropertyBillScalarFieldEnum]


  export const PaymentLinkScalarFieldEnum: {
    id: 'id',
    billId: 'billId',
    amountFixed: 'amountFixed',
    status: 'status',
    expiresAt: 'expiresAt',
    gatewayLinkRef: 'gatewayLinkRef',
    createdAt: 'createdAt'
  };

  export type PaymentLinkScalarFieldEnum = (typeof PaymentLinkScalarFieldEnum)[keyof typeof PaymentLinkScalarFieldEnum]


  export const BillPaymentScalarFieldEnum: {
    id: 'id',
    billId: 'billId',
    paymentLinkId: 'paymentLinkId',
    paidByRatepayerId: 'paidByRatepayerId',
    clientEventId: 'clientEventId',
    externalPaymentRef: 'externalPaymentRef',
    paymentType: 'paymentType',
    amount: 'amount',
    balanceAtPayment: 'balanceAtPayment',
    status: 'status',
    paidAt: 'paidAt',
    receivedAt: 'receivedAt'
  };

  export type BillPaymentScalarFieldEnum = (typeof BillPaymentScalarFieldEnum)[keyof typeof BillPaymentScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type PropertyBillWhereInput = {
    AND?: PropertyBillWhereInput | PropertyBillWhereInput[]
    OR?: PropertyBillWhereInput[]
    NOT?: PropertyBillWhereInput | PropertyBillWhereInput[]
    id?: UuidFilter<"PropertyBill"> | string
    billNumber?: StringFilter<"PropertyBill"> | string
    propertyId?: UuidFilter<"PropertyBill"> | string
    ratepayerId?: UuidFilter<"PropertyBill"> | string
    concessionId?: UuidFilter<"PropertyBill"> | string
    issuedByPersonnelId?: StringNullableFilter<"PropertyBill"> | string | null
    supersedesBillId?: UuidNullableFilter<"PropertyBill"> | string | null
    billingPeriod?: StringFilter<"PropertyBill"> | string
    billType?: StringFilter<"PropertyBill"> | string
    currency?: StringFilter<"PropertyBill"> | string
    amountDue?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFilter<"PropertyBill"> | string
    issuedAt?: DateTimeFilter<"PropertyBill"> | Date | string
    dueDate?: DateTimeFilter<"PropertyBill"> | Date | string
    externalBillRef?: StringFilter<"PropertyBill"> | string
    supersededBy?: XOR<PropertyBillNullableScalarRelationFilter, PropertyBillWhereInput> | null
    supersededBills?: PropertyBillListRelationFilter
    paymentLinks?: PaymentLinkListRelationFilter
    payments?: BillPaymentListRelationFilter
  }

  export type PropertyBillOrderByWithRelationInput = {
    id?: SortOrder
    billNumber?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    concessionId?: SortOrder
    issuedByPersonnelId?: SortOrderInput | SortOrder
    supersedesBillId?: SortOrderInput | SortOrder
    billingPeriod?: SortOrder
    billType?: SortOrder
    currency?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    paymentStatus?: SortOrder
    issuedAt?: SortOrder
    dueDate?: SortOrder
    externalBillRef?: SortOrder
    supersededBy?: PropertyBillOrderByWithRelationInput
    supersededBills?: PropertyBillOrderByRelationAggregateInput
    paymentLinks?: PaymentLinkOrderByRelationAggregateInput
    payments?: BillPaymentOrderByRelationAggregateInput
  }

  export type PropertyBillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    billNumber?: string
    concessionId_externalBillRef?: PropertyBillConcessionIdExternalBillRefCompoundUniqueInput
    AND?: PropertyBillWhereInput | PropertyBillWhereInput[]
    OR?: PropertyBillWhereInput[]
    NOT?: PropertyBillWhereInput | PropertyBillWhereInput[]
    propertyId?: UuidFilter<"PropertyBill"> | string
    ratepayerId?: UuidFilter<"PropertyBill"> | string
    concessionId?: UuidFilter<"PropertyBill"> | string
    issuedByPersonnelId?: StringNullableFilter<"PropertyBill"> | string | null
    supersedesBillId?: UuidNullableFilter<"PropertyBill"> | string | null
    billingPeriod?: StringFilter<"PropertyBill"> | string
    billType?: StringFilter<"PropertyBill"> | string
    currency?: StringFilter<"PropertyBill"> | string
    amountDue?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFilter<"PropertyBill"> | string
    issuedAt?: DateTimeFilter<"PropertyBill"> | Date | string
    dueDate?: DateTimeFilter<"PropertyBill"> | Date | string
    externalBillRef?: StringFilter<"PropertyBill"> | string
    supersededBy?: XOR<PropertyBillNullableScalarRelationFilter, PropertyBillWhereInput> | null
    supersededBills?: PropertyBillListRelationFilter
    paymentLinks?: PaymentLinkListRelationFilter
    payments?: BillPaymentListRelationFilter
  }, "id" | "billNumber" | "concessionId_externalBillRef">

  export type PropertyBillOrderByWithAggregationInput = {
    id?: SortOrder
    billNumber?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    concessionId?: SortOrder
    issuedByPersonnelId?: SortOrderInput | SortOrder
    supersedesBillId?: SortOrderInput | SortOrder
    billingPeriod?: SortOrder
    billType?: SortOrder
    currency?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    paymentStatus?: SortOrder
    issuedAt?: SortOrder
    dueDate?: SortOrder
    externalBillRef?: SortOrder
    _count?: PropertyBillCountOrderByAggregateInput
    _avg?: PropertyBillAvgOrderByAggregateInput
    _max?: PropertyBillMaxOrderByAggregateInput
    _min?: PropertyBillMinOrderByAggregateInput
    _sum?: PropertyBillSumOrderByAggregateInput
  }

  export type PropertyBillScalarWhereWithAggregatesInput = {
    AND?: PropertyBillScalarWhereWithAggregatesInput | PropertyBillScalarWhereWithAggregatesInput[]
    OR?: PropertyBillScalarWhereWithAggregatesInput[]
    NOT?: PropertyBillScalarWhereWithAggregatesInput | PropertyBillScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PropertyBill"> | string
    billNumber?: StringWithAggregatesFilter<"PropertyBill"> | string
    propertyId?: UuidWithAggregatesFilter<"PropertyBill"> | string
    ratepayerId?: UuidWithAggregatesFilter<"PropertyBill"> | string
    concessionId?: UuidWithAggregatesFilter<"PropertyBill"> | string
    issuedByPersonnelId?: StringNullableWithAggregatesFilter<"PropertyBill"> | string | null
    supersedesBillId?: UuidNullableWithAggregatesFilter<"PropertyBill"> | string | null
    billingPeriod?: StringWithAggregatesFilter<"PropertyBill"> | string
    billType?: StringWithAggregatesFilter<"PropertyBill"> | string
    currency?: StringWithAggregatesFilter<"PropertyBill"> | string
    amountDue?: DecimalWithAggregatesFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalWithAggregatesFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringWithAggregatesFilter<"PropertyBill"> | string
    issuedAt?: DateTimeWithAggregatesFilter<"PropertyBill"> | Date | string
    dueDate?: DateTimeWithAggregatesFilter<"PropertyBill"> | Date | string
    externalBillRef?: StringWithAggregatesFilter<"PropertyBill"> | string
  }

  export type PaymentLinkWhereInput = {
    AND?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    OR?: PaymentLinkWhereInput[]
    NOT?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    id?: UuidFilter<"PaymentLink"> | string
    billId?: UuidFilter<"PaymentLink"> | string
    amountFixed?: DecimalFilter<"PaymentLink"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PaymentLink"> | string
    expiresAt?: DateTimeFilter<"PaymentLink"> | Date | string
    gatewayLinkRef?: StringFilter<"PaymentLink"> | string
    createdAt?: DateTimeFilter<"PaymentLink"> | Date | string
    bill?: XOR<PropertyBillScalarRelationFilter, PropertyBillWhereInput>
    payments?: BillPaymentListRelationFilter
  }

  export type PaymentLinkOrderByWithRelationInput = {
    id?: SortOrder
    billId?: SortOrder
    amountFixed?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    gatewayLinkRef?: SortOrder
    createdAt?: SortOrder
    bill?: PropertyBillOrderByWithRelationInput
    payments?: BillPaymentOrderByRelationAggregateInput
  }

  export type PaymentLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gatewayLinkRef?: string
    AND?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    OR?: PaymentLinkWhereInput[]
    NOT?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    billId?: UuidFilter<"PaymentLink"> | string
    amountFixed?: DecimalFilter<"PaymentLink"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PaymentLink"> | string
    expiresAt?: DateTimeFilter<"PaymentLink"> | Date | string
    createdAt?: DateTimeFilter<"PaymentLink"> | Date | string
    bill?: XOR<PropertyBillScalarRelationFilter, PropertyBillWhereInput>
    payments?: BillPaymentListRelationFilter
  }, "id" | "gatewayLinkRef">

  export type PaymentLinkOrderByWithAggregationInput = {
    id?: SortOrder
    billId?: SortOrder
    amountFixed?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    gatewayLinkRef?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentLinkCountOrderByAggregateInput
    _avg?: PaymentLinkAvgOrderByAggregateInput
    _max?: PaymentLinkMaxOrderByAggregateInput
    _min?: PaymentLinkMinOrderByAggregateInput
    _sum?: PaymentLinkSumOrderByAggregateInput
  }

  export type PaymentLinkScalarWhereWithAggregatesInput = {
    AND?: PaymentLinkScalarWhereWithAggregatesInput | PaymentLinkScalarWhereWithAggregatesInput[]
    OR?: PaymentLinkScalarWhereWithAggregatesInput[]
    NOT?: PaymentLinkScalarWhereWithAggregatesInput | PaymentLinkScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PaymentLink"> | string
    billId?: UuidWithAggregatesFilter<"PaymentLink"> | string
    amountFixed?: DecimalWithAggregatesFilter<"PaymentLink"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"PaymentLink"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PaymentLink"> | Date | string
    gatewayLinkRef?: StringWithAggregatesFilter<"PaymentLink"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentLink"> | Date | string
  }

  export type BillPaymentWhereInput = {
    AND?: BillPaymentWhereInput | BillPaymentWhereInput[]
    OR?: BillPaymentWhereInput[]
    NOT?: BillPaymentWhereInput | BillPaymentWhereInput[]
    id?: UuidFilter<"BillPayment"> | string
    billId?: UuidFilter<"BillPayment"> | string
    paymentLinkId?: UuidNullableFilter<"BillPayment"> | string | null
    paidByRatepayerId?: UuidNullableFilter<"BillPayment"> | string | null
    clientEventId?: UuidFilter<"BillPayment"> | string
    externalPaymentRef?: StringFilter<"BillPayment"> | string
    paymentType?: StringFilter<"BillPayment"> | string
    amount?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"BillPayment"> | string
    paidAt?: DateTimeFilter<"BillPayment"> | Date | string
    receivedAt?: DateTimeFilter<"BillPayment"> | Date | string
    bill?: XOR<PropertyBillScalarRelationFilter, PropertyBillWhereInput>
    paymentLink?: XOR<PaymentLinkNullableScalarRelationFilter, PaymentLinkWhereInput> | null
  }

  export type BillPaymentOrderByWithRelationInput = {
    id?: SortOrder
    billId?: SortOrder
    paymentLinkId?: SortOrderInput | SortOrder
    paidByRatepayerId?: SortOrderInput | SortOrder
    clientEventId?: SortOrder
    externalPaymentRef?: SortOrder
    paymentType?: SortOrder
    amount?: SortOrder
    balanceAtPayment?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    receivedAt?: SortOrder
    bill?: PropertyBillOrderByWithRelationInput
    paymentLink?: PaymentLinkOrderByWithRelationInput
  }

  export type BillPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientEventId?: string
    AND?: BillPaymentWhereInput | BillPaymentWhereInput[]
    OR?: BillPaymentWhereInput[]
    NOT?: BillPaymentWhereInput | BillPaymentWhereInput[]
    billId?: UuidFilter<"BillPayment"> | string
    paymentLinkId?: UuidNullableFilter<"BillPayment"> | string | null
    paidByRatepayerId?: UuidNullableFilter<"BillPayment"> | string | null
    externalPaymentRef?: StringFilter<"BillPayment"> | string
    paymentType?: StringFilter<"BillPayment"> | string
    amount?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"BillPayment"> | string
    paidAt?: DateTimeFilter<"BillPayment"> | Date | string
    receivedAt?: DateTimeFilter<"BillPayment"> | Date | string
    bill?: XOR<PropertyBillScalarRelationFilter, PropertyBillWhereInput>
    paymentLink?: XOR<PaymentLinkNullableScalarRelationFilter, PaymentLinkWhereInput> | null
  }, "id" | "clientEventId">

  export type BillPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    billId?: SortOrder
    paymentLinkId?: SortOrderInput | SortOrder
    paidByRatepayerId?: SortOrderInput | SortOrder
    clientEventId?: SortOrder
    externalPaymentRef?: SortOrder
    paymentType?: SortOrder
    amount?: SortOrder
    balanceAtPayment?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    receivedAt?: SortOrder
    _count?: BillPaymentCountOrderByAggregateInput
    _avg?: BillPaymentAvgOrderByAggregateInput
    _max?: BillPaymentMaxOrderByAggregateInput
    _min?: BillPaymentMinOrderByAggregateInput
    _sum?: BillPaymentSumOrderByAggregateInput
  }

  export type BillPaymentScalarWhereWithAggregatesInput = {
    AND?: BillPaymentScalarWhereWithAggregatesInput | BillPaymentScalarWhereWithAggregatesInput[]
    OR?: BillPaymentScalarWhereWithAggregatesInput[]
    NOT?: BillPaymentScalarWhereWithAggregatesInput | BillPaymentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BillPayment"> | string
    billId?: UuidWithAggregatesFilter<"BillPayment"> | string
    paymentLinkId?: UuidNullableWithAggregatesFilter<"BillPayment"> | string | null
    paidByRatepayerId?: UuidNullableWithAggregatesFilter<"BillPayment"> | string | null
    clientEventId?: UuidWithAggregatesFilter<"BillPayment"> | string
    externalPaymentRef?: StringWithAggregatesFilter<"BillPayment"> | string
    paymentType?: StringWithAggregatesFilter<"BillPayment"> | string
    amount?: DecimalWithAggregatesFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalWithAggregatesFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"BillPayment"> | string
    paidAt?: DateTimeWithAggregatesFilter<"BillPayment"> | Date | string
    receivedAt?: DateTimeWithAggregatesFilter<"BillPayment"> | Date | string
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

  export type PropertyBillCreateInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBy?: PropertyBillCreateNestedOneWithoutSupersededBillsInput
    supersededBills?: PropertyBillCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkCreateNestedManyWithoutBillInput
    payments?: BillPaymentCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUncheckedCreateInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    supersedesBillId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBills?: PropertyBillUncheckedCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkUncheckedCreateNestedManyWithoutBillInput
    payments?: BillPaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBy?: PropertyBillUpdateOneWithoutSupersededBillsNestedInput
    supersededBills?: PropertyBillUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    supersedesBillId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBills?: PropertyBillUncheckedUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUncheckedUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillCreateManyInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    supersedesBillId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
  }

  export type PropertyBillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyBillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    supersedesBillId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentLinkCreateInput = {
    id?: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
    bill: PropertyBillCreateNestedOneWithoutPaymentLinksInput
    payments?: BillPaymentCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkUncheckedCreateInput = {
    id?: string
    billId: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
    payments?: BillPaymentUncheckedCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: PropertyBillUpdateOneRequiredWithoutPaymentLinksNestedInput
    payments?: BillPaymentUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: BillPaymentUncheckedUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkCreateManyInput = {
    id?: string
    billId: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
  }

  export type PaymentLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentCreateInput = {
    id?: string
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
    bill: PropertyBillCreateNestedOneWithoutPaymentsInput
    paymentLink?: PaymentLinkCreateNestedOneWithoutPaymentsInput
  }

  export type BillPaymentUncheckedCreateInput = {
    id?: string
    billId: string
    paymentLinkId?: string | null
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type BillPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: PropertyBillUpdateOneRequiredWithoutPaymentsNestedInput
    paymentLink?: PaymentLinkUpdateOneWithoutPaymentsNestedInput
  }

  export type BillPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentCreateManyInput = {
    id?: string
    billId: string
    paymentLinkId?: string | null
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type BillPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type PropertyBillNullableScalarRelationFilter = {
    is?: PropertyBillWhereInput | null
    isNot?: PropertyBillWhereInput | null
  }

  export type PropertyBillListRelationFilter = {
    every?: PropertyBillWhereInput
    some?: PropertyBillWhereInput
    none?: PropertyBillWhereInput
  }

  export type PaymentLinkListRelationFilter = {
    every?: PaymentLinkWhereInput
    some?: PaymentLinkWhereInput
    none?: PaymentLinkWhereInput
  }

  export type BillPaymentListRelationFilter = {
    every?: BillPaymentWhereInput
    some?: BillPaymentWhereInput
    none?: BillPaymentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertyBillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyBillConcessionIdExternalBillRefCompoundUniqueInput = {
    concessionId: string
    externalBillRef: string
  }

  export type PropertyBillCountOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    concessionId?: SortOrder
    issuedByPersonnelId?: SortOrder
    supersedesBillId?: SortOrder
    billingPeriod?: SortOrder
    billType?: SortOrder
    currency?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    paymentStatus?: SortOrder
    issuedAt?: SortOrder
    dueDate?: SortOrder
    externalBillRef?: SortOrder
  }

  export type PropertyBillAvgOrderByAggregateInput = {
    amountDue?: SortOrder
    amountPaid?: SortOrder
  }

  export type PropertyBillMaxOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    concessionId?: SortOrder
    issuedByPersonnelId?: SortOrder
    supersedesBillId?: SortOrder
    billingPeriod?: SortOrder
    billType?: SortOrder
    currency?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    paymentStatus?: SortOrder
    issuedAt?: SortOrder
    dueDate?: SortOrder
    externalBillRef?: SortOrder
  }

  export type PropertyBillMinOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    propertyId?: SortOrder
    ratepayerId?: SortOrder
    concessionId?: SortOrder
    issuedByPersonnelId?: SortOrder
    supersedesBillId?: SortOrder
    billingPeriod?: SortOrder
    billType?: SortOrder
    currency?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    paymentStatus?: SortOrder
    issuedAt?: SortOrder
    dueDate?: SortOrder
    externalBillRef?: SortOrder
  }

  export type PropertyBillSumOrderByAggregateInput = {
    amountDue?: SortOrder
    amountPaid?: SortOrder
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

  export type PropertyBillScalarRelationFilter = {
    is?: PropertyBillWhereInput
    isNot?: PropertyBillWhereInput
  }

  export type PaymentLinkCountOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amountFixed?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    gatewayLinkRef?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLinkAvgOrderByAggregateInput = {
    amountFixed?: SortOrder
  }

  export type PaymentLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amountFixed?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    gatewayLinkRef?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLinkMinOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    amountFixed?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    gatewayLinkRef?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentLinkSumOrderByAggregateInput = {
    amountFixed?: SortOrder
  }

  export type PaymentLinkNullableScalarRelationFilter = {
    is?: PaymentLinkWhereInput | null
    isNot?: PaymentLinkWhereInput | null
  }

  export type BillPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    paymentLinkId?: SortOrder
    paidByRatepayerId?: SortOrder
    clientEventId?: SortOrder
    externalPaymentRef?: SortOrder
    paymentType?: SortOrder
    amount?: SortOrder
    balanceAtPayment?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    receivedAt?: SortOrder
  }

  export type BillPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAtPayment?: SortOrder
  }

  export type BillPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    paymentLinkId?: SortOrder
    paidByRatepayerId?: SortOrder
    clientEventId?: SortOrder
    externalPaymentRef?: SortOrder
    paymentType?: SortOrder
    amount?: SortOrder
    balanceAtPayment?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    receivedAt?: SortOrder
  }

  export type BillPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    billId?: SortOrder
    paymentLinkId?: SortOrder
    paidByRatepayerId?: SortOrder
    clientEventId?: SortOrder
    externalPaymentRef?: SortOrder
    paymentType?: SortOrder
    amount?: SortOrder
    balanceAtPayment?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    receivedAt?: SortOrder
  }

  export type BillPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAtPayment?: SortOrder
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

  export type PropertyBillCreateNestedOneWithoutSupersededBillsInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededBillsInput, PropertyBillUncheckedCreateWithoutSupersededBillsInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededBillsInput
    connect?: PropertyBillWhereUniqueInput
  }

  export type PropertyBillCreateNestedManyWithoutSupersededByInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput> | PropertyBillCreateWithoutSupersededByInput[] | PropertyBillUncheckedCreateWithoutSupersededByInput[]
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededByInput | PropertyBillCreateOrConnectWithoutSupersededByInput[]
    createMany?: PropertyBillCreateManySupersededByInputEnvelope
    connect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
  }

  export type PaymentLinkCreateNestedManyWithoutBillInput = {
    create?: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput> | PaymentLinkCreateWithoutBillInput[] | PaymentLinkUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutBillInput | PaymentLinkCreateOrConnectWithoutBillInput[]
    createMany?: PaymentLinkCreateManyBillInputEnvelope
    connect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
  }

  export type BillPaymentCreateNestedManyWithoutBillInput = {
    create?: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput> | BillPaymentCreateWithoutBillInput[] | BillPaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutBillInput | BillPaymentCreateOrConnectWithoutBillInput[]
    createMany?: BillPaymentCreateManyBillInputEnvelope
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
  }

  export type PropertyBillUncheckedCreateNestedManyWithoutSupersededByInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput> | PropertyBillCreateWithoutSupersededByInput[] | PropertyBillUncheckedCreateWithoutSupersededByInput[]
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededByInput | PropertyBillCreateOrConnectWithoutSupersededByInput[]
    createMany?: PropertyBillCreateManySupersededByInputEnvelope
    connect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
  }

  export type PaymentLinkUncheckedCreateNestedManyWithoutBillInput = {
    create?: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput> | PaymentLinkCreateWithoutBillInput[] | PaymentLinkUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutBillInput | PaymentLinkCreateOrConnectWithoutBillInput[]
    createMany?: PaymentLinkCreateManyBillInputEnvelope
    connect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
  }

  export type BillPaymentUncheckedCreateNestedManyWithoutBillInput = {
    create?: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput> | BillPaymentCreateWithoutBillInput[] | BillPaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutBillInput | BillPaymentCreateOrConnectWithoutBillInput[]
    createMany?: BillPaymentCreateManyBillInputEnvelope
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PropertyBillUpdateOneWithoutSupersededBillsNestedInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededBillsInput, PropertyBillUncheckedCreateWithoutSupersededBillsInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededBillsInput
    upsert?: PropertyBillUpsertWithoutSupersededBillsInput
    disconnect?: PropertyBillWhereInput | boolean
    delete?: PropertyBillWhereInput | boolean
    connect?: PropertyBillWhereUniqueInput
    update?: XOR<XOR<PropertyBillUpdateToOneWithWhereWithoutSupersededBillsInput, PropertyBillUpdateWithoutSupersededBillsInput>, PropertyBillUncheckedUpdateWithoutSupersededBillsInput>
  }

  export type PropertyBillUpdateManyWithoutSupersededByNestedInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput> | PropertyBillCreateWithoutSupersededByInput[] | PropertyBillUncheckedCreateWithoutSupersededByInput[]
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededByInput | PropertyBillCreateOrConnectWithoutSupersededByInput[]
    upsert?: PropertyBillUpsertWithWhereUniqueWithoutSupersededByInput | PropertyBillUpsertWithWhereUniqueWithoutSupersededByInput[]
    createMany?: PropertyBillCreateManySupersededByInputEnvelope
    set?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    disconnect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    delete?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    connect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    update?: PropertyBillUpdateWithWhereUniqueWithoutSupersededByInput | PropertyBillUpdateWithWhereUniqueWithoutSupersededByInput[]
    updateMany?: PropertyBillUpdateManyWithWhereWithoutSupersededByInput | PropertyBillUpdateManyWithWhereWithoutSupersededByInput[]
    deleteMany?: PropertyBillScalarWhereInput | PropertyBillScalarWhereInput[]
  }

  export type PaymentLinkUpdateManyWithoutBillNestedInput = {
    create?: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput> | PaymentLinkCreateWithoutBillInput[] | PaymentLinkUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutBillInput | PaymentLinkCreateOrConnectWithoutBillInput[]
    upsert?: PaymentLinkUpsertWithWhereUniqueWithoutBillInput | PaymentLinkUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: PaymentLinkCreateManyBillInputEnvelope
    set?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    disconnect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    delete?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    connect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    update?: PaymentLinkUpdateWithWhereUniqueWithoutBillInput | PaymentLinkUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: PaymentLinkUpdateManyWithWhereWithoutBillInput | PaymentLinkUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: PaymentLinkScalarWhereInput | PaymentLinkScalarWhereInput[]
  }

  export type BillPaymentUpdateManyWithoutBillNestedInput = {
    create?: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput> | BillPaymentCreateWithoutBillInput[] | BillPaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutBillInput | BillPaymentCreateOrConnectWithoutBillInput[]
    upsert?: BillPaymentUpsertWithWhereUniqueWithoutBillInput | BillPaymentUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: BillPaymentCreateManyBillInputEnvelope
    set?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    disconnect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    delete?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    update?: BillPaymentUpdateWithWhereUniqueWithoutBillInput | BillPaymentUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: BillPaymentUpdateManyWithWhereWithoutBillInput | BillPaymentUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
  }

  export type PropertyBillUncheckedUpdateManyWithoutSupersededByNestedInput = {
    create?: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput> | PropertyBillCreateWithoutSupersededByInput[] | PropertyBillUncheckedCreateWithoutSupersededByInput[]
    connectOrCreate?: PropertyBillCreateOrConnectWithoutSupersededByInput | PropertyBillCreateOrConnectWithoutSupersededByInput[]
    upsert?: PropertyBillUpsertWithWhereUniqueWithoutSupersededByInput | PropertyBillUpsertWithWhereUniqueWithoutSupersededByInput[]
    createMany?: PropertyBillCreateManySupersededByInputEnvelope
    set?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    disconnect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    delete?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    connect?: PropertyBillWhereUniqueInput | PropertyBillWhereUniqueInput[]
    update?: PropertyBillUpdateWithWhereUniqueWithoutSupersededByInput | PropertyBillUpdateWithWhereUniqueWithoutSupersededByInput[]
    updateMany?: PropertyBillUpdateManyWithWhereWithoutSupersededByInput | PropertyBillUpdateManyWithWhereWithoutSupersededByInput[]
    deleteMany?: PropertyBillScalarWhereInput | PropertyBillScalarWhereInput[]
  }

  export type PaymentLinkUncheckedUpdateManyWithoutBillNestedInput = {
    create?: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput> | PaymentLinkCreateWithoutBillInput[] | PaymentLinkUncheckedCreateWithoutBillInput[]
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutBillInput | PaymentLinkCreateOrConnectWithoutBillInput[]
    upsert?: PaymentLinkUpsertWithWhereUniqueWithoutBillInput | PaymentLinkUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: PaymentLinkCreateManyBillInputEnvelope
    set?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    disconnect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    delete?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    connect?: PaymentLinkWhereUniqueInput | PaymentLinkWhereUniqueInput[]
    update?: PaymentLinkUpdateWithWhereUniqueWithoutBillInput | PaymentLinkUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: PaymentLinkUpdateManyWithWhereWithoutBillInput | PaymentLinkUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: PaymentLinkScalarWhereInput | PaymentLinkScalarWhereInput[]
  }

  export type BillPaymentUncheckedUpdateManyWithoutBillNestedInput = {
    create?: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput> | BillPaymentCreateWithoutBillInput[] | BillPaymentUncheckedCreateWithoutBillInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutBillInput | BillPaymentCreateOrConnectWithoutBillInput[]
    upsert?: BillPaymentUpsertWithWhereUniqueWithoutBillInput | BillPaymentUpsertWithWhereUniqueWithoutBillInput[]
    createMany?: BillPaymentCreateManyBillInputEnvelope
    set?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    disconnect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    delete?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    update?: BillPaymentUpdateWithWhereUniqueWithoutBillInput | BillPaymentUpdateWithWhereUniqueWithoutBillInput[]
    updateMany?: BillPaymentUpdateManyWithWhereWithoutBillInput | BillPaymentUpdateManyWithWhereWithoutBillInput[]
    deleteMany?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
  }

  export type PropertyBillCreateNestedOneWithoutPaymentLinksInput = {
    create?: XOR<PropertyBillCreateWithoutPaymentLinksInput, PropertyBillUncheckedCreateWithoutPaymentLinksInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutPaymentLinksInput
    connect?: PropertyBillWhereUniqueInput
  }

  export type BillPaymentCreateNestedManyWithoutPaymentLinkInput = {
    create?: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput> | BillPaymentCreateWithoutPaymentLinkInput[] | BillPaymentUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutPaymentLinkInput | BillPaymentCreateOrConnectWithoutPaymentLinkInput[]
    createMany?: BillPaymentCreateManyPaymentLinkInputEnvelope
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
  }

  export type BillPaymentUncheckedCreateNestedManyWithoutPaymentLinkInput = {
    create?: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput> | BillPaymentCreateWithoutPaymentLinkInput[] | BillPaymentUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutPaymentLinkInput | BillPaymentCreateOrConnectWithoutPaymentLinkInput[]
    createMany?: BillPaymentCreateManyPaymentLinkInputEnvelope
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
  }

  export type PropertyBillUpdateOneRequiredWithoutPaymentLinksNestedInput = {
    create?: XOR<PropertyBillCreateWithoutPaymentLinksInput, PropertyBillUncheckedCreateWithoutPaymentLinksInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutPaymentLinksInput
    upsert?: PropertyBillUpsertWithoutPaymentLinksInput
    connect?: PropertyBillWhereUniqueInput
    update?: XOR<XOR<PropertyBillUpdateToOneWithWhereWithoutPaymentLinksInput, PropertyBillUpdateWithoutPaymentLinksInput>, PropertyBillUncheckedUpdateWithoutPaymentLinksInput>
  }

  export type BillPaymentUpdateManyWithoutPaymentLinkNestedInput = {
    create?: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput> | BillPaymentCreateWithoutPaymentLinkInput[] | BillPaymentUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutPaymentLinkInput | BillPaymentCreateOrConnectWithoutPaymentLinkInput[]
    upsert?: BillPaymentUpsertWithWhereUniqueWithoutPaymentLinkInput | BillPaymentUpsertWithWhereUniqueWithoutPaymentLinkInput[]
    createMany?: BillPaymentCreateManyPaymentLinkInputEnvelope
    set?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    disconnect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    delete?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    update?: BillPaymentUpdateWithWhereUniqueWithoutPaymentLinkInput | BillPaymentUpdateWithWhereUniqueWithoutPaymentLinkInput[]
    updateMany?: BillPaymentUpdateManyWithWhereWithoutPaymentLinkInput | BillPaymentUpdateManyWithWhereWithoutPaymentLinkInput[]
    deleteMany?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
  }

  export type BillPaymentUncheckedUpdateManyWithoutPaymentLinkNestedInput = {
    create?: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput> | BillPaymentCreateWithoutPaymentLinkInput[] | BillPaymentUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: BillPaymentCreateOrConnectWithoutPaymentLinkInput | BillPaymentCreateOrConnectWithoutPaymentLinkInput[]
    upsert?: BillPaymentUpsertWithWhereUniqueWithoutPaymentLinkInput | BillPaymentUpsertWithWhereUniqueWithoutPaymentLinkInput[]
    createMany?: BillPaymentCreateManyPaymentLinkInputEnvelope
    set?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    disconnect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    delete?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    connect?: BillPaymentWhereUniqueInput | BillPaymentWhereUniqueInput[]
    update?: BillPaymentUpdateWithWhereUniqueWithoutPaymentLinkInput | BillPaymentUpdateWithWhereUniqueWithoutPaymentLinkInput[]
    updateMany?: BillPaymentUpdateManyWithWhereWithoutPaymentLinkInput | BillPaymentUpdateManyWithWhereWithoutPaymentLinkInput[]
    deleteMany?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
  }

  export type PropertyBillCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<PropertyBillCreateWithoutPaymentsInput, PropertyBillUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutPaymentsInput
    connect?: PropertyBillWhereUniqueInput
  }

  export type PaymentLinkCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<PaymentLinkCreateWithoutPaymentsInput, PaymentLinkUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutPaymentsInput
    connect?: PaymentLinkWhereUniqueInput
  }

  export type PropertyBillUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<PropertyBillCreateWithoutPaymentsInput, PropertyBillUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PropertyBillCreateOrConnectWithoutPaymentsInput
    upsert?: PropertyBillUpsertWithoutPaymentsInput
    connect?: PropertyBillWhereUniqueInput
    update?: XOR<XOR<PropertyBillUpdateToOneWithWhereWithoutPaymentsInput, PropertyBillUpdateWithoutPaymentsInput>, PropertyBillUncheckedUpdateWithoutPaymentsInput>
  }

  export type PaymentLinkUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<PaymentLinkCreateWithoutPaymentsInput, PaymentLinkUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutPaymentsInput
    upsert?: PaymentLinkUpsertWithoutPaymentsInput
    disconnect?: PaymentLinkWhereInput | boolean
    delete?: PaymentLinkWhereInput | boolean
    connect?: PaymentLinkWhereUniqueInput
    update?: XOR<XOR<PaymentLinkUpdateToOneWithWhereWithoutPaymentsInput, PaymentLinkUpdateWithoutPaymentsInput>, PaymentLinkUncheckedUpdateWithoutPaymentsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type PropertyBillCreateWithoutSupersededBillsInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBy?: PropertyBillCreateNestedOneWithoutSupersededBillsInput
    paymentLinks?: PaymentLinkCreateNestedManyWithoutBillInput
    payments?: BillPaymentCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUncheckedCreateWithoutSupersededBillsInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    supersedesBillId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    paymentLinks?: PaymentLinkUncheckedCreateNestedManyWithoutBillInput
    payments?: BillPaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type PropertyBillCreateOrConnectWithoutSupersededBillsInput = {
    where: PropertyBillWhereUniqueInput
    create: XOR<PropertyBillCreateWithoutSupersededBillsInput, PropertyBillUncheckedCreateWithoutSupersededBillsInput>
  }

  export type PropertyBillCreateWithoutSupersededByInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBills?: PropertyBillCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkCreateNestedManyWithoutBillInput
    payments?: BillPaymentCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUncheckedCreateWithoutSupersededByInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBills?: PropertyBillUncheckedCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkUncheckedCreateNestedManyWithoutBillInput
    payments?: BillPaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type PropertyBillCreateOrConnectWithoutSupersededByInput = {
    where: PropertyBillWhereUniqueInput
    create: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput>
  }

  export type PropertyBillCreateManySupersededByInputEnvelope = {
    data: PropertyBillCreateManySupersededByInput | PropertyBillCreateManySupersededByInput[]
    skipDuplicates?: boolean
  }

  export type PaymentLinkCreateWithoutBillInput = {
    id?: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
    payments?: BillPaymentCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkUncheckedCreateWithoutBillInput = {
    id?: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
    payments?: BillPaymentUncheckedCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkCreateOrConnectWithoutBillInput = {
    where: PaymentLinkWhereUniqueInput
    create: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput>
  }

  export type PaymentLinkCreateManyBillInputEnvelope = {
    data: PaymentLinkCreateManyBillInput | PaymentLinkCreateManyBillInput[]
    skipDuplicates?: boolean
  }

  export type BillPaymentCreateWithoutBillInput = {
    id?: string
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
    paymentLink?: PaymentLinkCreateNestedOneWithoutPaymentsInput
  }

  export type BillPaymentUncheckedCreateWithoutBillInput = {
    id?: string
    paymentLinkId?: string | null
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type BillPaymentCreateOrConnectWithoutBillInput = {
    where: BillPaymentWhereUniqueInput
    create: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput>
  }

  export type BillPaymentCreateManyBillInputEnvelope = {
    data: BillPaymentCreateManyBillInput | BillPaymentCreateManyBillInput[]
    skipDuplicates?: boolean
  }

  export type PropertyBillUpsertWithoutSupersededBillsInput = {
    update: XOR<PropertyBillUpdateWithoutSupersededBillsInput, PropertyBillUncheckedUpdateWithoutSupersededBillsInput>
    create: XOR<PropertyBillCreateWithoutSupersededBillsInput, PropertyBillUncheckedCreateWithoutSupersededBillsInput>
    where?: PropertyBillWhereInput
  }

  export type PropertyBillUpdateToOneWithWhereWithoutSupersededBillsInput = {
    where?: PropertyBillWhereInput
    data: XOR<PropertyBillUpdateWithoutSupersededBillsInput, PropertyBillUncheckedUpdateWithoutSupersededBillsInput>
  }

  export type PropertyBillUpdateWithoutSupersededBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBy?: PropertyBillUpdateOneWithoutSupersededBillsNestedInput
    paymentLinks?: PaymentLinkUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateWithoutSupersededBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    supersedesBillId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    paymentLinks?: PaymentLinkUncheckedUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUpsertWithWhereUniqueWithoutSupersededByInput = {
    where: PropertyBillWhereUniqueInput
    update: XOR<PropertyBillUpdateWithoutSupersededByInput, PropertyBillUncheckedUpdateWithoutSupersededByInput>
    create: XOR<PropertyBillCreateWithoutSupersededByInput, PropertyBillUncheckedCreateWithoutSupersededByInput>
  }

  export type PropertyBillUpdateWithWhereUniqueWithoutSupersededByInput = {
    where: PropertyBillWhereUniqueInput
    data: XOR<PropertyBillUpdateWithoutSupersededByInput, PropertyBillUncheckedUpdateWithoutSupersededByInput>
  }

  export type PropertyBillUpdateManyWithWhereWithoutSupersededByInput = {
    where: PropertyBillScalarWhereInput
    data: XOR<PropertyBillUpdateManyMutationInput, PropertyBillUncheckedUpdateManyWithoutSupersededByInput>
  }

  export type PropertyBillScalarWhereInput = {
    AND?: PropertyBillScalarWhereInput | PropertyBillScalarWhereInput[]
    OR?: PropertyBillScalarWhereInput[]
    NOT?: PropertyBillScalarWhereInput | PropertyBillScalarWhereInput[]
    id?: UuidFilter<"PropertyBill"> | string
    billNumber?: StringFilter<"PropertyBill"> | string
    propertyId?: UuidFilter<"PropertyBill"> | string
    ratepayerId?: UuidFilter<"PropertyBill"> | string
    concessionId?: UuidFilter<"PropertyBill"> | string
    issuedByPersonnelId?: StringNullableFilter<"PropertyBill"> | string | null
    supersedesBillId?: UuidNullableFilter<"PropertyBill"> | string | null
    billingPeriod?: StringFilter<"PropertyBill"> | string
    billType?: StringFilter<"PropertyBill"> | string
    currency?: StringFilter<"PropertyBill"> | string
    amountDue?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFilter<"PropertyBill"> | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFilter<"PropertyBill"> | string
    issuedAt?: DateTimeFilter<"PropertyBill"> | Date | string
    dueDate?: DateTimeFilter<"PropertyBill"> | Date | string
    externalBillRef?: StringFilter<"PropertyBill"> | string
  }

  export type PaymentLinkUpsertWithWhereUniqueWithoutBillInput = {
    where: PaymentLinkWhereUniqueInput
    update: XOR<PaymentLinkUpdateWithoutBillInput, PaymentLinkUncheckedUpdateWithoutBillInput>
    create: XOR<PaymentLinkCreateWithoutBillInput, PaymentLinkUncheckedCreateWithoutBillInput>
  }

  export type PaymentLinkUpdateWithWhereUniqueWithoutBillInput = {
    where: PaymentLinkWhereUniqueInput
    data: XOR<PaymentLinkUpdateWithoutBillInput, PaymentLinkUncheckedUpdateWithoutBillInput>
  }

  export type PaymentLinkUpdateManyWithWhereWithoutBillInput = {
    where: PaymentLinkScalarWhereInput
    data: XOR<PaymentLinkUpdateManyMutationInput, PaymentLinkUncheckedUpdateManyWithoutBillInput>
  }

  export type PaymentLinkScalarWhereInput = {
    AND?: PaymentLinkScalarWhereInput | PaymentLinkScalarWhereInput[]
    OR?: PaymentLinkScalarWhereInput[]
    NOT?: PaymentLinkScalarWhereInput | PaymentLinkScalarWhereInput[]
    id?: UuidFilter<"PaymentLink"> | string
    billId?: UuidFilter<"PaymentLink"> | string
    amountFixed?: DecimalFilter<"PaymentLink"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"PaymentLink"> | string
    expiresAt?: DateTimeFilter<"PaymentLink"> | Date | string
    gatewayLinkRef?: StringFilter<"PaymentLink"> | string
    createdAt?: DateTimeFilter<"PaymentLink"> | Date | string
  }

  export type BillPaymentUpsertWithWhereUniqueWithoutBillInput = {
    where: BillPaymentWhereUniqueInput
    update: XOR<BillPaymentUpdateWithoutBillInput, BillPaymentUncheckedUpdateWithoutBillInput>
    create: XOR<BillPaymentCreateWithoutBillInput, BillPaymentUncheckedCreateWithoutBillInput>
  }

  export type BillPaymentUpdateWithWhereUniqueWithoutBillInput = {
    where: BillPaymentWhereUniqueInput
    data: XOR<BillPaymentUpdateWithoutBillInput, BillPaymentUncheckedUpdateWithoutBillInput>
  }

  export type BillPaymentUpdateManyWithWhereWithoutBillInput = {
    where: BillPaymentScalarWhereInput
    data: XOR<BillPaymentUpdateManyMutationInput, BillPaymentUncheckedUpdateManyWithoutBillInput>
  }

  export type BillPaymentScalarWhereInput = {
    AND?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
    OR?: BillPaymentScalarWhereInput[]
    NOT?: BillPaymentScalarWhereInput | BillPaymentScalarWhereInput[]
    id?: UuidFilter<"BillPayment"> | string
    billId?: UuidFilter<"BillPayment"> | string
    paymentLinkId?: UuidNullableFilter<"BillPayment"> | string | null
    paidByRatepayerId?: UuidNullableFilter<"BillPayment"> | string | null
    clientEventId?: UuidFilter<"BillPayment"> | string
    externalPaymentRef?: StringFilter<"BillPayment"> | string
    paymentType?: StringFilter<"BillPayment"> | string
    amount?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFilter<"BillPayment"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"BillPayment"> | string
    paidAt?: DateTimeFilter<"BillPayment"> | Date | string
    receivedAt?: DateTimeFilter<"BillPayment"> | Date | string
  }

  export type PropertyBillCreateWithoutPaymentLinksInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBy?: PropertyBillCreateNestedOneWithoutSupersededBillsInput
    supersededBills?: PropertyBillCreateNestedManyWithoutSupersededByInput
    payments?: BillPaymentCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUncheckedCreateWithoutPaymentLinksInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    supersedesBillId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBills?: PropertyBillUncheckedCreateNestedManyWithoutSupersededByInput
    payments?: BillPaymentUncheckedCreateNestedManyWithoutBillInput
  }

  export type PropertyBillCreateOrConnectWithoutPaymentLinksInput = {
    where: PropertyBillWhereUniqueInput
    create: XOR<PropertyBillCreateWithoutPaymentLinksInput, PropertyBillUncheckedCreateWithoutPaymentLinksInput>
  }

  export type BillPaymentCreateWithoutPaymentLinkInput = {
    id?: string
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
    bill: PropertyBillCreateNestedOneWithoutPaymentsInput
  }

  export type BillPaymentUncheckedCreateWithoutPaymentLinkInput = {
    id?: string
    billId: string
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type BillPaymentCreateOrConnectWithoutPaymentLinkInput = {
    where: BillPaymentWhereUniqueInput
    create: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput>
  }

  export type BillPaymentCreateManyPaymentLinkInputEnvelope = {
    data: BillPaymentCreateManyPaymentLinkInput | BillPaymentCreateManyPaymentLinkInput[]
    skipDuplicates?: boolean
  }

  export type PropertyBillUpsertWithoutPaymentLinksInput = {
    update: XOR<PropertyBillUpdateWithoutPaymentLinksInput, PropertyBillUncheckedUpdateWithoutPaymentLinksInput>
    create: XOR<PropertyBillCreateWithoutPaymentLinksInput, PropertyBillUncheckedCreateWithoutPaymentLinksInput>
    where?: PropertyBillWhereInput
  }

  export type PropertyBillUpdateToOneWithWhereWithoutPaymentLinksInput = {
    where?: PropertyBillWhereInput
    data: XOR<PropertyBillUpdateWithoutPaymentLinksInput, PropertyBillUncheckedUpdateWithoutPaymentLinksInput>
  }

  export type PropertyBillUpdateWithoutPaymentLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBy?: PropertyBillUpdateOneWithoutSupersededBillsNestedInput
    supersededBills?: PropertyBillUpdateManyWithoutSupersededByNestedInput
    payments?: BillPaymentUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateWithoutPaymentLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    supersedesBillId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBills?: PropertyBillUncheckedUpdateManyWithoutSupersededByNestedInput
    payments?: BillPaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type BillPaymentUpsertWithWhereUniqueWithoutPaymentLinkInput = {
    where: BillPaymentWhereUniqueInput
    update: XOR<BillPaymentUpdateWithoutPaymentLinkInput, BillPaymentUncheckedUpdateWithoutPaymentLinkInput>
    create: XOR<BillPaymentCreateWithoutPaymentLinkInput, BillPaymentUncheckedCreateWithoutPaymentLinkInput>
  }

  export type BillPaymentUpdateWithWhereUniqueWithoutPaymentLinkInput = {
    where: BillPaymentWhereUniqueInput
    data: XOR<BillPaymentUpdateWithoutPaymentLinkInput, BillPaymentUncheckedUpdateWithoutPaymentLinkInput>
  }

  export type BillPaymentUpdateManyWithWhereWithoutPaymentLinkInput = {
    where: BillPaymentScalarWhereInput
    data: XOR<BillPaymentUpdateManyMutationInput, BillPaymentUncheckedUpdateManyWithoutPaymentLinkInput>
  }

  export type PropertyBillCreateWithoutPaymentsInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBy?: PropertyBillCreateNestedOneWithoutSupersededBillsInput
    supersededBills?: PropertyBillCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkCreateNestedManyWithoutBillInput
  }

  export type PropertyBillUncheckedCreateWithoutPaymentsInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    supersedesBillId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
    supersededBills?: PropertyBillUncheckedCreateNestedManyWithoutSupersededByInput
    paymentLinks?: PaymentLinkUncheckedCreateNestedManyWithoutBillInput
  }

  export type PropertyBillCreateOrConnectWithoutPaymentsInput = {
    where: PropertyBillWhereUniqueInput
    create: XOR<PropertyBillCreateWithoutPaymentsInput, PropertyBillUncheckedCreateWithoutPaymentsInput>
  }

  export type PaymentLinkCreateWithoutPaymentsInput = {
    id?: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
    bill: PropertyBillCreateNestedOneWithoutPaymentLinksInput
  }

  export type PaymentLinkUncheckedCreateWithoutPaymentsInput = {
    id?: string
    billId: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
  }

  export type PaymentLinkCreateOrConnectWithoutPaymentsInput = {
    where: PaymentLinkWhereUniqueInput
    create: XOR<PaymentLinkCreateWithoutPaymentsInput, PaymentLinkUncheckedCreateWithoutPaymentsInput>
  }

  export type PropertyBillUpsertWithoutPaymentsInput = {
    update: XOR<PropertyBillUpdateWithoutPaymentsInput, PropertyBillUncheckedUpdateWithoutPaymentsInput>
    create: XOR<PropertyBillCreateWithoutPaymentsInput, PropertyBillUncheckedCreateWithoutPaymentsInput>
    where?: PropertyBillWhereInput
  }

  export type PropertyBillUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: PropertyBillWhereInput
    data: XOR<PropertyBillUpdateWithoutPaymentsInput, PropertyBillUncheckedUpdateWithoutPaymentsInput>
  }

  export type PropertyBillUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBy?: PropertyBillUpdateOneWithoutSupersededBillsNestedInput
    supersededBills?: PropertyBillUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    supersedesBillId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBills?: PropertyBillUncheckedUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUncheckedUpdateManyWithoutBillNestedInput
  }

  export type PaymentLinkUpsertWithoutPaymentsInput = {
    update: XOR<PaymentLinkUpdateWithoutPaymentsInput, PaymentLinkUncheckedUpdateWithoutPaymentsInput>
    create: XOR<PaymentLinkCreateWithoutPaymentsInput, PaymentLinkUncheckedCreateWithoutPaymentsInput>
    where?: PaymentLinkWhereInput
  }

  export type PaymentLinkUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: PaymentLinkWhereInput
    data: XOR<PaymentLinkUpdateWithoutPaymentsInput, PaymentLinkUncheckedUpdateWithoutPaymentsInput>
  }

  export type PaymentLinkUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: PropertyBillUpdateOneRequiredWithoutPaymentLinksNestedInput
  }

  export type PaymentLinkUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyBillCreateManySupersededByInput = {
    id?: string
    billNumber: string
    propertyId: string
    ratepayerId: string
    concessionId: string
    issuedByPersonnelId?: string | null
    billingPeriod: string
    billType?: string
    currency?: string
    amountDue: Decimal | DecimalJsLike | number | string
    amountPaid?: Decimal | DecimalJsLike | number | string
    paymentStatus?: string
    issuedAt?: Date | string
    dueDate: Date | string
    externalBillRef: string
  }

  export type PaymentLinkCreateManyBillInput = {
    id?: string
    amountFixed: Decimal | DecimalJsLike | number | string
    status?: string
    expiresAt: Date | string
    gatewayLinkRef: string
    createdAt?: Date | string
  }

  export type BillPaymentCreateManyBillInput = {
    id?: string
    paymentLinkId?: string | null
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type PropertyBillUpdateWithoutSupersededByInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBills?: PropertyBillUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateWithoutSupersededByInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
    supersededBills?: PropertyBillUncheckedUpdateManyWithoutSupersededByNestedInput
    paymentLinks?: PaymentLinkUncheckedUpdateManyWithoutBillNestedInput
    payments?: BillPaymentUncheckedUpdateManyWithoutBillNestedInput
  }

  export type PropertyBillUncheckedUpdateManyWithoutSupersededByInput = {
    id?: StringFieldUpdateOperationsInput | string
    billNumber?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    ratepayerId?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    issuedByPersonnelId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    billType?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    amountDue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amountPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    externalBillRef?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentLinkUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: BillPaymentUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkUncheckedUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: BillPaymentUncheckedUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkUncheckedUpdateManyWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountFixed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gatewayLinkRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentLink?: PaymentLinkUpdateOneWithoutPaymentsNestedInput
  }

  export type BillPaymentUncheckedUpdateWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentUncheckedUpdateManyWithoutBillInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentCreateManyPaymentLinkInput = {
    id?: string
    billId: string
    paidByRatepayerId?: string | null
    clientEventId: string
    externalPaymentRef: string
    paymentType?: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAtPayment: Decimal | DecimalJsLike | number | string
    status?: string
    paidAt: Date | string
    receivedAt?: Date | string
  }

  export type BillPaymentUpdateWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bill?: PropertyBillUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type BillPaymentUncheckedUpdateWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillPaymentUncheckedUpdateManyWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    billId?: StringFieldUpdateOperationsInput | string
    paidByRatepayerId?: NullableStringFieldUpdateOperationsInput | string | null
    clientEventId?: StringFieldUpdateOperationsInput | string
    externalPaymentRef?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAtPayment?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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