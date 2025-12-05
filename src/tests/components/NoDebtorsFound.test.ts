import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NoDebtorsFound from "@/components/NoDebtorsFound.vue";

describe("NoDebtorsFound.vue", () => {
  it("renders the message and icon", () => {
    const wrapper = mount(NoDebtorsFound);

    expect(wrapper.text()).toContain("No debtors found");
    expect(wrapper.text()).toContain("Try adjusting your search query");

    expect(wrapper.find("svg").exists()).toBe(true);
  });
});
