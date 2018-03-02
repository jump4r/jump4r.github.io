// Event Listeners
document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#scroll-button').addEventListener('click', function() {
        scroll('about-page');
    })

    projects = document.querySelectorAll(".project-wrapper");

    var filterElements = document.querySelectorAll(".filter-element");
    for (let i = 0; i < filterElements.length; i++) {
        filterElements[i].addEventListener('click', function(event) {
            loadFilter(event);
        });
        
    }
});

// Smooth Scrolling

function scroll(eid) {
    document.getElementById(eid).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// Filter
var projects; // Set when DOM Content is loaded
var filterElements;
var projectNames = ["powerslide", "wdtp", "tbreviews", "automapper", "wop", "beatblox", "bakery", "trajectory"];

// 
var tags = {
    "wdtp": ["translation", "aegisub", "dropbox"],
    "powerslide": ["game development", "web development", "android", "c#", "html5/css3", "javascript", "asp.net core", "visual studio", "unity", "git", "photoshop"],
    "tbreviews": ["web development", "python", "html5/css3", "django", "visual studio", "git", "heroku", "postgres"]
};
var query = []; // User input string

function loadFilter(event) {
    // Load spinner and wait for .5s to give the appearance of a "load sequence"
    // This is just for appearances so that the user will think "Oh, something happened"
    document.querySelector('#loader').style.display = 'flex';

    let targetElement = event.target || event.srcElement;
    invertColors(targetElement);

    // Wait 500ms before calling filter
    setTimeout(function() {
        filter(event);
        document.querySelector('#loader').style.display = 'none';
    }, 500);
}


function filter(event) {
    let targetElement = event.target || event.srcElement;

    // Check to see if we have to remove or add query
    searchText = targetElement.innerHTML.toLowerCase();
    searchArrayIndex = query.indexOf(searchText);

    if (searchArrayIndex > -1) {
        query.splice(searchArrayIndex, 1);
    }

    else {
        query.push(searchText);
    }

    let projectsToDisplay = []; // A parrallel array running along the 'projects' array to show which ones to display
    
    for (let i = 0; i < projects.length; i++) {
        projectsToDisplay.push(true);
    }

    for (let i = 0; i < query.length; i++) {
        for (let j = 0; j < projects.length; j++) {
            let included = false;

            for (let k = 0; k < tags[projects[j].id].length; k++) {
                
                if (tags[projects[j].id][k].includes(query[i])) {
                    included = true;
                    break;
                }
            }

            if (!included) {
                projectsToDisplay[j] = false;
            }
        }
    }
    // Alternate between two project background colors for display
    let white = false;

    for (let i = 0; i < projects.length; i++) {
        if (!projectsToDisplay[i]) {
            projects[i].style.display = 'none';
        }

        else {
            projects[i].style.display = 'flex';
            if (white) {
                projects[i].style.backgroundColor = "white";
            }

            else {
                projects[i].style.backgroundColor = "#eee";
            }

            white = !white;
        }
    }
}

// True for 'on', False for 'off'
function invertColors(element) {
    let newTextColor = window.getComputedStyle(element, null).getPropertyValue('background-color');
    let newBackgroundColor = window.getComputedStyle(element, null).getPropertyValue('color');

    element.style.backgroundColor = newBackgroundColor;
    element.style.color = newTextColor;
}

function arrayContains(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
}