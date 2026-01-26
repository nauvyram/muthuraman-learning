public class SelectionSort {

	public static void swap(int[] arr, int i, int j) {
		int temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}

	public static void sort(int[] arr, int n) {
		for (int i = 0; i < n - 1; i++) {
			int min_idx = i;
			for (int j = i + 1; j < n; j++)
				if (arr[j] < arr[min_idx])
					min_idx = j;

			swap(arr, i, min_idx);
		}
	}

	public static void printArray(int[] arr, int n) {
		for (int i = 0; i < n; i++) {
			System.out.print(arr[i] + " ");
		}
		System.out.println();
	}

	public static void main(String[] args) {
		SelectionSort ss = new SelectionSort();
		int[] arr = { 64, 25, 12, 22, 11, 43 };
		int n = arr.length;
		System.out.println("Sorted Array");

		ss.sort(arr, n);

		ss.printArray(arr, n);

	}
}