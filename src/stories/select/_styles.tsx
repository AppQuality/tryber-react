import { components, Styles, Theme } from "react-select";
import { aqBootstrapTheme } from "../theme/defaultTheme";
import { ChevronDown, X } from "react-bootstrap-icons";

const aqTheme = (theme: Theme) => ({
  borderRadius: 5,
  spacing: theme.spacing,
  colors: {
    ...theme.colors,
    primary: aqBootstrapTheme.palette.primary,
    primary25: aqBootstrapTheme.palette.disabledElement,
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
    const borderColor = state.isFocused
      ? `${aqBootstrapTheme.colors.grey600}`
      : `${aqBootstrapTheme.colors.grey100}`;
    const boxShadow = state.isFocused
      ? `inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(23 64 92 / 25%)`
      : `inset 0 1px 2px rgb(0 0 0 / 8%)`;
    return {
      ...provided,
      borderColor,
      boxShadow,
      ":hover": {
        borderColor,
      },
    };
  },
};

export { aqTheme, customComponents, customStyle };
