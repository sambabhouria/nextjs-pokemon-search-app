import globalStyles from "@/styles/globals";
import typography from "@/styles/typography";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import queryClientInstance from "../lib/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(queryClientInstance);
  globalStyles();
  typography();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
