import { useRef, useState } from "react";

import moon from "../../assets/destination/image-moon.webp";
import mars from "../../assets/destination/image-mars.webp";
import europa from "../../assets/destination/image-europa.webp";
import titan from "../../assets/destination/image-titan.webp";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  formatDistance,
  formatTravel,
  parseDistance,
  parseTravel,
} from "../../utils/formater";

const destinations = [
  {
    id: 1,
    name: "Moon",
    images: {
      png: "./assets/destination/image-moon.png",
      webp: moon,
    },
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distance: "384 400 km",
    travel: "3 days",
  },
  {
    id: 2,
    name: "Mars",
    images: {
      png: "./assets/destination/image-mars.png",
      webp: mars,
    },
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    distance: "225 mil. km",
    travel: "9 months",
  },
  {
    id: 3,
    name: "Europa",
    images: {
      png: "./assets/destination/image-europa.png",
      webp: europa,
    },
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distance: "628 mil. km",
    travel: "3 years",
  },
  {
    id: 4,
    name: "Titan",
    images: {
      png: "./assets/destination/image-titan.png",
      webp: titan,
    },
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    distance: "1.6 bil. km",
    travel: "7 years",
  },
];

export default function Destination() {
  const [selectDestination, setSelectDestination] = useState("moon");
  const [isAnimating, setIsAnimating] = useState(false);

  const distanceRef = useRef<HTMLHeadingElement>(null);
  const travelRef = useRef<HTMLHeadingElement>(null);

  const currentDestination = destinations.find(
    (dest) => dest.name.toLowerCase() === selectDestination
  );

  const handleChangeDestination = (newDest: string) => {
    if (newDest === selectDestination || isAnimating) return;

    setIsAnimating(true);

    const elements = gsap.utils.toArray(
      ".animate-text, .animate-astro, .animate-line"
    );
    gsap.to(elements, {
      opacity: 0,
      y: -40,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setSelectDestination(newDest);
        setIsAnimating(false);
      },
    });
  };

  const navButton =
    "uppercase border-b-[4px] border-transparent leading-[38px] transition-all duration-300 cursor-pointer hover:text-white hover:border-gray-500 ";

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const elements = gsap.utils.toArray(".animate-text");
        const astros = gsap.utils.toArray(".animate-astro");
        const line = gsap.utils.toArray(".animate-line");

        gsap.set([...elements, ...astros, ...line], {
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
          line,
          { width: 0, opacity: 0, y: 20 },
          {
            width: "100%",
            opacity: 3.5,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<"
        );

        tl.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "<0.2"
        );
      });

      return () => ctx.revert();
    },
    { dependencies: [selectDestination], revertOnUpdate: true }
  );

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const links = gsap.utils.toArray(".animate-links");

      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    if (!currentDestination) return;

    // DISTANCE
    const rawDistance = currentDestination.distance;
    const finalDistance = parseDistance(rawDistance);

    const distVal = { val: 0 };
    gsap.to(distVal, {
      val: finalDistance,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (distanceRef.current) {
          distanceRef.current.innerText = formatDistance(
            rawDistance,
            distVal.val
          );
        }
      },
    });

    // TRAVEL
    const rawTravel = currentDestination.travel;
    const finalTravel = parseTravel(rawTravel);

    const travelVal = { val: 0 };
    gsap.to(travelVal, {
      val: finalTravel,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (travelRef.current) {
          travelRef.current.innerText = formatTravel(rawTravel, travelVal.val);
        }
      },
    });
  }, [selectDestination]);

  return (
    <div className="overflow-hidden">
      <section className="w-full h-screen bg-[url('./assets/destination/background-destination-desktop.jpg')] bg-no-repeat bg-center bg-cover flex items-center">
        <div className="w-full h-full max-w-[1110px] mx-auto flex flex-col justify-between items-end md:mb-[126px] text-white">
          <span className="animate-links tracking-[4px] text-base text-center sm:text-left w-full sm:text-[20px] md:text-[28px] font-['Barlow_Condensed'] uppercase text-white sm:pl-[40px] md:pl-0 mt-[102px] sm:mt-[136px] md:mt-[224px]">
            <strong className="pr-2 font-bold opacity-30 ">01 </strong>Pick Your
            Destination
          </span>

          <div className="flex mt-10 gap-6 md:gap-42 flex-col md:flex-row items-center md:items-start px-[24px] sm:px-[127px] md:px-0">
            <div className="w-full h-full flex justify-center items-center">
              <img
                key={currentDestination?.name}
                src={currentDestination?.images.webp}
                alt=""
                className="animate-astro md:w-full h-full max-h-[480px] sm:w-[250px] w-[150px]"
              />
            </div>

            <div className="w-full flex flex-col pb-4">
              <ul className="flex gap-8 text-[16px] tracking-[2px] pb-4 md:mb-6 items-center justify-center md:justify-start">
                {destinations.map((dest) => (
                  <li
                    key={dest.id}
                    className="font-['Barlow_Condensed'] animate-links"
                  >
                    <button
                      onClick={() =>
                        handleChangeDestination(dest.name.toLocaleLowerCase())
                      }
                      className={`${navButton} ${
                        selectDestination === dest.name.toLowerCase()
                          ? "text-white border-white"
                          : ""
                      }`}
                    >
                      {dest.name}
                    </button>
                  </li>
                ))}
              </ul>

              <h1 className="animate-text text-[56px] leading-16 sm:text-[80px] md:text-[96px] font-['Bellefair'] font-normal uppercase text-white text-center md:text-left">
                {currentDestination?.name}
              </h1>
              <p className="animate-text text-sm sm:text-base md:text-lg text-center md:text-left font-thin leading-8 md:min-h-[128px] md:mt-6">
                {currentDestination?.description}
              </p>

              <div
                className="animate-line w-full h-[1px] bg-gray-700 my-6 md:my-10"
                style={{ width: 0 }}
              ></div>

              <div className="flex md:justify-between justify-center flex-col sm:flex-row overflow-hidden">
                <div className="w-full text-center md:text-left pb-4 sm:pb-12 uppercase">
                  <span className="animate-text text-sm font-['Barlow_Condensed'] inline-block">
                    Avg. distance
                  </span>
                  <h4
                    ref={distanceRef}
                    className="animate-text font-['Bellefair'] text-white text-[28px]"
                  >
                    {currentDestination?.distance}
                  </h4>
                </div>
                <div className="w-full text-center md:text-left pb-4 uppercase">
                  <span className="animate-text text-sm font-['Barlow_Condensed'] inline-block">
                    Est. travel time
                  </span>
                  <h4
                    ref={travelRef}
                    className="animate-text font-['Bellefair'] text-white text-[28px]"
                  >
                    {currentDestination?.travel}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// import { useRef, useState } from "react";

// import moon from "../../assets/destination/image-moon.webp";
// import mars from "../../assets/destination/image-mars.webp";
// import europa from "../../assets/destination/image-europa.webp";
// import titan from "../../assets/destination/image-titan.webp";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import {
//   formatDistance,
//   formatTravel,
//   parseDistance,
//   parseTravel,
// } from "../../utils/formater";

// const destinations = [
//   {
//     id: 1,
//     name: "Moon",
//     images: {
//       png: './assets/destination/image-moon.png',
//       webp: moon,
//     },
//     description:
//       "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
//     distance: "384 400 km",
//     travel: "3 days",
//   },
//   {
//     id: 2,
//     name: "Mars",
//     images: {
//       png: "./assets/destination/image-mars.png",
//       webp: mars,
//     },
//     description:
//       "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
//     distance: "225 mil. km",
//     travel: "9 months",
//   },
//   {
//     id: 3,
//     name: "Europa",
//     images: {
//       png: "./assets/destination/image-europa.png",
//       webp: europa,
//     },
//     description:
//       "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
//     distance: "628 mil. km",
//     travel: "3 years",
//   },
//   {
//     id: 4,
//     name: "Titan",
//     images: {
//       png: "./assets/destination/image-titan.png",
//       webp: titan,
//     },
//     description:
//       "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
//     distance: "1.6 bil. km",
//     travel: "7 years",
//   },
// ];

// export default function Destination() {
//   const [selectDestination, setSelectDestination] = useState("moon");
//   const [isAnimating, setIsAnimating] = useState(false);

//   const distanceRef = useRef<HTMLHeadingElement>(null);
//   const travelRef = useRef<HTMLHeadingElement>(null);

//   const currentDestination = destinations.find(
//     (dest) => dest.name.toLowerCase() === selectDestination
//   );

//   const handleChangeDestination = (newDest: string) => {
//     if (newDest === selectDestination || isAnimating) return;

//     setIsAnimating(true);

//     const elements = gsap.utils.toArray(
//       ".animate-text, .animate-astro, .animate-line"
//     );
//     gsap.to(elements, {
//       opacity: 0,
//       y: -40,
//       duration: 0.6,
//       ease: "power2.in",
//       onComplete: () => {
//         setSelectDestination(newDest);
//         setIsAnimating(false);
//       },
//     });
//   };

//   const navButton =
//     "uppercase border-b-[4px] border-transparent leading-[38px] transition-all duration-300 cursor-pointer hover:text-white hover:border-gray-500 ";

//   useGSAP(
//     () => {
//       const ctx = gsap.context(() => {
//         const elements = gsap.utils.toArray(".animate-text");
//         const astros = gsap.utils.toArray(".animate-astro");
//         const line = gsap.utils.toArray(".animate-line");

//         gsap.set([...elements, ...astros, ...line], {
//           y: 40,
//           opacity: 0,
//         });

//         const tl = gsap.timeline();

//         tl.fromTo(
//           astros,
//           { scale: 0.6, opacity: 0, y: 20 },
//           {
//             scale: 1,
//             opacity: 1,
//             y: 0,
//             duration: 2.2,
//             ease: "power3.out",
//           }
//         );

//         tl.fromTo(
//           line,
//           { width: 0, opacity: 0, y: 20 },
//           {
//             width: "100%",
//             opacity: 3.5,
//             y: 0,
//             duration: 1,
//             ease: "power2.out",
//           },
//           "<"
//         );

//         tl.fromTo(
//           elements,
//           { y: 40, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             stagger: 0.2,
//             duration: 1,
//             ease: "power3.out",
//           },
//           "<0.2"
//         );
//       });

//       return () => ctx.revert();
//     },
//     { dependencies: [selectDestination], revertOnUpdate: true }
//   );

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       const links = gsap.utils.toArray(".animate-links");

//       gsap.fromTo(
//         links,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           stagger: 0.2,
//           duration: 1,
//           ease: "power3.out",
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   useGSAP(() => {
//     if (!currentDestination) return;

//     // DISTANCE
//     const rawDistance = currentDestination.distance;
//     const finalDistance = parseDistance(rawDistance);

//     const distVal = { val: 0 };
//     gsap.to(distVal, {
//       val: finalDistance,
//       duration: 2,
//       ease: "power2.out",
//       onUpdate: () => {
//         if (distanceRef.current) {
//           distanceRef.current.innerText = formatDistance(
//             rawDistance,
//             distVal.val
//           );
//         }
//       },
//     });

//     // TRAVEL
//     const rawTravel = currentDestination.travel;
//     const finalTravel = parseTravel(rawTravel);

//     const travelVal = { val: 0 };
//     gsap.to(travelVal, {
//       val: finalTravel,
//       duration: 2,
//       ease: "power2.out",
//       onUpdate: () => {
//         if (travelRef.current) {
//           travelRef.current.innerText = formatTravel(rawTravel, travelVal.val);
//         }
//       },
//     });
//   }, [selectDestination]);

//   return (
//     <div className="overflow-hidden">
//       <section className="w-full h-screen bg-[url('./assets/destination/background-destination-desktop.jpg')] bg-no-repeat bg-center bg-cover flex items-center">
//         <div className="w-full h-full max-w-[1110px] mx-auto flex justify-between items-end md:mb-[126px]">
//           <div className="w-full h-screen gap-8 sm:gap-28 md:gap-26 flex flex-col justify-center items-start text-left text-[#D0D6F9] pt-[112px] sm:pt-[136px] md:pt-[184px]">
//             <span className="animate-links tracking-[4px] text-base text-center sm:text-left w-full sm:text-[20px] md:text-[28px] font-['Barlow_Condensed'] uppercase text-white sm:pl-[40px] md:pl-0">
//               <strong className="pr-2 font-bold opacity-30 ">01 </strong>Pick
//               Your Destination
//             </span>

//             <div className="flex gap-6 md:gap-42 flex-col md:flex-row items-center md:items-start px-[24px] sm:px-[127px] md:px-0">
//               <div className="w-full h-full flex justify-center items-center">
//                 <img
//                   key={currentDestination?.name}
//                   src={currentDestination?.images.webp}
//                   alt=""
//                   className="animate-astro md:w-full h-full max-h-[480px] sm:w-[250px] w-[150px]"
//                 />
//               </div>

//               <div className="w-full flex flex-col pb-4">
//                 <ul className="flex gap-8 text-[16px] tracking-[2px] pb-4 md:mb-6 items-center justify-center md:justify-start">
//                   {destinations.map((dest) => (
//                     <li
//                       key={dest.id}
//                       className="font-['Barlow_Condensed'] animate-links"
//                     >
//                       <button
//                         onClick={() =>
//                           handleChangeDestination(dest.name.toLocaleLowerCase())
//                         }
//                         className={`${navButton} ${
//                           selectDestination === dest.name.toLowerCase()
//                             ? "text-white border-white"
//                             : ""
//                         }`}
//                       >
//                         {dest.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 <h1 className="animate-text text-[56px] leading-16 sm:text-[80px] md:text-[96px] font-['Bellefair'] font-normal uppercase text-white text-center md:text-left">
//                   {currentDestination?.name}
//                 </h1>
//                 <p className="animate-text text-sm sm:text-base md:text-lg text-center md:text-left font-thin leading-8 md:min-h-[128px] mt-6">
//                   {currentDestination?.description}
//                 </p>

//                 <div
//                   className="animate-line w-full h-[1px] bg-gray-700 my-6 md:my-10"
//                   style={{ width: 0 }}
//                 ></div>

//                 <div className="flex md:justify-between justify-center flex-col sm:flex-row overflow-hidden">
//                   <div className="w-full text-center md:text-left pb-4 sm:pb-12 uppercase">
//                     <span className="animate-text text-sm font-['Barlow_Condensed'] inline-block">
//                       Avg. distance
//                     </span>
//                     <h4
//                       ref={distanceRef}
//                       className="animate-text font-['Bellefair'] text-white text-[28px]"
//                     >
//                       {currentDestination?.distance}
//                     </h4>
//                   </div>
//                   <div className="w-full text-center md:text-left pb-4 uppercase">
//                     <span className="animate-text text-sm font-['Barlow_Condensed'] inline-block">
//                       Est. travel time
//                     </span>
//                     <h4
//                       ref={travelRef}
//                       className="animate-text font-['Bellefair'] text-white text-[28px]"
//                     >
//                       {currentDestination?.travel}
//                     </h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
