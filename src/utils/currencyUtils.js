const formatCurrency1 = (value) => {
    if (!value) return '';
    return (
        "Rs. " +
        parseFloat(value)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
}

const formatCurrency2 = (value) => {
    if (!value) return '';
    return (
        parseFloat(value)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
}

export {formatCurrency1, formatCurrency2}