import { useState } from "react";
import imageDouglas from "../../assets/crew/image-douglas-hurley.png";
import imageMark from "../../assets/crew/image-mark-shuttleworth.png";
import imageVictor from "../../assets/crew/image-victor-glover.png";
import imageAnousheh from "../../assets/crew/image-anousheh-ansari.png";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const crews = [
  {
    name: "Douglas Hurley",
    images: {
      png: imageDouglas,
      webp: "./assets/crew/image-douglas-hurley.webp",
    },
    role: "Commander",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
  },
  {
    name: "Mark Shuttleworth",
    images: {
      png: imageMark,
      webp: "./assets/crew/image-mark-shuttleworth.webp",
    },
    role: "Mission Specialist",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
  },
  {
    name: "Victor Glover",
    images: {
      png: imageVictor,
      webp: "./assets/crew/image-victor-glover.webp",
    },
    role: "Pilot",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
  },
  {
    name: "Anousheh Ansari",
    images: {
      png: imageAnousheh,
      webp: "./assets/crew/image-anousheh-ansari.webp",
    },
    role: "Flight Engineer",
    bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
  },
];

export default function Crew() {
  const [selectCrew, setSelectCrew] = useState("douglas hurley");

  const currentCrew = crews.find(
    (crew) => crew.name.toLowerCase() === selectCrew
  );

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const textContent = gsap.utils.toArray(".animate-text");
        const crew = gsap.utils.toArray(".animate-crew");

        gsap.set([...textContent, ...crew], {
          y: 40,
          opacity: 0,
        });

        const tl = gsap.timeline();

        tl.fromTo(
          crew,
          { scale: 0.6, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 2.2,
            ease: "power3.out",
          }
        );

        tl.fromTo(
          textContent,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out",
          },
          "<0.3"
        );
      });
      return () => ctx.revert();
    },
    { dependencies: [selectCrew], revertOnUpdate: true }
  );

  useGSAP(() => {
    const options = gsap.utils.toArray(".animate-title");

    gsap.fromTo(
      options,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
      }
    );
  });

  return (
    <div className="overflow-hidden">
      <section className="w-full h-screen bg-[url('./assets/crew/background-crew-desktop.jpg')] bg-no-repeat bg-center bg-cover flex items-center">
        <div className="w-full h-full max-w-[1110px] mx-auto flex justify-between items-end mb-[136px]">
          <div className="w-full h-full max-h-[792px] gap-10 flex flex-col justify-center items-start text-left text-[#D0D6F9]">
            <div className="flex items-end h-full flex-col md:flex-row relative">
              <div className="flex flex-col justify-between flex-1 w-full md:w-1/2 h-full px-[24px] sm:px-[127px] md:px-0">
                <span className="animate-title tracking-[4px] text-base sm:text-xl md:text-[28px] font-['Barlow_Condensed'] uppercase text-white text-center sm:text-left mt-38 sm:mt-12 md:mt-20 sm:-ml-22 md:ml-0">
                  <strong className="pr-2 font-bold opacity-30">02 </strong>Meet
                  Your Crew
                </span>
                <div className="flex flex-col items-center md:items-start mt-12">
                  <h2 className="animate-text text-lg sm:text-2xl md:text-[32px] font-['Bellefair'] uppercase opacity-50">
                    {currentCrew?.role}
                  </h2>

                  <h1 className="animate-text text-2xl sm:text-[40px] md:text-[56px] md:leading-16 font-['Bellefair'] font-normal uppercase text-white py-2 tracking-[1px]">
                    {currentCrew?.name}
                  </h1>
                  <p className="animate-text text-base md:text-lg font-thin leading-6 md:leading-8 w-full font-['Barlow'] text-center md:text-left">
                    {currentCrew?.bio}
                  </p>
                </div>
                <div className="w-full">
                  <div className="flex w-full gap-4 md:gap-12 uppercase pt-8 pb-10 justify-center md:justify-start">
                    {crews.map((crew) => (
                      <div
                        key={crew.name}
                        onClick={() => setSelectCrew(crew.name.toLowerCase())}
                        className={`w-[10px] h-[10px] md:w-4 md:h-4 bg-white rounded-full cursor-pointer transition-all duration-300 hover:opacity-50 ${
                          selectCrew === crew.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-full md:w-1/2 md:h-[80%] min-h-[642px] relative bottom-0 flex justify-center items-start sm:items-start pt-2">
                <img
                  src={currentCrew?.images.png}
                  alt=""
                  className="animate-crew mask-b-from-80% mask-b-to-98% md:absolute bottom-0 md:-right-6 max-w-screen max-h-[320px] sm:max-h-[460px] md:max-h-screen"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
