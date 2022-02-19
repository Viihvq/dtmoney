import { createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface Transaction{
  id: number;
  title: string;
  amount: number;
  type: string;
  category:string;
  createdAt: string; //depois vai ter que retornar para uma data de novo
}

// interface TransactionInput{ //forma tradicional
//     title: string; 
//     amount: number;
//     type: string;
//     category:string;
// }

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>; //esse escolhe quais quer.

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //herda Transaction mas omite o id e createdat

interface TransactionsProviderProps{
  children: ReactNode; //aceita qualquer tipo de contúdo válido pro react.
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(//forma mais simples de criar contexto. Provider e consumer sao as infos
  {} as TransactionsContextData //"esse obj tem sim esse formato, para de reclamar"
  ); 

export function TransactionsProvider({children}: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions)) //salvando no estado
      
    // fetch('https://localhost:3000/api/transactions')
    // .then(response => response.json())
    // .then(data => console.log(data));
  },[])

  async function createTransaction(transactionInput: TransactionInput){ //td func async retorna uma promise
    const response = await api.post('/transactions', { //await = faz aguardar o api.post terminar
      ...transactionInput,
      createdAt: new Date(),
    }) //rota, dados que quero inserir
    const {transaction} = response.data; //pega a resposta do mirage

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}} >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){ //hooks
  const context = useContext(TransactionsContext);
  return context;
}
