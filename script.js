function getSentimentBadge(sentiment) {
  let color = "bg-gray-400";
  if (sentiment === "Bullish") color = "bg-green-500";
  if (sentiment === "Bearish") color = "bg-red-500";
  if (sentiment === "Neutral") color = "bg-yellow-500";
  return `<span class="px-2 py-1 text-xs font-semibold text-white rounded ${color}">${sentiment}</span>`;
}

async function fetchNews() {
  const ticker = document.getElementById("search").value.trim();
  if (!ticker) return;

  // Dummy news data (replace with API call)
  const dummyNews = [
    {
      title: `AI-generated news for ${ticker}`,
      date: new Date().toLocaleDateString(),
      sentiment: "Bullish",
      summary: `Stock ${ticker} shows potential upward movement due to recent market trends and positive investor sentiment.`,
      url: "https://finance.yahoo.com"
    },
    {
      title: `Market reacts to ${ticker} quarterly results`,
      date: new Date().toLocaleDateString(),
      sentiment: "Neutral",
      summary: `${ticker} posted its Q2 results with mixed reactions from analysts.`,
      url: "https://moneycontrol.com"
    }
  ];

  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  dummyNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "bg-white p-5 shadow-md rounded-lg hover:shadow-lg transition transform hover:-translate-y-1";
    card.innerHTML = `
      <h2 class="text-lg font-bold mb-2">${article.title}</h2>
      <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span>${article.date}</span>
        ${getSentimentBadge(article.sentiment)}
      </div>
      <p class="text-gray-700 mb-3">${article.summary}</p>
      <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline font-medium">Read more →</a>
    `;
    container.appendChild(card);
  });
}
