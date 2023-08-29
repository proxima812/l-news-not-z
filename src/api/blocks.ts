import type { APIRoute } from "astro";

export const get: APIRoute = async () => {
 try {
  // Делаем запрос к стороннему API
  const response = await fetch(import.meta.env.KEY + "/rest/v1/videos", {
   headers: {
    apikey: import.meta.env.KEY_ANON,
   },
  });

  // Проверяем, успешно ли выполнен запрос
  if (!response.ok) {
   throw new Error(`Error fetching videos: ${response.statusText}`);
  }

  // Преобразуем ответ в JSON
  const items = await response.json();

  // Возвращаем результат в виде JSON
  return new Response(
   JSON.stringify({
    videos: items, // или items.data в зависимости от структуры ответа
   }),
   {
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 } catch (error) {
  // В случае ошибки, возвращаем ее описание
  return new Response(
   JSON.stringify({
    error: error.message,
   }),
   {
    status: 500,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }
};
