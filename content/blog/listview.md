---
title: ListViewの選択モードを変更後に選択がうまく解除されない
id: 45
categories:
  - Memo
date: 2014-03-10 21:05:54
tags:
---
CHOICE_MODE_MULTIPLEからCHOICE_MODE_NONEにして選択を全部外すときにclearChoicesをしてもうまくいかないのでその対処法。

<!--more-->

とか言いつつStack Overflowから。
[android - Deselect seleted item in ListView - Stack Overflow](http://stackoverflow.com/questions/17751129/deselect-seleted-item-in-listview)

```java
listview.clearChoices();
for (int i = 0; i < listview.getCount(); i++)
  listview.setItemChecked(i, false);
listview.post(new Runnable() {
  @Override
  public void run() {
    listview.setChoiceMode(ListView.CHOICE_MODE_NONE);
  }
});
```

これで解決。clearChoicesメソッドとは何だったのか。
