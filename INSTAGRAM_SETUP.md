# Configuración de Instagram Feed Automático

Este documento explica cómo configurar la obtención automática de las últimas 20 publicaciones de Instagram.

## Opción 1: Usar Instagram Graph API (Recomendado)

### Requisitos previos:
1. Una cuenta de Instagram Business o Creator
2. Una página de Facebook conectada a tu cuenta de Instagram
3. Acceso a Meta Developer Console

### Pasos:

1. **Crear una App en Meta Developers**
   - Ve a https://developers.facebook.com/
   - Crea una nueva app
   - Agrega el producto "Instagram Graph API"

2. **Obtener el Access Token**
   - Necesitarás un token de acceso de larga duración
   - Conecta tu página de Facebook a la app
   - Obtén el User ID de Instagram

3. **Crear Supabase Edge Function**
   - Crea una función Edge en Supabase llamada `get-instagram-posts`
   - Código de ejemplo:

```typescript
// supabase/functions/get-instagram-posts/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const INSTAGRAM_ACCESS_TOKEN = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
const INSTAGRAM_USER_ID = Deno.env.get('INSTAGRAM_USER_ID')

serve(async (req) => {
  try {
    const { username, limit = 20 } = await req.json()
    
    // Obtener posts desde Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`
    )
    
    const data = await response.json()
    
    return new Response(
      JSON.stringify({ data: data.data || [] }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
```

4. **Configurar Variables de Entorno en Supabase**
   - Ve a Project Settings > Edge Functions > Secrets
   - Agrega:
     - `INSTAGRAM_ACCESS_TOKEN`: Tu token de acceso de Instagram
     - `INSTAGRAM_USER_ID`: Tu User ID de Instagram

## Opción 2: Agregar Posts Manualmente en Supabase

Si prefieres agregar las publicaciones manualmente:

1. **Crear la tabla en Supabase** (si no existe):

```sql
CREATE TABLE instagram_posts (
  id TEXT PRIMARY KEY,
  post_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Nota:** Usamos `display_order` en lugar de `order` porque `order` es una palabra reservada en SQL.

2. **Agregar publicaciones**:
   - Ve a una publicación en Instagram
   - Copia la URL completa (ej: `https://www.instagram.com/p/ABC123/`)
   - Insértala en la tabla `instagram_posts` con un número de `display_order`

## Opción 3: Usar un Servicio de Terceros

Puedes usar servicios como:
- EmbedSocial
- Juicer
- SnapWidget

Y luego integrar el código proporcionado en el componente.

## Notas Importantes

- El componente mostrará automáticamente las últimas 20 publicaciones
- Solo muestra las primeras 12 en la página, con un botón "Ver más" que lleva al perfil completo
- Las publicaciones se actualizan automáticamente cuando se carga la página
- Si no hay publicaciones disponibles, se muestra un mensaje con enlace al perfil
