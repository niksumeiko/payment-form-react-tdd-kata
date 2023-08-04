import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    labelReference: string;
    name: Path<T>;
    register: UseFormRegister<T>;
}

export const TextInput = <T extends FieldValues>({
    labelReference,
    name,
    register,
    ...rest
}: Props<T>) => (
    <input
        {...register(name)}
        id={labelReference}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...rest}
    />
);
