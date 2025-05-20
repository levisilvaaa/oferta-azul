import React from 'react';
import { ShieldCheck, HelpCircle, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <ShieldCheck size={20} className="text-[#1351B4] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Segurança</h3>
              <p className="text-sm text-gray-600">
                O gov.br garante a segurança e privacidade dos seus dados. Ao acessar serviços do governo federal,
                você estará sujeito às políticas vigentes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-4 pb-8">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © 2025 Governo Federal do Brasil. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="flex items-center text-xs text-gray-600 hover:text-[#1351B4]">
              <HelpCircle size={14} className="mr-1" />
              <span>Ajuda</span>
            </a>
            <a href="#" className="flex items-center text-xs text-gray-600 hover:text-[#1351B4]">
              <Phone size={14} className="mr-1" />
              <span>Contato</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;