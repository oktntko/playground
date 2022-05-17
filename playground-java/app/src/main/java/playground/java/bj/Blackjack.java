package playground.java.bj;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Blackjack {

  /**
   * 一人でブラックジャックをする.
   * <>
   * 最終形
   * 各プレイヤーが初めの賭け（ベット）を終えると、ディーラーはカードを自分自身を含めた参加者全員に2枚ずつ配る。
   * ディーラーはカードを自分自身を含めた参加者全員に2枚ずつ配る。ディーラーの2枚のカードのうちの1枚は表向き（アップカード）にされ、皆が見ることができる。
   * もう1枚のカードは伏せられている。伏せられたカードをホールカードと呼ぶ。
   * プレイヤーの行動が全て終わった時点ではじめてディーラーの2枚目のカードが表向きにされる。
   * <>
   * 手札を確認する
   * ヒット or スタンド
   * バストの判定をして勝負の判定をする
   */
  public static void main(String[] args) {
    // + STEP 1 場を作る
    // トランプを作る
    var deck = List.of("☘", "♥", "♦", "♠").stream()
        .flatMap(suit -> IntStream.range(1, 14).mapToObj(rank -> new Trump(suit, rank)))
        .collect(Collectors.toList());

    // カードをシャッフルする
    Collections.shuffle(deck);

    // プレイヤーを作る
    var players = List.of(new Player(), new Dealer());

    // 各２枚ずつカードを引く
    for (var player : players) {
      player.draw(deck);
      player.draw(deck);
      player.openHands();
    }

    // + STEP 2 各プレイヤーが ヒットorスタンドを選び、ヒットなら手札を加える
    for (var player : players) {
      System.out.println(Console.WHITE + "Start " + player.name() + " turn." + Console.END);
      Console.waiting();

      for (;;) {
        if (player.blackjack) { // ２枚の時点で Blackjack になっている可能性がある都合上 最初に判定する
          System.out.println(Console.GREEN + player.name() + " is Blackjack!" + Console.END);
          break;

        } else if (player.bust) {
          System.out.println(Console.YELLOW + player.name() + " is BUST!" + Console.END);
          break;
        }

        var choice = player.choice();

        if (choice == Choice.HIT) {
          player.draw(deck);
          Console.waiting(100);
          player.openHands();

        } else {
          break;
        }
      }

      // プレイヤーが BUST になったらディーラーは飛ばす
      var playableCount = players.stream().filter(p -> !p.bust).count();
      if (playableCount <= 1) {
        break;
      }
    }

    // + STEP 3 バトル
    Console.waiting(100, "⚔");

    // BUST していないプレイヤーだけ残す
    var survivors = players.stream().filter(p -> !p.bust).collect(Collectors.toList());
    survivors.forEach(Player::openHands);

    // 勝敗判定のためにソートする
    survivors.sort((pre, cur) -> {
      // -1 => pre の勝ち
      // 1 => cur の勝ち
      if (pre.handsSum > cur.handsSum) {
        return -1;
      } else if (pre.handsSum == cur.handsSum) {
        return pre instanceof Dealer ? -1 : 1;
      } else {
        return 1;
      }
    });

    // 先頭になったプレイヤーが勝ち
    var player = survivors.get(0);
    System.out.print(player.color() + player.name() + " WIN!" + Console.END);
    System.out.println();
  }
}
