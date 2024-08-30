import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { response: "No message provided" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || "No response";

    return NextResponse.json({ response: botResponse });
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    return NextResponse.json(
      { response: "Error en la solicitud" },
      { status: 500 }
    );
  }
}
