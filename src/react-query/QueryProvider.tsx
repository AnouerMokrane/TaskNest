import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryProviderTypes = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderTypes) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
