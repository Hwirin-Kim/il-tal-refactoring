import styled from "styled-components";
import CompanyList from "../components/company/CompanyList";

const CompanyPage = () => {
  return (
    <Container>
      <CompanyList />
    </Container>
  );
};

export default CompanyPage;

const Container = styled.div``;
