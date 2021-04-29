import React from "react"
import { Container, Grid, Col } from '../stories/layout/Layout'
import { Card } from '../stories/card/Card'
import { Button } from '../stories/button/Button'
import { SignupForm } from "../features/SignupForm";
import { useTranslation } from 'react-i18next';

export interface PageInterface {
  location: string
}

export default function GettingStarted({location}: PageInterface) {
  const { t } = useTranslation();
  return (
		<Container>
      <h2>{t("become-a-tester")}</h2>
			<Grid>
				<Col size={8}>
        <Card>
					<Grid gutter={0}>
						<Col size={5}>
							<SignupForm location={location}/>
						</Col>
						<Col size={1}></Col>
						<Col size={5}>
							<p>{t("signup-with-social")}</p>
							<p>{t("signup-with-social-description")}</p>
              <div className="mb-2">
							<Button type="primary" size="block" >{t("facebook")}</Button>
              </div>
              <div className="mb-2">
							<Button type="secondary" size="block" flat={true}>{t("linkedin")}</Button>
              </div>
						</Col>
					</Grid>
          </Card>
				</Col>
			</Grid>
		</Container>
	);
}
