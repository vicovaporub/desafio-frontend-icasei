import { updateStarText } from "../utils/updateStarText";
import { fetchFavorites } from "../utils/fetchFavorites";

jest.mock("../utils/fetchFavorites", () => ({
  fetchFavorites: jest.fn(() => [{}, {}]),
}));

document.querySelector = jest.fn(() => ({
  setAttribute: jest.fn(),
}));

describe("updateStarText", () => {
  test("should call the fetchFavorites function", async () => {
    await updateStarText();
    expect(fetchFavorites).toHaveBeenCalled();
  });

  test("setAttribute to create star-component", async () => {
    await updateStarText();
    expect(document.querySelector).toHaveBeenCalledWith("star-component");
  });
});
