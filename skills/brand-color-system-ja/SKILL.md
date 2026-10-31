---
name: brand-color-system-ja
description: プロジェクトの DESIGN.md カラートークンを生成する UI に適用する。コンポーネント・ページ・ボタン・フォーム・カードの作成や再スタイリング、テキスト/背景色の選択時に使用し、色を勝手に作らずブランドに一致させる。
---

# プロジェクトの DESIGN.md を適用する

このプロジェクトは視覚アイデンティティをリポジトリルートの `DESIGN.md` に保持しています：
YAML のデザイントークン（規範値）＋ Markdown 本文（いつ・なぜ使うか）。

## ルール

1. **スタイリングを書く前に必ず `DESIGN.md` を読む。** トークンが規範値、本文が意図の説明。
   両者が矛盾する場合はトークンに従い、その旨を明示する。
2. **生の hex は使わず、セマンティックロールで参照する。** `primary`、`on-primary`、
   `surface`、`on-surface`、`on-surface-variant`、`outline`、`error` といったロール名を使い、
   hex 値をコンポーネントに直接書き込まない。
3. **両テーマが存在する。** ダークテーマのロールは front matter で `dark-` 接頭辞を持つ。
   ライトのロールとダークのロールを 1 つのテーマ内で混在させない。セット全体を切り替える。
4. **実測されたコントラスト結果を尊重する。** `Colors` セクションは各テキスト/背景ペアの
   実測 WCAG 2.1 比率と APCA `Lc` を報告している。その一覧にない新しいテキスト/背景の
   組み合わせを作り出さない。必要な場合は計算し、レビュー対象としてフラグを立てる。
5. **失格とマークされたペアは失格のまま。** それに依存するコンポーネントを出荷しない。
   修正案を出すか、合格しているペアを選ぶ。
6. **タイポグラフィ・スペーシング・角丸は** この DESIGN.md では対象外（`omitted:` 参照）。
   フレームワーク既定の値を使い、値を捏造しない。
7. **コンポーネントトークンは色のみ**（`backgroundColor`、`textColor`、`borderColor`）。
   パディングと角丸はコンポーネントライブラリに従う。

## コード上での値の置き場所

同じテーマは `DESIGN.md` と併せて CSS カスタムプロパティ（`--color-<role>`）、
Tailwind 設定、Tokens Studio JSON、W3C DTCG トークンとしてエクスポートされます。
色を配線するときはロール名をフォーマット間で同一に保ち、このファイルの
`{colors.primary}` があなたの `--color-primary` / `theme.colors.primary` /
`semantic.light.primary` に対応するようにします。

## ブランドが変わったとき

hex 値を手で編集するのではなく、ColorwayKit ブランドテーマエンジン
（https://www.colorwaykit.com/ja/brand）から `DESIGN.md` を再生成してください。
手編集は記録されたコントラスト実測値を迂回してしまいます。

## 検証（目で見ず、実行して確認する）

色を追加・変更した後は、以下のいずれかで検証する——見た目に頼らない：

1. **CLI（オフライン・CI 対応）：**

       npx colorwaykit-lint --tokens DESIGN.md --target .

   終了コード 0 = 問題なし。1 = 野良 hex または失格ペアあり。`--apca` を付けると
   ペアごとの APCA Lc も報告。CI に組み込み、新しい色を必ずこのファイル経由にさせる。

2. **MCP ツール（ライブ）：** ColorwayKit MCP サーバー接続済みなら、任意の fg/bg hex で
   `check_pair` を呼んでから組み合わせを採用する。

## オプション：MCP サーバー（ライブ）

ファイルよりライブなインターフェースが良い場合は、ColorwayKit MCP サーバーに接続：

    claude mcp add --transport http colorwaykit https://www.colorwaykit.com/api/mcp --header "Authorization: Bearer ck_YOUR_TOKEN"

トークンは colorwaykit.com → マイプロジェクト → Agent タブ（無料アカウント）から取得。
ツール：`get_theme`（hex 1 つ → 検証済みフルテーマ）、`check_pair`（任意ペアの即時検証）、
`get_theme_by_project`。容量：無料 5 回/日 · Plus 1,000 回/月 · Pro 無制限。
詳細：https://www.colorwaykit.com/agents
