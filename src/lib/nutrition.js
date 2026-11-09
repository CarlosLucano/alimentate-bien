// Cálculos de metas nutricionales (Mifflin-St Jeor + multiplicador de actividad).
// Sin dependencias: funciones puras, fáciles de probar.

export const ACTIVITY = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

// Ajuste calórico sobre el gasto total diario (kcal).
export const GOAL_ADJUST = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

// Piso mínimo de calorías para no bajar de un umbral seguro.
export const MIN_KCAL = {
  male: 1500,
  female: 1200,
};

const round1 = (n) => Math.round(n * 10) / 10;

function assertPositive(name, value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new Error(`"${name}" debe ser un número positivo`);
  }
}

export function calcBMI(weightKg, heightCm) {
  assertPositive('weightKg', weightKg);
  assertPositive('heightCm', heightCm);
  const m = heightCm / 100;
  return round1(weightKg / (m * m));
}

export function calcBMR({ sex, weightKg, heightCm, age }) {
  assertPositive('weightKg', weightKg);
  assertPositive('heightCm', heightCm);
  assertPositive('age', age);
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === 'female' ? base - 161 : base + 5;
}

export function calcTargets({ sex, weightKg, heightCm, age, activity, goal }) {
  if (!ACTIVITY[activity]) throw new Error(`actividad desconocida: ${activity}`);
  if (GOAL_ADJUST[goal] === undefined) throw new Error(`objetivo desconocido: ${goal}`);

  const bmi = calcBMI(weightKg, heightCm);
  const tdee = calcBMR({ sex, weightKg, heightCm, age }) * ACTIVITY[activity];
  const kcal = Math.max(Math.round(tdee + GOAL_ADJUST[goal]), MIN_KCAL[sex] ?? MIN_KCAL.male);
  const proteinPerKg = goal === 'maintain' ? 1.6 : 1.8;

  return {
    bmi,
    tdee: Math.round(tdee),
    kcal,
    protein: Math.round(weightKg * proteinPerKg),
  };
}

// Reglas de seguridad antes de guardar el objetivo.
// Devuelve { allowed, warnings } para que la UI pueda bloquear o advertir.
export function checkGoalSafety({ goal, bmi }) {
  const warnings = [];
  let allowed = true;

  if (goal === 'lose' && bmi < 18.5) {
    allowed = false;
    warnings.push('Con tu IMC actual no es recomendable un objetivo de bajar de peso. Consulta con un profesional de salud.');
  }
  if (bmi >= 30) {
    warnings.push('Tu IMC es igual o mayor a 30. Te recomendamos consultar con un profesional de salud antes de iniciar cambios.');
  }
  return { allowed, warnings };
}
