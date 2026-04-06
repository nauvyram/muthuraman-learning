public class ReccursiveBubbleSort {
    public static void swap(int[] arr, int i, int j) {
        int temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    public static void sort(int[] arr, int n) {
        if (n == 1)
            return;

        int count = 0;

        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                count++;
            }
        }

        if (count == 0)
            return;

        sort(arr, n - 1);
    }

    public static void printArray(int[] arr, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        ReccursiveBubbleSort rbs = new ReccursiveBubbleSort();
        int[] arr = { 64, 25, 12, 22, 11, 43 };
        int n = arr.length;
        System.out.println("Sorted Array");

        rbs.sort(arr, n);

        rbs.printArray(arr, n);
    }

}
