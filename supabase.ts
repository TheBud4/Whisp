import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

// Função para testar a conexão com o Supabase
const testSupabaseConnection = async (
  client: SupabaseClient
): Promise<boolean> => {
  try {
    const { data, error } = await client.from("users").select("*").limit(1);
    if (error) {
      console.error("Erro ao testar conexão:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Erro inesperado:", err instanceof Error ? err.message : err);
    return false;
  }
};

// Inicialização do cliente Supabase
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Configuração do Supabase ausente ou inválida");
}

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Verificação da conexão antes de exportar
(async () => {
  const isConnected = await testSupabaseConnection(supabase);
  if (!isConnected) {
    throw new Error(
      "Erro ao conectar ao Supabase. Verifique as configurações."
    );
  }
  console.log("Supabase conectado com sucesso");
})();

export { supabase };
