# Projeto Frontend com Next.js

Este projeto é uma aplicação frontend desenvolvida utilizando [Next.js](https://nextjs.org/) e [Tailwind CSS](https://tailwindcss.com/). A aplicação consome uma API externa, cuja URL deve ser definida no arquivo de ambiente.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker](https://www.docker.com/) (opcional, caso queira rodar o projeto com Docker)

## Configuração do Ambiente

Antes de rodar o projeto, é necessário configurar o ambiente:

**Criar o arquivo `.env`:**

Na raiz do projeto, crie um arquivo `.env` com a seguinte variável de ambiente:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
Substitua http://localhost:3000 pela URL da API que será consumida pela aplicação.
```

## Como Rodar o Projeto

## Usando Node.js

Se você tem o Node.js instalado na sua máquina, siga os passos abaixo:

**Instale as dependências do projeto:**

Na raiz do projeto, execute o comando:

bash
Copiar código
npm install

## Inicie o servidor de desenvolvimento:

**Após a instalação das dependências, execute:**

bash
Copiar código
npm run dev

A aplicação estará disponível em http://localhost:3000.

## Usando Docker

Se preferir rodar o projeto utilizando Docker, siga os passos abaixo:

**Certifique-se de ter o Docker instalado na sua máquina.**

Construa e inicie os containers:

**Na raiz do projeto, execute:**

bash
Copiar código
docker-compose up -d
O Docker irá construir a imagem e rodar o container da aplicação.

## A aplicação estará disponível em http://localhost:3000, a menos que a porta tenha sido alterada no arquivo docker-compose.yml.

Observações
Variáveis de Ambiente: Certifique-se de que o arquivo .env está corretamente configurado antes de iniciar o projeto, tanto em desenvolvimento quanto em produção.

Docker: Para usar o Docker, é necessário que a URL da API esteja acessível a partir do container.
