# Fase de build
FROM node:20 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build do projeto Next.js
RUN npm run build

# Fase de produção
FROM node:20 AS runner

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Define a variável de ambiente para a URL da API
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Define a variável de ambiente para a porta
ENV PORT=3001

# Expõe a porta que a aplicação irá rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
