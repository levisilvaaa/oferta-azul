import React from 'react';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white w-full border-b-4 border-[#FFCC29]">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <img 
            src="https://www.gov.br/++theme++padrao_govbr/img/govbr-colorido-b.png" 
            alt="GovBr Logo" 
            className="h-8"
          />
        </div>
        <div className="flex items-center text-[#1351B4] space-x-4">
          <button className="flex items-center space-x-1 text-sm hover:underline">
            <Globe size={16} />
            <span>PT-BR</span>
          </button>
          <a href="#" className="text-sm hover:underline">Ajuda</a>
        </div>
      </div>
    </header>
  );
};

export default Header;