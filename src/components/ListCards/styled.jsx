import styled from 'styled-components';

export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  justify-content: center;
  width: 100%;
`;

export const Card = styled.section`
  box-shadow: 3px 6px 29px -4px rgba(0, 0, 0, .5);
  border-radius: 2rem;
  margin-bottom: 3rem ;
  width: 80%;

  a {
  display: flex;
  flex-direction: column;
  align-items:center;
  }

  img {
    width: 100%;
    border-radius: 2rem 2rem 0 0;
  }
`;
