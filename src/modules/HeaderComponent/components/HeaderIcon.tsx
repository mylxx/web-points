'use client';

import LangIcon from '../assets/LangIcon.svg';
import MoreIcon from '../assets/MoreIcon.svg';

const components = {
  MoreIcon: <MoreIcon />,
  LangIcon: <LangIcon />,
};

export type HeaderIconType = keyof typeof components;

export default function HeaderIcon(props: { type: HeaderIconType }) {
  return (
    <span className="w-[24px] menu-item-icon">{components[props.type]}</span>
  );
}
