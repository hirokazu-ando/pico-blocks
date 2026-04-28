# Game Icons

Neo-arcade style SVG set (gradient + clear silhouette) for PycoBlocks game mode.

`内蔵画像` dropdown or `game_draw_image` with path:

| File | 用途イメージ |
|------|----------------|
| `player_ship.svg` | 自機（三角） |
| `rocket.svg` | 縦スク・移動ロケット |
| `enemy_bug.svg` | 敵（ドローン風） |
| `coin.svg` | スコアコイン |
| `gem.svg` | パズル・報酬ジェム |
| `star.svg` | 評価・ボーナス |
| `heart.svg` | ライフ |
| `bullet.svg` | 弾 |
| `energy.svg` | 回復・パワー球 |
| `shield.svg` | 防御・アイテム |
| `spike.svg` | トラップ・障害物 |
| `meteor.svg` | 落下物・障害 |
| `portal.svg` | ワープ・ゴール演出 |
| `crate.svg` | 足場・ブロック崩し |

Example:

```python
_img = pygame.image.load("assets/game-icons/player_ship.svg")
screen.blit(_img, (120, 90))
```
