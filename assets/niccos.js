document.addEventListener('DOMContentLoaded', function () {
  function initializeVariantSliders() {
    document.querySelectorAll('.cust-variant-slider-container').forEach(container => {
      if (container.dataset.sliderInitialized) return; // Prevent re-initializing sliders

      const swatchesContainer = container.querySelector('.cust-variant-swatches');
      const prevButton = container.querySelector('.cust-slider-prev');
      const nextButton = container.querySelector('.cust-slider-next');

      let scrollAmount = 0;
      const scrollStep = 120; // Adjust step as needed

      prevButton.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0;
        swatchesContainer.style.transform = `translateX(-${scrollAmount}px)`;
        updateButtons();
      });

      nextButton.addEventListener('click', () => {
        const maxScroll = swatchesContainer.scrollWidth - swatchesContainer.clientWidth;
        scrollAmount += scrollStep;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        swatchesContainer.style.transform = `translateX(-${scrollAmount}px)`;
        updateButtons();
      });

      function updateButtons() {
        const maxScroll = swatchesContainer.scrollWidth - swatchesContainer.clientWidth;
        prevButton.disabled = scrollAmount <= 0;
        nextButton.disabled = scrollAmount >= maxScroll;
      }

      updateButtons();
      container.dataset.sliderInitialized = "true"; // Mark container as initialized
    });
  }

  initializeVariantSliders(); // Run initially for existing sliders

  // Observe the product grid for dynamically added product cards
  const observer = new MutationObserver(() => {
    initializeVariantSliders(); // Re-initialize sliders when new products are added
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
