# ito-api

ボードゲーム[ito](https://arclightgames.jp/product/ito/)の「クモノイト」ルールのファシリテートを行うAPI

またはSlackのチャンネル上で動作するSlack app
## Requirement

- firebase
- Node.js

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

### デプロイ
```
firebase deploy --only functions:<function name>
```

### firebaseの環境変数設定
```
firebase functions:config:set slack.secret=xxxxxx
firebase functions:config:set slack.token=xxxxxxx
```
