from pathlib import Path
from aiogram.fsm.context import FSMContext
from aiogram import types, Router
from aiogram.filters import Command
from ..utils.buttons import start_keyboard
from ..core.main_database import BotDatabase 
from ..core.users_list_data import UsersDatabase 
from .. import bot

# Передаем классу, отвечающему за действия с БД пользователей, путь к ней
current_dir = Path(__file__).parent
db_file_path = current_dir.parent / "utils" / "broadcast" / "database_tg_bot.db"
users_db = UsersDatabase(db_file_path)

data = BotDatabase()
ref_router = Router()

@ref_router.message(Command('start'))
async def start(message: types.Message):
    """
    Обработчик команды /start.
    Если пользователь зашел в личные сообщения бота:
        - Проверяем, существует ли пользователь в базе данных. Если нет, добавляем его.
        - Извлекаем ID референта из ссылки.
        - Если ID референта является числом и отличается от ID пользователя:
            - Проверяем, является ли пользователь чьим-то рефералом. Если да, отправляем сообщение.
            - Если пользователь не является чьим-то рефералом:
                - Добавляем пользователя как реферала, начисляем награду.
                - Отправляем пользователю сообщение об успешной регистрации.
                - Оповещаем референта о новом реферале.
        - Если пользователь зашел по своей ссылке, отправляем сообщение.
        - Если пользователь зашел не по реферальной ссылке, отправляем стандартное сообщение.
    """
    if message.chat.type == 'private':
        if not users_db.user_exists(message.from_user.id):
            users_db.add_user(message.from_user.id)

        start_command = message.text
        referent_id = start_command[7:] # Извлекаем ID референта из ссылки

        if referent_id.isdigit(): # Проверяем, что ID референта является числом
            if referent_id != str(message.from_user.id): # Пользователь зашел не по своей ссылке
                if await data.is_user_referal(message.from_user.id): # Пользователь уже является чьим-то рефералом
                    await message.answer("Ты уже являешься рефералом! Не пытайся зайти через чью-то реферальную ссылку.")
                else: # Пользователь не является чьим-то рефералом
                    # Добавим реферала, начислим награду
                    await data.add_ref_node(int(referent_id), message.from_user.id, message.from_user.username)
                    await message.answer("Ты успешно зарегистрировался как реферал!")
                    # Стандартный текст
                    await message.answer("Airdrop Descoin🎁For each friend you will receive 50,000 descoin tokens!", reply_markup=await start_keyboard())
                    # Оповещаем референта о новом реферале
                    try:
                        await bot.send_message(chat_id=referent_id, text="По вашей реферальной ссылке зарегистрировался новый пользователь!")
                    except:
                        pass # Если референт заблокировал бота, отлавливаем ошибку
            else: # Пользователь зашел по своей ссылке
                await message.answer("Нельзя заходить по своей реферальной ссылке!")
        else: # Пользователь зашел не по реф ссылке
            await message.answer("Airdrop Descoin🎁For each friend you will receive 50,000 descoin tokens!", reply_markup=await start_keyboard())
