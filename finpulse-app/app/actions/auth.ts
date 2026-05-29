"use server";

import { supabaseAdmin } from "@/utils/supabase/admin";

export async function setupUserWorkspace(userId: string, userName: string) {
  try {
    // 1. Criar o Workspace
    const { data: workspace, error: wsError } = await supabaseAdmin
      .from('workspaces')
      .insert([{ nome: `Workspace de ${userName}` }])
      .select()
      .single();

    if (wsError || !workspace) {
      console.error("Erro ao criar workspace:", wsError);
      return { success: false, error: wsError?.message };
    }

    // 2. Vincular o usuário ao Workspace
    const { error: linkError } = await supabaseAdmin
      .from('workspace_users')
      .insert([{ workspace_id: workspace.id, user_id: userId }]);

    if (linkError) {
      console.error("Erro ao vincular workspace:", linkError);
      return { success: false, error: linkError.message };
    }

    return { success: true, workspaceId: workspace.id };
  } catch (error) {
    console.error("Erro interno no setup do workspace:", error);
    return { success: false, error: "Erro interno" };
  }
}
