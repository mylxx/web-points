/**
 * 找到菜单项
 */
export const findItemByMenuKey = (menuList: any[], key: string) => {
  const searchItem = (menu: any[]) => {
    for (const item of menu) {
      if (item.key === key) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const subItem: any = searchItem(item.children);
        if (subItem) {
          return subItem;
        }
      }
    }
    return undefined;
  };

  return searchItem(menuList);
};

export const navigatorDefault = (props: { path?: string }) => {
  if (window) {
    window.location.href = props.path || '/';
  }
};
