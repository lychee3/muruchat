# muruchat

## MiniShift環境へのデプロイ手順

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

### muruchatのアプリ削除

```
$ oc delete all --selector app=muruchat
```

### muruchatのテンプレート削除

```
$ oc delete template muruchat
```
