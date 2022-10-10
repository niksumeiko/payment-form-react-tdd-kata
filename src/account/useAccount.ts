import { useQuery } from '@tanstack/react-query';

import { fetchAccount } from './api/AccountApiService';
import type { Account } from './AccountService';

interface AccountQuery {
    account?: Account;
}

export function useAccount(): AccountQuery {
    const { data: account } = useQuery(['my/account'], fetchAccount);

    return {
        account,
    };
}
