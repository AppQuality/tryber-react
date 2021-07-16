import { Card, Text } from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";
import quotes from "../assets/quotes.svg";
import avatar from "../assets/avatar.png";

const CardListStyle = styled.div`
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px 40px;
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${(props) => props.theme.grid.spacing.default}
      calc(${(props) => props.theme.grid.spacing.default} * 2);
  }
  .card-list-item {
    padding-bottom: 35px;
  }
  .item-icon {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .item-avatar {
    display: grid;
    grid-template-areas:
      "image name"
      "image qualification";
    grid-template-columns: 50px 1fr;
    grid-gap: 0 ${(props) => props.theme.grid.spacing.default};
  }
  .avatar-image {
    grid-area: image;
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .avatar-name {
    grid-area: name;
  }
  .avatar-qualification {
    grid-area: qualification;
  }
`;

const items = [
  {
    pic: avatar,
    name: "Fabio",
    age: "22",
    qualification: "Qualified Tester, Student",
    review:
      "È un'esperienza interessante e una grande opportunità per lavorare con AppQuality: posso dire di aver migliorato la mia attenzione ai dettagli e in generale alle mie capacità di test.",
  },
  {
    pic: avatar,
    name: "Fabrizio",
    age: "38",
    qualification: "Certified ISTQB professional Tester",
    review:
      "È un'esperienza interessante e una grande opportunità per lavorare con AppQuality: posso dire di aver migliorato la mia attenzione ai dettagli e in generale alle mie capacità di test.",
  },
  {
    pic: avatar,
    name: "Filippo",
    age: "23",
    qualification: "Qualified Tester, Student",
    review:
      "È un'esperienza interessante e una grande opportunità per lavorare con AppQuality: posso dire di aver migliorato la mia attenzione ai dettagli e in generale alle mie capacità di test.",
  },
];

export const Reviews = () => {
  return (
    <CardListStyle>
      {items.map((item, index) => (
        <Card shadow className="card-list-item aq-my-3" key={index}>
          <img src={quotes} className="aq-mb-2 item-icon" />
          <div className="item-avatar aq-mb-2">
            <div className="avatar-image">
              <img src={item.pic} />
            </div>
            <Text color="primary" className="capitalize-first avatar-name">
              <strong>
                {item.name}, {item.age}
              </strong>
            </Text>
            <Text
              color="secondary"
              className="capitalize-first avatar-qualification"
            >
              {item.qualification}
            </Text>
          </div>
          <Text color="secondary">{item.review}</Text>
        </Card>
      ))}
    </CardListStyle>
  );
};
