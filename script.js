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
  page_1();
  page_2();
  page_4();
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

function page_1(){

  gsap.to("#up-img, #down-img",{
    scrollTrigger:{
      start: "top 10%",
      end: "top 0%",
      // markers: true,
      scroller: "main",
      trigger: "#page-1",
      scrub: true
    },
    y: "-150%",
    ease: "power1.inOut",
    
  })

  gsap.to("#nav-btns",{
    scrollTrigger:{
      start: "top 10%",
      end: "top 0%",
      // markers: true,
      scroller: "main",
      trigger: "#page-1",
      scrub: true
    },
    y: "-190%",
    ease: "power1.inOut",
    
  })

  let pg1_tl = gsap.timeline();

  pg1_tl.from("#page-1 h1",{
    y:200,
    duration:0.9,
    stagger:0.2
  })

  pg1_tl.from("#page-1 img",{
    opacity:0,
    scale: 0.9,
    y:10,
    duration: 1
  },"=-0.7")
}

function page_2(){
  let pg2_tl = gsap.timeline({
    scrollTrigger:{
      start: "top 90%",
      end: "top 70%",
      scroller: "main",
      trigger:"#page-2",
      // markers: true,
      scrub: true,
    }
  })

  pg2_tl.from("#p2-part-1 h2",{
    y:50,
    opacity:0,
    scale: 0.9,
  })

  pg2_tl.from("#p2-part-1 p",{
    y:50,
    opacity:0,
    scale: 0.9,
  })

  pg2_tl.from("#p2-part-1 a",{
    y:50,
    opacity:0,
    scale: 0.9,
  })

  gsap.from("#p2-part-2",{
    scrollTrigger:{
      start: "top 85%",
      end: "top 65%",
      scroller: "main",
      trigger:"#p2-part-2",
      // markers: true,
      scrub: true,
      // pin:true
    },
    // y:50,
    width:0,
    opacity:0,
    scale: 0.9,
    ease: "sine.out"
  })

  gsap.from(".card",{
    scrollTrigger:{
      start: "top 75%",
      end: "top 35%",
      scroller: "main",
      trigger:"#p2-part-3",
      // markers: true,
      scrub: true,
    },
    // y:5,
    // x:-5,
    // width:0,
    opacity:0,
    scale: 1.05,
    stagger: 0.5,
    ease: "power1.inOut"
  })
}

function page_4(){
  let upper_img_ = document.querySelector("#p4-upper");
  let lower_img = document.querySelector("#p4-lower");
  
  gsap.from(upper_img_,{
    opacity:0,
    scale:0.9,
    y:10,
    scrollTrigger:{
      trigger: upper_img_,
      scroller: "main",
      start: "top 80%",
      end: "top 65%",
      // markers: true
    }
  })

  gsap.from(lower_img,{
    opacity:0,
    scale:0.9,
    y:10,
    scrollTrigger:{
      trigger: lower_img,
      scroller: "main",
      start: "top 80%",
      end: "top 65%",
      // markers: true
    }
  })
}


function cursor(){
  let crsr = document.querySelector("#cursor");
  document.querySelector("main").addEventListener("mousemove",(dets)=>{
    crsr.style.top = `${dets.clientY-30}px`;
    crsr.style.left = `${dets.clientX-30}px`;
  })

  document.querySelector("#page-4").addEventListener("mousemove",()=>{
    crsr.style.scale = "6";
    crsr.style.height = "40px";
    crsr.style.width = "40px";
    crsr.style.opacity = "0.3";
  })
  document.querySelector("#page-4").addEventListener("mouseleave",()=>{
    crsr.style.scale = "0";
  })

  document.querySelector("#upper-left").addEventListener("mousemove",()=>{
    crsr.style.backgroundColor = "#E6C619";
  })
  document.querySelector("#upper-right").addEventListener("mousemove",()=>{
    crsr.style.backgroundColor = "#FEA4AA";
  })
  document.querySelector("#lower-left").addEventListener("mousemove",()=>{
    crsr.style.backgroundColor = "#B9FA00";
  })
  document.querySelector("#lower-right").addEventListener("mousemove",()=>{
    crsr.style.backgroundColor = "#A1BDFC";
  })
}

cursor();

window.innerWidth>768?card_hover():"";