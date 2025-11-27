import { type NextRequest, NextResponse } from 'next/server';
// import { optimizePrompt } from "@/lib/ai"
import { optimizePrompt } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const optimizedPrompt = await optimizePrompt(prompt);

    return NextResponse.json({ optimizedPrompt });
  } catch (error) {
    console.error('Error optimizing prompt:', error);
    return NextResponse.json(
      { error: 'Failed to optimize prompt' },
      { status: 500 }
    );
  }
}
