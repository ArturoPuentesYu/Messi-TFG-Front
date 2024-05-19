import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Image} from "@nextui-org/react";
import MessiLogo from "../assets/messiLogo.png";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Estadistícas",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
          <Image src={MessiLogo} alt="messi-logo" width="30" height="30" radius="none"  className="me-3"/>
          <p className="font-bold text-inherit">MESSI</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/estadisticas">
            Estadísticas
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="/foro" aria-current="page">
            Foro
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="/log-in" variant="shadow">
            Iniciar sesión
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem>
          <Button as={Link} href="#" variant="shadow">
            English
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
