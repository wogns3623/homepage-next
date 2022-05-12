export type Resolver<T> = (value: T | PromiseLike<T>) => void;
export type Rejector = (reason?: any) => void;

export interface Resolve<T> {
  (value: T | PromiseLike<T>): Promise<T>;
}

export interface Reject {
  <TReject = never>(reason?: TReject): Promise<TReject>;
}

// export interface ITask_UNSTABLE<T> {
//   then<TResult1 = T, TResult2 = never>(
//     onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
//     onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
//   ): ITask_UNSTABLE<TResult1 | TResult2>;
//   catch<TResult = never>(
//     onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
//   ): ITask_UNSTABLE<T | TResult>;
//   finally(onfinally?: (() => void) | undefined | null): ITask_UNSTABLE<T>;

//   /**
//    * @description Do nothing when promise is resolved or rejected at least once
//    */
//   resolve: Resolve<T>;
//   /**
//    * @description Do nothing when promise is resolved or rejected at least once
//    */
//   reject: Reject;
// }

// export enum PromiseState {
//   Pending = 'Pending',
//   Resolved = 'Resolved',
//   Rejected = 'Rejected',
// }

// export class Task_UNSTABLE<T> implements ITask_UNSTABLE<T> {
//   private _promise: Promise<any>;
//   private _promiseState: PromiseState = PromiseState.Pending;
//   private _value: T | undefined;
//   private _resolver: Resolver<T> = () => console.warn('Resolver is called before assign!');
//   private _rejector: Rejector = () => console.warn('Rejector is called before assign!');

//   private _setStateTo(value: any, state: PromiseState) {
//     this._value = value;
//     this._promiseState = state;
//   }

//   constructor(
//     executor?: (
//       resolve: (value: T | PromiseLike<T>) => void,
//       reject: (reason?: any) => void,
//     ) => void,
//   ) {
//     this._promise = new Promise((resolve, reject) => {
//       this._resolver = value => {
//         if (process?.env?.NODE_ENV === 'developmemt') {
//           if (this._value)
//             console.warn(
//               'Resolve Task multiple times is not allowed!, only first resolved value will be used',
//             );
//         }

//         if (!this._value) {
//           this._setStateTo(value, PromiseState.Resolved);
//           resolve(value);
//         }
//       };
//       // this.reject = reason => {
//       //     this._setStateTo(reason, PromiseState.Rejected);
//       //     reject(reason);
//       //     return this as Task<T | TReject>;
//       // };
//       this._rejector = reason => {
//         if (process?.env?.NODE_ENV === 'developmemt') {
//           if (this._value)
//             console.warn(
//               'Reject Task multiple times is not allowed!, only first rejected value will be used',
//             );
//         }

//         if (!this._value) {
//           this._setStateTo(reason, PromiseState.Rejected);
//           reject(reason);
//         }
//       };

//       executor?.(
//         value => {
//           this.resolve.bind(this)(value);
//         },
//         reason => {
//           this.reject();
//         },
//       );
//     });
//   }

//   resolve(value: T | PromiseLike<T>): Promise<T> {
//     this._resolver(value);

//     return this._promise;
//   }

//   reject<TReject = never>(reason?: TReject): Promise<TReject> {
//     this._rejector(reason);

//     return this._promise;
//   }

//   then<TResolve = T, TReject = never>(
//     onfulfilled?: ((value: T) => TResolve | PromiseLike<TResolve>) | undefined | null,
//     onrejected?: ((reason: any) => TReject | PromiseLike<TReject>) | undefined | null,
//   ): Task<TResolve | TReject> {
//     this._promise = this._promise.then(
//       value => {
//         this._setStateTo(value, PromiseState.Resolved);
//         return onfulfilled?.(value);
//       },
//       reason => {
//         this._setStateTo(reason, PromiseState.Rejected);
//         return onrejected?.(reason);
//       },
//     );

//     return this as unknown as Task<TResolve | TReject>;
//   }

//   catch<TReject = never>(
//     onrejected?: ((reason: any) => TReject | PromiseLike<TReject>) | undefined | null,
//   ): Task<T | TReject> {
//     this._promise = this._promise.catch(reason => {
//       this._setStateTo(reason, PromiseState.Rejected);
//       return onrejected?.(reason);
//     });

//     return this as Task<T | TReject>;
//   }

//   finally(onfinally?: (() => void) | undefined | null): Task<T> {
//     this._promise = this._promise.finally(onfinally);

//     return this;
//   }

//   isPending(): boolean {
//     return this._promiseState === PromiseState.Pending;
//   }
//   isResolved(): boolean {
//     return this._promiseState === PromiseState.Resolved;
//   }
//   isRejected(): boolean {
//     return this._promiseState === PromiseState.Rejected;
//   }

//   // toString() {
//   //     return `Task <${this._promiseState}> ${this._promiseState !== PromiseState.Pending ? this._value : ''}`
//   // }

//   get [Symbol.toStringTag]() {
//     return `Task <${this._promiseState}> ${
//       this._promiseState !== PromiseState.Pending ? this._value : ''
//     }`;
//     // return this.toString();
//   }

//   static get [Symbol.species]() {
//     return Promise;
//   }
// }

class Task<T> {
  private _promise: Promise<any>;
  private _resolver: Resolver<T> = () => console.warn('Resolver is called before assign!');
  private _rejector: Rejector = () => console.warn('Rejector is called before assign!');

  public then: Promise<T>['then'];
  public catch: Promise<T>['catch'];
  public finally: Promise<T>['finally'];

  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolver = resolve;
      this._rejector = reject;
    });

    this.then = this._promise.then.bind(this._promise);
    this.catch = this._promise.catch.bind(this._promise);
    this.finally = this._promise.finally.bind(this._promise);
  }

  async resolve(value: T | PromiseLike<T>): Promise<T> {
    const awaited = await value;
    this._resolver(awaited);
    return this;
  }

  reject<TReject = never>(reason?: TReject): Promise<TReject> {
    this._rejector(reason);
    return this as unknown as Promise<TReject>;
  }

  get [Symbol.toStringTag]() {
    return `Task ${this._promise}`;
  }
}

export default Task;
