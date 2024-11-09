class LinkedList {
    private Node head;

    public LinkedList() {
        this.head = null;
    }

    // Método para adicionar um nó na posição especificada
    public void add(int data, int position) {
        Node newNode = new Node(data);

        if (position == 0) {
            newNode.next = head;
            head = newNode;     
        } else {
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                if (current == null) {
                    System.out.println("Posição inválida para adição: " + position);
                    return;
                }
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    // Método para remover um nó na posição especificada
    public void remove(int position) {
        if (head == null) {
            System.out.println("Lista vazia. Nenhum elemento para remover.");
            return;
        }

        if (position == 0) {
            head = head.next;
        } else {
            Node current = head;
            for (int i = 0; i < position - 1; i++) {
                if (current == null || current.next == null) {
                    System.out.println("Posição inválida para remoção: " + position);
                    return;
                }
                current = current.next;
            }
            if (current.next != null) {
                current.next = current.next.next;
            } else {
                System.out.println("Posição inválida para remoção: " + position);
            }
        }
    }

    // Método para exibir os elementos da lista
    public void printList() {
        Node current = head;
        System.out.print("Lista: ");
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }
}
