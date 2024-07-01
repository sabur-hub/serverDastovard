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

const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username, password }).exec();
    console.log(user)
    if (user) {
      return { success: true, message: 'Вход выполнен успешно' };
    } else {
      return { success: false, message: 'Неправильный логин или пароль' };
    }
  } catch (error) {
    console.error('Ошибка при проверке учетных данных пользователя:', error);
    return { success: false, message: 'Произошла ошибка при проверке учетных данных пользователя' };
  }
};

export default authenticateUser;
