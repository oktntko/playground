package playground.java.bj;

public class Trump {

  public String suit;
  public int rank;
  public int calcRank;

  /**
   * トランプ.
   *
   * @param suit マーク
   * @param rank 数値
   */
  public Trump(String suit, int rank) {
    this.suit = suit;
    this.rank = rank;
    this.calcRank = rank > 10 ? 10 : rank;
  }

  @Override
  public String toString() {
    return "[" + this.suit + " " + this.rank + "]";
  }
}
