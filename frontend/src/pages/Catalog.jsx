import React, { useEffect, useState } from 'react';
import { getProducts } from './services/productService';
import '../components/Catalog.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('No se pudo cargar el catálogo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.categoria?.nombre || 'Sin Categoría';
    const brand = product.marca?.nombre || 'Sin Marca';

    if (!acc[category]) {
      acc[category] = {};
    }

    if (!acc[category][brand]) {
      acc[category][brand] = [];
    }

    acc[category][brand].push(product);
    return acc;
  }, {});

  // Descargar como PDF
  const downloadAsPDF = async () => {
    const element = document.getElementById('catalog');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Divide el contenido en varias páginas si excede el tamaño
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;
    while (position < imgHeight) {
      pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      position += pdfHeight;
      if (position < imgHeight) pdf.addPage();
    }

    pdf.save('catalogo.pdf');
  };

  // Descargar como Imagen (JPG)
  const downloadAsImage = async () => {
    const element = document.getElementById('catalog');
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.download = 'catalogo.jpg';
    link.click();
  };

  // Descargar como Word
  const downloadAsWord = () => {
    const element = document.getElementById('catalog');
    const catalogContent = element.outerHTML;

    // Crear un documento Word a partir del HTML
    const header =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Catálogo</title></head><body>';
    const footer = '</body></html>';
    const sourceHTML = header + catalogContent + footer;

    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'catalogo.doc';
    link.click();
  };

  return (
    <div id="catalog" className="catalog">
      <h1>Catálogo Tienda Éxito</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            {Object.keys(groupedProducts[category]).map((brand) => (
              <div key={brand} className="brand">
                <h3>{brand}</h3>
                <ul className="product-list">
                  {groupedProducts[category][brand].map((product) => (
                    <li key={product.id} className="product-item">
                      <p><strong>{product.nombre}</strong></p>
                      <p>Precio: {product.precio} Bs</p>
                      <p>Descripción: {product.descripcion}</p>
                      {product.imagen && (
                        <img
                          src={product.imagen}
                          alt={product.nombre}
                          className="product-image"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
      <div className="actions">
        <button onClick={downloadAsPDF} className="btn primary">
          Descargar como PDF
        </button>
        <button onClick={downloadAsImage} className="btn secondary">
          Descargar como Imagen
        </button>
        <button onClick={downloadAsWord} className="btn secondary">
          Descargar como Word
        </button>
      </div>
      <footer className="catalog-footer">
        © {new Date().getFullYear()} Tienda Éxito. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Catalog;
