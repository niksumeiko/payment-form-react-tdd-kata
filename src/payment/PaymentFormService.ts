import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

const FORM_VALIDATION_SCHEMA = object({
    iban: string().required('Missing IBAN'),
});

export const PAYMENT_FORM_OPTIONS = {
    resolver: yupResolver(FORM_VALIDATION_SCHEMA),
};
