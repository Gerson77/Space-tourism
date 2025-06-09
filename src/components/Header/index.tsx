import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Menu from "../Menu";
import Close from "../Close/index.";

export default function Header() {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const navEl = navRef.current;
      const bgEl = backgroundRef.current;
      const dividerEl = dividerRef.current;
      const logoContainerEl = logoContainerRef.current;
      const logoEl = logoRef.current;

      if (!navEl) return;

      gsap.set(navEl, { opacity: 0, x: 100 });
      gsap.set(linksRef.current, { opacity: 0, y: -20 });

      if (bgEl) {
        gsap.set(bgEl, {
          opacity: 0,
          width: 0,
        });
      }

      if (dividerEl) gsap.set(dividerEl, { width: 0, opacity: 0 });

      let pathLength = 0;
      if (logoEl) {
        pathLength = logoEl.getTotalLength();
        gsap.set(logoEl, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      const tl = gsap.timeline();

      if (bgEl) {
        tl.to(
          bgEl,
          {
            width: "100%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.in",
          },
          0
        );
      }

      tl.to(
        navEl,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "<"
      );

      if (dividerEl) {
        tl.to(
          dividerEl,
          {
            width: "100%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.2
        );
      }

      if (logoContainerEl) {
        tl.fromTo(
          logoContainerEl,
          { rotation: 180, opacity: 0 },
          {
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
          },
          0
        );
      }

      if (logoEl) {
        tl.to(
          logoEl,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0.2
        );

        tl.to(
          logoEl,
          {
            fill: "#0B0D17",
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        );
      }

      tl.to(
        linksRef.current,
        {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.5,
            from: "start",
          },
          duration: 0.8,
          ease: "back.out(1.8)",
        },
        0
      );
    },
    { scope: navRef }
  );

  useEffect(() => {
    if (pathname === "/") setActive("home");
    else if (pathname === "/destination") setActive("destination");
    else if (pathname === "/crew") setActive("crew");
    else if (pathname === "/technology") setActive("technology");
  }, [pathname]);

  const classLink = (isActive: boolean) =>
    `no-underline text-white text-base font-thin uppercase tracking-[2px] ${!openMenu 
        ? "border-b-4 leading-[92px]" 
        : "border-r-4 leading-[42px] mb-4"
    } border-transparent md:leading-[80px] hover:border-gray-400 ${
      isActive ? "border-white" : ""
    }`;

  function handleOpenMenu() {
    setOpenMenu((prevState) => !prevState);
  }

  return (
    <header className="fixed left-0 z-50 flex items-center justify-between w-full h-[88px] md:h-24 md:top-10">
      <div className="flex items-center justify-between md:w-[54%] pl-[24px] sm:pl-[40px] z-[999]">
        <div
          ref={logoContainerRef}
          className="relative w-[48px] h-[48px] bg-white md:mr-[60px] rounded-full"
        >
          <Link to="/" onClick={() => setOpenMenu(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <g fill="none" fillRule="evenodd">
                <circle cx="24" cy="24" r="24" fill="#FFF" />
                <path
                  ref={logoRef}
                  fill="#FFF"
                  d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
                />
              </g>
            </svg>
          </Link>
        </div>

        <div
          ref={dividerRef}
          className="hidden w-full h-px bg-gray-600 md:block"
        ></div>
      </div>

      <div className="hidden sm:flex absolute right-0 w-[80%] md:w-[48%] overflow-hidden opacity-10">
        <div
          ref={backgroundRef}
          className="h-26 md:h-24 bg-gray-400"
          style={{ width: 0 }}
        ></div>
      </div>

      <nav
        ref={navRef}
        className={`${
          !openMenu ? "hidden items-start" : "block items-start pt-[133px]"
        } sm:flex w-[68%] md:w-[48%] sm:h-24 md:pt-3 flex justify-end backdrop-blur-xl absolute right-0 h-screen top-0`}
      >
        <div
          className={`${
            !openMenu ? "w-full pr-[40px]" : "pr-[0px] w-[86%] flex-col"
          } flex sm:items-center justify-between md:justify-around font-['Barlow_Condensed'] md:pl-[60px]`}
        >
          <Link
            to="/"
            ref={(el: HTMLAnchorElement | null) => {
              linksRef.current[0] = el;
            }}
            className={classLink(active === "home")}
            onClick={() => {
              setActive("home"),
              setOpenMenu(false)
            }}
          >
            <strong className="mr-2 font-semibold">00</strong> Home
          </Link>
          <Link
            to="/destination"
            ref={(el) => {
              linksRef.current[1] = el;
            }}
            className={classLink(active === "destination")}
            onClick={() => {setActive("destination"), setOpenMenu(false)}}
          >
            <strong className="mr-2 font-semibold">01</strong> Destination
          </Link>
          <Link
            to="/crew"
            ref={(el) => {
              linksRef.current[2] = el;
            }}
            className={classLink(active === "crew")}
            onClick={() => {setActive("crew"), setOpenMenu(false)}}
          >
            <strong className="mr-2 font-semibold">02</strong> Crew
          </Link>
          <Link
            to="/technology"
            ref={(el) => {
              linksRef.current[3] = el;
            }}
            className={classLink(active === "technology")}
            onClick={() => {setActive("technology"), setOpenMenu(false)}}
          >
            <strong className="mr-2 font-semibold">03</strong> Technology
          </Link>
        </div>
      </nav>

      <div className="cursor-pointer block sm:hidden z-1">
        <button onClick={handleOpenMenu} className="mr-[24px] md:mr-[40px]">
          {!openMenu ? <Menu /> : <Close />}
        </button>
      </div>
    </header>
  );
}
