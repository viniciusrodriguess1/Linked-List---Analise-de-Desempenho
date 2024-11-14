class Node:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class LinkedList:
    def __init__(self):
        self.cabeça = None

    def adicionar(self, valor, pos):
        novo_no = Node(valor)
        if pos == 0 or self.cabeça is None:
            novo_no.proximo = self.cabeça
            self.cabeça = novo_no
            return

        atual = self.cabeça
        for _ in range(pos - 1):
            if atual.proximo is None:
                break
            atual = atual.proximo
        novo_no.proximo = atual.proximo
        atual.proximo = novo_no

    def remover(self, valor):
        if self.cabeça is None:
            return

        if self.cabeça.valor == valor:
            self.cabeça = self.cabeça.proximo
            return

        atual = self.cabeça
        while atual.proximo is not None and atual.proximo.valor != valor:
            atual = atual.proximo

        if atual.proximo is not None:
            atual.proximo = atual.proximo.proximo

    def print(self):
        atual = self.cabeça
        while atual is not None:
            print(atual.valor, end=" ")
            atual = atual.proximo
        print()

    def inicializar_lista(self, valores):
        for valor in valores:
            self.adicionar(valor, float('inf'))  # Usa float('inf') para simular Integer.MAX_VALUE

def main():
    lista = LinkedList()
    caminho_arquivo = "Linked-List---Analise-de-Desempenho/arq.txt"

    try:
        with open(caminho_arquivo, 'r') as arquivo:
            valores = arquivo.readline().split()
            array_inicial = [int(valor) for valor in valores]
            lista.inicializar_lista(array_inicial)

            quantidade_operacoes = int(arquivo.readline().strip())

            for _ in range(quantidade_operacoes):
                operacao = arquivo.readline().split()
                acao = operacao[0]

                if acao == "A":
                    numero = int(operacao[1])
                    posicao = int(operacao[2])
                    if posicao > len(array_inicial):
                        print(f"Posição do valor {numero} maior do que o tamanho da lista, valor não inserido")
                    else:
                        lista.adicionar(numero, posicao)

                elif acao == "R":
                    numero = int(operacao[1])
                    lista.remover(numero)

                elif acao == "P":
                    lista.print()

    except IOError as e:
        print(f"Erro ao ler o arquivo: {e}")

if __name__ == "__main__":
    main()
