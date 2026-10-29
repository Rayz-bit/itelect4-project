import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./LoginPage";

// LoginPage calls useNavigate and useMutation, and both throw unless the
// component sits inside the providers main.tsx gives the real app.
// MemoryRouter is BrowserRouter without a browser address bar.
function renderLoginPage() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// Put fetch back after every test, so a spy can't leak into the next one.
afterEach(() => {
  vi.restoreAllMocks();
});

describe("LoginPage", () => {
  it("shows both schema messages when the form is sent empty", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.click(screen.getByRole("button", { name: "Log In" }));

    // The exact sentences from src/schemas/authSchema.ts.
    expect(
      await screen.findByText("Enter a valid email address.")
    ).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  it("sends nothing to the API while the form is invalid", async () => {
    // Watch fetch without stopping it. If the form ever got past the schema,
    // request() in client.ts would call fetch and this spy would count it.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderLoginPage();

    // "juan@dlsl" passes the browser's own email check but fails Zod's
    // (no dot in the domain), so the schema's message is what appears.
    await user.type(screen.getByLabelText("Email"), "juan@dlsl");
    await user.type(screen.getByLabelText("Password"), "anything-goes");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    expect(
      await screen.findByText("Enter a valid email address.")
    ).toBeInTheDocument();
    // The password was fine, so its message is not on the page.
    expect(screen.queryByText("Password is required.")).not.toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});