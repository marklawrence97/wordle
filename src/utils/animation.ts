export function fadeOut(id: string, increment: number, speed: number) {
  const fade = () => {
    const element = document.getElementById(id);
    let opacity = 1;

    const interval = setInterval(() => {
      if (opacity <= 0) {
        clearInterval(interval);
      }

      element.style.opacity = `${opacity - increment}`;
      opacity -= increment;
    }, speed);
  };

  setTimeout(() => {
    fade();
  }, 1000);
}
