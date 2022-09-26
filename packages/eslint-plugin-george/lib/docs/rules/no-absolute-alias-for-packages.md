# No absolute alias for packages

Promotes using proper aliases when importing packages. Has auto-fix support.


This is wrong:

```
import type { Accountno } from '@george/shared/types/src';
```

This is proper import:
```
```import type { Accountno } from '@shared/types';```
```
