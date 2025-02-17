import { checkForName } from "../src/client/js/nameChecker";

describe("Testing the checkForName function", () => {
    beforeEach(() => {
        // Mock alert to prevent actual alerts during testing
        global.alert = jest.fn();
    });

    test("Should alert 'Welcome, Captain!' when a valid captain name is entered", () => {
        checkForName("Picard");
        expect(global.alert).toHaveBeenCalledWith("Welcome, Captain!");
    });

    test("Should alert 'Enter a valid captain name' for an invalid name", () => {
        checkForName("Sama");
        expect(global.alert).toHaveBeenCalledWith("Enter a valid captain name");
    });
});
