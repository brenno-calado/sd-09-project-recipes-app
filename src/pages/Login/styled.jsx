import styled from 'styled-components';

export const Container = styled.section``;

export const Button = styled.button`
  background-color: ${(props) => props.color};

  &:hover {
    background-color: red;
  }
`;
