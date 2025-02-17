import { handleSubmit } from "../src/client/js/formHandler";

beforeEach(() => {
  document.body.innerHTML = `
    <form id="urlForm">
      <input id="name" type="text" />
      <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
  `;

  // Mock alert to prevent it from appearing during tests
  global.alert = jest.fn();

  // Mock fetch to simulate an API call
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          sentiment: "Positive",
          sentiment_scores: {
            Positive: 0.8,
            Negative: 0.1,
            Neutral: 0.1,
            Mixed: 0,
          },
          text: "Test text",
        }),
    })
  );

  // Attach handleSubmit to the form's submit event as in the actual application
  document.getElementById("urlForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload
    handleSubmit(event);
  });
});

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });

  test("Valid URL should trigger fetch call", async () => {
    const inputField = document.getElementById("name");
    inputField.value = "https://example.com";

    const form = document.getElementById("urlForm");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for processing

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("Invalid URL should trigger alert", () => {
    const inputField = document.getElementById("name");
    inputField.value = "invalid-url";

    const form = document.getElementById("urlForm");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(alert).toHaveBeenCalledWith("Please enter a valid URL.");
  });

  test("Ensure results container updates after successful API call", async () => {
    const inputField = document.getElementById("name");
    inputField.value = "https://example.com";

    const form = document.getElementById("urlForm");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for DOM update

    const resultContainer = document.getElementById("results");
    expect(resultContainer.innerHTML).toContain("Positive");
    expect(resultContainer.innerHTML).toContain("Sentiment:");
  });
});
