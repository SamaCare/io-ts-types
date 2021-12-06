import * as E from "fp-ts/lib/Either";
import * as D from "io-ts/Decoder";
import { Json as JsonT } from "../types";

export const Json: D.Decoder<unknown, JsonT> = {
  decode(s) {
    return E.tryCatch(
      () => JSON.parse(s as string) as JsonT,
      () => D.error(s, "Json")
    );
  },
};
