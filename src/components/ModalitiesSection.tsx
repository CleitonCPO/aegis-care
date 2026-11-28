import HomeQuoteButton from "@/components/HomeQuoteButton";

const fronts = [
  {
    label: "Idosos",
    title: "Seu pai ou sua mãe precisa de mais cuidado",
    text: "Quedas, esquecimentos, Alzheimer, Parkinson, fragilidade ou a volta para casa depois de uma internação. Um cuidador preparado devolve a segurança à rotina e a tranquilidade à família.",
    service: "cuidador de idosos",
  },
  {
    label: "Adultos",
    title: "Um adulto da família precisa de apoio para se recuperar",
    text: "AVC, acidentes, cirurgias, tratamento de câncer, esclerose múltipla ou reabilitação. Cuidadores acompanham a recuperação com paciência, respeito e atenção a cada detalhe.",
    service: "cuidador para adultos",
  },
];

const ModalitiesSection = () => (
  <section id="modalidades" className="py-16 md:py-24 bg-[hsl(var(--care-surface))]">
    <div className="container-editorial">
      <div className="max-w-3xl mb-10 md:mb-14">
        <span className="eyebrow mb-6 block">Para quem cuidamos</span>
        <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground mb-6">
          Quando a rotina muda de repente, a família precisa de alguém de confiança
        </h2>
        <p className="text-lg text-muted-foreground leading-[1.8] prose-justified">
          Cuidamos de idosos e de adultos, em casa ou no hospital, com início rápido para altas hospitalares e urgências.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {fronts.map((f) => (
          <article key={f.label} className="bg-background rounded-sm p-8 md:p-10 shadow-soft border border-border flex flex-col">
            <span className="text-[0.7rem] tracking-[0.32em] uppercase font-medium text-[hsl(var(--teal-deep))]">{f.label}</span>
            <h3 className="font-display text-2xl md:text-[1.75rem] leading-snug text-foreground mt-4 mb-4">{f.title}</h3>
            <p className="text-muted-foreground leading-[1.8] mb-8 flex-1 prose-justified">{f.text}</p>
            <HomeQuoteButton service={f.service} />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ModalitiesSection;
