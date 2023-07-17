import { act, render, waitFor } from "@testing-library/react";

import IndexPage from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

/** Mock useRouter */
jest.mock("next/router", () => ({
    useRouter() {
        return {
            asPath: "/",
        };
    },
}));

const createWrapper = () => {
    // ✅ creates a new QueryClient for each test
    const queryClient = new QueryClient();
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe("Index Page", () => {
    it("renders index page", async () => {
        const { container } = await act(async () =>
            render(<IndexPage />, {
                wrapper: createWrapper(),
            })
        );

        expect(container.firstChild?.hasChildNodes()).toBeTruthy();
    });
});
