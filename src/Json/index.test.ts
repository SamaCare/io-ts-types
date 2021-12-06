import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft, isRight } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { Json as JsonT } from "../types";
import { Json } from ".";

describe("Json", () => {
  describe("encode()", () => {
    it("encodes a JSON-serializable value to a string", () => {
      fc.assert(
        fc.property(fc.jsonObject(), (input) => {
          expect(Json.encode(input as JsonT)).toEqual(JSON.stringify(input));
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a JSON-serializable value", () => {
      fc.assert(
        fc.property(fc.json(), (input) => {
          const result = Json.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const output = result.right;

          expect(output).toEqual(JSON.parse(input));
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode invalid JSON value", () => {
      expect(isLeft(Json.decode("{"))).toBe(true);
      expect(isLeft(Json.decode("}"))).toBe(true);
      expect(isLeft(Json.decode(""))).toBe(true);
      expect(isLeft(Json.decode("{a:1}"))).toBe(true);
    });
  });
});
