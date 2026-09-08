"use client";

import { useEffect } from "react";
import styles from "./UndoToast.module.css";

// How long the visitor has to hit "Cancel" before a removal is final.
// Exported so anything rendering the shrinking progress bar can size its
// CSS animation to match exactly.
export const UNDO_DURATION_MS = 7000;

// A small "Removed X — Cancel" toast with a progress bar that visibly
// counts down the undo window. Give it a fresh `key` from the parent each
// time a new removal happens (see app/cart/page.js) so the timer and the
// progress-bar animation both restart cleanly instead of jumping.
export default function UndoToast({ message, onUndo, onExpire }) {
  useEffect(() => {
    const id = setTimeout(onExpire, UNDO_DURATION_MS);
    return () => clearTimeout(id);
  }, [onExpire]);

  return (
    <div className={styles.toast} role="status">
      <div className={styles.row}>
        <span>{message}</span>
        <button type="button" className={styles.undoBtn} onClick={onUndo}>
          Cancel
        </button>
      </div>
      <div className={styles.track}>
        <div className={styles.bar} style={{ animationDuration: `${UNDO_DURATION_MS}ms` }} />
      </div>
    </div>
  );
}
