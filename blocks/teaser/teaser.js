export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length >= 2) {
    // 2-row structure: row 1 = image, row 2 = content
    const imageRow = rows[0];
    const contentRow = rows[1];

    const imageDiv = imageRow.querySelector(':scope > div');
    if (imageDiv) imageDiv.classList.add('teaser-image');

    const contentDiv = contentRow.querySelector(':scope > div');
    if (contentDiv) contentDiv.classList.add('teaser-content');
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
