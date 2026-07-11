
import { useEffect, useState } from "react";
import AxoisInstance from "../../../Interceptor/AxoisInterceptor";



const useProtectedImage = (imageId?: string | null) => {
 const [imageUrl, setImageUrl] = useState<string | null>('/avatar.png');
 useEffect(() => {
    if(!imageId) return;
    AxoisInstance.get('/media/get/' + imageId, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
      })
      .catch((error: any) => {
        console.error('Error fetching image:', error);
      });

 }, [imageId]);

 return imageUrl;
}

export default useProtectedImage;