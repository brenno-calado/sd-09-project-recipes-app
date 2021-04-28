import styled from 'styled-components';

export const Header = styled.header`
  align-items: center;
  background-color: #ffee56;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const ProfileImg = styled.img`
  border-radius: 3rem;
  background-color: #00ffc8;
  padding: .5rem;
`;

export const SearchButton = styled.button`
   border:none; 
   border-radius: 3rem;
   background-color: ${(props) => props.bgColor};
   cursor: pointer;
   padding: .5rem;
   transition: .5s;
`;
