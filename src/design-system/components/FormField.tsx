import type { PropsWithChildren, ReactNode } from 'react';
import { useId } from 'react';

interface Props {
    label: string;
    renderInput(labelReference: string): ReactNode;
    error?: string;
}

export const FormField = ({ error, label, renderInput }: PropsWithChildren<Props>) => {
    const labelReference = useId();

    return (
        <div className="my-6">
            <label
                htmlFor={labelReference}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">{renderInput(labelReference)}</div>
            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};
