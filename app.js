async function loadAnime() {

  const { data, error } =
    await supabaseClient
      .from("anime")
      .select("*")
      .order("created_at", {
        ascending: false
      });

  if (error) {
    console.error(error);

    document.getElementById("animeGrid").innerHTML =
      "<p>Could not load anime.</p>";

    return;
  }

  window.allAnime = data || [];

  renderAnime(window.allAnime);
}


function renderAnime(list) {

  const grid =
    document.getElementById("animeGrid");

  if (!list.length) {

    grid.innerHTML = `
      <div class="empty">
        No anime available.
      </div>
    `;

    return;
  }

  grid.innerHTML = list.map(anime => `

    <a
      class="anime-card"
      href="anime.html?id=${anime.id}"
    >

      <img
        src="${anime.poster_url || "https://placehold.co/300x430?text=Anime"}"
        alt="${escapeHTML(anime.title)}"
      >

      <div class="card-info">

        <h3>
          ${escapeHTML(anime.title)}
        </h3>

        <p>
          ${escapeHTML(anime.genre || "Anime")}
        </p>

      </div>

    </a>

  `).join("");
}


document
  .getElementById("search")
  .addEventListener("input", function () {

    const q =
      this.value
        .toLowerCase()
        .trim();

    const filtered =
      window.allAnime.filter(anime =>
        anime.title
          .toLowerCase()
          .includes(q)
      );

    renderAnime(filtered);
  });


function escapeHTML(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


loadAnime();
