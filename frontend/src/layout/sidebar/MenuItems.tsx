import {
  IconAddressBook,
  IconBrandWhatsapp,
  IconLayoutDashboard,
  IconMessages,
  IconPlugConnected,
} from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: "1",
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: "2",
    title: "Conexões",
    icon: IconPlugConnected,
    href: "/connections",
  },
  {
    id: "3",
    title: "Tickets",
    icon: IconBrandWhatsapp,
    href: "/tickets",
  },
  {
    id: "4",
    title: "Contatos",
    icon: IconAddressBook,
    href: "/contacts",
  },
  {
    id: "5",
    title: "Respostas Rápidas",
    icon: IconMessages,
    href: "/quickAnswers",
  },
];

export default Menuitems;
