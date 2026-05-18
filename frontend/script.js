let scheduledQueue = [];
let posts = [
  {
    id: 1,
    name: "Aman Koli",
    time: "2 min ago",
    content: "Just completed my social media DSA project UI ✨",
    likes: 128,
    avatar: "A",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  },

  {
    id: 2,
    name: "Sneha Rao",
    time: "15 min ago",
    content: "BFS and DFS are actually fun ❤️",
    likes: 91,
    avatar: "S",
    image: ""
  }
];

let deletedStack = [];
let network = [];


function renderPosts(data = posts) {

  const container = document.getElementById("posts");

  container.innerHTML = "";

  data.forEach(post => {

    container.innerHTML += `

      <div class="post-card">

        <div class="post-top">

          <div class="post-user">

            <div class="post-avatar">
              ${post.avatar}
            </div>

            <div>
              <h3>${post.name}</h3>
              <span>${post.time}</span>
            </div>

          </div>

        </div>

        <div class="post-content">
          ${post.content}
        </div>

        ${post.image
        ?
        `<img src="${post.image}" class="post-image">`
        :
        ""
      }

        <div class="post-actions">

          <button onclick="likePost(${post.id})">
            ❤️ ${post.likes}
          </button>

          <button onclick="deletePost(${post.id})">
            🗑 Delete
          </button>

        </div>

      </div>

    `;

  });

}

// This function adds a new post to the top of the feed and updates the network with the user's name. It also clears the input field after posting.

function addPost() {

  const input = document.querySelector(".post-input");

  const text = input.value.trim();

  if (text === "") return;

  const newPost = {

    id: Date.now(),

    name: "You",

    time: "Just now",

    content: text,

    likes: 0,

    avatar: "Y",

    image: ""

  };

  posts.unshift(newPost);
  network.push(newPost.name);

  renderNetwork();

  input.value = "";

  renderPosts();

}

// this is just for the liking the post

function likePost(id) {

  const post = posts.find(p => p.id === id);

  if (post) {

    post.likes++;

    renderPosts();

  }

}

function deletePost(id) {

  const index = posts.findIndex(p => p.id === id);

  if (index === -1) return;

  deletedStack.push(posts[index]);

  posts.splice(index, 1);

  renderPosts();

  showUndo();

}

// this is for showing the undo option when a post is deleted

function showUndo() {

  const undoBox =
    document.getElementById("undoBox");

  undoBox.style.display = "flex";

  undoBox.innerHTML = `

    Post Deleted

    <button onclick="undoDelete()">
      Undo
    </button>

  `;

  setTimeout(() => {

    undoBox.style.display = "none";

  }, 5000);

}

function undoDelete() {

  if (deletedStack.length === 0) {

    return;

  }

  const post = deletedStack.pop();

  posts.unshift(post);

  renderPosts();

  document.getElementById("undoBox")
    .style.display = "none";

}

// This fuction for the searching the post

function searchPosts() {

  const text = document
    .querySelector(".search-input")
    .value
    .toLowerCase();

  const filtered = posts.filter(post =>

    post.content.toLowerCase().includes(text) ||

    post.name.toLowerCase().includes(text)

  );

  renderPosts(filtered);

}
function sortPosts() {

  posts.sort((a, b) => b.likes - a.likes);  // Sort posts by likes in descending order
 
  renderPosts();

}

function schedulePost() {

  const input =
    document.querySelector(".post-input");

  const text = input.value.trim();

  if (text === "") {

    alert("Write something");

    return;

  }

  scheduledQueue.push(text);
  renderQueue();

  input.value = "";

}
function renderQueue() {

  const container =
    document.getElementById("scheduledPosts");

  container.innerHTML = "";

  scheduledQueue.forEach(post => {

    container.innerHTML += `

      <div class="scheduled-item">

        ${post}

      </div>

    `;

  });

}

document
  .querySelector(".search-input")
  .addEventListener("input", searchPosts);

document
  .querySelector(".post-btn")
  .addEventListener("click", addPost);

renderPosts();

function renderNetwork() {

  const container =
    document.getElementById("friendNetwork");

  container.innerHTML = "";

  network.forEach(user => {

    container.innerHTML += `

      <div class="trend">
        ${user} → Connected
      </div>

    `;

  });

}