const Parser = require("rss-parser");
const { createClient } = require("@supabase/supabase-js");

// Инициализация Supabase
const supabaseUrl = "https://fhcypsstothlyammqrvm.supabase.co";
const supabaseKey =
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY3lwc3N0b3RobHlhbW1xcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNzg0NzYsImV4cCI6MjAwMjk1NDQ3Nn0.hLjJdzbslh4KDBUD9I1KVo7r094H_GKAHpzP3MinDtU";
const supabase = createClient(supabaseUrl, supabaseKey);

// Словарь для соответствия названия канала и его идентификатора
const channelMapping = {
 Савромат: "UCwdFktjRfL1MuLiLIpmVQtg",
 "Майкл Наки": "UCgpSieplNxXxLXYAzJLLpng",
 "Максим Кац": "UCUGfDbfRIx51kJGGHIFo8Rw",
 "24 Канал": "UCEC4D0dTTJr_EEnEJz15hnQ",
 "Александр Балу": "UCc3wvzU99elwjLO4_HOTmog",
 "Маша Борзунова": "UCuA9uOYjAaefVYIuHPhYc5g",
 "Антон Хардин": "UC2CwLS7djYymder2K3UpbJg",
};

const channelIds = [
 "UCwdFktjRfL1MuLiLIpmVQtg",
 "UCgpSieplNxXxLXYAzJLLpng",
 "UCUGfDbfRIx51kJGGHIFo8Rw",
 "UCEC4D0dTTJr_EEnEJz15hnQ",
 "UCc3wvzU99elwjLO4_HOTmog",
 "UCuA9uOYjAaefVYIuHPhYc5g",
 "UC2CwLS7djYymder2K3UpbJg",
];

/**
 * Возвращает идентификатор канала на основе его названия.
 *
 * @param {string} title - Название канала
 * @returns {string|null} Идентификатор канала или null, если соответствие не найдено
 */
function getChannelIdByTitle(title) {
 return channelMapping[title] || null;
}

const parser = new Parser();

async function fetchAllChannels(channelIds) {
 const promises = channelIds.map((channelId) =>
  parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
 );

 return Promise.all(promises);
}

async function deleteOldVideos() {
 const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

 const { error } = await supabase.from("videos").delete().lte("createdAt", twoDaysAgo);

 if (error) {
  console.error("Ошибка при удалении старых видео:", error);
 } else {
  console.log("Старые видео удалены.");
 }
}

(async () => {
 // Сначала удаляем старые видео
 await deleteOldVideos();

 const allFeeds = await fetchAllChannels(channelIds);

 for (let feed of allFeeds) {
  if (feed && feed.items && feed.items.length > 0) {
   const entry = feed.items[0];
   const videoTitle = entry.title;
   const videoLink = entry.link;

   const videoIdFromTag = entry.id ? entry.id.replace("yt:video:", "") : null;
   const channelIdFromTag = getChannelIdByTitle(feed.title); // Используем нашу функцию

   // Оставшаяся часть вашего кода без изменений...
   const { data: existingVideo, error: searchError } = await supabase
    .from("videos")
    .select("title, link")
    .eq("link", videoLink);

   if (searchError) {
    console.error("Ошибка при поиске видео в Supabase:", searchError);
    continue;
   }

   if (!existingVideo.length) {
    const { data, error } = await supabase.from("videos").insert([
     {
      title: videoTitle,
      link: videoLink,
      videoId: videoIdFromTag,
      channelId: channelIdFromTag,
     },
    ]);

    if (error) {
     console.error("Ошибка при добавлении в Supabase:", error);
    } else {
     console.log("Успешно добавлено:", data);
    }
   } else {
    console.log("Видео уже существует в базе данных.");
   }
  }
 }
})();
