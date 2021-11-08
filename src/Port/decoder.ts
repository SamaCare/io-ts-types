import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";
import { Int } from "../Int";
import { Port as PortT } from "../types";

/**
 * Port is a Decoder that accepts an arbitrary value and decodes it to a Port.
 * It succeeds if the input value is a number that is a valid port number
 * (0-65534).
 */
export const Port: D.Decoder<unknown, PortT> = pipe(
  Int,
  D.refine((n): n is PortT => n >= 0 && n <= 65535, "Port")
);
