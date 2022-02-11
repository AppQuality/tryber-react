import {
  Card,
  Carousel,
  CarouselNav,
  CarouselSlide,
  Text,
} from "@appquality/appquality-design-system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import avatarCarlo from "./assets/carlo2.png";
import avatarDaniele from "./assets/daniele2.jpeg";
import avatarFabio from "./assets/fabio2.png";
import avatarFabrizio from "./assets/Fabrizio.jpeg";
import avatarFilippo from "./assets/filippo2.jpeg";
import avatarMarina from "./assets/Marina.jpeg";
import quotes from "./assets/quotes.svg";
import avatarSatesh from "./assets/Sathesh.jpeg";
import tryberPurple4 from "./assets/tryberPurple4.svg";
import avatarVincenzo from "./assets/Vincenzo.jpeg";

const ReviewContainer = styled.div`
  padding: 140px 0;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    padding: 240px 0;
  }
  .section-title {
    .tryberCharacter {
      display: block;
      margin: 0 auto;
      @media only screen and (min-width: ${(props) =>
          props.theme.grid.breakpoints.lg}) {
        position: absolute;
        margin: 0;
        transform: translate(-100%, -40%);
        display: inline-block;
      }
    }
  }
`;
const CardListStyle = styled.div`
  .card-list-item {
    padding-bottom: 35px;
    width: 100%;
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
    min-height: 40px;
  }
  .review-content {
    min-height: 100px;
  }
  ${Card} {
    background: linear-gradient(124.08deg, #ca4dbd 0%, #f4cc27 156.95%);
    border-radius: 32px;
    border: none;
    ${Text} {
      color: ${(props) => props.theme.colors.white};
      strong {
        color: ${(props) => props.theme.colors.orange600};
      }
    }
    .avatar-image {
      border: 2px solid ${(props) => props.theme.colors.indigo600};
    }
  }
`;

export default () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  const items = [
    {
      pic: avatarCarlo,
      name: t("__HOME_USER_NAME_ADVICE1 MAX:20"),
      age: "25",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE1 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE1 MAX:190"),
    },
    {
      pic: avatarMarina,
      name: t("__HOME_USER_NAME_ADVICE2 MAX:20"),
      age: "39",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE2 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE2 MAX:190"),
    },
    {
      pic: avatarDaniele,
      name: t("__HOME_USER_NAME_ADVICE3 MAX:20"),
      age: "25",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE3 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE3 MAX:190"),
    },
    {
      pic: avatarFabrizio,
      name: t("__HOME_USER_NAME_ADVICE4 MAX:20"),
      age: "38",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE4 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE4 MAX:190"),
    },
    {
      pic: avatarSatesh,
      name: t("__HOME_USER_NAME_ADVICE5 MAX:20"),
      age: "20",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE5 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE5 MAX:190"),
    },
    {
      pic: avatarFabio,
      name: t("__HOME_USER_NAME_ADVICE6 MAX:20"),
      age: "22",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE6 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE6 MAX:190"),
    },
    {
      pic: avatarFilippo,
      name: t("__HOME_USER_NAME_ADVICE7 MAX:20"),
      age: "23",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE7 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE7 MAX:190"),
    },
    {
      pic: avatarVincenzo,
      name: t("__HOME_USER_NAME_ADVICE8 MAX:20"),
      age: "33",
      qualification: t("__HOME_USER_QUALIFICATION_ADVICE8 MAX:30"),
      review: t("__HOME_USER_COMMENT_ADVICE8 MAX:190"),
    },
  ];
  return (
    <ReviewContainer className="container">
      <div className="section-title text-marker aq-text-center">
        <img
          className="tryberCharacter"
          src={tryberPurple4}
          alt="tryber characters"
        />
        {t("__HOME_TITLE_ADVICE MAX:40")}
      </div>
      <div className="aq-pt-3">
        <CardListStyle>
          <Carousel
            step={{ xs: 1, lg: 3 }}
            current={current}
            setCurrent={setCurrent}
            totalSlides={items.length}
          >
            {items.map((item, index) => (
              <CarouselSlide key={index}>
                <Card className="card-list-item aq-my-3" key={index}>
                  <img src={quotes} className="aq-mb-2 item-icon" />
                  <Text>
                    <div className="review-content">{item.review}</div>
                  </Text>
                  <div className="item-avatar aq-mb-2">
                    <div className="avatar-image">
                      <img src={item.pic} />
                    </div>
                    <Text
                      color="primary"
                      className="capitalize-first avatar-name"
                    >
                      <strong>
                        {item.name}, {item.age}
                      </strong>
                    </Text>
                    <Text className="capitalize-first avatar-qualification">
                      {item.qualification}
                    </Text>
                  </div>
                </Card>
              </CarouselSlide>
            ))}
          </Carousel>
          <CarouselNav
            step={{ xs: 1, lg: 3 }}
            current={current}
            setCurrent={setCurrent}
            totalSlides={items.length}
          ></CarouselNav>
        </CardListStyle>
      </div>
    </ReviewContainer>
  );
};
