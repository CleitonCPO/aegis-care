import HomeQuoteButton from "@/components/HomeQuoteButton";

const steps = [
  { title: "Conversa inicial", text: "Você conta a situação pelo WhatsApp e a coordenação orienta os primeiros passos." },
  { title: "Avaliação de enfermagem", text: "A enfermagem entende as necessidades do idoso e define o plano de cuidado." },
  { title: "Cuidador ideal", text: "Indicamos o cuidador com perfil e experiência para o caso do seu familiar." },
  { title: "Acompanhamento contínuo", text: "Supervisão de enfermagem e relatórios para a família durante todo o cuidado." },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-16 md:py-24 bg-[hsl(var(--care-surface))]">
    <div className="container-editorial">
      <div className="max-w-3xl mb-10 md:mb-14">
        <span className="eyebrow mb-6 block">Como funciona</span>
        <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground">
          Do primeiro contato ao cuidado em casa, em quatro passos
        </h2>
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <li key={s.title} className="border-t-2 border-[hsl(var(--teal-deep))] pt-6">
            <span className="font-display text-3xl text-[hsl(var(--gold))] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-xl text-foreground mt-3 mb-3">{s.title}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10"><HomeQuoteButton /></div>
    </div>
  </section>
);

export default HowItWorksSection;
