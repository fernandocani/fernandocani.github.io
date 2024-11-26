function calculateTimeSince(dateString) {
    const pastDate = new Date(dateString);
    const currentDate = new Date();
    const diff = currentDate - pastDate;

    const years = Math.floor(diff / (365.25 * 86400000));
    const months = Math.floor((diff % (365.25 * 86400000)) / (30.44 * 86400000));
    const days = Math.floor((diff % (30.44 * 86400000)) / 86400000);

    return `${years} years, ${months} months, ${days} days`;
}

function calculateLifePercentage(birthday, jobStartDate) {
    const birthDate = new Date(birthday);
    const jobStart = new Date(jobStartDate);
    const currentDate = new Date();

    const totalLifeDuration = currentDate - birthDate;
    const jobDuration = currentDate - jobStart;

    const percentage = (jobDuration / totalLifeDuration) * 100;
    return "(" + percentage.toFixed(1) + "%" + ")";
}

function updateSwiftDeveloperTime() {
    const timeText = calculateTimeSince(1435708800000); // "for 9 years, 2 months, 3 days"
    const percentageText = calculateLifePercentage(719942400000, 1435708800000); // "(28.8%)"

    // Split the time text into segments at commas and wrap them in <span> with nowrap styles
    const parts = timeText.split(", ");
    const formattedText = `for <span class="nowrap">${parts[0]}</span>, 
    <span class="nowrap">${parts[1]}</span>, 
    <span class="nowrap">${parts[2]} ${percentageText}</span>`;

    document.getElementById("swiftDeveloperTime").innerHTML = formattedText;
}

document.addEventListener("DOMContentLoaded", updateSwiftDeveloperTime);
setInterval(updateSwiftDeveloperTime, 86400000);

/**
 * @param {Int} type Type of Value (0 = null, 1 = value, 2 = href)
 * @param {string} elementID Element ID
 */
function copyText(type, elementID) {
    let Text = document.getElementById(elementID);
    switch(type) {
    case 0:
        showToast('Invalid type');
        break;
    case 1:
        if (Text.value) {
            navigator.clipboard.writeText(Text.value);
            showToast('Copied');
        }
        break;
    case 2:
        if (Text.href) {
            navigator.clipboard.writeText(Text.href);
            showToast('Copied');
        }
        break;
    default:
        showToast('Unknown value');
        break;
    }
}

function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

function switchMode(checked) {
    if (checked == true) {
        set_cookie("dark-mode", 1, 365);
        document.getElementById("html").setAttribute("data-bs-theme", "dark");
    } else {
        delete_cookie("dark-mode");
        document.getElementById("html").setAttribute("data-bs-theme", "light");
    }
}

function set_cookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function delete_cookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}