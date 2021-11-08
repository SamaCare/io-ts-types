import * as C from "io-ts/Codec";
import { createDateFromString as createDateFromStringDecoder } from "./decoder";
import { createDateFromString as createDateFromStringEncoder } from "./encoder";

export const createDateFromString = ({
  parse,
  serialize,
}: {
  parse: (value: string) => Date;
  serialize: (value: Date) => string;
}): C.Codec<unknown, string, Date> =>
  C.make(
    createDateFromStringDecoder(parse),
    createDateFromStringEncoder(serialize)
  );
