---
title: getCheckedItemCount
id: 44
categories:
  - Memo
date: 2014-03-07 04:47:45
tags:
---

getCheckedItemCountはAPI11からなのでこれをどこかに定義しておくと便利。

```java
private static int getCheckedItemCount(AbsListView listView) {
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB)
    return listView.getCheckedItemCount();
  else {
    int count = 0;
    SparseBooleanArray positions = listView.getCheckedItemPositions();
    for (int i = 0, l = positions.size(); l > i; i++)
      if (positions.valueAt(i))
        count++;
    return count;
  }
}
```
