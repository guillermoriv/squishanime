export function getNextEpisode(id: string | undefined): string {
  const nextEpisode = Number(id![id!.length! - 1]) + 1;
  const newId = id!.split('-');
  newId![newId!.length - 1] = String(nextEpisode);

  return newId.join('-');
}

export function getPreviousEpisode(id: string | undefined): string {
  const nextEpisode = Number(id![id!.length! - 1]) - 1;
  const newId = id!.split('-');
  newId![newId!.length - 1] = String(nextEpisode);

  return newId.join('-');
}
