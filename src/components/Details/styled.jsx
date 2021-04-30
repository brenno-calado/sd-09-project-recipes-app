import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ThumbNail = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

export const TitleContainer = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  text-transform: uppercase;
`;

export const RecomendationContainer = styled.section`
  overflow-x: auto;
  white-space: nowrap;
  margin: 3rem 0;
`;

export const Card = styled.section`
  width: 50%;
  height: 18rem;
  display: inline-block;

  img {
    width: 100%;
  }
`;

export const StartButton = styled.button`
  bottom: 0px;
  margin: auto;
  position: fixed;
  width: 50%;
`;
