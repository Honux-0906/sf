(function () {
  const header = () => {
    const header = document.querySelector(".shopify-section-header");
    const menu = document.querySelector(".list-menu--inline");
    const menuLinks = document.querySelectorAll(".list-menu-item");
    const search = document.querySelector("details-modal.header__search");
    const searchModal = document.querySelector("details-modal.header__search > details");
    const allSubmenu = document.querySelectorAll(".header__submenu");

    header.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && search.isOpen) {
        search.close();
      }
    });

    const annBar = document.querySelector(".section-announcement");
    const annBarObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        document.documentElement.style.setProperty("--ann-height", `${entry.boundingClientRect.height}px`);
      } else {
        document.documentElement.style.setProperty("--ann-height", `0px`);
      }
    });

    if (annBar) {
      annBarObserver.observe(annBar);
    } else {
      document.documentElement.style.setProperty("--ann-height", `0px`);
    }

    menuLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        if (link.classList.contains("list-menu--megamenu")) {
          link.classList.add("list-menu--megamenu-visible");

          menuLinks.forEach((el) => {
            el.classList.add("list-menu-item--inactive");
            el.classList.remove("list-menu-item--active");
            if (el !== link) {
              el.classList.remove("list-menu--megamenu-visible");
            }
          });
          link.classList.remove("list-menu-item--inactive");
          link.classList.add("list-menu-item--active");
        } else {
          menuLinks.forEach((el) => {
            el.classList.add("list-menu-item--inactive");
            el.classList.remove("list-menu-item--active");
            el.classList.remove("list-menu--megamenu-visible");
          });
          link.classList.remove("list-menu-item--inactive");
          link.classList.add("list-menu-item--active");
        }
      });
    });

    allSubmenu.forEach((submenu) => {
      const links = submenu.querySelectorAll(".header__submenu-item:not(.header__submenu-item--grandchild)");

      links.forEach((link) => {
        const childLinks = link.parentElement.querySelectorAll(".header__submenu-item--grandchild");

        link.addEventListener("mouseenter", (e) => {
          links.forEach((el) => {
            el.classList.add("header__submenu-item--inactive");
          });
          link.classList.remove("header__submenu-item--inactive");
        });

        childLinks.forEach((childLink) => {
          childLink.addEventListener("mouseenter", (e) => {
            childLinks.forEach((el) => {
              el.classList.add("header__submenu-item--inactive");
            });
            childLink.classList.remove("header__submenu-item--inactive");
          });
        });

        link.addEventListener("mouseleave", (e) => {
          childLinks.forEach((el) => {
            el.classList.remove("header__submenu-item--inactive");
          });
        });
      });

      submenu.addEventListener("mouseleave", (e) => {
        links.forEach((el) => {
          el.classList.remove("header__submenu-item--inactive");
        });
      });
    });

    menu?.addEventListener("mouseleave", (e) => {
      menuLinks.forEach((link) => {
        link.classList.remove("list-menu-item--inactive");
        link.classList.remove("list-menu-item--active");
        link.classList.remove("list-menu--megamenu-visible");
      });

      document.querySelectorAll(".header__submenu-item").forEach((link) => {
        link.classList.remove("header__submenu-item--inactive");
      })
    });

    if (header && header.classList.contains("color-background-overlay")) {
      header.addEventListener("mouseenter", () => {
        header.classList.remove("color-background-overlay");
        header.classList.add("color-background-overlay-hidden");
      });

      header.addEventListener("mouseleave", () => {
        if (!searchModal.hasAttribute("open")) {
          header.classList.add("color-background-overlay");
          header.classList.remove("color-background-overlay-hidden");
        }
      });
    }
  };

  document.addEventListener("shopify:section:load", header);
  document.addEventListener("shopify:section:unload", header);
  document.addEventListener("shopify:section:reorder", header);

  header();
})();
