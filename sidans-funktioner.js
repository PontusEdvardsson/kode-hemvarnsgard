(function () {
  const innehall = window.sidansInnehall;

  const first = (selector) => document.querySelector(selector);
  const all = (selector) => Array.from(document.querySelectorAll(selector));

  const setText = (selector, value) => {
    if (value === undefined || value === null) {
      return;
    }

    all(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  const setAttribute = (selector, attribute, value) => {
    if (value === undefined || value === null) {
      return;
    }

    all(selector).forEach((element) => {
      element.setAttribute(attribute, value);
    });
  };

  const element = (tagName, className, text) => {
    const node = document.createElement(tagName);

    if (className) {
      node.className = className;
    }

    if (text !== undefined && text !== null) {
      node.textContent = text;
    }

    return node;
  };

  const renderKort = (selector, cards, cardClassName, includePrice) => {
    const container = first(selector);

    if (!container || !Array.isArray(cards)) {
      return;
    }

    container.replaceChildren(...cards.map((card) => {
      const article = element("article", cardClassName);
      article.append(element("h3", "", card.rubrik));

      if (includePrice) {
        article.append(element("p", "price", card.pris));
      }

      article.append(element("p", "", card.text));
      return article;
    }));
  };

  const renderSnabbfakta = () => {
    const container = first(".quick-facts");

    if (!container || !Array.isArray(innehall.snabbfakta)) {
      return;
    }

    container.replaceChildren(...innehall.snabbfakta.map((fakta) => {
      const article = element("article");
      article.append(element("span", "", fakta.stor_text));

      const paragraph = element("p");

      if (fakta.text_fore && fakta.fet_text) {
        paragraph.append(document.createTextNode(`${fakta.text_fore} `));
        paragraph.append(element("strong", "", fakta.fet_text));
      } else {
        paragraph.textContent = fakta.text || "";
      }

      article.append(paragraph);
      return article;
    }));
  };

  const renderGalleri = () => {
    const container = first(".gallery");

    if (!container || !Array.isArray(innehall.bilder?.lista)) {
      return;
    }

    container.replaceChildren(...innehall.bilder.lista.map((bild) => {
      const figure = element("figure");
      const image = element("img");
      image.src = bild.bild;
      image.alt = bild.bildtext || "";

      figure.append(image);
      figure.append(element("figcaption", "", bild.text));
      return figure;
    }));
  };

  const renderKontakt = () => {
    const container = first(".footer-grid");
    const kontakt = innehall.kontakt;

    if (!container || !kontakt) {
      return;
    }

    const footerCards = [
      {
        rubrik: "E-post",
        text: kontakt.epost,
        href: `mailto:${kontakt.epost}`
      },
      {
        rubrik: "Mobil",
        text: kontakt.telefon_text,
        href: `tel:${kontakt.telefon_lank}`
      },
      {
        rubrik: "Adress",
        text: kontakt.adress
      },
      {
        rubrik: "Org.nr",
        text: kontakt.organisationsnummer
      }
    ];

    container.replaceChildren(...footerCards.map((card) => {
      const wrapper = element("div");
      wrapper.append(element("h3", "", card.rubrik));

      const paragraph = element("p");

      if (card.href) {
        const link = element("a", "", card.text);
        link.href = card.href;
        paragraph.append(link);
      } else if (Array.isArray(card.text)) {
        paragraph.append(...card.text.flatMap((line, index) => {
          const nodes = [];

          if (index > 0) {
            nodes.push(document.createElement("br"));
          }

          nodes.push(document.createTextNode(line));
          return nodes;
        }));
      } else {
        paragraph.textContent = card.text;
      }

      wrapper.append(paragraph);
      return wrapper;
    }));
  };

  const updateContent = () => {
    if (!innehall) {
      return;
    }

    document.title = innehall.fliktitel || document.title;
    setAttribute('meta[name="description"]', "content", innehall.sokmotorbeskrivning);

    setText(".brand-mark", innehall.marke);
    setText(".brand span:last-child", innehall.namn);
    setAttribute(".brand", "aria-label", innehall.namn);

    setText(".hero .eyebrow", innehall.hero?.overtext);
    setText(".hero h1", innehall.hero?.rubrik);
    setText(".hero .lead", innehall.hero?.text);
    setAttribute(".hero", "aria-label", innehall.hero?.rubrik);
    setAttribute(".hero-image", "src", innehall.hero?.bild);
    setAttribute(".hero-image", "alt", innehall.hero?.bildtext);
    setText(".hero-actions .button-primary", innehall.hero?.primar_knapp);
    setText(".hero-actions .button-secondary", innehall.hero?.sekundar_knapp);

    renderSnabbfakta();

    setText("#lokalen .section-heading .eyebrow", innehall.lokalen?.overtext);
    setText("#lokalen .section-heading h2", innehall.lokalen?.rubrik);
    renderKort(".feature-grid", innehall.lokalen?.kort, "feature-card", false);

    setText("#priser .section-heading h2", innehall.priser?.rubrik);
    renderKort(".price-grid", innehall.priser?.kort, "price-card", true);
    renderKort(".notice-grid", innehall.priser?.notiser, "", false);

    setText("#bokning .eyebrow", innehall.bokning?.overtext);
    setText("#bokning h2", innehall.bokning?.rubrik);
    setText("#bokning .section-copy", innehall.bokning?.text);
    setText(".booking-card h3:nth-of-type(1)", innehall.bokning?.epost_rubrik);
    setText(".booking-card h3:nth-of-type(2)", innehall.bokning?.kontaktperson_rubrik);

    const bookingLinks = all(".booking-card a");
    if (bookingLinks[0] && innehall.kontakt?.epost) {
      bookingLinks[0].textContent = innehall.kontakt.epost;
      bookingLinks[0].href = `mailto:${innehall.kontakt.epost}`;
    }

    if (bookingLinks[1] && innehall.kontakt?.telefon_text) {
      bookingLinks[1].textContent = `${innehall.kontakt.kontaktperson}, ${innehall.kontakt.telefon_text}`;
      bookingLinks[1].href = `tel:${innehall.kontakt.telefon_lank}`;
    }

    setText("#bilder .section-heading .eyebrow", innehall.bilder?.overtext);
    setText("#bilder .section-heading h2", innehall.bilder?.rubrik);
    renderGalleri();

    setText(".site-footer > div:first-child .eyebrow", innehall.sidfot?.overtext);
    setText(".site-footer > div:first-child h2", innehall.sidfot?.rubrik);
    renderKontakt();
  };

  const setupMenu = () => {
    const header = first(".site-header");
    const button = first(".menu-toggle");
    const nav = first(".site-nav");

    if (!header || !button || !nav) {
      return;
    }

    const closeMenu = () => {
      header.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Öppna meny");
    };

    button.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Stäng meny" : "Öppna meny");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  };

  updateContent();
  setupMenu();
}());
