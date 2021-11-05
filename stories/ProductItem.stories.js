import React from "react";
import ProductItem from "../components/Products/ProductItem";

export default {
  component: ProductItem,
  title: "Components/ProductItem",
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <ProductItem {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  id: "GGOEAFKA087499",
};
