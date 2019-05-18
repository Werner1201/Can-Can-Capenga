class ListaLinearEnc {
  constructor() {
    this.ptLista = null;
    //Aqui adcionarei um contador de elementos
    this.qtd = 0;
    this.playersNames = [];
  }
  //Ok
  tahVazia() {
    if (this.ptLista == null) {
      return true;
    } else {
      return this.ptLista;
    }
  }

  tiraCarta() {
    let array = [2, 3, 5, 7];
    let rng = parseInt(Math.random() * (4 - 0) + 0);
    return array[rng];
  }

  executaCarta(carta, ptAnterior, ptAtual) {
    switch (carta) {
      case 2:
        this.addtext(`\nPula o próximo Jogador`);
        return this.carta2(ptAtual);
        break;
      case 3:
        this.addtext(`\nE Elimina a Si mesmo`);
        return this.carta3(ptAnterior, ptAtual);
        break;
      case 5:
        this.addtext(`\nElimina o Terceiro Jogador Seguinte`);
        return this.carta5(ptAtual);
        break;
      case 7:
        this.addtext(`\nElimina o Jogador Anterior`);
        return this.carta7(ptAnterior, ptAtual);
        break;
    }
  }

  addtext(string) {
    let newtext = string;
    const textoArea = document.FrameConsole.console;
    textoArea.value += newtext;
    textoArea.scrollTop = textoArea.scrollHeight;
  }

  cleantext() {
    const textoArea = document.FrameConsole.console;
    console.log(textoArea);
    textoArea.value = "";
    textoArea.scrollTop = textoArea.scrollHeight;
    console.log("aqui");
  }

  rodada() {
    let ptAux = this.ptLista;
    let ptAux2 = ptAux;
    let qtd = 0;
    let index = 1;
    while (index < 10) {
      ptAux2 = ptAux2.proxNodo;
      index++;
    }
    let ptAnterior = ptAux2;
    let cont = 1;
    while (this.qtd > 1) {
      console.log(this.ptLista);
      this.addtext(`\n<Rodada ${cont}>\n`);
      let i = 1;
      while (i < this.qtd) {
        this.addtext(`\n<Jogada ${i}>`);
        this.addtext(`\nA vez do Jogador ${ptAux.chave}:`);
        let carta = this.tiraCarta();
        this.addtext(`\nTirou a Carta ${carta}:`);
        let obj = this.executaCarta(carta, ptAnterior, ptAux);
        if (obj != null) {
          ptAnterior = obj.ant;
          ptAux = obj.fa;
        } else {
          ptAnterior = ptAux;
          ptAux = ptAux.proxNodo;
        }
        this.addtext(`\n</Jogada ${i}>\n`);
        i++;
      }
      this.addtext(`\n</Rodada ${cont}>\n`);
      cont++;
    }
    this.addtext(`\nVencedor é ${ptAux.chave}`);
  }
  //Pula o proximo jogador e o proximo jogador passa a ser o prox do prox.
  carta2(ptAtual) {
    let anterior;
    let futuroAtual;
    futuroAtual = ptAtual.proxNodo.proxNodo;
    anterior = ptAtual.proxNodo;

    return { fa: futuroAtual, ant: anterior, carta: 2 };
  }
  // Elimina o jogador atual
  carta3(ptAnterior, ptAtual) {
    ptAnterior.proxNodo = ptAtual.proxNodo;
    if (ptAtual.chave == this.ptLista.chave) {
      this.ptLista = ptAtual.proxNodo;
    }
    this.qtd--;
    return { fa: ptAtual.proxNodo, ant: ptAnterior, carta: 3 };
  }

  carta5(ptAtual) {
    let futuroAtual;
    let anterior;
    let anteriorRemovido;
    let removido;
    //Aqui define o curso normal do jogo
    futuroAtual = ptAtual.proxNodo;
    anterior = ptAtual;
    //Aqui define as sobreposicoes de remover o terceiro

    anteriorRemovido = futuroAtual;
    removido = anteriorRemovido.proxNodo;
    if (removido.chave == this.ptLista.chave) {
      this.ptLista = removido.proxNodo;
    }
    anteriorRemovido.proxNodo = removido.proxNodo;
    //Aqui remove 1 da rodada
    this.qtd--;
    return { fa: futuroAtual, ant: anterior, carta: 5 };
  }

  carta7(ptAnterior, ptAtual) {
    let antDoAnt;
    let ptaux1 = ptAtual;
    //Aqui pega o anterior do anterior para
    while (ptaux1.proxNodo.chave != ptAnterior.chave) {
      ptaux1 = ptaux1.proxNodo;
    }
    if (ptAnterior.chave == this.ptLista.chave) {
      this.ptLista = ptAtual;
    }
    //linkar o seu prox nodo ao ptAtual
    antDoAnt = ptaux1;
    antDoAnt.proxNodo = ptAtual;
    this.qtd--;
    return { fa: ptAtual.proxNodo, ant: ptAtual, carta: 7 };
  }

  //OK vou manter
  insereNohFim(nodo) {
    let ptAux = null;
    if (this.tahVazia() == true) {
      this.ptLista = nodo;
      this.playersNames.push(nodo.chave);
      //Universalizei o retorno
      return true;
    } else {
      ptAux = this.ptLista;

      //Aqui eu nao tenho de mudar pois enquando eu estiver inserindo os 10
      //Jogadores  && this.qtd < 10

      while (ptAux.proxNodo != null) {
        ptAux = ptAux.proxNodo;
      }
      if (this.qtd < 9) {
        ptAux.proxNodo = nodo;
        this.playersNames.push(nodo.chave);
        //Aqui aumenta o tamanho de qtd
        this.qtd++;
      } else if ((this.qtd = 9)) {
        ptAux.proxNodo = this.ptLista;
      }
    }
    return true;
  }
  //Ok vou manter mas terei de universalizar
  removeNoh(chave) {
    let ptRemove = null;
    if (this.tahVazia() == true) {
      return null;
    } else {
      let anterior = this.busca(chave, () => {
        //Aqui eu defino que eu quero que a busca faça com os parametros que ela
        //passa.
        return ptAux.proxNodo.chave == chave ? true : false;
      });
      if (anterior instanceof Nodo) {
        ptRemove = anterior.proxNodo;
        anterior.proxNodo = ptRemove.proxNodo;
        this.qtd--;
        return ptRemove;
      } else {
        return false;
      }
    }
  }
  // Removi o Insere no Início

  //Aqui eu tenho que universalizar essa busca de uma maneira inteligente.
  busca(chave, funcao) {
    if (this.tahVazia() == true) {
      return null;
    } else {
      // Pensar em solução de Busca Universal
      let qtdAux = 1;
      let ptAux = this.ptLista;
      while (qtdAux <= this.qtd + 1) {
        //Função argumento de busca a ser verificada
        let result = funcao(ptAux, chave);
        if (result) {
          return ptAux;
        }
        //Iterações
        ptAux = ptAux.proxNodo;
        qtdAux++;
      }
      return false;
    }
  }
}
