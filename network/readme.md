## Parte 2 - Usando o devNetwork
Depois de instalarmos com sucesso a etapa 1, podemos experimentar o kit inicial.

Assumindo que a seguinte estrutura de pastas, que já deve existir.
```bash
root@jsday:~/fabric 

tree -L 1
.
├── fabric-samples
└── fabricStarterKit
```
Vamos começar a rede de desenvolvimento.

```bash
# mudar para a pasta clonada
cd fabricStarterKit

# inicie um novo terminal tmux
tmux new -s dev

# habilitar rolagem
CTRL + b :set -g mouse on

# --------------------
# no terminal 1
# --------------------
./network/devNetwork.sh up

#./network/devNetwork.sh up -ca
#./network/devNetwork.sh up -s (http://your-url:5984/_utils/#login)

# --------------------
# no terminal 2
# --------------------

# inicie o chaincode em Node.js
cd chaincode/nodejs/starter

# instalar node_modules (pela primeira vez)
npm install 

# inicie o chaincode manualmente
CORE_CHAINCODE_LOGLEVEL=debug CORE_PEER_TLS_ENABLED=false CORE_CHAINCODE_ID_NAME=mycc:1.0 ./node_modules/.bin/fabric-chaincode-node start --peer.address 127.0.0.1:7052

# --------------------
# no terminal 3
# --------------------
cd $HOME/fabric/fabricStarterKit

# definir variáveis ​​de ambiente adequadas
source ./network/startup.sh

## teste o chaincode com comandos CLI durante o desenvolvimento do chaincode
# criar ou atualizar um ativo
peer chaincode invoke -o 127.0.0.1:7050 -C ch1 -n mycc -c '{"Args":["starter:set","{\"no\":\"a1\", \"desc\":\"Product number 1\",\"amount\":10, \"price\":\"500\"}"]}'

# consultar o estado mundial de um ativo
peer chaincode query -C ch1 -n mycc -c '{"Args":["starter:get","a1"]}' | jq .

# consultar o histórico de um ativo
peer chaincode query -C ch1 -n mycc -c '{"Args":["starter:getHistory","a1"]}' | jq .

# consultar todos os ativos
peer chaincode query -C ch1 -n mycc -c '{"Args":["starter:getAllAssets"]}' | jq .

# deletar um ativo
peer chaincode invoke -o 127.0.0.1:7050 -C ch1 -n mycc -c '{"Args":["starter:delete","a1"]}'
```

> Observação: ao concluir a parte 3 deste guia, não interrompa a rede.

## Parando a Rede de Desenvolvimento
Observe que, se você parar a rede, o script removerá todos os dados e materiais criptográficos relacionados ao blockchain. Você receberá um sistema limpo para a próxima partida.

```bash
# no terminal 1
./network/devNetwork.sh down
```

Como alternativa, você pode deixar a rede de desenvolvimento e deixá-la rodar em segundo plano para continuar seu trabalho mais tarde.

```bash
CTRL + b d
``` 

Agora estamos prontos e mudamos para o aplicativo cliente.

[Previous](../README.md#fabric-Developer-starter-kit) | [Next](../backend/readme.md)
