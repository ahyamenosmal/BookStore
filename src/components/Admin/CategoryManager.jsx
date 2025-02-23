import { useEffect, useState } from "react";
import { getCategories, createCategory } from "../../services/api";

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ nombre: "", descripcion: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    const handleInputChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createCategory(newCategory);
        if (result) {
            setCategories([...categories, result]);
            setNewCategory({ nombre: "", descripcion: "" });
        }
    };

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" value={newCategory.nombre} onChange={handleInputChange} required />
                <input type="text" name="descripcion" placeholder="Descripción" value={newCategory.descripcion} onChange={handleInputChange} />
                <button type="submit">Agregar Categoría</button>
            </form>
            <ul>
                {categories.map((category) => (
                    <li key={category.id_categoria}>{category.nombre} - {category.descripcion}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;
