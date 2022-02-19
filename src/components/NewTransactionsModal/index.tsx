import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './style';
import { FormEvent, useContext, useState } from 'react';
import { api } from '../../services/api';
import closeImg from '../../assets/fechar.svg'
import outcomeImg from '../../assets/saidas.svg'
import incomeImg from '../../assets/entradas.svg'
import { useTransactions } from '../../hooks/UseTransactions';

interface NewTransactionsModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}
//Sem contexto nao dá para passar as funções handleOpenNewTransactionModal e handleCloseNewTransactionModal daqui para o botão do header.
//Por isso elas estão no componente pai.
export function NewTransactionsModal({isOpen, onRequestClose}: NewTransactionsModalProps){
  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const[type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault(); //previni o funcionamento padra do html, nesse caso de fechar o formulario quando apertar em 'cadastrar'
    
    await createTransaction({ //vai aguardar essa função funcionar e caso de tudo certo ele executa o que está embaixo
      title,
      amount,
      category,
      type,
    })  

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose(); //fechar o modal
  }

  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction} > {/*toda vez que clicar no botao de submit ele vai executar essa funcao*/}
        
        <h2>Cadastrar transação</h2>   
        
        <input 
          type="text" 
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)} //executa toda vez que um texto for digitado. Aula: salvando dados no form
        />
        <input  
          type="number" 
          placeholder="Valor" 
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          
          <RadioBox 
            type="button" 
            onClick={() => {setType('deposit');}}
            isActive={type==='deposit'} //retorna true ou false
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          
          <RadioBox 
            type="button"
            // className={type === 'deposit' ? 'active' : ''}
            onClick={() => {setType('withdraw');}}
            isActive={type==='withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saídas</span>          
          </RadioBox>

        </TransactionTypeContainer>

        <input 
          type="text"  
          placeholder="Categoria" 
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">
          Cadastrar
        </button>

      </Container>       
    </Modal>
  )
}