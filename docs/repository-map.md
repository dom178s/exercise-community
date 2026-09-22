# Repository Map

## 1. この文書について
**確認済み**

この文書は、運動コミュニティMVPのリポジトリ内にある主要ファイルの役割と、変更時に影響しやすい範囲を整理するための地図です。

## 2. 現在の構成
**確認済み**

```text
exercise-community/
├─ index.html
├─ script.js
├─ style.css
├─ README.md
└─ docs/
   ├─ architecture.md
   └─ repository-map.md
```

※ README.md と docs 配下の資料は `docs/project-documentation` ブランチで整備中です。

## 3. エントリーポイント
**確認済み**

### `index.html`
ブラウザで表示される画面の入口です。`style.css` と `script.js` を読み込みます。

主な画面:
- 運動報告
- ポイント・連続記録
- プレミアムプラン案
- ポイント履歴
- 運動履歴
- 応援
- ステッカー応援
- 応援履歴
- ステッカーショップ
- 所持ステッカー

**変更時の主な影響**

入力項目、ボタン、画面の順番、表示文言、各機能の表示領域を変更するときに影響します。HTML要素の `id` を変更すると、`script.js` からその要素を取得している処理にも影響する可能性があります。

### `script.js`
アプリの主要ロジックをまとめているファイルです。

主な責務:
- Supabase REST APIへの運動報告送信
- localStorageからのデータ読み込み・保存
- 1日1回の運動報告制御
- 運動履歴
- 連続記録
- ポイント付与・履歴
- 応援と1日2回の制限
- ステッカー購入・所持
- ステッカー応援
- 固定の運動プラン表示

主な関数:
- `saveReportToSupabase(report)`
- `showReport()`
- `updateStreak()`
- `addPoints(amount, reason)`
- `showPoints()`
- `showStreak()`
- `showPointHistory()`
- `showReportHistory()`
- `cheer()`
- `showCheerCount()`
- `showCheerHistory()`
- `buySticker(stickerName, price)`
- `showOwnedStickers()`
- `showStickerCheerButtons()`
- `cheerWithSticker(stickerName)`
- `suggestPlan(level)`

**変更時の主な影響**

ポイントルール、報告制限、保存方式、Supabase連携、応援、ステッカー、運動プランなど、アプリの動作そのものに影響します。現在は多くの責務が1ファイルに集まっているため、変更前に関連処理を確認する必要があります。

### `style.css`
画面全体の見た目を管理します。

主な対象:
- 全体レイアウト
- カード
- 入力欄
- ボタン
- ポイント表示
- 履歴
- スマートフォン表示
- ステッカーショップ
- プレミアムプラン
- ステッカー応援ボタン

**変更時の主な影響**

レイアウト、余白、文字サイズ、ボタンやカードの外観、スマートフォン表示などに影響します。機能ロジックへの直接的な影響は通常ありませんが、クラス名・IDをHTML側と合わせる必要があります。

## 4. ドキュメント

### `README.md`
**確認済み**

プロジェクトの入口となる説明資料です。概要、主な機能、技術構成、現在の課題、開発方針をまとめます。

### `docs/architecture.md`
**確認済み**

システム構成、データフロー、localStorage、Supabase、LINE MINI Appなどの関係を整理します。

### `docs/repository-map.md`
**確認済み**

この文書です。ファイルの役割と変更影響を整理します。

### 今後追加予定
**要確認**

- `docs/current-status.md`
- `AGENTS.md`
- `.env.example`
- `CONTRIBUTING.md`
- GitHub Issue / Pull Requestテンプレート

## 5. データと関連箇所
**確認済み**

| データ・機能 | 主な実装場所 | 現在の保存先 |
| --- | --- | --- |
| 運動報告 | `index.html`, `script.js` | localStorage + Supabase試作 |
| ポイント | `script.js` | localStorage |
| 連続記録 | `script.js` | localStorage |
| 応援 | `index.html`, `script.js` | localStorage |
| ステッカー | `index.html`, `script.js` | localStorage |
| 運動プラン | `index.html`, `script.js` | 固定内容を表示 |
| デザイン | `style.css` | 該当なし |

## 6. 変更目的から探す
**確認済み**

- 画面に入力欄やボタンを追加する → `index.html`
- ボタンを押したときの処理を変える → `script.js`
- ポイント・連続記録のルールを変える → `script.js`
- Supabaseへの保存を直す → `script.js` とSupabase側設定・スキーマ
- 見た目を変える → `style.css`
- プロジェクト概要を更新する → `README.md`
- システム構成を変更した → `docs/architecture.md`
- ファイル構成・責務を変更した → `docs/repository-map.md`
- 実装状況・既知の問題が変わった → 今後作成する `docs/current-status.md`

## 7. 変更時の注意
**確認済み / 要確認**

1. `index.html` のIDを変更するときは、`script.js` 内の `getElementById()` などの参照も確認する。
2. localStorageのキー名を変更すると、既存利用者の端末内データを読み込めなくなる可能性がある。
3. Supabaseへ送るデータ名・型を変更するときは、Supabase側のテーブル定義とRLSを同時に確認する。
4. ポイント処理を変更すると、運動報告・応援・ステッカー購入など複数機能に影響する可能性がある。
5. 公開中のMVPへ変更を反映する前に、作業ブランチとPull Requestを使って確認する。
6. secret/service-role keyなどの秘密情報をフロントエンドや公開リポジトリへ追加しない。

## 8. 現時点での構造上の課題
**コードからの推定 / 要確認**

現在は小規模なMVPのため理解しやすい一方、アプリの主要処理が `script.js` に集中しています。機能が増えた場合は、責務ごとのファイル分割を検討する余地があります。

ただし、現段階ではファイル分割そのものを目的にせず、MVPの検証と既知の問題解決を優先します。
