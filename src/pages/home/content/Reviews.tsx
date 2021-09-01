import {
  Card,
  Text,
  Carousel,
  CarouselSlide,
} from "@appquality/appquality-design-system";
import React, {useState} from "react";
import styled from "styled-components";
import quotes from "../assets/quotes.svg";
import avatarFabio from "../assets/avatar/fabio2.png";
import avatarCarlo from "../assets/avatar/carlo2.png";
import avatarMarina from "../assets/avatar/Marina.jpeg";
import avatarDaniele from "../assets/avatar/daniele2.jpeg";
import avatarFabrizio from "../assets/avatar/Fabrizio.jpeg";
import avatarSatesh from "../assets/avatar/Sathesh.jpeg";
import avatarFilippo from "../assets/avatar/filippo2.jpeg";
import avatarVincenzo from "../assets/avatar/Vincenzo.jpeg";

import { useTranslation } from "react-i18next";

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
`;

export const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();
  const items = [
    {
      pic: avatarCarlo,
      name: "Carlo",
      age: "25",
      qualification: "Qualified Tester, Student",
      review: t(
        'I said to myself "Why don\'t we help improve what we will use every day?". What started out as a joke turned out to be a passion. A wonderful and very professional work team is the icing on the cake of this great experience in AppQuality.'
      ),
    },
    {
      pic: avatarMarina,
      name: "Marina",
      age: "39",
      qualification: "Senior Technician in Computer System Administration",
      review: t(
        "AppQuality gave me this opportunity by participating in improving the quality of apps while working with a wonderful team."
      ),
    },
    {
      pic: avatarDaniele,
      name: "Daniele",
      age: "25",
      qualification: "Qualified Tester, Student",
      review: t(
        "I have the opportunity to test apps in my free time and grow my IT experience, without wasting time in my studies; thanks to the money I earn from tests, I can reduce university expenses"
      ),
    },
    {
      pic: avatarFabrizio,
      name: "Fabrizio",
      age: "38",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        'I found a young, dynamic, reliable and solid reality, with which I was able to deepen my test skills, in a totally new way; The Crowd. AppQuality is like a "test gym" to improve test and skill skills with passion, fun, very clear guidelines and most of all ... together!'
      ),
    },
    {
      pic: avatarSatesh,
      name: "Sathesh",
      age: "20",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        "AppQuality provides a reliable testing environment for the best application results, I have a lot of fun participating in real test projects and feel so proud to be part of the AppQuality testing community ... and to get paid too!"
      ),
    },
    {
      pic: avatarFabio,
      name: "Fabio",
      age: "22",
      qualification: "Qualified Tester, Student",
      review: t(
        "It is an interesting experience and a great opportunity to work with AppQuality. I can say that I have improved my attention to detail and my testing skills in general."
      ),
    },
    {
      pic: avatarFilippo,
      name: "Filippo",
      age: "23",
      qualification: "Qualified Tester, Student",
      review: t(
        "Whenever I am involved in a test campaign I feel honored and proud to help improve what many people use every day. The AppQuality team is great!"
      ),
    },
    {
      pic: avatarVincenzo,
      name: "Vincenzo",
      age: "33",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        "AppQuality represents a very interesting opportunity to participate in real test projects for important international clients. It's a good way to use my professional testing skills in a very fun activity. I can earn extra money ... and that's great!"
      ),
    },
  ];
  return (
    <CardListStyle>
      <Carousel step={{ xs: 1, lg: 3 }} current={current} setCurrent={setCurrent} totalSlides={items.length}>
        {items.map((item, index) => (
          <CarouselSlide key={index}>
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
              <Text color="secondary">
                <div className="review-content">{item.review}</div>
              </Text>
            </Card>
          </CarouselSlide>
        ))}
      </Carousel>
    </CardListStyle>
  );
};
