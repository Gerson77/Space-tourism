import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Homepage() {
  const [isLandscape, setIsLandscape] = useState(false);

  const pulseRef = useRef<HTMLDivElement>(null);
  const pulseTweenRef = useRef<gsap.core.Tween | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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

  const handleMouseEnter = () => {
    const el = pulseRef.current;
    if (!el) return;

    // Para a animação de pulso
    if (pulseTweenRef.current) {
      pulseTweenRef.current.pause();
    }

    // Aplica escala maior
    gsap.to(el, {
      scale: isLandscape ? 1.6 : 1.25,
      opacity: 0.2,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const el = pulseRef.current;
    if (!el) return;

    // Volta escala e reinicia pulso
    gsap.to(el, {
      scale: 1,
      opacity: 0.1,
      duration: 0.3,
      onComplete: () => {
        if (pulseTweenRef.current) {
          pulseTweenRef.current.resume();
        }
      },
    });
  };

  useEffect(() => {
    const el = pulseRef.current;
    if (!el) return;

    // Animação de pulsação inicial
    const pulseTween = gsap.to(el, {
      scale: isLandscape ? 1.6 : 1.25,
      opacity: 0.15,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    pulseTweenRef.current = pulseTween;

    return () => {
      pulseTween.kill();
    };
  }, [isLandscape]);

  useGSAP(() => {
    gsap.fromTo(
      [subtitleRef.current, titleRef.current, paragraphRef.current],
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="w-full h-screen md:bg-[url('./assets/home/background-home-desktop.jpg')] bg-[url('./assets/home/background-home-tablet.jpg')] bg-no-repeat bg-center bg-cover flex md:items-end">
        <div className="w-full md:max-w-[1110px] px-[2%] mx-auto mb-12 md:mb-[126px] md:h-[632px] flex md:flex-row flex-col justify-between items-center md:items-end">
          <div className="w-full max-w-[550px] h-auto flex flex-col justify-center items-center md:items-start text-left text-[#D0D6F9]">
            <span
              ref={subtitleRef}
              className="tracking-[4px] text-base sm:text-[28px] font-light font-['Barlow_Condensed'] uppercase mt-46 md:mt-8"
            >
              So, you want to travel to
            </span>
            <h1
              ref={titleRef}
              className="text-[80px] sm:text-[144px] font-['Bellefair'] font-normal uppercase text-white"
            >
              Space
            </h1>
            <p
              ref={paragraphRef}
              className="text-sm sm:text-lg font-thin font-['Barlow'] md:leading-8 text-center md:text-left"
            >
              Let's face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we'll give you a truly out of
              this world experience!
            </p>
          </div>

          <Link
            to="/destination"
            className="relative flex items-center justify-center w-auto h-full transition duration-300 ease-in-out bg-black md:justify-end md:items-end delay-50 hover:text-gray-500"
          >
            <button className="absolute w-[144px] sm:w-[272px] h-[144px] sm:h-[272px] bg-white font-['Bellefair'] uppercase rounded-full text-[18px] sm:text-[32px] flex items-center justify-center hover:text-opacity-50">
              Explore
            </button>
            {/* <div className="absolute w-[144px] sm:w-[272px] h-[144px] sm:h-[272px] rounded-full bg-white opacity-10 hover:scale-[1.25] md:hover:scale-[1.60] cursor-pointer transition duration-300 ease-in-out delay-150"></div> */}
            <div
              ref={pulseRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute w-[144px] sm:w-[272px] h-[144px] sm:h-[272px] rounded-full bg-white opacity-10 cursor-pointer hover:scale-[1.25] md:hover:scale-[1.60]"
            ></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
