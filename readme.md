# Configuração do projeto do ar-condicionado

### Install Chocolatey 
 * Abrir o Windows Power Shell como administrador

~~~
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
~~~
- Caso  seja executado com sucesso, execute a instalação do Node.JS e do Git pelo mesmo prompt do Power Shell através dos comandos abaixo. 
~~~
$ choco install -y nodejs --version=22.18.0
$ choco install -y git.install
~~~
- Caso a instalação do Chocolatey falhe, é preciso realizar a instalação manual dos pacotes Node.JS e Git, baixando e instalando os pacotes através dos links abaixo
	- Windows 64 Bits
		- <https://nodejs.org/download/release/v22.18.0/node-v22.18.0-x64.msi>
		- <https://github.com/git-for-windows/git/releases/download/v2.37.2.windows.2/Git-2.37.2.2-64-bit.exe>
	- Windows 32 Bits
		- <https://nodejs.org/download/release/v22.18.0/node-v22.18.0-x86.msi>
		- <https://github.com/git-for-windows/git/releases/download/v2.37.2.windows.2/Git-2.37.2.2-32-bit.exe>
* Ao final das instalações o Power Shell pode ser fechado. 

### Local e ambiente de instalação
* Abrir o Windows Explorer e criar a pasta *c:\ar_condicionado*. Sem acentos

### Instalar app de integração e configurar arquivos de parametrização
* Abrir o Windows Explorer e localizar a pasta *c:\ar_condicionado*
* Clicar com o botão direito na pasta, escolher a opção *Git Bash Here*
* No prompt que se abre digite os 2 comandos abaixo
~~~
$ git clone https://github.com/camim-apps/fs_air_conditioner.git.
$ npm install
~~~
* Copiar e editar o arquivo .env.example para .env na pasta *c:\ar_condicionado*
~~~
$ cp .env.example .env
$ nano .env
~~~

* Colocar letra do posto do lado de CODE=
* Copiar o arquivo camim_firebase.json para a pasta src/config

### Instalar o PM2

~~~
$ npm i -g pm2
$ pm2 start --name "air_conditioner" ./src/app.js
$ pm2 save
~~~