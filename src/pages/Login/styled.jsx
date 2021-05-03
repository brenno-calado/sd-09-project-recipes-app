import styled from 'styled-components';

export const Container = styled.section`
  background-color: #620808;
  align-items: center;
  display: flex;
  justify-content:center;
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

export const Form = styled.form`
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;

  input {
    margin-left: 5px;
    padding: .5rem;

    &:focus{
      border: 2px solid #00BFFF;
    }
  }

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
