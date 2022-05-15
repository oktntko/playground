**_PLAYGROUND_**

いろんな言語の実行環境

# 前提条件

- [ ] WSL2
  - Ubuntu
  - Windows Terminal
- [ ] Ubuntu
  - git
  - brew
  - asdf
- [ ] VSCode
  - Remote - WSL
- [ ] Docker

# 環境構築

## WSL2

### [WSL のインストール](https://docs.microsoft.com/ja-jp/windows/wsl/install)

1. 管理者権限で PowerShell を起動する
2. 次のコマンドを実行する  
   `wsl --install`

### [WSL 開発環境を設定する](https://docs.microsoft.com/ja-jp/windows/wsl/setup/environment)

1. `Ubuntu`アプリを起動して(自動で起動する)、Linux のユーザー名とパスワードを設定する

   ```sh
   Installing, this may take a few minutes...
   Please create a default UNIX user account. The username does not need to match  your Windows username.
   For more information visit: https://aka.ms/wslusers
   Enter new UNIX username: [UNIX username] # ここ
   New password: # ここ
   ```

2. `Ubuntu`アプリから次のコマンドを実行する  
   `sudo apt update && sudo apt upgrade`
3. アップデート中に [Windows Terminal の設定](https://docs.microsoft.com/ja-jp/windows/wsl/setup/environment#set-up-windows-terminal) を行う
4. [WSL の操作に慣れる](https://docs.microsoft.com/ja-jp/windows/wsl/setup/environment#file-storage)  
   慣れないうちは Windows のファイルエクスプローラーから操作するとよい  
   `\\wsl$\Ubuntu\home\[UNIX username]` から WSL のファイルを覗ける

## Ubuntu

### git & 必須パッケージ類

```sh
sudo apt install -y build-essential procps curl file git zlib1g zlib1g-dev libssl-dev zsh vim libbz2-dev libreadline-dev libsqlite3-dev libffi-dev
```

### brew

```sh
git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew && \
   mkdir ~/.linuxbrew/bin && \
   ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin && \
   echo "# brew" >> ~/.bashrc && \
   echo "eval \$(~/.linuxbrew/bin/brew shellenv)" >> ~/.bashrc
```

### asdf

```sh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf && \
   cd ~/.asdf && git checkout "$(git describe --abbrev=0 --tags)" && cd ~/ && \
   echo "# asdf" >> ~/.bashrc && \
   echo ". \$HOME/.asdf/asdf.sh" >> ~/.bashrc && \
   echo ". \$HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
```

> **INFO**: 終わったらログインし直す

## [Visual Studio Code](https://docs.microsoft.com/ja-jp/windows/wsl/tutorials/wsl-vscode)

1. VSCode は[ここ](https://code.visualstudio.com/download)からダウンロードしてインストールする
2. 拡張機能は[ここ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

> **APPENDIX**: 細かい話は[ここ](https://code.visualstudio.com/docs/remote/remote-overview)

## [Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

### Docker & Docker Compose

> **INFO**: ひたすらコマンドを流すだけ

```sh
# Update the apt package index
sudo apt-get update
# Install packages to allow apt to use a repository over HTTPS
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# Use the following command to set up the stable repository.
echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# Update the apt package index
sudo apt-get update
# Install the latest version of Docker Engine, containerd, and Docker Compose
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
# Install Docker Compose
sudo apt install -y docker-compose
# Docker version
docker --version
# Docker Compose version
docker-compose --version
# Manage Docker as a non-root user
sudo usermod -aG docker $USER
```

> **INFO**: 終わったらログインし直す

```sh
sudo service docker start   # 開始
sudo service docker stop    # 停止
```

# 言語

- [x] Nodejs
- [x] Python
- [x] Java
- [x] Go
- [x] Shell Script(bash)
- [x] SQL(MySQL)

# やること

## 初級編

| やること           | たとえば         |
| ------------------ | ---------------- |
| コンソール出力     | Hello World      |
| コメントアウト     |                  |
| 変数宣言、データ型 |                  |
| 四則演算           |                  |
| 文字列操作         |                  |
| 分岐条件           | IF 文、Switch 文 |
| ループ             | 配列、連想配列   |
| コンソール入力     |                  |

## 実践編

| やること   | たとえば |
| ---------- | -------- |
| ＤＢ操作   |          |
| サーバ起動 |          |
|            |          |

# Acknowledgements

- [Git Commit message Emoji](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
