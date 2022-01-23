export function getNextEpisode(id: string | undefined): string {
  const newId = id!.split('-');
  const newEpisode = Number(newId!.pop()) + 1;
  newId!.push(String(newEpisode));

  return newId.join('-');
}

export function getPreviousEpisode(id: string | undefined): string {
  const newId = id!.split('-');
  const newEpisode = Number(newId!.pop()) - 1;
  newId!.push(String(newEpisode));

  return newId.join('-');
}

export function getEpisodeNumber(id: string | undefined): number {
  const newId = id!.split('-');
  return Number(newId!.pop());
}

export function getAnimeLink(id: string | undefined): string {
  const newId = id!.split('-');
  newId!.pop();
  if (newId!.indexOf('episodio') > 0) {
    newId!.pop();
  }
  return newId.join('-');
}

const range = (from: number, to: number, step: number = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export function fetchPageNumbers(currentPage: number, numberOfPages: number) {
  const totalNumbers = 2 * 2 + 3;
  const totalBlocks = totalNumbers + 1;

  if (numberOfPages > totalBlocks) {
    let pages = [];

    const leftBound = currentPage - 1;
    const rightBound = currentPage + 1;
    const beforeLastPage = numberOfPages - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    const leftSpill = startPage > 2;
    const rightSpill = endPage < beforeLastPage;

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = ['DOTS', ...extraPages, ...pages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [...pages, ...extraPages, 'DOTS'];
    } else if (leftSpill && rightSpill) {
      pages = ['DOTS', ...pages, 'DOTS'];
    }

    return [1, ...pages, numberOfPages];
  }

  return range(1, numberOfPages);
}
