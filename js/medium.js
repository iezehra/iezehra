const MEDIUM_USERNAME = "zehracetn52";

const MEDIUM_FEED =
    `https://medium.com/feed/@${MEDIUM_USERNAME}`;

const MEDIUM_API =
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED)}`;


async function loadMediumPosts() {

    const container =
        document.getElementById("medium-posts");

    if (!container) return;


    try {

        const response =
            await fetch(MEDIUM_API);

        if (!response.ok) {
            throw new Error("Medium verileri alınamadı.");
        }


        const data =
            await response.json();


        const posts =
            data.items.slice(0, 5);


        container.innerHTML = "";


        if (posts.length === 0) {

            container.innerHTML = `
                <p class="loading">
                    Henüz Medium yazısı bulunmuyor.
                </p>
            `;

            return;
        }


        posts.forEach((post, index) => {

            const article =
                document.createElement("a");

            article.href = post.link;

            article.target = "_blank";

            article.rel = "noopener noreferrer";

            article.className = "medium-card";


            const date =
                new Date(post.pubDate)
                    .toLocaleDateString(
                        "tr-TR",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    );


            article.innerHTML = `

                <span>
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <p class="medium-date">
                    ${date}
                </p>

                <h3>
                    ${post.title}
                </h3>

                <p class="medium-description">
                    ${cleanDescription(post.description)}
                </p>

                <strong>
                    Oku →
                </strong>

            `;


            container.appendChild(article);

        });


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="medium-error">

                <p>
                    Medium yazıları şu anda yüklenemiyor.
                </p>

                <a
                    href="https://medium.com/@zehracetn52"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Medium profilini ziyaret et →
                </a>

            </div>

        `;

    }

}


function cleanDescription(description) {

    const temp =
        document.createElement("div");

    temp.innerHTML = description;

    const text =
        temp.textContent || temp.innerText || "";

    return text.substring(0, 140) + "...";

}


document.addEventListener(
    "DOMContentLoaded",
    loadMediumPosts
);
