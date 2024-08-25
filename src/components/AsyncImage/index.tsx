'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

type ImageFn = typeof Image;

type ImageFnProps = Parameters<ImageFn>[0];

export interface AsyncImageProps extends Omit<ImageFnProps, 'src'> {
  src: ImageFnProps['src'] | Promise<string>;
}

const AsyncImage = (props: AsyncImageProps) => {
  const { src, loader, ...rest } = props;
  const { width, height, quality } = rest;
  const [imageSrc, setImageSrc] = useState<ImageFnProps['src']>();

  const imageLoader: Exclude<AsyncImageProps['loader'], undefined> =
    useCallback(
      (props) => {
        if (loader) {
          return loader(props);
        }
        const { src } = props;
        const params = new URLSearchParams();
        width && params.set('w', String(width));
        height && params.set('h', String(height));
        quality && params.set('q', String(quality));
        return `${src}?${params.toString()}`;
      },
      [loader, width, quality],
    );

  useEffect(() => {
    if (src instanceof Promise) {
      src.then(setImageSrc);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  if (!imageSrc) {
    return null;
  }
  return <Image src={imageSrc} loader={imageLoader} {...rest} />;
};

export default AsyncImage;
