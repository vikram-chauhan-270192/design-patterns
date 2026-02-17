https://chatgpt.com/share/6994bd0f-6d58-800e-b316-657c67ddcce2

# Structural Design Patterns (TypeScript)

This project contains compact, real-world-leaning TypeScript examples of the classic **Structural Design Patterns**. Each folder holds a single `right.ts` file that demonstrates the pattern with minimal noise and a focused use case.

The patterns shown here are:
Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy.

## Project Structure

- `01-adapter-pattern/` Example of adapting a third-party API to a local interface
- `02-bridge-pattern/` Example of decoupling abstraction from implementation
- `03-composite-pattern/` Example of tree-like permission composition
- `04-decorator-pattern/` Example of layering cross-cutting concerns on an HTTP client
- `05-fascade-pattern/` Example of a simplified API over multiple subsystems
- `06-flyweight-pattern/` Example of shared immutable style objects to save memory
- `07-proxy-pattern/` Example of caching a slow external call

## File-by-File Explanation

### `01-adapter-pattern/right.ts` — Adapter

**Intent:** Convert one interface into another so existing code can use a different API without changing.

**Key parts:**
- `PaymentProvider` defines the interface the system expects: `pay(amountInPaise)`.
- `StripeSDK` is a stand-in for a third-party SDK with a **different** method signature: `createCharge(amountInRupees)`.
- `StripeAdapter` wraps `StripeSDK` and **converts paise to rupees**, then maps the response to the `PaymentProvider` shape.
- `checkout(provider)` shows how the rest of the system depends only on the local interface.

**Why this is Adapter:** The adapter hides the mismatch between the system’s contract and the external SDK’s contract while keeping both untouched.

### `02-bridge-pattern/right.ts` — Bridge

**Intent:** Separate an abstraction from its implementation so they can vary independently.

**Key parts:**
- `NotificationProvider` is the implementation interface.
- `TwilioProvider` and `FirebasePushProvider` are concrete implementations.
- `Notification` is the abstraction that **depends on** a provider.
- `UserNotification` refines the abstraction and decides how a `userId` becomes a destination.
- Usage shows two different providers plugged into the same abstraction.

**Why this is Bridge:** The notification *abstraction* and the provider *implementation* are decoupled; you can add new providers or new notification types independently.

### `03-composite-pattern/right.ts` — Composite

**Intent:** Treat individual objects and compositions of objects uniformly.

**Key parts:**
- `AccessNode` is the common interface with `can(action)`.
- `Permission` is a **leaf** node that checks a single action.
- `Role` is a **composite** that holds children and delegates checks.
- Usage builds a tree: `Manager` contains `Auditor` and `editAudit`.

**Why this is Composite:** Clients call `can()` on either a leaf or a composite without caring which it is.

### `04-decorator-pattern/right.ts` — Decorator

**Intent:** Add responsibilities to objects dynamically by wrapping them.

**Key parts:**
- `HttpClient` is the core interface.
- `FetchHttpClient` is the base implementation.
- `HttpClientDecorator` provides pass-through behavior for stacking.
- `LoggingClient` adds logging around `get()`.
- `RetryClient` adds retry behavior around `get()`.
- Usage composes decorators: `RetryClient(LoggingClient(FetchHttpClient))`.

**Why this is Decorator:** Each wrapper adds behavior without changing the underlying client.

### `05-fascade-pattern/right.ts` — Facade

**Intent:** Provide a simplified interface to a complex subsystem.

**Key parts:**
- `Uploader`, `OCRService`, `AuditRepository` are subsystem services.
- `AuditFacade` orchestrates upload → OCR → persistence with `submitAudit`.
- Usage shows a single call replacing multiple subsystem interactions.

**Why this is Facade:** Consumers interact with one simple API instead of coordinating multiple components.

### `06-flyweight-pattern/right.ts` — Flyweight

**Intent:** Share common, immutable state between many objects to reduce memory usage.

**Key parts:**
- `MarkerStyle` represents intrinsic style state.
- `MarkerStyleFactory` caches styles by key and reuses them.
- `Marker` holds extrinsic state (lat/lng) plus a shared style.
- Usage creates **50,000 markers** that all share the same style object.

**Why this is Flyweight:** The heavy or repetitive data is stored once and reused across many instances.

### `07-proxy-pattern/right.ts` — Proxy

**Intent:** Provide a placeholder or wrapper that controls access to another object.

**Key parts:**
- `GeoCoder` is the interface.
- `GoogleGeoCoder` is the real, expensive implementation.
- `CachedGeoCoderProxy` caches results and only calls the real service when needed.
- Usage shows repeated calls returning from cache.

**Why this is Proxy:** The proxy manages access (caching) while presenting the same interface as the real object.

## Notes

- Each file is intentionally short to highlight the pattern, not production readiness.
- You can extend these examples with error handling, typing details, or real SDKs as needed.
