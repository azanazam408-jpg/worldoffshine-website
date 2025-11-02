document.addEventListener("DOMContentLoaded", () => {
    // Modal open/close logic (will be unused but is harmless)
    document.querySelectorAll("[data-modal-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.modalTarget);
        if (modal) modal.classList.add("active");
      });
    });

    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".modal-overlay").classList.remove("active");
      });
    });

    // Mobile nav toggle
    const mobileNavToggle = document.getElementById("mobileNavToggle");
    const headerNav = document.getElementById("headerNav");

    if(mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            headerNav.classList.toggle("active");
          });
    }


    // WhatsApp booking function (will be unused but is harmless)
    window.sendToWhatsApp = function(event) {
      event.preventDefault();

      const name = document.getElementById("bookName").value.trim();
      const phone = document.getElementById("bookPhone").value.trim();
      const service = document.getElementById("bookService").value;
      const date = document.getElementById("bookDate").value;
      const notes = document.getElementById("bookNotes").value.trim();

      if (!name || !phone || !service || !date) {
        alert("Please fill in all required fields.");
        return;
      }

      const message = `ｧｹ *New Booking Request*%0A
側 *Name:* ${encodeURIComponent(name)}%0A
到 *Phone:* ${encodeURIComponent(phone)}%0A
ｧｼ *Service:* ${encodeURIComponent(service)}%0A
套 *Date:* ${encodeURIComponent(date)}%0A
桃 *Address & Notes:* ${encodeURIComponent(notes)}`;

      const whatsappNumber = "971568260687"; // Your WhatsApp number here
      const url = `https://wa.me/${whatsappNumber}?text=${message}`;

      window.open(url, "_blank");

      // Close booking modal after sending
      document.getElementById("bookingModal").classList.remove("active");
    }

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if(themeToggle) {
        themeToggle.addEventListener('change', function() {
            if(this.checked) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    }

    // =============================================
    // === NEW "SHOW MORE/LESS" SCRIPT START ===
    // =============================================

    const lineLimit = 4;
    const collapsedHeight = "105px"; // Must match your CSS .collapsed max-height
    const approxLineHeight = 105; 
    
    // Store all collapsible cards to manage them
    const allCollapsibleCards = [];

    document.querySelectorAll('.service-card').forEach(card => {
        const contentWrapper = card.querySelector('.card-content');
        if (!contentWrapper) return;

        let needsButton = false;

        // Check for list content
        const list = contentWrapper.querySelector('ul');
        if (list) {
            const items = list.querySelectorAll(':scope > li');
            if (items.length > lineLimit) {
                needsButton = true;
            }
        } 
        // Check for text content
        else {
            const text = contentWrapper.querySelector('p');
            // Check if text's scrollHeight is greater than the collapsed pixel height
            if (text && text.scrollHeight > approxLineHeight) {
                needsButton = true;
            }
        }

        if (needsButton) {
            // 1. Set initial collapsed state
            contentWrapper.classList.add('collapsed');
            contentWrapper.style.maxHeight = collapsedHeight; // Set initial height

            // 2. Create and add the button
            const button = document.createElement('button');
            button.className = 'toggle-content-btn';
            button.textContent = 'Show More';
            card.appendChild(button);

            // 3. Store this card's elements
            allCollapsibleCards.push({ wrapper: contentWrapper, btn: button });

            // 4. Add click event listener
            button.addEventListener('click', () => {
                const isCollapsed = contentWrapper.classList.contains('collapsed');

                // --- This is the new "one at a time" logic ---
                // First, close all other cards
                allCollapsibleCards.forEach(item => {
                    if (item.wrapper !== contentWrapper) { // Don't close the one we just clicked
                        item.wrapper.classList.add('collapsed');
                        item.wrapper.style.maxHeight = collapsedHeight;
                        item.btn.textContent = 'Show More';
                    }
                });
                // --- End of new logic ---

                // Now, toggle the card that was clicked
                if (isCollapsed) {
                    // Open it
                    contentWrapper.classList.remove('collapsed');
                    // Set max-height to its full scrollable height
                    contentWrapper.style.maxHeight = contentWrapper.scrollHeight + "px";
                    button.textContent = 'Show Less';
                } else {
                    // Close it
                    contentWrapper.classList.add('collapsed');
                    contentWrapper.style.maxHeight = collapsedHeight;
                    button.textContent = 'Show More';
                }
            });
        }
    });
    // Animated Counters
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounters() {
  if (!countersStarted) {
    counters.forEach(counter => {
      counter.innerText = '0';
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 18);
        } else {
          counter.innerText = target;
        }
      }
      updateCounter();
    });
    countersStarted = true;
  }
}

window.addEventListener('scroll', () => {
  const countersSection = document.querySelector('.counters-section');
  if (countersSection) {
    const sectionTop = countersSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      animateCounters();
    }
  }
});
// Blog/News Slider
let newsSlides = document.querySelectorAll('.news-slide');
let currentNews = 0;

function showNewsSlide(n) {
  newsSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
}

function nextNewsSlide() {
  currentNews = (currentNews + 1) % newsSlides.length;
  showNewsSlide(currentNews);
}

setInterval(nextNewsSlide, 3500); // Change slide every 3.5 seconds

// Start with first slide
showNewsSlide(currentNews);


    // =============================================
    // === NEW "SHOW MORE/LESS" SCRIPT END ===
    // =============================================
});