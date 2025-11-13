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

---

La mejor manera de hacerlo es usando un **Flujo de Ramas por Funcionalidad** (conocido en inglés como *Feature Branch Workflow*), a menudo basado en un modelo llamado **GitFlow**.

Aquí te explico el concepto y luego el paso a paso de cómo usarlo para tu proyecto.

-----

### 1\. El Concepto: Ramas para todo

La idea central es simple: **Nunca trabajas directamente en la rama principal**. Tu rama principal (`main`) debe ser un reflejo sagrado de lo que está en producción o listo para producción.

Para tu proyecto, tendremos dos ramas "eternas" y ramas "temporales":

  * **Ramas Eternas:**

      * `main`: Tu código de producción. Estable y probado.
      * `develop`: Tu rama de integración. Aquí es donde todo el trabajo "terminado" se une. Es la versión "beta" o "próxima" de tu app.

  * **Ramas Temporales:**

      * `feature/...`: Ramas para cada nueva funcionalidad (Ej. `feature/modulo-1-login`, `feature/modulo-2-dashboard`).
      * `hotfix/...`: Ramas para arreglar bugs críticos en producción.

Este flujo de ramas te permite trabajar en tu "Módulo 1" sin afectar el trabajo de un "Módulo 2" que estés desarrollando en paralelo.

[Image of Git feature branch workflow diagram]

-----

### 2\. Paso a Paso: Desarrollando tu SPA con Git

Imaginemos que empiezas tu proyecto desde cero.

#### Paso 1: Configuración Inicial del Repositorio

Si aún no lo has hecho, crea tu repositorio (en GitHub, GitLab, etc.) y clónalo.

1.  Tu repositorio tendrá una rama por defecto, usualmente llamada `main`.
2.  Crea tu rama `develop` a partir de `main`:
    ```bash
    # Asegúrate de estar en main y actualizado
    git checkout main
    git pull origin main

    # Crea develop y súbela
    git checkout -b develop
    git push -u origin develop
    ```
3.  **Regla de Oro:** Ahora, tú y tu equipo (si lo hay) **solo trabajarán a partir de `develop`**.

#### Paso 2: Empezar a trabajar en el "Módulo 1"

Digamos que el "Módulo 1" es el sistema de autenticación de usuarios.

1.  Asegúrate de estar en `develop` y tener la última versión:
    ```bash
    git checkout develop
    git pull origin develop
    ```
2.  Crea una rama específica para esta funcionalidad:
    ```bash
    git checkout -b feature/modulo-1-auth
    ```
    *(**Buena práctica:** Nombra tus ramas de forma descriptiva. `feature/` es un prefijo común).*

#### Paso 3: Trabajar y Hacer "Commits" (El día a día)

Ahora estás en tu propia rama (`feature/modulo-1-auth`). Puedes trabajar con total libertad.

1.  Escribe tu código (crea componentes, servicios, etc. para el Módulo 1).

2.  **Haz commits pequeños y atómicos.** Esta es una de las mejores prácticas. No hagas un solo commit gigante al final del día.

      * *Mal Commit:* `git commit -m "Avances"`
      * *Buen Commit:* `git commit -m "feat(auth): Agrega formulario de login con validación"`

    > **Pro-Tip:** Usa "Conventional Commits". Es un estándar simple para tus mensajes:

    >   * `feat:` para una nueva funcionalidad.
    >   * `fix:` para una corrección de bug.
    >   * `chore:` para tareas de mantenimiento (actualizar dependencias, etc.).
    >   * `docs:` para documentación.

    ```bash
    # Escribes código...
    git add src/app/modulo-1/login/login.component.html
    git add src/app/modulo-1/login/login.component.ts
    git commit -m "feat(auth): Crea componente de login y formulario base"

    # Escribes más código...
    git add src/app/modulo-1/auth.service.ts
    git commit -m "feat(auth): Implementa servicio de autenticación con endpoint"
    ```

3.  Sube tu rama al repositorio remoto para tener una copia de seguridad y (si trabajas en equipo) para que otros vean tu progreso:

    ```bash
    git push -u origin feature/modulo-1-auth
    ```

#### Paso 4: Terminar el "Módulo 1"

Has terminado toda la funcionalidad del Módulo 1. Está probado (en tu entorno local) y listo para integrarse.

1.  **Actualiza `develop`:** Es posible que mientras trabajabas en el Módulo 1, el Módulo 2 (en el que trabajaba un colega) ya se haya integrado. Debes traer esos cambios primero.

    ```bash
    git checkout develop
    git pull origin develop
    ```

2.  **Vuelve a tu rama y fusiona `develop`:** Trae los cambios de `develop` a tu rama de feature para resolver cualquier conflicto *antes* de fusionar.

    ```bash
    git checkout feature/modulo-1-auth
    git merge develop
    ```

    *(Si hay conflictos, Git te lo dirá. Resuélvelos y haz un `git commit` para finalizar el merge).*

3.  **Fusiona tu módulo en `develop`:** Ahora que tu rama está actualizada y probada, intégrala.

    ```bash
    git checkout develop
    git merge --no-ff feature/modulo-1-auth
    ```

    *(Usar `--no-ff` (no-fast-forward) es otra buena práctica. Mantiene la historia de Git más limpia, asegurando que siempre se cree un "commit de merge", lo que facilita ver cuándo se integró cada feature).*

4.  **Sube `develop` y limpia:**

    ```bash
    git push origin develop
    git branch -d feature/modulo-1-auth # Borra la rama local
    git push origin --delete feature/modulo-1-auth # Borra la rama remota
    ```

#### Paso 5: Repetir para los Módulos 2, 3 y 4

Simplemente repite el **Paso 2 al 4** para cada módulo:

  * `git checkout -b feature/modulo-2-dashboard`
  * ...trabajar...
  * `git checkout develop`
  * `git merge --no-ff feature/modulo-2-dashboard`

-----

### 3\. Buenas Prácticas Adicionales para tu SPA

  * **Usa un `.gitignore` robusto:** Las SPAs (Angular, React, Vue) generan muchos archivos que no deben ir al repositorio. Asegúrate de que tu `.gitignore` incluya:
      * `node_modules/`
      * `dist/` o `build/` (la carpeta de compilación)
      * `.env` (archivos de variables de entorno)
      * Archivos del editor (ej. `.vscode/`, `.idea/`)
  * **Pull con Rebase:** Cuando estés en tu rama `feature` y quieras actualizarte con `develop`, muchos prefieren `git pull origin develop --rebase` en lugar de `git merge develop`. Esto "repasa" tus commits encima de los cambios de `develop`, manteniendo un historial lineal y más limpio, aunque es una técnica un poco más avanzada.
  * **Pull Requests (PRs):** Si trabajas en equipo, en lugar de fusionar (merge) directamente a `develop` (Paso 4.3), deberías abrir un **Pull Request** (o Merge Request). Esto permite que otros revisen tu código (Code Review) antes de que se integre, lo cual es fundamental para la calidad del software.

Este flujo de trabajo mantendrá tu proyecto ordenado. Tendrás una rama `develop` que siempre funciona con las últimas características integradas y una rama `main` que solo contiene las versiones estables que has decidido lanzar.

-----

Ahora que tienes el flujo general, ¿te gustaría que detallemos los comandos para manejar un "hotfix" (un bug urgente en producción) o cómo gestionar los conflictos de merge cuando ocurran?
