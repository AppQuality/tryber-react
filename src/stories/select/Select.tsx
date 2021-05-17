import ReactSelect, {components, Styles, Theme} from "react-select"
import {aqBootstrapTheme} from "../theme/defaultTheme"
import {ChevronDown, X} from "react-bootstrap-icons"
import {useEffect, useReducer, useState} from "react";

export interface Option {
  label: string
  value?: string
  options?: Option[]
  isDisabled?: boolean
  isFixed?: boolean
  [index: string]: any;
}

type Options = Option[] | GetOptionsAsync;

export type GetOptionsAsync = () => Promise<Option[]>;
// () => { github.get('repositories').then( rep => rep.map(r => {r.id,r.name}))
// () => { api.get('/api/users/me/bugs').then( bugs => bug.map( b => b.campaign_name).unique())

export interface SelectProps {
  options: Options
  defaultValue?: string
  placeholder?: string
  isMulti?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  isSearchable?: boolean
}

type OptionActionType = 'add' | 'reset' | 'set';
interface OptionAction {
  type: OptionActionType,
  payload: Option[]
}

export const Select = ({options, defaultValue, placeholder = 'Select...', isMulti, isDisabled, isLoading, isClearable = true, isSearchable}: SelectProps) => {
  const [loading, setLoading] = useState(isLoading);

  function updateOptions (state: Option[], action: OptionAction): Option[] {
    const {type, payload} = action;
    switch (type) {
      case "set": {
        return payload;
      }
      case 'add': {
        return [...state, ...payload];
      }
      case "reset": {
        return [];
      }
    }
  };

  const [optionsArray, setOptions] = useReducer(updateOptions, []);

  useEffect(()=>{
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (options instanceof Array) {
      setOptions({type: 'set', payload: options});
    } else {
      getAsyncRes('set', options);
    }
  }, [options]);

  const getAsyncRes = async (type: OptionActionType, fn: GetOptionsAsync) => {
    const res = await fn();
    setOptions({type: type, payload: res});
  }

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

  const onMenuScrollToBottom = () => {
    if (options instanceof Function) {
      setLoading(true);
      getAsyncRes('add', options).then(() => {
        setLoading(false);
      })
    }
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
      options={[...optionsArray, loading ? { value: 'loading', label: 'Loading more...', isDisabled: true } : {}]}
      defaultValue={defaultValue}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isLoading={loading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      styles={customStyle}
      isMulti={isMulti}
      // menuPlacement='auto'
      onMenuScrollToBottom={onMenuScrollToBottom}
      theme={theme => aqTheme(theme)}
      {...rest}
    />
  )
}