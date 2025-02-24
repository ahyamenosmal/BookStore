import { motion } from "framer-motion";
import SidebarBg from "../../assets/sidebar_bg.svg";
import SidebarBgTop from "../../assets/sidebar_bg_top.svg";

function Sidebar({
  items = [],
  selectedItem,
  setSelectedItem,
  allText = "Todas",
  getItemLabel = (item) => item.toString(),
  getItemValue = null
}) {
  // Si no se pasa getItemValue, usamos getItemLabel
  const valueFn = getItemValue || getItemLabel;

  return (
    <div className="fixed w-40 left-0 top-1/4 flex flex-col items-center">
      {/* Fondo del libro */}
      <img
        src={SidebarBg}
        alt="Background"
        className="absolute z-20 h-screen object-cover object-right"
      />

      {/* Página del libro */}
      <img
        src={SidebarBgTop}
        alt="Top Page"
        className="absolute z-50 h-screen w-20 object-cover object-right left-0"
      />

      {/* Elementos */}
      <div className="categories-wrapper flex flex-col space-y-8 mt-24  ">
        
        {allText && (
          <motion.div
            className={`relative z-40 w-50 h-12 text-xl flex  items-center justify-center rounded-r-xl cursor-pointer font-semibold border-b-4 border-r-4 border-double ${
              selectedItem === null
                ? "bg-yellow-400 text-sky-900 border-sky-900"
                : "bg-sky-900 text-yellow-400 border-amber-500"
            }`}
            initial={{ x: 70 }}
            whileHover={{ x: 100 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)" }}
            onClick={() => setSelectedItem(null)}
          >
            {allText}
          </motion.div>
        )}

        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`relative z-40 w-56 h-12 text-xl flex items-center justify-center rounded-r-xl  cursor-pointer font-semibold border-b-4 border-r-4 border-double ${
              selectedItem === valueFn(item)
                ? "bg-yellow-400 text-sky-900 border-sky-900"
                : "bg-sky-900 text-yellow-400 border-amber-500"
            }`}
            initial={{ x: 70 }}
            whileHover={{ x: 100 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ clipPath: "polygon(100% 0%, 85% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)" }}
            onClick={() => {
              console.log("Elemento clickeado:", valueFn(item));
              setSelectedItem(valueFn(item));
            }}
          >
            {getItemLabel(item)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
