# Rick & Morty Episode Explorer 🔍🛸

Explorá episodios de Rick & Morty según los personajes seleccionados. Este proyecto fue desarrollado como parte de un challenge técnico, usando Next.js + TypeScript + TailwindCSS + Zustand + Axios + Testing Library.

---

## 🚀 Deploy

Este proyecto está desplegado en **[Vercel](https://vercel.com/)**:  
🔗 [https://rick-and-morty-app.vercel.app](https://rick-and-morty-app.vercel.app)

---

## 🧠 ¿Qué hace esta app?

- ✅ Muestra dos grillas paginadas de personajes (`Character #1` y `Character #2`)
- ✅ Permite seleccionar uno o dos personajes
- ✅ Muestra episodios únicos y compartidos entre ambos
- ✅ Usa cards con estado, especie y avatar del personaje
- ✅ Muestra loader personalizado mientras se cargan personajes y episodios
- ✅ Paginación con lógica de visibilidad progresiva (`...` → expandir)
- ✅ Botón para limpiar selección
- ✅ Scroll automático al seleccionar personajes o cambiar página
- ✅ UI responsive y accesible

---

## 🛠️ Tecnologías

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) – para el store global
- [Axios](https://axios-http.com/) – para las peticiones a la API
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) – para tests

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/SanAlessa/Rick-and-Morty-app.git
cd Rick-and-Morty-app
```

2. Instalar dependencias:

```bash
npm install
```

3. Levantar el servidor local:

```bash
npm run dev
```

---

## 🧪 Tests

```bash
npm test
```

Ejecuta todos los tests con Jest + Testing Library.

> Tests automáticos también se ejecutan antes de cada commit (si está configurado con Husky + lint-staged).

---

## 🗃️ Estructura

```
src/
├── components/        → Todos los componentes visuales
├── hooks/             → Custom hooks (useCharacters, etc.)
├── lib/               → Axios config
├── store/             → Zustand store
├── app/               → Página principal en app/page.tsx
```

---

## 🧩 Extras (Plus)

- Loader animado con gif de Rick & Morty
- Paginación inteligente con `...`
- Animaciones con scroll automático
- Código limpio, componentizado y escalable
- Testing en todos los niveles del proyecto

---

## 🧑‍💻 Desarrollado por

**@SanAlessa**  
[github.com/SanAlessa](https://github.com/SanAlessa)
