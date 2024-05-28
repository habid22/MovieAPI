document.getElementById('movieForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const movieTitle = document.getElementById('movie_title').value;
    const rating = document.getElementById('rating').value;
  
    const response = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, movie_title: movieTitle, rating })
    });
    const result = await response.json();
    alert('Form submitted with ID: ' + result.id);
    loadResponses();
  });
  
  async function loadResponses() {
    const response = await fetch('/api/form');
    const responses = await response.json();
    const responsesDiv = document.getElementById('responses');
    responsesDiv.innerHTML = '<h2>Form Responses</h2>';
    responses.forEach(response => {
      responsesDiv.innerHTML += `
        <div class="response-card">
          <p class="details">Name: ${response.name}, Movie Title: ${response.movie_title}, Rating: ${response.rating}</p>
          <h3>${response.movie_title} (${response.movie_year})</h3>
          <p>${response.movie_plot}</p>
          <img src="${response.movie_poster}" alt="Poster of ${response.movie_title}">
        </div>
      `;
    });
  }
  
  loadResponses();
  