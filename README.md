# muruchat

## MiniShift環境へのデプロイ手順

MySQL(Ephemeral)を起動させてから、muruchatを起動する。

### MySQL(Ephemeral)のテンプレート登録

```
$ oc create -f https://raw.githubusercontent.com/openshift/origin/v3.10.0/examples/db-templates/mysql-ephemeral-template.json
```

### MySQL(Ephemeral)のアプリ起動

```
$ oc new-app mysql-ephemeral --name=muru-mysql -p MYSQL_USER=koyamaru -p MYSQL_PASSWORD=password -p MYSQL_DATABASE=muruchat -p MYSQL_VERSION=5.7 -p DATABASE_SERVICE_NAME=muru-mysql
```

### muruchatのテンプレート登録

```
$ oc create -f https://raw.githubusercontent.com/lychee3/muruchat/master/openshift/muruchat.yaml
```

### muruchatのアプリ起動

```
$ oc new-app muruchat
```

### ブラウザでアクセス確認

http://muruchat-myproject.192.168.64.4.nip.io 

## アンデプロイ手順

デプロイの逆順で、muruchat→MySQLの順に削除する。

### muruchatのアプリ削除

```
$ oc delete all --selector app=muruchat
```

### muruchatのテンプレート削除

```
$ oc delete template muruchat
```

### MySQL(Ephemeral)のアプリ削除

```
$ oc delete all --selector app=muru-mysql
$ oc delete secrets/muru-mysql
```

### MySQL(Ephemeral)のテンプレート削除

```
$ oc delete template mysql-ephemeral
```