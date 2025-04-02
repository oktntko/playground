package org.example.puzzle.elementary;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Q11 {
  public static void main(String[] args) {
    final var begin = System.currentTimeMillis();

    final var n = new ArrayList<List<BigInteger>>();

    for (BigInteger a = BigInteger.ONE, b = BigInteger.ONE, c; n.size() < 11; a = b, b = c) {
      c = a.add(b);

      BigInteger x = Arrays.asList(c.toString().split("")).stream()
          .map(BigInteger::new)
          .reduce(BigInteger.ZERO, BigInteger::add);

      if (c.remainder(x).equals(BigInteger.ZERO)) {
        n.add(List.of(c, x, c.divide(x)));
      }
    }

    n.forEach(System.out::println);

    final var finish = System.currentTimeMillis();
    System.out.println((finish - begin) + "ms");
  }
}
