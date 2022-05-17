package playground.java.bj;

import java.util.Scanner;

public class Console {

  public static final Scanner IN = new Scanner(System.in);

  public static final String GREY = "\u001b[00;30m";
  public static final String RED = "\u001b[00;31m";
  public static final String GREEN = "\u001b[00;32m";
  public static final String YELLOW = "\u001b[00;33m";
  public static final String PURPLE = "\u001b[00;34m";
  public static final String PINK = "\u001b[00;35m";
  public static final String CYAN = "\u001b[00;36m";
  public static final String WHITE = "\u001b[00;37m";
  public static final String END = "\u001b[00m";

  /**
   * ... をそれっぽく表示する
   */
  public static void waiting(long time, String s) {
    try {
      for (int i = 0; i < 10; i++) {
        System.out.print(s);
        Thread.sleep(time);
      }
      System.out.println();
    } catch (InterruptedException e) {
      System.err.print(e);
    }
  }

  public static void waiting(long time) {
    waiting(time, ".");
  }

  public static void waiting() {
    waiting(10, ".");
  }
}
