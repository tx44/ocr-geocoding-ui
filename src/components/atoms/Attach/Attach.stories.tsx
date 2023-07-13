import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Attach from "./Attach";

export default {
    title: "Attach",
    component: Attach,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof Attach>;

const Template: ComponentStory<typeof Attach> = (args) => (
    <form className="m-8" action="/" method="post">
        <Attach {...args} />
    </form>
);

export const DefaultAttach = Template.bind({});
DefaultAttach.args = {
    accept: {
        "image/*": [],
    },
};
