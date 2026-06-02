#include <iostream>
#include <queue>

using namespace std;

// Using priority_queue with a pair: <priority_level, post_content>
// Higher priority number = higher priority (processed first)
priority_queue<pair<int, string>> postQueue;

void schedulePost(int priority, string post) {

    postQueue.push({priority, post});

    cout << "Post Scheduled with priority " << priority << "\n";

}

void showQueue() {

    // Create a copy to show without modifying the original queue
    priority_queue<pair<int, string>> temp = postQueue;

    cout << "\nScheduled Posts (Highest Priority First):\n";

    while(!temp.empty()) {
        
        // .top() gives the highest priority element
        cout << "[Priority: " << temp.top().first << "] " << temp.top().second << endl;

        temp.pop();

    }

}