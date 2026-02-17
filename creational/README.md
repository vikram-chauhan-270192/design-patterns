https://chatgpt.com/share/6994ba57-02c8-800e-8874-c534792451e4

# Creational Design Patterns (TypeScript Examples)

This repository contains focused TypeScript examples for common creational design patterns. Each folder is a self‑contained example with a single `right.ts` file that demonstrates the pattern in a realistic, production‑style scenario.

**Project Structure**
- `01-singleton-pattern/right.ts` — Singleton example for application configuration.
- `02-factory-method-pattern/right.ts` — Factory Method example for selecting an OCR provider.
- `03-abstract-factory-pattern/right.ts` — Abstract Factory example for cloud services (storage + queue).
- `04-builder-pattern/right.ts` — Builder example for assembling an upload request.
- `05-prototype-pattern/right.ts` — Prototype example for cloning and overriding a campaign plan.
- `06-object-pool-pattern/right.ts` — Object Pool example for reusing expensive workers.

**Patterns At A Glance**

| Pattern | Core Idea | Example Use Case |
| --- | --- | --- |
| Singleton | One shared instance | App configuration across the app |
| Factory Method | Choose a concrete implementation | OCR vendor selection |
| Abstract Factory | Create related objects together | Cloud storage + queue pair |
| Builder | Step‑by‑step construction | Upload request with optional flags |
| Prototype | Clone and tweak a base object | Campaign plan variants |
| Object Pool | Reuse expensive objects | Image compression workers |

## 01) Singleton Pattern
**File:** `01-singleton-pattern/right.ts`

**Intent**
Provide a single, shared configuration instance that is lazily created and reused across the application.

**Key Types**
- `Env` — Restricts the environment to `"dev" | "staging" | "prod"`.
- `AppConfig` — Shape of the configuration object.
- `ConfigManager` — The Singleton class that creates and exposes configuration.

**How It Works**
The constructor is private, so only `ConfigManager` can create an instance. A static `instance` is initialized on first call to `getInstance()`, which returns the same object on subsequent calls. Configuration is computed once, based on `process.env.NODE_ENV`, and cached.

**Implementation Highlights**
- Lazy initialization in `getInstance()` ensures creation only when needed.
- `get()` exposes the config without allowing external mutation of the class internals.
- Environment‑based defaults (prod vs staging vs dev) show real‑world configuration branching.

**Tradeoffs**
Singletons are simple but can make testing harder due to hidden global state. Consider dependency injection or a factory for more testability in large apps.

## 02) Factory Method Pattern
**File:** `02-factory-method-pattern/right.ts`

**Intent**
Encapsulate the logic that decides which concrete implementation to create, without the caller needing to know the details.

**Key Types**
- `PlateOCRProvider` — Interface for OCR providers.
- `GoogleVisionOCR`, `AwsRekognitionOCR` — Concrete implementations.
- `PlateOCRFactory` — The factory that creates providers based on `OCRVendor`.

**How It Works**
`PlateOCRFactory.create(vendor)` chooses which class to instantiate using a `switch` on `OCRVendor`. The caller interacts only with the `PlateOCRProvider` interface, enabling easy swapping or extension of OCR providers.

**Implementation Highlights**
- Clean separation between interface and concrete classes.
- Adding a new provider requires only a new class and a new `case`.
- `create()` centralizes creation logic and validation.

**Tradeoffs**
The factory can grow as vendors grow. If many providers exist, consider registration‑based factories or dependency injection.

## 03) Abstract Factory Pattern
**File:** `03-abstract-factory-pattern/right.ts`

**Intent**
Create families of related services that must work together, without exposing the concrete classes to the caller.

**Key Types**
- `StorageService`, `QueueService` — Interfaces for cloud primitives.
- `CloudServicesFactory` — Abstract factory interface to create these primitives.
- `AwsCloudFactory`, `GcpCloudFactory` — Concrete factories for AWS and GCP.
- `S3Storage`, `SqsQueue`, `GcsStorage`, `PubSubQueue` — Concrete implementations.

**How It Works**
`buildCloudFactory()` selects AWS or GCP based on `process.env.CLOUD_VENDOR`. The returned factory creates matching storage and queue services for that vendor. Callers use only the abstract interfaces.

**Implementation Highlights**
- Enforces compatibility between created services (storage + queue are from the same vendor).
- Simple factory selection encapsulates environment logic.
- Clear separation between abstract interfaces and concrete classes.

**Tradeoffs**
Adding new service types (e.g., cache, DB) requires updating the factory interface and all concrete factories.

## 04) Builder Pattern
**File:** `04-builder-pattern/right.ts`

**Intent**
Construct complex objects step by step, supporting sensible defaults and validation before creation.

**Key Types**
- `UploadMeta` — Metadata required for an upload.
- `AuditUploadRequest` — The immutable request object.
- `AuditUploadBuilder` — Builder that collects inputs and creates the request.

**How It Works**
The builder offers fluent methods like `withImage`, `withMeta`, `withRetryCount`, and `disableCompression`. It holds defaults (`retryCount = 2`, `compress = true`) and validates required fields in `build()`.

**Implementation Highlights**
- Fluent chaining keeps call sites readable.
- `build()` enforces required fields and makes invalid states unrepresentable.
- `AuditUploadRequest` is immutable via `readonly` properties.

**Tradeoffs**
Builders add extra classes and ceremony, but they are worth it when object creation is complex or has many optional parameters.

## 05) Prototype Pattern
**File:** `05-prototype-pattern/right.ts`

**Intent**
Create new objects by cloning a base prototype and applying overrides.

**Key Types**
- `CampaignPlan` — The shape of a campaign.
- `CampaignPrototype` — Holds the base plan and performs cloning.

**How It Works**
`clone(overrides)` deep‑clones the base plan using `structuredClone`, then merges the overrides. Nested `rules` are merged explicitly to preserve defaults while allowing partial overrides.

**Implementation Highlights**
- Deep clone prevents accidental mutation of the base plan.
- Merging logic supports partial overrides for nested properties.

**Tradeoffs**
The complexity of merge logic grows with deeper object graphs. For complex structures, consider a dedicated merge utility or immutable data patterns.

## 06) Object Pool Pattern
**File:** `06-object-pool-pattern/right.ts`

**Intent**
Reuse expensive objects instead of repeatedly creating and destroying them.

**Key Types**
- `ImageCompressorWorker` — Represents an expensive worker.
- `WorkerPool<T>` — Generic pool that manages reusable objects.

**How It Works**
The pool pre‑allocates a fixed number of workers. `acquire()` waits until one is available, marks it in use, and returns it. `release()` returns a worker to the pool. The sample usage wraps work in a `try/finally` to guarantee release.

**Implementation Highlights**
- Generic pool supports any worker type.
- Simple back‑pressure mechanism via polling in `acquire()`.
- `try/finally` makes resource release reliable.

**Tradeoffs**
The current polling loop is simple but not the most efficient. For high‑throughput systems, consider a queue with promises or a semaphore to avoid busy waiting.

---

If you want, I can also add a top‑level `index.ts` that imports and runs each example, or expand the README with diagrams and comparison tables.
