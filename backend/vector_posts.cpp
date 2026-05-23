#include <iostream>
#include <vector>
using namespace std;

struct Post {
    int id;         // this is the positing structure for the post
    string user;
    string content;
    int likes;
};

// This part will store the post
vector<Post> posts;

// Function to add a new post

void addPost(int id , string user, string content) {

    Post newPost;

    newPost.id = id;
    newPost.user = user;
    newPost.content = content;
    newPost.likes = 0; // initialize likes to 0

    posts.push_back(newPost);
    cout << "Post added successfully!" << endl;
}

// Thiw will display all the posts

void displayPosts(){

    cout <<"\n === Social Feed ===" << endl;
    for(Post post : posts){

        cout << "ID: " << post.id << endl;
        cout << "User: " << post.user << endl;
        cout << "Content: " << post.content << endl;
        cout << "Likes: " << post.likes << endl;
    }
}
// Deleting the post 
void deletePost(int id){

    for (int i = 0; i < posts.size(); i++)
    {
        if (posts[i].id == id)
        {
            posts.erase(posts.begin() + i);
            cout << "Post deleted successfully!" << endl;
            return;
        }
    }
    cout << "Post not found!" << endl;
}
// Function to like a post
void likePost(int id){
    for (Post &post : posts)
    {
        if (post.id == id)
        {
            post.likes++;
            cout << "Post liked successfully!" << endl;
            return;
        }
    }
    cout << "Post not found!" << endl;
}
