export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  const picture = imageRow.querySelector('picture');
  if (picture) {
    imageRow.querySelector(':scope > div').classList.add('teaser-image');
  }

  const contentDiv = contentRow.querySelector(':scope > div');
  if (contentDiv) {
    contentDiv.classList.add('teaser-content');
  }
}
