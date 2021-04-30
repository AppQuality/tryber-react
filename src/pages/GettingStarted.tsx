import React from "react"
import styled, {css, DefaultTheme} from "styled-components";
import { Container, Grid, Col } from '../stories/layout/Layout'
import { Card } from '../stories/card/Card'
import { Button } from '../stories/button/Button'
import { SignupForm } from "../features/SignupForm"
import { useTranslation } from 'react-i18next'
import signupImage from './assets/group-236.png'
import {ParagraphProps} from "../stories/typography/Typography";

export interface PageInterface {
  location: string
}

const gridStyle = {
	display: 'grid',
	gridTemplateAreas: `
											'a b .'
											'a c c'
											`,
	gridTemplateColumns: '1fr 1fr',
	gridRowGap: '30px',
	gridColumnGap: '50px'
}

const CardBody = styled.div(({theme: {grid}}) => (`
	@media (min-width: ${grid.breakpoints.md}) {
		display: grid;
		grid-template-areas: 
											"a b ."
											"a c c"
											;
		grid-template-columns: 1fr 1fr;
		grid-row-gap: 30px;
		grid-column-gap: 50px;
	}
`));

const CardSignupColumn = styled.div(({theme: {grid}}) => (`
	@media (min-width: ${grid.breakpoints.md}) {
		max-width: 280px;
	}
`));

export default function GettingStarted({location}: PageInterface) {
  const { t } = useTranslation();
  // API.me(token).then(redirect).catch(render page)
  return (
		<Container>
      <h2>{t("become-a-tester")}</h2>
			<Grid>
				<Col size='lg-8'>
					<div style={{marginBottom: '30px'}}>
						<Card>
							<Grid gutter={0}>
								<Col size='md-5'>
									<SignupForm />
								</Col>
								<Col size='md-1'></Col>
								<Col size='md-5'>
									<p>{t("signup-with-social")}</p>
									<p>{t("signup-with-social-description")}</p>
									<div className="mb-2">
										<Button type="primary" size="block" >{t("facebook")}</Button>
									</div>
									<div className="mb-2">
										<Button type="secondary" size="block" flat={true}>{t("linkedin")}</Button>
									</div>
									<div>
										<img src={signupImage} />
									</div>
								</Col>
							</Grid>
						</Card>
					</div>
					<div style={{marginBottom: '30px'}}>
						<Card>
							<CardBody>
								<div style={{gridArea: 'a'}}>
									<SignupForm />
								</div>
								<CardSignupColumn>
									<p>{t("signup-with-social")}</p>
									<p>{t("signup-with-social-description")}</p>
									<div className="mb-2">
										<Button type="primary" size="block" >{t("facebook")}</Button>
									</div>
									<div className="mb-2">
										<Button type="secondary" size="block" flat={true}>{t("linkedin")}</Button>
									</div>
								</CardSignupColumn>
								<div style={{gridArea: 'c'}}>
									<img src={signupImage} />
								</div>
							</CardBody>
						</Card>
					</div>
					<div style={{marginBottom: '30px'}}>
						<Card>
							<div style={gridStyle}>
								<div style={{gridArea: 'a'}}>
									<SignupForm />
								</div>
								<div style={{gridArea: 'b', maxWidth: '280px'}}>
									<p>{t("signup-with-social")}</p>
									<p>{t("signup-with-social-description")}</p>
									<div className="mb-2">
										<Button type="primary" size="block" >{t("facebook")}</Button>
									</div>
									<div className="mb-2">
										<Button type="secondary" size="block" flat={true}>{t("linkedin")}</Button>
									</div>
								</div>
								<div style={{gridArea: 'c'}}>
									<img src={signupImage} />
								</div>
							</div>
						</Card>
					</div>
				</Col>
			</Grid>
		</Container>
	);
}
