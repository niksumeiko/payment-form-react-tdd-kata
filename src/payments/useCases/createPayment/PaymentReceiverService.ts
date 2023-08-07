import type { PaymentReceiverDto } from '../../api/PaymentReceiverApiService';

function formatBankDetails(bank: PaymentReceiverDto['bank'], fallback = '') {
    return (
        [
            bank?.name,
            bank?.address?.street,
            [bank?.address?.zip, bank?.address?.city].filter(Boolean).join(' '),
            bank?.address?.country,
        ]
            .filter(Boolean)
            .join(', ') || fallback
    );
}

export function createPaymentReceiverDescription(details?: PaymentReceiverDto) {
    if (!details) {
        return undefined;
    }

    if (details.isInternal) {
        return `${formatBankDetails(
            details.bank,
            'Same bank transfer',
        )} · Money arrives immediately`;
    }

    return formatBankDetails(details.bank) || undefined;
}
