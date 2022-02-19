import { useState } from 'react';

import logoImg from '../../assets/logo.svg';
import { Container, Content } from './style';

interface HeaderProps { //Componente filho alterando informação no pai. 
  onOpenNewTransactionsModal: () => void; //Não recebe nenhum parametro e não retorna nada
}

export function Header({onOpenNewTransactionsModal}: HeaderProps){ //mesma coisa que props: HeaderProps

  return(
    <Container> {/*header*/}
      <Content> {/*div*/}
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionsModal}> {/*Aqui altera lá no App. Isso porquê é aqui que é ativado. Mesma coisa que props.onOpenNewTransactionsModal*/}
          Nova transação
        </button>

        
      </Content>
    </Container>
  )
}