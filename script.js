dragElement(document.getElementById("window"));
function dragElement(elmnt) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = startDragging;
    } else {
        elmnt.onmousedown = startDragging;
    }
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        x2 = e.clientX;
        y2 = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement; 
    }
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        x1 = x2 - e.clientX;
        y1 = y2 - e.clientY;
        x2 = e.clientX;
        y2 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - y1) + "px";
        elmnt.style.left = (elmnt.offsetLeft - x1) + "px";
    }
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
var welcomescreen = document.querySelector("#window");
function closewelcomescreen(element) {
    element.style.display = "none";
}
function openwelcomescreen(element) {
    element.style.display = "flex";
}
var welcomeclose = document.querySelector("#welcomeclose");
var welcomeopen = document.querySelector("#welcomeopen");
welcomeclose.addEventListener("click", function () {
    closewelcomescreen(welcomescreen);
});
welcomeopen.addEventListener("click", function () {
    openwelcomescreen(welcomescreen);
});