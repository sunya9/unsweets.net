---
title: lubuntuでIPを固定したら名前解決できなくなった
id: 48
categories:
  - Memo
date: 2014-05-11 13:12:20
tags:
---
色々試行錯誤してやったのでどのあたりで解決したかわかりませんが、以下を/etc/netowork/interfacesに追記。

```
auto eth0
iface eth0 inet static
address 192.168.10.6
netmask 255.255.255.0
broadcast 192.168.10.255
gateway 192.168.10.1
dns-nameservers 8.8.8.8 8.8.4.4
```

addressには固定したipアドレスを。broadcast、gateway同様。

dns-nameserversはゲートウェイと同じアドレスを指定したのですがうまく動かないのでGoogleのを指定しました。とりあえずこれで解決。