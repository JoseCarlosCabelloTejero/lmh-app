# Uso diario de Git - Forma Sencilla

---

Para todo este tutorial, usaremos:

- **Repositorio Local:** Tu carpeta `mi-proyecto-react` en tu PC.
- **Repositorio Remoto (`origin`):** La versión de tu proyecto en la web de GitHub.

El objetivo es mantener ambos lugares **sincronizados**.

- `git push` (empujar): Envía tus cambios locales al remoto (PC -> GitHub).
- `git pull` (jalar/traer): Trae los cambios del remoto a tu local (GitHub -> PC).

---

### Escenario 1: El Flujo de Trabajo MÁS Común (Cambios en tu PC)

Este es tu día a día como programador. Haces cambios en tu código (en VS Code, por ejemplo) y quieres guardarlos y subirlos a GitHub como respaldo o para compartirlos.

Este flujo tiene 3 pasos: **Add -> Commit -> Push**.

Imagina que estás preparando un paquete para enviar:

1. **`git add`** (Añadir): Metes los archivos que has cambiado dentro de una caja.
2. **`git commit`** (Confirmar/Empaquetar): Cierras la caja y le pones una etiqueta (un mensaje) que dice qué hay dentro.
3. **`git push`** (Empujar/Enviar): Envías la caja a la "nube" (GitHub).

**Paso a paso en la terminal:**

__Paso 1. Trabaja en tu código.__

Abre tu proyecto en tu editor de código, crea un componente, modifica App.tsx, cambia un CSS... lo que sea.

__Paso 2. Revisa qué has cambiado.__

Antes de guardar nada, es bueno preguntarle a Git: "¿Qué cambios ves?"

`git status`

Git te mostrará una lista de archivos en rojo (archivos modificados o nuevos) bajo "Changes not staged for commit".

__Paso 3. Prepara los cambios para guardarlos (Add).__

Quieres "meter en la caja" todos los cambios que hiciste. El comando más común es:

`git add .`

(El `.` significa "añade todo en esta carpeta y subcarpetas").

*Si ahora vuelves a escribir `git status`, verás que los archivos están en verde, bajo "Changes to be committed".*

__Paso 4. Confirma los cambios (Commit).__

Ahora "cierra la caja" con una etiqueta (mensaje) que describa qué hiciste. ¡Un buen mensaje es clave!

`git commit -m "He añadido el formulario de contacto"`

*(Reemplaza el mensaje por algo descriptivo de tu cambio real)*.

En este punto, el cambio está **guardado en tu repositorio local (en tu PC)**, pero GitHub *todavía no sabe nada*.

__Paso 5. Sube tus cambios a GitHub (Push).__

Este es el paso final para enviar tu "commit" (tu "caja") al repositorio remoto (origin) en la rama (main).


`git push origin main`

(La primera vez puede que te pida tu usuario y contraseña de GitHub).

¡Listo! Si ahora recargas tu página de GitHub, verás tus nuevos cambios y el mensaje de commit que escribiste.

---

### Escenario 2: Cambios en GitHub (Ej. Documentación)

Este es el escenario que mencionaste: estás en la web de GitHub y editas un archivo directamente allí (muy común para el `README.md`).

__Paso 1. El cambio en GitHub.__

Vas a GitHub, abres tu README.md, haces clic en el lápiz (Editar), escribes tu documentación y le das al botón "Commit changes".

__Paso 2. El Problema.__

Ahora tienes una situación inversa: GitHub está más actualizado que tu PC.

Tu PC no tiene ni idea de esa nueva documentación que escribiste en la web.

__Paso 3. Sincronizar tu PC (Pull).__

REGLA DE ORO: Antes de empezar a programar en tu PC (¡especialmente al empezar el día!), siempre deberías traer los últimos cambios de GitHub para asegurarte de tener la versión más nueva.

El comando para esto es `git pull` (traer).

`git pull origin main`

Esto hará dos cosas:

1. **Fetch (Buscar):** Descargará los cambios (el commit del `README.md`) desde GitHub.
2. **Merge (Fusionar):** Los aplicará automáticamente a tus archivos locales.

Si abres tu proyecto en tu PC, verás que tu `README.md` local ¡se ha actualizado mágicamente!

---

### El Flujo de Trabajo DIARIO (El Método Seguro)

Ahora, juntemos todo. Para evitar problemas, tu rutina diaria debería ser:

1. **Al empezar a trabajar:** Abre la terminal en tu proyecto y escribe:Bas
    
    `git pull origin main`
    
    *(Así te aseguras de tener cualquier cambio que hayas hecho en GitHub u otro PC).*
    
2. **Trabaja:** Programa, modifica, crea archivos...
3. **Cuando termines una tarea (o al final del día):**Bash
    
    1. Revisa qué hiciste
    `git status`
    
    2. Prepara todos tus cambios
    `git add .`
    
    3. Guarda los cambios localmente con un mensaje
    `git commit -m "Lo que sea que hiciste (ej: 'Arreglado el bug del login')"`
    
    4. Sube tus cambios a GitHub
    `git push origin main`
    

### ¿Qué pasa si olvido hacer `pull` y hay un CONFLICTO?

Este es el único "problema" real y es fácil de solucionar.

**Escenario de Conflicto:**

1. En **GitHub**, editas la línea 10 del `README.md`.
2. En tu **PC** (sin hacer `pull`), editas *también* la línea 10 del `README.md` para que diga algo diferente.
3. Haces `git add .` y `git commit ...` en tu PC.
4. Intentas hacer `git push`. **¡Git te dará un ERROR!** Te dirá que no puedes subir porque el remoto tiene cambios que tú no tienes.
5. Obedientemente, haces `git pull`.
6. **¡CONFLICTO!** Git verá que intentaste cambiar la misma línea en ambos sitios y no sabe cuál elegir. Te dirá: "Merge conflict in README.md".

**Solución:**

1. Abre el archivo `README.md` en tu editor de código (VS Code es genial para esto).
2. Verás unas marcas raras:
    
    ```<<<<<<< HEAD
    Este es el cambio de mi PC
    =======
    Este es el cambio que bajé de GitHub
    >>>>>>> [un número largo...]```
    
3. Tu trabajo es **editar manualmente** esa sección. Borra las líneas `<<<<`, `====`, `>>>>` y deja el texto final como tú quieres que quede (quizás una mezcla de ambos, o solo uno de ellos).
4. Guarda el archivo.
5. Vuelve a la terminal y **cierra el ciclo**:Bash
    
    `git add README.md`
   
    `git commit -m "Resuelto conflicto de merge en README"`
   
    `git push origin main`
    

En resumen, el flujo sería: `pull -> (trabajar) -> add -> commit -> push`.
