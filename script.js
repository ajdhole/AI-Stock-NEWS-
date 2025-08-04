async function fetchNews() {
  const ticker = document.getElementById("search").value;
  if (!ticker) return;

  const dummyNews = [
    {
      title: `AI-generated news for ${ticker}`,
      date: new Date().toLocaleDateString(),
      sentiment: "Bullish",
      summary: `Stock ${ticker} shows potential upward movement due to recent market trends and positive investor sentiment.`,
      url: "https://finance.yahoo.com"
    }
  ];

  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  dummyNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 shadow rounded";
    card.innerHTML = `
      <h2 class="text-xl font-bold">${article.title}</h2>
      <p class="text-sm text-gray-600">${article.date} • ${article.sentiment}</p>
      <p>${article.summary}</p>
      <a href="${article.url}" target="_blank" class="text-blue-600 mt-2 inline-block">Read more</a>
    `;
    container.appendChild(card);
  });
}
