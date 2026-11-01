/* ---------- 1. Mobile Menu (Hamburger Icon) - on every page ---------- */

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
  // Toggle() exists to add the 'show' class if it is missing, or simply removes it if it present.
  // The existing CSS rules for the 'show' class will display the menu when it is present.
  // Close the mobile menu automatically when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
}

/* ---------- 2. Home Page Carousel - index.html only ---------- */

const carousel = document.getElementById('carousel');

if (carousel) {
  // Retrieves all the slides and dots associated with the carousel, as well as the previous and next buttons
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  // Initial slide, in this case the first slide (0)
  let currentSlide = 0;

  // Shows only the desired slide and dot, while hiding the others
  // This should have been declared beforehand. However, Index simply refers to the slide number that is to be displayed.
  function goToSlide(index) {
    // Wrap around so it loops
    // Without this, the carousel would simply stop at the first or last slide, and would prevent it from looping back.
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Guarantees that only the desired singular slide and dot are to be displayed, whilst hiding the others.
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    // Lights up the desired slide and dot
    // CSS helps to fade in the desired slide (.carousel-slide.active) 
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    // Remember the current slide index, which in turn will make navigation easier when the user clicks on the previous or next buttons.
    currentSlide = index;
  }

  // Arrow button clicks
  // Simply puts the current slide index to the previous or next slide, depending on which button is clicked. 
  // "Current - 1" means the previous slide, while "Current + 1" means the next slide.
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Dot clicks — Helps to jump straight to that slide
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      // Each respective dot in the HTML has a data-assinged attribute that shall correspond to the slide number.
      // Moreover, Number() is used to convert the value of the data-attribute to a legitimate number. Since, the existing value is a strong, and not a number. 
      const slideIndex = Number(dot.getAttribute('data-slide'));
      goToSlide(slideIndex);
    });
  });

  // Auto-advance to the next slide every 5 seconds
  // SetInterval() helps to repeat the existing fucntion over and over again, presently every 5 seconds. 
  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}


/* ---------- 3. Destination Search - asia/europe/oceania.html only ---------- */

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const noResultsMessage = document.getElementById('noResults');
const cards = document.querySelectorAll('.card');

// The search logic is case-insensitive, and it will hide all cards that do not match the search term. If no cards match, a "No results found" message will be displayed.
function searchDestinations() {

  // Reads the existing search term which the user has inputted.
  // The trim() is utilized to remove any leading or trailing whitespace from the search term.
  // This in turn helps search queries like "Japan" and "japan" to be treated as the same, and will return the same results.
  const searchTerm = searchInput.value.trim().toLowerCase();

  //  Helps to keep track of the number of matching cards, which will be used to determine whether to display the "No results found" message.
  let matchCount = 0;

  // Manual checking of every card.
  cards.forEach((card) => {
    const destinationName = card.querySelector('h3').textContent.toLowerCase();

    // Typing "ital" will still return "Italy" as a valid result, since the search term remains a substring of the destiniation name.
    if (destinationName.includes(searchTerm)) {
      card.style.display = 'block'; // Simply displays the card once it meets the search criteria. 
      matchCount++; // Increments the match count for each matching card.
    } else {
      card.style.display = 'none';  // Hides the card if it does not match the search term.
    }
  });

  // Display the "No results found" message if no material matches were found.
  if (noResultsMessage) {
    noResultsMessage.style.display = matchCount === 0 ? 'block' : 'none';
  }
}

// Search begins when the search button is clicked.
if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', searchDestinations);

  // Search may also begin when the user in question presses the "Enter" key while the related search input field is being occupied.
  // Once more, this is to ensure that the search functionality is more user-friendly and accessible for a wider range of users, as you may encounter users who prefer to use the keyboard for navigation, rather than solely relying on directive mouse clicks. 
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchDestinations();
    }
  });
}


/* ---------- 4. Inquiry Form - contact.html only ----------
   When the form is submitted, a subsequent "Thank You" message is displayed alongside the name of the person who has submitted the form.

   Since this is a merely front-end implementation, (Alongside the fact we do not have a backend server set up) the form submission does not actually send any legitimate data or emails. Instead, it will simply showcase a confirmation message to the user upon completion.
   
   */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {

  // Wait for the form to be submitted.
  // Browser must confirm that the form is valid before the submission event is triggered.
  contactForm.addEventListener('submit', (event) => {

    // Submitting the form will refresh the page, which will instantly remove the confirmation message.
    // To prevent this, preventDefault() has been utilized. Thus, preserving the page state as it is. 
    event.preventDefault(); // Prevent the default form submission

    // Simply put, this will retrieve the name associated with the form submission, which will be used to display the confirmation message.
    // The name is retrieved from the input field with the ID 'nameInput'.
    const name = document.getElementById('nameInput').value;

    // Confirmation Message alongside the name of the person who has submitted the form
    formMessage.textContent = `Thank you for your email, ${name}! We'll get back to you soon.`;

    // Clearing of the form fields after sucessful submission
    contactForm.reset();
  });
}


/* ---------- 5. Auto-Update Footer Year - on every page ---------- */

// This will automatically update the year in the footer to the current year, so that it remains up-to-date, completely eliminating the need for manual updates.
const yearSpan = document.getElementById('year');
if (yearSpan) {
  // Helps to retrieve the current year from the system's date and time, and then updates the text content of the element.
  // getFullYear() is perfect for this, as it returns the year in four digits (e.g., 2026).
  yearSpan.textContent = new Date().getFullYear();
}
