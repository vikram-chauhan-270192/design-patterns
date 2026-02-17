// What your system expects
interface PaymentProvider {
    pay(amountInPaise: number): Promise<{ success: boolean; txnId: string }>;
}

// Stripe SDK (3rd party) - different API
class StripeSDK {
    async createCharge(amountInRupees: number) {
        return { ok: true, id: "stripe_txn_123" };
    }
}

// Adapter
class StripeAdapter implements PaymentProvider {
    constructor(private stripe: StripeSDK) {}

    async pay(amountInPaise: number) {
        const amountInRupees = amountInPaise / 100;
        const res = await this.stripe.createCharge(amountInRupees);

        return {
            success: res.ok,
            txnId: res.id,
        };
    }
}

// Usage
async function checkout(provider: PaymentProvider) {
    return provider.pay(25900);
}

checkout(new StripeAdapter(new StripeSDK()));
