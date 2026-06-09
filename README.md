# Socio — DSA-Powered Social Media Feed

Socio is a comprehensive, full-stack desktop application designed to demonstrate the real-world application of core **Data Structures and Algorithms (DSA)** in modern web and social media feeds. The project is split into a robust **C++ Backend CLI** and a highly interactive, responsive **HTML/CSS/JS Frontend** that visualizes complex algorithms such as BFS, DFS, sorting, and tree traversals in real-time.

---

## 📂 Project Architecture & File Structure

The project is structured logically into two primary segments: a console-based C++ engine (Backend) and an interactive web interface (Frontend).

```
DSA/
├── backend/
│   ├── main.cpp              # Core runner & driver file
│   ├── vector_posts.cpp      # Array-based Post list (Vector)
│   ├── stack_undo.cpp        # Undo system using LIFO Stack
│   ├── queue_schedule.cpp    # Post scheduling using FIFO Queue
│   ├── sorting.cpp           # O(N²) Sorting algorithms (Bubble & Selection)
│   ├── searching.cpp         # Post lookup (Linear & O(log N) Binary Search)
│   ├── bst.cpp               # Hierarchical ID storage & Inorder traversal
│   └── graph.cpp             # Friend network with BFS & DFS traversals
└── frontend/
    ├── index.html            # Premium glassmorphic interface markup
    ├── style.css             # Harmonious styling & micro-animations
    └── script.js             # Canvas graph renderer & algorithmic logic
```

---

## 📊 Data Structures & Algorithms Mapping

| Component | Backend File | Frontend (JS) Implementation | Data Structure | Time Complexity (Average/Worst) | Space Complexity | Practical Social Media Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Post Feed** | `vector_posts.cpp` | `posts` array | Dynamic Array (`std::vector`) | Insert: $O(1)$<br>Delete: $O(N)$ | $O(N)$ | Managing the primary list of active posts on the user's feed. |
| **Undo Delete** | `stack_undo.cpp` | `deletedStack` | Stack (`std::stack`) | Push: $O(1)$<br>Pop: $O(1)$ | $O(N)$ | "Undo" toast notifying the user to restore the last deleted post. |
| **Post Scheduling** | `queue_schedule.cpp`| `scheduledQueue` | Queue (`std::queue`) | Enqueue: $O(1)$<br>Dequeue: $O(1)$ | $O(N)$ | Queuing posts to be published at a specific future scheduled time. |
| **Search Engine** | `searching.cpp` | Live search handler | Linear & Binary Search | Linear: $O(N)$<br>Binary: $O(\log N)$ | $O(1)$ | Search bar to filter posts by user name or keyword. |
| **Feed Ranking** | `sorting.cpp` | Switch tabs sort algorithm | Selection & Bubble Sort | Comparisons: $O(N^2)$<br>Swaps: $O(N)$ | $O(1)$ | Sorting the feed by popularity (Likes in descending order). |
| **Post Indexing** | `bst.cpp` | Simulated indexing | Binary Search Tree (BST) | Search: $O(\log N)$ / $O(N)$<br>Insert: $O(\log N)$ / $O(N)$ | $O(N)$ | Hierarchical indexing of post IDs to enable quick lookups. |
| **Friend Network** | `graph.cpp` | HTML5 Canvas Draw | Graph (Adjacency List) | BFS: $O(V + E)$<br>DFS: $O(V + E)$ | $O(V + E)$ | Mapping connection hubs, running mutual friend suggestions. |

---

## 🔍 In-Depth Technical Deep Dive (File-by-File)

---

### 1. Post Storage & Management (`vector_posts.cpp`)
* **Concept**: Dynamically sizing array representation.
* **Explanation**: In standard C++, `std::vector` is a sequence container representing arrays that can change in size. It stores items in contiguous memory locations, offering rapid element access via indices ($O(1)$) but requiring sequential shifting of elements during deletions.
* **C++ Code Snippet**:
  ```cpp
  struct Post {
      int id;
      string user;
      string content;
      int likes;
  };
  
  vector<Post> posts;
  
  void addPost(int id, string user, string content) {
      Post newPost = {id, user, content, 0};
      posts.push_back(newPost);
  }
  ```
* **Complexity**:
  * **Insertion**: $O(1)$ amortized constant time (appending to the back).
  * **Deletion**: $O(N)$ linear time due to the need to shift subsequent elements leftward when an element is removed.
  * **Space Complexity**: $O(N)$ auxiliary storage to keep $N$ posts in RAM.

---

### 2. The Undo System (`stack_undo.cpp`)
* **Concept**: Last-In-First-Out (LIFO) Stack.
* **Explanation**: A Stack is a linear data structure that operates under the LIFO principle. The last deleted post is placed on top. If the user clicks "Undo", we pop this topmost post and restore it to the feed.
* **C++ Code Snippet**:
  ```cpp
  stack<string> undoStack;
  
  void saveDeletedPost(string post) {
      undoStack.push(post);
  }
  
  void undoDelete() {
      if(undoStack.empty()) return;
      cout << "Restored Post: " << undoStack.top() << endl;
      undoStack.pop();
  }
  ```
* **Visual Representation**:
  ```
  [Deleted Post 3]  <- Top of Stack (Last Deleted, First to be Restored)
  [Deleted Post 2]
  [Deleted Post 1]  <- Base of Stack
  ```
* **Complexity**:
  * **Push / Pop**: $O(1)$ absolute constant time.
  * **Space Complexity**: $O(N)$ to hold the history of deleted items.

---

### 3. Post Scheduling Queue (`queue_schedule.cpp`)
* **Concept**: First-In-First-Out (FIFO) Queue.
* **Explanation**: A Queue operates on the FIFO principle, simulating scheduled tasks. The first post scheduled is the first to be published when the clock triggers.
* **C++ Code Snippet**:
  ```cpp
  queue<string> postQueue;
  
  void schedulePost(string post) {
      postQueue.push(post);
  }
  ```
* **Visual Representation**:
  ```
  Front [Post A] -> [Post B] -> [Post C] Rear
    ^                               ^
  Next to Publish              Newly Scheduled
  ```
* **Complexity**:
  * **Enqueue (Push) / Dequeue (Pop)**: $O(1)$ constant time.
  * **Space Complexity**: $O(N)$ to hold scheduled string payloads.

---

### 4. Feed Ranking Engine (`sorting.cpp`)
* **Concept**: Sorting Algorithms (Selection Sort & Bubble Sort).
* **Explanation**: To rank posts by popularity, the system sorts them by the number of likes in descending order.
  * **Selection Sort**: Iteratively scans the array to find the post with the maximum likes and swaps it into its correct positions.
  * **Bubble Sort**: Compares adjacent posts and swaps them if the left one has fewer likes than the right one, bubbling the highest liked post to the top.
* **C++ Code Snippet (Selection Sort)**:
  ```cpp
  void sortLikes(vector<int> likes) {
      for(int i = 0; i < likes.size(); i++) {
          for(int j = i + 1; j < likes.size(); j++) {
              if(likes[i] < likes[j]) {
                  swap(likes[i], likes[j]);
              }
          }
      }
  }
  ```
* **Complexity**:
  * **Time Complexity**: $O(N^2)$ average and worst case.
  * **Space Complexity**: $O(1)$ auxiliary space as it performs in-place sorting.

---

### 5. Search Engine (`searching.cpp`)
* **Concept**: Linear Search vs. Binary Search.
* **Explanation**:
  * **Linear Search**: Scans the feed sequentially from index $0$ to $N-1$. Suitable for unsorted, dynamic data.
  * **Binary Search**: Divides the search interval in half continuously. **Crucial Pre-requisite**: The posts must be sorted alphabetically by keyword/user.
* **C++ Code Snippet (Binary Search)**:
  ```cpp
  void binarySearch(vector<string> posts, string target) {
      int low = 0, high = posts.size() - 1;
      while(low <= high) {
          int mid = (low + high) / 2;
          if(posts[mid] == target) {
              cout << "Post Found at index " << mid << endl;
              return;
          } else if(posts[mid] < target) {
              low = mid + 1;
          } else {
              high = mid - 1;
          }
      }
  }
  ```
* **Complexity Comparison**:
  * **Linear Search**: Time $O(N)$, Space $O(1)$.
  * **Binary Search**: Time $O(\log N)$, Space $O(1)$.

---

### 6. Post Indexing Tree (`bst.cpp`)
* **Concept**: Binary Search Tree (BST) and Inorder Traversal.
* **Explanation**: To search posts extremely rapidly without keeping the primary feed array sorted, we index Post IDs inside a BST. For any node, all left descendents are smaller and all right descendents are larger. Doing an **Inorder Traversal** (Left-Root-Right) yields the IDs in sorted ascending order.
* **Mermaid BST Diagram**:
  ```mermaid
  graph TD
      50((50))
      30((30))
      70((70))
      50 --> 30
      50 --> 70
  ```
* **C++ Code Snippet**:
  ```cpp
  struct Node {
      int data;
      Node* left;
      Node* right;
  };
  
  Node* insert(Node* root, int value) {
      if(root == NULL) return new Node{value, NULL, NULL};
      if(value < root->data) root->left = insert(root->left, value);
      else root->right = insert(root->right, value);
      return root;
  }
  
  void inorder(Node* root) {
      if(root == NULL) return;
      inorder(root->left);
      cout << root->data << " ";
      inorder(root->right);
  }
  ```
* **Complexity**:
  * **Search & Insert**: $O(\log N)$ average, degrading to $O(N)$ if the tree is completely skewed.
  * **Space Complexity**: $O(N)$ to store tree structures in memory.

---

### 7. Friend Network (`graph.cpp`)
* **Concept**: Undirected Graph with BFS & DFS Traversals.
* **Explanation**:
  * **Graph Model**: Users represent vertices ($V$), and friendships represent undirected edges ($E$). The graph is stored as an **Adjacency List** (an array of vectors).
  * **BFS (Breadth-First Search)**: Explores neighboring vertices level by level. Ideal for suggesting immediate mutual connections (first-degree friends).
  * **DFS (Depth-First Search)**: Explores deep paths completely before backtracking. Ideal for discovering long-range paths in social circles.
* **Mermaid Graph Diagram**:
  ```mermaid
  graph LR
      Aman((Aman)) --- Sneha((Sneha))
      Sneha --- Rahul((Rahul))
      Rahul --- Priya((Priya))
      Priya --- Dev((Dev))
      Aman --- Dev
  ```
* **C++ Code Snippet (BFS)**:
  ```cpp
  const int USERS = 5;
  vector<int> adj[USERS];
  
  void BFS(int start = 0) {
      bool visited[USERS] = {false};
      queue<int> q;
      visited[start] = true;
      q.push(start);
      
      while(!q.empty()) {
          int u = q.front(); q.pop();
          cout << u << " ";
          for(int neighbor : adj[u]) {
              if(!visited[neighbor]) {
                  visited[neighbor] = true;
                  q.push(neighbor);
              }
          }
      }
  }
  ```
* **Complexity**:
  * **Time Complexity**: $O(V + E)$ where $V = \text{Vertices}$ and $E = \text{Edges}$.
  * **Space Complexity**: $O(V + E)$ representation space in adjacency list.

---

## 💻 Frontend Mirroring & Visualization (`frontend/script.js`)

A key aspect of this project is the elegant alignment between backend concepts and frontend user interaction. The JavaScript implementation translates core static backend structures into visually interactive browser objects:

1. **Stack Implementation**: Clicking `🗑` on a post triggers `deletePost()`. It pushes the deleted post structure onto `deletedStack = []` (Stack push) and deletes it from the main array. A toast pops up containing an "Undo" button. Clicking "Undo" pops the post from `deletedStack` (Stack pop) and pushes it back into the active posts array.
2. **Queue Implementation**: The schedule feature asks the user to input a post. When the schedule button is pressed, the text is queued in `scheduledQueue = []` (Enqueue). It displays scheduled posts sequentially from first-in to last-in.
3. **Sorting (Ranking)**: The "Popular" tab executes an interactive Selection Sort on likes in real-time, sorting the UI cards immediately.
4. **Canvas Graph Renderer**: BFS and DFS are visualized step-by-step on a customized HTML5 `<canvas>`.
   - Nodes are placed in a pentagon form.
   - When **BFS** is clicked, it runs a JavaScript-mirrored BFS using a queue to highlight nodes level by level starting from Aman, drawing green transitions.
   - When **DFS** is clicked, it runs a deep traversal, lighting up nodes depth-first.

---

## 🚀 Compilation & Running Instructions

### 1. C++ Backend (Console)
Ensure you have a standard C++ compiler (`g++` or `clang++`) installed on your system.

```bash
# Compile the backend
g++ -o dsa_app backend/main.cpp

# Run the backend console application
./dsa_app
```

### 2. Frontend Web Interface
No compilation or server setup is required for the frontend.
- Simply navigate to the `frontend/` directory.
- Double-click `index.html` or open it with any modern web browser (Chrome, Safari, Firefox, Edge).
- Alternatively, run a local development server in the root workspace:
  ```bash
  # Using Python to spin up a quick server
  python3 -m http.server 8000
  ```
  Open [http://localhost:8000/frontend/](http://localhost:8000/frontend/) in your browser.

---

## 📈 Analysis & Evaluation Summary

This project showcases how selecting the correct data structure improves algorithm efficiency:
- **Search Efficiency**: Moving from O(N) Linear Search to O(log N) Binary Search reduces search time drastically as post volumes scale.
- **Hierarchical Access**: BST index allows post ID categorization without sorting the flat feed structure continuously.
- **Graph Traversal**: Social media network properties (like degrees of separations and friend suggestions) are naturally modeled using Adjacency Lists, providing an optimal time complexity of $O(V + E)$.

## Made with ❤️ 
