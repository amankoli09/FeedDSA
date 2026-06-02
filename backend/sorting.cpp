#include <iostream>
#include <vector>

using namespace std;

// 1. SELECTION SORT - Sort likes in descending order
// Time Complexity: O(N^2) | Space Complexity: O(1)
void sortLikes(vector<int> likes) {
    for(int i = 0; i < likes.size(); i++) {
        for(int j = i + 1; j < likes.size(); j++) {
            if(likes[i] < likes[j]) {
                swap(likes[i], likes[j]);
            }
        }
    }
    cout << "\nSelection Sort Result:\n";
    for(int like : likes) cout << like << " ";
    cout << endl;
}

// 2. BUBBLE SORT - Another sorting method for comparison
// Time Complexity: O(N^2) | Space Complexity: O(1)
void bubbleSort(vector<int> likes) {
    int n = likes.size();
    for(int i = 0; i < n - 1; i++) {
        for(int j = 0; j < n - i - 1; j++) {
            if(likes[j] < likes[j + 1]) {
                swap(likes[j], likes[j + 1]);
            }
        }
    }
    cout << "\nBubble Sort Result:\n";
    for(int like : likes) cout << like << " ";
    cout << endl;
}

// 3. INSERTION SORT - Required by Problem Statement
// Time Complexity: O(N^2) | Space Complexity: O(1)
void insertionSort(vector<int> likes) {
    // A very simple way to write insertion sort using swap
    for (int i = 1; i < likes.size(); i++) {
        for (int j = i; j > 0 && likes[j - 1] < likes[j]; j--) {
            swap(likes[j], likes[j - 1]);
        }
    }
    cout << "\nInsertion Sort Result:\n";
    for(int like : likes) cout << like << " ";
    cout << endl;
}

// 4. QUICK SORT - Required by Problem Statement
// Time Complexity: O(N log N) average | Space Complexity: O(log N)
void quickSortHelper(vector<int>& arr, int low, int high) {
    if (low >= high) return; // Base case: array of size 0 or 1
    
    int pivot = arr[high];   // Choose last element as pivot
    int left = low;
    
    // Put elements greater than pivot on the left side
    for (int i = low; i < high; i++) {
        if (arr[i] > pivot) {
            swap(arr[i], arr[left]);
            left++;
        }
    }
    // Put pivot in its correct position
    swap(arr[left], arr[high]);
    
    // Recursively sort the two halves
    quickSortHelper(arr, low, left - 1);
    quickSortHelper(arr, left + 1, high);
}

void quickSort(vector<int> likes) {
    quickSortHelper(likes, 0, likes.size() - 1);
    cout << "\nQuick Sort Result:\n";
    for(int like : likes) cout << like << " ";
    cout << endl;
}