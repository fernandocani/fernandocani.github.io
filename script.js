function calculateTimeSince(dateString) {
    const pastDate = new Date(dateString);
    const currentDate = new Date();
    const diff = currentDate - pastDate;

    const years = Math.floor(diff / (365.25 * 86400000));
    const months = Math.floor((diff % (365.25 * 86400000)) / (30.44 * 86400000));
    const days = Math.floor((diff % (30.44 * 86400000)) / 86400000);

    return `for ${years} years, ${months} months, ${days} days`;
}

function updateSwiftDeveloperTime() {
    document.getElementById("swiftDeveloperTime").innerHTML = calculateTimeSince("2015-07-01");
}

document.addEventListener("DOMContentLoaded", updateSwiftDeveloperTime);
setInterval(updateSwiftDeveloperTime, 86400000);