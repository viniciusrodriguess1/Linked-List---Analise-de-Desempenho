public class LinkedList {
    private Node cabeça;

    public void adicionar(int valor, int pos) {
        Node newNode = new Node(valor);
        if (pos == 0 || cabeça == null) {
            newNode.proximo = cabeça;
            cabeça = newNode;
            return;
        }
        Node atual = cabeça;
        for (int i = 0; i < pos - 1 && atual.proximo != null; i++) {
            atual = atual.proximo;
        }
        newNode.proximo = atual.proximo;
        atual.proximo = newNode;
    }

    public void remover(int valor) {
        if (cabeça == null) return;

        if (cabeça.valor == valor) {
            cabeça = cabeça.proximo;
            return;
        }

        Node atual = cabeça;
        while (atual.proximo != null && atual.proximo.valor != valor) {
            atual = atual.proximo;
        }

        if (atual.proximo != null) {
            atual.proximo = atual.proximo.proximo;
        }
    }

    public void print() {
        Node atual = cabeça;
        while (atual != null) {
            System.out.print(atual.valor + " ");
            atual = atual.proximo;
        }
        System.out.println();
    }

    public void inicializarLista(int[] valores) {
        for (int valor : valores) {
            adicionar(valor, Integer.MAX_VALUE);
        }
    }
}
