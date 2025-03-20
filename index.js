const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

function normalizarTitulo(titulo) {
   return tokenizer.tokenize(titulo
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove todos os acentos do titulo
    .replace(/\b1\s*(litro|l)\b/g, "1l") // Padroniza "1l" e "1 litro"
    .replace(/\b1\s*(quilo|kg)\b/g, "1kg") // Padroniza "1kg" e "1 Quilo"
    .replace(/\b(tipo|tipo)\s*/g, "") // Remove o Tipo do titulo
    ).sort().join(" ");
}

function categorizeProducts(produtos) {
    //Inicia a constante de categories para criação do JSON
  const categories = {};


  //Para cada produto de produtos faça:
  for (const produto of produtos) {

    //Normaliza o titulo
    const normalizedTitle = normalizarTitulo(produto.title);

    //Se a não existir a categoria com o titulo normalizado, cria um novo.
    if (!categories[normalizedTitle]) {
      categories[normalizedTitle] = {   
        category: produto.title,
        count: 0,
        products: [],
      };
    }

    //Aumenta o valor no contador do titulo presente.
    categories[normalizedTitle].count++;
    //Inclui na lista de objetos o produto.
    categories[normalizedTitle].products.push({
      title: produto.title,
      supermarket: produto.supermarket,
    });
  }


  //Após toda a interação ele retorna o Objeto completo!
  return Object.values(categories);
}

// Exemplo de uso
const products = [
    {
      "id": 1,
      "title": "Leite Integral Piracanjuba 1L",
      "supermarket": "Supermercado A",
    },
    {
      "id": 2,
      "title": "Leite Piracanjuba Integral 1L",
      "supermarket": "Supermercado B",
    },
    {
      "id": 3,
      "title": "Leite Integral Italac 1L",
      "supermarket": "Supermercado A",
    },
    {
      "id": 4,
      "title": "Leite Italac Integral 1L",
      "supermarket": "Supermercado C",
    },
    {
      "id": 5,
      "title": "Leite Parmalat Integral 1L",
      "supermarket": "Supermercado D",
    },
    {
      "id": 6,
      "title": "Leite Desnatado Piracanjuba 1L",
      "supermarket": "Supermercado A",
    },
    {
      "id": 7,
      "title": "Piracanjuba Leite Desnatado 1L",
      "supermarket": "Supermercado B",
    },
    {
      "id": 8,
      "title": "Leite Semi-Desnatado Piracanjuba 1L",
      "supermarket": "Supermercado A",
    },
    {
      "id": 9,
      "title": "Leite Piracanjuba Semi Desnatado 1 Litro",
      "supermarket": "Supermercado C",
    },
    {
      "id": 10,
      "title": "Arroz Branco Tio João 5kg",
      "supermarket": "Supermercado A",
    },
    {
      "id": 11,
      "title": "Arroz Tio João Branco 5kg",
      "supermarket": "Supermercado B",
    },
    {
      "id": 12,
      "title": "Arroz Tio João Integral 5kg",
      "supermarket": "Supermercado A",
    },
    {
      "id": 13,
      "title": "Feijão Carioca Camil 1kg",
      "supermarket": "Supermercado A",
    },
    {
      "id": 14,
      "title": "Feijão Camil Tipo Carioca 1kg",
      "supermarket": "Supermercado C",
    },
    {
      "id": 15,
      "title": "Feijao Carioca Camil 1 Quilo",
      "supermarket": "Supermercado D",
    }
  ]

console.log(JSON.stringify(categorizeProducts(products), null, 2));
