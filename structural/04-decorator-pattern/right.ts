interface HttpClient {
    get<T>(url: string): Promise<T>;
}

class FetchHttpClient implements HttpClient {
    async get<T>(url: string): Promise<T> {
        const res = await fetch(url);
        return res.json();
    }
}

// Decorator base
abstract class HttpClientDecorator implements HttpClient {
    constructor(protected client: HttpClient) {}
    get<T>(url: string): Promise<T> {
        return this.client.get(url);
    }
}

class LoggingClient extends HttpClientDecorator {
    async get<T>(url: string): Promise<T> {
        console.log("[HTTP GET]", url);
        const res = await super.get<T>(url);
        console.log("[HTTP DONE]", url);
        return res;
    }
}

class RetryClient extends HttpClientDecorator {
    constructor(client: HttpClient, private retries = 3) {
        super(client);
    }

    async get<T>(url: string): Promise<T> {
        let lastErr: unknown;

        for (let i = 0; i < this.retries; i++) {
            try {
                return await super.get<T>(url);
            } catch (err) {
                lastErr = err;
            }
        }

        throw lastErr;
    }
}

// Usage
const client = new RetryClient(new LoggingClient(new FetchHttpClient()), 2);

client.get("https://api.example.com/audits");
