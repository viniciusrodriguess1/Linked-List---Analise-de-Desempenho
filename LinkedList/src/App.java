import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class App {
    public static void main(String[] args) {
        LinkedList lista = new LinkedList();
        String caminhoArquivo = "arq.txt";

        try (BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo))) {
            
            String[] valores = br.readLine().split(" ");
            int[] arrayInicial = new int[valores.length];
            for (int i = 0; i < valores.length; i++) {
                arrayInicial[i] = Integer.parseInt(valores[i]);
            }
            lista.inicializarLista(arrayInicial);

            int quantidadeOperacoes = Integer.parseInt(br.readLine());

            for (int i = 0; i < quantidadeOperacoes; i++) {
                String[] operacao = br.readLine().split(" ");
                String acao = operacao[0];

                if (acao.equals("A")) {
                    int numero = Integer.parseInt(operacao[1]);
                    int posicao = Integer.parseInt(operacao[2]);
                    lista.adicionar(numero, posicao);
                } else if (acao.equals("R")) {
                    int numero = Integer.parseInt(operacao[1]);
                    lista.remover(numero);
                } else if (acao.equals("P")) {
                    lista.print();
                }
            }
        } catch (IOException e) {
            System.out.println("Erro ao ler o arquivo: " + e.getMessage());
        }
    }
}
