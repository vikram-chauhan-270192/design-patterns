interface Command {
    name: string;
    execute(): Promise<void>;
}

class UploadImageCommand implements Command {
    name = "UploadImageCommand";

    constructor(private file: File, private uploader: (f: File) => Promise<void>) {}

    async execute() {
        await this.uploader(this.file);
    }
}

class CommandRunner {
    async run(command: Command, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`[RUN] ${command.name} attempt=${attempt}`);
                await command.execute();
                console.log(`[DONE] ${command.name}`);
                return;
            } catch (err) {
                console.error(`[FAIL] ${command.name} attempt=${attempt}`, err);
                if (attempt === retries) throw err;
            }
        }
    }
}
