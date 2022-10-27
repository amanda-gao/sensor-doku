# **Alerta de Gás Tóxico**

### :page_with_curl:**Descrição:** 

Fluxo que escuta uma simulação de sensor de gás tóxico a saúde humana, onde recebe o nível de determinados gases em um local, caso algum nível esteja alterado é disparado um alerta via email com as informações necessárias sobre o ocorrido, como também gera um gráfico para acompanhamento do nível de gás do ambiente.

### :hammer_and_wrench: **Tecnologia utilizadas:** 

- DOCKER - Utilizado para subir o container com imagem base do nodered.
- MQTT - Utilizado para realizar a trocar de mensagens.
- NODERED - Utilizado para realizar o fluxo da simulação.


## DOCKER

### O primeiro passo com o docker é criar e rodar um container baseado em uma imagem do nodered.

Para isso você pode rodar o comando abaixo :point_down:
```
$ docker run -it -p 1880:1880 --name sensor-doku nodered/node-red
```

Entenda o que o comando faz:
```
docker run                 - Execute este contêiner, inicialmente compilando localmente, se necessário
-it                        - Anexar uma sessão de terminal para que possamos ver o que está acontecendo
-p 1880:1880               - Conecte a porta local 1880 à porta interna exposta 1880
-v node_red_data:/data     - Monte um volume chamado docker chamado `node_red_data` no diretório container /data para que todas as alterações feitas nos fluxos sejam mantidas
--name sensor-doku         - Dê a esta máquina um nome local amigável
nodered/node-red           - A imagem para basear - atualmente Node-RED v1.2.0
```

Ao executar será retornado a seguinte saída no final:
```
---------------------------------------------------------------------

25 Oct 23:44:19 - [info] Server now running at http://127.0.0.1:1880/
25 Oct 23:44:19 - [warn] Encrypted credentials not found
25 Oct 23:44:19 - [info] Starting flows
25 Oct 23:44:19 - [info] Started flows
```


## MQTT

### É necessário que você possua algumas ferramentas instaladas: Git, Node.js

> Clone este repositório:
> ``` 
> $ git clone https://github.com/amanda-gao/sensor-doku.git
> ```
> Acesse a pasta do projeto:
> ```
> $ cd sensor-doku
> ```
> Instale as dependências:
> ```
> $ yarn
> ```
> Vá no arquivo `server.ts` e substitua o valor da constante `myIp` pelo IP da sua máquina. 
>```
> export const myIp = '192.168.100.4'
> ```
> Abra o primeiro terminal e execute o comando abaixo. Após executá-lo verá um log no terminal como este: Servidor rodando em mqtt://myIp:1883
>```
> $ yarn dev:broker
> ```
> Abra o segundo terminal e execute o comando abaixo.
> - A cada 2 segundo o publisher ira enviar uma messagem com 'message sent' na rota 'Sensor/Doku'.
> ```
> $ yarn dev:publisher
> ```
>
> Abra o terceiro terminale e execute o comando abaixo.
> - Ele ficara ouvindo a rota 'Alert/House' e enviar um log da mensagem dessa rota.
> ```
> $ yarn dev:subscriber
> ```

_________________________________________________________________________________________________________________________________
- *Foi utilizado um projeto open source do MQTT feito por **pedroksty**, caso haja interesse aqui está o link para seu repositório: [pedroksty/mqtt-node](https://github.com/pedroksty/mqtt-node)*
_________________________________________________________________________________________________________________________________

## NODERED

### Com o MQQT rodando juntamente com o docker, agora será a vez de inserir o fluxo do nodered.

Quando clonar o repositório verá junto com a pasta sensor-doku um arquivo `SensorDoku-NodeRedFlow.json`.

**Passo 1:** 
- Para rodar o arquivo, primeiro acesse a rota que foi gerado pelo docker:
```
http://127.0.0.1:1880/
```
- Será aberta uma página com o dashboard do Node-RED no navegador. 

**Passo 2:**
- Vá no ícone de hamburguer ou menu para importar o arquivo.
- Após importar o arquivo, na tela verá alguns blocos tracejados, pois eles precisam de suas respectivas dependências para rodar.
  - Poderá intalar as dependências dentro do Manage Palette no menu. 
- As dependêcias necessárias são:
> Necessária para conseguir enviar o alerta por email.
> ```
> node-red-node-email
> ```
> Necessária para gerar os gráficos.
> ```
> node-red-dashboard
> ```

**Passo 3:**
- Após instalar as dependências são necessárias 3 configurações:
  - No bloco `Sensor/Doku`, vá em sua propriedade `server` e altere para o ip de sua máquina e a porta em que o mqqt estiver rodando.
  - No bloco `Send email to`, vá em sua propriedade `To` e insira o email para o qual irá enviar o alerta.
  - Para que o alerta seja recebido no email, é necessário que configure seu email para recebê-lo através de protocolo.





