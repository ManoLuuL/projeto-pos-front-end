## Instalação

Para executar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/vue-auth-crud-app.git
2. Navegue até o diretório do projeto:
   ```bash
   cd projeto-pos-front-end
3. Instale as dependências:
   ```bash
   bun install
4. Execute:
   ```bash
   bun run dev

## Uso
Autenticação
Login: Os usuários podem fazer login utilizando o email e a senha cadastrados.
Registro: Novos usuários podem se registrar com email e senha. Os dados são armazenados no localStorage.
Logout: Uma vez logado, o usuário pode realizar o logout, que limpa o localStorage e o redireciona para a página de login.

Qunado iniciar o projeto, basta ir na tela de registro e fazer um novo registro.
![image](https://github.com/user-attachments/assets/06dff4d6-2a23-4f0b-9a8b-05fdd836cc2b)

Após isso será redirecionado para tela de login, basta fazer o login que assim será possivel ver os posts.
![image](https://github.com/user-attachments/assets/b8f4c365-fc27-44e6-b3a2-10bf4fa2a2a4)



## Posts
 Usuários podem visualizar uma lista de posts.



## Tecnologias

- **Vue.js:** O framework progressivo para JavaScript.
- **Pinia:** Biblioteca de gerenciamento de estado.
- **Vue Router:** Roteador oficial para Vue.js.
- **Tailwind CSS:** Framework CSS utilitário para estilização.
- **Axios:** Cliente HTTP baseado em Promises para o navegador.
- **Vite:** Ferramenta de build de próxima geração.
- **Bun:** Um novo bundler e runtime rápido, que pode ser utilizado como alternativa ao Node.js.



