export interface PublicDynamicPageAttributes {
  readonly title: string;
  path: string;
  [otherOptions: string]: unknown;
}

export interface DynamicPageAttributes extends PublicDynamicPageAttributes {
  readonly toc?: boolean;
  html: string;
}

export interface StoredDynamicPages {
  urls: PublicDynamicPageAttributes[];
  full: Record<string, DynamicPageAttributes>;
}