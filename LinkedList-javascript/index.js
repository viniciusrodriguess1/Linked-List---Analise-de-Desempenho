const fs = require('fs');

function lerArquivo(pathArquivo){
const linhas= fs.readFileSync(caminhoArquivo, 'utf-8').split('\n');

linhas.forEach((linha,index) => {console.log('Linha ${index + 1}: ${linha}');
})
}

const caminhoArquivo = 'Linked-List---Analise-de-Desempenho\arq.txt'
lerArquivo(caminhoArquivo);