export enum Locale {
    ZH_CN = 'zh_CN',
    EN = 'en'
}

export const defaultLocale = Locale.ZH_CN

export type Messages<T> = {
    [key in Locale]: T
}