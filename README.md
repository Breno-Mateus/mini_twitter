# Mini Twitter - Frontend

Este projeto foi desenvolvido como parte de um teste técnico para um processo seletivo. Ele consiste na interface de um microblogging (Mini Twitter), permitindo funcionalidades como cadastro, login, visualização de feed, criação e busca de publicações.

## Importante: Configuração do Backend

Para que a aplicação funcione corretamente e consiga realizar as requisições, **é obrigatório rodar o backend em conjunto com este frontend**. 

Você pode baixar o código fonte do backend necessário através do link abaixo:

[Download do Backend (Arquivo .zip)](https://t3020915.p.clickup-attachments.com/t3020915/fcf1435e-2f27-4a13-92bf-09eb3ba1b94d/mini-twitter-backend-main.zip)

Certifique-se de extrair o arquivo, instalar as dependências e iniciar o servidor local do backend antes de testar a interface. Consulte a documentação interna do backend para as instruções específicas de inicialização dele.

## Como rodar o Frontend localmente

Após iniciar o servidor do backend, siga os passos abaixo para rodar esta interface:

1. Clone este repositório para a sua máquina.
2. Acesse a pasta do projeto no terminal.
3. Instale as dependências executando:
   ```bash
   npm install

Inicie o servidor de desenvolvimento:
  ```bash
   npm run dev
  ```
Acesse o endereço local gerado no terminal (geralmente http://localhost:5173) no seu navegador.

## Tecnologias Utilizadas:

- React

- Tailwind CSS (v4)

- Zustand (Gerenciamento de Estado)

- React Hook Form + Zod (Validação de Formulários)

- React Query (Gerenciamento de Requisições)

- React Router DOM (Navegação)