import type { Account } from '../AccountService';

export async function fetchAccount(): Promise<Account> {
    const response = await fetch('http://localhost:9000/my/account', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw await response.json();
    }

    return response.json();
}
