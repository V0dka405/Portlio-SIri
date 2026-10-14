export type Locale = 'en' | 'th';

/** A value that exists in every supported language. */
export type Localized<T> = Record<Locale, T>;
