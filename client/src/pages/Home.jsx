/*
  RUGBONES EPK — Home Page (Revised v5)
  Design: Image-First Minimal Dark EPK
  - Members: Click to open modal (simple, stable)
  - Blurred preview visible at rest
  - No hover glitching
*/

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const IMAGES = {
  cover:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/001_bfe31ac1.webp",
  whatAreWe:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/002_11045c57.webp",
  about:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/003_ac747d4c.webp",
  membersGrid:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/004_d83e09a0.webp",
  oukoseason:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/005_248c2c28.webp",
  washira:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/006_ae9a7257.webp",
  capespring:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/007_614174f2.webp",
  kayKhali:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/008_8cc47bc4.webp",
  leroyOkiwiri:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/009_e2a469ed.webp",
  marsTwin:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/010_0e2b2e29.webp",
  umanisia:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/011_97847cf0.webp",
  fk: "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/012_0d5ff5e5.webp",
  gumbo:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/013_58908988.webp",
  whatsNext:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/014_4b6b7bed.webp",
  countyPolitics:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/015_153bfa4f.webp",
  contact:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663409368931/9SmzNoHwMdGrmSi7xyAWFy/016_6d605836.webp",
};

const members = [
  {
    name: "OUKO SEASON",
    img: IMAGES.oukoseason,
    traits: [

    ],
  },
  {
    name: "WASHIRA",
    img: IMAGES.washira,
    traits: [

    ],
  },
  {
    name: "CAPESPRING",
    img: IMAGES.capespring,
    traits: ["Rapper / Singer", "Producer", "Best dressed"],
  },
  {
    name: "KAY KHALI",
    img: IMAGES.kayKhali,
    traits: ["Rapper / Singer", "plays electric & bass guitar", "Resident YN"],
  },
  {
    name: "LEROY OKIWIRI",
    img: IMAGES.leroyOkiwiri,
    traits: [
      "Rapper",
      "Arguably has the hardest bars",
      "The glue of the collective",
    ],
  },
  {
    name: "MARS TWIN",
    img: IMAGES.marsTwin,
    traits: [
      "Founder",
      "Learning to play the guitar",
      "unbeatable graphic designer",
    ],
  },
  {
    name: "UMANISIA",
    img: IMAGES.umanisia,
    traits: [
      "Live Sound Engineer",
      "Producer / Rapper",
      "coordinator & facilitator",
    ],
  },
  {
    name: "FK",
    img: IMAGES.fk,
    traits: [
      "'God-tier producer'",
      "Sound Engineer Extraordinaire",
      "The Computer",
    ],
  },
  {
    name: "MOSENSE",
    img: "https://via.placeholder.com/400x500?text=MOSENSE",
    traits: ["Placeholder", "Coming soon", "More info TBA"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Show logo when scrolled past first page (hero section)
      setShowLogo(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Members", href: "#members" },
    { label: "Music", href: "#music" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(232,245,60,0.2)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a
          href="#"
          className="font-display text-2xl tracking-widest transition-all duration-500"
          style={{
            color: "#F5F5F5",
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? "translateY(0)" : "translateY(-20px)",
            pointerEvents: showLogo ? "auto" : "none",
          }}
        >
          THE RUGBONES
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono-brand text-xs tracking-widest uppercase transition-colors duration-200"
              style={{
                color: "#F5F5F5",
                fontFamily: "'Space Mono', monospace",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E8F53C")}
              onMouseLeave={e => (e.currentTarget.style.color = "#F5F5F5")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              backgroundColor: "#E8F53C",
              transform: menuOpen
                ? "rotate(45deg) translate(4px, 4px)"
                : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: "#E8F53C", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{
              backgroundColor: "#E8F53C",
              transform: menuOpen
                ? "rotate(-45deg) translate(4px, -4px)"
                : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "#0A0A0A",
            borderTop: "1px solid rgba(232,245,60,0.2)",
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="block px-6 py-4 font-mono-brand text-sm tracking-widest uppercase"
              style={{
                fontFamily: "'Space Mono', monospace",
                color: "#F5F5F5",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex items-end"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={IMAGES.cover}
          alt="The Rugbones"
          className="w-full h-full object-cover"
          style={{ opacity: 0.7 }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-24">
        <div style={{ maxWidth: "700px" }}>
          <p
            className="mb-3 tracking-widest uppercase text-xs"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: "#F5F5F5",
              opacity: 0.6,
              transition: "opacity 0.6s ease",
            }}
          >

          </p>
          <h1
            className="font-display leading-none mb-6"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              color: "#F5F5F5",
              letterSpacing: "0.04em",
            }}
          >
            THE
            <br />
            RUGBONES
          </h1>
          <div
            style={{
              height: "2px",
              width: "80px",
              backgroundColor: "#E8F53C",
              marginBottom: "1.5rem",
            }}
          />
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: "rgba(245,245,245,0.75)",
              fontFamily: "'Rubik', sans-serif",
              maxWidth: "480px",
            }}
          >
            A movement. A sound. A lifestyle. Nine members — one collective
            redefining the Kenyan rap scene.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href="#about"
              className="inline-block px-6 py-3 font-display text-lg tracking-widest transition-all duration-200"
              style={{
                backgroundColor: "#E8F53C",
                color: "#0A0A0A",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#F5F5F5";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "#E8F53C";
              }}
            >
              EXPLORE
            </a>
            <a
              href="#contact"
              className="inline-block px-6 py-3 font-display text-lg tracking-widest transition-all duration-200"
              style={{
                border: "1px solid #E8F53C",
                color: "#E8F53C",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "rgba(232,245,60,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="relative w-full">
        <img
          src={IMAGES.whatAreWe}
          alt="What are we?"
          className="w-full"
          style={{ display: "block", height: "auto" }}
        />
      </div>
    </section>
  );
}

// Member Modal
function MemberModal({ member, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,10,10,0.8)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
        style={{
          animation: "slideUp 0.3s ease",
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(232,245,60,0.1)",
            border: "1px solid #E8F53C",
            color: "#E8F53C",
            cursor: "pointer",
            transition: "all 0.2s",
            borderRadius: "4px",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#E8F53C";
            e.currentTarget.style.color = "#0A0A0A";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "rgba(232,245,60,0.1)";
            e.currentTarget.style.color = "#E8F53C";
          }}
        >
          ✕
        </button>

        <div className="relative w-full overflow-hidden rounded-lg">
          {/* Full image */}
          <img
            src={member.img}
            alt={member.name}
            className="w-full"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

// Member Pocket Card
function MemberPocket({ member, index }) {
  const [showModal, setShowModal] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <>
      <div
        ref={ref}
        className="relative overflow-hidden cursor-pointer rounded-lg"
        style={{
          aspectRatio: "1/1",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
        }}
        onClick={() => setShowModal(true)}
      >
        {/* Blurred background image */}
        <img
          src={member.img}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-center"
          style={{
            filter: "blur(8px)",
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(10,10,10,0.7)",
          }}
        />

        {/* Name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3
            className="text-center leading-none"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              color: "#E8F53C",
              letterSpacing: "-0.02em",
              padding: "1rem",
              fontFamily: "'Archivo Black', sans-serif",
              fontWeight: 900,
            }}
          >
            {member.name}
          </h3>
        </div>
      </div>

      {showModal && (
        <MemberModal member={member} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function Members() {
  const { ref, inView } = useInView();
  return (
    <section
      id="members"
      style={{
        backgroundColor: "#111111",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blurry background visuals */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "40%",
          height: "60%",
          background: "radial-gradient(circle, rgba(232,245,60,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-5%",
          width: "35%",
          height: "50%",
          background: "radial-gradient(circle, rgba(232,245,60,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
        <div
          ref={ref}
          className="mb-12 md:mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl tracking-widest"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontWeight: 900,
              color: "#E8F53C",
              lineHeight: 1.1,
              marginTop: "0.5rem",
            }}
          >
            THE COLLECTIVE
          </h2>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p
                className="text-sm"
                style={{
                  color: "rgba(245,245,245,0.5)",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                9 members. Each with their own unique genius.
              </p>
            </div>
          </div>
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(232,245,60,0.3)",
              marginTop: "1.5rem",
            }}
          />
        </div>

        {/* Members grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {members.map((member, i) => (
            <MemberPocket key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Music() {
  const { ref, inView } = useInView();
  return (
    <section
      id="music"
      className="py-8 md:py-20"
      style={{
        backgroundColor: "#0A0A0A",
      }}
    >
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="mb-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p
            className="mb-3 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Space Mono', monospace", color: "#E8F53C" }}
          >
            Discography
          </p>
        </div>

        <div className="mb-2 overflow-hidden rounded-lg">
          <img
            src={IMAGES.gumbo}
            alt="Gumbo: Bonez N' All"
            className="w-full h-auto"
          />
        </div>

        <div className="mb-2 overflow-hidden rounded-lg">
          <img
            src={IMAGES.countyPolitics}
            alt="County Politics 1"
            className="w-full h-auto"
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={IMAGES.whatsNext}
            alt="What's Next?"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative"
      style={{ backgroundColor: "#0A0A0A", paddingBottom: 0 }}
    >
      <div
        className="relative overflow-hidden rounded-b-none"
        style={{ minHeight: "500px" }}
      >
        <img
          src={IMAGES.contact}
          alt="The Rugbones live"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/therugbones",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@therugbones",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/therugbones",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/the-rugbones/1691922711",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="px-6 md:py-8 py-4"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(232,245,60,0.15)",
        marginTop: "-1px"
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="font-display text-lg tracking-widest"
            style={{ color: "#E8F53C" }}
          >
            THE RUGBONES
          </span>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{
                  color: "rgba(245,245,245,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E8F53C";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,245,245,0.6)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <span
          className="text-xs"
          style={{
            fontFamily: "'Space Mono', monospace",
            color: "rgba(245,245,245,0.3)",
          }}
        >
          © 2026 The Rugbones. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <About />
      <Members />
      <Music />
      <Contact />
      <Footer />
    </div>
  );
}
