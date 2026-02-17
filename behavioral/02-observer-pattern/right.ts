type EventMap = {
    "vehicle.location.updated": { vehicleId: string; lat: number; lng: number };
    "vehicle.offline": { vehicleId: string };
};

type Handler<T> = (payload: T) => void;

class EventBus<E extends Record<string, any>> {
    private listeners = new Map<keyof E, Set<Handler<any>>>();

    on<K extends keyof E>(event: K, handler: Handler<E[K]>) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
        return () => this.off(event, handler);
    }

    off<K extends keyof E>(event: K, handler: Handler<E[K]>) {
        this.listeners.get(event)?.delete(handler);
    }

    emit<K extends keyof E>(event: K, payload: E[K]) {
        this.listeners.get(event)?.forEach((handler) => handler(payload));
    }
}

// Usage
const bus = new EventBus<EventMap>();

bus.on("vehicle.location.updated", (data) => {
    console.log("Update UI map:", data);
});

bus.on("vehicle.location.updated", (data) => {
    console.log("Send analytics:", data);
});

bus.emit("vehicle.location.updated", {
    vehicleId: "V-101",
    lat: 19.076,
    lng: 72.8777,
});
