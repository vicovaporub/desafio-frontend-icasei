import { expect, jest, test, describe } from "@jest/globals";
import { sum } from "../src/serverRoutes";

describe("sum function ", () => {
  test("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
