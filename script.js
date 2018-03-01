// Event Listeners
document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#scroll-button').addEventListener('click', function() {
        scroll('about-page');
    })
    document.querySelector('#filter').addEventListener('input', filter)

    projects = document.querySelectorAll(".project-wrapper");
});

// Smooth Scrolling

function scroll(eid) {
    document.getElementById(eid).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// Filter
var projects; // Set when DOM Content is loaded
var projectNames = ["powerslide", "wdtp", "tbreviews", "automapper", "wop", "beatblox", "bakery", "trajectory"];
var tags = {
    "wdtp": ["translation", "aegisub", "dropbox"],
    "powerslide": ["game development", "web development", "android", "c#", "html5/css3", "javascript", "asp.net core", "visual studio", "unity", "git", "photoshop"],
    "tbreviews": ["web development", "python", "html5/css3", "django", "visual studio", "git", "heroku", "postgres"]
};

function filter() {
    let query = document.querySelector('#filter').value.toLowerCase();

    for (let i = 0; i < projects.length; i++) {
        let included = false;

        for (let j = 0; j < tags[projects[i].id].length; j++) {
            // tags[projects[i].id][j])
            if (tags[projects[i].id][j].includes(query)) {
                included = true;
                break;
            }
        }

        if (!included) {
            projects[i].style.display = 'none';
        }

        else {
            projects[i].style.display = "flex";
        }
    }

    
}