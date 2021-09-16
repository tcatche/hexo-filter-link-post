
'use strict';

const cachedPost = {};
let lastPost;
hexo.extend.filter.register('post_permalink', function(data){
  lastPost = data;
  return data;
}, 1);
hexo.extend.filter.register('post_permalink', function(permalink) {
  if (lastPost) {
    const fileName = lastPost.source.replace('_posts/', '');
    cachedPost[fileName] = permalink;
  }
  return permalink;
}, 25);

hexo.extend.filter.register("after_render:html", (str) => {
  const re = /<a[^>]*href[=\"\'\s]+([^\"\']*)[\"\']?[^>]*>/g;
  return str.replace(re, function(p1, p2) {
    const fileName = p2.replace(/..\/|.\//g, '').replace(/.md#[\w]+/, '.md');
    if (cachedPost[fileName]) {
      const toBeReplacedContent = p2.replace(/.md#[\w]+/, '.md');
      return p1.replace(toBeReplacedContent, `/${cachedPost[fileName]}`);
    }
    return p1;
  });
});




