import * as React from "react";
import { DogInfo } from "../types";
import styled from "styled-components";
function DogBox({ name, life_span, temperament, image }: DogInfo) {
  return (
    <>
      <DogImg src={image.url} />
      <DogName>{name}</DogName>
      <DogLifeOrigin>수명 : {life_span}</DogLifeOrigin>
      <DogLifeOrigin>성격 : {temperament}</DogLifeOrigin>
    </>
  );
}

const DogImg = styled.img`
  width: 50%;
  height: auto;
`;
const DogName = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 3px;
`;
const DogLifeOrigin = styled.p`
  width: 50%;
  color: gray;
  margin-bottom: 2px;
  margin-top: 5px;
`;

export default DogBox;
