var selectedIcon = undefined;


var biggestIndex = 1;


var topBar = document.querySelector("#top");



function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
    gsap.fromTo(element, { scale: 1.08 }, { scale: 1, duration: 0.25, ease: "power2.out" });
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);

        var targetWindow = document.querySelector("#" + element.dataset.window);
        openWindow(targetWindow);
    } else {
        selectIcon(element);
    }
}



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
        document.onmousemove = drag;
    }

    function drag(e) {
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



function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1; 

    gsap.fromTo(element,
        { scale: 0.85, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(1.7)" }
    );

    var items = element.querySelectorAll(".sidebar-item");
    if (items.length) {
        gsap.from(items, {
            x: -12,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.15,
            ease: "power2.out"
        });
    }
}

function closeWindow(element) {
    gsap.to(element, {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.22,
        ease: "power1.in",
        onComplete: function () {
            element.style.display = "none";
            gsap.set(element, { scale: 1, autoAlpha: 1 });
        }
    });
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon);
}

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () => handleWindowTap(element));
}



function initializeWindow(id) {
    var element = document.querySelector("#" + id);

  
    gsap.set(element, { xPercent: -50, yPercent: -50 });

    dragElement(element);
    addWindowTapHandling(element);

    var closeButton = document.querySelector("#" + id + "close");
    closeButton.addEventListener("click", function () {
        closeWindow(element);
    });
}

initializeWindow("window");
initializeWindow("casefiles");

initializeWindow("jarv");


var content = [
    {
        title: "Welcome",
        date: "08/17/2026",
        content: `
            <p>Welcome to Case Files. This is the first app😊</p>
        `
    },
    {
        title: "Important!!!",
        date: "08/17/2026",
        content: `
            <p>I hope you guys like it. If you do leave a star or comment. Thanks!😁 
            <br> And do check out the link (the yellow button)</br></p>
        `
    }
];


function setNoteContent(index) {
    var noteContent = document.querySelector("#noteContent");
    noteContent.innerHTML = content[index].content;
}


function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    var note = content[index];

    var newDiv = document.createElement("div");
    newDiv.className = "sidebar-item";
    newDiv.innerHTML = `
        <p style="margin: 0px; font-weight: bold;">${note.title}</p>
        <p style="font-size: 12px; margin: 0px;">${note.date}</p>
    `;

   
    newDiv.addEventListener("click", function () {
        setNoteContent(index);
    });

    sidebar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
    addToSideBar(i);
}
setNoteContent(0);