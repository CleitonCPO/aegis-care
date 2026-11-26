import { Link } from "react-router-dom";
import HomeQuoteButton from "@/components/HomeQuoteButton";

const services = [
  { title: "Cuidador domiciliar", text: "Cuidadores selecionados para higiene, alimentação, mobilidade, medicação e companhia no conforto do lar.", to: "/servicos" },
  { title: "Acompanhamento em internações", text: "Presença atenta no hospital e apoio seguro na volta para casa após a alta.", to: "/servicos" },
  { title: "Acompanhamento em consultas e exames", text: "Transporte, acolhimento e registro das orientações médicas para a família.", to: "/servicos" },
  { title: "Acompanhamento em viagens", text: "Cuidado contínuo para que seu familiar viaje com segurança e tranquilidade.", to: "/servicos" },
];

const ServicesSection = () => (
  <section id="servicos" className="py-16 md:py-24 bg-background">
    <div className="container-editorial">
      <div className="max-w-3xl mb-10 md:mb-14">
        <span className="eyebrow mb-6 block">Nossos serviços</span>
        <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground mb-6">
          Onde seu familiar precisar, a Aegis Care está presente
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <article key={s.title} className="border border-border rounded-sm p-8 flex flex-col">
            <h3 className="font-display text-2xl text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-[1.8] mb-6 flex-1">{s.text}</p>
            <HomeQuoteButton service={s.title} />
          </article>
        ))}
      </div>
      <Link to="/servicos" className="inline-flex mt-10 border-b border-[hsl(var(--gold))] pb-1 text-foreground font-medium hover:text-[hsl(var(--teal-deep))] transition-colors">Conheça Nossos Serviços</Link>
    </div>
  </section>
);

export default ServicesSection;
