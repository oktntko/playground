package org.example.puzzle.elementary;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Q21 {
  public static void main(String[] args) {
    final var begin = System.currentTimeMillis();

    final var arr = new ArrayList<Boolean>();
    arr.add(true);

    for (int count = 0; count < 2014;) {
      final Collection<Boolean> cur = IntStream.range(0, arr.size() + 1)
          .mapToObj(i -> Q21.get(arr, i - 1) != Q21.get(arr, i))
          .collect(Collectors.toList());
      arr.clear();
      arr.addAll(cur);

      count += arr.stream().filter(x -> !x).count();
    }

    System.out.println(arr.size());

    final var finish = System.currentTimeMillis();
    System.out.println((finish - begin) + "ms");
  }

  private static boolean get(final List<Boolean> arr, final int i) {
    return (i < 0 || arr.size() <= i) ? false : arr.get(i);
  }
}
