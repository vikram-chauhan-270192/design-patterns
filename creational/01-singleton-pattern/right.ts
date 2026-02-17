type Env = "dev" | "staging" | "prod";

interface AppConfig {
    env: Env;
    apiBaseUrl: string;
    enablePlateOCR: boolean;
    maxParallelUploads: number;
}

export class ConfigManager {
    private static instance: ConfigManager | null = null;
    private config: AppConfig;

    private constructor() {
        // Usually comes from env vars, config file, remote config etc.
        const env = (process.env.NODE_ENV as Env) ?? "dev";

        this.config = {
            env,
            apiBaseUrl:
                env === "prod"
                    ? "https://api.company.com"
                    : "https://staging-api.company.com",
            enablePlateOCR: env !== "dev",
            maxParallelUploads: env === "prod" ? 500 : 50,
        };
    }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    get(): AppConfig {
        return this.config;
    }
}

// Usage
const config = ConfigManager.getInstance().get();
console.log(config.maxParallelUploads);
