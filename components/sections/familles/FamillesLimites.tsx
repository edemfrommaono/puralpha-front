import { ThumbsUp, ThumbsDown } from "lucide-react";
import { FadeInView } from "@/components/ui/FadeInView";

interface FamillesLimitesProps {
  title: string;
  titleHighlight: string;
  ceQueNousFaisons: readonly { text: string }[];
  ceQueNousNeFaisonsPas: readonly { text: string }[];
}

export function FamillesLimites({
  title,
  titleHighlight,
  ceQueNousFaisons,
  ceQueNousNeFaisonsPas,
}: FamillesLimitesProps) {
  if (
    !title &&
    !titleHighlight &&
    (!ceQueNousFaisons || ceQueNousFaisons.length === 0) &&
    (!ceQueNousNeFaisonsPas || ceQueNousNeFaisonsPas.length === 0)
  ) {
    return null;
  }

  return (
    <section className="py-8 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Titre */}
        <FadeInView>
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-800">
              {title}{" "}
              <br className="hidden lg:block" />
              <span className="text-gold-500">{titleHighlight}</span>
            </h2>
          </div>
        </FadeInView>

        {/* Cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

          {/* CE QUE NOUS FAISONS */}
          <FadeInView direction="left" delay={0.1}>
            <div className="rounded-2xl overflow-hidden">
              {/* Icône flottante au-dessus */}
              <div className="flex justify-center -mb-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center border-4 border-[#202F53]">
                  {/* Pouce levé inline SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path d="M12.8572 15.2677C12.8572 14.6706 13.2286 14.1363 13.7679 13.882C14.9457 13.3263 16.9522 12.2099 17.8572 10.7006C19.0236 8.75486 19.2436 5.23986 19.2793 4.43486C19.2843 4.322 19.2815 4.20914 19.2965 4.09771C19.49 2.70271 22.1822 4.332 23.2143 6.05486C23.775 6.98914 23.8465 8.217 23.7879 9.17629C23.7243 10.202 23.4236 11.1927 23.1286 12.177L22.5 14.2749H30.255C30.4758 14.2748 30.6935 14.326 30.8911 14.4242C31.0888 14.5225 31.2609 14.6652 31.3942 14.8412C31.5274 15.0172 31.618 15.2217 31.6589 15.4385C31.6999 15.6554 31.69 15.8789 31.63 16.0913L27.7943 29.6741C27.7096 29.9737 27.5294 30.2374 27.2811 30.4252C27.0328 30.6129 26.7299 30.7144 26.4186 30.7141H14.2857C13.9069 30.7141 13.5435 30.5636 13.2756 30.2957C13.0077 30.0278 12.8572 29.6645 12.8572 29.2856V15.2677Z" fill="#202F53" stroke="#202F53" strokeWidth="2.85714" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.99217 15.8378C2.97505 15.6405 2.99911 15.4419 3.06283 15.2544C3.12655 15.067 3.22854 14.8948 3.36233 14.7489C3.49612 14.6029 3.65878 14.4864 3.84 14.4066C4.02122 14.3269 4.21704 14.2857 4.41503 14.2856H7.14289C7.52177 14.2856 7.88513 14.4362 8.15304 14.7041C8.42095 14.972 8.57146 15.3353 8.57146 15.7142V22.4999V29.2856C8.57146 29.6645 8.42095 30.0279 8.15304 30.2958C7.88513 30.5637 7.52177 30.7142 7.14289 30.7142H5.59574C5.23819 30.7143 4.89361 30.5803 4.63004 30.3387C4.36648 30.0971 4.2031 29.7654 4.17217 29.4092L2.99217 15.8378Z" fill="#F2C94C" stroke="#F2C94C" strokeWidth="2.85714" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {/* Header */}
              <div className="bg-navy-800 text-white text-center py-4 px-6 rounded-2xl">
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  Ce que nous faisons
                </h3>
              </div>
              {/* Body */}
              <div className="bg-[#B2DCDD] p-6 lg:p-8 rounded-2xl">
                <ul className="flex flex-col gap-3">
                  {ceQueNousFaisons.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl px-4 py-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-navy-800 shrink-0 mt-1.5" />
                      <span className="text-navy-800 text-sm leading-relaxed font-semibold">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInView>

          {/* CE QUE NOUS NE FAISONS PAS */}
          <FadeInView direction="right" delay={0.15}>
            <div className="rounded-2xl overflow-hidden">
              {/* Icône flottante au-dessus */}
              <div className="flex justify-center -mb-3 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center border-4 border-[#202F53]">
                  {/* Pouce baissé inline SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path d="M12.8572 19.018C12.8572 19.6151 13.2286 20.1494 13.7679 20.4037C14.9457 20.9594 16.9522 22.0759 17.8572 23.5851C19.0236 25.5309 19.2436 29.0459 19.2793 29.8509C19.2843 29.9637 19.2815 30.0766 19.2965 30.188C19.49 31.583 22.1822 29.9537 23.2143 28.2309C23.775 27.2966 23.8465 26.0687 23.7879 25.1094C23.7243 24.0837 23.4236 23.093 23.1286 22.1087L22.5 20.0109H30.255C30.4758 20.0109 30.6935 19.9597 30.8911 19.8615C31.0888 19.7632 31.2609 19.6205 31.3942 19.4445C31.5274 19.2685 31.618 19.0641 31.6589 18.8472C31.6999 18.6303 31.69 18.4069 31.63 18.1944L27.7943 4.61157C27.7096 4.312 27.5294 4.04829 27.2811 3.86056C27.0328 3.67282 26.7299 3.57135 26.4186 3.57157H14.2857C13.9069 3.57157 13.5435 3.72208 13.2756 3.98999C13.0077 4.2579 12.8572 4.62126 12.8572 5.00014V19.018Z" fill="#202F53" stroke="#202F53" strokeWidth="2.85714" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.99217 18.4479C2.97505 18.6452 2.99911 18.8438 3.06283 19.0313C3.12655 19.2187 3.22854 19.3909 3.36233 19.5368C3.49612 19.6828 3.65878 19.7993 3.84 19.8791C4.02122 19.9588 4.21704 20 4.41503 20.0001H7.14289C7.52177 20.0001 7.88513 19.8496 8.15304 19.5816C8.42095 19.3137 8.57146 18.9504 8.57146 18.5715V11.7858V5.00007C8.57146 4.62119 8.42095 4.25782 8.15304 3.98992C7.88513 3.72201 7.52177 3.5715 7.14289 3.5715H5.59574C5.23819 3.57141 4.89361 3.7054 4.63004 3.94701C4.36648 4.18863 4.2031 4.52029 4.17217 4.8765L2.99217 18.4479Z" fill="#F2C94C" stroke="#F2C94C" strokeWidth="2.85714" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {/* Header */}
              <div className="bg-navy-800 text-white text-center py-4 px-6 rounded-2xl">
                <h3 className="text-xs font-bold tracking-widest uppercase">
                  Ce que nous ne faisons pas
                </h3>
              </div>
              {/* Body */}
              <div className="bg-[#B2DCDD] p-6 lg:p-8 rounded-2xl">
                <ul className="flex flex-col gap-3">
                  {ceQueNousNeFaisonsPas.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl px-4 py-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-navy-800 shrink-0 mt-1.5" />
                      <span className="text-navy-800 text-sm font-semibold leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  );
}
