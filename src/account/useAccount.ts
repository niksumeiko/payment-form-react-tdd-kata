import { useQuery } from '@tanstack/react-query';

import type { Account } from './AccountService';
import { fetchAccount } from './AccountApiService';

interface AccountQuery {
    account?: Account;
}

export function useAccount(): AccountQuery {
    const { data: account } = useQuery(['my/account'], fetchAccount);

    return {
        account,
    };
}
