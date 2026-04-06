public class InsertionSort {

    public static void sort(int[] arr, int n) {
        for (int i = 1; i < n; i++) {
            int next = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > next) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = next;
        }

    }

    public static void printArray(int[] arr, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        InsertionSort ins = new InsertionSort();
        int[] arr = { 64, 25, 12, 22, 11, 43 };
        int n = arr.length;
        System.out.println("Sorted Array");

        ins.sort(arr, n);

        ins.printArray(arr, n);
    }
}
