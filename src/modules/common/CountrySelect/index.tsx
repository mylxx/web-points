'use client';

import { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { useRecoilValue } from 'recoil';
import Select from '@/components/Select/index';
import { CountryListItem } from '@/apis';
import { countryListState } from '@/store';

export interface CountrySelectProps {
  round?: boolean;
  defaultValue?: string;
  onSelect?: (item: CountryListItem) => void;
}

function CountryOption({
  logo,
  country,
  active,
}: {
  logo: string;
  country: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center congtry">
      <div className="flex items-center gap-[12px] cursor-pointer flex-1">
        <img width={24} src={logo} alt="" />
        <span className={cls('text-titleText', { 'font-bai-600': active })}>
          {country}
        </span>
      </div>
    </div>
  );
}

export default function CountrySelect(props: CountrySelectProps) {
  // restProps 将FormItem额外添加的props透传下去，不能删除
  const { round = true, defaultValue, onSelect, ...restProps } = props;
  const list = useRecoilValue(countryListState);
  const [countryCode, setCountryCode] = useState<string>();

  const translateList = useMemo(() => {
    return list.map((item) => ({
      ...item,
    }));
  }, [list]);

  const selectedCountryItem = useMemo(() => {
    return translateList.find((item) => item.code === countryCode);
  }, [countryCode, translateList]);

  useEffect(() => {
    if (!selectedCountryItem) return;
    onSelect?.(selectedCountryItem);
  }, [selectedCountryItem]);

  return (
    <Select
      popupClassName="max-h-[248px]"
      {...restProps}
      round={round}
      variant="borderless"
      showSearch
      defaultValue={defaultValue}
      placeholder={'countryplaceholder'}
      fieldNames={{
        label: 'country',
        value: 'code',
      }}
      optionFilterProp="country"
      options={translateList}
      onSelect={(countryCode) => {
        setCountryCode(countryCode);
      }}
      labelRender={(props, currentItem) => {
        if (!currentItem) return null;
        const { country, logo } = currentItem;
        return <CountryOption country={country} logo={logo} />;
      }}
      optionRender={(option, info) => {
        const { country, logo } = option.data;
        return (
          <CountryOption
            country={country}
            logo={logo}
            active={info.isSelected}
          />
        );
      }}
    />
  );
}
