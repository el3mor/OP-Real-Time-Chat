"use client";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import Loader from "./components/Loader";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set in the environment variables.");
}

const convex = new ConvexReactClient(convexUrl);

interface ConvexClerkProviderProps {
  children: ReactNode;
}

export const ConvexClerkProvider = ({ children }: ConvexClerkProviderProps) => {


  return (
    <ConvexProviderWithClerk
      useAuth={useAuth}
      client={convex}
    >
      <Authenticated>{children}</Authenticated>
      <AuthLoading>
        <Loader />
      </AuthLoading>
    </ConvexProviderWithClerk>
  );
};
