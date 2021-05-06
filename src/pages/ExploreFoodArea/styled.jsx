import styled from 'styled-components';

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;

  select {
    margin: 1rem;
    padding: .9rem;
    &:hover {
      border: 2px solid #2ba8e2;
    }
  }
`;

export default Container;
