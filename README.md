# electron-vue-ts-boilerplate

## Project setup

```
npm install
```

### If it hangs on 'extract:app-builder-bin', try to install with the temporary cache enabled

```
rm -rf node_modules/
npm cache clean
npm install --cache /tmp/empty-cache
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

[vue-cli-plugin-electron-builder guide](https://github.com/nklayman/vue-cli-plugin-electron-builder/blob/master/docs/guide/guide.md)

[Advanced Webpack configuration of VCP electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration)

[WebPack Config / vue.config.js](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin):
`vue inspect > webpack.config.preview.js`

See [Configuration Reference](https://cli.vuejs.org/config/).

[TSConfig docs](https://basarat.gitbooks.io/typescript/docs/project/tsconfig.html).

[GIT: changing remotes](https://help.github.com/en/articles/changing-a-remotes-url).
