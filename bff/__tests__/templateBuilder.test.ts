import { expect, test, describe } from "@jest/globals";
import { templateBuilder } from "../src/utils/templateBuilder";

describe("server function that builds a template to be displayed", () => {
  test("should return a string with the html template", () => {
    const result = templateBuilder();
    expect(result).toContain("<!DOCTYPE html>");
  });

  test("should return a string with the template with param", () => {
    const result = templateBuilder("?param=1");
    expect(result).toContain("<!DOCTYPE html>");
  });
});
