import { Layout, Menu } from 'antd';
import { HomeOutlined, CodeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

// Define los ítems del menú (usando Link para la navegación)
const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Inicio</Link> },
    { key: '/music', icon: <CodeOutlined />, label: <Link to="/music">Música</Link> },
    { key: '/fotos-videos', icon: <SettingOutlined />, label: <Link to="/fotos-videos">Fotos y Videos</Link> },
    { key: '/calendario-pagos', icon: <SettingOutlined />, label: <Link to="/calendario-pagos">Calendario y Pagos</Link> },
    { key: '/merchandising', icon: <SettingOutlined />, label: <Link to="/merchandising">Merchandising</Link> },
    { key: '/iniciar-sesion', icon: <SettingOutlined />, label: <Link to="/iniciar-sesion">Iniciar Sesión</Link> },
];


const MainLayout = () => {
    // React Router hook para saber qué ruta está activa
    const location = useLocation();
    
    // Determina la clave activa del menú
    const activeKey = menuItems.find(item => item.key === location.pathname)?.key || '/';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            
            {/* 1. Header Fijo */}
            <Header style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
                <div style={{ color: "white", fontWeight: 600, marginRight: 24, float: "left" }}>
                    LMH
                </div>
                {/* Menú de Navegación (Usa la clave activa para que Ant Design lo resalte) */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[activeKey]}
                    items={menuItems}
                />
            </Header>

            {/* 2. Content Variable */}
            <Content style={{ padding: "24px 16px", flex: 1 }}>
                <div style={{ background: "white", padding: 24, minHeight: 360 }}>
                    {/* El componente <Outlet /> es el punto clave.
                      Aquí es donde React Router renderizará el componente 
                      del módulo (ModuloA, ModuloB, etc.) que coincida con la URL.
                    */}
                    <Outlet />
                </div>
            </Content>

            {/* 3. Footer Fijo */}
            <Footer style={{ textAlign: 'center' }}>
                MiApp Ant Design ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default MainLayout;