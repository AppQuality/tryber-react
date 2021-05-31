import { components, Styles, Theme } from "react-select";
import { aqBootstrapTheme } from "../theme/defaultTheme";
import { ChevronDown, X } from "react-bootstrap-icons";

const aqTheme = (theme: Theme) => ({
  borderRadius: 5,
  spacing: theme.spacing,
  colors: {
    ...theme.colors,
    primary: aqBootstrapTheme.palette.primary,
    primary25: aqBootstrapTheme.colors.gray300,
  },
});

const IndicatorSeparator = () => null;
const DropdownIndicator = (
  props: JSX.LibraryManagedAttributes<typeof components.DropdownIndicator, any>
) => (
  <components.DropdownIndicator {...props}>
    <ChevronDown />
  </components.DropdownIndicator>
);
const ClearIndicator = (
  props: JSX.LibraryManagedAttributes<typeof components.DropdownIndicator, any>
) => (
  <components.ClearIndicator {...props}>
    <X />
  </components.ClearIndicator>
);
let customComponents = {
  components: {
    IndicatorSeparator,
    DropdownIndicator,
    ClearIndicator,
  },
};

const customStyle: Styles<any, any> = {
  control: (provided, state) => {
    const borderColor = `${aqBootstrapTheme.colors.gray500}`;
    const boxShadow = "none";

    return {
      ...provided,
      borderColor,
      boxShadow,
      ":hover": {
        // Why is overriding an other border-color property?
        borderColor: borderColor,
      },
    };
  },
  dropdownIndicator: (provided, state) => {
    const color = `${aqBootstrapTheme.colors.blue900}`;
    const fontSize = "1.25rem";
    const transform = state.selectProps.menuIsOpen ? "rotate(180deg)" : "";

    return {
      ...provided,
      color,
      fontSize,
      transform,
    };
  },
  menu: (provided, state) => {
    const borderColor = `${aqBootstrapTheme.colors.gray500}`;
    const borderWidth = "1px";
    const borderStyle = "solid";
    const borderRadius = "4px";
    const filter = "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))";

    return {
      ...provided,
      borderColor,
      borderRadius,
      borderWidth,
      borderStyle,
      filter,
    };
  },
};

export { aqTheme, customComponents, customStyle };
