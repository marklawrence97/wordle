function getPsuedoRandomNumber(seed: number): number {
  /*
        Psuedo random number based on seed
        Taken from: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
    */

  let t: number = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function pickRandomElement(words: string[]): string {
  // Psuedo random element selected based on a seed derived from the day and the year, so everyone has the same word each day.

  const today = new Date();
  const day = today.getDate();
  const year = today.getFullYear();

  const seed = parseInt(`${day}${year}`);

  const randomNumber = getPsuedoRandomNumber(seed);

  const index = Math.floor(randomNumber * (words.length - 1));

  return words[index];
}
