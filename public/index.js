const root = document.documentElement.style;

const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const noresults = document.getElementById("no-results");
const btnmode = document.getElementById("btn-mode");

let modetext = document.getElementById("mode-text");
const btnsubmit = document.getElementById("submit");
const input = document.getElementById("input");
const avatar = document.getElementById("avatar");
const userName = document.getElementById("name");
const user = document.getElementById("user");
const date = document.getElementById("date");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const user_location = document.getElementById("location");
const page = document.getElementById("page");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");
let modeicon = document.getElementById("mode-icon");

let url = "https://api.github.com/users/";

let darkMode = false;

btnsubmit.addEventListener("click", function () {
    if (input.value != "") {
        getUserData(url + input.value);
    }
});

input.addEventListener("input", function () {
    noresults.style.display = "none";
});

input.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (input.value != "") {
            getUserData(url + input.value);
        }
    }
});

btnmode.addEventListener("click", function () {
    if (darkMode == false) {
        darkModeProperties();
    } else {
        lightModeProperties();
    }
});

var data;

async function getUserData(gitUrl) {
    try {
        let response = await fetch(gitUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        console.log(data);

        updateProfile(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        noresults.style.display = "block";
    }
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateProfile(data) {
    if (data.message != "Not Found") {
        noresults.style.display = "none";

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        user.innerText = `${data.login}`;
        user.href = `${data.html_url}`;
        let dateSegments = data.created_at.split("T").shift().split("-");
        console.log(dateSegments);
        date.innerText = `joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;
        bio.innerText = data.bio === null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = data.location == null ? "Not Available" : `${data.location}`;
        page.innerText = data.blog == "" ? "Not Available" : `${data.blog}`;
        page.href = data.blog == "" ? "#" : `${data.blog}`;
        twitter.innerText = data.twitter_username == null ? "Not available" : `${data.twitter_username}`;
        twitter.href = data.twitter_username == null ? "#" : `https://twitter.com/${data.twitter_username}`;
        company.innerText = data.company == null ? "Not available" : `${data.company}`;
    } else {
        noresults.style.display = "block";
    }
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#f6f8ff");
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-text", "#4b6a9b");
    root.setProperty("--lm-text-alt", "#2b3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 96, 187, 0.2)");
    root.setProperty("--lm-icn-bg", "brightness(100%)");

    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/moon-icon.svg";

    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141d2f");
    root.setProperty("--lm-bg-content", "#1e2a47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70, 96, 187, 0.2)");
    root.setProperty("--lm-icn-bg", "brightness(100%)");

    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/sun-icon.svg";

    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function init() {
    darkMode = false;
    const value = localStorage.getItem("dark-mode");
    if (value == null) {
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    } else if (value == "true") {
        darkModeProperties();
    } else if (value == "false") {
        lightModeProperties();
    }

    getUserData(url + "Aman79398");
}

init();
