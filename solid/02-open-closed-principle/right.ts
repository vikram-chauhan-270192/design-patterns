interface PaymentStrategy {
    method: string;
    pay(amount: number): Promise<string>;
}

class UpiPayment implements PaymentStrategy {
    method = "UPI";
    async pay(amount: number) {
        return `Paid ₹${amount} via UPI`;
    }
}

class CardPayment implements PaymentStrategy {
    method = "CARD";
    async pay(amount: number) {
        return `Paid ₹${amount} via CARD`;
    }
}

class PaymentService {
    private strategies = new Map<string, PaymentStrategy>();

    constructor(strategies: PaymentStrategy[]) {
        for (const s of strategies) this.strategies.set(s.method, s);
    }

    async pay(method: string, amount: number) {
        const strategy = this.strategies.get(method);
        if (!strategy) throw new Error("Unsupported payment method");
        return strategy.pay(amount);
    }
}
