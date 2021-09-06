# ito-api
## Requirement

- firebase

## Usage

- 開発環境の起動

```
make
```

- 開発環境に入る

```
make enter
```


- 開発環境を止める


```
make stop
```

- ローカルのデータを使ってfirebase emulatorsを起動

```
firebase emulators:start --import=<data-path> --export-on-exit
```

## Deploy

### Firebase login

- Dockerからログインする際は`--no-localhost`オプションを利用する

```
firebase login --no-localhost
```

```
firebase deploy --only functions:<function name>
```

