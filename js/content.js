(function () {
  function localISODate(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function formatTodayHeading(d) {
    try {
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return localISODate(d);
    }
  }

  function setFacebookLinks(url) {
    document.querySelectorAll('a[data-link="facebook"]').forEach(function (a) {
      a.href = url;
    });
  }

  function applySite(site) {
    if (site.metaDescription) {
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", site.metaDescription);
    }

    setFacebookLinks(site.facebookUrl || "https://www.facebook.com/potsdamaquatics/");

    var visitLead = document.getElementById("visit-lead");
    if (visitLead && site.visitLead) visitLead.textContent = site.visitLead;

    var addr = document.getElementById("visit-address-body");
    if (addr && site.addressLines && site.addressLines.length) {
      addr.innerHTML = site.addressLines.map(escapeHtml).join("<br />");
    }

    var mapLink = document.querySelector('a[data-link="maps"]');
    if (mapLink && site.mapsUrl) mapLink.href = site.mapsUrl;

    var phoneA = document.querySelector('a[data-link="phone"]');
    if (phoneA) {
      if (site.phoneTel) phoneA.href = "tel:" + site.phoneTel.replace(/\s/g, "");
      if (site.phoneDisplay) phoneA.textContent = site.phoneDisplay;
    }

    var emailA = document.querySelector('a[data-link="email"]');
    if (emailA && site.email) {
      emailA.href = "mailto:" + site.email;
      emailA.textContent = site.email;
    }

    var fbText = document.querySelector('[data-link="facebook-text"]');
    if (fbText && site.facebookLabel) fbText.textContent = site.facebookLabel;

    var form = document.getElementById("wishlist-form");
    var formNote = document.getElementById("wishlist-config-note");
    var action = (site.wishlistFormAction || "").trim();
    if (form) {
      var submitBtn = form.querySelector(".wishlist-submit");
      if (action) {
        form.action = action;
        form.method = "POST";
        form.removeAttribute("data-disabled");
        if (submitBtn) submitBtn.disabled = false;
        if (formNote) formNote.hidden = true;
        var subj = form.querySelector('input[name="_subject"]');
        if (subj && site.wishlistSubject) subj.value = site.wishlistSubject;
        var next = form.querySelector('input[name="_next"]');
        if (site.wishlistNextUrl) {
          if (!next) {
            next = document.createElement("input");
            next.type = "hidden";
            next.name = "_next";
            form.appendChild(next);
          }
          next.value = site.wishlistNextUrl;
        } else if (next) {
          next.parentNode.removeChild(next);
        }
      } else {
        form.setAttribute("data-disabled", "true");
        if (submitBtn) submitBtn.disabled = true;
        if (formNote) formNote.hidden = false;
      }
      if (!form.dataset.guardBound) {
        form.dataset.guardBound = "1";
        form.addEventListener("submit", function (e) {
          if (form.getAttribute("data-disabled") === "true") e.preventDefault();
        });
      }
    }

    if (window.location.search.indexOf("thanks=1") !== -1) {
      var thanks = document.getElementById("wishlist-thanks");
      if (thanks) thanks.hidden = false;
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyAbout(about) {
    var title = document.getElementById("about-title");
    var intro = document.getElementById("about-intro");
    var ul = document.getElementById("about-bullets");
    var quote = document.getElementById("about-quote");
    var cite = document.getElementById("about-cite");
    if (title && about.title) title.textContent = about.title;
    if (intro && about.intro) intro.textContent = about.intro;
    if (ul && about.bullets && about.bullets.length) {
      ul.innerHTML = "";
      about.bullets.forEach(function (b) {
        var li = document.createElement("li");
        li.textContent = b;
        ul.appendChild(li);
      });
    }
    if (quote && about.quote) quote.textContent = "\u201c" + about.quote + "\u201d";
    if (cite && about.quoteAttribution) cite.textContent = "\u2014 " + about.quoteAttribution;
  }

  function applyGallery(g) {
    var h2 = document.getElementById("gallery-title");
    var p = document.getElementById("gallery-intro");
    var grid = document.getElementById("gallery-grid");
    if (h2 && g.title) h2.textContent = g.title;
    if (p && g.intro) p.textContent = g.intro;
    if (!grid || !g.items || !g.items.length) return;
    grid.innerHTML = "";
    g.items.forEach(function (item) {
      var fig = document.createElement("figure");
      fig.className = "gallery-item";
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || "";
      img.width = 900;
      img.height = 600;
      img.loading = "lazy";
      var cap = document.createElement("figcaption");
      cap.textContent = item.caption || "";
      fig.appendChild(img);
      fig.appendChild(cap);
      grid.appendChild(fig);
    });
  }

  function resolveTodayHours(hoursData) {
    var now = new Date();
    var iso = localISODate(now);
    var wd = String(now.getDay());
    var weekly = (hoursData.byWeekday && hoursData.byWeekday[wd]) || {
      label: "Today",
      hours: "See store",
    };
    var override = hoursData.dateOverrides && hoursData.dateOverrides[iso];
    var statusText;
    var note = "";
    if (override) {
      if (override.closed === true) {
        statusText = "Closed";
      } else if (override.hours) {
        statusText = override.hours;
      } else {
        statusText = weekly.hours;
      }
      note = override.note || "";
    } else {
      statusText = weekly.hours;
    }
    return {
      heading: formatTodayHeading(now),
      weekdayLabel: weekly.label,
      statusText: statusText,
      note: note,
      timezoneNote: hoursData.timezoneNote || "",
    };
  }

  function applyHours(hoursData) {
    var t = resolveTodayHours(hoursData);
    var dateEl = document.getElementById("today-hours-date");
    var statusEl = document.getElementById("today-hours-status");
    var noteEl = document.getElementById("today-hours-note");
    var tzEl = document.getElementById("today-hours-tz");
    if (dateEl) dateEl.textContent = t.heading;
    if (statusEl) statusEl.textContent = t.statusText;
    if (noteEl) {
      if (t.note) {
        noteEl.textContent = t.note;
        noteEl.hidden = false;
      } else {
        noteEl.textContent = "";
        noteEl.hidden = true;
      }
    }
    if (tzEl) {
      if (t.timezoneNote) {
        tzEl.textContent = t.timezoneNote;
        tzEl.hidden = false;
      } else {
        tzEl.hidden = true;
      }
    }

    var weekEl = document.getElementById("week-hours-body");
    if (!weekEl || !hoursData.byWeekday) return;
    weekEl.innerHTML = "";
    for (var i = 0; i < 7; i++) {
      var key = String(i);
      var row = hoursData.byWeekday[key];
      if (!row) continue;
      var dt = document.createElement("div");
      dt.className = "hours-week__day";
      dt.textContent = row.label;
      var dd = document.createElement("div");
      dd.className = "hours-week__time";
      dd.textContent = row.hours || "\u2014";
      weekEl.appendChild(dt);
      weekEl.appendChild(dd);
    }
  }

  function showLoadError() {
    var banner = document.getElementById("content-load-error");
    if (banner) banner.hidden = false;
  }

  Promise.all([
    fetch("data/site.json").then(function (r) {
      return r.json();
    }),
    fetch("data/hours.json").then(function (r) {
      return r.json();
    }),
    fetch("data/about.json").then(function (r) {
      return r.json();
    }),
    fetch("data/gallery.json").then(function (r) {
      return r.json();
    }),
  ])
    .then(function (results) {
      applySite(results[0]);
      applyHours(results[1]);
      applyAbout(results[2]);
      applyGallery(results[3]);
    })
    .catch(function () {
      showLoadError();
    });
})();
