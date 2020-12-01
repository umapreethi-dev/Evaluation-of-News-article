import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit()", () => {
    document.body.innerHTML = `<input id="url"> ` + `<input id="error">`;
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => {
        test: "val";
      },
    });
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    let mockUrl = document.getElementById("url");
    let innerURL = "https://api.meaningcloud.com/sentiment-2.1";
    mockUrl.innerText = innerURL;

    let mockError = document.getElementById("error");
    let innerError = "Enter a valid url";
    mockError.innerText = innerError;
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    global.Client = {};
    global.Client.checkForURL = jest.fn();

    handleSubmit(mockEvent);

    expect(mockUrl.innerText).toEqual(innerURL);
    expect(mockError.innerText).toEqual(innerError);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
