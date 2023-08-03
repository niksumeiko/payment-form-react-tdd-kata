export type Request = (url: string, options: RequestInit) => Promise<Response>;

export async function getValidApiResponse<T>(response: Pick<Response, 'ok' | 'json'>): Promise<T> {
    if (!response.ok) {
        throw await response.json();
    }

    return response.json();
}
