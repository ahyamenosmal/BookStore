import React, { useEffect } from "react";
import Footer from "../../components/General/Footer.jsx";
import Banner from "../../components/General/Banner.jsx";
import Navbar from "../../components/General/Navbar.jsx";
import PaginatedProducts from "../../components/General/PaginatedProdutcs.jsx";
import { useAPI } from "../../contexts/APIContext";
import { useBlog } from "../../contexts/BlogContext"; 
import { motion } from "framer-motion"; 
import BlogPostCard from "../../components/General/BlogPostCard.jsx"; 
import AnimatedSection from "../../components/General/AnimatedSection.jsx";

const Home = () => {
  const { productos, loading, error } = useAPI(); // ✅ Incluímos `loading` y `error`
  const { posts } = useBlog(); 

  // 📌 Debugging: Ver si los productos están llegando
  useEffect(() => {
    console.log("📌 Productos cargados en Home:", productos);
  }, [productos]);

  return (
    <>
      <Banner />
      <Navbar />
      
      <div className="container mx-auto">
        <div className="row">

          {/* 🔹 Sección de Best Sellers */}
          <AnimatedSection>
            <div className="flex-row justify-items-center col-md-12">
              <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                Best Sellers del momento
              </h1>

              {/* ✅ Manejo de carga y errores */}
              {loading ? (
                <p className="text-center text-lg text-gray-600">Cargando productos...</p>
              ) : error ? (
                <p className="text-center text-lg text-red-500">Error al cargar productos.</p>
              ) : productos.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No hay productos disponibles.</p>
              ) : (
                <PaginatedProducts products={productos} productsPerPage={3} />
              )}
            </div>
          </AnimatedSection>

          {/* 🔹 Sección de Novedades */}
          <AnimatedSection>
            <div className="flex-row justify-items-center col-md-12">
              <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                Novedades
              </h1>

              {loading ? (
                <p className="text-center text-lg text-gray-600">Cargando productos...</p>
              ) : error ? (
                <p className="text-center text-lg text-red-500">Error al cargar productos.</p>
              ) : productos.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No hay productos disponibles.</p>
              ) : (
                <PaginatedProducts products={productos} productsPerPage={6} />
              )}
            </div>
          </AnimatedSection>

          {/* 🔹 Sección de Ofertas */}
          <AnimatedSection>
            <div className="flex-row justify-items-center col-md-12">
              <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-red-400 border-0 border-b-4 border-solid w-fit">
                Ofertas únicas
              </h1>

              {loading ? (
                <p className="text-center text-lg text-gray-600">Cargando productos...</p>
              ) : error ? (
                <p className="text-center text-lg text-red-500">Error al cargar productos.</p>
              ) : productos.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No hay productos disponibles.</p>
              ) : (
                <PaginatedProducts products={productos} productsPerPage={6} />
              )}
            </div>
          </AnimatedSection>

          {/* 🔹 Sección de Blog */}
          <AnimatedSection>
            <div className="flex-row justify-items-center col-md-12 mt-16">
              <h1 className="text-star text-5xl font-lathusca m-5 px-5 border-blue-500 border-0 border-b-4 border-solid w-fit">
                Últimos Artículos del Blog
              </h1>

              <div className="grid grid-cols-2">
                {posts.length > 0 ? (
                  posts.map((post) => <BlogPostCard key={post.id} post={post} />)
                ) : (
                  <p className="text-center text-lg text-gray-500">No hay artículos disponibles.</p>
                )}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
