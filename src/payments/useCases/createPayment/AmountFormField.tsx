import type { FC } from 'react';
import { useController } from 'react-hook-form';

import { FormField, TextInput } from '../../../design-system';

export const AmountFormField: FC = () => {
    const { field } = useController({
        name: 'amount',
    });

    return (
        <FormField
            label="Amount"
            renderInput={(labelReference) => (
                <TextInput id={labelReference} {...field} data-test="amount-entry" />
            )}
        />
    );
};
