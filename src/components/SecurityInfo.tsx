import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

const SecurityInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto mt-6">
      <div className="flex items-center mb-4">
        <ShieldCheck size={24} className="text-[#1351B4] mr-2" />
        <h2 className="text-lg font-medium text-gray-800">Dicas de Segurança</h2>
      </div>
      
      <ul className="space-y-3">
        <li className="flex items-start">
          <CheckCircle2 size={18} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            O governo jamais solicita senha, número de cartão ou token por email, telefonema ou SMS.
          </p>
        </li>
        <li className="flex items-start">
          <CheckCircle2 size={18} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            Sempre verifique se o site possui a logo oficial do gov.br.
          </p>
        </li>
        <li className="flex items-start">
          <AlertTriangle size={18} className="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            Mantenha seu dispositivo e navegador sempre atualizados.
          </p>
        </li>
      </ul>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Em caso de dúvidas, acesse a <a href="#" className="text-[#1351B4] hover:underline">Central de Ajuda</a> ou
          ligue para 0800-978-9001.
        </p>
      </div>
    </div>
  );
};

export default SecurityInfo;