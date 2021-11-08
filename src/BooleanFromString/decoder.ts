import { pipe } from "fp-ts/function";
import * as D from "io-ts/Decoder";

export const BooleanFromString: D.Decoder<unknown, boolean> = pipe(
  D.string,
  D.parse((s) => {
    switch (s.trim().toLowerCase()) {
      case "true":
      case "1":
        return D.success(true);
      case "false":
      case "0":
        return D.success(false);
      default:
        return D.failure(s, "BooleanFromString");
    }
  })
);
