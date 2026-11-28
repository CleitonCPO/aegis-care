import { Button } from "@/components/ui/button";
import WhatsAppMark from "@/components/WhatsAppMark";
import { useWhatsAppLink } from "@/lib/region";
import { quoteUrl } from "@/lib/whatsappQuote";

const HomeQuoteButton = ({ service = "cuidador de idosos", className = "" }: { service?: string; className?: string }) => {
  const whatsAppLink = useWhatsAppLink();
  return (
    <a href={whatsAppLink(quoteUrl(service))} target="_blank" rel="noopener noreferrer" className={className}>
      <Button variant="whatsapp" size="lg" className="gap-2.5 w-full sm:w-auto min-h-[52px] px-8">
        <WhatsAppMark className="w-5 h-5" />
        SOLICITAR ORÇAMENTO
      </Button>
    </a>
  );
};

export default HomeQuoteButton;
