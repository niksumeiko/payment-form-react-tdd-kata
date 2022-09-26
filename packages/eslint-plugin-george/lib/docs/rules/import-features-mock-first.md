# import/features-mock-first

This rule enforces that the internal features mock functions are the first internal module imported, to ensure the mocking works as expected.


### Examples

The following patterns are considered problems:

```js
import { setInstance } from '@retail/single-instance-cache';
import { isFeatureEnabledMock } from '@retail/testing';

```

The following patterns are NOT considered problems:

```js
import { isFeatureEnabledMock } from '@retail/testing';
import { setInstance } from '@retail/single-instance-cache';
```
