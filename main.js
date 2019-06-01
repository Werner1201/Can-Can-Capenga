let ListEnc = new ListaLinearEnc();

function jogadores() {
  for (let i = 0; i < 10; i++) {
    registrarJogador();
  }
  addtext(`\nJogadores: `);
  addtext(`\n${ListEnc.playersNames}`);
}

function registrarJogador() {
  let nome = window.prompt("Digite o Nome do Jogador");
  let noh = new Nodo(nome);

  if (ListEnc.tahVazia() === true) {
    let tes = ListEnc.insereNohFim(noh);
    console.log(`Resultado do TahVaazia: ${tes}`);
  } else {
    let result = ListEnc.busca(nome, (ptAux, nome) => {
      //console.log(ptAux.chave, nome);
      return ptAux.chave == nome ? true : false;
    });
    if (result instanceof Nodo) {
      let certo = result;
      /*nome = window.prompt("Digite um nome de Jogador diferente: ");
       = ListEnc.busca(nome, (ptAux, nome) => {
        //console.log(ptAux.chave, nome);
        return ptAux.chave == nome ? true : false;
      });*/
      while (certo instanceof Nodo) {
        window.alert("O nome digitado já existe!");
        nome = window.prompt("Digite um nome de Jogador diferente: ");
        certo = ListEnc.busca(nome, (ptAux, nome) => {
          //console.log(ptAux.chave, nome);
          return ptAux.chave == nome ? true : false;
        });
      }
      let noh = new Nodo(nome);
      let teste = ListEnc.insereNohFim(noh);
    } else {
      let teste = ListEnc.insereNohFim(noh);
    }
  }
}

function main() {
  opts();
  addtext(`\nFinalizando o Programa`);
}

function opts() {
  addtext("################################\n");
  addtext("#### CAN CAN ONLINE CAPENGA ####\n");
  addtext("################################\n");
  jogadores();
  ListEnc.rodada();
  //Talvez Substituir por uma variavel com o texto ?
  /*let opt = parseInt(window.prompt("Digite 1"));
  switch (opt) {
  }*/
}

//Código para exibir os Prompts após o load da página.
//Console aparentemente só funciona "assincrono" no FireFox
document.addEventListener("DOMContentLoaded", () => main(), false);
