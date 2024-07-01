import mongoose from "mongoose";

mongoose.connect('mongodb+srv://dovtalab:dovtalab@cluster0.dzf4o0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('AuthUser', userSchema);

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    console.log('Пользователь сохранен:', savedUser);
    return { success: true, message: 'Пользователь успешно создан' };
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
    return { success: false, message: 'Произошла ошибка при создании пользователя' };
  }
};

// Пример использования функции createUser:
const userData = {
  username: 'admin',
  password: 'add'
};

createUser(userData);
