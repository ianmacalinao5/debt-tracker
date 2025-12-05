import { describe, it, expect } from "vitest";
import { useLoginValidation } from "@/composables/useLoginValidation";

describe("useLoginValidation", () => {
  it("initial state should be empty", () => {
    const { username, password, remember, usernameMessage, passwordMessage } =
      useLoginValidation();

    expect(username.value).toBe("");
    expect(password.value).toBe("");
    expect(remember.value).toBe(false);
    expect(usernameMessage.value).toBe("");
    expect(passwordMessage.value).toBe("");
  });

  it("should invalidate when fields are empty", () => {
    const { usernameMessage, passwordMessage, validate } = useLoginValidation();

    const result = validate();

    expect(result).toBe(false);
    expect(usernameMessage.value).toBe("Username is required.");
    expect(passwordMessage.value).toBe("Password is required.");
  });

  it("should show username min-length error", () => {
    const { username, usernameMessage, validate } = useLoginValidation();

    username.value = "ab";

    const result = validate();

    expect(result).toBe(false);
    expect(usernameMessage.value).toBe(
      "Username should be at least 3 characters long."
    );
  });

  it("should show password min-length error", () => {
    const { password, passwordMessage, validate } = useLoginValidation();

    password.value = "1234567"; // less than 8

    const result = validate();

    expect(result).toBe(false);
    expect(passwordMessage.value).toBe(
      "Password should be at least 8 characters long."
    );
  });

  it("should pass validation when fields are valid", () => {
    const { username, password, usernameMessage, passwordMessage, validate } =
      useLoginValidation();

    username.value = "validUser";
    password.value = "longpassword";

    const result = validate();

    expect(result).toBe(true);
    expect(usernameMessage.value).toBe("");
    expect(passwordMessage.value).toBe("");
  });
});
