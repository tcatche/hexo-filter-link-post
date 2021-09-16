# hexo-filter-link-post

Transfer relative post link in markdown file to post link.

将文件里的通过相对路径引用的 markdown 文件转为对应的文章的链接

## example

```
- _post
  |- foo.md
  |- bar.md
```

In foo.md, there is a reference bar.md: `[Referrence: bar](./bar.md)`.

After hexo render, the reference in html file is:

```html
<a href="./bar.md">Referrence: bar</a>
```
But, the link is an unreachable link.

---

With this plugin, the html will be transfered as

```html
<a href="/2021/08/04/bar/">Referrence: bar</a>
```

Now the link is reachable.


And After `1.0.1`, The link with anchor(`#title`) also support:

```
// before
`[Referrence: bar](./bar.md#title)`

// after
<a href="/2021/08/04/bar/#title">Referrence: bar</a>
```

## install

```
npm install hexo-filter-link-post --save
```



## Related hexo plugins
- [hexo-generator-issues](https://github.com/tcatche/hexo-generator-issues): publish your hexo posts to github issues. 将个人文章发布到 github 的指定仓库下，每篇文章作为一个 issue。
- [hexo-generator-readme-file](https://github.com/tcatche/hexo-generator-readme-file): generate a `README.md` file contains all of blog posts link. 为你的文章生成一个 `README.md` 文件，里面包含了所有的文章链接。
- [hexo-filter-link-post](https://github.com/tcatche/hexo-filter-link-post): Transfer relative post link in markdown file to post link. 将文件里的通过相对路径引用的 markdown 文件转为对应的文章的链接。

## License

[MIT](./LICENSE)
