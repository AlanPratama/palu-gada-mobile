export const calculateTimeAgo = (date) => {
    const now = new Date();
    const pastDate = new Date(date);
    const diff = now - pastDate; // selisih dalam milidetik

    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diff / (1000 * 60));

    if (diffInHours > 0) {
        return `${diffInHours} jam lalu`;
    } else {
        return `${diffInMinutes} menit lalu`;
    }
};