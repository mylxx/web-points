// header非粘性定位路由
export const NOT_STICKY_HEADERS_LIST: string[] = ['/text'];

// 透明header路由
export const TRANSPARENT_HEADER_LIST: string[] = ['/text'];

// 当前项目的路由，用于走router.push，不走location.href跳转
export const CUR_ROUTE_PATH: string[] = ['/'];

// 跳转别的页面路由到路由
export const LinkToOtherSystem = (
  path: string,
  target?: string,
  searchStr?: string,
) => {
  let curPath = path;
  if (searchStr) {
    curPath = decodeURIComponent(path).includes('?')
      ? `${path}&${searchStr}`
      : `${path}?${searchStr}`;
  }

  if (target === '_blank') {
    return window.open(curPath, target);
  }
  window.location.href = curPath;
};
