interface GeoCoder {
    reverse(lat: number, lng: number): Promise<string>;
}

class GoogleGeoCoder implements GeoCoder {
    async reverse(lat: number, lng: number) {
        console.log("Calling Google API...");
        return `Address for ${lat}, ${lng}`;
    }
}

class CachedGeoCoderProxy implements GeoCoder {
    private cache = new Map<string, string>();

    constructor(private real: GeoCoder) {}

    async reverse(lat: number, lng: number) {
        const key = `${lat},${lng}`;

        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        const res = await this.real.reverse(lat, lng);
        this.cache.set(key, res);
        return res;
    }
}

// Usage
const geo = new CachedGeoCoderProxy(new GoogleGeoCoder());

await geo.reverse(28.6139, 77.209);
await geo.reverse(28.6139, 77.209); // cached
