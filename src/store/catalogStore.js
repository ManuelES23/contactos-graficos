import { create } from "zustand";
import products from "../data/products";

// ─── Conteo fijo de categorías ─────────────────────────────────────────────
const _categoryCounts = (() => {
  const counts = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  counts["todos"] = products.length;
  return counts;
})();

const ITEMS_PER_PAGE = 12;

/**
 * Función pura que calcula filteredProducts, paginatedProducts y totalPages
 * a partir del estado base. No crea closures ni referencias ocultas.
 */
function computeDerived(state) {
  const {
    search,
    category,
    sortBy,
    priceRange,
    selectedMaterials,
    selectedSizes,
    currentPage,
  } = state;

  let result = [...products];

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }
  if (category !== "todos")
    result = result.filter((p) => p.category === category);
  result = result.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
  );
  if (selectedMaterials.length > 0)
    result = result.filter((p) => selectedMaterials.includes(p.material));
  if (selectedSizes.length > 0)
    result = result.filter((p) => selectedSizes.includes(p.size));

  switch (sortBy) {
    case "precio-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "precio-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "nuevo":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }

  const totalPages = Math.max(1, Math.ceil(result.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = result.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  return { filteredProducts: result, paginatedProducts, totalPages };
}

/** Mezcla partial + estado actual y recalcula los derivados */
function withDerived(partial, currentState) {
  const next = { ...currentState, ...partial };
  return { ...partial, ...computeDerived(next) };
}

// Derivados iniciales
const _initial = computeDerived({
  search: "",
  category: "todos",
  sortBy: "relevancia",
  priceRange: [0, 5000],
  selectedMaterials: [],
  selectedSizes: [],
  currentPage: 1,
});

// ─────────────────────────────────────────────────────────────────────────────

const useStore = create((set, get) => ({
  // ─── Filters ──────────────────────────────────────────────────────
  search: "",
  category: "todos",
  sortBy: "relevancia",
  viewMode: "grid",
  priceRange: [0, 5000],
  selectedMaterials: [],
  selectedSizes: [],

  // ─── UI ───────────────────────────────────────────────────────────
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
  isLoading: false,
  sidebarOpen: false,

  // ─── Modal ────────────────────────────────────────────────────────
  selectedProduct: null,
  modalOpen: false,

  // ─── Wishlist ─────────────────────────────────────────────────────
  wishlist: [],

  // ─── Derivados (estado normal, referencia estable) ────────────────
  filteredProducts: _initial.filteredProducts,
  paginatedProducts: _initial.paginatedProducts,
  totalPages: _initial.totalPages,
  categoryCounts: _categoryCounts,

  // ─── Actions ──────────────────────────────────────────────────────
  setSearch: (search) => set((s) => withDerived({ search, currentPage: 1 }, s)),
  setCategory: (category) =>
    set((s) => withDerived({ category, currentPage: 1 }, s)),
  setSortBy: (sortBy) => set((s) => withDerived({ sortBy }, s)),
  setViewMode: (viewMode) => set({ viewMode }),
  setPriceRange: (priceRange) =>
    set((s) => withDerived({ priceRange, currentPage: 1 }, s)),
  setCurrentPage: (currentPage) => set((s) => withDerived({ currentPage }, s)),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  toggleMaterial: (material) =>
    set((s) => {
      const selectedMaterials = s.selectedMaterials.includes(material)
        ? s.selectedMaterials.filter((m) => m !== material)
        : [...s.selectedMaterials, material];
      return withDerived({ selectedMaterials, currentPage: 1 }, s);
    }),

  toggleSize: (size) =>
    set((s) => {
      const selectedSizes = s.selectedSizes.includes(size)
        ? s.selectedSizes.filter((sz) => sz !== size)
        : [...s.selectedSizes, size];
      return withDerived({ selectedSizes, currentPage: 1 }, s);
    }),

  clearFilters: () =>
    set((s) =>
      withDerived(
        {
          search: "",
          category: "todos",
          sortBy: "relevancia",
          priceRange: [0, 5000],
          selectedMaterials: [],
          selectedSizes: [],
          currentPage: 1,
        },
        s,
      ),
    ),

  openModal: (product) => set({ selectedProduct: product, modalOpen: true }),
  closeModal: () => set({ modalOpen: false, selectedProduct: null }),

  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),

  simulateLoading: () => {
    set({ isLoading: true });
    setTimeout(() => set({ isLoading: false }), 600);
  },
}));

export default useStore;
