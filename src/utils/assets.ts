const cdnBase = (
  import.meta.env.PUBLIC_CDN_URL ||
  process.env.PUBLIC_CDN_URL ||
  ''
).replace(/\/$/, '');

export const publicAssetPath = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return import.meta.env.PROD && cdnBase ? `${cdnBase}${normalizedPath}` : normalizedPath;
};
