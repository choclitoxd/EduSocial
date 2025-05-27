import { useState } from 'react';

export const useSimpleDropboxUpload = (accessToken) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadToDropbox = async (file) => {
    if (!file) throw new Error('No se proporcionó ningún archivo');
    
    setIsUploading(true);
    try {
      // Crear un nombre de archivo único
      const timestamp = Date.now();
      const uniqueFileName = `/${timestamp}_${file.name}`;
      
      // Leer el archivo como ArrayBuffer
      const fileContent = await file.arrayBuffer();
      
      // Subir el archivo a Dropbox
      const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: uniqueFileName,
            mode: 'overwrite',
            autorename: true,
            mute: false,
            strict_conflict: false
          }),
          'Content-Type': 'application/octet-stream'
        },
        body: fileContent
      });

      let errorMessage = '';
      if (!uploadResponse.ok) {
        try {
          const errorData = await uploadResponse.text();
          console.error('Error de Dropbox (texto completo):', errorData);
          
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.error_summary || 'Error desconocido';
          } catch (jsonError) {
            errorMessage = errorData || 'Error desconocido';
          }
        } catch (textError) {
          errorMessage = `Error ${uploadResponse.status}: ${uploadResponse.statusText}`;
        }
        throw new Error(`Error al subir el archivo a Dropbox: ${errorMessage}`);
      }

      const uploadResult = await uploadResponse.json();
      console.log('Resultado de subida:', uploadResult);

      // Crear un enlace compartido
      const shareResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: uploadResult.path_lower,
          settings: {
            requested_visibility: { ".tag": "public" },
            audience: { ".tag": "public" },
            access: { ".tag": "viewer" }
          }
        })
      });

      if (!shareResponse.ok) {
        let shareErrorMessage = '';
        try {
          const errorData = await shareResponse.text();
          console.error('Error al crear enlace (texto completo):', errorData);
          
          try {
            const jsonError = JSON.parse(errorData);
            shareErrorMessage = jsonError.error_summary || 'Error desconocido';
          } catch (jsonError) {
            shareErrorMessage = errorData || 'Error desconocido';
          }
        } catch (textError) {
          shareErrorMessage = `Error ${shareResponse.status}: ${shareResponse.statusText}`;
        }
        throw new Error(`Error al crear el enlace compartido: ${shareErrorMessage}`);
      }

      const shareResult = await shareResponse.json();
      console.log('Resultado de compartir:', shareResult);
      
      // Convertir el enlace a descarga directa
      const url = shareResult.url.replace('?dl=0', '?dl=1');

      return { 
        url, 
        path: uploadResult.path_lower,
        name: file.name 
      };
    } catch (error) {
      console.error('Error completo en la subida a Dropbox:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadToDropbox, isUploading };
}; 