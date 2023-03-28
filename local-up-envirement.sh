#!/bin/sh

## Arquivo responsável por colocar a API e WEB no ar
## Dessa forma podemos utilizar o frontEnd e as APIs para teste

#!/bin/sh
echo -n "Qual Ambiente será executado? API ou WEB: "

read reply

if [ -z "$reply" ];
then
    echo "Opção inválida, digita apenas as opções válidas. Ambiente fora do ar"
    exit 0
elif [ $reply == "API" ];
then
    echo "-----> Colocando API No AR <------"
    cd ./Apps/api/ && npm run dev
elif [ $reply == "WEB" ];
then
    echo "----> Subindo Ambiente WEB <------"
    cd ./Apps/web/ && npm run dev
    
else
    echo "Opções inválida, digita apenas as opções válidas. Ambiente fora do ar"
    exit 0
fi