import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); //3 colunas de tamanhos iguais. 1º arg quantidade que vai se repetir o 2ºarg. É igual a 1fr 1fr 1fr
  gap: 2rem; //espaçamento
  margin-top: -10rem; //sobe

  div{ 
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem; 
    color: var(--text-title);
  

    header{ 
      display:flex;
      align-items: center;
      justify-content: space-between;
    }

    strong{ 
      display:block; //para conseguir usar a margem
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background{
      background: var(--green);
      color: #fff;
    }

  }
`;