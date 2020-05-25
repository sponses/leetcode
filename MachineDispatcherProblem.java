import java.util.*;

public class MachineDispatcherProblem {
  private static Integer workTime[] = { 35, 20, 16, 15, 13, 5, 2 };
  private static int machineNumber = 3;
  private static Integer min;
  private static Integer max;
  private static Integer minRunNumber;

  private static int getMin(List<Integer> list) {
    min = list.get(0);
    for (int i = 0; i < list.size(); i++) {
      if (list.get(i) < min) {
        min = list.get(i);
      }
    }
    return list.indexOf(min);
  }

  private static int getMax(List<Integer> list) {

    max = list.get(0);
    for (int i = 0; i < list.size(); i++) {
      if (max < list.get(i)) {
        max = list.get(i);
      }
    }
    return list.indexOf(max);
  }

  public static void main(String[] args) {
    List<Integer> list = new ArrayList<Integer>();
    for (int i = 0; i < workTime.length; i++) {
      list.add(workTime[i]);
    }

    List<Integer> listRun = new ArrayList<Integer>();
    for (int i = 0; i < machineNumber; i++) {
      listRun.add(list.get(i));
    }
    for (int i = 0; i < machineNumber; i++) {
      list.remove(0);
    }
    for (int i = 0; i < list.size(); i++) {
      minRunNumber = getMin(listRun);// 返回最小值的下标
      listRun.set(minRunNumber, (list.get(i) + listRun.get(minRunNumber)));
    }
    System.out.println("最短的时间：" + listRun.get(getMax(listRun)));

  }
}