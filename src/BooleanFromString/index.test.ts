import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { BooleanFromString } from ".";

describe("BooleanFromString", () => {
  describe("encode()", () => {
    it("encodes a boolean to a string", () => {
      fc.assert(
        fc.property(
          fc.boolean().map((value) => value.toString()),
          (input) => {
            const result = BooleanFromString.decode(input);
            if (isLeft(result)) {
              throw new Error(D.draw(result.left));
            }
            const output = result.right;

            expect(BooleanFromString.encode(output)).toEqual(input);
          }
        ),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a stringified boolean", () => {
      fc.assert(
        fc.property(fc.boolean(), (raw) => {
          const input = raw.toString();
          const result = BooleanFromString.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }

          expect(result.right).toEqual(raw);
        }),
        { numRuns: 1000 }
      );
    });

    it("decodes 0 to false", () => {
      const result = BooleanFromString.decode("0");
      if (isLeft(result)) {
        throw new Error(D.draw(result.left));
      }

      expect(result.right).toBe(false);
    });

    it("decodes 1 to true", () => {
      const result = BooleanFromString.decode("1");
      if (isLeft(result)) {
        throw new Error(D.draw(result.left));
      }

      expect(result.right).toBe(true);
    });
  });
});
