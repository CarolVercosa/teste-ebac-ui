/// <reference types='cypress'/>

describe('Funcionalidade Login', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
  });

  afterEach(() => {
    cy.screenshot();
  });

  it('Deve fazer login com sucesso', () => {
    cy.get('#username').type('carolinevercosa@teste.com');
    cy.get('#password').type('Carol123*');
    cy.get('.woocommerce-form > .button').click();
    cy.get('.page-title').should('contain', 'Minha conta');
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should(
      'contain',
      'Olá, carolinevercosa (não é carolinevercosa? Sair)'
    );
  });

  it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
    cy.get('#username').type('carol@teste.com');
    cy.get('#password').type('teste@teste.com');
    cy.get('.woocommerce-form > .button').click();

    cy.get('.woocommerce-error').should(
      'contain',
      'Endereço de e-mail desconhecido'
    );
  });

  it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
    cy.get('#username').type('aluno_ebac@teste.com');
    cy.get('#password').type('nada@teste.com');
    cy.get('.woocommerce-form > .button').click();
    cy.get('.woocommerce-error').should(
      'contain',
      'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?'
    );
  });
});
