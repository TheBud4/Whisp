import { supabase } from "../../supabase";

export class ImageService {
  // Salvar uma imagem no bucket
  static async uploadImage(
    file: File,
    bucketName: string = "imagens"
  ): Promise<string | null> {
    const filePath = `${Date.now()}_${file.name}`; // Nome único para o arquivo
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600", // Define o cache para 1 hora
        upsert: false, // Evita sobrescrever arquivos existentes
      });

    if (error) {
      console.error("Erro no upload da imagem:", error.message);
      return null;
    }

    return data?.path ?? null;
  }

  // Obter a URL pública de uma imagem
  static getPublicUrl(
    filePath: string,
    bucketName: string = "imagens"
  ): string {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
  }

  // Baixar imagem
  static async downloadImage(
    filePath: string,
    bucketName: string = "imagens"
  ): Promise<Blob | null> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath);

    if (error) {
      console.error("Erro ao baixar imagem:", error.message);
      return null;
    }

    return data;
  }
}
