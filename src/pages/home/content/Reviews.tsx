import {
  Card,
  Text,
  Carousel,
  CarouselSlide,
} from "@appquality/appquality-design-system";
import React from "react";
import styled from "styled-components";
import quotes from "../assets/quotes.svg";
import avatarFabio from "../assets/avatar/fabio2.png";
import avatarCarlo from "../assets/avatar/carlo2.png";
import avatarMarina from "../assets/avatar/Marina-Gil-Martìnez2.jpeg";
import avatarDaniele from "../assets/avatar/daniele2.jpeg";
import avatarFabrizio from "../assets/avatar/Fabrizio-de-Fazio2.jpeg";
import avatarSatesh from "../assets/avatar/Sathesh-Sirimalla2.jpeg";
import avatarFilippo from "../assets/avatar/filippo2.jpeg";
import avatarVincenzo from "../assets/avatar/Vincenzo-Falconieri2.jpeg";

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
  const { t } = useTranslation();
  const items = [
    {
      pic: avatarCarlo,
      name: "Carlo",
      age: "25",
      qualification: "Qualified Tester, Student",
      review: t(
        'Mi sono detto: "Perché non contribuiamo a migliorare ciò che useremo ogni giorno?". Quello che è iniziato come uno scherzo si è rivelato una passione. Un team di lavoro meraviglioso e molto professionale è la ciliegina sulla torta di questa grande esperienza in AppQuality.'
      ),
    },
    {
      pic: avatarMarina,
      name: "Marina",
      age: "39",
      qualification: "Senior Technician in Computer System Administration",
      review: t(
        "AppQuality mi ha dato questa opportunità partecipando al miglioramento della qualità delle app e, al tempo stesso, lavorando con una squadra meravigliosa."
      ),
    },
    {
      pic: avatarDaniele,
      name: "Daniele",
      age: "25",
      qualification: "Qualified Tester, Student",
      review: t(
        "Ho l'opportunità di testare le app nel mio tempo libero e far crescere la mia esperienza in informatica, senza perdere tempo nei miei studi: grazie ai soldi che guadagno con i test, posso alleggerire le spese universitarie"
      ),
    },
    {
      pic: avatarFabrizio,
      name: "Fabrizio",
      age: "38",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        'Ho trovato una realtà giovane, dinamica, affidabile e solida, con la quale ho potuto approfondire le mie capacità di test, in un modo totalmente nuovo: The Crowd. AppQuality è come una "palestra di prova" per migliorare le capacità di test e abilità con passione, divertimento, linee guida molto chiare e soprattutto ... insieme!'
      ),
    },
    {
      pic: avatarSatesh,
      name: "Sathesh",
      age: "20",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        "AppQuality fornisce un ambiente di test affidabile per i migliori risultati delle applicazioni, mi diverto molto a partecipare a progetti di test reali e mi sento così orgoglioso di far parte della community di tester di App Quality ... e anche di essere pagato!"
      ),
    },
    {
      pic: avatarFabio,
      name: "Fabio",
      age: "22",
      qualification: "Qualified Tester, Student",
      review: t(
        "È un'esperienza interessante e una grande opportunità per lavorare con AppQuality: posso dire di aver migliorato la mia attenzione ai dettagli e in generale alle mie capacità di test."
      ),
    },
    {
      pic: avatarFilippo,
      name: "Filippo",
      age: "23",
      qualification: "Qualified Tester, Student",
      review: t(
        "Ogni volta che sono coinvolto in una campagna di test mi sento onorato e orgoglioso di contribuire a migliorare quello che molte persone usano ogni giorno. Il team di AppQuality è fantastico!"
      ),
    },
    {
      pic: avatarVincenzo,
      name: "Vincenzo",
      age: "33",
      qualification: "Certified ISTQB professional Tester",
      review: t(
        "AppQuality rappresenta un'opportunità molto interessante per partecipare a progetti di test reali per importanti clienti internazionali. È un buon modo per utilizzare le mie capacità professionali di test in un'attività molto divertente. Posso guadagnare soldi extra ... e questo è fantastico!"
      ),
    },
  ];
  return (
    <CardListStyle>
      <Carousel step={{ xs: 1, lg: 3 }}>
        {items.map((item, index) => (
          <CarouselSlide>
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
