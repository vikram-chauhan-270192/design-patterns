interface UploadState {
    name: string;
    start(ctx: UploadContext): Promise<void>;
    pause(ctx: UploadContext): void;
}

class UploadContext {
    constructor(public state: UploadState) {}

    setState(state: UploadState) {
        console.log(`STATE: ${this.state.name} -> ${state.name}`);
        this.state = state;
    }

    start() {
        return this.state.start(this);
    }

    pause() {
        return this.state.pause(this);
    }
}

class IdleState implements UploadState {
    name = "IDLE";

    async start(ctx: UploadContext) {
        ctx.setState(new UploadingState());
        await ctx.start();
    }

    pause() {
        throw new Error("Cannot pause in IDLE");
    }
}

class UploadingState implements UploadState {
    name = "UPLOADING";

    async start(ctx: UploadContext) {
        console.log("Uploading...");
        ctx.setState(new CompletedState());
    }

    pause(ctx: UploadContext) {
        ctx.setState(new PausedState());
    }
}

class PausedState implements UploadState {
    name = "PAUSED";

    async start(ctx: UploadContext) {
        ctx.setState(new UploadingState());
        await ctx.start();
    }

    pause() {
        console.log("Already paused");
    }
}

class CompletedState implements UploadState {
    name = "COMPLETED";

    async start() {
        throw new Error("Already completed");
    }

    pause() {
        throw new Error("Cannot pause completed upload");
    }
}

// Usage
const upload = new UploadContext(new IdleState());
upload.start();
