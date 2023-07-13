import { render } from "@testing-library/react";

import IndexPage from "@/pages";

/** Mock Seo"s useRouter */
jest.mock("next/router", () => ({
    useRouter() {
        return {
            asPath: "/",
        };
    },
}));

describe("Index Page", () => {
    it("renders index page", async () => {
        const { container } = render(<IndexPage />);

        expect(container.firstChild?.hasChildNodes()).toBeTruthy();
    });
});
