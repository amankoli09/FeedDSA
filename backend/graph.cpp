#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Number of users (nodes) in the friend network
const int USERS = 5;
string userNames[USERS] = {"Aman", "Sneha", "Rahul", "Priya", "Dev"};

// Adjacency List - represents friend connections
vector<int> adj[USERS];

// Add a two-way (undirected) friendship connection
void addEdge(int u, int v) {
    adj[u].push_back(v);
    adj[v].push_back(u);
}

// Build the friend network graph
void buildGraph() {
    addEdge(0, 1); // Aman   - Sneha
    addEdge(1, 2); // Sneha  - Rahul
    addEdge(2, 3); // Rahul  - Priya
    addEdge(3, 4); // Priya  - Dev
    addEdge(0, 4); // Aman   - Dev
}

// Show all connections (Adjacency List)
void showConnections() {
    cout << "\n=== Friend Network (Adjacency List) ===\n";
    for (int i = 0; i < USERS; i++) {
        cout << userNames[i] << " -> ";
        for (int j : adj[i]) {
            cout << userNames[j] << "  ";
        }
        cout << "\n";
    }
}

// BFS - Breadth First Search (Level by Level)
// Time Complexity: O(V + E)
void BFS(int start = 0) {
    bool visited[USERS] = {false};
    queue<int> q;

    visited[start] = true;
    q.push(start);

    cout << "\nBFS Traversal (Friend Suggestions): ";

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << userNames[node] << " ";

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    cout << "\n";
}

// DFS Helper - recursive
void DFSHelper(int node, bool visited[]) {
    visited[node] = true;
    cout << userNames[node] << " ";

    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            DFSHelper(neighbor, visited);
        }
    }
}

// DFS - Depth First Search (Explore deep connections)
// Time Complexity: O(V + E)
void DFS(int start = 0) {
    bool visited[USERS] = {false};
    cout << "\nDFS Traversal (Deep Connections): ";
    DFSHelper(start, visited);
    cout << "\n";
}