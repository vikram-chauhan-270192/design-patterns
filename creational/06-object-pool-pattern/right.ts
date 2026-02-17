class ImageCompressorWorker {
    async compress(bytes: Uint8Array): Promise<Uint8Array> {
        // expensive CPU task (pretend)
        return bytes;
    }
}

export class WorkerPool<T> {
    private available: T[] = [];
    private inUse = new Set<T>();

    constructor(factory: () => T, size: number) {
        for (let i = 0; i < size; i++) this.available.push(factory());
    }

    async acquire(): Promise<T> {
        while (this.available.length === 0) {
            await new Promise((r) => setTimeout(r, 10));
        }
        const worker = this.available.pop()!;
        this.inUse.add(worker);
        return worker;
    }

    release(worker: T) {
        if (!this.inUse.has(worker)) return;
        this.inUse.delete(worker);
        this.available.push(worker);
    }
}

// Usage
const pool = new WorkerPool(() => new ImageCompressorWorker(), 8);

async function compressImage(bytes: Uint8Array) {
    const worker = await pool.acquire();
    try {
        return await worker.compress(bytes);
    } finally {
        pool.release(worker);
    }
}
