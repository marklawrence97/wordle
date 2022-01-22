interface Countdown {
  hours: string;
  minutes: string;
  seconds: string;
}

export function getTimeUntilNextWord(): Countdown {
  // next word comes out at midnight

  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const distance = midnight.getTime() - now.getTime();

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  return { hours, minutes, seconds };
}
