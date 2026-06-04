export function splitLines(text: string): string[] {
  return text.split('\n');
}

export interface PriceBandLabelPart {
  text: string;
  className?: string;
}

export function formatPriceBandLabel(label: string): PriceBandLabelPart[] {
  const parts: PriceBandLabelPart[] = [];
  const regex = /(\d[\d,]+円|〜)/g;
  let lastIndex = 0;

  for (const match of label.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ text: label.slice(lastIndex, index) });
    }

    const value = match[0];
    if (value === '〜') {
      parts.push({ text: value, className: 'p-shop-by-price__band-tilde' });
    } else {
      const amount = value.slice(0, -1);
      parts.push({ text: amount, className: 'p-shop-by-price__band-num' });
      parts.push({ text: '円', className: 'p-shop-by-price__band-yen' });
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < label.length) {
    parts.push({ text: label.slice(lastIndex) });
  }

  return parts;
}
