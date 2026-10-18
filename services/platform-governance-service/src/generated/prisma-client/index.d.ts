
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Resource
 * 
 */
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model RolePermission
 * 
 */
export type RolePermission = $Result.DefaultSelection<Prisma.$RolePermissionPayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>
/**
 * Model UserSocialConnection
 * 
 */
export type UserSocialConnection = $Result.DefaultSelection<Prisma.$UserSocialConnectionPayload>
/**
 * Model Concession
 * 
 */
export type Concession = $Result.DefaultSelection<Prisma.$ConcessionPayload>
/**
 * Model ConcessionAssembly
 * 
 */
export type ConcessionAssembly = $Result.DefaultSelection<Prisma.$ConcessionAssemblyPayload>
/**
 * Model ConcessionPersonnel
 * 
 */
export type ConcessionPersonnel = $Result.DefaultSelection<Prisma.$ConcessionPersonnelPayload>
/**
 * Model ApiClient
 * 
 */
export type ApiClient = $Result.DefaultSelection<Prisma.$ApiClientPayload>
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
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resources
    * const resources = await prisma.resource.findMany()
    * ```
    */
  get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePermissions
    * const rolePermissions = await prisma.rolePermission.findMany()
    * ```
    */
  get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSocialConnection`: Exposes CRUD operations for the **UserSocialConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSocialConnections
    * const userSocialConnections = await prisma.userSocialConnection.findMany()
    * ```
    */
  get userSocialConnection(): Prisma.UserSocialConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concession`: Exposes CRUD operations for the **Concession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Concessions
    * const concessions = await prisma.concession.findMany()
    * ```
    */
  get concession(): Prisma.ConcessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concessionAssembly`: Exposes CRUD operations for the **ConcessionAssembly** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConcessionAssemblies
    * const concessionAssemblies = await prisma.concessionAssembly.findMany()
    * ```
    */
  get concessionAssembly(): Prisma.ConcessionAssemblyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concessionPersonnel`: Exposes CRUD operations for the **ConcessionPersonnel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConcessionPersonnels
    * const concessionPersonnels = await prisma.concessionPersonnel.findMany()
    * ```
    */
  get concessionPersonnel(): Prisma.ConcessionPersonnelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiClient`: Exposes CRUD operations for the **ApiClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiClients
    * const apiClients = await prisma.apiClient.findMany()
    * ```
    */
  get apiClient(): Prisma.ApiClientDelegate<ExtArgs, ClientOptions>;

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
    User: 'User',
    Role: 'Role',
    Resource: 'Resource',
    Permission: 'Permission',
    RolePermission: 'RolePermission',
    UserRole: 'UserRole',
    UserSocialConnection: 'UserSocialConnection',
    Concession: 'Concession',
    ConcessionAssembly: 'ConcessionAssembly',
    ConcessionPersonnel: 'ConcessionPersonnel',
    ApiClient: 'ApiClient',
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
      modelProps: "user" | "role" | "resource" | "permission" | "rolePermission" | "userRole" | "userSocialConnection" | "concession" | "concessionAssembly" | "concessionPersonnel" | "apiClient" | "outboxEvent" | "inboxMessage" | "idempotencyRecord" | "auditRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Resource: {
        payload: Prisma.$ResourcePayload<ExtArgs>
        fields: Prisma.ResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findFirst: {
            args: Prisma.ResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findMany: {
            args: Prisma.ResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          create: {
            args: Prisma.ResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          createMany: {
            args: Prisma.ResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          delete: {
            args: Prisma.ResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          update: {
            args: Prisma.ResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          deleteMany: {
            args: Prisma.ResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          upsert: {
            args: Prisma.ResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          aggregate: {
            args: Prisma.ResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResource>
          }
          groupBy: {
            args: Prisma.ResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      RolePermission: {
        payload: Prisma.$RolePermissionPayload<ExtArgs>
        fields: Prisma.RolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findFirst: {
            args: Prisma.RolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          findMany: {
            args: Prisma.RolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          create: {
            args: Prisma.RolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          createMany: {
            args: Prisma.RolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          delete: {
            args: Prisma.RolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          update: {
            args: Prisma.RolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.RolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.RolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePermissionPayload>
          }
          aggregate: {
            args: Prisma.RolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePermission>
          }
          groupBy: {
            args: Prisma.RolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RolePermissionCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
      UserSocialConnection: {
        payload: Prisma.$UserSocialConnectionPayload<ExtArgs>
        fields: Prisma.UserSocialConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSocialConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSocialConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          findFirst: {
            args: Prisma.UserSocialConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSocialConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          findMany: {
            args: Prisma.UserSocialConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>[]
          }
          create: {
            args: Prisma.UserSocialConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          createMany: {
            args: Prisma.UserSocialConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSocialConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>[]
          }
          delete: {
            args: Prisma.UserSocialConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          update: {
            args: Prisma.UserSocialConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          deleteMany: {
            args: Prisma.UserSocialConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSocialConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSocialConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>[]
          }
          upsert: {
            args: Prisma.UserSocialConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialConnectionPayload>
          }
          aggregate: {
            args: Prisma.UserSocialConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSocialConnection>
          }
          groupBy: {
            args: Prisma.UserSocialConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSocialConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSocialConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSocialConnectionCountAggregateOutputType> | number
          }
        }
      }
      Concession: {
        payload: Prisma.$ConcessionPayload<ExtArgs>
        fields: Prisma.ConcessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConcessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConcessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          findFirst: {
            args: Prisma.ConcessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConcessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          findMany: {
            args: Prisma.ConcessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>[]
          }
          create: {
            args: Prisma.ConcessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          createMany: {
            args: Prisma.ConcessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConcessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>[]
          }
          delete: {
            args: Prisma.ConcessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          update: {
            args: Prisma.ConcessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          deleteMany: {
            args: Prisma.ConcessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConcessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConcessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>[]
          }
          upsert: {
            args: Prisma.ConcessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPayload>
          }
          aggregate: {
            args: Prisma.ConcessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConcession>
          }
          groupBy: {
            args: Prisma.ConcessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConcessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConcessionCountArgs<ExtArgs>
            result: $Utils.Optional<ConcessionCountAggregateOutputType> | number
          }
        }
      }
      ConcessionAssembly: {
        payload: Prisma.$ConcessionAssemblyPayload<ExtArgs>
        fields: Prisma.ConcessionAssemblyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConcessionAssemblyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConcessionAssemblyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          findFirst: {
            args: Prisma.ConcessionAssemblyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConcessionAssemblyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          findMany: {
            args: Prisma.ConcessionAssemblyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>[]
          }
          create: {
            args: Prisma.ConcessionAssemblyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          createMany: {
            args: Prisma.ConcessionAssemblyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConcessionAssemblyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>[]
          }
          delete: {
            args: Prisma.ConcessionAssemblyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          update: {
            args: Prisma.ConcessionAssemblyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          deleteMany: {
            args: Prisma.ConcessionAssemblyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConcessionAssemblyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConcessionAssemblyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>[]
          }
          upsert: {
            args: Prisma.ConcessionAssemblyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionAssemblyPayload>
          }
          aggregate: {
            args: Prisma.ConcessionAssemblyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConcessionAssembly>
          }
          groupBy: {
            args: Prisma.ConcessionAssemblyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConcessionAssemblyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConcessionAssemblyCountArgs<ExtArgs>
            result: $Utils.Optional<ConcessionAssemblyCountAggregateOutputType> | number
          }
        }
      }
      ConcessionPersonnel: {
        payload: Prisma.$ConcessionPersonnelPayload<ExtArgs>
        fields: Prisma.ConcessionPersonnelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConcessionPersonnelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConcessionPersonnelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          findFirst: {
            args: Prisma.ConcessionPersonnelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConcessionPersonnelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          findMany: {
            args: Prisma.ConcessionPersonnelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>[]
          }
          create: {
            args: Prisma.ConcessionPersonnelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          createMany: {
            args: Prisma.ConcessionPersonnelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConcessionPersonnelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>[]
          }
          delete: {
            args: Prisma.ConcessionPersonnelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          update: {
            args: Prisma.ConcessionPersonnelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          deleteMany: {
            args: Prisma.ConcessionPersonnelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConcessionPersonnelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConcessionPersonnelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>[]
          }
          upsert: {
            args: Prisma.ConcessionPersonnelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcessionPersonnelPayload>
          }
          aggregate: {
            args: Prisma.ConcessionPersonnelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConcessionPersonnel>
          }
          groupBy: {
            args: Prisma.ConcessionPersonnelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConcessionPersonnelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConcessionPersonnelCountArgs<ExtArgs>
            result: $Utils.Optional<ConcessionPersonnelCountAggregateOutputType> | number
          }
        }
      }
      ApiClient: {
        payload: Prisma.$ApiClientPayload<ExtArgs>
        fields: Prisma.ApiClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          findFirst: {
            args: Prisma.ApiClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          findMany: {
            args: Prisma.ApiClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>[]
          }
          create: {
            args: Prisma.ApiClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          createMany: {
            args: Prisma.ApiClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>[]
          }
          delete: {
            args: Prisma.ApiClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          update: {
            args: Prisma.ApiClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          deleteMany: {
            args: Prisma.ApiClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>[]
          }
          upsert: {
            args: Prisma.ApiClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiClientPayload>
          }
          aggregate: {
            args: Prisma.ApiClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiClient>
          }
          groupBy: {
            args: Prisma.ApiClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiClientCountArgs<ExtArgs>
            result: $Utils.Optional<ApiClientCountAggregateOutputType> | number
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
    user?: UserOmit
    role?: RoleOmit
    resource?: ResourceOmit
    permission?: PermissionOmit
    rolePermission?: RolePermissionOmit
    userRole?: UserRoleOmit
    userSocialConnection?: UserSocialConnectionOmit
    concession?: ConcessionOmit
    concessionAssembly?: ConcessionAssemblyOmit
    concessionPersonnel?: ConcessionPersonnelOmit
    apiClient?: ApiClientOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    socialConnections: number
    userRoles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialConnections?: boolean | UserCountOutputTypeCountSocialConnectionsArgs
    userRoles?: boolean | UserCountOutputTypeCountUserRolesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSocialConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSocialConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    rolePermissions: number
    userRoles: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | RoleCountOutputTypeCountRolePermissionsArgs
    userRoles?: boolean | RoleCountOutputTypeCountUserRolesArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountRolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUserRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }


  /**
   * Count Type ResourceCountOutputType
   */

  export type ResourceCountOutputType = {
    permissions: number
  }

  export type ResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | ResourceCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCountOutputType
     */
    select?: ResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    rolePermissions: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | PermissionCountOutputTypeCountRolePermissionsArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
  }


  /**
   * Count Type ConcessionCountOutputType
   */

  export type ConcessionCountOutputType = {
    assemblies: number
    personnel: number
    apiClients: number
  }

  export type ConcessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assemblies?: boolean | ConcessionCountOutputTypeCountAssembliesArgs
    personnel?: boolean | ConcessionCountOutputTypeCountPersonnelArgs
    apiClients?: boolean | ConcessionCountOutputTypeCountApiClientsArgs
  }

  // Custom InputTypes
  /**
   * ConcessionCountOutputType without action
   */
  export type ConcessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionCountOutputType
     */
    select?: ConcessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConcessionCountOutputType without action
   */
  export type ConcessionCountOutputTypeCountAssembliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionAssemblyWhereInput
  }

  /**
   * ConcessionCountOutputType without action
   */
  export type ConcessionCountOutputTypeCountPersonnelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionPersonnelWhereInput
  }

  /**
   * ConcessionCountOutputType without action
   */
  export type ConcessionCountOutputTypeCountApiClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiClientWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    code: string | null
    zitadelId: string | null
    countryId: string | null
    email: string | null
    fullName: string | null
    phone: string | null
    status: string | null
    invitedAt: Date | null
    invitedViaStub: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    code: string | null
    zitadelId: string | null
    countryId: string | null
    email: string | null
    fullName: string | null
    phone: string | null
    status: string | null
    invitedAt: Date | null
    invitedViaStub: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    code: number
    zitadelId: number
    countryId: number
    email: number
    fullName: number
    phone: number
    status: number
    invitedAt: number
    invitedViaStub: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    code?: true
    zitadelId?: true
    countryId?: true
    email?: true
    fullName?: true
    phone?: true
    status?: true
    invitedAt?: true
    invitedViaStub?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    code?: true
    zitadelId?: true
    countryId?: true
    email?: true
    fullName?: true
    phone?: true
    status?: true
    invitedAt?: true
    invitedViaStub?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    code?: true
    zitadelId?: true
    countryId?: true
    email?: true
    fullName?: true
    phone?: true
    status?: true
    invitedAt?: true
    invitedViaStub?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    code: string
    zitadelId: string
    countryId: string | null
    email: string
    fullName: string
    phone: string | null
    status: string
    invitedAt: Date | null
    invitedViaStub: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    zitadelId?: boolean
    countryId?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    invitedAt?: boolean
    invitedViaStub?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    socialConnections?: boolean | User$socialConnectionsArgs<ExtArgs>
    userRoles?: boolean | User$userRolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    zitadelId?: boolean
    countryId?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    invitedAt?: boolean
    invitedViaStub?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    zitadelId?: boolean
    countryId?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    invitedAt?: boolean
    invitedViaStub?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    code?: boolean
    zitadelId?: boolean
    countryId?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    invitedAt?: boolean
    invitedViaStub?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "zitadelId" | "countryId" | "email" | "fullName" | "phone" | "status" | "invitedAt" | "invitedViaStub" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialConnections?: boolean | User$socialConnectionsArgs<ExtArgs>
    userRoles?: boolean | User$userRolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      socialConnections: Prisma.$UserSocialConnectionPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      zitadelId: string
      countryId: string | null
      email: string
      fullName: string
      phone: string | null
      status: string
      invitedAt: Date | null
      invitedViaStub: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialConnections<T extends User$socialConnectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$socialConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends User$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, User$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly code: FieldRef<"User", 'String'>
    readonly zitadelId: FieldRef<"User", 'String'>
    readonly countryId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly invitedAt: FieldRef<"User", 'DateTime'>
    readonly invitedViaStub: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.socialConnections
   */
  export type User$socialConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    where?: UserSocialConnectionWhereInput
    orderBy?: UserSocialConnectionOrderByWithRelationInput | UserSocialConnectionOrderByWithRelationInput[]
    cursor?: UserSocialConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSocialConnectionScalarFieldEnum | UserSocialConnectionScalarFieldEnum[]
  }

  /**
   * User.userRoles
   */
  export type User$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type RoleSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    scopeLevel: string | null
    isSystem: boolean | null
    status: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    scopeLevel: string | null
    isSystem: boolean | null
    status: string | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    scopeLevel: number
    isSystem: number
    status: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    sortOrder?: true
  }

  export type RoleSumAggregateInputType = {
    sortOrder?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    scopeLevel?: true
    isSystem?: true
    status?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    scopeLevel?: true
    isSystem?: true
    status?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    scopeLevel?: true
    isSystem?: true
    status?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    scopeLevel: string
    isSystem: boolean
    status: string
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    scopeLevel?: boolean
    isSystem?: boolean
    status?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rolePermissions?: boolean | Role$rolePermissionsArgs<ExtArgs>
    userRoles?: boolean | Role$userRolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    scopeLevel?: boolean
    isSystem?: boolean
    status?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    scopeLevel?: boolean
    isSystem?: boolean
    status?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    scopeLevel?: boolean
    isSystem?: boolean
    status?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "scopeLevel" | "isSystem" | "status" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | Role$rolePermissionsArgs<ExtArgs>
    userRoles?: boolean | Role$userRolesArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      rolePermissions: Prisma.$RolePermissionPayload<ExtArgs>[]
      userRoles: Prisma.$UserRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      scopeLevel: string
      isSystem: boolean
      status: string
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
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
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rolePermissions<T extends Role$rolePermissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$rolePermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userRoles<T extends Role$userRolesArgs<ExtArgs> = {}>(args?: Subset<T, Role$userRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly code: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly scopeLevel: FieldRef<"Role", 'String'>
    readonly isSystem: FieldRef<"Role", 'Boolean'>
    readonly status: FieldRef<"Role", 'String'>
    readonly sortOrder: FieldRef<"Role", 'Int'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.rolePermissions
   */
  export type Role$rolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Role.userRoles
   */
  export type Role$userRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Resource
   */

  export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  export type ResourceAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type ResourceSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type ResourceMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ResourceMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ResourceCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type ResourceAvgAggregateInputType = {
    sortOrder?: true
  }

  export type ResourceSumAggregateInputType = {
    sortOrder?: true
  }

  export type ResourceMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ResourceMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ResourceCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resource to aggregate.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resources
    **/
    _count?: true | ResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceMaxAggregateInputType
  }

  export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResource[P]>
      : GetScalarType<T[P], AggregateResource[P]>
  }




  export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[]
    by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum
    having?: ResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCountAggregateInputType | true
    _avg?: ResourceAvgAggregateInputType
    _sum?: ResourceSumAggregateInputType
    _min?: ResourceMinAggregateInputType
    _max?: ResourceMaxAggregateInputType
  }

  export type ResourceGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    sortOrder: number
    createdAt: Date
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceGroupByOutputType[P]>
        }
      >
    >


  export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    permissions?: boolean | Resource$permissionsArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "sortOrder" | "createdAt", ExtArgs["result"]["resource"]>
  export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | Resource$permissionsArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resource"
    objects: {
      permissions: Prisma.$PermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["resource"]>
    composites: {}
  }

  type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = $Result.GetResult<Prisma.$ResourcePayload, S>

  type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCountAggregateInputType | true
    }

  export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resource'], meta: { name: 'Resource' } }
    /**
     * Find zero or one Resource that matches the filter.
     * @param {ResourceFindUniqueArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceFindUniqueOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resources
     * const resources = await prisma.resource.findMany()
     * 
     * // Get first 10 Resources
     * const resources = await prisma.resource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceWithIdOnly = await prisma.resource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resource.
     * @param {ResourceCreateArgs} args - Arguments to create a Resource.
     * @example
     * // Create one Resource
     * const Resource = await prisma.resource.create({
     *   data: {
     *     // ... data to create a Resource
     *   }
     * })
     * 
     */
    create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resources.
     * @param {ResourceCreateManyArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resources and returns the data saved in the database.
     * @param {ResourceCreateManyAndReturnArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resource.
     * @param {ResourceDeleteArgs} args - Arguments to delete one Resource.
     * @example
     * // Delete one Resource
     * const Resource = await prisma.resource.delete({
     *   where: {
     *     // ... filter to delete one Resource
     *   }
     * })
     * 
     */
    delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resource.
     * @param {ResourceUpdateArgs} args - Arguments to update one Resource.
     * @example
     * // Update one Resource
     * const resource = await prisma.resource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resources.
     * @param {ResourceDeleteManyArgs} args - Arguments to filter Resources to delete.
     * @example
     * // Delete a few Resources
     * const { count } = await prisma.resource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources and returns the data updated in the database.
     * @param {ResourceUpdateManyAndReturnArgs} args - Arguments to update many Resources.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.updateManyAndReturn({
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
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resource.
     * @param {ResourceUpsertArgs} args - Arguments to update or create a Resource.
     * @example
     * // Update or create a Resource
     * const resource = await prisma.resource.upsert({
     *   create: {
     *     // ... data to create a Resource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resource we want to update
     *   }
     * })
     */
    upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCountArgs} args - Arguments to filter Resources to count.
     * @example
     * // Count the number of Resources
     * const count = await prisma.resource.count({
     *   where: {
     *     // ... the filter for the Resources we want to count
     *   }
     * })
    **/
    count<T extends ResourceCountArgs>(
      args?: Subset<T, ResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>

    /**
     * Group by Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceGroupByArgs} args - Group by arguments.
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
      T extends ResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceGroupByArgs['orderBy'] }
        : { orderBy?: ResourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resource model
   */
  readonly fields: ResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends Resource$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Resource$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Resource model
   */
  interface ResourceFieldRefs {
    readonly id: FieldRef<"Resource", 'String'>
    readonly code: FieldRef<"Resource", 'String'>
    readonly name: FieldRef<"Resource", 'String'>
    readonly description: FieldRef<"Resource", 'String'>
    readonly sortOrder: FieldRef<"Resource", 'Int'>
    readonly createdAt: FieldRef<"Resource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resource findUnique
   */
  export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findUniqueOrThrow
   */
  export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findFirst
   */
  export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findFirstOrThrow
   */
  export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findMany
   */
  export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resources to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource create
   */
  export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Resource.
     */
    data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
  }

  /**
   * Resource createMany
   */
  export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource createManyAndReturn
   */
  export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource update
   */
  export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Resource.
     */
    data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
    /**
     * Choose, which Resource to update.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource updateMany
   */
  export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource updateManyAndReturn
   */
  export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource upsert
   */
  export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Resource to update in case it exists.
     */
    where: ResourceWhereUniqueInput
    /**
     * In case the Resource found by the `where` argument doesn't exist, create a new Resource with this data.
     */
    create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
    /**
     * In case the Resource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
  }

  /**
   * Resource delete
   */
  export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter which Resource to delete.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource deleteMany
   */
  export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resources to delete
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to delete.
     */
    limit?: number
  }

  /**
   * Resource.permissions
   */
  export type Resource$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    cursor?: PermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Resource without action
   */
  export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    resourceId: string | null
    action: string | null
    code: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    resourceId: string | null
    action: string | null
    code: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    resourceId: number
    action: number
    code: number
    description: number
    createdAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    resourceId?: true
    action?: true
    code?: true
    description?: true
    createdAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    resourceId?: true
    action?: true
    code?: true
    description?: true
    createdAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    resourceId?: true
    action?: true
    code?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    resourceId: string
    action: string
    code: string
    description: string | null
    createdAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    action?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    rolePermissions?: boolean | Permission$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    action?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    action?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    resourceId?: boolean
    action?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceId" | "action" | "code" | "description" | "createdAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    rolePermissions?: boolean | Permission$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      resource: Prisma.$ResourcePayload<ExtArgs>
      rolePermissions: Prisma.$RolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resourceId: string
      action: string
      code: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
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
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
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
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resource<T extends ResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceDefaultArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rolePermissions<T extends Permission$rolePermissionsArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolePermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly resourceId: FieldRef<"Permission", 'String'>
    readonly action: FieldRef<"Permission", 'String'>
    readonly code: FieldRef<"Permission", 'String'>
    readonly description: FieldRef<"Permission", 'String'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.rolePermissions
   */
  export type Permission$rolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    cursor?: RolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model RolePermission
   */

  export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  export type RolePermissionMinAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
    grantedBy: string | null
    grantedAt: Date | null
  }

  export type RolePermissionMaxAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
    grantedBy: string | null
    grantedAt: Date | null
  }

  export type RolePermissionCountAggregateOutputType = {
    roleId: number
    permissionId: number
    grantedBy: number
    grantedAt: number
    _all: number
  }


  export type RolePermissionMinAggregateInputType = {
    roleId?: true
    permissionId?: true
    grantedBy?: true
    grantedAt?: true
  }

  export type RolePermissionMaxAggregateInputType = {
    roleId?: true
    permissionId?: true
    grantedBy?: true
    grantedAt?: true
  }

  export type RolePermissionCountAggregateInputType = {
    roleId?: true
    permissionId?: true
    grantedBy?: true
    grantedAt?: true
    _all?: true
  }

  export type RolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermission to aggregate.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePermissions
    **/
    _count?: true | RolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePermissionMaxAggregateInputType
  }

  export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePermission[P]>
      : GetScalarType<T[P], AggregateRolePermission[P]>
  }




  export type RolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePermissionWhereInput
    orderBy?: RolePermissionOrderByWithAggregationInput | RolePermissionOrderByWithAggregationInput[]
    by: RolePermissionScalarFieldEnum[] | RolePermissionScalarFieldEnum
    having?: RolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePermissionCountAggregateInputType | true
    _min?: RolePermissionMinAggregateInputType
    _max?: RolePermissionMaxAggregateInputType
  }

  export type RolePermissionGroupByOutputType = {
    roleId: string
    permissionId: string
    grantedBy: string
    grantedAt: Date
    _count: RolePermissionCountAggregateOutputType | null
    _min: RolePermissionMinAggregateOutputType | null
    _max: RolePermissionMaxAggregateOutputType | null
  }

  type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type RolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    grantedBy?: boolean
    grantedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    grantedBy?: boolean
    grantedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    grantedBy?: boolean
    grantedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePermission"]>

  export type RolePermissionSelectScalar = {
    roleId?: boolean
    permissionId?: boolean
    grantedBy?: boolean
    grantedAt?: boolean
  }

  export type RolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roleId" | "permissionId" | "grantedBy" | "grantedAt", ExtArgs["result"]["rolePermission"]>
  export type RolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RolePermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }

  export type $RolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      permission: Prisma.$PermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      roleId: string
      permissionId: string
      grantedBy: string
      grantedAt: Date
    }, ExtArgs["result"]["rolePermission"]>
    composites: {}
  }

  type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = $Result.GetResult<Prisma.$RolePermissionPayload, S>

  type RolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePermissionCountAggregateInputType | true
    }

  export interface RolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'], meta: { name: 'RolePermission' } }
    /**
     * Find zero or one RolePermission that matches the filter.
     * @param {RolePermissionFindUniqueArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePermissionFindUniqueArgs>(args: SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePermissionFindUniqueOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePermissionFindFirstArgs>(args?: SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindFirstOrThrowArgs} args - Arguments to find a RolePermission
     * @example
     * // Get one RolePermission
     * const rolePermission = await prisma.rolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany()
     * 
     * // Get first 10 RolePermissions
     * const rolePermissions = await prisma.rolePermission.findMany({ take: 10 })
     * 
     * // Only select the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.findMany({ select: { roleId: true } })
     * 
     */
    findMany<T extends RolePermissionFindManyArgs>(args?: SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePermission.
     * @param {RolePermissionCreateArgs} args - Arguments to create a RolePermission.
     * @example
     * // Create one RolePermission
     * const RolePermission = await prisma.rolePermission.create({
     *   data: {
     *     // ... data to create a RolePermission
     *   }
     * })
     * 
     */
    create<T extends RolePermissionCreateArgs>(args: SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePermissions.
     * @param {RolePermissionCreateManyArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePermissionCreateManyArgs>(args?: SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RolePermissions and returns the data saved in the database.
     * @param {RolePermissionCreateManyAndReturnArgs} args - Arguments to create many RolePermissions.
     * @example
     * // Create many RolePermissions
     * const rolePermission = await prisma.rolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RolePermissions and only return the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.createManyAndReturn({
     *   select: { roleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RolePermission.
     * @param {RolePermissionDeleteArgs} args - Arguments to delete one RolePermission.
     * @example
     * // Delete one RolePermission
     * const RolePermission = await prisma.rolePermission.delete({
     *   where: {
     *     // ... filter to delete one RolePermission
     *   }
     * })
     * 
     */
    delete<T extends RolePermissionDeleteArgs>(args: SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePermission.
     * @param {RolePermissionUpdateArgs} args - Arguments to update one RolePermission.
     * @example
     * // Update one RolePermission
     * const rolePermission = await prisma.rolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePermissionUpdateArgs>(args: SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePermissions.
     * @param {RolePermissionDeleteManyArgs} args - Arguments to filter RolePermissions to delete.
     * @example
     * // Delete a few RolePermissions
     * const { count } = await prisma.rolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePermissionUpdateManyArgs>(args: SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePermissions and returns the data updated in the database.
     * @param {RolePermissionUpdateManyAndReturnArgs} args - Arguments to update many RolePermissions.
     * @example
     * // Update many RolePermissions
     * const rolePermission = await prisma.rolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RolePermissions and only return the `roleId`
     * const rolePermissionWithRoleIdOnly = await prisma.rolePermission.updateManyAndReturn({
     *   select: { roleId: true },
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
    updateManyAndReturn<T extends RolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RolePermission.
     * @param {RolePermissionUpsertArgs} args - Arguments to update or create a RolePermission.
     * @example
     * // Update or create a RolePermission
     * const rolePermission = await prisma.rolePermission.upsert({
     *   create: {
     *     // ... data to create a RolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePermission we want to update
     *   }
     * })
     */
    upsert<T extends RolePermissionUpsertArgs>(args: SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma__RolePermissionClient<$Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionCountArgs} args - Arguments to filter RolePermissions to count.
     * @example
     * // Count the number of RolePermissions
     * const count = await prisma.rolePermission.count({
     *   where: {
     *     // ... the filter for the RolePermissions we want to count
     *   }
     * })
    **/
    count<T extends RolePermissionCountArgs>(
      args?: Subset<T, RolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RolePermissionAggregateArgs>(args: Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>

    /**
     * Group by RolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePermissionGroupByArgs} args - Group by arguments.
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
      T extends RolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: RolePermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePermission model
   */
  readonly fields: RolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permission<T extends PermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionDefaultArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RolePermission model
   */
  interface RolePermissionFieldRefs {
    readonly roleId: FieldRef<"RolePermission", 'String'>
    readonly permissionId: FieldRef<"RolePermission", 'String'>
    readonly grantedBy: FieldRef<"RolePermission", 'String'>
    readonly grantedAt: FieldRef<"RolePermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolePermission findUnique
   */
  export type RolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findUniqueOrThrow
   */
  export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission findFirst
   */
  export type RolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findFirstOrThrow
   */
  export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermission to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePermissions.
     */
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission findMany
   */
  export type RolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which RolePermissions to fetch.
     */
    where?: RolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePermissions to fetch.
     */
    orderBy?: RolePermissionOrderByWithRelationInput | RolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePermissions.
     */
    cursor?: RolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePermissions.
     */
    skip?: number
    distinct?: RolePermissionScalarFieldEnum | RolePermissionScalarFieldEnum[]
  }

  /**
   * RolePermission create
   */
  export type RolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePermission.
     */
    data: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
  }

  /**
   * RolePermission createMany
   */
  export type RolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePermission createManyAndReturn
   */
  export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RolePermissions.
     */
    data: RolePermissionCreateManyInput | RolePermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission update
   */
  export type RolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePermission.
     */
    data: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
    /**
     * Choose, which RolePermission to update.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission updateMany
   */
  export type RolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
  }

  /**
   * RolePermission updateManyAndReturn
   */
  export type RolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update RolePermissions.
     */
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which RolePermissions to update
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RolePermission upsert
   */
  export type RolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePermission to update in case it exists.
     */
    where: RolePermissionWhereUniqueInput
    /**
     * In case the RolePermission found by the `where` argument doesn't exist, create a new RolePermission with this data.
     */
    create: XOR<RolePermissionCreateInput, RolePermissionUncheckedCreateInput>
    /**
     * In case the RolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePermissionUpdateInput, RolePermissionUncheckedUpdateInput>
  }

  /**
   * RolePermission delete
   */
  export type RolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
    /**
     * Filter which RolePermission to delete.
     */
    where: RolePermissionWhereUniqueInput
  }

  /**
   * RolePermission deleteMany
   */
  export type RolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePermissions to delete
     */
    where?: RolePermissionWhereInput
    /**
     * Limit how many RolePermissions to delete.
     */
    limit?: number
  }

  /**
   * RolePermission without action
   */
  export type RolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePermission
     */
    select?: RolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePermission
     */
    omit?: RolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    roleId: string | null
    scopeLevel: string | null
    scopeRefId: string | null
    assignedBy: string | null
    assignedAt: Date | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    roleId: string | null
    scopeLevel: string | null
    scopeRefId: string | null
    assignedBy: string | null
    assignedAt: Date | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    userId: number
    roleId: number
    scopeLevel: number
    scopeRefId: number
    assignedBy: number
    assignedAt: number
    _all: number
  }


  export type UserRoleMinAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
    scopeLevel?: true
    scopeRefId?: true
    assignedBy?: true
    assignedAt?: true
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
    scopeLevel?: true
    scopeRefId?: true
    assignedBy?: true
    assignedAt?: true
  }

  export type UserRoleCountAggregateInputType = {
    id?: true
    userId?: true
    roleId?: true
    scopeLevel?: true
    scopeRefId?: true
    assignedBy?: true
    assignedAt?: true
    _all?: true
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[]
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    id: string
    userId: string
    roleId: string
    scopeLevel: string
    scopeRefId: string | null
    assignedBy: string
    assignedAt: Date
    _count: UserRoleCountAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    scopeLevel?: boolean
    scopeRefId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    scopeLevel?: boolean
    scopeRefId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    roleId?: boolean
    scopeLevel?: boolean
    scopeRefId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>

  export type UserRoleSelectScalar = {
    id?: boolean
    userId?: boolean
    roleId?: boolean
    scopeLevel?: boolean
    scopeRefId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
  }

  export type UserRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "roleId" | "scopeLevel" | "scopeRefId" | "assignedBy" | "assignedAt", ExtArgs["result"]["userRole"]>
  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      roleId: string
      scopeLevel: string
      scopeRefId: string | null
      assignedBy: string
      assignedAt: Date
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRoles and returns the data saved in the database.
     * @param {UserRoleCreateManyAndReturnArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles and returns the data updated in the database.
     * @param {UserRoleUpdateManyAndReturnArgs} args - Arguments to update many UserRoles.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRoles and only return the `id`
     * const userRoleWithIdOnly = await prisma.userRole.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
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
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserRole model
   */
  interface UserRoleFieldRefs {
    readonly id: FieldRef<"UserRole", 'String'>
    readonly userId: FieldRef<"UserRole", 'String'>
    readonly roleId: FieldRef<"UserRole", 'String'>
    readonly scopeLevel: FieldRef<"UserRole", 'String'>
    readonly scopeRefId: FieldRef<"UserRole", 'String'>
    readonly assignedBy: FieldRef<"UserRole", 'String'>
    readonly assignedAt: FieldRef<"UserRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRole createManyAndReturn
   */
  export type UserRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
  }

  /**
   * UserRole updateManyAndReturn
   */
  export type UserRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Model UserSocialConnection
   */

  export type AggregateUserSocialConnection = {
    _count: UserSocialConnectionCountAggregateOutputType | null
    _min: UserSocialConnectionMinAggregateOutputType | null
    _max: UserSocialConnectionMaxAggregateOutputType | null
  }

  export type UserSocialConnectionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerUserId: string | null
    email: string | null
    displayName: string | null
    avatarUrl: string | null
    connectedAt: Date | null
    lastUsedAt: Date | null
    status: string | null
  }

  export type UserSocialConnectionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    providerUserId: string | null
    email: string | null
    displayName: string | null
    avatarUrl: string | null
    connectedAt: Date | null
    lastUsedAt: Date | null
    status: string | null
  }

  export type UserSocialConnectionCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerUserId: number
    email: number
    displayName: number
    avatarUrl: number
    connectedAt: number
    lastUsedAt: number
    status: number
    _all: number
  }


  export type UserSocialConnectionMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
    email?: true
    displayName?: true
    avatarUrl?: true
    connectedAt?: true
    lastUsedAt?: true
    status?: true
  }

  export type UserSocialConnectionMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
    email?: true
    displayName?: true
    avatarUrl?: true
    connectedAt?: true
    lastUsedAt?: true
    status?: true
  }

  export type UserSocialConnectionCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerUserId?: true
    email?: true
    displayName?: true
    avatarUrl?: true
    connectedAt?: true
    lastUsedAt?: true
    status?: true
    _all?: true
  }

  export type UserSocialConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSocialConnection to aggregate.
     */
    where?: UserSocialConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialConnections to fetch.
     */
    orderBy?: UserSocialConnectionOrderByWithRelationInput | UserSocialConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSocialConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSocialConnections
    **/
    _count?: true | UserSocialConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSocialConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSocialConnectionMaxAggregateInputType
  }

  export type GetUserSocialConnectionAggregateType<T extends UserSocialConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSocialConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSocialConnection[P]>
      : GetScalarType<T[P], AggregateUserSocialConnection[P]>
  }




  export type UserSocialConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSocialConnectionWhereInput
    orderBy?: UserSocialConnectionOrderByWithAggregationInput | UserSocialConnectionOrderByWithAggregationInput[]
    by: UserSocialConnectionScalarFieldEnum[] | UserSocialConnectionScalarFieldEnum
    having?: UserSocialConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSocialConnectionCountAggregateInputType | true
    _min?: UserSocialConnectionMinAggregateInputType
    _max?: UserSocialConnectionMaxAggregateInputType
  }

  export type UserSocialConnectionGroupByOutputType = {
    id: string
    userId: string
    provider: string
    providerUserId: string
    email: string | null
    displayName: string | null
    avatarUrl: string | null
    connectedAt: Date
    lastUsedAt: Date | null
    status: string
    _count: UserSocialConnectionCountAggregateOutputType | null
    _min: UserSocialConnectionMinAggregateOutputType | null
    _max: UserSocialConnectionMaxAggregateOutputType | null
  }

  type GetUserSocialConnectionGroupByPayload<T extends UserSocialConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSocialConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSocialConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSocialConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSocialConnectionGroupByOutputType[P]>
        }
      >
    >


  export type UserSocialConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    connectedAt?: boolean
    lastUsedAt?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialConnection"]>

  export type UserSocialConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    connectedAt?: boolean
    lastUsedAt?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialConnection"]>

  export type UserSocialConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    connectedAt?: boolean
    lastUsedAt?: boolean
    status?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialConnection"]>

  export type UserSocialConnectionSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerUserId?: boolean
    email?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    connectedAt?: boolean
    lastUsedAt?: boolean
    status?: boolean
  }

  export type UserSocialConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerUserId" | "email" | "displayName" | "avatarUrl" | "connectedAt" | "lastUsedAt" | "status", ExtArgs["result"]["userSocialConnection"]>
  export type UserSocialConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSocialConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSocialConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSocialConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSocialConnection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      providerUserId: string
      email: string | null
      displayName: string | null
      avatarUrl: string | null
      connectedAt: Date
      lastUsedAt: Date | null
      status: string
    }, ExtArgs["result"]["userSocialConnection"]>
    composites: {}
  }

  type UserSocialConnectionGetPayload<S extends boolean | null | undefined | UserSocialConnectionDefaultArgs> = $Result.GetResult<Prisma.$UserSocialConnectionPayload, S>

  type UserSocialConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSocialConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSocialConnectionCountAggregateInputType | true
    }

  export interface UserSocialConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSocialConnection'], meta: { name: 'UserSocialConnection' } }
    /**
     * Find zero or one UserSocialConnection that matches the filter.
     * @param {UserSocialConnectionFindUniqueArgs} args - Arguments to find a UserSocialConnection
     * @example
     * // Get one UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSocialConnectionFindUniqueArgs>(args: SelectSubset<T, UserSocialConnectionFindUniqueArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSocialConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSocialConnectionFindUniqueOrThrowArgs} args - Arguments to find a UserSocialConnection
     * @example
     * // Get one UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSocialConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSocialConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSocialConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionFindFirstArgs} args - Arguments to find a UserSocialConnection
     * @example
     * // Get one UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSocialConnectionFindFirstArgs>(args?: SelectSubset<T, UserSocialConnectionFindFirstArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSocialConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionFindFirstOrThrowArgs} args - Arguments to find a UserSocialConnection
     * @example
     * // Get one UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSocialConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSocialConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSocialConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSocialConnections
     * const userSocialConnections = await prisma.userSocialConnection.findMany()
     * 
     * // Get first 10 UserSocialConnections
     * const userSocialConnections = await prisma.userSocialConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSocialConnectionWithIdOnly = await prisma.userSocialConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSocialConnectionFindManyArgs>(args?: SelectSubset<T, UserSocialConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSocialConnection.
     * @param {UserSocialConnectionCreateArgs} args - Arguments to create a UserSocialConnection.
     * @example
     * // Create one UserSocialConnection
     * const UserSocialConnection = await prisma.userSocialConnection.create({
     *   data: {
     *     // ... data to create a UserSocialConnection
     *   }
     * })
     * 
     */
    create<T extends UserSocialConnectionCreateArgs>(args: SelectSubset<T, UserSocialConnectionCreateArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSocialConnections.
     * @param {UserSocialConnectionCreateManyArgs} args - Arguments to create many UserSocialConnections.
     * @example
     * // Create many UserSocialConnections
     * const userSocialConnection = await prisma.userSocialConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSocialConnectionCreateManyArgs>(args?: SelectSubset<T, UserSocialConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSocialConnections and returns the data saved in the database.
     * @param {UserSocialConnectionCreateManyAndReturnArgs} args - Arguments to create many UserSocialConnections.
     * @example
     * // Create many UserSocialConnections
     * const userSocialConnection = await prisma.userSocialConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSocialConnections and only return the `id`
     * const userSocialConnectionWithIdOnly = await prisma.userSocialConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSocialConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSocialConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSocialConnection.
     * @param {UserSocialConnectionDeleteArgs} args - Arguments to delete one UserSocialConnection.
     * @example
     * // Delete one UserSocialConnection
     * const UserSocialConnection = await prisma.userSocialConnection.delete({
     *   where: {
     *     // ... filter to delete one UserSocialConnection
     *   }
     * })
     * 
     */
    delete<T extends UserSocialConnectionDeleteArgs>(args: SelectSubset<T, UserSocialConnectionDeleteArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSocialConnection.
     * @param {UserSocialConnectionUpdateArgs} args - Arguments to update one UserSocialConnection.
     * @example
     * // Update one UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSocialConnectionUpdateArgs>(args: SelectSubset<T, UserSocialConnectionUpdateArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSocialConnections.
     * @param {UserSocialConnectionDeleteManyArgs} args - Arguments to filter UserSocialConnections to delete.
     * @example
     * // Delete a few UserSocialConnections
     * const { count } = await prisma.userSocialConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSocialConnectionDeleteManyArgs>(args?: SelectSubset<T, UserSocialConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSocialConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSocialConnections
     * const userSocialConnection = await prisma.userSocialConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSocialConnectionUpdateManyArgs>(args: SelectSubset<T, UserSocialConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSocialConnections and returns the data updated in the database.
     * @param {UserSocialConnectionUpdateManyAndReturnArgs} args - Arguments to update many UserSocialConnections.
     * @example
     * // Update many UserSocialConnections
     * const userSocialConnection = await prisma.userSocialConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSocialConnections and only return the `id`
     * const userSocialConnectionWithIdOnly = await prisma.userSocialConnection.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserSocialConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSocialConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSocialConnection.
     * @param {UserSocialConnectionUpsertArgs} args - Arguments to update or create a UserSocialConnection.
     * @example
     * // Update or create a UserSocialConnection
     * const userSocialConnection = await prisma.userSocialConnection.upsert({
     *   create: {
     *     // ... data to create a UserSocialConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSocialConnection we want to update
     *   }
     * })
     */
    upsert<T extends UserSocialConnectionUpsertArgs>(args: SelectSubset<T, UserSocialConnectionUpsertArgs<ExtArgs>>): Prisma__UserSocialConnectionClient<$Result.GetResult<Prisma.$UserSocialConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSocialConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionCountArgs} args - Arguments to filter UserSocialConnections to count.
     * @example
     * // Count the number of UserSocialConnections
     * const count = await prisma.userSocialConnection.count({
     *   where: {
     *     // ... the filter for the UserSocialConnections we want to count
     *   }
     * })
    **/
    count<T extends UserSocialConnectionCountArgs>(
      args?: Subset<T, UserSocialConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSocialConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSocialConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserSocialConnectionAggregateArgs>(args: Subset<T, UserSocialConnectionAggregateArgs>): Prisma.PrismaPromise<GetUserSocialConnectionAggregateType<T>>

    /**
     * Group by UserSocialConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialConnectionGroupByArgs} args - Group by arguments.
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
      T extends UserSocialConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSocialConnectionGroupByArgs['orderBy'] }
        : { orderBy?: UserSocialConnectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserSocialConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSocialConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSocialConnection model
   */
  readonly fields: UserSocialConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSocialConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSocialConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserSocialConnection model
   */
  interface UserSocialConnectionFieldRefs {
    readonly id: FieldRef<"UserSocialConnection", 'String'>
    readonly userId: FieldRef<"UserSocialConnection", 'String'>
    readonly provider: FieldRef<"UserSocialConnection", 'String'>
    readonly providerUserId: FieldRef<"UserSocialConnection", 'String'>
    readonly email: FieldRef<"UserSocialConnection", 'String'>
    readonly displayName: FieldRef<"UserSocialConnection", 'String'>
    readonly avatarUrl: FieldRef<"UserSocialConnection", 'String'>
    readonly connectedAt: FieldRef<"UserSocialConnection", 'DateTime'>
    readonly lastUsedAt: FieldRef<"UserSocialConnection", 'DateTime'>
    readonly status: FieldRef<"UserSocialConnection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserSocialConnection findUnique
   */
  export type UserSocialConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialConnection to fetch.
     */
    where: UserSocialConnectionWhereUniqueInput
  }

  /**
   * UserSocialConnection findUniqueOrThrow
   */
  export type UserSocialConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialConnection to fetch.
     */
    where: UserSocialConnectionWhereUniqueInput
  }

  /**
   * UserSocialConnection findFirst
   */
  export type UserSocialConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialConnection to fetch.
     */
    where?: UserSocialConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialConnections to fetch.
     */
    orderBy?: UserSocialConnectionOrderByWithRelationInput | UserSocialConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSocialConnections.
     */
    cursor?: UserSocialConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSocialConnections.
     */
    distinct?: UserSocialConnectionScalarFieldEnum | UserSocialConnectionScalarFieldEnum[]
  }

  /**
   * UserSocialConnection findFirstOrThrow
   */
  export type UserSocialConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialConnection to fetch.
     */
    where?: UserSocialConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialConnections to fetch.
     */
    orderBy?: UserSocialConnectionOrderByWithRelationInput | UserSocialConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSocialConnections.
     */
    cursor?: UserSocialConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSocialConnections.
     */
    distinct?: UserSocialConnectionScalarFieldEnum | UserSocialConnectionScalarFieldEnum[]
  }

  /**
   * UserSocialConnection findMany
   */
  export type UserSocialConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialConnections to fetch.
     */
    where?: UserSocialConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialConnections to fetch.
     */
    orderBy?: UserSocialConnectionOrderByWithRelationInput | UserSocialConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSocialConnections.
     */
    cursor?: UserSocialConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialConnections.
     */
    skip?: number
    distinct?: UserSocialConnectionScalarFieldEnum | UserSocialConnectionScalarFieldEnum[]
  }

  /**
   * UserSocialConnection create
   */
  export type UserSocialConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSocialConnection.
     */
    data: XOR<UserSocialConnectionCreateInput, UserSocialConnectionUncheckedCreateInput>
  }

  /**
   * UserSocialConnection createMany
   */
  export type UserSocialConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSocialConnections.
     */
    data: UserSocialConnectionCreateManyInput | UserSocialConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSocialConnection createManyAndReturn
   */
  export type UserSocialConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSocialConnections.
     */
    data: UserSocialConnectionCreateManyInput | UserSocialConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSocialConnection update
   */
  export type UserSocialConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSocialConnection.
     */
    data: XOR<UserSocialConnectionUpdateInput, UserSocialConnectionUncheckedUpdateInput>
    /**
     * Choose, which UserSocialConnection to update.
     */
    where: UserSocialConnectionWhereUniqueInput
  }

  /**
   * UserSocialConnection updateMany
   */
  export type UserSocialConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSocialConnections.
     */
    data: XOR<UserSocialConnectionUpdateManyMutationInput, UserSocialConnectionUncheckedUpdateManyInput>
    /**
     * Filter which UserSocialConnections to update
     */
    where?: UserSocialConnectionWhereInput
    /**
     * Limit how many UserSocialConnections to update.
     */
    limit?: number
  }

  /**
   * UserSocialConnection updateManyAndReturn
   */
  export type UserSocialConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * The data used to update UserSocialConnections.
     */
    data: XOR<UserSocialConnectionUpdateManyMutationInput, UserSocialConnectionUncheckedUpdateManyInput>
    /**
     * Filter which UserSocialConnections to update
     */
    where?: UserSocialConnectionWhereInput
    /**
     * Limit how many UserSocialConnections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSocialConnection upsert
   */
  export type UserSocialConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSocialConnection to update in case it exists.
     */
    where: UserSocialConnectionWhereUniqueInput
    /**
     * In case the UserSocialConnection found by the `where` argument doesn't exist, create a new UserSocialConnection with this data.
     */
    create: XOR<UserSocialConnectionCreateInput, UserSocialConnectionUncheckedCreateInput>
    /**
     * In case the UserSocialConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSocialConnectionUpdateInput, UserSocialConnectionUncheckedUpdateInput>
  }

  /**
   * UserSocialConnection delete
   */
  export type UserSocialConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
    /**
     * Filter which UserSocialConnection to delete.
     */
    where: UserSocialConnectionWhereUniqueInput
  }

  /**
   * UserSocialConnection deleteMany
   */
  export type UserSocialConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSocialConnections to delete
     */
    where?: UserSocialConnectionWhereInput
    /**
     * Limit how many UserSocialConnections to delete.
     */
    limit?: number
  }

  /**
   * UserSocialConnection without action
   */
  export type UserSocialConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialConnection
     */
    select?: UserSocialConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialConnection
     */
    omit?: UserSocialConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Concession
   */

  export type AggregateConcession = {
    _count: ConcessionCountAggregateOutputType | null
    _min: ConcessionMinAggregateOutputType | null
    _max: ConcessionMaxAggregateOutputType | null
  }

  export type ConcessionMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    contactEmail: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConcessionMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    contactEmail: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConcessionCountAggregateOutputType = {
    id: number
    code: number
    name: number
    contactEmail: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConcessionMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    contactEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConcessionMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    contactEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConcessionCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    contactEmail?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConcessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concession to aggregate.
     */
    where?: ConcessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionOrderByWithRelationInput | ConcessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConcessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Concessions
    **/
    _count?: true | ConcessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConcessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConcessionMaxAggregateInputType
  }

  export type GetConcessionAggregateType<T extends ConcessionAggregateArgs> = {
        [P in keyof T & keyof AggregateConcession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcession[P]>
      : GetScalarType<T[P], AggregateConcession[P]>
  }




  export type ConcessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionWhereInput
    orderBy?: ConcessionOrderByWithAggregationInput | ConcessionOrderByWithAggregationInput[]
    by: ConcessionScalarFieldEnum[] | ConcessionScalarFieldEnum
    having?: ConcessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConcessionCountAggregateInputType | true
    _min?: ConcessionMinAggregateInputType
    _max?: ConcessionMaxAggregateInputType
  }

  export type ConcessionGroupByOutputType = {
    id: string
    code: string
    name: string
    contactEmail: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ConcessionCountAggregateOutputType | null
    _min: ConcessionMinAggregateOutputType | null
    _max: ConcessionMaxAggregateOutputType | null
  }

  type GetConcessionGroupByPayload<T extends ConcessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConcessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConcessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcessionGroupByOutputType[P]>
            : GetScalarType<T[P], ConcessionGroupByOutputType[P]>
        }
      >
    >


  export type ConcessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    contactEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assemblies?: boolean | Concession$assembliesArgs<ExtArgs>
    personnel?: boolean | Concession$personnelArgs<ExtArgs>
    apiClients?: boolean | Concession$apiClientsArgs<ExtArgs>
    _count?: boolean | ConcessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concession"]>

  export type ConcessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    contactEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["concession"]>

  export type ConcessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    contactEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["concession"]>

  export type ConcessionSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    contactEmail?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConcessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "contactEmail" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["concession"]>
  export type ConcessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assemblies?: boolean | Concession$assembliesArgs<ExtArgs>
    personnel?: boolean | Concession$personnelArgs<ExtArgs>
    apiClients?: boolean | Concession$apiClientsArgs<ExtArgs>
    _count?: boolean | ConcessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConcessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConcessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConcessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Concession"
    objects: {
      assemblies: Prisma.$ConcessionAssemblyPayload<ExtArgs>[]
      personnel: Prisma.$ConcessionPersonnelPayload<ExtArgs>[]
      apiClients: Prisma.$ApiClientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      contactEmail: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["concession"]>
    composites: {}
  }

  type ConcessionGetPayload<S extends boolean | null | undefined | ConcessionDefaultArgs> = $Result.GetResult<Prisma.$ConcessionPayload, S>

  type ConcessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConcessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConcessionCountAggregateInputType | true
    }

  export interface ConcessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Concession'], meta: { name: 'Concession' } }
    /**
     * Find zero or one Concession that matches the filter.
     * @param {ConcessionFindUniqueArgs} args - Arguments to find a Concession
     * @example
     * // Get one Concession
     * const concession = await prisma.concession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcessionFindUniqueArgs>(args: SelectSubset<T, ConcessionFindUniqueArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Concession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcessionFindUniqueOrThrowArgs} args - Arguments to find a Concession
     * @example
     * // Get one Concession
     * const concession = await prisma.concession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConcessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionFindFirstArgs} args - Arguments to find a Concession
     * @example
     * // Get one Concession
     * const concession = await prisma.concession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcessionFindFirstArgs>(args?: SelectSubset<T, ConcessionFindFirstArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionFindFirstOrThrowArgs} args - Arguments to find a Concession
     * @example
     * // Get one Concession
     * const concession = await prisma.concession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConcessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Concessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Concessions
     * const concessions = await prisma.concession.findMany()
     * 
     * // Get first 10 Concessions
     * const concessions = await prisma.concession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const concessionWithIdOnly = await prisma.concession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConcessionFindManyArgs>(args?: SelectSubset<T, ConcessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Concession.
     * @param {ConcessionCreateArgs} args - Arguments to create a Concession.
     * @example
     * // Create one Concession
     * const Concession = await prisma.concession.create({
     *   data: {
     *     // ... data to create a Concession
     *   }
     * })
     * 
     */
    create<T extends ConcessionCreateArgs>(args: SelectSubset<T, ConcessionCreateArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Concessions.
     * @param {ConcessionCreateManyArgs} args - Arguments to create many Concessions.
     * @example
     * // Create many Concessions
     * const concession = await prisma.concession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConcessionCreateManyArgs>(args?: SelectSubset<T, ConcessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Concessions and returns the data saved in the database.
     * @param {ConcessionCreateManyAndReturnArgs} args - Arguments to create many Concessions.
     * @example
     * // Create many Concessions
     * const concession = await prisma.concession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Concessions and only return the `id`
     * const concessionWithIdOnly = await prisma.concession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConcessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConcessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Concession.
     * @param {ConcessionDeleteArgs} args - Arguments to delete one Concession.
     * @example
     * // Delete one Concession
     * const Concession = await prisma.concession.delete({
     *   where: {
     *     // ... filter to delete one Concession
     *   }
     * })
     * 
     */
    delete<T extends ConcessionDeleteArgs>(args: SelectSubset<T, ConcessionDeleteArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Concession.
     * @param {ConcessionUpdateArgs} args - Arguments to update one Concession.
     * @example
     * // Update one Concession
     * const concession = await prisma.concession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConcessionUpdateArgs>(args: SelectSubset<T, ConcessionUpdateArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Concessions.
     * @param {ConcessionDeleteManyArgs} args - Arguments to filter Concessions to delete.
     * @example
     * // Delete a few Concessions
     * const { count } = await prisma.concession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConcessionDeleteManyArgs>(args?: SelectSubset<T, ConcessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Concessions
     * const concession = await prisma.concession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConcessionUpdateManyArgs>(args: SelectSubset<T, ConcessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concessions and returns the data updated in the database.
     * @param {ConcessionUpdateManyAndReturnArgs} args - Arguments to update many Concessions.
     * @example
     * // Update many Concessions
     * const concession = await prisma.concession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Concessions and only return the `id`
     * const concessionWithIdOnly = await prisma.concession.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConcessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConcessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Concession.
     * @param {ConcessionUpsertArgs} args - Arguments to update or create a Concession.
     * @example
     * // Update or create a Concession
     * const concession = await prisma.concession.upsert({
     *   create: {
     *     // ... data to create a Concession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Concession we want to update
     *   }
     * })
     */
    upsert<T extends ConcessionUpsertArgs>(args: SelectSubset<T, ConcessionUpsertArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Concessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionCountArgs} args - Arguments to filter Concessions to count.
     * @example
     * // Count the number of Concessions
     * const count = await prisma.concession.count({
     *   where: {
     *     // ... the filter for the Concessions we want to count
     *   }
     * })
    **/
    count<T extends ConcessionCountArgs>(
      args?: Subset<T, ConcessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Concession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConcessionAggregateArgs>(args: Subset<T, ConcessionAggregateArgs>): Prisma.PrismaPromise<GetConcessionAggregateType<T>>

    /**
     * Group by Concession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionGroupByArgs} args - Group by arguments.
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
      T extends ConcessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcessionGroupByArgs['orderBy'] }
        : { orderBy?: ConcessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConcessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConcessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Concession model
   */
  readonly fields: ConcessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Concession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assemblies<T extends Concession$assembliesArgs<ExtArgs> = {}>(args?: Subset<T, Concession$assembliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    personnel<T extends Concession$personnelArgs<ExtArgs> = {}>(args?: Subset<T, Concession$personnelArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiClients<T extends Concession$apiClientsArgs<ExtArgs> = {}>(args?: Subset<T, Concession$apiClientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Concession model
   */
  interface ConcessionFieldRefs {
    readonly id: FieldRef<"Concession", 'String'>
    readonly code: FieldRef<"Concession", 'String'>
    readonly name: FieldRef<"Concession", 'String'>
    readonly contactEmail: FieldRef<"Concession", 'String'>
    readonly status: FieldRef<"Concession", 'String'>
    readonly createdAt: FieldRef<"Concession", 'DateTime'>
    readonly updatedAt: FieldRef<"Concession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Concession findUnique
   */
  export type ConcessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter, which Concession to fetch.
     */
    where: ConcessionWhereUniqueInput
  }

  /**
   * Concession findUniqueOrThrow
   */
  export type ConcessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter, which Concession to fetch.
     */
    where: ConcessionWhereUniqueInput
  }

  /**
   * Concession findFirst
   */
  export type ConcessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter, which Concession to fetch.
     */
    where?: ConcessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionOrderByWithRelationInput | ConcessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concessions.
     */
    cursor?: ConcessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concessions.
     */
    distinct?: ConcessionScalarFieldEnum | ConcessionScalarFieldEnum[]
  }

  /**
   * Concession findFirstOrThrow
   */
  export type ConcessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter, which Concession to fetch.
     */
    where?: ConcessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionOrderByWithRelationInput | ConcessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concessions.
     */
    cursor?: ConcessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concessions.
     */
    distinct?: ConcessionScalarFieldEnum | ConcessionScalarFieldEnum[]
  }

  /**
   * Concession findMany
   */
  export type ConcessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter, which Concessions to fetch.
     */
    where?: ConcessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concessions to fetch.
     */
    orderBy?: ConcessionOrderByWithRelationInput | ConcessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Concessions.
     */
    cursor?: ConcessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concessions.
     */
    skip?: number
    distinct?: ConcessionScalarFieldEnum | ConcessionScalarFieldEnum[]
  }

  /**
   * Concession create
   */
  export type ConcessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Concession.
     */
    data: XOR<ConcessionCreateInput, ConcessionUncheckedCreateInput>
  }

  /**
   * Concession createMany
   */
  export type ConcessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Concessions.
     */
    data: ConcessionCreateManyInput | ConcessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Concession createManyAndReturn
   */
  export type ConcessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * The data used to create many Concessions.
     */
    data: ConcessionCreateManyInput | ConcessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Concession update
   */
  export type ConcessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Concession.
     */
    data: XOR<ConcessionUpdateInput, ConcessionUncheckedUpdateInput>
    /**
     * Choose, which Concession to update.
     */
    where: ConcessionWhereUniqueInput
  }

  /**
   * Concession updateMany
   */
  export type ConcessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Concessions.
     */
    data: XOR<ConcessionUpdateManyMutationInput, ConcessionUncheckedUpdateManyInput>
    /**
     * Filter which Concessions to update
     */
    where?: ConcessionWhereInput
    /**
     * Limit how many Concessions to update.
     */
    limit?: number
  }

  /**
   * Concession updateManyAndReturn
   */
  export type ConcessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * The data used to update Concessions.
     */
    data: XOR<ConcessionUpdateManyMutationInput, ConcessionUncheckedUpdateManyInput>
    /**
     * Filter which Concessions to update
     */
    where?: ConcessionWhereInput
    /**
     * Limit how many Concessions to update.
     */
    limit?: number
  }

  /**
   * Concession upsert
   */
  export type ConcessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Concession to update in case it exists.
     */
    where: ConcessionWhereUniqueInput
    /**
     * In case the Concession found by the `where` argument doesn't exist, create a new Concession with this data.
     */
    create: XOR<ConcessionCreateInput, ConcessionUncheckedCreateInput>
    /**
     * In case the Concession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcessionUpdateInput, ConcessionUncheckedUpdateInput>
  }

  /**
   * Concession delete
   */
  export type ConcessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
    /**
     * Filter which Concession to delete.
     */
    where: ConcessionWhereUniqueInput
  }

  /**
   * Concession deleteMany
   */
  export type ConcessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concessions to delete
     */
    where?: ConcessionWhereInput
    /**
     * Limit how many Concessions to delete.
     */
    limit?: number
  }

  /**
   * Concession.assemblies
   */
  export type Concession$assembliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    where?: ConcessionAssemblyWhereInput
    orderBy?: ConcessionAssemblyOrderByWithRelationInput | ConcessionAssemblyOrderByWithRelationInput[]
    cursor?: ConcessionAssemblyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConcessionAssemblyScalarFieldEnum | ConcessionAssemblyScalarFieldEnum[]
  }

  /**
   * Concession.personnel
   */
  export type Concession$personnelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    where?: ConcessionPersonnelWhereInput
    orderBy?: ConcessionPersonnelOrderByWithRelationInput | ConcessionPersonnelOrderByWithRelationInput[]
    cursor?: ConcessionPersonnelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConcessionPersonnelScalarFieldEnum | ConcessionPersonnelScalarFieldEnum[]
  }

  /**
   * Concession.apiClients
   */
  export type Concession$apiClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    where?: ApiClientWhereInput
    orderBy?: ApiClientOrderByWithRelationInput | ApiClientOrderByWithRelationInput[]
    cursor?: ApiClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiClientScalarFieldEnum | ApiClientScalarFieldEnum[]
  }

  /**
   * Concession without action
   */
  export type ConcessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concession
     */
    select?: ConcessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concession
     */
    omit?: ConcessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionInclude<ExtArgs> | null
  }


  /**
   * Model ConcessionAssembly
   */

  export type AggregateConcessionAssembly = {
    _count: ConcessionAssemblyCountAggregateOutputType | null
    _min: ConcessionAssemblyMinAggregateOutputType | null
    _max: ConcessionAssemblyMaxAggregateOutputType | null
  }

  export type ConcessionAssemblyMinAggregateOutputType = {
    id: string | null
    concessionId: string | null
    assemblyId: string | null
    contractStart: Date | null
    contractEnd: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ConcessionAssemblyMaxAggregateOutputType = {
    id: string | null
    concessionId: string | null
    assemblyId: string | null
    contractStart: Date | null
    contractEnd: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type ConcessionAssemblyCountAggregateOutputType = {
    id: number
    concessionId: number
    assemblyId: number
    contractStart: number
    contractEnd: number
    status: number
    createdAt: number
    _all: number
  }


  export type ConcessionAssemblyMinAggregateInputType = {
    id?: true
    concessionId?: true
    assemblyId?: true
    contractStart?: true
    contractEnd?: true
    status?: true
    createdAt?: true
  }

  export type ConcessionAssemblyMaxAggregateInputType = {
    id?: true
    concessionId?: true
    assemblyId?: true
    contractStart?: true
    contractEnd?: true
    status?: true
    createdAt?: true
  }

  export type ConcessionAssemblyCountAggregateInputType = {
    id?: true
    concessionId?: true
    assemblyId?: true
    contractStart?: true
    contractEnd?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ConcessionAssemblyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConcessionAssembly to aggregate.
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionAssemblies to fetch.
     */
    orderBy?: ConcessionAssemblyOrderByWithRelationInput | ConcessionAssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConcessionAssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionAssemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionAssemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConcessionAssemblies
    **/
    _count?: true | ConcessionAssemblyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConcessionAssemblyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConcessionAssemblyMaxAggregateInputType
  }

  export type GetConcessionAssemblyAggregateType<T extends ConcessionAssemblyAggregateArgs> = {
        [P in keyof T & keyof AggregateConcessionAssembly]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcessionAssembly[P]>
      : GetScalarType<T[P], AggregateConcessionAssembly[P]>
  }




  export type ConcessionAssemblyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionAssemblyWhereInput
    orderBy?: ConcessionAssemblyOrderByWithAggregationInput | ConcessionAssemblyOrderByWithAggregationInput[]
    by: ConcessionAssemblyScalarFieldEnum[] | ConcessionAssemblyScalarFieldEnum
    having?: ConcessionAssemblyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConcessionAssemblyCountAggregateInputType | true
    _min?: ConcessionAssemblyMinAggregateInputType
    _max?: ConcessionAssemblyMaxAggregateInputType
  }

  export type ConcessionAssemblyGroupByOutputType = {
    id: string
    concessionId: string
    assemblyId: string
    contractStart: Date
    contractEnd: Date
    status: string
    createdAt: Date
    _count: ConcessionAssemblyCountAggregateOutputType | null
    _min: ConcessionAssemblyMinAggregateOutputType | null
    _max: ConcessionAssemblyMaxAggregateOutputType | null
  }

  type GetConcessionAssemblyGroupByPayload<T extends ConcessionAssemblyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConcessionAssemblyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConcessionAssemblyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcessionAssemblyGroupByOutputType[P]>
            : GetScalarType<T[P], ConcessionAssemblyGroupByOutputType[P]>
        }
      >
    >


  export type ConcessionAssemblySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionAssembly"]>

  export type ConcessionAssemblySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionAssembly"]>

  export type ConcessionAssemblySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionAssembly"]>

  export type ConcessionAssemblySelectScalar = {
    id?: boolean
    concessionId?: boolean
    assemblyId?: boolean
    contractStart?: boolean
    contractEnd?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ConcessionAssemblyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concessionId" | "assemblyId" | "contractStart" | "contractEnd" | "status" | "createdAt", ExtArgs["result"]["concessionAssembly"]>
  export type ConcessionAssemblyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ConcessionAssemblyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ConcessionAssemblyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }

  export type $ConcessionAssemblyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConcessionAssembly"
    objects: {
      concession: Prisma.$ConcessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concessionId: string
      assemblyId: string
      contractStart: Date
      contractEnd: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["concessionAssembly"]>
    composites: {}
  }

  type ConcessionAssemblyGetPayload<S extends boolean | null | undefined | ConcessionAssemblyDefaultArgs> = $Result.GetResult<Prisma.$ConcessionAssemblyPayload, S>

  type ConcessionAssemblyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConcessionAssemblyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConcessionAssemblyCountAggregateInputType | true
    }

  export interface ConcessionAssemblyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConcessionAssembly'], meta: { name: 'ConcessionAssembly' } }
    /**
     * Find zero or one ConcessionAssembly that matches the filter.
     * @param {ConcessionAssemblyFindUniqueArgs} args - Arguments to find a ConcessionAssembly
     * @example
     * // Get one ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcessionAssemblyFindUniqueArgs>(args: SelectSubset<T, ConcessionAssemblyFindUniqueArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConcessionAssembly that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcessionAssemblyFindUniqueOrThrowArgs} args - Arguments to find a ConcessionAssembly
     * @example
     * // Get one ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcessionAssemblyFindUniqueOrThrowArgs>(args: SelectSubset<T, ConcessionAssemblyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConcessionAssembly that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyFindFirstArgs} args - Arguments to find a ConcessionAssembly
     * @example
     * // Get one ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcessionAssemblyFindFirstArgs>(args?: SelectSubset<T, ConcessionAssemblyFindFirstArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConcessionAssembly that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyFindFirstOrThrowArgs} args - Arguments to find a ConcessionAssembly
     * @example
     * // Get one ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcessionAssemblyFindFirstOrThrowArgs>(args?: SelectSubset<T, ConcessionAssemblyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConcessionAssemblies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConcessionAssemblies
     * const concessionAssemblies = await prisma.concessionAssembly.findMany()
     * 
     * // Get first 10 ConcessionAssemblies
     * const concessionAssemblies = await prisma.concessionAssembly.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const concessionAssemblyWithIdOnly = await prisma.concessionAssembly.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConcessionAssemblyFindManyArgs>(args?: SelectSubset<T, ConcessionAssemblyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConcessionAssembly.
     * @param {ConcessionAssemblyCreateArgs} args - Arguments to create a ConcessionAssembly.
     * @example
     * // Create one ConcessionAssembly
     * const ConcessionAssembly = await prisma.concessionAssembly.create({
     *   data: {
     *     // ... data to create a ConcessionAssembly
     *   }
     * })
     * 
     */
    create<T extends ConcessionAssemblyCreateArgs>(args: SelectSubset<T, ConcessionAssemblyCreateArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConcessionAssemblies.
     * @param {ConcessionAssemblyCreateManyArgs} args - Arguments to create many ConcessionAssemblies.
     * @example
     * // Create many ConcessionAssemblies
     * const concessionAssembly = await prisma.concessionAssembly.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConcessionAssemblyCreateManyArgs>(args?: SelectSubset<T, ConcessionAssemblyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConcessionAssemblies and returns the data saved in the database.
     * @param {ConcessionAssemblyCreateManyAndReturnArgs} args - Arguments to create many ConcessionAssemblies.
     * @example
     * // Create many ConcessionAssemblies
     * const concessionAssembly = await prisma.concessionAssembly.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConcessionAssemblies and only return the `id`
     * const concessionAssemblyWithIdOnly = await prisma.concessionAssembly.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConcessionAssemblyCreateManyAndReturnArgs>(args?: SelectSubset<T, ConcessionAssemblyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConcessionAssembly.
     * @param {ConcessionAssemblyDeleteArgs} args - Arguments to delete one ConcessionAssembly.
     * @example
     * // Delete one ConcessionAssembly
     * const ConcessionAssembly = await prisma.concessionAssembly.delete({
     *   where: {
     *     // ... filter to delete one ConcessionAssembly
     *   }
     * })
     * 
     */
    delete<T extends ConcessionAssemblyDeleteArgs>(args: SelectSubset<T, ConcessionAssemblyDeleteArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConcessionAssembly.
     * @param {ConcessionAssemblyUpdateArgs} args - Arguments to update one ConcessionAssembly.
     * @example
     * // Update one ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConcessionAssemblyUpdateArgs>(args: SelectSubset<T, ConcessionAssemblyUpdateArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConcessionAssemblies.
     * @param {ConcessionAssemblyDeleteManyArgs} args - Arguments to filter ConcessionAssemblies to delete.
     * @example
     * // Delete a few ConcessionAssemblies
     * const { count } = await prisma.concessionAssembly.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConcessionAssemblyDeleteManyArgs>(args?: SelectSubset<T, ConcessionAssemblyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConcessionAssemblies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConcessionAssemblies
     * const concessionAssembly = await prisma.concessionAssembly.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConcessionAssemblyUpdateManyArgs>(args: SelectSubset<T, ConcessionAssemblyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConcessionAssemblies and returns the data updated in the database.
     * @param {ConcessionAssemblyUpdateManyAndReturnArgs} args - Arguments to update many ConcessionAssemblies.
     * @example
     * // Update many ConcessionAssemblies
     * const concessionAssembly = await prisma.concessionAssembly.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConcessionAssemblies and only return the `id`
     * const concessionAssemblyWithIdOnly = await prisma.concessionAssembly.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConcessionAssemblyUpdateManyAndReturnArgs>(args: SelectSubset<T, ConcessionAssemblyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConcessionAssembly.
     * @param {ConcessionAssemblyUpsertArgs} args - Arguments to update or create a ConcessionAssembly.
     * @example
     * // Update or create a ConcessionAssembly
     * const concessionAssembly = await prisma.concessionAssembly.upsert({
     *   create: {
     *     // ... data to create a ConcessionAssembly
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConcessionAssembly we want to update
     *   }
     * })
     */
    upsert<T extends ConcessionAssemblyUpsertArgs>(args: SelectSubset<T, ConcessionAssemblyUpsertArgs<ExtArgs>>): Prisma__ConcessionAssemblyClient<$Result.GetResult<Prisma.$ConcessionAssemblyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConcessionAssemblies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyCountArgs} args - Arguments to filter ConcessionAssemblies to count.
     * @example
     * // Count the number of ConcessionAssemblies
     * const count = await prisma.concessionAssembly.count({
     *   where: {
     *     // ... the filter for the ConcessionAssemblies we want to count
     *   }
     * })
    **/
    count<T extends ConcessionAssemblyCountArgs>(
      args?: Subset<T, ConcessionAssemblyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcessionAssemblyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConcessionAssembly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConcessionAssemblyAggregateArgs>(args: Subset<T, ConcessionAssemblyAggregateArgs>): Prisma.PrismaPromise<GetConcessionAssemblyAggregateType<T>>

    /**
     * Group by ConcessionAssembly.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionAssemblyGroupByArgs} args - Group by arguments.
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
      T extends ConcessionAssemblyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcessionAssemblyGroupByArgs['orderBy'] }
        : { orderBy?: ConcessionAssemblyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConcessionAssemblyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConcessionAssemblyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConcessionAssembly model
   */
  readonly fields: ConcessionAssemblyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConcessionAssembly.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcessionAssemblyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concession<T extends ConcessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConcessionDefaultArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ConcessionAssembly model
   */
  interface ConcessionAssemblyFieldRefs {
    readonly id: FieldRef<"ConcessionAssembly", 'String'>
    readonly concessionId: FieldRef<"ConcessionAssembly", 'String'>
    readonly assemblyId: FieldRef<"ConcessionAssembly", 'String'>
    readonly contractStart: FieldRef<"ConcessionAssembly", 'DateTime'>
    readonly contractEnd: FieldRef<"ConcessionAssembly", 'DateTime'>
    readonly status: FieldRef<"ConcessionAssembly", 'String'>
    readonly createdAt: FieldRef<"ConcessionAssembly", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConcessionAssembly findUnique
   */
  export type ConcessionAssemblyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionAssembly to fetch.
     */
    where: ConcessionAssemblyWhereUniqueInput
  }

  /**
   * ConcessionAssembly findUniqueOrThrow
   */
  export type ConcessionAssemblyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionAssembly to fetch.
     */
    where: ConcessionAssemblyWhereUniqueInput
  }

  /**
   * ConcessionAssembly findFirst
   */
  export type ConcessionAssemblyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionAssembly to fetch.
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionAssemblies to fetch.
     */
    orderBy?: ConcessionAssemblyOrderByWithRelationInput | ConcessionAssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConcessionAssemblies.
     */
    cursor?: ConcessionAssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionAssemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionAssemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConcessionAssemblies.
     */
    distinct?: ConcessionAssemblyScalarFieldEnum | ConcessionAssemblyScalarFieldEnum[]
  }

  /**
   * ConcessionAssembly findFirstOrThrow
   */
  export type ConcessionAssemblyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionAssembly to fetch.
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionAssemblies to fetch.
     */
    orderBy?: ConcessionAssemblyOrderByWithRelationInput | ConcessionAssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConcessionAssemblies.
     */
    cursor?: ConcessionAssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionAssemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionAssemblies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConcessionAssemblies.
     */
    distinct?: ConcessionAssemblyScalarFieldEnum | ConcessionAssemblyScalarFieldEnum[]
  }

  /**
   * ConcessionAssembly findMany
   */
  export type ConcessionAssemblyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionAssemblies to fetch.
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionAssemblies to fetch.
     */
    orderBy?: ConcessionAssemblyOrderByWithRelationInput | ConcessionAssemblyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConcessionAssemblies.
     */
    cursor?: ConcessionAssemblyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionAssemblies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionAssemblies.
     */
    skip?: number
    distinct?: ConcessionAssemblyScalarFieldEnum | ConcessionAssemblyScalarFieldEnum[]
  }

  /**
   * ConcessionAssembly create
   */
  export type ConcessionAssemblyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * The data needed to create a ConcessionAssembly.
     */
    data: XOR<ConcessionAssemblyCreateInput, ConcessionAssemblyUncheckedCreateInput>
  }

  /**
   * ConcessionAssembly createMany
   */
  export type ConcessionAssemblyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConcessionAssemblies.
     */
    data: ConcessionAssemblyCreateManyInput | ConcessionAssemblyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConcessionAssembly createManyAndReturn
   */
  export type ConcessionAssemblyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * The data used to create many ConcessionAssemblies.
     */
    data: ConcessionAssemblyCreateManyInput | ConcessionAssemblyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConcessionAssembly update
   */
  export type ConcessionAssemblyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * The data needed to update a ConcessionAssembly.
     */
    data: XOR<ConcessionAssemblyUpdateInput, ConcessionAssemblyUncheckedUpdateInput>
    /**
     * Choose, which ConcessionAssembly to update.
     */
    where: ConcessionAssemblyWhereUniqueInput
  }

  /**
   * ConcessionAssembly updateMany
   */
  export type ConcessionAssemblyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConcessionAssemblies.
     */
    data: XOR<ConcessionAssemblyUpdateManyMutationInput, ConcessionAssemblyUncheckedUpdateManyInput>
    /**
     * Filter which ConcessionAssemblies to update
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * Limit how many ConcessionAssemblies to update.
     */
    limit?: number
  }

  /**
   * ConcessionAssembly updateManyAndReturn
   */
  export type ConcessionAssemblyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * The data used to update ConcessionAssemblies.
     */
    data: XOR<ConcessionAssemblyUpdateManyMutationInput, ConcessionAssemblyUncheckedUpdateManyInput>
    /**
     * Filter which ConcessionAssemblies to update
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * Limit how many ConcessionAssemblies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConcessionAssembly upsert
   */
  export type ConcessionAssemblyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * The filter to search for the ConcessionAssembly to update in case it exists.
     */
    where: ConcessionAssemblyWhereUniqueInput
    /**
     * In case the ConcessionAssembly found by the `where` argument doesn't exist, create a new ConcessionAssembly with this data.
     */
    create: XOR<ConcessionAssemblyCreateInput, ConcessionAssemblyUncheckedCreateInput>
    /**
     * In case the ConcessionAssembly was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcessionAssemblyUpdateInput, ConcessionAssemblyUncheckedUpdateInput>
  }

  /**
   * ConcessionAssembly delete
   */
  export type ConcessionAssemblyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
    /**
     * Filter which ConcessionAssembly to delete.
     */
    where: ConcessionAssemblyWhereUniqueInput
  }

  /**
   * ConcessionAssembly deleteMany
   */
  export type ConcessionAssemblyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConcessionAssemblies to delete
     */
    where?: ConcessionAssemblyWhereInput
    /**
     * Limit how many ConcessionAssemblies to delete.
     */
    limit?: number
  }

  /**
   * ConcessionAssembly without action
   */
  export type ConcessionAssemblyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionAssembly
     */
    select?: ConcessionAssemblySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionAssembly
     */
    omit?: ConcessionAssemblyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionAssemblyInclude<ExtArgs> | null
  }


  /**
   * Model ConcessionPersonnel
   */

  export type AggregateConcessionPersonnel = {
    _count: ConcessionPersonnelCountAggregateOutputType | null
    _min: ConcessionPersonnelMinAggregateOutputType | null
    _max: ConcessionPersonnelMaxAggregateOutputType | null
  }

  export type ConcessionPersonnelMinAggregateOutputType = {
    id: string | null
    concessionId: string | null
    externalStaffRef: string | null
    fullName: string | null
    phone: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ConcessionPersonnelMaxAggregateOutputType = {
    id: string | null
    concessionId: string | null
    externalStaffRef: string | null
    fullName: string | null
    phone: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ConcessionPersonnelCountAggregateOutputType = {
    id: number
    concessionId: number
    externalStaffRef: number
    fullName: number
    phone: number
    status: number
    createdAt: number
    _all: number
  }


  export type ConcessionPersonnelMinAggregateInputType = {
    id?: true
    concessionId?: true
    externalStaffRef?: true
    fullName?: true
    phone?: true
    status?: true
    createdAt?: true
  }

  export type ConcessionPersonnelMaxAggregateInputType = {
    id?: true
    concessionId?: true
    externalStaffRef?: true
    fullName?: true
    phone?: true
    status?: true
    createdAt?: true
  }

  export type ConcessionPersonnelCountAggregateInputType = {
    id?: true
    concessionId?: true
    externalStaffRef?: true
    fullName?: true
    phone?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ConcessionPersonnelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConcessionPersonnel to aggregate.
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionPersonnels to fetch.
     */
    orderBy?: ConcessionPersonnelOrderByWithRelationInput | ConcessionPersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConcessionPersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionPersonnels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionPersonnels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConcessionPersonnels
    **/
    _count?: true | ConcessionPersonnelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConcessionPersonnelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConcessionPersonnelMaxAggregateInputType
  }

  export type GetConcessionPersonnelAggregateType<T extends ConcessionPersonnelAggregateArgs> = {
        [P in keyof T & keyof AggregateConcessionPersonnel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcessionPersonnel[P]>
      : GetScalarType<T[P], AggregateConcessionPersonnel[P]>
  }




  export type ConcessionPersonnelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcessionPersonnelWhereInput
    orderBy?: ConcessionPersonnelOrderByWithAggregationInput | ConcessionPersonnelOrderByWithAggregationInput[]
    by: ConcessionPersonnelScalarFieldEnum[] | ConcessionPersonnelScalarFieldEnum
    having?: ConcessionPersonnelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConcessionPersonnelCountAggregateInputType | true
    _min?: ConcessionPersonnelMinAggregateInputType
    _max?: ConcessionPersonnelMaxAggregateInputType
  }

  export type ConcessionPersonnelGroupByOutputType = {
    id: string
    concessionId: string
    externalStaffRef: string
    fullName: string
    phone: string
    status: string
    createdAt: Date
    _count: ConcessionPersonnelCountAggregateOutputType | null
    _min: ConcessionPersonnelMinAggregateOutputType | null
    _max: ConcessionPersonnelMaxAggregateOutputType | null
  }

  type GetConcessionPersonnelGroupByPayload<T extends ConcessionPersonnelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConcessionPersonnelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConcessionPersonnelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcessionPersonnelGroupByOutputType[P]>
            : GetScalarType<T[P], ConcessionPersonnelGroupByOutputType[P]>
        }
      >
    >


  export type ConcessionPersonnelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    externalStaffRef?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionPersonnel"]>

  export type ConcessionPersonnelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    externalStaffRef?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionPersonnel"]>

  export type ConcessionPersonnelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    externalStaffRef?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concessionPersonnel"]>

  export type ConcessionPersonnelSelectScalar = {
    id?: boolean
    concessionId?: boolean
    externalStaffRef?: boolean
    fullName?: boolean
    phone?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ConcessionPersonnelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concessionId" | "externalStaffRef" | "fullName" | "phone" | "status" | "createdAt", ExtArgs["result"]["concessionPersonnel"]>
  export type ConcessionPersonnelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ConcessionPersonnelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ConcessionPersonnelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }

  export type $ConcessionPersonnelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConcessionPersonnel"
    objects: {
      concession: Prisma.$ConcessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concessionId: string
      externalStaffRef: string
      fullName: string
      phone: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["concessionPersonnel"]>
    composites: {}
  }

  type ConcessionPersonnelGetPayload<S extends boolean | null | undefined | ConcessionPersonnelDefaultArgs> = $Result.GetResult<Prisma.$ConcessionPersonnelPayload, S>

  type ConcessionPersonnelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConcessionPersonnelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConcessionPersonnelCountAggregateInputType | true
    }

  export interface ConcessionPersonnelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConcessionPersonnel'], meta: { name: 'ConcessionPersonnel' } }
    /**
     * Find zero or one ConcessionPersonnel that matches the filter.
     * @param {ConcessionPersonnelFindUniqueArgs} args - Arguments to find a ConcessionPersonnel
     * @example
     * // Get one ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcessionPersonnelFindUniqueArgs>(args: SelectSubset<T, ConcessionPersonnelFindUniqueArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConcessionPersonnel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcessionPersonnelFindUniqueOrThrowArgs} args - Arguments to find a ConcessionPersonnel
     * @example
     * // Get one ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcessionPersonnelFindUniqueOrThrowArgs>(args: SelectSubset<T, ConcessionPersonnelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConcessionPersonnel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelFindFirstArgs} args - Arguments to find a ConcessionPersonnel
     * @example
     * // Get one ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcessionPersonnelFindFirstArgs>(args?: SelectSubset<T, ConcessionPersonnelFindFirstArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConcessionPersonnel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelFindFirstOrThrowArgs} args - Arguments to find a ConcessionPersonnel
     * @example
     * // Get one ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcessionPersonnelFindFirstOrThrowArgs>(args?: SelectSubset<T, ConcessionPersonnelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConcessionPersonnels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConcessionPersonnels
     * const concessionPersonnels = await prisma.concessionPersonnel.findMany()
     * 
     * // Get first 10 ConcessionPersonnels
     * const concessionPersonnels = await prisma.concessionPersonnel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const concessionPersonnelWithIdOnly = await prisma.concessionPersonnel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConcessionPersonnelFindManyArgs>(args?: SelectSubset<T, ConcessionPersonnelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConcessionPersonnel.
     * @param {ConcessionPersonnelCreateArgs} args - Arguments to create a ConcessionPersonnel.
     * @example
     * // Create one ConcessionPersonnel
     * const ConcessionPersonnel = await prisma.concessionPersonnel.create({
     *   data: {
     *     // ... data to create a ConcessionPersonnel
     *   }
     * })
     * 
     */
    create<T extends ConcessionPersonnelCreateArgs>(args: SelectSubset<T, ConcessionPersonnelCreateArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConcessionPersonnels.
     * @param {ConcessionPersonnelCreateManyArgs} args - Arguments to create many ConcessionPersonnels.
     * @example
     * // Create many ConcessionPersonnels
     * const concessionPersonnel = await prisma.concessionPersonnel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConcessionPersonnelCreateManyArgs>(args?: SelectSubset<T, ConcessionPersonnelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConcessionPersonnels and returns the data saved in the database.
     * @param {ConcessionPersonnelCreateManyAndReturnArgs} args - Arguments to create many ConcessionPersonnels.
     * @example
     * // Create many ConcessionPersonnels
     * const concessionPersonnel = await prisma.concessionPersonnel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConcessionPersonnels and only return the `id`
     * const concessionPersonnelWithIdOnly = await prisma.concessionPersonnel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConcessionPersonnelCreateManyAndReturnArgs>(args?: SelectSubset<T, ConcessionPersonnelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConcessionPersonnel.
     * @param {ConcessionPersonnelDeleteArgs} args - Arguments to delete one ConcessionPersonnel.
     * @example
     * // Delete one ConcessionPersonnel
     * const ConcessionPersonnel = await prisma.concessionPersonnel.delete({
     *   where: {
     *     // ... filter to delete one ConcessionPersonnel
     *   }
     * })
     * 
     */
    delete<T extends ConcessionPersonnelDeleteArgs>(args: SelectSubset<T, ConcessionPersonnelDeleteArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConcessionPersonnel.
     * @param {ConcessionPersonnelUpdateArgs} args - Arguments to update one ConcessionPersonnel.
     * @example
     * // Update one ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConcessionPersonnelUpdateArgs>(args: SelectSubset<T, ConcessionPersonnelUpdateArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConcessionPersonnels.
     * @param {ConcessionPersonnelDeleteManyArgs} args - Arguments to filter ConcessionPersonnels to delete.
     * @example
     * // Delete a few ConcessionPersonnels
     * const { count } = await prisma.concessionPersonnel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConcessionPersonnelDeleteManyArgs>(args?: SelectSubset<T, ConcessionPersonnelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConcessionPersonnels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConcessionPersonnels
     * const concessionPersonnel = await prisma.concessionPersonnel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConcessionPersonnelUpdateManyArgs>(args: SelectSubset<T, ConcessionPersonnelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConcessionPersonnels and returns the data updated in the database.
     * @param {ConcessionPersonnelUpdateManyAndReturnArgs} args - Arguments to update many ConcessionPersonnels.
     * @example
     * // Update many ConcessionPersonnels
     * const concessionPersonnel = await prisma.concessionPersonnel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConcessionPersonnels and only return the `id`
     * const concessionPersonnelWithIdOnly = await prisma.concessionPersonnel.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConcessionPersonnelUpdateManyAndReturnArgs>(args: SelectSubset<T, ConcessionPersonnelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConcessionPersonnel.
     * @param {ConcessionPersonnelUpsertArgs} args - Arguments to update or create a ConcessionPersonnel.
     * @example
     * // Update or create a ConcessionPersonnel
     * const concessionPersonnel = await prisma.concessionPersonnel.upsert({
     *   create: {
     *     // ... data to create a ConcessionPersonnel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConcessionPersonnel we want to update
     *   }
     * })
     */
    upsert<T extends ConcessionPersonnelUpsertArgs>(args: SelectSubset<T, ConcessionPersonnelUpsertArgs<ExtArgs>>): Prisma__ConcessionPersonnelClient<$Result.GetResult<Prisma.$ConcessionPersonnelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConcessionPersonnels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelCountArgs} args - Arguments to filter ConcessionPersonnels to count.
     * @example
     * // Count the number of ConcessionPersonnels
     * const count = await prisma.concessionPersonnel.count({
     *   where: {
     *     // ... the filter for the ConcessionPersonnels we want to count
     *   }
     * })
    **/
    count<T extends ConcessionPersonnelCountArgs>(
      args?: Subset<T, ConcessionPersonnelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcessionPersonnelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConcessionPersonnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConcessionPersonnelAggregateArgs>(args: Subset<T, ConcessionPersonnelAggregateArgs>): Prisma.PrismaPromise<GetConcessionPersonnelAggregateType<T>>

    /**
     * Group by ConcessionPersonnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPersonnelGroupByArgs} args - Group by arguments.
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
      T extends ConcessionPersonnelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcessionPersonnelGroupByArgs['orderBy'] }
        : { orderBy?: ConcessionPersonnelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConcessionPersonnelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConcessionPersonnelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConcessionPersonnel model
   */
  readonly fields: ConcessionPersonnelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConcessionPersonnel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcessionPersonnelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concession<T extends ConcessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConcessionDefaultArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ConcessionPersonnel model
   */
  interface ConcessionPersonnelFieldRefs {
    readonly id: FieldRef<"ConcessionPersonnel", 'String'>
    readonly concessionId: FieldRef<"ConcessionPersonnel", 'String'>
    readonly externalStaffRef: FieldRef<"ConcessionPersonnel", 'String'>
    readonly fullName: FieldRef<"ConcessionPersonnel", 'String'>
    readonly phone: FieldRef<"ConcessionPersonnel", 'String'>
    readonly status: FieldRef<"ConcessionPersonnel", 'String'>
    readonly createdAt: FieldRef<"ConcessionPersonnel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConcessionPersonnel findUnique
   */
  export type ConcessionPersonnelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionPersonnel to fetch.
     */
    where: ConcessionPersonnelWhereUniqueInput
  }

  /**
   * ConcessionPersonnel findUniqueOrThrow
   */
  export type ConcessionPersonnelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionPersonnel to fetch.
     */
    where: ConcessionPersonnelWhereUniqueInput
  }

  /**
   * ConcessionPersonnel findFirst
   */
  export type ConcessionPersonnelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionPersonnel to fetch.
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionPersonnels to fetch.
     */
    orderBy?: ConcessionPersonnelOrderByWithRelationInput | ConcessionPersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConcessionPersonnels.
     */
    cursor?: ConcessionPersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionPersonnels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionPersonnels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConcessionPersonnels.
     */
    distinct?: ConcessionPersonnelScalarFieldEnum | ConcessionPersonnelScalarFieldEnum[]
  }

  /**
   * ConcessionPersonnel findFirstOrThrow
   */
  export type ConcessionPersonnelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionPersonnel to fetch.
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionPersonnels to fetch.
     */
    orderBy?: ConcessionPersonnelOrderByWithRelationInput | ConcessionPersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConcessionPersonnels.
     */
    cursor?: ConcessionPersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionPersonnels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionPersonnels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConcessionPersonnels.
     */
    distinct?: ConcessionPersonnelScalarFieldEnum | ConcessionPersonnelScalarFieldEnum[]
  }

  /**
   * ConcessionPersonnel findMany
   */
  export type ConcessionPersonnelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter, which ConcessionPersonnels to fetch.
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConcessionPersonnels to fetch.
     */
    orderBy?: ConcessionPersonnelOrderByWithRelationInput | ConcessionPersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConcessionPersonnels.
     */
    cursor?: ConcessionPersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConcessionPersonnels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConcessionPersonnels.
     */
    skip?: number
    distinct?: ConcessionPersonnelScalarFieldEnum | ConcessionPersonnelScalarFieldEnum[]
  }

  /**
   * ConcessionPersonnel create
   */
  export type ConcessionPersonnelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * The data needed to create a ConcessionPersonnel.
     */
    data: XOR<ConcessionPersonnelCreateInput, ConcessionPersonnelUncheckedCreateInput>
  }

  /**
   * ConcessionPersonnel createMany
   */
  export type ConcessionPersonnelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConcessionPersonnels.
     */
    data: ConcessionPersonnelCreateManyInput | ConcessionPersonnelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConcessionPersonnel createManyAndReturn
   */
  export type ConcessionPersonnelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * The data used to create many ConcessionPersonnels.
     */
    data: ConcessionPersonnelCreateManyInput | ConcessionPersonnelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConcessionPersonnel update
   */
  export type ConcessionPersonnelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * The data needed to update a ConcessionPersonnel.
     */
    data: XOR<ConcessionPersonnelUpdateInput, ConcessionPersonnelUncheckedUpdateInput>
    /**
     * Choose, which ConcessionPersonnel to update.
     */
    where: ConcessionPersonnelWhereUniqueInput
  }

  /**
   * ConcessionPersonnel updateMany
   */
  export type ConcessionPersonnelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConcessionPersonnels.
     */
    data: XOR<ConcessionPersonnelUpdateManyMutationInput, ConcessionPersonnelUncheckedUpdateManyInput>
    /**
     * Filter which ConcessionPersonnels to update
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * Limit how many ConcessionPersonnels to update.
     */
    limit?: number
  }

  /**
   * ConcessionPersonnel updateManyAndReturn
   */
  export type ConcessionPersonnelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * The data used to update ConcessionPersonnels.
     */
    data: XOR<ConcessionPersonnelUpdateManyMutationInput, ConcessionPersonnelUncheckedUpdateManyInput>
    /**
     * Filter which ConcessionPersonnels to update
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * Limit how many ConcessionPersonnels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConcessionPersonnel upsert
   */
  export type ConcessionPersonnelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * The filter to search for the ConcessionPersonnel to update in case it exists.
     */
    where: ConcessionPersonnelWhereUniqueInput
    /**
     * In case the ConcessionPersonnel found by the `where` argument doesn't exist, create a new ConcessionPersonnel with this data.
     */
    create: XOR<ConcessionPersonnelCreateInput, ConcessionPersonnelUncheckedCreateInput>
    /**
     * In case the ConcessionPersonnel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcessionPersonnelUpdateInput, ConcessionPersonnelUncheckedUpdateInput>
  }

  /**
   * ConcessionPersonnel delete
   */
  export type ConcessionPersonnelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
    /**
     * Filter which ConcessionPersonnel to delete.
     */
    where: ConcessionPersonnelWhereUniqueInput
  }

  /**
   * ConcessionPersonnel deleteMany
   */
  export type ConcessionPersonnelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConcessionPersonnels to delete
     */
    where?: ConcessionPersonnelWhereInput
    /**
     * Limit how many ConcessionPersonnels to delete.
     */
    limit?: number
  }

  /**
   * ConcessionPersonnel without action
   */
  export type ConcessionPersonnelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcessionPersonnel
     */
    select?: ConcessionPersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConcessionPersonnel
     */
    omit?: ConcessionPersonnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcessionPersonnelInclude<ExtArgs> | null
  }


  /**
   * Model ApiClient
   */

  export type AggregateApiClient = {
    _count: ApiClientCountAggregateOutputType | null
    _min: ApiClientMinAggregateOutputType | null
    _max: ApiClientMaxAggregateOutputType | null
  }

  export type ApiClientMinAggregateOutputType = {
    id: string | null
    concessionId: string | null
    clientId: string | null
    clientSecretHash: string | null
    status: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ApiClientMaxAggregateOutputType = {
    id: string | null
    concessionId: string | null
    clientId: string | null
    clientSecretHash: string | null
    status: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ApiClientCountAggregateOutputType = {
    id: number
    concessionId: number
    clientId: number
    clientSecretHash: number
    status: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type ApiClientMinAggregateInputType = {
    id?: true
    concessionId?: true
    clientId?: true
    clientSecretHash?: true
    status?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ApiClientMaxAggregateInputType = {
    id?: true
    concessionId?: true
    clientId?: true
    clientSecretHash?: true
    status?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ApiClientCountAggregateInputType = {
    id?: true
    concessionId?: true
    clientId?: true
    clientSecretHash?: true
    status?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type ApiClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiClient to aggregate.
     */
    where?: ApiClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiClients to fetch.
     */
    orderBy?: ApiClientOrderByWithRelationInput | ApiClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiClients
    **/
    _count?: true | ApiClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiClientMaxAggregateInputType
  }

  export type GetApiClientAggregateType<T extends ApiClientAggregateArgs> = {
        [P in keyof T & keyof AggregateApiClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiClient[P]>
      : GetScalarType<T[P], AggregateApiClient[P]>
  }




  export type ApiClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiClientWhereInput
    orderBy?: ApiClientOrderByWithAggregationInput | ApiClientOrderByWithAggregationInput[]
    by: ApiClientScalarFieldEnum[] | ApiClientScalarFieldEnum
    having?: ApiClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiClientCountAggregateInputType | true
    _min?: ApiClientMinAggregateInputType
    _max?: ApiClientMaxAggregateInputType
  }

  export type ApiClientGroupByOutputType = {
    id: string
    concessionId: string
    clientId: string
    clientSecretHash: string
    status: string
    expiresAt: Date
    createdAt: Date
    _count: ApiClientCountAggregateOutputType | null
    _min: ApiClientMinAggregateOutputType | null
    _max: ApiClientMaxAggregateOutputType | null
  }

  type GetApiClientGroupByPayload<T extends ApiClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiClientGroupByOutputType[P]>
            : GetScalarType<T[P], ApiClientGroupByOutputType[P]>
        }
      >
    >


  export type ApiClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiClient"]>

  export type ApiClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiClient"]>

  export type ApiClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concessionId?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiClient"]>

  export type ApiClientSelectScalar = {
    id?: boolean
    concessionId?: boolean
    clientId?: boolean
    clientSecretHash?: boolean
    status?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type ApiClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concessionId" | "clientId" | "clientSecretHash" | "status" | "expiresAt" | "createdAt", ExtArgs["result"]["apiClient"]>
  export type ApiClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ApiClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }
  export type ApiClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concession?: boolean | ConcessionDefaultArgs<ExtArgs>
  }

  export type $ApiClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiClient"
    objects: {
      concession: Prisma.$ConcessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concessionId: string
      clientId: string
      clientSecretHash: string
      status: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["apiClient"]>
    composites: {}
  }

  type ApiClientGetPayload<S extends boolean | null | undefined | ApiClientDefaultArgs> = $Result.GetResult<Prisma.$ApiClientPayload, S>

  type ApiClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiClientCountAggregateInputType | true
    }

  export interface ApiClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiClient'], meta: { name: 'ApiClient' } }
    /**
     * Find zero or one ApiClient that matches the filter.
     * @param {ApiClientFindUniqueArgs} args - Arguments to find a ApiClient
     * @example
     * // Get one ApiClient
     * const apiClient = await prisma.apiClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiClientFindUniqueArgs>(args: SelectSubset<T, ApiClientFindUniqueArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiClientFindUniqueOrThrowArgs} args - Arguments to find a ApiClient
     * @example
     * // Get one ApiClient
     * const apiClient = await prisma.apiClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientFindFirstArgs} args - Arguments to find a ApiClient
     * @example
     * // Get one ApiClient
     * const apiClient = await prisma.apiClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiClientFindFirstArgs>(args?: SelectSubset<T, ApiClientFindFirstArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientFindFirstOrThrowArgs} args - Arguments to find a ApiClient
     * @example
     * // Get one ApiClient
     * const apiClient = await prisma.apiClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiClients
     * const apiClients = await prisma.apiClient.findMany()
     * 
     * // Get first 10 ApiClients
     * const apiClients = await prisma.apiClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiClientWithIdOnly = await prisma.apiClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiClientFindManyArgs>(args?: SelectSubset<T, ApiClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiClient.
     * @param {ApiClientCreateArgs} args - Arguments to create a ApiClient.
     * @example
     * // Create one ApiClient
     * const ApiClient = await prisma.apiClient.create({
     *   data: {
     *     // ... data to create a ApiClient
     *   }
     * })
     * 
     */
    create<T extends ApiClientCreateArgs>(args: SelectSubset<T, ApiClientCreateArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiClients.
     * @param {ApiClientCreateManyArgs} args - Arguments to create many ApiClients.
     * @example
     * // Create many ApiClients
     * const apiClient = await prisma.apiClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiClientCreateManyArgs>(args?: SelectSubset<T, ApiClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiClients and returns the data saved in the database.
     * @param {ApiClientCreateManyAndReturnArgs} args - Arguments to create many ApiClients.
     * @example
     * // Create many ApiClients
     * const apiClient = await prisma.apiClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiClients and only return the `id`
     * const apiClientWithIdOnly = await prisma.apiClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiClient.
     * @param {ApiClientDeleteArgs} args - Arguments to delete one ApiClient.
     * @example
     * // Delete one ApiClient
     * const ApiClient = await prisma.apiClient.delete({
     *   where: {
     *     // ... filter to delete one ApiClient
     *   }
     * })
     * 
     */
    delete<T extends ApiClientDeleteArgs>(args: SelectSubset<T, ApiClientDeleteArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiClient.
     * @param {ApiClientUpdateArgs} args - Arguments to update one ApiClient.
     * @example
     * // Update one ApiClient
     * const apiClient = await prisma.apiClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiClientUpdateArgs>(args: SelectSubset<T, ApiClientUpdateArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiClients.
     * @param {ApiClientDeleteManyArgs} args - Arguments to filter ApiClients to delete.
     * @example
     * // Delete a few ApiClients
     * const { count } = await prisma.apiClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiClientDeleteManyArgs>(args?: SelectSubset<T, ApiClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiClients
     * const apiClient = await prisma.apiClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiClientUpdateManyArgs>(args: SelectSubset<T, ApiClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiClients and returns the data updated in the database.
     * @param {ApiClientUpdateManyAndReturnArgs} args - Arguments to update many ApiClients.
     * @example
     * // Update many ApiClients
     * const apiClient = await prisma.apiClient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiClients and only return the `id`
     * const apiClientWithIdOnly = await prisma.apiClient.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiClient.
     * @param {ApiClientUpsertArgs} args - Arguments to update or create a ApiClient.
     * @example
     * // Update or create a ApiClient
     * const apiClient = await prisma.apiClient.upsert({
     *   create: {
     *     // ... data to create a ApiClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiClient we want to update
     *   }
     * })
     */
    upsert<T extends ApiClientUpsertArgs>(args: SelectSubset<T, ApiClientUpsertArgs<ExtArgs>>): Prisma__ApiClientClient<$Result.GetResult<Prisma.$ApiClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientCountArgs} args - Arguments to filter ApiClients to count.
     * @example
     * // Count the number of ApiClients
     * const count = await prisma.apiClient.count({
     *   where: {
     *     // ... the filter for the ApiClients we want to count
     *   }
     * })
    **/
    count<T extends ApiClientCountArgs>(
      args?: Subset<T, ApiClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiClientAggregateArgs>(args: Subset<T, ApiClientAggregateArgs>): Prisma.PrismaPromise<GetApiClientAggregateType<T>>

    /**
     * Group by ApiClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiClientGroupByArgs} args - Group by arguments.
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
      T extends ApiClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiClientGroupByArgs['orderBy'] }
        : { orderBy?: ApiClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiClient model
   */
  readonly fields: ApiClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concession<T extends ConcessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConcessionDefaultArgs<ExtArgs>>): Prisma__ConcessionClient<$Result.GetResult<Prisma.$ConcessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ApiClient model
   */
  interface ApiClientFieldRefs {
    readonly id: FieldRef<"ApiClient", 'String'>
    readonly concessionId: FieldRef<"ApiClient", 'String'>
    readonly clientId: FieldRef<"ApiClient", 'String'>
    readonly clientSecretHash: FieldRef<"ApiClient", 'String'>
    readonly status: FieldRef<"ApiClient", 'String'>
    readonly expiresAt: FieldRef<"ApiClient", 'DateTime'>
    readonly createdAt: FieldRef<"ApiClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiClient findUnique
   */
  export type ApiClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter, which ApiClient to fetch.
     */
    where: ApiClientWhereUniqueInput
  }

  /**
   * ApiClient findUniqueOrThrow
   */
  export type ApiClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter, which ApiClient to fetch.
     */
    where: ApiClientWhereUniqueInput
  }

  /**
   * ApiClient findFirst
   */
  export type ApiClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter, which ApiClient to fetch.
     */
    where?: ApiClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiClients to fetch.
     */
    orderBy?: ApiClientOrderByWithRelationInput | ApiClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiClients.
     */
    cursor?: ApiClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiClients.
     */
    distinct?: ApiClientScalarFieldEnum | ApiClientScalarFieldEnum[]
  }

  /**
   * ApiClient findFirstOrThrow
   */
  export type ApiClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter, which ApiClient to fetch.
     */
    where?: ApiClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiClients to fetch.
     */
    orderBy?: ApiClientOrderByWithRelationInput | ApiClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiClients.
     */
    cursor?: ApiClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiClients.
     */
    distinct?: ApiClientScalarFieldEnum | ApiClientScalarFieldEnum[]
  }

  /**
   * ApiClient findMany
   */
  export type ApiClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter, which ApiClients to fetch.
     */
    where?: ApiClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiClients to fetch.
     */
    orderBy?: ApiClientOrderByWithRelationInput | ApiClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiClients.
     */
    cursor?: ApiClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiClients.
     */
    skip?: number
    distinct?: ApiClientScalarFieldEnum | ApiClientScalarFieldEnum[]
  }

  /**
   * ApiClient create
   */
  export type ApiClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiClient.
     */
    data: XOR<ApiClientCreateInput, ApiClientUncheckedCreateInput>
  }

  /**
   * ApiClient createMany
   */
  export type ApiClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiClients.
     */
    data: ApiClientCreateManyInput | ApiClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiClient createManyAndReturn
   */
  export type ApiClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * The data used to create many ApiClients.
     */
    data: ApiClientCreateManyInput | ApiClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiClient update
   */
  export type ApiClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiClient.
     */
    data: XOR<ApiClientUpdateInput, ApiClientUncheckedUpdateInput>
    /**
     * Choose, which ApiClient to update.
     */
    where: ApiClientWhereUniqueInput
  }

  /**
   * ApiClient updateMany
   */
  export type ApiClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiClients.
     */
    data: XOR<ApiClientUpdateManyMutationInput, ApiClientUncheckedUpdateManyInput>
    /**
     * Filter which ApiClients to update
     */
    where?: ApiClientWhereInput
    /**
     * Limit how many ApiClients to update.
     */
    limit?: number
  }

  /**
   * ApiClient updateManyAndReturn
   */
  export type ApiClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * The data used to update ApiClients.
     */
    data: XOR<ApiClientUpdateManyMutationInput, ApiClientUncheckedUpdateManyInput>
    /**
     * Filter which ApiClients to update
     */
    where?: ApiClientWhereInput
    /**
     * Limit how many ApiClients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiClient upsert
   */
  export type ApiClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiClient to update in case it exists.
     */
    where: ApiClientWhereUniqueInput
    /**
     * In case the ApiClient found by the `where` argument doesn't exist, create a new ApiClient with this data.
     */
    create: XOR<ApiClientCreateInput, ApiClientUncheckedCreateInput>
    /**
     * In case the ApiClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiClientUpdateInput, ApiClientUncheckedUpdateInput>
  }

  /**
   * ApiClient delete
   */
  export type ApiClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
    /**
     * Filter which ApiClient to delete.
     */
    where: ApiClientWhereUniqueInput
  }

  /**
   * ApiClient deleteMany
   */
  export type ApiClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiClients to delete
     */
    where?: ApiClientWhereInput
    /**
     * Limit how many ApiClients to delete.
     */
    limit?: number
  }

  /**
   * ApiClient without action
   */
  export type ApiClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiClient
     */
    select?: ApiClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiClient
     */
    omit?: ApiClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiClientInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    code: 'code',
    zitadelId: 'zitadelId',
    countryId: 'countryId',
    email: 'email',
    fullName: 'fullName',
    phone: 'phone',
    status: 'status',
    invitedAt: 'invitedAt',
    invitedViaStub: 'invitedViaStub',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    scopeLevel: 'scopeLevel',
    isSystem: 'isSystem',
    status: 'status',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const ResourceScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt'
  };

  export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    resourceId: 'resourceId',
    action: 'action',
    code: 'code',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const RolePermissionScalarFieldEnum: {
    roleId: 'roleId',
    permissionId: 'permissionId',
    grantedBy: 'grantedBy',
    grantedAt: 'grantedAt'
  };

  export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    roleId: 'roleId',
    scopeLevel: 'scopeLevel',
    scopeRefId: 'scopeRefId',
    assignedBy: 'assignedBy',
    assignedAt: 'assignedAt'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const UserSocialConnectionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerUserId: 'providerUserId',
    email: 'email',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    connectedAt: 'connectedAt',
    lastUsedAt: 'lastUsedAt',
    status: 'status'
  };

  export type UserSocialConnectionScalarFieldEnum = (typeof UserSocialConnectionScalarFieldEnum)[keyof typeof UserSocialConnectionScalarFieldEnum]


  export const ConcessionScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    contactEmail: 'contactEmail',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConcessionScalarFieldEnum = (typeof ConcessionScalarFieldEnum)[keyof typeof ConcessionScalarFieldEnum]


  export const ConcessionAssemblyScalarFieldEnum: {
    id: 'id',
    concessionId: 'concessionId',
    assemblyId: 'assemblyId',
    contractStart: 'contractStart',
    contractEnd: 'contractEnd',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ConcessionAssemblyScalarFieldEnum = (typeof ConcessionAssemblyScalarFieldEnum)[keyof typeof ConcessionAssemblyScalarFieldEnum]


  export const ConcessionPersonnelScalarFieldEnum: {
    id: 'id',
    concessionId: 'concessionId',
    externalStaffRef: 'externalStaffRef',
    fullName: 'fullName',
    phone: 'phone',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ConcessionPersonnelScalarFieldEnum = (typeof ConcessionPersonnelScalarFieldEnum)[keyof typeof ConcessionPersonnelScalarFieldEnum]


  export const ApiClientScalarFieldEnum: {
    id: 'id',
    concessionId: 'concessionId',
    clientId: 'clientId',
    clientSecretHash: 'clientSecretHash',
    status: 'status',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type ApiClientScalarFieldEnum = (typeof ApiClientScalarFieldEnum)[keyof typeof ApiClientScalarFieldEnum]


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    code?: StringFilter<"User"> | string
    zitadelId?: StringFilter<"User"> | string
    countryId?: UuidNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    status?: StringFilter<"User"> | string
    invitedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    invitedViaStub?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socialConnections?: UserSocialConnectionListRelationFilter
    userRoles?: UserRoleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    zitadelId?: SortOrder
    countryId?: SortOrderInput | SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    status?: SortOrder
    invitedAt?: SortOrderInput | SortOrder
    invitedViaStub?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    socialConnections?: UserSocialConnectionOrderByRelationAggregateInput
    userRoles?: UserRoleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    zitadelId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    countryId?: UuidNullableFilter<"User"> | string | null
    fullName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    status?: StringFilter<"User"> | string
    invitedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    invitedViaStub?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    socialConnections?: UserSocialConnectionListRelationFilter
    userRoles?: UserRoleListRelationFilter
  }, "id" | "code" | "zitadelId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    zitadelId?: SortOrder
    countryId?: SortOrderInput | SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    status?: SortOrder
    invitedAt?: SortOrderInput | SortOrder
    invitedViaStub?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    code?: StringWithAggregatesFilter<"User"> | string
    zitadelId?: StringWithAggregatesFilter<"User"> | string
    countryId?: UuidNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    status?: StringWithAggregatesFilter<"User"> | string
    invitedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    invitedViaStub?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: UuidFilter<"Role"> | string
    code?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    scopeLevel?: StringFilter<"Role"> | string
    isSystem?: BoolFilter<"Role"> | boolean
    status?: StringFilter<"Role"> | string
    sortOrder?: IntFilter<"Role"> | number
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    rolePermissions?: RolePermissionListRelationFilter
    userRoles?: UserRoleListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    scopeLevel?: SortOrder
    isSystem?: SortOrder
    status?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rolePermissions?: RolePermissionOrderByRelationAggregateInput
    userRoles?: UserRoleOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    scopeLevel?: StringFilter<"Role"> | string
    isSystem?: BoolFilter<"Role"> | boolean
    status?: StringFilter<"Role"> | string
    sortOrder?: IntFilter<"Role"> | number
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    rolePermissions?: RolePermissionListRelationFilter
    userRoles?: UserRoleListRelationFilter
  }, "id" | "code">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    scopeLevel?: SortOrder
    isSystem?: SortOrder
    status?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Role"> | string
    code?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    scopeLevel?: StringWithAggregatesFilter<"Role"> | string
    isSystem?: BoolWithAggregatesFilter<"Role"> | boolean
    status?: StringWithAggregatesFilter<"Role"> | string
    sortOrder?: IntWithAggregatesFilter<"Role"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type ResourceWhereInput = {
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    id?: UuidFilter<"Resource"> | string
    code?: StringFilter<"Resource"> | string
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    sortOrder?: IntFilter<"Resource"> | number
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    permissions?: PermissionListRelationFilter
  }

  export type ResourceOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    permissions?: PermissionOrderByRelationAggregateInput
  }

  export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    sortOrder?: IntFilter<"Resource"> | number
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    permissions?: PermissionListRelationFilter
  }, "id" | "code">

  export type ResourceOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ResourceCountOrderByAggregateInput
    _avg?: ResourceAvgOrderByAggregateInput
    _max?: ResourceMaxOrderByAggregateInput
    _min?: ResourceMinOrderByAggregateInput
    _sum?: ResourceSumOrderByAggregateInput
  }

  export type ResourceScalarWhereWithAggregatesInput = {
    AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    OR?: ResourceScalarWhereWithAggregatesInput[]
    NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Resource"> | string
    code?: StringWithAggregatesFilter<"Resource"> | string
    name?: StringWithAggregatesFilter<"Resource"> | string
    description?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Resource"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: UuidFilter<"Permission"> | string
    resourceId?: UuidFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    code?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    rolePermissions?: RolePermissionListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    action?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    resource?: ResourceOrderByWithRelationInput
    rolePermissions?: RolePermissionOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    resourceId_action?: PermissionResourceIdActionCompoundUniqueInput
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    resourceId?: UuidFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    rolePermissions?: RolePermissionListRelationFilter
  }, "id" | "code" | "resourceId_action">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    action?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Permission"> | string
    resourceId?: UuidWithAggregatesFilter<"Permission"> | string
    action?: StringWithAggregatesFilter<"Permission"> | string
    code?: StringWithAggregatesFilter<"Permission"> | string
    description?: StringNullableWithAggregatesFilter<"Permission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type RolePermissionWhereInput = {
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
    grantedBy?: StringFilter<"RolePermission"> | string
    grantedAt?: DateTimeFilter<"RolePermission"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }

  export type RolePermissionOrderByWithRelationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    grantedBy?: SortOrder
    grantedAt?: SortOrder
    role?: RoleOrderByWithRelationInput
    permission?: PermissionOrderByWithRelationInput
  }

  export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    roleId_permissionId?: RolePermissionRoleIdPermissionIdCompoundUniqueInput
    AND?: RolePermissionWhereInput | RolePermissionWhereInput[]
    OR?: RolePermissionWhereInput[]
    NOT?: RolePermissionWhereInput | RolePermissionWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
    grantedBy?: StringFilter<"RolePermission"> | string
    grantedAt?: DateTimeFilter<"RolePermission"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }, "roleId_permissionId">

  export type RolePermissionOrderByWithAggregationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    grantedBy?: SortOrder
    grantedAt?: SortOrder
    _count?: RolePermissionCountOrderByAggregateInput
    _max?: RolePermissionMaxOrderByAggregateInput
    _min?: RolePermissionMinOrderByAggregateInput
  }

  export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    OR?: RolePermissionScalarWhereWithAggregatesInput[]
    NOT?: RolePermissionScalarWhereWithAggregatesInput | RolePermissionScalarWhereWithAggregatesInput[]
    roleId?: UuidWithAggregatesFilter<"RolePermission"> | string
    permissionId?: UuidWithAggregatesFilter<"RolePermission"> | string
    grantedBy?: StringWithAggregatesFilter<"RolePermission"> | string
    grantedAt?: DateTimeWithAggregatesFilter<"RolePermission"> | Date | string
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    id?: UuidFilter<"UserRole"> | string
    userId?: UuidFilter<"UserRole"> | string
    roleId?: UuidFilter<"UserRole"> | string
    scopeLevel?: StringFilter<"UserRole"> | string
    scopeRefId?: UuidNullableFilter<"UserRole"> | string | null
    assignedBy?: StringFilter<"UserRole"> | string
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    scopeLevel?: SortOrder
    scopeRefId?: SortOrderInput | SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_roleId?: UserRoleUserIdRoleIdCompoundUniqueInput
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    userId?: UuidFilter<"UserRole"> | string
    roleId?: UuidFilter<"UserRole"> | string
    scopeLevel?: StringFilter<"UserRole"> | string
    scopeRefId?: UuidNullableFilter<"UserRole"> | string | null
    assignedBy?: StringFilter<"UserRole"> | string
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id" | "userId_roleId">

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    scopeLevel?: SortOrder
    scopeRefId?: SortOrderInput | SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    OR?: UserRoleScalarWhereWithAggregatesInput[]
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserRole"> | string
    userId?: UuidWithAggregatesFilter<"UserRole"> | string
    roleId?: UuidWithAggregatesFilter<"UserRole"> | string
    scopeLevel?: StringWithAggregatesFilter<"UserRole"> | string
    scopeRefId?: UuidNullableWithAggregatesFilter<"UserRole"> | string | null
    assignedBy?: StringWithAggregatesFilter<"UserRole"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string
  }

  export type UserSocialConnectionWhereInput = {
    AND?: UserSocialConnectionWhereInput | UserSocialConnectionWhereInput[]
    OR?: UserSocialConnectionWhereInput[]
    NOT?: UserSocialConnectionWhereInput | UserSocialConnectionWhereInput[]
    id?: UuidFilter<"UserSocialConnection"> | string
    userId?: UuidFilter<"UserSocialConnection"> | string
    provider?: StringFilter<"UserSocialConnection"> | string
    providerUserId?: StringFilter<"UserSocialConnection"> | string
    email?: StringNullableFilter<"UserSocialConnection"> | string | null
    displayName?: StringNullableFilter<"UserSocialConnection"> | string | null
    avatarUrl?: StringNullableFilter<"UserSocialConnection"> | string | null
    connectedAt?: DateTimeFilter<"UserSocialConnection"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"UserSocialConnection"> | Date | string | null
    status?: StringFilter<"UserSocialConnection"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSocialConnectionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    connectedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSocialConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerUserId?: UserSocialConnectionProviderProviderUserIdCompoundUniqueInput
    userId_provider?: UserSocialConnectionUserIdProviderCompoundUniqueInput
    AND?: UserSocialConnectionWhereInput | UserSocialConnectionWhereInput[]
    OR?: UserSocialConnectionWhereInput[]
    NOT?: UserSocialConnectionWhereInput | UserSocialConnectionWhereInput[]
    userId?: UuidFilter<"UserSocialConnection"> | string
    provider?: StringFilter<"UserSocialConnection"> | string
    providerUserId?: StringFilter<"UserSocialConnection"> | string
    email?: StringNullableFilter<"UserSocialConnection"> | string | null
    displayName?: StringNullableFilter<"UserSocialConnection"> | string | null
    avatarUrl?: StringNullableFilter<"UserSocialConnection"> | string | null
    connectedAt?: DateTimeFilter<"UserSocialConnection"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"UserSocialConnection"> | Date | string | null
    status?: StringFilter<"UserSocialConnection"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerUserId" | "userId_provider">

  export type UserSocialConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    connectedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: UserSocialConnectionCountOrderByAggregateInput
    _max?: UserSocialConnectionMaxOrderByAggregateInput
    _min?: UserSocialConnectionMinOrderByAggregateInput
  }

  export type UserSocialConnectionScalarWhereWithAggregatesInput = {
    AND?: UserSocialConnectionScalarWhereWithAggregatesInput | UserSocialConnectionScalarWhereWithAggregatesInput[]
    OR?: UserSocialConnectionScalarWhereWithAggregatesInput[]
    NOT?: UserSocialConnectionScalarWhereWithAggregatesInput | UserSocialConnectionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserSocialConnection"> | string
    userId?: UuidWithAggregatesFilter<"UserSocialConnection"> | string
    provider?: StringWithAggregatesFilter<"UserSocialConnection"> | string
    providerUserId?: StringWithAggregatesFilter<"UserSocialConnection"> | string
    email?: StringNullableWithAggregatesFilter<"UserSocialConnection"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"UserSocialConnection"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"UserSocialConnection"> | string | null
    connectedAt?: DateTimeWithAggregatesFilter<"UserSocialConnection"> | Date | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"UserSocialConnection"> | Date | string | null
    status?: StringWithAggregatesFilter<"UserSocialConnection"> | string
  }

  export type ConcessionWhereInput = {
    AND?: ConcessionWhereInput | ConcessionWhereInput[]
    OR?: ConcessionWhereInput[]
    NOT?: ConcessionWhereInput | ConcessionWhereInput[]
    id?: UuidFilter<"Concession"> | string
    code?: StringFilter<"Concession"> | string
    name?: StringFilter<"Concession"> | string
    contactEmail?: StringFilter<"Concession"> | string
    status?: StringFilter<"Concession"> | string
    createdAt?: DateTimeFilter<"Concession"> | Date | string
    updatedAt?: DateTimeFilter<"Concession"> | Date | string
    assemblies?: ConcessionAssemblyListRelationFilter
    personnel?: ConcessionPersonnelListRelationFilter
    apiClients?: ApiClientListRelationFilter
  }

  export type ConcessionOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    contactEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assemblies?: ConcessionAssemblyOrderByRelationAggregateInput
    personnel?: ConcessionPersonnelOrderByRelationAggregateInput
    apiClients?: ApiClientOrderByRelationAggregateInput
  }

  export type ConcessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ConcessionWhereInput | ConcessionWhereInput[]
    OR?: ConcessionWhereInput[]
    NOT?: ConcessionWhereInput | ConcessionWhereInput[]
    name?: StringFilter<"Concession"> | string
    contactEmail?: StringFilter<"Concession"> | string
    status?: StringFilter<"Concession"> | string
    createdAt?: DateTimeFilter<"Concession"> | Date | string
    updatedAt?: DateTimeFilter<"Concession"> | Date | string
    assemblies?: ConcessionAssemblyListRelationFilter
    personnel?: ConcessionPersonnelListRelationFilter
    apiClients?: ApiClientListRelationFilter
  }, "id" | "code">

  export type ConcessionOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    contactEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConcessionCountOrderByAggregateInput
    _max?: ConcessionMaxOrderByAggregateInput
    _min?: ConcessionMinOrderByAggregateInput
  }

  export type ConcessionScalarWhereWithAggregatesInput = {
    AND?: ConcessionScalarWhereWithAggregatesInput | ConcessionScalarWhereWithAggregatesInput[]
    OR?: ConcessionScalarWhereWithAggregatesInput[]
    NOT?: ConcessionScalarWhereWithAggregatesInput | ConcessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Concession"> | string
    code?: StringWithAggregatesFilter<"Concession"> | string
    name?: StringWithAggregatesFilter<"Concession"> | string
    contactEmail?: StringWithAggregatesFilter<"Concession"> | string
    status?: StringWithAggregatesFilter<"Concession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Concession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Concession"> | Date | string
  }

  export type ConcessionAssemblyWhereInput = {
    AND?: ConcessionAssemblyWhereInput | ConcessionAssemblyWhereInput[]
    OR?: ConcessionAssemblyWhereInput[]
    NOT?: ConcessionAssemblyWhereInput | ConcessionAssemblyWhereInput[]
    id?: UuidFilter<"ConcessionAssembly"> | string
    concessionId?: UuidFilter<"ConcessionAssembly"> | string
    assemblyId?: UuidFilter<"ConcessionAssembly"> | string
    contractStart?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    contractEnd?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    status?: StringFilter<"ConcessionAssembly"> | string
    createdAt?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }

  export type ConcessionAssemblyOrderByWithRelationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    concession?: ConcessionOrderByWithRelationInput
  }

  export type ConcessionAssemblyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    concessionId_assemblyId?: ConcessionAssemblyConcessionIdAssemblyIdCompoundUniqueInput
    AND?: ConcessionAssemblyWhereInput | ConcessionAssemblyWhereInput[]
    OR?: ConcessionAssemblyWhereInput[]
    NOT?: ConcessionAssemblyWhereInput | ConcessionAssemblyWhereInput[]
    concessionId?: UuidFilter<"ConcessionAssembly"> | string
    assemblyId?: UuidFilter<"ConcessionAssembly"> | string
    contractStart?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    contractEnd?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    status?: StringFilter<"ConcessionAssembly"> | string
    createdAt?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }, "id" | "concessionId_assemblyId">

  export type ConcessionAssemblyOrderByWithAggregationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ConcessionAssemblyCountOrderByAggregateInput
    _max?: ConcessionAssemblyMaxOrderByAggregateInput
    _min?: ConcessionAssemblyMinOrderByAggregateInput
  }

  export type ConcessionAssemblyScalarWhereWithAggregatesInput = {
    AND?: ConcessionAssemblyScalarWhereWithAggregatesInput | ConcessionAssemblyScalarWhereWithAggregatesInput[]
    OR?: ConcessionAssemblyScalarWhereWithAggregatesInput[]
    NOT?: ConcessionAssemblyScalarWhereWithAggregatesInput | ConcessionAssemblyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ConcessionAssembly"> | string
    concessionId?: UuidWithAggregatesFilter<"ConcessionAssembly"> | string
    assemblyId?: UuidWithAggregatesFilter<"ConcessionAssembly"> | string
    contractStart?: DateTimeWithAggregatesFilter<"ConcessionAssembly"> | Date | string
    contractEnd?: DateTimeWithAggregatesFilter<"ConcessionAssembly"> | Date | string
    status?: StringWithAggregatesFilter<"ConcessionAssembly"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ConcessionAssembly"> | Date | string
  }

  export type ConcessionPersonnelWhereInput = {
    AND?: ConcessionPersonnelWhereInput | ConcessionPersonnelWhereInput[]
    OR?: ConcessionPersonnelWhereInput[]
    NOT?: ConcessionPersonnelWhereInput | ConcessionPersonnelWhereInput[]
    id?: UuidFilter<"ConcessionPersonnel"> | string
    concessionId?: UuidFilter<"ConcessionPersonnel"> | string
    externalStaffRef?: StringFilter<"ConcessionPersonnel"> | string
    fullName?: StringFilter<"ConcessionPersonnel"> | string
    phone?: StringFilter<"ConcessionPersonnel"> | string
    status?: StringFilter<"ConcessionPersonnel"> | string
    createdAt?: DateTimeFilter<"ConcessionPersonnel"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }

  export type ConcessionPersonnelOrderByWithRelationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    externalStaffRef?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    concession?: ConcessionOrderByWithRelationInput
  }

  export type ConcessionPersonnelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    concessionId_externalStaffRef?: ConcessionPersonnelConcessionIdExternalStaffRefCompoundUniqueInput
    AND?: ConcessionPersonnelWhereInput | ConcessionPersonnelWhereInput[]
    OR?: ConcessionPersonnelWhereInput[]
    NOT?: ConcessionPersonnelWhereInput | ConcessionPersonnelWhereInput[]
    concessionId?: UuidFilter<"ConcessionPersonnel"> | string
    externalStaffRef?: StringFilter<"ConcessionPersonnel"> | string
    fullName?: StringFilter<"ConcessionPersonnel"> | string
    phone?: StringFilter<"ConcessionPersonnel"> | string
    status?: StringFilter<"ConcessionPersonnel"> | string
    createdAt?: DateTimeFilter<"ConcessionPersonnel"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }, "id" | "concessionId_externalStaffRef">

  export type ConcessionPersonnelOrderByWithAggregationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    externalStaffRef?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ConcessionPersonnelCountOrderByAggregateInput
    _max?: ConcessionPersonnelMaxOrderByAggregateInput
    _min?: ConcessionPersonnelMinOrderByAggregateInput
  }

  export type ConcessionPersonnelScalarWhereWithAggregatesInput = {
    AND?: ConcessionPersonnelScalarWhereWithAggregatesInput | ConcessionPersonnelScalarWhereWithAggregatesInput[]
    OR?: ConcessionPersonnelScalarWhereWithAggregatesInput[]
    NOT?: ConcessionPersonnelScalarWhereWithAggregatesInput | ConcessionPersonnelScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ConcessionPersonnel"> | string
    concessionId?: UuidWithAggregatesFilter<"ConcessionPersonnel"> | string
    externalStaffRef?: StringWithAggregatesFilter<"ConcessionPersonnel"> | string
    fullName?: StringWithAggregatesFilter<"ConcessionPersonnel"> | string
    phone?: StringWithAggregatesFilter<"ConcessionPersonnel"> | string
    status?: StringWithAggregatesFilter<"ConcessionPersonnel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ConcessionPersonnel"> | Date | string
  }

  export type ApiClientWhereInput = {
    AND?: ApiClientWhereInput | ApiClientWhereInput[]
    OR?: ApiClientWhereInput[]
    NOT?: ApiClientWhereInput | ApiClientWhereInput[]
    id?: UuidFilter<"ApiClient"> | string
    concessionId?: UuidFilter<"ApiClient"> | string
    clientId?: StringFilter<"ApiClient"> | string
    clientSecretHash?: StringFilter<"ApiClient"> | string
    status?: StringFilter<"ApiClient"> | string
    expiresAt?: DateTimeFilter<"ApiClient"> | Date | string
    createdAt?: DateTimeFilter<"ApiClient"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }

  export type ApiClientOrderByWithRelationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    concession?: ConcessionOrderByWithRelationInput
  }

  export type ApiClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientId?: string
    AND?: ApiClientWhereInput | ApiClientWhereInput[]
    OR?: ApiClientWhereInput[]
    NOT?: ApiClientWhereInput | ApiClientWhereInput[]
    concessionId?: UuidFilter<"ApiClient"> | string
    clientSecretHash?: StringFilter<"ApiClient"> | string
    status?: StringFilter<"ApiClient"> | string
    expiresAt?: DateTimeFilter<"ApiClient"> | Date | string
    createdAt?: DateTimeFilter<"ApiClient"> | Date | string
    concession?: XOR<ConcessionScalarRelationFilter, ConcessionWhereInput>
  }, "id" | "clientId">

  export type ApiClientOrderByWithAggregationInput = {
    id?: SortOrder
    concessionId?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: ApiClientCountOrderByAggregateInput
    _max?: ApiClientMaxOrderByAggregateInput
    _min?: ApiClientMinOrderByAggregateInput
  }

  export type ApiClientScalarWhereWithAggregatesInput = {
    AND?: ApiClientScalarWhereWithAggregatesInput | ApiClientScalarWhereWithAggregatesInput[]
    OR?: ApiClientScalarWhereWithAggregatesInput[]
    NOT?: ApiClientScalarWhereWithAggregatesInput | ApiClientScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ApiClient"> | string
    concessionId?: UuidWithAggregatesFilter<"ApiClient"> | string
    clientId?: StringWithAggregatesFilter<"ApiClient"> | string
    clientSecretHash?: StringWithAggregatesFilter<"ApiClient"> | string
    status?: StringWithAggregatesFilter<"ApiClient"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"ApiClient"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ApiClient"> | Date | string
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

  export type UserCreateInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialConnections?: UserSocialConnectionCreateNestedManyWithoutUserInput
    userRoles?: UserRoleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialConnections?: UserSocialConnectionUncheckedCreateNestedManyWithoutUserInput
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialConnections?: UserSocialConnectionUpdateManyWithoutUserNestedInput
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialConnections?: UserSocialConnectionUncheckedUpdateManyWithoutUserNestedInput
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rolePermissions?: RolePermissionCreateNestedManyWithoutRoleInput
    userRoles?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUpdateManyWithoutRoleNestedInput
    userRoles?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
    userRoles?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    sortOrder?: number
    createdAt?: Date | string
    permissions?: PermissionCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    sortOrder?: number
    createdAt?: Date | string
    permissions?: PermissionUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
    resource: ResourceCreateNestedOneWithoutPermissionsInput
    rolePermissions?: RolePermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    resourceId: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutPermissionsNestedInput
    rolePermissions?: RolePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    resourceId: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateInput = {
    grantedBy: string
    grantedAt?: Date | string
    role: RoleCreateNestedOneWithoutRolePermissionsInput
    permission: PermissionCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateInput = {
    roleId: string
    permissionId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type RolePermissionUpdateInput = {
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutRolePermissionsNestedInput
    permission?: PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyInput = {
    roleId: string
    permissionId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type RolePermissionUpdateManyMutationInput = {
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateInput = {
    id?: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
    user: UserCreateNestedOneWithoutUserRolesInput
    role: RoleCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateInput = {
    id?: string
    userId: string
    roleId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type UserRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput
    role?: RoleUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyInput = {
    id?: string
    userId: string
    roleId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type UserRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialConnectionCreateInput = {
    id?: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
    user: UserCreateNestedOneWithoutSocialConnectionsInput
  }

  export type UserSocialConnectionUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
  }

  export type UserSocialConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSocialConnectionsNestedInput
  }

  export type UserSocialConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserSocialConnectionCreateManyInput = {
    id?: string
    userId: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
  }

  export type UserSocialConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserSocialConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ConcessionCreateInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyCreateNestedManyWithoutConcessionInput
    personnel?: ConcessionPersonnelCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyUncheckedCreateNestedManyWithoutConcessionInput
    personnel?: ConcessionPersonnelUncheckedCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientUncheckedCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUpdateManyWithoutConcessionNestedInput
    personnel?: ConcessionPersonnelUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUncheckedUpdateManyWithoutConcessionNestedInput
    personnel?: ConcessionPersonnelUncheckedUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUncheckedUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionCreateManyInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConcessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyCreateInput = {
    id?: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
    concession: ConcessionCreateNestedOneWithoutAssembliesInput
  }

  export type ConcessionAssemblyUncheckedCreateInput = {
    id?: string
    concessionId: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionAssemblyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concession?: ConcessionUpdateOneRequiredWithoutAssembliesNestedInput
  }

  export type ConcessionAssemblyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyCreateManyInput = {
    id?: string
    concessionId: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionAssemblyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelCreateInput = {
    id?: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
    concession: ConcessionCreateNestedOneWithoutPersonnelInput
  }

  export type ConcessionPersonnelUncheckedCreateInput = {
    id?: string
    concessionId: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionPersonnelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concession?: ConcessionUpdateOneRequiredWithoutPersonnelNestedInput
  }

  export type ConcessionPersonnelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelCreateManyInput = {
    id?: string
    concessionId: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionPersonnelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientCreateInput = {
    id?: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
    concession: ConcessionCreateNestedOneWithoutApiClientsInput
  }

  export type ApiClientUncheckedCreateInput = {
    id?: string
    concessionId: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ApiClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concession?: ConcessionUpdateOneRequiredWithoutApiClientsNestedInput
  }

  export type ApiClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientCreateManyInput = {
    id?: string
    concessionId: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ApiClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concessionId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type UserSocialConnectionListRelationFilter = {
    every?: UserSocialConnectionWhereInput
    some?: UserSocialConnectionWhereInput
    none?: UserSocialConnectionWhereInput
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserSocialConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    zitadelId?: SortOrder
    countryId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    invitedAt?: SortOrder
    invitedViaStub?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    zitadelId?: SortOrder
    countryId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    invitedAt?: SortOrder
    invitedViaStub?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    zitadelId?: SortOrder
    countryId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    invitedAt?: SortOrder
    invitedViaStub?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type RolePermissionListRelationFilter = {
    every?: RolePermissionWhereInput
    some?: RolePermissionWhereInput
    none?: RolePermissionWhereInput
  }

  export type RolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    scopeLevel?: SortOrder
    isSystem?: SortOrder
    status?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    scopeLevel?: SortOrder
    isSystem?: SortOrder
    status?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    scopeLevel?: SortOrder
    isSystem?: SortOrder
    status?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    sortOrder?: SortOrder
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

  export type PermissionListRelationFilter = {
    every?: PermissionWhereInput
    some?: PermissionWhereInput
    none?: PermissionWhereInput
  }

  export type PermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type ResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type ResourceScalarRelationFilter = {
    is?: ResourceWhereInput
    isNot?: ResourceWhereInput
  }

  export type PermissionResourceIdActionCompoundUniqueInput = {
    resourceId: string
    action: string
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    action?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    action?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    action?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type PermissionScalarRelationFilter = {
    is?: PermissionWhereInput
    isNot?: PermissionWhereInput
  }

  export type RolePermissionRoleIdPermissionIdCompoundUniqueInput = {
    roleId: string
    permissionId: string
  }

  export type RolePermissionCountOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    grantedBy?: SortOrder
    grantedAt?: SortOrder
  }

  export type RolePermissionMaxOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    grantedBy?: SortOrder
    grantedAt?: SortOrder
  }

  export type RolePermissionMinOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    grantedBy?: SortOrder
    grantedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserRoleUserIdRoleIdCompoundUniqueInput = {
    userId: string
    roleId: string
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    scopeLevel?: SortOrder
    scopeRefId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    scopeLevel?: SortOrder
    scopeRefId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    roleId?: SortOrder
    scopeLevel?: SortOrder
    scopeRefId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
  }

  export type UserSocialConnectionProviderProviderUserIdCompoundUniqueInput = {
    provider: string
    providerUserId: string
  }

  export type UserSocialConnectionUserIdProviderCompoundUniqueInput = {
    userId: string
    provider: string
  }

  export type UserSocialConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    connectedAt?: SortOrder
    lastUsedAt?: SortOrder
    status?: SortOrder
  }

  export type UserSocialConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    connectedAt?: SortOrder
    lastUsedAt?: SortOrder
    status?: SortOrder
  }

  export type UserSocialConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerUserId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    connectedAt?: SortOrder
    lastUsedAt?: SortOrder
    status?: SortOrder
  }

  export type ConcessionAssemblyListRelationFilter = {
    every?: ConcessionAssemblyWhereInput
    some?: ConcessionAssemblyWhereInput
    none?: ConcessionAssemblyWhereInput
  }

  export type ConcessionPersonnelListRelationFilter = {
    every?: ConcessionPersonnelWhereInput
    some?: ConcessionPersonnelWhereInput
    none?: ConcessionPersonnelWhereInput
  }

  export type ApiClientListRelationFilter = {
    every?: ApiClientWhereInput
    some?: ApiClientWhereInput
    none?: ApiClientWhereInput
  }

  export type ConcessionAssemblyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConcessionPersonnelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConcessionCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    contactEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcessionMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    contactEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcessionMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    contactEmail?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcessionScalarRelationFilter = {
    is?: ConcessionWhereInput
    isNot?: ConcessionWhereInput
  }

  export type ConcessionAssemblyConcessionIdAssemblyIdCompoundUniqueInput = {
    concessionId: string
    assemblyId: string
  }

  export type ConcessionAssemblyCountOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConcessionAssemblyMaxOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConcessionAssemblyMinOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    assemblyId?: SortOrder
    contractStart?: SortOrder
    contractEnd?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConcessionPersonnelConcessionIdExternalStaffRefCompoundUniqueInput = {
    concessionId: string
    externalStaffRef: string
  }

  export type ConcessionPersonnelCountOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    externalStaffRef?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConcessionPersonnelMaxOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    externalStaffRef?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ConcessionPersonnelMinOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    externalStaffRef?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiClientCountOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiClientMaxOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiClientMinOrderByAggregateInput = {
    id?: SortOrder
    concessionId?: SortOrder
    clientId?: SortOrder
    clientSecretHash?: SortOrder
    status?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
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

  export type UserSocialConnectionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput> | UserSocialConnectionCreateWithoutUserInput[] | UserSocialConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSocialConnectionCreateOrConnectWithoutUserInput | UserSocialConnectionCreateOrConnectWithoutUserInput[]
    createMany?: UserSocialConnectionCreateManyUserInputEnvelope
    connect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type UserSocialConnectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput> | UserSocialConnectionCreateWithoutUserInput[] | UserSocialConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSocialConnectionCreateOrConnectWithoutUserInput | UserSocialConnectionCreateOrConnectWithoutUserInput[]
    createMany?: UserSocialConnectionCreateManyUserInputEnvelope
    connect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserSocialConnectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput> | UserSocialConnectionCreateWithoutUserInput[] | UserSocialConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSocialConnectionCreateOrConnectWithoutUserInput | UserSocialConnectionCreateOrConnectWithoutUserInput[]
    upsert?: UserSocialConnectionUpsertWithWhereUniqueWithoutUserInput | UserSocialConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSocialConnectionCreateManyUserInputEnvelope
    set?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    disconnect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    delete?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    connect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    update?: UserSocialConnectionUpdateWithWhereUniqueWithoutUserInput | UserSocialConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSocialConnectionUpdateManyWithWhereWithoutUserInput | UserSocialConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSocialConnectionScalarWhereInput | UserSocialConnectionScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type UserSocialConnectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput> | UserSocialConnectionCreateWithoutUserInput[] | UserSocialConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSocialConnectionCreateOrConnectWithoutUserInput | UserSocialConnectionCreateOrConnectWithoutUserInput[]
    upsert?: UserSocialConnectionUpsertWithWhereUniqueWithoutUserInput | UserSocialConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSocialConnectionCreateManyUserInputEnvelope
    set?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    disconnect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    delete?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    connect?: UserSocialConnectionWhereUniqueInput | UserSocialConnectionWhereUniqueInput[]
    update?: UserSocialConnectionUpdateWithWhereUniqueWithoutUserInput | UserSocialConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSocialConnectionUpdateManyWithWhereWithoutUserInput | UserSocialConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSocialConnectionScalarWhereInput | UserSocialConnectionScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput> | RolePermissionCreateWithoutRoleInput[] | RolePermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutRoleInput | RolePermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutRoleInput | RolePermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePermissionCreateManyRoleInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutRoleInput | RolePermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutRoleInput | RolePermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type PermissionCreateNestedManyWithoutResourceInput = {
    create?: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput> | PermissionCreateWithoutResourceInput[] | PermissionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutResourceInput | PermissionCreateOrConnectWithoutResourceInput[]
    createMany?: PermissionCreateManyResourceInputEnvelope
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type PermissionUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput> | PermissionCreateWithoutResourceInput[] | PermissionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutResourceInput | PermissionCreateOrConnectWithoutResourceInput[]
    createMany?: PermissionCreateManyResourceInputEnvelope
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type PermissionUpdateManyWithoutResourceNestedInput = {
    create?: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput> | PermissionCreateWithoutResourceInput[] | PermissionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutResourceInput | PermissionCreateOrConnectWithoutResourceInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutResourceInput | PermissionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: PermissionCreateManyResourceInputEnvelope
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutResourceInput | PermissionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutResourceInput | PermissionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type PermissionUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput> | PermissionCreateWithoutResourceInput[] | PermissionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutResourceInput | PermissionCreateOrConnectWithoutResourceInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutResourceInput | PermissionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: PermissionCreateManyResourceInputEnvelope
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutResourceInput | PermissionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutResourceInput | PermissionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type ResourceCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<ResourceCreateWithoutPermissionsInput, ResourceUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutPermissionsInput
    connect?: ResourceWhereUniqueInput
  }

  export type RolePermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type RolePermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
  }

  export type ResourceUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<ResourceCreateWithoutPermissionsInput, ResourceUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutPermissionsInput
    upsert?: ResourceUpsertWithoutPermissionsInput
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutPermissionsInput, ResourceUpdateWithoutPermissionsInput>, ResourceUncheckedUpdateWithoutPermissionsInput>
  }

  export type RolePermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput> | RolePermissionCreateWithoutPermissionInput[] | RolePermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RolePermissionCreateOrConnectWithoutPermissionInput | RolePermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RolePermissionCreateManyPermissionInputEnvelope
    set?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    disconnect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    delete?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    connect?: RolePermissionWhereUniqueInput | RolePermissionWhereUniqueInput[]
    update?: RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RolePermissionUpdateManyWithWhereWithoutPermissionInput | RolePermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutRolePermissionsInput = {
    create?: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type PermissionCreateNestedOneWithoutRolePermissionsInput = {
    create?: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionsInput
    connect?: PermissionWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutRolePermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRolePermissionsInput
    upsert?: RoleUpsertWithoutRolePermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutRolePermissionsInput, RoleUpdateWithoutRolePermissionsInput>, RoleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput = {
    create?: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolePermissionsInput
    upsert?: PermissionUpsertWithoutRolePermissionsInput
    connect?: PermissionWhereUniqueInput
    update?: XOR<XOR<PermissionUpdateToOneWithWhereWithoutRolePermissionsInput, PermissionUpdateWithoutRolePermissionsInput>, PermissionUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type UserCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUserRolesInput = {
    create?: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserRolesInput
    connect?: RoleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserRolesInput
    upsert?: UserUpsertWithoutUserRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserRolesInput, UserUpdateWithoutUserRolesInput>, UserUncheckedUpdateWithoutUserRolesInput>
  }

  export type RoleUpdateOneRequiredWithoutUserRolesNestedInput = {
    create?: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserRolesInput
    upsert?: RoleUpsertWithoutUserRolesInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUserRolesInput, RoleUpdateWithoutUserRolesInput>, RoleUncheckedUpdateWithoutUserRolesInput>
  }

  export type UserCreateNestedOneWithoutSocialConnectionsInput = {
    create?: XOR<UserCreateWithoutSocialConnectionsInput, UserUncheckedCreateWithoutSocialConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSocialConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutSocialConnectionsInput, UserUncheckedCreateWithoutSocialConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSocialConnectionsInput
    upsert?: UserUpsertWithoutSocialConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSocialConnectionsInput, UserUpdateWithoutSocialConnectionsInput>, UserUncheckedUpdateWithoutSocialConnectionsInput>
  }

  export type ConcessionAssemblyCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput> | ConcessionAssemblyCreateWithoutConcessionInput[] | ConcessionAssemblyUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionAssemblyCreateOrConnectWithoutConcessionInput | ConcessionAssemblyCreateOrConnectWithoutConcessionInput[]
    createMany?: ConcessionAssemblyCreateManyConcessionInputEnvelope
    connect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
  }

  export type ConcessionPersonnelCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput> | ConcessionPersonnelCreateWithoutConcessionInput[] | ConcessionPersonnelUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionPersonnelCreateOrConnectWithoutConcessionInput | ConcessionPersonnelCreateOrConnectWithoutConcessionInput[]
    createMany?: ConcessionPersonnelCreateManyConcessionInputEnvelope
    connect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
  }

  export type ApiClientCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput> | ApiClientCreateWithoutConcessionInput[] | ApiClientUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ApiClientCreateOrConnectWithoutConcessionInput | ApiClientCreateOrConnectWithoutConcessionInput[]
    createMany?: ApiClientCreateManyConcessionInputEnvelope
    connect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
  }

  export type ConcessionAssemblyUncheckedCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput> | ConcessionAssemblyCreateWithoutConcessionInput[] | ConcessionAssemblyUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionAssemblyCreateOrConnectWithoutConcessionInput | ConcessionAssemblyCreateOrConnectWithoutConcessionInput[]
    createMany?: ConcessionAssemblyCreateManyConcessionInputEnvelope
    connect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
  }

  export type ConcessionPersonnelUncheckedCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput> | ConcessionPersonnelCreateWithoutConcessionInput[] | ConcessionPersonnelUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionPersonnelCreateOrConnectWithoutConcessionInput | ConcessionPersonnelCreateOrConnectWithoutConcessionInput[]
    createMany?: ConcessionPersonnelCreateManyConcessionInputEnvelope
    connect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
  }

  export type ApiClientUncheckedCreateNestedManyWithoutConcessionInput = {
    create?: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput> | ApiClientCreateWithoutConcessionInput[] | ApiClientUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ApiClientCreateOrConnectWithoutConcessionInput | ApiClientCreateOrConnectWithoutConcessionInput[]
    createMany?: ApiClientCreateManyConcessionInputEnvelope
    connect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
  }

  export type ConcessionAssemblyUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput> | ConcessionAssemblyCreateWithoutConcessionInput[] | ConcessionAssemblyUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionAssemblyCreateOrConnectWithoutConcessionInput | ConcessionAssemblyCreateOrConnectWithoutConcessionInput[]
    upsert?: ConcessionAssemblyUpsertWithWhereUniqueWithoutConcessionInput | ConcessionAssemblyUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ConcessionAssemblyCreateManyConcessionInputEnvelope
    set?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    disconnect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    delete?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    connect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    update?: ConcessionAssemblyUpdateWithWhereUniqueWithoutConcessionInput | ConcessionAssemblyUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ConcessionAssemblyUpdateManyWithWhereWithoutConcessionInput | ConcessionAssemblyUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ConcessionAssemblyScalarWhereInput | ConcessionAssemblyScalarWhereInput[]
  }

  export type ConcessionPersonnelUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput> | ConcessionPersonnelCreateWithoutConcessionInput[] | ConcessionPersonnelUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionPersonnelCreateOrConnectWithoutConcessionInput | ConcessionPersonnelCreateOrConnectWithoutConcessionInput[]
    upsert?: ConcessionPersonnelUpsertWithWhereUniqueWithoutConcessionInput | ConcessionPersonnelUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ConcessionPersonnelCreateManyConcessionInputEnvelope
    set?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    disconnect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    delete?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    connect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    update?: ConcessionPersonnelUpdateWithWhereUniqueWithoutConcessionInput | ConcessionPersonnelUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ConcessionPersonnelUpdateManyWithWhereWithoutConcessionInput | ConcessionPersonnelUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ConcessionPersonnelScalarWhereInput | ConcessionPersonnelScalarWhereInput[]
  }

  export type ApiClientUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput> | ApiClientCreateWithoutConcessionInput[] | ApiClientUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ApiClientCreateOrConnectWithoutConcessionInput | ApiClientCreateOrConnectWithoutConcessionInput[]
    upsert?: ApiClientUpsertWithWhereUniqueWithoutConcessionInput | ApiClientUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ApiClientCreateManyConcessionInputEnvelope
    set?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    disconnect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    delete?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    connect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    update?: ApiClientUpdateWithWhereUniqueWithoutConcessionInput | ApiClientUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ApiClientUpdateManyWithWhereWithoutConcessionInput | ApiClientUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ApiClientScalarWhereInput | ApiClientScalarWhereInput[]
  }

  export type ConcessionAssemblyUncheckedUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput> | ConcessionAssemblyCreateWithoutConcessionInput[] | ConcessionAssemblyUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionAssemblyCreateOrConnectWithoutConcessionInput | ConcessionAssemblyCreateOrConnectWithoutConcessionInput[]
    upsert?: ConcessionAssemblyUpsertWithWhereUniqueWithoutConcessionInput | ConcessionAssemblyUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ConcessionAssemblyCreateManyConcessionInputEnvelope
    set?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    disconnect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    delete?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    connect?: ConcessionAssemblyWhereUniqueInput | ConcessionAssemblyWhereUniqueInput[]
    update?: ConcessionAssemblyUpdateWithWhereUniqueWithoutConcessionInput | ConcessionAssemblyUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ConcessionAssemblyUpdateManyWithWhereWithoutConcessionInput | ConcessionAssemblyUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ConcessionAssemblyScalarWhereInput | ConcessionAssemblyScalarWhereInput[]
  }

  export type ConcessionPersonnelUncheckedUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput> | ConcessionPersonnelCreateWithoutConcessionInput[] | ConcessionPersonnelUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ConcessionPersonnelCreateOrConnectWithoutConcessionInput | ConcessionPersonnelCreateOrConnectWithoutConcessionInput[]
    upsert?: ConcessionPersonnelUpsertWithWhereUniqueWithoutConcessionInput | ConcessionPersonnelUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ConcessionPersonnelCreateManyConcessionInputEnvelope
    set?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    disconnect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    delete?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    connect?: ConcessionPersonnelWhereUniqueInput | ConcessionPersonnelWhereUniqueInput[]
    update?: ConcessionPersonnelUpdateWithWhereUniqueWithoutConcessionInput | ConcessionPersonnelUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ConcessionPersonnelUpdateManyWithWhereWithoutConcessionInput | ConcessionPersonnelUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ConcessionPersonnelScalarWhereInput | ConcessionPersonnelScalarWhereInput[]
  }

  export type ApiClientUncheckedUpdateManyWithoutConcessionNestedInput = {
    create?: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput> | ApiClientCreateWithoutConcessionInput[] | ApiClientUncheckedCreateWithoutConcessionInput[]
    connectOrCreate?: ApiClientCreateOrConnectWithoutConcessionInput | ApiClientCreateOrConnectWithoutConcessionInput[]
    upsert?: ApiClientUpsertWithWhereUniqueWithoutConcessionInput | ApiClientUpsertWithWhereUniqueWithoutConcessionInput[]
    createMany?: ApiClientCreateManyConcessionInputEnvelope
    set?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    disconnect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    delete?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    connect?: ApiClientWhereUniqueInput | ApiClientWhereUniqueInput[]
    update?: ApiClientUpdateWithWhereUniqueWithoutConcessionInput | ApiClientUpdateWithWhereUniqueWithoutConcessionInput[]
    updateMany?: ApiClientUpdateManyWithWhereWithoutConcessionInput | ApiClientUpdateManyWithWhereWithoutConcessionInput[]
    deleteMany?: ApiClientScalarWhereInput | ApiClientScalarWhereInput[]
  }

  export type ConcessionCreateNestedOneWithoutAssembliesInput = {
    create?: XOR<ConcessionCreateWithoutAssembliesInput, ConcessionUncheckedCreateWithoutAssembliesInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutAssembliesInput
    connect?: ConcessionWhereUniqueInput
  }

  export type ConcessionUpdateOneRequiredWithoutAssembliesNestedInput = {
    create?: XOR<ConcessionCreateWithoutAssembliesInput, ConcessionUncheckedCreateWithoutAssembliesInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutAssembliesInput
    upsert?: ConcessionUpsertWithoutAssembliesInput
    connect?: ConcessionWhereUniqueInput
    update?: XOR<XOR<ConcessionUpdateToOneWithWhereWithoutAssembliesInput, ConcessionUpdateWithoutAssembliesInput>, ConcessionUncheckedUpdateWithoutAssembliesInput>
  }

  export type ConcessionCreateNestedOneWithoutPersonnelInput = {
    create?: XOR<ConcessionCreateWithoutPersonnelInput, ConcessionUncheckedCreateWithoutPersonnelInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutPersonnelInput
    connect?: ConcessionWhereUniqueInput
  }

  export type ConcessionUpdateOneRequiredWithoutPersonnelNestedInput = {
    create?: XOR<ConcessionCreateWithoutPersonnelInput, ConcessionUncheckedCreateWithoutPersonnelInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutPersonnelInput
    upsert?: ConcessionUpsertWithoutPersonnelInput
    connect?: ConcessionWhereUniqueInput
    update?: XOR<XOR<ConcessionUpdateToOneWithWhereWithoutPersonnelInput, ConcessionUpdateWithoutPersonnelInput>, ConcessionUncheckedUpdateWithoutPersonnelInput>
  }

  export type ConcessionCreateNestedOneWithoutApiClientsInput = {
    create?: XOR<ConcessionCreateWithoutApiClientsInput, ConcessionUncheckedCreateWithoutApiClientsInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutApiClientsInput
    connect?: ConcessionWhereUniqueInput
  }

  export type ConcessionUpdateOneRequiredWithoutApiClientsNestedInput = {
    create?: XOR<ConcessionCreateWithoutApiClientsInput, ConcessionUncheckedCreateWithoutApiClientsInput>
    connectOrCreate?: ConcessionCreateOrConnectWithoutApiClientsInput
    upsert?: ConcessionUpsertWithoutApiClientsInput
    connect?: ConcessionWhereUniqueInput
    update?: XOR<XOR<ConcessionUpdateToOneWithWhereWithoutApiClientsInput, ConcessionUpdateWithoutApiClientsInput>, ConcessionUncheckedUpdateWithoutApiClientsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserSocialConnectionCreateWithoutUserInput = {
    id?: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
  }

  export type UserSocialConnectionUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
  }

  export type UserSocialConnectionCreateOrConnectWithoutUserInput = {
    where: UserSocialConnectionWhereUniqueInput
    create: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput>
  }

  export type UserSocialConnectionCreateManyUserInputEnvelope = {
    data: UserSocialConnectionCreateManyUserInput | UserSocialConnectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutUserInput = {
    id?: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
    role: RoleCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    id?: string
    roleId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSocialConnectionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSocialConnectionWhereUniqueInput
    update: XOR<UserSocialConnectionUpdateWithoutUserInput, UserSocialConnectionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSocialConnectionCreateWithoutUserInput, UserSocialConnectionUncheckedCreateWithoutUserInput>
  }

  export type UserSocialConnectionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSocialConnectionWhereUniqueInput
    data: XOR<UserSocialConnectionUpdateWithoutUserInput, UserSocialConnectionUncheckedUpdateWithoutUserInput>
  }

  export type UserSocialConnectionUpdateManyWithWhereWithoutUserInput = {
    where: UserSocialConnectionScalarWhereInput
    data: XOR<UserSocialConnectionUpdateManyMutationInput, UserSocialConnectionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSocialConnectionScalarWhereInput = {
    AND?: UserSocialConnectionScalarWhereInput | UserSocialConnectionScalarWhereInput[]
    OR?: UserSocialConnectionScalarWhereInput[]
    NOT?: UserSocialConnectionScalarWhereInput | UserSocialConnectionScalarWhereInput[]
    id?: UuidFilter<"UserSocialConnection"> | string
    userId?: UuidFilter<"UserSocialConnection"> | string
    provider?: StringFilter<"UserSocialConnection"> | string
    providerUserId?: StringFilter<"UserSocialConnection"> | string
    email?: StringNullableFilter<"UserSocialConnection"> | string | null
    displayName?: StringNullableFilter<"UserSocialConnection"> | string | null
    avatarUrl?: StringNullableFilter<"UserSocialConnection"> | string | null
    connectedAt?: DateTimeFilter<"UserSocialConnection"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"UserSocialConnection"> | Date | string | null
    status?: StringFilter<"UserSocialConnection"> | string
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    OR?: UserRoleScalarWhereInput[]
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    id?: UuidFilter<"UserRole"> | string
    userId?: UuidFilter<"UserRole"> | string
    roleId?: UuidFilter<"UserRole"> | string
    scopeLevel?: StringFilter<"UserRole"> | string
    scopeRefId?: UuidNullableFilter<"UserRole"> | string | null
    assignedBy?: StringFilter<"UserRole"> | string
    assignedAt?: DateTimeFilter<"UserRole"> | Date | string
  }

  export type RolePermissionCreateWithoutRoleInput = {
    grantedBy: string
    grantedAt?: Date | string
    permission: PermissionCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutRoleInput = {
    permissionId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionCreateManyRoleInputEnvelope = {
    data: RolePermissionCreateManyRoleInput | RolePermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutRoleInput = {
    id?: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
    user: UserCreateNestedOneWithoutUserRolesInput
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    id?: string
    userId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePermissionCreateWithoutRoleInput, RolePermissionUncheckedCreateWithoutRoleInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutRoleInput, RolePermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePermissionScalarWhereInput = {
    AND?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    OR?: RolePermissionScalarWhereInput[]
    NOT?: RolePermissionScalarWhereInput | RolePermissionScalarWhereInput[]
    roleId?: UuidFilter<"RolePermission"> | string
    permissionId?: UuidFilter<"RolePermission"> | string
    grantedBy?: StringFilter<"RolePermission"> | string
    grantedAt?: DateTimeFilter<"RolePermission"> | Date | string
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type PermissionCreateWithoutResourceInput = {
    id?: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateWithoutResourceInput = {
    id?: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionCreateOrConnectWithoutResourceInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput>
  }

  export type PermissionCreateManyResourceInputEnvelope = {
    data: PermissionCreateManyResourceInput | PermissionCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type PermissionUpsertWithWhereUniqueWithoutResourceInput = {
    where: PermissionWhereUniqueInput
    update: XOR<PermissionUpdateWithoutResourceInput, PermissionUncheckedUpdateWithoutResourceInput>
    create: XOR<PermissionCreateWithoutResourceInput, PermissionUncheckedCreateWithoutResourceInput>
  }

  export type PermissionUpdateWithWhereUniqueWithoutResourceInput = {
    where: PermissionWhereUniqueInput
    data: XOR<PermissionUpdateWithoutResourceInput, PermissionUncheckedUpdateWithoutResourceInput>
  }

  export type PermissionUpdateManyWithWhereWithoutResourceInput = {
    where: PermissionScalarWhereInput
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyWithoutResourceInput>
  }

  export type PermissionScalarWhereInput = {
    AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    OR?: PermissionScalarWhereInput[]
    NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    id?: UuidFilter<"Permission"> | string
    resourceId?: UuidFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    code?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
  }

  export type ResourceCreateWithoutPermissionsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ResourceUncheckedCreateWithoutPermissionsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ResourceCreateOrConnectWithoutPermissionsInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutPermissionsInput, ResourceUncheckedCreateWithoutPermissionsInput>
  }

  export type RolePermissionCreateWithoutPermissionInput = {
    grantedBy: string
    grantedAt?: Date | string
    role: RoleCreateNestedOneWithoutRolePermissionsInput
  }

  export type RolePermissionUncheckedCreateWithoutPermissionInput = {
    roleId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type RolePermissionCreateOrConnectWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionCreateManyPermissionInputEnvelope = {
    data: RolePermissionCreateManyPermissionInput | RolePermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type ResourceUpsertWithoutPermissionsInput = {
    update: XOR<ResourceUpdateWithoutPermissionsInput, ResourceUncheckedUpdateWithoutPermissionsInput>
    create: XOR<ResourceCreateWithoutPermissionsInput, ResourceUncheckedCreateWithoutPermissionsInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutPermissionsInput, ResourceUncheckedUpdateWithoutPermissionsInput>
  }

  export type ResourceUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    update: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<RolePermissionCreateWithoutPermissionInput, RolePermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: RolePermissionWhereUniqueInput
    data: XOR<RolePermissionUpdateWithoutPermissionInput, RolePermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type RolePermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: RolePermissionScalarWhereInput
    data: XOR<RolePermissionUpdateManyMutationInput, RolePermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type RoleCreateWithoutRolePermissionsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userRoles?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutRolePermissionsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutRolePermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
  }

  export type PermissionCreateWithoutRolePermissionsInput = {
    id?: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
    resource: ResourceCreateNestedOneWithoutPermissionsInput
  }

  export type PermissionUncheckedCreateWithoutRolePermissionsInput = {
    id?: string
    resourceId: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolePermissionsInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
  }

  export type RoleUpsertWithoutRolePermissionsInput = {
    update: XOR<RoleUpdateWithoutRolePermissionsInput, RoleUncheckedUpdateWithoutRolePermissionsInput>
    create: XOR<RoleCreateWithoutRolePermissionsInput, RoleUncheckedCreateWithoutRolePermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutRolePermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutRolePermissionsInput, RoleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type RoleUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissionUpsertWithoutRolePermissionsInput = {
    update: XOR<PermissionUpdateWithoutRolePermissionsInput, PermissionUncheckedUpdateWithoutRolePermissionsInput>
    create: XOR<PermissionCreateWithoutRolePermissionsInput, PermissionUncheckedCreateWithoutRolePermissionsInput>
    where?: PermissionWhereInput
  }

  export type PermissionUpdateToOneWithWhereWithoutRolePermissionsInput = {
    where?: PermissionWhereInput
    data: XOR<PermissionUpdateWithoutRolePermissionsInput, PermissionUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type PermissionUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type PermissionUncheckedUpdateWithoutRolePermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutUserRolesInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialConnections?: UserSocialConnectionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserRolesInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    socialConnections?: UserSocialConnectionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
  }

  export type RoleCreateWithoutUserRolesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rolePermissions?: RolePermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUserRolesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    scopeLevel?: string
    isSystem?: boolean
    status?: string
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    rolePermissions?: RolePermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUserRolesInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
  }

  export type UserUpsertWithoutUserRolesInput = {
    update: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
    create: XOR<UserCreateWithoutUserRolesInput, UserUncheckedCreateWithoutUserRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserRolesInput, UserUncheckedUpdateWithoutUserRolesInput>
  }

  export type UserUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialConnections?: UserSocialConnectionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialConnections?: UserSocialConnectionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoleUpsertWithoutUserRolesInput = {
    update: XOR<RoleUpdateWithoutUserRolesInput, RoleUncheckedUpdateWithoutUserRolesInput>
    create: XOR<RoleCreateWithoutUserRolesInput, RoleUncheckedCreateWithoutUserRolesInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUserRolesInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUserRolesInput, RoleUncheckedUpdateWithoutUserRolesInput>
  }

  export type RoleUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUserRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    scopeLevel?: StringFieldUpdateOperationsInput | string
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type UserCreateWithoutSocialConnectionsInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userRoles?: UserRoleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSocialConnectionsInput = {
    id?: string
    code: string
    zitadelId: string
    countryId?: string | null
    email: string
    fullName: string
    phone?: string | null
    status?: string
    invitedAt?: Date | string | null
    invitedViaStub?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userRoles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSocialConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSocialConnectionsInput, UserUncheckedCreateWithoutSocialConnectionsInput>
  }

  export type UserUpsertWithoutSocialConnectionsInput = {
    update: XOR<UserUpdateWithoutSocialConnectionsInput, UserUncheckedUpdateWithoutSocialConnectionsInput>
    create: XOR<UserCreateWithoutSocialConnectionsInput, UserUncheckedCreateWithoutSocialConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSocialConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSocialConnectionsInput, UserUncheckedUpdateWithoutSocialConnectionsInput>
  }

  export type UserUpdateWithoutSocialConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRoleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSocialConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    zitadelId?: StringFieldUpdateOperationsInput | string
    countryId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    invitedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedViaStub?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userRoles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConcessionAssemblyCreateWithoutConcessionInput = {
    id?: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionAssemblyUncheckedCreateWithoutConcessionInput = {
    id?: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionAssemblyCreateOrConnectWithoutConcessionInput = {
    where: ConcessionAssemblyWhereUniqueInput
    create: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput>
  }

  export type ConcessionAssemblyCreateManyConcessionInputEnvelope = {
    data: ConcessionAssemblyCreateManyConcessionInput | ConcessionAssemblyCreateManyConcessionInput[]
    skipDuplicates?: boolean
  }

  export type ConcessionPersonnelCreateWithoutConcessionInput = {
    id?: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionPersonnelUncheckedCreateWithoutConcessionInput = {
    id?: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionPersonnelCreateOrConnectWithoutConcessionInput = {
    where: ConcessionPersonnelWhereUniqueInput
    create: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput>
  }

  export type ConcessionPersonnelCreateManyConcessionInputEnvelope = {
    data: ConcessionPersonnelCreateManyConcessionInput | ConcessionPersonnelCreateManyConcessionInput[]
    skipDuplicates?: boolean
  }

  export type ApiClientCreateWithoutConcessionInput = {
    id?: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ApiClientUncheckedCreateWithoutConcessionInput = {
    id?: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ApiClientCreateOrConnectWithoutConcessionInput = {
    where: ApiClientWhereUniqueInput
    create: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput>
  }

  export type ApiClientCreateManyConcessionInputEnvelope = {
    data: ApiClientCreateManyConcessionInput | ApiClientCreateManyConcessionInput[]
    skipDuplicates?: boolean
  }

  export type ConcessionAssemblyUpsertWithWhereUniqueWithoutConcessionInput = {
    where: ConcessionAssemblyWhereUniqueInput
    update: XOR<ConcessionAssemblyUpdateWithoutConcessionInput, ConcessionAssemblyUncheckedUpdateWithoutConcessionInput>
    create: XOR<ConcessionAssemblyCreateWithoutConcessionInput, ConcessionAssemblyUncheckedCreateWithoutConcessionInput>
  }

  export type ConcessionAssemblyUpdateWithWhereUniqueWithoutConcessionInput = {
    where: ConcessionAssemblyWhereUniqueInput
    data: XOR<ConcessionAssemblyUpdateWithoutConcessionInput, ConcessionAssemblyUncheckedUpdateWithoutConcessionInput>
  }

  export type ConcessionAssemblyUpdateManyWithWhereWithoutConcessionInput = {
    where: ConcessionAssemblyScalarWhereInput
    data: XOR<ConcessionAssemblyUpdateManyMutationInput, ConcessionAssemblyUncheckedUpdateManyWithoutConcessionInput>
  }

  export type ConcessionAssemblyScalarWhereInput = {
    AND?: ConcessionAssemblyScalarWhereInput | ConcessionAssemblyScalarWhereInput[]
    OR?: ConcessionAssemblyScalarWhereInput[]
    NOT?: ConcessionAssemblyScalarWhereInput | ConcessionAssemblyScalarWhereInput[]
    id?: UuidFilter<"ConcessionAssembly"> | string
    concessionId?: UuidFilter<"ConcessionAssembly"> | string
    assemblyId?: UuidFilter<"ConcessionAssembly"> | string
    contractStart?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    contractEnd?: DateTimeFilter<"ConcessionAssembly"> | Date | string
    status?: StringFilter<"ConcessionAssembly"> | string
    createdAt?: DateTimeFilter<"ConcessionAssembly"> | Date | string
  }

  export type ConcessionPersonnelUpsertWithWhereUniqueWithoutConcessionInput = {
    where: ConcessionPersonnelWhereUniqueInput
    update: XOR<ConcessionPersonnelUpdateWithoutConcessionInput, ConcessionPersonnelUncheckedUpdateWithoutConcessionInput>
    create: XOR<ConcessionPersonnelCreateWithoutConcessionInput, ConcessionPersonnelUncheckedCreateWithoutConcessionInput>
  }

  export type ConcessionPersonnelUpdateWithWhereUniqueWithoutConcessionInput = {
    where: ConcessionPersonnelWhereUniqueInput
    data: XOR<ConcessionPersonnelUpdateWithoutConcessionInput, ConcessionPersonnelUncheckedUpdateWithoutConcessionInput>
  }

  export type ConcessionPersonnelUpdateManyWithWhereWithoutConcessionInput = {
    where: ConcessionPersonnelScalarWhereInput
    data: XOR<ConcessionPersonnelUpdateManyMutationInput, ConcessionPersonnelUncheckedUpdateManyWithoutConcessionInput>
  }

  export type ConcessionPersonnelScalarWhereInput = {
    AND?: ConcessionPersonnelScalarWhereInput | ConcessionPersonnelScalarWhereInput[]
    OR?: ConcessionPersonnelScalarWhereInput[]
    NOT?: ConcessionPersonnelScalarWhereInput | ConcessionPersonnelScalarWhereInput[]
    id?: UuidFilter<"ConcessionPersonnel"> | string
    concessionId?: UuidFilter<"ConcessionPersonnel"> | string
    externalStaffRef?: StringFilter<"ConcessionPersonnel"> | string
    fullName?: StringFilter<"ConcessionPersonnel"> | string
    phone?: StringFilter<"ConcessionPersonnel"> | string
    status?: StringFilter<"ConcessionPersonnel"> | string
    createdAt?: DateTimeFilter<"ConcessionPersonnel"> | Date | string
  }

  export type ApiClientUpsertWithWhereUniqueWithoutConcessionInput = {
    where: ApiClientWhereUniqueInput
    update: XOR<ApiClientUpdateWithoutConcessionInput, ApiClientUncheckedUpdateWithoutConcessionInput>
    create: XOR<ApiClientCreateWithoutConcessionInput, ApiClientUncheckedCreateWithoutConcessionInput>
  }

  export type ApiClientUpdateWithWhereUniqueWithoutConcessionInput = {
    where: ApiClientWhereUniqueInput
    data: XOR<ApiClientUpdateWithoutConcessionInput, ApiClientUncheckedUpdateWithoutConcessionInput>
  }

  export type ApiClientUpdateManyWithWhereWithoutConcessionInput = {
    where: ApiClientScalarWhereInput
    data: XOR<ApiClientUpdateManyMutationInput, ApiClientUncheckedUpdateManyWithoutConcessionInput>
  }

  export type ApiClientScalarWhereInput = {
    AND?: ApiClientScalarWhereInput | ApiClientScalarWhereInput[]
    OR?: ApiClientScalarWhereInput[]
    NOT?: ApiClientScalarWhereInput | ApiClientScalarWhereInput[]
    id?: UuidFilter<"ApiClient"> | string
    concessionId?: UuidFilter<"ApiClient"> | string
    clientId?: StringFilter<"ApiClient"> | string
    clientSecretHash?: StringFilter<"ApiClient"> | string
    status?: StringFilter<"ApiClient"> | string
    expiresAt?: DateTimeFilter<"ApiClient"> | Date | string
    createdAt?: DateTimeFilter<"ApiClient"> | Date | string
  }

  export type ConcessionCreateWithoutAssembliesInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    personnel?: ConcessionPersonnelCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionUncheckedCreateWithoutAssembliesInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    personnel?: ConcessionPersonnelUncheckedCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientUncheckedCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionCreateOrConnectWithoutAssembliesInput = {
    where: ConcessionWhereUniqueInput
    create: XOR<ConcessionCreateWithoutAssembliesInput, ConcessionUncheckedCreateWithoutAssembliesInput>
  }

  export type ConcessionUpsertWithoutAssembliesInput = {
    update: XOR<ConcessionUpdateWithoutAssembliesInput, ConcessionUncheckedUpdateWithoutAssembliesInput>
    create: XOR<ConcessionCreateWithoutAssembliesInput, ConcessionUncheckedCreateWithoutAssembliesInput>
    where?: ConcessionWhereInput
  }

  export type ConcessionUpdateToOneWithWhereWithoutAssembliesInput = {
    where?: ConcessionWhereInput
    data: XOR<ConcessionUpdateWithoutAssembliesInput, ConcessionUncheckedUpdateWithoutAssembliesInput>
  }

  export type ConcessionUpdateWithoutAssembliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personnel?: ConcessionPersonnelUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionUncheckedUpdateWithoutAssembliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personnel?: ConcessionPersonnelUncheckedUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUncheckedUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionCreateWithoutPersonnelInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionUncheckedCreateWithoutPersonnelInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyUncheckedCreateNestedManyWithoutConcessionInput
    apiClients?: ApiClientUncheckedCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionCreateOrConnectWithoutPersonnelInput = {
    where: ConcessionWhereUniqueInput
    create: XOR<ConcessionCreateWithoutPersonnelInput, ConcessionUncheckedCreateWithoutPersonnelInput>
  }

  export type ConcessionUpsertWithoutPersonnelInput = {
    update: XOR<ConcessionUpdateWithoutPersonnelInput, ConcessionUncheckedUpdateWithoutPersonnelInput>
    create: XOR<ConcessionCreateWithoutPersonnelInput, ConcessionUncheckedCreateWithoutPersonnelInput>
    where?: ConcessionWhereInput
  }

  export type ConcessionUpdateToOneWithWhereWithoutPersonnelInput = {
    where?: ConcessionWhereInput
    data: XOR<ConcessionUpdateWithoutPersonnelInput, ConcessionUncheckedUpdateWithoutPersonnelInput>
  }

  export type ConcessionUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionUncheckedUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUncheckedUpdateManyWithoutConcessionNestedInput
    apiClients?: ApiClientUncheckedUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionCreateWithoutApiClientsInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyCreateNestedManyWithoutConcessionInput
    personnel?: ConcessionPersonnelCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionUncheckedCreateWithoutApiClientsInput = {
    id?: string
    code: string
    name: string
    contactEmail: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assemblies?: ConcessionAssemblyUncheckedCreateNestedManyWithoutConcessionInput
    personnel?: ConcessionPersonnelUncheckedCreateNestedManyWithoutConcessionInput
  }

  export type ConcessionCreateOrConnectWithoutApiClientsInput = {
    where: ConcessionWhereUniqueInput
    create: XOR<ConcessionCreateWithoutApiClientsInput, ConcessionUncheckedCreateWithoutApiClientsInput>
  }

  export type ConcessionUpsertWithoutApiClientsInput = {
    update: XOR<ConcessionUpdateWithoutApiClientsInput, ConcessionUncheckedUpdateWithoutApiClientsInput>
    create: XOR<ConcessionCreateWithoutApiClientsInput, ConcessionUncheckedCreateWithoutApiClientsInput>
    where?: ConcessionWhereInput
  }

  export type ConcessionUpdateToOneWithWhereWithoutApiClientsInput = {
    where?: ConcessionWhereInput
    data: XOR<ConcessionUpdateWithoutApiClientsInput, ConcessionUncheckedUpdateWithoutApiClientsInput>
  }

  export type ConcessionUpdateWithoutApiClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUpdateManyWithoutConcessionNestedInput
    personnel?: ConcessionPersonnelUpdateManyWithoutConcessionNestedInput
  }

  export type ConcessionUncheckedUpdateWithoutApiClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactEmail?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assemblies?: ConcessionAssemblyUncheckedUpdateManyWithoutConcessionNestedInput
    personnel?: ConcessionPersonnelUncheckedUpdateManyWithoutConcessionNestedInput
  }

  export type UserSocialConnectionCreateManyUserInput = {
    id?: string
    provider: string
    providerUserId: string
    email?: string | null
    displayName?: string | null
    avatarUrl?: string | null
    connectedAt?: Date | string
    lastUsedAt?: Date | string | null
    status?: string
  }

  export type UserRoleCreateManyUserInput = {
    id?: string
    roleId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type UserSocialConnectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserSocialConnectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserSocialConnectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerUserId?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type UserRoleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyRoleInput = {
    permissionId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type UserRoleCreateManyRoleInput = {
    id?: string
    userId: string
    scopeLevel?: string
    scopeRefId?: string | null
    assignedBy: string
    assignedAt?: Date | string
  }

  export type RolePermissionUpdateWithoutRoleInput = {
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permission?: PermissionUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    scopeLevel?: StringFieldUpdateOperationsInput | string
    scopeRefId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateManyResourceInput = {
    id?: string
    action: string
    code: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PermissionUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolePermissions?: RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateManyWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionCreateManyPermissionInput = {
    roleId: string
    grantedBy: string
    grantedAt?: Date | string
  }

  export type RolePermissionUpdateWithoutPermissionInput = {
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type RolePermissionUncheckedUpdateWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePermissionUncheckedUpdateManyWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    grantedBy?: StringFieldUpdateOperationsInput | string
    grantedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyCreateManyConcessionInput = {
    id?: string
    assemblyId: string
    contractStart: Date | string
    contractEnd: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type ConcessionPersonnelCreateManyConcessionInput = {
    id?: string
    externalStaffRef: string
    fullName: string
    phone: string
    status?: string
    createdAt?: Date | string
  }

  export type ApiClientCreateManyConcessionInput = {
    id?: string
    clientId: string
    clientSecretHash: string
    status?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ConcessionAssemblyUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyUncheckedUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionAssemblyUncheckedUpdateManyWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    assemblyId?: StringFieldUpdateOperationsInput | string
    contractStart?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelUncheckedUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcessionPersonnelUncheckedUpdateManyWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalStaffRef?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientUncheckedUpdateWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiClientUncheckedUpdateManyWithoutConcessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecretHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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