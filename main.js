
// 【機能】
// ①カウントアップ
// ②ストップ
// ③リセット
// ④再開

// 【不具合修正】
// 1. resetしても数字が0にならない
// 2. ボタンを連打するとおかしくなる


// 厳密なエラーチェック
'use strict'

// 要素の取得
// const は定数 ブロックスコープをもつ(letと同じ) 再代入不可
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  // クリックイベントの外でも使うため、再定義
  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // // consoleに出力 テンプレートリテラル使用のためいらない
    // console.log(Date.now() - startTime);

    // ブラウザに出力
    // 単位をミリ秒から変える
    // 経過時間も含めて表示
    // もう一度startをするとstartTimeはその時点に上書きされる
    const d = new Date(Date.now() - startTime + elapsedTime);
    // padStart() 値の桁数表記を変更 文字のみ適用
    // 分に変換 メソッド
    const m = String(d.getMinutes()).padStart(2, '0');
    // 秒に変換 メソッド
    const s = String(d.getSeconds()).padStart(2, '0');
    // ミリ秒に変換 メソッド
    const ms = String(d.getMilliseconds()).padStart(3, '0');

    // テンプレートリテラル バックティック文字{``}で囲む
    // プレースホルダーを含めることができる
    // 文字列の変換指示
    timer.textContent = `${m}:${s}.${ms}`;

    // カウントアップを10ミリ秒ごとに繰り返す
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // 【状態の切り替え】
  // disabledプロパティはdiv要素では使えない

  // 初期状態 startButton押せる
  function setButtonStateInitial() {
    // start.disabled = false;
    // stop.disabled = true;
    // reset.disabled = true;

    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  // 起動中 stopButton押せる
  function setButtonStateRunning() {
    // start.disabled = true;
    // stop.disabled = false;
    // reset.disabled = true;

    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  // 停止中 resetButton押せる
  function setButtonStateStopped() {
    // start.disabled = true;
    // stop.disabled = true;
    // reset.disabled = false;

    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  // 呼び出すタイミング
  setButtonStateInitial()

  // 【Start】
  // クリックイベント作成
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      // 以降の処理をしない
      return;
    }
    setButtonStateRunning();
    // 現在時刻の取得
    startTime = Date.now();
    
    // 時間のカウントアップ
    countUp();
  });

  // 【Stop】
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      // 以降の処理をしない
      return;
    }
    setButtonStateStopped();
    // SetTimeout()のキャンセル
    clearTimeout(timeoutId);
    // stopした時の時間を保持する
    elapsedTime += Date.now() - startTime;
  });

  // 【Reset】
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      // 以降の処理をしない
      return;
    }
    setButtonStateInitial();
    // timerを元の表記に戻す  
    timer.textContent = '00:00.000';
    // resetをした時に前回止めた時間から再開するから
    elapsedTime = 0;
  });
}