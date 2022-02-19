import { useContext } from 'react';
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/UseTransactions';

import { Container } from "./style";

export function Summary(){
  const {transactions} = useTransactions(); //Sempre que o contexto mudar os componentes vao re-renderizar para mostrar as informações.
  console.log(transactions);
  
  //outra forma de fazer isso lá embaixo
  const totalDeposits = transactions.reduce((acc, transaction) => { //acc = acumulator. 
    if(transaction.type === 'deposit') {
      return acc + transaction.amount;
    }
    return acc;
  },0); //valor inicial 0

  const totalWithdraws = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'withdraw') {
      return acc + transaction.amount;
    }
    return acc;
  },0);

  return(
    <Container>
      
      <div>
        <header> 
          <p>Entradas</p>
          <img src={entradasImg} alt="Entradas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', { //formata o dinheiro
            style: 'currency',
            currency: 'BRL'
          }).format(totalDeposits)}
        </strong>
      </div>
      <div>
        <header> 
          <p>Saídas</p>
          <img src={saidasImg} alt="Saídas"/>
        </header>
        <strong> -
        {new Intl.NumberFormat('pt-BR', { //formata o dinheiro
            style: 'currency',
            currency: 'BRL'
          }).format(totalWithdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header> 
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', { //formata o dinheiro
              style: 'currency',
              currency: 'BRL'
            }).format(totalDeposits - totalWithdraws)}
        </strong>
      </div>
    </Container>
  )
}

/*Forma antiga de fazer contexto. consumia o contexto, passava uma função e dentro do data vem o valor do contexto.*/
      //<TransactionsContext.Consumer>
      //  {(data) => { 
      //     console.log(data);
      //     return <p>OK</p>
      //   }}
      // </TransactionsContext.Consumer>

/*
const sumary = transactions.reduce((acc, transaction) => {
  if(transaction.type === 'deposit){
    acc.deposit += transaction.amount;
    acc.total += transaction.amount;
  }else{
    acc.withdraws += transaction.amount;
    acc.total -= transaction.amount;
  }
  return acc;
}, {
  deposits:0,
  withdraws:0,
  total: 0,
});

*/