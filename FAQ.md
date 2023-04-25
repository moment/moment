# Frequently asked questions

_This document is a work in progress and it is used to collect common questions._

## How to import moment in TypeScript?

### Have trouble importing moment?

If your tsconfig.json contains the following config, you must do the default import workflow `import moment from 'moment'`:

```json
// tsconfig.json
// https://www.typescriptlang.org/v2/docs/handbook/release-notes/typescript-2-7.html
{ 
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
  }
}
```

If you don't have these config above, the default import won't work, and you'll continue to have to use `import * as moment from 'moment'`.

Note: It is recommended to use `import moment from 'moment'`.

### Case and Program

Known cases so far: [#5444](https://github.com/moment/moment/issues/5444), [#5248](https://github.com/moment/moment/issues/5348) and [#5449](https://github.com/moment/moment/issues/5449).