# import/no-index-in-package

This rule prevents import of the index file within the package.

### Examples

The following patterns are considered problems:

```js
import { formatter } from '..';
import { formatter } from '../..';
```

The following patterns are NOT considered problems:


import { formatter } from '../formatter';

```
