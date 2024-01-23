export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // Structural check
    if (a === null && b === null) {
        return true;
    }
    // Structural check
    if (a === null || b === null) {
        return false;
    }
    // Value check
    if (a?.value !== b?.value) {
        return false;
    }

    return compare(a.left, b.left) && compare(a.right, b.right);
}
