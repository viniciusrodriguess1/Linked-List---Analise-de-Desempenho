public class App {
    public static void main(String[] args) {
        // Caminho para o arquivo de operações
        String caminhoArquivo = "caminho_do_arquivo.txt";  // Insira o caminho do arquivo aqui
        
        // Criando a lista ligada com as operações do arquivo
        LinkedList lista = Leitor.lerLinkedListComOperacoes(caminhoArquivo);
        
        // Exibindo o conteúdo final da lista
        lista.printList();
    }
}
