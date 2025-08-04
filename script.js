async function fetchNews() {
  const ticker = document.getElementById("search").value.trim();
  if (!ticker) return;

  const apiKey = "eb10b7c8d87747f0a157d10b6c6e69dc"; // 🔁 Replace with your API key
  const url = `https://newsapi.org/v2/everything?q=${ticker}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById("newsContainer");
    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `<p class="text-center text-gray-500">No news found for "${ticker}".</p>`;
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "bg-white p-5 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1";
      card.innerHTML = `
        <h2 class="text-lg font-bold mb-2">${article.title}</h2>
        <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
          <span class="bg-gray-400 text-white text-xs px-2 py-1 rounded">Neutral</span>
        </div>
        <p class="text-gray-700 mb-3">${article.description || "No summary available."}</p>
        <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline font-medium">Read more →</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("newsContainer").innerHTML = `<p class="text-red-600">Error loading news. Check API key or connection.</p>`;
  }
}
