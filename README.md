# Fabric Developer Starter Kit
Este é um kit inicial para desenvolvedores Hyperledger Fabric Node.js..

Este guia consiste nas seguintes partes:

- [Part 1 - Preparation](#OS-preparation)
- [Part 2 - Using the development network](network/readme.md)
- [Part 3 - Set up and run a client application](backend/readme.md)
- [Part 4 - Set up a react frontend application](backend/readmeFrontend.md)

## Breve Visão Geral do Starter Kit
![devNetwork-overview](img/devNetwork-overview.png "devNetwork-overview")

Os slides da apresentação podem ser encontrados[aqui](https://docs.google.com/presentation/d/1Maqwoc0X94_GD73R2wzIeUIunM6_n48T9yGbWeIYUjI/edit?usp=sharing).

## Part 1 - Preparação
Estas etapas descrevem uma instalação HLF 2.2.x installation  

>Observação: Para interagir de sua máquina Windows com a gota, use o putty.
>Se você está usando MacOS, Linux ou Windows 10, não é necessário baixar qualquer software adicional. Você pode se conectar ao seu servidor através do Terminal com este comando:
Ex: ssh root@5.182.9.218

## Configuração minima 
1 CPU, 2 GB, 50 GB SSD  
OS, Ubuntu 20.04 (LTS) x64 ou superior

## Instalação básica
As etapas a seguir são necessárias para fazer uma instalação básica.
```bash
# atualize o sistema operacional
apt update && apt upgrade

# instale alguns ajudantes úteis / necessários
apt install tree jq gcc make g++

# é sempre bom usar a hora certa
# então configure o fuso horário correto
timedatectl set-timezone America/Sao_Paulo

# verifique a hora
date

# reinicie o servidor, se necessário
init 6
```

## Instale o Docker
As etapas a seguir são necessárias para instalar o Docker no LINUX. Referência: https://docs.docker.com/engine/install/ubuntu/

```bash
# configurar o repositório
apt install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common

# adicione a chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# configurar o repositório estável
add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

# instalar motor docker
apt update
apt install docker-ce docker-ce-cli containerd.io

# verifique a versão do docker
docker --version
# > Docker version 20.10.7, build f0df350
```

## Instale o Docker-Compose
As etapas a seguir são necessárias para instalar docker-compose. Referência: https://docs.docker.com/compose/install/

```bash
# Instale o Docker-Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# aplique permissões executáveis ao binário
chmod +x /usr/local/bin/docker-compose

# verifique a versão docker-compose
docker-compose --version
# > docker-compose version 1.29.2, build 5becea4c
```

## Instale node.js
As etapas a seguir são necessárias para instalar o Node.js.

```bash
# adicionar PPA de NodeSource
# versões compatíveis de Node.js: '^10.15.3 || ^12.13.1 || ^14.13.1', npm: '^6.4.1' 
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh

# chame o script de instalação
. nodesource_setup.sh

# instalar Node.js
apt-get install -y nodejs

# verifique a versão do Node.js
node -v
# > v14.17.1
```

## Criar pasta base
Começando a partir de uma pasta base, no meu caso **/root**, devemos terminar com a seguinte estrutura de pastas.

```bash
root@jsday:~/fabric 
tree -L 1
.
├── fabric-samples
└── fabricStarterKit
```
Crie a pasta base e clone o kit inicial.
```bash
pwd
# > /root

# criar pasta base
mkdir fabric

# certifique-se de que está na pasta base do Fabric, criada acima
cd fabric

# clonar o kit inicial
git clone https://github.com/samlinux/fabricStarterKit.git
```

## Instale Samples, binários e Docker Images

O Hyperledger Fabric fornece um script que baixa e instala amostras e binários em seu sistema. Podemos usar isso.

```bash

# curl -sSL http://bit.ly/2ysbOFE | bash -s -- <fabric_version> <fabric-ca_version> <thirdparty_version>

# última versão pronta para produção, omita todos os identificadores de versão
# curl -sSL https://bit.ly/2ysbOFE | bash -s

# usamos 2.2 em nossos exemplos
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.3 1.5.0

# verifique as imagens baixadas
docker images

# adicione a pasta de caixa de tecido ao caminho
echo "export PATH=/root/fabric/fabric-samples/bin:$PATH" >> $HOME/.profile

# recarregue o arquivo .profile
source $HOME/.profile

# verifique o bin cmd
peer version

```

## Experimente a instalação
O fabric-samples provisiona um exemplo de rede de teste Hyperledger Fabric que consiste em duas organizações, cada uma mantendo um nó de mesmo nível. Ele também implantará um único serviço de pedidos RAFT por padrão. 

Para testar sua instalação, podemos começar a interagir com a rede. Vamos fazer um pequeno teste.

```bash
# mudar para a pasta base
cd fabric-samples/test-network

# uma vez que houve uma alteração no docker-compose 1.29, temos que mover um arquivo para fazer com que as amostras funcionem (isso deve ser corrigido nas próximas versões)
mv .env docker/

# imprima alguma ajuda
./network.sh --help

# traga a rede e crie o canal padrão chamado mychannel
./network.sh up createChannel

# instalar CC padrão - código de cadeia de transferência de ativos (básico)
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
```
**Uma pequena nota lateral neste ponto**.
- Se você usar o script network.sh como no exemplo acima, terá que usar o termo **javascript** como identificador de chaincode. 
- Caso contrário, se você tentar instalar o chaincode por mão, como no exemplo abaixo, você terá que usar o termo **node** como um identificador de chaincode válido.

>peer lifecycle chaincode package basic.tar.gz --path ../asset-transfer-basic/chaincode-javascript --lang node --label basic_1.0

```bash
# mostrar se alguns contêineres estão em execução
docker ps
docker-compose -f docker/docker-compose-test-net.yaml ps
```

### Alguns comandos tmux úteis

Antes de começar, familiarize-se com alguns comandos do tmux que você irá usar.

>**iniciar uma nova sessão tmux**<br>
tmux new -s fabric

>**anexar à sessão existente**<br>
tmux att -t fabric

>**Crie um novo painel horizontalmente**<br> 
CTRL + b "

>**Alternar / selecionar painel por número**<br> 
CTRL + b q  0 ... 9

>**Desanexar da sessão**<br> 
CTRL + b d 

>**Mostrar todas as sessões**<br> 
tmux ls

>**Excluir / matar dev sessão**<br> 
tmux kill-ses -t mysession

>**Habilitar rolagem**<br> 
CTRL + b :set -g mouse on


### Teste a configuração

```bash
# executar o arquivo env, para que possamos alternar entre as organizações
source scripts/envVar.sh

# use Org1 (1 = Org1, 2 = Org2)
setGlobals 1

# precisamos de mais duas variáveis
# o caminho para os arquivos de configuração centrais da malha
export FABRIC_CFG_PATH=../config

# uma variável auxiliar para o nome do canal
export CHANNEL_NAME=mychannel

# verificar env vars
printenv | grep CORE

# inicie o canal - ledger com alguns dados de amostra
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'

# > 2021-06-28 14:36:01.382 CEST [chaincodeCmd] chaincodeInvokeOrQuery -> INFO 001 Chaincode invoke successful. result: status:200

# consultar uma lista de ativos
peer chaincode query -C mychannel -n basic -c '{"Args":["GetAllAssets"]}' | jq .
```
Ao ver os resultados, você pode seguir em frente.

## Derrubar a Rede
```bash
./network.sh down
```

A próxima tentativa é iniciar o kit inicial e testar os comandos CLI.

[Next](network/readme.md)

