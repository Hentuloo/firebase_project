export type ShortcutRegistry = ShortcutRegistryEntry[];

export interface ShortcutRegistryEntry {
  sequence: string[];
  callback: Function;
}

export function areSequencesEqual<T>(
  master: T[],
  other: T[],
  compare = (a: T, b: T) => a === b,
) {
  return master.every((key, i) => {
    return other[i] ? compare(key, other[i]) : false;
  });
}

/** Helper to find a callback to the corresponding shortcut */
export function match(
  shortcutRegistry: ShortcutRegistry,
  buffer: KeyboardEvent[],
) {
  buffer.map(e => e.key);
  const candidate = shortcutRegistry.find(entry =>
    areSequencesEqual(
      entry.sequence,
      buffer.map(i => i.key),
    ),
  );

  return candidate ? candidate.callback : null;
}
