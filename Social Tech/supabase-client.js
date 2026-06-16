const supabaseUrl = 'https://izunblaszpuyrngudfah.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dW5ibGFzenB1eXJuZ3VkZmFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDMwOTY2MywiZXhwIjoyMDk1ODg1NjYzfQ.XQGaXQiGWLTDTijPS6aN2BmFh70bxyaANgkvBRay1X4';

// Inicializa o cliente do Supabase
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const DEFAULT_PROFILE_ID = '550e8400-e29b-41d4-a716-446655440000';
const DEFAULT_CLIENT_ID = 'client-a-id';

// Inicializa dados básicos de perfil e configurações se estiverem vazios
async function initializeDefaultData() {
    try {
        // Verifica se Julia Duarte existe na tabela 'profiles'
        const { data: profile, error: pError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', DEFAULT_PROFILE_ID)
            .maybeSingle();

        if (pError) throw pError;

        if (!profile) {
            const { error: insertError } = await supabase.from('profiles').insert({
                id: DEFAULT_PROFILE_ID,
                username: 'juliaduartesocial',
                full_name: 'Julia Duarte',
                avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh4_ujdNJ7OYLIJbNE7oW_3SULI527nRMumC07mbfuKbNeqHtHZucaELcfUgaWuC_nG_VeezmFx39XrlUgLn6FxiQcEyjE7IwN56N0vggqMprrvE34FKqNq1V-DK5ZoHBJuwONiZ_00a9h8wQN80f7Sr2bDzxvQU6CC3QDmLqXI2wlSDNfK1pmM-19VivTOedj13DYagNq3L66A7CQTxL4HrAo0bxpi9y10GVXOp8bI3GArSto6a1kjeCge6lK4aTn-4UdFnRMgBE',
                bio: 'Criando o futuro das marcas digitais com estética e tecnologia. ✨',
                posts_count: 0,
                followers_count: 12400,
                following_count: 842,
                plan: 'Pro'
            });
            if (insertError) throw insertError;
            console.log('Perfil padrão criado com sucesso.');
        }

        // Verifica se configurações padrão existem na tabela 'app_settings'
        const { data: settings, error: sError } = await supabase
            .from('app_settings')
            .select('id')
            .eq('profile_id', DEFAULT_PROFILE_ID)
            .eq('client_id', DEFAULT_CLIENT_ID)
            .maybeSingle();

        if (sError) throw sError;

        if (!settings) {
            const { error: insertSettingsError } = await supabase.from('app_settings').insert({
                profile_id: DEFAULT_PROFILE_ID,
                client_id: DEFAULT_CLIENT_ID,
                approval_alerts: true,
                post_reminders: true,
                weekly_reports: false,
                instagram_connected: true,
                facebook_connected: true,
                linkedin_connected: false
            });
            if (insertSettingsError) throw insertSettingsError;
            console.log('Configurações padrão criadas com sucesso.');
        }

        // Verifica se a tabela 'posts' está vazia para realizar o seeding
        const { count: postsCount, error: countError } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        if (postsCount === 0) {
            console.log('Semeando posts iniciais...');
            const { error: seedError } = await supabase.from('posts').insert([
                {
                    profile_id: DEFAULT_PROFILE_ID,
                    client_id: DEFAULT_CLIENT_ID,
                    type: 'Foto',
                    media_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvcv5tkijrm32eIutebKNvQvj5LFulh4IBI0TQfxpz5qzIQFswNH79h1Rr2HP6yL6I6OLhBkSnFNlkp-NRG0qvLKMPvG9SL2Ly1tr6-PcBN1zEV80Vv_lTGOjAfEYhxe5jtkq52aMBOUt3A3Ax-17PEr10LmhXBkCSWKr2muxuXiQe_DxEavKUdm0wjsmnlVvdgNSrj89HkiGTEggO_f7OMBsLcV9x4yKqq4NRFksUxHw-Efy2y70HZtMwcas_3wppkm29E31dO_U',
                    caption: 'Lançamento da nova identidade visual e posicionamento de marca do Studio. Focado no minimalismo estético e inovação digital.',
                    scheduled_at: '2023-10-24T10:00:00',
                    status: 'Aprovado'
                },
                {
                    profile_id: DEFAULT_PROFILE_ID,
                    client_id: DEFAULT_CLIENT_ID,
                    type: 'Vídeo',
                    media_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFIxa2xgejawPJHHXxsAjIKSd7kVHuejrBK2BvyyNtqSM_XRirJ4cVL1xKPfMRwSSXljvSVDPfX26MyU06R4QAGd4z82oCg5Yc9EFF2O-7QXKd9mywUnUVcVQHwWZPK3PX8ii50DHQf-AV7nkBdz_GVYbgvLDbLnIL3iwoP2uU59fY2gvTrcyQRCQWphtJzW-Ll2tyy545CjNJb5LK75omQOLnm3RMLrFHJO11IV1NFec48DjtbVb7PjGDHCKpk-AggjVbpogtJ0',
                    caption: 'Bastidores da gravação de conteúdo do estúdio: iluminação violeta e foco em produtividade organizada.',
                    scheduled_at: '2023-10-24T14:30:00',
                    status: 'Aguardando'
                },
                {
                    profile_id: DEFAULT_PROFILE_ID,
                    client_id: DEFAULT_CLIENT_ID,
                    type: 'Foto',
                    media_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsAlOVQaom18OBjyqkIo6Rcuj1nXCpqUBFJh-GkuoKoqACpnW7C8XlLj0Wqt1YP-BEuUuyzuHYsbW53tQnZ_ZMkfHgYIqlz8XgHyZdTC4EKgUU8DSGXmKZCAOMXKF7Jbv7n7dw3VLvMOszsjPXlJ1mBLpMKpDyIF67aK54CCzVLEm9lanA_VDHPXNS6_ulSBRmTcfL_lPwW5KKCM4raPzX6ZnvIyePJkmHlb2GOs8ciK51CtYKu8MAaY41Vx6Gwyj0qRr1jRFentU',
                    caption: 'Foto conceitual do nosso escritório de design moderno com tons monocromáticos e detalhes em neon violeta.',
                    scheduled_at: '2023-10-25T18:00:00',
                    status: 'Rascunho'
                },
                {
                    profile_id: DEFAULT_PROFILE_ID,
                    client_id: DEFAULT_CLIENT_ID,
                    type: 'Foto',
                    media_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNm4gRT8M6ai2bV1K5ia5mrcEmQTbSXfFe3Vd8uzCjwqP2o6XYE4sflSownL8-V05EeL_kFEa9YuRsUsyxK9Lu43anqAVT0klR8ON5yYY5ekQzpXk21S6Ygdc4tcklDaFqaj7V_I9q2dSxvvEWCo52E2noI222BIikom6dwRPRGhg_sPU5RTCrCpiTphG6aH0Rycch-95P4XcR5SykteJ5jkpdoaKq-VJ3hsT2M6xnu1RL8DYRlcoD92d_KAFZEQK9qGgob48kkNk',
                    caption: 'Métricas de engajamento orgânico que realmente impulsionam marcas digitais no Instagram.',
                    scheduled_at: '2023-10-26T09:00:00',
                    status: 'Aprovado'
                },
                {
                    profile_id: DEFAULT_PROFILE_ID,
                    client_id: DEFAULT_CLIENT_ID,
                    type: 'Foto',
                    media_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAakEJm4YVo8_PtulmKKgU6-dnz4FQDB8P-zPvUJBY9KbyAc_IhP4Rq5Kfg5_G8speNoSl8Sy3RHfaBMn6lamz0IwnO6z3zHK9mVrYpP3j1MGri4RCz1X3I6aT9xn2SkojJ70bI_waDlb9rjbPOGtozI7lTbutNYUVfJhq7jvohgT6vpEJuA1xL70vXwn2cNd27-lPUtCwBq75l0OEriaSaf2azPyWl-UUbZMbsHlxAtIFoxsYqD7HHmemr-usglP-JL_zHvOauG0k',
                    caption: 'Colaboração entre designers e estrategistas em busca da harmonia visual perfeita.',
                    scheduled_at: '2023-10-27T18:00:00',
                    status: 'Aprovado'
                }
            ]);
            if (seedError) throw seedError;
            console.log('Posts iniciais semeados com sucesso.');
        }
    } catch (err) {
        console.error('Erro na inicialização de dados Supabase:', err);
    }
}
