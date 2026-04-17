/**
 * @file Footer.tsx
 * @description Global footer component rendering contact info, form, and legal links.
 */

"use client";

import Image from "next/image";
import { ChainIcon, Connection } from "@/components/ui/IconUI";

const companyLinks = ["About Us", "How it works", "Partners"];
const supportLinks = ["FAQ", "Privacy Policy", "Cookie Policy"];
const contacts = [
  {
    icon: "/phone.svg",
    alt: "Phone",
    text: "084524145547",
    href: "tel:084524145547",
    tooltip: "Call us",
  },
  {
    icon: "/email.svg",
    alt: "Email",
    text: "arshakir132@gmail.com",
    href: "mailto:arshakir132@gmail.com?subject=Питання%20з%20сайту",
    tooltip: "Send email",
  },
  {
    icon: "/location.svg",
    alt: "Location",
    text: "Kyiv, Ukraine",
    href: "https://maps.google.com/?q=Kyiv, Ukraine",
    tooltip: "Open map",
  },
];
const socials = [
  { href: "#", iconSrc: "/github.svg", alt: "GitHub" },
  { href: "#", iconSrc: "/instagram.svg", alt: "Instagram" },
  { href: "#", iconSrc: "/telegram.svg", alt: "Telegram" },
  { href: "#", iconSrc: "/linkedin.svg", alt: "LinkedIn" },
  { href: "#", iconSrc: "/whatsapp.svg", alt: "WhatsApp" },
  { href: "#", iconSrc: "/x.svg", alt: "X" },
];

/**
 * @description Renders the application's footer section.
 * Incorporates a prominent contact form, dynamic link columns for company info and support,
 * visual branding elements, direct contact items (email/phone/location), and social media integrations.
 * @returns {JSX.Element} The completely assembled footer component.
 */
export default function Footer() {
  return (
    <footer className="bg-[#1E1B1E] px-6 pb-6 pt-10 text-[#FFDEBA] lg:px-12">
      
      <div
        className="relative mx-auto mb-14 w-full overflow-hidden rounded-[45px] border border-[#3A2216] px-6 py-8 shadow-soft md:px-10 lg:px-[60px] lg:pb-10 lg:pt-9"
        style={{
          background: "linear-gradient(180deg, #1A171A 0%, #100E10 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -bottom-[40%] -left-[20%] -top-[40%] w-[40%] z-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, #EC5800 2%, #D34205 25%, transparent 85%)",
            filter: "blur(90px)",
            opacity: 0.7,
          }}
        />

        <div
          className="pointer-events-none absolute -bottom-[40%] -right-[20%] -top-[40%] w-[40%] z-0 rounded-full"
          style={{
            background: "radial-gradient(circle at center, #EC5800 2%, #D34205 25%, transparent 85%)",
            filter: "blur(90px)",
            opacity: 0.7,
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
              className="h-[110px] w-full resize-none rounded-[16px] border-none px-5 py-3 text-base text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50"
              style={{
                background: "rgba(45, 40, 45, 0.4)",
                boxShadow: "2px 2px 1px #EC5800",
                backdropFilter: "blur(1px)",
                WebkitBackdropFilter: "blur(1px)",
              }}
            />

            <div className="mt-2 flex justify-center">
            <button
              type="submit"
              className="group relative flex h-[44px] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-[22px] border border-transparent text-xl font-medium text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95"
              style={{
                background: "rgba(45, 40, 45, 0.4)",
                backdropFilter: "blur(25px)",
                WebkitBackdropFilter: "blur(25px)",
              }}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                Submit now
              </span>
              <div className="absolute -left-[150%] bottom-0 top-0 z-0 flex w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                <div className="h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[rgba(255,222,186,0.25)] to-transparent" />
              </div>
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
        <FooterLinkColumn title="Support & Legal" links={supportLinks} />

        <div>
          <h3 className="mb-5 text-[28px] font-bold leading-[34px] tracking-[2px] text-[#EC5800]">
            Contacts
          </h3>

          <div className="flex flex-col items-start">
            {contacts.map((item, index) => (
              <div key={item.text} className="flex flex-col items-start">
                
                <div className="flex items-center gap-[16px]">
                  <div className="group relative z-10 hover:z-50">
                    <a href={item.href}>
                      <ChainIcon>
                        <Image src={item.icon} alt={item.alt} width={22} height={22} />
                      </ChainIcon>
                    </a>

                    <span className="pointer-events-none absolute z-50 left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1A181C] px-3 py-1 text-xs text-[#FFDEBA] opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-1 scale-95 group-hover:scale-100">
                      {item.tooltip}
                    </span>
                  </div>

                  <span className="text-[15px] leading-5 text-[#FFDEBA]">
                    {item.text}
                  </span>
                </div>

                {index < contacts.length - 1 && (
                  <div className="flex w-[42px] justify-center my-[-6px] relative z-0">
                    <Connection vertical />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mb-5 max-w-[1400px] border-t border-[#FFDEBA]" />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[15px] text-[#FFDEBA]">© 2026 DANKOSS. | terms and conditions</p>

        <div className="group flex items-center">
          {socials.map((social, index) => (
            <div key={social.alt} className="flex items-center">
              <a href={social.href}>
                <ChainIcon>
                  <Image src={social.iconSrc} alt={social.alt} width={28} height={28} />
                </ChainIcon>
              </a>

              {index < socials.length - 1 ? <Connection /> : null}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

/**
 * @description Reusable text input component scoped for the footer contact form.
 * @param {Object} props - The component props.
 * @param {string} props.type - The HTML input type attribute (e.g., "text", "email").
 * @param {string} props.placeholder - The placeholder text to display in the input.
 * @returns {JSX.Element} A pre-styled input element.
 */
function FooterInput({ type, placeholder }: { type: string; placeholder: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required
      className="h-[40px] flex-1 rounded-[16px] border-none px-5 text-base text-[#FFDEBA] outline-none transition placeholder:text-[#FFDEBA]/70 focus:ring-2 focus:ring-[#EC5800]/50"
      style={{
        background: "rgba(45, 40, 45, 0.4)",
        boxShadow: "2px 2px 1px #EC5800",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    />
  );
}

/**
 * @description Renders a column grouping of text links for the footer layout.
 * @param {Object} props - The component props.
 * @param {string} props.title - The heading text to display above the list of links.
 * @param {string[]} props.links - An array of link label strings.
 * @returns {JSX.Element} A stylized unordered list acting as a footer column.
 */
function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-5 text-[28px] font-bold leading-[34px] tracking-[2px] text-[#EC5800]">{title}</h3>
      <ul className="m-0 list-none p-0">
        {links.map((item) => (
          <li key={item} className="mb-[10px] flex items-center gap-[10px]">
            <span className="text-[22px] leading-none text-[#FFDEBA]">•</span>
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