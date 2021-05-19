import ReactSelect from "react-select";
import { useEffect, useReducer, useState } from "react";
import { aqTheme, customComponents, customStyle } from "./_styles";
import {
  Option,
  GetOptionsAsync,
  OptionAction,
  OptionActionType,
  SelectProps,
} from "./_types";

function updateOptions(state: Option[], action: OptionAction): Option[] {
  const { type, payload } = action;
  switch (type) {
    case "set": {
      return payload;
    }
    case "add": {
      return [...state, ...payload];
    }
    case "reset": {
      return [];
    }
  }
}

let searchBuffer = '';
let timer: NodeJS.Timeout | false = false;

export const Select = ({
  options,
  defaultValue,
  placeholder = "Select...",
  isMulti,
  isDisabled,
  isLoading,
  isClearable = true,
  isSearchable,
}: SelectProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [searching, setSearching] = useState<string | false>(false);
  const [page, setPage] = useState(0);
  const [thereIsMore, setMore] = useState(true);
  const [optionsArray, setOptions] = useReducer(updateOptions, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (thereIsMore) {
      triggerUpdate();
    }
  }, [page]);

  useEffect(() => {
    if (options instanceof Array) {
      setOptions({ type: "set", payload: options });
    }
  }, []);

  const triggerUpdate = () => {
    if (options instanceof Function) {
      setLoading(true);
      getAsyncRes("add", options, page).finally(() => {
        setLoading(false);
      });
    }
  };

  const getAsyncRes = async (
    type: OptionActionType,
    fn: GetOptionsAsync,
    start: number,
    search?: string
  ) => {
    const res = await fn(start, search);
    setMore(res.more);
    setOptions({ type: type, payload: res.results });
  };

  const handleInputChange = (value: string) => {
    if (options instanceof Function) {
      timer = false;
      searchBuffer = value;
      setSearching(value);
      timer = setTimeout(function () {
        if (searchBuffer.length >= 2) {
          setLoading(true);
          getAsyncRes('set', options, 0, searchBuffer).finally(() => {
            setLoading(false);
          });
        }
      }, 800);
    }
  };

  const handleChange = () => {
    if (options instanceof Function) {
      if (typeof searching === "string" && searching.length >= 2) {
        resetOptions();
      }
    }
  };

  const handleBlur = () => {
    if (searching) {
      resetOptions();
    }
    setSearching(false);
    setLoading(false);
  };

  const resetOptions = () => {
    setOptions({ type: "reset", payload: [] });
    setMore(true);
    setPage((page) => {
      if (page === 0) {
        triggerUpdate();
      }
      return 0;
    });
  };

  const onMenuScrollToBottom = () => {
    if (thereIsMore) setPage((page) => page + 1); // this is not the updated value of thereIsMore untill rerender :((
  };

  const optionsDropdown = [...optionsArray];
  if (loading) {
    optionsDropdown.push({
      value: "loading-placeholder",
      label: "Loading more...",
      isDisabled: true,
    });
  } else if (
    searching &&
    typeof searching === "string" &&
    searching.length < 2
  ) {
    optionsDropdown.push({
      value: "search-placeholder",
      label: "Please write at list 2 characters to load more results",
      isDisabled: true,
    });
  }
  return (
    <>
      <ReactSelect
        onBlur={handleBlur}
        onChange={handleChange}
        options={optionsDropdown}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={loading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        styles={customStyle}
        isMulti={isMulti}
        captureMenuScroll={true}
        onMenuScrollToBottom={onMenuScrollToBottom}
        // menuPlacement='auto'
        onInputChange={handleInputChange}
        theme={aqTheme}
        {...customComponents}
      />
    </>
  );
};
