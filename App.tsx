import React, { useState, useEffect } from 'react';
import { AnimatedSection } from './components/AnimatedSection';
import { CountdownTimer } from './components/CountdownTimer';
import { MarketingIcon, DesignIcon, FinanceIcon, AestheticsIcon, CodeIcon, EnglishIcon, InfinityIcon, NoMonthlyFeeIcon, CertificateIcon, UpdatesIcon, DevicesIcon, ShieldIcon, StarIcon, PaymentIcon, EmailIcon, RocketIcon } from './components/icons';

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/yhctuZz";

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, className = '', href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block px-8 py-4 text-lg font-bold text-white uppercase transition-all duration-300 rounded-full shadow-lg transform hover:scale-105 hover:shadow-2xl ${className}`}
  >
    {children}
  </a>
);

const App: React.FC = () => {
  const [checkoutUrl, setCheckoutUrl] = useState(KIWIFY_CHECKOUT_URL);

  useEffect(() => {
    // Pega todos os parâmetros da URL da página atual (ex: ?afid=...&src=...)
    const pageParams = new URLSearchParams(window.location.search);
    const affiliateId = pageParams.get('afid');
    const sourceId = pageParams.get('src');

    // Cria um objeto URL para manipular os parâmetros do link de checkout facilmente
    const checkoutUrlObject = new URL(KIWIFY_CHECKOUT_URL);

    // Se encontrou um 'afid', adiciona ao link de checkout
    if (affiliateId) {
      checkoutUrlObject.searchParams.append('afid', affiliateId);
    }
    
    // Se encontrou um 'src', adiciona também ao link de checkout
    if (sourceId) {
      checkoutUrlObject.searchParams.append('src', sourceId);
    }

    // Atualiza o estado com a URL final (com os parâmetros, se existirem)
    setCheckoutUrl(checkoutUrlObject.toString());
  }, []);

  return (
    <div className="bg-[#0D0518] text-gray-200 overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 pt-20 pb-10 text-center bg-gradient-to-br from-[#0D0518] via-[#1b0a37] to-[#3a1675] animate-gradient-xy overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm"></div>
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

          <header className="absolute top-0 left-0 right-0 z-20 py-6">
            <div className="container mx-auto">
              <img src="https://i.imgur.com/Chx9K9m.png" alt="ACERVO NEWGEN Logo" className="w-56 mx-auto md:w-64" />
            </div>
          </header>

          <div className="z-10 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold tracking-tighter text-transparent uppercase sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-glow">
              10 MIL CURSOS.
              <br />
              <span className="text-white">1 SÓ INVESTIMENTO.</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-300 md:text-xl">
              Aprenda qualquer coisa, quando quiser. Acesso vitalício por apenas <span className="font-bold text-white">R$29,90</span>.
            </p>
            <p className="mt-6 text-lg font-semibold text-green-400 text-glow">
              Mais de R$192.218.328,00 em cursos...
            </p>
            <div className="mt-10">
              <CTAButton href={checkoutUrl} className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 glow-shadow animate-pulse">
                QUERO O NEWGEN AGORA
              </CTAButton>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0D0518] to-transparent" />
        </section>

        {/* Showcase Section */}
        <section className="py-20 bg-[#0D0518]">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center md:text-4xl text-glow">Explore um Universo de Conhecimento</h2>
              <p className="mt-4 text-center text-gray-400">Cursos nas áreas mais procuradas do mercado.</p>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-6 mt-12 md:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: <MarketingIcon />, name: 'Marketing' },
                { icon: <DesignIcon />, name: 'Design' },
                { icon: <FinanceIcon />, name: 'Finanças' },
                { icon: <AestheticsIcon />, name: 'Estética' },
                { icon: <CodeIcon />, name: 'Programação' },
                { icon: <EnglishIcon />, name: 'Inglês' },
              ].map((category, index) => (
                <AnimatedSection key={category.name} delay={index * 0.1}>
                  <div className="p-6 text-center transition-all duration-300 transform bg-gray-900/50 border border-purple-800/50 rounded-2xl backdrop-blur-sm hover:bg-purple-900/70 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-purple-400 bg-purple-900/50 rounded-full">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <p className="mt-8 text-center text-gray-400">... e muito mais!</p>
            </AnimatedSection>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-[#10071f] to-[#0D0518]">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center md:text-4xl text-glow">Tudo o que você precisa para decolar</h2>
            </AnimatedSection>
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <InfinityIcon />, title: 'Acesso Vitalício', desc: 'Pague uma vez e acesse para sempre, sem pegadinhas.' },
                { icon: <NoMonthlyFeeIcon />, title: 'Sem Mensalidades', desc: 'Seu investimento é único. Esqueça cobranças recorrentes.' },
                { icon: <CertificateIcon />, title: 'Certificados', desc: 'Vários cursos oferecem certificados para comprovar seu conhecimento.' },
                { icon: <UpdatesIcon />, title: 'Atualizações Constantes', desc: 'Novos cursos adicionados periodicamente sem custo extra.' },
                { icon: <DevicesIcon />, title: 'Acesso Flexível', desc: 'Estude no seu ritmo, em qualquer dispositivo: celular, tablet ou PC.' },
                { icon: <ShieldIcon className="w-8 h-8"/>, title: 'Garantia de 7 Dias', desc: 'Seu risco é zero. Se não gostar, devolvemos seu dinheiro.'}
              ].map((benefit, index) => (
                <AnimatedSection key={benefit.title} delay={index * 0.1}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 text-blue-400 bg-blue-900/50 rounded-xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{benefit.title}</h3>
                      <p className="mt-1 text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        {/* Offer Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <div className="max-w-3xl p-8 mx-auto text-center border-2 border-dashed rounded-3xl border-pink-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg">
                <h3 className="text-sm font-bold tracking-widest text-pink-400 uppercase">OFERTA POR TEMPO LIMITADO</h3>
                <p className="my-4 text-4xl font-bold md:text-6xl">
                  <span className="text-gray-500 line-through">De R$79,90</span>
                  <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Por apenas R$29,90</span>
                </p>
                <p className="text-lg text-gray-300">Pagamento único, acesso para a vida toda.</p>
                <CountdownTimer />
                <div className="mt-8">
                  <CTAButton href={checkoutUrl} className="bg-gradient-to-r from-pink-600 to-purple-600 glow-shadow">
                    QUERO APROVEITAR A OFERTA
                  </CTAButton>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#0D0518]">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center md:text-4xl text-glow">Quem já entrou, recomenda</h2>
            </AnimatedSection>
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-12 md:grid-cols-2">
              {[
                { name: 'Juliana S.', text: 'Incrível! Nunca imaginei ter tanto conteúdo por um preço tão baixo. Já comecei a aplicar o que aprendi em design e meus freelas decolaram!', avatar: 'https://i.pravatar.cc/100?u=a042581f4e29026704d' },
                { name: 'Marcos P.', text: 'O melhor investimento que fiz na minha carreira. Os cursos de programação são super atualizados. O acesso vitalício é a cereja do bolo.', avatar: 'https://i.pravatar.cc/100?u=a042581f4e29026705d' },
              ].map((testimonial, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <div className="p-6 space-y-4 bg-gray-900/50 border border-purple-800/50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400">"{testimonial.text}"</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How to Receive Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center md:text-4xl text-glow">Acesso Imediato Após a Compra</h2>
              <p className="max-w-2xl mx-auto mt-4 text-center text-gray-400">É simples, rápido e seguro. Siga os passos abaixo:</p>
            </AnimatedSection>
            <div className="flex flex-col max-w-4xl gap-8 mx-auto mt-12 md:flex-row md:gap-12">
              {[
                { icon: <PaymentIcon />, title: '1. Pagamento Seguro', desc: 'Clique no botão, preencha seus dados e finalize a compra no ambiente 100% seguro da Kiwify.' },
                { icon: <EmailIcon />, title: '2. Receba Pós-Pagamento', desc: 'Assim que a plataforma da Kiwify identificar seu pagamento, você será redirecionado para a página de acesso.' },
                { icon: <RocketIcon />, title: '3. Comece a Estudar', desc: 'Acesse o nosso Acervo com mais de 10 mil cursos e receba os cursos mais pedidos da semana diariamente como bônus.' },
              ].map((step, index) => (
                <AnimatedSection key={step.title} delay={index * 0.15} className="flex-1">
                  <div className="p-6 text-center transition-all duration-300 transform bg-gray-900/50 border border-blue-800/50 rounded-2xl backdrop-blur-sm hover:bg-blue-900/70 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-400 bg-blue-900/50 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-gray-400">{step.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        {/* Guarantee Section */}
        <section className="py-10">
          <div className="container px-4 mx-auto">
            <AnimatedSection>
              <div className="flex flex-col items-center text-center md:flex-row md:text-left md:space-x-8 max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 to-transparent">
                  <div className="flex-shrink-0 text-blue-400">
                      <ShieldIcon className="w-24 h-24"/>
                  </div>
                  <div>
                      <h3 className="mt-4 text-2xl font-bold md:mt-0">Sua Satisfação ou seu Dinheiro de Volta</h3>
                      <p className="mt-2 text-gray-400">Você tem 7 dias completos para explorar o acervo. Se por qualquer motivo não ficar 100% satisfeito, basta nos enviar uma mensagem e reembolsamos seu investimento integralmente, sem burocracia.</p>
                  </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-extrabold md:text-5xl text-glow">Pronto para a Nova Geração do Conhecimento?</h2>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
                Milhares de horas de conteúdo prático estão a um clique de distância. Não perca a chance de transformar sua carreira com um investimento mínimo.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="mt-6 text-2xl font-bold text-white">Acesso Vitalício por Apenas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">R$29,90</span></p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="mt-10">
                <CTAButton href={checkoutUrl} className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 glow-shadow animate-pulse">
                  GARANTIR MEU ACESSO AGORA
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-gray-500 border-t border-purple-900/50">
          <p>&copy; {new Date().getFullYear()} ACERVO NEWGEN. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Este produto é comercializado com apoio da Kiwify. A plataforma não faz controle editorial prévio dos produtos comercializados, nem avalia a tecnicidade e experiência daqueles que os produzem.</p>
      </footer>
    </div>
  );
};

export default App;
