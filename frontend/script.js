// ============================================================
// DATA - Posts array (acts like a Linked List / Array of posts)
// ============================================================
let posts = [
  {
    id: 1,
    name: "Aman Koli",
    time: "2 min ago",
    content: "Just completed my social media DSA project! BFS, DFS, Stack, Queue — all working 🚀",
    likes: 128,
    liked: false,
    avatar: "A",
    color: "#e53935",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sneha Rao",
    time: "15 min ago",
    content: "BFS and DFS make so much more sense when you visualize the graph traversal! ❤️",
    likes: 91,
    liked: false,
    avatar: "S",
    color: "#9c27b0",
    image: ""
  },
  {
    id: 3,
    name: "Rahul Dev",
    time: "1 hr ago",
    content: "Binary Search runs in O(log n) vs Linear Search O(n). The difference at scale is massive! 🔍",
    likes: 64,
    liked: false,
    avatar: "R",
    color: "#1976d2",
    image: ""
  }
];

// Stack for undo-delete (LIFO)
let deletedStack = [];

// Queue for scheduled posts (FIFO)
let scheduledQueue = [];

// Current active feed tab
let currentTab = 'foryou';

// ============================================================
// GRAPH DATA — Adjacency List (mirrors graph.cpp)
// Users: 0=Aman, 1=Sneha, 2=Rahul, 3=Priya, 4=Dev
// ============================================================
const graphUsers = ["Aman", "Sneha", "Rahul", "Priya", "Dev"];

const adjList = {
  0: [1, 4],  // Aman   -> Sneha, Dev
  1: [0, 2],  // Sneha  -> Aman, Rahul
  2: [1, 3],  // Rahul  -> Sneha, Priya
  3: [2, 4],  // Priya  -> Rahul, Dev
  4: [0, 3]   // Dev    -> Aman, Priya
};

// Node positions on the canvas (pentagon shape)
const nodePos = [
  { x: 120, y: 28  },   // Aman  (top center)
  { x: 38,  y: 88  },   // Sneha (left)
  { x: 65,  y: 168 },   // Rahul (bottom left)
  { x: 175, y: 168 },   // Priya (bottom right)
  { x: 202, y: 88  }    // Dev   (right)
];

// ============================================================
// GRAPH VISUALIZATION — Draw on Canvas
// ============================================================
function drawGraph(highlightOrder = []) {
  const canvas = document.getElementById("networkGraph");
  const ctx = canvas.getContext("2d");
  const W = 240, H = 200;

  // Retina support
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + "px";
  canvas.style.height = H + "px";
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  // Draw edges
  for (let u = 0; u < graphUsers.length; u++) {
    for (let v of adjList[u]) {
      if (v > u) {
        ctx.beginPath();
        ctx.moveTo(nodePos[u].x, nodePos[u].y);
        ctx.lineTo(nodePos[v].x, nodePos[v].y);
        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  graphUsers.forEach((user, i) => {
    const pos = nodePos[i];
    const stepIndex = highlightOrder.indexOf(i);
    const isHighlighted = stepIndex !== -1;

    // Circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? "#e53935" : "#fff";
    ctx.fill();
    ctx.strokeStyle = isHighlighted ? "#e53935" : "#ddd";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text inside node
    ctx.fillStyle = isHighlighted ? "#fff" : "#555";
    ctx.font = `bold 11px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(isHighlighted ? (stepIndex + 1) : user[0], pos.x, pos.y);

    // Label below node
    ctx.fillStyle = "#444";
    ctx.font = "10px Inter, sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText(user, pos.x, pos.y + 24);
  });
}

// ============================================================
// BFS — Breadth First Search (Queue-based, O(V+E))
// ============================================================
function bfsTraverse(start) {
  const visited = new Array(graphUsers.length).fill(false);
  const queue   = [start];
  const order   = [];
  visited[start] = true;

  while (queue.length > 0) {
    const node = queue.shift();     // dequeue (FIFO)
    order.push(node);
    for (const neighbor of adjList[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);       // enqueue
      }
    }
  }
  return order;
}

// ============================================================
// DFS — Depth First Search (Recursive, O(V+E))
// ============================================================
function dfsTraverse(start) {
  const visited = new Array(graphUsers.length).fill(false);
  const order   = [];

  function dfs(node) {
    visited[node] = true;
    order.push(node);
    for (const neighbor of adjList[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
  }

  dfs(start);
  return order;
}

function runBFS() {
  document.getElementById("bfsBtn").classList.add("active");
  document.getElementById("dfsBtn").classList.remove("active");

  const order = bfsTraverse(0);
  drawGraph(order);

  const names = order.map(i => graphUsers[i]).join(" → ");
  document.getElementById("traversalResult").innerHTML =
    `<strong>BFS:</strong> ${names}<br>
     <small style="color:#aaa">Level-by-level | O(V+E)</small>`;
}

function runDFS() {
  document.getElementById("dfsBtn").classList.add("active");
  document.getElementById("bfsBtn").classList.remove("active");

  const order = dfsTraverse(0);
  drawGraph(order);

  const names = order.map(i => graphUsers[i]).join(" → ");
  document.getElementById("traversalResult").innerHTML =
    `<strong>DFS:</strong> ${names}<br>
     <small style="color:#aaa">Deep path first | O(V+E)</small>`;
}

// ============================================================
// POSTS — Render
// ============================================================
function renderPosts(data = posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:#bbb;font-size:14px;">No posts found</div>`;
    return;
  }

  data.forEach(post => {
    container.innerHTML += `
      <div class="post-card">

        <div class="post-top">
          <div class="post-user">
            <div class="post-avatar" style="background:${post.color}">${post.avatar}</div>
            <div>
              <h3>${post.name}</h3>
              <span>${post.time}</span>
            </div>
          </div>
          <span class="post-more">···</span>
        </div>

        <div class="post-content">${post.content}</div>

        ${post.image ? `<img src="${post.image}" class="post-image" alt="post image">` : ""}

        <div class="post-actions">
          <button class="action-btn ${post.liked ? "liked" : ""}" onclick="likePost(${post.id})">
            ${post.liked ? "❤️" : "🤍"} ${post.likes}
          </button>
          <button class="action-btn">💬 Comment</button>
          <button class="action-btn">🔗 Share</button>
          <button class="action-btn delete-btn" onclick="deletePost(${post.id})">🗑</button>
        </div>

      </div>
    `;
  });

  document.getElementById("postCount").textContent = posts.length;
}

// ============================================================
// FEED TABS — For You | Popular (Selection Sort) | Recent
// ============================================================
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(`tab-${tab}`).classList.add("active");

  let sorted = [...posts];

  if (tab === "popular") {
    // Selection Sort by likes (descending) — O(n²)
    for (let i = 0; i < sorted.length; i++) {
      let maxIdx = i;
      for (let j = i + 1; j < sorted.length; j++) {
        if (sorted[j].likes > sorted[maxIdx].likes) maxIdx = j;
      }
      [sorted[i], sorted[maxIdx]] = [sorted[maxIdx], sorted[i]];
    }
  } else if (tab === "recent") {
    sorted = [...posts].reverse();
  }

  renderPosts(sorted);
}

// ============================================================
// ADD POST
// ============================================================
function addPost() {
  const input = document.getElementById("postTextarea");
  const text  = input.value.trim();
  if (text === "") return;

  const colors = ["#e53935", "#9c27b0", "#1976d2", "#388e3c", "#f57c00"];
  const newPost = {
    id:    Date.now(),
    name:  "You",
    time:  "Just now",
    content: text,
    likes: 0,
    liked: false,
    avatar: "Y",
    color:  colors[Math.floor(Math.random() * colors.length)],
    image:  ""
  };

  posts.unshift(newPost);
  input.value = "";
  renderPosts();
}

// ============================================================
// LIKE POST (toggles liked state)
// ============================================================
function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.liked  = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
  }
}

// ============================================================
// DELETE POST — push to Stack (undo support)
// ============================================================
function deletePost(id) {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return;

  deletedStack.push(posts[index]);    // PUSH to stack
  posts.splice(index, 1);

  renderPosts();
  showUndo();
}

function showUndo() {
  const box = document.getElementById("undoBox");
  box.style.display = "flex";
  setTimeout(() => { box.style.display = "none"; }, 5000);
}

// UNDO DELETE — pop from Stack
function undoDelete() {
  if (deletedStack.length === 0) return;
  const post = deletedStack.pop();    // POP from stack
  posts.unshift(post);
  renderPosts();
  document.getElementById("undoBox").style.display = "none";
}

// ============================================================
// SCHEDULE POST — push to Queue
// ============================================================
function schedulePost() {
  const input = document.getElementById("postTextarea");
  const text  = input.value.trim();
  if (text === "") { alert("Write something to schedule!"); return; }

  scheduledQueue.push(text);          // ENQUEUE
  input.value = "";
  renderQueue();

  document.getElementById("queueBox").style.display = "block";
}

function renderQueue() {
  const container = document.getElementById("scheduledPosts");
  container.innerHTML = "";
  document.getElementById("queueCount").textContent = scheduledQueue.length;

  scheduledQueue.forEach(post => {
    container.innerHTML += `<div class="scheduled-item">🕐 ${post}</div>`;
  });
}

// ============================================================
// SEARCH — Live filter using Linear Search
// ============================================================
document.getElementById("searchInput").addEventListener("input", function () {
  const text = this.value.toLowerCase();

  // Linear Search through posts
  const filtered = posts.filter(post =>
    post.content.toLowerCase().includes(text) ||
    post.name.toLowerCase().includes(text)
  );

  renderPosts(filtered);
});

// Focus post textarea
function focusPost() {
  document.getElementById("postTextarea").focus();
}

// ============================================================
// INIT
// ============================================================
renderPosts();
drawGraph([]);