![](./images/Home.png)
<div align="center" id="top"> 

&#xa0;

  <!-- <a href="https://proffy-web-reactJsV2.netlify.app">Demo</a> -->
</div>

<h1 align="center">proffy web reactJs V2</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/dionathanCordova/proffy-web-reactJsV2?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/dionathanCordova/proffy-web-reactJsV2?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/dionathanCordova/proffy-web-reactJsV2?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/dionathanCordova/proffy-web-reactJsV2?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/dionathanCordova/proffy-web-reactJsV2?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/dionathanCordova/proffy-web-reactJsV2?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/dionathanCordova/proffy-web-reactJsV2?color=56BEB8" /> -->
</p>

<!-- Status -->

<h4 align="center"> 
	🚧  proffy-web-reactJsV2 🚀 Under construction...  🚧
</h4> 

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#sparkles-todo">Todo</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/dionathanCordova" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

An new version of a plataform do give end study classes online, the first version was made by Rocketseat team on NLW week, this is an event how we can learn abaut ReactJs, ReactNative and NodeJs.

## :rocket: Technologies ##

The following tools were used in this project:

<!-- - [Expo](https://expo.io/) -->
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sqlite](https://www.sqlite.org/index.html)
- [knex](https://devhints.io/knex)

## :tada: Features ##

:heavy_check_mark: Authenticação de usuário\

A primeira nova funcionalidade da sua aplicação será a autenticação de usuários nas aplicações Web e Mobile. Para isso, nós primeiramente devemos criar, no nosso servidor, a funcionalidade para o usuário se cadastrar, inserindo seu e-mail e senha.

```

Dica: Antes de salvar a senha do usuário no banco de dados, 
lembre-se sempre de criptografar a senha para manter ela segura. 
Para isso você pode utilizar bibliotecas como o bcrypt.

```

Depois de permitir a criação de uma senha para todos os usuários cadastrados, 
você precisa de uma rota para o login do usuário. Essa rota deve validar a senha do usuário 
no banco de dados e uma boa estratégia para manter o usuário logado por um tempo 
determinado é utilizar tokens JWT.

O usuário deve poder logar em sua conta para acessar a aplicação para escolher se ele quer dar aulas, 
ou mesmo visualizar professores disponíveis, tanto no web quanto no mobile.

```

Dica: Para manter o usuário logado no mobile, caso ele clique na opção "Lembrar-me", 
você pode salvar o token JWT no LocalStorage do navegador (Web) ou AsyncStorage da sua aplicação mobile. 
Caso ele não selecione para se Lembrar, você pode apenas mantê-lo autenticado durante 
uma sessão (até fechar a aplicação).

```

:heavy_check_mark: Recuperação de senha\

Nem sempre um usuário vai se lembrar da sua senha para logar na aplicação, principalmente se há muito tempo que ele acessou pela última vez, então uma funcionalidade essencial é a funcionalidade de recuperar a senha do usuário, para a conclusão dessa task precisamos disponibilizar na aplicação o envio de email contando um link contendo o token de verificação do usuário.

:x: Página de profile

Após a autenticação de um professor na aplicação WEB, você deve permitir que ele possa exibir o seu perfil e permitir também que ele edite algumas informações do seu cadastro. 

Para isso, no seu backend implemente uma rota para alteração do perfil. Ele deve poder alterar as seguintes informações:

- Alterar horário/dias de disponibilidade
- Alterar o número de WhatsApp
- Alterar sua biografia
- Alterar seu valor por hora de aula

```

Dica: No perfil do usuário irá sempre aparecer os dados que ele cadastrou na página 
"Dar aulas", então sempre ao entrar no seu perfil, busque essas informações do banco 
de dados para exibi-las nos campos.

```

:x: Paginação na listagem de proffys

O usuário logado na aplicação pode visualizar todos os professores disponíveis na plataforma, mas exibir todos os professores de uma só vez pode ser bastante prejudicial para a performance da sua aplicação.

Para resolver esse problema, implemente uma paginação na listagem de professores disponíveis. Essa paginação deve ser feita ao buscar os itens da sua api, e você pode mandar uma informação pelo corpo da requisição, como por exemplo `"page": 1"` para que você saiba quais itens retornar do banco de dados.

:x: Exibindo horários disponíveis dos proffys

Na sua listagem de proffys, se você olhar no layout, perceberá que é exibido todos os horários disponíveis dos professores logo abaixo da bio dele. Seu trabalho é implementar essa funcionalidade.

Para isso, você apenas precisa trazer junto aos dados do proffy as informações de seus dias disponíveis fazendo um join com a tabela `class_schedule` para retornar esses dados junto com a listagem.

:x: Salvando seus proffys favoritos

Agora, você deve salvar seus proffys favoritos no banco de dados! Para isso, você pode criar uma tabela `favorites` que irá salvar o id do seu usuário logado e o id do seu proffy favorito.

Assim, toda vez que você entrar na página de proffys favoritos, você irá ter atualizado os seus proffys que você mais adora!

:x: Logout da aplicação

Como última funcionalidade, mas não menos importante, você deve implementar uma função de logout na aplicação, para que o usuário possa trocar de conta caso ele deseje.

:x: Deploy da aplicação

Agora é a hora de se desafiar a publicar a sua aplicação na WEB para todo mundo poder acessar! Nós criamos um guia **exclusivo** para essa edição da NLW ensinando do zero o processo de deploy da nossa aplicação, e o melhor, você ainda ainda vai aprender a configurar o PostgreSQL na sua aplicação!

## :pushpin: Todo

- [x] Authenticação de usuário
- [x] Recuperação de senha
- [x] Página de profile
- [ ] Splash Screen no React Native com Expo
- [ ] Paginação na listagem de proffys
- [ ] Exibindo horários disponíveis dos proffys
- [ ] Salvando seus proffys favoritos
- [x] Logout da aplicação
- [ ] Deploy da aplicação

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/dionathanCordova/proffy-web-reactJsV2

# Access
$ cd proffy-web-reactJsV2

# Install dependencies
$ yarn

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/dionathanCordova" target="_blank">Dionathan Córdova</a>

&#xa0;

<a href="#top">Back to top</a>
