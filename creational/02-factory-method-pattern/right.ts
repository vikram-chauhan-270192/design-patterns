export interface PlateOCRProvider {
    extractPlateNumber(imageBytes: Uint8Array): Promise<string | null>;
}

class GoogleVisionOCR implements PlateOCRProvider {
    async extractPlateNumber(imageBytes: Uint8Array): Promise<string | null> {
        // Call Google Vision API
        return "DL01AB1234";
    }
}

class AwsRekognitionOCR implements PlateOCRProvider {
    async extractPlateNumber(imageBytes: Uint8Array): Promise<string | null> {
        // Call AWS Rekognition
        return "MH12XY9090";
    }
}

type OCRVendor = "google" | "aws";

export class PlateOCRFactory {
    static create(vendor: OCRVendor): PlateOCRProvider {
        switch (vendor) {
            case "google":
                return new GoogleVisionOCR();
            case "aws":
                return new AwsRekognitionOCR();
            default:
                throw new Error(`Unsupported OCR vendor: ${vendor}`);
        }
    }
}

// Usage
const ocr = PlateOCRFactory.create("google");
const plate = await ocr.extractPlateNumber(new Uint8Array([1, 2, 3]));
