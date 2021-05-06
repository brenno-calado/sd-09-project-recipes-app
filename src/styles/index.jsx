import styled from 'styled-components';

const ButtonContainerExplore = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 80vh;

  button {

    border-radius: 3rem;
    padding: 1rem;
    cursor: pointer;
    transition: .5s;
    background-color: #FFD315;
    border: none;
    text-transform: uppercase;

    &:hover {
    background-color: #f3d54e ;
    }

    &:focus {
    background-color: #f8dc60;
    }
  }
`;

export default ButtonContainerExplore;
