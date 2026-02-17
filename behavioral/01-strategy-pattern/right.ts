type Money = number;

interface PricingStrategy {
    calculate(basePrice: Money, userType: string): Money;
}

class RegularPricing implements PricingStrategy {
    calculate(basePrice: Money) {
        return basePrice;
    }
}

class PremiumPricing implements PricingStrategy {
    calculate(basePrice: Money) {
        return basePrice * 0.9; // 10% discount
    }
}

class FestivalPricing implements PricingStrategy {
    calculate(basePrice: Money) {
        return basePrice * 0.75; // 25% off
    }
}

class PricingEngine {
    constructor(private strategy: PricingStrategy) {}

    setStrategy(strategy: PricingStrategy) {
        this.strategy = strategy;
    }

    getFinalPrice(basePrice: Money, userType: string) {
        return this.strategy.calculate(basePrice, userType);
    }
}

// Usage
const engine = new PricingEngine(new RegularPricing());

console.log(engine.getFinalPrice(1000, "REGULAR")); // 1000

engine.setStrategy(new PremiumPricing());
console.log(engine.getFinalPrice(1000, "PREMIUM")); // 900

engine.setStrategy(new FestivalPricing());
console.log(engine.getFinalPrice(1000, "ANY")); // 750
