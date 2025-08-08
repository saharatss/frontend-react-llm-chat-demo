export interface StreamSSEOptions<T = unknown> {
  url: string;
  payload: Record<string, unknown>;
  timeoutMs?: number;
  onMessage?: (message: T) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

export async function streamSSE<T = unknown>({
  url,
  payload,
  timeoutMs = 10000,
  onMessage,
  onDone,
  onError,
}: StreamSSEOptions<T>): Promise<void> {
  const controller = new AbortController();
  const signal = controller.signal;
  const decoder = new TextDecoder("utf-8");

	let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      controller.abort();
      onError?.(new Error("Streaming timeout"));
    }, timeoutMs);
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.body) {
      throw new Error("No response body (streaming not supported)");
    }

    const reader = response.body.getReader();
    let buffer = "";

    resetTimeout();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      resetTimeout();
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data:")) {
          const jsonData = trimmed.substring(5).trim();
          try {
            const parsed = JSON.parse(jsonData) as T;
            onMessage?.(parsed);
          } catch {
            console.warn("Invalid JSON:", jsonData);
          }
        }
      }
    }

    clearTimeout(timeoutId);
    onDone?.();
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn("Streaming aborted due to timeout");
      onError?.(new Error("Streaming aborted due to timeout"));
    } else if (err instanceof Error) {
      console.error("Streaming error:", err);
      onError?.(err);
    } else {
      onError?.(new Error("Unknown error"));
    }
  }
}