type PaymentMethod = "UPI" | "CARD" | "NETBANKING";

class PaymentService {
    pay(method: PaymentMethod, amount: number) {
        if (method === "UPI") {
            return this.payViaUpi(amount);
        }

        if (method === "CARD") {
            return this.payViaCard(amount);
        }

        if (method === "NETBANKING") {
            return this.payViaNetbanking(amount);
        }

        throw new Error("Unsupported payment method");
    }
}
