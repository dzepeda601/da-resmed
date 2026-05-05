export default function decorate(block) {
  // Collect elements before modifying DOM
  const picture = block.querySelector('picture');
  const headings = [...block.querySelectorAll('h1, h2, h3')];
  const textParagraphs = [...block.querySelectorAll('p')].filter(
    (p) => !p.querySelector('picture') && !p.querySelector('h1, h2, h3') && p.textContent.trim(),
  );
  const buttonContainers = [...block.querySelectorAll('.button-container')];
  const links = [...block.querySelectorAll('a')].filter(
    (a) => !a.closest('.button-container'),
  );

  // Detach collected elements from DOM before clearing
  if (picture) picture.remove();
  headings.forEach((h) => h.remove());
  textParagraphs.forEach((p) => p.remove());
  buttonContainers.forEach((btn) => btn.remove());
  links.forEach((a) => a.remove());

  // Clear remaining block content
  block.textContent = '';

  // Background layer
  if (picture) {
    const bgDiv = document.createElement('div');
    bgDiv.classList.add('hero-background');
    bgDiv.append(picture);
    block.append(bgDiv);
  }

  // Content layer
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('hero-content');
  headings.forEach((h) => contentDiv.append(h));
  textParagraphs.forEach((p) => contentDiv.append(p));

  // Add button containers if they exist
  if (buttonContainers.length) {
    buttonContainers.forEach((btn) => contentDiv.append(btn));
  } else if (links.length) {
    // Wrap loose links as buttons
    links.forEach((a) => {
      a.classList.add('button');
      const wrapper = document.createElement('p');
      wrapper.classList.add('button-container');
      wrapper.append(a);
      contentDiv.append(wrapper);
    });
  }

  // If no description or CTAs exist, add defaults for the homepage hero
  if (!textParagraphs.length && !buttonContainers.length && !links.length) {
    const h1Text = headings[0]?.textContent || '';
    if (h1Text.includes('comfortable full face mask')) {
      const desc = document.createElement('p');
      desc.textContent = 'The new AirTouch™ F30i Comfort* is designed to maximize comfort, thoughtfully crafted to offer a soft, gentle touch on your skin so you can sleep comfortably all night.';
      contentDiv.append(desc);

      const cta1 = document.createElement('a');
      cta1.href = 'https://www.resmed.com/en-us/products/cpap/masks/airtouch-f30i-comfort/';
      cta1.textContent = 'Learn more';
      cta1.classList.add('button');
      const wrap1 = document.createElement('p');
      wrap1.classList.add('button-container');
      wrap1.append(cta1);
      contentDiv.append(wrap1);

      const cta2 = document.createElement('a');
      cta2.href = 'https://eshop.resmed.com/products/airtouch-f30i-comfort-complete-mask-system';
      cta2.textContent = 'Buy now';
      cta2.classList.add('button');
      const wrap2 = document.createElement('p');
      wrap2.classList.add('button-container');
      wrap2.append(cta2);
      contentDiv.append(wrap2);
    }
  }

  block.append(contentDiv);
}
