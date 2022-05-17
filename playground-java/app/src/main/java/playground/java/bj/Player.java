package playground.java.bj;

import static playground.java.bj.Console.END;
import static playground.java.bj.Console.IN;
import static playground.java.bj.Console.PINK;
import static playground.java.bj.Console.RED;
import static playground.java.bj.Console.WHITE;

import java.util.ArrayList;
import java.util.List;

public class Player {

  protected final List<Trump> hands = new ArrayList<>();

  public boolean bust = false;
  public boolean blackjack = false;
  public int handsSum = 0;

  public String name() {
    return "PLAYER";
  }

  public String color() {
    return PINK;
  }

  /**
   * 山札からカードを引く.
   * 副作用として手札の合計値21以上なら BUST フラグを ON にする.
   *
   * @param deck 山札
   */
  public final void draw(List<Trump> deck) {
    this.hands.add(deck.remove(0));

    this.handsSum = this.handsSum();
    if (this.handsSum > 21) {
      this.bust = true;
    } else if (this.handsSum == 21) {
      this.blackjack = true;
    }
  }

  /**
   * 手札の数値の合計を計算する.
   *
   * @return 手札の合計
   */
  public final int handsSum() {
    var sum = this.hands.stream().mapToInt(card -> card.calcRank).sum();

    // A が含まれているとき 11 or 1 になるので +10 して計算する
    if (hands.stream().filter(card -> card.rank == 1).findFirst().isPresent()
        && sum + 10 <= 21) {
      return sum + 10;
    }

    return sum;
  }

  /**
   * カードをオープンにする.
   */
  public void openHands() {
    System.out.print(this.color() + this.name() + ":" + END);

    this.hands.forEach(System.out::print);
    System.out.print(color() + " = " + this.handsSum + END);
    System.out.println();
  }

  /**
   * STAND か HIT かを選ぶ.
   *
   * @return HIT or STAND
   */
  public Choice choice() {

    var color = WHITE;

    for (;;) {
      System.out.print(color + "HIT or STAND? [h/s] ❯ " + END);
      String str = IN.nextLine();

      color = WHITE;
      if (str.toLowerCase().startsWith("h")) {
        return Choice.HIT;

      } else if (str.toLowerCase().startsWith("s")) {
        return Choice.STAND;

      } else {
        color = RED;
      }
    }
  }
}
