#include <iostream>
#include <queue>

using namespace std;

queue<string> postQueue;

void schedulePost(string post) {

    postQueue.push(post);

    cout << "Post Scheduled\n";

}

void showQueue() {

    queue<string> temp = postQueue;

    cout << "\nScheduled Posts:\n";

    while(!temp.empty()) {

        cout << temp.front() << endl;

        temp.pop();

    }

}