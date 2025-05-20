import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface OnlineSupportProps {
  cpf: string;
  nome?: string;
  urlParams?: URLSearchParams;
}

const OnlineSupport: React.FC<OnlineSupportProps> = ({ cpf, nome, urlParams }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the attendant's image
    const img = new Image();
    img.src = 'https://i.postimg.cc/vB2yPW4s/imagem-2025-05-08-161304478.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  // Use existing URL parameters if available, or create new ones
  const params = urlParams || new URLSearchParams();
  
  // Ensure CPF and nome are set in params
  params.set('cpf', cpf.replace(/\D/g, ''));
  if (nome) {
    params.set('nome', nome);
  }
  
  const embedUrl = `https://chat.secure-pro.cfd/front-resg?${params.toString()}`;

  return (
    <div data-testid="online-support" className="bg-white shadow-md w-full mx-auto">
      <div className="bg-[#1351B4] text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {imageLoaded && (
              <img 
                src="https://i.postimg.cc/vB2yPW4s/imagem-2025-05-08-161304478.png" 
                alt="Larissa"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg">Atendimento Online</h2>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Larissa - Assistente Virtual
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-x border-b">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1" />
            <span>Tempo médio de atendimento: menos de 1 minuto</span>
          </div>
        </div>

        <div>
          <iframe
            src={embedUrl}
            className="w-full h-[700px] border-0"
            allow="microphone; camera"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default OnlineSupport;
