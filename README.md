# 需要参考的文档
- [nextJS](https://nextjs.org/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [tailwind](https://tailwindcss.com/)
- [Ant Design](https://ant-design.antgroup.com/components/overview-cn/)
- [mockJS](https://mockjs.com/)
- [react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Recoil](https://recoiljs.org/zh-hans/docs/introduction/installation)

# antd



# i18n
多语言使用`next-intl`库，针对这个库进行了一些封装。

## 关于语言
语言获取方式有多种
- SSR阶段可以使用`next-intl/server`提供的`getLocale`方法获取当前语言
- CSR阶段可以从cookie里获取当前语言，方法已经封装在`@/utils/i18nUtils`导出的`getCookieLocale`方法
- CSR阶段组件内可以通过`next-intl`提供的`useLocale`hooks获取当前语言

**_目前多语言采用SSR阶段动态获取的模式，在服务端请求的时候需要通过内网域名访问，在客户端通过外网域名访问。如果需要在本地启动start看效果，需要自行添加.env.test.local文件，配置process.env.NEXT_PUBLIC_START_ENV=local_**

**_服务端或其他系统的多语言标识可能与本站不同，多语言的映射已经在`@/utils/i18nUtils`的`getHTTPHeaderLocale`方法里封装了，涉及到其他站点的多语言映射需要自行添加方法_**

## 关于路由
next原生的路由方法会忽略多语言路径，在项目里使用起来会比较麻烦，所以针对多语言封装了一系列路由方法，可以忽略当前多语言进行页面跳转。

方法封装在`@/utils/navigation`

## 服务端使用多语言
服务端需要使用多语言，可以使用`@/utils/getTranslations`封装的方法，包括`getTranslations`和`getRemoteTranslations`。

对应使用本地词条和服务端词条。

## 客户端使用多语言

### 组件内使用
在组件内使用多语言，需要使用`@/hooks/useTranslations`导出的方法，其中包含t、rich、markup、raw四种方法，按需使用。

`@/hooks/useTranslations` 导出了默认方法`useTranslations`和一个具名方法`useRemoteTranslations`。

使用项目内的词条时，使用默认方法（默认方法的词条参数有ts提示），使用服务端返回的词条时，使用具名方法。

**_为了避免本地词条和服务端词条冲突，本地和服务端的词条添加了不同的命名空间，为了避免使用上的麻烦，务必使用hooks。_**

### 组件外使用
在组件外使用多语言，需要使用`@/utils/IntlNexus`导出的方法，其中包含t、rich、markup、raw、remoteT 、remoteRaw 、remoteRich 、remoteMarkup

对应上一节提到的本地词条和服务端词条方法。

# 状态管理
项目使用Recoil进行状态管理，状态维护在`@store`路径下，根据不同模块进行分组维护，记得最后在`@store/index.ts`里导出

## Recoil在React组件内使用
```tsx component.tsx
import { useRecoilState } from 'recoil';
import { loginState } from '@/store';

function Component() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  
  useEffect(() => {
    // ... some logic
    setIsLogin(true)
  }, [])
  
  return isLogin ? <div>login</div> : <div>unlogin</div>
  
  // ... other logic
}
```

## Recoil在非React组件内使用

```ts tool.ts
import { setRecoil } from 'recoil-nexus';
import { loginState } from '@/store';

// ... some logic

setRecoil(loginState, false);

// ... other logic
```

**_特别提醒：Recoil在selector里使用异步get会在SSR阶段出现死循环的现象，避免使用async get。如果必须要用，确保这个selector不会在SSR阶段运行_**
**_替代selector async get方案：get函数使用普通函数，在内部判断是否服务端，服务端返回selector的默认值，非服务端返回一个promise_**
**_务必在selector里不要使用async get_**

# request
项目使用axios库进行请求发送，为了便于本地开发，接入了mockjs来做数据模拟。

- 请求在`src/apis/*.ts`进行编写，可以根据页面/模块进行划分
- mock数据在`src/mock/*.js`进行编写，如果根据页面/模块进行划分，需要在`src/mock/index.js`里引入并补充到mockAPI对象里
- mock数据仅在开发环境并且没有使用代理的情况下生效
- mock数据编写规则：
  - 接口导出为一个对象的形式
    - key格式为`METHOD API_URL`，METHOD可选GET,POST,PUT,DELETE, METHOD和API_URL之间需要一个空格
    - value为一个函数，返回接口指定的数据结构。(这里推荐使用`src/mock/mockUtil.js`导出的successResult方法，对常见的返回数据格式进行了封装)
    - 在mock数据里，可以使用Mock提供的random方法对数据进行模拟，参考[官网](https://mockjs.com/)
- 请求响应
  针对with code响应类型，request util会拦截返回的异常响应。与后端约定，code为服务端多语言key，params为多语言词条的变量值。多语言词条包含变量时，以{0}, {1}这样的格式进行配置。
  但并不能保证每一个服务端同学都按约定的模式来设置。所以可能会存在多语言读取异常的情况（多语言存在变量但params没有对应上），此时需要跟服务端同学沟通词条的问题。
- 请求的使用
```tsx
import { useQuery } from 'react-query';
import { queryData } from '@/apis/somemodule.ts';

function App() {
  const { data, isLoading } = useQuery('userInfo', () => queryData());
  
  if (isLoading) {
    return <div>loading</div>
  }
  
  return <div>{data.userInfo}</div>
}

```
其中data的数据类型会根据第二个参数的返回值自动推断


# create 脚本使用说明
推荐使用create脚本创建page, layout, component, module

create脚本介绍：

执行后，脚本会在指定路径下创建对应文件, 若文件已存在，则会抛错。例如：

创建页面：
```shell
npm run create page somePage
```
将在`src/app/[locale]`路径下创建文件夹somepage，并在这个文件夹下创建page.tsx

由于命名规范问题，这里将会将文件名转为全小写作为文件夹名称

创建布局：
```shell
npm run create layout somePage
```
将在`src/app/[locale]`路径下创建文件夹somepage，并在这个文件夹下创建layout.tsx

由于命名规范问题，这里将会将文件名转为全小写作为文件夹名称

创建组件：
```shell
npm run create component SomeComponent
```
将在`src/app/components`路径下创建文件夹SomeComponent，并在这个文件夹下创建index.tsx

创建的组件将会自动带上use client标记

创建模块：
```shell
npm run create module SomeModule
```
将在`src/app/modules`路径下创建文件夹SomeModule，并在这个文件夹下创建index.tsx

创建的模块将会自动带上use client标记


# 特别注意

- 所有layout.tsx需要导出generateStaticParams方法，并且使用unstable_setRequestLocale，否则打包可能出现问题
- 所有page.tsx需要使用unstable_setRequestLocale，否则打包可能出现问题
- app路径下只放页面相关的文件（page.tsx, layout.tsx等），其他的按模块组件划分进行引入
- 客户端多语言推荐使用`@/hooks/useTranslations`导出的方法，hooks提供的方法会提示多语言词条，减少词条错误的情况
- 客户端router相关的方法（Link标签、重定向、获取pathname、获取router方法）推荐使用`@/utils/navigation`导出的方法，这里提供的方法在涉及到路径名时会自行处理多语言问题
- SSR阶段需要使用多语言推荐使用`@/utils/getTranslations`导出的方法，此方法会提示多语言词条
- AntDesign组件库： Next.js App Router 当前不支持直接使用 . 引入的子组件，如 <Select.Option />、<Typography.Text /> 等，需要从路径引入这些子组件来避免错误。

**_需要上线时忽略的代码可以通过代码块build-ignore-start和build-ignore-end包裹，例如_**
