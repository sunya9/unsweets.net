---
title: Activity上で左からフリックした時に戻ったりする
id: 33
categories:
  - Memo
date: 2013-03-18 03:25:03
tags:
---
画面を左から右にフリックしてアクティビティが戻ったら素敵ですよね（？）。

そんな実装です。ジェスチャー。

<!--more-->

いきなりコードをどーん。

```
public class MainActivity extends Activity implements GestureDetector.OnGestureListener {
  private final static int THRESHOLD = 500;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    new GestureDetector(this, this);
  }
  @Override
  public boolean onTouchEvent(MotionEvent event) {
    if (gestureDetector.onTouchEvent(event)) {
      return true;
    } else {
      return super.onTouchEvent(event);
    }
  }
  @Override
  public boolean onDown(MotionEvent e) {
    return false;
  }
  @Override
  public boolean onFling(MotionEvent e0, MotionEvent e1, float velocityX,
  float velocityY) {
    if(velocityX > 0 & Math.abs(velocityX) > THRESHOLD){
      //左から右
      finish();
    }
    return false;
  }
  @Override
  public void onLongPress(MotionEvent e) {
  }
  @Override
  public void onShowPress(MotionEvent e) {
  }
  @Override
  public boolean onSingleTapUp(MotionEvent e) {
    return false;
  }
  @Override
  public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
  float distanceY) {
    return false;
  }
}
```

ポイントは2つ。

一つ目はonTouchEventにてtrueをうまく返さないとこの後イベントが伝わりません（よくわかってない）。

二つ目は、onFlingのvelocityXという引数。これにはフリックの移動速度が入っていて、0より大きい場合は左から右、0未満だと右から左となります。同様にvelocityYも0より大きい場合は上から下、0未満だと下から上です。
座標の基準は左上と考えるとわかるかと思います。

後はvelocityXの絶対値をとって、閾値(THRESHOLD)を超えたら動作するように判定しています。

THRESHOLDは自分の感覚（ユーザーの感覚？）に合うように適宜設定するといいかも。