type CampaignPlan = {
    name: string;
    budget: number;
    cities: string[];
    rules: {
        minTraffic: number;
        maxDistanceKm: number;
    };
};

export class CampaignPrototype {
    constructor(private readonly base: CampaignPlan) {}

    clone(overrides: Partial<CampaignPlan>): CampaignPlan {
        // deep clone for safety
        const copy: CampaignPlan = structuredClone(this.base);

        return {
            ...copy,
            ...overrides,
            rules: {
                ...copy.rules,
                ...(overrides.rules ?? {}),
            },
        };
    }
}

// Usage
const basePlan: CampaignPlan = {
    name: "Base OOH Plan",
    budget: 1000000,
    cities: ["Delhi", "Mumbai"],
    rules: {
        minTraffic: 10000,
        maxDistanceKm: 5,
    },
};

const prototype = new CampaignPrototype(basePlan);

const planForBangalore = prototype.clone({
    name: "Bangalore Plan",
    cities: ["Bangalore"],
    rules: { maxDistanceKm: 3 },
});
