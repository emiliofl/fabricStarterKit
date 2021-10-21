# Parte 3 - Configurar e executar um aplicativo cliente
O aplicativo cliente é baseado em Node.js. Usamos uma API REST expressjs para interagir com o razão e fornecer uma interface de reação pública.

## Requisitos de instalação do Node.js.
Primeiro instale os node_modules necessários.
```bash
# certifique-se de que está na pasta de backend
pwd
# > /root/fabric/fabricStarterKit/backend

# dê uma olhada no arquivo package.json se você estiver interessado
npm install
```

## Adicionar um usuário à Wallet
O aplicativo cliente precisa de um usuário para interagir com o razão. Podemos usar **User1@org1.example.com** que foi criado durante o processo de inicialização.

A segunda etapa é adicionar esse usuário à carteira do sistema de arquivos local do cliente. Podemos fazer isso com o seguinte comando.

```bash
node cli/addToWallet.js
# > done

# verifique a wallet
tree wallet

# você deve ver a seguinte saída
wallet
└── User1@org1.example.com.id

# sinta-se à vontade para inspecionar esse arquivo
cat wallet/User1@org1.example.com.id | jq .
```

## Instale o global helper, se necessário
Podemos instalar algumas ferramentas auxiliares globais e comuns.

```bash
npm install nodemon mocha -g
```

## Iniciar API REST
Precisamos de outro painel tmux.

>**** Crie um novo painel horizontalmente ****<br> 
CTRL + b " (double-quots)

Start expressjs.
```bash
nodemon start index.js
```

## Teste com comandos CLI
Precisamos de outro painel tmux.
>**Crie um novo painel horizontalmente**<br> 
CTRL + b " (double-quots)

```bash
# chame um teste específico com mocha
# valores possíveis ['api','setData','getData','delAsset','getAllAssets','getHistory']

mocha -g "getAllAssets" cli/commands.js
```

[Index](../README.md#fabric-Developer-starter-kit) | [Previous](../network/readme.md) | [Next](./readmeFrontend.md)

