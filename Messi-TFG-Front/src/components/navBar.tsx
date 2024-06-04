import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import MessiLogo from '../assets/messiLogo.png'
import { useAuth } from '../contexts/auth.context'

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const menuItems = [
    { name: 'Estadísticas', href: '/estadisticas' },
    { name: 'Foro', href: '/foro' },
    { name: 'Iniciar sesión', href: '/login' },
    { name: 'Registrarse', href: '/register' }
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
            <Image
              src={MessiLogo}
              alt="messi-logo"
              width="30"
              height="30"
              radius="none"
              className="me-3"
            />
            <p className="font-bold text-inherit">MESSI</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/estadisticas">
            Estadísticas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/mi-carrera">
            Biografía
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/foro">
            Foro
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        {isAuthenticated ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>{`Hola, ${user.name}`}</DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              {isAdmin ? (
                <DropdownItem key="admin" className="h-14 gap-2">
                  <Link href="/admin" className="font-semibold">
                    Administrador
                  </Link>
                </DropdownItem>
              ) : (
                <></>
              )}
              <DropdownItem key="logout" color="danger">
                <Button className="w-full" color="danger" onClick={logout}>
                  Cerrar sesión
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link color="primary" href="/login">
                Iniciar sesión
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="shadow">
                Registrarse
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {!isAuthenticated ? (
          menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))
        ) : (
          <>
            <NavbarMenuItem>
              <p className="font-semibold">{`Hola, ${user.name}`}</p>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                color="foreground"
                className="w-full"
                size="lg"
                href="/estadisticas"
              >
                Estadísticas
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                color="foreground"
                className="w-full"
                size="lg"
                href="/mi-carrera"
              >
                Biografía
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link color="foreground" className="w-full" size="lg" href="/foro">
                Foro
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <p className="w-full text-red" onClick={logout}>
                Cerrar sesión
              </p>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar
