import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // <-- NEW
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // <-- NEW
import "./index.css";
import App from "./App.tsx";

// One QueryClient owns the cache every useQuery reads.
const queryClient = new QueryClient({
  // Default is 3 retries: a failure takes ~7s to appear. 1 retry: ~1s.
  defaultOptions: { queries: { retry: 1 } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* <-- NEW */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/* <-- NEW */}
    </QueryClientProvider> {/* <-- NEW */}
  </StrictMode>,
);