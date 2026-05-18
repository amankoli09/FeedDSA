#include <iostream>
#include <vector>
using namespace std;

void linearSearch(vector<string> posts, string target) {

    for(string post : posts) {

        if(post == target) {

            cout << "Linear Search: Post Found\n";

            return;

        }

    }

    cout << "Linear Search: Post Not Found\n";

}

void binarySearch(vector<string> posts, string target) { // Note: The vector should be sorted for binary search to work

    int low = 0, high = posts.size() - 1;

    while(low <= high) {

        int mid = (low + high) / 2;

        if(posts[mid] == target) {

            cout << "Binary Search: Post Found at index " << mid << "\n";

            return;

        } else if(posts[mid] < target) {

            low = mid + 1;

        } else {

            high = mid - 1;

        }

    }

    cout << "Binary Search: Post Not Found\n";

}