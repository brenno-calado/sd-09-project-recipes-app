import styled from 'styled-components';

export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  justify-content: center;
  width: 100%;
`;

export const Card = styled.section`
  margin-bottom: 3rem ;
  width: 80%;

  a {
  display: flex;
  flex-direction: column;
  align-items:center;
  }

  img {
    width: 100%;
  }
`;
