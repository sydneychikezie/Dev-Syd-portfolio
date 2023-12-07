//  animation onload
window.onload = () => {
  setTimeout(() => {
    document.querySelector("body").classList.add("display");
  }, 3000);
};

let sections = document.querySelectorAll(".site-section");
let navLinks = document.querySelectorAll(".navigation");

window.addEventListener("scroll", function () {
  let top = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        sec.classList.add("slide-in");
        $(".navbar-toggle").removeClass("act");
        $(".main-menu").removeClass("act");
      });
    }
  });
});

let btnViewMore = document.querySelector(".section-blog .btn-box");
let btnViewLess = document.querySelector(".section-blog .btn-box.hidden");
let viewMore = document.querySelectorAll(".section-blog .view-more.hidden");

// display more blogs
btnViewMore.addEventListener("click", () => {
  for (let i = 0; i < viewMore.length; i++) {
    viewMore[i].classList.remove("hidden");
  }
  btnViewMore.classList.add("hidden");
  btnViewLess.classList.remove("hidden");
});

// display less blogs
btnViewLess.addEventListener("click", () => {
  for (let i = 0; i < viewMore.length; i++) {
    viewMore[i].classList.add("hidden");
  }
  btnViewMore.classList.remove("hidden");
  btnViewLess.classList.add("hidden");
});

$(function () {
  $(".navbar-toggle").click(function () {
    $(this).toggleClass("act");
    if ($(this).hasClass("act")) {
      $(".main-menu").addClass("act");
    } else {
      $(".main-menu").removeClass("act");
    }
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(document).on("click", ".page-scroll a", function (event) {
    let $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $("body").scrollspy({
    target: ".site-header",
    offset: 10,
  });

  /* Progress bar */
  let $section = $(".section-skills");
  function loadDaBars() {
    $(".progress .progress-bar").progressbar({
      transition_delay: 1000,
    });
  }

  $(document).bind("scroll", function (ev) {
    let scrollOffset = $(document).scrollTop();
    let containerOffset = $section.offset().top - window.innerHeight;
    if (scrollOffset > containerOffset) {
      loadDaBars();
      // unbind event not to load scroll again
      $(document).unbind("scroll");
    }
  });

  /* Counters  */

  if ($(".section-counters .start").length > 0) {
    var stat_items = $(".section-counters .start");

    $(window).scroll(function () {
      stat_items.each(function () {
        var stat_item = $(this),
          offset = stat_item.offset().top;

        if (
          $(window).scrollTop() > offset - 900 &&
          !stat_item.hasClass("counting")
        ) {
          stat_item.addClass("counting");
          stat_item.countTo();
        }
      });
    });
  }

  // another custom callback for counting to infinity
  $("#infinity").data("countToOptions", {
    onComplete: function (value) {
      count.call(this, {
        from: value,
        to: value + 1,
      });
    },
  });

  $("#infinity").each(count);

  function count(options) {
    let $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }

  // Navigation overlay
  let s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false,
    mobileDeceleration: 0.004,
    mobileCheck: function () {
      //hack - forces mobile version to be off
      return false;
    },
  });
});

// set footer date
let date = (document.querySelector(".date").textContent =
  new Date().getFullYear());

// promises for contact message
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwkU-qWfktmQeLQpR8gz4fdOtYu4cJlyOSW_JrIrKdBUqwS-qLkB0E_mX0gUsBK1OjQ/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      document.querySelector(".submit-msg").style.display = "block";
      setTimeout(() => {
        alert(
          "Thank you for contacting me. I look forward to the possibility of collaborating with you and making the web🌐 a more engaging and functional place🤝."
        );
        document.querySelector(".submit-msg").style.display = "";
      }, 4000);
      form.reset();
    })
    .catch((error) => {
      console.log("An error occured");
      setTimeout(() => {
        alert(
          "Thank you for contacting  me. I look forward to the possibility of collaborating with you and making the web🌐 a more engaging and functional place🤝."
        );
      }, 4000);
      form.reset();
    });
});
