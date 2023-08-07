import { useController } from 'react-hook-form';
import type { FocusEvent } from 'react';
import { useState } from 'react';

import { FormField, TextInput } from '../../../design-system';
import { usePaymentReceiver } from './usePaymentReceiver';

export const IbanFormField = () => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name: 'iban',
    });
    const [value, setValue] = useState(field.value);
    const { details } = usePaymentReceiver({ iban: field.value });

    const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
        field.onChange(event);
        field.onBlur();
    };

    const handleChange = (event: FocusEvent<HTMLInputElement, Element>) => {
        setValue(event.target.value);
    };

    return (
        <FormField
            label="Recipient (IBAN)"
            error={error?.message}
            renderInput={(labelReference) => (
                <TextInput
                    id={labelReference}
                    {...field}
                    value={value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    data-test="iban-entry"
                />
            )}
            description={
                details && (
                    <p role="alert" className="mt-2 text-sm text-blue-500">
                        {details}
                    </p>
                )
            }
        />
    );
};
