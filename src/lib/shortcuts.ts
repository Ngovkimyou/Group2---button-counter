type ShortcutHandlers = {
  inc: () => void | Promise<void>;
  dec: () => void | Promise<void>;
  reset: () => void | Promise<void>;
  getCount?: () => number; // optional, for disabling dec at 0
  isLoading?: () => boolean; // optional
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function shortcuts(node: HTMLElement, handlers: ShortcutHandlers) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (handlers.isLoading?.()) return;
    if (isTypingTarget(e.target)) return;
    // incase we only want to trigger once
    // if (e.repeat) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.code === "Space") e.preventDefault();

    if (e.code === "Space" || e.code === "PageUp") {
      handlers.inc();
    } else if (e.code === "Backspace" || e.code === "PageDown") {
      const c = handlers.getCount?.() ?? 1;
      if (c > 0) handlers.dec();
    } else if (e.code === "Escape") {
      handlers.reset();
    }
  };

  window.addEventListener("keydown", onKeyDown);

  return {
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
    },
  };
}
