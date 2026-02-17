type RequestContext = {
    userId?: string;
    token?: string;
    ip: string;
    body: any;
};

type Next = () => Promise<void>;
type Middleware = (ctx: RequestContext, next: Next) => Promise<void>;

class Pipeline {
    private middlewares: Middleware[] = [];

    use(m: Middleware) {
        this.middlewares.push(m);
    }

    async run(ctx: RequestContext) {
        let idx = -1;

        const dispatch = async (i: number): Promise<void> => {
            if (i <= idx) throw new Error("next() called multiple times");
            idx = i;

            const fn = this.middlewares[i];
            if (!fn) return;

            await fn(ctx, () => dispatch(i + 1));
        };

        await dispatch(0);
    }
}

// Usage
const pipeline = new Pipeline();

pipeline.use(async (ctx, next) => {
    if (!ctx.token) throw new Error("Unauthorized");
    ctx.userId = "USER-123";
    await next();
});

pipeline.use(async (ctx, next) => {
    if (!ctx.body?.data) throw new Error("Invalid request body");
    await next();
});

pipeline.use(async (ctx) => {
    console.log("Request processed for", ctx.userId);
});

// Run
pipeline.run({ ip: "1.2.3.4", token: "abc", body: { data: 1 } });
