describe("For Users with profile type witholding > 5K, VAT, Company and internal", () => {
  const fiscalTypes = [
    "vat",
    // "witholding-extra",
    // "company"
  ];
  fiscalTypes.forEach((fiscalType) => {
    beforeEach(() => {
      cy.loggedIn();
      cy.intercept(
        "GET",
        `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`,
        {
          statusCode: 200,
          fixture: `users/me/fiscal/_get/200_${fiscalType}`,
        }
      ).as("userMeFiscal");
      cy.intercept(
        "GET",
        `${Cypress.env(
          "REACT_APP_API_URL"
        )}/users/me?fields=pending_booty%2Cbooty_threshold`,
        {
          statusCode: 200,
          fixture: "/users/me/_get/200_booty_gross",
        }
      ).as("pendingBooty");
      cy.visit("/payments");
    });
    it(`È abilitato il bottone di richiesta pagamento per il profilo ${fiscalType}`, () => {
      cy.dataQa("request-payment-cta").should("be.enabled");
    });
    it.only("il click sul bottone apre una modale di richiesta pagamento Manuale", () => {
      cy.dataQa("request-payment-cta").click();
      cy.dataQa("manual-payment-modal").should("be.visible");
    });
  });
  it("Nel primo step della modale è presente un testo di spiegazione, nome, iban, accetazione condizioni, e bottone per andare avanti", () => {});
  it("il click sul link termini e condizioni apre una pagine in target blank all'articolo di spiegazione", () => {});
  it("Cliccando sul bottone si verifica che tutti i campi sono obbligatori, l'iban è validato e se ok si va avanti, altrimenti messaggini di errore sotto i campi", () => {});
  it("Nel secondo step è visualizzato il lordo, un testo di spiegazione, un bottone per tornare indietro e c'è un button per avviare il pagamento", () => {});
  it(
    "cliccando sul bottone di richiesta pagamento avviene la richiesta alla api payment, nel frattempo il btn è disabilitato e appare caricamento (...wait)"
  );
  it("Se la richiesta è andata a buon fine vedo un messaggio di conferma nella modale", () => {});
  it("Se la richiesta è fallita vedo un messaggio di errore come toast e la modale non va avanti", () => {});
  it("Chiudendo la modale, Se la richiesta è andata a buon fine, nella tabella il pagamento è visualizzato in processing", () => {});
});
