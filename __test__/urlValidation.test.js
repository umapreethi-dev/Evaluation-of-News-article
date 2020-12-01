import { checkForURL } from "../src/client/js/urlValidation";

describe("Testing the URL function", () => {
  test("Testing the checkForURL()", () => {
    const url = "https://api.meaningcloud.com/sentiment-2.1";
    expect(checkForURL(url)).toBe(true);
  });
});
