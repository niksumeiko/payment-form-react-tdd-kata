# Disallow importing src in the package folder (no-src-in-packages)

Importing src folder in the packages is a disruption of the new modular architecture, that consist only of the
packages (modules), with predefine scope. Every "package" should be then pure and depend only on other packages (if a
scope allows it).

This rule does not affect other folders in the project.

## Rule details

The following import in the context of the package folder is considered an error:

```js
import { fun } from 'src/products';
```

