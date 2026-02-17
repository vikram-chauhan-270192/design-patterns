export interface StorageService {
    upload(path: string, bytes: Uint8Array): Promise<string>;
}

export interface QueueService {
    publish(topic: string, payload: unknown): Promise<void>;
}

export interface CloudServicesFactory {
    storage(): StorageService;
    queue(): QueueService;
}

class S3Storage implements StorageService {
    async upload(path: string, bytes: Uint8Array): Promise<string> {
        return `s3://bucket/${path}`;
    }
}

class SqsQueue implements QueueService {
    async publish(topic: string, payload: unknown): Promise<void> {
        console.log("SQS publish", topic, payload);
    }
}

export class AwsCloudFactory implements CloudServicesFactory {
    storage(): StorageService {
        return new S3Storage();
    }
    queue(): QueueService {
        return new SqsQueue();
    }
}

class GcsStorage implements StorageService {
    async upload(path: string, bytes: Uint8Array): Promise<string> {
        return `gs://bucket/${path}`;
    }
}

class PubSubQueue implements QueueService {
    async publish(topic: string, payload: unknown): Promise<void> {
        console.log("PubSub publish", topic, payload);
    }
}

export class GcpCloudFactory implements CloudServicesFactory {
    storage(): StorageService {
        return new GcsStorage();
    }
    queue(): QueueService {
        return new PubSubQueue();
    }
}

function buildCloudFactory(): CloudServicesFactory {
    const vendor = (process.env.CLOUD_VENDOR ?? "aws") as "aws" | "gcp";
    return vendor === "aws" ? new AwsCloudFactory() : new GcpCloudFactory();
}

const cloud = buildCloudFactory();

const url = await cloud.storage().upload("audit/123.jpg", new Uint8Array([1]));
await cloud.queue().publish("audit.uploaded", { url });
