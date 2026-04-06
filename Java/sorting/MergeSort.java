public class MergeSort {

    public static void merge(int[] arr, int low, int mid, int high) {
        int n = high - low + 1;
        int[] b = new int[n];
        int left = low, right = mid + 1, bIdx = 0;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) {
                b[bIdx++] = arr[left++];
            } else {
                b[bIdx++] = arr[right++];
            }
        }
        while (left <= mid)
            b[bIdx++] = arr[left++];
        while (right <= high)
            b[bIdx++] = arr[right++];

        for (int k = 0; k < n; k++)
            arr[low + k] = b[k];

        b = null;

    }

    public static void mergeSort(int[] arr, int low, int high) {
        if (low < high) {
            int mid = (high + low) / 2;

            mergeSort(arr, low, mid);
            mergeSort(arr, mid + 1, high);

            merge(arr, low, mid, high);
        }

    }

    public static void sort(int[] arr, int n) {
        int low = 0;
        int hight = n - 1;

        mergeSort(arr, low, hight);

    }

    public static void printArray(int[] arr, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        SelectionSort ms = new SelectionSort();
        int[] arr = { 64, 25, 12, 22, 11, 43 };
        int n = arr.length;
        System.out.println("Sorted Array");

        ms.sort(arr, n);

        ms.printArray(arr, n);

    }

}
