import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs'
import { App } from './App';

createServer({
  models:{ //bd
    transaction: Model, //é uma transaction do tipo Model. O bd sempre vai começar vazio.
  },

  seeds(server){
    server.db.loadData({
      transactions:[ //nome da tabela que é sempre o nome do model no plural
        {//aqui vai devolver as transactions que quer retornar
          id:1,
          title:'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id:2,
          title:'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        },
      ]
    })
  },

  routes(){
    this.namespace = 'api'; //tudo que tiver 'api' na url ele vai interceptar.

    this.get('/transactions', () => { //quando houver uma requisição de busca para transactions, retorna.... ps: [200] é sucesso.
      return this.schema.all('transaction'); //retorna todas as transações do bd
        
          // id: 1,
          // title: 'Transaction 1',
          // amount: 400,
          // type: 'deposit',
          // category: 'Food',
          // createdAt: new Date()
    })

    this.post('/transactions', (schema, request) => { //[201] código sucesso para criação. Schema é o bd.
      const data = JSON.parse(request.requestBody) //converte o texto para obj do js

      return schema.create('transaction', data) //1º model que está inserindo, 2º os dados que quero passar para dentro deste model
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);