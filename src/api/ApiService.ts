export type ApiErrors = {
    scope: string;
    message: string;
}[];

export type Request = (url: string, options: RequestInit) => Promise<Response>;

export async function getValidApiResponse<T>(response: Pick<Response, 'ok' | 'json'>): Promise<T> {
    if (response.ok) {
        return response.json();
    }

    throw await response.json();
}
