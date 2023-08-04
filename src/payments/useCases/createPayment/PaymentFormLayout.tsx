import type { PropsWithChildren } from 'react';

export const PaymentFormLayout = ({ children }: PropsWithChildren) => (
    <div className="h-screen flex items-center justify-center">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 bg-white px-10 py-6 border rounded-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Payment form
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Make payments effortless
                </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <div className="mt-6 pb-4 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
            </div>
        </div>
    </div>
);
