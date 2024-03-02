"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const diseases = [
    "heart disease",
    "diabetes",
    "alzheimers",
    "dementia",
    "hypertension",
    "obesity",
    // Add more diseases as needed
  ];

  let currentDiseaseIndex = 0;

  useEffect(() => {
    let currentDiseaseIndex = 0;

    const cycleDiseases = () => {
      const diseaseElement = document.querySelector(".disease");
      if (!diseaseElement) return;

      // Update text with the next disease without immediately showing it
      diseaseElement.textContent = diseases[currentDiseaseIndex];

      // Animation to slide in from the bottom
      gsap.fromTo(
        diseaseElement,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            // Wait for a moment before sliding out and fading
            gsap.to(diseaseElement, {
              y: -30, // Move up to simulate "going out of view"
              opacity: 0,
              duration: 1,
              delay: 2, // Adjust delay as needed
              onComplete: () => {
                currentDiseaseIndex =
                  (currentDiseaseIndex + 1) % diseases.length;
                cycleDiseases(); // Repeat the cycle with the next disease
              },
            });
          },
        }
      );
    };

    cycleDiseases();

    // Cleanup function to prevent memory leaks
    return () => {
      gsap.killTweensOf(".disease");
    };
  }, []);

  useEffect(() => {
    gsap.to(".info-box", {
      y: 500,
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: ".info-box",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const icons = document.querySelectorAll(".icon");
    icons.forEach((icon) => {
      icon.dataset.intensity = 60 + Math.random() * 120;
    });

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const mouseXRatio = (e.clientX - innerWidth / 2) / innerWidth;
      const mouseYRatio = (e.clientY - innerHeight / 2) / innerHeight;

      icons.forEach((icon) => {
        const intensity = parseFloat(icon.dataset.intensity);
        gsap.to(icon, {
          x: mouseXRatio * intensity,
          y: mouseYRatio * intensity,
          ease: "none",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".purple-container",
        start: "top top",
        end: () =>
          `+=${document.querySelector(".purple-container").offsetHeight * 8}`, // Example of dynamic end value
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      ".bg-yellow-400",
      { left: "50%", top: "50%", duration: 15, zIndex: 10 },
      0
    )
      .to(".main-container", { backgroundColor: "#ADD8E6", duration: 10 }, 0)
      .to(
        ".bg-blue-400",
        { right: "50%", top: "50%", duration: 3, zIndex: 10 },
        0
      )
      .to(
        ".bg-red-400",
        { left: "50%", top: "50%", duration: 3, zIndex: 10 },
        0
      )
      .to(
        ".bg-green-400",
        { right: "50%", top: "50%", duration: 3, zIndex: 10 },
        0
      )
      .to(".bg-green-400", { scale: 2.5, duration: 5, zIndex: 100 })
      .to(".bg-green-400", {
        right: "28%",
        top: "70%",
        scale: 1,
        duration: 3,
        zIndex: 1,
      })
      .to(".bg-red-400", { scale: 2.5, duration: 5, zIndex: 100 })
      .to(".bg-red-400", {
        left: "28%",
        top: "70%",
        scale: 1,
        duration: 3,
        zIndex: 1,
      })
      .to(".bg-blue-400", { scale: 2.5, duration: 5, zIndex: 100 })
      .to(".bg-blue-400", {
        right: "28%",
        top: "28%",
        scale: 1,
        duration: 3,
        zIndex: 1,
      })
      .to(".bg-yellow-400", { scale: 2.5, duration: 5, zIndex: 100 })
      .to(".bg-yellow-400", {
        left: "28%",
        top: "28%",
        scale: 1,
        opacity: 0,
        duration: 3,
        zIndex: 1,
      });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".icon",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
        duration: 0.5,
      }
    );
  }, []);

  // useEffect(() => {
  //   // Target each point in the info-box
  //   document
  //     .querySelectorAll(".info-box .info-point")
  //     .forEach((point, index) => {
  //       gsap.fromTo(
  //         point,
  //         { y: 30, opacity: 0 }, // Starting state: slightly down and transparent
  //         {
  //           y: 0, // End state: original position
  //           opacity: 1, // Fully visible
  //           duration: 0.5, // Duration of the animation
  //           ease: "power1.out", // Easing function
  //           scrollTrigger: {
  //             trigger: point,
  //             start: "top center+=100", // Start the animation a bit before the point reaches the center
  //             end: "bottom center-=100",
  //             toggleActions: "play none none reverse", // Defines how the animation behaves on scroll
  //             scrub: true, // Smooth scrubbing effect
  //             markers: true,
  //           },
  //         }
  //       );
  //     });
  // }, []);

  useEffect(() => {
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-container",
        start: "top+=400 top",
        end: () => `+=${document.querySelector(".section-2").offsetHeight}`, // Example of dynamic end value
        scrub: 1,
      },
    });

    tl.fromTo(
      ".info-point-1",
      { y: 30, opacity: 0 }, // Starting state: slightly down and transparent
      {
        y: 0, // End state: original position
        opacity: 1, // Fully visible
        duration: 0.5, // Duration of the animation
        ease: "power1.out", // Easing function
      }
    )
      .fromTo(
        ".info-point-2",
        { y: 30, opacity: 0 }, // Starting state: slightly down and transparent
        {
          y: 0, // End state: original position
          opacity: 1, // Fully visible
          duration: 0.5, // Duration of the animation
          ease: "power1.out", // Easing function
        }
      )
      .fromTo(
        ".info-point-3",
        { y: 30, opacity: 0 }, // Starting state: slightly down and transparent
        {
          y: 0, // End state: original position
          opacity: 1, // Fully visible
          duration: 0.5, // Duration of the animation
          ease: "power1.out", // Easing function
        }
      );

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <main className="main-container flex flex-col w-full bg-[#fcf0f4]">
      <div className="fixed top-8 left-8 flex text-3xl font-bold z-[1000] bg-white rounded-[2rem] pt-2 pb-2 pl-4 pr-4">
        <h1 className="text-red-800">Red</h1>
        <h1 className="text-gray-800">Sync</h1>
      </div>
      {/* <div className="fixed top-8 left-8 flex text-3xl font-bold z-[1000] bg-white rounded-[2rem] pt-2 pb-2 pl-4 pr-4">
        <h1 className="text-red-800">Red</h1>
        <h1 className="text-gray-800">Sync</h1>
      </div> */}
      {/* make navigation on the right for desktop, middle on phone and responsive. */}
      <nav className="fixed top-8 z-[1000] w-full px-4 md:px-0">
        <div className="max-w-[95%] md:max-w-none mx-auto md:mx-0 md:absolute md:right-10">
          <ul className="flex justify-center md:justify-end space-x-4 font-semibold bg-white/90 rounded-[32px] pl-8 pr-8 pt-4 pb-4 text-md sm:text-xl text-gray-800">
            <li>
              <a href="#" className="hover:text-red-800">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-800">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-800">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-800">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="min-h-screen flex flex-col justify-center items-center text-4xl md:text-8xl font-bold text-gray-800">
        <div className="flex justify-center items-center md:w-[800px]">
          <div className="sync flex flex-col space-y-4 justify-center items-center opacity-1">
            <h2 className="text-black text-3xl md:text-6xl self-center text-center">
              Don't treat health symptoms.
            </h2>
            <h2 className="text-black text-3xl md:text-6xl self-center text-center">
              Prevent{" "}
              <span className="disease text-red-800">heart disease</span>.
            </h2>
          </div>
        </div>
        {/* <button className="flex justify-center items-center h-[42px] w-[108px] md:h-[64px] md:w-[160px] bg-red-800 rounded-[32px] shadow-2xl mt-4 md:mt-12">
          <p className="text-[1rem] md:text-[1.5rem] text-gray-800 font-semibold text-white">
            Subscribe
          </p>
        </button> */}
      </div>
      {/* Make stickers smaller and less of them on phones */}
      <img
        src="/heart.svg"
        className="icon absolute left-[16%] md:left-[10%] top-[60%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 -rotate-12"
      />
      <img
        src="/blood-pressure.svg"
        className="icon absolute left-[24%] md:left-[12%] top-[24%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 -rotate-12"
      />
      <img
        src="/water.svg"
        className="icon absolute left-[12%] md:left-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 -rotate-12"
      />
      <img
        src="/scale.svg"
        className="icon absolute left-[28%] md:left-[24%] top-[80%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 -rotate-12"
      />
      <img
        src="/food.svg"
        className="icon absolute right-[12%] md:right-[10%] top-[60%] translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 rotate-12"
      />
      <img
        src="/tape.svg"
        className="icon absolute right-[16%] md:right-[20%] top-[30%] translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 rotate-12"
      />
      <img
        src="/blood.svg"
        className="icon absolute right-[14%] md:right-[24%] top-[80%] translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 rotate-12"
      />
      <img
        src="/sleep.svg"
        className="icon absolute right-[5%] md:right-[5%] top-[70%] md:top-[80%] translate-x-1/2 -translate-y-1/2 h-16 w-16 md:h-28 md:w-28 rotate-12"
      />

      <div className="info-box absolute flex justify-center items-center h-[340px] w-[92%] md:w-[480px] bg-blue-200 rounded-[32px] left-1/2 top-[928px] md:top-[892px] -translate-x-1/2 -translate-y-1/2 shadow-2xl">
        <div className="flex flex-col items-center space-y-8 text-center text-md md:text-xl p-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            How does it work?
          </h2>
          <h3 className="info-point-1">
            1. We send you medical-grade sensors. 📦🔬
          </h3>
          <h3 className="info-point-2">
            2. You take daily and weekly measurements of your body. 📆📏
          </h3>
          <h3 className="info-point-3">
            3. Red provide you insights and keep you accountable for action.📈🔴
          </h3>
        </div>
      </div>
      <div className="section-2 min-h-screen relative flex justify-center items-center w-[98%] self-center mt-40 md:mt-48 rounded-[32px]"></div>
      <div className="purple-container min-h-screen relative flex justify-center items-center w-[98%] self-center mt-40 md:mt-48 rounded-[32px]">
        <div className="absolute flex flex-col space-y-4 justify-center items-center left-[28%] md:left-[20%] top-[28%] -translate-x-1/2 -translate-y-1/2 bg-yellow-400 h-[100px] w-[100px] md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-[2rem] shadow-2xl floating">
          <img
            src="/blood-pressure-monitor.png"
            className="self-center rounded-[2rem] p-4"
          />
        </div>
        <div className="absolute flex flex-col space-y-4 justify-center items-center right-[28%] md:right-[20%]  top-[28%] translate-x-1/2 -translate-y-1/2 bg-blue-400 h-[100px] w-[100px] md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-[2rem] shadow-2xl floating">
          <img
            src="/glucose-sensor.png"
            className="self-center rounded-[2rem] p-4"
          />
        </div>
        <div className="absolute flex flex-col space-y-4 justify-center items-center left-[28%] md:left-[24%] top-[70%] -translate-x-1/2 -translate-y-1/2 bg-red-400 h-[100px] w-[100px] md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-[2rem] shadow-2xl floating">
          <img
            src="/scale-sensor.png"
            className="self-center rounded-[2rem] p-4"
          />
        </div>
        <div className="absolute flex flex-col space-y-4 justify-center items-center right-[28%] md:right-[24%]  top-[70%] translate-x-1/2 -translate-y-1/2 bg-green-400 h-[100px] w-[100px] md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-[2rem] shadow-2xl floating">
          <img
            src="/smart-ring.png"
            className="self-center rounded-[2rem] p-4"
          />
        </div>
        <div className="absolute flex flex-col space-y-8 justify-center items-center right-[50%] md:right-[50%]  top-[50%] translate-x-1/2 -translate-y-1/2  rounded-[2rem]">
          <h1 className="font-bold text-7xl">$30/mo</h1>
          <button className="flex justify-center items-center h-[42px] w-[108px] md:h-[64px] md:w-[160px] bg-red-800 rounded-[32px] shadow-2xl mt-4 md:mt-12">
            <p className="text-[1rem] md:text-[1.3rem] text-gray-800 font-semibold text-white">
              Subscribe
            </p>
          </button>
        </div>
      </div>
      <div className="main-container flex justify-center items-center w-[100%] self-center mt-28 h-[1600vh] bg-[#f3f3e9] rounded-[32px]"></div>
    </main>
  );
}
