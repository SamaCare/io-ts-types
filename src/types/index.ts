export interface IntBrand {
  readonly Int: unique symbol;
}

export type Int = number & IntBrand;

export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol;
}

export type NonEmptyString = string & NonEmptyStringBrand;

export interface NonNegativeIntBrand {
  readonly NonNegativeInt: unique symbol;
}

export type NonNegativeInt = Int & NonNegativeIntBrand;

export interface PortBrand {
  readonly Port: unique symbol;
}

export type Port = Int & PortBrand;

export interface PositiveIntBrand {
  readonly PositiveInt: unique symbol;
}

export type PositiveInt = Int & PositiveIntBrand;
