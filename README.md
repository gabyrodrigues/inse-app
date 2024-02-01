# 📝 Projeto Inse App

Este projeto tem a finalidade visualizar e filtrar os dados do [Nível Socioeconômico (Inse)](https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/indicadores-educacionais/nivel-socioeconomico) das Escolas de 2021 extraídos das fontes oficiais e públicas do Inep. A partir da aplicação desenvolvida em React JS é possível visualizar todas a lista de dados do Inse 2021, visualizar os detalhes de uma única escola, além de poder realizar uma busca e filtrar os principais dados da listagem.

## 💻 Produção

O projeto está disponível para testes em produção em: https://inse-app-web.onrender.com/.

## 👩‍💻 Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node JS](https://nodejs.org/en/about)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Mantine Dev](https://mantine.dev/)

## 🔧 Configurações
Antes de configurar o projeto, é necessário que as variáveis de ambiente nos arquivos .env's em cada projeto estejam preenchidas baseando-se no arquivo já criado `env.example`

#### 💠 Variáveis de Ambiente

```bash
DATABASE_URL="" # Variável local para configuração de conexão do banco de dados PostgreSQL para o Prisma.
```
Nela é preciso inserir o host, porta, nome do banco de dados, usuário do banco de dados, senha e o nome do schema. Para mais informações de como criar a variável verifique as docs do [Prisma](https://www.prisma.io/docs/orm/overview/databases/postgresql). No exemplo, criei um banco de dados e usuário com mesmo nome: `inse_app` e o schema com o nome `inse_app_schema`.

## 💻 Inicializando o projeto
Para instalar o projeto localmente, além das configurações citadas acima é necessário seguir o passo a passo para configurar tanto o backend quanto o frontend:

### BackEnd

1. Primeiramente entre na pasta server, é nela que está presente todo o código backend do projeto:

```bash
cd server
```

2.  Instalar todos os pacotes de dependências com o comando:

```bash
npm i
```

2.  Gere as migrations para criação do banco de dados a partir do Prisma (note que é necessário ter inserido corretamente as variáveis de ambiente citadas anteriormente):

```bash
npx prisma migrate dev
```

3. Gere o Prisma Client:
  
```bash
npx prisma generate
```

4. Popule o banco de dados com o arquivo Excel referente Inse de 2021:

```bash
npm run populate:db INSE_2021_escolas_1.xlsx
```

É importante notar que devido a grande quantidade de dados, o script pode demorar alguns minutos para finalizar a sua execução.

5. Suba o servidor local com:

```bash
npm run start:dev
```

6. (Opcional) Verifique o banco de dados criado no Prisma Studio:

```bash
npx prisma studio
```

### FrontEnd

1. Primeiramente entre na pasta frontend, é nela que está presente todo o código frontend do projeto:

```bash
cd frontend
```

2.  Instalar todos os pacotes de dependências com o comando:

```bash
npm i
```

3. Suba o servidor local com:

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador para visualizar o projeto. Note que tanto o servidor backend (pasta server) quanto o frontend precisam estar rodando ao mesmo tempo para que o projeto funcione

### 💠 Rotas da API
  - `/inse/filter?${queryOptions}`:  Rota para a realização de filtragem de dados, nela é possível ordernar os dados além de filtrar por opções como Classificação no Inse, Média do Inse e UF;
- `/inse/list`: listagem de todos os dados. Essa rota traz uma listagem de 100 itens, é possível adicionar o parâmetro `page=` para paginação. Também é possível verificar nos resultados a quantidade total de dados e de páginas.
- `/inse/search?${searchTerm}`:  Rota para a realização de busca de dados, nela é possível buscar por um termo correspondente a um nome de UF, Escola ou Município.
- `/inse/:id`:  Rota para a visualização de uma única escola passando como parâmetro o seu ID.
 
## 💡 Aprendizados

- _(Pro)_ A utilização de uma biblioteca de componentes principais reutilizáveis mas ainda customizáveis já prontos do [Mantine](https://mantine.dev/) e a utilização de um biblioteca de classes para estilização ([Tailwind CSS](https://tailwindcss.com/)) funcionou positivamente para acelerar o desenvolvimento e conseguir adaptar uma identidade visual básica.
- _(Pro)_ A utilização do Prisma como ORM no Node JS para gerenciar o PostgreSQL foi importante para o gerenciamento do banco de dados e criação de queries, trazendo uma rapidez maior para o desenvolvimento e mantendo uma organização básica.
- _(Melhoria)_ Uma organização melhor da arquitetura do projeto backend.
- _(Melhoria)_ Mais opções de filtragem dos dados.
- _(Melhoria)_ Aproveitar a rota de visualização única de uma escola e criar uma nova página para melhorar a visualização dos dados da escola, ao invés de ser apenas um modal.
