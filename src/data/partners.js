import dobeAndyFlyer from "../assets/dobe-andy-flyer.jpg"
import teashopLogo from "../assets/teashop-logo.png"
import afterpartyFlyer from "../assets/nacivt-afterparty-flyer.jpg"
import jiaFlyer from "../assets/jia-flyer.png"
import nightMarketFlyer from "../assets/night-market-flyer.jpg"
import multiverseCardShowLogo from "../assets/multiverse-card-show-logo.jpeg"
import slunksLogo from "../assets/slunks-logo.jpg"
import { LINKS } from "./links"

export const partners = [
  {
    name: "Dobe & Andy",
    role: "Food Partner · Hong Kong BBQ",
    image: dobeAndyFlyer,
    link: LINKS.food,
  },
  {
    name: "#Teashop",
    role: "Food Partner · Bubble Tea",
    image: teashopLogo,
    link: LINKS.food,
  },
  {
    name: "Pangea",
    role: "Official NACIVT Afterparty",
    image: afterpartyFlyer,
    link: LINKS.events,
  },
  {
    name: "JIA Foundation",
    role: "Chinatown Mini-Tour & Exhibit",
    image: jiaFlyer,
    link: LINKS.events,
  },
  {
    name: "Marché de Nuit Asiatique",
    role: "NACIVT Night Market",
    image: nightMarketFlyer,
    link: LINKS.events,
  },
  {
    name: "Multiverse Card Show",
    role: "Trading Card Vendor",
    image: multiverseCardShowLogo,
    // TODO: swap in their real site/Instagram once we have it
    link: null,
  },
  {
    name: "Slunks",
    role: "Streetwear Partner",
    image: slunksLogo,
    // TODO: swap in their real site/Instagram once we have it
    link: null,
  },
]
