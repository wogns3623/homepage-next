import { OpenGraph } from '@types';

export interface OpenGraphProps extends OpenGraph {}

export default function OpenGraphMeta({ title, description, type, url, image }: OpenGraphProps) {
  return (
    <>
      <meta property='og:title' content={title} />
      <meta property='og:type' content={type} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      {description && <meta property='og:description' content={description} />}
    </>
  );
}
