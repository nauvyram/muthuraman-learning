
public class BubbleSort {

    public static void swap(int[] arr, int i, int j) {
        int temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    public static void sort(int[] arr, int n) {
        for (int i = n - 1; i >= 1; i--) {
            boolean isSorted = true;
            for (int j = 1; j <= i; j++) {
                while (arr[j - 1] > arr[j]) {
                    isSorted = false;
                    swap(arr, j, j - 1);
                }
            }
            if (isSorted)
                return;
        }
    }

    public static void printArray(int[] arr, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        BubbleSort bs = new BubbleSort();
        int[] arr = { 64, 25, 12, 22, 11, 43 };
        int n = arr.length;
        System.out.println("Sorted Array");

        bs.sort(arr, n);

        bs.printArray(arr, n);
    }
}
