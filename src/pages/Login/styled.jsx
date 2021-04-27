import styled from 'styled-components';

export const Container = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  width: 100%;
`;

export const BgImage = styled.img`
  width: 100%;
  height: 100vh;
`;

export const Form = styled.form`
  background-color: rgba(252, 240, 3, .2);
  border: 2px solid rgba(255, 255, 255, .3);
  border-radius: .5rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, .5);
  display: grid;
  gap: 3rem;
  padding: 3rem;
  position: absolute;

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
    background-color: #84d2ec;
    border: none;
    text-transform: uppercase;

    &:hover {
    background-color: #00BFFF ;
    }

    &:focus {
    background-color: #1285ac ;
    }
  }

`;
