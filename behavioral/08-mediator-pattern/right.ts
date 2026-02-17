type UIEvent =
    | { type: "IMAGE_UPLOADED"; payload: { url: string } }
    | { type: "OCR_DONE"; payload: { text: string } };

class ScreenMediator {
    private state = {
        imageUrl: "",
        ocrText: "",
    };

    notify(event: UIEvent) {
        if (event.type === "IMAGE_UPLOADED") {
            this.state.imageUrl = event.payload.url;
            console.log("Trigger OCR for", this.state.imageUrl);
        }

        if (event.type === "OCR_DONE") {
            this.state.ocrText = event.payload.text;
            console.log("Update UI input field:", this.state.ocrText);
        }
    }
}
