import HomeQuoteButton from "@/components/HomeQuoteButton";

const modalities = [
  { hours: "4h", title: "Apoio pontual", text: "Banho, refeições, medicação e companhia nos horários mais delicados do dia." },
  { hours: "12h", title: "Diurno ou noturno", text: "Rotina completa de dia ou noites tranquilas, com a família descansando." },
  { hours: "24h", title: "Cuidado integral", text: "Escala contínua para quem precisa de presença e atenção o tempo todo." },
  { hours: "Já", title: "Altas e urgências", text: "Início rápido para alta hospitalar, piora súbita ou falta inesperada de cuidador." },
];

const ModalitiesSection = () => (
  <section id="modalidades" className="py-16 md:py-24 bg-[hsl(var(--care-surface))]">
    <div className="container-editorial">
      <div className="max-w-3xl mb-10 md:mb-14">
        <span className="eyebrow mb-6 block">Modalidades de cuidado</span>
        <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground mb-6">
          A escala certa para a necessidade da sua família
        </h2>
        <p className="text-lg text-muted-foreground leading-[1.8] prose-justified">
          Plantões de 4h, 8h, 12h ou 24h, de dia e de noite, sempre com supervisão de enfermagem.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modalities.map((m) => (
          <div key={m.title} className="bg-background rounded-sm p-7 shadow-soft border border-border">
            <span className="font-display text-4xl text-[hsl(var(--teal-deep))]">{m.hours}</span>
            <h3 className="font-display text-xl text-foreground mt-4 mb-3">{m.title}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10"><HomeQuoteButton service="plantão de cuidador de idosos" /></div>
    </div>
  </section>
);

export default ModalitiesSection;
