#include <iostream>
#include <vector>

using namespace std;

// SELECTION SORT - Sort likes in descending order

void sortLikes(vector<int> likes) {

    for(int i = 0; i < likes.size(); i++) {

        for(int j = i + 1; j < likes.size(); j++) {

            if(likes[i] < likes[j]) {

                swap(likes[i], likes[j]);

            }

        }

    }

    cout << "\nSelection Sort Result:\n";

    for(int like : likes) {

        cout << like << " ";

    }

    cout << endl;

}

// BUBBLE SORT - Another sorting method for comparison

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

    for(int like : likes) {

        cout << like << " ";

    }

    cout << endl;

}