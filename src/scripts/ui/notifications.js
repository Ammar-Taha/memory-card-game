import { Notyf } from "notyf";
import "notyf/notyf.min.css";

/**
 * Initialize toast notification library
 */
export const notyf = new Notyf({
  duration: 4000,
  position: {
    x: "center",
    y: "top",
  },
  dismissible: true,
  types: [
    {
      type: "warning",
      background: "#f59e0b",
      icon: false,
    },
  ],
});

