import { FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/FadeInView";

interface RecrutementStep {
  num?: string;
  icon?: string;
  title: string;
  description: string;
}

interface RejoindreProcessProps {
  sectionTag?: string;
  title?: string;
  titleHighlight?: string;
  titleEnd?: string;
  etapes?: RecrutementStep[] | null;
}

export function RejoindreProcess({
  sectionTag,
  title,
  titleHighlight,
  titleEnd,
  etapes,
}: RejoindreProcessProps) {
  if (!etapes || etapes.length === 0) return null;

  return (
    <section className="w-full py-24 bg-[#ecf4f6]">
      <div className="container mx-auto px-4 md:px-6 max-w-8xl">
        <FadeInView className="text-center mb-16">
          {sectionTag && (
            <p className="text-teal-400 font-bold text-xs tracking-[3px] uppercase mb-4">{sectionTag}</p>
          )}
          <h2 className="text-3xl md:text-[38px] font-extrabold text-[#1C3553] mb-6 md:leading-[45.6px] font-poppins text-center">
            {title}{" "}
            {titleHighlight && (
              <span className="text-[#4ECDC4] font-poppins not-italic font-extrabold text-3xl md:text-[38px]">
                {titleHighlight}
              </span>
            )}
            {titleEnd && <span>{titleEnd}</span>}
          </h2>
        </FadeInView>
        <StaggerContainer stagger={0.12} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
          {etapes.map((step, i) => {
            const hasIcon = step.icon && step.icon !== "";

            return (
              <StaggerItem key={i} className="flex flex-col items-center text-center px-4">
                <div className={`w-[60px] h-[60px] rounded-[30px] ${i === 0 ? "border border-teal-400" : "bg-white border-2 border-teal-400 shadow-sm"} flex items-center justify-center mb-4`}>
                  {hasIcon ? (
                    <span className="text-[24px]">
                      {step.icon?.startsWith("/") ? (
                        <img src={step.icon} alt="" className="w-7 h-7 object-contain" />
                      ) : (
                        <span>{step.icon}</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-[22px] font-extrabold text-teal-400">{step.num || (i + 1).toString()}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-600">{step.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
