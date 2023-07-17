import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import { ReactNode } from "react";

import IndexPage from "@/pages";

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
