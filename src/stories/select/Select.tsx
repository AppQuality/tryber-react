import ReactSelect, {components, Theme} from "react-select"
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

  return (
    <ReactSelect
      options={options}
      theme={theme => aqTheme(theme)}
      {...rest}
    />
  )
}