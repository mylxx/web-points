import { unstable_setRequestLocale } from 'next-intl/server';
import NoSSR from '@/components/NoSSR';
import { SearchParamsProvider } from '@/providers/SearchParamsProvider';

interface Props {
  params: {
    locale: I18N.LocaleType;
  };
  searchParams: Record<string, string>;
}

interface PageWrapperProps {
  (...args: any[]): JSX.Element;
  ssr?: boolean;
}

export default function PageWrapper(Children: PageWrapperProps) {
  const { ssr = true } = Children;
  return function Page(props: Props) {
    const { params, searchParams } = props;
    const { locale } = params;
    unstable_setRequestLocale(locale);

    return (
      <SearchParamsProvider value={{ searchParams }}>
        {ssr ? (
          <Children {...props} />
        ) : (
          <NoSSR>
            <Children {...props} />
          </NoSSR>
        )}
      </SearchParamsProvider>
    );
  };
}
