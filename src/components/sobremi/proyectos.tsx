import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Importa el cliente de Supabase

interface NoticeType {
  id: number;
  created_at: string;
  titulo: string;
  intro: string;
  notice_pic: string;
  notice_text: string;
  author_id: string | null;
  profiles: { full_name: string } | null; // Agrega esto para el join
}

const Proyectos = () => {
  const [selectedNews, setSelectedNews] = useState(0);
  const [newsItems, setNewsItems] = useState<NoticeType[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    intro: '',
    notice_pic: '',
    notice_text: '',
    author_id: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase.from('notices').select('*, profiles(full_name)');
      if (error) {
        console.error('Error fetching notices:', error);
      } else if (data && data.length > 0) {
        setNewsItems(data);
      }
    };
    fetchNotices();

    // Listener para cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("sesion de evento:", event)
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from('website_assets').upload(`notices/${fileName}`, file);
    if (error) throw error;
    const { data: publicUrl } = supabase.storage.from('website_assets').getPublicUrl(`notices/${fileName}`);
    return publicUrl.publicUrl;
  };

  const handleCreate = async () => {
    if (!user) return;
    let noticePicUrl = formData.notice_pic;
    if (selectedFile) {
      try {
        noticePicUrl = await uploadImage(selectedFile);
      } catch (error) {
        // alert('Error subiendo imagen: ' + error.message);
        return;
      }
    }
    const { error } = await supabase.from('notices').insert({
      titulo: formData.titulo,
      intro: formData.intro,
      notice_pic: noticePicUrl || null,
      notice_text: formData.notice_text,
      author_id: user.id
    });
    if (error) {
      alert('Error creando noticia: ' + error.message);
    } else {
      setFormData({ titulo: '', intro: '', notice_pic: '', notice_text: '', author_id: '' });
      setSelectedFile(null);
      setIsCreating(false);
      // Refetch notices
      const { data } = await supabase.from('notices').select('*, profiles(full_name)');
      if (data) setNewsItems(data);
    }
  };

  const handleUpdate = async () => {
    if (!editingNotice) return;
    let noticePicUrl = formData.notice_pic;
    if (selectedFile) {
      try {
        noticePicUrl = await uploadImage(selectedFile);
      } catch (error) {
        // alert('Error subiendo imagen: ' + error.message);
        return;
      }
    }
    const { error } = await supabase.from('notices').update({
      titulo: formData.titulo,
      intro: formData.intro,
      notice_pic: noticePicUrl || null,
      notice_text: formData.notice_text
    }).eq('id', editingNotice.id);
    if (error) {
      alert('Error actualizando noticia: ' + error.message);
    } else {
      setEditingNotice(null);
      setFormData({ titulo: '', intro: '', notice_pic: '', notice_text: '', author_id: '' });
      setSelectedFile(null);
      // Refetch notices
      const { data } = await supabase.from('notices').select('*, profiles(full_name)');
      if (data) setNewsItems(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres borrar esta noticia?')) return;
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) {
      alert('Error borrando noticia: ' + error.message);
    } else {
      // Refetch notices
      const { data } = await supabase.from('notices').select('*, profiles(full_name)');
      if (data) setNewsItems(data);
    }
  };

  const openEdit = (notice: NoticeType) => {
    setEditingNotice(notice);
    setFormData({
      titulo: notice.titulo,
      intro: notice.intro,
      notice_pic: notice.notice_pic,
      notice_text: notice.notice_text,
      author_id: notice.author_id || ''
    });
    setSelectedFile(null);
  };

  const openCreate = () => {
    setIsCreating(true);
    setFormData({ titulo: '', intro: '', notice_pic: '', notice_text: '', author_id: '' });
    setSelectedFile(null);
  };

  const closeForm = () => {
    setEditingNotice(null);
    setIsCreating(false);
    setFormData({ titulo: '', intro: '', notice_pic: '', notice_text: '', author_id: '' });
    setSelectedFile(null);
  };

  const handleNewsClick = (index: number) => {
    setSelectedNews(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="w-full py-4 px-4 bg-white">
      <div className="w-full mx-auto">
        {user && (
          <button onClick={() => setShowEditModal(true)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
            Editar proyectos
          </button>
        )}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Gestionar Proyectos</h2>
              {(isCreating || editingNotice) && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-xl font-bold mb-4">{isCreating ? 'Crear Noticia' : 'Editar Noticia'}</h3>
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
                    {formData.notice_pic && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Imagen actual:</p>
                        <img src={formData.notice_pic} alt="Imagen actual" className="w-32 h-32 object-cover rounded" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <textarea
                      placeholder="Texto de la Noticia"
                      value={formData.notice_text}
                      onChange={(e) => setFormData({ ...formData, notice_text: e.target.value })}
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
              <button onClick={openCreate} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
                Crear Nuevo proyecto
              </button>
              <div className="space-y-2">
                {newsItems.map((notice) => (
                  <div key={notice.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-bold">{notice.titulo}</h4>
                      <p className="text-sm text-gray-600">{notice.intro}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(notice)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(notice.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                        Borrar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowEditModal(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                Cerrar
              </button>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-6 lg:gap-2">
          <div className="w-full rounded-lg overflow-hidden lg:ml-8">
            <div className="mb-4 text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-2">Proyectos</h2>
              <p className="font-bold text-base lg:text-lg text-gray-600">Lo que voy a defender por el Atlántico</p>
              <div className="h-1 w-full bg-yellow-400 mt-2"></div>
            </div>
            
            <div className="p-2 text-left">
              <h3 className="text-gray-700 mb-3 text-2xl">Un Atlántico que se respeta</h3>
              <p className="text-gray-700 mb-3">Creo en un Atlántico que alza la voz y defiende lo suyo. Desde la Cámara de Representantes trabajaré para que el Gobierno Nacional escuche al departamento, mire a nuestros municipios y respete sus necesidades.</p>
              <p className="text-gray-700 mb-3">El Atlántico necesita una voz firme en el Congreso, que no guarde silencio cuando las cosas no están bien y que defienda a su gente con hechos.</p>
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 p-0 lg:p-8">
            {newsItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleNewsClick(index)}
                className={`rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedNews === index ? 'bg-yellow-500' : 'bg-white'
                }`}
              >
                <div className="h-32 md:h-28 overflow-hidden">
                    <img src={item.notice_pic} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="pl-4 py-2 text-left">
                  <h4 className="font-bold mb-1 text-gray-700">{item.titulo}</h4>
                  <p className="text-xs text-gray-600 mb-2">{item.intro}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.notice_text}</p>
                  <div className="flex items-center justify-between pr-4 pb-2">
                    <div />
                    {/* <a 
                      href={'#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 border-red-500 hover:bg-red-100 transition-colors duration-200"
                      // onClick={(e) => {
                      //   if (!item.link) e.preventDefault();
                      // }}
                    >
                      <FaArrowRight className="h-4 w-4 text-red-500" />
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;