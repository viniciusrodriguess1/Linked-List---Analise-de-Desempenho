class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

class LinkedList {
    constructor() {
        this.cabeça = null;
    }

    adicionar(valor, pos) {
        let novoNo = new Node(valor);
        if (pos === 0 || this.cabeça === null) {
            novoNo.proximo = this.cabeça;
            this.cabeça = novoNo;
            return;
        }

        let atual = this.cabeça;
        for (let i = 0; i < pos - 1; i++) {
            if (atual.proximo === null) {
                break;
            }
            atual = atual.proximo;
        }
        novoNo.proximo = atual.proximo;
        atual.proximo = novoNo;
    }

    remover(valor) {
        if (this.cabeça === null) return;

        if (this.cabeça.valor === valor) {
            this.cabeça = this.cabeça.proximo;
            return;
        }

        let atual = this.cabeça;
        while (atual.proximo !== null && atual.proximo.valor !== valor) {
            atual = atual.proximo;
        }

        if (atual.proximo !== null) {
            atual.proximo = atual.proximo.proximo;
        }
    }

    print() {
        let atual = this.cabeça;
        let valores = [];
        while (atual !== null) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log(valores.join(" "));
    }

    inicializarLista(valores) {
        for (let valor of valores) {
            this.adicionar(valor, Number.MAX_SAFE_INTEGER); // Simula Integer.MAX_VALUE
        }
    }
}

const fs = require('fs');

function main() {
    const lista = new LinkedList();
    const caminhoArquivo = "Linked-List---Analise-de-Desempenho/arq.txt";

    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
        if (err) {
            console.log("Erro ao ler o arquivo: " + err.message);
            return;
        }

        const linhas = data.split("\n");
        const valores = linhas[0].split(" ");
        const arrayInicial = valores.map(valor => parseInt(valor));
        lista.inicializarLista(arrayInicial);

        const quantidadeOperacoes = parseInt(linhas[1]);

        for (let i = 0; i < quantidadeOperacoes; i++) {
            const operacao = linhas[i + 2].split(" ");
            const acao = operacao[0];

            if (acao === "A") {
                const numero = parseInt(operacao[1]);
                const posicao = parseInt(operacao[2]);
                if (posicao > arrayInicial.length) {
                    console.log(`Posição do valor ${numero} maior do que o tamanho da lista, valor não inserido`);
                } else {
                    lista.adicionar(numero, posicao);
                }
            } else if (acao === "R") {
                const numero = parseInt(operacao[1]);
                lista.remover(numero);
            } else if (acao === "P") {
                lista.print();
            }
        }
    });
}

main();
