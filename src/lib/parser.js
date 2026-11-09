// Convierte texto libre de una comida en items con kcal y proteína.
// Ejemplo: "2 huevos y 1 pan con palta" -> 3 items.
// Limitación conocida: platos compuestos (p. ej. "arroz con pollo") se separan en ingredientes.

import { FOODS } from './foods.js';

const SPLIT = /\s*(?:,| y | con |\+)\s*/i;

const WORD_QTY = {
  un: 1, una: 1, uno: 1, dos: 2, tres: 3,
  medio: 0.5, media: 0.5, poco: 0.5, mucho: 1.5,
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function matchFood(part) {
  let best = null;
  let bestLen = 0;
  for (const food of FOODS) {
    for (const alias of food.aliases) {
      // Acepta plural simple: "huevo" -> "huevos", "palta" -> "paltas".
      const re = new RegExp(`\\b${escapeRegex(alias)}(?:s|es)?\\b`, 'i');
      if (re.test(part) && alias.length > bestLen) {
        best = food;
        bestLen = alias.length;
      }
    }
  }
  return best;
}

function parseQuantity(part) {
  const numMatch = part.match(/(\d+(?:[.,]\d+)?)\s*(g|gr|gramos)?\b/i);
  if (numMatch) {
    return {
      value: parseFloat(numMatch[1].replace(',', '.')),
      unit: numMatch[2] ? 'g' : 'unit',
    };
  }
  for (const [word, value] of Object.entries(WORD_QTY)) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(part)) {
      return { value, unit: 'unit' };
    }
  }
  return { value: 1, unit: 'unit' };
}

export function parseMeal(text) {
  return String(text)
    .split(SPLIT)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parsePart);
}

function parsePart(part) {
  const food = matchFood(part);
  if (!food) {
    return { raw: part, matched: false, food: null, kcal: 0, protein: 0 };
  }
  const qty = parseQuantity(part);
  const factor = qty.unit === 'g' ? qty.value / food.servingG : qty.value;

  return {
    raw: part,
    matched: true,
    food: food.id,
    name: food.name,
    kcal: Math.round(food.kcalPerServing * factor),
    protein: Math.round(food.proteinPerServing * factor * 10) / 10,
  };
}

export function summarize(items) {
  return items.reduce(
    (acc, it) => ({
      kcal: acc.kcal + it.kcal,
      protein: Math.round((acc.protein + it.protein) * 10) / 10,
    }),
    { kcal: 0, protein: 0 }
  );
}
