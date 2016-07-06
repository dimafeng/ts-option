/**
 * Copyright (c) 2016 shogogg <shogo@studofly.net>
 *
 * This software is released under the MIA License.
 * http://opensource.org/licenses/mit-license.php
 */
export interface Option<A> {

  /**
   * Returns true if the option is non-empty and the predicate p returns true when applied to the option's value.
   */
  exists(p: (_: A) => boolean): boolean;

  /**
   * Returns the option if it is non-empty and applying the predicate p to the option's value returns true.
   */
  filter(p: (_: A) => boolean): Option<A>;

  /**
   * Returns the option if it is non-empty and applying the predicate p to the option's value returns false.
   */
  filterNot(p: (_: A) => boolean): Option<A>;

  /**
   * Returns the result of applying f to the option's value if the option is non-empty.
   */
  flatMap<B>(f: (_: A) => Option<B>): Option<B>;

  /**
   * Returns the result of applying f to the option's value if the option is non-empty.
   * Otherwise, evaluates expression ifEmpty.
   */
  fold<B>(ifEmpty: () => B, f: (_: A) => B): B;

  /**
   * Tests whether a predicate holds for all elements of the option.
   */
  forAll(p: (_: A) => boolean): boolean;

  /**
   * Apply the given procedure f to the option's value, if it is non-empty.
   */
  forEach(f: (_: A) => any): void;

  /**
   * Returns the option's value if the option is non-empty, otherwise throws an error.
   */
  get: A;

  /**
   * Returns the option's value if the option is non-empty, otherwise return the result of evaluating default.
   */
  getOrElse(defaultValue: () => A): A;

  /**
   * Returns true if the option's value is non-empty, false otherwise.
   */
  isDefined: boolean;

  /**
   * Returns true if the option's value is empty, false otherwise.
   */
  isEmpty: boolean;

  /**
   * Builds a new option by applying a function to all elements of this option.
   */
  map<B>(f: (_: A) => B): Option<B>;

  /**
   * Returns true if the option's value is non-empty, false otherwise.
   */
  nonEmpty: boolean;

  /**
   * Returns the option itself if it is non-empty, otherwise return the result of evaluating alternative.
   */
  orElse(alternative: () => Option<A>): Option<A>;

  /**
   * Returns the option's value if it is non-empty, or null if it is empty.
   */
  orNull: A;

  /**
   * Converts the option to an array.
   */
  toArray: Array<A>;

}

export class Some<A> implements Option<A> {
  private _value: A;
  constructor(value: A) {
    this._value = value;
  }
  exists(p: (_: A) => boolean): boolean {
    return p(this._value);
  }
  filter(p: (_: A) => boolean): Option<A> {
    return p(this._value) ? this : none;
  }
  filterNot(p: (_: A) => boolean): Option<A> {
    return p(this._value) ? none : this;
  }
  flatMap<B>(f: (_: A) => Option<B>): Option<B> {
    return f(this._value);
  }
  fold<B>(ifEmpty: () => B, f: (_: A) => B): B {
    return f(this._value);
  }
  forAll(p: (_: A) => boolean): boolean {
    return p(this._value);
  }
  forEach(f: (_: A) => any): void {
    return f(this._value);
  }
  get get(): A {
    return this._value;
  }
  getOrElse(defaultValue: () => any): A {
    return this._value;
  }
  get isDefined(): boolean {
    return true;
  }
  get isEmpty(): boolean {
    return false;
  }
  map<B>(f: (_: A) => B): Option<B> {
    return some(f(this._value));
  }
  get nonEmpty(): boolean {
    return true;
  }
  orElse(alternative: () => Option<any>): Option<A> {
    return this;
  }
  get orNull(): A {
    return this._value;
  }
  get toArray(): Array<A> {
    return [this._value];
  }
}

export class None implements Option<any> {
  exists(p: (_: any) => boolean): boolean {
    return false;
  }
  filter(p: (_: any) => boolean): Option<any> {
    return this;
  }
  filterNot(p: (_: any) => boolean): Option<any> {
    return this;
  }
  flatMap<B>(f: (_: any) => Option<B>): Option<B> {
    return this as Option<B>;
  }
  fold<B>(ifEmpty: () => B, f: (_: any) => B): B {
    return ifEmpty();
  }
  forAll(p: (_: any) => boolean): boolean {
    return false;
  }
  forEach(f: (_: any) => any): void {
    // do nothing.
  }
  get get(): any {
    throw new Error('No such element.');
  }
  getOrElse(defaultValue: () => any): any {
    return defaultValue();
  }
  get isDefined(): boolean {
    return false;
  }
  get isEmpty(): boolean {
    return true;
  }
  map<B>(f: (_: any) => B): Option<B> {
    return this as Option<B>;
  }
  get nonEmpty(): boolean {
    return false;
  }
  orElse(alternative: () => Option<any>): Option<any> {
    return alternative();
  }
  get orNull(): any {
    return null;
  }
  get toArray(): Array<any> {
    return [];
  }
}

export function some<A>(value: A): Some<A> {
  return new Some<A>(value);
}

export const none: None = new None;

export function option<A>(value: A): Option<A> {
  return value === null || value === undefined ? none : some(value);
}