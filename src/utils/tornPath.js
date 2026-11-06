/**
 * Hand-written irregular y-values (48 points each) representing authentic torn paper edges.
 * viewBox is 0 0 1440 60.
 */
export const VARIANT_Y_VALUES = {
  1: [
    12, 18, 14, 25, 20, 28, 22, 16, 24, 32, 26, 18, 30, 36, 28, 22,
    34, 40, 32, 24, 38, 42, 30, 20, 26, 35, 29, 21, 33, 38, 27, 19,
    28, 36, 31, 23, 34, 44, 32, 22, 29, 37, 26, 17, 24, 31, 20, 14
  ],
  2: [
    34, 28, 38, 24, 18, 32, 40, 29, 21, 35, 45, 33, 22, 38, 48, 35,
    26, 42, 50, 38, 25, 33, 44, 31, 20, 36, 46, 32, 19, 28, 39, 27,
    18, 34, 47, 36, 23, 39, 49, 37, 25, 31, 42, 30, 21, 33, 25, 32
  ],
  3: [
    20, 26, 19, 35, 28, 18, 31, 43, 34, 22, 39, 48, 36, 25, 30, 42,
    33, 21, 27, 38, 46, 32, 19, 34, 44, 30, 17, 29, 41, 33, 22, 36,
    47, 35, 24, 32, 45, 36, 23, 28, 40, 31, 19, 33, 42, 29, 22, 18
  ],
};

export function buildTornPath(variant = 1, isTop = false, width = 1440, height = 60) {
  const points = VARIANT_Y_VALUES[variant] || VARIANT_Y_VALUES[1];
  const step = width / (points.length - 1);
  
  let d = '';
  if (isTop) {
    // If torn top: path fills from y=0 down to the jagged line and closes at top
    d = `M 0 0 L 1440 0 L 1440 ${points[points.length - 1]} `;
    for (let i = points.length - 2; i >= 0; i--) {
      const x = Math.round(i * step);
      const y = points[i];
      d += `L ${x} ${y} `;
    }
    d += 'Z';
  } else {
    // If torn bottom: path fills from jagged line down to y=60
    d = `M 0 ${points[0]} `;
    for (let i = 1; i < points.length; i++) {
      const x = Math.round(i * step);
      const y = points[i];
      d += `L ${x} ${y} `;
    }
    d += `L 1440 ${height} L 0 ${height} Z`;
  }
  return d;
}

export function buildShadowPath(variant = 1, isTop = false, width = 1440, height = 60) {
  // For top edge (paper on top): shadow extends downwards (+4px)
  // For bottom edge (paper on bottom): shadow extends upwards (-4px)
  const points = (VARIANT_Y_VALUES[variant] || VARIANT_Y_VALUES[1]).map(y => {
    return isTop ? Math.min(height, y + 4) : Math.max(0, y - 4);
  });
  const step = width / (points.length - 1);

  let d = '';
  if (isTop) {
    d = `M 0 0 L 1440 0 L 1440 ${points[points.length - 1]} `;
    for (let i = points.length - 2; i >= 0; i--) {
      const x = Math.round(i * step);
      const y = points[i];
      d += `L ${x} ${y} `;
    }
    d += 'Z';
  } else {
    d = `M 0 ${points[0]} `;
    for (let i = 1; i < points.length; i++) {
      const x = Math.round(i * step);
      const y = points[i];
      d += `L ${x} ${y} `;
    }
    d += `L 1440 ${height} L 0 ${height} Z`;
  }
  return d;
}
