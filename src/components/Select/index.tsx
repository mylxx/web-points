'use client';

import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as React from 'react';
import {
  Select as AntSelect,
  SelectProps as AntSelectProps,
  RefSelectProps,
  Empty,
} from 'antd';
import cls from 'classnames';
import { BaseSelectRef } from 'rc-select';
import { BaseOptionType } from 'rc-select/es/Select';
import { DefaultOptionType, LabelInValueType } from 'rc-select/lib/Select';
import Input from '@/components/Input';
import SelectActiveOptionIcon from '@/assets/images/common/SelectActiveOptionIcon.svg';
import SelectArrowDownIcon from '@/assets/images/common/SelectArrowDownIcon.svg';
import SelectSearchIcon from '@/assets/images/common/SelectSearchIcon.svg';
import './index.scss';
import useTranslations from '@/hooks/useTranslations';
import type { FlattenOptionData } from 'rc-select/lib/interface';

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends AntSelectProps<ValueType, OptionType> {
  round?: boolean;
  searchIgnoreCase?: boolean;
  optionRender?: (
    oriOption: FlattenOptionData<OptionType>,
    info: {
      index: number;
      isSelected?: boolean;
    },
  ) => React.ReactNode;
  labelRender?: (
    props: LabelInValueType,
    currentOption?: OptionType,
  ) => React.ReactNode;
}

interface SelectDropdownProps {
  node: ReactNode;
  showSearch: boolean;
  onSearch: (value: string) => void;
}

interface SelectDropdownAction {
  reset: () => void;
}

const {
  Option,
  OptGroup,
  SECRET_COMBOBOX_MODE_DO_NOT_USE,
  displayName,
  _InternalPanelDoNotUseOrYouWillBeFired,
} = AntSelect;

const SelectDropdown = forwardRef<SelectDropdownAction, SelectDropdownProps>(
  function SelectDropdown({ node, showSearch, onSearch }, ref) {
    const [searchValue, setSearchValue] = useState<string>();
    const { t } = useTranslations();
    useImperativeHandle(ref, () => ({
      reset() {
        setSearchValue(undefined);
        onSearch('');
      },
    }));
    return (
      <div className="select-dropdown py-[8px] bg-frontGround">
        {showSearch && (
          <div className="py-[8px] px-[16px]">
            <Input
              className="py-[6px] px-[12px]"
              value={searchValue}
              prefix={<SelectSearchIcon className="mr-[8px]" />}
              variant="borderless"
              round
              placeholder={t('common.input.search')}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
            />
          </div>
        )}
        {node}
      </div>
    );
  },
);

const InternalSelect = <
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: SelectProps<ValueType, OptionType>,
  ref: React.Ref<RefSelectProps>,
) => {
  const {
    round,
    searchIgnoreCase = true,
    optionRender: originOptionRender,
    labelRender: originLabelRender,
    onChange,
    fieldNames = {
      label: 'label',
      value: 'value',
      options: 'options',
      groupLabel: 'label',
    },
    ...restProps
  } = props;
  const [options, setOptions] = useState<typeof props.options>(props.options);
  const [currentValue, setCurrentValue] = useState(
    props.value || props.defaultValue,
  );
  const selectDropdownRef = useRef<SelectDropdownAction>(null);
  const { t } = useTranslations();

  const selectedItem = useMemo(() => {
    if (!options) return;
    const { value: valueKey = 'value' } = fieldNames;
    return options.find((opt) => {
      const value = opt[valueKey];
      return value === currentValue;
    });
  }, [fieldNames, currentValue, options]);

  const optionRender: Exclude<typeof originOptionRender, undefined> =
    useCallback(
      (oriOption, info) => {
        const { value: valueKey = 'value', label: labelKey = 'label' } =
          fieldNames;
        const { [valueKey]: value, [labelKey]: label } = oriOption.data;
        const isSelected = currentValue === value;
        info.isSelected = isSelected;
        const node = originOptionRender?.(oriOption, info) || (
          <span
            className={cls('text-titleText', { 'font-600': isSelected })}
          >
            {label}
          </span>
        );
        return (
          <div className="flex items-center justify-between">
            {node}
            {isSelected && <SelectActiveOptionIcon />}
          </div>
        );
      },
      [currentValue, fieldNames, originOptionRender],
    );

  const labelRender: Exclude<typeof originLabelRender, undefined> = useCallback(
    (props) => {
      return originLabelRender?.(props, selectedItem);
    },
    [originLabelRender, selectedItem],
  );

  const handleChange: typeof onChange = (value, option) => {
    setCurrentValue(value);
    onChange?.(value, option);
  };
  const handleSelectSearch = (searchValue: string) => {
    if (!searchValue) {
      setOptions(props.options);
      return;
    }
    const { filterOption = true, optionFilterProp = 'value' } = props;
    if (filterOption) {
      const matchedOptions = props.options?.filter((option) => {
        if (typeof filterOption === 'function') {
          return filterOption(searchValue, option);
        }
        let optionValue = option[optionFilterProp];
        let keyword = searchValue;
        if (searchIgnoreCase) {
          optionValue = optionValue.toLowerCase();
          keyword = keyword.toLowerCase();
        }
        return optionValue.includes(keyword);
      });
      if (matchedOptions) {
        setOptions(matchedOptions);
      }
    }
  };
  const handleVisibleChange = (visible: boolean) => {
    if (!visible) {
      selectDropdownRef.current?.reset();
    }
  };
  const antProps = Object.assign(
    {
      suffixIcon: <SelectArrowDownIcon />,
      dropdownRender: (node: ReactNode) => (
        <SelectDropdown
          ref={selectDropdownRef}
          node={node}
          showSearch={props.showSearch || false}
          onSearch={handleSelectSearch}
        />
      ),
      fieldNames,
      optionRender,
      labelRender,
      onChange: handleChange,
    },
    restProps,
  );

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    setCurrentValue(props.value);
  }, [props.value]);

  return (
    <AntSelect<ValueType, OptionType>
      {...antProps}
      ref={ref}
      showSearch={false}
      className={cls(antProps.className, {
        'rounded-[8px]': round,
        'bg-blockPrimary': antProps.variant === 'borderless',
      })}
      options={options}
      onDropdownVisibleChange={handleVisibleChange}
      notFoundContent={<Empty description={t('common.component.not_found')} />}
    ></AntSelect>
  );
};

type CompoundedSelect = {
  OptGroup: typeof OptGroup;
  Option: typeof Option;
  SECRET_COMBOBOX_MODE_DO_NOT_USE: typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;
  displayName: typeof displayName;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof _InternalPanelDoNotUseOrYouWillBeFired;
};

const Select = React.forwardRef(InternalSelect) as unknown as (<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
  props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> &
    React.RefAttributes<BaseSelectRef>,
) => React.ReactElement) &
  CompoundedSelect;

Select.OptGroup = OptGroup;
Select.Option = Option;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.displayName = displayName;
Select._InternalPanelDoNotUseOrYouWillBeFired =
  _InternalPanelDoNotUseOrYouWillBeFired;

export default Select;
