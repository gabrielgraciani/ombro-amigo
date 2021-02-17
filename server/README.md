<p align="center">
    <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-começando">Começando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-licença">Licença</a>
</p>

## 💻 Sobre

- Uma plataforma online onde pessoas podem desabafar uma com as outras, pedir conselhos e conhecer novos amigos.

## 🚀 Tecnologias

### Back-end

- [NodeJS](https://nodejs.org/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) - Executa e observa alterações na API
- [TypeORM](https://typeorm.io/) - ORM usado com Node.js, JavaScript, TypeScript e outras linguagens
- [Postgres](https://www.postgresql.org/) - Banco de Dados
- [Docker](https://www.docker.com/) - Criação de ambientes isolados (containers).
- [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS) - Permite que endereços (domínios) diferentes acessem a API
- [REDIS](https://redis.io/) - Armazenamento de estrutura de dados em memória (cache).

## ⌛ Começando

Em primeiro lugar, você precisa ter o *node* e *yarn* (ou *npm*) instalado em sua máquina.

*Se você decidir usar o npm, não se esqueça de deletar yarn.lock nas pastas*

Então você pode clonar o repositório.

`git clone https://github.com/gabrielgraciani/ombro-amigo`

Iniciando a aplicação.

1. Instale as dependências do projeto: `yarn ou npm install`
2. Instale o docker: https://docs.docker.com/get-docker/
3. Crie uma imagem do postgres com a seguinte linha de comando no seu terminal: `docker run --name ombro-amigo -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
4. Inicie a sua imagem do postgres: `docker start ombro-amigo` <br> *toda vez que o computador for reiniciado é necessário rodar este comando*
5. Crie uma imagem do Redis com a seguinte linha de comando no seu terminal: `docker run --name redis -p 6379:6379 -d -t redis:alpine`
6. Inicie a sua imagem do Redis: `docker start redis` <br> *toda vez que o computador for reiniciado é necessário rodar este comando*
7. Instale o dbeaver (ferramenta de acesso ao banco de dados): https://dbeaver.io/
8. Inicie uma nova conexão com as seguintes configurações: <br>
-PostgreSQL <br>
-Host: localhost <br>
-Database: ombro_amigo <br>
-username: postgres <br>
-password: docker
9. Com o banco criado, execute as migrations: `yarn typeorm migration:run ou npm run typeorm migration:run`
10. Inicie o servidor: `yarn dev ou npm run dev`

## 📝 Licença

Este projeto está sob a licença MIT. Veja a [licença](LICENSE) para mais informações.

---

Feito por Gabriel Thomaz Graciani 👋 [Fale comigo!](https://www.linkedin.com/in/gabriel-thomaz-graciani-98400b166/) e Daniel Santos Rocha 👋 [Fale comigo!](https://www.linkedin.com/in/daniel-santos-rocha-32201015a/)
