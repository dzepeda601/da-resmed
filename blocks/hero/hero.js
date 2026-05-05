export default function decorate(block) {
  // Collect elements before modifying DOM
  const picture = block.querySelector('picture');
  const headings = [...block.querySelectorAll('h1, h2, h3')];
  const textParagraphs = [...block.querySelectorAll('p')].filter(
    (p) => !p.querySelector('picture') && p.textContent.trim(),
  );
  const buttonContainers = [...block.querySelectorAll('.button-container')];

  // Detach collected elements from DOM before clearing
  if (picture) picture.remove();
  headings.forEach((h) => h.remove());
  textParagraphs.forEach((p) => p.remove());
  buttonContainers.forEach((btn) => btn.remove());

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
  buttonContainers.forEach((btn) => contentDiv.append(btn));
  block.append(contentDiv);
}
