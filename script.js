async function fetchNews() {
  const ticker = document.getElementById("search").value.trim();
  if (!ticker) return;

  const url = `https://newsapi.org/v2/everything?q=${ticker}&language=en&sortBy=publishedAt&pageSize=5&apiKey=eb10b7c8d87747f0a157d10b6c6e69dc`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById("newsContainer");
    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `<p class="text-gray-600">No news found for "${ticker}".</p>`;
      return;
    }

    for (const article of data.articles) {
      const sentiment = analyzeSentiment(article.title + " " + article.description);
      const summary = await fetchSummary(article.title + " " + article.description);

      const card = document.createElement("div");
      card.className = "bg-white p-5 rounded shadow hover:shadow-lg transition";
      card.innerHTML = `
        <h2 class="text-lg font-bold mb-2">${article.title}</h2>
        <p class="text-sm text-gray-600 mb-1">${new Date(article.publishedAt).toLocaleDateString()}</p>
        <span class="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium ${
          sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
          sentiment === 'Negative' ? 'bg-red-100 text-red-700' :
          'bg-gray-200 text-gray-800'
        }">${sentiment}</span>
        <p class="text-sm text-gray-700 mb-3"><strong>Summary:</strong> ${summary}</p>
        <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read more →</a>
      `;
      container.appendChild(card);
    }
  } catch (err) {
    console.error("News fetch error:", err);
  }
}

function analyzeSentiment(text) {
  const posWords = ['gain', 'rise', 'surge', 'positive', 'growth', 'profit'];
  const negWords = ['fall', 'drop', 'decline', 'negative', 'loss', 'fear'];
  let score = 0;

  text.toLowerCase().split(/\W+/).forEach(word => {
    if (posWords.includes(word)) score++;
    if (negWords.includes(word)) score--;
  });

  return score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral';
}

async function fetchSummary(text) {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbx-gjo8A86a0Jb4jo8u0psMaHMrvETRIMzablEIgle02JKEO22Mmu-Ey3PaKIfeBlll/exec', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.summary || 'No summary.';
  } catch (err) {
    return "Summary unavailable.";
  }
}
