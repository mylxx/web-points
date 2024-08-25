const getPlatform = () => {
  const phoneAgent = navigator?.userAgent
    ?.toLowerCase()
    ?.match(/(iphone|ipad|ipod|android|MicroMessenger)/);

  return phoneAgent?.length ? phoneAgent[1] : '';
};

const isApple = () => {
  return ['iphone', 'ipad'].includes(getPlatform());
};

const isAndroid = () => {
  return getPlatform() === 'android';
};

const isApp = () => {
  if (!window) return false;
  // 此条件满足安卓app
  if (window.control) return true;
  // 此条件满足非安卓app 和 ios safari 浏览器
  if (!window.control && !window.webkit) return false;
  // ios 执行下此方法 成功执行证明事app环境
  try {
    window.webkit.messageHandlers.transDomainConfig.postMessage(null);
    return true;
  } catch (error) {
    console.log('error===>', error);
  }
  return false;
};

const isMobile = () => {
  const userAgent = navigator?.userAgent?.toLowerCase();
  const isMobile = /mobile/i.test(userAgent);
  return isMobile;
};

export { getPlatform, isApple, isAndroid, isApp, isMobile };
