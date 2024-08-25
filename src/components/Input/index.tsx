'use client';
import { forwardRef } from 'react';
import { Input as AntInput, InputProps as AntInputProps, InputRef } from 'antd';
import { SearchProps as AntSearchProps } from 'antd/es/input/Search';
import {
  TextAreaProps as AntTextAreaProps,
  TextAreaRef,
} from 'antd/es/input/TextArea';
import cls from 'classnames';

interface InputProps extends AntInputProps {
  round?: boolean;
}

interface TextAreaProps extends AntTextAreaProps {
  round?: boolean;
}

interface SearchProps extends AntSearchProps {
  round?: boolean;
}

const { TextArea: AntTextArea, Search: AntSearch } = AntInput;

const InternalInput = forwardRef<InputRef, InputProps>(
  function Input(props, ref) {
    const { round, ...restProps } = props;
    return (
      <AntInput
        {...restProps}
        ref={ref}
        className={cls(restProps.className, {
          'rounded-[999px]': round,
          'bg-blockPrimary': restProps.variant === 'borderless',
        })}
      />
    );
  },
);

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  function TextArea(props, ref) {
    const { round, ...restProps } = props;
    return (
      <AntTextArea
        {...restProps}
        ref={ref}
        className={cls(restProps.className, {
          'rounded-[8px]': round,
          'bg-blockPrimary': restProps.variant === 'borderless',
        })}
      />
    );
  },
);

const Search = forwardRef<InputRef, SearchProps>(function TextArea(props, ref) {
  const { round, ...restProps } = props;
  return (
    <AntSearch
      {...restProps}
      ref={ref}
      className={cls(restProps.className, {
        'rounded-[8px]': round,
        'bg-blockPrimary': restProps.variant === 'borderless',
      })}
    />
  );
});

type CompoundedInput = typeof InternalInput & {
  TextArea: typeof TextArea;
  Search: typeof Search;
};

const Input: CompoundedInput = InternalInput as CompoundedInput;

Input.TextArea = TextArea;
Input.Search = Search;

export default Input;
