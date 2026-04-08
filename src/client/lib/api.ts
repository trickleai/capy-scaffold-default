export interface ExampleApiResponse {
  message: string;
  runtime: string;
  generatedAt: string;
  database: {
    configured: boolean;
    driver: string | null;
    todoCount: number;
    sampleTitles: string[];
  };
  tips: string[];
}

export async function fetchExampleMessage(): Promise<ExampleApiResponse> {
  const response = await fetch("/api/example", {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as ExampleApiResponse;
}
