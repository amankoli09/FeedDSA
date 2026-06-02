#include <iostream>
using namespace std;

// Linked List Node for Comments
struct CommentNode {
    string text;
    CommentNode* next;
};

// Global head for our simple comments list
CommentNode* headComment = NULL;

// Add a comment to the end of the Linked List
// Time Complexity: O(N) where N is number of comments
void addComment(string newText) {
    CommentNode* newNode = new CommentNode();
    newNode->text = newText;
    newNode->next = NULL;

    if (headComment == NULL) {
        headComment = newNode;
        cout << "Comment added: " << newText << "\n";
        return;
    }

    CommentNode* temp = headComment;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    cout << "Comment added: " << newText << "\n";
}

// Display all comments in the Linked List
// Time Complexity: O(N)
void displayComments() {
    if (headComment == NULL) {
        cout << "No comments yet.\n";
        return;
    }
    
    cout << "\n=== Comments Section (Linked List) ===\n";
    CommentNode* temp = headComment;
    int count = 1;
    while (temp != NULL) {
        cout << count << ". " << temp->text << "\n";
        temp = temp->next;
        count++;
    }
    cout << "======================================\n";
}
