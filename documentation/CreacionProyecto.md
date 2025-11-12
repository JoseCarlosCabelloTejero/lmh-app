# Creación del proyecto

### 🗺️ Prerrequisitos

Antes de comenzar, asegúrate de tener instalados:

- **Node.js:** (Versión LTS recomendada). Puedes descargarlo desde [nodejs.org](https://nodejs.org/). Esto también instalará `npm` (el gestor de paquetes de Node).
- **Git:** El sistema de control de versiones. Puedes descargarlo desde [git-scm.com](https://git-scm.com/).

---

### 1. Crear el Proyecto Vite + React + TS

Abre tu terminal o línea de comandos y sigue estos pasos.

1. Ejecutar el comando de creación de Vite:Bash
    
    Este comando te permite crear un proyecto nuevo sin un prompt interactivo, especificando directamente la plantilla react-ts (React con TypeScript).
    
    Reemplaza "mi-proyecto-react" con el nombre que quieras para tu carpeta
   
    `npm create vite@latest mi-proyecto-react --template react-ts`
    
    (El hecho de poner — o — — hace que con uno solo te pregunto todo acerca de la configuración del proyecto)
    
3. **Entrar en la carpeta del proyecto:**Bash
    
    `cd mi-proyecto-react`
    
4. Instalar las dependencias:Bash
    
    El proyecto está creado, pero necesitas descargar las librerías (como React y Vite) que están listadas en package.json.
    
    `npm install`
    
5. (Opcional) Probar que funciona localmente:Bash
    
    Este comando iniciará el servidor de desarrollo de Vite.
    
    `npm run dev`
    
    Si abres la URL que te muestra (normalmente `http://localhost:5173`), deberías ver tu aplicación de React funcionando. Presiona `Ctrl + C` en la terminal para detenerla.
    

---

### 2. Preparar el Repositorio Git Local

Ahora vamos a convertir esta carpeta en un repositorio de Git.

1. Inicializar Git:Bash
    
    (Asegúrate de estar todavía dentro de la carpeta mi-proyecto-react).
    
    `git init`
    
    > Nota: La plantilla de Vite ya incluye un archivo .gitignore muy bien configurado, por lo que no necesitas preocuparte de que se suban archivos innecesarios como node_modules.
    > 
2. Renombrar la rama a main (Opcional pero recomendado):Bash
    
    Por estándar moderno, es mejor usar main como la rama principal en lugar de master. Este comando lo asegura.
    
    `git branch -M main`
    
3. Añadir todos los archivos al "staging" de Git:Bash
    
    Esto prepara todos los archivos de tu proyecto para ser guardados en el historial de Git.
    
    `git add .`
    
4. Crear el primer "commit":Bash
    
    Un "commit" es como una "foto" o guardado permanente de tu código en el historial.
    
    `git commit -m "Initial commit: Create project with Vite + React + TS"`
    

En este punto, **tu proyecto ya existe localmente** y tiene su primer guardado en Git. Ahora, vamos a crear el lugar donde vivirá en internet (GitHub).

---

### 3. Crear el Repositorio Remoto en GitHub

1. Ve a [**GitHub.com**](https://github.com/) e inicia sesión.
2. Haz clic en el ícono `+` en la esquina superior derecha y selecciona **"New repository"** (Nuevo repositorio).
3. **Dale un nombre:** (ej. `mi-proyecto-react`).
4. **Descripción (Opcional):** "Mi proyecto de prueba con Vite y React".
5. **Público o Privado:** Elige según tu preferencia.
6. **IMPORTANTE:** **NO** marques ninguna de las casillas:
    - *Add a README file*
    - *Add .gitignore*
    - *Choose a license*
    
    Tu proyecto local *ya tiene* todo esto. Quieres crear un repositorio **completamente vacío** que sirva solo como un "destino" para tu código.
    
7. Haz clic en **"Create repository"**.

---

### 4. Conectar el Proyecto Local con GitHub y Subir el Código

Después de crear el repositorio, GitHub te mostrará una página con comandos. Nos interesan los que dicen "...or push an existing repository from the command line".

1. Conectar tu repositorio local al remoto (GitHub):Bash
    
    Copia el comando git remote add origin... de la página de GitHub. Se verá así:
    
    Reemplaza TU_USUARIO y TU_REPO con tus datos
   
    `git remote add origin https://github.com/TU_USUARIO/TU_REPO.git`
    
    Este comando le dice a tu Git local: "Quiero que el alias `origin` apunte a esta URL de GitHub".
    
3. Subir (push) tu código a GitHub:Bash
    
    Este es el comando final. Sube tu rama main local al repositorio remoto origin y establece la conexión permanente (-u).
    
    `git push -u origin main`
    

¡Y listo! Si refrescas la página de tu repositorio en GitHub, verás todos los archivos de tu proyecto allí.

### Resumen de Comandos (Para copiar y pegar)

Aquí tienes la secuencia completa de comandos sin las explicaciones:

#### 1. Crear proyecto
`npm create vite@latest mi-proyecto-react --template react-ts`

`cd mi-proyecto-react`

`npm install`

#### 2. Preparar Git local
`git init`

`git branch -M main`

`git add .`

`git commit -m "Initial commit: Create project"`

#### 3. Crear repo en GitHub.com (Paso manual)

#### 4. Conectar y subir
Cambia la URL por la de tu repo en GitHub

`git remote add origin https://github.com/TU_USUARIO/TU_REPO.git`
`git push -u origin main`

---
