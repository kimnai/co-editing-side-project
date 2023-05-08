import { useAuth } from "../hooks/useAuth";
import { renderHook, render, screen } from "@testing-library/react";
import { Form } from "@components/auth/Form";

test("form field is displayed correctly according to form type", () => {
  const { result } = renderHook(() => useAuth("login"));
  const { refs } = result.current;

  expect(refs).not.toHaveProperty("usernameref");
});

test("form field is displayed correctly according to form type", () => {
  const { result } = renderHook(() => useAuth("signup"));
  const { refs } = result.current;

  expect(refs).toHaveProperty("usernameref");
});
