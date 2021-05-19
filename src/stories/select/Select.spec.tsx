import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import React from "react";
import { Select } from "./Select";
import { aqBootstrapTheme } from "../theme/defaultTheme";
import { basicOptions } from "./_data";

describe("Basic Select should render options correctly", () => {
  it("There should be as many options as provided", () => {
    const { container } = render(
      <ThemeProvider theme={aqBootstrapTheme}>
        <Select options={basicOptions} />
      </ThemeProvider>
    );
    const th = container.querySelectorAll("thead th");
    expect(th.length).toEqual(0);
  });
});
