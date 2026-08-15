const params =
  new URLSearchParams(location.search);

const animeId =
  params.get("id");


async function loadAnime() {

  if (!animeId) {

    document.getElementById("animeDetails").innerHTML =
      "<h2>Anime not found.</h2>";

    return;
  }


  const { data: anime, error } =
    await supabaseClient
      .from("anime")
      .select("*")
      .eq("id", animeId)
      .single();


  if (error || !anime) {

    document.getElementById("animeDetails").innerHTML =
      "<h2>Anime not found.</h2>";

    return;
  }


  document.title = anime.title;


  const { data: episodes } =
    await supabaseClient
      .from("episodes")
      .select("*")
      .eq("anime_id", animeId)
      .order("episode_number");


  document.getElementById("animeDetails")
    .innerHTML = `

      <section class="anime-detail">

        <img
          class="detail-poster"
          src="${
            anime.poster_url ||
            "https://placehold.co/300x430?text=Anime"
          }"
        >

        <div class="detail-info">

          <h1>
            ${escapeHTML(anime.title)}
          </h1>

          <p class="genre">
            ${escapeHTML(anime.genre || "Anime")}
          </p>

          <p class="description">
            ${escapeHTML(anime.description || "")}
          </p>

        </div>

      </section>


      <section class="episodes">

        <h2>Episodes</h2>

        ${
          episodes?.length
          ? episodes.map((episode, index) => `

              <button
                class="episode"
                onclick="playEpisode(
                  '${episode.video_url}',
                  '${escapeHTML(
                    episode.title ||
                    "Episode " +
                    episode.episode_number
                  )}'
                )"
              >

                ▶ Episode
                ${episode.episode_number}

                ${
                  episode.title
                  ? " - " +
                    escapeHTML(episode.title)
                  : ""
                }

              </button>

            `).join("")
          :
          "<p>No episodes available.</p>"
        }

      </section>


      <section
        id="player"
        class="player"
      ></section>
    `;
}


function playEpisode(url, title) {

  const player =
    document.getElementById("player");

  player.innerHTML = `

    <h2>${title}</h2>

    <video
      controls
      autoplay
      playsinline
      class="video"
    >

      <source
        src="${url}"
      >

      Your browser does not support
      video playback.

    </video>

    <a
      class="download"
      href="${url}"
      download
      target="_blank"
    >
      ⬇ Download Episode
    </a>

  `;

  player.scrollIntoView({
    behavior: "smooth"
  });
}


function escapeHTML(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


loadAnime();
