import debounce from 'debounce-promise';
import React, { useRef, useEffect, useCallback } from 'react';
import Select from 'react-select/async';
import { useField } from '@unform/core';

import { Container, Label, Error } from './styles';

export default function ComboboxInput({ name, label, loadOptions, ...rest }) {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const debouncedLoadOptions = useCallback(
    debounce((inputValue) => loadOptions(inputValue), 500, {
      leading: true,
    }),
    [loadOptions]
  );

  return (
    <Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        loadOptions={debouncedLoadOptions}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
