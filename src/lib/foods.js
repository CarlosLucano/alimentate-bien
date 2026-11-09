// Base de alimentos de ejemplo.
// Valores APROXIMADOS, pendientes de validar contra la Tabla Peruana de Composición de Alimentos (CENAN).
// servingG = gramos de una porción; kcal y protein son por esa porción.

export const FOODS = [
  {
    id: 'huevo',
    name: 'Huevo',
    aliases: ['huevo'],
    servingLabel: '1 unidad',
    servingG: 50,
    kcalPerServing: 72,
    proteinPerServing: 6.3,
  },
  {
    id: 'pan',
    name: 'Pan',
    aliases: ['pan'],
    servingLabel: '1 unidad',
    servingG: 60,
    kcalPerServing: 160,
    proteinPerServing: 5,
  },
  {
    id: 'palta',
    name: 'Palta',
    aliases: ['palta', 'aguacate'],
    servingLabel: '100 g',
    servingG: 100,
    kcalPerServing: 160,
    proteinPerServing: 2,
  },
  {
    id: 'pollo',
    name: 'Pollo (filete, cocido)',
    aliases: ['pollo', 'filete de pollo'],
    servingLabel: '100 g',
    servingG: 100,
    kcalPerServing: 165,
    proteinPerServing: 31,
  },
  {
    id: 'atun',
    name: 'Atún en agua (escurrido)',
    aliases: ['atun', 'atún'],
    servingLabel: '100 g',
    servingG: 100,
    kcalPerServing: 116,
    proteinPerServing: 26,
  },
  {
    id: 'arroz',
    name: 'Arroz cocido',
    aliases: ['arroz'],
    servingLabel: '100 g',
    servingG: 100,
    kcalPerServing: 130,
    proteinPerServing: 2.7,
  },
];
