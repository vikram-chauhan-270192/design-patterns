https://chatgpt.com/share/6994ba4f-e62c-800e-9d4a-22f3542aace7

# SOLID Principles in TypeScript (Examples)

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
