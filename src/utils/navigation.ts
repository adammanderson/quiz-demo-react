export function computeBounds(index: number, total: number) {
  return {
    isFirst: index === 0,
    isLast: total > 0 ? index === total - 1 : true,
  };
}
