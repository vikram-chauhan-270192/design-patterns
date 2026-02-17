interface Storage {
    put(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
}

class S3Storage implements Storage {
    async put(key: string, value: string) {}
    async get(key: string) { return value ?? null; }
    async delete(key: string) {}
}

class ReadOnlyStorage implements Storage {
    async put() {
        throw new Error("Read-only storage");
    }
    async get() { return "some data"; }
    async delete() {
        throw new Error("Read-only storage");
    }
}
