import { render, screen, waitFor } from "@testing-library/react";
import App from "./app";

test("renders the react unity webgl component", async function () {
  render(<App />);
  await waitFor(function () {
    expect(screen.getByRole("unityCanvas")).toBeInTheDocument();
  });
  const canvas = screen.getByRole("unityCanvas");
  expect(canvas).toBeInTheDocument();
});
