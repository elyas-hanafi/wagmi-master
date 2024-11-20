import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode, useState } from "react";

type ReactQueryProviderProps = {
  children: ReactNode;
};

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
