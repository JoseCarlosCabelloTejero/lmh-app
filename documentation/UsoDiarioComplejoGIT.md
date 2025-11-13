# Uso diario de Git - Forma Feature Branch Workflow

La mejor manera de hacerlo es usando un **Flujo de Ramas por Funcionalidad** (conocido en inglés como *Feature Branch Workflow*), a menudo basado en un modelo llamado **GitFlow**.

Aquí te explico el concepto y luego el paso a paso de cómo usarlo para tu proyecto.

-----

## 1\. El Concepto: Ramas para todo

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

## 2\. Paso a Paso: Desarrollando tu SPA con Git

Imaginemos que empiezas tu proyecto desde cero.

### Paso 1: Configuración Inicial del Repositorio

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

### Paso 2: Empezar a trabajar en el "Módulo 1"

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

### Paso 3: Trabajar y Hacer "Commits" (El día a día)

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

### Paso 4: Terminar el "Módulo 1"

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

### Paso 5: Repetir para los Módulos 2, 3 y 4

Simplemente repite el **Paso 2 al 4** para cada módulo:

  * `git checkout -b feature/modulo-2-dashboard`
  * ...trabajar...
  * `git checkout develop`
  * `git merge --no-ff feature/modulo-2-dashboard`

-----

## 3\. Buenas Prácticas Adicionales para tu SPA

  * **Usa un `.gitignore` robusto:** Las SPAs (Angular, React, Vue) generan muchos archivos que no deben ir al repositorio. Asegúrate de que tu `.gitignore` incluya:
      * `node_modules/`
      * `dist/` o `build/` (la carpeta de compilación)
      * `.env` (archivos de variables de entorno)
      * Archivos del editor (ej. `.vscode/`, `.idea/`)
  * **Pull con Rebase:** Cuando estés en tu rama `feature` y quieras actualizarte con `develop`, muchos prefieren `git pull origin develop --rebase` en lugar de `git merge develop`. Esto "repasa" tus commits encima de los cambios de `develop`, manteniendo un historial lineal y más limpio, aunque es una técnica un poco más avanzada.
  * **Pull Requests (PRs):** Si trabajas en equipo, en lugar de fusionar (merge) directamente a `develop` (Paso 4.3), deberías abrir un **Pull Request** (o Merge Request). Esto permite que otros revisen tu código (Code Review) antes de que se integre, lo cual es fundamental para la calidad del software.

Este flujo de trabajo mantendrá tu proyecto ordenado. Tendrás una rama `develop` que siempre funciona con las últimas características integradas y una rama `main` que solo contiene las versiones estables que has decidido lanzar.
