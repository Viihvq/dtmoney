import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  table{
    width: 100%;
    border-spacing: 0 0.5rem; //divisões da tabela

    th{ 
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: center;
      line-height: 1.5rem;
      /* background: blue; */
    }

    td{
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;
      text-align: center;
    
      &:first-child{ //quando for o primeiro td
        color: var(--text-title);
      }

      &.deposit{
        color: var(--green)
      }
      
      &.withdraw{
        color: var(--red)
      }
    }
  }
`;