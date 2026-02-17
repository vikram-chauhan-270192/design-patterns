type UploadMeta = {
    campaignId: string;
    locationLat: number;
    locationLng: number;
    capturedAt: string;
    deviceId: string;
};

class AuditUploadRequest {
    constructor(
        public readonly bytes: Uint8Array,
        public readonly filename: string,
        public readonly meta: UploadMeta,
        public readonly retryCount: number,
        public readonly compress: boolean
    ) {}
}

export class AuditUploadBuilder {
    private bytes?: Uint8Array;
    private filename?: string;
    private meta?: UploadMeta;
    private retryCount = 2;
    private compress = true;

    withImage(bytes: Uint8Array, filename: string) {
        this.bytes = bytes;
        this.filename = filename;
        return this;
    }

    withMeta(meta: UploadMeta) {
        this.meta = meta;
        return this;
    }

    withRetryCount(retryCount: number) {
        this.retryCount = retryCount;
        return this;
    }

    disableCompression() {
        this.compress = false;
        return this;
    }

    build(): AuditUploadRequest {
        if (!this.bytes || !this.filename) {
            throw new Error("Image is required");
        }
        if (!this.meta) {
            throw new Error("Metadata is required");
        }

        return new AuditUploadRequest(
            this.bytes,
            this.filename,
            this.meta,
            this.retryCount,
            this.compress
        );
    }
}

// Usage
const req = new AuditUploadBuilder()
    .withImage(new Uint8Array([1, 2]), "billboard.jpg")
    .withMeta({
        campaignId: "cmp_123",
        locationLat: 28.6139,
        locationLng: 77.209,
        capturedAt: new Date().toISOString(),
        deviceId: "ios_iphone_15",
    })
    .withRetryCount(5)
    .build();
