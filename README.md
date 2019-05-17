# muruchat

## OpenShiftでデプロイする方法

oc new-app https://github.com/lychee3/muruchat

勝手に作られたserviceを削除する（手順がイケてないので要改善）
oc delete service/muruchat

oc create -f openshift/muruchat-svc.yaml

http://192.168.64.4:30001
