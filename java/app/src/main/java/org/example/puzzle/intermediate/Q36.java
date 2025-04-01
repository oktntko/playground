package org.example.puzzle.intermediate;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Q36 {
  public static void main(String[] args) {
    final var begin = System.currentTimeMillis();

    logic().forEach(System.out::println);

    final var finish = System.currentTimeMillis();
    System.out.println((finish - begin) + "ms");
  }

  record Record(int number, int seven, boolean reverse) {

  }

  public static Collection<Record> logic() {
    final var LAST = 50;
    return IntStream.range(0, LAST + 1)
        .filter(n -> n % 2 != 0 && n % 5 != 0)
        .mapToObj(number -> {

          for (int i = 1;; i += 2) {
            final String b02 = Integer.toString(i, 2);
            final var seven = Integer.parseInt(b02) * 7;

            if (seven % number == 0) {
              return new Record(
                  number,
                  seven,
                  Objects.equals(b02, new StringBuilder(b02).reverse().toString()));
            }
          }
        })
        .filter(x -> x.reverse)
        .collect(Collectors.toList());
  }
}
