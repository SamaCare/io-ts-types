import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft, isRight } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { Int } from ".";

describe("Int", () => {
  describe("encode()", () => {
    it("encodes an Int to a string", () => {
      fc.assert(
        fc.property(fc.integer(), (input) => {
          const result = Int.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(Int.encode(value)).toEqual(input.toString());
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes an integer", () => {
      fc.assert(
        fc.property(fc.integer(), (input) => {
          const result = Int.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const output = result.right;

          expect(output).toEqual(input);
        }),
        { numRuns: 1000 }
      );
    });

    it("decodes 0", () => {
      const result = Int.decode(0);
      if (isLeft(result)) {
        throw new Error(D.draw(result.left));
      }
      const output = result.right;

      expect(output).toBe(0);
    });

    it("fails to decode a float", () => {
      fc.assert(
        fc.property(
          fc.float().filter((value) => !Number.isInteger(value)),
          (value) => {
            const result = Int.decode(value);

            expect(isRight(result)).toBe(false);
          }
        ),
        { numRuns: 1000 }
      );
    });
  });
});
