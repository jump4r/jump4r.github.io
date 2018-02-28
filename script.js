// Event Listeners
document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#scroll-button').addEventListener('click', function() {
        scroll('about-page');
    })
    document.querySelector('#filter').addEventListener('input', filter)

    projects = document.querySelectorAll(".project-wrapper");
});

// Smooth Scrolling
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
        return self.pageYOffset;
    }

    // Internet Explorer 6
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }

    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    } 

    return 0;
}

function elementYPosition(eID) {
    var e = document.getElementById(eID);
    var y = e.offsetTop;
    var node = e;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }

    return y;
}

function smoothScroll(eID) {

    var startY = currentYPosition();
    var stopY = elementYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

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