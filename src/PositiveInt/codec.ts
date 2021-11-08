import * as C from "io-ts/Codec";
import { PositiveInt as PositiveIntT } from "../types";
import { PositiveInt as PositiveIntD } from "./decoder";
import { PositiveInt as PositiveIntE } from "./encoder";

export const PositiveInt: C.Codec<unknown, string, PositiveIntT> = C.make(
  PositiveIntD,
  PositiveIntE
);
