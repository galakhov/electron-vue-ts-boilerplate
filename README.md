# bookmarks-analyser-electron

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

[Advanced Webpack configuration of VCP electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration)

See [Configuration Reference](https://cli.vuejs.org/config/).
