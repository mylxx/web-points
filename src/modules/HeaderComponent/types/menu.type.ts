export interface MenuItemType {
  label: string;
  icon: string;
  path?: string;
  key: string;
  target?: string;
  children?: MenuItemType[];
}
