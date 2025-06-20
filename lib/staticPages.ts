export interface PublicStaticPageAttributes {
  readonly title: string;
  path: string;
  readonly toc?: boolean;
  [otherOptions: string]: unknown;
}

export interface StaticPageAttributes extends PublicStaticPageAttributes {
  html: string;
}

export interface StoredStaticPages {
  urls: PublicStaticPageAttributes[];
  full: Record<string, StaticPageAttributes>;
}