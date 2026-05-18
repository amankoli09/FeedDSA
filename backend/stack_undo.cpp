#include <iostream>
#include <stack>

using namespace std;

stack<string> undoStack;

void saveDeletedPost(string post) {

    undoStack.push(post);

}

void undoDelete() {

    if(undoStack.empty()) {

        cout << "Nothing To Undo\n";

        return;

    }

    cout << "Restored Post: "
         << undoStack.top() << endl;

    undoStack.pop();

}