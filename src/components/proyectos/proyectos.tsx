import React, {  useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient'; // Importa el cliente de Supabase
// import { Link } from 'react-router-dom';

interface ProyectosType {
  id: number;
  created_at: string;
  titulo: string;
  slug: string;
  intro: string;
  blog_pic: string;
  blog_text: string | null;
  author_id: string | null;
  profiles: { full_name: string } | null; // Agrega esto para el join
}

const Proyectos: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [proyectos, setproyectos] = useState<ProyectosType[]>([]); // Estado para los datos
    const [user, setUser] = useState<any>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<ProyectosType | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
      titulo: '',
      intro: '',
      blog_pic: '',
      blog_text: '',
      author_id:'',
      slug:''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

      
        useEffect(() => {
          const fetchproyects = async () => {
            const { data, error } = await supabase.from('blogs').select('*, profiles(full_name)');
            if (error) {
              console.error('Error fetching proyects:', error);
            } else if (data && data.length > 0) {
              // console.log('Datos de proyectos:', data);
              setproyectos(data);
            }
          };
          fetchproyects();
          // Listener para cambios en el estado de autenticación
          const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("evento blogs:", event)
            setUser(session?.user ?? null);
          });
      
          return () => authListener.subscription.unsubscribe();
        }, []); 
      
        // console.log("blogs:", blogs)

        const fetchproyects = async () => {
          const { data, error } = await supabase.from('blogs').select('*, profiles(full_name)');
          if (error) {
            console.error('Error fetching proyects:', error);
          } else if (data && data.length > 0) {
            setproyectos(data);
          }
        };

        const uploadImage = async (file: File) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const { error } = await supabase.storage.from('website_assets').upload(`blogs/${fileName}`, file);
          if (error) throw error;
          const { data: publicUrl } = supabase.storage.from('website_assets').getPublicUrl(`blogs/${fileName}`);
          return publicUrl.publicUrl;
        };

        const handleCreate = async () => {
          if (!user) return;
          let blogPicUrl = formData.blog_pic;
          if (selectedFile) {
            try {
              blogPicUrl = await uploadImage(selectedFile);
            } catch (error) {
              // alert('Error subiendo imagen: ' + error.message);
              return;
            }
          }
          const { error } = await supabase.from('blogs').insert({
            titulo: formData.titulo,
            intro: formData.intro,
            blog_pic: blogPicUrl || null,
            blog_text: formData.blog_text,
            author_id: user.id,
            slug: formData.slug
          });
          if (error) {
            alert('Error creando blog: ' + error.message);
          } else {
            setFormData({ titulo: '', intro: '', blog_pic: '', blog_text: '', author_id:'', slug:'' });
            setSelectedFile(null);
            setIsCreating(false);
            fetchproyects();
          }
        };

        const handleUpdate = async () => {
          if (!editingBlog) return;
          let blogPicUrl = formData.blog_pic;
          if (selectedFile) {
            try {
              blogPicUrl = await uploadImage(selectedFile);
            } catch (error) {
              // alert('Error subiendo imagen: ' + error.message);
              return;
            }
          }
          const { error } = await supabase.from('blogs').update({
            titulo: formData.titulo,
            intro: formData.intro,
            blog_pic: blogPicUrl || null,
            blog_text: formData.blog_text,
            slug: formData.slug
          }).eq('id', editingBlog.id);
          if (error) {
            alert('Error actualizando blog: ' + error.message);
          } else {
            setEditingBlog(null);
            setFormData({ titulo: '', intro: '', blog_pic: '', blog_text: '', author_id: '', slug: '' });
            setSelectedFile(null);
            fetchproyects();
          }
        };
        

        const handleDelete = async (id: number) => {
          // console.log('Intentando borrar blog con ID:', id, 'Usuario:', user?.id);
          if (!confirm('¿Estás seguro de que quieres borrar este blog?')) return;
          const { error } = await supabase.from('blogs').delete().eq('id', id);
          if (error) {
            // console.error('Error borrando blog:', error);
            alert('Error borrando blog: ' + error.message);
          } else {
            // console.log('Blog borrado exitosamente');
            fetchproyects();
          }
        };

        const openEdit = (blog: ProyectosType) => {
          setEditingBlog(blog);
          setFormData({
            titulo: blog.titulo,
            intro: blog.intro,
            blog_pic: blog.blog_pic,
            blog_text: blog.blog_text || '',
            author_id: blog.author_id || '',
            slug: blog.slug
          });
          setSelectedFile(null);
        };

        const openCreate = () => {
          setIsCreating(true);
          setFormData({ titulo: '', intro: '', blog_pic: '', blog_text: '', author_id: '', slug: '' });
          setSelectedFile(null);
        };

        const closeForm = () => {
          setEditingBlog(null);
          setIsCreating(false);
          setFormData({ titulo: '', intro: '', blog_pic: '', blog_text: '', author_id: '', slug: '' });
          setSelectedFile(null);
        };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === proyectos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? proyectos.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className=" px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl text-left md:text-5xl font-bold text-blue-900 mb-2">Proyectos</h2>
        <div className='flex gap-2'>
        <h3 className="text-xl text-left font-bold text-red-600 mb-6">¡TU FUTURO </h3>
        <h3 className="text-xl text-left font-bold text-blue-600 mb-6">IMPORTA!</h3>
        </div>
        {user && (
          <div className="mb-4">
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              editar blogs
            </button>
          </div>
        )} 
        <div className="w-full h-1 bg-yellow-400 mx-auto mb-4"></div>

        <div className="relative mb-8 flex justify-center items-center">
            <div 
                onClick={prevSlide}
                className="h-10 w-10 bg-yellow-400 flex justify-center items-center hover:cursor-pointer p-2 shadow-lg mx-1"
            >
                <FaChevronLeft className="text-blue-800 text-xl" />
            </div>
          {/* Projects Container */}
          <div className="flex overflow-hidden w-3/4">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${activeIndex * 100/proyectos.length}%)` }}>
              {proyectos.map((proyecto) => (
                <div key={proyecto.id} className="w-[250px] flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <img 
                      src={proyecto.blog_pic} 
                      alt="atl"
                      className="w-full h-32  object-cover aspect-rectangle"
                    />
                    <div className="p-4">
                      <p className="text-gray-500 text-xs text-left mb-2">{formatDate(proyecto.created_at)}</p>
                      <h4 className="text-sm font-bold text-left text-blue-900 mb-2">{proyecto.titulo}</h4>
                      <p className="text-gray-700 text-sm mb-4 text-left">{proyecto.intro}</p>
                      <div className="flex justify-start">
                        <button className="w-7 h-7 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*   Navigation Arrow */}
          
            <div 
                onClick={nextSlide}
                className="h-10 w-10 bg-yellow-400 flex justify-center items-center p-2 shadow-lg hover:cursor-pointer mx-1"
            >
                <FaChevronRight className="text-blue-600 text-xl" />
            </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-8 relative shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes size={20} />
            </button>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Editar Blogs</h2>
            
            <div className="mb-4">
              <button onClick={openCreate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2">
                <FaPlus /> Crear Nuevo Blog
              </button>
            </div>

            {(isCreating || editingBlog) && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold mb-4">{isCreating ? 'Crear Blog' : 'Editar Blog'}</h3>
                <form onSubmit={(e) => { e.preventDefault(); isCreating ? handleCreate() : handleUpdate(); }} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Introducción"
                    value={formData.intro}
                    onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  {formData.blog_pic && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Imagen actual:</p>
                      <img src={formData.blog_pic} alt="Imagen actual" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <textarea
                    placeholder="Texto del Blog"
                    value={formData.blog_text}
                    onChange={(e) => setFormData({ ...formData, blog_text: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      {isCreating ? 'Crear' : 'Actualizar'}
                    </button>
                    <button type="button" onClick={closeForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proyectos.map((blog) => (
                <div key={blog.id} className="bg-white border rounded-lg p-4 shadow">
                  <img src={blog.blog_pic} alt={blog.titulo} className="w-full h-32 object-cover rounded mb-2" />
                  <h4 className="font-bold text-blue-900">{blog.titulo}</h4>
                  <p className="text-gray-700 text-sm mb-2">{blog.intro}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(blog)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 flex items-center gap-1">
                      <FaEdit size={12} /> Editar
                    </button>
                    <button onClick={() => handleDelete(blog.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center gap-1">
                      <FaTrash size={12} /> Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proyectos;