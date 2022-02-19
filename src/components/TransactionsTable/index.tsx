import { useContext, useEffect, useState } from "react";
import { useTransactions } from "../../hooks/UseTransactions";
import { api } from "../../services/api";
import { Container } from "./style";

export function TransctionsTable(){
  const {transactions} = useTransactions();
  
  return(

    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => { //para cada transaction que eu tiver, vou retornar:
            return(
              <tr key={transaction.id}/*Toda vez que faz um map no react, precisa de uma key*/>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', { //formata o dinheiro
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format( //deixa apenas a data como dd/mm/aaaa
                    new Date(transaction.createdAt)
                  )}                  
                </td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
    </Container>
  )
}