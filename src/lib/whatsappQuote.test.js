import { describe, expect, test } from "bun:test";
import { quoteUrl } from "./whatsappQuote";
import { serviceOverview } from "../data/serviceOverview";

describe("Botão de orçamento por serviço", () => {
  test("abre o WhatsApp da Aegis com o telefone oficial", () => {
    expect(quoteUrl("Cuidador domiciliar")).toMatch(
      /^https:\/\/api\.whatsapp\.com\/send\/\?phone=5511920067183&text=/
    );
  });

  test("cada serviço da página de serviços identifica o serviço na mensagem", () => {
    for (const service of serviceOverview) {
      expect(decodeURIComponent(quoteUrl(service.title))).toContain(service.title);
    }
  });

  test("não publica preço na mensagem de orçamento", () => {
    expect(quoteUrl("Acompanhamento em internações")).not.toMatch(/R\$/);
  });
});
