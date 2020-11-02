const container = document.querySelector(".intro");
const video = container.querySelector(".video");
const skip = document.querySelector(".skip");
const goback = document.querySelector(".goback");
const pics = 714;
const folder = "frames";
let frame = 1;
let attop = 0;
let scrolled;

function btnchng(btn, dsply) {
    if (dsply) {
        btn.style.pointerEvents = "all";
        btn.style.opacity = "0.75";
    } else {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0";
    }
}

//Scrollmagic
const controller = new ScrollMagic.Controller();

//Scenes
const scene = new ScrollMagic.Scene({
    duration: pics * 30,
    triggerElemnt: container,
    triggerHook: 0,
})
    .setPin(container)
    .addTo(controller);

//Video animation

scene.on("update", (e) => {
    frame = Math.floor($(document).scrollTop() / 30) + 1;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        //Scrolled to bottom
        btnchng(goback, true);
        btnchng(skip, false);
    } else {
        btnchng(goback, false);
    }
    if ($(document).scrollTop() !== 0 && !scrolled) {
        scrolled = true;
    }
});
scrolled = false;
setInterval(() => {
    $(intro).css("height", "100vh");
    $(video).css("width", "100%");
    $(video).css("height", "100%");
    $(video).css("object-fit", "cover");
    if ($(document).scrollTop() === 0 && !scrolled) {
        attop++;
    } else {
        attop = 0;
    }
    if (attop >= 900) {
        attop = 0;
        if (!scrolled && $(document).scrollTop() === 0) {
            document.querySelector(".wannascroll").style.opacity = "1";
            document.querySelector(".wannascroll").style.pointerEvents = "all";
        }
    }
    if (scrolled) {
        document.querySelector(".wannascroll").style.opacity = "0";
        document.querySelector(".wannascroll").style.pointerEvents = "none";
    }
    //console.log(attop);
    if (frame <= pics) {
        //console.log(frame, ac);

        video.src = `${folder}/video ${Math.ceil(frame)}.jpg`;
    } else {
        video.src = `${folder}/video ${Math.ceil(pics)}.jpg`;
    }
    if (frame > pics / 30) {
        btnchng(skip, true);
    } else {
        btnchng(skip, false);
    }
}, 3);
