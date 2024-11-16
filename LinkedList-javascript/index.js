const fs = require('fs');
const path = require('path');

// Classe Node
class Node {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

// Classe LinkedList
class LinkedList {
    constructor() {
        this.cabeça = null;
    }

    // Método para adicionar um valor em uma posição específica
    adicionar(valor, pos) {
        if (pos < 0) {
            console.error(`Posição negativa (${pos}) é inválida. Valor ${valor} não inserido.`);
            return false;
        }

        let novoNo = new Node(valor);

        // Adiciona no início se a posição for 0 ou a lista estiver vazia
        if (pos === 0 || this.cabeça === null) {
            novoNo.proximo = this.cabeça;
            this.cabeça = novoNo;
            console.log(`Adicionado ${valor} na posição ${pos}.`);
            this.print();  // Print para conferir a lista após adição
            return true;
        }

        let atual = this.cabeça;
        let contador = 0;

        // Navega até a posição anterior ou final da lista
        while (contador < pos - 1 && atual !== null) {
            atual = atual.proximo;
            contador++;
        }

        if (contador < pos - 1 || atual === null) {
            console.error(`Posição do valor ${valor} maior do que o tamanho da lista, valor não inserido.`);
            return false;
        }

        novoNo.proximo = atual.proximo;
        atual.proximo = novoNo;
        console.log(`Adicionado ${valor} na posição ${pos}.`);
        this.print();  // Print para conferir a lista após adição
        return true;
    }

    // Método para remover um valor específico
    remover(valor) {
        if (this.cabeça === null) {
            console.error(`Valor ${valor} não existe na lista. Nenhuma remoção realizada.`);
            return false;
        }

        // Se o valor a ser removido for o da cabeça
        while (this.cabeça !== null && this.cabeça.valor === valor) {
            this.cabeça = this.cabeça.proximo;
        }

        let atual = this.cabeça;

        // Procura o valor na lista
        while (atual !== null && atual.proximo !== null) {
            if (atual.proximo.valor === valor) {
                atual.proximo = atual.proximo.proximo;  // Remove o nó
                console.log(`Valor ${valor} removido.`);
                this.print();  // Print para conferir a lista após remoção
                return true;
            }
            atual = atual.proximo;
        }

        console.error(`Valor ${valor} não existe na lista. Nenhuma remoção realizada.`);
        return false;
    }

    // Método para imprimir a lista
    print() {
        let atual = this.cabeça;
        let valores = [];
        while (atual !== null) {
            valores.push(atual.valor);
            atual = atual.proximo;
        }
        console.log("Lista atual:", valores.join(" "));
    }

    // Método para obter o tamanho da lista
    obterTamanho() {
        let atual = this.cabeça;
        let contador = 0;
        while (atual !== null) {
            contador++;
            atual = atual.proximo;
        }
        return contador;
    }

    // Inicializa a lista com valores do array
    inicializarLista(valores) {
        for (let valor of valores) {
            this.adicionar(valor, this.obterTamanho()); // Adiciona no final
        }
    }
}

// Função principal
function main() {
    const caminhoArquivo = path.join(__dirname, 'arq-novo.txt');

    // Verifica se o arquivo existe
    if (!fs.existsSync(caminhoArquivo)) {
        console.error(`Arquivo não encontrado no caminho: ${caminhoArquivo}`);
        return;
    }

    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erro ao ler o arquivo: ${err.message}`);
            return;
        }

        try {
            const linhas = data.split("\n").filter(linha => linha.trim() !== ""); // Filtra linhas vazias

            if (linhas.length < 2) {
                throw new Error("Arquivo deve conter pelo menos uma lista inicial e a quantidade de operações.");
            }

            const lista = new LinkedList();

            // Inicializar lista com a primeira linha
            const valores = linhas[0].split(" ").map(Number);
            lista.inicializarLista(valores);

            const quantidadeOperacoes = parseInt(linhas[1]);
            // Processar operações
            for (let i = 0; i < quantidadeOperacoes; i++) {
                const linhaOperacao = linhas[i + 2];
                if (!linhaOperacao) {
                    throw new Error(`Operação esperada na linha ${i + 3}, mas a linha está ausente.`);
                }

                const operacao = linhaOperacao.split(" ");
                const acao = operacao[0];

                if (acao === "A") {
                    const numero = parseInt(operacao[1]);
                    const posicao = parseInt(operacao[2]);

                    if (isNaN(numero) || isNaN(posicao)) {
                        console.error(`Erro na operação de adição na linha ${i + 3}: parâmetros inválidos.`);
                    } else if (!lista.adicionar(numero, posicao)) {
                        console.error(`Operação de adição falhou para o valor ${numero} na posição ${posicao}.`);
                    }
                } else if (acao === "R") {
                    const numero = parseInt(operacao[1]);

                    if (isNaN(numero)) {
                        console.error(`Erro na operação de remoção na linha ${i + 3}: número inválido.`);
                    } else if (!lista.remover(numero)) {
                        console.error(`Operação de remoção falhou para o valor ${numero}.`);
                    }
                } else if (acao === "P") {
                    lista.print();
                } else {
                    console.error(`Ação desconhecida "${acao}" na linha ${i + 3}.`);
                }
            }
        } catch (erro) {
            console.error(`Erro no processamento do arquivo: ${erro.message}`);
        }
    });
}

// Executando o código
main();
