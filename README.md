# Alimentate Bien

Registro de calorías y proteína con metas según objetivo (bajar, mantener o ganar masa).

## Idea inicial

- Surgió de un proceso personal de bajar de peso sin perder masa muscular, con registro diario de comidas.
- Producto para cualquier persona con objetivos distintos: bajar, mantener, ganar masa o salud general.
- Dos formatos planeados: una plantilla de Excel con dashboard (pago único) y una app web (suscripción mensual).
- Registro por texto, no por foto, porque la mayoría no pesa lo que come. Platos peruanos como base.
- Landing page con dos planes. Hosting en Netlify y pagos locales (Culqi o Mercado Pago) en el plan a futuro.
- Los datos de peso, IMC y alimentación son sensibles, así que el consentimiento va desde el inicio.

Este README fue generado con apoyo de un asistente de IA como base inicial. Se irá adaptando y revisando.

## Estado

Base de lógica sin interfaz todavía:

- `src/lib/nutrition.js`: IMC, TMB (Mifflin-St Jeor), metas y reglas de seguridad.
- `src/lib/foods.js`: base de alimentos de ejemplo con valores aproximados.
- `src/lib/parser.js`: convierte texto libre ("2 huevos y 1 pan con palta") en kcal y proteína.
- `src/lib/nutrition.test.js`: pruebas con `node --test` (sin dependencias).

Ejecutar pruebas: `npm test`

## Pendientes

- Validar valores de `foods.js` contra la Tabla Peruana de Composición de Alimentos (CENAN).
- Platos compuestos (lomo saltado, seco, etc.) como recetas con ingredientes, sin duplicar conteos.
- Estimación con IA para texto no reconocido (requiere función del lado del servidor).
- Vincular cuenta anónima con email.
- Consentimiento y privacidad: peso, IMC y registro de alimentación son datos de salud.
- Interfaz React (JavaScript, componentes funcionales, estilos inline) y Firebase.

## Nota

Esta base se creó en un entorno de trabajo nuevo, no a partir de la carpeta original. Cuando se
conecte la carpeta del proyecto, habrá que comparar y unificar ambas versiones.
