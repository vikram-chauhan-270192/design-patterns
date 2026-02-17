interface ReadableStorage {
    get(key: string): Promise<string | null>;
}

interface WritableStorage {
    put(key: string, value: string): Promise<void>;
}

interface DeletableStorage {
    delete(key: string): Promise<void>;
}

class ReadOnlyStorage implements ReadableStorage {
    async get(key: string) {
        return "some data";
    }
}
