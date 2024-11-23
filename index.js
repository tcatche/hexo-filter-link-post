'use strict';

const path = require('path');

// cache permalink for each post
const cachedPost = {};
hexo.extend.filter.register('before_post_render', function(data){
  const filePath = path.normalize(data.source.replace('_posts/', ''));
  cachedPost[filePath] = data.permalink;
  return data;
}, 50);


// update links in post
hexo.extend.filter.register('before_post_render', function(data){
  let currentPostPath = data.source.replace('_posts/', '');
  data.content = updateLinksInPost(data.content, currentPostPath);
  return data;
}, 51);

function updateLinksInPost(postContent, currentPostPath) {
  // regex matching "[name](link)"
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const replacements = [];

  let match;
  while ((match = regex.exec(postContent)) !== null) {
    const [fullMatch, name, link] = match;

    // Check if link ends with ".md" or contains ".md#", and does not contain "://"
    // These links should be processed, as they points to another post
    if ((/\.md(#|$)/.test(link)) && !/:\//.test(link)) {
      // split the link (like "../github/introduction.md#History")
      const [relativePath, anchor = ''] = link.split("#");

      // resolve the relative link path against current directory
      const currentDir = path.dirname(currentPostPath);
      const targetPostPath = path.normalize(path.join(currentDir, relativePath));

      // Is this "targetPostPath" actually points to an existing post?
      const targetPermalink = cachedPost[targetPostPath]
      if(!targetPermalink) {
        continue;
      }

      // reconstruct the new link
      const newLink = `${targetPermalink}${anchor ? "#" + anchor : ""}`;
      const newMarkdownLink = `[${name}](${newLink})`;

      replacements.push({
        start: match.index,
        end: match.index + fullMatch.length,
        replacement: newMarkdownLink,
      });
      hexo.log.i(`Replace link ${fullMatch} --> ${newMarkdownLink} in post [${currentPostPath}]`)
    }
  }

  // apply replacements in reverse order to avoid index shifting
  replacements.reverse().forEach(({ start, end, replacement }) => {
    postContent =
      postContent.slice(0, start) + replacement + postContent.slice(end);
  });

  return postContent;
}
