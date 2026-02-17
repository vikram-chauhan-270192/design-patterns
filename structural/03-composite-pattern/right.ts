interface AccessNode {
    can(action: string): boolean;
}

class Permission implements AccessNode {
    constructor(private action: string) {}

    can(action: string) {
        return this.action === action;
    }
}

class Role implements AccessNode {
    private children: AccessNode[] = [];

    constructor(public name: string) {}

    add(node: AccessNode) {
        this.children.push(node);
    }

    can(action: string) {
        return this.children.some((c) => c.can(action));
    }
}

// Usage
const viewAudit = new Permission("audit:view");
const editAudit = new Permission("audit:edit");

const auditor = new Role("Auditor");
auditor.add(viewAudit);

const manager = new Role("Manager");
manager.add(auditor);
manager.add(editAudit);

console.log(manager.can("audit:view")); // true
console.log(manager.can("audit:edit")); // true
