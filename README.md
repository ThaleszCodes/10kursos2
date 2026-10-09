<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ReZW3XPUjGeDjOpfjzygRaYGXReinSf_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Medição de visitas e de vendas

### 1. Vercel Analytics (visitas à LP e cliques nos botões)

O componente `<Analytics />` já está instalado na aplicação. Na Vercel, abra o projeto → **Analytics** e habilite Web Analytics, depois faça o deploy desta branch após a revisão. O evento personalizado `checkout_click` registra a oferta (`principal`, `media` ou `alta`) e a posição do botão (`hero`, `offer` ou `final`).

**Atenção:** um clique de CTA não é uma venda nem significa que o checkout foi iniciado.

### 2. Meta Pixel (visita à LP e interação com o CTA)

1. Em [Gerenciador de Eventos](https://business.facebook.com/events_manager2/), escolha a fonte de dados do site e copie o **ID numérico do Pixel**.
2. Na Vercel, abra **Project → Settings → Environment Variables** e adicione:
   - Nome: `VITE_META_PIXEL_ID`
   - Valor: o ID numérico do Pixel, sem espaços
   - Ambiente: Production (e Preview, se for testar em deploy de pré-visualização)
3. Faça um novo deploy para injetar o ID no bundle Vite.
4. Abra a LP e aceite os cookies de marketing. Só então o script da Meta é carregado e o evento `PageView` é enviado.
5. Clicar em um CTA pode enviar o evento personalizado `CheckoutClick`. Ele **não** envia `InitiateCheckout` nem `Purchase`.

O controle de privacidade apresenta **Aceitar/Recusar** e inclui um link para reabrir preferências no rodapé. Se a variável não estiver definida, o Pixel fica desativado e o banner não aparece.

### 3. Kiwify (checkout aberto e compra aprovada)

No painel da Kiwify: **Produtos → escolha o produto → Configurações → Pixels de conversão → Facebook/Meta**. Cadastre o mesmo ID em cada produto pertinente às três ofertas. Confira também o domínio selecionado na integração.

A Kiwify dispara `InitiateCheckout` quando o checkout é aberto e `Purchase` quando a compra é aprovada. **Não** habilite disparo de `Purchase` apenas por gerar PIX/boleto se o objetivo for medir somente pagamentos reais.

### 4. Verificação antes de anunciar

- Vercel Analytics: abrir a LP publicada e conferir visitas.
- Gerenciador de Eventos da Meta → **Testar eventos**: consentir na LP e procurar `PageView`.
- Clicar em um botão e procurar `CheckoutClick` na Meta e `checkout_click` no Analytics.
- Acessar o checkout da Kiwify e procurar `InitiateCheckout`.
- Confirmar `Purchase` apenas a partir de uma transação real aprovada, sem simular compras.
- Antes de ativar campanhas, conferir a política de privacidade e divulgar as condições reais da oferta.

**Não coloque o ID do Pixel diretamente nos arquivos de código da branch principal:** use a variável de ambiente da Vercel.
