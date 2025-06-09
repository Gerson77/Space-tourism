import { useEffect, useState } from "react";

import LaunchVehiclePor from "../../assets/technology/image-launch-vehicle-portrait.jpg";
import LaunchVehicleLan from "../../assets/technology/image-launch-vehicle-landscape.jpg";

import SpacePortPor from "../../assets/technology/image-spaceport-portrait.jpg";
import SpacePortLan from "../../assets/technology/image-spaceport-landscape.jpg";

import SpaceCapsulePor from "../../assets/technology/image-space-capsule-portrait.jpg";
import SpaceCapsuleLan from "../../assets/technology/image-space-capsule-landscape.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const technologys = [
  {
    name: "Launch vehicle",
    images: {
      portrait: LaunchVehiclePor,
      landscape: LaunchVehicleLan,
    },
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
  },
  {
    name: "Spaceport",
    images: {
      portrait: SpacePortPor,
      landscape: SpacePortLan,
    },
    description:
      "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
  },
  {
    name: "Space capsule",
    images: {
      portrait: SpaceCapsulePor,
      landscape: SpaceCapsuleLan,
    },
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
  },
];

export default function Technology() {
  const [selectVehicle, setSelectVehicle] = useState("launch vehicle");
  const [isLandscape, setIsLandscape] = useState(false);

  const currentTechnology = technologys.find(
    (technology) => technology.name.toLowerCase() === selectVehicle
  );

  const checkScreenSize = () => {
    setIsLandscape(window.innerWidth >= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useGSAP(() => {
    const title = gsap.utils.toArray(".animate-title");
    const btnChooseTech = gsap.utils.toArray(".animate-btns");

    gsap.set([...title, ...btnChooseTech], {
      y: 20,
      opacity: 1,
      visibility: "visible",
    });

    gsap.fromTo(
      btnChooseTech,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      title,
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

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const elements = gsap.utils.toArray(".animate-text");
        const astros = gsap.utils.toArray(".animate-vehicle");

        gsap.set([...elements, ...astros], {
          y: 40,
          opacity: 0,
        });

        const tl = gsap.timeline();

        tl.fromTo(
          astros,
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
          elements,
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
    { dependencies: [selectVehicle], revertOnUpdate: true }
  );

  return (
    <div className="overflow-hidden max-h-screen">
      <section className="flex items-center w-full h-screen bg-[url('./assets/technology/background-technology-desktop.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="relative flex flex-col md:flex-row justify-center w-full h-full mx-auto md:pt-[148px]">
          <span className="animate-title text-center sm:text-left tracking-[4px] text-base sm:text-xl md:text-[28px] font-['Barlow_Condensed'] uppercase text-white mt-4 w-full max-w-[1110px] pt-[90px] sm:pt-[116px] md:pt-0 sm:pl-[40px] md:pl-0">
            <strong className="pr-2 font-bold opacity-30">03 </strong>
            Space Launch 101
          </span>
          <div className="w-full h-full max-h-[792px] gap-10 flex flex-col-reverse md:flex-col justify-center items-center text-left text-[#D0D6F9] md:absolute right-0">
            <div className="flex items-center justify-start gap-8 md:gap-12 flex-col md:flex-row w-full max-w-[1110px] px-[24px] sm:px-[127px] md:px-0">
              {/* Botoes */}
              <div className="flex flex-row md:flex-col w-full justify-center md:max-w-[80px] gap-6">
                {technologys.map((tech, index) => (
                  <div
                    key={tech.name}
                    onClick={() => setSelectVehicle(tech.name.toLowerCase())}
                    className={`animate-btns w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center font-['Bellefair'] text-lg sm:text-2xl md:text-[32px] cursor-pointer transition delay-150 duration-300 ease-in-out hover:border-white ${
                      selectVehicle === tech.name.toLowerCase()
                        ? "bg-white border border-white text-gray-900"
                        : "bg-transparent border border-gray-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Conteudo texto */}
              <div className="flex flex-col justify-center items-center md:items-start w-full h-full md:max-w-[491px]">
                <h2 className="animate-text text-lg sm:text-2xl md:text-[32px] font-['Bellefair'] uppercase opacity-50">
                  THE TERMINOLOGY…
                </h2>
                <h1 className="animate-text text-2xl sm:text-[40px] md:text-[56px] leading-8 md:leading-16 font-['Bellefair'] font-normal uppercase text-white py-2 tracking-[1px]">
                  {currentTechnology?.name}
                </h1>
                <p className="animate-text text-base md:text-lg font-thin md:leading-8 leading-7 w-full font-['Barlow'] text-center md:text-left">
                  {currentTechnology?.description}
                </p>
              </div>
            </div>

            {/* Imagens */}
            <div className="md:absolute right-0 w-auto h-auto pointer-events-none flex justify-center w-full md:w-auto">
              <img
                src={
                  !isLandscape
                    ? currentTechnology?.images.landscape
                    : currentTechnology?.images.portrait
                }
                alt={currentTechnology?.name}
                className="animate-vehicle object-cover object-center w-full md:w-auto md:h-[600px] h-[248px] sm:h-[357px] md:w-[600px] bg-gray-900"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
