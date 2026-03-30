"use client";

import Image from "next/image";

const companyLinks = ["About Us", "Reviews", "FAQ"];
const pressLinks = ["Privacy Policy", "Cookie Policy", "FAQ"];
const contacts = [
  { icon: "/phone.svg", alt: "Phone", text: "084524145547" },
  { icon: "/email.svg", alt: "Email", text: "arshakir132@gmail.com" },
  { icon: "/location.svg", alt: "Location", text: "Texas, USA" },
];
const socials = [
  { href: "#", iconSrc: "/github.svg", alt: "GitHub" },
  { href: "#", iconSrc: "/instagram.svg", alt: "Instagram" },
  { href: "#", iconSrc: "/telegram.svg", alt: "Telegram" },
  { href: "#", iconSrc: "/linkedin.svg", alt: "LinkedIn" },
  { href: "#", iconSrc: "/whatsapp.svg", alt: "WhatsApp" },
  { href: "#", iconSrc: "/x.svg", alt: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E1B1E] px-6 pb-6 pt-10 text-[#FFDEBA] lg:px-12">
      <div
        className="relative mx-auto mb-14 max-w-[1400px] overflow-hidden rounded-[35px] border border-[#5a3823] px-6 py-8 shadow-soft md:px-10 lg:px-[60px] lg:pb-10 lg:pt-9"
        style={{
          background:
            "radial-gradient(54.44% 201.28% at 48.45% -40.51%, #EC5800 25.8%, #D34205 32.69%, #242024 79.81%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(63.91% 236.28% at 48.45% -40.51%, #D31D05 32.69%, #242024 79.81%)",
            filter: "blur(27px)",
          }}
        />

        <div className="relative z-10">
          <h2 className="mb-7 text-center text-3xl font-semibold uppercase tracking-[0.3em] text-[#FFDEBA] md:text-[32px]">
            Contact Us
          </h2>

          <form className="mx-auto flex max-w-[850px] flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-[30px]">
              <FooterInput type="text" placeholder="Name" />
              <FooterInput type="email" placeholder="Email address" />
            </div>

            <textarea
              placeholder="Message"
              required
              className="h-[110px] w-full resize-none rounded-[16px] border-none px-5 py-3 text-base text-[rgba(255,222,186,0.87)] outline-none transition placeholder:text-[rgba(255,222,186,0.87)] focus:ring-2 focus:ring-[#EC5800]/50"
              style={{
                background: "rgba(45, 40, 45, 0.4)",
                boxShadow: "2px 2px 1px #F78F45",
                backdropFilter: "blur(1px)",
                WebkitBackdropFilter: "blur(1px)",
              }}
            />

            <div className="mt-2 flex justify-center">
              <button
                type="submit"
                className="h-[44px] w-full max-w-[260px] rounded-[22px] border border-transparent text-xl font-medium text-[#FFDEBA] transition-all duration-200 hover:bg-[rgba(236,88,0,0.15)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95"
                style={{
                  background: "rgba(45, 40, 45, 0.15)",
                  boxShadow: "2px 2px 1px #FF9447",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
              >
                Submit now
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto mb-12 grid max-w-[1400px] gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-[30px]">
        <div>
          <div className="mb-4 flex items-center leading-none">
            <span className="text-[42px] font-semibold text-[#FFDEBA] md:text-[46px]">DANK</span>
            <Image src="/orange_logo.svg" alt="O" width={44} height={44} className="mx-[2px]" />
            <span className="text-[42px] font-semibold text-[#FFDEBA] md:text-[46px]">SS</span>
          </div>

          <p className="max-w-[360px] text-lg font-medium leading-6 tracking-[-1px] text-[#FFDEBA]">
            Give a rich person 100$ and he will make it 10000$, give a poor person 100$ and he will
            make it 0$, give us 100$, please
          </p>
        </div>

        <FooterLinkColumn title="Company" links={companyLinks} />
        <FooterLinkColumn title="Press" links={pressLinks} />

        <div>
          <h3 className="mb-5 text-[28px] font-bold leading-[34px] tracking-[2px] text-[#EC5800]">
            Contacts
          </h3>

          <div className="flex flex-col">
            {contacts.map((item, index) => (
              <div key={item.text}>
                <div className="flex items-center gap-[14px]">
                  <Bubble>
                    <Image src={item.icon} alt={item.alt} width={24} height={24} className="object-contain" />
                  </Bubble>
                  <span className="text-[15px] leading-5 text-[#FFDEBA]">{item.text}</span>
                </div>

                {index < contacts.length - 1 ? (
                  <div className="flex w-[45px] justify-center -my-[4px]">
                    <Image src="/connection.svg" alt="" width={24} height={24} className="rotate-90" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mb-5 max-w-[1400px] border-t border-[#FFDEBA]" />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[15px] text-[#FFDEBA]">2026 DANKOSS. | terms and conditions</p>

        <div className="flex items-center">
          {socials.map((social, index) => (
            <div key={social.alt} className="flex items-center">
              <SocialBubble href={social.href} iconSrc={social.iconSrc} alt={social.alt} />
              {index < socials.length - 1 ? (
                <Image src="/connection.svg" alt="" width={24} height={12} className="-mx-[4px]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterInput({ type, placeholder }: { type: string; placeholder: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required
      className="h-[40px] flex-1 rounded-[16px] border-none px-5 text-base text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50"
      style={{
        background: "rgba(45, 40, 45, 0.4)",
        boxShadow: "2px 2px 1px #F78F45",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    />
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-5 text-[28px] font-bold leading-[34px] tracking-[2px] text-[#EC5800]">{title}</h3>
      <ul className="m-0 list-none p-0">
        {links.map((item) => (
          <li key={item} className="mb-[10px] flex items-center gap-[10px]">
            <span className="text-[22px] leading-none text-[#FFDEBA]">&bull;</span>
            <a
              href="#"
              className="text-[20px] font-medium leading-[30px] tracking-[-1px] text-[#FFDEBA] transition-colors duration-200 hover:text-[#EC5800]"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[rgba(90,80,90,0.7)] backdrop-blur-[4px] transition-colors duration-200 hover:text-[#EC5800]">
      {children}
    </div>
  );
}

function SocialBubble({ href, iconSrc, alt }: { href: string; iconSrc: string; alt: string }) {
  return (
    <a
      href={href}
      className="group relative z-10 flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[rgba(90,80,90,0.7)] backdrop-blur-[4px] transition-all duration-300 hover:h-[50px] hover:w-[50px] hover:rotate-[0.19deg] hover:bg-[#EC5800]"
    >
      <Image
        src={iconSrc}
        alt={alt}
        width={32}
        height={32}
        className="object-contain transition-all duration-300 group-hover:h-[35px] group-hover:w-[35px]"
      />
    </a>
  );
}
