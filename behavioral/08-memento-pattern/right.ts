type AuditFormState = {
    location: string;
    boardType: string;
    size: { w: number; h: number };
};

class FormMemento {
    constructor(public readonly snapshot: AuditFormState) {}
}

class AuditForm {
    private state: AuditFormState;

    constructor(initial: AuditFormState) {
        this.state = initial;
    }

    setLocation(location: string) {
        this.state.location = location;
    }

    save() {
        return new FormMemento(structuredClone(this.state));
    }

    restore(memento: FormMemento) {
        this.state = structuredClone(memento.snapshot);
    }

    getState() {
        return this.state;
    }
}
