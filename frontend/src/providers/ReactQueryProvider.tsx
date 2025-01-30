"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type childrenType = {
  children: ReactNode;
};

const ReactQueryProvider = ({ children }: childrenType) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
