# Disallow importing external code in the luna folder (no-ext-in-luna-import)

Luna is feature-code agnostic library and should not directly depend on external code (except libraries).

This rule makes sure that other packages cannot be imported in the luna.

## Rule details

The following import in the context of the package folder is considered an error:

```js
import { Fun } from '@shared/types';
```

