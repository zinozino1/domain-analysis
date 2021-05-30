import React from "react";
import styled, { css } from "styled-components";

const CardBox = styled.div`
  border: 1px solid red;
  width: 95%;
  border-radius: 3px;
  /* height: 40px; */
  background: white;
  padding: 1vh 0.5vh;
  box-sizing: border-box;
  margin: 0.5vh auto;
  font-size: 20px;
  color: #666;
  &:hover {
    background: #eee;
  }

  cursor: pointer;
  /* line-height: 40px; */
  ${(props) =>
    props.feature === "send" &&
    css`
      width: 220px;
      /* height: 80px; */
      text-align: center;
      /* line-height: 80px; */
      margin: 0.5vh auto;
    `}
`;

function Card({ card, feature }) {
  const OpenCard = ({ card, feature }) => {
    if (feature !== "send") {
      console.log(card);
    }
  };
  return (
    <CardBox feature={feature} onClick={() => OpenCard({ card, feature })}>
      {card.cardName}
    </CardBox>
  );
}

export default Card;