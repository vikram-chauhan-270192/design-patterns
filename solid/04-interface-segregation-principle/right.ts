interface Uploader {
    upload(file: Buffer): Promise<string>;
}

interface ThumbnailGenerator {
    generateThumbnail(fileId: string): Promise<string>;
}

interface VirusScanner {
    scan(fileId: string): Promise<void>;
}

interface PlateDetector {
    detectPlate(fileId: string): Promise<string>;
}

class PlateRecognitionFlow {
    constructor(
        private uploader: Uploader,
        private detector: PlateDetector
    ) {}

    async run(file: Buffer) {
        const id = await this.uploader.upload(file);
        const plate = await this.detector.detectPlate(id);
        return { id, plate };
    }
}
