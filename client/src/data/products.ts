export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
};

export const categories = [
  "laptops",
  "monitors",
  "keyboards",
  "mice",
  "headsets",
  "webcams",
  "external hard drives",
  "accessories",
] as const;

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "1",
    name: "Aurora Pro 14 Laptop",
    description:
      "A 14-inch ultraportable with a 12-core processor, 32GB of unified memory and an all-day battery. Machined aluminium chassis, 3K display and a whisper-quiet cooling system built for developers and creators.",
    price: 1899,
    category: "laptops",
    image: img("photo-1496181133206-80ce9b88a853"),
    quantity: 12,
  },
  {
    id: "2",
    name: "Vector Studio 16 Laptop",
    description:
      "A desktop-class workstation laptop with a dedicated GPU, 1TB NVMe storage and a colour-accurate 16-inch panel for video editing and 3D work.",
    price: 2499,
    category: "laptops",
    image: img("photo-1517336714731-489689fd1ca8"),
    quantity: 6,
  },
  {
    id: "3",
    name: "Lumen 27\" 4K Monitor",
    description:
      "27-inch 4K IPS display with 99% sRGB coverage, USB-C single-cable docking with 90W power delivery and a fully adjustable stand.",
    price: 549,
    category: "monitors",
    image: img("photo-1527443224154-c4a3942d3acf"),
    quantity: 20,
  },
  {
    id: "4",
    name: "Lumen Ultrawide 34\" Curved",
    description:
      "A 34-inch curved ultrawide with 144Hz refresh, HDR400 and picture-by-picture, ideal for trading desks and immersive gaming.",
    price: 899,
    category: "monitors",
    image: img("photo-1547082299-de196ea013d6"),
    quantity: 9,
  },
  {
    id: "5",
    name: "Forge 75 Mechanical Keyboard",
    description:
      "Hot-swappable 75% mechanical keyboard with gasket mounting, PBT double-shot keycaps and per-key RGB. Tuned linear switches out of the box.",
    price: 179,
    category: "keyboards",
    image: img("photo-1587829741301-dc798b83add3"),
    quantity: 34,
  },
  {
    id: "6",
    name: "Slate Low-Profile Wireless Keyboard",
    description:
      "Slim aluminium wireless keyboard with backlit low-profile keys, multi-device pairing and a rechargeable battery rated for three months.",
    price: 129,
    category: "keyboards",
    image: img("photo-1618384887929-16ec33fab9ef"),
    quantity: 27,
  },
  {
    id: "7",
    name: "Glide Pro Wireless Mouse",
    description:
      "Ergonomic wireless mouse with a 26K sensor, 70-hour battery, silent switches and a magnetic charging dock.",
    price: 99,
    category: "mice",
    image: img("photo-1527864550417-7fd91fc51a46"),
    quantity: 41,
  },
  {
    id: "8",
    name: "Glide Lite Gaming Mouse",
    description:
      "A 58g honeycomb gaming mouse with optical switches, PTFE feet and 8000Hz polling for competitive play.",
    price: 79,
    category: "mice",
    image: img("photo-1615663245857-ac93bb7c39e7"),
    quantity: 18,
  },
  {
    id: "9",
    name: "Echo ANC Studio Headset",
    description:
      "Over-ear headset with hybrid active noise cancellation, a detachable broadcast microphone and memory-foam earcups for long sessions.",
    price: 249,
    category: "headsets",
    image: img("photo-1505740420928-5e560c06d30e"),
    quantity: 15,
  },
  {
    id: "10",
    name: "Echo Wireless Gaming Headset",
    description:
      "Low-latency 2.4GHz wireless headset with spatial audio, 40-hour battery life and a flip-to-mute boom mic.",
    price: 189,
    category: "headsets",
    image: img("photo-1599669454699-248893623440"),
    quantity: 22,
  },
  {
    id: "11",
    name: "Clarity 4K Webcam",
    description:
      "4K webcam with a Sony sensor, HDR, autofocus and AI framing. Includes a privacy shutter and dual noise-cancelling mics.",
    price: 159,
    category: "webcams",
    image: img("photo-1587826080692-f439cd0b70da"),
    quantity: 25,
  },
  {
    id: "12",
    name: "Clarity Stream 1080p Webcam",
    description:
      "Compact 1080p60 streaming webcam with adjustable field of view and plug-and-play USB-C connectivity.",
    price: 89,
    category: "webcams",
    image: img("photo-1590845947676-fa2be6bd2c34"),
    quantity: 30,
  },
  {
    id: "13",
    name: "Vault 2TB Portable SSD",
    description:
      "Pocket-sized 2TB NVMe SSD with 1,050MB/s transfers, hardware encryption and a shock-resistant rubberised shell.",
    price: 229,
    category: "external hard drives",
    image: img("photo-1531492746076-161ca9bcad58"),
    quantity: 16,
  },
  {
    id: "14",
    name: "Vault 8TB Desktop Drive",
    description:
      "8TB desktop backup drive with USB 3.2, automatic scheduled backups and quiet helium-sealed mechanics.",
    price: 199,
    category: "external hard drives",
    image: img("photo-1618410320928-25228d811631"),
    quantity: 11,
  },
  {
    id: "15",
    name: "Nexus 11-in-1 USB-C Hub",
    description:
      "Aluminium USB-C dock with dual HDMI, gigabit ethernet, SD/microSD readers and 100W pass-through charging.",
    price: 119,
    category: "accessories",
    image: img("photo-1625842268584-8f3296236761"),
    quantity: 38,
  },
  {
    id: "16",
    name: "Riser Aluminium Laptop Stand",
    description:
      "Height-adjustable aluminium laptop stand with an open-airflow design and silicone pads to protect your machine.",
    price: 69,
    category: "accessories",
    image: img("photo-1527864550417-7fd91fc51a46"),
    quantity: 44,
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
