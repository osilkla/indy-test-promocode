const getTomorrowDateUsFormatted = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowFormatted = tomorrow.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return tomorrowFormatted
}

export default getTomorrowDateUsFormatted;