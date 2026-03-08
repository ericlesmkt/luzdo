import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // AQUI ENTRA A SUA DEFESA CONTRA OS HACKERS:
    // 1. Você pode verificar se o payload tem os dados corretos.
    // 2. Futuramente, você pode adicionar a validação de um reCAPTCHA/Cloudflare Turnstile aqui.
    if (!body.nome_criador || !body.nome_presenteado) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Insere no banco de dados usando a chave secreta do servidor
    const { data, error } = await supabaseServer
      .from('homenagens')
      .insert([body])
      .select('slug')
      .single();

    if (error) throw error;

    return NextResponse.json({ sucesso: true, slug: data.slug });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao salvar' }, { status: 500 });
  }
}