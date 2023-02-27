
# @idevs/corelib

A library to extended Serenity Framework.





## Installation

To install this module, run the following command in your computer terminal:

```console
  npm install --save-dev @idevs/corelib
```

### Modify tsconfig.json

After install this module you have to update file tsconfig.json with the following content:
 
```console
{
  "compileOnSave": true,
  "compilerOptions": {
    --- ommited ---
    "paths": [
      --- ommited ---
      "@idevs/*": [ "node_modules/@idevs/*/dist/index" ]
    ],
    --- ommited ---
    "include": [
      --- ommited ---
      "./node_modules/@idevs/corelib/src/**/*"
    ],
  }
}
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@klomkling](https://www.github.com/klomkling)

