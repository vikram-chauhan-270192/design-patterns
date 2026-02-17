interface MediaService {
    upload(file: Buffer): Promise<string>;
    generateThumbnail(fileId: string): Promise<string>;
    scanForVirus(fileId: string): Promise<void>;
    transcodeVideo(fileId: string): Promise<void>;
    detectPlateNumber(fileId: string): Promise<string>;
}
