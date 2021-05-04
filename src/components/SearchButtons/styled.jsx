import styled from 'styled-components';

const ButtonsContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 2rem;

  button {
    padding: .8rem;
    font-size: 1rem;
    border: none;
    background-color: #f0f8ff;

    &:focus {
      background-color: #d1d8df;
    }
  }
`;

export default ButtonsContainer;
