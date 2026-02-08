/**
 * Creates a confetti effect with colored dots falling from the top
 */
export function createConfetti() {
  // Colors matching the design system
  const colors = [
    "#93c5fd", // accent
    "#60a5fa", // accent-hover
    "#4480c4", // edit
    "#3384df", // edit-border
    "#dc2626", // delete
    "#090c26", // primary-darker
    "#050f20", // text-primary
    "#374151", // text-secondary
    "#f9fafb", // bg-item
    "#e5e7eb", // bg-button-hover
  ];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    // Add horizontal drift using CSS variable
    const drift = (Math.random() - 0.5) * 2; // -1 to 1
    confetti.style.setProperty("--drift", drift);
    document.body.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

