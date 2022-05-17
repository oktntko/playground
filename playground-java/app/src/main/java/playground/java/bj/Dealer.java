package playground.java.bj;

import static playground.java.bj.Console.CYAN;
import static playground.java.bj.Console.END;
import static playground.java.bj.Console.GREY;

public class Dealer extends Player {

  private boolean firstOpen = true;

  @Override
  public String name() {
    return "DEALER";
  }

  @Override
  public String color() {
    return CYAN;
  }

  /**
   * ディーラーは最初のオープン時、２枚目はオープンしない.
   */
  @Override
  public void openHands() {
    if (firstOpen) {
      System.out.print(this.color() + this.name() + ":" + END);
      System.out.print(this.hands.get(0));
      System.out.print(GREY + "[???]" + END);
      System.out.println();

      firstOpen = false;
    } else {
      super.openHands();
    }
  }

  /**
   * ディーラーは17以上になるまで HIT を続ける.
   */
  @Override
  public Choice choice() {
    if (this.handsSum < 17) {
      return Choice.HIT;
    } else {
      return Choice.STAND;
    }
  }
}
