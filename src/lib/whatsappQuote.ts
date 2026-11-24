const WHATSAPP_PHONE = "5511920067183";

/**
 * Link direto de orçamento no WhatsApp, identificando o serviço desejado.
 * A região Minas Gerais é tratada por `useWhatsAppLink`, que substitui o destino.
 */
export const quoteUrl = (service: string) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    `Olá Aegis Care, gostaria de um orçamento para o serviço de ${service}.`
  )}&type=phone_number&app_absent=0`;
