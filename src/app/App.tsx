import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from "react-router-dom";
import MainLayout from './MainLayout'; // El layout fijo
import HomePage from '../modules/homePage/components/HomePage.tsx';             
import Music from '../modules/music/components/Music.tsx';       
import FotosVideos from '../modules/fotosVideos/components/FotosVideos.tsx';
import CalendarioPagos from '../modules/calendarioPagos/components/CalendarioPagos.tsx';
import Merchandising from '../modules/merchandising/components/Merchandising.tsx';     
import Auth from '../modules/auth/components/Auth.tsx';     

// 1. Definir la configuración de las rutas tipadas
const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage title='Home Page' />,
      },
      {
        path: "music",
        element: <Music title='Musica y Partituras'/>,
      },
      {
        path: "fotos-videos",
        element: <FotosVideos title='Fotos y Videos' />,
      },
      {
        path: "calendario-pagos",
        element: <CalendarioPagos title='Calendario y Pagos' />,
      },
      {
        path: "merchandising",
        element: <Merchandising title='Merchandising' />,
      },
      {
        path: "iniciar-sesion",
        element: <Auth title='Iniciar Sesión' />,
      },
    ],
  },
];

// 2. Crear el router con los tipos correctos
const router = createBrowserRouter(routes);

// 3. Exportar el componente principal de la aplicación
const App = () => {
    // Utiliza el RouterProvider
    return <RouterProvider router={router} />;
};

export default App;
