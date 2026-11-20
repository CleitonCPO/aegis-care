import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Testimonial = {
  name: string;
  text: string[];
};

const testimonials: Testimonial[] = [
  {
    name: "Daniela Trivelli",
    text: [
      "Desde o primeiro contato com a empresa até a contratação da Cuidadora não tive problemas. O enfermeiro Cleiton muito gentil e educado, selecionou uma cuidadora para a minha mãe auxiliá-la no dia do meu casamento. Que profissional maravilhosa que nos atendeu, foi carinhosa, atenciosa, educada, parecida com a família.",
    ],
  },
  {
    name: "Janete Bolgheroni",
    text: [
      "Foi uma boa experiência, solicitei uma profissional e fui atendida prontamente. A cuidadora indicada foi ótima, educada, pontual e atenciosa.",
    ],
  },
  {
    name: "Michele Valejo",
    text: [
      "Empresa muito atenciosa. Demonstrou atenção com o paciente e familiares e superou nossas expectativas. Recomendo os serviços.",
    ],
  },
  {
    name: "Lorena Dias",
    text: ["A Aegis Care trouxe leveza e tranquilidade para nossa casa. Meu pai voltou a sorrir."],
  },
  {
    name: "Ana Paula Martins",
    text: [
      "Contratamos a Aegis Care para acompanhar meu pai em casa e a experiência foi muito positiva. O cuidado foi bem organizado, com atenção aos detalhes e boa comunicação com a família.",
    ],
  },
  {
    name: "Mariana Costa Ferreira",
    text: [
      "O que diferencia a Aegis Care é o lado humano. Liguei chorando no primeiro contato. A Bruna me ouviu, me acalmou e explicou como poderiam nos ajudar. Hoje meu pai tem qualidade de vida e nós, paz no coração.",
    ],
  },
  {
    name: "Sandra Regina Oliveira",
    text: [
      "Meu sogro é bem difícil de lidar, mas a equipe da Aegis Care foi paciente desde o primeiro dia. Hoje ele até espera ansioso pelos dias de atendimento. Somos muito gratos.",
    ],
  },
  {
    name: "Eduardo Santana Lima",
    text: [
      "Estava receoso em contratar cuidadores para minha avó, mas o acolhimento que recebemos foi surpreendente. Me senti amparado do início ao fim.",
    ],
  },
  {
    name: "Marina Albuquerque",
    text: [
      "Quando meu pai sofreu um AVC, nossa rotina virou de cabeça para baixo. Foi um tempo bem complicado, com muitas apreensões e escolhas que, às vezes, não tínhamos ideia de como fazer.",
      "Tivemos contato com a Aegis Care e nossa experiência foi excelente. O Cleiton esteve sempre muito atento à situação do meu pai, nos guiando, esclarecendo dúvidas e nos ajudando a compreender o que seria o ideal em cada etapa. A Bruna também foi fundamental na organização dos cuidadores. Mesmo diante de imprevistos, ela sempre encontrava soluções e nunca ficamos desassistidos.",
      "Meu pai começou a apresentar progressos na mobilidade, na fala e chegou até a dispensar o uso da sonda. Observar essa melhora trouxe uma felicidade imensa para todos nós.",
      "O suporte durante os períodos de internação também foi um diferencial enorme. O Cleiton nos aconselhava sobre como abordar a equipe médica e quais dados eram cruciais para compartilhar. Isso nos trouxe muita confiança.",
      "Atualmente, o que posso afirmar é que encontramos indivíduos que genuinamente estiveram ao lado da nossa família. Não se tratou apenas de contratar um profissional para cuidar do meu pai. Recebemos auxílio, direcionamento e cuidado durante toda essa jornada.",
      "Minha gratidão é imensa ao Cleiton, à Bruna e a todos da equipe da Aegis Care.",
    ],
  },
];

// Relatos mais longos aparecem resumidos no cartão e por inteiro na janela aberta pelo leitor.
const isLong = (t: Testimonial) => t.text.length > 1 || t.text.join(" ").length > 500;

const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [openReading, setOpenReading] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplay = useRef(Autoplay({ delay: 8000, playOnInit: false, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true }));
  const resumeTimer = useRef<number>(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    if (media.addEventListener) media.addEventListener("change", syncMotion);
    else media.addListener(syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    const section = sectionRef.current;
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 }) : null;
    if (section && observer) observer.observe(section);
    else setInView(true);
    return () => {
      observer?.disconnect();
      if (media.removeEventListener) media.removeEventListener("change", syncMotion);
      else media.removeListener(syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const player = autoplay.current;
    if (inView && pageVisible && !reducedMotion && !paused && openReading === null) player.play();
    else player.stop();
    return () => player.stop();
  }, [api, inView, pageVisible, reducedMotion, paused, openReading]);

  // Um toque pausa a leitura, mas a rolagem retoma sozinha depois de um tempo de descanso.
  const pauseForReading = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 12000);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("pointerDown", pauseForReading);
    return () => {
      api.off("pointerDown", pauseForReading);
      window.clearTimeout(resumeTimer.current);
    };
  }, [api, pauseForReading]);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const openFull = (index: number) => {
    window.clearTimeout(resumeTimer.current);
    setPaused(true);
    autoplay.current.stop();
    setOpenReading(index);
  };

  const reading = openReading === null ? null : testimonials[openReading];

  return (
    <section ref={sectionRef} id="depoimentos" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container-editorial">
        <div className="max-w-3xl mb-12">
          <span className="eyebrow mb-6 block">Famílias atendidas</span>
          <h2 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl leading-[1.1] text-foreground">
            Relatos das Famílias
          </h2>
        </div>

        <Carousel opts={{ align: "start", loop: true, duration: reducedMotion ? 0 : 60 }} plugins={[autoplay.current]} setApi={setApi} className="w-full" aria-label="Relatos das famílias" onMouseEnter={() => autoplay.current.stop()} onMouseLeave={() => { if (!paused && !reducedMotion && inView && pageVisible && openReading === null) autoplay.current.play(); }} onFocusCapture={() => autoplay.current.stop()}>
          <CarouselContent className="-ml-6 md:-ml-10" aria-live={paused || reducedMotion ? "polite" : "off"}>
            {testimonials.map((t, index) => {
              const long = isLong(t);
              return (
                <CarouselItem key={index} className="pl-6 md:pl-10 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                  <figure className="flex flex-col h-full border-t border-border pt-10">
                    <span className="font-display text-5xl text-[hsl(var(--gold))] leading-none mb-6">"</span>
                    <div className="relative flex-grow">
                      <blockquote
                        className={`font-display text-lg md:text-xl text-foreground leading-[1.5] ${long ? "max-h-[11.5rem] overflow-hidden" : ""}`}
                        style={long ? { WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent)", maskImage: "linear-gradient(to bottom, #000 72%, transparent)" } : undefined}
                      >
                        {t.text.map((paragraph, pIndex) => (
                          <p key={pIndex} className={pIndex > 0 ? "mt-4" : undefined}>{paragraph}</p>
                        ))}
                      </blockquote>
                      {long && (
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => openFull(index)}
                          className="absolute bottom-0 left-0 h-auto p-0 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--teal-deep))]"
                        >
                          Ler relato completo
                        </Button>
                      )}
                    </div>
                    <figcaption className="text-xs tracking-[0.25em] uppercase text-[hsl(var(--teal-deep))] font-semibold mt-8">
                      {t.name}
                    </figcaption>
                  </figure>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex justify-center gap-1 mt-8" aria-label="Navegação dos relatos">
            {Array.from({ length: snapCount }, (_, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Ir para o relato ${index + 1}`}
                aria-current={selected === index ? "true" : undefined}
                onClick={() => { pauseForReading(); api?.scrollTo(index); }}
                className="h-11 w-8"
              >
                <span className={`block h-1.5 rounded-full transition-all ${selected === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground"}`} />
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-11 w-11 ml-2"
              aria-label={paused || reducedMotion ? "Reproduzir relatos" : "Pausar relatos"}
              title={reducedMotion ? "Movimento reduzido ativado" : paused ? "Reproduzir relatos" : "Pausar relatos"}
              disabled={reducedMotion}
              onClick={() => { window.clearTimeout(resumeTimer.current); setPaused((value) => !value); }}
            >
              {paused || reducedMotion ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          </div>
        </Carousel>
      </div>

      <Dialog open={openReading !== null} onOpenChange={(value) => { if (!value) setOpenReading(null); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background">
          {reading && (
            <>
              <DialogDescription className="sr-only">
                Relato completo de {reading.name} sobre o atendimento da Aegis Care.
              </DialogDescription>
              <span className="font-display text-5xl text-[hsl(var(--gold))] leading-none" aria-hidden="true">"</span>
              <DialogTitle className="font-display text-2xl md:text-3xl text-foreground leading-[1.2] mt-2">
                {reading.name}
              </DialogTitle>
              <div className="mt-6 space-y-5">
                {reading.text.map((paragraph, pIndex) => (
                  <p key={pIndex} className="font-display text-base md:text-lg text-foreground leading-[1.6]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialsSection;
