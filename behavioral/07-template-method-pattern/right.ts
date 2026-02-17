abstract class OCRPipeline {
    async run(image: Blob) {
        const cleaned = await this.preprocess(image);
        const text = await this.detectText(cleaned);
        return this.postProcess(text);
    }

    protected abstract preprocess(image: Blob): Promise<Blob>;
    protected abstract detectText(image: Blob): Promise<string>;

    protected postProcess(text: string) {
        return text.trim();
    }
}

class PlateOCRPipeline extends OCRPipeline {
    protected async preprocess(image: Blob) {
        return image; // crop, contrast, etc
    }

    protected async detectText(image: Blob) {
        return "MH12AB1234";
    }

    protected postProcess(text: string) {
        return text.replace(/\s+/g, "").toUpperCase();
    }
}
