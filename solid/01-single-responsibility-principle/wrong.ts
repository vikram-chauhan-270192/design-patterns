class UserRegistrationService {
    async register(input: { email: string; password: string }) {
        // validation
        if (!input.email.includes("@")) throw new Error("Invalid email");

        // hashing
        const hashed = await Bun.password.hash(input.password);

        // persistence
        const user = await db.user.create({
            data: { email: input.email, passwordHash: hashed },
        });

        // side effects
        await emailClient.send({
            to: user.email,
            subject: "Welcome!",
            body: "Thanks for signing up",
        });

        // logging
        console.log("User registered", user.id);

        return user;
    }
}
