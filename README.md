<h1 style="color:darkred;">🔥 SOLID Principles & Design Patterns in TypeScript</h1>

https://chatgpt.com/share/6994ba4f-e62c-800e-9d4a-22f3542aace7

# 01. SOLID Principles in TypeScript (Examples)

This repository contains small TypeScript snippets that demonstrate each of the SOLID principles. Every principle has two files:
- `wrong.ts` shows a design that violates the principle.
- `right.ts` shows a refactoring or alternative design that follows the principle.

These are illustrative examples. External references like `db`, `emailClient`, `twilioClient`, or `Bun` are placeholders to keep the focus on design, not on concrete implementations.

## Project Structure
- `01-single-responsibility-principle/` — Single Responsibility Principle (SRP)
- `02-open-closed-principle/` — Open/Closed Principle (OCP)
- `03-liskov-substitution-principle/` — Liskov Substitution Principle (LSP)
- `04-interface-segregation-principle/` — Interface Segregation Principle (ISP)
- `05-dependency-inversion-principle/` — Dependency Inversion Principle (DIP)

---

## 01. Single Responsibility Principle (SRP)
**Principle:** A class should have one reason to change. Keep each unit focused on a single responsibility.

### File: `01-single-responsibility-principle/wrong.ts`
**What it contains:**
- `UserRegistrationService.register` performs validation, password hashing, persistence, email notification, and logging in a single method.

**Why it violates SRP:**
- The class changes for multiple reasons: validation rules, hashing policy, database schema, email content, and logging strategy.
- It is harder to test because external concerns are coupled together.

### File: `01-single-responsibility-principle/right.ts`
**What it contains:**
- Small, focused interfaces: `IUserValidator`, `IPasswordHasher`, `IUserRepository`, `INotifier`, `IAuditLogger`.
- `UserRegistrationService` orchestrates collaborators instead of doing their work directly.

**How it applies SRP:**
- Each concern is isolated behind its own abstraction.
- Changes to validation, hashing, or notification can happen without modifying the registration orchestration.

---

## 02. Open/Closed Principle (OCP)
**Principle:** Software entities should be open for extension but closed for modification.

### File: `02-open-closed-principle/wrong.ts`
**What it contains:**
- `PaymentService.pay` uses `if` checks for each payment method and throws on unsupported methods.

**Why it violates OCP:**
- Adding a new payment method requires editing `PaymentService`.
- The class grows with every new method.

### File: `02-open-closed-principle/right.ts`
**What it contains:**
- A `PaymentStrategy` interface and concrete strategies (`UpiPayment`, `CardPayment`).
- `PaymentService` loads strategies into a `Map` and delegates to the selected strategy.

**How it applies OCP:**
- New payment types are added by creating new strategy classes.
- `PaymentService` remains unchanged as new strategies are introduced.

---

## 03. Liskov Substitution Principle (LSP)
**Principle:** Objects of a superclass should be replaceable with objects of a subclass without breaking the program.

### File: `03-liskov-substitution-principle/wrong.ts`
**What it contains:**
- A `Storage` interface that requires `put`, `get`, and `delete`.
- `ReadOnlyStorage` implements `Storage` but throws errors for `put` and `delete`.

**Why it violates LSP:**
- Code that expects a `Storage` cannot safely substitute `ReadOnlyStorage`.
- The subtype narrows behavior in a way that breaks client assumptions.

### File: `03-liskov-substitution-principle/right.ts`
**What it contains:**
- Segmented interfaces: `ReadableStorage`, `WritableStorage`, `DeletableStorage`.
- `ReadOnlyStorage` implements only `ReadableStorage`.

**How it applies LSP:**
- A read-only implementation no longer pretends to support write/delete.
- Clients depend on the capabilities they actually need.

---

## 04. Interface Segregation Principle (ISP)
**Principle:** Clients should not be forced to depend on methods they do not use.

### File: `04-interface-segregation-principle/wrong.ts`
**What it contains:**
- A large `MediaService` interface with unrelated operations: upload, thumbnails, virus scan, video transcode, and plate detection.

**Why it violates ISP:**
- Implementers must define methods they might not support.
- Clients are coupled to capabilities they do not need.

### File: `04-interface-segregation-principle/right.ts`
**What it contains:**
- Narrow interfaces: `Uploader`, `ThumbnailGenerator`, `VirusScanner`, `PlateDetector`.
- `PlateRecognitionFlow` only depends on `Uploader` and `PlateDetector`.

**How it applies ISP:**
- Each client depends only on the minimal set of methods required.
- Implementations can be small and focused.

---

## 05. Dependency Inversion Principle (DIP)
**Principle:** High-level modules should not depend on low-level modules; both should depend on abstractions.

### File: `05-dependency-inversion-principle/wrong.ts`
**What it contains:**
- `SmsService` directly calls a Twilio SDK via `twilioClient`.

**Why it violates DIP:**
- A high-level service depends directly on a concrete vendor.
- Testing or swapping providers requires modifying the service.

### File: `05-dependency-inversion-principle/right.ts`
**What it contains:**
- `SmsProvider` abstraction and `TwilioSmsProvider` implementation.
- `OtpService` depends on the `SmsProvider` interface.

**How it applies DIP:**
- The high-level service (`OtpService`) depends on an abstraction.
- Providers can be swapped without changing the OTP logic.

---

## Summary
- Each folder contains a focused example of a SOLID principle.
- The `wrong.ts` files show common ways the principle is broken.
- The `right.ts` files show a small, practical refactor toward a better design.

If you want, I can expand this README with runnable examples, diagrams, or tests for each principle.


--------------------------------------------------------------------------------------------------------

https://chatgpt.com/share/6994ba57-02c8-800e-8874-c534792451e4

# 02. Creational Design Patterns (TypeScript Examples)

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


--------------------------------------------------------------------------------------------------------

https://chatgpt.com/share/6994bd0f-6d58-800e-b316-657c67ddcce2

# 03. Structural Design Patterns (TypeScript)

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


--------------------------------------------------------------------------------------------------------

https://chatgpt.com/share/6994bd98-8298-800e-a6c9-ab9f5c3b6993

# 04. Behavioral Design Patterns in TypeScript

## Overview
This repository contains small, focused TypeScript examples for classic behavioral design patterns. Each pattern lives in its own folder and is implemented in a single file named `right.ts`. The examples are intentionally minimal and include a small usage snippet to show how the pattern is applied.

## Repository Layout
- `01-strategy-pattern/right.ts` — Strategy pattern
- `02-observer-pattern/right.ts` — Observer pattern
- `03-command-pattern/right.ts` — Command pattern
- `04-chain-of-responsibility-pattern/right.ts` — Chain of Responsibility pattern
- `05-state-pattern/right.ts` — State pattern
- `06-iterator-pattern/right.ts` — Iterator pattern
- `07-template-method-pattern/right.ts` — Template Method pattern
- `08-mediator-pattern/right.ts` — Mediator pattern
- `08-memento-pattern/right.ts` — Memento pattern
- `09-visotor-pattern/right.ts` — Visitor pattern (folder name contains a typo)

## Pattern Details

### 01 Strategy Pattern
**File:** `01-strategy-pattern/right.ts`

**Intent:** Encapsulate interchangeable algorithms and make them swappable at runtime without changing the client.

**What this file contains:**
- `PricingStrategy` interface defining a `calculate` method.
- Concrete strategies: `RegularPricing`, `PremiumPricing`, `FestivalPricing`.
- `PricingEngine` context that holds a strategy and delegates pricing to it.
- A usage demo that switches strategies and prints final prices.

**How the pattern maps to the code:**
- Strategy interface: `PricingStrategy`.
- Concrete strategies: the three pricing classes.
- Context: `PricingEngine`.

**Behavior walkthrough:**
- The engine starts with `RegularPricing` and returns the base price.
- The strategy is swapped to `PremiumPricing` and `FestivalPricing` at runtime.
- Each strategy changes the result without modifying the `PricingEngine`.

### 02 Observer Pattern
**File:** `02-observer-pattern/right.ts`

**Intent:** Define a one-to-many dependency so that when one object changes state, all dependents are notified.

**What this file contains:**
- `EventMap` type describing allowed events and payloads.
- `EventBus` class that stores handlers per event and emits payloads to subscribers.
- A usage demo that registers two listeners and emits a location update.

**How the pattern maps to the code:**
- Subject/Publisher: `EventBus`.
- Observers: handler functions registered via `on`.
- Notifications: `emit` triggers all handlers for an event.

**Behavior walkthrough:**
- Two handlers subscribe to `vehicle.location.updated`.
- `emit` sends the payload to both handlers, each acting independently.

### 03 Command Pattern
**File:** `03-command-pattern/right.ts`

**Intent:** Encapsulate a request as an object, enabling parameterization, queuing, retries, and logging.

**What this file contains:**
- `Command` interface with `name` and `execute`.
- `UploadImageCommand` implementing `Command` to upload a file.
- `CommandRunner` that runs commands with retry logic.

**How the pattern maps to the code:**
- Command interface: `Command`.
- Concrete command: `UploadImageCommand`.
- Invoker: `CommandRunner`.

**Behavior walkthrough:**
- `CommandRunner.run` executes a command and retries on failure.
- The command encapsulates both the file and the upload function.

### 04 Chain of Responsibility Pattern
**File:** `04-chain-of-responsibility-pattern/right.ts`

**Intent:** Pass a request along a chain of handlers where each handler decides to process or forward it.

**What this file contains:**
- `Pipeline` class that holds middleware functions.
- Middleware functions that validate auth and request body.
- A final handler that processes the request.

**How the pattern maps to the code:**
- Handler interface: `Middleware` signature.
- Chain: the `Pipeline` list of middlewares.
- Request propagation: `next()` calls the next handler.

**Behavior walkthrough:**
- The request enters the pipeline.
- Auth middleware sets `userId` and calls `next()`.
- Validation middleware checks `body.data` and calls `next()`.
- Final middleware logs processing information.

### 05 State Pattern
**File:** `05-state-pattern/right.ts`

**Intent:** Allow an object to alter its behavior when its internal state changes.

**What this file contains:**
- `UploadState` interface with `start` and `pause` behavior.
- Concrete states: `IdleState`, `UploadingState`, `PausedState`, `CompletedState`.
- `UploadContext` that holds the current state and delegates calls.

**How the pattern maps to the code:**
- State interface: `UploadState`.
- Concrete states: the four state classes.
- Context: `UploadContext`.

**Behavior walkthrough:**
- Starting in `IDLE`, `start()` transitions to `UPLOADING`.
- `UPLOADING` can transition to `PAUSED` via `pause()`.
- `UPLOADING` transitions to `COMPLETED` after finishing.
- Illegal transitions throw errors (e.g., pausing when completed).

### 06 Iterator Pattern
**File:** `06-iterator-pattern/right.ts`

**Intent:** Provide a way to access elements of a collection sequentially without exposing its underlying representation.

**What this file contains:**
- `fetchPage` function that returns paginated results.
- `paginate` async generator that yields items one-by-one across pages.
- A usage demo that iterates with `for await`.

**How the pattern maps to the code:**
- Iterator: async generator `paginate`.
- Aggregate: the implicit paginated API exposed by `fetchPage`.
- Client: the `for await` loop consuming items.

**Behavior walkthrough:**
- The generator fetches a page, yields its items, and moves to `nextCursor`.
- The loop consumes items without caring about pagination details.

### 07 Template Method Pattern
**File:** `07-template-method-pattern/right.ts`

**Intent:** Define the skeleton of an algorithm in a base class, deferring some steps to subclasses.

**What this file contains:**
- `OCRPipeline` abstract class with `run()` as the template method.
- Abstract steps: `preprocess`, `detectText`.
- Concrete subclass `PlateOCRPipeline` overriding steps and post-processing.

**How the pattern maps to the code:**
- Template method: `OCRPipeline.run`.
- Hook/steps: `preprocess`, `detectText`, and optional `postProcess`.
- Concrete implementation: `PlateOCRPipeline`.

**Behavior walkthrough:**
- `run` calls preprocess, detectText, and postProcess in order.
- Subclass customizes preprocessing and output formatting.

### 08 Mediator Pattern
**File:** `08-mediator-pattern/right.ts`

**Intent:** Centralize communication between components to reduce direct dependencies.

**What this file contains:**
- `UIEvent` union type for events.
- `ScreenMediator` that reacts to events and updates internal state.

**How the pattern maps to the code:**
- Mediator: `ScreenMediator`.
- Colleagues: implied UI components that would emit `UIEvent` messages.
- Communication: `notify` processes events and coordinates actions.

**Behavior walkthrough:**
- `IMAGE_UPLOADED` stores the URL and triggers OCR.
- `OCR_DONE` stores text and updates the UI input field.

### 08 Memento Pattern
**File:** `08-memento-pattern/right.ts`

**Intent:** Capture and restore an object’s internal state without exposing its details.

**What this file contains:**
- `AuditFormState` type describing the form state.
- `FormMemento` holding a snapshot of state.
- `AuditForm` that can save to and restore from a `FormMemento`.

**How the pattern maps to the code:**
- Originator: `AuditForm`.
- Memento: `FormMemento`.
- Caretaker: any client that stores and passes mementos around.

**Behavior walkthrough:**
- `save()` deep-clones state and returns a memento.
- `restore()` replaces current state with the snapshot.
- `getState()` exposes current state for read-only usage.

### 09 Visitor Pattern
**File:** `09-visotor-pattern/right.ts`

**Intent:** Add operations to object structures without modifying the classes of the elements on which it operates.

**What this file contains:**
- `CampaignNode` interface with `accept`.
- Concrete nodes: `Billboard`, `TransitAd`.
- Visitor interface: `CampaignVisitor`.
- Concrete visitor: `JsonExportVisitor` that builds an output array.
- Usage demo that accepts a visitor for each node and prints output.

**How the pattern maps to the code:**
- Element interface: `CampaignNode`.
- Concrete elements: `Billboard`, `TransitAd`.
- Visitor interface: `CampaignVisitor`.
- Concrete visitor: `JsonExportVisitor`.

**Behavior walkthrough:**
- Each node calls the appropriate visitor method via `accept`.
- The visitor collects data without changing the node classes.

## Notes
- Each example is intentionally small and focused on the core pattern mechanics.
- You can execute each file with your preferred TypeScript runner or by compiling with `tsc`.
