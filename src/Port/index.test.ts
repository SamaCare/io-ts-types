import { describe, expect, it } from "@jest/globals";
import * as fc from "fast-check";
import { isLeft } from "fp-ts/Either";
import * as D from "io-ts/Decoder";
import { Port } from ".";

describe("Port", () => {
  describe("encode()", () => {
    it("encodes a Port to a string", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 65535 }), (input) => {
          const result = Port.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          const value = result.right;

          expect(Port.encode(value)).toEqual(input.toString());
        }),
        { numRuns: 1000 }
      );
    });
  });

  describe("decode()", () => {
    it("decodes a port number of 0", () => {
      const result = Port.decode(0);
      if (isLeft(result)) {
        throw new Error(D.draw(result.left));
      }
      expect(result.right).toBe(0);
    });

    it("decodes a port number between 1 and 65535", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 65535 }), (input) => {
          const result = Port.decode(input);
          if (isLeft(result)) {
            throw new Error(D.draw(result.left));
          }
          expect(result.right).toBe(input);
        }),
        { numRuns: 1000 }
      );
    });

    it("fails to decode NaN", () => {
      expect(isLeft(Port.decode(NaN))).toBe(true);
    });

    it("fails to decode an invalid port number", () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.double({ min: 0.1, max: 65535 }),
            fc.integer().filter((val) => val < 0 || val > 65535)
          ),
          (input) => {
            expect(isLeft(Port.decode(input))).toBe(true);
          }
        ),
        { numRuns: 1000 }
      );
    });
  });
});
