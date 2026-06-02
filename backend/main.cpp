#include "vector_posts.cpp"
#include "stack_undo.cpp"
#include "queue_schedule.cpp"
#include "sorting.cpp"
#include "searching.cpp"
#include "bst.cpp"
#include "graph.cpp"
#include "linked_list_comments.cpp"

int main() {

    addPost(1, "Aman", "Hello Everyone!");
    addPost(2, "Sneha", "Learning DSA");

    displayPosts();

    // This is for undo functionality
    saveDeletedPost("Deleted Post");
    undoDelete();

    // This is for queue scheduling (Higher number = higher priority)
    schedulePost(1, "Post At 10 PM (Normal)");
    schedulePost(10, "Emergency Alert (High Priority)");
    schedulePost(5, "VIP User Post (Medium Priority)");
    showQueue();

    // This is for sorting
    vector<int> likes = {50, 20, 90, 10};

    sortLikes(likes);
    bubbleSort(likes);
    insertionSort(likes);
    quickSort(likes);

    // This is for Linked List (Comments)
    addComment("Great post!");
    addComment("I am learning DSA too.");
    displayComments();

    // This is for searching

    vector<string> postNames = {
        "DSA",
        "Graph",
        "Sorting"
    };

    linearSearch(postNames, "Graph");

    binarySearch(postNames, "Sorting");

    // This is for BST

    Node* root = NULL;

    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);

    cout << "\nBST Traversal:\n";

    inorder(root);

    // This is for graph - build adjacency list first, then traverse
    buildGraph();

    showConnections();

    BFS();

    DFS();

    return 0;

}