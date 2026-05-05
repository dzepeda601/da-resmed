export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    // 2-row structure: row 1 = image, row 2 = content
    const imageRow = rows[0];
    const contentRow = rows[1];

    // Replace row wrappers with semantic divs
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('teaser-image');
    imageDiv.innerHTML = imageRow.querySelector(':scope > div')?.innerHTML || '';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('teaser-content');
    contentDiv.innerHTML = contentRow.querySelector(':scope > div')?.innerHTML || '';

    block.textContent = '';
    block.append(imageDiv);
    block.append(contentDiv);
  } else if (rows.length === 1) {
    // Single row with 2 cells: cell 1 = image, cell 2 = content
    const cells = [...rows[0].children];
    if (cells.length >= 2) {
      const hasImage = cells[0].querySelector('picture');
      if (hasImage) {
        cells[0].classList.add('teaser-image');
        cells[1].classList.add('teaser-content');
      }
    }
  }
}
