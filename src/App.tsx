
import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionsModal } from './components/NewTransactionsModal';
import { GlobalStyle } from './styles/global';
import { TransactionsContext, TransactionsProvider } from './hooks/UseTransactions'
Modal.setAppElement('#root');

// const Title = styled.h1`
//   font-size: 64px;
//   color: #8257e6;
// `

export function App() {
  //MODAL
  const[isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false);
  }
  //
  return (//quando a gente precisa que um estado seja controlado por um estado filho, a gente pode passar uma função para esse componente filho para alterar essa informação.
    <TransactionsProvider>
      <Header onOpenNewTransactionsModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <NewTransactionsModal 
       isOpen = {isNewTransactionModalOpen}
       onRequestClose = {handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}