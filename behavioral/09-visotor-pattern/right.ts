interface CampaignNode {
    accept(visitor: CampaignVisitor): void;
}

class Billboard implements CampaignNode {
    constructor(public id: string, public location: string) {}
    accept(visitor: CampaignVisitor) {
        visitor.visitBillboard(this);
    }
}

class TransitAd implements CampaignNode {
    constructor(public id: string, public route: string) {}
    accept(visitor: CampaignVisitor) {
        visitor.visitTransitAd(this);
    }
}

interface CampaignVisitor {
    visitBillboard(b: Billboard): void;
    visitTransitAd(t: TransitAd): void;
}

class JsonExportVisitor implements CampaignVisitor {
    public output: any[] = [];

    visitBillboard(b: Billboard) {
        this.output.push({ type: "billboard", id: b.id, location: b.location });
    }

    visitTransitAd(t: TransitAd) {
        this.output.push({ type: "transit", id: t.id, route: t.route });
    }
}

// Usage
const campaign: CampaignNode[] = [
    new Billboard("B1", "Mumbai"),
    new TransitAd("T1", "Route 12"),
];

const visitor = new JsonExportVisitor();
campaign.forEach((node) => node.accept(visitor));

console.log(visitor.output);
