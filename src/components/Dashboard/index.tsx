import { Summary } from "../Summary";
import { TransctionsTable } from "../TransactionsTable";
import { Container } from "./style";

export function Dashboard(){
  return(
    <Container>
      <Summary />
      <TransctionsTable />
    </Container>
  );
}