import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf'; // Import session from telegraf
import jwt from "jsonwebtoken";
import nodeCrypto from "crypto";
import OpenAI from "openai";


// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new Telegraf(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Define messages in JSON objects
const messages = {
  en: {
    welcome: 'Welcome to Gold Beauty!.\n Rewarding Beauty, One Token at a Time!.\nPlease select an option:',
    welcome_reply: '\nPlease select an option:',
    gold_beauty_option_01: 'What is Gold Beauty?',
    gold_beauty_option_01_reply: 'Gold Beauty is a digital assistant for the beauty industry that helps small businesses manage customer relationships, provide personalized recommendations, and offer a token-based loyalty program.',
    gold_beauty_option_02: 'How does the loyalty program work?',
    gold_beauty_option_02_reply: 'Our token-based loyalty program rewards customers for salon visits. You earn tokens that can be used for additional services or staked for future benefits.',
    gold_beauty_option_03: 'How can I make payments?',
    gold_beauty_option_03_reply: 'You can make payments easily through our Telegram mini-app using your credit card, which automatically earns you reward tokens with each transaction.',
    gold_beauty_option_04: 'What can I do with my reward tokens?',
    gold_beauty_option_04_reply: 'Reward tokens can be used in our marketplace for additional beauty services, or you can stake them for future benefits. Business owners can also stake their earnings.',
    gold_beauty_app: 'Gold Beauty App',
    gold_beauty_option_ai_chat: 'Gold Beauty AI Recomendations',
  },
};

const imagePath = `${baseUrl}/images/GoldBeautyApp.png`;


// Handle '/start' command (initial interaction)
bot.start((ctx) => {

  console.log("****************");
  console.log(ctx.update);
  console.log("****************");

  const userData = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.update.message.from.first_name,
    lastName: "",
    username: ctx.update.message.from.username,
    id: ctx.update.message.from.id,
    photoURL: "",
  }; 

  const hash = generateTelegramHash(userData);

  // Create JWT with user data and hash
  const telegramAuthToken = jwt.sign(
    {
        ...userData,
        hash,
    },
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string, // Use the bot token to sign the JWT
    { algorithm: "HS256" }
  );

  // URL-encode the generated JWT for safe usage in a URL
  const encodedTelegramAuthToken = encodeURIComponent(telegramAuthToken);     

  const appURL = `${process.env.NEXT_PUBLIC_APP_URL}/?telegramAuthToken=${encodedTelegramAuthToken}`;

  console.log("****************");
  console.log(appURL);
  console.log("****************");

  const replyMarkup = {
    inline_keyboard: [
      [{ text: messages.en.gold_beauty_app, web_app: { url: appURL } }],
      [{ text: messages.en.gold_beauty_option_01, callback_data: 'gold_beauty_option_01' }],
      [{ text: messages.en.gold_beauty_option_02, callback_data: 'gold_beauty_option_02' }],
      [{ text: messages.en.gold_beauty_option_03, callback_data: 'gold_beauty_option_03' }],
      [{ text: messages.en.gold_beauty_option_04, callback_data: 'gold_beauty_option_04' }],
      [{ text: messages.en.gold_beauty_option_ai_chat, callback_data: 'gold_beauty_option_ai_chat' }],
    ],
  };
  
    ctx.replyWithPhoto(imagePath, {
        caption: messages.en.welcome,
        reply_markup: replyMarkup,
    });

});

// Handle callback queries
bot.on('callback_query', async (ctx) => {

  const callbackData = ctx.callbackQuery.data;
  //const userId = ctx.from.id;

  console.log(callbackData);


if (callbackData === 'gold_beauty_option_01') {
  await ctx.reply(messages.en.gold_beauty_option_01 + "\n" + messages.en.gold_beauty_option_01_reply);
} else if (callbackData === 'gold_beauty_option_02') {
  await ctx.reply(messages.en.gold_beauty_option_02 + "\n" + messages.en.gold_beauty_option_02_reply);
} else if (callbackData === 'gold_beauty_option_03') {
  await ctx.reply(messages.en.gold_beauty_option_03 + "\n" + messages.en.gold_beauty_option_03_reply);
} else if (callbackData === 'gold_beauty_option_04') {
  await ctx.reply(messages.en.gold_beauty_option_04 + "\n" + messages.en.gold_beauty_option_04_reply);
} else if (callbackData === 'gold_beauty_option_ai_chat') {
  await ctx.reply("Type your favorite outdoor sport:");
}
  // ... (Handle other callback queries)

  const userData = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.update.callback_query.from.first_name,
    lastName: "",
    username: ctx.update.callback_query.from.username,
    id: ctx.update.callback_query.from.id,
    photoURL: "",
  }; 

  const hash = generateTelegramHash(userData);

  // Create JWT with user data and hash
  const telegramAuthToken = jwt.sign(
    {
        ...userData,
        hash,
    },
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string, // Use the bot token to sign the JWT
    { algorithm: "HS256" }
  );

  // URL-encode the generated JWT for safe usage in a URL
  const encodedTelegramAuthToken = encodeURIComponent(telegramAuthToken);     

  const appURL = `${process.env.NEXT_PUBLIC_APP_URL}/?telegramAuthToken=${encodedTelegramAuthToken}`;

  console.log("****************");
  console.log(appURL);
  console.log("****************");

  const replyMarkup = {
    inline_keyboard: [
        [{ text: messages.en.gold_beauty_app, web_app: { url: appURL } }],
        [{ text: messages.en.gold_beauty_option_01, callback_data: 'gold_beauty_option_01' }],
        [{ text: messages.en.gold_beauty_option_02, callback_data: 'gold_beauty_option_02' }],
        [{ text: messages.en.gold_beauty_option_03, callback_data: 'gold_beauty_option_03' }],
        [{ text: messages.en.gold_beauty_option_04, callback_data: 'gold_beauty_option_04' }],
    ],
  };

  ctx.reply(messages.en.welcome_reply, {
    reply_markup: replyMarkup,
  });

});

// Handle generic text messages
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a beauty and salon expert specializing in personalized beauty recommendations." },
            {
                role: "user",
                content: `I enjoy ${userMessage}. Can you recommend beauty treatments and salon services that would be beneficial for someone with my lifestyle, and suggest specific salons or beauty centers that cater to active individuals?`,
            },
        ],        
    });

    console.log(response);

    const answer = response.choices[0].message?.content ?? '';
    await ctx.reply(answer);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    await ctx.reply('Sorry, I am having trouble answering your question right now.');
  }
});

// Handle other commands or messages
// ... (Implement logic to process user input, generate recommendations, etc.)
// Handle messages (integrate OpenAI)

export async function POST(request: NextRequest) {
  try {
    // Parse incoming webhook request from Telegram
    const body = await request.json();

    // Pass the update to Telegraf for processing
    await bot.handleUpdate(body);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error handling Telegram webhook:', error);
    return new NextResponse('Error', { status: 500 });
  }
}

/**
 * Function to generate HMAC hash for Telegram authentication
 * @param {Object} data - User data to be hashed
 * @returns {string} - Generated HMAC hash
 */
const generateTelegramHash = (data): string => {
  // Prepare the data object with required fields
  const userData = {
      auth_date: String(data.authDate),
      first_name: data.firstName,
      id: String(data.id),
      last_name: data.lastName,
      photo_url: data.photoURL,
      username: data.username,
  };

  // Filter out undefined or empty values from the data object
  const filteredUseData = Object.entries(userData).reduce(
      (acc: { [key: string]: string }, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
      },
      {} as { [key: string]: string }
  );

  // Sort the entries and create the data check string
  const dataCheckArr = Object.entries(filteredUseData)
      .map(([key, value]) => `${key}=${String(value)}`)
      .sort((a, b) => a.localeCompare(b))
      .join("\n");

  // Create SHA-256 hash from the bot token
  const TELEGRAM_SECRET = nodeCrypto
      .createHash("sha256")
      .update(process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN as string)
      .digest();

  // Generate HMAC-SHA256 hash from the data check string
  return nodeCrypto
      .createHmac("sha256", TELEGRAM_SECRET)
      .update(dataCheckArr)
      .digest("hex");
};