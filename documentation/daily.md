# Diario
## 12-11-2025
Creación de todo el proyecto, desde la idea principal de la aplicación y sus diferentes funcionalidades, hasta la creación de los requisitos, diseño, arquitectura futura, repositorio en GIT y todo.
Problemas:
- Problema al usar la plantilla de creación del proyecto ya que en el propio README me avisaba de cambiar la configuración de esLint para que fuera mejor
- Problemas al no saber bien como estructurar bien los diferentes directorios del proyecto en cuanto al propio proyecto y a la documentación
---
## 13-11-2025
- He estado invetigando todo lo que tiene que ver por donde se debe empezar en un proyecto como este y cuales son las buenas prácticas que hay que tener
- Para empezar, he creado diferentes componentes que serán donde se desarrollen las diferentes funcionalidades del proyecto y he ido creando los diferentes directorios para tener todo en base a `composition pattener` de React
- He implementado el __mapa general__ del proyecto (las Rutas) haciendo uso de `react-router-dom`
- He creado una nueva forma de trabajar con Git basado en __Feature Branch Workflow__ para tener buenas prácticas
- He empezado creando una rama para implementar la funcionalidad __Music__ llamada `feature/music`
- He implementado esta funcionalidad, pero debo modularizar todo mucho más y aprender bien los conceptos que he usado y he implementado


---
## 14-11-2025

- Hoy me he dedicado a aprender varios conceptos de TypeScript ya que me estaba costando aprender algunos conceptos
    - Entre ellos está la propia ___inferencia de tipos__ de JavaScript y cómo TypeScript nos puede ayudar a definir el tipado explícitamente. Nos ayuda a detectar error antes de compilación e incluso que nuestro IDE nos haga sugerencias.
    - Reglas de esLint que nos ayudan a ser más riguroso o no con TypeScript
    - La transpilación que hace para convertirlo a JavaScript y como funciona el compilador `tsc`
- Además, he modularizado mucho todo el código de la funcionalidad __Music__ separando todo en carpetas como:
    - /hooks/
    - /services/
    - /common/components/componenteX

Me hace falta aprender muchos conceptos tanto de typescript como de React, y de cómo enfocar una funcionalidad y desde el principio programar modularizando mucho

---
## xx-xx-2025
