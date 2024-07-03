import { updateStarText } from "../utils/updateStarText";
import { fetchFavoritesLength } from "../utils/fetchFavoritesLength";
import { describe, test, expect, jest } from "@jest/globals";

jest.mock("../utils/fetchFavoritesLength", () => ({
  fetchFavoritesLength: jest.fn(() => [{}, {}]),
}));

document.querySelector = jest.fn(() => ({
  setAttribute: jest.fn(),
}));

describe("updateStarText", () => {
  test("should call the fetchFavoritesLength function", async () => {
    await updateStarText();
    expect(fetchFavoritesLength).toHaveBeenCalled();
  });

  test("setAttribute to create star-component", async () => {
    await updateStarText();
    expect(document.querySelector).toHaveBeenCalledWith("star-component");
  });
});
