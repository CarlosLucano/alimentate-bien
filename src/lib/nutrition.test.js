import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcBMI, calcBMR, calcTargets, checkGoalSafety } from './nutrition.js';
import { parseMeal, summarize } from './parser.js';

test('IMC: 74 kg y 160 cm', () => {
  assert.equal(calcBMI(74, 160), 28.9);
});

test('TMB Mifflin-St Jeor hombre 74 kg, 160 cm, 27 años', () => {
  assert.equal(calcBMR({ sex: 'male', weightKg: 74, heightCm: 160, age: 27 }), 1610);
});

test('metas para bajar de peso respetan el piso de calorías', () => {
  const t = calcTargets({ sex: 'female', weightKg: 50, heightCm: 150, age: 30, activity: 'sedentary', goal: 'lose' });
  assert.equal(t.kcal, 1200);
});

test('proteína se calcula por kg según objetivo', () => {
  const t = calcTargets({ sex: 'male', weightKg: 74, heightCm: 160, age: 27, activity: 'moderate', goal: 'gain' });
  assert.equal(t.protein, Math.round(74 * 1.8));
});

test('bloquea bajar de peso con IMC menor a 18.5', () => {
  const r = checkGoalSafety({ goal: 'lose', bmi: 17 });
  assert.equal(r.allowed, false);
});

test('advierte con IMC de 30 o más', () => {
  const r = checkGoalSafety({ goal: 'lose', bmi: 31 });
  assert.equal(r.allowed, true);
  assert.equal(r.warnings.length, 1);
});

test('parser separa items por "y" y "con"', () => {
  const items = parseMeal('2 huevos y 1 pan con palta');
  assert.equal(items.length, 3);
  assert.equal(items[0].kcal, 144);
  assert.equal(items[1].kcal, 160);
  assert.equal(items[2].kcal, 160);
});

test('parser usa gramos cuando se indican', () => {
  const [item] = parseMeal('150 g de pollo');
  assert.equal(item.kcal, Math.round(165 * 1.5));
});

test('parser cuenta "poco" como media porción', () => {
  const [item] = parseMeal('poco arroz');
  assert.equal(item.kcal, 65);
});

test('alimento no reconocido queda marcado sin inventar valores', () => {
  const [item] = parseMeal('lomo saltado');
  assert.equal(item.matched, false);
  assert.equal(item.kcal, 0);
});

test('summarize suma kcal y proteína', () => {
  const total = summarize(parseMeal('2 huevos y 1 pan'));
  assert.equal(total.kcal, 304);
});
