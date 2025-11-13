# Documentación del Frontend

## Primer Paso (Gestión de Rutas)

Quiero empezar por la gestión de rutas ya que es una parte fundamental de la arquitectura de una aplicación frontend. Nos apoyaremos en `react-router-dom`. Esto puede aportar las siguientes ventajas:
- Estructura clara del proyecto
- Base para el desarrollo
- Desarrollo en paralelo: importante si por lo que sea nos quedamos atascado en una feature

### Creación del mapa general de las rutas

1. Como nos apoyamos en las características de nuestra aplicación, podemos empezar creando simplemente varios módulos sencillos (componentes) para decirle a las rutas a donde deben apuntar y qué deben renderizar. En dichos módulos, simplemente pondremos algo sencillo donde se vea el título y un párrafo, por ejemplo.
2. Se hace uso de `createBrowserRouter` para definir el mapa general. Se debe definir el __elemento__ y el __path__.
3. Utilizaremos ahora el RouterProvider para envolver a la App para que conozca este mapa que acabamos de implementar.

