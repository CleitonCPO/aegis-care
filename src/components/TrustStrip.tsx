const guarantees = [
  { title: "Supervisão de enfermagem", text: "Equipe de enfermagem acompanha cada plano de cuidado." },
  { title: "Substituição garantida", text: "Faltas e imprevistos cobertos sem deixar a família sozinha." },
  { title: "Relatórios para a família", text: "Notícias da rotina e da evolução direto no WhatsApp." },
  { title: "Segurança na contratação", text: "Cuidadores contratados pela empresa, sem vínculo para a família." },
];

const TrustStrip = () => (
  <section aria-label="Garantias da Aegis Care" className="border-b border-border bg-background py-12 md:py-14">
    <div className="container-editorial grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {guarantees.map((item, index) => (
        <div key={item.title} className="border-l-2 border-[hsl(var(--gold))] pl-5">
          <span className="block text-xs text-[hsl(var(--teal-deep))] mb-2 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="font-display text-lg text-foreground leading-snug mb-2">{item.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
