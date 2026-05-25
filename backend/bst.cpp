#include <iostream>

using namespace std;

struct Node {

    int data;
    Node* left;
    Node* right;

};

// This is for creating a new node

Node* createNode(int value) {

    Node* newNode = new Node();

    newNode->data = value;

    newNode->left = NULL;
    newNode->right = NULL;

    return newNode;

}

// This is for inserting a new node in the BST

Node* insert(Node* root, int value) {

    if(root == NULL) {

        return createNode(value);

    }

    if(value < root->data) {

        root->left =
        insert(root->left, value);

    }

    else {

        root->right =
        insert(root->right, value);

    }

    return root;

}

void inorder(Node* root) {

    if(root == NULL) return;

    inorder(root->left);

    cout << root->data << " ";

    inorder(root->right);

}