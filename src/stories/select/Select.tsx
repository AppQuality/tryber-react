import ReactSelect, {components, Styles, Theme} from "react-select"
import {aqBootstrapTheme} from "../theme/defaultTheme"
import {Search} from "react-bootstrap-icons"

interface Option {
  value: string
  label: string
}
export interface SelectProps {
  options: Option[]
  isSearch?: boolean
}

export const Select = ({options, isSearch}: SelectProps) => {
  let aqTheme = (theme: Theme) => ({
    borderRadius: 5,
    spacing: theme.spacing,
    colors: {
      ...theme.colors,
      primary: aqBootstrapTheme.palette.primary,
      primary25: aqBootstrapTheme.palette.disabledElement
    },
  });
  const IndicatorSeparator = () => null;
  let rest = {
    components: {IndicatorSeparator}
  };
  if (isSearch) {
    const DropdownIndicator = (
      props: JSX.LibraryManagedAttributes<typeof components.DropdownIndicator, any>
    ) => (
        <components.DropdownIndicator {...props}>
          <Search />
        </components.DropdownIndicator>
    );
    // @ts-ignore
    rest.components = {...rest.components, DropdownIndicator};
  }

  const customStyle: Styles<any, any> = {
    control: (provided, state) => {
      const borderColor = state.isFocused
        ? `${aqBootstrapTheme.colors.grey600}`
        : `${aqBootstrapTheme.colors.grey100}`;
      const boxShadow = state.isFocused
        ? `inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(23 64 92 / 25%)`
        : `inset 0 1px 2px rgb(0 0 0 / 8%)`
      return {
        ...provided,
        borderColor,
        boxShadow,
        ':hover': {
          borderColor
        },
      };
    }
  }
  return (
    <ReactSelect
      options={options}
      styles={customStyle}
      theme={theme => aqTheme(theme)}
      {...rest}
    />
  )
}