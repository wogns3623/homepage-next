import fs from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGFM from 'remark-gfm';

import { Post } from '@types';

export const POST_PATH = '_posts';
export const POST_EXT = 'mdx';
// TODO: get HOST from env or change by NODE_ENV
const HOST = 'some-host.com';

const POST_EXT_REGEX = new RegExp(`.${POST_EXT}$`);

export async function getAllPostFilePaths(): Promise<Array<Array<string>>> {
  async function resolveDirRecursive(subPaths: string[] = []): Promise<Array<Array<string>>> {
    const filePaths: Array<Array<string>> = [];

    try {
      const dir = await fs.opendir([POST_PATH, ...subPaths].join('/'));

      for await (const dirent of dir) {
        if (dirent.isFile()) {
          // remove extension
          const filename = dirent.name.replace(POST_EXT_REGEX, '');

          filePaths.push([...subPaths, filename]);
        } else if (dirent.isDirectory()) {
          const subFilePaths = await resolveDirRecursive([...subPaths, dirent.name]);

          filePaths.push(...subFilePaths);
        }
      }
    } catch (err) {
      console.error(err);
    }

    return filePaths;
  }

  return resolveDirRecursive();
}

class FileNotExistError extends Error {
  public code: string = 'ENOENT';

  constructor(message: string) {
    super(message);
    this.name = 'FileNotExistError';
  }
}

export async function getPost(paths: string[]): Promise<Post> {
  const slug = paths.at(paths.length - 1);
  if (slug === undefined) {
    throw new FileNotExistError('No slug provided');
  }

  const categories = paths.slice(0, paths.length - 1);

  const filePath = `${POST_PATH}/${paths.join('/')}.${POST_EXT}`;
  try {
    const fileStat = await fs.stat(filePath);

    if (!fileStat.isFile()) {
      throw new FileNotExistError(`${filePath} is not a file`);
    }

    const content = await serialize(await fs.readFile(filePath, 'utf8'), {
      mdxOptions: { remarkPlugins: [remarkGFM] },
      parseFrontmatter: true,
    });

    if (typeof content.frontmatter !== 'object' || Array.isArray(content.frontmatter)) {
      throw new Error('Metadata is not an object');
    }

    const {
      title = 'Untitled',
      author = '',
      tags = [],
    } = content.frontmatter as {
      title: string;
      author?: string;
      tags?: string[];
    };

    return {
      slug,
      categories,
      // createdAt: fileStat.birthtimeMs,
      date: fileStat.mtimeMs, // updatedAt: mtimeMs,
      openGraph: {
        title,
        type: 'article',
        image: '',
        url: `https://${HOST}/blog/${paths.join('/')}`,
      },
      content,
      title,
      author,
      tags,
    };
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      console.error('Unexpected error while reading post data', e);
    }

    throw e;
  }
}
