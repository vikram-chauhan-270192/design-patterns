class Uploader {
    async upload(images: File[]) {
        return images.map((_, i) => `https://cdn/img_${i}.jpg`);
    }
}

class OCRService {
    async extractPlateNumber(imageUrl: string) {
        return "DL01AB1234";
    }
}

class AuditRepository {
    async save(data: any) {
        console.log("Saved audit:", data);
    }
}

class AuditFacade {
    constructor(
        private uploader: Uploader,
        private ocr: OCRService,
        private repo: AuditRepository
    ) {}

    async submitAudit(images: File[], meta: any) {
        const urls = await this.uploader.upload(images);
        const plate = await this.ocr.extractPlateNumber(urls[0]);

        await this.repo.save({
            ...meta,
            images: urls,
            vehiclePlate: plate,
        });

        return { ok: true };
    }
}

// Usage
const facade = new AuditFacade(
    new Uploader(),
    new OCRService(),
    new AuditRepository()
);

facade.submitAudit([], { campaignId: 99, userId: 12 });
