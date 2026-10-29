import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds toBeInTheDocument() and the other page checks to expect(),
// and tells TypeScript they exist.
import "@testing-library/jest-dom/vitest";

// render() puts each component into the same pretend page. Without this,
// the second test would still see what the first one rendered.
afterEach(() => {
  cleanup();
});