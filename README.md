# Teste FrontEnd iCasei

## Descrição

Teste feito para o processo seletivo para a vaga de Desenvolvedor FrontEnd na iCasei

## Instruções gerais

1. Clonar o repositório e entrar na pasta principal:

   ```bash
   git clone https://github.com/vicovaporub/desafio-frontend-icasei.git

   ```

   ```bash
   cd desafio-frontend-icasei

   ```

2. Instalação das dependências e montagem do BFF

   ```bash
   cd bff
   npm i
   npm run build

   ```

3. Instalação das dependências e montagem do MF_DRAWER

   ```bash
   cd ../mf_drawer
   npm i
   npm run build

   ```

4. Instalação das dependências e montagem do MF_VIDEOS

   ```bash
   cd ../mf_videos
   npm i
   npm run build

   ```

5. Configuração da chave de API nas variáveis de ambiente

   ```bash
   cd ..

   ```

   ```bash

   # Dentro do arquivo docker-compose.yml você vai encontrar:

    environment:
      - SERVER_URL=http://localhost
      - MAIN_PORT=3000
      - DRAWER_URL=http://localhost:3001
      - VIDEOS_URL=http://localhost:3002
      - YT_API_KEY=SUA_CHAVE_DE_ACESSO
      - YT_API_URL=https://www.googleapis.com/youtube/v3/search

   # Substitua SUA_CHAVE_DE_ACESSO pela sua chave de acesso e salve o arquivo

   ```

6. Montagem do docker e inicialização do projeto

   ```bash
   docker compose build --no-cache

    # Esperar a montagem

   docker compose up

   ```

   Por padrão o projeto estará disponível no http://localhost:3000 por completo, MF_DRAWER no http://localhost:3001 e MF_VIDEOS no http://localhost:3002

7. Realizando os testes unitários (considerando o terminal na pasta principal do projeto)

   ```bash
    # Teste no BFF
    cd bff
    npm test

   ```

   ```bash
   # Teste no MF_DRAWER
   cd mf_drawer
   npm test

   ```

   ```bash
   # Teste no MF_VIDEOS
   cd mf_videos
   npm test

   ```

   **NOTA:** Comandos para rodar manualmente (sem Docker):

   ```bash
      # BFF
      nodemon

      # MF_DRAWER e MF_VIDEOS
      npm start
   ```
