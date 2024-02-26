type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverselookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverselookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();
        } else {
            this.detach(node);
            this.prepend(node);
        }
        // does it exist?
        //
        // if it doesn't we need to insert
        //      - check capacity and evict if over
        // if it does, we need to update to the front of the list
        // and update the value
    }
    get(key: K): V | undefined {
        // check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // update the value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // return out the value found or undefinde if not exist
        return node.value;
    }
    private detach(node: Node<V>) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.prev) {
            node.prev.next = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>) {}

    private trimCache(): void {}
}
