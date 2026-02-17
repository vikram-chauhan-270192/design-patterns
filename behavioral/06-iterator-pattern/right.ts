type Page<T> = { items: T[]; nextCursor?: string };

async function fetchPage(cursor?: string): Promise<Page<string>> {
    // pretend API call
    return cursor
        ? { items: ["C", "D"], nextCursor: undefined }
        : { items: ["A", "B"], nextCursor: "2" };
}

async function* paginate() {
    let cursor: string | undefined;

    while (true) {
        const page = await fetchPage(cursor);
        for (const item of page.items) yield item;
        if (!page.nextCursor) break;
        cursor = page.nextCursor;
    }
}

// Usage
(async () => {
    for await (const item of paginate()) {
        console.log("Got item:", item);
    }
})();
