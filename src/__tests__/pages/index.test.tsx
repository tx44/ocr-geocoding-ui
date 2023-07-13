import IndexPage from "@/pages";
import { render } from "@testing-library/react";

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
        const { container } = render(
            <IndexPage />
        );

        expect(container.firstChild?.hasChildNodes()).toBeTruthy();
    });
});
