import ReactSelect, {components, Styles, Theme} from "react-select"
import {aqBootstrapTheme} from "../theme/defaultTheme"
import {ChevronDown, X} from "react-bootstrap-icons"

interface Option {
  value: string
  label: string
}
export interface SelectProps {
  options: Option[]
  defaultValue?: string
  placeholder?: string
  isMulti?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isSearchable?: boolean
}

export const Select = ({options, defaultValue, placeholder = 'Select...', isMulti, isDisabled, isLoading, isClearable = true, isSearchable}: SelectProps) => {
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
  // @ts-ignore
  rest.components = {...rest.components, DropdownIndicator, ClearIndicator};

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
      defaultValue={defaultValue}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      styles={customStyle}
      isMulti={isMulti}
      theme={theme => aqTheme(theme)}
      {...rest}
    />
  )
}