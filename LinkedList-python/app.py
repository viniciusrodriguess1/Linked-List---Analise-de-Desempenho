class Node:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class LinkedList:
    def __init__(self):
        self.cabeça = None

    def adicionar(self, valor, pos=None):
        novo_no = Node(valor)

        # Caso seja para adicionar no início
        if pos == 0 or self.cabeça is None:
            novo_no.proximo = self.cabeça
            self.cabeça = novo_no
            return

        # Caso seja para adicionar no final
        if pos is None:
            atual = self.cabeça
            while atual.proximo is not None:
                atual = atual.proximo
            atual.proximo = novo_no
            return

        # Caso seja para adicionar em uma posição específica
        if pos > self.tamanho():
            print(f"Posição inválida para adicionar o valor {valor}.")
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
            print(f"Valor {valor} não encontrado para remoção.")
            return

        if self.cabeça.valor == valor:
            self.cabeça = self.cabeça.proximo
            return

        atual = self.cabeça
        while atual.proximo is not None and atual.proximo.valor != valor:
            atual = atual.proximo

        if atual.proximo is not None:
            atual.proximo = atual.proximo.proximo
        else:
            print(f"Valor {valor} não encontrado para remoção.")

    def print(self):
        atual = self.cabeça
        while atual is not None:
            print(atual.valor, end=" ")
            atual = atual.proximo
        print()

    def tamanho(self):
        contador = 0
        atual = self.cabeça
        while atual is not None:
            contador += 1
            atual = atual.proximo
        return contador

    def inicializar_lista(self, valores):
        for valor in valores:
            self.adicionar(valor, None)  # Adiciona no final

def main():
    lista = LinkedList()
    caminho_arquivo = r"C:\Users\vinic\Área de Trabalho\projetos\Linked-List---Analise-de-Desempenho\arq-novo.txt"

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
