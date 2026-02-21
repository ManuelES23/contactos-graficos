import { motion } from "framer-motion";
import { CATEGORIES } from "../../data/products";
import useStore from "../../store/catalogStore";

export default function FilterChips() {
  const { category, setCategory, categoryCounts, simulateLoading } = useStore();

  const handleSelect = (id) => {
    if (id !== category) {
      simulateLoading();
      setCategory(id);
    }
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {CATEGORIES.map((cat) => {
        const isActive = category === cat.id;
        const count = categoryCounts[cat.id] || 0;
        return (
          <motion.button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 select-none'
            style={
              isActive
                ? {
                    backgroundColor: "#1A3A8F",
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(26,58,143,0.25)",
                  }
                : {
                    backgroundColor: "#F5F5F5",
                    color: "#4A4A4A",
                    border: "1px solid #e5e7eb",
                  }
            }
          >
            {cat.label}
            <span
              className='text-xs px-1.5 py-0.5 rounded-full font-semibold'
              style={
                isActive
                  ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }
                  : { backgroundColor: "#e5e7eb", color: "#4A4A4A" }
              }
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
