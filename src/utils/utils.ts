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
