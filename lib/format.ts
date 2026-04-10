export function formatPkr(value: number) {
    return new Intl.NumberFormat('en-PK', {
        maximumFractionDigits: 0,
    }).format(value);
}
