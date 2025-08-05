function locomotive(){
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

 }

 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  locomotive();
  // gsap code here!
});

function card_hover(){
    let card_btns = document.querySelectorAll(".card-btn");
    let card_pop = document.querySelectorAll(".card-btn-part-2");
    let img_1 = document.querySelectorAll(".img-1");
    let img_2 = document.querySelectorAll(".img-2");

    card_btns.forEach((btn,i)=>{
        btn.addEventListener("mouseenter",()=>{
            // alert("afda");
            card_pop[i].style.height = "fit-content";
            card_pop[i].style.padding = "6vmin 4vmin 3vmin 4vmin";
            card_pop[i].style.opacity = "1";
            img_1[i].style.scale = "1";
            img_2[i].style.scale = "1";
        })

        btn.addEventListener("mouseleave",()=>{
            // alert("afda");
            card_pop[i].style.height = "0%";
            card_pop[i].style.padding = "0 0";
            card_pop[i].style.opacity = "0";
            img_1[i].style.scale = "0";
            img_2[i].style.scale = "0";
        })
    })
}

card_hover();