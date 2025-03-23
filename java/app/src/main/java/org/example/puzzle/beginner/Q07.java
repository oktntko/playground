package org.example.puzzle.beginner;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Q07 {
  public static void main(String[] args) {
    var begin = System.currentTimeMillis();

    final LocalDate FROM = LocalDate.of(1964, 10, 10);
    final LocalDate END = LocalDate.of(2020, 7, 24);

    for (LocalDate i = FROM; i.isBefore(END) || i.isEqual(END); i = i.plusDays(1)) {
      var base = Integer.parseInt(i.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
      var b02 = new StringBuilder(Integer.toString(base, 2)).reverse().toString();
      var transformed = Integer.parseInt(b02, 2);

      if (base == transformed) {
        System.out.println("a07. = " + i.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
      }
    }

    var finish = System.currentTimeMillis();
    System.out.println((finish - begin) + "ms");
  }
}
