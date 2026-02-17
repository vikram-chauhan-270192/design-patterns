type MarkerStyle = {
    iconUrl: string;
    size: number;
};

class MarkerStyleFactory {
    private cache = new Map<string, MarkerStyle>();

    get(iconUrl: string, size: number) {
        const key = `${iconUrl}|${size}`;

        if (!this.cache.has(key)) {
            this.cache.set(key, { iconUrl, size });
        }

        return this.cache.get(key)!;
    }
}

class Marker {
    constructor(
        public lat: number,
        public lng: number,
        public style: MarkerStyle
    ) {}
}

// Usage
const factory = new MarkerStyleFactory();
const markers: Marker[] = [];

for (let i = 0; i < 50000; i++) {
    const style = factory.get("/icons/billboard.svg", 32);
    markers.push(new Marker(28.6 + i * 0.00001, 77.2, style));
}

console.log("Markers:", markers.length);
