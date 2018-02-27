// Event Listeners
document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#scroll-button').addEventListener('click', function() {
        smoothScroll('about-page');
    })
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