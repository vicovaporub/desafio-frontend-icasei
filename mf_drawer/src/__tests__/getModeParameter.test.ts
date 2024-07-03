import { getModeParameter } from "../utils/getModeParameter";

describe("getModeParameter", () => {
  test("should return the mode parameter", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?mode=light",
      },
    });
    expect(getModeParameter()).toBe("light");
  });
  test("should return null if there is no mode parameter", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "",
      },
    });
    expect(getModeParameter()).toBe(null);
  });
});
