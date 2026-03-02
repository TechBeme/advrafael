import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { googleGenerativeAiModel } from "@/lib/assistant/model";

export const maxDuration = 30;

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const audioFile = formData.get('audio') as File;

        if (!audioFile) {
            return NextResponse.json(
                { error: "Nenhum arquivo de áudio enviado" },
                { status: 400 }
            );
        }

        // Convert audio to base64
        const arrayBuffer = await audioFile.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString('base64');

        // Use Gemini to transcribe the audio
        const result = await generateText({
            model: google(googleGenerativeAiModel),
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Transcreva o áudio a seguir para texto em português. Retorne APENAS o texto transcrito, sem nenhuma formatação adicional, explicação ou comentário.",
                        },
                        {
                            type: "file",
                            data: base64Audio,
                            mediaType: audioFile.type || "audio/webm",
                        } as const,
                    ],
                },
            ],
        });

        return NextResponse.json({ text: result.text.trim() });
    } catch (error) {
        console.error("[transcribe] erro na transcrição", error);
        return NextResponse.json(
            { error: "Não foi possível transcrever o áudio" },
            { status: 500 }
        );
    }
}
