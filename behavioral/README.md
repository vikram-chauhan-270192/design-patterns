https://chatgpt.com/share/6994bd98-8298-800e-a6c9-ab9f5c3b6993

# Behavioral Design Patterns in TypeScript

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
