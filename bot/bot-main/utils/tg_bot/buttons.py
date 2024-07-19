from aiogram.types import WebAppInfo
from aiogram import types

async def start_keyboard():
    buttons = [
        [
            types.InlineKeyboardButton(text="Play⚔️",web_app=WebAppInfo(url="https://ecf3-91-215-90-18.ngrok-free.app/")),
        ],
        [
            types.InlineKeyboardButton(text="Subscribe to our channel🔥", url="https://t.me/descoin_token")
        ]
    ]
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=buttons)
    return keyboard

confirm_post_buttons = [
        [
            types.InlineKeyboardButton(text="Да🔥", callback_data="send_post_confrim"),
        ],
        [
            types.InlineKeyboardButton(text="Нет💔", callback_data="cancel_post_confirm"),
        ]
    ]
    
        
confirm_post_keyboard = types.InlineKeyboardMarkup(inline_keyboard=confirm_post_buttons)