const scriptCache = new Set();
export default function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    if (scriptCache.has(src)) {
      resolve();
      return;
    }
    scriptCache.add(src);
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      resolve();
    });
    document.head?.appendChild(script);
  });
}
