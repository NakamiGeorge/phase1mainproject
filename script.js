
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const results = document.getElementById("results");
    const jsonData = "http://localhost:3000/Radio-stations";

    fetchAndDisplayData();

    searchButton.addEventListener("click", fetchAndDisplayData);

    function fetchAndDisplayData() {
        const searchTerm = searchInput.value.toLowerCase();
        results.innerHTML = "";

        fetch('http://localhost:3000/Radio-stations')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    if (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) {
                        const resultItem = document.createElement("div");
                        resultItem.innerHTML = `
                            <h2>${item.name}</h2>
                            <p>${item.frequency}</p>
                            <p>${item.image}</p>
                            <p>${item.description}</p>
                            
                            <button class="likeButton">like (${item.likes})</button>
                            <button class="dislikeButton">dislike (${item.dislikes})</button>
                            <button class="voteButton">vote (${item.votes})</button>
                        `;
                        results.appendChild(resultItem);

                        const likeButton = resultItem.querySelector(".likeButton");
                        likeButton.addEventListener("click", () => {
                            item.likes++;
                            likeButton.textContent = `Like (${item.likes})`;
                        });
                        const dislikeButton = resultItem.querySelector(".dislikeButton");
                        dislikeButton.addEventListener("click", () => {
                            item.dislikes++;
                            dislikeButton.textContent = `dislike (${item.dislikes})`;
                        });


                        const voteButton = resultItem.querySelector(".voteButton");
                        voteButton.addEventListener("click", () => {
                            item.votes++;
                            voteButton.textContent = `Vote (${item.votes})`;
                        });
                    }
                });
            });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("comment-form");
    const commentsContainer = document.getElementById("comments");

    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const commentInput = document.getElementById("comment");

        const name = nameInput.value;
        const comment = commentInput.value;

        if (name && comment) {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `<strong>${name}:</strong> ${comment}`;

            commentsContainer.appendChild(commentElement);

            // Clear the form inputs
            nameInput.value = "";
            commentInput.value = "";
        }
    });
});
document.getElementById('loaddata').addEventListener('click', function () {
    // Simulate loading data from a JSON source
    // Replace this with your actual API endpoint
    fetch('http://localhost:3000/Radio-stations')
        .then(response => response.json())
        .then(data => {
            // Data has been successfully loaded
            const likes = data.likes;
            const dislike = data.dislike;
            const votes = data.votes;

            // Now you can use this data in your code, for example, display it on the page
            document.getElementById('likes').textContent = likes;
            document.getElementById('dislike').textContent = dislike;
            document.getElementById('votes').textContent = votes;
        })
        .catch(error => {
            // Handle any errors that occurred during data loading
            console.error('An error occurred:', error);
        });
});

function updateData(data) {
    const likesElement = document.getElementById('likes');
    const dislikesElement = document.getElementById('dislikes');
    const votesElement = document.getElementById('votes');
    const commentsElement = document.getElementById('comments');
    

    likesElement.innerHTML = `likes: ${data.likes}`;
    dlikesElement.innerHTML = `disikes: ${data.likes}`;
    votesElement.innerHTML = `votes: ${data.votes}`;
    commentsElement.innerHTML = `comments: ${data.comments}`;
}