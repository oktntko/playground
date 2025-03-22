package org.example.beginner;

import java.util.Objects;

public class Q01 {
  public static void main(String[] args) {
    var begin = System.currentTimeMillis();

    for (int i = 10;; i++) {
      var b02 = Integer.toString(i, 2);
      var o08 = Integer.toString(i, 8);
      var d10 = Integer.toString(i, 10);
      var x16 = Integer.toString(i, 16);

      if (Objects.equals(b02, new StringBuilder(b02).reverse().toString())
          && Objects.equals(o08, new StringBuilder(o08).reverse().toString())
          && Objects.equals(d10, new StringBuilder(d10).reverse().toString())) {
        System.out.println("a01. = " + i + ", " + x16);
        break;
      }
    }

    var finish = System.currentTimeMillis();
    System.out.println((finish - begin) + "ms");
  }
}
