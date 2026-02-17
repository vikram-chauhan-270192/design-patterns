type RegisterInput = { email: string; password: string };

interface IUserValidator {
    validate(input: RegisterInput): void;
}

interface IPasswordHasher {
    hash(password: string): Promise<string>;
}

interface IUserRepository {
    create(data: { email: string; passwordHash: string }): Promise<{ id: string; email: string }>;
}

interface INotifier {
    sendWelcome(email: string): Promise<void>;
}

interface IAuditLogger {
    log(event: string, payload: Record<string, unknown>): void;
}

class UserRegistrationService {
    constructor(
        private validator: IUserValidator,
        private hasher: IPasswordHasher,
        private repo: IUserRepository,
        private notifier: INotifier,
        private audit: IAuditLogger
    ) {}

    async register(input: RegisterInput) {
        this.validator.validate(input);

        const passwordHash = await this.hasher.hash(input.password);

        const user = await this.repo.create({
            email: input.email,
            passwordHash,
        });

        await this.notifier.sendWelcome(user.email);

        this.audit.log("USER_REGISTERED", { userId: user.id });

        return user;
    }
}

