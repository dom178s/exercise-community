# Contributing

この文書は、運動コミュニティMVPを安全に共同開発するための基本的な進め方をまとめたものです。

## 基本方針

現在は少人数で検証中のMVPです。機能を増やすことだけを目的にせず、既存機能を壊さないこと、検証結果を記録すること、分からない仕様を勝手に決めないことを重視します。

原則として `main` に直接変更を加えず、Issue・作業ブランチ・Pull Requestを使います。

## 開発の流れ

1. GitHub Issueで課題・目的を整理する。
2. 既存Issueとの重複がないか確認する。
3. Issueに対応した作業ブランチを作る。
4. 必要な範囲だけ変更する。
5. 動作確認・テストを行う。
6. 関連ドキュメントを更新する。
7. Pull Requestを作成する。
8. レビュー後に `main` へマージする。
9. Issueの完了条件を確認して閉じる。

## Issue

1つのIssueでは、原則として1つの目的を扱います。

Issueには可能な範囲で以下を記載します。

- 背景
- 現在の状態
- 期待する状態
- 対応範囲
- 対応しない範囲
- 完了条件
- テスト方法
- 関連ファイル
- 関連Issue
- 不明点
- 優先度
- 種別

候補ラベル:

- `bug`
- `feature`
- `documentation`
- `security`
- `technical-debt`
- `question`
- priority: high / medium / low
- status: blocked

Issueを作る前に、秘密情報や個人情報が本文・画像・ログに含まれていないか確認してください。

## ブランチ

Issue番号がある場合は、可能な範囲でブランチ名に含めます。

例:

```text
fix/12-supabase-report-save
feature/23-user-identification
docs/31-update-readme
```

`main` への直接コミットは原則避けます。

force pushや公開済み履歴の書き換えは、明確な理由と承認なしに行いません。

## コミット

コミットは、小さく意味のある単位にします。

良い例:

```text
Fix Supabase report payload
Add repository map documentation
Update current project status
```

避けたい例:

```text
update
fix
changes
```

無関係な変更を1つのコミットに混ぜないようにします。

## テスト・確認

現時点では自動テスト環境は確認されていないため、変更した機能に応じてブラウザで手動確認します。

実施していないテストを「成功」と記録してはいけません。

確認例:

- 変更した画面が表示される
- 運動報告が期待どおり動く
- ポイント・連続記録に意図しない影響がない
- 応援・ステッカーの既存動作が壊れていない
- Supabase関連ではHTTPレスポンスと実データを確認する
- スマートフォン表示に大きな崩れがない

自動テスト・lint・build・CIを導入した場合は、実際に利用できるコマンドをREADMEとAGENTS.mdへ追記します。

## Pull Request

Pull Requestには以下を記載します。

- 変更内容
- 変更理由
- 関連Issue
- 影響する機能・ファイル
- 実施したテストと結果
- 残っている問題・要確認事項
- UI変更がある場合は必要に応じてスクリーンショット
- DB変更がある場合はデータ・移行への影響

Issueを完了させるPRでは、必要に応じて `Closes #123` のように関連付けます。

## ドキュメント

コード変更時は、必要に応じて以下も更新します。

- `README.md`
- `docs/architecture.md`
- `docs/repository-map.md`
- `docs/current-status.md`
- `AGENTS.md`

コードと説明資料が食い違ったままにならないようにします。

## Supabase・データ変更

Supabase関連を変更する前に、実際のテーブル定義、列名、型、制約、RLSポリシーを確認します。

RLSを「動かないから」という理由だけで無効化しません。

localStorageのキーを変更・削除する場合は、既存利用者の端末内データへの影響を確認します。

## 秘密情報・個人情報

以下を公開リポジトリへコミットしません。

- secret/service-role key
- private API key
- access token
- password
- credential
- 不要な個人情報

ブラウザ向けpublishable keyと秘密鍵は区別します。秘密情報をIssue、PR、ログ、スクリーンショット、ドキュメントへ貼り付けないでください。

## AIを利用する場合

AIも `AGENTS.md` のルールに従います。

仕様が不明な場合は推測で確定せず、「確認済み」「コードからの推定」「要確認」を区別し、必要に応じてプロジェクト担当者またはゼミ担当者へ確認します。

AIが変更した場合も、人間が内容とテスト結果を確認してから `main` へ反映します。
