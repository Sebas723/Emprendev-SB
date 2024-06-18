/*Vertical Slider*/ 
var Carousel = {
    width: 1000,
    numVisible: 5,
    duration: 600,
    padding: 2.5
};

function rotateForward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
}

function rotateBackward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function animate(begin, end, finalTask) {
    var carousel = Carousel.carousel,
        change = end - begin,
        duration = Carousel.duration,
        startTime = Date.now();
    carousel.style.top = begin + 'px';
    var animateInterval = window.setInterval(function () {
        var t = Date.now() - startTime;
        if (t >= duration) {
            window.clearInterval(animateInterval);
            finalTask();
            return;
        }
        t /= (duration / 2);
        var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
                               change / 2 * (Math.pow(t - 2, 3) + 2));
        carousel.style.top = top + 'px';
    }, 1000 / 60);
}

function autoRotate() {
    animate(0, -Carousel.rowHeight, function () {
        rotateBackward();
        carousel.style.top = '0';
    });
}

window.onload = function () {
    document.getElementById('spinner').style.display = 'none';
    var carousel = Carousel.carousel = document.getElementById('carousel'),
        h1Elements = carousel.getElementsByTagName('h1'),
        numElements = h1Elements.length,
        elementWidth = Carousel.width,
        padding = Carousel.padding,
        rowHeight = Carousel.rowHeight = h1Elements[0].offsetHeight + 10 * padding;

    for (var i = 0; i < numElements; ++i) {
        var h1Element = h1Elements[i], frame = document.createElement('div');
        frame.className = 'pictureFrame';
        h1Element.style.width = frame.style.width = elementWidth + 'px';
        h1Element.style.paddingTop = padding + 'px';
        h1Element.style.paddingBottom = padding + 'px';
        frame.style.height = rowHeight + 'px';
        carousel.insertBefore(frame, h1Element);
        frame.appendChild(h1Element);
    }

    Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
    carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px';
    carousel.style.visibility = 'visible';

    var wrapper = Carousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    setInterval(autoRotate, 3000);
};

/*Dynamic Navbar*/

var navbar = document.getElementById('navbar');

window.addEventListener("scroll", function() {
    var scrollPos = window.scrollY;
    
    if (scrollPos > 500) {
        navbar.classList.add('compacted');
        navbar.classList.add('brandtextcompacted');
    } else {
        navbar.classList.remove('compacted');
        navbar.classList.remove('brandtextcompacted');
    }
});